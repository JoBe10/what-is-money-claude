// 4.20 — coexistence, and then the last objection in the block.
//
// R7 §3.9 (steelman modules): the volatility objection had no home anywhere in
// Section 4 — the deck answered a mechanism question at 4.22 and never answered
// the objection itself. Per the brief’s fallback, the stability module lands
// here, as this slide’s final builds: the coexistence frame clears and the one
// word the objection hides inside is put under the same lens 4.01 used on
// "store of VALUE". Pure typography, no new component. Flagged in the R7 report
// as a placement judgment for presenter review.

import { ComparisonAssetHeader } from '../../components/section-4/ComparisonAssetHeader.js';
import { COMPARISON_ASSETS } from './_comparison-data.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 7;
const COEXISTENCE_END = 4; // the last build of the coexistence argument

const ASSET_STAGES = [
  { id: 'gold', revealAt: 3 },
  { id: 'fiat', revealAt: 3 },
  { id: 'bitcoin', revealAt: 1 },
  { id: 'property', revealAt: 1 },
  { id: 'shares', revealAt: 2 }
];

const STEP_STATEMENTS = [
  'It does not need to replace real estate.',
  'It does not need to replace shares.',
  'It does not need to absorb every store of value.'
];

// R7.4 §E — the stability module rebuilt around one visual argument.
//
// What stood here was a text wall: the word, two headings, two sub-lines and a
// resolution, four builds of typography for an objection that is fundamentally
// about *shape*. The objection is "it moved thirty percent last quarter", and
// the answer is that the price and the rules are two different lines. So the
// slide draws them: one jagged, one flat, one above the other. The contrast is
// the entire visual, and everything the four text builds used to carry — the
// two-question framework, volatility-as-stage, expectation-not-guarantee — is
// preserved word for word in the script, where it was always doing the work.
//
// A hand-authored path rather than data: this is not a chart and must not read
// as one. No axes, no scale, no ticks — a shape that means "restless" over a
// shape that means "fixed".
const PRICE_PATH = 'M0 62 L58 44 L104 96 L150 30 L206 74 L252 18 L300 88 L352 40 '
  + 'L398 104 L452 26 L502 70 L556 12 L604 82 L658 34 L708 92 L760 22 L812 66 '
  + 'L864 8 L912 78 L964 36 L1010 98 L1060 28 L1112 60';
const RULES_PATH = 'M0 20 L1112 20';

function createContrast() {
  const wrap = document.createElement('div');
  wrap.className = 's4-coexistence__contrast';

  const make = (kind, label, path, height) => {
    const row = document.createElement('div');
    row.className = `s4-coexistence__line s4-coexistence__line--${kind}`;
    row.dataset.visible = 'false';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 1112 ${height}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.classList.add('s4-coexistence__plot');
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.setAttribute('d', path);
    line.classList.add('s4-coexistence__stroke');
    svg.appendChild(line);
    row.appendChild(svg);

    const caption = document.createElement('p');
    caption.className = 's4-coexistence__linelabel';
    caption.textContent = label;
    row.appendChild(caption);

    return { row, line };
  };

  const price = make('price', 'THE PRICE', PRICE_PATH, 112);
  const rules = make('rules', 'THE RULES', RULES_PATH, 40);
  wrap.append(price.row, rules.row);

  return { wrap, price, rules };
}

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

function getAsset(id) {
  const asset = COMPARISON_ASSETS.find((candidate) => candidate.id === id);
  if (!asset) throw new Error(`Unknown comparison asset: ${id}`);
  return asset;
}

function createAsset({ id, revealAt }) {
  const asset = getAsset(id);
  const view = ComparisonAssetHeader({ asset });
  view.classList.add('s4-coexistence__asset', `s4-coexistence__asset--${id}`);
  view.dataset.revealAt = String(revealAt);
  view.dataset.visible = 'false';
  return view;
}

// R7.1 §C2: the word and the split are separate builds now, so they are
// separate elements. As shipped this frame put six text blocks on screen at
// once — the word, two headings, two sub-lines and, a beat later, the
// resolution — which is the density this phase exists to remove.
function createBisection() {
  const wrap = document.createElement('div');
  wrap.className = 's4-coexistence__bisection';

  const word = document.createElement('p');
  word.className = 's4-coexistence__bisection-word';
  word.textContent = 'STABILITY';
  wrap.appendChild(word);

  const split = document.createElement('div');
  split.className = 's4-coexistence__bisection-split';
  BISECTION.forEach(([headingCopy, detailCopy]) => {
    const column = document.createElement('div');
    column.className = 's4-coexistence__bisection-column';

    const heading = document.createElement('p');
    heading.className = 's4-coexistence__bisection-heading';
    heading.textContent = headingCopy;

    const detail = document.createElement('p');
    detail.className = 's4-coexistence__bisection-detail';
    detail.textContent = detailCopy;

    column.append(heading, detail);
    split.appendChild(column);
  });
  wrap.appendChild(split);

  return { wrap, word, split };
}

export default {
  id: '4-20-bitcoin-does-not-replace-everything',
  section: 'ideal-store',
  number: 41,
  title: 'Bitcoin Does Not Need to Replace Everything',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-coexistence';
    // Display-scale candidates render on the dark-field register (§9.4.9, R7.4 §B).
    root.dataset.register = 'mixed';

    const statements = STEP_STATEMENTS.map((copy) => {
      const statement = document.createElement('p');
      statement.className = 's4-coexistence__statement';
      statement.textContent = copy;
      root.appendChild(statement);
      return statement;
    });

    const assets = ASSET_STAGES.map((definition) => {
      const asset = createAsset(definition);
      root.appendChild(asset);
      return asset;
    });

    const finalLine = document.createElement('p');
    finalLine.className = 's4-coexistence__final';
    finalLine.append('Bitcoin competes with their monetary function—');
    const qualification = document.createElement('span');
    qualification.textContent = 'not their reason to exist.';
    finalLine.appendChild(qualification);
    root.appendChild(finalLine);

    const contrast = createContrast();
    root.appendChild(contrast.wrap);

    const priceLine = document.createElement('p');
    priceLine.className = 's4-coexistence__price';
    priceLine.append('Bitcoin does not fix its price.');
    const rules = document.createElement('span');
    rules.textContent = 'It fixes the rules through which the market discovers its price.';
    priceLine.appendChild(rules);
    root.appendChild(priceLine);

    container.appendChild(root);

    this._refs = {
      root,
      statements,
      assets,
      finalLine,
      contrast,
      priceLine,
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

    // 0 the frame the objections block left · 1–3 one coexistence statement
    // each, with the assets it names · 4 the coexistence law · 5 the frame
    // clears and the price draws, restless · 6 the rules draw beneath it, flat ·
    // 7 the claim the contrast has already made.
    //
    // One idea per build (§9.4.1): each new element lands alone, and what came
    // before it dims rather than competing with it.
    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    const inCoexistence = n <= COEXISTENCE_END;
    refs.statements.forEach((statement, index) => {
      setVisible(statement, n === index + 1);
    });
    refs.assets.forEach((asset) => {
      setVisible(asset, inCoexistence && n >= Number(asset.dataset.revealAt));
    });
    setVisible(refs.finalLine, n === COEXISTENCE_END);

    setVisible(refs.contrast.price.row, n >= 5);
    setVisible(refs.contrast.rules.row, n >= 6);
    setVisible(refs.priceLine, n >= MAX_STEP);
  },

  // The closing passages below are the deleted falsifiability beat's content,
  // preserved word for word (R7.4 §D.4). They carry no `[→]` of their own: the
  // slide's visual is finished by then, and five advances that change nothing
  // would break both §9.4.1 and the pacing gate. Flagged in the report — if the
  // presenter wants them back on advances, the natural home is a build per
  // condition, which means the beat is a slide again.
  notes: `[→] A home still provides shelter. Nothing about any of this changes that, and a framework that needed it to would be a bad framework.

[→] A company still produces goods, earns profits, and may pay dividends. Those are real cash flows from real activity, and they do not evaporate because a better savings asset exists.

[→] And gold can remain a historically trusted monetary commodity — it has been one for five thousand years, and I am not predicting the end of that. Bitcoin does not need to eliminate any of these functions. What it competes with is the portion of their value that comes from savers needing somewhere to put purchasing power. The narrower question is whether those assets keep carrying the same monetary premium as more savers understand — and act on — the structural advantages of an asset whose primary function is to carry monetary value. And notice what changes over time there: not access. Bitcoin has been accessible for years. What changes is understanding, confidence, liquidity, custody infrastructure, and the willingness to act.

[→] So: Bitcoin competes with their monetary function — not their reason to exist.

[→] Which leaves one objection, and it is the one I hear most: “fine, but the thing you are proposing as a store of value moved thirty percent last quarter.” It is a fair thing to say, and the answer starts by noticing that two completely different questions are hiding inside the word stability. There is the market’s valuation of the claim — demand, liquidity, expectations. That is this line: restless, and it is supposed to be.

[→] And there is the architecture of the claim — supply rules, ownership rules, verification, control. That is this one. Architecture protects the integrity of the claim; the market decides what the claim can buy. And they are not substitutes for one another. A smooth price cannot compensate for an architecture that quietly dilutes you — that is precisely the currency chart from Section 2, a beautifully stable price on a line that went down for fifty years. And sound architecture alone cannot guarantee demand. Both statements are true at once.

[→] So here is the honest claim, and it is narrower than the one people argue against. Bitcoin does not fix its price. It fixes the rules through which the market discovers its price. Today’s volatility is the cost of monetizing a new fixed-supply asset — the stage, not the verdict, exactly as the ladder taught — and deeper markets may calm it. Expectation, not guarantee.

— CLOSING PASSAGES, spoken over this final frame —

I’ve spent this whole section answering objections. Let me do one better, and give you mine — the three things that would send me back to that table with an eraser.

If Bitcoin’s supply integrity ever credibly failed — if the twenty-one million turned out to be negotiable — the entire scarcity column collapses, and with it most of the case.

If the security budget — the economics that pay for the network’s defense — went into sustained decay, the durability and control scores would have to fall with it.

And if the protocol itself were ever captured — its rules rewritten by a single coordinated interest — then it would have become the thing it was built not to be, and this table would need rebuilding from the left column out.

None of these has happened. All of them are watchable — publicly, by anyone, which is itself unusual. And if one ever does happen: don’t wait for my updated scores. That’s what “Don’t trust. Verify.” means when it’s meant.

— Q&A ARSENAL (not spoken in the recording) —

*If asked “your own rail shows every money losing the role — what stops something better than Bitcoin later?”*: History shows two ways to lose the monetary role: beaten, or captured. Beaten requires a categorical improvement on the deciding properties — and beyond absolutely fixed supply and near-zero costs of transport and verification, there is little categorical room left; marginal improvement has never moved a crown (palladium). Captured is how gold actually fell — and capture attacked gold’s custodial layer, not the metal, which is why resistance to control and direct self-custody are scored properties, and why the table scores self-custodied Bitcoin rather than a wrapper: the same vector aimed at Bitcoin runs through custodians and paper claims. Neither answer makes the century certain — which is why track record scores two out of five. *If asked “I’d see failure coming and adjust in time”*: history’s worst store-of-value failures were fast and closed the exits first — bank holidays, capital controls, confiscation orders; and even successful adjustment just means choosing the best carrier later, in a hurry — the same question, asked worse.`
};
