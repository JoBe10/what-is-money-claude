// R7.2 — the dark-field contact sheet (brief §2.2, §5.2).
//
// The grade gate proves the light. This proves the *look*: every render at the
// size it actually ships at, on black, side by side, so the two clauses the
// gate cannot measure can be judged — single-key-light consistency, and the
// absence of text baked into an image.
//
// It renders through the shipping component (components/DarkField.js), so the
// measured framing normalization is included and a pending subject appears as
// its stub, exactly as on the slide. A sheet that redrew the images itself
// would prove something the deck does not do.
//
// Usage: node contact-r7-2.cjs [--port 4318]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '4318');
const BASE = `http://localhost:${PORT}`;
const OUT = path.join(__dirname, '..', 'dark-field');
fs.mkdirSync(OUT, { recursive: true });

// Every surface a subject appears on, at the box size it appears at. The rail
// row is quoted at its on-stage size (180×135 world at the row camera's 1.6×),
// because that is what the presenter sees.
const SURFACES = [
  { subject: 'surgeon', where: '4.03 — the sensory anchor', w: 620, h: 827 },
  { subject: 'shoe', where: '4.04 — what he did not receive', w: 300, h: 225 },
  { subject: 'meal', where: '4.04 — what he did not receive', w: 300, h: 225 },
  { subject: 'wine', where: '4.04 — what he did not receive', w: 300, h: 225 },
  { subject: 'shoe', where: '4.05 — the spend road', w: 210, h: 158 },
  { subject: 'meal', where: '4.05 — the spend road', w: 210, h: 158 },
  { subject: 'wine', where: '4.05 — the spend road', w: 210, h: 158 },
  { subject: 'shells', where: '4.06 — the carrier lineup', w: 150, h: 112 },
  { subject: 'gold', where: '4.06 — the carrier lineup', w: 150, h: 112 },
  { subject: 'paper', where: '4.06 — the carrier lineup', w: 150, h: 112 },
  { subject: 'ledger', where: '4.06 — the carrier lineup', w: 150, h: 112 },
  { subject: 'bitcoin', where: '4.06 — the carrier lineup', w: 150, h: 112 },
  { subject: 'cattle', where: '2.04 — the contender row (on stage)', w: 288, h: 216 },
  { subject: 'salt', where: '2.04 — the contender row (on stage)', w: 288, h: 216 },
  { subject: 'shells', where: '2.04 — the contender row (on stage)', w: 288, h: 216 },
  { subject: 'iron', where: '2.04 — the contender row (on stage)', w: 288, h: 216 },
  { subject: 'gold', where: '2.05 — the arrival (flagged candidate)', w: 320, h: 240 }
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1560, height: 1200 } });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });

  const summary = await page.evaluate(async (SURFACES) => {
    const { DarkFieldImage } = await import('/src/components/DarkField.js');
    const wrap = document.createElement('div');
    wrap.id = 'sheet';
    wrap.innerHTML = `<style>
      #sheet { position:fixed; inset:0; background:#000; color:#fff; z-index:9999;
        font-family:Inter,sans-serif; padding:40px 44px; overflow:auto; }
      #sheet h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase;
        color:#F7931A; margin:0 0 10px; font-weight:500; }
      #sheet p.note { font-size:13px; color:rgba(255,255,255,.5); margin:0 0 34px; max-width:900px; line-height:1.6; }
      #sheet .grid { display:flex; flex-wrap:wrap; gap:40px 34px; align-items:flex-end; }
      #sheet figure { margin:0; }
      #sheet figcaption { margin-top:10px; font-size:11px; letter-spacing:.13em;
        text-transform:uppercase; color:rgba(255,255,255,.45); }
      #sheet .pending { color:#F7931A; }
    </style>`;
    document.body.appendChild(wrap);

    const h1 = document.createElement('h1');
    h1.textContent = 'R7.2 dark-field contact sheet — every render at the size it ships at';
    wrap.appendChild(h1);
    const note = document.createElement('p');
    note.className = 'note';
    note.textContent = 'Rendered through the shipping component, so the measured framing normalization is applied and a pending subject shows the stub the slide shows. Judge two things the grade gate cannot: whether every image reads as one shoot under one warm key, and whether any image has text baked into it.';
    wrap.appendChild(note);

    const grid = document.createElement('div');
    grid.className = 'grid';
    const rows = [];
    SURFACES.forEach((s) => {
      const fig = document.createElement('figure');
      const df = DarkFieldImage({ name: s.subject, width: s.w, height: s.h, alt: s.subject });
      df.el.dataset.visible = 'true';
      fig.appendChild(df.el);
      const cap = document.createElement('figcaption');
      cap.innerHTML = `${s.subject} · ${s.w}×${s.h}<br>${s.where}` +
        (df.present ? '' : '<br><span class="pending">DARK-FIELD PENDING</span>');
      fig.appendChild(cap);
      grid.appendChild(fig);
      rows.push({ ...s, present: df.present });
    });
    wrap.appendChild(grid);
    return rows;
  }, SURFACES);

  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(OUT, 'contact-sheet.png'), fullPage: true });
  fs.writeFileSync(path.join(OUT, 'contact-sheet.json'), JSON.stringify(summary, null, 2));

  const pending = summary.filter((s) => !s.present).map((s) => s.subject);
  const uniquePending = [...new Set(pending)];
  console.log(`contact sheet → review/rebuild-r7-2/dark-field/contact-sheet.png`);
  console.log(`${summary.length} surfaces, ${summary.length - pending.length} rendered, ${pending.length} pending`);
  console.log(`pending subjects: ${uniquePending.join(', ') || 'none'}`);
  await browser.close();
})();
