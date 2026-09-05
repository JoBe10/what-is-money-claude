// Batch A — the transplant proof (docs/batch-a-implementation-brief.md §3.2).
//
// One claim, made checkable: THE DECK'S ACT I IS THE CLOSED PROTOTYPE. The
// brief's rule is that Scenes 2–4 are transplanted, not reinterpreted — "the
// gate closed on this exact behavior" — and the landed-state proof only shows
// that the deck matches the approved cells. This closes the loop from the other
// side: each of the nineteen builds is mounted cold in the deck AND cold in the
// prototype at its ruled default (`?proto=gate2`, no path param), through the
// same pipeline, and the two frames are compared per pixel.
//
// It is the specialization that needs proving. The shipped stage carries the
// ruled failure language (the absence) and the ruled birth (pool) and nothing
// else — the reach, the flow, the archived D3-C record, the fragment pool they
// were drawn on, the birth alternates and the runtime selectors are all gone.
// Every one of those removals is claimed to be inert. If any of them was not,
// a settled frame moves, and this catches it.
//
// A differing pixel is one whose max channel delta exceeds 2/255. ANY differing
// pixel fails.
//
// Usage: node transplant-proof.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;

// [cell id, deck slide (1-based), proto slide (1-based), build]
const BUILDS = [];
[['the-direct-exchange', 3, 1, 5, 's2'], ['the-breakthrough', 4, 2, 9, 's3'],
  ['spend-or-save', 5, 3, 5, 's4']].forEach(([, deckSlide, protoSlide, beats, tag]) => {
  for (let b = 0; b < beats; b += 1) BUILDS.push({ id: `${tag}-b${b + 1}`, deckSlide, protoSlide, build: b });
});

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  let page;
  const freshPage = async () => {
    if (page) await page.close();
    page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
  };

  const capture = async (url, slide, build, globalName) => {
    await freshPage();
    await page.goto(`${url}&slide=${slide}`, { waitUntil: 'networkidle' });
    // The engine re-persists its state after the 300ms crossfade; seeding the
    // build step before that lands would be overwritten. Wait for the mount.
    await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
      null, { timeout: 30000 });
    await page.evaluate(([i, b]) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
    }, [slide - 1, build]);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForFunction((g) => window.__deck && window[g], globalName, { timeout: 30000 });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
    });
    await page.waitForFunction((g) => window[g].settled(), globalName, { timeout: 30000 });
    // The chrome fades over 400ms; wait for it to be gone rather than guessing.
    // A fixed timeout let the counter and the progress bar into one frame here.
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForFunction(() => {
      const c = document.querySelector('.deck-chrome');
      return !c || getComputedStyle(c).opacity === '0';
    }, null, { timeout: 15000 });
    await page.waitForTimeout(150);
    return page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  };

  const deckShots = {};
  const protoShots = {};
  for (const b of BUILDS) {
    deckShots[b.id] = await capture(`${BASE}/?x=1`, b.deckSlide, b.build, '__act1');
    protoShots[b.id] = await capture(`${BASE}/?proto=gate2`, b.protoSlide, b.build, '__gate2');
    console.log(`captured ${b.id}`);
  }

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
  for (const b of BUILDS) {
    const r = await diff(deckShots[b.id], protoShots[b.id]);
    const pass = r.diffPixels === 0;
    if (!pass) failures += 1;
    results.push({ beat: b.id, deck: `${b.deckSlide}:${b.build}`, proto: `${b.protoSlide}:${b.build}`, ...r, pass });
    console.log(`${pass ? 'MATCH' : 'FAIL '} ${b.id.padEnd(7)} ${String(r.diffPixels).padStart(7)} px (max ${r.maxDelta})`);
    if (!pass) {
      fs.writeFileSync(path.join(__dirname, `transplant-fail-${b.id}-deck.png`), deckShots[b.id]);
      fs.writeFileSync(path.join(__dirname, `transplant-fail-${b.id}-proto.png`), protoShots[b.id]);
    }
  }

  fs.writeFileSync(path.join(__dirname, '..', 'transplant-proof.json'), JSON.stringify({
    date: new Date().toISOString(),
    rule: "each of Act I's nineteen builds, mounted cold in the deck, is the closed prototype's own frame at that build (?proto=gate2 at its ruled default) at zero differing pixels",
    builds: results.length,
    passed: results.length - failures,
    results,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${results.length - failures}/${results.length} builds identical to the prototype`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(failures || errors.length ? 1 : 0);
})();
