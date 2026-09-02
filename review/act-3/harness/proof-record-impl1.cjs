// Batch C implementation, Session 1 — the record's zero-pixel proof
// (docs/batch-c-implementation-brief.md §1.3; the proof-impl1 discipline of
// Batch B, applied to the Act III sheet).
//
// The session's law: no cell moves except the nine ruling 3 re-staged.
// Proven at byte strength against tag `act-3-states-r2` — byte-identity
// implies zero differing pixels, and it is checked from git, not asserted:
//
//   UNTOUCHED  every cell no ruling touched is byte-identical to the tag.
//   CARRIED    s14-b1 keeps its r1 bytes (already carried at the tag).
//   RE-STAGED  the nine medium-bearing cells, re-rendered with the replaced
//              medium mark (Batch C ruling 3) as the updated approved states.
//
// Any file on the sheet that fits none of the three classes fails the proof —
// which is also the mechanical form of "the handshake never ships": the only
// cells whose bytes moved are the nine that now carry the hand-off.
//
// Usage: node proof-record-impl1.cjs
const { execSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const STATES = path.join(REPO, 'review', 'act-3', 'states');
const TAG = 'act-3-states-r2';

const RESTAGED = {
  's11-b3.png': 'ruling c.3 — the medium job object at the triad’s right spoke is the hand-off',
  's11-b4.png': 'ruling c.3 — the triad complete with the replaced medium mark',
  's11-b5.png': 'ruling c.3 — the continuity beat over the replaced medium mark',
  's12-b1.png': 'ruling c.3 — the receded home frame carries the replaced medium mark at 0.35',
  's13-b5.png': 'ruling c.3 — the MEDIUM OF EXCHANGE stage stands under the hand-off',
  's13-b6.png': 'ruling c.3 — the foundation beat with the replaced medium mark standing',
  's14-b2.png': 'ruling c.3 — the resolved ladder, the coffee berth above the hand-off',
  's14-b3.png': 'ruling c.3 — the coin’s landing, the hand-off among the neutral marks',
  's14-b4.png': 'ruling c.3 — the home base returning whole with the replaced medium mark'
};
const CARRIED = new Set(['s14-b1.png']);

const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const tagSha = (file) => {
  try {
    return sha(execSync(`git show ${TAG}:review/act-3/states/${file}`, {
      cwd: REPO, encoding: 'buffer', maxBuffer: 64 * 1024 * 1024
    }));
  } catch {
    return null;
  }
};

const files = fs.readdirSync(STATES).filter((f) => f.endsWith('.png')).sort();
const tagFiles = execSync(`git ls-tree -r --name-only ${TAG} review/act-3/states`, {
  cwd: REPO, encoding: 'utf8'
}).split('\n').filter((f) => f.endsWith('.png')).map((f) => path.basename(f));

const rows = [];
let failures = 0;
for (const f of files) {
  const now = sha(fs.readFileSync(path.join(STATES, f)));
  let klass;
  let ok;
  let detail;
  if (RESTAGED[f]) {
    const was = tagSha(f);
    klass = 're-staged';
    ok = was !== null && now !== was;
    detail = ok ? RESTAGED[f]
      : (was === null ? 'NOT AT THE TAG' : 'IDENTICAL TO THE TAG — the re-render did not land');
  } else if (CARRIED.has(f)) {
    const was = tagSha(f);
    klass = 'carried';
    ok = was !== null && now === was;
    detail = ok ? 'byte-identical through r1, r2 and this session' : 'DRIFTED';
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

const gone = tagFiles.filter((f) => !files.includes(f));
if (gone.length) {
  failures += 1;
  console.log(`FAIL  tag files missing from the sheet: ${gone.join(', ')}`);
}

const counts = rows.reduce((m, r) => { m[r.class] = (m[r.class] || 0) + 1; return m; }, {});
fs.writeFileSync(path.join(__dirname, '..', 'proof-record-impl1.json'), JSON.stringify({
  date: new Date().toISOString(),
  session: 'batch-c-impl-1',
  baseline: TAG,
  method: 'sha256 of every cell PNG against the file at the baseline tag; byte-identity implies zero differing pixels',
  counts,
  tagFilesMissing: gone,
  failures,
  rows
}, null, 2));

console.log(`\n${files.length} files: ${Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(' · ')} · ${failures} failures`);
process.exit(failures ? 1 : 0);
