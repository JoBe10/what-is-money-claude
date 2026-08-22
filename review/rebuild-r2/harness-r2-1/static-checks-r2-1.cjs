// R2.1 static verification: the pacing-rule audit (§G.4), verbatim script
// and on-screen copy installation from the revision brief, the constitution
// gates on changed files (§G.5), and the icon-grammar checks (§G.6).
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..', '..');
const S1 = path.join(ROOT, 'src', 'slides', 'section-1-question');
const S2 = path.join(ROOT, 'src', 'slides', 'section-2-origin');
const COMPONENTS = path.join(ROOT, 'src', 'components', 'section-2');
const BRIEF = fs.readFileSync(path.join(ROOT, 'docs', 'r2-1-revision-brief.md'), 'utf8');

const results = [];
function record(section, name, ok, detail) {
  results.push({ section, name, ok, detail });
  if (!ok) console.log(`FAIL ${section} :: ${name} :: ${detail}`);
}

const normalize = (s) => s.replace(/'/g, '’').replace(/\r\n/g, '\n').trim();
const read = (dir, f) => fs.readFileSync(path.join(dir, f), 'utf8');
const notesOf = (src) => /notes: `([\s\S]*?)`\r?\n\};/.exec(src)[1];

// ---------- 1. Pacing-rule audit (§G.4): [→] count == totalBuildSteps ----------
const PACED = [
  [S1, '01-eighty-thousand-hours.js'],
  [S1, '02-the-conversion.js'],
  [S1, '05-the-promise.js'],
  [S2, '01-the-world-without-it.js'],
  [S2, '02-the-discovery.js'],
  [S2, '03-the-convergence.js'],
  [S2, '04-the-competition-record.js'],
  [S2, '05-two-survivors.js'],
  [S2, '06-the-abstraction-ladder.js'],
  [S2, '07-the-severance.js'],
  [S2, '08-the-pattern.js']
];
const pacingTable = [];
for (const [dir, file] of PACED) {
  const src = read(dir, file);
  const total = parseInt(/totalBuildSteps:\s*(\d+)/.exec(src)[1], 10);
  const arrows = (notesOf(src).match(/\[→\]/g) || []).length;
  pacingTable.push({ slide: file.replace('.js', ''), builds: total, arrows, match: total === arrows });
  record('pacing-rule', file, total === arrows, `builds=${total} arrows=${arrows}`);
}

// ---------- 2. Verbatim installation from the R2.1 brief ----------

// §E: the merged 04's script, verbatim (apostrophes normalized).
{
  const start = BRIEF.indexOf('**Script (replaces both former scripts; verbatim):**');
  const block = BRIEF.slice(start + '**Script (replaces both former scripts; verbatim):**'.length);
  const briefScript = normalize(block.slice(0, block.indexOf('\n---')));
  const notes = normalize(notesOf(read(S2, '04-the-competition-record.js')));
  const ok = briefScript === notes;
  let detail = 'identical after apostrophe normalization';
  if (!ok) {
    let i = 0;
    while (i < Math.min(briefScript.length, notes.length) && briefScript[i] === notes[i]) i += 1;
    detail = `diverges at char ${i}: brief "…${briefScript.slice(Math.max(0, i - 30), i + 30)}" vs notes "…${notes.slice(Math.max(0, i - 30), i + 30)}"`;
  }
  record('verbatim-script', '04-the-competition-record notes == brief §E script', ok, detail);
}

// §B.3: 1.5's replacement block, verbatim from "One promise before we start".
{
  const notes = normalize(notesOf(read(S1, '05-the-promise.js')));
  const wantTail = normalize(`One promise before we start. By the end you'll have a framework — not my conclusions, a framework you can check for yourself. Nothing in this presentation is financial advice; it's an education in a thing you were never taught. And you shouldn't take anyone's word on money anyway. By the end, you'll see why that's rather the point.

[→] So — first question. Where does money come from? Not who prints it, not whose face is on it — where the *phenomenon* comes from. Because if you want to know what something is, the single most revealing thing you can do is watch it be born. So let's take money away — completely — and watch what happens.`);
  record('verbatim-script', '1.5 final block == brief §B.3 (verbatim, normalized)',
    notes.endsWith(wantTail), notes.endsWith(wantTail) ? 'present' : 'MISSING/ALTERED');
}

// §D.3: the severance script appendix and the pattern script insertion.
{
  const sev = normalize(notesOf(read(S2, '07-the-severance.js')));
  const want = normalize("This chapter of the story was not a convergence. And that floating mark is where the world's money still sits today: on the record, but not on the line.");
  record('verbatim-script', 'severance §D.3 sentence appended to block two', sev.includes(want), '');
  const pat = normalize(notesOf(read(S2, '08-the-pattern.js')));
  const wantIns = normalize("It ended it. That's why it sits above the line, touching nothing.");
  record('verbatim-script', 'pattern §D.3 sentence inserted after "It ended it."', pat.includes(wantIns), '');
}

// Unchanged scripts: the slides E/B did not touch keep their R2 notes.
{
  const survivorsNotes = notesOf(read(S2, '05-two-survivors.js'));
  record('verbatim-script', 'two-survivors script unchanged (spot line)',
    survivorsNotes.includes('chemistry — not culture, not politics'), '');
  const ladderNotes = notesOf(read(S2, '06-the-abstraction-ladder.js'));
  record('verbatim-script', 'ladder script unchanged (rung 1 line)',
    ladderNotes.includes('a claim on gold in a vault, lighter than air by comparison'), '');
}

// ---------- 3. On-screen copy present verbatim ----------
const COPY = [
  [S2, '04-the-competition-record.js', [
    'The market keeps re-running one experiment — and keeps selecting the good that survives across space, across time, across scale.']],
  [S1, '05-the-promise.js', [
    'Ask where it came from.', 'Ask what it must do.',
    'Ask how you would judge anything that tries to be it.']]
];
const RAIL_COPY = [
  // §E builds 1–4 verbatim as delivered:
  'Cannot be divided. Half a cow is no cow.',
  'Dissolves in a rainstorm.',
  'Scarce only until someone reaches the right beach — supply one ship away from collapse.',
  'Rusts. And anyone with a furnace can make more.',
  // The receipt, verbatim as delivered:
  'West Africa, 1500s–1800s: industrial shipping made aggry beads cheap to import. Local savings, wiped out by supply.',
  'heavy · hard to verify · dangerous to move',
  'Solves verification and division. Trust required: the mint.',
  'A claim on gold in a vault. Trust required: the vault.',
  // §D.1 — the named entrant, description and limitation unchanged:
  'BITCOIN',
  '2009: digital · no state, no company · supply fixed by its own rules.',
  'Very young. Its price still swings far more than the monies it would compete with. Seventeen years into a hundred-year question.',
  // §D.2 — the floating mark:
  'FIAT',
  '1971– : decree.'
];
for (const [dir, file, strings] of COPY) {
  const src = read(dir, file);
  for (const s of strings) {
    record('on-screen-copy', `${file}: "${s.slice(0, 44)}…"`, src.includes(s), src.includes(s) ? 'present' : 'MISSING');
  }
}
{
  const rail = read(COMPONENTS, 'EvolutionRail.js');
  for (const s of RAIL_COPY) {
    record('on-screen-copy', `EvolutionRail: "${s.slice(0, 44)}…"`, rail.includes(s), rail.includes(s) ? 'present' : 'MISSING');
  }
}

// ---------- 4. Constitution gates on changed files (§G.5) ----------
const corpus = [];
for (const dir of [S1, S2, COMPONENTS]) {
  for (const f of fs.readdirSync(dir)) {
    if (f.endsWith('.js')) corpus.push([f, read(dir, f)]);
  }
}
corpus.push(['SlideEngine.js', fs.readFileSync(path.join(ROOT, 'src', 'engine', 'SlideEngine.js'), 'utf8')]);

// Banned terms (emergence rules).
for (const term of ['engineered', 'purpose-built', 'repurposed', 'designed as a solution']) {
  const hits = corpus.filter(([, src]) => src.toLowerCase().includes(term)).map(([f]) => f);
  record('constitution', `banned term "${term}"`, hits.length === 0, hits.join(',') || 'zero');
}

// "bitcoin": §D.1 sanctions exactly one on-stage occurrence — the entrant
// stop's label. It may appear in code/comments serving that label, but in
// no script (notes block) anywhere in Sections 1–2.
{
  const occurrences = [];
  for (const [f, src] of corpus) {
    const re = /bitcoin/gi;
    let m;
    while ((m = re.exec(src))) {
      const lineNo = src.slice(0, m.index).split('\n').length;
      occurrences.push(`${f}:${lineNo}`);
    }
    const notesMatch = /notes: `([\s\S]*?)`\r?\n\};/.exec(src);
    if (notesMatch && /bitcoin/i.test(notesMatch[1])) {
      record('constitution', `"bitcoin" in a script (${f})`, false, 'scripts must not name it');
    }
  }
  const labelInRail = /textContent = 'BITCOIN'/.test(read(COMPONENTS, 'EvolutionRail.js'));
  record('constitution', '"bitcoin" on stage only as the entrant label (§D.1)',
    labelInRail, `occurrences: ${occurrences.join(', ') || 'none'}`);
}

// American English screens ("cancelled" remains the disclosed brief-verbatim
// spelling).
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
}

// ASCII apostrophes between letters (visible copy and notes must use ’).
{
  const hits = [];
  for (const [f, src] of corpus) {
    src.split('\n').forEach((line, i) => {
      const m = line.match(/[A-Za-z]'[A-Za-z]/);
      if (m) hits.push(`${f}:${i + 1}: ${m[0]}`);
    });
  }
  record('constitution', 'ASCII apostrophes between letters', hits.length === 0, hits.join('; ') || 'zero');
}

// The color arc (§G.5): orange only at the ignition and the rail's
// active/emphasis. Section 2's CSS block may use the accent only on the
// rail's active stop; Section 1's only in the 1.5 ignition rules (plus the
// R1-era warm-neutral token blend, which mixes the accent at 18% into
// --unit-warm and is not a deployment of the accent).
{
  const css = fs.readFileSync(path.join(ROOT, 'src', 'styles', 'slides.css'), 'utf8');
  const s1Start = css.indexOf('===== Section 1 — The Question');
  const s2Start = css.indexOf('===== Section 2 — Where Money Comes From');
  const scan = (block) => {
    const uses = [];
    let currentSelector = '';
    block.split('\n').forEach((line) => {
      if (line.trim().endsWith('{')) currentSelector = line.trim().slice(0, -1).trim();
      if (/--accent|247,\s*147/.test(line)) uses.push(`${currentSelector} :: ${line.trim()}`);
    });
    return uses;
  };
  const s1uses = scan(css.slice(s1Start, s2Start));
  const s1ok = s1uses.every((u) =>
    u.includes('.s1q-token') || u.includes('.s1q-promise[data-step="6"]'));
  record('constitution', 'color arc S1: accent only at the 1.5 ignition (+ token warm blend)',
    s1ok && s1uses.some((u) => u.includes('[data-step="6"]')), s1uses.join(' | '));
  const s2uses = scan(css.slice(s2Start));
  const s2ok = s2uses.length > 0 && s2uses.every((u) => u.includes('data-state="active"'));
  record('constitution', 'color arc S2: accent only at the rail active stop',
    s2ok, s2uses.join(' | '));
  const jsAccent = corpus.filter(([f, src]) => f !== 'SlideEngine.js' && /--accent|F7931A|247,\s*147/.test(src)).map(([f]) => f);
  record('constitution', 'no accent in Section 1–2 JS', jsAccent.length === 0, jsAccent.join(',') || 'zero');
}

// ---------- 5. Icon grammar (§G.6) ----------
{
  const glyphs = read(COMPONENTS, 'glyphs.js');
  for (const name of ['fish', 'grain', 'sandals', 'cattle', 'salt', 'shells', 'iron', 'metals', 'gold', 'coinage', 'paper']) {
    record('icon-grammar', `glyph "${name}" drawn`, new RegExp(`^  ${name}: `, 'm').test(glyphs), '');
  }
  record('icon-grammar', 'one stroke weight (constant, not a parameter)',
    /const STROKE = 2\.5;/.test(glyphs) && !/strokeWidth/.test(glyphs), '');
  const overrides = corpus.filter(([f, src]) =>
    f !== 'glyphs.js' && /glyph\([^)]*strokeWidth/.test(src)).map(([f]) => f);
  record('icon-grammar', 'no per-call stroke overrides', overrides.length === 0, overrides.join(',') || 'zero');
  // No legacy icon-font glyph remains in Sections 1–2 (the deck chrome's
  // fullscreen control is engine UI, outside the sections).
  const fontHits = corpus.filter(([f, src]) => f !== 'SlideEngine.js' && /ti ti-/.test(src)).map(([f]) => f);
  record('icon-grammar', 'no icon-font glyphs in Sections 1–2', fontHits.length === 0, fontHits.join(',') || 'zero');
  // The grammar's glow treatment applied where glyphs are primary objects.
  const css = fs.readFileSync(path.join(ROOT, 'src', 'styles', 'slides.css'), 'utf8');
  record('icon-grammar', 'soft luminance treatment on rail glyphs + traveling goods',
    /s2o-rail__glyph svg[\s\S]{0,200}drop-shadow\(0 0 10px rgba\(253, 233, 212/.test(css) &&
    /s2o-triad__good svg[\s\S]{0,80}drop-shadow\(0 0 10px rgba\(253, 233, 212/.test(css), '');
  record('icon-grammar', 'docs/icon-grammar.md present',
    fs.existsSync(path.join(ROOT, 'docs', 'icon-grammar.md')), '');
}

// ---------- 6. Scene groups declared (§A) ----------
{
  const groups = [
    [S1, '01-eighty-thousand-hours.js', 'hours-field'],
    [S1, '02-the-conversion.js', 'hours-field'],
    [S2, '04-the-competition-record.js', 'evolution-rail'],
    [S2, '05-two-survivors.js', 'evolution-rail'],
    [S2, '06-the-abstraction-ladder.js', 'evolution-rail'],
    [S2, '07-the-severance.js', 'evolution-rail'],
    [S2, '08-the-pattern.js', 'evolution-rail']
  ];
  for (const [dir, file, group] of groups) {
    record('scene-groups', `${file} declares ${group}`,
      read(dir, file).includes(`sceneGroup: '${group}'`), '');
  }
  const ungrouped = ['01-the-world-without-it.js', '02-the-discovery.js', '03-the-convergence.js'];
  for (const file of ungrouped) {
    record('scene-groups', `${file} declares no group`, !read(S2, file).includes('sceneGroup'), '');
  }
}

// ---------- 7. Provisional chart + SOURCES stubs still intact ----------
{
  const sev = read(S2, '07-the-severance.js');
  record('provisional', 'PROVISIONAL code comment in the severance', /PROVISIONAL DATA/.test(sev), '');
  const sources = fs.readFileSync(path.join(ROOT, 'docs', 'SOURCES.md'), 'utf8');
  for (const idn of ['WIM-002', 'WIM-003', 'WIM-004', 'WIM-005']) {
    record('provisional', `SOURCES.md ${idn} present`, sources.includes(idn), '');
  }
}

const failures = results.filter((r) => !r.ok);
fs.writeFileSync(path.join(__dirname, '..', 'static-checks-r2-1.json'), JSON.stringify({
  date: new Date().toISOString(),
  checks: results.length,
  failures: failures.length,
  pacingTable,
  results
}, null, 2));
console.log(`static: ${results.length} checks, ${failures.length} failures`);
console.log('pacing table:', JSON.stringify(pacingTable));
process.exit(failures.length ? 1 : 0);
