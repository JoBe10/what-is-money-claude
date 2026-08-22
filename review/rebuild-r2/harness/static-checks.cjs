// R2 static verification: the pacing-rule audit ([→] count vs build count),
// verbatim script installation vs the session brief, on-screen copy presence,
// and the constitution gates (§4.5–§4.7).
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..', '..');
const SLIDES = path.join(ROOT, 'src', 'slides', 'section-2-origin');
const COMPONENTS = path.join(ROOT, 'src', 'components', 'section-2');
const BRIEF = fs.readFileSync(path.join(ROOT, 'docs', 'r2-session-brief.md'), 'utf8');

const results = [];
function record(section, name, ok, detail) {
  results.push({ section, name, ok, detail });
  if (!ok) console.log(`FAIL ${section} :: ${name} :: ${detail}`);
}

const normalize = (s) => s.replace(/'/g, '’').replace(/\r\n/g, '\n').trim();

const MODULES = [
  ['00-waypoint-origin.js', '00-waypoint-origin'],
  ['01-the-world-without-it.js', '01-the-world-without-it'],
  ['02-the-discovery.js', '02-the-discovery'],
  ['03-the-convergence.js', '03-the-convergence'],
  ['04-the-competition.js', '04-the-competition'],
  ['05-the-rail-rises.js', '05-the-rail-rises'],
  ['06-two-survivors.js', '06-two-survivors'],
  ['07-the-abstraction-ladder.js', '07-the-abstraction-ladder'],
  ['08-the-severance.js', '08-the-severance'],
  ['09-the-pattern.js', '09-the-pattern']
];

// ---------- 1. Pacing-rule audit: [→] count == totalBuildSteps ----------
const pacingTable = [];
for (const [file] of MODULES) {
  const src = fs.readFileSync(path.join(SLIDES, file), 'utf8');
  const total = parseInt(/totalBuildSteps:\s*(\d+)/.exec(src)[1], 10);
  const notes = /notes: `([\s\S]*?)`\n\};/.exec(src)[1];
  const arrows = (notes.match(/\[→\]/g) || []).length;
  pacingTable.push({ slide: file.replace('.js', ''), builds: total, arrows, match: total === arrows });
  record('pacing-rule', file, total === arrows, `builds=${total} arrows=${arrows}`);
}

// ---------- 2. Scripts installed verbatim (apostrophes normalized) ----------
// Extract each slide's *Script:* block from the brief: from "*Script:*" after
// the slide's heading to the next "---" separator.
for (const [file, briefId] of MODULES) {
  const headingRe = new RegExp('### `' + briefId + '`');
  const hm = headingRe.exec(BRIEF);
  if (!hm) { record('verbatim-script', file, false, 'heading not found'); continue; }
  const after = BRIEF.slice(hm.index);
  const scriptStart = after.indexOf('*Script:*');
  const scriptBlock = after.slice(scriptStart + '*Script:*'.length);
  const end = scriptBlock.indexOf('\n---');
  const briefScript = normalize(scriptBlock.slice(0, end));
  const src = fs.readFileSync(path.join(SLIDES, file), 'utf8');
  const notes = normalize(/notes: `([\s\S]*?)`\n\};/.exec(src)[1]);
  const ok = briefScript === notes;
  let detail = 'identical after apostrophe normalization';
  if (!ok) {
    let i = 0;
    while (i < Math.min(briefScript.length, notes.length) && briefScript[i] === notes[i]) i += 1;
    detail = `diverges at char ${i}: brief "…${briefScript.slice(Math.max(0, i - 30), i + 30)}" vs notes "…${notes.slice(Math.max(0, i - 30), i + 30)}"`;
  }
  record('verbatim-script', file, ok, detail);
}

// Count ASCII apostrophes the normalization converted (for the report).
{
  let asciiInBriefScripts = 0;
  const scriptBlocks = BRIEF.split('*Script:*').slice(1);
  for (const block of scriptBlocks) {
    const body = block.slice(0, block.indexOf('\n---'));
    asciiInBriefScripts += (body.match(/[A-Za-z]'[A-Za-z]/g) || []).length;
  }
  record('verbatim-script', 'ASCII apostrophes in brief scripts (normalized at install)', true,
    String(asciiInBriefScripts));
}

// ---------- 3. On-screen copy present verbatim ----------
const COPY = [
  ['00-waypoint-origin.js', ['Ask where it came from.', 'Ask what it must do.', 'Ask how you would judge anything that tries to be it.']],
  ['01-the-world-without-it.js', ['The coincidence of wants.']],
  ['_triad.js', ['FISHERMAN', 'SANDAL-MAKER', 'FARMER']],
  ['02-the-discovery.js', [
    'Money is born the moment someone accepts a good they do not want — to trade it away later.',
    'Some goods are easier to sell on than others. That property has a name: salability.']],
  ['03-the-convergence.js', ['Nobody decides. Everyone converges.']],
  ['04-the-competition.js', [
    'Cannot be divided. Half a cow is no cow.',
    'Dissolves in a rainstorm.',
    'Scarce only until someone reaches the right beach — supply one ship away from collapse.',
    'Rusts. And anyone with a furnace can make more.',
    'The market keeps re-running one experiment — and keeps selecting the good that survives across space, across time, across scale.']],
  ['06-two-survivors.js', [
    'Run the competition over the whole table.',
    'Anything that floats away is out.',
    'Anything that rusts, burns, or dissolves is out.',
    'Anything that kills the holder is out.',
    'Chemistry leaves two candidates.']],
  ['07-the-abstraction-ladder.js', ['Each rung buys convenience — and pays for it in trust.']],
  ['08-the-severance.js', [
    '1971.',
    'Redemption ends. For the first time in the record, the world’s money is pure decree — the trust rung with nothing under it.',
    'What one unit still buys.',
    'The most universally accepted medium of exchange in history.',
    'Extraordinary at moving value. Measurably poor at storing it.']],
  ['09-the-pattern.js', [
    'In the free competition, monies fell when something categorically better arrived.',
    'The last incumbent didn’t fall that way — it was captured: custody centralized, claims over-issued, redemption cancelled.',
    'Either way, the role moves. And the record has no reason to be finished.']]
];
const RAIL_COPY = [
  'West Africa, 1500s–1800s: industrial shipping made aggry beads cheap to import. Local savings, wiped out by supply.',
  'heavy · hard to verify · dangerous to move',
  'Solves verification and division. Trust required: the mint.',
  'A claim on gold in a vault. Trust required: the vault.',
  '2009: digital · no state, no company · supply fixed by its own rules.',
  'Very young. Its price still swings far more than the monies it would compete with. Seventeen years into a hundred-year question.'
];
for (const [file, strings] of COPY) {
  const src = fs.readFileSync(path.join(SLIDES, file), 'utf8');
  for (const s of strings) {
    record('on-screen-copy', `${file}: "${s.slice(0, 44)}…"`, src.includes(s), src.includes(s) ? 'present' : 'MISSING');
  }
}
{
  const rail = fs.readFileSync(path.join(COMPONENTS, 'EvolutionRail.js'), 'utf8');
  for (const s of RAIL_COPY) {
    record('on-screen-copy', `EvolutionRail: "${s.slice(0, 44)}…"`, rail.includes(s), rail.includes(s) ? 'present' : 'MISSING');
  }
}

// ---------- 4. Constitution gates ----------
const allFiles = [];
for (const dir of [SLIDES, COMPONENTS]) {
  for (const f of fs.readdirSync(dir)) {
    if (f.endsWith('.js')) allFiles.push([path.join(dir, f), f]);
  }
}
const corpus = allFiles.map(([p, f]) => [f, fs.readFileSync(p, 'utf8')]);

// Banned terms (emergence rules).
for (const term of ['engineered', 'purpose-built', 'repurposed', 'designed as a solution']) {
  const hits = corpus.filter(([, src]) => src.toLowerCase().includes(term)).map(([f]) => f);
  record('constitution', `banned term "${term}"`, hits.length === 0, hits.join(',') || 'zero');
}

// "bitcoin" must not appear anywhere in Section 2 sources (described only as
// the neutral 2009 entrant).
{
  const hits = corpus.filter(([, src]) => /bitcoin/i.test(src)).map(([f]) => f);
  record('constitution', 'the word "bitcoin" absent from Section 2', hits.length === 0, hits.join(',') || 'zero');
}

// The claim ladder: every occurrence of claim/claims, listed for the report.
{
  const occurrences = [];
  for (const [f, src] of corpus) {
    const re = /\bclaims?\b/gi;
    let m;
    while ((m = re.exec(src))) {
      const lineNo = src.slice(0, m.index).split('\n').length;
      const line = src.split('\n')[lineNo - 1].trim().slice(0, 90);
      occurrences.push(`${f}:${lineNo}: ${line}`);
    }
  }
  const rungIn07 = occurrences.filter((o) => o.startsWith('07-')).length;
  const rungInRail = occurrences.filter((o) => o.startsWith('EvolutionRail')).length;
  record('constitution', 'claim ladder rung 1 planted (07 script + PAPER riser line)',
    rungIn07 >= 1 && rungInRail >= 1, JSON.stringify(occurrences, null, 1));
}

// American English screens (informational listing; "cancelled" is the brief's
// own verbatim spelling and is disclosed in the report).
{
  const brit = /\b(colour|behaviour|organis\w*|monetis\w*|centralis\w*|recognis\w*|labour|defence|judgement|jewellery|cancell\w*)\b/gi;
  const hits = [];
  for (const [f, src] of corpus) {
    let m;
    while ((m = brit.exec(src))) {
      const lineNo = src.slice(0, m.index).split('\n').length;
      hits.push(`${f}:${lineNo}: ${m[0]}`);
    }
  }
  const nonCancelled = hits.filter((h) => !/cancell/i.test(h));
  record('constitution', 'British spellings (excluding the brief-verbatim "cancelled")',
    nonCancelled.length === 0, nonCancelled.join('; ') || `zero (cancelled occurrences: ${hits.length - nonCancelled.length})`);
  record('constitution', '"cancelled" occurrences (brief-verbatim, disclosed)',
    true, hits.filter((h) => /cancell/i.test(h)).join('; '));
}

// ASCII apostrophes between letters (visible copy and notes must use ’).
{
  const hits = [];
  for (const [f, src] of corpus) {
    src.split('\n').forEach((line, i) => {
      if (line.includes("path('")) return; // CSS motion-path literals
      const m = line.match(/[A-Za-z]'[A-Za-z]/);
      if (m) hits.push(`${f}:${i + 1}: ${m[0]}`);
    });
  }
  record('constitution', 'ASCII apostrophes between letters', hits.length === 0, hits.join('; ') || 'zero');
}

// The color arc: accent usage in the Section 2 style block, listed with rule
// context — must be exactly the waypoint ignition and the rail active stop.
{
  const css = fs.readFileSync(path.join(ROOT, 'src', 'styles', 'slides.css'), 'utf8');
  const s2Start = css.indexOf('===== Section 2 — Where Money Comes From');
  const s2css = css.slice(s2Start);
  const lines = s2css.split('\n');
  const uses = [];
  let currentSelector = '';
  lines.forEach((line) => {
    if (line.trim().endsWith('{')) currentSelector = line.trim().slice(0, -1).trim();
    if (/--accent|247,\s*147/.test(line)) uses.push(`${currentSelector} :: ${line.trim()}`);
  });
  const sanctioned = uses.every((u) =>
    u.includes('s2o-waypoint[data-step="1"]') || u.includes('data-state="active"'));
  record('constitution', 'color arc: accent only at ignition + rail active stop',
    sanctioned && uses.length > 0, uses.join(' | '));
  // No accent in Section 2 JS sources.
  const jsAccent = corpus.filter(([, src]) => /--accent|F7931A|247,\s*147/.test(src)).map(([f]) => f);
  record('constitution', 'no accent in Section 2 JS', jsAccent.length === 0, jsAccent.join(',') || 'zero');
}

// ---------- 5. PROVISIONAL chart + SOURCES stub (§4.7) ----------
{
  const sev = fs.readFileSync(path.join(SLIDES, '08-the-severance.js'), 'utf8');
  record('provisional', 'PROVISIONAL code comment in 08', /PROVISIONAL DATA/.test(sev), '');
  record('provisional', 'no on-screen point values (no numeric end labels)',
    !/textContent = String\(finalV/.test(sev) && !/toFixed\(\d\)\s*;?\s*label/.test(sev), '');
  const sources = fs.readFileSync(path.join(ROOT, 'docs', 'SOURCES.md'), 'utf8');
  record('provisional', 'SOURCES.md WIM-002 stub marked PROVISIONAL',
    /WIM-002[\s\S]*PROVISIONAL/.test(sources), '');
  for (const idn of ['WIM-003', 'WIM-004', 'WIM-005']) {
    record('provisional', `SOURCES.md ${idn} present`, sources.includes(idn), '');
  }
}

const failures = results.filter((r) => !r.ok);
fs.writeFileSync(path.join(__dirname, '..', 'static-checks.json'), JSON.stringify({
  date: new Date().toISOString(),
  checks: results.length,
  failures: failures.length,
  pacingTable,
  results
}, null, 2));
console.log(`static: ${results.length} checks, ${failures.length} failures`);
console.log('pacing table:', JSON.stringify(pacingTable));
process.exit(failures.length ? 1 : 0);
