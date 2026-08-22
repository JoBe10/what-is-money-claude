// R7.4 §C — the carrier's decisive round. PROPOSALS ONLY.
//
// The arc shell is retired on sight, and the brief asks for five genuinely
// different treatments rather than three variations on one. So the five below
// are five different *answers to the question* rather than five drawings:
//
//   1. the capsule hull   — the old capsule's confidence, reinterpreted as an
//                           enclosure: a dual-stroke hull with a low fill and
//                           the disc glowing inside it.
//   2. the vault ring     — a full faceted enclosure, octagonal, material
//                           stroke, its own glow. Nothing gets in or out.
//   3. the soft vessel    — a continuous rounded enclosure with a low-opacity
//                           warm fill: a body, not a boundary.
//   4. the minimal orbit  — one fine full ring, no gaps, no terminals. The
//                           quietest thing that is still an enclosure.
//   5. no shell           — the disc alone. Carrier identity carried entirely
//                           by label and context.
//
// None of them is wired to the deck. `CarrierShell.js` is untouched, this file
// has no importer in `src/`, and applying a selection means copying its markup
// into that component and changing one letter — exactly as the icon set works.
//
// Every candidate is shown at the three scales the shell actually ships at,
// measured from the live DOM at R7.2, and in the save/carry motion still — the
// state the choreography holds longest and the one the presenter watches.
//
// Usage: node review/rebuild-r7-4/harness/carrier-studio-r7-4.mjs [--port 4321]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '..', 'carrier-studio');
fs.mkdirSync(out, { recursive: true });
const args = process.argv.slice(2);
const PORT = args.includes('--port') ? args[args.indexOf('--port') + 1] : '4321';

const SCALES = [
  { name: '4.06 / 4.07 — the scene', shell: 240, disc: 116 },
  { name: '4.05 — the save road', shell: 164, disc: 104 },
  { name: '4.10–4.12 — the stress stage', shell: 120, disc: 76 }
];

// Geometry on a 240-unit viewBox, scaled per instance. The grammar's single
// 2.5 stroke throughout — hierarchy from silhouette, never from weight — with
// one deliberate exception recorded in candidate 1, where the brief asks for
// "dual-stroke, subtle fill, real weight".
const CANDIDATES = [
  {
    id: 'capsule-hull',
    title: '1 — the capsule hull',
    idea: 'The old capsule\'s confident hull, reinterpreted as an enclosure rather than an object: a dual-stroke wall with a low fill, and the claim glowing inside it. The one candidate that answers the brief\'s "real weight" literally.',
    svg: `
      <rect x="14" y="50" width="212" height="140" rx="70"
            fill="rgba(247,147,26,0.06)" stroke="currentColor" stroke-width="2.5"/>
      <rect x="22" y="58" width="196" height="124" rx="62"
            fill="none" stroke="currentColor" stroke-width="1" opacity="0.55"/>`
  },
  {
    id: 'vault-ring',
    title: '2 — the faceted vault ring',
    idea: 'A full enclosure with no openings, cut as an octagon so the eye reads a made thing rather than a circle. Material stroke, its own glow. The strongest reading of "vault"; also the least openable, which is a claim the carrier argument may not want to make.',
    svg: `
      <polygon points="120,18 192,48 222,120 192,192 120,222 48,192 18,120 48,48"
               fill="none" stroke="currentColor" stroke-width="2.5"/>
      <polygon points="120,34 181,59 206,120 181,181 120,206 59,181 34,120 59,59"
               fill="none" stroke="currentColor" stroke-width="1" opacity="0.45"/>`
  },
  {
    id: 'soft-vessel',
    title: '3 — the soft vessel',
    idea: 'A continuous rounded enclosure with a low warm fill: a body with an inside, not a boundary drawn around a gap. Quieter than the hull and warmer than the ring; the fill is what makes it a container rather than an outline.',
    svg: `
      <path d="M120 20 C176 20 220 64 220 120 C220 176 176 220 120 220 C64 220 20 176 20 120 C20 64 64 20 120 20 Z"
            fill="rgba(247,147,26,0.075)" stroke="currentColor" stroke-width="2.5"/>`
  },
  {
    id: 'minimal-orbit',
    title: '4 — the minimal orbit',
    idea: 'One fine full ring, no gaps, no terminals, no fill. The quietest option that is still an enclosure — it says "held" and nothing else, and it is the only candidate that never competes with the disc\'s own light.',
    svg: `<circle cx="120" cy="120" r="100" fill="none" stroke="currentColor" stroke-width="1.4"/>`
  },
  {
    id: 'no-shell',
    title: '5 — no shell',
    idea: 'The disc alone. Carrier identity carried by label and context — which is how the rest of the deck already does it, and the honest test of whether the shell is load-bearing at all.',
    svg: ''
  }
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1560, height: 1400 } });
await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });

// The deck's own disc, from the deck's own module — anything else would prove
// the wrong thing about how these read around it.
await page.evaluate(async ({ SCALES, CANDIDATES }) => {
  const { LuminousDisc } = await import('/src/components/LuminousDisc.js');
  const wrap = document.createElement('div');
  wrap.id = 'studio';
  wrap.innerHTML = `<style>
    #studio { position:fixed; inset:0; background:#000; color:#fff; z-index:9999; overflow:auto;
      font-family:Inter,sans-serif; padding:36px 40px 60px; }
    #studio h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A;
      margin:0 0 8px; font-weight:500; }
    #studio p.note { font-size:13px; color:rgba(255,255,255,.5); margin:0 0 30px; max-width:1180px; line-height:1.6; }
    #studio table { border-collapse:collapse; width:100%; }
    #studio th { font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.42);
      font-weight:500; padding:0 0 14px; text-align:center; vertical-align:bottom; }
    #studio td { padding:16px 8px; text-align:center; vertical-align:middle; border-top:1px solid #171717; }
    #studio .rowlabel { font-size:10px; letter-spacing:.16em; text-transform:uppercase;
      color:rgba(255,255,255,.42); text-align:left; width:172px; }
    #studio .cell { position:relative; display:inline-grid; place-items:center; }
    #studio .cell > svg { position:absolute; color:#F7931A;
      filter:drop-shadow(0 0 12px rgba(247,147,26,.28)); }
    #studio .title { font-size:14px; font-weight:600; color:#fff; margin-bottom:4px; }
    #studio .idea { font-size:11.5px; line-height:1.5; color:#9a9a9a; padding:14px 10px 0; text-align:left;
      vertical-align:top; }
    #studio .carry { background:#050505; }
  </style>`;
  document.body.appendChild(wrap);

  const h1 = document.createElement('h1');
  h1.textContent = 'R7.4 carrier studio — five treatments, at the scales they ship at, around the claim';
  wrap.appendChild(h1);
  const note = document.createElement('p');
  note.className = 'note';
  note.textContent = 'The arc shell is retired. Five different answers rather than five drawings: a hull, a vault, a vessel, an orbit, and nothing. Each is shown at the three scales the shell ships at, and in the save/carry state the choreography holds longest. Nothing here is wired to the deck — CarrierShell.js is untouched and this file has no importer in src/. The presenter selects.';
  wrap.appendChild(note);

  const table = document.createElement('table');
  const head = document.createElement('tr');
  head.appendChild(document.createElement('th'));
  CANDIDATES.forEach((c) => {
    const th = document.createElement('th');
    th.innerHTML = `<div class="title">${c.title}</div>`;
    head.appendChild(th);
  });
  table.appendChild(head);

  const cell = (c, shell, disc) => {
    const td = document.createElement('td');
    const box = document.createElement('div');
    box.className = 'cell';
    box.style.width = `${shell}px`;
    box.style.height = `${shell}px`;
    if (c.svg) {
      box.innerHTML = `<svg viewBox="0 0 240 240" width="${shell}" height="${shell}"
        stroke-linecap="round" stroke-linejoin="round">${c.svg}</svg>`;
    }
    box.appendChild(LuminousDisc({ size: disc }));
    td.appendChild(box);
    return td;
  };

  SCALES.forEach((s) => {
    const tr = document.createElement('tr');
    const label = document.createElement('td');
    label.className = 'rowlabel';
    label.textContent = `${s.name} · shell ${s.shell} · disc ${s.disc}`;
    tr.appendChild(label);
    CANDIDATES.forEach((c) => tr.appendChild(cell(c, s.shell, s.disc)));
    table.appendChild(tr);
  });

  // The motion still: the save/carry state, where the carrier is holding the
  // claim through time and the trailing side has dimmed.
  const carry = document.createElement('tr');
  carry.className = 'carry';
  const carryLabel = document.createElement('td');
  carryLabel.className = 'rowlabel';
  carryLabel.textContent = 'the save / carry state';
  carry.appendChild(carryLabel);
  CANDIDATES.forEach((c) => {
    const td = cell(c, 200, 104);
    const svg = td.querySelector('svg');
    if (svg) {
      svg.style.opacity = '0.9';
      svg.style.transform = 'translateX(6px)';
      svg.style.filter = 'drop-shadow(0 0 18px rgba(247,147,26,.34))';
    }
    carry.appendChild(td);
  });
  table.appendChild(carry);

  const ideas = document.createElement('tr');
  ideas.appendChild(document.createElement('td'));
  CANDIDATES.forEach((c) => {
    const td = document.createElement('td');
    td.className = 'idea';
    td.textContent = c.idea;
    ideas.appendChild(td);
  });
  table.appendChild(ideas);

  wrap.appendChild(table);
}, { SCALES, CANDIDATES });

await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(out, 'contact-sheet.png'), fullPage: true });
fs.writeFileSync(path.join(out, 'candidates-r7-4.json'), JSON.stringify({ phase: 'R7.4', scales: SCALES, candidates: CANDIDATES }, null, 2));
await browser.close();
console.log(`R7.4 carrier studio: ${CANDIDATES.length} treatments × ${SCALES.length} scales + the carry state → review/rebuild-r7-4/carrier-studio/contact-sheet.png`);
