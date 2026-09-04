// Act V states — the FAST-scope per-cell checks (the Act V kickoff brief,
// Session 2: "lean verification as established").
//
// The measured cell discipline every sheet in this project carries, plus the
// checks that make the sheet's own rules checkable rather than asserted.
// The measured four are the dark-field gate's own terms:
//   1. corner patches (6% of the short side) mean luminance ≤ 6/255;
//   2. outer 2% border ring mean luminance ≤ 6/255 — nothing reaches the edge;
//   3. content present — some pixels above luminance 32 — EXCEPT the one cell
//      the map names as black (s30-b1, the silence): there the assertion is
//      the opposite — no pixel above the floor;
//   4. the cell is 1920 × 1080.
//
// And the sheet-level rules, gated against the RULED MAP and the FROZEN BEAT
// MAP (master §13, 4 Sep 2026):
//
//   MAP AGREEMENT — the map is RULED; every cell's frame is a PORT or ADAPT
//   row of docs/act-5-provenance.md and the cell carries its row's class; no
//   ARGUABLE class survives in the map's table; the one retired row is
//   recorded; every cell names its source.
//
//   BEAT COVERAGE — all 27 beats of the frozen map, each exactly once; 27
//   cells; no candidate system anywhere (the map names no NEW frame).
//
//   THE APPROVED SET — the sheet is presenter-approved in full (4 Sep 2026,
//   the Batch E implementation brief §1.1; master §13): no cell is pending;
//   the only review classes are approved-port and approved-as-rendered; every
//   approved-as-rendered cell carries its closed flag and every flag is on
//   such a cell; the one ADAPT cell is approved as rendered with its change
//   named; states.json records the approval, the approved set is every cell,
//   and every flag is closed.
//
//   THE PROBES — every cell has at least one probe and every probe passed at
//   capture: the still shows the state it claims (the four renders on the
//   lane, the three halos, the five candidates, the thirty-five units and the
//   five at the margin, the two bold terms, the one line on black).
//
//   THE RHYME — the Scene 28 cells' mounted grid carries the geometry
//   UnitField.js's UNIT_GRAMMAR derives (read from the source, not
//   transcribed); FixedSupplyField imports UnitGrid from UnitField.js and P1
//   imports UnitField from the same file; both components stand at the blob
//   ids the foundation recorded, and the working tree carries no change to
//   them.
//
//   THE CLOSE — s30-b1's still is black, and s30-b2's visible text is the two
//   words "Thank you." and nothing else: no medium, no sequel, no waypoint.
//
//   NOTHING DESIGNED — at the source: states.mjs creates exactly one element
//   (the stage container), imports only the eight legacy Act V modules, and
//   every builder is a mount of a legacy module at a build; no DarkFieldImage,
//   no glyph, no text, no innerHTML, no style beyond the stage's.
//
//   THE FROZEN DATA — the comparison data file (the five assets every Act V
//   render is keyed from) is at the blob id the ruled Act IV map records.
//
//   SCENE 23 (the Part A ruling) — the landed proof on file is green, the
//   Act IV check record is green and re-cut at this session, and the source
//   carries the ruling: BAND = 100, the legacy 60 px pitch, no 48 px rule.
//
// Usage: node check-cells.cjs [--port 5273]
const { chromium } = require('playwright');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const REPO = path.join(__dirname, '..', '..', '..');
const OUT = path.join(__dirname, '..', 'states');

const FROZEN = { S24: 4, S25: 4, S26: 9, S27: 3, S28: 3, S29: 2, S30: 2 };
const TOTAL_BEATS = 27;
const TOTAL_CELLS = 27;
const BLACK_CELLS = ['s30-b1'];

// The ruled map's PORT rows (docs/act-5-provenance.md §1), transcribed. The
// MAP AGREEMENT check compares this against the map itself as well as
// against the cells, so a transcription drift here fails rather than passes.
const PORT_FRAMES = [
  'S24-F1', 'S24-F2', 'S24-F3', 'S24-F4',
  'S25-F1', 'S25-F2', 'S25-F3', 'S25-F4',
  'S26-F1', 'S26-F2', 'S26-F3', 'S26-F4',
  'S27-F1', 'S27-F2', 'S27-F3',
  'S28-F1', 'S28-F2', 'S28-F3', 'S28-F4',
  'S29-F1', 'S29-F2',
  'S30-F2'
];
const ADAPT_FRAMES = ['S30-F1'];
const CLASS_OF = Object.fromEntries([
  ...PORT_FRAMES.map((f) => [f, 'PORT']), ...ADAPT_FRAMES.map((f) => [f, 'ADAPT'])]);

// The frozen data and the rhyme's components, by committed blob id
// (docs/act-4-provenance.md §3.1; review/act-5/script-install.json `rhyme`).
const FROZEN_BLOBS = {
  'src/slides/section-4-ideal-store/_comparison-data.js': '3a6440aa274260924ae6b83d896d60f37a5f1154'
};
const LEGACY_MODULES = [
  '17-store-of-value-function-migrates', '18-monetary-premium', '19-other-assets-do-moneys-job',
  '20-bitcoin-does-not-replace-everything', '21-marginal-store-of-value-decision',
  '22-fixed-supply-reprices-at-margin', '23-investment-case-from-first-principles'
];

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  console.log(`${ok ? '  ok  ' : 'FAIL  '}${name}${detail ? ` :: ${detail}` : ''}`);
}
const read = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

(async () => {
  const record = JSON.parse(read(path.join(OUT, 'states.json')));
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
    }, `/review/act-5/states/${c.file}`);

    const black = BLACK_CELLS.includes(c.id);
    const checks = {
      corner: m.cornerMean <= 6,
      border: m.borderMean <= 6,
      content: black ? (m.above32 === 0 && m.maxLum <= 6) : m.above32 > 200,
      size: m.w === 1920 && m.h === 1080
    };
    const pass = Object.values(checks).every(Boolean);
    if (!pass) cellFailures += 1;
    measured.push({
      id: c.id, pass, checks, black,
      cornerMean: Number(m.cornerMean.toFixed(2)),
      borderMean: Number(m.borderMean.toFixed(2)),
      maxLum: Number(m.maxLum.toFixed(1)),
      pxAbove32: m.above32,
      warmPixelsReported: m.warm
    });
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${c.id.padEnd(8)} corner ${m.cornerMean.toFixed(2)}  border ${m.borderMean.toFixed(2)}  max ${m.maxLum.toFixed(0)}  lit ${String(m.above32).padStart(7)}${black ? '  (black by the map)' : ''}`);
  }
  check(`CELLS: ${cells.length} measured — corner ≤ 6, border ≤ 6, content present (the silence black), 1920×1080`,
    cellFailures === 0, cellFailures ? `${cellFailures} failing` : `${cells.length}/${cells.length}`);
  check(`CELLS: the sheet carries exactly ${TOTAL_CELLS} cells — one per beat of the frozen map`,
    cells.length === TOTAL_CELLS, `${cells.length}`);
  await browser.close();

  // ---- MAP AGREEMENT --------------------------------------------------------
  {
    const map = read(path.join(REPO, 'docs', 'act-5-provenance.md'));
    check('MAP: docs/act-5-provenance.md is RULED (4 September 2026)', /\*\*Status: RULED, 4 September 2026\*\*/.test(map));

    const drift = PORT_FRAMES.filter((frame) => !new RegExp(`\\*\\*${frame}\\*\\*[^|]*\\|\\s*\\*\\*PORT\\*\\*`).test(map));
    check('MAP: every PORT frame transcribed here is a PORT row of the ruled map',
      drift.length === 0, drift.join(', ') || `${PORT_FRAMES.length}/${PORT_FRAMES.length} rows agree`);
    const adaptDrift = ADAPT_FRAMES.filter((frame) => !new RegExp(`\\*\\*${frame}\\*\\*[^|]*\\|\\s*\\*\\*ADAPT\\*\\*`).test(map));
    check('MAP: the ADAPT frame transcribed here is an ADAPT row of the ruled map (S30-F1 — the wayline retired)',
      adaptDrift.length === 0, adaptDrift.join(', ') || '1/1');

    const table = map.slice(map.indexOf('# 1. The proposed map'), map.indexOf('# 2. The ARGUABLE rows'));
    const arguable = (table.match(/\|\s*\*\*ARGUABLE\*\*/g) || []).length;
    const arguableNotes = (table.match(/\*ARGUABLE row \d/g) || []).length;
    check('MAP: no ARGUABLE class or open ARGUABLE note survives in the map’s table (the six rows ruled A)', arguable === 0 && arguableNotes === 0, `${arguable} classes · ${arguableNotes} notes left`);
    const ruledNotes = (map.match(/\*\*RULED A, 4 September 2026 \(master §13\)\.\*\*/g) || []).length;
    check('MAP: each of the six §2 rows carries its ruling', ruledNotes === 6, `${ruledNotes}/6`);

    const retiredRows = (table.match(/\|\s*\*\*retired\*\*/g) || []).length;
    check('MAP: the one retired row is recorded (the stability contrast, Ruling 5)', retiredRows === 1, `${retiredRows}`);

    const bad = cells.filter((c) => !CLASS_OF[c.frame] || c.klass !== CLASS_OF[c.frame]).map((c) => `${c.id}: ${c.frame} ${c.klass}`);
    check('MAP: every cell names a frame of the ruled map and carries that frame’s class', bad.length === 0, bad.join(' · ') || `${cells.length}/${cells.length}`);

    const sourceless = cells.filter((c) => !c.source || !c.frame).map((c) => c.id);
    check('MAP: every cell names its legacy source (slide and build)', sourceless.length === 0, sourceless.join(', ') || 'all named');

    const pkg = read(path.join(REPO, 'docs', 'batch-e-package.md'));
    check('MAP: the package’s beat maps are FROZEN at 27 (4 September 2026)', /\*\*FROZEN 4 September 2026\*\*/.test(pkg) && /Act V is 27 beats/.test(pkg));
  }

  // ---- BEAT COVERAGE + NO CANDIDATES ----------------------------------------
  {
    const bad = [];
    let total = 0;
    const detail = [];
    Object.entries(FROZEN).forEach(([scene, n]) => {
      const live = cells.filter((c) => c.scene === scene && c.beat);
      const beats = new Set(live.map((c) => c.beat));
      total += beats.size;
      detail.push(`${scene} ${beats.size}`);
      if (live.length !== beats.size) bad.push(`${scene}: ${live.length} cells over ${beats.size} beats — a beat is covered twice`);
      if (beats.size !== n) bad.push(`${scene}: ${beats.size} beats vs the frozen ${n}`);
      for (let b = 1; b <= n; b += 1) if (!beats.has(b)) bad.push(`${scene} b${b} missing`);
    });
    if (total !== TOTAL_BEATS) bad.push(`total ${total} vs ${TOTAL_BEATS}`);
    check(`BEATS: every beat of the frozen map exactly once — Act V is ${TOTAL_BEATS}`,
      bad.length === 0, bad.join(' · ') || `${detail.join(' · ')} = ${total}`);

    const candidates = cells.filter((c) => c.system || !/^s\d+-b\d+$/.test(c.id)).map((c) => c.id);
    check('CANDIDATES: no cell carries a candidate system — the map names no NEW frame', candidates.length === 0, candidates.join(', ') || 'none');
  }

  // ---- THE APPROVED SET -----------------------------------------------------
  {
    const reviews = new Set(cells.map((c) => c.review));
    const allowed = ['approved-port', 'approved-as-rendered'];
    const stray = [...reviews].filter((r) => !allowed.includes(r));
    check('REVIEW: the only review classes are approved-port and approved-as-rendered — no cell is pending (the sheet approved in full, 4 Sep 2026)', stray.length === 0, stray.join(', ') || allowed.join(' · '));
    const renderedNoFlag = cells.filter((c) => c.review === 'approved-as-rendered' && !c.flag).map((c) => c.id);
    const flagNotRendered = cells.filter((c) => c.flag && c.review !== 'approved-as-rendered').map((c) => c.id);
    check('REVIEW: every approved-as-rendered cell carries its closed flag, and every flag is on such a cell',
      renderedNoFlag.length === 0 && flagNotRendered.length === 0,
      [...renderedNoFlag.map((id) => `${id} approved as rendered without its flag`), ...flagNotRendered.map((id) => `${id} flagged but not approved-as-rendered`)].join(' · ')
        || `${cells.filter((c) => c.review === 'approved-as-rendered').length} approved as rendered, each with its closed flag`);
    const adapt = cells.filter((c) => c.klass === 'ADAPT');
    check('REVIEW: the one ADAPT cell (s30-b1) is approved as rendered with its change named',
      adapt.length === 1 && adapt[0].id === 's30-b1' && adapt[0].review === 'approved-as-rendered' && /wayline/.test(adapt[0].flag || ''));
    const plainOk = cells.filter((c) => c.flag).every((c) => c.flag.split(/[.!?]\s/).length >= 3);
    check('REVIEW: every flag is written in full sentences (the plain-English rule, AGENTS.md §4.10)', plainOk);
    const recorded = Array.isArray(record.flags) && record.flags.length === cells.filter((c) => c.flag).length &&
      record.flags.every((f) => /^closed/.test(f.status)) &&
      Array.isArray(record.approvedAsRenderedSet) && record.approvedAsRenderedSet.length === cells.filter((c) => c.review === 'approved-as-rendered').length;
    check('REVIEW: states.json records the approved-as-rendered set and every flag as closed', recorded);
    const approvedOk = typeof record.approval === 'string' && /approved in full/.test(record.approval) &&
      Array.isArray(record.approvedSet) && record.approvedSet.length === cells.length &&
      cells.every((c) => record.approvedSet.includes(c.id));
    check('APPROVAL: states.json records the presenter’s approval, and the approved set is every cell',
      approvedOk, approvedOk ? `${record.approvedSet.length} cells approved` : 'NOT RECORDED');
  }

  // ---- THE PROBES -----------------------------------------------------------
  {
    const noProbe = cells.filter((c) => !c.probes || !c.probes.results || c.probes.results.length === 0).map((c) => c.id);
    const failed = cells.filter((c) => c.probes && !c.probes.ok)
      .map((c) => `${c.id}: ${c.probes.results.filter((r) => !r.ok).map((r) => `${r.sel} got ${r.got} expected ${r.expected}`).join('; ')}`);
    const totalProbes = cells.reduce((n, c) => n + (c.probes?.results?.length || 0), 0);
    check('PROBES: every cell carries at least one probe, and every probe passed at capture — the still shows the state it claims',
      noProbe.length === 0 && failed.length === 0,
      [...noProbe.map((id) => `${id} unprobed`), ...failed].join(' · ') || `${totalProbes} probes over ${cells.length} cells`);
    const has = (id, sel, n) => cells.find((c) => c.id === id)?.probes?.results?.some((r) => r.sel === sel && r.got === n && r.ok);
    check('PROBES: the four renders stand on the lane at S24 b3 and the three claims ride at focus', has('s24-b3', '.s4-migration__asset[data-visible="true"] .df[data-pending="false"]', 4) && has('s24-b3', '.s4-migration__claim[data-migrated="true"] .s4-claim-object[data-visible="true"][data-emphasis="focus"]', 3));
    check('PROBES: the three halos light at S25 b3', has('s25-b3', '.s4-premium__example[data-visible="true"][data-premium="true"]', 3));
    check('PROBES: the four roles stand at S26 b4 and the five assets at S26 b9', has('s26-b4', '.s4-roles__role[data-visible="true"] .df[data-pending="false"]', 4) && has('s26-b9', '.s4-coexistence__asset[data-visible="true"]', 5));
    check('PROBES: the five candidates in the compact render box at S27 b2', has('s27-b2', '.s4-marginal__candidate[data-visible="true"] .df[data-pending="false"]', 5));
    const s28 = ['s28-b1', 's28-b2', 's28-b3'].every((id) => has(id, '.unit-field-grid__unit', 35) && has(id, '.unit-field-grid__unit[data-available="true"]', 5));
    check('PROBES: thirty-five units and the five at the margin at every Scene 28 cell; the field repriced at b3', s28 && has('s28-b3', '.s4-fixed-supply-field[data-repriced="true"]', 1));
    check('PROBES: the conclusion’s two bold terms at S29 b2, the summary gone', has('s29-b2', '.s4-investment-case__conclusion strong', 2) && has('s29-b2', '.s4-investment-case__summary-line[data-visible="true"]', 0));
    check('PROBES: the close — nothing shown at S30 b1, the one line at S30 b2, the wayline never shown', has('s30-b1', '.s5c__thanks[data-visible="true"]', 0) && has('s30-b2', '.s5c__thanks[data-visible="true"]', 1) && has('s30-b1', '.wayline[data-visible="true"]', 0) && has('s30-b2', '.wayline[data-visible="true"]', 0));
  }

  // ---- THE RHYME — the grammar from the source, the geometry from the DOM ----
  {
    const uf = read(path.join(REPO, 'src', 'components', 'UnitField.js'));
    const g = (k) => Number(uf.match(new RegExp(`${k}: ([\\d.]+)`))[1]);
    const grammar = { PITCH_X: g('PITCH_X'), PITCH_Y: g('PITCH_Y'), W_FRAC: g('W_FRAC'), H_FRAC: g('H_FRAC') };
    const unitW = Math.round(grammar.PITCH_X * grammar.W_FRAC);
    const unitH = Math.round(grammar.PITCH_Y * grammar.H_FRAC);
    const expected = { unitW: `${unitW}px`, unitH: `${unitH}px`, columnGap: `${grammar.PITCH_X - unitW}px`, rowGap: `${grammar.PITCH_Y - unitH}px`, columns: `repeat(7, ${unitW}px)`, rows: `repeat(5, ${unitH}px)`, units: 35 };
    const s28 = cells.filter((c) => c.scene === 'S28');
    const bad = s28.filter((c) => !c.probes?.rhyme || Object.entries(expected).some(([k, v]) => c.probes.rhyme[k] !== v)).map((c) => `${c.id}: ${JSON.stringify(c.probes?.rhyme)}`);
    check(`RHYME: every Scene 28 cell’s mounted grid carries UNIT_GRAMMAR’s geometry read from the source — ${grammar.PITCH_X} × ${grammar.PITCH_Y} pitch, fractions ${grammar.W_FRAC} · ${grammar.H_FRAC} → units ${unitW} × ${unitH}, gaps ${grammar.PITCH_X - unitW} · ${grammar.PITCH_Y - unitH}, 7 × 5 = 35`,
      s28.length === 3 && bad.length === 0, bad.join(' · ') || `${s28.length} cells agree`);
    const fsf = read(path.join(REPO, 'src', 'components', 'section-4', 'FixedSupplyField.js'));
    const p1 = read(path.join(REPO, 'src', 'scenes', 'prologue', 'p1-eighty-thousand-hours.js'));
    check('RHYME: FixedSupplyField imports UnitGrid from UnitField.js, and P1 imports UnitField from the same file — one grammar, two renderers',
      /import \{ UnitGrid \} from '\.\.\/UnitField\.js';/.test(fsf) && /import \{ UnitField \} from '\.\.\/\.\.\/components\/UnitField\.js';/.test(p1) && /export const UNIT_GRAMMAR/.test(uf) && /UnitGrid\(\{\s*cols: STOCK_COLUMNS,\s*rows: STOCK_ROWS/.test(fsf));
    const install = JSON.parse(read(path.join(REPO, 'review', 'act-5', 'script-install.json')));
    const blobs = { 'src/components/UnitField.js': install.rhyme.unitField, 'src/components/section-4/FixedSupplyField.js': install.rhyme.fixedSupplyField };
    const drift = [];
    Object.entries(blobs).forEach(([file, blob]) => {
      const committed = execSync(`git rev-parse HEAD:${file}`, { cwd: REPO }).toString().trim();
      if (committed !== blob) drift.push(`${file}: HEAD ${committed.slice(0, 8)} vs recorded ${blob.slice(0, 8)}`);
      const dirty = execSync(`git status --porcelain -- ${file}`, { cwd: REPO }).toString().trim();
      if (dirty) drift.push(`${file}: working tree differs`);
    });
    check('RHYME: both components stand at the blob ids the foundation recorded, untouched by this session', drift.length === 0, drift.join(' · ') || `${install.rhyme.unitField.slice(0, 8)}… · ${install.rhyme.fixedSupplyField.slice(0, 8)}…`);
    check('RHYME: the sheet stands the approved P1 cell beside the Scene 28 cells, from the Prologue sheet’s own record',
      fs.existsSync(path.join(REPO, 'review', 'prologue', 'states', 'p1-b1.png')) && /p1-b1\.png/.test(read(path.join(OUT, 'sheet.html'))) && /p1-b1/.test(record.rhyme?.p1Cell || ''));
    // The Prologue's record keys its approved set by beat ("P1 b1": "p1-b1").
    const p1Record = JSON.parse(read(path.join(REPO, 'review', 'prologue', 'states', 'states.json')));
    const p1Approved = p1Record.approvedSet && p1Record.approvedSet['P1 b1'];
    check('RHYME: p1-b1 is the Prologue’s approved cell for P1 b1', p1Approved === 'p1-b1', `P1 b1 → ${p1Approved}`);
  }

  // ---- THE CLOSE ------------------------------------------------------------
  {
    const b1 = measured.find((m) => m.id === 's30-b1');
    check('CLOSE: s30-b1 is black — no pixel above the floor (the silence, a scripted beat)', b1 && b1.black && b1.checks.content, b1 ? `max luminance ${b1.maxLum}, lit ${b1.pxAbove32}` : 'NO CELL');
    const b2 = cells.find((c) => c.id === 's30-b2');
    const text = (b2?.probes?.visibleText || []).join(' | ');
    check('CLOSE: s30-b2’s visible text is “Thank you.” and nothing else — no medium, no sequel, no waypoint', text === 'Thank you.', text || 'NO TEXT RECORDED');
    const t1 = (cells.find((c) => c.id === 's30-b1')?.probes?.visibleText || []);
    check('CLOSE: s30-b1 shows no text at all', t1.length === 0, t1.join(' | ') || 'none');
  }

  // ---- NOTHING DESIGNED — at the source --------------------------------------
  {
    const src = read(path.join(__dirname, 'states.mjs'));
    const code = src.split('\n').filter((l) => !/^\s*\/\//.test(l)).join('\n');
    const created = (code.match(/document\.createElement\(/g) || []).length;
    const createdNS = (code.match(/createElementNS\(/g) || []).length;
    const styled = (code.match(/style\.cssText/g) || []).length;
    const forbidden = ['DarkFieldImage(', 'glyph(', '.innerHTML', '.textContent =', 'appendChild(', 'ClaimObject(', 'LuminousDisc(', 'UnitGrid(', 'UnitField(', 'FixedSupplyField(']
      .filter((w) => code.split(w).length - 1 > (w === 'appendChild(' ? 1 : 0));
    check('SOURCE: states.mjs creates exactly one element — the stage container — and draws nothing',
      created === 1 && createdNS === 0 && styled === 1 && forbidden.length === 0,
      `createElement ${created} · createElementNS ${createdNS} · cssText ${styled}${forbidden.length ? ` · FORBIDDEN: ${forbidden.join(', ')}` : ''}`);

    const imports = [...code.matchAll(/^import .* from '([^']+)';/gm)].map((m) => m[1]);
    const legacy = imports.filter((p) => LEGACY_MODULES.some((f) => p === `/src/slides/section-4-ideal-store/${f}.js`));
    const close = imports.filter((p) => p === '/src/slides/section-5-close/01-thank-you.js');
    const other = imports.filter((p) => !legacy.includes(p) && !close.includes(p));
    check('SOURCE: the only imports are the seven legacy Act V slide modules and the close',
      legacy.length === 7 && close.length === 1 && other.length === 0,
      `legacy ${legacy.length} · close ${close.length}${other.length ? ` · OTHER: ${other.join(', ')}` : ''}`);

    const builders = (code.match(/\}, \(st\) => mount\(st, s(4\d\d|501), \d\)\);/g) || []).length;
    const loopBuilders = (code.match(/\}, \(st\) => mount\(st, s419, n\)\);/g) || []).length;
    const cellCalls = (code.match(/^\s*cell\(/gm) || []).length;
    check('SOURCE: every cell builder mounts a legacy module at a build — 24 cell() calls, 24 such builders (the roles loop covers four cells)',
      builders === 23 && loopBuilders === 1 && cellCalls === 24, `builders ${builders} + loop ${loopBuilders} · cell() ${cellCalls}`);
  }

  // ---- THE FROZEN DATA ------------------------------------------------------
  {
    const bad = [];
    Object.entries(FROZEN_BLOBS).forEach(([file, blob]) => {
      const committed = execSync(`git rev-parse HEAD:${file}`, { cwd: REPO }).toString().trim();
      if (committed !== blob) bad.push(`${file}: HEAD ${committed.slice(0, 8)} vs recorded ${blob.slice(0, 8)}`);
      const dirty = execSync(`git status --porcelain -- ${file}`, { cwd: REPO }).toString().trim();
      if (dirty) bad.push(`${file}: working tree differs (${dirty})`);
    });
    check('FROZEN: the comparison data file’s committed blob id is the id the ruled Act IV map records, and the working tree carries no change to it',
      bad.length === 0, bad.join(' · ') || '3a6440aa… — untouched');
  }

  // ---- SCENE 23 — the Part A ruling, proven ---------------------------------
  {
    const proofPath = path.join(__dirname, '..', 'landed-proof-s23-band.json');
    const proof = fs.existsSync(proofPath) ? JSON.parse(read(proofPath)) : null;
    check('SCENE 23: the landed proof on file is green — six states at zero pixels in the deck, the ruling’s geometry measured',
      proof && proof.states === 6 && proof.passed === 6 && proof.geometry?.ok === true && proof.consoleErrors.length === 0 && proof.session === 'act-5-states',
      proof ? `${proof.passed}/${proof.states} · rows ${proof.geometry?.rows} × ${proof.geometry?.rowPitch} · band ${proof.geometry?.band?.height}` : 'NO PROOF ON FILE');
    const c4 = JSON.parse(read(path.join(REPO, 'review', 'act-4', 'harness', 'check-cells.json')));
    const r4 = JSON.parse(read(path.join(REPO, 'review', 'act-4', 'states', 'states.json')));
    check('SCENE 23: the Act IV check record is green and re-cut at this session; its states record names the fit ruling on the two table cells',
      c4.failures === 0 && c4.session === 'act-5-states' && r4.session === 'act-5-states' &&
      ['s23-b5', 's23-b6'].every((id) => /fit ruling|60 px pitch/.test(r4.cells.find((c) => c.id === id)?.ruling || '')),
      `act-4 ${c4.checks - c4.failures}/${c4.checks} · ${c4.session}`);
    const s416 = read(path.join(REPO, 'src', 'slides', 'section-4-ideal-store', '16-the-comparison.js'));
    const css = read(path.join(REPO, 'src', 'styles', 'slides.css'));
    check('SCENE 23: the source carries the ruling — BAND = 100, the band 100 tall, the table at the legacy 60 px pitch, no 48 px rule',
      /const BAND = 100;/.test(s416) && /\.s4-comparison__band \{[^}]*height: 100px;/.test(css) &&
      !/\[data-band="true"\] \.s4-comparison-table__row \{/.test(css) && /^\.s4-comparison-table__row \{\s*height: 60px;/m.test(css));
  }

  fs.writeFileSync(path.join(__dirname, 'check-cells.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-5-states',
    limits: { cornerMean: 6, borderMean: 6 },
    frozenBeatMap: { ...FROZEN, total: TOTAL_BEATS, cells: TOTAL_CELLS },
    portFrames: PORT_FRAMES,
    adaptFrames: ADAPT_FRAMES,
    blackCells: BLACK_CELLS,
    frozenBlobs: FROZEN_BLOBS,
    reportedNotGated: 'warmPixelsReported — the act carries the accent by design (the claims, the halo, the repricing, the conclusion’s two terms), so warmth is evidence here rather than a gate.',
    cells: measured,
    checks: results.length,
    failures: results.filter((r) => !r.ok).length,
    results
  }, null, 2));

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} sheet checks green`);
  process.exit(failed.length ? 1 : 0);
})();
