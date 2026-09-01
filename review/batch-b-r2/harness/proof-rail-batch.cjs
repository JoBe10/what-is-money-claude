// Act II rail implementation — THE BATCH LANDED-STATE PROOF
// (docs/act-2-rail-impl-brief.md §3).
//
// One claim, made checkable, over the whole act: EVERY SETTLED STATE OF ACT II
// IS ITS APPROVED r2 CELL. Thirty-three states — Session 1's eighteen and
// Session 2's fifteen — each mounted cold through the real engine in the deck
// (Act II is spliced at slides 6–11) at 1920×1080 and compared per pixel
// against the archived cell PNG, and against a fresh render of that cell
// through its own builder.
//
// THIRTY-THREE IS THE SHEET'S OWN ARITHMETIC, and it is worth stating because
// the brief projected nineteen for this session before the sheet's carried set
// was counted against it. The sheet is 39 cells; 6 of them are CARRIED
// byte-identical from the states sheet — the five elimination interiors and
// the palladium bar — and a carried cell holds its overlay WITHOUT the rail
// the film keeps deep-dimmed beneath it, so no deck frame can equal one. That
// leaves 33 rendered cells: 18 in Scenes 5–7, 15 in Scenes 8–10. Nothing is
// skipped; the six that cannot be compared are named in the record below.
//
// THREE COMPARISONS PER STATE, because they answer three different questions:
//   scene vs archived cell   — THE CLAIM: what ships is what he approved. This
//                              one has to be zero everywhere, always.
//   fresh cell vs archived   — the CONTROL: the sheet is still what its
//                              builders draw. This is what caught the
//                              capture's page-reuse artifact in s7-b1, s7-b2
//                              and s7-b3 at Session 1, and it is the reason
//                              the control exists at all.
//   scene vs fresh cell      — the scene reproduces the builder exactly.
//
// A CONTROL that drifts is not a deck failure, and it is not waved through
// either: it is DECLARED, by cell and by measured size, in KNOWN_CONTROL_DRIFT
// below. Anything not on that list fails the run. One cell is on it — the
// palladium overlay's interior, `s10-b3`, which differs from its own archived
// bytes by 69 pixels at a maximum channel delta of 20, reproducibly, in every
// run since the r2 session. The deck matches the ARCHIVE on that cell at zero
// pixels; it is the sheet's own re-render that no longer lands on the bytes it
// shipped. Session 1 found it, left the approved bytes alone, and flagged it;
// this session confirms it is stable and carries the declaration forward.
//
// THE CONTROL RENDERS UNDER THE CAPTURE'S OWN CONDITIONS — one browser, a
// fresh page per cell — because that is the only way its question means
// anything. Its question is "does the sheet still draw the bytes it shipped",
// and the sheet shipped them from exactly that setup. Rendering the control in
// a COLD browser instead was tried and rejected here: the two ported charts
// (`s8-b4`, `s10-b3`) rasterize their many sub-pixel SVG paths differently on
// a cold start, so a cold control invents drift that the capture never had.
//
// A differing pixel is one whose max channel delta exceeds 2/255 (below that
// is rasterizer noise on a black stage). ANY differing pixel fails.
//
// WHAT IS NOT HERE, and why. Six states hold a carried cell's overlay over a
// rail the carried cell does not contain: Scene 6's beats 3–7 (the elimination
// interiors, the legacy `ElementGrid`'s own waves) and Scene 10's beat 4 (the
// palladium bar inside the ported frame). Their overlay content is the
// approved cell's, untouched — what the deck adds beneath them is the record,
// deep-dimmed, exactly as it is at the seam beats on either side. They are
// judged by the eleven-question scene test and by the presenter's act viewing.
//
// Two of the thirty-three are not builds: the return seams the sheet records
// as "not itself a mapped beat" — `s6-b9-return` and `s8-b4-return`, the rail
// coming back with the overlay's answer landed — so the harness applies them
// by name through the stage's one affordance.
//
// Usage: node proof-rail-batch.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const REPO = path.join(__dirname, '..', '..', '..');
const CELLS = path.join(REPO, 'review', 'act-2', 'rail');

// [deck slide index (0-based), build, cell id, applyAs?]
// Act II sits at deck indices 5–10: Scene 5 = 5, Scene 6 = 6, Scene 7 = 7.
const STATES = [
  [5, 0, 's5-b1'], [5, 1, 's5-b2'], [5, 2, 's5-b3'], [5, 3, 's5-b4'],
  [5, 4, 's5-b5'], [5, 5, 's5-b6'], [5, 6, 's5-b7'], [5, 7, 's5-b8'],
  [6, 0, 's6-b1'], [6, 1, 's6-b2'], [6, 7, 's6-b8'], [6, 8, 's6-b9'],
  [6, 8, 's6-b9-return', ['scarcity-in-matter', 9]],
  [7, 0, 's7-b1'], [7, 1, 's7-b2'], [7, 2, 's7-b3'], [7, 3, 's7-b4'], [7, 4, 's7-b5'],
  [8, 0, 's8-b1'], [8, 1, 's8-b2'], [8, 2, 's8-b3'], [8, 3, 's8-b4'], [8, 4, 's8-b5'],
  [8, 4, 's8-b4-return', ['money-becomes-information', 5]],
  [9, 0, 's9-b1'], [9, 1, 's9-b2'], [9, 2, 's9-b3'], [9, 3, 's9-b4'], [9, 4, 's9-b5'],
  [10, 0, 's10-b1'], [10, 1, 's10-b2'], [10, 2, 's10-b3'], [10, 4, 's10-b5']
];

// Declared control baselines: cell → the measured drift it is allowed, and
// the record that declares it. Anything else drifting fails the run.
const KNOWN_CONTROL_DRIFT = {
  's10-b3': {
    pixels: 69, maxDelta: 20,
    note: 'the palladium overlay’s interior — the sheet’s re-render no longer lands on its own archived bytes; reproducible in every run since the r2 session, unaffected by the page-per-cell capture fix. The deck matches the ARCHIVE at zero pixels. Recorded at docs/act-2-rail-impl-1-report.md §7.5 and carried forward here.'
  }
};

const SEED_SCRIPT = () => {
  const SEED = 0x2545F491;
  let s = SEED >>> 0;
  Math.random = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  let page;
  const freshPage = async () => {
    if (page) await page.close();
    page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.addInitScript(SEED_SCRIPT);
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
  };
  const ready = async () => {
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
    });
  };
  const settled = async () => {
    await page.waitForFunction(() => {
      if (window.__deck && window.__deck.transitioning) return false;
      const a = window.__act2;
      if (a && !a.settled()) return false;
      return document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 40000 });
  };

  // ---- pass 1 · every cell, freshly rendered through its own builder --------
  //
  // One page per cell, for the reason the capture now uses one page per cell:
  // a reused page does not always rasterize the same image the same way.
  const cellShots = {};
  const ids = [...new Set(STATES.map(([, , id]) => id))];
  for (const id of ids) {
    await freshPage();
    await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(async () => {
      window.__rail = await import('/review/act-2/harness/rail.mjs');
    });
    await page.evaluate((cellId) => window.__rail.buildCell(cellId), id);
    await ready();
    await page.waitForTimeout(400);
    cellShots[id] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log(`cell   ${id}`);
  }

  // ---- pass 2 · the scenes cold at every state, through the real engine -----
  const sceneShots = {};
  for (const [slide, build, id, applyAs] of STATES) {
    await freshPage();
    // The engine reads the URL first and sessionStorage second, taking the
    // build step from storage only when the two name the same slide.
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(([i, b]) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
    }, [slide, build]);
    await page.goto(`${BASE}/?slide=${slide + 1}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
    const at = await page.evaluate(() => ({ i: window.__deck.index, b: window.__deck.buildStep }));
    if (at.i !== slide || at.b !== build) {
      throw new Error(`the route landed at ${at.i}:${at.b}, expected ${slide}:${build}`);
    }
    if (applyAs) {
      await page.evaluate(([s, b]) => window.__act2.apply(s, b), applyAs);
    }
    await ready();
    await settled();
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForFunction(() => {
      const c = document.querySelector('.deck-chrome');
      return !c || getComputedStyle(c).opacity === '0';
    }, null, { timeout: 15000 });
    await page.waitForTimeout(150);
    sceneShots[id] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log(`scene  ${String(slide)}:${String(build).padStart(2)}  ${id}`);
  }

  // ---- pass 3 · the pixel comparisons --------------------------------------
  await freshPage();
  await page.goto('about:blank');
  const diff = (bufA, bufB) => page.evaluate(async ([a, b]) => {
    const load = (src) => new Promise((res, rej) => {
      const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src;
    });
    const [ia, ib] = await Promise.all([load(a), load(b)]);
    const c = document.createElement('canvas'); c.width = 1920; c.height = 1080;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(ia, 0, 0);
    const da = ctx.getImageData(0, 0, 1920, 1080).data;
    ctx.clearRect(0, 0, 1920, 1080);
    ctx.drawImage(ib, 0, 0);
    const db = ctx.getImageData(0, 0, 1920, 1080).data;
    let diffPixels = 0; let maxDelta = 0;
    for (let p = 0; p < da.length; p += 4) {
      const d = Math.max(Math.abs(da[p] - db[p]), Math.abs(da[p + 1] - db[p + 1]), Math.abs(da[p + 2] - db[p + 2]));
      if (d > maxDelta) maxDelta = d;
      if (d > 2) diffPixels += 1;
    }
    return { diffPixels, maxDelta };
  }, [`data:image/png;base64,${bufA.toString('base64')}`, `data:image/png;base64,${bufB.toString('base64')}`]);

  const results = [];
  let failures = 0;
  for (const [slide, build, id, applyAs] of STATES) {
    const archived = fs.readFileSync(path.join(CELLS, `${id}.png`));
    const sceneVsArchive = await diff(sceneShots[id], archived);
    const cellVsArchive = await diff(cellShots[id], archived);
    const sceneVsCell = await diff(sceneShots[id], cellShots[id]);
    // THE CLAIM must be zero. A control drift is a failure unless it is the
    // declared one, and even then it is reported, never hidden.
    const declared = KNOWN_CONTROL_DRIFT[id];
    const controlOk = cellVsArchive.diffPixels === 0
      || (declared && cellVsArchive.diffPixels <= declared.pixels
        && cellVsArchive.maxDelta <= declared.maxDelta);
    const claimOk = sceneVsArchive.diffPixels === 0;
    const pass = claimOk && controlOk;
    if (!pass) failures += 1;
    results.push({
      state: applyAs ? `${slide}:${build} → ${applyAs.join(':')}` : `${slide}:${build}`,
      cell: id, sceneVsArchive, cellVsArchive, sceneVsCell,
      claimOk, controlDeclared: Boolean(declared && cellVsArchive.diffPixels > 0), pass
    });
    const tag = !pass ? 'FAIL  ' : (declared && cellVsArchive.diffPixels > 0 ? 'MATCH*' : 'MATCH ');
    console.log(`${tag} ${id.padEnd(14)} scene↔archive ${String(sceneVsArchive.diffPixels).padStart(7)}` +
      `  cell↔archive ${String(cellVsArchive.diffPixels).padStart(7)}` +
      `  scene↔cell ${String(sceneVsCell.diffPixels).padStart(7)}`);
    if (!pass) {
      fs.writeFileSync(path.join(__dirname, `proof-fail-${id}-scene.png`), sceneShots[id]);
      fs.writeFileSync(path.join(__dirname, `proof-fail-${id}-cell.png`), cellShots[id]);
    }
  }

  fs.mkdirSync(path.join(__dirname, '..'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, '..', 'landed-proof-batch.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'batch-b-r2',
    authority: 'review/act-2/rail/states.json — approval, approvedSet (presenter-approved in full, 1 September 2026)',
    rule: 'each of the 33 settled rail states of Act II, mounted cold through the real engine in the deck at 1920×1080, is its approved r2 cell at zero differing pixels (channel delta > 2/255 counts). Comparisons: scene↔archived cell, fresh cell↔archived cell, scene↔fresh cell.',
    notCovered: 'S6 beats 3–7 — the elimination interiors the sheet carries byte-identical from the states sheet, which show the overlay without the rail the deck holds beneath it. Their content is the legacy ElementGrid\'s own waves, untouched.',
    knownControlDrift: KNOWN_CONTROL_DRIFT,
    states: results.length,
    deckProven: results.filter((r) => r.claimOk).length,
    passed: results.length - failures,
    results,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${results.length - failures}/${results.length} states proven`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(failures || errors.length ? 1 : 0);
})();
