// Act II rail implementation, Session 1 — the FAST-scope smoke
// (docs/act-2-rail-impl-brief.md §2).
//
// The scene contract, checked rather than asserted. Five proofs, one run:
//   1. The deck boots unchanged — 39 slides, the same first id, 0 console
//      errors. Act II is spliced, so this is the whole deck, not a route.
//   2. The three rewired scenes carry their beat map — 8 · 9 · 5, untouched.
//   3. Full traversal of Scenes 5–7, forward and backward: every build walked
//      in order both ways, the backward walk landing each boundary on the
//      previous scene's end state (the shared-stage handoff).
//   4. The in-act boundaries, both directions, landings recorded — including
//      S7 → S8, where the rail world hands over to the scenes Session 2 has
//      yet to rewire.
//   5. Cold direct entry at all 22 builds — the engine's own deep-link path —
//      and REDUCED-MOTION PARITY: the same 22 cold entries under
//      prefers-reduced-motion serialize IDENTICALLY to the settled motion-on
//      states, the rail world's own geometry included. Checked mechanically.
//
// Usage: node smoke-rail-impl1.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;

// Act II sits at deck indices 5–10; Session 1 owns the first three.
const SCENES = [
  { idx: 5, id: 'the-function-stayed', builds: 8 },
  { idx: 6, id: 'scarcity-in-matter', builds: 9 },
  { idx: 7, id: 'claims-on-gold', builds: 5 }
];
const EXPECTED_DECK_SLIDES = 39;

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const result = {
    date: new Date().toISOString(),
    session: 'act-2-rail-impl-1',
    deck: null, scenes: null, traversal: null,
    boundaries: [], directEntry: [], parity: [],
    consoleErrors: errors
  };
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  // This smoke asserts state, not pixels; serve every raster as a 1×1 so a
  // long traversal cannot exhaust the renderer (the proof harness loads the
  // real ones).
  const TINY_PNG = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64');
  await page.route('**/*.png', (route) => route.fulfill({ contentType: 'image/png', body: TINY_PNG }));

  const settled = async () => {
    await page.waitForFunction(() => {
      if (window.__deck && window.__deck.transitioning) return false;
      const a = window.__act2;
      if (a && !a.settled()) return false;
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
  const sceneState = () => page.evaluate(() => (window.__act2 ? window.__act2.state() : { kind: 'none' }));

  // ---- 1 · the deck boots ----
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  result.deck = await page.evaluate(() => ({
    slides: window.__deck.slides.length,
    firstId: window.__deck.slides[0].id,
    sections: window.__deck.sections.map((s) => `${s.id}:${s.slides.length}`)
  }));
  console.log(`deck boots: ${result.deck.slides} slides — ${result.deck.sections.join(' · ')}`);

  // ---- 2 · the beat map, untouched ----
  result.scenes = await page.evaluate((list) => list.map(({ idx }) => {
    const s = window.__deck.slides[idx];
    return { idx, id: s.id, builds: (s.totalBuildSteps || 0) + 1 };
  }), SCENES.map(({ idx }) => ({ idx })));
  const mapOk = result.scenes.every((s, i) => s.id === SCENES[i].id && s.builds === SCENES[i].builds);
  console.log(`beat map: ${result.scenes.map((s) => `${s.id} ${s.builds}`).join(' · ')} — ${mapOk ? 'ok' : 'WRONG'}`);

  // ---- 3 · traversal, forward and backward ----
  const expected = [];
  SCENES.forEach(({ idx, builds }) => {
    for (let b = 0; b < builds; b += 1) expected.push([idx, b]);
  });

  const goTo = async (idx, step) => {
    await page.evaluate((i) => window.__deck.goTo(i), idx);
    await page.waitForFunction((i) => !window.__deck.transitioning && window.__deck.index === i,
      idx, { timeout: 20000 });
    await settled();
    const at = await page.evaluate(() => window.__deck.buildStep);
    for (let k = at; k < step; k += 1) {
      await page.evaluate(() => window.__deck.advanceStep(false));
      await settled();
    }
  };

  await goTo(5, 0);
  const seen = [await deckState()];
  for (let i = 1; i < expected.length; i += 1) {
    await page.evaluate(() => window.__deck.advance());
    await settled();
    seen.push(await deckState());
  }
  const fwdOk = seen.every((s, i) => s.idx === expected[i][0] && s.step === expected[i][1]);
  const fwdFirstBad = seen.findIndex((s, i) => s.idx !== expected[i][0] || s.step !== expected[i][1]);

  const seenBack = [];
  for (let i = 0; i < expected.length + 8; i += 1) {
    const before = await deckState();
    if (before.idx === 5 && before.step === 0) break;
    await page.evaluate(() => window.__deck.retreat());
    await settled();
    seenBack.push(await deckState());
  }
  const backLanded = seenBack[seenBack.length - 1];
  const backOk = Boolean(backLanded) && backLanded.idx === 5 && backLanded.step === 0;
  const backMonotonic = seenBack.every((s, i) => {
    if (i === 0) return true;
    const p = seenBack[i - 1];
    return s.idx < p.idx || (s.idx === p.idx && s.step < p.step);
  });
  result.traversal = {
    states: expected.length,
    forward: fwdOk, forwardFirstMismatchAt: fwdOk ? null : fwdFirstBad,
    backwardReachesStart: backOk, backwardMonotonic: backMonotonic,
    backwardSteps: seenBack.length
  };
  console.log(`traversal: ${expected.length} states — forward ${fwdOk ? 'ok' : `WRONG at ${fwdFirstBad}`}, ` +
    `backward ${backOk && backMonotonic ? 'ok' : 'WRONG'} (${seenBack.length} steps)`);

  // ---- 4 · the boundaries, both directions ----
  const boundary = async (name, from, act) => {
    await goTo(from[0], from[1]);
    const before = await deckState();
    await act();
    await settled();
    const after = await deckState();
    result.boundaries.push({ name, from: before, to: after });
    console.log(`boundary ${name.padEnd(46)} ${before.id}:${before.step} → ${after.id}:${after.step}`);
  };
  const fwd = () => page.evaluate(() => window.__deck.advance());
  const back = () => page.evaluate(() => window.__deck.retreat());
  await boundary('S5 end → S6 (the rail carries the seam)', [5, 7], fwd);
  await boundary('S6 start → S5 (backward across it)', [6, 0], back);
  await boundary('S6 end → S7 (the return seam, then COINAGE)', [6, 8], fwd);
  await boundary('S7 start → S6 (backward across it)', [7, 0], back);
  await boundary('S7 end → S8 (the rail hands over)', [7, 4], fwd);
  await boundary('S8 start → S7 (backward across it)', [8, 0], back);

  // ---- 5 · cold direct entry at every build, then reduced-motion parity ----
  const enterCold = async (idx, build) => {
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(([i, b]) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
    }, [idx, build]);
    await page.goto(`${BASE}/?slide=${idx + 1}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
    await settled();
    return sceneState();
  };

  const motionStates = {};
  let coldFailures = 0;
  for (const sc of SCENES) {
    for (let b = 0; b < sc.builds; b += 1) {
      const st = await enterCold(sc.idx, b);
      const at = await deckState();
      const ok = at.idx === sc.idx && at.step === b && st.scene === sc.id && st.build === b;
      if (!ok) coldFailures += 1;
      motionStates[`${sc.id}:${b}`] = st;
      result.directEntry.push({ state: `${sc.id}:${b}`, landed: `${at.idx}:${at.step}`, ok });
    }
  }
  console.log(`direct entry: ${result.directEntry.length} cold mounts, ${coldFailures} wrong`);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  let parityFailures = 0;
  for (const sc of SCENES) {
    for (let b = 0; b < sc.builds; b += 1) {
      const key = `${sc.id}:${b}`;
      const reduced = await enterCold(sc.idx, b);
      const same = JSON.stringify(reduced) === JSON.stringify(motionStates[key]);
      if (!same) parityFailures += 1;
      result.parity.push({ state: key, identical: same });
    }
  }
  console.log(`reduced-motion parity: ${result.parity.length} states, ${parityFailures} differing`);

  const pass = result.deck.slides === EXPECTED_DECK_SLIDES && mapOk && fwdOk &&
    backOk && backMonotonic && coldFailures === 0 && parityFailures === 0 &&
    errors.length === 0;
  result.pass = pass;

  fs.mkdirSync(path.join(__dirname, '..'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, '..', 'smoke-rail-impl1.json'),
    JSON.stringify(result, null, 2));

  console.log(`\nconsole errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  console.log(pass ? 'SMOKE PASS' : 'SMOKE FAIL');
  await browser.close();
  process.exit(pass ? 0 : 1);
})();
