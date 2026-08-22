// R7 static gates — the constitution checks, the freeze checks, and the pacing
// audit, run over the sources rather than the browser.
//
// The freeze gates are the important ones: R7 was an execution rebuild, so any
// diff to the fifty scores or to 4.23's visible frame is a defect by
// definition, and both are compared against the branch point rather than
// eyeballed.
//
// Usage: node gates-r7.cjs [--base <ref>]
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const REPO = path.resolve(__dirname, '../../..');
const S4 = path.join(REPO, 'src/slides/section-4-ideal-store');
const S5 = path.join(REPO, 'src/slides/section-5-close');
const CSS = path.join(REPO, 'src/styles/slides.css');

const baseArg = process.argv.indexOf('--base');
const BASE = baseArg > -1 ? process.argv[baseArg + 1] : 'main';

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  if (!ok) console.log(`FAIL  ${name} :: ${detail}`);
}

const read = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const git = (...args) => execFileSync('git', args, { cwd: REPO, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

const s4Files = fs.readdirSync(S4).filter((f) => f.endsWith('.js')).map((f) => path.join(S4, f));
const s5Files = fs.readdirSync(S5).filter((f) => f.endsWith('.js')).map((f) => path.join(S5, f));
const slideFiles = [...s4Files, ...s5Files];
const sources = new Map(slideFiles.map((f) => [path.basename(f), read(f)]));
const cssText = read(CSS);

// ---------------------------------------------------------------- 1. THE FREEZE

// 1a. The fifty scores, byte-identical against the branch point.
{
  const rel = 'src/slides/section-4-ideal-store/_comparison-data.js';
  const now = read(path.join(REPO, rel));
  const before = git('show', `${BASE}:${rel}`).replace(/\r\n/g, '\n');
  const rows = (text) => {
    const start = text.indexOf('const comparisonRows = [');
    const end = text.indexOf('];', start);
    return start < 0 ? null : text.slice(start, end + 2);
  };
  const a = rows(before);
  const b = rows(now);
  // `property:` appears twice per row — the row's name and the real-estate
  // score key — so count the rows by their names, not by the key.
  const rowCount = (b.match(/property: '/g) || []).length;
  const scoreCount = (b.match(/(gold|fiat|bitcoin|property|shares): \d/g) || []).length;
  check('FREEZE: comparisonRows byte-identical to the branch point', a && b && a === b,
    a === b ? `${rowCount} properties × 5 candidates = ${scoreCount} scores unchanged` : 'the scores block differs');

  // and the five candidates, their ids, labels and groups
  const assetsOf = (text) => (text.match(/id: '(\w+)',\n\s*label: '([^']+)',\n\s*group: '(\w+)'/g) || []).join('|');
  check('FREEZE: the five candidates (id, label, group) unchanged',
    assetsOf(before) === assetsOf(now), assetsOf(now).slice(0, 200));

  // the ten failure/property pairs
  const relPairs = 'src/slides/section-4-ideal-store/_failure-property-data.js';
  check('FREEZE: the ten failure/property pairs untouched',
    git('show', `${BASE}:${relPairs}`).replace(/\r\n/g, '\n') === read(path.join(REPO, relPairs)),
    'file identical');
}

// 1b. 4.23's visible frame: the kicker, the conclusion, and the CSS that paints
// them. R7 restaged the recap that clears before it; the final frame is frozen.
{
  const rel = 'src/slides/section-4-ideal-store/23-investment-case-from-first-principles.js';
  const now = read(path.join(REPO, rel));
  const before = git('show', `${BASE}:${rel}`).replace(/\r\n/g, '\n');
  // Compared as rendered, not as spelled: R7 converted this file's literal
  // \uXXXX escapes to the characters they already produced, so the source text
  // differs where the painted frame cannot.
  const unescape = (s) => s.replace(/\\u([0-9a-fA-F]{4})/g,
    (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  const frame = (text) => {
    const out = [];
    const kicker = text.match(/KickerLabel\('([^']+)'\)/);
    if (kicker) out.push(`kicker=${unescape(kicker[1])}`);
    const start = text.indexOf("const conclusion = document.createElement('p');");
    const end = text.indexOf('root.appendChild(conclusion);', start);
    out.push(unescape(text.slice(start, end)));
    return out.join('\n');
  };
  check('FREEZE: 4.23 visible frame (kicker + conclusion) byte-identical',
    frame(before) === frame(now), 'final frame unchanged');
  const cssBefore = git('show', `${BASE}:src/styles/slides.css`).replace(/\r\n/g, '\n');
  const block = (text, sel) => {
    const i = text.indexOf(sel);
    return i < 0 ? null : text.slice(i, text.indexOf('}', i) + 1);
  };
  ['.s4-investment-case__conclusion {', '.s4-investment-case__kicker'].forEach((sel) => {
    check(`FREEZE: 4.23 CSS "${sel.trim()}" unchanged`,
      block(cssBefore, sel) === block(cssText, sel), 'rule unchanged');
  });
}

// ------------------------------------------------------- 2. CONSTITUTION GATES

// 2a. Banned terms (rebuild brief 3.1 / the v2 document's guardrails).
{
  const banned = ['engineered', 'purpose-built', 'repurposed', 'designed as a solution'];
  banned.forEach((term) => {
    const hits = [];
    sources.forEach((text, name) => {
      const re = new RegExp(term.replace(/[-\s]/g, '[-\\s]'), 'gi');
      if (re.test(text)) hits.push(name);
    });
    check(`banned term absent: "${term}"`, hits.length === 0, hits.join(', '));
  });
}

// 2b. Retired lines (v2 4.3 and the R7 amendments). Each must be gone.
{
  const retired = [
    ['You can print claims', 'the void printing line'],
    ['Don’t trust the table', 'the pre-amendment table line'],
    ["Don't trust the table", 'the pre-amendment table line (ASCII)'],
    ['Verify every score.', 'the pre-amendment table line, second half'],
    ['German investment advisor', 'the Florian-era attribution'],
    ['perfect engineered solution', 'the retired ending']
  ];
  const all = [...sources.values(), cssText].join('\n');
  retired.forEach(([line, why]) => {
    check(`retired line absent (${why}): "${line}"`, !all.includes(line), 'found on stage or in notes');
  });
}

// 2c. "Don’t trust. Verify." — exactly twice on stage, 4.16 and 4.20b.
{
  const onStage = [];
  sources.forEach((text, name) => {
    // On-screen copy only: textContent assignments, not the spoken script.
    const script = text.slice(text.indexOf('notes: `'));
    const stage = text.slice(0, text.indexOf('notes: `'));
    if (/Don’t trust\./.test(stage) && /Verify\./.test(stage)) onStage.push(name);
    void script;
  });
  check('"Don’t trust. Verify." on stage exactly twice', onStage.length === 2, onStage.join(', '));
  check('  …and the two are 4.16 and 4.20b',
    onStage.includes('16-the-comparison.js') && onStage.includes('20b-what-would-change-these-scores.js'),
    onStage.join(', '));
}

// 2d. American English.
{
  const british = [
    'monetisation', 'monetise', 'recognisable', 'specialised', 'optimised',
    'normalise', 'colour', 'behaviour', 'favour', 'centre of', 'analyse',
    'judgement', 'jewellery', 'labour'
  ];
  // Copy and notes only: AGENTS.md §6 exempts identifiers, ids, filenames and
  // CSS class names, which is why `specialisedSubject` may stand.
  british.forEach((word) => {
    const hits = [];
    sources.forEach((text, name) => {
      const notes = text.slice(text.indexOf('notes: `'));
      const strings = (text.match(/'[^'\n]{4,}'|"[^"\n]{4,}"/g) || []).join('\n');
      const re = new RegExp(`\\b${word}(?![A-Za-z])`, 'i');
      if (re.test(notes) || re.test(strings)) hits.push(name);
    });
    check(`American English: no "${word}" in copy or notes`, hits.length === 0, hits.join(', '));
  });
}

// 2e. Typographic apostrophes in copy, notes and comments (the R2 Phase D
// standard). ASCII apostrophes between letters are the failure.
{
  const hits = [];
  sources.forEach((text, name) => {
    // Strip JS string delimiters: an ASCII apostrophe between two letters is
    // never a delimiter, which is exactly what this looks for.
    const bad = text.match(/[A-Za-z]'[A-Za-z]/g);
    if (bad) hits.push(`${name}: ${bad.slice(0, 4).join(' ')}`);
  });
  check('typographic apostrophes: no ASCII apostrophe between letters', hits.length === 0, hits.join(' | '));

  const cssBad = cssText.match(/[A-Za-z]'[A-Za-z]/g);
  check('typographic apostrophes: Section 4/5 CSS comments clean', !cssBad,
    cssBad ? cssBad.slice(0, 5).join(' ') : '');
}

// 2f. Transcript artifacts.
{
  const hits = [];
  sources.forEach((text, name) => {
    if (/\bL\d+:/.test(text)) hits.push(name);
  });
  check('no transcript artifacts (L1: style markers)', hits.length === 0, hits.join(', '));
}

// -------------------------------------------------------------- 3. THE SCRIPTS

// 3a. Pacing: every script's [→] count equals its declared totalBuildSteps.
{
  const rows = [];
  sources.forEach((text, name) => {
    if (name.startsWith('_')) return;
    const total = text.match(/totalBuildSteps:\s*(\w+)/);
    if (!total) return;
    let builds = Number(total[1]);
    if (Number.isNaN(builds)) {
      const constMatch = text.match(new RegExp(`const ${total[1]} = (\\d+)`));
      builds = constMatch ? Number(constMatch[1]) : NaN;
    }
    const arrows = (text.match(/\[→\]/g) || []).length;
    rows.push({ name, builds, arrows });
    check(`pacing: ${name} — ${builds} builds / ${arrows} arrows`, builds === arrows,
      `${builds} vs ${arrows}`);
  });
  check('pacing: every Section 4 + close slide audited', rows.length === 24, `${rows.length} slides`);
  fs.writeFileSync(path.join(__dirname, '..', 'pacing-r7.json'), JSON.stringify(rows, null, 2));
}

// 3b. Every slide's notes are a script: they open with prose or an arrow, and
// they contain no leftover slide-explainer voice ("This slide", "the viewer").
{
  sources.forEach((text, name) => {
    if (name.startsWith('_')) return;
    const i = text.indexOf('notes: `');
    if (i < 0) return;
    const notes = text.slice(i + 8, text.lastIndexOf('`'));
    check(`script voice: ${name} has no explainer voice`,
      !/\bThis slide\b|\bthe viewer\b|\bthe audience sees\b/i.test(notes), name);
    check(`script voice: ${name} carries at least one advance`, notes.includes('[→]'), name);
  });
}

// 3c. The verbatim installs — spot-check the sentences the brief fixes.
{
  const verbatim = [
    ['04-unfinished-exchange.js', 'A *social* claim on everyone in general'],
    ['04-unfinished-exchange.js', 'what is the bottom layer a claim on'],
    ['06-claim-and-carrier.js', 'you cannot print money. You can only print the units it comes in'],
    ['08-100-year-test.js', 'That’s the point of the number.'],
    ['15-framework-to-comparison.js', 'Structure, not prophecy'],
    ['16-the-comparison.js', 'my judgments, as of 2026'],
    ['17-store-of-value-function-migrates.js', 'During transitions, savings diversify'],
    ['20b-what-would-change-these-scores.js', 'Q&A ARSENAL (not spoken in the recording)'],
    ['20b-what-would-change-these-scores.js', 'history’s worst store-of-value failures were fast'],
    ['21-marginal-store-of-value-decision.js', 'asking it calmly, in advance'],
    ['23-investment-case-from-first-principles.js', 'The monetary rules should be hard to move.'],
    ['01-thank-you.js', 'can the rules be moved beneath you?'],
    ['20-bitcoin-does-not-replace-everything.js', 'It fixes the rules through which the market discovers its price'],
    ['20-bitcoin-does-not-replace-everything.js', 'the stage, not the verdict'],
    ['18-monetary-premium.js', 'investing has become the new saving'],
    ['19-other-assets-do-moneys-job.js', 'required yield-producing counterparty']
  ];
  verbatim.forEach(([file, phrase]) => {
    const text = sources.get(file) || '';
    check(`verbatim: ${file} carries "${phrase.slice(0, 44)}…"`, text.includes(phrase), file);
  });
}

// 3d. Every Bucket-1 qualification the conversion had to preserve.
{
  const qualifications = [
    ['16-the-comparison.js', 'informational and social', 'the durability defense'],
    ['16-the-comparison.js', 'it does not remove custodial risk', 'the self-custody honesty'],
    ['16-the-comparison.js', 'Self-custody is not free', 'the carrying-cost honesty'],
    ['16-the-comparison.js', 'there is no total', 'the no-total rule'],
    ['16-the-comparison.js', 'architecture, not valuation', 'the valuation caveat'],
    ['19-other-assets-do-moneys-job.js', 'no floor of non-monetary demand', 'the demand-floor honesty'],
    ['22-fixed-supply-reprices-at-margin.js', 'the mechanism is symmetric', 'the symmetry note'],
    ['15-framework-to-comparison.js', 'not treating an unusual capital-control edge case', 'the fiat assumption'],
    ['15-framework-to-comparison.js', 'self-custody on the Bitcoin network', 'the bitcoin assumption'],
    ['15-framework-to-comparison.js', 'no REIT, no tokenized wrapper', 'the real-estate assumption'],
    ['15-framework-to-comparison.js', 'not private-company shares', 'the shares assumption'],
    ['07-store-of-value-function.js', 'freezing every relative price', 'the purchasing-power qualification'],
    ['18-monetary-premium.js', 'cannot observe monetary premium directly', 'the premium qualification'],
    ['20-bitcoin-does-not-replace-everything.js', 'Expectation, not guarantee', 'the volatility qualification']
  ];
  qualifications.forEach(([file, phrase, why]) => {
    check(`qualification preserved (${why})`, (sources.get(file) || '').includes(phrase), file);
  });
}

// ---------------------------------------------------------- 4. THE COLOR ARC

// Section 4 is the accent's destination, so the gate is not "how little" but
// "no new colors": every accent use is the token, and no JS carries a color.
{
  const jsColor = [];
  sources.forEach((text, name) => {
    if (/#[0-9a-fA-F]{3,8}\b|rgba?\(/.test(text)) jsColor.push(name);
  });
  check('color: no hard-coded colors in Section 4/5 slide JS', jsColor.length === 0, jsColor.join(', '));

  // "No new colors" is the rule, so the gate is a diff, not an absolute: the
  // Section 4 region predates the token discipline and carries Bucket-1-approved
  // literals (the claim object's fills, the carrier shell). What R7 may not do
  // is introduce a colour that was not already on the palette.
  const cssBefore = git('show', `${BASE}:src/styles/slides.css`).replace(/\r\n/g, '\n');
  const palette = (text) => new Set([
    ...(text.match(/#[0-9a-fA-F]{3,8}\b/g) || []),
    ...(text.match(/rgba?\(\s*\d+,\s*\d+,\s*\d+/g) || []).map((s) => s.replace(/\s+/g, ''))
  ]);
  const before = palette(cssBefore);
  const introduced = [...palette(cssText)].filter((c) => !before.has(c));
  check('color: R7 introduced no colour that was not already on the deck’s palette',
    introduced.length === 0, introduced.join(' '));

  // …and every colour R7 does use in its own new rules is accent, neutral or
  // unit-warm.
  const newRules = [
    '.s4-falsifiability', '.s4-coexistence__bisection', '.s4-coexistence__resolution',
    '.s4-coexistence__price', '.s5c', '.unit-field-grid', '.s4-comparison-asset__mark',
    '.s4-claim-carrier__lineage-visual'
  ];
  const offPalette = [];
  newRules.forEach((sel) => {
    let i = cssText.indexOf(sel);
    while (i > -1) {
      const rule = cssText.slice(i, cssText.indexOf('}', i) + 1);
      (rule.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/g) || []).forEach((m) => {
        const [r, g, b] = m.match(/\d+/g).map(Number);
        const accent = r === 247 && g === 147 && b === 26;
        const neutral = r === g && g === b;
        const unitWarm = r === 253 && g === 233 && b === 212;
        if (!(accent || neutral || unitWarm)) offPalette.push(`${sel}: ${m}`);
      });
      i = cssText.indexOf(sel, i + 1);
    }
  });
  check('color: every colour in R7’s new rules is accent, neutral or unit-warm',
    offPalette.length === 0, offPalette.join(' | '));
}

// ------------------------------------------------------------- 5. THE GLYPHS

{
  const candidates = read(path.join(REPO, 'assets/icons/candidates/candidates.js'));
  const glyphs = read(path.join(REPO, 'src/components/section-2/glyphs.js'));
  ['real-estate', 'shares', 'ledger'].forEach((name) => {
    check(`glyph studio: ${name} has three candidates`,
      (candidates.match(new RegExp(`'?${name}'?: \\{[\\s\\S]*?\\n  \\}`))?.[0].match(/\n    [abc]: \{/g) || []).length === 3,
      name);
    ['a', 'b', 'c'].forEach((letter) => {
      check(`glyph studio: ${name}-${letter}.svg written`,
        fs.existsSync(path.join(REPO, `assets/icons/candidates/${name}-${letter}.svg`)), '');
    });
    check(`glyph selection recorded: ${name}`,
      new RegExp(`'?${name}'?:\\s*'[abc]'`).test(glyphs), name);
  });
  check('glyph studio: the contact sheet carries the R7 rows',
    ['real-estate', 'shares', 'ledger'].every((n) => fs.existsSync(
      path.join(REPO, `review/rebuild-r2/icon-studio/row-${n}.png`))), '');

  const header = read(path.join(REPO, 'src/components/section-4/ComparisonAssetHeader.js'));
  check('glyphs: the comparison header renders glyphs, not images',
    header.includes("from '../section-2/glyphs.js'") && !header.includes('<img'), '');
  check('glyphs: gold/fiat/bitcoin reuse the Section 2 anchors',
    /gold: 'gold'/.test(header) && /fiat: 'fiat'/.test(header) && /bitcoin: 'bitcoin'/.test(header), '');

  const lineage = sources.get('06-claim-and-carrier.js') || '';
  check('glyphs: the 4.06 carrier lineage is drawn, not photographed',
    lineage.includes("glyph(glyphName") && !lineage.includes('createElement(\'img\')'), '');
}

// -------------------------------------------------- 6. THE RETIRED ART ASSETS

{
  const retiredAssets = [
    'store_of_value.png', 'carrier_shells.png', 'carrier_gold.png', 'carrier_paper.png',
    'carrier_bank_ledgers.png', 'carrier_bitcoin.png', 'comparison_property.png',
    'comparison_shares.png'
  ];
  retiredAssets.forEach((file) => {
    check(`retired asset deleted: ${file}`,
      !fs.existsSync(path.join(REPO, 'assets/images', file)), '');
  });
  const srcAll = [
    ...[...sources.values()],
    read(path.join(REPO, 'src/assets.js')),
    read(path.join(REPO, 'src/components/section-4/ComparisonAssetHeader.js')),
    read(path.join(REPO, 'src/components/section-4/AssetComparisonTable.js'))
  ].join('\n');
  retiredAssets.forEach((file) => {
    const key = file.replace('.png', '');
    check(`no reference to retired asset: ${key}`, !srcAll.includes(key), '');
  });
}

// ------------------------------------------------- 7. ARCHITECTURE + STRUCTURE

{
  const snap = read(path.join(REPO, 'src/slides/_snapFrame.js'));
  check('architecture: the shared snap frame exists', snap.includes('export function beginBuild'), '');
  const missing = [];
  sources.forEach((text, name) => {
    if (name.startsWith('_')) return;
    if (!text.includes('beginBuild(refs')) missing.push(name);
  });
  // 4.14's grid has no per-build refs object of its own name; every other slide
  // must adopt the snap.
  check('architecture: every Section 4/5 slide uses the reconstruction snap',
    missing.length === 0, missing.join(', '));

  const manifest = read(path.join(REPO, 'src/slides/manifest.js'));
  check('structure: the retired opener is gone from the manifest',
    !manifest.includes('01-ideal-store-of-value'), '');
  check('structure: the merged entry is first in Section 4',
    manifest.includes("s4_01 from './section-4-ideal-store/01-define-the-job.js'"), '');
  check('structure: 20b sits between 20 and 21',
    /s4_20, *\n? *s4_20b, s4_21/.test(manifest.replace(/\s+/g, ' ').replace(/ /g, ' ')) ||
    manifest.replace(/\s+/g, ' ').includes('s4_20, s4_20b, s4_21'), '');
  check('structure: no scene groups declared in Section 4 or the close',
    ![...sources.values()].some((t) => t.includes('sceneGroup')),
    'crossfade default only — recorded as a judgment call');
}

// --------------------------------------------------------------------- REPORT

const failures = results.filter((r) => !r.ok);
const summary = {
  phase: 'R7',
  suite: 'static gates',
  base: BASE,
  checks: results.length,
  failures: failures.length,
  results
};
fs.writeFileSync(path.join(__dirname, '..', 'gates-r7-results.json'), JSON.stringify(summary, null, 2));
console.log(`\nR7 gates: ${results.length} checks, ${failures.length} failures`);
process.exit(failures.length ? 1 : 0);
