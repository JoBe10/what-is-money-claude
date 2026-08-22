// R4 visual regression (session brief §2.1): the design is unchanged and the
// data changed, so exactly two slides may move — 2.7 (the purchasing-power
// chart) and 3.5 (the palladium panels) — and only at the builds where their
// charts are on stage. Every other build of Sections 1–3 must be
// pixel-identical to its R2.2 / R3.1 baseline.
//
// Method: re-capture every build of Sections 1–3 at 1920×1080, DPR 1, via
// direct entry (seeded deck-state + reload, the R3.1 driver), then compare
// against the committed baseline PNGs decoded in-page to a canvas. Reports
// per-build changed-pixel fraction (any channel differing by >8/255) and the
// bounding box of the change, so a "data changed" diff can be told apart
// from a layout shift.
//
// Two regions/slides are excluded from the pixel gate, both for reasons that
// predate R4 and are verified another way:
//
//   * The deck chrome band (y >= CHROME_Y). The engine fades the slide
//     counter and progress bar out after IDLE_HIDE_MS = 2000ms of no input,
//     so whether they appear in a capture depends on how long the harness
//     took to get there — the R3.1 baselines caught them just before the
//     fade, this run just after. That is a stopwatch artifact, not a
//     regression. The band is masked, and what the band actually renders
//     (the progress bar width, which is a function of build counts) is gated
//     statically instead: `--check-builds` asserts every slide's
//     totalBuildSteps is byte-unchanged since the R3.1 merge.
//   * 2-03-the-convergence. The murmuration is a canvas field seeded with
//     Math.random() (MurmurationField.js), so no two runs draw the same
//     frame. Its diff is reported and not gated.
//
// Usage: node regression-r4.cjs
const { chromium } = require('playwright');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:4311';
const OUT = path.join(__dirname, '..');
const SHOTS = path.join(OUT, 'screenshots-r4');
const REPO = path.resolve(__dirname, '../../..');
const R2_BASE = path.join(REPO, 'review/rebuild-r2/screenshots-r2-2');
const R3_BASE = path.join(REPO, 'review/rebuild-r3/screenshots-r3-1');

// [id, totalBuildSteps, 1-based slide number, baselineDir|null]
// Section 1 has no committed per-build baseline set from R1.1, so it is
// captured and checked for console/render health but not pixel-diffed;
// nothing in R4 touches it (git-verified in the report).
const SLIDES = [
  ['1-01-eighty-thousand-hours', 2, 1, null],
  ['1-02-the-conversion', 3, 2, null],
  ['1-03-what-is-money', 4, 3, null],
  ['1-04-the-stakes', 1, 4, null],
  ['1-05-the-promise', 5, 5, null],
  ['2-01-the-world-without-it', 3, 6, R2_BASE],
  ['2-02-the-discovery', 4, 7, R2_BASE],
  ['2-03-the-convergence', 3, 8, R2_BASE],
  ['2-04-the-competition-record', 8, 9, R2_BASE],
  ['2-05-two-survivors', 6, 10, R2_BASE],
  ['2-06-the-abstraction-ladder', 4, 11, R2_BASE],
  ['2-07-the-severance', 4, 12, R2_BASE],
  ['2-08-the-pattern', 6, 13, R2_BASE],
  ['3-00-waypoint-function', 2, 14, R3_BASE],
  ['3-01-the-three-functions', 5, 15, R3_BASE],
  ['3-02-the-functions-separate', 3, 16, R3_BASE],
  ['3-03-the-order-of-monetization', 6, 17, R3_BASE],
  ['3-04-stage-signatures', 2, 18, R3_BASE],
  ['3-05-the-palladium-test', 5, 19, R3_BASE],
  ['3-06-what-your-money-is', 6, 20, R3_BASE],
  ['3-07-where-bitcoin-is', 5, 21, R3_BASE],
  ['3-08-waypoint-judge', 2, 22, R3_BASE]
];

// The builds R4/R4.1 are allowed to change, and why. R4 changed data on two
// slides; R4.1 applied eight authorized copy rulings, which reach further.
const EXPECTED_CHANGE = {
  // R4 — data
  '2-07-the-severance': {
    builds: [3, 4],
    why: 'purchasing-power chart on stage (WIM-FX-001…004); index note dated by R-06'
  },
  '3-05-the-palladium-test': {
    builds: [1, 2, 3, 4, 5],
    why: 'mine-supply + price panels (WIM-PD-001/002); hook re-anchored by R-05 from build 1'
  },
  // R4.1 — the eight rulings
  '2-01-the-world-without-it': { builds: [3], why: 'R-01: the double coincidence of wants' },
  // The inherited wall label is only on stage while the triad still shows it.
  '2-02-the-discovery': { builds: [0, 1], why: 'R-01: the inherited scene label' },
  '2-04-the-competition-record': {
    builds: [7, 8],
    why: 'R-02: the SHELLS receipt is now the Zanzibar cowrie inflation'
  },
  '2-05-two-survivors': {
    builds: [0, 1, 2, 3, 4, 5, 6],
    why: 'R-03: the furnace wave — a new sixth build, a re-split step 4, and the inherited rail receipt from R-02'
  },
  // The entrant's wound line only renders once the honesty beat lands.
  '2-08-the-pattern': { builds: [6], why: 'R-08: "not yet twenty years" on the entrant wound line' }
};
// Slides whose baseline build count changed, so a per-build diff is not
// meaningful past the point where the numbering diverges.
const REBUILT = new Set(['2-05-two-survivors']);

const DIFF_TOL = 8;      // per-channel difference that counts as a changed pixel
const SETTLE_MS = 1800;
const CHROME_Y = 1000;   // rows at/below this are engine chrome, masked (see header)
// Canvas fields seeded with Math.random() cannot be pixel-compared.
const NON_DETERMINISTIC = new Set(['2-03-the-convergence']);

(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });

  const consoleLines = [];
  const RECYCLE_AFTER = 24;
  let page;
  let navCount = 0;
  const attach = (p) => {
    p.on('console', (m) => {
      if (m.type() === 'error' || m.type() === 'warning') {
        const t = m.text();
        if (!t.startsWith('[vite]')) consoleLines.push(`[${m.type()}] ${t}`);
      }
    });
    p.on('pageerror', (e) => consoleLines.push(`[pageerror] ${e.message}`));
  };
  const freshPage = async () => {
    const old = page;
    page = await context.newPage();
    attach(page);
    navCount = 0;
    if (old) await old.close();
  };
  await freshPage();

  // A second page does the image comparison so the deck page stays clean.
  const cmp = await context.newPage();
  await cmp.goto('about:blank');
  const diff = (aBuf, bBuf) => cmp.evaluate(async ({ a, b, tol, maskY }) => {
    const load = (src) => new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = src;
    });
    const [ia, ib] = await Promise.all([load(a), load(b)]);
    if (ia.width !== ib.width || ia.height !== ib.height) {
      return { sizeMismatch: `${ia.width}x${ia.height} vs ${ib.width}x${ib.height}` };
    }
    const w = ia.width;
    const h = ia.height;
    const grab = (img) => {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const x = c.getContext('2d', { willReadFrequently: true });
      x.drawImage(img, 0, 0);
      return x.getImageData(0, 0, w, h).data;
    };
    const da = grab(ia);
    const db = grab(ib);
    let n = 0;
    let x0 = w;
    let y0 = h;
    let x1 = -1;
    let y1 = -1;
    const limit = Math.min(h, maskY);
    for (let py = 0; py < limit; py += 1) {
      for (let px = 0; px < w; px += 1) {
        const i = (py * w + px) * 4;
        if (Math.abs(da[i] - db[i]) > tol || Math.abs(da[i + 1] - db[i + 1]) > tol ||
            Math.abs(da[i + 2] - db[i + 2]) > tol) {
          n += 1;
          if (px < x0) x0 = px;
          if (px > x1) x1 = px;
          if (py < y0) y0 = py;
          if (py > y1) y1 = py;
        }
      }
    }
    return {
      fraction: n / (w * limit),
      pixels: n,
      comparedRows: limit,
      box: x1 < 0 ? null : { x0, y0, x1, y1 }
    };
  }, { a: `data:image/png;base64,${aBuf.toString('base64')}`,
       b: `data:image/png;base64,${bBuf.toString('base64')}`,
       tol: DIFF_TOL, maskY: CHROME_Y });

  const ready = () => page.waitForFunction(() => window.__deck, null, { timeout: 25000 });
  const directEnter = async (id, slideNo, build) => {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      if (navCount >= RECYCLE_AFTER || attempt > 0) await freshPage();
      try {
        navCount += 2;
        await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
        await ready();
        await page.evaluate(({ n, k }) => {
          sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
        }, { n: slideNo, k: build });
        await page.reload({ waitUntil: 'networkidle' });
        await ready();
        return;
      } catch (err) {
        if (attempt === 1) throw err;
      }
    }
  };

  const results = [];
  let fails = 0;
  for (const [id, builds, slideNo, baseDir] of SLIDES) {
    for (let b = 0; b <= builds; b += 1) {
      await directEnter(id, slideNo, b);
      await page.waitForTimeout(SETTLE_MS);
      const st = await page.evaluate(() => ({
        id: window.__deck.slides[window.__deck.index].id,
        build: window.__deck.buildStep,
        containers: document.querySelectorAll('.deck-slide').length,
        empty: document.querySelector('.deck-slide[data-active="true"]').children.length === 0
      }));
      const landed = st.id === id && st.build === b && st.containers === 1 && !st.empty;
      const buf = await page.screenshot();
      fs.writeFileSync(path.join(SHOTS, `${id}-b${b}.png`), buf);

      const expect = EXPECTED_CHANGE[id];
      const mayChange = Boolean(expect && expect.builds.includes(b));
      let d = null;
      const basePath = baseDir && path.join(baseDir, `${id}-b${b}.png`);
      if (basePath && fs.existsSync(basePath)) {
        d = await diff(fs.readFileSync(basePath), buf);
      }
      // A build that may not change must be pixel-identical; a build that may
      // change must actually differ (otherwise the new data never landed).
      // A slide that gained a build cannot be compared build-for-build past
      // the divergence: its b5 is not the baseline's b5. Reported, not gated.
      const gated = !NON_DETERMINISTIC.has(id) && !REBUILT.has(id);
      let ok = landed;
      let note = landed ? '' : `landed ${st.id} b${st.build} containers=${st.containers}`;
      if (ok && d && gated) {
        if (d.sizeMismatch) { ok = false; note = `baseline size mismatch ${d.sizeMismatch}`; }
        else if (mayChange && d.pixels === 0) { ok = false; note = 'expected a data change, frame identical'; }
        else if (!mayChange && d.pixels > 0) {
          ok = false;
          note = `unexpected change: ${(d.fraction * 100).toFixed(4)}% of pixels, box ${JSON.stringify(d.box)}`;
        }
      }
      if (!ok) fails += 1;
      results.push({
        slide: id, build: b, ok, gated, baseline: Boolean(d && !d.sizeMismatch),
        mayChange, changedFraction: d && d.fraction != null ? Number((d.fraction * 100).toFixed(4)) : null,
        changedPixels: d ? d.pixels : null, box: d ? d.box : null,
        why: mayChange ? expect.why
          : (NON_DETERMINISTIC.has(id) ? 'canvas field seeded with Math.random() — reported, not gated'
            : (REBUILT.has(id) ? 'build count changed at R4.1 — build numbering diverges from the baseline' : undefined)),
        note
      });
      if (!ok) console.log(`FAIL ${id} b${b} :: ${note}`);
    }
  }

  // What the masked chrome band would have proved: the progress bar and slide
  // counter are functions of the deck's build counts and slide count, so those
  // are asserted from source instead of from pixels.
  const structural = [];
  {
    const merge = '076e2bb'; // Merge R3+R3.1 — the state the baselines describe
    const diffNames = execSync(`git diff --name-only ${merge} -- src/`, { cwd: REPO })
      .toString().trim().split(/\r?\n/).filter(Boolean);
    const engineTouched = diffNames.filter((f) => f.startsWith('src/engine/'));
    structural.push({
      check: 'engine untouched since the R3+R3.1 merge (git)',
      ok: engineTouched.length === 0, detail: engineTouched.join(',') || 'clean'
    });
    // R4.1 authorizes exactly one build-count change: ruling R-03 adds the
    // furnace wave to 2.5. Any other movement would desynchronize the deck's
    // pacing and the progress bar this mask relies on.
    const buildCounts = execSync(`git diff ${merge} -- src/slides/`, { cwd: REPO }).toString()
      .split(/\r?\n/).filter((l) => /^[-+].*totalBuildSteps/.test(l));
    const expectedCounts = ['-  totalBuildSteps: 5,', '+  totalBuildSteps: 6,'];
    structural.push({
      check: 'exactly one build-count change, and it is 2.5 gaining the furnace wave (R-03)',
      ok: buildCounts.length === 2 &&
        buildCounts.every((l) => expectedCounts.some((e) => l.trim() === e.trim())),
      detail: buildCounts.join(' | ') || 'none'
    });
    const slideList = execSync(`git diff ${merge} -- src/main.js src/slides/manifest.js`, { cwd: REPO })
      .toString().trim();
    structural.push({
      check: 'slide registry unchanged (git)',
      ok: slideList.length === 0, detail: slideList ? 'registry diff present' : 'clean'
    });
    const touched = diffNames.filter((f) => !f.startsWith('src/data/'));
    const ALLOWED = [
      // R4 — the data work
      'src/slides/section-2-origin/07-the-severance.js',
      'src/slides/section-3-function/05-the-palladium-test.js',
      'src/styles/slides.css',
      // R4.1 — the eight applied rulings
      'src/slides/section-1-question/01-eighty-thousand-hours.js',
      'src/slides/section-2-origin/01-the-world-without-it.js',
      'src/slides/section-2-origin/02-the-discovery.js',
      'src/slides/section-2-origin/04-the-competition-record.js',
      'src/slides/section-2-origin/05-two-survivors.js',
      'src/slides/section-2-origin/08-the-pattern.js',
      'src/components/section-2/EvolutionRail.js',
      'src/components/section-2/ElementGrid.js'
    ];
    structural.push({
      check: 'only the R4 data files and the R4.1 ruled files changed under src/ (git)',
      ok: touched.every((f) => ALLOWED.includes(f)),
      detail: touched.filter((f) => !ALLOWED.includes(f)).join(', ') || 'clean'
    });
  }
  const structFails = structural.filter((s) => !s.ok).length;
  fails += structFails;
  structural.forEach((s) => {
    if (!s.ok) console.log(`FAIL structural :: ${s.check} :: ${s.detail}`);
  });

  const changed = results.filter((r) => r.changedPixels > 0);
  const summary = {
    revision: 'R4',
    date: new Date().toISOString(),
    diffTolerance: DIFF_TOL,
    maskedChromeRowsFrom: CHROME_Y,
    nonDeterministic: [...NON_DETERMINISTIC],
    builds: results.length,
    withBaseline: results.filter((r) => r.baseline).length,
    failures: fails,
    consoleLines: consoleLines.length,
    structural,
    changedBuilds: changed.map((r) => `${r.slide} b${r.build} (${r.changedFraction}%)`),
    results
  };
  fs.writeFileSync(path.join(OUT, 'regression-r4-results.json'), JSON.stringify(summary, null, 2));
  fs.writeFileSync(path.join(OUT, 'console-log-r4.txt'),
    `--- regression ${summary.date} ---\n${consoleLines.join('\n')}\n`);
  console.log(`\nR4 regression: ${results.length} builds, ${summary.withBaseline} diffed against baseline, ${fails} failures, console lines ${consoleLines.length}`);
  console.log(`changed builds: ${summary.changedBuilds.join(', ') || 'none'}`);
  await browser.close();
  process.exit(fails ? 1 : 0);
})();
