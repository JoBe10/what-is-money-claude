// R2.2 verification suite (revision brief §E).
// Usage: node verify-r2-2.cjs [--rm] [--part=traversal|direct]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const {
  probeInPage, railGeometryProbeInPage, triadOutsideProbeInPage,
  symmetryProbeInPage, CAMERA
} = require('./probes-r2-2.cjs');

const BASE = 'http://localhost:4310';
const OUT = path.join(__dirname, '..');
const SHOTS = path.join(OUT, 'screenshots-r2-2');
const REDUCED = process.argv.includes('--rm');
const PART = (process.argv.find((a) => a.startsWith('--part')) || '--part=all').split('=')[1];

// Changed slides under probe: [id, totalBuildSteps, 1-based slide number].
const CHANGED = [
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
const RAIL_SLIDES = new Set([
  '2-04-the-competition-record', '2-05-two-survivors',
  '2-06-the-abstraction-ladder', '2-07-the-severance', '2-08-the-pattern'
]);
const TRIAD_SLIDES = new Set(['2-01-the-world-without-it', '2-02-the-discovery']);

function settleMs(id, b) {
  if (REDUCED) return 500;
  if (id === '2-03-the-convergence' && b === 2) return 6600;
  if (id === '2-03-the-convergence') return 2000;
  if (id === '2-01-the-world-without-it' && b === 2) return 4400;
  if (id === '2-01-the-world-without-it' && b === 1) return 2900;
  if (id === '2-02-the-discovery' && b === 1) return 4400;
  if (id === '2-02-the-discovery' && b === 2) return 4400;
  if (id === '2-04-the-competition-record' && b === 6) return 3000;
  if (id === '2-04-the-competition-record' && b === 8) return 2300;
  if (id === '2-05-two-survivors' && b >= 2) return 3100;
  if (id === '2-06-the-abstraction-ladder' && b === 0) return 2300; // camera ride to gold
  if (id === '2-07-the-severance' && b === 2) return 2600;
  if (id === '2-07-the-severance') return 2400;
  if (id === '2-08-the-pattern') return 2300;
  if (id === '2-06-the-abstraction-ladder') return 1400;
  return 1300;
}

function entryMs(id) {
  if (REDUCED) return 300;
  if (id.startsWith('2-0') || id.startsWith('1-0')) return 1100;
  return 600;
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

  // networkidle can fire before the module graph executes — always wait
  // for the engine to exist before touching window.__deck.
  const ready = () => page.waitForFunction(() => window.__deck, null, { timeout: 20000 });

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
  const geomProbe = () => page.evaluate(railGeometryProbeInPage);
  const outsideProbe = () => page.evaluate(triadOutsideProbeInPage);

  // Runs the R2.2 geometry probes appropriate to the slide, records results.
  async function geometryChecks(section, id, build) {
    if (RAIL_SLIDES.has(id)) {
      const g = await geomProbe();
      record(section, `rail-geometry ${id} b${build}`, g.ok, g.detail);
    }
    if (TRIAD_SLIDES.has(id) && !(id === '2-01-the-world-without-it' && build === 0)) {
      const t = await outsideProbe();
      record(section, `outside-rule ${id} b${build}`, t.ok, t.detail);
    }
  }

  // ---------- 1. Full deck traversal: forward / back / fast-forward ----------
  if (PART === 'traversal' || PART === 'all') {
  await page.goto(`${BASE}/?slide=1`, { waitUntil: 'networkidle' });
    await ready();
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
    await page.waitForTimeout(probed ? settleMs(before.id, nextBuild) : 800);
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
      await geometryChecks('traversal-geometry', s.id, s.build);
      await page.screenshot({
        path: path.join(SHOTS, 'traversal', `${String(steps).padStart(3, '0')}-${s.id}-b${s.build}.png`)
      });
      shotCount += 1;
    }
    if (steps > 400) { record('traversal', 'runaway', false, 'too many steps'); break; }
  }
  record('traversal', 'forward pass complete', traversalOk && s.idx === TOTAL - 1,
    `${steps} steps to ${s.id}, ${TOTAL} slides`);

  // Backward all the way to slide 1 build 0 (crosses the exchange-triangle
  // and rail group boundaries in reverse, and every crossfade boundary).
  let backSteps = 0;
  s = await state();
  while (!(s.idx === 0 && s.build === 0) && backSteps < 500) {
    await page.keyboard.press('ArrowLeft');
    backSteps += 1;
    await page.waitForTimeout(s.id && PROBED.has(s.id) ? 500 : 420);
    s = await state();
    if (s.containers !== 1 || s.active !== 1 || s.empty) {
      await page.waitForTimeout(1200);
      s = await state();
      if (s.containers !== 1 || s.active !== 1 || s.empty) {
        record('traversal', `backward step ${backSteps} at ${s.id} b${s.build}`, false, JSON.stringify(s));
      }
    }
  }
  record('traversal', 'backward pass reaches 1.1 b0', s.idx === 0 && s.build === 0, `${backSteps} steps`);

  // The backward triangle handoff specifically: 2-02 b0 ← must land 2-01 at
  // its end state (build 3), not at black build 0.
  await page.goto(`${BASE}/?slide=2-02-the-discovery`, { waitUntil: 'networkidle' });
    await ready();
  await page.evaluate(() => sessionStorage.clear());
  await page.waitForTimeout(1600);
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(REDUCED ? 500 : 1600);
  s = await state();
  const backOk = s.id === '2-01-the-world-without-it' && s.build === 3;
  record('traversal', 'triangle backward handoff lands 2-01 b3', backOk, `${s.id} b${s.build}`);
  if (backOk && !REDUCED) {
    const r = await probe('2-01-the-world-without-it', 3);
    record('traversal', 'triangle backward handoff state', r.ok, r.detail);
  }

  // Fast re-forward through Sections 1–2 (animation cancellation and rapid
  // handoffs across every scene-group and crossfade boundary).
  await page.goto(`${BASE}/?slide=1`, { waitUntil: 'networkidle' });
    await ready();
  await page.evaluate(() => sessionStorage.clear());
  await page.waitForTimeout(1200);
  s = await state();
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
  // ---------- 2. Direct entry at every build (+ screenshots + geometry) ----------
  for (const [id, builds, slideNo] of CHANGED) {
    for (let b = 0; b <= builds; b += 1) {
      await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
    await ready();
      await page.evaluate(({ n, k }) => {
        sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
      }, { n: slideNo, k: b });
      await page.reload({ waitUntil: 'networkidle' });
    await ready();
      await page.waitForTimeout(id === '2-03-the-convergence' ? 2600 : 1900);
      const st = await state();
      const stOk = st.id === id && st.build === b;
      const r = stOk ? await probe(id, b) : { ok: false, detail: `landed ${st.id} b${st.build}` };
      record(REDUCED ? 'rm-direct-entry' : 'direct-entry', `${id} b${b}`, r.ok, r.detail);
      if (stOk) await geometryChecks(REDUCED ? 'rm-direct-geometry' : 'direct-geometry', id, b);
      if (!REDUCED) {
        await page.screenshot({ path: path.join(SHOTS, `${id}-b${b}.png`) });
        shotCount += 1;
      }
    }
  }

  // The scripted black beat (§E.2): 1.3's title clear-to-black intact.
  await page.goto(`${BASE}/?slide=1-03-what-is-money`, { waitUntil: 'networkidle' });
    await ready();
  await page.evaluate(() => {
    sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: 2, buildStep: 5 }));
  });
  await page.reload({ waitUntil: 'networkidle' });
    await ready();
  await page.waitForTimeout(1600);
  {
    const r = await probe('1-03-what-is-money', 5);
    record(REDUCED ? 'rm-scripted-black' : 'scripted-black', '1-03 b5 title on black', r.ok, r.detail);
    if (!REDUCED) {
      await page.screenshot({ path: path.join(SHOTS, '1-03-what-is-money-b5-title-black.png') });
    }
  }

  // Symmetry probes (icon-grammar placement rules from live geometry).
  if (!REDUCED) {
    await page.goto(`${BASE}/?slide=2-02-the-discovery`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(() => sessionStorage.clear());
    await page.waitForTimeout(1800);
    let sym = await page.evaluate(symmetryProbeInPage, 'triad-goods');
    record('symmetry', 'triad: goods on one anchor above their dots', sym.ok, sym.detail);

    await page.goto(`${BASE}/?slide=2-04-the-competition-record`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(() => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: 8, buildStep: 8 }));
    });
    await page.reload({ waitUntil: 'networkidle' });
    await ready();
    await page.waitForTimeout(1900);
    sym = await page.evaluate(symmetryProbeInPage, 'rail-stops');
    record('symmetry', 'rail stops: glyph/label centered, one rhythm', sym.ok, sym.detail);
  }

  // Named frames (§E.6): the transformation end state, the gold camera, the
  // cut → fiat with its glyph, the full rail with every glyph placed, and a
  // crossfade sequence at a standard boundary.
  if (!REDUCED) {
    // The line-draw transformation, captured live as a sequence.
    await page.goto(`${BASE}/?slide=2-04-the-competition-record`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(() => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: 8, buildStep: 5 }));
    });
    await page.reload({ waitUntil: 'networkidle' });
    await ready();
    await page.waitForTimeout(1600);
    await page.keyboard.press('ArrowRight');
    for (const [i, wait] of [[0, 200], [1, 500], [2, 600], [3, 700], [4, 900]]) {
      await page.waitForTimeout(wait);
      await page.screenshot({ path: path.join(SHOTS, `line-draw-sequence-${i}.png`) });
      shotCount += 1;
    }
    const ld = await probe('2-04-the-competition-record', 6);
    record('named-frames', 'the line-draw transformation (live)', ld.ok, ld.detail);
    const ldg = await geomProbe();
    record('named-frames', 'markers on the line after the transformation', ldg.ok, ldg.detail);

    // The cut → the FIAT float with its severed-tether glyph, live.
    await page.goto(`${BASE}/?slide=2-07-the-severance`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(() => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: 11, buildStep: 1 }));
    });
    await page.reload({ waitUntil: 'networkidle' });
    await ready();
    await page.waitForTimeout(1600);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(2800);
    await page.screenshot({ path: path.join(SHOTS, 'fiat-severance-end-state.png') });
    const fv = await probe('2-07-the-severance', 2);
    record('named-frames', 'FIAT floating mark with glyph (live cut)', fv.ok, fv.detail);

    // The full-rail pull-back; then the end state with every glyph placed.
    await page.goto(`${BASE}/?slide=2-08-the-pattern`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(() => sessionStorage.clear());
    await page.waitForTimeout(1400);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(2600);
    await page.screenshot({ path: path.join(SHOTS, 'full-rail-pull-back.png') });
    const pb = await probe('2-08-the-pattern', 1);
    record('named-frames', 'full-rail pull-back (live)', pb.ok, pb.detail);

    // The crossfade at a standard boundary, captured live as a sequence.
    await page.goto(`${BASE}/?slide=2-03-the-convergence`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(() => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: 7, buildStep: 3 }));
    });
    await page.reload({ waitUntil: 'networkidle' });
    await ready();
    await page.waitForTimeout(1600);
    await page.keyboard.press('ArrowRight');
    for (let i = 0; i < 5; i += 1) {
      await page.screenshot({ path: path.join(SHOTS, `crossfade-sequence-${i}.png`) });
      await page.waitForTimeout(80);
    }
    await page.waitForTimeout(1200);
    const cf = await state();
    record('named-frames', 'crossfade 2-03 → 2-04 lands clean',
      cf.id === '2-04-the-competition-record' && cf.containers === 1, JSON.stringify({ id: cf.id, containers: cf.containers }));
  }

  // ---------- 3. Refresh mid-animation ----------
  const midCases = [
    ['2-03-the-convergence', 8, 2, 1800],
    ['2-04-the-competition-record', 9, 6, 900],
    ['2-05-two-survivors', 10, 3, 700],
    ['2-07-the-severance', 12, 2, 500]
  ];
  for (const [id, slideNo, targetBuild, midWait] of midCases) {
    await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(() => sessionStorage.clear());
    await page.waitForTimeout(1500);
    for (let b = 1; b <= targetBuild; b += 1) {
      await page.keyboard.press('ArrowRight');
      if (b < targetBuild) await page.waitForTimeout(REDUCED ? 400 : settleMs(id, b));
    }
    await page.waitForTimeout(midWait);
    await page.reload({ waitUntil: 'networkidle' });
    await ready();
    await page.waitForTimeout(id === '2-03-the-convergence' ? 2600 : 1900);
    const st = await state();
    const ok = st.id === id && st.build === targetBuild;
    const r = ok ? await probe(id, targetBuild) : { ok: false, detail: `landed ${st.id} b${st.build}` };
    record(REDUCED ? 'rm-mid-refresh' : 'mid-animation-refresh', `${id} b${targetBuild}`, r.ok, r.detail);
  }

  // ---------- 4. Static checks (§E.4) ----------
  if (!REDUCED) {
    const repo = path.resolve(__dirname, '../../..');
    const glyphNames = ['fish', 'grain', 'sandals', 'cattle', 'salt', 'shells',
      'iron', 'metals', 'gold', 'coinage', 'paper', 'fiat', 'bitcoin'];
    const missingSvg = [];
    for (const n of glyphNames) {
      for (const l of ['a', 'b', 'c']) {
        if (!fs.existsSync(path.join(repo, 'assets', 'icons', 'candidates', `${n}-${l}.svg`))) {
          missingSvg.push(`${n}-${l}`);
        }
      }
    }
    record('static', '39 candidate svgs in assets/icons/candidates/', missingSvg.length === 0, missingSvg.join(',') || 'all present');
    record('static', 'contact sheet html + png present',
      fs.existsSync(path.join(repo, 'review/rebuild-r2/icon-studio/contact-sheet.html')) &&
      fs.existsSync(path.join(repo, 'review/rebuild-r2/icon-studio/contact-sheet.png')), '');
    record('static', 'docs/icon-grammar.md exists',
      fs.existsSync(path.join(repo, 'docs', 'icon-grammar.md')), '');
    const glyphsSrc = fs.readFileSync(path.join(repo, 'src/components/section-2/glyphs.js'), 'utf8');
    record('static', 'glyphs.js holds selections only (no pre-studio inline drawings)',
      !glyphsSrc.includes('d="M') && glyphsSrc.includes('CANDIDATES'), '');
    const selCount = glyphNames.filter((n) => new RegExp(`^\\s*${n}:\\s*'[abc]'`, 'm').test(glyphsSrc)).length;
    record('static', 'SELECTIONS covers all 13 glyphs', selCount === 13, `${selCount}/13`);
    const railSrc = fs.readFileSync(path.join(repo, 'src/components/section-2/EvolutionRail.js'), 'utf8');
    record('static', 'fiat + bitcoin glyphs placed on the rail',
      railSrc.includes("glyph('fiat'") && railSrc.includes("glyph('bitcoin'"), '');
    record('static', 'no clamp system remains (labels are rail-space only)',
      !railSrc.includes('--clamp') && !fs.readFileSync(path.join(repo, 'src/styles/slides.css'), 'utf8').includes('--clamp'), '');
  }
  }

  // ---------- 5. Reduced-motion live advance + instant handoffs + cuts ----------
  if (REDUCED && (PART === 'direct' || PART === 'all')) {
    for (const [id, builds] of CHANGED) {
      await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
    await ready();
      await page.evaluate(() => sessionStorage.clear());
      await page.waitForTimeout(900);
      for (let b = 1; b <= builds; b += 1) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(420);
        const r = await probe(id, b);
        record('rm-live-advance', `${id} b${b} settled ≤420ms`, r.ok, r.detail);
      }
    }
    // Handoffs resolve instantly across every group boundary, including the
    // new exchange-triangle group, both directions.
    const rmBoundaries = [
      ['2-01-the-world-without-it', 6, 3, '2-02-the-discovery', 0, 'ArrowRight'],
      ['2-02-the-discovery', 7, 0, '2-01-the-world-without-it', 3, 'ArrowLeft'],
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
    await ready();
      await page.evaluate(({ n, k }) => {
        sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
      }, { n: fromNo, k: fromBuild });
      await page.reload({ waitUntil: 'networkidle' });
    await ready();
      await page.waitForTimeout(900);
      await page.keyboard.press(key);
      await page.waitForTimeout(420);
      const r = await probe(toId, toBuild);
      record('rm-handoff', `${fromId} b${fromBuild} ${key === 'ArrowRight' ? '→' : '←'} ${toId} b${toBuild} ≤420ms`, r.ok, r.detail);
    }
    // Standard boundaries cut instantly under reduced motion — no crossfade,
    // one container, landed within 200ms.
    const rmCuts = [
      ['1-04-the-stakes', 4, 1, '1-05-the-promise'],
      ['2-03-the-convergence', 8, 3, '2-04-the-competition-record']
    ];
    for (const [fromId, fromNo, fromBuild, toId] of rmCuts) {
      await page.goto(`${BASE}/?slide=${fromId}`, { waitUntil: 'networkidle' });
    await ready();
      await page.evaluate(({ n, k }) => {
        sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
      }, { n: fromNo, k: fromBuild });
      await page.reload({ waitUntil: 'networkidle' });
    await ready();
      await page.waitForTimeout(900);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(200);
      const st = await state();
      const cutOk = st.id === toId && st.containers === 1 && st.active === 1;
      record('rm-instant-cut', `${fromId} → ${toId} ≤200ms one container`, cutOk, JSON.stringify({ id: st.id, containers: st.containers }));
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
  const outName = (REDUCED ? 'verification-results-r2-2-rm' : 'verification-results-r2-2') + partSuffix + '.json';
  fs.writeFileSync(path.join(OUT, outName), JSON.stringify(summary, null, 2));
  fs.appendFileSync(path.join(OUT, 'console-log-r2-2.txt'),
    `--- ${summary.variant}${partSuffix} ${summary.date} ---\n${consoleLines.join('\n')}\n`);
  console.log(`${summary.variant}${partSuffix}: ${results.length} checks, ${failures.length} failures, console lines: ${consoleLines.length}`);
  await browser.close();
  process.exit(failures.length ? 1 : 0);
})();
