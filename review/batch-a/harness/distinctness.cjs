// Batch A — the recorded `gold_certificate` distinctness check
// (docs/batch-a-package.md §5; docs/batch-a-selections-report.md §6.1, §7).
//
// The Batch A package asked for "an antique gold-certificate note, visually
// distinct from the fiat note (Scene 7)". `gold_certificate` landed on 25
// August; `fiat` was the register's one gap, so the clause has been
// unconfirmable ever since. Both now exist, so the check runs.
//
// It produces the artifact a visual clause needs — the two renders side by
// side, through the deck's own render path (DarkFieldImage, the measured
// framing, the deck's black), at the two scales they actually ship at — plus
// the measurements that are measurable. The verdict itself stays a human
// judgment on the strip, which is what the register's own law says (§0: the
// visual read "stays a human judgment on the contact sheet").
//
// Usage: node distinctness.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const OUT = path.join(__dirname, '..');

// Display scale is the Prologue's own form scale (540 tall at the recorded
// centre); lineup scale is ComparisonAssetHeader's DISPLAY_BOX.
const PAIRS = [
  { key: 'gold_certificate', alt: 'An antique gold certificate emerging from darkness', aspect: 1122 / 1402 },
  { key: 'fiat', alt: 'A folded banknote emerging from darkness', aspect: 1672 / 941 }
];

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(`http://127.0.0.1:${PORT}/?proto=list`, { waitUntil: 'domcontentloaded' });

  const stats = await page.evaluate(async (pairs) => {
    const { DarkFieldImage } = await import('/src/components/DarkField.js');
    const stage = document.createElement('div');
    stage.id = 'distinctness-stage';
    stage.style.cssText = 'position:fixed; left:0; top:0; width:1920px; height:1080px;' +
      'background:#000; overflow:hidden; z-index:9999; font-family:Inter,sans-serif;';
    document.body.appendChild(stage);

    const label = (copy, x, y, size, alpha) => {
      const p = document.createElement('p');
      p.textContent = copy;
      p.style.cssText = `position:absolute; margin:0; left:${x}px; top:${y}px; width:760px;` +
        `text-align:center; font-size:${size}px; font-weight:500; letter-spacing:0.22em;` +
        `text-transform:uppercase; color:rgba(255,255,255,${alpha});`;
      stage.appendChild(p);
    };

    // Row 1 — display scale: each render in a box of its own aspect, 460 tall,
    // so the framing rule holds and the two are compared at equal height.
    const H = 460;
    const readings = [];
    pairs.forEach((p, i) => {
      const w = Math.round(H * p.aspect);
      const cx = 480 + i * 960;
      const box = DarkFieldImage({ name: p.key, width: w, height: H, alt: p.alt });
      box.el.dataset.visible = 'true';
      box.el.style.position = 'absolute';
      box.el.style.left = `${cx - w / 2}px`;
      box.el.style.top = `${170}px`;
      stage.appendChild(box.el);
      label(p.key.replace(/_/g, ' '), cx - 380, 92, 18, 0.55);
      readings.push({ key: p.key, displayBox: [w, H] });
    });

    // Row 2 — lineup scale: ComparisonAssetHeader's 180×150 display box, the
    // size at which a collision would actually be seen.
    pairs.forEach((p, i) => {
      const cx = 480 + i * 960;
      const box = DarkFieldImage({ name: p.key, width: 180, height: 150, alt: p.alt });
      box.el.dataset.visible = 'true';
      box.el.style.position = 'absolute';
      box.el.style.left = `${cx - 90}px`;
      box.el.style.top = '760px';
      stage.appendChild(box.el);
    });
    label('lineup scale · 180 × 150', 100, 950, 15, 0.4);
    label('lineup scale · 180 × 150', 1060, 950, 15, 0.4);

    await document.fonts.ready;
    await Promise.all([...stage.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));

    // Measured colour separation: mean RGB of the highlight population of each
    // render, sampled from the source image at native resolution.
    const sample = (src) => new Promise((res) => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        const ctx = c.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);
        const d = ctx.getImageData(0, 0, c.width, c.height).data;
        let n = 0; let r = 0; let g = 0; let b = 0;
        for (let p = 0; p < d.length; p += 4) {
          const L = 0.2126 * d[p] + 0.7152 * d[p + 1] + 0.0722 * d[p + 2];
          if (L < 128) continue;
          n += 1; r += d[p]; g += d[p + 1]; b += d[p + 2];
        }
        res(n ? { highlightRGB: [Math.round(r / n), Math.round(g / n), Math.round(b / n)], highlightFrac: +(n / (c.width * c.height)).toFixed(4) } : null);
      };
      img.onerror = () => res(null);
      img.src = src;
    });
    for (const rd of readings) {
      const el = stage.querySelector(`.df[data-subject="${rd.key}"] img`);
      Object.assign(rd, await sample(el.src));
      rd.natural = [el.naturalWidth, el.naturalHeight];
      rd.aspect = +(el.naturalWidth / el.naturalHeight).toFixed(3);
    }
    return readings;
  }, PAIRS);

  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUT, 'gold-certificate-vs-fiat.png'),
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });
  await page.evaluate(() => document.getElementById('distinctness-stage')?.remove());

  const [gc, fi] = stats;
  const dRGB = gc.highlightRGB.map((v, i) => v - fi.highlightRGB[i]);
  const record = {
    date: new Date().toISOString(),
    check: 'docs/batch-a-package.md §5 — `gold_certificate` must be visually distinct from the fiat note',
    strip: 'review/batch-a/gold-certificate-vs-fiat.png (display scale, and the lineup box)',
    measurements: stats,
    highlightDelta: { rgb: dRGB, note: 'gold_certificate minus fiat, mean RGB of the highlight population' },
    verdict: 'recorded on the strip — the visual read is the register\'s own human clause (§0)',
    consoleErrors: errors
  };
  fs.writeFileSync(path.join(OUT, 'distinctness.json'), JSON.stringify(record, null, 2));
  console.log(JSON.stringify(record.measurements, null, 2));
  console.log('highlight RGB delta (gold_certificate − fiat):', dRGB.join(', '));
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
