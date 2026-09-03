// Act III final — the scoped smoke (FAST, lean scope — the Act IV kickoff
// brief, Part A: the fixed act with proofs; nothing beyond the changed
// scenes and the act's traversal):
//
//   1. Boot smoke: the deck boots 39 slides; Scene 14 carries three beats
//      (totalBuildSteps 2) and Scene 15 seven (totalBuildSteps 6); 0
//      console errors.
//   2. Act traversal S11 → S15, both ways: forward exact through all 26
//      states, backward monotonic to S11 b0.
//   3. THE EXIT LEAVES ON THE QUESTION (ruling 3): the act's last state is
//      S15 b6 — the home base returned with the store-of-value question in
//      the statement slot and no tower on stage — and one advance from it
//      lands on the next deck slide at build 0.
//   4. Reduced-motion parity on the changed scenes: every build of S12, S14
//      and S15 (window.__act3) serializes identically under
//      prefers-reduced-motion.
//
// This smoke asserts state, not pixels; rasters are served as a 1×1 so the
// traversals cannot exhaust the renderer.
//
// Usage: node smoke-act-3-final.cjs [--port 5273]
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
  { id: 'the-coffee-objection', builds: 3 },
  { id: 'the-tower', builds: 7 }
];
const PARITY = [
  { id: 'we-already-split-those-jobs', builds: 4 },
  { id: 'the-coffee-objection', builds: 3 },
  { id: 'the-tower', builds: 7 }
];

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const fails = [];
  const result = {
    date: new Date().toISOString(),
    session: 'act-3-final',
    deck: null, act3Span: null, exit: null, parity: [],
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
      const a3 = window.__act3;
      if (a3 && !a3.settled()) return false;
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
    s14Builds: window.__deck.slides.find((s) => s.id === 'the-coffee-objection').totalBuildSteps,
    s15Builds: window.__deck.slides.find((s) => s.id === 'the-tower').totalBuildSteps,
    act3At: window.__deck.slides.findIndex((s) => s.id === 'three-familiar-jobs'),
    afterAct3: window.__deck.slides[window.__deck.slides.findIndex((s) => s.id === 'the-tower') + 1].id
  }));
  note(`boot: ${result.deck.slides} slides, the act at index ${result.deck.act3At}`,
    result.deck.slides === EXPECTED_DECK_SLIDES, `first ${result.deck.firstId}`);
  note('boot: Scene 14 carries three beats (totalBuildSteps 2) and Scene 15 seven (totalBuildSteps 6)',
    result.deck.s14Builds === 2 && result.deck.s15Builds === 6,
    `S14 ${result.deck.s14Builds} · S15 ${result.deck.s15Builds}`);

  // ---- 2 · the act, both ways ----
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
  result.act3Span = await walkSpan(ACT3, 'S11→S15');

  // ---- 3 · the exit leaves on the question ----
  {
    await page.goto(`${BASE}/?slide=the-tower`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
      null, { timeout: 30000 });
    await settled();
    for (let i = 0; i < 6; i += 1) {
      await page.evaluate(() => window.__deck.advance());
      await settled();
    }
    const last = await deckState();
    const st = await page.evaluate(() => window.__act3.state());
    const onQuestion = last.id === 'the-tower' && last.step === 6 &&
      /good store of value\?/.test(st.stmt[0]) && st.stmt[2] === '1' &&
      st.tower.display === 'none' && st.triad.voice === '1' &&
      st.triad.fns.find((f) => f[0] === 'sov')[2] === '1' &&
      st.triad.token[0] === 'true';
    await page.evaluate(() => window.__deck.advance());
    await settled();
    const next = await deckState();
    const exitOk = next.id === result.deck.afterAct3 && next.step === 0;
    result.exit = { last, statement: st.stmt[0], next, onQuestion, exitOk };
    note('exit: the act’s last state is the home base returned with the store-of-value question, no tower on stage',
      onQuestion, `${last.id}:${last.step} — “${st.stmt[0]}”`);
    note(`exit: one advance from the question lands on the next deck slide at build 0`,
      exitOk, `${next.id}:${next.step}`);
  }

  // ---- 4 · reduced-motion parity on the changed scenes ----
  const enterCold = async (id, build) => {
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
          return page.evaluate(() => window.__act3.state());
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
      motionStates[`${sc.id}:${b}`] = await enterCold(sc.id, b);
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  let parityFailures = 0;
  for (const sc of PARITY) {
    for (let b = 0; b < sc.builds; b += 1) {
      const key = `${sc.id}:${b}`;
      const reduced = await enterCold(sc.id, b);
      const same = JSON.stringify(reduced) === JSON.stringify(motionStates[key]);
      result.parity.push({ state: key, identical: same });
      if (!same) parityFailures += 1;
    }
  }
  note(`parity: ${result.parity.length - parityFailures}/${result.parity.length} reduced-motion serializations identical`,
    parityFailures === 0);

  note(`console: ${errors.length} errors across every run`, errors.length === 0);
  errors.forEach((e) => console.log('ERR', e));

  fs.writeFileSync(path.join(__dirname, '..', 'smoke-act-3-final.json'), JSON.stringify(result, null, 2));
  await browser.close();
  console.log(`\n${fails.length ? `${fails.length} FAILURES` : 'the Act III final smoke is green'}`);
  process.exit(fails.length ? 1 : 0);
})();
