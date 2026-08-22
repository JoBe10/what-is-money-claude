// R2.1 verification suite (revision brief §G.1–§G.3, §G.6–§G.7).
// Usage: node verify-r2-1.cjs [--rm] [--part=traversal|direct]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { probeInPage, symmetryProbeInPage, CAMERA } = require('./probes-r2-1.cjs');

const BASE = 'http://localhost:4310';
const OUT = path.join(__dirname, '..');
const SHOTS = path.join(OUT, 'screenshots-r2-1');
const REDUCED = process.argv.includes('--rm');
const PART = (process.argv.find((a) => a.startsWith('--part')) || '--part=all').split('=')[1];

// Changed slides under probe: [id, totalBuildSteps, 1-based slide number].
const CHANGED = [
  ['1-01-eighty-thousand-hours', 2, 1],
  ['1-02-the-conversion', 3, 2],
  ['1-05-the-promise', 6, 5],
  ['2-01-the-world-without-it', 3, 6],
  ['2-02-the-discovery', 4, 7],
  ['2-03-the-convergence', 3, 8],
  ['2-04-the-competition-record', 8, 9],
  ['2-05-two-survivors', 5, 10],
  ['2-06-the-abstraction-ladder', 4, 11],
  ['2-07-the-severance', 4, 12],
  ['2-08-the-pattern', 6, 13]
];
const PROBED = new Set(CHANGED.map(([id]) => id));

// Settle time after a live advance into build b of slide id.
function settleMs(id, b) {
  if (REDUCED) return 500;
  if (id === '1-01-eighty-thousand-hours' && b === 1) return 9600; // the fill
  if (id === '1-02-the-conversion' && b === 1) return 5200;        // the collapse
  if (id === '1-05-the-promise' && b === 6) return 2400;           // the ignition pulse
  if (id === '2-03-the-convergence' && b === 2) return 6600;
  if (id === '2-03-the-convergence') return 2000;
  if (id === '2-01-the-world-without-it' && b === 2) return 4400;
  if (id === '2-01-the-world-without-it' && b === 1) return 2900;
  if (id === '2-02-the-discovery' && b === 1) return 4400; // travel + sequenced return
  if (id === '2-02-the-discovery' && b === 2) return 4400;
  if (id === '2-04-the-competition-record' && b === 6) return 3000; // the line draw
  if (id === '2-04-the-competition-record' && b === 8) return 2300; // camera to metals
  if (id === '2-05-two-survivors' && b >= 2) return 3100;
  if (id === '2-07-the-severance' && b === 2) return 2600; // the cut → fiat
  if (id === '2-07-the-severance') return 2400;
  if (id === '2-08-the-pattern') return 2300;
  if (id === '2-06-the-abstraction-ladder') return 1400;
  return 1300;
}

// Extra settle after entering a slide fresh (handoff crossfades and entry
// gestures complete inside this).
function entryMs(id) {
  if (REDUCED) return 300;
  if (id.startsWith('2-0') || id.startsWith('1-0')) return 900;
  return 500;
}

const results = [];
const consoleLines = [];
let shotCount = 0;

function record(section, name, ok, detail) {
  results.push({ section, name, ok, detail });
  if (!ok) console.log(`FAIL ${section} :: ${name} :: ${detail}`);
}

(async () => {
  fs.mkdirSync(path.join(SHOTS, 'traversal'), { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    reducedMotion: REDUCED ? 'reduce' : 'no-preference'
  });
  const page = await context.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') {
      consoleLines.push(`[${m.type()}] ${m.text()}`);
    }
  });
  page.on('pageerror', (e) => consoleLines.push(`[pageerror] ${e.message}`));

  const state = () => page.evaluate(() => ({
    idx: window.__deck.index,
    build: window.__deck.buildStep,
    id: window.__deck.slides[window.__deck.index].id,
    total: window.__deck.slides.length,
    containers: document.querySelectorAll('.deck-slide').length,
    active: document.querySelectorAll('.deck-slide[data-active="true"]').length,
    empty: document.querySelector('.deck-slide[data-active="true"]').children.length === 0,
    imagesBroken: Array.from(document.querySelectorAll('.deck-slide img'))
      .filter((i) => !i.complete || i.naturalWidth === 0).length
  }));

  const probe = (id, build) =>
    page.evaluate(probeInPage, { id, build, camera: CAMERA });

  // ---------- 1. Full deck traversal: forward / back / forward ----------
  if (PART === 'traversal' || PART === 'all') {
  await page.goto(`${BASE}/?slide=1`, { waitUntil: 'networkidle' });
  await page.evaluate(() => sessionStorage.clear());
  await page.waitForTimeout(1500);

  let s = await state();
  const TOTAL = s.total;
  record('traversal', 'deck is 47 slides', TOTAL === 47, `total=${TOTAL}`);
  let traversalOk = true;
  let steps = 0;
  while (!(s.idx === TOTAL - 1)) {
    const before = s;
    await page.keyboard.press('ArrowRight');
    steps += 1;
    const probed = PROBED.has(before.id) || PROBED.has(s.id);
    const nextBuild = before.build + 1;
    await page.waitForTimeout(probed ? settleMs(before.id, nextBuild) : 700);
    s = await state();
    if (s.containers !== 1 || s.active !== 1 || s.empty || s.imagesBroken) {
      await page.waitForTimeout(1800);
      s = await state();
    }
    if (s.containers !== 1 || s.active !== 1 || s.empty || s.imagesBroken) {
      traversalOk = false;
      record('traversal', `forward step ${steps} at ${s.id} b${s.build}`,
        false, JSON.stringify(s));
    }
    if (PROBED.has(s.id) && !REDUCED) {
      if (s.id !== before.id) await page.waitForTimeout(entryMs(s.id));
      const r = await probe(s.id, s.build);
      record('traversal-probe', `${s.id} b${s.build}`, r.ok, r.detail);
      await page.screenshot({
        path: path.join(SHOTS, 'traversal', `${String(steps).padStart(3, '0')}-${s.id}-b${s.build}.png`)
      });
      shotCount += 1;
    }
    if (steps > 400) { record('traversal', 'runaway', false, 'too many steps'); break; }
  }
  record('traversal', 'forward pass complete', traversalOk && s.idx === TOTAL - 1,
    `${steps} steps to ${s.id}, ${TOTAL} slides`);

  // The seam into legacy Section 3, still expected clean.
  await page.goto(`${BASE}/?slide=2-08-the-pattern`, { waitUntil: 'networkidle' });
  await page.evaluate(() => sessionStorage.clear());
  await page.waitForTimeout(1200);
  for (let b = 0; b < 7; b += 1) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(REDUCED ? 350 : 900); }
  await page.waitForTimeout(1500);
  s = await state();
  record('traversal', 'seam 2-08 → legacy 3-01', s.id === '3-01-section-opener' && s.imagesBroken === 0 && !s.empty,
    JSON.stringify({ id: s.id, imagesBroken: s.imagesBroken }));
  if (!REDUCED) {
    await page.screenshot({ path: path.join(SHOTS, 'seam-2-08-to-3-01.png') });
  }

  // Backward all the way to slide 1 build 0 (crosses every group boundary
  // in reverse).
  let backSteps = 0;
  s = await state();
  while (!(s.idx === 0 && s.build === 0) && backSteps < 500) {
    await page.keyboard.press('ArrowLeft');
    backSteps += 1;
    await page.waitForTimeout(s.id && PROBED.has(s.id) ? 460 : 380);
    s = await state();
    if (s.containers !== 1 || s.active !== 1 || s.empty) {
      record('traversal', `backward step ${backSteps} at ${s.id} b${s.build}`, false, JSON.stringify(s));
    }
  }
  record('traversal', 'backward pass reaches 1.1 b0', s.idx === 0 && s.build === 0, `${backSteps} steps`);

  // Fast re-forward through Sections 1–2 (exercises animation cancellation
  // and rapid handoffs across every scene-group boundary).
  let fwd = 0;
  while (s.idx < 13 && fwd < 80) {
    await page.keyboard.press('ArrowRight');
    fwd += 1;
    await page.waitForTimeout(140);
    s = await state();
  }
  await page.waitForTimeout(2500);
  s = await state();
  const stale = await page.evaluate(() =>
    document.querySelectorAll('[data-exiting="true"]').length);
  const fastOk = s.containers === 1 && s.active === 1 && !s.empty && stale === 0;
  record('traversal', 'fast re-forward through Sections 1–2', fastOk,
    JSON.stringify({ id: s.id, containers: s.containers, staleOverlays: stale }));
  }

  if (PART === 'direct' || PART === 'all') {
  // ---------- 2. Direct entry at every build (+ screenshots) ----------
  for (const [id, builds, slideNo] of CHANGED) {
    for (let b = 0; b <= builds; b += 1) {
      await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
      await page.evaluate(({ n, k }) => {
        sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
      }, { n: slideNo, k: b });
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForTimeout(id === '2-03-the-convergence' ? 2600 : 1900);
      const st = await state();
      const stOk = st.id === id && st.build === b;
      const r = stOk ? await probe(id, b) : { ok: false, detail: `landed ${st.id} b${st.build}` };
      record(REDUCED ? 'rm-direct-entry' : 'direct-entry', `${id} b${b}`, r.ok, r.detail);
      if (!REDUCED) {
        await page.screenshot({ path: path.join(SHOTS, `${id}-b${b}.png`) });
        shotCount += 1;
      }
    }
  }

  // Symmetry (§G.6): icon-grammar placement rules measured from geometry.
  if (!REDUCED) {
    await page.goto(`${BASE}/?slide=2-02-the-discovery`, { waitUntil: 'networkidle' });
    await page.evaluate(() => sessionStorage.clear());
    await page.waitForTimeout(1500);
    let sym = await page.evaluate(symmetryProbeInPage, 'triad-goods');
    record('symmetry', 'triad: goods on one anchor; labels on one baseline grid', sym.ok, sym.detail);

    // The metals frame holds the whole record with no clamp active — the
    // clean measurement of the stop rhythm.
    await page.goto(`${BASE}/?slide=2-04-the-competition-record`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: 8, buildStep: 8 }));
    });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(1900);
    sym = await page.evaluate(symmetryProbeInPage, 'rail-stops');
    record('symmetry', 'rail stops: glyph/label centered, one rhythm', sym.ok, sym.detail);
  }

  // Named frames (§G.7): the ignition, the line-draw transformation
  // sequence, the FIAT mark in both states, the full-rail pull-back.
  if (!REDUCED) {
    // The first-orange ignition, live.
    await page.goto(`${BASE}/?slide=1-05-the-promise`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: 4, buildStep: 5 }));
    });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(1600);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(2600);
    await page.screenshot({ path: path.join(SHOTS, 'first-orange-waypoint-ignition.png') });
    const ig = await probe('1-05-the-promise', 6);
    record('named-frames', 'first-orange ignition (live, in 1.5)', ig.ok, ig.detail);

    // The line-draw transformation, captured as a sequence.
    await page.goto(`${BASE}/?slide=2-04-the-competition-record`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: 8, buildStep: 5 }));
    });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(1600);
    await page.keyboard.press('ArrowRight');
    for (const [i, wait] of [[0, 200], [1, 500], [2, 600], [3, 700], [4, 900]]) {
      await page.waitForTimeout(wait);
      await page.screenshot({ path: path.join(SHOTS, `line-draw-sequence-${i}.png`) });
      shotCount += 1;
    }
    const ld = await probe('2-04-the-competition-record', 6);
    record('named-frames', 'the line-draw transformation (live)', ld.ok, ld.detail);

    // The FIAT mark in the severance end state, live cut.
    await page.goto(`${BASE}/?slide=2-07-the-severance`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: 11, buildStep: 1 }));
    });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(1600);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(2800);
    await page.screenshot({ path: path.join(SHOTS, 'fiat-severance-end-state.png') });
    const fv = await probe('2-07-the-severance', 2);
    record('named-frames', 'FIAT floating mark, severance end state (live)', fv.ok, fv.detail);

    // The full-rail pull-back with the FIAT mark, live.
    await page.goto(`${BASE}/?slide=2-08-the-pattern`, { waitUntil: 'networkidle' });
    await page.evaluate(() => sessionStorage.clear());
    await page.waitForTimeout(1400);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(2600);
    await page.screenshot({ path: path.join(SHOTS, 'full-rail-pull-back.png') });
    const pb = await probe('2-08-the-pattern', 1);
    record('named-frames', 'full-rail pull-back with FIAT (live)', pb.ok, pb.detail);
  }

  // ---------- 3. Refresh mid-animation ----------
  const midCases = [
    ['2-03-the-convergence', 8, 2, 1800],           // mid-convergence
    ['2-04-the-competition-record', 9, 6, 900],     // mid line-draw
    ['2-05-two-survivors', 10, 3, 700],             // mid corrosion wave
    ['2-07-the-severance', 12, 2, 500]              // mid cut → fiat
  ];
  for (const [id, slideNo, targetBuild, midWait] of midCases) {
    await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => sessionStorage.clear());
    await page.waitForTimeout(1500);
    for (let b = 1; b <= targetBuild; b += 1) {
      await page.keyboard.press('ArrowRight');
      if (b < targetBuild) await page.waitForTimeout(REDUCED ? 400 : settleMs(id, b));
    }
    await page.waitForTimeout(midWait); // stop mid-gesture
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(id === '2-03-the-convergence' ? 2600 : 1900);
    const st = await state();
    const ok = st.id === id && st.build === targetBuild;
    const r = ok ? await probe(id, targetBuild) : { ok: false, detail: `landed ${st.id} b${st.build}` };
    record(REDUCED ? 'rm-mid-refresh' : 'mid-animation-refresh', `${id} b${targetBuild}`, r.ok, r.detail);
  }
  }

  // ---------- 4. Reduced-motion live advance + instant handoffs ----------
  if (REDUCED && (PART === 'direct' || PART === 'all')) {
    for (const [id, builds] of CHANGED) {
      await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => sessionStorage.clear());
      await page.waitForTimeout(900);
      for (let b = 1; b <= builds; b += 1) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(420); // must be fully settled inside this
        const r = await probe(id, b);
        record('rm-live-advance', `${id} b${b} settled ≤420ms`, r.ok, r.detail);
      }
    }
    // Handoffs resolve instantly: cross each group boundary, assert the
    // incoming slide's exact state within 420ms.
    const rmBoundaries = [
      ['1-01-eighty-thousand-hours', 1, 2, '1-02-the-conversion', 0, 'ArrowRight'],
      ['1-02-the-conversion', 2, 0, '1-01-eighty-thousand-hours', 2, 'ArrowLeft'],
      ['2-04-the-competition-record', 9, 8, '2-05-two-survivors', 0, 'ArrowRight'],
      ['2-05-two-survivors', 10, 0, '2-04-the-competition-record', 8, 'ArrowLeft'],
      ['2-05-two-survivors', 10, 5, '2-06-the-abstraction-ladder', 0, 'ArrowRight'],
      ['2-06-the-abstraction-ladder', 11, 0, '2-05-two-survivors', 5, 'ArrowLeft'],
      ['2-06-the-abstraction-ladder', 11, 4, '2-07-the-severance', 0, 'ArrowRight'],
      ['2-07-the-severance', 12, 0, '2-06-the-abstraction-ladder', 4, 'ArrowLeft'],
      ['2-07-the-severance', 12, 4, '2-08-the-pattern', 0, 'ArrowRight'],
      ['2-08-the-pattern', 13, 0, '2-07-the-severance', 4, 'ArrowLeft']
    ];
    for (const [fromId, fromNo, fromBuild, toId, toBuild, key] of rmBoundaries) {
      await page.goto(`${BASE}/?slide=${fromId}`, { waitUntil: 'networkidle' });
      await page.evaluate(({ n, k }) => {
        sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
      }, { n: fromNo, k: fromBuild });
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForTimeout(900);
      await page.keyboard.press(key);
      await page.waitForTimeout(420);
      const r = await probe(toId, toBuild);
      record('rm-handoff', `${fromId} b${fromBuild} ${key === 'ArrowRight' ? '→' : '←'} ${toId} b${toBuild} ≤420ms`, r.ok, r.detail);
    }
  }

  const failures = results.filter((r) => !r.ok);
  const summary = {
    variant: REDUCED ? 'reduced-motion' : 'standard',
    date: new Date().toISOString(),
    checks: results.length,
    failures: failures.length,
    screenshots: shotCount,
    consoleLines: consoleLines.length,
    results
  };
  const partSuffix = PART === 'all' ? '' : `-${PART}`;
  const outName = (REDUCED ? 'verification-results-r2-1-rm' : 'verification-results-r2-1') + partSuffix + '.json';
  fs.writeFileSync(path.join(OUT, outName), JSON.stringify(summary, null, 2));
  fs.appendFileSync(path.join(OUT, 'console-log-r2-1.txt'),
    `--- ${summary.variant}${partSuffix} ${summary.date} ---\n${consoleLines.join('\n')}\n`);
  console.log(`${summary.variant}${partSuffix}: ${results.length} checks, ${failures.length} failures, console lines: ${consoleLines.length}`);
  await browser.close();
  process.exit(failures.length ? 1 : 0);
})();
