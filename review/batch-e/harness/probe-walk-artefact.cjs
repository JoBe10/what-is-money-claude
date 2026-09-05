// Batch E implementation, Session 1 — the walk artefact, located and attributed.
//
// The capture strip found it: on a CONTINUOUS forward walk of `?proto=act5`,
// four of the twenty settled frames differ from their approved cells, while
// every one of the twenty matches at zero on a COLD mount (the landed-state
// proof, 20/20). The four are s24-b3 and s24-b4 (6 px, max channel delta 7,
// inside the third migrating claim's disc) and s27-b2 and s27-b3 (7,083 px,
// max delta 61, across the row of five compact-box renders).
//
// This probe answers the only question that matters about it — **did Batch E
// cause it?** — with a control that isolates the walk itself.
//
// THE CONTROL, AND WHY IT IS THIS ONE. Comparing the legacy deck's frames with
// the approved cells proves nothing here: the deck canvas carries
// `will-change: transform`, which drops its text to grayscale antialiasing, so
// every legacy frame differs from every cell by thousands of glyph-edge pixels
// no matter what. That is the known mechanism `src/components/rasterHint.js`
// exists for, and it is why the scenes release the hint while they are
// mounted. So the control holds the deck constant instead: for each suspect
// state, the SAME legacy slide is measured against ITSELF —
//
//   legacy COLD  — direct entry at that slide and build, one state per page;
//   legacy WALK  — the same state reached by walking 4-17 → 4-21 forward in
//                  one continuous page, the sequence the film plays.
//
// Antialiasing, grade, layout and type are identical between those two; the
// only variable is the walk. If the legacy deck differs from itself at the
// same place, the artefact is the legacy deck's own and Batch E inherits it.
//
// The mechanism, as the act-5-states session recorded it: a dark-field subject
// painted at one box size can resample from that cached raster when it is next
// painted at another. Act V paints the same five subjects at the 180 × 150
// display box (4-17 … 4-20) and then at 4-21's compact box, so a walk that
// crosses that boundary is exactly the sequence that shows it.
//
// Usage: node probe-walk-artefact.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;

// The legacy ids the walk crosses, and the cell each of their builds is the
// approved frame for. 4-20 stops at build 4: its builds 5–7, the stability
// contrast, are retired by architecture Ruling 5 and the film never plays them,
// so the walk skips them the way the film skips them.
const LEGACY_WALK = [
  ['4-17-store-of-value-function-migrates', [[0, 's24-b1'], [1, 's24-b2'], [2, 's24-b3'], [3, 's24-b4']]],
  ['4-18-monetary-premium', [[0, 's25-b1'], [1, 's25-b2'], [2, 's25-b3'], [3, 's25-b4']]],
  ['4-19-other-assets-do-moneys-job', [[1, 's26-b1'], [2, 's26-b2'], [3, 's26-b3'], [4, 's26-b4'], [5, 's26-b5']]],
  ['4-20-bitcoin-does-not-replace-everything', [[1, 's26-b6'], [2, 's26-b7'], [3, 's26-b8'], [4, 's26-b9']]],
  ['4-21-marginal-store-of-value-decision', [[0, 's27-b1'], [1, 's27-b2'], [2, 's27-b3']]]
];

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

  const settled = async () => {
    await page.waitForFunction(() => {
      if (window.__deck && window.__deck.transitioning) return false;
      return document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 40000 });
    await page.waitForTimeout(900);
  };
  const ready = async () => {
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
    });
  };
  // goTo is a no-op while the engine is transitioning; ask until it takes.
  const goToId = async (id) => {
    const target = await page.evaluate((wanted) =>
      window.__deck.slides.findIndex((s) => s.id === wanted), id);
    if (target < 0) throw new Error(`${id} is not in the manifest`);
    await page.waitForFunction((i) => {
      if (window.__deck.index === i) return !window.__deck.transitioning;
      if (!window.__deck.transitioning) window.__deck.goTo(i);
      return false;
    }, target, { timeout: 30000, polling: 200 });
    return target;
  };
  const hideChrome = async () => {
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForFunction(() => {
      const c = document.querySelector('.deck-chrome');
      return !c || getComputedStyle(c).opacity === '0';
    }, null, { timeout: 15000 });
    await page.waitForTimeout(150);
  };

  // ---- pass 1 · the legacy deck WALKED, one continuous page ----------------
  await freshPage();
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
    null, { timeout: 30000 });
  await goToId(LEGACY_WALK[0][0]);
  await hideChrome();
  await ready();
  await settled();

  const walked = {};
  for (const [id, builds] of LEGACY_WALK) {
    const at = await page.evaluate(() => window.__deck.slides[window.__deck.index].id);
    if (at !== id) throw new Error(`the walk is at ${at}, expected ${id}`);
    for (const [build, cell] of builds) {
      let step = await page.evaluate(() => window.__deck.buildStep);
      while (step < build) {
        await page.evaluate(() => window.__deck.advanceStep(false));
        await settled();
        step = await page.evaluate(() => window.__deck.buildStep);
      }
      walked[cell] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
      console.log(`walk   ${id.padEnd(44)} build ${build} → ${cell}`);
    }
    const nextId = LEGACY_WALK[LEGACY_WALK.findIndex(([x]) => x === id) + 1]?.[0];
    if (nextId) {
      await goToId(nextId);
      await settled();
    }
  }

  // ---- pass 2 · the same legacy states COLD, one per page ------------------
  const cold = {};
  for (const [id, builds] of LEGACY_WALK) {
    for (const [build, cell] of builds) {
      // The URL wins over sessionStorage (SlideEngine._determineInitialState),
      // and the engine writes ?slide= into the URL as soon as it mounts — so
      // the slide is asked for by id in the URL and sessionStorage supplies
      // the build step, which is the engine's own documented deep-link path.
      let landed = null;
      for (let attempt = 1; attempt <= 3 && !landed; attempt += 1) {
        await freshPage();
        await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
        await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
          null, { timeout: 30000 });
        const idx = await page.evaluate(() => window.__deck.index);
        await page.evaluate(([i, b]) => {
          sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
        }, [idx, build]);
        await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
        await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
        await ready();
        await settled();
        const at = await page.evaluate(() => ({ i: window.__deck.index, b: window.__deck.buildStep }));
        if (at.i === idx && at.b === build) {
          landed = at;
        } else if (attempt === 3) {
          throw new Error(`cold entry landed at ${at.i}:${at.b}, expected ${idx}:${build}`);
        } else {
          console.log(`  retrying cold entry ${id} build ${build} (landed ${at.i}:${at.b})`);
        }
      }
      await hideChrome();
      cold[cell] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
      console.log(`cold   ${id.padEnd(44)} build ${build} → ${cell}`);
    }
  }

  // ---- pass 3 · the comparison ---------------------------------------------
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

  const strip = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'strip-impl1.json'), 'utf8'));
  const sceneWalk = Object.fromEntries(strip.walkVsApprovedCells.results.map((r) => [r.cell, r]));

  const rows = [];
  for (const [, builds] of LEGACY_WALK) {
    for (const [, cell] of builds) {
      const legacy = await diff(walked[cell], cold[cell]);
      const scene = sceneWalk[cell];
      rows.push({
        cell,
        legacyWalkVsLegacyCold: legacy,
        sceneWalkVsApprovedCell: { diffPixels: scene.diffPixels, maxDelta: scene.maxDelta, box: scene.box },
        bothShowIt: (legacy.diffPixels > 0) === (scene.diffPixels > 0)
      });
      console.log(`${legacy.diffPixels > 0 ? 'ARTEFACT' : 'clean   '} ${cell.padEnd(10)}` +
        ` legacy walk↔legacy cold ${String(legacy.diffPixels).padStart(7)}px` +
        `  scene walk↔cell ${String(scene.diffPixels).padStart(7)}px`);
    }
  }

  const inherited = rows.filter((r) => r.sceneWalkVsApprovedCell.diffPixels > 0
    && r.legacyWalkVsLegacyCold.diffPixels > 0).map((r) => r.cell);
  const introduced = rows.filter((r) => r.sceneWalkVsApprovedCell.diffPixels > 0
    && r.legacyWalkVsLegacyCold.diffPixels === 0).map((r) => r.cell);

  fs.writeFileSync(path.join(__dirname, '..', 'walk-artefact.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-5-impl-1',
    question: 'four settled frames differ on a continuous walk of ?proto=act5 while all twenty match cold — did Batch E cause it?',
    control: 'the legacy deck measured against ITSELF at the same states: the same legacy slide walked 4-17 → 4-21 in one continuous page, versus direct-entered one state per page. Antialiasing, grade, layout and type are identical between the two; the only variable is the walk. (Comparing legacy frames with the approved cells proves nothing here — the deck canvas keeps will-change:transform, so its text is grayscale-antialiased and every legacy frame differs from every cell by thousands of glyph-edge pixels. That is the mechanism src/components/rasterHint.js exists for, and it is why the scenes release the hint.)',
    inheritedFromTheLegacyWalk: inherited,
    introducedByBatchE: introduced,
    rows,
    consoleErrors: errors
  }, null, 2));

  console.log(`\ninherited from the legacy walk: ${inherited.length ? inherited.join(', ') : 'none'}`);
  console.log(`introduced by Batch E:          ${introduced.length ? introduced.join(', ') : 'none'}`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length || introduced.length ? 1 : 0);
})();
