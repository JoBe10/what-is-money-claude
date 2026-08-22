// R7.2 §C3 — the carrier-shell studio.
//
// Three constructions for the shell, rendered at the three scales it actually
// ships at, each with the claim disc inside it at that slide's size. The
// legibility rule (icon grammar §1) says a mark is judged at the surface, not
// in the studio, so the sheet puts the disc in every cell: the question is not
// "is this a nice ring" but "does this read as a body around *that*".
//
// Shipping scales, measured from the live DOM:
//   4.06 / 4.07  the scene box — a 240-unit shell around a 116px disc
//   4.05         the save road — inset -46 on a 180×72 stage, ~164px shell
//   4.10–4.12    the stress stage — the smallest instance
//
// Usage: node carrier-studio-r7-2.cjs [--port 4318]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '4318');
const BASE = `http://localhost:${PORT}`;
const OUT = path.join(__dirname, '..', 'carrier-studio');
fs.mkdirSync(OUT, { recursive: true });

const SCALES = [
  { name: '4.06 / 4.07 — the scene', shell: 240, disc: 116 },
  { name: '4.05 — the save road', shell: 164, disc: 104 },
  { name: '4.10–4.12 — the stress stage', shell: 120, disc: 76 }
];
const CANDIDATES = [
  ['a', 'the doubled arc'],
  ['b', 'the stave ring'],
  ['c', 'the banded wall']
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1180, height: 1180 } });

  // Drive the deck's own modules so the sheet renders the shipping code, not a
  // copy of it. Anything else would prove the wrong thing.
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });

  const html = await page.evaluate(async ({ SCALES, CANDIDATES }) => {
    const [{ CarrierShell }, { LuminousDisc }] = await Promise.all([
      import('/src/components/section-4/CarrierShell.js'),
      import('/src/components/LuminousDisc.js')
    ]);
    const wrap = document.createElement('div');
    wrap.id = 'studio';
    wrap.innerHTML = `<style>
      #studio { position:fixed; inset:0; background:#000; color:#fff; z-index:9999;
        font-family:Inter,sans-serif; padding:36px 40px; overflow:auto; }
      #studio h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase;
        color:#F7931A; margin:0 0 28px; font-weight:500; }
      #studio table { border-collapse:collapse; width:100%; }
      #studio th { font-size:11px; letter-spacing:.18em; text-transform:uppercase;
        color:rgba(255,255,255,.5); font-weight:500; padding:0 0 16px; }
      #studio td { text-align:center; padding:14px 8px 26px; vertical-align:middle; }
      #studio .row-label { font-size:11px; letter-spacing:.16em; text-transform:uppercase;
        color:rgba(255,255,255,.45); text-align:left; width:200px; }
      #studio .cell { position:relative; display:inline-grid; place-items:center; }
      #studio .cell > .s4-carrier-shell { position:absolute; inset:0; }
    </style>`;
    document.body.appendChild(wrap);

    const h1 = document.createElement('h1');
    h1.textContent = 'R7.2 carrier studio — three constructions, at the scales they ship at, around the claim';
    wrap.appendChild(h1);

    const table = document.createElement('table');
    const head = document.createElement('tr');
    head.innerHTML = '<th class="row-label"></th>' +
      CANDIDATES.map(([k, why]) => `<th>${k.toUpperCase()} — ${why}</th>`).join('');
    table.appendChild(head);

    SCALES.forEach((s) => {
      const tr = document.createElement('tr');
      const label = document.createElement('td');
      label.className = 'row-label';
      label.textContent = s.name;
      tr.appendChild(label);
      CANDIDATES.forEach(([k]) => {
        const td = document.createElement('td');
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.width = `${s.shell}px`;
        cell.style.height = `${s.shell}px`;
        const shell = CarrierShell({ candidate: k });
        shell.applyState({ visible: true, focus: 'none' });
        cell.appendChild(shell.el);
        cell.appendChild(LuminousDisc({ size: s.disc }));
        td.appendChild(cell);
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });

    // One extra row: the travel state, where the focus split has to still read.
    const tr = document.createElement('tr');
    const label = document.createElement('td');
    label.className = 'row-label';
    label.textContent = 'focus: future (4.09)';
    tr.appendChild(label);
    CANDIDATES.forEach(([k]) => {
      const td = document.createElement('td');
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.style.width = '240px';
      cell.style.height = '240px';
      const shell = CarrierShell({ candidate: k });
      shell.applyState({ visible: true, focus: 'future' });
      cell.appendChild(shell.el);
      cell.appendChild(LuminousDisc({ size: 116 }));
      td.appendChild(cell);
      tr.appendChild(td);
    });
    table.appendChild(tr);

    wrap.appendChild(table);
    return wrap.outerHTML.length;
  }, { SCALES, CANDIDATES });

  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(OUT, 'contact-sheet.png'), fullPage: true });
  console.log(`carrier studio sheet written (${html} chars of markup) → review/rebuild-r7-2/carrier-studio/contact-sheet.png`);
  await browser.close();
})();
