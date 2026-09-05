// Act II — the script installation diff (docs/act-2-states-brief.md §1.5).
//
// One claim, made checkable: THE INSTALLED SCRIPTS ARE THE PRESENTER'S DRAFT,
// WORD FOR WORD. `docs/batch-b-package.md` §2 is compared against
// `docs/batch-b-scripts-draft.md` at three strengths, because they fail
// differently:
//
//   1. WORDS      — the token streams are identical. This is the brief's own
//                   bar ("zero word differences") and the one that matters: a
//                   dropped clause or a reordered pair shows up here.
//   2. CHARACTERS — the strings are identical too, which additionally catches
//                   punctuation and the smart-quote / dash substitutions a
//                   copy-paste through a different editor introduces silently.
//   3. BEATS      — every scene's `[→]` count is the frozen map's count, and
//                   the total is 33.
//
// The word comparison is the primary one and the character comparison is
// reported beside it rather than folded into it: if a future word pass changes
// punctuation only, the report should say that in those words instead of
// failing as though a word had moved.
//
// Usage: node script-diff.cjs
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const read = (p) => fs.readFileSync(path.join(REPO, p), 'utf8').replace(/\r\n/g, '\n');

// The frozen beat map (docs/batch-b-package.md §1, frozen 31 August 2026).
const SCENES = [
  { key: 'S5', title: 'The Function Stayed. The Carrier Changed.', beats: 8 },
  { key: 'S6', title: 'Gold: Scarcity in Matter', beats: 5 },
  { key: 'S7', title: 'Claims on Gold: Portability Through Trust', beats: 5 },
  { key: 'S8', title: 'Fiat: Money Becomes Information', beats: 5 },
  { key: 'S9', title: 'Bitcoin: Can Scarcity Become Digital?', beats: 5 },
  { key: 'S10', title: 'The Trade-Off Keeps Moving', beats: 5 }
];
const TOTAL_BEATS = 33;

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

const draft = read('docs/batch-b-scripts-draft.md');
const pkg = read('docs/batch-b-package.md');

// The package's §2 only — so a scene title appearing in §1's beat map or in
// §3's frame specs can never be mistaken for a script heading.
const pkgSection = block(pkg, '# 2. Scripts', ['\n# 3. ']);
if (pkgSection == null) {
  console.error('FAIL  docs/batch-b-package.md has no "# 2. Scripts" section');
  process.exit(1);
}

const draftHeads = SCENES.map((s) => `## Scene ${s.key.slice(1)} — ${s.title} (${s.beats} beats)`);
const pkgHeads = SCENES.map((s) => `## ${s.key} — ${s.title}`);
// A script block ends at the next scene heading or at the contracts record.
const pkgStops = pkgHeads.concat(['## The contracts these scripts']);

// The word stream: whitespace-collapsed tokens. Nothing else is normalized —
// case, punctuation and the em dashes all count as part of a word here, so
// this is a strict token comparison and not a fuzzy one.
const words = (s) => s.split(/\s+/).filter(Boolean);

let missing = 0;
const rows = SCENES.map((s, i) => {
  const d = block(draft, draftHeads[i], draftHeads.slice(i + 1));
  const p = block(pkgSection, pkgHeads[i], pkgStops.filter((h) => h !== pkgHeads[i]));
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
  check(`BEATS: every scene matches the frozen map, and Act II is ${TOTAL_BEATS}`,
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
}

fs.writeFileSync(path.join(__dirname, '..', 'script-diff.json'), JSON.stringify({
  date: new Date().toISOString(),
  rule: 'docs/batch-b-package.md §2 is docs/batch-b-scripts-draft.md word for word and character for character; every scene’s [→] count is the frozen map’s; Act II is 33 beats.',
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
