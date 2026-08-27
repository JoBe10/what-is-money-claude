// Prototype Gate 2 — FAST-scope smoke (docs/gate-2-r2-brief.md §5).
//
// Four proofs, one run:
//   1. Deck boot: 45 slides, 0 console errors — the scratch route cost the
//      deck nothing.
//   2. Traversal: ?proto=gate2 walks all 19 builds forward and back, and the
//      (slide, build) sequence is exactly the beat order in both directions.
//   3. Direct entry: every one of the 19 builds mounted cold (URL + restored
//      build step, the engine's own deep-link path) settles into a state.
//   4. Reduced-motion parity: the same 19 cold entries under
//      prefers-reduced-motion serialize IDENTICALLY to the settled motion-on
//      states — the scene contract's parity clause checked mechanically, not
//      by eye (the serializer is window.__gate2.state()).
//
// Usage: node smoke-gate2.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;

// (1-based slide, beats) in route order — S2 = 5, S3 = 9 (R1), S4 = 5.
const SCENES = [[1, 5], [2, 9], [3, 5]];

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const result = { deck: null, traversal: null, directEntry: [], parity: [], consoleErrors: errors };
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  // This smoke asserts state, not pixels. The register's renders are a couple
  // of megabytes each, and forty navigations of them exhaust the renderer —
  // ERR_INSUFFICIENT_RESOURCES flakes that have nothing to do with the
  // prototype. Serve every raster as a 1×1 in this run; the capture harness
  // loads the real ones.
  const TINY_PNG = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64');
  await page.route('**/*.png', (route) => route.fulfill({ contentType: 'image/png', body: TINY_PNG }));

  const settled = async () => {
    await page.waitForFunction(() => window.__gate2 && window.__gate2.settled(), null, { timeout: 30000 });
    await page.waitForTimeout(120);
  };
  const deckState = () => page.evaluate(() => ({
    idx: window.__deck.index, step: window.__deck.buildStep
  }));

  // ---- 1 · deck boot: zero deck impact ----
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  result.deck = await page.evaluate(() => ({
    slides: window.__deck.slides.length,
    firstId: window.__deck.slides[0].id
  }));
  console.log(`deck boots: ${result.deck.slides} slides, first ${result.deck.firstId}`);

  // ---- 2 · traversal, forward and backward ----
  await page.goto(`${BASE}/?proto=gate2`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck && window.__gate2, null, { timeout: 30000 });
  await settled();

  const expected = [];
  SCENES.forEach(([slide, beats]) => {
    for (let b = 0; b < beats; b += 1) expected.push([slide - 1, b]);
  });

  const seen = [await deckState()];
  for (let i = 1; i < expected.length; i += 1) {
    await page.evaluate(() => window.__deck.advance());
    await settled();
    seen.push(await deckState());
  }
  const fwdOk = seen.every((s, i) => s.idx === expected[i][0] && s.step === expected[i][1]);

  const seenBack = [];
  for (let i = expected.length - 2; i >= 0; i -= 1) {
    await page.evaluate(() => window.__deck.retreat());
    await settled();
    seenBack.push(await deckState());
  }
  const backExpected = expected.slice(0, -1).reverse();
  const backOk = seenBack.every((s, i) => s.idx === backExpected[i][0] && s.step === backExpected[i][1]);
  result.traversal = { forward: fwdOk, backward: backOk, states: expected.length };
  console.log(`traversal: forward ${fwdOk ? 'ok' : 'WRONG'}, backward ${backOk ? 'ok' : 'WRONG'} (${expected.length} states)`);

  // ---- 3 + 4 · direct entry at every build, then reduced-motion parity ----
  // One retry per state: the dev server occasionally drops a module request
  // under forty rapid navigations, which stalls main.js and is not a defect in
  // the prototype under test.
  const enterCold = async (slide, build) => {
    for (let attempt = 1; ; attempt += 1) {
      try {
        await page.goto(`${BASE}/?proto=gate2&slide=${slide}`, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__deck, null, { timeout: 15000 });
        await page.evaluate(([i, b]) => {
          sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
        }, [slide - 1, build]);
        await page.reload({ waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__deck && window.__gate2, null, { timeout: 15000 });
        await settled();
        break;
      } catch (err) {
        if (attempt >= 2) throw err;
        console.log(`  retrying direct entry ${slide}:${build} (stalled load)`);
      }
    }
    const st = await deckState();
    if (st.idx !== slide - 1 || st.step !== build) {
      throw new Error(`direct entry ${slide}:${build} landed at ${st.idx + 1}:${st.step}`);
    }
    return page.evaluate(() => window.__gate2.state());
  };

  const motionStates = {};
  for (const [slide, beats] of SCENES) {
    for (let b = 0; b < beats; b += 1) {
      motionStates[`${slide}:${b}`] = await enterCold(slide, b);
      result.directEntry.push(`${slide}:${b}`);
    }
  }
  console.log(`direct entry: ${result.directEntry.length} builds mounted cold, all settled`);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  let parityFailures = 0;
  for (const [slide, beats] of SCENES) {
    for (let b = 0; b < beats; b += 1) {
      const key = `${slide}:${b}`;
      const reduced = await enterCold(slide, b);
      const same = JSON.stringify(reduced) === JSON.stringify(motionStates[key]);
      result.parity.push({ state: key, identical: same });
      if (!same) {
        parityFailures += 1;
        console.log(`PARITY MISMATCH at ${key}`);
        console.log('  motion:  ', JSON.stringify(motionStates[key]));
        console.log('  reduced: ', JSON.stringify(reduced));
      }
    }
  }
  console.log(`reduced-motion parity: ${result.parity.length - parityFailures}/${result.parity.length} identical`);

  fs.writeFileSync(path.join(__dirname, 'smoke-gate2.json'), JSON.stringify(result, null, 2));
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();

  const failed = errors.length || result.deck.slides !== 45 || !fwdOk || !backOk || parityFailures;
  process.exit(failed ? 1 : 0);
})();
