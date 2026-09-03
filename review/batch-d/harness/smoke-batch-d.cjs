// Batch D — the batch smoke (the implementation brief §3).
//
// Six proofs, one run, over the SPLICED 34-slide deck:
//   1. Deck boot: 34 slides (was 38), the same first id, the act-4 section
//      labeled and placed after Act III, 0 console errors.
//   2. Full deck traversal FORWARD: every build of every slide, the
//      (slide, build) sequence exactly the running order.
//   3. Full deck traversal BACKWARD: monotonic, reaching the top.
//   4. The act's boundaries, both directions, landings recorded — the splice
//      seam S15 → S16 (Act III's exit question into the homecoming), the
//      seven in-act handoffs, and the splice seam S23 → the surviving legacy
//      deck (3-00, the flagged function waypoint).
//   5. Direct entry at every act-4 build (the engine's own deep-link path),
//      all settled.
//   6. Reduced-motion parity: the same 42 cold entries under
//      prefers-reduced-motion serialize IDENTICALLY to the settled
//      motion-on states (window.__act4's serializer).
//
// Usage: node smoke-batch-d.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;

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
const EXPECTED_DECK_SLIDES = 34;
const WAS_SLIDES = 38;
const BEFORE_ID = 'the-tower';
const AFTER_ID = '3-00-waypoint-function';

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const result = {
    date: new Date().toISOString(),
    session: 'batch-d',
    expectedSlides: EXPECTED_DECK_SLIDES, wasSlides: WAS_SLIDES,
    deck: null, traversal: null, boundaries: [], directEntry: [], parity: [],
    consoleErrors: errors
  };
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  // This smoke asserts state, not pixels; serve every raster as a 1×1 so the
  // long traversal cannot exhaust the renderer.
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
  const sceneState = () => page.evaluate(() => (window.__act4 ? window.__act4.state() : { kind: 'none' }));

  // ---- 1 · the deck ----
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  result.deck = await page.evaluate(() => ({
    slides: window.__deck.slides.length,
    firstId: window.__deck.slides[0].id,
    ids: window.__deck.slides.map((s) => s.id),
    builds: window.__deck.slides.map((s) => s.totalBuildSteps || 0),
    sections: window.__deck.sections.map((s) => `${s.id}:${s.slides.length}`),
    act4At: window.__deck.slides.findIndex((s) => s.id === 'return-to-the-open-exchange'),
    towerAt: window.__deck.slides.findIndex((s) => s.id === 'the-tower')
  }));
  console.log(`deck boots: ${result.deck.slides} slides (was ${WAS_SLIDES}), first ${result.deck.firstId}, the act at index ${result.deck.act4At} (the tower at ${result.deck.towerAt})`);
  console.log(`sections: ${result.deck.sections.join(' · ')}`);

  // ---- 2 + 3 · full deck traversal, forward and backward ----
  const expected = [];
  result.deck.builds.forEach((max, i) => {
    for (let b = 0; b <= max; b += 1) expected.push([i, b]);
  });
  console.log(`traversal: ${expected.length} states across ${result.deck.slides} slides`);

  await settled();
  const seen = [await deckState()];
  for (let i = 1; i < expected.length; i += 1) {
    await page.evaluate(() => window.__deck.advance());
    await settled();
    seen.push(await deckState());
  }
  const fwdOk = seen.every((s, i) => s.idx === expected[i][0] && s.step === expected[i][1]);
  const fwdFirstBad = seen.findIndex((s, i) => s.idx !== expected[i][0] || s.step !== expected[i][1]);
  console.log(`forward: ${fwdOk ? 'exact' : `WRONG at ${fwdFirstBad}`}`);

  const seenBack = [];
  for (let i = 0; i < expected.length + 12; i += 1) {
    const before = await deckState();
    if (before.idx === 0 && before.step === 0) break;
    await page.evaluate(() => window.__deck.retreat());
    await settled();
    seenBack.push(await deckState());
  }
  const backLanded = seenBack[seenBack.length - 1];
  const backOk = backLanded && backLanded.idx === 0 && backLanded.step === 0;
  const backMonotonic = seenBack.every((s, i) => {
    if (i === 0) return true;
    const p = seenBack[i - 1];
    return s.idx < p.idx || (s.idx === p.idx && s.step < p.step);
  });
  result.traversal = {
    states: expected.length,
    forward: fwdOk, forwardFirstMismatchAt: fwdOk ? null : fwdFirstBad,
    backwardReachesTop: backOk, backwardMonotonic: backMonotonic,
    backwardSteps: seenBack.length
  };
  console.log(`backward: ${backOk && backMonotonic ? 'monotonic to the top' : 'WRONG'} (${seenBack.length} steps)`);

  // ---- 4 · the boundaries, both directions ----
  const indexOf = async (id) => page.evaluate((sid) =>
    window.__deck.slides.findIndex((s) => s.id === sid), id);
  const jump = async (idx, step) => {
    const here = await page.evaluate(() => window.__deck.index);
    if (here !== idx) {
      await page.evaluate((i) => window.__deck.goTo(i), idx);
      await page.waitForFunction(
        (i) => !window.__deck.transitioning && window.__deck.index === i,
        idx, { timeout: 20000 });
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
    console.log(`boundary ${name.padEnd(60)} ${before.id}:${before.step} → ${after.id}:${after.step}`);
  };
  const fwd = () => page.evaluate(() => window.__deck.advance());
  const back = () => page.evaluate(() => window.__deck.retreat());
  const jumpEnd = () => page.evaluate(() => window.__deck.retreatStep(true));

  await boundary('S15 end (the exit question) → S16 (the splice seam, forward)', BEFORE_ID, 6, fwd);
  await boundary('S16 b0 → S15 (the splice seam, backward — the engine’s ← outside a group)', 'return-to-the-open-exchange', 0, back);
  await boundary('S16 b0 → S15 end (the splice seam, backward — ↑, the jump-to-end key)', 'return-to-the-open-exchange', 0, jumpEnd);
  for (let i = 0; i < ACT4.length - 1; i += 1) {
    const from = ACT4[i]; const to = ACT4[i + 1];
    await boundary(`${from.id} end → ${to.id} (forward)`, from.id, from.builds - 1, fwd);
    await boundary(`${to.id} b0 → ${from.id} end (backward)`, to.id, 0, back);
  }
  await boundary('S23 end → the surviving legacy deck (the splice seam, forward)', 'the-comparison', 5, fwd);
  await boundary(`${AFTER_ID} b0 → S23 (the splice seam, backward — ←)`, AFTER_ID, 0, back);
  await boundary(`${AFTER_ID} b0 → S23 end (the splice seam, backward — ↑)`, AFTER_ID, 0, jumpEnd);

  // ---- 5 + 6 · direct entry at every act-4 build, then parity ----
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
        if (last.id === id && last.step === build) return sceneState();
      } catch (err) {
        last = { err: String(err) };
      }
      if (attempt < 3) console.log(`  retrying direct entry ${id}:${build}`);
    }
    throw new Error(`direct entry ${id}:${build} landed at ${JSON.stringify(last)}`);
  };

  const motionStates = {};
  for (const sc of ACT4) {
    for (let b = 0; b < sc.builds; b += 1) {
      motionStates[`${sc.id}:${b}`] = await enterCold(sc.id, b);
      result.directEntry.push(`${sc.id}:${b}`);
    }
  }
  console.log(`direct entry: ${result.directEntry.length} builds mounted cold, all settled`);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  let parityFailures = 0;
  for (const sc of ACT4) {
    for (let b = 0; b < sc.builds; b += 1) {
      const key = `${sc.id}:${b}`;
      const reduced = await enterCold(sc.id, b);
      const same = JSON.stringify(reduced) === JSON.stringify(motionStates[key]);
      result.parity.push({ state: key, identical: same });
      if (!same) {
        parityFailures += 1;
        console.log(`PARITY MISMATCH at ${key}`);
        fs.writeFileSync(path.join(__dirname, `parity-${sc.id}-${b}.json`),
          JSON.stringify({ motion: motionStates[key], reduced }, null, 2));
      }
    }
  }
  console.log(`reduced-motion parity: ${result.parity.length - parityFailures}/${result.parity.length} identical`);

  fs.writeFileSync(path.join(__dirname, '..', 'smoke-batch-d.json'), JSON.stringify(result, null, 2));
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();

  const failed = errors.length || result.deck.slides !== EXPECTED_DECK_SLIDES ||
    result.deck.act4At !== result.deck.towerAt + 1 ||
    !fwdOk || !backOk || !backMonotonic || parityFailures;
  process.exit(failed ? 1 : 0);
})();
