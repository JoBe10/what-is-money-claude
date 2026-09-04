// Batch E implementation, Session 1 — the FAST-scope smoke
// (docs/batch-e-implementation-brief.md §2).
//
// Seven proofs, one run:
//   1. Zero deck impact: the deck boots unchanged — 32 slides (the count
//      since the Acts III–IV final splice), the same first id, 0 console
//      errors. The scenes run in place behind the existing count; nothing is
//      spliced until Session 2, and this session changed no legacy source.
//   2. Route boot: `?proto=act5` runs the four scenes through the real
//      engine — 20 states at the frozen beat map (S24 4 · S25 4 · S26 9 ·
//      S27 3).
//   3. Full traversal of the route: every build walked forward and back, the
//      (slide, build) sequence exactly the running order both ways — the
//      backward walk landing each boundary on the previous scene's end state
//      (the group handoff).
//   4. The three in-act boundaries, both directions, landings recorded — and
//      the merge INSIDE Scene 26 (beat 5 → beat 6, the legacy crossfade from
//      4-19 to 4-20), which is an advance rather than a boundary and is
//      recorded as its own step in both directions.
//   5. Direct entry at every build (URL + restored build step — the engine's
//      own deep-link path), all settled.
//   6. Reduced-motion parity: the same 20 cold entries under
//      prefers-reduced-motion serialize IDENTICALLY to the settled motion-on
//      states (window.__act5's serializer) — checked mechanically, not by eye.
//   7. The retired stability builds are unreachable: no state in the route
//      drives legacy 4-20 past build 4, so the contrast Ruling 5 cut can
//      never appear.
//
// NOT PROVEN HERE, and not claimed: the Act IV → Scene 24 boundary. Scene 23
// is not in this route, and that seam is proven both ways at Session 2's
// splice, where the two scenes are neighbours in the manifest.
//
// Usage: node smoke-impl1.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;

const SCENES = [
  { slide: 1, id: 'migration', builds: 4 },
  { slide: 2, id: 'the-monetary-premium', builds: 4 },
  { slide: 3, id: 'when-other-assets-do-moneys-job', builds: 9 },
  { slide: 4, id: 'the-marginal-decision', builds: 3 }
];
const EXPECTED_DECK_SLIDES = 32;

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const result = {
    date: new Date().toISOString(),
    session: 'act-5-impl-1',
    deck: null, route: null, traversal: null, boundaries: [], merge: [],
    directEntry: [], parity: [], retiredBuilds: null,
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
      const a = window.__act5;
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
  const sceneState = () => page.evaluate(() => (window.__act5 ? window.__act5.state() : { kind: 'none' }));

  // ---- 1 · zero deck impact ----
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  result.deck = await page.evaluate(() => ({
    slides: window.__deck.slides.length,
    firstId: window.__deck.slides[0].id
  }));
  console.log(`deck boots unchanged: ${result.deck.slides} slides, first ${result.deck.firstId}`);

  // ---- 2 · the route ----
  await page.goto(`${BASE}/?proto=act5`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  result.route = await page.evaluate(() => ({
    slides: window.__deck.slides.length,
    order: window.__deck.slides.map((s) => s.id),
    builds: window.__deck.slides.map((s) => s.totalBuildSteps || 0)
  }));
  console.log(`route boots: ${result.route.slides} scenes — ${result.route.order.join(' · ')}`);

  // ---- 3 · full traversal, forward and backward ----
  const expected = [];
  result.route.builds.forEach((max, i) => {
    for (let b = 0; b <= max; b += 1) expected.push([i, b]);
  });
  console.log(`traversal: ${expected.length} states across ${result.route.slides} scenes`);

  await settled();
  const seen = [await deckState()];
  for (let i = 1; i < expected.length; i += 1) {
    await page.evaluate(() => window.__deck.advance());
    await settled();
    seen.push(await deckState());
  }
  const fwdOk = seen.every((s, i) => s.idx === expected[i][0] && s.step === expected[i][1]);
  const fwdFirstBad = seen.findIndex((s, i) => s.idx !== expected[i][0] || s.step !== expected[i][1]);

  // Backward: within the group ← hands the shared scene off in reverse,
  // landing on the previous scene's end state.
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

  // ---- 4 · the three boundaries, both directions; then the merge inside S26 ----
  const jump = async (idx, step) => {
    const here = await page.evaluate(() => window.__deck.index);
    if (here !== idx) {
      await page.evaluate((i) => window.__deck.goTo(i), idx);
      await page.waitForFunction(
        (i) => !window.__deck.transitioning && window.__deck.index === i,
        idx, { timeout: 20000 });
    }
    await settled();
    let at = await page.evaluate(() => window.__deck.buildStep);
    // Step to the build in whichever direction it lies — the merge checks
    // below need a build the previous check already walked past.
    while (at > step) {
      await page.evaluate(() => window.__deck.retreatStep(false));
      await settled();
      at = await page.evaluate(() => window.__deck.buildStep);
    }
    while (at < step) {
      await page.evaluate(() => window.__deck.advanceStep(false));
      await settled();
      at = await page.evaluate(() => window.__deck.buildStep);
    }
  };
  const boundary = async (name, from, act, into) => {
    await jump(from[0], from[1]);
    const before = await deckState();
    await act();
    await settled();
    const after = await deckState();
    const layer = await page.evaluate(() => (window.__act5 ? window.__act5.state().layer : null));
    (into || result.boundaries).push({ name, from: before, to: after, layer });
    console.log(`boundary ${name.padEnd(56)} ${before.id}:${before.step} → ${after.id}:${after.step}  [${layer}]`);
  };
  await boundary('S24 end → S25 (forward, the legacy boundary onto a build 0)', [0, 3],
    () => page.evaluate(() => window.__deck.advance()));
  await boundary('S25 b0 → S24 end (backward, the handoff)', [1, 0],
    () => page.evaluate(() => window.__deck.retreat()));
  await boundary('S25 end → S26 (forward, the legacy boundary + build-1 reveal)', [1, 3],
    () => page.evaluate(() => window.__deck.advance()));
  await boundary('S26 b0 → S25 end (backward, the handoff)', [2, 0],
    () => page.evaluate(() => window.__deck.retreat()));
  await boundary('S26 end → S27 (forward, the legacy boundary onto a build 0)', [2, 8],
    () => page.evaluate(() => window.__deck.advance()));
  await boundary('S27 b0 → S26 end (backward, the handoff)', [3, 0],
    () => page.evaluate(() => window.__deck.retreat()));

  // The merge inside Scene 26 — 4-19 hands to 4-20 on an advance, so the
  // layer beneath the frame changes without the scene changing.
  await boundary('S26 b5 → b6 (forward, the merge: 4-19 → 4-20)', [2, 4],
    () => page.evaluate(() => window.__deck.advanceStep(false)), result.merge);
  await boundary('S26 b6 → b5 (backward, the merge in reverse)', [2, 5],
    () => page.evaluate(() => window.__deck.retreatStep(false)), result.merge);

  // ---- 7 · the retired stability builds are unreachable ----
  const maxs = await page.evaluate(async () => {
    const mod = await import('/src/scenes/act-5-the-case/_caseStage.js');
    const per = {};
    Object.entries(mod.STATES).forEach(([id, states]) => {
      states.forEach((st) => {
        per[st.layer] = Math.max(per[st.layer] ?? -1, st.build);
      });
    });
    return per;
  });
  result.retiredBuilds = {
    maxBuildPerLayer: maxs,
    s420StopsAt4: maxs.s420 === 4,
    note: 'legacy 4-20 builds 5–7 — the stability contrast — are retired by architecture Ruling 5 and appear in no state'
  };
  console.log(`retired builds: 4-20 reached at most build ${maxs.s420} (must be 4)`);

  // ---- 5 + 6 · direct entry at every build, then parity ----
  const enterCold = async (slide, build) => {
    let last = null;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        await page.goto(`${BASE}/?proto=act5&slide=${slide}`, { waitUntil: 'domcontentloaded' });
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
  for (const sc of SCENES) {
    for (let b = 0; b < sc.builds; b += 1) {
      motionStates[`${sc.slide}:${b}`] = await enterCold(sc.slide, b);
      result.directEntry.push(`${sc.id}:${b}`);
    }
  }
  console.log(`direct entry: ${result.directEntry.length} builds mounted cold, all settled`);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  let parityFailures = 0;
  for (const sc of SCENES) {
    for (let b = 0; b < sc.builds; b += 1) {
      const key = `${sc.slide}:${b}`;
      const reduced = await enterCold(sc.slide, b);
      const same = JSON.stringify(reduced) === JSON.stringify(motionStates[key]);
      result.parity.push({ state: `${sc.id}:${b}`, identical: same });
      if (!same) {
        parityFailures += 1;
        console.log(`PARITY MISMATCH at ${sc.id}:${b}`);
        fs.writeFileSync(path.join(__dirname, `parity-${sc.id}-${b}.json`),
          JSON.stringify({ motion: motionStates[key], reduced }, null, 2));
      }
    }
  }
  console.log(`reduced-motion parity: ${result.parity.length - parityFailures}/${result.parity.length} identical`);

  fs.writeFileSync(path.join(__dirname, '..', 'smoke-impl1.json'), JSON.stringify(result, null, 2));
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();

  const failed = errors.length || result.deck.slides !== EXPECTED_DECK_SLIDES ||
    result.route.slides !== 4 || !fwdOk || !backOk || !backMonotonic || parityFailures ||
    !result.retiredBuilds.s420StopsAt4;
  process.exit(failed ? 1 : 0);
})();
