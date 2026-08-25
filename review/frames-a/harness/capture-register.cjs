// Batch A register sheet — the new arrivals beside the library, duplicated
// subjects in ALL passing variants side by side (presenter instruction: the
// session gates and includes, it does not choose between studies).
//
// Rendered through the shipping component so the measured framing rule is
// applied — the sheet judges the one-shoot read, and which study serves which
// scene stays the presenter's ruling.
//
// Usage: node capture-register.cjs [--port 5273]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const OUT = path.join(__dirname, '..', 'register');
fs.mkdirSync(OUT, { recursive: true });

// Boxes match each render's aspect family (4:3, 4:5, 3:2) at one shared height
// per row, so a row compares subjects rather than crops.
const GROUPS = [
  ['The cowrie — three passing studies (P1 morph · 2.4 contenders · 4.06 lineup)', [
    ['single_cowrie', 240, 300, 'NEW — the single shell, P1 morph center scale'],
    ['cowrie_shells', 240, 300, 'the R7.3 contender cluster'],
    ['shells', 400, 300, 'the first-shoot cluster, carrier lineup']
  ]],
  ['The ledger — two passing studies (Scene 8 transformation · 4.06 lineup)', [
    ['ledger_glow', 450, 300, 'NEW — the glowing close-up, Scene 8'],
    ['ledger', 400, 300, 'the bank ledger, carrier lineup']
  ]],
  ['The note — two passing studies (Scene 7 claim on gold · 4.06 lineup)', [
    ['gold_certificate', 240, 300, 'NEW — the antique gold certificate, Scene 7'],
    ['paper', 400, 300, 'the plain note, carrier lineup — fiat still pending (§3.0)']
  ]],
  ['The rest of the Batch A drop', [
    ['vault', 288, 360, 'Scene 7 custody'],
    ['palladium', 288, 360, 'Scene 10, the bar'],
    ['coffee_cup', 288, 360, 'Scene 14, the coffee objection']
  ]]
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1700, height: 1200 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(`http://127.0.0.1:${PORT}/?proto=list`, { waitUntil: 'networkidle' });
  const rows = await page.evaluate(async (GROUPS) => {
    const { DarkFieldImage } = await import('/src/components/DarkField.js');
    const wrap = document.createElement('div');
    wrap.id = 'register-sheet';
    wrap.innerHTML = `<style>
      #register-sheet { position:absolute; top:0; left:0; min-width:100%; background:#000; color:#fff;
        z-index:9999; font-family:Inter,sans-serif; padding:44px 48px 64px; }
      #register-sheet h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase;
        color:#F7931A; margin:0 0 10px; font-weight:500; }
      #register-sheet p.note { font-size:13px; color:rgba(255,255,255,.5); margin:0 0 36px; max-width:920px; line-height:1.6; }
      #register-sheet h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase;
        color:rgba(255,255,255,.85); margin:40px 0 16px; font-weight:500; }
      #register-sheet .row { display:flex; gap:34px; align-items:flex-end; }
      #register-sheet figure { margin:0; }
      #register-sheet figcaption { margin-top:9px; font-size:11px; letter-spacing:.12em;
        text-transform:uppercase; color:rgba(255,255,255,.45); max-width:400px; line-height:1.6; }
      #register-sheet .new { color:#F7931A; }
    </style>`;
    document.body.appendChild(wrap);

    const h1 = document.createElement('h1');
    h1.textContent = 'Batch A register sheet — new arrivals beside the library, all passing variants';
    wrap.appendChild(h1);
    const note = document.createElement('p');
    note.className = 'note';
    note.textContent = 'Rendered through the shipping component with the measured framing rule. Where a subject now has more than one passing study, every variant is on this sheet — which study serves which scene is a presenter ruling, not a session choice. Judge the two clauses the gate cannot: one shoot under one warm key, and no baked text.';
    wrap.appendChild(note);

    const out = [];
    for (const [title, list] of GROUPS) {
      const h2 = document.createElement('h2');
      h2.textContent = title;
      wrap.appendChild(h2);
      const row = document.createElement('div');
      row.className = 'row';
      for (const [name, w, h, caption] of list) {
        const fig = document.createElement('figure');
        const df = DarkFieldImage({ name, width: w, height: h, alt: name });
        df.el.dataset.visible = 'true';
        fig.appendChild(df.el);
        const cap = document.createElement('figcaption');
        cap.innerHTML = `${name} · ${w}×${h}<br>` +
          caption.replace(/^NEW — /, '<span class="new">NEW</span> — ');
        fig.appendChild(cap);
        row.appendChild(fig);
        out.push({ name, w, h, present: df.present });
      }
      wrap.appendChild(row);
    }
    return out;
  }, GROUPS);

  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    await Promise.all([...document.querySelectorAll('#register-sheet img')].map((i) => i.decode().catch(() => {})));
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, 'contact-sheet.png'), fullPage: true });
  fs.writeFileSync(path.join(OUT, 'register.json'), JSON.stringify({ rows, consoleErrors: errors }, null, 2));

  const missing = rows.filter((r) => !r.present).map((r) => r.name);
  console.log(`register sheet → review/frames-a/register/contact-sheet.png`);
  console.log(`${rows.length} surfaces; missing: ${missing.join(', ') || 'none'}; console errors: ${errors.length}`);
  await browser.close();
  process.exit(errors.length || missing.length ? 1 : 0);
})();
