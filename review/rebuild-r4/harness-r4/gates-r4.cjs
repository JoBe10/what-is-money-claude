// R4 static gates (session brief §2.2–2.3). The R3.1 static suite still runs
// and still applies, with two exceptions that R4 was instructed to break —
// "Sections 1–2 sources untouched" (R4's mandate includes the Section 2
// chart) and "palladium chart flagged PROVISIONAL" (R4's mandate is to remove
// it). This suite carries forward the gates that remain valid, extends them
// over the new `src/data/` files, and adds the checks R4 owes: no PROVISIONAL
// anywhere, SOURCES.md complete and cross-referenced both ways, and the
// embedded data internally consistent with what the deck says about it.
//
// Sources are read with line endings normalized — a fresh checkout can
// materialize tracked files as CRLF, which silently broke the R3.1 notes
// regex until this session; every gate reasons about content, never newlines.
//
// Usage: node gates-r4.cjs
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '../../..');
const OUT = path.join(__dirname, '..');
const CRLF = new RegExp(String.fromCharCode(13, 10), 'g');
const read = (p) => fs.readFileSync(path.join(REPO, p), 'utf8')
  .replace(CRLF, String.fromCharCode(10));

const results = [];
function record(section, name, ok, detail) {
  results.push({ section, name, ok, detail: detail || '' });
  if (!ok) console.log(`FAIL ${section} :: ${name} :: ${detail}`);
}

const S1 = 'src/slides/section-1-question';
const S2 = 'src/slides/section-2-origin';
const S3 = 'src/slides/section-3-function';
const DATA = 'src/data';

const slideFiles = [S1, S2, S3].flatMap((d) =>
  fs.readdirSync(path.join(REPO, d)).filter((f) => f.endsWith('.js')).map((f) => `${d}/${f}`));
const dataFiles = fs.readdirSync(path.join(REPO, DATA))
  .filter((f) => f.endsWith('.js')).map((f) => `${DATA}/${f}`);
const componentFiles = [
  'src/components/WaypointInterstitial.js',
  'src/components/section-3/StageLadder.js',
  'src/components/section-3/LayerDiagram.js',
  'src/components/section-2/EvolutionRail.js'
];
const allSources = [...slideFiles, ...dataFiles, ...componentFiles].map((f) => [f, read(f)]);
const css = read('src/styles/slides.css');
const sources = read('docs/SOURCES.md');

// ---------- 1. Zero PROVISIONAL ----------
{
  const hits = allSources.filter(([, t]) => /PROVISIONAL/i.test(t)).map(([f]) => f);
  if (/PROVISIONAL/i.test(css)) hits.push('src/styles/slides.css');
  record('provisional', 'no PROVISIONAL flag anywhere in src/', hits.length === 0, hits.join(', '));
  // Walk all of src/ so nothing hides in a file this suite does not list.
  const walk = (dir) => fs.readdirSync(path.join(REPO, dir), { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]));
  const stray = walk('src').filter((f) => /\.(js|css|html)$/.test(f))
    .filter((f) => /PROVISIONAL/i.test(read(f)));
  record('provisional', 'no PROVISIONAL flag in any file under src/ (full walk)',
    stray.length === 0, stray.join(', '));
  record('provisional', 'no PROVISIONAL status line left in SOURCES.md',
    !/\*\*Status: PROVISIONAL/i.test(sources) && !/to be completed in R4/i.test(sources), '');
}

// ---------- 2. SOURCES.md completeness, both directions ----------
{
  const ids = [...sources.matchAll(/^## (WIM-[A-Z0-9-]+)/gm)].map((m) => m[1]);
  record('sources', `SOURCES.md defines ${ids.length} entries`, ids.length >= 20, ids.join(' '));
  record('sources', 'no duplicate ids', new Set(ids).size === ids.length, '');

  // Every id cited in code exists in SOURCES.md.
  const cited = new Set();
  for (const [, t] of allSources) {
    for (const m of t.matchAll(/WIM-[A-Z0-9-]+/g)) cited.add(m[0]);
  }
  const missing = [...cited].filter((id) => !ids.includes(id));
  record('sources', 'every WIM id cited in code is defined in SOURCES.md',
    missing.length === 0, missing.join(', '));

  // The entries that must exist, by deck position.
  const required = [
    'WIM-001', 'WIM-006', 'WIM-007', 'WIM-008', 'WIM-005', 'WIM-009', 'WIM-003',
    'WIM-011', 'WIM-FX-001', 'WIM-FX-002', 'WIM-FX-003', 'WIM-FX-004', 'WIM-FX-005',
    'WIM-004', 'WIM-AR-001', 'WIM-012', 'WIM-013', 'WIM-PD-001', 'WIM-PD-002',
    'WIM-PD-003', 'WIM-PD-004', 'WIM-014', 'WIM-BTC-001', 'WIM-BTC-002'
  ];
  const absent = required.filter((id) => !ids.includes(id));
  record('sources', `all ${required.length} required entries present`, absent.length === 0, absent.join(', '));

  // Each entry carries the fields the brief specifies.
  const blocks = sources.split(/^## /m).slice(1);
  const thin = [];
  for (const b of blocks) {
    const id = b.split(/\s/)[0];
    if (!id.startsWith('WIM-')) continue;
    if (/superseded/i.test(b.split('\n')[0])) continue;
    const hasClaim = /\*\*(Rendered|Spoken|Figure|Figures):/.test(b);
    const hasBasis = /\*\*(Basis|Series used|Source|Sources|What the record supports|What the real data shows|Verified)/.test(b);
    const hasDate = /\*\*Date recorded:\*\*/.test(b);
    if (!(hasClaim && hasBasis && hasDate)) {
      thin.push(`${id}(${hasClaim ? '' : 'claim '}${hasBasis ? '' : 'basis '}${hasDate ? '' : 'date'})`);
    }
  }
  record('sources', 'every live entry states the claim, a basis/source, and a date',
    thin.length === 0, thin.join(', '));

  // Retrieval dates: the brief requires them for web-sourced figures.
  const retrieved = (sources.match(/Retrieved 2026-07-30/g) || []).length;
  record('sources', 'retrieval dates recorded on the researched entries', retrieved >= 12,
    `${retrieved} occurrences`);

  // R4 raised eight copy tensions as flags; R4.1 carries the presenter's
  // ruling on each. Every one must be marked applied, uniquely numbered, and
  // answered in the report — and no flag may still be open.
  const open = [...sources.matchAll(/⚠ Flagged for presenter ruling \((R-\d+)\)/g)].map((m) => m[1]);
  record('sources', 'no presenter ruling left open', open.length === 0, open.join(', '));
  const flags = [...sources.matchAll(/✔ Ruling (R-\d+) applied/g)].map((m) => m[1]);
  record('sources', 'all 8 rulings marked applied, uniquely numbered',
    flags.length === 8 && new Set(flags).size === 8, flags.join(', '));
  const report = fs.existsSync(path.join(REPO, 'docs/r4-report.md')) ? read('docs/r4-report.md') : '';
  const unlisted = flags.filter((f) => !report.includes(f));
  record('sources', 'every flag raised in SOURCES.md is answered in r4-report.md',
    report !== '' && unlisted.length === 0,
    report === '' ? 'r4-report.md not written yet' : unlisted.join(', '));
}

// ---------- 3. The purchasing-power data ----------
{
  const src = read(`${DATA}/purchasing-power.js`);
  const yearMin = Number((src.match(/PP_YEAR_MIN = (\d+)/) || [])[1]);
  const yearMax = Number((src.match(/PP_YEAR_MAX = (\d+)/) || [])[1]);
  record('fx-data', 'window is 1971–2025', yearMin === 1971 && yearMax === 2025, `${yearMin}–${yearMax}`);
  const span = yearMax - yearMin + 1;
  const series = {};
  for (const m of src.matchAll(/(USD|GBP|JPY|CHF): \[([\s\S]*?)\]/g)) {
    series[m[1]] = m[2].split(',').map((x) => parseFloat(x.trim())).filter((x) => !Number.isNaN(x));
  }
  record('fx-data', 'four series present', Object.keys(series).length === 4, Object.keys(series).join(','));
  for (const [k, v] of Object.entries(series)) {
    record('fx-data', `${k}: ${span} annual values`, v.length === span, `${v.length}`);
    record('fx-data', `${k}: indexed to 100 at 1971`, v[0] === 100, `${v[0]}`);
    record('fx-data', `${k}: declines over the span`, v[v.length - 1] < v[0],
      `${v[0]} → ${v[v.length - 1]}`);
    record('fx-data', `${k}: no value outside (0, 100]`, v.every((x) => x > 0 && x <= 100), '');
  }
  // The brief's honesty requirement: CHF must be the strongest line.
  const ends = Object.fromEntries(Object.entries(series).map(([k, v]) => [k, v[v.length - 1]]));
  const strongest = Object.entries(ends).sort((a, b) => b[1] - a[1])[0][0];
  record('fx-data', 'CHF is the strongest line at the end of the window',
    strongest === 'CHF', JSON.stringify(ends));
  // CHF is the strongest line for all but the first four years of the window:
  // the dollar sat above it 1972-1975, before Swiss inflation fell below US
  // inflation for good. Recorded exactly rather than rounded into a slogan.
  const chfNotMax = series.CHF
    .map((v, i) => (v < Math.max(series.USD[i], series.GBP[i], series.JPY[i]) - 1e-9 ? 1971 + i : 0))
    .filter(Boolean);
  record('fx-data', 'CHF is the strongest line from 1976 onward (USD above it 1972-1975 only)',
    chfNotMax.join(',') === '1972,1973,1974,1975', chfNotMax.join(', ') || 'none');
  // The non-monotonicity the report flags must actually be what the data says.
  const rises = Object.fromEntries(Object.entries(series).map(([k, v]) =>
    [k, v.filter((x, i) => i > 0 && x > v[i - 1] + 1e-9).length]));
  // Counted on the plotted (2-decimal) series: JPY 12, CHF 6, USD 1, GBP 0.
  // The unrounded series has one more CHF rise (2014, +0.005 index points),
  // which rounding removes; both numbers are recorded in SOURCES.md.
  record('fx-data', 'recorded deflation upticks match the plotted series (JPY 12, CHF 6, USD 1, GBP 0)',
    rises.JPY === 12 && rises.CHF === 6 && rises.USD === 1 && rises.GBP === 0,
    JSON.stringify(rises));
  // Endpoints quoted in SOURCES.md must equal the plotted endpoints.
  for (const [k, want] of [['USD', 12.58], ['GBP', 9.06], ['JPY', 29.40], ['CHF', 33.66]]) {
    record('fx-data', `SOURCES.md quotes ${k} 2025 = ${want}`,
      sources.includes(`2025 = ${want.toFixed(2)}`) && Math.abs(ends[k] - want) < 0.005, `${ends[k]}`);
  }
  record('fx-data', 'the slide consumes the data file (no inline series)',
    /from '\.\.\/\.\.\/data\/purchasing-power\.js'/.test(read(`${S2}/07-the-severance.js`)) &&
    !/points: \{ 1971:/.test(read(`${S2}/07-the-severance.js`)), '');
}

// ---------- 4. The palladium data ----------
{
  const src = read(`${DATA}/palladium.js`);
  const yMin = Number((src.match(/PRICE_YEAR_MIN = (\d+)/) || [])[1]);
  const yMax = Number((src.match(/PRICE_YEAR_MAX = (\d+)/) || [])[1]);
  record('pd-data', 'price window is 1990–2025', yMin === 1990 && yMax === 2025, `${yMin}–${yMax}`);
  const span = yMax - yMin + 1;
  const px = {};
  for (const m of src.matchAll(/(GOLD|PALLADIUM): \[([\s\S]*?)\]/g)) {
    px[m[1]] = m[2].split(',').map((x) => parseFloat(x.trim())).filter((x) => !Number.isNaN(x));
  }
  record('pd-data', 'two price series present', Object.keys(px).length === 2, Object.keys(px).join(','));
  for (const [k, v] of Object.entries(px)) {
    record('pd-data', `${k}: ${span} annual values`, v.length === span, `${v.length}`);
    record('pd-data', `${k}: all values inside the plotted value axis (80–3600)`,
      v.every((x) => x >= 80 && x <= 3600), `min ${Math.min(...v)} max ${Math.max(...v)}`);
  }
  // The beat's claim: palladium above gold in exactly 1999–2002 and 2019–2022.
  const cross = [];
  for (let i = 0; i < span; i += 1) if (px.PALLADIUM[i] > px.GOLD[i]) cross.push(yMin + i);
  const want = [1999, 2000, 2001, 2002, 2019, 2020, 2021, 2022];
  record('pd-data', 'palladium closed above gold in exactly 1999–2002 and 2019–2022',
    cross.join(',') === want.join(','), cross.join(', '));
  record('pd-data', '"long stretches" is plural and true (two runs of four years)',
    cross.length === 8, `${cross.length} years`);
  record('pd-data', 'SOURCES.md records the same crossing years',
    sources.includes('1999–2002') && sources.includes('2019–2022'), '');
  // Mine supply.
  const supply = Object.fromEntries([...src.matchAll(/id: '(GOLD|PALLADIUM)', tonnes: (\d+)/g)]
    .map((m) => [m[1], Number(m[2])]));
  record('pd-data', 'mine supply: gold 3,280 t and palladium 217 t (USGS MCS 2026, 2024 actuals)',
    supply.GOLD === 3280 && supply.PALLADIUM === 217, JSON.stringify(supply));
  record('pd-data', 'gold mine supply is >10x palladium (the panel\'s claim)',
    supply.GOLD / supply.PALLADIUM > 10, `${(supply.GOLD / supply.PALLADIUM).toFixed(1)}x`);
  record('pd-data', 'the widths are documented as qualitative, not to scale',
    /NOT to scale/.test(read('src/components/section-3/LayerDiagram.js')), '');
  // The retired metric must be gone from every surface.
  const pal = read(`${S3}/05-the-palladium-test.js`);
  // The panel is gone from every *surface*: no rarity class survives, and the
  // retired title exists nowhere as a rendered string. Both files still discuss
  // crustal abundance in comments, which is where the reasoning belongs — hence
  // a gate on classes and string literals rather than on prose.
  const rarityHits = allSources.filter(([, t]) => /__rarity/.test(t)).map(([f]) => f);
  if (/__rarity/.test(css)) rarityHits.push('src/styles/slides.css');
  const retiredTitle = allSources
    .filter(([, t]) => /'CRUSTAL RARITY[^']*'/.test(t))
    .map(([f]) => f);
  record('pd-data', 'the crustal-rarity panel is gone from every surface',
    rarityHits.length === 0 && retiredTitle.length === 0,
    [...rarityHits, ...retiredTitle].join(', '));
  record('pd-data', 'the supply panel is titled ANNUAL MINE SUPPLY · TONNES',
    pal.includes('ANNUAL MINE SUPPLY · TONNES'), '');
  record('pd-data', 'the slide consumes the data file (no inline price points)',
    /from '\.\.\/\.\.\/data\/palladium\.js'/.test(pal) && !/points: \{$/m.test(pal), '');
}

// ---------- 5. Gates carried forward from R3.1, extended over src/data ----------
{
  const banned = /engineered|purpose-built|repurposed|designed as a solution/i;
  const bannedHits = allSources.filter(([, t]) => banned.test(t)).map(([f]) => f);
  record('constitution', 'banned terms: zero across Sections 1–3 sources and data',
    bannedHits.length === 0, bannedHits.join(', '));

  // Section 3 rule (governing brief 3.3, rung 2): the reserved word belongs to
  // slide 3.6 and nowhere else *in Section 3*. Section 2's ladder beat uses
  // "a claim on gold in a vault" by design and predates the rule.
  const claimScope = allSources.filter(([f]) => f.startsWith(S3) || f.includes('/section-3/'));
  const claimHits = [];
  for (const [f, t] of claimScope) {
    const n = (t.match(/claim/gi) || []).length;
    if (n && !f.endsWith('06-what-your-money-is.js')) claimHits.push(`${f}:${n}`);
  }
  if (/claim/i.test(css.slice(css.indexOf('===== Section 3')))) claimHits.push('slides.css(S3 region)');
  record('constitution', '"claim" still confined to slide 3.6 within Section 3',
    claimHits.length === 0, claimHits.join(', '));
  const claim06 = (read(`${S3}/06-what-your-money-is.js`).match(/claim/gi) || []).length;
  record('constitution', 'slide 3.6 claim count unchanged from R3.1 (12)', claim06 === 12, `${claim06}`);

  // The R2 Phase D apostrophe standard covers Section 3 and every file a
  // session touches. Sections 1-2 carry pre-existing ASCII apostrophes in
  // comments; R4 does not open those files, so they stay out of scope and are
  // recorded as an observation instead.
  const ascii = /[A-Za-z]'[A-Za-z]/;
  const apostropheScope = allSources.filter(([f]) =>
    f.startsWith(S3) || f.startsWith(DATA) || f.includes('/section-3/') ||
    f === `${S2}/07-the-severance.js`);
  const asciiHits = apostropheScope.filter(([, t]) => ascii.test(t)).map(([f]) => f);
  const s3css = css.slice(css.indexOf('===== Section 3'));
  if (ascii.test(s3css)) asciiHits.push('slides.css(S3 region)');
  record('constitution', 'typographic apostrophes in every file R4 touched, and all of Section 3',
    asciiHits.length === 0, asciiHits.join(', '));

  const british = /\b(colour|behaviour|monetis|labour|judgement|jewellery|centre|defence|analyse|organis|programme|recognis|realis)\w*/i;
  const brHits = allSources.filter(([, t]) => british.test(t)).map(([f]) => f);
  record('constitution', 'American English across Sections 1–3 sources and data',
    brHits.length === 0, brHits.join(', '));

  const jsAccent = allSources.filter(([, t]) => /#F7931A|247,\s*147,\s*26|--accent/i.test(t)).map(([f]) => f);
  record('constitution', 'no accent color introduced in JS or data files',
    jsAccent.length === 0, jsAccent.join(', '));
}

// ---------- 6. Scope: what R4 was allowed to touch ----------
{
  const merge = '076e2bb'; // Merge R3+R3.1
  const changed = execSync(`git diff --name-only ${merge}`, { cwd: REPO })
    .toString().trim().split(/\r?\n/).filter(Boolean);
  // `git status --porcelain` reports a wholly-untracked directory as one entry
  // ending in '/', so expand those to their files before judging scope.
  const expand = (p2) => {
    if (!p2.endsWith('/')) return [p2];
    const walkDir = (d) => fs.readdirSync(path.join(REPO, d), { withFileTypes: true })
      .flatMap((e) => (e.isDirectory() ? walkDir(`${d}/${e.name}`) : [`${d}/${e.name}`]));
    return walkDir(p2.replace(/\/$/, ''));
  };
  const dirty = execSync('git status --porcelain', { cwd: REPO }).toString().trim()
    .split(/\r?\n/).filter(Boolean).flatMap((l) => expand(l.slice(3).trim()));
  const touched = [...new Set([...changed, ...dirty])].filter((f) => f.startsWith('src/'));
  const allowed = [
    'src/data/purchasing-power.js',
    'src/data/palladium.js',
    'src/slides/section-2-origin/07-the-severance.js',
    'src/slides/section-3-function/05-the-palladium-test.js',
    'src/styles/slides.css',
    // R4.1 — the files the eight applied rulings touch, and only those:
    'src/slides/section-1-question/01-eighty-thousand-hours.js',
    'src/slides/section-2-origin/01-the-world-without-it.js',
    'src/slides/section-2-origin/02-the-discovery.js',
    'src/slides/section-2-origin/04-the-competition-record.js',
    'src/slides/section-2-origin/05-two-survivors.js',
    'src/slides/section-2-origin/08-the-pattern.js',
    'src/components/section-2/EvolutionRail.js',
    'src/components/section-2/ElementGrid.js'
  ];
  const extra = touched.filter((f) => !allowed.includes(f));
  record('scope', 'only the R4 data work and the R4.1 ruled files changed under src/',
    extra.length === 0, extra.join(', '));
  const s4 = touched.filter((f) => f.includes('section-4') || f.includes('section-5'));
  record('scope', 'Sections 4–5 untouched', s4.length === 0, s4.join(', '));
  record('scope', 'Section 1 touched only by R-07 (the script qualifier)',
    touched.filter((f) => f.includes('section-1'))
      .every((f) => f === 'src/slides/section-1-question/01-eighty-thousand-hours.js'), '');

  // Pacing: the one slide whose build count moved must still match its script.
  const ts = read('src/slides/section-2-origin/05-two-survivors.js');
  const tsNotes = (ts.match(/notes: `([\s\S]*)`/) || [])[1] || '';
  const tsArrows = (tsNotes.match(/\[→\]/g) || []).length;
  const tsBuilds = Number((ts.match(/totalBuildSteps: (\d+)/) || [])[1]);
  record('scope', '2.5 grew to 6 builds and 6 arrows (R-03)',
    tsArrows === 6 && tsBuilds === 6, `arrows=${tsArrows} builds=${tsBuilds}`);
  record('scope', 'engine untouched',
    touched.filter((f) => f.startsWith('src/engine/')).length === 0, '');
  // R4 forbade copy changes and gated on their absence. R4.1 authorizes
  // exactly eight, so the gate inverts: each ruling's applied wording must be
  // on stage, and each retired wording must be gone. That is a stronger check
  // than "nothing changed" — it verifies the rulings actually landed.
  const onStage = [
    ['R-01', 'src/slides/section-2-origin/01-the-world-without-it.js', 'The double coincidence of wants.'],
    ['R-01', 'src/slides/section-2-origin/02-the-discovery.js', 'The double coincidence of wants.'],
    ['R-02', 'src/components/section-2/EvolutionRail.js', 'shiploads of cheaper Zanzibar cowries collapsed the shell rate'],
    ['R-02', 'src/slides/section-2-origin/04-the-competition-record.js', 'thousands of tons of cheaper Zanzibar cowries'],
    ['R-03', 'src/slides/section-2-origin/05-two-survivors.js', 'Workable nobility leaves two.'],
    ['R-03', 'src/slides/section-2-origin/05-two-survivors.js', 'hides in ores no ancient chemist could crack'],
    ['R-03', 'src/slides/section-2-origin/05-two-survivors.js', 'until 1803'],
    ['R-04', 'src/slides/section-2-origin/07-the-severance.js', 'ends far below where it began'],
    ['R-05', 'src/slides/section-3-function/05-the-palladium-test.js', 'scarcer in supply than gold'],
    ['R-05', 'src/slides/section-3-function/05-the-palladium-test.js', 'about fifteen times as much gold each year'],
    ['R-06', 'src/slides/section-2-origin/07-the-severance.js', '1971 = 100 · as of 2025'],
    ['R-07', 'src/slides/section-1-question/01-eighty-thousand-hours.js', 'A full-time working life'],
    ['R-08', 'src/components/section-2/EvolutionRail.js', 'Not yet twenty years into a hundred-year question.'],
    ['R-08', 'src/slides/section-2-origin/08-the-pattern.js', 'not yet twenty years into a hundred-year question']
  ];
  const notLanded = onStage.filter(([, f, txt]) => !read(f).includes(txt))
    .map(([r, f]) => `${r}:${path.basename(f)}`);
  record('scope', `all ${onStage.length} ruled lines are on stage`, notLanded.length === 0, notLanded.join(', '));

  const retired = [
    ['R-01', "wall.textContent = 'The coincidence of wants.'"],
    ['R-02', 'aggry beads'],
    ['R-02', 'industrially produced beads'],
    ['R-04', 'goes one direction'],
    ['R-05', 'Rarer in the Earth'],
    ['R-05', 'rarer than gold'],
    ['R-08', 'Seventeen years into a hundred-year'],
    ['R-08', 'is seventeen years into a hundred-year']
  ];
  const survivors = retired
    .filter(([, txt]) => allSources.some(([, t]) => t.includes(txt)))
    .map(([r, txt]) => `${r}:"${txt}"`);
  record('scope', 'every retired wording is gone from the deck', survivors.length === 0, survivors.join(', '));

  // R-07 is the one ruling that forbids a change: the cold open stands.
  record('scope', 'R-07: the on-screen cold-open line is untouched',
    read('src/slides/section-1-question/01-eighty-thousand-hours.js')
      .includes("'This is how many hours of your life you will spend working.'"), '');
}

const failures = results.filter((r) => !r.ok);
const summary = {
  revision: 'R4',
  date: new Date().toISOString(),
  checks: results.length,
  failures: failures.length,
  results
};
fs.writeFileSync(path.join(OUT, 'gates-r4-results.json'), JSON.stringify(summary, null, 2));
console.log(`\nR4 gates: ${results.length} checks, ${failures.length} failures`);
process.exit(failures.length ? 1 : 0);
