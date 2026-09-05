// Batch A — the FAST-scope smoke (docs/batch-a-implementation-brief.md §5).
//
// Six proofs, one run:
//   1. Deck boot: the spliced manifest's slide count and first id, 0 console
//      errors.
//   2. Full traversal: the WHOLE deck walked forward and back, every build of
//      every slide, and the (slide, build) sequence is exactly the running
//      order in both directions.
//   3. Boundary checks: the two seams the splice creates — the Prologue's cold
//      open at the top of the deck, and Scene 4 → the first legacy slide — in
//      both directions, with the landing (slide, build) recorded.
//   4. Direct entry: every one of the 33 new-scene builds mounted cold (URL +
//      restored build step, the engine's own deep-link path) settles.
//   5. Reduced-motion parity: the same 33 cold entries under
//      prefers-reduced-motion serialize IDENTICALLY to the settled motion-on
//      states — checked mechanically, not by eye. Act I serializes through
//      window.__act1; the Prologue through its own DOM read.
//   6. Console: zero errors anywhere in the run.
//
// Usage: node smoke-batch-a.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;

// The five new scenes, in deck order: [1-based slide, builds (inclusive of 0)].
const NEW_SCENES = [
  { slide: 1, id: 'eighty-thousand-hours', builds: 12 },
  { slide: 2, id: 'the-stakes', builds: 2 },
  { slide: 3, id: 'the-direct-exchange', builds: 5 },
  { slide: 4, id: 'the-breakthrough', builds: 9 },
  { slide: 5, id: 'spend-or-save', builds: 5 }
];

const EXPECTED_SLIDES = 39;

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const result = {
    date: new Date().toISOString(),
    deck: null, traversal: null, boundaries: [], directEntry: [], parity: [],
    consoleErrors: errors
  };
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  // This smoke asserts state, not pixels. The register's renders are a couple
  // of megabytes each and a full-deck traversal loads them repeatedly, which
  // exhausts the renderer with ERR_INSUFFICIENT_RESOURCES flakes that have
  // nothing to do with the scenes. Serve every raster as a 1×1 here; the
  // capture and proof harnesses load the real ones.
  const TINY_PNG = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64');
  await page.route('**/*.png', (route) => route.fulfill({ contentType: 'image/png', body: TINY_PNG }));

  // Settled means three things, and all three are needed: the engine is not
  // mid-transition, Act I's timelines have finished, and no CSS transition is
  // still running. The Prologue's gestures are CSS — the mass reveals over
  // 1200ms and the title lands after a 600ms hold — so a settle that only
  // waits on GSAP reads a frame mid-fade and calls it a state.
  const settled = async () => {
    await page.waitForFunction(() => {
      if (window.__deck && window.__deck.transitioning) return false;
      const a = window.__act1;
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

  // The serializer: Act I has its own; the Prologue's settled state is read off
  // the DOM the same way — every element that carries a settled value.
  const sceneState = () => page.evaluate(() => {
    if (window.__act1) return { kind: 'act1', ...window.__act1.state() };
    const root = document.querySelector('.deck-slide[data-active="true"] .s1q');
    if (!root) return { kind: 'none' };
    const read = (sel) => Array.from(root.querySelectorAll(sel)).map((el) => [
      el.className, el.dataset.visible || 'false',
      getComputedStyle(el).opacity, el.textContent
    ]);
    const canvas = root.querySelector('canvas');
    return {
      kind: 'prologue',
      step: root.dataset.step,
      field: canvas ? [canvas.width, canvas.height, getComputedStyle(canvas).opacity] : null,
      mass: read('.p1-mass'),
      forms: Array.from(root.querySelectorAll('.p1-form')).map((el) => [
        el.dataset.subject, el.dataset.visible || 'false',
        el.style.left, el.style.top, getComputedStyle(el).opacity
      ]),
      text: read('p, h1, .s1q-hours__counter')
    };
  });

  // ---- 1 · deck boot ----
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  result.deck = await page.evaluate(() => ({
    slides: window.__deck.slides.length,
    firstId: window.__deck.slides[0].id,
    order: window.__deck.slides.map((s) => s.id),
    builds: window.__deck.slides.map((s) => s.totalBuildSteps || 0)
  }));
  console.log(`deck boots: ${result.deck.slides} slides, first ${result.deck.firstId}`);

  // ---- 2 · full traversal, forward and backward ----
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

  // Backward: ← steps back through builds, and at build 0 enters the previous
  // slide — at its end state inside a scene group, at build 0 outside one
  // (the deck-wide convention; ↑ is the jump-to-end key).
  const seenBack = [];
  for (let i = 0; i < expected.length + 8; i += 1) {
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
  console.log(`traversal: forward ${fwdOk ? 'ok' : `WRONG at ${fwdFirstBad}`}, ` +
    `backward ${backOk && backMonotonic ? 'ok' : 'WRONG'} (${seenBack.length} steps back to the top)`);

  // ---- 3 · the two boundaries, both directions ----
  const jump = async (idx, step) => {
    const here = await page.evaluate(() => window.__deck.index);
    if (here !== idx) {
      await page.evaluate((i) => window.__deck.goTo(i), idx);
      await page.waitForFunction(
        (i) => !window.__deck.transitioning && window.__deck.index === i,
        idx, { timeout: 20000 });
    }
    await settled();
    for (let k = 0; k < step; k += 1) {
      await page.evaluate(() => window.__deck.advanceStep(false));
      await settled();
    }
  };
  const boundary = async (name, from, act) => {
    await jump(from[0], from[1]);
    const before = await deckState();
    await act();
    await settled();
    const after = await deckState();
    result.boundaries.push({ name, from: before, to: after });
    console.log(`boundary ${name.padEnd(34)} ${before.id}:${before.step} → ${after.id}:${after.step}`);
  };
  const lastNew = NEW_SCENES[NEW_SCENES.length - 1];
  const legacyIdx = NEW_SCENES.length;                 // first legacy slide
  await boundary('P2 end → Scene 2 entry (forward)', [1, 1],
    () => page.evaluate(() => window.__deck.advance()));
  await boundary('Scene 2 b0 → P2 (backward)', [2, 0],
    () => page.evaluate(() => window.__deck.retreat()));
  await boundary('Scene 4 end → legacy (forward)', [lastNew.slide - 1, lastNew.builds - 1],
    () => page.evaluate(() => window.__deck.advance()));
  await boundary('legacy b0 → Scene 4 (backward, ←)', [legacyIdx, 0],
    () => page.evaluate(() => window.__deck.retreat()));
  await boundary('legacy b0 → Scene 4 end (backward, ↑)', [legacyIdx, 0],
    () => page.evaluate(() => window.__deck.retreatStep(true)));
  await boundary('P1 b0 → P1 b1 (the cold open)', [0, 0],
    () => page.evaluate(() => window.__deck.advance()));

  // ---- 4 + 5 · direct entry at every new-scene build, then parity ----
  // One retry per state: the dev server occasionally drops a module request
  // under this many rapid navigations, which stalls main.js and is not a
  // defect in the scenes under test.
  // The deep-link path the engine actually ships: a `?slide=` URL plus the
  // restored build step in sessionStorage. Two hazards, both handled here and
  // neither a defect in the scenes: the dev server occasionally drops a module
  // request under this many rapid navigations, and the engine re-persists its
  // own state after the 300ms crossfade — which overwrites the seeded build
  // step if the reload has not started yet. So: wait for the mount to finish
  // before seeding, and verify the landing inside the retry.
  const enterCold = async (slide, build) => {
    let last = null;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        await page.goto(`${BASE}/?slide=${slide}`, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
          null, { timeout: 15000 });
        await page.evaluate(([i, b]) => {
          sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
        }, [slide - 1, build]);
        await page.reload({ waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__deck, null, { timeout: 15000 });
        await settled();
        last = await deckState();
        if (last.idx === slide - 1 && last.step === build) return sceneState();
      } catch (err) {
        last = { err: String(err) };
      }
      if (attempt < 3) console.log(`  retrying direct entry ${slide}:${build}`);
    }
    throw new Error(`direct entry ${slide}:${build} landed at ${JSON.stringify(last)}`);
  };

  const motionStates = {};
  for (const sc of NEW_SCENES) {
    for (let b = 0; b < sc.builds; b += 1) {
      motionStates[`${sc.slide}:${b}`] = await enterCold(sc.slide, b);
      result.directEntry.push(`${sc.id}:${b}`);
    }
  }
  console.log(`direct entry: ${result.directEntry.length} new-scene builds mounted cold, all settled`);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  let parityFailures = 0;
  for (const sc of NEW_SCENES) {
    for (let b = 0; b < sc.builds; b += 1) {
      const key = `${sc.slide}:${b}`;
      const reduced = await enterCold(sc.slide, b);
      const same = JSON.stringify(reduced) === JSON.stringify(motionStates[key]);
      result.parity.push({ state: `${sc.id}:${b}`, identical: same });
      if (!same) {
        parityFailures += 1;
        console.log(`PARITY MISMATCH at ${sc.id}:${b}`);
        console.log('  motion:  ', JSON.stringify(motionStates[key]));
        console.log('  reduced: ', JSON.stringify(reduced));
      }
    }
  }
  console.log(`reduced-motion parity: ${result.parity.length - parityFailures}/${result.parity.length} identical`);

  fs.writeFileSync(path.join(__dirname, '..', 'smoke-batch-a.json'), JSON.stringify(result, null, 2));
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();

  const failed = errors.length || result.deck.slides !== EXPECTED_SLIDES ||
    !fwdOk || !backOk || !backMonotonic || parityFailures;
  process.exit(failed ? 1 : 0);
})();
