// Pixel-compare two PNGs by decoding them in a headless canvas. Used to prove
// a refactor changed nothing it was not supposed to change.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const pairs = process.argv.slice(2).map((a) => a.split('::'));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent('<canvas id="a"></canvas><canvas id="b"></canvas>');

  const compare = (aBuf, bBuf) => page.evaluate(async ([aSrc, bSrc]) => {
    const load = (src) => new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = src;
    });
    const [ia, ib] = await Promise.all([load(aSrc), load(bSrc)]);
    if (ia.width !== ib.width || ia.height !== ib.height) {
      return { same: false, reason: `size ${ia.width}x${ia.height} vs ${ib.width}x${ib.height}` };
    }
    const grab = (img, id) => {
      const c = document.getElementById(id);
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      return ctx.getImageData(0, 0, c.width, c.height).data;
    };
    const da = grab(ia, 'a');
    const db = grab(ib, 'b');
    let diff = 0;
    let maxDelta = 0;
    for (let i = 0; i < da.length; i += 4) {
      const d = Math.max(
        Math.abs(da[i] - db[i]),
        Math.abs(da[i + 1] - db[i + 1]),
        Math.abs(da[i + 2] - db[i + 2])
      );
      if (d > 2) { diff += 1; if (d > maxDelta) maxDelta = d; }
    }
    const total = da.length / 4;
    return { same: diff === 0, diff, total, pct: ((diff / total) * 100).toFixed(4), maxDelta };
  }, [`data:image/png;base64,${aBuf.toString('base64')}`, `data:image/png;base64,${bBuf.toString('base64')}`]);

  let failures = 0;
  for (const [a, b] of pairs) {
    if (!fs.existsSync(a) || !fs.existsSync(b)) {
      console.log(`MISSING  ${path.basename(a)}`);
      failures += 1;
      continue;
    }
    const r = await compare(fs.readFileSync(a), fs.readFileSync(b));
    const name = path.basename(a);
    if (r.same) {
      console.log(`  identical   ${name}`);
    } else {
      failures += 1;
      console.log(`  DIFFERS     ${name} :: ${r.reason || `${r.diff}/${r.total} px (${r.pct}%), max channel delta ${r.maxDelta}`}`);
    }
  }
  await browser.close();
  process.exit(failures ? 1 : 0);
})();
