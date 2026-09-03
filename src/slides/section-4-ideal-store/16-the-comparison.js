import { QuietKicker } from '../../components/QuietKicker.js';
import { DarkFieldImage } from '../../components/DarkField.js';
import { AssetComparisonTable } from '../../components/section-4/AssetComparisonTable.js';
import {
  COMPARISON_ASSETS,
  COMPARISON_GROUPS,
  COMPARISON_ROWS
} from './_comparison-data.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 2;

// THE HEADER BAND — the Acts III–IV final ruling 2 (3 September 2026, master
// §13): the five candidate glyphs retire from the table's asset headings, and
// the renders ride as a header band ABOVE the table per the rails law
// (AGENTS.md §6) — one shared box, both axes capped, each render in a box of
// its own aspect scaled to fit inside it, bottom-aligned on one band baseline,
// above the table and never on a drawn line — gold, the fiat note, the coin,
// the house, and shares, with the drawn grammar beneath untouched.
//
// THE BAND'S BOX IS 100, NOT THE RAILS LAW'S 188 — the presenter's fit ruling
// (4 September 2026, master §13): at the 188 box the band did not fit above
// the table with the closing line at its held position unless the score rows
// tightened, and the ruling keeps the scores' proven geometry instead — the
// rows at the legacy 60 px pitch, the band shrunk to roughly 100 px. A ruled
// departure from the rails-law box for this one surface. The band mirrors the table's column template (460 + 5 × 244) so
// each render stands over its own column. The aspects are the register's
// measured frames (src/dark-field.js — the near-16:9 family at 1672 × 941,
// the 4:3 coin at 1448 × 1086, the two square lineup studies at 1254 × 1254).
const BAND = 100;
const BAND_ASPECT = {
  gold: 1672 / 941,
  fiat: 1672 / 941,
  bitcoin: 1448 / 1086,
  property: 1254 / 1254,
  shares: 1254 / 1254
};
const bandBox = (ar) => {
  const h = Math.min(BAND, BAND / ar);
  return [h * ar, h];
};

function createBand(assets) {
  const band = document.createElement('div');
  band.className = 's4-comparison__band';
  band.setAttribute('aria-hidden', 'true');
  // The property column's empty cell first, so the grid's columns line up
  // with the table's colgroup.
  band.appendChild(document.createElement('div'));
  assets.forEach((asset) => {
    const cell = document.createElement('div');
    cell.className = 's4-comparison__band-cell';
    cell.dataset.asset = asset.id;
    const [w, h] = bandBox(BAND_ASPECT[asset.id]);
    const df = DarkFieldImage({ name: asset.id, width: w, height: h, alt: asset.alt });
    // The band is the table's header: it stands with the table at every
    // build, and enters with it.
    df.el.dataset.visible = 'true';
    cell.appendChild(df.el);
    band.appendChild(cell);
  });
  return band;
}

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '4-16-the-comparison',
  section: 'ideal-store',
  number: 37,
  title: 'The Comparison',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-comparison';
    // The header band is dark-field above a line-grammar table — the rails
    // law's own mixed surface (the ruling of 3 Sep 2026); the R7.4 toggle
    // that used to set this is retired with the question it asked.
    root.dataset.register = 'mixed';
    // The room the band needs, as one attribute: the heading row shrinks to
    // its label (the marks are retired) and the table drops beneath the band;
    // the score rows keep the legacy 60 px pitch (the fit ruling, 4 Sep 2026).
    // Removing this attribute restores the no-band layout.
    root.dataset.band = 'true';

    // A2 survivor: the table is a frame that must be named, so it keeps a
    // kicker — but in the Sections 1–3 register (small, tracked, muted, no
    // rule line), not the retired Section 4 header.
    const kicker = QuietKicker('THE COMPARISON');
    kicker.classList.add('s4-comparison__kicker');
    root.appendChild(kicker);

    root.appendChild(createBand(COMPARISON_ASSETS));

    const tableWrap = document.createElement('div');
    tableWrap.className = 's4-comparison__table-wrap';

    const table = AssetComparisonTable({
      assets: COMPARISON_ASSETS,
      groups: COMPARISON_GROUPS,
      rows: COMPARISON_ROWS
    });
    tableWrap.appendChild(table.el);
    root.appendChild(tableWrap);

    // The presenter’s protected-list amendment (R7 §3.5): the line on screen is
    // "Don’t trust. Verify." — the deck’s first of exactly two uses. The
    // specificity that used to sit in the copy now lives in the script, where
    // it can name what is being verified.
    const finalLine = document.createElement('p');
    finalLine.className = 's4-comparison__final';

    const challenge = document.createElement('span');
    challenge.textContent = 'Don’t trust.';

    const verification = document.createElement('strong');
    verification.textContent = 'Verify.';

    finalLine.append(challenge, verification);
    root.appendChild(finalLine);

    container.appendChild(root);

    this._refs = {
      root,
      table,
      finalLine,
      appliedStep: 0,
      reconstruct: false
    };
    this._applyBuild(0);
  },

  onEnter(ctx) {
    markReconstruct(this._refs, ctx);
  },

  onExit() {
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    // 0 the table drawn and empty · 1 all fifty scores · 2 the line.
    //
    // R7.4 §D.3, presenter ruling: the reveal was split 5 + 5 along the two
    // groups the properties were derived in. It is one advance now. The split
    // was giving the walk-through somewhere to breathe, and what it actually
    // did was ask the viewer to read the table twice. All fifty scores are
    // unchanged; only when they arrive is.
    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    refs.table.setRowsRevealed(n <= 0 ? 0 : refs.table.rowCount);
    setVisible(refs.finalLine, n >= MAX_STEP);
  },

  notes: `[→] Before a single dot: this is not an attempt at a mathematically perfect answer, and every score depends on the assumptions we just set — the form in which each asset is held, transferred and verified. The point is not the number. The point is to make each structural trade-off visible. So, the first five — supply, and movement. Bitcoin scores five on no supply inflation, because no person and no authority can unilaterally create additional valid units and dilute the claim in the ones already held. Fiat scores one, and I want to be fair about why: elasticity is a *feature* of that system, deliberately built in. It buys flexibility. It just means the holder does not control the rules. Gold takes four — mining adds a little, every year, and always has. Divisibility, liquidity, portability: fiat and Bitcoin do well; gold is heavy, and expensive to store, secure and move; real estate is a building — you cannot send a third of it to Singapore. Shares get three on divisibility because fractional access is not universal and may not reproduce the full legal and voting rights of whole shares. And look at carrying costs, because this is one I score against Bitcoin: four, not five. Self-custody is not free. Secure hardware, redundant backups, inheritance planning, ongoing security discipline — real, recurring costs. Far smaller than a vault’s. Not zero. Pretending otherwise is exactly the idealization this table exists to avoid. And now the second five, where the real disagreements live. Resistance to control: Bitcoin five — and that score rests entirely on the holding we defined one slide ago, native BTC in self-custody. That assumption is doing real work. Self-custody removes the custodian; it does not remove custodial risk, it transfers it to you. Hand the same coins to a third party and it is a different score. Durability: gold five, obviously — the atom does not care about institutions. Bitcoin also five, and that one deserves a defense, because the hundred-year test was deliberately skeptical about institutions surviving. The distinction is what kind of thing has to survive. Gold’s durability is physical. Bitcoin’s is informational and social — the protocol persists the way mathematics or a language does. As long as the source code and the ledger survive anywhere and people have reason to run them, it can exist. A globally distributed network with strong economic incentives for its own continuation is a different class of dependency from any single institution, government or company. It is still a judgment, like every score here, and I would rather you challenged it than accepted it. Verifiability: five, because supply and ownership can be checked by anyone. Fungibility: four, not five — transaction histories are visible and intermediaries can and do treat units differently; shares get four for a related reason, since shares of the same company and class are interchangeable while different companies and share classes are not. Track record: two out of five, and I am not going to dress that up. Seventeen years against a hundred-year question is thin evidence, and gold’s five is earned. Real estate scores poorly on several of these, which does not make it a bad asset — it makes it a building, not money. And listed shares can be extraordinarily liquid while still depending on issuers, brokers, custodians, exchanges, regulators and legal systems. Notice what is missing: there is no total. There cannot be, because the properties do not carry equal weight, and one severe weakness may matter more than several moderate strengths.

[→] Bitcoiners will recognize the phrase — and here’s what it means tonight, concretely: these fifty scores are my judgments, as of 2026. Every one of them is an invitation. Check each score against your own knowledge, and when we disagree, that disagreement is the framework doing its job. That is why there is a framework and not a conclusion. One caveat before anyone turns this into an investment thesis: this table compares architecture, not valuation. A strong carrier can be expensive; a weak one can be cheap. What the table tells you is which assets are structurally best positioned to compete for monetary demand. So — where does that monetary demand actually go right now?`
};
