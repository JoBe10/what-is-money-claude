import { QuietKicker } from '../../components/QuietKicker.js';
import { TABLE_HEADERS_DARK_FIELD } from '../../components/section-4/ComparisonAssetHeader.js';
import { AssetComparisonTable } from '../../components/section-4/AssetComparisonTable.js';
import {
  COMPARISON_ASSETS,
  COMPARISON_GROUPS,
  COMPARISON_ROWS
} from './_comparison-data.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 2;

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
    // The table's headers are the flagged exception (R7.4 §B): glyphs by
    // default, renders under the toggle, and the register follows the toggle.
    root.dataset.register = TABLE_HEADERS_DARK_FIELD ? 'mixed' : 'line';

    // A2 survivor: the table is a frame that must be named, so it keeps a
    // kicker — but in the Sections 1–3 register (small, tracked, muted, no
    // rule line), not the retired Section 4 header.
    const kicker = QuietKicker('THE COMPARISON');
    kicker.classList.add('s4-comparison__kicker');
    root.appendChild(kicker);

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
