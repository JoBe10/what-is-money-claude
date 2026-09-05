// Batch B implementation, Session 1 — the zero-pixel proof
// (docs/batch-b-implementation-brief.md §1, §2).
//
// The session's law: no cell moves except the ones a §1 ruling re-staged.
// Proven at byte strength against tag `act-2-states-r2` — byte-identity
// implies zero differing pixels, and it is checked from git, not asserted:
//
//   UNTOUCHED  every cell no ruling touched is byte-identical to the tag.
//   CARRIED    the retired disc-as-station stagings are byte-identical to
//              the tag files they were carried from (s10-b1-disc ← s10-b1 ·
//              s10-b2-disc ← s10-b2) — a retirement landed by file copy,
//              never by re-render.
//   RE-STAGED  the §1 ruled re-renders, named, each traceable to its ruling.
//
// Any file on the sheet that fits none of the three classes fails the proof.
//
// Usage: node proof-impl1.cjs
const { execSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const STATES = path.join(REPO, 'review', 'act-2', 'states');
const TAG = 'act-2-states-r2';

const CARRIED = {
  's10-b1-disc.png': 's10-b1.png',  // the disc-as-station strip, retired to file (the CERTIFICATE ruling)
  's10-b2-disc.png': 's10-b2.png'   // the history line on the disc strip, retired to file
};
const RESTAGED = {
  's10-b1.png': 'ruling 1.1 — the CERTIFICATE: the second station carries the gold_certificate render, relabeled CLAIM ON GOLD; all four stations photographic',
  's10-b2.png': 'ruling 1.1 — the history line re-landed on the certificate strip',
  's9-b2.png': 'ruling 1.2 — the entrant block carries the coin render (the display-scale glyph retirement, per C1)',
  's9-b3.png': 'ruling 1.2 — the capabilities advance, re-rendered with the coin at the block’s head',
  's9-b4.png': 'ruling 1.2 — the honest line, re-rendered with the coin at the block’s head'
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
      ? `byte-identical to ${TAG}:${CARRIED[f]} — the retired staging preserved by construction`
      : `DRIFTED from ${TAG}:${CARRIED[f]}`;
  } else if (RESTAGED[f]) {
    const was = tagSha(f);
    klass = 're-staged';
    ok = true;
    detail = `${RESTAGED[f]}${was ? ' — supersedes the r2 render, preserved at the tag' : ' — new at impl-1'}`;
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
fs.writeFileSync(path.join(__dirname, '..', 'proof-impl1.json'), JSON.stringify({
  date: new Date().toISOString(),
  session: 'batch-b-impl-1',
  baseline: TAG,
  method: 'sha256 of every cell PNG against the file at the baseline tag; byte-identity implies zero differing pixels',
  counts,
  tagFilesMissing: gone,
  failures,
  rows
}, null, 2));

console.log(`\n${files.length} files: ${Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(' · ')} · ${failures} failures`);
process.exit(failures ? 1 : 0);
