// Batch D — the static gates (the implementation brief §3: the notes and
// self-reference scans, the protected lines re-verified in the installed
// deck, the frozen data, and the splice made checkable). The Batch C gate
// suite's shape, applied to Act IV.
//
//   1. BEATS      — every scene's notes carry exactly the frozen map's `[→]`
//                   count; Act IV is 42 (S22 = 3 since the Batch D ruling 2).
//   2. VERBATIM   — the installed scripts are `docs/batch-d-package.md` §2's
//                   scripts, character for character (S23's two notes-only
//                   armor blocks included — notes material by their own
//                   label); and the package's own installation harness is
//                   green against the legacy sources.
//   3. LANGUAGE   — the self-reference ban, over visible text and notes.
//   4. SWEEP      — retired wording, absolute slide numbers; the armor
//                   vocabulary confined to S23's armor.
//   5. GUARDRAILS — master §10's prohibited overclaims, in reachable forms.
//   6. PROTECTED  — the protected lines re-verified character for character
//                   IN THE INSTALLED DECK: the crescendo in S16's notes, the
//                   hundred-year sentence in S18's, the dated scores and
//                   "Don't trust. Verify." in S23's, the on-screen line on
//                   stage exactly once across every module the manifest
//                   reaches (the act's stage included), the definition on
//                   screen, the enlargement rung 4 phrasing.
//   7. FROZEN     — the two data files at the blob ids the ruled map records.
//   8. SPLICE     — the superseded files on disk but out of the manifest,
//                   the flagged survivors in it, the counts stated, the
//                   scratch route emptied of the act.
//
// Usage: node static-gates.cjs
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO = path.join(__dirname, '..', '..', '..');
const ACT4 = path.join(REPO, 'src', 'scenes', 'act-4-the-store-of-value-test');
const SCENES_DIR = path.join(REPO, 'src', 'scenes');
const LEGACY = path.join(REPO, 'src', 'slides', 'section-4-ideal-store');

const ACT4_SCENES = [
  { key: 'S16', file: '16-return-to-the-open-exchange.js', beats: 8 },
  { key: 'S17', file: '17-what-the-carrier-must-preserve.js', beats: 5 },
  { key: 'S18', file: '18-the-100-year-test.js', beats: 8 },
  { key: 'S19', file: '19-invert-the-question.js', beats: 2 },
  { key: 'S20', file: '20-how-the-carrier-can-fail-i.js', beats: 5 },
  { key: 'S21', file: '21-how-the-carrier-can-fail-ii.js', beats: 5 },
  { key: 'S22', file: '22-from-failure-to-requirement.js', beats: 3 },
  { key: 'S23', file: '23-the-comparison.js', beats: 6 }
];
const TOTAL_BEATS = 42;

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
const notes = Object.fromEntries(ACT4_SCENES.map((sc) => [sc.key, notesOf(read(path.join(ACT4, sc.file)))]));
// The armor is notes-only; the spoken script is the arrows.
const spokenOf = (key) => notes[key].split(/\*\*\[Notes-only/)[0];

// ------------------------------------------------------------------ 1. BEATS
{
  const bad = [];
  let total = 0;
  const detail = [];
  ACT4_SCENES.forEach((sc) => {
    const n = (notes[sc.key].match(/\[→\]/g) || []).length;
    total += n;
    detail.push(String(n));
    if (n !== sc.beats) bad.push(`${sc.key}: ${n} arrows vs the frozen ${sc.beats}`);
  });
  if (total !== TOTAL_BEATS) bad.push(`total ${total} vs ${TOTAL_BEATS}`);
  check(`BEATS: every scene’s notes carry the frozen map’s arrows — Act IV is ${TOTAL_BEATS}`,
    bad.length === 0, bad.join(' · ') || `${detail.join(' · ')} = ${total}`);
  const armorArrows = ACT4_SCENES.some((sc) => /\*\*\[Notes-only[\s\S]*\[→\]/.test(notes[sc.key]));
  check('BEATS: the notes-only armor carries no advance', !armorArrows);
}

// --------------------------------------------------------------- 2. VERBATIM
{
  const pkg = read(path.join(REPO, 'docs', 'batch-d-package.md'));
  const section = pkg.slice(pkg.indexOf('# 2. Scripts'), pkg.indexOf('\n# 3. '));
  const keys = ACT4_SCENES.map((s) => s.key);
  const bad = [];
  ACT4_SCENES.forEach((sc, i) => {
    const start = section.indexOf(`\n## ${sc.key} — `);
    const nextKey = keys[i + 1] ? `\n## ${keys[i + 1]} — ` : null;
    const end = nextKey ? section.indexOf(nextKey, start) : -1;
    const block = section.slice(start, end < 0 ? section.length : end);
    const paras = block.split('\n\n').map((p) => p.trim()).filter(Boolean).slice(1);
    const armorAt = paras.findIndex((p) => p.startsWith('**[Notes-only'));
    const want = paras.filter((p, k) => p.startsWith('[→]') || (sc.key === 'S23' && armorAt > -1 && k >= armorAt)).join('\n\n');
    if (want !== notes[sc.key]) {
      let at = 0;
      while (at < want.length && at < notes[sc.key].length && want[at] === notes[sc.key][at]) at += 1;
      bad.push(`${sc.key} diverges at char ${at}`);
    }
  });
  check('VERBATIM: the installed scripts are the package’s §2 scripts, character for character (S23’s two notes-only armor blocks included)',
    bad.length === 0, bad.join(' · ') || `${ACT4_SCENES.length}/${ACT4_SCENES.length} identical`);

  // The package itself is proven against the legacy sources by the act's own
  // installation harness; its record on file must be green at 42.
  const si = JSON.parse(read(path.join(REPO, 'review', 'act-4', 'script-install.json')));
  check('VERBATIM: the package’s own installation harness is green on file — the scripts are the legacy notes with exactly the ledger applied, at 42',
    si.failures === 0 && si.totalBeats === 42, `${si.checks - si.failures}/${si.checks} · ${si.totalBeats} beats`);
}

// --------------------------------------------------------------- 3. LANGUAGE
{
  const MEDIUM = /\b(this presentation|these slides|my updated slides|this deck|this video|this talk|this film|one slide ago|the rest of the evening|tonight)\b/i;
  const sceneFiles = walk(SCENES_DIR).filter((f) => f.endsWith('.js'));
  const hits = sceneFiles.filter((f) => MEDIUM.test(stripComments(read(f))))
    .map((f) => path.relative(REPO, f).replace(/\\/g, '/'));
  check('LANGUAGE: no visible line or script in src/scenes/ names the medium or the live delivery (the ledger’s three self-references included)',
    hits.length === 0, hits.join(', ') || `${sceneFiles.length} scene files swept`);
}

// ------------------------------------------------------------------ 4. SWEEP
{
  const TERMS = [
    'German investment advisor', 'perfect engineered solution', 'refrigeration', 'lighting', 'communication',
    'L1:', 'Section 2', 'Section 4', 'from Section'
  ];
  const act4Files = walk(ACT4).filter((f) => f.endsWith('.js'));
  const hits = [];
  act4Files.forEach((f) => {
    const t = stripComments(read(f));
    TERMS.forEach((term) => {
      if (t.toLowerCase().includes(term.toLowerCase())) hits.push(`${path.basename(f)}: “${term}”`);
    });
  });
  check('SWEEP: no retired wording or structural self-reference in the Act IV scenes',
    hits.length === 0, hits.join(' · ') || `${TERMS.length} terms, ${act4Files.length} files`);

  // The notes-only marker labels name Scene 9 and Scene 29 by the film's own
  // structure (the package's labels, not script); the sweep reads the script
  // and the armor's words with the marker labels set aside — the Batch C
  // sweep's own form for S13's armor.
  const stripMarkers = (s) => s.replace(/\*\*\[Notes-only[\s\S]*?\]\*\*/g, '');
  const numbered = ACT4_SCENES
    .filter((sc) => /\b(slide|scene) (number )?\d+\b/i.test(stripMarkers(notes[sc.key])))
    .map((s) => s.key);
  check('SWEEP: no Act IV script names an absolute slide number (the notes-only marker labels, which cite Scene 9 and Scene 29 by the film’s structure, set aside)',
    numbered.length === 0, numbered.join(', ') || `${ACT4_SCENES.length}/${ACT4_SCENES.length} clean`);

  // The stability armor's vocabulary — the volatility objection and its
  // answer — lives in S23's armor and is spoken nowhere in the act.
  const ARMOR_ONLY = ['thirty percent last quarter', 'two completely different questions', 'Expectation, not guarantee'];
  const leaked = ACT4_SCENES.flatMap((sc) => ARMOR_ONLY.filter((t) => spokenOf(sc.key).includes(t)).map((t) => `${sc.key}: “${t}”`));
  check('SWEEP: the stability armor’s vocabulary stays inside S23’s notes-only armor — never spoken',
    leaked.length === 0, leaked.join(' · ') || `${ARMOR_ONLY.length} phrases, armor only`);
}

// ------------------------------------------------------------- 5. GUARDRAILS
{
  const BANNED = [
    /\brisk[- ]free\b/i,
    /\bguarantees? (your )?purchasing power\b/i,
    /\bbitcoin is perfect\b/i,
    /\bvolatility (itself )?is (the )?(a )?feature\b/i,
    /\bhas no dependencies\b/i,
    /\bcan never change\b/i,
    /\bpurpose[- ]built\b/i,
    /\bengineered solution\b/i,
    /\bsaving has no risk\b/i,
    /\bevery yield is fraudulent\b/i
  ];
  const hits = [];
  ACT4_SCENES.forEach((sc) => {
    BANNED.forEach((re) => {
      const m = notes[sc.key].match(re);
      if (m) hits.push(`${sc.key}: “${m[0]}”`);
    });
  });
  check('GUARDRAILS: no Act IV script makes a master §10 prohibited overclaim',
    hits.length === 0, hits.join(' · ') || `${BANNED.length} patterns, ${ACT4_SCENES.length} scripts`);
}

// -------------------------------------------------------------- 6. PROTECTED
{
  const CRESCENDO = 'you cannot print money. You can only print the units it comes in — and every unit printed drains the ones already earned.';
  check('PROTECTED: the bisection crescendo stands in S16’s installed notes, character for character (its first letter lowercase after "Which means:", as the legacy speaks it)',
    notes.S16.includes(`**${CRESCENDO}**`), notes.S16.includes(`**${CRESCENDO}**`) ? 'S16 b7' : 'NOT FOUND');
  const HUNDRED = 'One hundred years — long enough that you’re not allowed to *assume* any company, any arrangement, any government survives it. That’s the point of the number.';
  check('PROTECTED: the hundred-year sentence stands in S18’s installed notes, character for character',
    notes.S18.includes(HUNDRED), notes.S18.includes(HUNDRED) ? 'S18 b2' : 'NOT FOUND');
  check('PROTECTED: the scores are dated in S23’s installed notes — "my judgments, as of 2026"',
    /these fifty scores are my judgments, as of 2026\./.test(notes.S23));
  const RUNG4 = 'Not a *legal* claim on anyone in particular. A *social* claim on everyone in general — enforced not by courts, but by acceptance.';
  check('PROTECTED: the enlargement rung 4 phrasing stands in S16’s installed notes as the legacy speaks it',
    notes.S16.includes(RUNG4));
  check('PROTECTED: the spoken definition "Money is an earned, transferable claim on value." stands in S16’s installed notes',
    notes.S16.includes('Money is an earned, transferable claim on value.'));
  check('PROTECTED: the architecture’s return line opens S16, verbatim',
    notes.S16.startsWith('[→] We left this exchange open. What has to survive until we close it?'));

  // "Don't trust. Verify." on stage exactly once across every module the
  // manifest reaches — the act's stage re-homes legacy 4-16, whose two spans
  // are the line; no other reachable module puts it on stage.
  const manifest = stripComments(read(path.join(REPO, 'src', 'slides', 'manifest.js')));
  const reachable = new Set();
  const visit = (file) => {
    const abs = path.resolve(file);
    if (reachable.has(abs) || !fs.existsSync(abs)) return;
    reachable.add(abs);
    const src = stripComments(read(abs));
    [...src.matchAll(/from '(\.[^']+)'/g)].forEach((m) => {
      const target = path.resolve(path.dirname(abs), m[1]);
      if (target.endsWith('.js')) visit(target);
    });
  };
  [...manifest.matchAll(/from '(\.[^']+)'/g)].forEach((m) => visit(path.join(REPO, 'src', 'slides', m[1])));
  const onStage = [...reachable].filter((f) => /textContent = 'Don’t trust\.'|textContent = 'Verify\.'/.test(read(f)))
    .map((f) => path.relative(REPO, f).replace(/\\/g, '/'));
  check('PROTECTED: "Don’t trust. Verify." is on stage exactly once across every module the manifest reaches — legacy 4-16, re-homed by the act’s stage at S23 b6 (master §3.7)',
    onStage.length === 1 && onStage[0] === 'src/slides/section-4-ideal-store/16-the-comparison.js', `${reachable.size} modules reached · on stage in: ${onStage.join(', ') || 'none'}`);
  const src416 = read(path.join(LEGACY, '16-the-comparison.js'));
  check('PROTECTED: the on-stage line is two spans, "Don’t trust." then "Verify.", in the legacy 4-16 source the act mounts',
    /challenge\.textContent = 'Don’t trust\.';[\s\S]*?verification\.textContent = 'Verify\.';/.test(src416));
  const src404 = read(path.join(LEGACY, '04-unfinished-exchange.js'));
  check('PROTECTED: the on-screen definition — AN EARNED, TRANSFERABLE / CLAIM ON VALUE — stands in the legacy 4-04 source the act mounts',
    /headlineLead\.textContent = 'AN EARNED, TRANSFERABLE';[\s\S]*?headlineClaim\.textContent = 'CLAIM ON VALUE';/.test(src404));
  const table = read(path.join(REPO, 'src', 'components', 'section-4', 'AssetComparisonTable.js'));
  const cmp = read(path.join(LEGACY, '_comparison-data.js'));
  check('PROTECTED: PROPERTY is the row header and the real-estate asset is labeled REAL ESTATE; no total, no winner badge, no highlight in the table component',
    /propertyHeading\.textContent = 'PROPERTY'/.test(table) && /label: 'REAL ESTATE'/.test(cmp) && !/total|winner|highlight/i.test(stripComments(table)));
}

// ----------------------------------------------------------------- 7. FROZEN
{
  const FROZEN_BLOBS = {
    'src/slides/section-4-ideal-store/_comparison-data.js': '3a6440aa274260924ae6b83d896d60f37a5f1154',
    'src/slides/section-4-ideal-store/_failure-property-data.js': 'c1eb13d4d22eebedf4600d708e6f61c7a7cd0bc0'
  };
  const bad = [];
  Object.entries(FROZEN_BLOBS).forEach(([file, blob]) => {
    const committed = execSync(`git rev-parse HEAD:${file}`, { cwd: REPO }).toString().trim();
    if (committed !== blob) bad.push(`${file}: HEAD ${committed.slice(0, 8)} vs recorded ${blob.slice(0, 8)}`);
    const dirty = execSync(`git status --porcelain -- ${file}`, { cwd: REPO }).toString().trim();
    if (dirty) bad.push(`${file}: working tree differs`);
  });
  check('FROZEN: the two data files’ committed blob ids are the ids the ruled map records (§3.1), and the working tree carries no change to them',
    bad.length === 0, bad.join(' · ') || '3a6440aa… and c1eb13d4… — untouched');
  const scores = [...read(path.join(LEGACY, '_comparison-data.js')).matchAll(/scores: \{ gold: (\d), fiat: (\d), bitcoin: (\d), property: (\d), shares: (\d) \}/g)];
  check('FROZEN: fifty scores in ten rows', scores.length === 10, `${scores.length} rows`);
}

// ----------------------------------------------------------------- 8. SPLICE
{
  const manifest = read(path.join(REPO, 'src', 'slides', 'manifest.js'));
  const code = stripComments(manifest);
  const SUPERSEDED = [
    'section-4-ideal-store/01-define-the-job.js',
    'section-4-ideal-store/06-claim-and-carrier.js',
    'section-4-ideal-store/07-store-of-value-function.js',
    'section-4-ideal-store/08-100-year-test.js',
    'section-4-ideal-store/09-future-is-unknowable.js',
    'section-4-ideal-store/10-invert-the-question.js',
    'section-4-ideal-store/11-carrier-failures-i.js',
    'section-4-ideal-store/12-carrier-failures-ii.js',
    'section-4-ideal-store/13-failure-to-requirement.js',
    'section-4-ideal-store/14-ten-properties.js',
    'section-4-ideal-store/15-framework-to-comparison.js',
    'section-4-ideal-store/16-the-comparison.js'
  ];
  // 4-04 left the deck at Batch A (Scene 3 superseded it); Act IV re-homes
  // its builds 3–4 from disk.
  const ON_DISK_ONLY = ['section-4-ideal-store/04-unfinished-exchange.js'];
  const SURVIVORS = [
    'section-3-function/00-waypoint-function.js',
    'section-3-function/04-stage-signatures.js'
  ];
  const ACT_V = ['17-store-of-value-function-migrates', '18-monetary-premium', '19-other-assets-do-moneys-job',
    '20-bitcoin-does-not-replace-everything', '21-marginal-store-of-value-decision',
    '22-fixed-supply-reprices-at-margin', '23-investment-case-from-first-principles'];
  const missingOnDisk = SUPERSEDED.concat(ON_DISK_ONLY, SURVIVORS)
    .filter((f) => !fs.existsSync(path.join(REPO, 'src', 'slides', f)));
  check('SPLICE: every superseded and surviving legacy file stays on disk',
    missingOnDisk.length === 0, missingOnDisk.join(', ') || `${SUPERSEDED.length + ON_DISK_ONLY.length + SURVIVORS.length}/${SUPERSEDED.length + ON_DISK_ONLY.length + SURVIVORS.length} on disk`);

  const stillImported = SUPERSEDED.filter((f) => code.includes(f.split('/')[1]));
  check('SPLICE: no superseded legacy slide is imported by the manifest — 4-01 (retired by the Row 2 ruling) and 4-06 through 4-16',
    stillImported.length === 0, stillImported.join(', ') || `${SUPERSEDED.length}/${SUPERSEDED.length} out of the running order`);

  const survivorsGone = SURVIVORS.filter((f) => !code.includes(f.split('/')[1]));
  check('SPLICE: the two ambiguous-fate survivors stay in the manifest (flagged, never decided)',
    survivorsGone.length === 0, survivorsGone.join(', ') || '3-00 · 3-04 kept');

  const actVGone = ACT_V.filter((f) => !code.includes(f));
  check('SPLICE: the seven Act V sources (4-17 … 4-23) stay in the manifest for Batch E',
    actVGone.length === 0, actVGone.join(', ') || '7/7 kept');

  const scenesIn = ACT4_SCENES.map((sc) => sc.file.replace(/\.js$/, '')).filter((f) => !code.includes(f));
  check('SPLICE: all eight Act IV scenes are in the manifest',
    scenesIn.length === 0, scenesIn.join(', ') || '8/8 spliced');

  const flagged = /AMBIGUOUS FATES/i.test(manifest) && /38 slides\*\* \(was 39\)|\*\*The deck is 34 slides\*\* \(was 38\)/.test(manifest);
  check('SPLICE: the survivors’ ambiguous fates are flagged in the manifest’s own record, and the counts are stated (38 → 34)',
    flagged, flagged ? 'the Batch D block says so in plain English' : 'MISSING');

  const registry = stripComments(read(path.join(REPO, 'src', 'proto', 'registry.js')));
  const stillRegistered = ACT4_SCENES.map((sc) => sc.file.replace(/\.js$/, '')).filter((f) => registry.includes(f));
  check('SPLICE: the act’s scenes have left the scratch route’s registry (the entry leaves when the batch lands)',
    stillRegistered.length === 0, stillRegistered.join(', ') || 'registry clear of the act');
}

fs.writeFileSync(path.join(__dirname, '..', 'static-gates.json'), JSON.stringify({
  date: new Date().toISOString(),
  session: 'batch-d',
  checks: results.length,
  failures: results.filter((r) => !r.ok).length,
  results
}, null, 2));

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} static gates green`);
process.exit(failed.length ? 1 : 0);
