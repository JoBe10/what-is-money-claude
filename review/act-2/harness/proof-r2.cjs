// Act II states r2 — the zero-pixel proof (docs/act-2-states-r2-brief.md §5, §6).
//
// The session's law: no cell moves except the ones a ruling re-staged. This
// proves it at byte strength against tag `act-2-states` — byte-identity
// implies zero differing pixels, and it is checked from git, not asserted:
//
//   UNTOUCHED  every cell no ruling touched is byte-identical to the tag.
//   CARRIED    the renumbered and selected cells are byte-identical to the
//              tag file they were carried from (s6-b8 ← s6-b4 · s6-b9 ←
//              s6-b5-a · s9-b1 ← s9-b1-a) — a selection landed by file copy,
//              never by re-render.
//   RE-STAGED  the ruled re-renders, named, each traceable to its ruling.
//
// Any file on the sheet that fits none of the three classes fails the proof.
//
// Usage: node proof-r2.cjs
const { execSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const STATES = path.join(REPO, 'review', 'act-2', 'states');
const TAG = 'act-2-states';

const CARRIED = {
  's6-b8.png': 's6-b4.png',     // the claim-in-carrier GOLD beat, renumbered by the restoration
  's6-b9.png': 's6-b5-a.png',   // the selected mass state (A — the counted load)
  's9-b1.png': 's9-b1-a.png'    // the selected network formation (A — the hub dissolving)
};
const RESTAGED = {
  's6-b2.png': 'the restored elimination — legacy build 1 (Ruling 3 struck)',
  's6-b3.png': 'the restored elimination — legacy build 2',
  's6-b4.png': 'the restored elimination — legacy build 3 (the id’s r1 content moved to s6-b8)',
  's6-b5.png': 'the restored elimination — legacy build 4',
  's6-b6.png': 'the restored elimination — legacy build 5',
  's6-b7.png': 'the restored elimination — legacy build 6',
  's7-b4.png': 'the vault restage — the boundary logic in the photograph-plus-line register (r2 brief §3)',
  's5-b5.png': 'the rails law — the object band on S5’s rail (r2 brief §4)',
  's10-b1.png': 'the rails law — the object band on S10’s strip',
  's10-b2.png': 'the rails law — the history line re-landed on the upgraded strip'
};

const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const tagSha = (file) => {
  try {
    return sha(execSync(`git show ${TAG}:review/act-2/states/${file}`, {
      cwd: REPO, encoding: 'buffer', maxBuffer: 64 * 1024 * 1024
    }));
  } catch {
    return null;
  }
};

const files = fs.readdirSync(STATES).filter((f) => f.endsWith('.png')).sort();
const tagFiles = execSync(`git ls-tree -r --name-only ${TAG} review/act-2/states`, {
  cwd: REPO, encoding: 'utf8'
}).split('\n').filter((f) => f.endsWith('.png')).map((f) => path.basename(f));

const rows = [];
let failures = 0;
for (const f of files) {
  const now = sha(fs.readFileSync(path.join(STATES, f)));
  let klass;
  let ok;
  let detail;
  if (CARRIED[f]) {
    const from = tagSha(CARRIED[f]);
    ok = now === from;
    klass = 'carried';
    detail = ok
      ? `byte-identical to ${TAG}:${CARRIED[f]}`
      : `DRIFTED from ${TAG}:${CARRIED[f]}`;
  } else if (RESTAGED[f]) {
    const was = tagSha(f);
    klass = 're-staged';
    ok = true;
    detail = `${RESTAGED[f]}${was ? ' — supersedes the r1 render, preserved at the tag' : ' — new at r2'}`;
  } else {
    const was = tagSha(f);
    klass = 'untouched';
    ok = was !== null && now === was;
    detail = ok ? 'byte-identical to the tag — zero differing pixels'
      : (was === null ? 'NOT AT THE TAG and not accounted for' : 'DIFFERS FROM THE TAG');
  }
  if (!ok) failures += 1;
  rows.push({ file: f, class: klass, ok, detail, sha256: now });
  console.log(`${ok ? '  ok  ' : 'FAIL  '}${klass.padEnd(10)} ${f.padEnd(22)} ${detail}`);
}

// Every tag file must still be accounted for on the sheet (nothing deleted).
const gone = tagFiles.filter((f) => !files.includes(f));
if (gone.length) {
  failures += 1;
  console.log(`FAIL  tag files missing from the sheet: ${gone.join(', ')}`);
}

const counts = rows.reduce((m, r) => { m[r.class] = (m[r.class] || 0) + 1; return m; }, {});
fs.writeFileSync(path.join(__dirname, '..', 'proof-r2.json'), JSON.stringify({
  date: new Date().toISOString(),
  session: 'act-2-states-r2',
  baseline: TAG,
  method: 'sha256 of every cell PNG against the file at the baseline tag; byte-identity implies zero differing pixels',
  counts,
  tagFilesMissing: gone,
  failures,
  rows
}, null, 2));

console.log(`\n${files.length} files: ${Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(' · ')} · ${failures} failures`);
process.exit(failures ? 1 : 0);
