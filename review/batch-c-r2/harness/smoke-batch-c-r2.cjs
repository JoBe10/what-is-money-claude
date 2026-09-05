// Batch C r2 — the scoped smoke (the r2 brief §4, exactly its list):
//
//   1. Boot smoke: the deck boots 39 slides, Scene 13 carries its seven
//      beats (totalBuildSteps 6), 0 console errors.
//   2. Act traversal S11 → S15, both ways: forward exact through all 26
//      states, backward monotonic to S11 b0.
//   3. The S8 → S10 span, both ways: forward exact through the 15 states,
//      backward monotonic to S8 b0 — Scene 9's boundaries walked inside it.
//   4. THE FORMS-ONCE PROBE (r2 ruling 5): entering Scene 9 cold with
//      motion on, the completed mesh never pre-shows — the chords hold
//      opacity ≈ 0 through the whole pre-formation window while the hub
//      (the institutional shape) stands first; the settled state is the
//      formed mesh.
//   5. Backward reconstruction at Scene 9: retreating b1 → b0 lands the
//      settled mesh instantly — the chords never dip (no formation replay,
//      no flash).
//   6. Reduced-motion parity on the changed scenes: every build of S12,
//      S13, S14 (window.__act3) and S9 (window.__act2) serializes
//      identically under prefers-reduced-motion.
//
// This smoke asserts state, not pixels; rasters are served as a 1×1 so the
// traversals cannot exhaust the renderer (the mesh is SVG and unaffected).
//
// Usage: node smoke-batch-c-r2.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;

const EXPECTED_DECK_SLIDES = 39;
const ACT3 = [
  { id: 'three-familiar-jobs', builds: 5 },
  { id: 'we-already-split-those-jobs', builds: 4 },
  { id: 'the-order-of-monetization', builds: 7 },
  { id: 'the-coffee-objection', builds: 4 },
  { id: 'the-tower', builds: 6 }
];
const SPAN2 = [
  { id: 'money-becomes-information', builds: 5 },
  { id: 'scarcity-becomes-digital', builds: 5 },
  { id: 'the-trade-off-keeps-moving', builds: 5 }
];
// Parity runs on the changed scenes only (the brief's own scope).
const PARITY = [
  { id: 'we-already-split-those-jobs', builds: 4, act: 3 },
  { id: 'the-order-of-monetization', builds: 7, act: 3 },
  { id: 'the-coffee-objection', builds: 4, act: 3 },
  { id: 'scarcity-becomes-digital', builds: 5, act: 2 }
];

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const fails = [];
  const result = {
    date: new Date().toISOString(),
    session: 'batch-c-r2',
    deck: null, act3Span: null, act2Span: null,
    formsOnce: null, backwardReconstruction: null, parity: [],
    consoleErrors: errors
  };
  const note = (name, ok, detail) => {
    console.log(`${ok ? '  ok  ' : 'FAIL  '}${name}${detail ? ` :: ${detail}` : ''}`);
    if (!ok) fails.push(name);
  };

  let page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const wire = (p) => {
    p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    p.on('pageerror', (e) => errors.push(String(e)));
  };
  wire(page);

  const TINY_PNG = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64');
  await page.route('**/*.png', (route) => route.fulfill({ contentType: 'image/png', body: TINY_PNG }));

  const settled = async () => {
    await page.waitForFunction(() => {
      if (window.__deck && window.__deck.transitioning) return false;
      const a3 = window.__act3;
      if (a3 && !a3.settled()) return false;
      const a2 = window.__act2;
      if (a2 && !a2.settled()) return false;
      const running = document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending');
      return running.length === 0;
    }, null, { timeout: 30000 });
    await page.waitForTimeout(120);
  };
  const deckState = () => page.evaluate(() => ({
    idx: window.__deck.index, step: window.__deck.buildStep,
    id: window.__deck.slides[window.__deck.index].id
  }));
  const indexOf = (id) => page.evaluate((sid) =>
    window.__deck.slides.findIndex((s) => s.id === sid), id);

  // ---- 1 · the deck ----
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  result.deck = await page.evaluate(() => ({
    slides: window.__deck.slides.length,
    firstId: window.__deck.slides[0].id,
    s13Builds: window.__deck.slides.find((s) => s.id === 'the-order-of-monetization').totalBuildSteps,
    act3At: window.__deck.slides.findIndex((s) => s.id === 'three-familiar-jobs')
  }));
  note(`boot: ${result.deck.slides} slides, the act at index ${result.deck.act3At}`,
    result.deck.slides === EXPECTED_DECK_SLIDES, `first ${result.deck.firstId}`);
  note('boot: Scene 13 carries its seven beats (totalBuildSteps 6)',
    result.deck.s13Builds === 6, `totalBuildSteps ${result.deck.s13Builds}`);

  // ---- a span traversal, both ways ----
  const walkSpan = async (scenes, label) => {
    const expected = [];
    scenes.forEach((sc) => {
      for (let b = 0; b < sc.builds; b += 1) expected.push([sc.id, b]);
    });
    await page.goto(`${BASE}/?slide=${scenes[0].id}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
      null, { timeout: 30000 });
    await settled();
    const seen = [await deckState()];
    for (let i = 1; i < expected.length; i += 1) {
      await page.evaluate(() => window.__deck.advance());
      await settled();
      seen.push(await deckState());
    }
    const fwdOk = seen.every((s, i) => s.id === expected[i][0] && s.step === expected[i][1]);
    const back = [];
    for (let i = 0; i < expected.length + 6; i += 1) {
      const here = await deckState();
      if (here.id === expected[0][0] && here.step === 0) break;
      await page.evaluate(() => window.__deck.retreat());
      await settled();
      back.push(await deckState());
    }
    const landed = back[back.length - 1];
    const backOk = landed && landed.id === expected[0][0] && landed.step === 0;
    const idxCache = {};
    for (const [id] of expected) if (!(id in idxCache)) idxCache[id] = await indexOf(id);
    const key = (s) => idxCache[s.id] * 100 + s.step;
    const monotonic = back.every((s, i) => i === 0 || key(s) < key(back[i - 1]));
    note(`${label}: forward exact through ${expected.length} states`, fwdOk);
    note(`${label}: backward monotonic to ${expected[0][0]} b0`, backOk && monotonic,
      `${back.length} steps back`);
    return {
      states: expected.length, forward: fwdOk,
      backwardReachesTop: backOk, backwardMonotonic: monotonic, backwardSteps: back.length
    };
  };

  // ---- 2 + 3 · the two spans ----
  result.act3Span = await walkSpan(ACT3, 'S11→S15');
  result.act2Span = await walkSpan(SPAN2, 'S8→S10');

  // ---- 4 · the forms-once probe (motion on, real entry) ----
  {
    await page.goto('about:blank');
    await page.goto(`${BASE}/?slide=scarcity-becomes-digital`, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
    // Sample the mesh during the entry gesture: the chord fade-in starts at
    // ~3.05s (railTo's 1.6s + the formation's own 1.45s), so every sample
    // through 2.7s must find the chords dark; the hub (the institutional
    // shape) must stand by 2.2s, before any chord.
    const samples = [];
    const probe = () => page.evaluate(() => {
      const svgs = [...document.querySelectorAll('svg')];
      let mesh = null;
      // The mesh layer is the svg whose parent starts display:none in the
      // world builder; identify it by its 12 spokes + hub + 12 nodes shape:
      // circles = 13 (hub + 12 nodes) and lines >= 12.
      for (const s of svgs) {
        const lines = s.querySelectorAll('line').length;
        const circles = s.querySelectorAll('circle').length;
        if (lines >= 24 && circles === 13) { mesh = s; break; }
      }
      if (!mesh) return null;
      const lines = [...mesh.querySelectorAll('line')];
      const spokes = lines.slice(0, 12);
      const chords = lines.slice(12);
      const hub = mesh.querySelector('circle');
      const layerShown = getComputedStyle(mesh.parentElement).display !== 'none';
      const op = (el) => Number(getComputedStyle(el).opacity);
      return {
        layerShown,
        hub: op(hub),
        maxChord: Math.max(...chords.map(op)),
        maxSpoke: Math.max(...spokes.map(op))
      };
    });
    for (const at of [300, 900, 1500, 2100, 2700]) {
      await page.waitForTimeout(at - (samples.length ? samples[samples.length - 1].at : 0));
      const s = await probe();
      samples.push({ at, ...s });
    }
    await settled();
    const settledProbe = await probe();
    const preShowDead = samples.every((s) => s.maxChord != null && s.maxChord < 0.05);
    const hubFirst = samples.some((s) => s.at <= 2200 && s.hub > 0.9 && s.maxChord < 0.05);
    const settledMesh = settledProbe && settledProbe.layerShown && settledProbe.maxChord > 0.95;
    result.formsOnce = { samples, settled: settledProbe, preShowDead, hubFirst, settledMesh };
    note('forms-once: the completed mesh never pre-shows (chords dark through the pre-formation window)',
      preShowDead, samples.map((s) => `${s.at}ms→${s.maxChord?.toFixed(2)}`).join(' '));
    note('forms-once: the institutional shape stands first (the hub up before any chord)',
      hubFirst);
    note('forms-once: the formed mesh persists as the settled state', settledMesh,
      settledProbe ? `settled chord opacity ${settledProbe.maxChord}` : 'MESH NOT FOUND');

    // ---- 5 · backward reconstruction: b1 → b0, no replay, no flash ----
    await page.evaluate(() => window.__deck.advance());
    await settled();
    const atB1 = await deckState();
    await page.evaluate(() => window.__deck.retreat());
    const dips = [];
    for (const wait of [200, 600, 1000] ) {
      await page.waitForTimeout(wait - (dips.length ? [200, 600][dips.length - 1] : 0));
      const s = await probe();
      dips.push({ wait, maxChord: s ? s.maxChord : null, layerShown: s ? s.layerShown : null });
    }
    await settled();
    const atB0 = await deckState();
    const noReplay = dips.every((d) => d.maxChord != null && d.maxChord > 0.9 && d.layerShown);
    result.backwardReconstruction = { from: atB1, to: atB0, dips, noReplay };
    note('backward: b1 → b0 reconstructs the settled mesh instantly — the formation never replays',
      atB0.step === 0 && noReplay,
      dips.map((d) => `${d.wait}ms→${d.maxChord?.toFixed(2)}`).join(' '));
  }

  // ---- 6 · reduced-motion parity on the changed scenes ----
  const enterCold = async (id, build, act) => {
    let last = null;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
          null, { timeout: 15000 });
        const idx = await indexOf(id);
        await page.evaluate(([i, b]) => {
          sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
        }, [idx, build]);
        await page.reload({ waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__deck, null, { timeout: 15000 });
        await settled();
        last = await deckState();
        if (last.id === id && last.step === build) {
          return page.evaluate((a) =>
            (a === 2 ? window.__act2.state() : window.__act3.state()), act);
        }
      } catch (err) {
        last = { err: String(err) };
      }
      if (attempt < 3) console.log(`  retrying direct entry ${id}:${build}`);
    }
    throw new Error(`direct entry ${id}:${build} landed at ${JSON.stringify(last)}`);
  };

  const motionStates = {};
  for (const sc of PARITY) {
    for (let b = 0; b < sc.builds; b += 1) {
      motionStates[`${sc.id}:${b}`] = await enterCold(sc.id, b, sc.act);
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  let parityFailures = 0;
  for (const sc of PARITY) {
    for (let b = 0; b < sc.builds; b += 1) {
      const key = `${sc.id}:${b}`;
      const reduced = await enterCold(sc.id, b, sc.act);
      const same = JSON.stringify(reduced) === JSON.stringify(motionStates[key]);
      result.parity.push({ state: key, identical: same });
      if (!same) parityFailures += 1;
    }
  }
  note(`parity: ${result.parity.length - parityFailures}/${result.parity.length} reduced-motion serializations identical`,
    parityFailures === 0);

  note(`console: ${errors.length} errors across every run`, errors.length === 0);
  errors.forEach((e) => console.log('ERR', e));

  fs.writeFileSync(path.join(__dirname, '..', 'smoke-batch-c-r2.json'), JSON.stringify(result, null, 2));
  await browser.close();
  console.log(`\n${fails.length ? `${fails.length} FAILURES` : 'the r2 smoke is green'}`);
  process.exit(fails.length ? 1 : 0);
})();
