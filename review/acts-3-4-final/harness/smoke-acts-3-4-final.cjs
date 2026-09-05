// Acts III–IV final — the scoped smoke (FAST, lean scope — the Act V kickoff
// brief, Part A: the fixed acts with proofs; nothing beyond the changed
// scenes, the two acts' traversals and the boundaries the rulings touch):
//
//   1. Boot smoke: the deck boots 32 slides (was 34); Scene 12 carries three
//      beats (totalBuildSteps 2) and Scene 15 seven (6); the `function`
//      section is gone and Act IV is followed directly by the surviving
//      legacy Section 4; 0 console errors.
//   2. Act III traversal S11 → S15 both ways (25 states) and Act IV
//      traversal S16 → S23 both ways (42 states): forward exact, backward
//      monotonic to the act's first beat.
//   3. THE EXIT LANDS ON THE TOWER (ruling 3): the act's last state is S15 b7
//      — the tower layer on stage with only the base slab standing, the
//      upper layers, links and drop gone, the triad out of the paint tree,
//      the hinge question in the statement slot — and one advance from it
//      lands on S16 b0 (the splice seam forward); the seam backward, ← and
//      ↑, lands as the engine's law has it. Then Act IV's exit: S23 end →
//      4-17 b0 forward (the leftovers ruling — the survivors gone), and
//      4-17 b0 → S23 backward, ← and ↑.
//   4. Reduced-motion parity on the changed scenes: every build of S12, S15,
//      S16 and S23 (window.__act3 / window.__act4) serializes identically
//      under prefers-reduced-motion — 24 states.
//
// This smoke asserts state, not pixels; rasters are served as a 1×1 so the
// traversals cannot exhaust the renderer.
//
// Usage: node smoke-acts-3-4-final.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;

const EXPECTED_DECK_SLIDES = 32;
const WAS_SLIDES = 34;
const ACT3 = [
  { id: 'three-familiar-jobs', builds: 5 },
  { id: 'we-already-split-those-jobs', builds: 3 },
  { id: 'the-order-of-monetization', builds: 7 },
  { id: 'the-coffee-objection', builds: 3 },
  { id: 'the-tower', builds: 7 }
];
const ACT4 = [
  { id: 'return-to-the-open-exchange', builds: 8 },
  { id: 'what-the-carrier-must-preserve', builds: 5 },
  { id: 'the-100-year-test', builds: 8 },
  { id: 'invert-the-question', builds: 2 },
  { id: 'how-the-carrier-can-fail-i', builds: 5 },
  { id: 'how-the-carrier-can-fail-ii', builds: 5 },
  { id: 'from-failure-to-requirement', builds: 3 },
  { id: 'the-comparison', builds: 6 }
];
const PARITY = [
  { id: 'we-already-split-those-jobs', builds: 3, stage: '__act3' },
  { id: 'the-tower', builds: 7, stage: '__act3' },
  { id: 'return-to-the-open-exchange', builds: 8, stage: '__act4' },
  { id: 'the-comparison', builds: 6, stage: '__act4' }
];
const AFTER_ACT4 = '4-17-store-of-value-function-migrates';
const RETIRED = ['3-00-waypoint-function', '3-04-stage-signatures'];

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const fails = [];
  const result = {
    date: new Date().toISOString(),
    session: 'acts-3-4-final',
    expectedSlides: EXPECTED_DECK_SLIDES, wasSlides: WAS_SLIDES,
    deck: null, act3Span: null, act4Span: null, exit: null, boundaries: [], parity: [],
    consoleErrors: errors
  };
  const note = (name, ok, detail) => {
    console.log(`${ok ? '  ok  ' : 'FAIL  '}${name}${detail ? ` :: ${detail}` : ''}`);
    if (!ok) fails.push(name);
  };

  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  const TINY_PNG = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64');
  await page.route('**/*.png', (route) => route.fulfill({ contentType: 'image/png', body: TINY_PNG }));

  const settled = async () => {
    await page.waitForFunction(() => {
      if (window.__deck && window.__deck.transitioning) return false;
      for (const key of ['__act1', '__act2', '__act3', '__act4']) {
        const a = window[key];
        if (a && a.settled && !a.settled()) return false;
      }
      return document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 30000 });
    await page.waitForTimeout(120);
  };
  const deckState = () => page.evaluate(() => ({
    idx: window.__deck.index, step: window.__deck.buildStep,
    id: window.__deck.slides[window.__deck.index].id
  }));
  const indexOf = (id) => page.evaluate((sid) => window.__deck.slides.findIndex((s) => s.id === sid), id);

  // ---- 1 · the deck ----
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  result.deck = await page.evaluate(() => ({
    slides: window.__deck.slides.length,
    firstId: window.__deck.slides[0].id,
    ids: window.__deck.slides.map((s) => s.id),
    sections: window.__deck.sections.map((s) => `${s.id}:${s.slides.length}`),
    s12Builds: window.__deck.slides.find((s) => s.id === 'we-already-split-those-jobs').totalBuildSteps,
    s15Builds: window.__deck.slides.find((s) => s.id === 'the-tower').totalBuildSteps,
    act3At: window.__deck.slides.findIndex((s) => s.id === 'three-familiar-jobs'),
    act4At: window.__deck.slides.findIndex((s) => s.id === 'return-to-the-open-exchange'),
    afterAct4: window.__deck.slides[window.__deck.slides.findIndex((s) => s.id === 'the-comparison') + 1].id
  }));
  note(`boot: ${result.deck.slides} slides (was ${WAS_SLIDES}), Act III at ${result.deck.act3At}, Act IV at ${result.deck.act4At}`,
    result.deck.slides === EXPECTED_DECK_SLIDES, `first ${result.deck.firstId} · sections ${result.deck.sections.join(' · ')}`);
  note('boot: Scene 12 carries three beats (totalBuildSteps 2) and Scene 15 seven (totalBuildSteps 6)',
    result.deck.s12Builds === 2 && result.deck.s15Builds === 6, `S12 ${result.deck.s12Builds} · S15 ${result.deck.s15Builds}`);
  note('boot: the two survivors are gone and the function section with them; Act IV is followed by 4-17',
    RETIRED.every((id) => !result.deck.ids.includes(id)) && !result.deck.sections.some((s) => s.startsWith('function:')) && result.deck.afterAct4 === AFTER_ACT4,
    `after S23: ${result.deck.afterAct4}`);

  // ---- 2 · the acts, both ways ----
  const walkSpan = async (scenes, label) => {
    const expected = [];
    scenes.forEach((sc) => { for (let b = 0; b < sc.builds; b += 1) expected.push([sc.id, b]); });
    await page.goto(`${BASE}/?slide=${scenes[0].id}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck && !window.__deck.transitioning, null, { timeout: 30000 });
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
    note(`${label}: backward monotonic to ${expected[0][0]} b0`, backOk && monotonic, `${back.length} steps back`);
    return { states: expected.length, forward: fwdOk, backwardReachesTop: backOk, backwardMonotonic: monotonic, backwardSteps: back.length };
  };
  result.act3Span = await walkSpan(ACT3, 'S11→S15');
  result.act4Span = await walkSpan(ACT4, 'S16→S23');

  // ---- 3 · the exit on the tower, and the boundaries both ways ----
  const jump = async (idx, step) => {
    const here = await page.evaluate(() => window.__deck.index);
    if (here !== idx) {
      await page.evaluate((i) => window.__deck.goTo(i), idx);
      await page.waitForFunction((i) => !window.__deck.transitioning && window.__deck.index === i, idx, { timeout: 20000 });
    }
    await settled();
    const at = await page.evaluate(() => window.__deck.buildStep);
    for (let k = at; k < step; k += 1) {
      await page.evaluate(() => window.__deck.advanceStep(false));
      await settled();
    }
  };
  const boundary = async (name, fromId, fromStep, act) => {
    await jump(await indexOf(fromId), fromStep);
    const before = await deckState();
    await act();
    await settled();
    const after = await deckState();
    result.boundaries.push({ name, from: before, to: after });
    console.log(`boundary ${name.padEnd(64)} ${before.id}:${before.step} → ${after.id}:${after.step}`);
    return after;
  };
  const fwd = () => page.evaluate(() => window.__deck.advance());
  const back = () => page.evaluate(() => window.__deck.retreat());
  const jumpEnd = () => page.evaluate(() => window.__deck.retreatStep(true));

  {
    await page.goto(`${BASE}/?slide=the-tower`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck && !window.__deck.transitioning, null, { timeout: 30000 });
    await settled();
    for (let i = 0; i < 6; i += 1) { await page.evaluate(() => window.__deck.advance()); await settled(); }
    const last = await deckState();
    const st = await page.evaluate(() => window.__act3.state());
    // Browsers normalize cssText ("display: none;"), so the checks read the
    // declarations rather than the string.
    const slab = (k) => st.tower.slabs.find((s) => s[0] === k)[1];
    const hidden = (css) => /^display:\s*none;?\s*$/.test(css);
    const onSlab = last.id === 'the-tower' && last.step === 6 &&
      st.tower.display === '' && /display:\s*grid/.test(slab('base')) && slab('base').includes('rgba(247, 147, 26') &&
      hidden(slab('apps')) && hidden(slab('deposits')) &&
      st.tower.links.every((l) => hidden(l[1])) &&
      st.tower.rows.every((r) => r[1] === 'false') && st.tower.drop[0] === 'false' &&
      st.triad.voice === '0' &&
      /good store of value\?/.test(st.stmt[0]) && st.stmt[2] === '1';
    result.exit = { last, statement: st.stmt[0], onSlab };
    note('exit: the act’s last state is the tower receded to its glowing base slab — no upper layers, links or drop, no triad — with the hinge question beneath it',
      onSlab, `${last.id}:${last.step} — “${st.stmt[0]}”`);
  }
  const s16 = await boundary('S15 end (the slab + the question) → S16 (the splice seam, forward)', 'the-tower', 6, fwd);
  note('seam: one advance from the exit lands on Scene 16 at build 0', s16.id === 'return-to-the-open-exchange' && s16.step === 0);
  await boundary('S16 b0 → S15 (the seam backward — the engine’s ← outside a group)', 'return-to-the-open-exchange', 0, back);
  await boundary('S16 b0 → S15 end (the seam backward — ↑, the jump-to-end key)', 'return-to-the-open-exchange', 0, jumpEnd);
  const s417 = await boundary('S23 end → the surviving legacy Section 4 (Act IV’s exit, forward)', 'the-comparison', 5, fwd);
  note(`seam: one advance from the closing line lands on ${AFTER_ACT4} at build 0 — the survivors gone`, s417.id === AFTER_ACT4 && s417.step === 0);
  await boundary(`${AFTER_ACT4} b0 → S23 (backward — ←)`, AFTER_ACT4, 0, back);
  await boundary(`${AFTER_ACT4} b0 → S23 end (backward — ↑)`, AFTER_ACT4, 0, jumpEnd);

  // ---- 4 · reduced-motion parity on the changed scenes ----
  const enterCold = async (id, build, stageKey) => {
    let last = null;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__deck && !window.__deck.transitioning, null, { timeout: 15000 });
        const idx = await indexOf(id);
        await page.evaluate(([i, b]) => {
          sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
        }, [idx, build]);
        await page.reload({ waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__deck, null, { timeout: 15000 });
        await settled();
        last = await deckState();
        if (last.id === id && last.step === build) return page.evaluate((k) => window[k].state(), stageKey);
      } catch (err) {
        last = { err: String(err) };
      }
      if (attempt < 3) console.log(`  retrying direct entry ${id}:${build}`);
    }
    throw new Error(`direct entry ${id}:${build} landed at ${JSON.stringify(last)}`);
  };
  const motionStates = {};
  for (const sc of PARITY) for (let b = 0; b < sc.builds; b += 1) motionStates[`${sc.id}:${b}`] = await enterCold(sc.id, b, sc.stage);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  let parityFailures = 0;
  for (const sc of PARITY) {
    for (let b = 0; b < sc.builds; b += 1) {
      const key = `${sc.id}:${b}`;
      const reduced = await enterCold(sc.id, b, sc.stage);
      const same = JSON.stringify(reduced) === JSON.stringify(motionStates[key]);
      result.parity.push({ state: key, identical: same });
      if (!same) {
        parityFailures += 1;
        fs.writeFileSync(path.join(__dirname, `parity-${sc.id}-${b}.json`), JSON.stringify({ motion: motionStates[key], reduced }, null, 2));
      }
    }
  }
  note(`parity: ${result.parity.length - parityFailures}/${result.parity.length} reduced-motion serializations identical`, parityFailures === 0);
  note(`console: ${errors.length} errors across every run`, errors.length === 0);
  errors.forEach((e) => console.log('ERR', e));

  fs.writeFileSync(path.join(__dirname, '..', 'smoke-acts-3-4-final.json'), JSON.stringify(result, null, 2));
  await browser.close();
  console.log(`\n${fails.length ? `${fails.length} FAILURES` : 'the Acts III–IV final smoke is green'}`);
  process.exit(fails.length ? 1 : 0);
})();
