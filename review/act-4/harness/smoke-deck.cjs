// Act IV states — the deck smoke (the Act IV kickoff brief, Session 2:
// "boot smoke, zero deck impact") plus the splice's boundary proof (the
// presenter's ruling of 3 Sep 2026: 3-08-waypoint-judge leaves the deck).
//
//   1. Boot: the deck boots 38 slides (was 39) in the spliced order — the
//      function section at two survivors, ideal-store at nineteen — with 0
//      console errors.
//   2. The retirement: the retired id is absent from the running deck, and
//      its deep link falls back to the first slide, exactly as the engine
//      treats any unknown id.
//   3. The new boundary, both ways: from 3-04-stage-signatures at build 0,
//      advancing through its two builds and once more lands on
//      4-01-define-the-job at build 0. Backward, the engine's own rule
//      outside a scene group (SlideEngine.retreat): ← enters the previous
//      slide at build 0, and ↑ (retreatStep, forced) is the jump-to-end key
//      — so from 4-01 at build 0, ← lands on 3-04 b0 and ↑ lands on 3-04 at
//      its last build. Both are proven, as the engine defines them.
//   4. The act's exit is unchanged: one advance from the-tower at its last
//      build lands on 3-00-waypoint-function at build 0.
//
// State, not pixels: rasters are served as a 1×1 so the walk cannot exhaust
// the renderer. Nothing else is asserted — adding unrequested checks is a
// defect in a FAST session, same as skipping requested ones.
//
// Usage: node smoke-deck.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;

const EXPECTED_SLIDES = 38;
const WAS_SLIDES = 39;
const RETIRED_ID = '3-08-waypoint-judge';
const BEFORE_ID = '3-04-stage-signatures';
const AFTER_ID = '4-01-define-the-job';
const TOWER_ID = 'the-tower';
const EXIT_ID = '3-00-waypoint-function';

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const fails = [];
  const result = {
    date: new Date().toISOString(),
    session: 'act-4-states',
    expectedSlides: EXPECTED_SLIDES,
    wasSlides: WAS_SLIDES,
    retired: RETIRED_ID,
    deck: null, retirement: null, boundary: null, exit: null,
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
  const open = async (query) => {
    await page.goto(`${BASE}/${query}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck && !window.__deck.transitioning, null, { timeout: 30000 });
    await settled();
  };
  const advance = async () => { await page.evaluate(() => window.__deck.advance()); await settled(); };
  const retreat = async () => { await page.evaluate(() => window.__deck.retreat()); await settled(); };

  // ---- 1 · boot ----
  await open('');
  result.deck = await page.evaluate(() => ({
    slides: window.__deck.slides.length,
    firstId: window.__deck.slides[0].id,
    ids: window.__deck.slides.map((s) => s.id),
    sections: window.__deck.sections.map((s) => `${s.id}:${s.slides.length}`)
  }));
  note(`boot: ${result.deck.slides} slides (was ${WAS_SLIDES})`, result.deck.slides === EXPECTED_SLIDES,
    result.deck.sections.join(' · '));
  const fn = result.deck.sections.find((s) => s.startsWith('function:'));
  note('boot: the function section keeps two survivors (3-00, 3-04)', fn === 'function:2', fn);

  // ---- 2 · the retirement ----
  {
    const absent = !result.deck.ids.includes(RETIRED_ID);
    await open(`?slide=${RETIRED_ID}`);
    const landed = await deckState();
    const fallback = landed.idx === 0 && landed.step === 0;
    result.retirement = { absent, deepLink: landed, fallbackToFirst: fallback };
    note(`retirement: ${RETIRED_ID} is absent from the running deck`, absent);
    note(`retirement: its deep link falls back to the first slide (the engine's rule for any unknown id)`,
      fallback, `${landed.id}:${landed.step}`);
  }

  // ---- 3 · the new boundary, both ways ----
  {
    await open(`?slide=${BEFORE_ID}`);
    const start = await deckState();
    const builds = await page.evaluate((id) =>
      window.__deck.slides.find((s) => s.id === id).totalBuildSteps, BEFORE_ID);
    const seen = [start];
    for (let i = 0; i < builds; i += 1) { await advance(); seen.push(await deckState()); }
    const atLast = seen[seen.length - 1];
    await advance();
    const crossed = await deckState();
    const forwardOk = start.id === BEFORE_ID && start.step === 0 &&
      atLast.id === BEFORE_ID && atLast.step === builds &&
      crossed.id === AFTER_ID && crossed.step === 0;
    note(`boundary: ${BEFORE_ID} b0 → through ${builds} builds → one advance lands on ${AFTER_ID} b0`,
      forwardOk, `${atLast.id}:${atLast.step} → ${crossed.id}:${crossed.step}`);

    // ← : the deck-wide convention outside a scene group — the previous
    // slide at build 0 (3-04 and 4-01 share no sceneGroup).
    await open(`?slide=${AFTER_ID}`);
    const from = await deckState();
    await retreat();
    const back = await deckState();
    const arrowOk = from.id === AFTER_ID && from.step === 0 &&
      back.id === BEFORE_ID && back.step === 0;
    note(`boundary: ← from ${AFTER_ID} b0 lands on ${BEFORE_ID} b0 (the engine's rule outside a scene group)`,
      arrowOk, `${from.id}:${from.step} → ${back.id}:${back.step}`);
    // ↑ : the jump-to-end key — the previous slide at its last build.
    await open(`?slide=${AFTER_ID}`);
    const from2 = await deckState();
    await page.evaluate(() => window.__deck.retreatStep(true));
    await settled();
    const back2 = await deckState();
    const jumpOk = from2.id === AFTER_ID && from2.step === 0 &&
      back2.id === BEFORE_ID && back2.step === builds;
    note(`boundary: ↑ from ${AFTER_ID} b0 lands on ${BEFORE_ID} at its last build (b${builds}) — the jump-to-end key`,
      jumpOk, `${from2.id}:${from2.step} → ${back2.id}:${back2.step}`);
    result.boundary = { before: BEFORE_ID, after: AFTER_ID, beforeBuilds: builds,
      forward: seen.concat([crossed]), forwardOk,
      backwardArrow: [from, back], backwardArrowOk: arrowOk,
      backwardJump: [from2, back2], backwardJumpOk: jumpOk };
  }

  // ---- 4 · the act's exit, unchanged ----
  {
    await open(`?slide=${TOWER_ID}`);
    const builds = await page.evaluate((id) =>
      window.__deck.slides.find((s) => s.id === id).totalBuildSteps, TOWER_ID);
    for (let i = 0; i < builds; i += 1) await advance();
    const last = await deckState();
    await advance();
    const next = await deckState();
    const ok = last.id === TOWER_ID && last.step === builds && next.id === EXIT_ID && next.step === 0;
    result.exit = { last, next, ok };
    note(`exit: one advance from ${TOWER_ID} b${builds} lands on ${EXIT_ID} b0 — the act's exit is unchanged`,
      ok, `${last.id}:${last.step} → ${next.id}:${next.step}`);
  }

  note(`console: ${errors.length} errors across every run`, errors.length === 0);
  errors.forEach((e) => console.log('ERR', e));

  result.pass = fails.length === 0;
  fs.writeFileSync(path.join(__dirname, '..', 'smoke-deck.json'), JSON.stringify(result, null, 2));
  await browser.close();
  console.log(`\n${fails.length ? `${fails.length} FAILURES` : 'the deck smoke is green'}`);
  process.exit(fails.length ? 1 : 0);
})();
