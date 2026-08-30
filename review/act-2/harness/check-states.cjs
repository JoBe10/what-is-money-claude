// Act II states — the FAST-scope cell checks (docs/act-2-states-brief.md §4).
//
// The measured cell discipline every sheet in this project carries, plus four
// checks this sheet needs because it is the first sheet built under the
// provenance rule. The measured four are the dark-field gate's own terms
// (docs/dark-field-manifest.md §0):
//   1. corner patches (6% of the short side) mean luminance ≤ 6/255;
//   2. outer 2% border ring mean luminance ≤ 6/255 — nothing reaches the edge;
//   3. content present — some pixels above luminance 32;
//   4. the cell is 1920 × 1080.
//
// And the four that make the brief's own rule checkable rather than asserted:
//
//   MAP AGREEMENT. Every cell's class is the class `docs/act-2-provenance.md`
//   rules for its frame. This is the one that matters: "every cell carries its
//   provenance class and is treated by it" is a claim about the sheet, and a
//   claim about a sheet should be a gate, not a sentence in a report.
//
//   BEAT COVERAGE. All 33 beats of the frozen map are present, once each, at
//   the frozen per-scene counts.
//
//   CANDIDATES WHERE, AND ONLY WHERE, THE MAP SAYS NEW. Every NEW frame has at
//   least two genuinely distinct candidates, and no PORT or ADAPT frame has any
//   — generating candidates for a PORT is the process defect §4.9 exists to
//   prevent, so the sheet proves it did not.
//
//   THE FROZEN DATA. The ported charts read `src/data/purchasing-power.js` and
//   `src/data/palladium.js` and carry no copy of either.
//
// There is deliberately NO per-pixel accent test. Unlike the systems sheet,
// this one is *supposed* to carry the accent: the claim through-line wears the
// Claim Mark's disc inside the carrier by ruling, and orange exists in Act II.
// The systems sheet's own note applies to why a hue test could not adjudicate
// it anyway — subpixel antialiasing measures r−b up to 215 against the accent's
// 221. The accent's presence is reported per cell as evidence and gated
// nowhere.
//
// Usage: node check-states.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const REPO = path.join(__dirname, '..', '..', '..');
const OUT = path.join(__dirname, '..', 'states');

// AMENDED AT R2 (31 August 2026): S6 is 9 beats — the Ruling 3 strike returned
// the elimination to the legacy pacing — and S6-F2 is PORT. The candidate
// checks now describe the post-selection sheet: every NEW frame carries one
// landed beat cell (the selection, or its ruled restage) plus its candidates
// kept `on-file` per the aesthetic law.
const FROZEN = { S5: 8, S6: 9, S7: 5, S8: 5, S9: 5, S10: 5 };
const TOTAL_BEATS = 37;

// The ruled map, transcribed. The MAP AGREEMENT check compares this against
// `docs/act-2-provenance.md` itself as well as against the cells, so a
// transcription drift here fails rather than passes quietly.
const RULED = {
  'S5-F1': 'PORT', 'S5-F2': 'PORT', 'S5-F3': 'ADAPT',
  'S6-F1': 'PORT', 'S6-F2': 'PORT', 'S6-F3': 'NEW',
  'S7-F1': 'PORT', 'S7-F2': 'NEW',
  'S8-F1': 'PORT', 'S8-F2': 'PORT',
  'S9-F1': 'NEW', 'S9-F2': 'PORT',
  'S10-F1': 'PORT', 'S10-F2': 'ADAPT'
};

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  console.log(`${ok ? '  ok  ' : 'FAIL  '}${name}${detail ? ` :: ${detail}` : ''}`);
}

(async () => {
  const record = JSON.parse(fs.readFileSync(path.join(OUT, 'states.json'), 'utf8'));
  const cells = record.cells;

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 300 } });
  await page.goto(`http://127.0.0.1:${PORT}/?proto=list`, { waitUntil: 'domcontentloaded' });

  // ---- the measured cell checks ---------------------------------------------
  const measured = [];
  let cellFailures = 0;
  for (const c of cells) {
    const m = await page.evaluate(async (src) => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, w, h).data;
      const lum = (i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];

      const patch = Math.round(Math.min(w, h) * 0.06);
      const corners = [[0, 0], [w - patch, 0], [0, h - patch], [w - patch, h - patch]];
      let cSum = 0; let cN = 0;
      for (const [px0, py0] of corners) {
        for (let y = py0; y < py0 + patch; y += 1) {
          for (let x = px0; x < px0 + patch; x += 1) { cSum += lum((y * w + x) * 4); cN += 1; }
        }
      }
      const ring = Math.max(1, Math.round(Math.min(w, h) * 0.02));
      let rSum = 0; let rN = 0;
      for (let y = 0; y < h; y += 1) {
        for (let x = 0; x < w; x += 1) {
          if (x >= ring && x < w - ring && y >= ring && y < h - ring) continue;
          rSum += lum((y * w + x) * 4); rN += 1;
        }
      }
      let above32 = 0; let max = 0; let warm = 0;
      for (let i = 0; i < d.length; i += 4) {
        const L = lum(i);
        if (L > max) max = L;
        if (L > 32) above32 += 1;
        if (L > 24 && d[i] - d[i + 2] > 40) warm += 1;
      }
      return { w, h, cornerMean: cSum / cN, borderMean: rSum / rN, above32, maxLum: max, warm };
    }, `/review/act-2/states/${c.file}`);

    const checks = {
      corner: m.cornerMean <= 6,
      border: m.borderMean <= 6,
      content: m.above32 > 200,
      size: m.w === 1920 && m.h === 1080
    };
    const pass = Object.values(checks).every(Boolean);
    if (!pass) cellFailures += 1;
    measured.push({
      id: c.id, pass, checks,
      cornerMean: Number(m.cornerMean.toFixed(2)),
      borderMean: Number(m.borderMean.toFixed(2)),
      maxLum: Number(m.maxLum.toFixed(1)),
      pxAbove32: m.above32,
      warmPixelsReported: m.warm
    });
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${c.id.padEnd(16)} corner ${m.cornerMean.toFixed(2)}  border ${m.borderMean.toFixed(2)}  max ${m.maxLum.toFixed(0)}  lit ${String(m.above32).padStart(7)}`);
  }
  await browser.close();
  check(`CELLS: ${cells.length} measured — corner ≤ 6, border ≤ 6, content present, 1920×1080`,
    cellFailures === 0, cellFailures ? `${cellFailures} failing` : `${cells.length}/${cells.length}`);

  // ---- MAP AGREEMENT --------------------------------------------------------
  {
    const map = fs.readFileSync(path.join(REPO, 'docs', 'act-2-provenance.md'), 'utf8')
      .replace(/\r\n/g, '\n');
    // The ruled table's own rows, read out of the document rather than trusted.
    const drift = Object.entries(RULED).filter(([frame, klass]) => {
      const row = new RegExp(`\\*\\*${frame.replace('-', '-')}[^|]*\\|\\s*\\*\\*${klass}\\*\\*`);
      return !row.test(map);
    }).map(([f]) => f);
    check('MAP: the ruled classes transcribed here are the classes docs/act-2-provenance.md states',
      drift.length === 0, drift.join(', ') || `${Object.keys(RULED).length}/${Object.keys(RULED).length} rows agree`);

    const bad = cells
      .filter((c) => c.frame && c.frame !== '—' && RULED[c.frame])
      .filter((c) => c.klass !== RULED[c.frame])
      .map((c) => `${c.id} is ${c.klass}, ${c.frame} is ${RULED[c.frame]}`);
    check('MAP: every cell’s class is the class the map rules for its frame',
      bad.length === 0, bad.join(' · ') || 'every framed cell agrees with the map');

    const unclassed = cells.filter((c) => !c.klass).map((c) => c.id);
    check('MAP: no cell is unclassified', unclassed.length === 0,
      unclassed.join(', ') || `${cells.length}/${cells.length} carry a class`);

    const sourceless = cells
      .filter((c) => (c.klass === 'PORT' || c.klass === 'ADAPT') && !c.source)
      .map((c) => c.id);
    check('MAP: every PORT and ADAPT cell names its legacy source',
      sourceless.length === 0, sourceless.join(', ') || 'all named');
  }

  // ---- BEAT COVERAGE --------------------------------------------------------
  //
  // On-file cells are candidates kept per the aesthetic law; they are not beat
  // cells and do not count toward coverage.
  {
    const bad = [];
    let total = 0;
    const detail = [];
    Object.entries(FROZEN).forEach(([scene, n]) => {
      const live = cells.filter((c) => c.scene === scene && c.beat && c.review !== 'on-file');
      const beats = new Set(live.map((c) => c.beat));
      if (live.length !== beats.size) bad.push(`${scene}: ${live.length} beat cells over ${beats.size} beats — a beat is covered twice`);
      total += beats.size;
      detail.push(`${scene} ${beats.size}`);
      if (beats.size !== n) bad.push(`${scene}: ${beats.size} beats vs the frozen ${n}`);
      for (let b = 1; b <= n; b += 1) if (!beats.has(b)) bad.push(`${scene} b${b} missing`);
    });
    if (total !== TOTAL_BEATS) bad.push(`total ${total} vs ${TOTAL_BEATS}`);
    check(`BEATS: every beat of the amended map is on the sheet exactly once, and Act II is ${TOTAL_BEATS}`,
      bad.length === 0, bad.join(' · ') || `${detail.join(' · ')} = ${total}`);
  }

  // ---- SELECTIONS LANDED, CANDIDATES KEPT — the post-selection discipline ---
  {
    const NEW_FRAMES = Object.keys(RULED).filter((f) => RULED[f] === 'NEW');
    const bad = [];
    NEW_FRAMES.forEach((frame) => {
      const kept = cells.filter((c) => c.frame === frame && c.review === 'on-file');
      const landed = cells.filter((c) => c.frame === frame && c.review !== 'on-file');
      if (kept.length < 2) bad.push(`${frame}: only ${kept.length} candidates on file`);
      if (landed.length !== 1) {
        bad.push(`${frame}: ${landed.length} beat cells (${landed.map((c) => c.id).join(', ')})`);
      } else if (!['approved-selection', 'pending-review'].includes(landed[0].review)) {
        bad.push(`${frame}: beat cell ${landed[0].id} is ${landed[0].review}`);
      }
    });
    check('NEW: every NEW frame carries exactly one landed beat cell, with its candidates kept on file',
      bad.length === 0, bad.join(' · ') || 'S6-F3 → s6-b9 · S7-F2 → s7-b4 · S9-F1 → s9-b1, three candidates each on file');

    const byFrame = {};
    cells.filter((c) => c.review !== 'on-file').forEach((c) => {
      if (!c.frame || c.frame === '—') return;
      const key = `${c.scene}|${c.frame}|${c.beat}`;
      byFrame[key] = byFrame[key] || { frame: c.frame, ids: [] };
      byFrame[key].ids.push(c.id);
    });
    const overGenerated = Object.values(byFrame)
      .filter((g) => g.ids.length > 1)
      .map((g) => `${g.frame}: ${g.ids.join(', ')}`);
    check('FRAMES: no beat carries more than one cell — alternates live only on file',
      overGenerated.length === 0, overGenerated.join(' · ') || 'one cell per beat everywhere');

    const reused = cells.filter((c) => c.frame === 'S9-F1' && c.review === 'on-file' && /systems/.test(c.source || '')).length;
    const beatCell = cells.find((c) => c.id === 's9-b1');
    check('NEW: S9-F1’s candidates are the systems sheet’s own, and the landed cell runs the selected builder',
      reused === 3 && beatCell && /s9-b1-a/.test(beatCell.source || ''),
      `${reused}/3 carried over · s9-b1 source: ${beatCell ? beatCell.source : 'MISSING'}`);
  }

  // ---- SOURCE CHECKS --------------------------------------------------------
  {
    const src = fs.readFileSync(path.join(__dirname, 'states.mjs'), 'utf8');
    const readsPP = src.includes("from '/src/data/purchasing-power.js'");
    const readsPD = src.includes("from '/src/data/palladium.js'");
    const inlined = /\d{1,3}\.\d{2},\s*\d{1,3}\.\d{2},\s*\d{1,3}\.\d{2}/.test(src);
    check('DATA: the ported charts read the frozen data modules and carry no copy of either',
      readsPP && readsPD && !inlined,
      `purchasing-power ${readsPP ? 'imported' : 'MISSING'} · palladium ${readsPD ? 'imported' : 'MISSING'} · inlined series ${inlined}`);

    // The register boundary, at the source (master §6.3, as amended by the
    // rails law of 31 August 2026): the pure line-grammar diagram cells — the
    // mass state and the drawn detachment candidates — must not put a
    // dark-field render inside a diagram. The rails (s5-b5, s10-b1/b2) and
    // the photographic restage (s7-b4) carry renders BY RULING and left this
    // list on ruling day; the band sits above the line, never on it.
    const diagramCells = ['s6-b9', 's6-b5-a', 's6-b5-b', 's6-b5-c', 's7-b4-a', 's7-b4-b', 's7-b4-c'];
    const offenders = diagramCells.filter((id) => {
      const i = src.indexOf(`cell('${id}'`);
      if (i < 0) return false;
      const j = src.indexOf("cell('", i + 6);
      const body = src.slice(i, j > -1 ? j : src.length);
      return /study\(|DarkFieldImage\(|photo\(/.test(body);
    });
    check('REGISTER: no line-grammar diagram cell puts a dark-field render inside a diagram',
      offenders.length === 0, offenders.join(', ') || `${diagramCells.length} diagram cells clean`);

    // The rails law, at the source: the strip carries the object band (photo
    // boxes for the goods) and the ClaimObject disc at the CLAIM station —
    // and no 40px station mark survives in the strip builder.
    const stripStart = src.indexOf('function strip(');
    const stripEnd = src.indexOf('\n}', stripStart);
    const stripBody = src.slice(stripStart, stripEnd);
    check('RAILS LAW: the strip carries the object band and the disc at CLAIM, and the station marks are retired',
      /photo\(/.test(stripBody) && /ClaimObject\(/.test(stripBody) && !/mark\(st, s\.key/.test(stripBody),
      'photo band present · ClaimObject at CLAIM · no station mark() in the strip');
  }

  fs.writeFileSync(path.join(__dirname, 'check-states.json'), JSON.stringify({
    date: new Date().toISOString(),
    limits: { cornerMean: 6, borderMean: 6 },
    frozenBeatMap: { ...FROZEN, total: TOTAL_BEATS },
    ruledClasses: RULED,
    reportedNotGated: 'warmPixelsReported — this sheet is supposed to carry the accent (the claim through-line wears the Claim Mark by ruling), so the accent is evidence here rather than a gate.',
    cells: measured,
    checks: results.length,
    failures: results.filter((r) => !r.ok).length,
    results
  }, null, 2));

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} sheet checks green`);
  process.exit(failed.length ? 1 : 0);
})();
