// Act II rail implementation — the notes and self-reference scans
// (docs/act-2-rail-impl-brief.md §3).
//
// Three questions a batch close has to answer with evidence rather than with
// a sentence:
//
//   1. ARE THE SCRIPTS UNTOUCHED? The brief forbids script changes in both
//      sessions, and both sessions rewrote every Act II scene module around
//      its notes. So each scene's notes block is compared, character for
//      character, against the same block at tag `batch-b` — the installed
//      scripts as the presenter approved them.
//   2. DOES EVERY BEAT MAP TO EXACTLY ONE `[→]`? The definition of done says
//      it (AGENTS.md §15.2), and the rail rewire changed build counts nowhere,
//      so this is the check that says so out loud.
//   3. IS THERE ANY SELF-REFERENCE OR STALE COPY ON SCREEN? Master §10 bans
//      the deck referring to itself; AGENTS.md §14's search-based cleanup
//      lists the phrases this project has had to remove before. Both are run
//      over the ON-SCREEN copy of the rail world — every string the act can
//      draw — not over the comments, which are for readers of the code.
//
// Usage: node scan-batch.cjs
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const REPO = path.join(__dirname, '..', '..', '..');
const SCENES = path.join('src', 'scenes', 'act-2-the-architecture-of-money');
const BASELINE = 'batch-b';

const MODULES = [
  ['05-the-function-stayed.js', 8],
  ['06-gold-scarcity-in-matter.js', 9],
  ['07-claims-on-gold.js', 5],
  ['08-money-becomes-information.js', 5],
  ['09-scarcity-becomes-digital.js', 5],
  ['10-the-trade-off-keeps-moving.js', 5]
];

// Master §10: the deck never refers to itself. AGENTS.md §14's cleanup list
// follows — every phrase this project has had to remove from copy before.
const BANNED = [
  'this film', 'the film', 'this presentation', 'this deck', 'this slide',
  'next slide', 'the audience', 'German investment advisor',
  'perfect engineered solution', 'thought experiment'
];

const notesOf = (text) => {
  const i = text.indexOf('notes: `');
  if (i < 0) return null;
  const j = text.indexOf('`', i + 8);
  return text.slice(i + 8, j).replace(/\r\n/g, '\n');
};

const result = {
  date: new Date().toISOString(),
  session: 'batch-b-r2',
  baseline: BASELINE,
  scripts: [],
  beats: [],
  selfReference: { scanned: 0, hits: [] },
  failures: 0
};

// ---- 1 + 2 · the scripts, and the beat map --------------------------------
for (const [file, beats] of MODULES) {
  const now = notesOf(fs.readFileSync(path.join(REPO, SCENES, file), 'utf8'));
  const then = notesOf(execSync(
    `git show ${BASELINE}:${SCENES.replace(/\\/g, '/')}/${file}`,
    { cwd: REPO, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }
  ));
  const same = now === then;
  const arrows = (now.match(/\[→\]/g) || []).length;
  const mapped = arrows === beats;
  if (!same) result.failures += 1;
  if (!mapped) result.failures += 1;
  result.scripts.push({ file, identicalToBaseline: same, chars: now.length });
  result.beats.push({ file, beats, arrows, oneToOne: mapped });
  console.log(`${same ? '  ok  ' : 'FAIL  '}script ${file.padEnd(34)} ` +
    `${mapped ? 'ok' : 'WRONG'} ${arrows}/${beats} [→]`);
}

// ---- 3 · self-reference and stale copy, over the on-screen strings ---------
//
// The rail world's copy lives in two modules and the stage's own COPY block;
// every string the act can draw is one of these. Scanning the source's string
// literals is what keeps a comment about "the film" from being mistaken for a
// line on screen.
const COPY_FILES = ['_railStates.js', '_railWorld.js', '_architectureStage.js'];
const STRING = /(['"`])((?:\\.|(?!\1)[^\\])*)\1/g;
for (const file of COPY_FILES) {
  const src = fs.readFileSync(path.join(REPO, SCENES, file), 'utf8');
  // Strip line comments and block comments first: they are for readers of the
  // code, and they legitimately say "the film".
  const code = src
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
  let m;
  while ((m = STRING.exec(code)) !== null) {
    const s = m[2];
    if (s.length < 6) continue;
    result.selfReference.scanned += 1;
    for (const phrase of BANNED) {
      if (s.toLowerCase().includes(phrase.toLowerCase())) {
        result.selfReference.hits.push({ file, phrase, string: s.slice(0, 120) });
        result.failures += 1;
      }
    }
  }
}
console.log(`${result.selfReference.hits.length ? 'FAIL  ' : '  ok  '}` +
  `self-reference: ${result.selfReference.scanned} on-screen strings scanned, ` +
  `${result.selfReference.hits.length} hits`);
result.selfReference.hits.forEach((h) => console.log(`      ${h.file}: "${h.phrase}" in ${h.string}`));

fs.writeFileSync(path.join(__dirname, '..', 'scan-batch.json'),
  JSON.stringify(result, null, 2));

console.log(`\n${result.failures} failure(s) -> review/batch-b-r2/scan-batch.json`);
process.exit(result.failures ? 1 : 0);
