// Act III — the script installation diff (the Act III states brief §1.4).
//
// One claim, made checkable: THE INSTALLED SCRIPTS ARE THE PRESENTER'S DRAFT,
// WORD FOR WORD. `docs/batch-c-package.md` §2 is compared against
// `docs/batch-c-scripts-draft.md` at three strengths, exactly as Act II's
// installation was proven (`review/act-2/harness/script-diff.cjs`), because
// they fail differently:
//
//   1. WORDS      — the token streams are identical. This is the brief's own
//                   bar ("zero word differences") and the one that matters: a
//                   dropped clause or a reordered pair shows up here.
//   2. CHARACTERS — the strings are identical too, which additionally catches
//                   punctuation and the smart-quote / dash substitutions a
//                   copy-paste through a different editor introduces silently.
//   3. BEATS      — every scene's `[→]` count is the frozen map's count, and
//                   the total is 25. The S13 notes-armor block carries no
//                   `[→]` and is compared as part of its scene block, so the
//                   notes-only installation is proven byte-identical too.
//
// Usage: node script-diff.cjs
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const read = (p) => fs.readFileSync(path.join(REPO, p), 'utf8').replace(/\r\n/g, '\n');

// The frozen beat map (docs/batch-c-package.md §1, frozen 2 September 2026).
const SCENES = [
  { key: 'S11', title: 'Three Familiar Jobs', beats: 5 },
  { key: 'S12', title: 'We Already Split Those Jobs', beats: 4 },
  { key: 'S13', title: 'The Order of Monetization', beats: 6 },
  { key: 'S14', title: 'The Coffee Objection', beats: 4 },
  { key: 'S15', title: 'The Tower', beats: 6 }
];
const TOTAL_BEATS = 25;

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  console.log(`${ok ? '  ok  ' : 'FAIL  '}${name}${detail ? ` :: ${detail}` : ''}`);
}

/** Slice the text between `head` and whichever of `stops` comes first after it. */
function block(src, head, stops) {
  const start = src.indexOf(head);
  if (start < 0) return null;
  const from = start + head.length;
  const ends = stops
    .map((s) => src.indexOf(s, from))
    .filter((i) => i > -1);
  const to = ends.length ? Math.min(...ends) : src.length;
  return src.slice(from, to).trim();
}

const draft = read('docs/batch-c-scripts-draft.md');
const pkg = read('docs/batch-c-package.md');

// The package's §2 only — the package ends with the scripts, so the section
// runs to the end of the file.
const pkgSection = block(pkg, '# 2. Scripts', ['\n# 3. ']);
if (pkgSection == null) {
  console.error('FAIL  docs/batch-c-package.md has no "# 2. Scripts" section');
  process.exit(1);
}

const draftHeads = SCENES.map((s) => `## Scene ${s.key.slice(1)} — ${s.title} (${s.beats} beats)`);
const pkgHeads = SCENES.map((s) => `## ${s.key} — ${s.title}`);

// The word stream: whitespace-collapsed tokens. Nothing else is normalized —
// case, punctuation and the em dashes all count as part of a word here, so
// this is a strict token comparison and not a fuzzy one.
const words = (s) => s.split(/\s+/).filter(Boolean);

let missing = 0;
const rows = SCENES.map((s, i) => {
  const d = block(draft, draftHeads[i], draftHeads.slice(i + 1));
  const p = block(pkgSection, pkgHeads[i], pkgHeads.filter((h) => h !== pkgHeads[i]));
  if (d == null || p == null) missing += 1;
  return { scene: s.key, expected: s.beats, draft: d, pkg: p };
});
check('PRESENT: every scene has a draft block and an installed block',
  missing === 0,
  missing ? `${missing} missing` : `${SCENES.length}/${SCENES.length} located`);
if (missing) process.exit(1);

// ------------------------------------------------------------------ 1. WORDS
{
  const bad = [];
  const detail = [];
  rows.forEach((r) => {
    const a = words(r.draft);
    const b = words(r.pkg);
    if (a.length !== b.length) {
      bad.push(`${r.scene}: ${a.length} draft words vs ${b.length} installed`);
      return;
    }
    const at = a.findIndex((w, k) => w !== b[k]);
    if (at > -1) {
      bad.push(`${r.scene}: word ${at + 1} — draft “${a[at]}” vs installed “${b[at]}”`);
      return;
    }
    detail.push(`${r.scene} ${a.length}`);
  });
  check('WORDS: the installed scripts are the draft, word for word',
    bad.length === 0, bad.join(' · ') || `zero differences (${detail.join(' · ')})`);
}

// ------------------------------------------------------------- 2. CHARACTERS
{
  const bad = [];
  rows.forEach((r) => {
    if (r.draft === r.pkg) return;
    let at = 0;
    while (at < r.draft.length && at < r.pkg.length && r.draft[at] === r.pkg[at]) at += 1;
    bad.push(`${r.scene}: char ${at} — draft “${r.draft.slice(at, at + 30)}” vs installed “${r.pkg.slice(at, at + 30)}”`);
  });
  check('CHARACTERS: identical to the byte, punctuation and dashes included',
    bad.length === 0, bad.join(' · ') || `${rows.length}/${rows.length} identical`);
}

// ------------------------------------------------------------------ 3. BEATS
{
  const bad = [];
  let total = 0;
  const detail = [];
  rows.forEach((r) => {
    const n = (r.pkg.match(/\[→\]/g) || []).length;
    total += n;
    detail.push(`${r.scene} ${n}`);
    if (n !== r.expected) bad.push(`${r.scene}: ${n} advances vs the frozen map's ${r.expected}`);
  });
  if (total !== TOTAL_BEATS) bad.push(`total ${total} vs ${TOTAL_BEATS}`);
  check(`BEATS: every scene matches the frozen map, and Act III is ${TOTAL_BEATS}`,
    bad.length === 0, bad.join(' · ') || `${detail.join(' · ')} = ${total}`);

  // The frozen map has to say the same thing the scripts do, or the freeze is
  // a number in a document rather than a fact about the film.
  const maps = block(pkg, '# 1. Beat maps', ['\n# 2. ']);
  const mapBad = SCENES.filter((s) => {
    const m = new RegExp(`\\*\\*${s.key} — [^*]*\\*\\* \\((${s.beats})\\)`);
    return !m.test(maps || '');
  }).map((s) => s.key);
  check('FREEZE: §1’s beat maps state the same counts as §2’s scripts',
    mapBad.length === 0, mapBad.join(', ') || `${SCENES.length}/${SCENES.length} agree`);

  // The notes-armor installation: S13's block carries the armor marked
  // notes-only, and no armor sentence carries an advance.
  const s13 = rows.find((r) => r.scene === 'S13');
  const armorAt = s13.pkg.indexOf('**[Notes-only — Q&A armor, never spoken:');
  const armorHasAdvance = armorAt > -1 && /\[→\]/.test(s13.pkg.slice(armorAt));
  check('ARMOR: the S13 notes-armor block is installed, marked notes-only, with no advance inside it',
    armorAt > -1 && !armorHasAdvance,
    armorAt > -1 ? 'present, never spoken, zero advances' : 'MISSING');
}

fs.writeFileSync(path.join(__dirname, '..', 'script-diff.json'), JSON.stringify({
  date: new Date().toISOString(),
  session: 'act-3-states',
  rule: 'docs/batch-c-package.md §2 is docs/batch-c-scripts-draft.md word for word and character for character; every scene’s [→] count is the frozen map’s; Act III is 25 beats; the notes armor is installed notes-only.',
  scenes: rows.map((r) => ({
    scene: r.scene,
    words: words(r.pkg).length,
    beats: (r.pkg.match(/\[→\]/g) || []).length,
    expected: r.expected
  })),
  totalBeats: TOTAL_BEATS,
  checks: results.length,
  failures: results.filter((r) => !r.ok).length,
  results
}, null, 2));

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} script-install checks green`);
process.exit(failed.length ? 1 : 0);
