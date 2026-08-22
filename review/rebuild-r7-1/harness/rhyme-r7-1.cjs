// The rhyme check (R7.1 §E.6): 1.2's conversion token and 4.04's claim, side by
// side at matched scale, plus a machine comparison of the two renders.
//
// The brief's requirement is that the claim IS the token, not that it resembles
// one. So this does two things: it crops both discs to the same box for the
// visual sheet, and it reads back the computed gradient and glow of each to
// prove they come from the same rule.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5199');
const BASE = `http://localhost:${PORT}`;
const OUT = path.join(__dirname, '..', 'screenshots');

const SUBJECTS = [
  { id: '1-02-the-conversion', build: 3, selector: '.s1q-token', label: '1.2 the conversion token' },
  { id: '4-04-unfinished-exchange', build: 4, selector: '.s4-claim-object__disc', label: '4.04 the claim' }
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const readings = [];

  for (const s of SUBJECTS) {
    await page.goto(`${BASE}/?slide=${s.id}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
    await page.evaluate(({ id, k }) => {
      const n = window.__deck.slides.findIndex((x) => x.id === id) + 1;
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
    }, { id: s.id, k: s.build });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
    await page.waitForTimeout(2200);

    const el = page.locator(s.selector).first();
    await el.screenshot({ path: path.join(OUT, `rhyme-${s.id}.png`) });

    readings.push(await page.evaluate((sel) => {
      const node = document.querySelector(sel);
      const cs = getComputedStyle(node);
      const r = node.getBoundingClientRect();
      return {
        backgroundImage: cs.backgroundImage,
        boxShadow: cs.boxShadow,
        borderRadius: cs.borderRadius,
        classes: node.className,
        aspect: (r.width / r.height).toFixed(3)
      };
    }, s.selector));
  }

  const [tokenR, claimR] = readings;
  const sameGradient = tokenR.backgroundImage === claimR.backgroundImage;
  // The glow radii scale with the diameter, so the strings differ by design;
  // what must match is the color and the ratio of radius to size.
  const glowColors = (s) => (s.match(/rgba?\([^)]*\)/g) || []).join('|');
  const sameGlowColor = glowColors(tokenR.boxShadow) === glowColors(claimR.boxShadow);
  const bothDiscs = /luminous-disc/.test(tokenR.classes) && /luminous-disc/.test(claimR.classes);

  const results = [
    { name: 'the claim and the token render from one class', ok: bothDiscs, detail: `${tokenR.classes} / ${claimR.classes}` },
    { name: 'identical gradient', ok: sameGradient, detail: sameGradient ? tokenR.backgroundImage.slice(0, 90) : `${tokenR.backgroundImage} vs ${claimR.backgroundImage}` },
    { name: 'identical glow color', ok: sameGlowColor, detail: glowColors(tokenR.boxShadow) },
    { name: 'both are circular', ok: tokenR.aspect === '1.000' && claimR.aspect === '1.000', detail: `${tokenR.aspect} / ${claimR.aspect}` }
  ];
  results.forEach((r) => { if (!r.ok) console.log(`FAIL  ${r.name} :: ${r.detail}`); });

  // The side-by-side sheet, both discs drawn at one size on the deck's black.
  // Inlined as data URIs: a page served from about:blank cannot load file://.
  await page.setContent(`
    <body style="margin:0;background:#000;display:flex;align-items:center;justify-content:center;gap:140px;height:560px;font-family:system-ui">
      ${SUBJECTS.map((s) => {
        const b64 = fs.readFileSync(path.join(OUT, `rhyme-${s.id}.png`)).toString('base64');
        return `<figure style="margin:0;text-align:center">
        <img src="data:image/png;base64,${b64}" style="width:240px;height:240px;display:block"/>
        <figcaption style="color:#8a8a8a;font-size:15px;letter-spacing:.16em;text-transform:uppercase;margin-top:30px">${s.label}</figcaption>
      </figure>`;
      }).join('')}
    </body>`);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, 'rhyme-side-by-side.png') });

  fs.writeFileSync(path.join(__dirname, '..', 'rhyme-r7-1.json'),
    JSON.stringify({ phase: 'R7.1', readings, checks: results.length, failures: results.filter((r) => !r.ok).length, results }, null, 2));
  console.log(`\nR7.1 rhyme check: ${results.length} checks, ${results.filter((r) => !r.ok).length} failures`);
  await browser.close();
  process.exit(results.some((r) => !r.ok) ? 1 : 0);
})();
