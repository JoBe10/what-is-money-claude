// Act V — the beat-state sheet builders (the Act V kickoff brief, Session 2;
// the ruled map `docs/act-5-provenance.md`, 4 September 2026).
//
// EVERY CELL IS A PORT OR THE ONE RULED ADAPT, AND THIS FILE DRAWS NOTHING.
// The ruled map is 22 PORT · 1 ADAPT · 0 NEW · 1 retired (the six ARGUABLE
// rows answered A · A · A · A · A · A by the presenter and recorded in master
// §13 before this file was written), so the sheet's job is transplant, not
// design: each cell MOUNTS THE LEGACY SLIDE MODULE ITSELF — the same
// `render` / `onEnter` / `buildStep` the deck runs — at the legacy build the
// map names, and lets the legacy stylesheet place every element. The only
// element this file creates is the stage container. A check gates that at the
// source: `document.createElement(` appears once, and the only imports are the
// eight legacy modules of Act V — 4-17 through 4-23 and 5-01.
//
// THE FROZEN BEAT MAP (master §13, 4 Sep 2026): S24 4 · S25 4 · S26 9 ·
// S27 3 · S28 3 · S29 2 · S30 2 — 27 beats, 27 cells, one per beat.
//
// THE BEAT → LEGACY BUILD DERIVATION, from the ruled map's rows:
//   S24  4-17 builds 0–3 (build 0 is the entry beat — row 1 ruled A)
//   S25  4-18 builds 0–3 (build 0 the entry beat)
//   S26  4-19 builds 1–5 · 4-20 builds 1–4 (the architecture's merge; 4-20's
//        builds 5–7, the stability contrast, are retired by Ruling 5)
//   S27  4-21 builds 0–2 (build 0 the entry beat)
//   S28  4-22 builds 1–3 (build 0, the stock at rest, has no advance of its
//        own — the boundary from Scene 27 lands on it; flagged on b1)
//   S29  4-23 builds 1–2 (build 0, the kicker alone on black, is the full
//        clear's landing — flagged on b1)
//   S30  5-01 build 0 (the ADAPT: black, the wayline build retired — row 6
//        ruled A) · 5-01 build 2 (Thank you.)
//
// THE RHYME IS REAL, NOT RESEMBLED: the Scene 28 cells mount legacy 4-22,
// whose FixedSupplyField draws its thirty-five units with `UnitGrid` from
// src/components/UnitField.js — the same module P1's hours field draws its
// eighty thousand units from, both reading UNIT_GRAMMAR. The probe on those
// cells records the mounted grid's geometry and the check proves it against
// the grammar read from the source (row 4, ruled A).
//
// WHERE A LEGACY BUILD 0 HAS NO ADVANCE IN THE MERGED ACT, or a seam the map
// flags is wiring, the sheet stands the settled state of the beat and flags it
// in plain English — one honest render, nothing decided silently.
//
// Review classes: `approved-port` — a PORT cell, approved by provenance
// (review optional under AGENTS.md §4.9); `pending-review` — a PORT cell
// carrying a wiring flag the presenter should see, or the one ADAPT cell with
// its change named. No cell carries a candidate system.

import s417 from '/src/slides/section-4-ideal-store/17-store-of-value-function-migrates.js';
import s418 from '/src/slides/section-4-ideal-store/18-monetary-premium.js';
import s419 from '/src/slides/section-4-ideal-store/19-other-assets-do-moneys-job.js';
import s420 from '/src/slides/section-4-ideal-store/20-bitcoin-does-not-replace-everything.js';
import s421 from '/src/slides/section-4-ideal-store/21-marginal-store-of-value-decision.js';
import s422 from '/src/slides/section-4-ideal-store/22-fixed-supply-reprices-at-margin.js';
import s423 from '/src/slides/section-4-ideal-store/23-investment-case-from-first-principles.js';
import s501 from '/src/slides/section-5-close/01-thank-you.js';

const STAGE_ID = 'act5-states-stage';

let cleanup = [];

export const CELLS = {};
function cell(id, meta, build) {
  CELLS[id] = { ...meta, build };
}

// The stage container — the one element this file creates. The legacy roots
// are `position:absolute; inset:0` (`.s4-opening`, `.s5c`), so a fixed
// 1920 × 1080 box on the deck's black is the slide-root they expect, minus the
// deck chrome.
function stage() {
  teardown();
  const el = document.createElement('div');
  el.id = STAGE_ID;
  el.style.cssText = 'position:fixed; left:0; top:0; width:1920px; height:1080px;' +
    'background:#000; overflow:hidden; z-index:9999; font-family:Inter,sans-serif;';
  document.body.appendChild(el);
  return el;
}

// Mount a legacy slide module at a build, as the engine mounts it for a
// direct entry: render, then onEnter with the target build (which arms the
// reconstruction snap so nothing transitions), then buildStep. The settled
// frame is the deck's own direct-entry frame for that build.
function mount(st, mod, build) {
  mod.render(st);
  mod.onEnter({ targetBuildStep: build, container: st });
  mod.buildStep(build);
  cleanup.push(() => mod.onExit?.({ container: st }));
  return st;
}

// ---- the probes: is the still showing the state the cell claims? ----------
//
// `expect` on a cell is a list of [selector, count]: the number of elements
// matching the selector that are actually shown — present, not display:none,
// not visibility:hidden, and with no ancestor up to the stage at opacity
// below 0.05. The capture records got-vs-expected per cell; the checks gate it.

function isShown(el, root) {
  let node = el;
  while (node && node !== root) {
    const cs = getComputedStyle(node);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.05) return false;
    node = node.parentElement;
  }
  return true;
}

export function probe(id) {
  const c = CELLS[id];
  const root = document.getElementById(STAGE_ID);
  const results = (c.expect || []).map(([sel, n]) => {
    const got = [...root.querySelectorAll(sel)].filter((el) => isShown(el, root)).length;
    return { sel, expected: n, got, ok: got === n };
  });
  const extra = {};
  // The rhyme's evidence: the mounted grid's geometry, as UnitGrid set it.
  if (c.rhyme) {
    const grid = root.querySelector('.unit-field-grid');
    extra.rhyme = grid ? {
      unitW: grid.style.getPropertyValue('--unit-w'),
      unitH: grid.style.getPropertyValue('--unit-h'),
      columnGap: grid.style.columnGap,
      rowGap: grid.style.rowGap,
      columns: grid.style.gridTemplateColumns,
      rows: grid.style.gridTemplateRows,
      units: grid.querySelectorAll('.unit-field-grid__unit').length
    } : null;
  }
  // The claim's scale at each of its Act V appearances, for the journey flag.
  const discs = [...root.querySelectorAll('.s4-claim-object__disc, .luminous-disc')]
    .filter((d) => isShown(d, root))
    .map((d) => d.style.getPropertyValue('--disc-size') || getComputedStyle(d).getPropertyValue('--disc-size').trim());
  if (discs.length) extra.discSizes = discs;
  // The close's text, for the self-reference ban at the last frame.
  if (c.closeText) extra.visibleText = [...root.querySelectorAll('*')]
    .filter((el) => el.children.length === 0 && isShown(el, root) && el.textContent.trim())
    .map((el) => el.textContent.trim());
  return { results, ok: results.every((r) => r.ok), ...extra };
}

// ============================================================ SCENE 24 (4 beats)
//
// Migration — fiat standing with its two jobs (F1, the entry beat), the demand
// to save (F2), it migrates (F3), the final line (F4). Legacy 4-17 whole.

cell('s24-b1', {
  scene: 'S24', beat: 1, frame: 'S24-F1', klass: 'PORT', review: 'pending-review',
  source: '4-17-store-of-value-function-migrates, build 0 — the entry frame; the entry line made a beat (row 1 ruled A, 4 Sep 2026)',
  caption: 'Beat 1 · fiat standing with its two jobs: the fiat note at display scale in the dark-field register, MEDIUM OF EXCHANGE and UNIT OF ACCOUNT beneath it, nothing else on the frame. The entry line is spoken over it — “Fiat, holding two of the three jobs — and holding them extremely well.” The legacy always spoke that line over this state; the ruling makes the advance that lands it Scene 24’s own.',
  flag: 'The entry seam (map §4 seam 1), rendered once. Act IV ends on the fifty scores with the render band above the table and “Don’t trust. Verify.” beneath them; this frame is fiat standing alone. The legacy deck played that boundary as its own crossfade and Batch E plays it the same way — nothing here is a morph, and the spoken turn is already written at both ends. And the fiat render’s box (seam 8): every display-scale call for the note is the 180 × 150 display box, a 48% aspect departure from the render’s near-16:9 frame — carried as Act IV approved it. Both are wiring; neither changes the frame.',
  expect: [['.s4-migration__asset--fiat[data-visible="true"]', 1], ['.s4-migration__asset--fiat .df[data-pending="false"]', 1],
    ['.s4-migration__fiat-functions[data-visible="true"]', 1], ['.s4-migration__asset[data-visible="true"]', 1],
    ['.s4-migration__opening[data-visible="true"]', 0], ['.s4-claim-object[data-visible="true"]', 0], ['.s4-migration__flow[data-visible="true"]', 0]]
}, (st) => mount(st, s417, 0));

cell('s24-b2', {
  scene: 'S24', beat: 2, frame: 'S24-F2', klass: 'PORT', review: 'approved-port',
  source: '4-17-store-of-value-function-migrates, build 1 + ClaimObject',
  caption: 'Beat 2 · the demand to save: The demand to save does not disappear. lands at statement scale, and the first claim appears at the lane’s origin, neutral, beside the fiat note — the protagonist’s Act V state begins here, savings demand looking for a carrier. Spoken: fiat is genuinely excellent at two jobs; what savers do not trust it to do is the third; the desire to save does not go anywhere.',
  expect: [['.s4-migration__opening[data-visible="true"]', 1], ['.s4-migration__claim[data-index="0"] .s4-claim-object[data-visible="true"][data-emphasis="neutral"]', 1],
    ['.s4-claim-object[data-visible="true"]', 1], ['.s4-migration__flow[data-visible="true"]', 0], ['.s4-migration__reveal[data-visible="true"]', 0]]
}, (st) => mount(st, s417, 1));

cell('s24-b3', {
  scene: 'S24', beat: 3, frame: 'S24-F3', klass: 'PORT', review: 'approved-port',
  source: '4-17-store-of-value-function-migrates, build 2 + ComparisonAssetHeader (display box, dark-field) + ClaimObject — the renders stand (row 5 ruled A, 4 Sep 2026)',
  caption: 'Beat 3 · it migrates: IT MIGRATES. in the accent; the flow lane draws from the origin with its three branches rising; gold, real estate and shares land at the display box in the dark-field register at the branches’ ends; the three claims ride the lane to the destinations and take their focus. Spoken: monetary demand for gold, real estate, shares, art, collectibles — anything scarce enough to hold a claim; the diversification concession; the direction set at the edge.',
  expect: [['.s4-migration__reveal[data-visible="true"]', 1], ['.s4-migration__flow[data-visible="true"]', 1], ['.s4-migration__asset[data-visible="true"]', 4],
    ['.s4-migration__asset[data-visible="true"] .df[data-pending="false"]', 4], ['.s4-migration__claim[data-migrated="true"] .s4-claim-object[data-visible="true"][data-emphasis="focus"]', 3],
    ['.s4-migration__final[data-visible="true"]', 0]]
}, (st) => mount(st, s417, 2));

cell('s24-b4', {
  scene: 'S24', beat: 4, frame: 'S24-F4', klass: 'PORT', review: 'approved-port',
  source: '4-17-store-of-value-function-migrates, build 3',
  caption: 'Beat 4 · the final line beneath the lane: When money is not trusted to preserve purchasing power, savings demand moves into other assets. — the migration held above it. Spoken to the turn: that additional demand creates something we have to be able to name — a monetary premium.',
  expect: [['.s4-migration__final[data-visible="true"]', 1], ['.s4-migration__claim[data-migrated="true"] .s4-claim-object[data-visible="true"]', 3], ['.s4-migration__asset[data-visible="true"]', 4]]
}, (st) => mount(st, s417, 3));

// ============================================================ SCENE 25 (4 beats)

cell('s25-b1', {
  scene: 'S25', beat: 1, frame: 'S25-F1', klass: 'PORT', review: 'approved-port',
  source: '4-18-monetary-premium, build 0 — the entry frame; the entry line made a beat (row 1 ruled A, 4 Sep 2026)',
  caption: 'Beat 1 · the equation opens: ASSET VALUE = alone at the top of the frame, the right-hand side still to come. The entry line is spoken over it — “An asset’s value, split into two parts.”',
  expect: [['.s4-premium__equation-term[data-visible="true"]', 1], ['.s4-premium__equation-mark[data-visible="true"]', 1], ['.s4-premium__example[data-visible="true"]', 0], ['.s4-premium__shared-label[data-visible="true"]', 0]]
}, (st) => mount(st, s418, 0));

cell('s25-b2', {
  scene: 'S25', beat: 2, frame: 'S25-F2', klass: 'PORT', review: 'approved-port',
  source: '4-18-monetary-premium, build 1 + ComparisonAssetHeader (display box, dark-field) — the renders stand (row 5 ruled A, 4 Sep 2026)',
  caption: 'Beat 2 · the part that is easy to defend: UNDERLYING UTILITY / PRODUCTIVE VALUE joins the equation, and the three examples land as one accumulating element — real estate, shares, gold at the display box in the dark-field register with their base labels: SHELTER / RENT · PROFITS / CASH FLOWS · ORNAMENTAL / INDUSTRIAL. No premium on them yet.',
  expect: [['.s4-premium__equation-term[data-visible="true"]', 2], ['.s4-premium__example[data-visible="true"]', 3], ['.s4-premium__example[data-visible="true"] .df[data-pending="false"]', 3],
    ['.s4-premium__example[data-premium="true"]', 0], ['.s4-premium__equation-term--premium[data-visible="true"]', 0], ['.s4-premium__shared-label[data-visible="true"]', 0]]
}, (st) => mount(st, s418, 1));

cell('s25-b3', {
  scene: 'S25', beat: 3, frame: 'S25-F3', klass: 'PORT', review: 'approved-port',
  source: '4-18-monetary-premium, build 2 — the premium as a halo (R7.1 §C3)',
  caption: 'Beat 3 · the other part: + MONETARY PREMIUM completes the equation in the accent; the warm halo lights on each of the three marks — the premium as light on the object, not a box around it — with the shared label MONETARY PREMIUM and the supporting line: Savings demand adds value beyond what the asset produces, provides or represents. Spoken with the ledger’s one substitution: the diagnosis “this whole inquiry began from”.',
  expect: [['.s4-premium__equation-term[data-visible="true"]', 3], ['.s4-premium__equation-mark[data-visible="true"]', 2], ['.s4-premium__example[data-visible="true"][data-premium="true"]', 3],
    ['.s4-premium__shared-label[data-visible="true"]', 1], ['.s4-premium__supporting[data-visible="true"]', 1], ['.s4-premium__final[data-visible="true"]', 0]]
}, (st) => mount(st, s418, 2));

cell('s25-b4', {
  scene: 'S25', beat: 4, frame: 'S25-F4', klass: 'PORT', review: 'approved-port',
  source: '4-18-monetary-premium, build 3 — the closing pair alone, everything above it at the quiet step',
  caption: 'Beat 4 · the closing pair: Bitcoin competes for the monetary premium— / not the asset’s entire value. — the qualification in the accent on its own line, the equation and the three examples settled to the quiet step above it. The architecture’s own Scene 25 line, on screen; the on-screen dash carries no spaces (recorded in the package §3, nothing altered). Spoken: two honest qualifications, and the question that opens the next scene.',
  expect: [['.s4-premium__final[data-visible="true"]', 1], ['.s4-premium__equation[data-quiet="true"]', 1], ['.s4-premium__example[data-visible="true"][data-quiet="true"]', 3], ['.s4-premium__shared-label[data-quiet="true"]', 1]]
}, (st) => mount(st, s418, 3));

// ============================================================ SCENE 26 (9 beats)
//
// The four roles, one per advance (F1), the roles' final line (F2) — legacy
// 4-19; then the three coexistence statements with their assets (F3) and the
// coexistence law (F4) — legacy 4-20 builds 1–4, the architecture's merge.

const ROLES = [
  ['REAL ESTATE SHELTERS.', 'the house at the display box, SHELTERS beneath it', 'Real estate shelters people. That is what it is for, and it is very good at it.'],
  ['COMPANIES PRODUCE.', 'shares beside it, PRODUCES beneath', 'Companies produce — make things, employ people, earn profits, sometimes hand some of them back.'],
  ['GOLD HAS LONG CARRIED MONETARY VALUE.', 'gold third, MONETARY COMMODITY beneath', 'Gold has carried monetary value for thousands of years; when the dominant money is not trusted, all three are asked to do a second job.'],
  ['BITCOIN’S UTILITY IS MONETARY.', 'the coin fourth with MONETARY in the accent, MONETARY UTILITY beneath', 'Bitcoin is different: no separate productive, consumptive or aesthetic function; yield taken head-on — the absence of a required yield-producing counterparty is the advantage.']
];

ROLES.forEach(([statement, where, spoken], i) => {
  const n = i + 1;
  cell(`s26-b${n}`, {
    scene: 'S26', beat: n, frame: 'S26-F1', klass: 'PORT', review: 'approved-port',
    source: `4-19-other-assets-do-moneys-job, build ${n} + ComparisonAssetHeader (display box, dark-field)`,
    caption: `Beat ${n} · ${statement} — ${where}; ${n === 1 ? 'the first of four roles, each a statement over its render with its function label, one per advance' : `${n} of the four roles standing`}. Spoken: ${spoken}`,
    expect: [['.s4-roles__role[data-visible="true"]', n], ['.s4-roles__role[data-visible="true"] .df[data-pending="false"]', n], ['.s4-roles__final[data-visible="true"]', 0]]
  }, (st) => mount(st, s419, n));
});

cell('s26-b5', {
  scene: 'S26', beat: 5, frame: 'S26-F2', klass: 'PORT', review: 'approved-port',
  source: '4-19-other-assets-do-moneys-job, build 5',
  caption: 'Beat 5 · the roles’ final line beneath the four: It competes for the monetary premium attached elsewhere. Spoken: it cuts both ways — no floor of non-monetary demand; a monetary asset competing for the premium attached to everything else; the question reframed to how much monetary demand these assets keep absorbing.',
  expect: [['.s4-roles__role[data-visible="true"]', 4], ['.s4-roles__final[data-visible="true"]', 1]]
}, (st) => mount(st, s419, 5));

cell('s26-b6', {
  scene: 'S26', beat: 6, frame: 'S26-F3', klass: 'PORT', review: 'pending-review',
  source: '4-20-bitcoin-does-not-replace-everything, build 1 + ComparisonAssetHeader (display box, dark-field) — the architecture’s merge: 4-19 and 4-20 are one scene',
  caption: 'Beat 6 · the first coexistence statement: It does not need to replace real estate. — the coin and the house standing beneath it at the display box. Spoken: a home still provides shelter; a framework that needed it not to would be a bad framework.',
  flag: 'The merge point inside Scene 26, rendered once. The legacy played 4-19 → 4-20 as its own slide crossfade: the four roles and their final line give way to this statement with two assets beneath it, and 4-20’s build 0 is empty — nothing stands between the two compositions but the advance. Inside one scene that boundary is Batch E’s to time as the beat’s gesture (a crossfade, as the legacy played it); the settled frame does not change. Wiring, flagged.',
  expect: [['.s4-coexistence__statement[data-visible="true"]', 1], ['.s4-coexistence__asset[data-visible="true"]', 2], ['.s4-coexistence__asset--bitcoin[data-visible="true"]', 1],
    ['.s4-coexistence__asset--property[data-visible="true"]', 1], ['.s4-coexistence__asset[data-visible="true"] .df[data-pending="false"]', 2], ['.s4-coexistence__line[data-visible="true"]', 0], ['.s4-coexistence__price[data-visible="true"]', 0]]
}, (st) => mount(st, s420, 1));

cell('s26-b7', {
  scene: 'S26', beat: 7, frame: 'S26-F3', klass: 'PORT', review: 'approved-port',
  source: '4-20-bitcoin-does-not-replace-everything, build 2',
  caption: 'Beat 7 · the second statement: It does not need to replace shares. — shares arrives beside the coin and the house; three assets standing. Spoken: a company still produces goods, earns profits, may pay dividends — real cash flows that do not evaporate because a better savings asset exists.',
  expect: [['.s4-coexistence__statement[data-visible="true"]', 1], ['.s4-coexistence__asset[data-visible="true"]', 3], ['.s4-coexistence__asset--shares[data-visible="true"]', 1], ['.s4-coexistence__final[data-visible="true"]', 0]]
}, (st) => mount(st, s420, 2));

cell('s26-b8', {
  scene: 'S26', beat: 8, frame: 'S26-F3', klass: 'PORT', review: 'approved-port',
  source: '4-20-bitcoin-does-not-replace-everything, build 3',
  caption: 'Beat 8 · the third statement: It does not need to absorb every store of value. — gold and the fiat note complete the five, the note at its legacy half-voice. Spoken: gold can remain a trusted monetary commodity; what Bitcoin competes with is the portion of their value that comes from savers needing somewhere to put purchasing power; what changes over time is understanding, not access.',
  expect: [['.s4-coexistence__statement[data-visible="true"]', 1], ['.s4-coexistence__asset[data-visible="true"]', 5], ['.s4-coexistence__asset[data-visible="true"] .df[data-pending="false"]', 5], ['.s4-coexistence__final[data-visible="true"]', 0]]
}, (st) => mount(st, s420, 3));

cell('s26-b9', {
  scene: 'S26', beat: 9, frame: 'S26-F4', klass: 'PORT', review: 'approved-port',
  source: '4-20-bitcoin-does-not-replace-everything, build 4 — the coexistence law; the scene’s last frame (builds 5–7, the stability contrast, retired by Ruling 5)',
  caption: 'Beat 9 · the coexistence law: Bitcoin competes with their monetary function— / not their reason to exist. — the qualification in the accent, the five assets standing beneath it. The falsifiability passage is spoken over this frame with no advance (row 2 ruled A, 4 Sep 2026): the three things that would send me back to that table with an eraser — supply integrity, the security budget, capture — none of which has happened, all of which are watchable; and “Don’t trust. Verify.” as a spoken mention, the line itself on stage once, at Scene 23’s table.',
  expect: [['.s4-coexistence__final[data-visible="true"]', 1], ['.s4-coexistence__statement[data-visible="true"]', 0], ['.s4-coexistence__asset[data-visible="true"]', 5],
    ['.s4-coexistence__line[data-visible="true"]', 0], ['.s4-coexistence__price[data-visible="true"]', 0]]
}, (st) => mount(st, s420, 4));

// ============================================================ SCENE 27 (3 beats)

cell('s27-b1', {
  scene: 'S27', beat: 1, frame: 'S27-F1', klass: 'PORT', review: 'pending-review',
  source: '4-21-marginal-store-of-value-decision, build 0 + ClaimObject — the entry frame; the entry line made a beat (row 1 ruled A, 4 Sep 2026)',
  caption: 'Beat 1 · one claim at the decision point: the ClaimObject at focus, at the default 116, low on the frame at the decision point — and the question already standing above it at display scale: Where does the next unredeemed claim go? No paths, no candidates yet. The entry line is spoken over it — “One claim, and five places it could go.”',
  flag: 'A legacy fact found at the sheet: the map’s S27-F1 row describes this frame as the claim “at the decision point, nothing else”, and its S27-F2 row lands the question with the paths; legacy 4-21 stands the question from build 0 — the claim and the question are the entry frame, and build 1 adds the five paths and the five candidates. Rendered as the legacy renders it, which is what PORT means. If you want the question to land with the paths at beat 2, that is one word in the source’s state — a ruled change on a proven treatment, and the map’s rows would say so.',
  expect: [['.s4-marginal__claim-object[data-visible="true"][data-emphasis="focus"]', 1], ['.s4-marginal__question', 1], ['.s4-marginal__paths[data-visible="true"]', 0],
    ['.s4-marginal__candidate[data-visible="true"]', 0], ['.s4-marginal__supporting[data-visible="true"]', 0]]
}, (st) => mount(st, s421, 0));

cell('s27-b2', {
  scene: 'S27', beat: 2, frame: 'S27-F2', klass: 'PORT', review: 'approved-port',
  source: '4-21-marginal-store-of-value-decision, build 1 + ComparisonAssetHeader (compact box, dark-field — R7.4 §B: the decision row keeps renders)',
  caption: 'Beat 2 · the five paths and the five candidates: five drawn paths rise from the claim to gold, fiat, bitcoin, real estate and shares in the compact render box across the frame, the question standing above them. Spoken: the entire stock of the world’s wealth does not have to move; look at the decisions being made right now; the asked-calmly line at its relocated home — you’re just asking it calmly, in advance, with time to think. Instead of during the run.',
  expect: [['.s4-marginal__paths[data-visible="true"]', 1], ['.s4-marginal__candidate[data-visible="true"]', 5], ['.s4-marginal__candidate[data-visible="true"] .df[data-pending="false"]', 5],
    ['.s4-marginal__claim-object[data-visible="true"]', 1], ['.s4-marginal__supporting[data-visible="true"]', 0]]
}, (st) => mount(st, s421, 1));

cell('s27-b3', {
  scene: 'S27', beat: 3, frame: 'S27-F3', klass: 'PORT', review: 'approved-port',
  source: '4-21-marginal-store-of-value-decision, build 2',
  caption: 'Beat 3 · the supporting line beneath the decision: Every new unit of savings creates a new carrier decision. Spoken, and never on screen: the monetary competition is decided at the margin (master §3.7, spoken-only, verified) — which means: where does the next unredeemed claim go?',
  expect: [['.s4-marginal__supporting[data-visible="true"]', 1], ['.s4-marginal__candidate[data-visible="true"]', 5], ['.s4-marginal__claim-object[data-visible="true"]', 1]]
}, (st) => mount(st, s421, 2));

// ============================================================ SCENE 28 (3 beats)
//
// Fixed supply reprices at the margin — legacy 4-22's FixedSupplyField, ported
// whole (row 4 ruled A): the stock (F1) with the margin (F2), the demand
// arriving (F3), the repricing (F4). The thirty-five units are UnitGrid's,
// from UnitField.js — the hours field's own grammar.

const FIELD_STANDING = [['.unit-field-grid__unit', 35], ['.unit-field-grid__unit[data-available="true"]', 5], ['.s4-fixed-supply-field__stock-label', 1]];

cell('s28-b1', {
  scene: 'S28', beat: 1, frame: 'S28-F2', klass: 'PORT', review: 'pending-review', rhyme: true,
  source: '4-22-fixed-supply-reprices-at-margin, build 1 + FixedSupplyField + UnitGrid (src/components/UnitField.js — UNIT_GRAMMAR) + ClaimObject at 44',
  caption: 'Beat 1 · the margin — the sliver actually for sale: Demand does not need to absorb everything. over the field — FIXED OUTSTANDING STOCK, thirty-five units in the hours field’s own grammar (seven by five, each unit 84 × 46 on a 102 × 62 pitch), the rightmost column lit as AVAILABLE AT THE MARGIN with its bracket, and the three demand claims waiting at the right at 44, neutral. Spoken: only a sliver of the outstanding stock is on the market; the rest is held by people not selling at today’s price.',
  flag: 'Two things to see, both wiring. First, the stock at rest — 4-22’s build 0, the field standing with no column lit and no claims — has no spoken advance of its own once the boundary from Scene 27 lands on it (map row S28-F1): it is the composition this beat’s gesture starts from, the margin lighting as the words land. Second, the claim’s last journey (map §4 seam 6): Scene 27’s one decision claim at 116 gives way to three demand claims at 44 arriving from the right — the through-line’s continuity across that boundary is Batch E’s to wire, rendered here as the legacy renders each end. The field itself is the rhyme’s other half: the P1 cell beside these three shows the same grammar at eighty thousand.',
  expect: [['.s4-fixed-supply__statement--opening[data-visible="true"]', 1], ['.s4-fixed-supply-field[data-margin-visible="true"]', 1], ...FIELD_STANDING,
    ['.s4-fixed-supply-field__claim[data-visible="true"][data-emphasis="neutral"]', 3], ['.s4-fixed-supply-field[data-demand-arrived="true"]', 0],
    ['.s4-fixed-supply__statement--mechanism[data-visible="true"]', 0], ['.s4-fixed-supply-field__margin-label', 1]]
}, (st) => mount(st, s422, 1));

cell('s28-b2', {
  scene: 'S28', beat: 2, frame: 'S28-F3', klass: 'PORT', review: 'approved-port', rhyme: true,
  source: '4-22-fixed-supply-reprices-at-margin, build 2 + FixedSupplyField + UnitGrid',
  caption: 'Beat 2 · the demand arriving: It only needs to grow against a supply that cannot respond. lands beneath the opening line, which settles to the prior step; the three demand claims travel to the margin and take their focus, bidding against the lit column. Spoken: new buyers bid against the sliver, not the whole stock; here the pressure cannot call forth more supply, because no one has the authority to expand it.',
  expect: [['.s4-fixed-supply__statement--mechanism[data-visible="true"]', 1], ['.s4-fixed-supply__statement--opening[data-visible="true"][data-quiet="true"]', 1],
    ['.s4-fixed-supply-field[data-demand-arrived="true"]', 1], ['.s4-fixed-supply-field__claim[data-visible="true"][data-emphasis="focus"]', 3], ...FIELD_STANDING,
    ['.s4-fixed-supply-field[data-repriced="true"]', 0], ['.s4-fixed-supply__final[data-visible="true"]', 0]]
}, (st) => mount(st, s422, 2));

cell('s28-b3', {
  scene: 'S28', beat: 3, frame: 'S28-F4', klass: 'PORT', review: 'approved-port', rhyme: true,
  source: '4-22-fixed-supply-reprices-at-margin, build 3 + FixedSupplyField + UnitGrid — the repricing sweep (--reprice-order)',
  caption: 'Beat 3 · the repricing: the emphasis sweeps right to left from the margin across the whole stock — every unit relit in the accent, the margin column the brightest — the rule beneath the stock marking its extent, PRICE DISCOVERED HERE in the accent under the margin, and the final line: Marginal flows can reprice the entire stock. Spoken with the two honest qualifications: not a price formula, and symmetric in both directions; Bitcoin does not need to absorb everything — it only needs to win more of the margin.',
  expect: [['.s4-fixed-supply-field[data-repriced="true"]', 1], ['.s4-fixed-supply__final[data-visible="true"]', 1], ['.s4-fixed-supply-field__price-discovery', 1],
    ['.s4-fixed-supply-field__reprice-frame', 1], ...FIELD_STANDING, ['.s4-fixed-supply-field__claim[data-visible="true"][data-emphasis="focus"]', 3]]
}, (st) => mount(st, s422, 3));

// ============================================================ SCENE 29 (2 beats)

cell('s29-b1', {
  scene: 'S29', beat: 1, frame: 'S29-F1', klass: 'PORT', review: 'pending-review',
  source: '4-23-investment-case-from-first-principles, build 1 + KickerLabel — the frozen frame’s kicker (R7.1 A2), the four summary lines as one gesture',
  caption: 'Beat 1 · the case, closing the loop: THE CASE FOR BITCOIN — FROM FIRST PRINCIPLES in the one surviving kicker of the retired header treatment (frozen by design), and the four summary lines landing as one gesture — Money is a claim on value. / A store of value carries that claim through time. / The ten properties let us compare the available carriers. / The key question is which carrier wins the next unit of savings. Spoken: so let’s close the loop we opened an hour ago.',
  flag: 'The full clear (map §4 seam 7), rendered once. Scene 28’s field, its claims and its lines clear completely before the kicker lands — the architecture’s own words — and legacy 4-23’s build 0, the kicker alone on black, is the composition the clear lands on; it has no spoken advance of its own once the boundary from Scene 28 lands on it. Batch E times the clear; the settled frame of this beat does not change. Wiring, flagged. The kicker itself is carried as the frozen frame carries it (map §4 seam 11) — the only such kicker left in the film.',
  expect: [['.s4-investment-case__kicker', 1], ['.s4-investment-case__summary-line[data-visible="true"]', 4], ['.s4-investment-case__conclusion[data-visible="true"]', 0]]
}, (st) => mount(st, s423, 1));

cell('s29-b2', {
  scene: 'S29', beat: 2, frame: 'S29-F2', klass: 'PORT', review: 'approved-port',
  source: '4-23-investment-case-from-first-principles, build 2 — the frozen final frame (master §13, 28 Jul 2026: the case as the final frame)',
  caption: 'Beat 2 · the conclusion, the true final frame of the argument: the summary clears and the case stands alone at the optical center under the kicker — Bitcoin does not need to replace everything. / It only needs to become the preferred place / to store the next unit of value. — the two bold terms in the accent, the accent’s last deployment in the film. The protected line, verified character for character. Spoken with the rules line before “The case is not that the price will behave.” (row 3 ruled A, 4 Sep 2026): Bitcoin does not fix its price. It fixes the rules through which the market discovers its price. Price should be free to move. The monetary rules should be hard to move. That’s the whole case, in eleven words.',
  expect: [['.s4-investment-case__conclusion[data-visible="true"]', 1], ['.s4-investment-case__conclusion strong', 2], ['.s4-investment-case__summary-line[data-visible="true"]', 0], ['.s4-investment-case__kicker', 1]]
}, (st) => mount(st, s423, 2));

// ============================================================ SCENE 30 (2 beats)

cell('s30-b1', {
  scene: 'S30', beat: 1, frame: 'S30-F1', klass: 'ADAPT', review: 'pending-review', closeText: true,
  source: '5-01-thank-you, build 0 — black; the one ruled change: the wayline build (5-01 build 1) is retired with the waypoint device (architecture Ruling 1); the silence its own beat (row 6 ruled A, 4 Sep 2026)',
  caption: 'Beat 1 · silence: black. The advance that leaves the case lands here, and the callback is spoken over it — An hour ago I told you something strange: that you’d spend eighty thousand hours of your life earning something you couldn’t define. Now you can define it. You know where it came from. You know what it must do, and in what order. And you know how to judge anything that tries to be it. Nothing is on the frame; black here is a scripted beat, not a seam (master §3.5).',
  flag: 'The one ADAPT cell of the act, with its one change named: legacy 5-01’s first build brought the method line back with all three waypoints completed and one warmth pulse along it; that device is retired by the structure freeze (Ruling 1), so the beat is the black the legacy always started from, with the sentence that named the road cut from the script and nothing written in its place. This cell mounts 5-01 at build 0 — the legacy’s own black, the wayline never shown — so the ADAPT is a state the legacy already performs, not a drawing. The check asserts the frame is black: no pixel above the floor.',
  expect: [['.s5c__thanks[data-visible="true"]', 0], ['.wayline[data-visible="true"]', 0], ['.wayline__wp', 0]]
}, (st) => mount(st, s501, 0));

cell('s30-b2', {
  scene: 'S30', beat: 2, frame: 'S30-F2', klass: 'PORT', review: 'approved-port', closeText: true,
  source: '5-01-thank-you, build 2 — one line of typography on black, the frame retained exactly',
  caption: 'Beat 2 · Thank you. — one line at the film’s final register, centered on black; no second line, no watermark, no kicker, no chrome, no waypoint. Spoken over it: you won’t be able to stop seeing it; the framework is yours now — not my conclusions, the framework; check every score; none of this is investment advice; one question about any money you’ll ever hold: can the rules be moved beneath you? Thank you. Whether the last two words are spoken or only shown is the presenter’s word pass (map §4 seam 10; the package installs the legacy words). The close names no medium, no sequel, no waypoint — the check reads the frame’s visible text and finds those two words alone.',
  expect: [['.s5c__thanks[data-visible="true"]', 1], ['.wayline[data-visible="true"]', 0], ['.wayline__wp', 0]]
}, (st) => mount(st, s501, 2));

// ---- runtime ---------------------------------------------------------------

export const CELL_IDS = Object.keys(CELLS);

export function buildCell(id) {
  const c = CELLS[id];
  if (!c) throw new Error(`no cell builder for "${id}"`);
  const st = stage();
  c.build(st);
  return id;
}

export function cellMeta() {
  return Object.fromEntries(Object.keys(CELLS).map((id) => {
    const { build, ...meta } = CELLS[id];
    return [id, meta];
  }));
}

export function teardown() {
  cleanup.forEach((fn) => { try { fn(); } catch { /* torn down with the DOM */ } });
  cleanup = [];
  const prev = document.getElementById(STAGE_ID);
  if (prev) prev.remove();
}

export default buildCell;
