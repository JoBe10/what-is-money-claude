// Batch C — the static gates (the implementation brief §3: the notes and
// self-reference scans, and the splice made checkable). The Batch B gate
// suite's shape, applied to Act III.
//
//   1. BEATS      — every scene's notes carry exactly the frozen map's `[→]`
//                   count; Act III is 25.
//   2. VERBATIM   — the installed scripts are `docs/batch-c-package.md` §2's
//                   scripts, character for character (S13's armor included —
//                   notes-only material by its own label).
//   3. LANGUAGE   — the self-reference ban, over visible text and notes.
//   4. SWEEP      — retired wording, absolute slide numbers.
//   5. GUARDRAILS — master §10's prohibited overclaims, in reachable forms.
//   6. SPLICE     — the superseded files on disk but out of the manifest,
//                   the flagged survivors in it, the counts stated.
//
// Usage: node static-gates.cjs
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const ACT3 = path.join(REPO, 'src', 'scenes', 'act-3-the-jobs-of-money');
const SCENES_DIR = path.join(REPO, 'src', 'scenes');

const ACT3_SCENES = [
  { key: 'S11', file: '11-three-familiar-jobs.js', beats: 5 },
  { key: 'S12', file: '12-we-already-split-those-jobs.js', beats: 4 },
  { key: 'S13', file: '13-the-order-of-monetization.js', beats: 6 },
  { key: 'S14', file: '14-the-coffee-objection.js', beats: 4 },
  { key: 'S15', file: '15-the-tower.js', beats: 6 }
];

const read = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  console.log(`${ok ? '  ok  ' : 'FAIL  '}${name}${detail ? ` :: ${detail}` : ''}`);
}
const notesOf = (src) => {
  const i = src.lastIndexOf('notes: `');
  const start = i + 'notes: `'.length;
  return src.slice(start, src.indexOf('`', start));
};
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
const stripComments = (s) => s.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');

// ------------------------------------------------------------------ 1. BEATS
{
  const bad = [];
  let total = 0;
  ACT3_SCENES.forEach((sc) => {
    const n = (notesOf(read(path.join(ACT3, sc.file))).match(/\[→\]/g) || []).length;
    total += n;
    if (n !== sc.beats) bad.push(`${sc.key}: ${n} arrows vs the frozen ${sc.beats}`);
  });
  if (total !== 25) bad.push(`total ${total} vs 25`);
  check('BEATS: every scene’s notes carry the frozen map’s arrows — Act III is 25',
    bad.length === 0, bad.join(' · ') || '5 · 4 · 6 · 4 · 6 = 25');
}

// --------------------------------------------------------------- 2. VERBATIM
{
  const pkg = read(path.join(REPO, 'docs', 'batch-c-package.md'));
  const section = pkg.slice(pkg.indexOf('# 2. Scripts'));
  const keys = ACT3_SCENES.map((s) => s.key);
  const bad = [];
  ACT3_SCENES.forEach((sc, i) => {
    const start = section.indexOf(`\n## ${sc.key} — `);
    const nextKey = keys[i + 1] ? `\n## ${keys[i + 1]} — ` : null;
    const end = nextKey ? section.indexOf(nextKey, start) : -1;
    const block = section.slice(start, end < 0 ? section.length : end);
    const want = block.split('\n\n').map((p) => p.trim()).filter((p) =>
      p.startsWith('[→]') || (sc.key === 'S13' && p.startsWith('**[Notes-only'))).join('\n\n');
    const notes = notesOf(read(path.join(ACT3, sc.file)));
    if (want !== notes) {
      let at = 0;
      while (at < want.length && at < notes.length && want[at] === notes[at]) at += 1;
      bad.push(`${sc.key} diverges at char ${at}`);
    }
  });
  check('VERBATIM: the installed scripts are the package’s §2 scripts, character for character (S13’s notes-only armor included)',
    bad.length === 0, bad.join(' · ') || '5/5 identical');
}

// --------------------------------------------------------------- 3. LANGUAGE
{
  const MEDIUM = /\b(this presentation|these slides|my updated slides|this deck|this video|this talk|this film)\b/i;
  const sceneFiles = walk(SCENES_DIR).filter((f) => f.endsWith('.js'));
  const hits = sceneFiles.filter((f) => MEDIUM.test(stripComments(read(f))))
    .map((f) => path.relative(REPO, f).replace(/\\/g, '/'));
  check('LANGUAGE: no visible line or script in src/scenes/ names the medium',
    hits.length === 0, hits.join(', ') || `${sceneFiles.length} scene files swept`);
}

// ------------------------------------------------------------------ 4. SWEEP
{
  const TERMS = [
    'German investment advisor', 'perfect engineered solution', 'refrigeration',
    'L1:', 'thought experiment', 'network effect', 'Schelling point', 'salability'
  ];
  const act3Files = walk(ACT3).filter((f) => f.endsWith('.js'));
  const hits = [];
  act3Files.forEach((f) => {
    const t = read(f);
    TERMS.forEach((term) => {
      // The armor block is allowed to hold the vocabulary — it exists to.
      const src = f.endsWith('13-the-order-of-monetization.js')
        ? t.replace(/\*\*\[Notes-only[\s\S]*?\]\*\*/, '') : t;
      if (src.toLowerCase().includes(term.toLowerCase())) hits.push(`${path.basename(f)}: “${term}”`);
    });
  });
  check('SWEEP: no retired wording, and the armor vocabulary stays inside the armor',
    hits.length === 0, hits.join(' · ') || `${TERMS.length} terms, ${act3Files.length} files`);

  const numbered = ACT3_SCENES
    .filter((sc) => /\b(slide|scene) (number )?\d+\b/i.test(notesOf(read(path.join(ACT3, sc.file)))))
    .map((s) => s.key);
  check('SWEEP: no Act III script names an absolute slide number',
    numbered.length === 0, numbered.join(', ') || '5/5 clean');
}

// ------------------------------------------------------------- 5. GUARDRAILS
{
  const BANNED = [
    /\brisk[- ]free\b/i,
    /\bguarantees? (your )?purchasing power\b/i,
    /\bbitcoin is perfect\b/i,
    /\bvolatility is (the )?(a )?feature\b/i,
    /\bno dependencies\b/i,
    /\bcan never change\b/i,
    /\bpurpose[- ]built\b/i,
    /\bengineered solution\b/i
  ];
  const hits = [];
  ACT3_SCENES.forEach((sc) => {
    const notes = notesOf(read(path.join(ACT3, sc.file)));
    BANNED.forEach((re) => {
      const m = notes.match(re);
      if (m) hits.push(`${sc.key}: “${m[0]}”`);
    });
  });
  check('GUARDRAILS: no Act III script makes a master §10 prohibited overclaim',
    hits.length === 0, hits.join(' · ') || `${BANNED.length} patterns, 5 scripts`);
}

// ----------------------------------------------------------------- 6. SPLICE
{
  const manifest = read(path.join(REPO, 'src', 'slides', 'manifest.js'));
  const code = stripComments(manifest);
  const SUPERSEDED = [
    'section-3-function/01-the-three-functions.js',
    'section-3-function/02-the-functions-separate.js',
    'section-3-function/03-the-order-of-monetization.js',
    'section-3-function/06-what-your-money-is.js',
    'section-3-function/07-where-bitcoin-is.js'
  ];
  const SURVIVORS = [
    'section-3-function/00-waypoint-function.js',
    'section-3-function/04-stage-signatures.js',
    'section-3-function/08-waypoint-judge.js'
  ];
  const missingOnDisk = SUPERSEDED.concat(SURVIVORS)
    .filter((f) => !fs.existsSync(path.join(REPO, 'src', 'slides', f)));
  check('SPLICE: every superseded and surviving legacy file stays on disk',
    missingOnDisk.length === 0, missingOnDisk.join(', ') || '8/8 on disk');

  const stillImported = SUPERSEDED.filter((f) => code.includes(f.split('/')[1]));
  check('SPLICE: no superseded legacy slide is imported by the manifest',
    stillImported.length === 0, stillImported.join(', ') || '5/5 out of the running order');

  const survivorsGone = SURVIVORS.filter((f) => !code.includes(f.split('/')[1]));
  check('SPLICE: the three ambiguous-fate survivors stay in the manifest (flagged, never decided)',
    survivorsGone.length === 0, survivorsGone.join(', ') || '3-00 · 3-04 · 3-08 kept');

  const scenesIn = ['11-three-familiar-jobs', '12-we-already-split-those-jobs',
    '13-the-order-of-monetization', '14-the-coffee-objection', '15-the-tower']
    .filter((f) => !code.includes(f));
  check('SPLICE: all five Act III scenes are in the manifest',
    scenesIn.length === 0, scenesIn.join(', ') || '5/5 spliced');

  const flagged = /AMBIGUOUS FATES — FLAGGED, NOT[\s\S]{0,20}DECIDED/i.test(manifest) ||
    /AMBIGUOUS FATES — FLAGGED/i.test(manifest);
  check('SPLICE: the survivors’ ambiguous fates are flagged in the manifest’s own record',
    flagged, flagged ? 'the Batch C block says so in plain English' : 'MISSING');
}

fs.writeFileSync(path.join(__dirname, '..', 'static-gates.json'), JSON.stringify({
  date: new Date().toISOString(),
  session: 'batch-c',
  checks: results.length,
  failures: results.filter((r) => !r.ok).length,
  results
}, null, 2));

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} static gates green`);
process.exit(failed.length ? 1 : 0);
