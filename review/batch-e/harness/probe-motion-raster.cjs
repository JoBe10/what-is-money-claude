// Batch E — the walk-only differences attributed to the legacy's own motion.
//
// THE FACT. Every one of Act V's 27 settled states is its approved cell at zero
// pixels on a COLD mount (review/batch-e/landed-proof-batch-e.json, 27/27 in
// the spliced deck). On a CONTINUOUS WALK — which is what a viewing is — five
// frames differ from their cells (review/batch-e/strip-batch-e.json):
//
//   s27-b2 · s27-b3   7,083 px, max delta 61, across the row of five
//                     compact-box renders — the image-cache resampling the
//                     act-5-states session predicted for Act V's third box
//                     size, attributed to the legacy deck at Session 1
//                     (review/batch-e/walk-artefact.json).
//   s24-b3 · s24-b4   6 px, max delta 7, inside the third migrating claim's
//                     disc — which has just ridden its offset-path.
//   s28-b2            15 px, max delta 4, in a ONE-PIXEL-WIDE column down the
//                     right edge of the lit margin column — whose units carry
//                     a translateX and have just been relit.
//
// THE QUESTION, and it is the only one worth asking: is the second family the
// FILM's doing, or the legacy's? Session 1 answered the first family by walking
// the untouched legacy deck. That control is gone — Batch E's splice took the
// legacy slides out of the manifest, which is the point of the batch — so this
// probe uses the one that remains and is in fact stricter: THE LEGACY MODULE
// ALONE, with no film code anywhere near it.
//
// Each suspect state is produced twice from the same legacy module, mounted
// bare into a 1920 × 1080 container on black — the states sheet's own stage,
// minus the sheet:
//
//   COLD  render → onEnter(target) → buildStep(target), the reconstruction
//         path, which is how the approved cell was captured;
//   LIVE  render → onEnter(0) → buildStep(0) → … → buildStep(target), the
//         legacy's own advances played one after another, then a settle.
//
// No stage, no scene module, no engine. If COLD and LIVE differ by the same
// pixels the film's walk differs by, the difference is the legacy treatment's
// own rasterization after motion, and the film inherits it exactly as it
// inherits everything else about these frames.
//
// Usage: node probe-motion-raster.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const REPO = path.join(__dirname, '..', '..', '..');
const CELLS = path.join(REPO, 'review', 'act-5', 'states');

// [cell, legacy module path, the build the cell is, the build the live walk
//  starts from]. The two families the walk shows, plus two controls: a state
// whose frame carries no motion of its own (s28-b1) and the film's last frame
// (s30-b2), both of which the walk matched at zero.
const SUSPECTS = [
  ['s24-b3', '/src/slides/section-4-ideal-store/17-store-of-value-function-migrates.js', 2, 0],
  ['s24-b4', '/src/slides/section-4-ideal-store/17-store-of-value-function-migrates.js', 3, 0],
  ['s28-b2', '/src/slides/section-4-ideal-store/22-fixed-supply-reprices-at-margin.js', 2, 0],
  ['s28-b1', '/src/slides/section-4-ideal-store/22-fixed-supply-reprices-at-margin.js', 1, 0],
  ['s30-b2', '/src/slides/section-5-close/01-thank-you.js', 2, 0]
];

const SEED_SCRIPT = () => {
  const SEED = 0x2545F491;
  let s = SEED >>> 0;
  Math.random = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

// Mount a legacy module bare and drive it, cold or live. Returns nothing; the
// caller screenshots. `skip` is the build the film retires (5-01's wayline),
// so a live walk steps over it exactly as the film's own gesture does.
const DRIVE = async (page, modPath, target, from, live, skip) => page.evaluate(
  async ([p, t, f, isLive, sk]) => {
    document.querySelectorAll('.probe-stage').forEach((el) => el.remove());
    const st = document.createElement('div');
    st.className = 'probe-stage';
    st.style.cssText = 'position:fixed; left:0; top:0; width:1920px; height:1080px;'
      + 'background:#000; overflow:hidden; z-index:9999; font-family:Inter,sans-serif;';
    document.body.appendChild(st);
    const mod = (await import(p)).default;
    if (!isLive) {
      mod.render(st);
      mod.onEnter({ targetBuildStep: t, container: st });
      mod.buildStep(t);
      return;
    }
    mod.render(st);
    mod.onEnter({ targetBuildStep: f, container: st });
    mod.buildStep(f);
    for (let b = f + 1; b <= t; b += 1) {
      if (b === sk) continue;
      await new Promise((r) => setTimeout(r, 1600));
      mod.buildStep(b);
    }
  }, [modPath, target, from, live, skip ?? -1]);

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
    await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
  };

  const ready = async () => {
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
    });
  };

  const shots = {};
  for (const [cell, modPath, target, from] of SUSPECTS) {
    for (const live of [false, true]) {
      await freshPage();
      await DRIVE(page, modPath, target, from, live, modPath.includes('01-thank-you') ? 1 : null);
      await ready();
      await page.waitForTimeout(1800);
      shots[`${cell}:${live ? 'live' : 'cold'}`] =
        await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
      console.log(`legacy ${cell.padEnd(8)} ${live ? 'live ' : 'cold '} mounted bare`);
    }
  }

  // ---- compare ---------------------------------------------------------------
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
    let x0 = 1e9; let y0 = 1e9; let x1 = -1; let y1 = -1;
    for (let p = 0; p < da.length; p += 4) {
      const d = Math.max(Math.abs(da[p] - db[p]), Math.abs(da[p + 1] - db[p + 1]), Math.abs(da[p + 2] - db[p + 2]));
      if (d > maxDelta) maxDelta = d;
      if (d > 2) {
        diffPixels += 1;
        const i = p / 4; const x = i % 1920; const y = (i - x) / 1920;
        if (x < x0) x0 = x; if (x > x1) x1 = x;
        if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
    }
    const box = x1 < 0 ? null : { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
    return { diffPixels, maxDelta, box };
  }, [`data:image/png;base64,${bufA.toString('base64')}`, `data:image/png;base64,${bufB.toString('base64')}`]);

  const strip = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'strip-batch-e.json'), 'utf8'));
  const filmWalk = Object.fromEntries(strip.walkVsApprovedCells.results.map((r) => [r.cell, r]));

  const rows = [];
  for (const [cell] of SUSPECTS) {
    const archived = fs.readFileSync(path.join(CELLS, `${cell}.png`));
    const legacyCold = await diff(shots[`${cell}:cold`], archived);
    const legacyLive = await diff(shots[`${cell}:live`], archived);
    const film = filmWalk[cell];
    rows.push({
      cell,
      legacyColdVsCell: legacyCold,
      legacyLiveVsCell: legacyLive,
      filmWalkVsCell: { diffPixels: film.diffPixels, maxDelta: film.maxDelta, box: film.box },
      legacyShowsItToo: legacyLive.diffPixels > 0 === film.diffPixels > 0,
      sameMagnitude: legacyLive.diffPixels === film.diffPixels
    });
    console.log(`${cell.padEnd(8)} legacy cold ${String(legacyCold.diffPixels).padStart(6)}px` +
      ` · legacy LIVE ${String(legacyLive.diffPixels).padStart(6)}px` +
      ` · film walk ${String(film.diffPixels).padStart(6)}px` +
      `  ${legacyLive.diffPixels === film.diffPixels ? '— identical' : ''}`);
  }

  const introduced = rows.filter((r) => r.filmWalkVsCell.diffPixels > 0 && r.legacyLiveVsCell.diffPixels === 0)
    .map((r) => r.cell);
  const inherited = rows.filter((r) => r.filmWalkVsCell.diffPixels > 0 && r.legacyLiveVsCell.diffPixels > 0)
    .map((r) => r.cell);
  const coldClean = rows.every((r) => r.legacyColdVsCell.diffPixels === 0);

  fs.writeFileSync(path.join(__dirname, '..', 'motion-raster.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'batch-e',
    question: 'the film\'s continuous walk differs from the approved cells at a few frames while every cold mount matches — is that the film\'s doing or the legacy treatment\'s?',
    control: 'each legacy module mounted BARE — no stage, no scene module, no engine — and produced twice: cold (the reconstruction path the approved cell was captured by) and live (its own advances played one after another). If cold matches the cell and live does not, the difference belongs to the legacy treatment\'s rasterization after motion, and the film inherits it.',
    legacyColdMatchesEveryCell: coldClean,
    inheritedFromTheLegacyTreatment: inherited,
    introducedByBatchE: introduced,
    rows,
    consoleErrors: errors
  }, null, 2));

  console.log(`\nlegacy cold matches every cell: ${coldClean ? 'yes' : 'NO'}`);
  console.log(`inherited from the legacy treatment: ${inherited.length ? inherited.join(', ') : 'none'}`);
  console.log(`introduced by Batch E:               ${introduced.length ? introduced.join(', ') : 'none'}`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length || introduced.length || !coldClean ? 1 : 0);
})();
