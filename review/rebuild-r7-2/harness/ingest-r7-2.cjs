// R7.2 — the dark-field drop zone.
//
// The presenter generates images from docs/dark-field-manifest.md and drops
// them into assets/dark-field/incoming/. This grade-gates each one and moves
// only the passes into assets/dark-field/, where src/dark-field.js picks them
// up automatically and the slides stubbing them start showing them.
//
// Failures stay in incoming/ with the measurement that rejected them printed,
// so "regenerate, never grandfather" (§9.4.9) is a property of the pipeline
// rather than a rule someone has to remember.
//
// Usage: node ingest-r7-2.cjs [--dry]
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry');
const REPO = path.join(__dirname, '..', '..', '..');
const SHIP = path.join(REPO, 'assets', 'dark-field');
const IN = path.join(SHIP, 'incoming');

if (!fs.existsSync(IN)) {
  console.log('no incoming/ directory — nothing to ingest');
  process.exit(0);
}
const files = fs.readdirSync(IN).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
if (!files.length) {
  console.log('incoming/ is empty — nothing to ingest');
  process.exit(0);
}

// Grade the whole drop zone in one browser launch, then read the verdicts back.
try {
  execFileSync(process.execPath, [path.join(__dirname, 'grade-r7-2.cjs'), '--dir', IN],
    { stdio: 'inherit' });
} catch {
  // A non-zero exit means some image failed; the per-image verdicts below are
  // what decide what moves, so this is not fatal here.
}

const report = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'grade-r7-2.json'), 'utf8'));
const failedFiles = new Set(
  report.results.filter((r) => !r.ok).map((r) => r.name.replace(/^grade: /, '').split(' ')[0])
);

let moved = 0;
let held = 0;
for (const f of files) {
  if (failedFiles.has(f)) {
    held += 1;
    console.log(`HELD    ${f} — off grade, stays in incoming/ (see the FAIL lines above)`);
    continue;
  }
  const dest = path.join(SHIP, f);
  console.log(`${DRY ? 'WOULD MOVE' : 'INGEST '} ${f} → assets/dark-field/${f}`);
  if (!DRY) fs.renameSync(path.join(IN, f), dest);
  moved += 1;
}

console.log(`\nR7.2 ingest: ${moved} accepted, ${held} held back${DRY ? ' (dry run)' : ''}`);
if (moved && !DRY) {
  console.log('Re-run the grade gate and the register audit against the shipping set:');
  console.log('  node review/rebuild-r7-2/harness/grade-r7-2.cjs');
}
process.exit(0);
