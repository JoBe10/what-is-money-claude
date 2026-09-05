// Act II states r2 — the S6 re-split, mechanically diffed
// (docs/act-2-states-r2-brief.md §2, §6).
//
// The Ruling 3 strike (master §13) returns the periodic elimination to the
// legacy pacing, and the brief's bar is exact: legacy wording VERBATIM in the
// waves, one wave per advance, nothing inside any step changed one bit — and
// the approved installed wording verbatim everywhere else. A bar that exact
// should be a gate, not a sentence in a report, so this harness proves it at
// character strength, with no normalization beyond line endings:
//
//   1. S6 is 9 advances, and §1's amended beat map agrees with §2's [→] counts
//      for every scene (Act II = 37).
//   2. S6 advances 3–7 are character-identical to `2-05-two-survivors`' notes
//      arrows 2–6 — the four elimination waves and the furnace arrow, the
//      restored sequence's verbatim authority.
//   3. S6 advances 1, 8 and 9 are character-identical to the prior install's
//      [→]1, [→]4 and [→]5 (read out of git at tag `act-2-states`, not
//      trusted from memory).
//   4. S6 advance 2 — the table-rise — is the prior install's [→]2 opening,
//      character-identical as a prefix: the approved intro sentences, now on
//      their own advance (the legacy intro's words minus the retired
//      "salability" label, master §3.4).
//   5. The other five scenes' scripts are character-identical to the prior
//      install — the re-split touched S6 and nothing else.
//
// Usage: node script-r2-diff.cjs
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const norm = (s) => s.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

const pkg = norm(fs.readFileSync(path.join(REPO, 'docs', 'batch-b-package.md'), 'utf8'));
const prior = norm(execSync('git show act-2-states:docs/batch-b-package.md', {
  cwd: REPO, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024
}));
const legacy = norm(fs.readFileSync(
  path.join(REPO, 'src', 'slides', 'section-2-origin', '05-two-survivors.js'), 'utf8'));

// ---- parsers ---------------------------------------------------------------

const SCENES = ['S5', 'S6', 'S7', 'S8', 'S9', 'S10'];

/** The §2 script section of one scene: its [→] advances, one line each. */
function advances(doc, scene) {
  const heads = doc.match(new RegExp(`^## ${scene} — .*$`, 'gm'));
  if (!heads) throw new Error(`no §2 heading for ${scene}`);
  const start = doc.indexOf(heads[0]);
  const nextHead = doc.slice(start + heads[0].length).search(/^## |^# /m);
  const section = doc.slice(start, nextHead > -1 ? start + heads[0].length + nextHead : undefined);
  return section.split('\n').filter((l) => l.startsWith('[→] ')).map((l) => l.trim());
}

/** §1's declared beat count for one scene. */
function declared(doc, scene) {
  const m = doc.match(new RegExp(`\\*\\*${scene} — [^*]+\\*\\* \\((\\d+)\\)`));
  return m ? Number(m[1]) : null;
}

/** The legacy 2-05 notes, split into its six arrows. */
const notesSrc = legacy.slice(legacy.indexOf('notes: `') + 'notes: `'.length);
const legacyArrows = notesSrc.slice(0, notesSrc.indexOf('`'))
  .split('[→]').map((s) => s.trim()).filter(Boolean)
  .map((s) => `[→] ${s}`);

// ---- checks ----------------------------------------------------------------

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  console.log(`${ok ? '  ok  ' : 'FAIL  '}${name}${detail ? ` :: ${detail}` : ''}`);
}
const same = (a, b) => a === b;
const firstDiff = (a, b) => {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i += 1;
  return `at char ${i}: ${JSON.stringify(a.slice(i, i + 30))} vs ${JSON.stringify(b.slice(i, i + 30))}`;
};

const s6 = advances(pkg, 'S6');
const s6Prior = advances(prior, 'S6');

check('S6 is 9 advances', s6.length === 9, `${s6.length}`);
check('the legacy 2-05 notes carry 6 arrows', legacyArrows.length === 6, `${legacyArrows.length}`);

// 2. The waves, verbatim: S6 advances 3–7 vs legacy arrows 2–6.
[[2, 1, 'the gases wave'], [3, 2, 'the corrosion wave'], [4, 3, 'the radioactive wave'],
 [5, 4, 'the shapeless wave'], [6, 5, 'the furnace arrow, 1803 and the verdict in place']]
  .forEach(([si, li, label]) => {
    const ok = same(s6[si], legacyArrows[li]);
    check(`VERBATIM: S6 [→]${si + 1} is legacy arrow ${li + 1} character for character (${label})`,
      ok, ok ? `${s6[si].length} chars` : firstDiff(s6[si] || '', legacyArrows[li] || ''));
  });

// 3. The approved beats before and after, unchanged.
[[0, 0, 'the SCARCITY IN MATTER landing'], [7, 3, 'hard to create, hard to destroy'],
 [8, 4, 'not hard to move']].forEach(([si, pi, label]) => {
  const ok = same(s6[si], s6Prior[pi]);
  check(`APPROVED: S6 [→]${si + 1} is the prior install's [→]${pi + 1} character for character (${label})`,
    ok, ok ? `${s6[si].length} chars` : firstDiff(s6[si] || '', s6Prior[pi] || ''));
});

// 4. The table-rise advance: the prior [→]2's opening, as a prefix.
{
  const ok = s6Prior[1].startsWith(s6[1].replace(/^\[→\] /, '[→] ')) ||
    s6Prior[1].startsWith(s6[1]);
  check('APPROVED: S6 [→]2 (the table rises) is the prior install\'s [→]2 opening, character-identical as a prefix',
    ok, ok ? `${s6[1].length} chars of the prior ${s6Prior[1].length}` : firstDiff(s6Prior[1], s6[1]));
}

// 5. The other five scenes untouched.
SCENES.filter((s) => s !== 'S6').forEach((scene) => {
  const now = advances(pkg, scene);
  const was = advances(prior, scene);
  const ok = now.length === was.length && now.every((a, i) => same(a, was[i]));
  check(`UNTOUCHED: ${scene}'s installed script is character-identical to the prior install`,
    ok, ok ? `${now.length} advances` : `advance counts ${was.length} → ${now.length}, or wording drift`);
});

// 1b. The amended map agrees with the scripts.
{
  const want = { S5: 8, S6: 9, S7: 5, S8: 5, S9: 5, S10: 5 };
  let total = 0;
  const bad = [];
  SCENES.forEach((scene) => {
    const d = declared(pkg, scene);
    const a = advances(pkg, scene).length;
    total += a;
    if (d !== a) bad.push(`${scene}: §1 says ${d}, §2 has ${a}`);
    if (a !== want[scene]) bad.push(`${scene}: ${a} vs the amended ${want[scene]}`);
  });
  if (total !== 37) bad.push(`total ${total} vs 37`);
  check('FREEZE: §1\'s amended map states the counts §2\'s scripts perform, and Act II is 37',
    bad.length === 0, bad.join(' · ') || 'S5 8 · S6 9 · S7 5 · S8 5 · S9 5 · S10 5 = 37');
}

const failed = results.filter((r) => !r.ok);
fs.writeFileSync(path.join(__dirname, '..', 'script-r2-diff.json'), JSON.stringify({
  date: new Date().toISOString(),
  session: 'act-2-states-r2',
  authority: {
    waves: 'src/slides/section-2-origin/05-two-survivors.js notes, arrows 2–6, character-identical',
    approved: 'docs/batch-b-package.md at tag act-2-states (git show), character-identical',
    strike: 'master §13, 31 August 2026 — Ruling 3 struck'
  },
  s6Advances: s6.length,
  actTotal: 37,
  checks: results.length,
  failures: failed.length,
  results
}, null, 2));
console.log(`\n${results.length - failed.length}/${results.length} re-split checks green`);
process.exit(failed.length ? 1 : 0);
