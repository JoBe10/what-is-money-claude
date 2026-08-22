import { FixedSupplyField } from '../../components/section-4/FixedSupplyField.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 3;

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '4-22-fixed-supply-reprices-at-margin',
  section: 'ideal-store',
  number: 44,
  title: 'Fixed Supply Reprices at the Margin',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-fixed-supply';

    const opening = document.createElement('p');
    opening.className = 's4-fixed-supply__statement s4-fixed-supply__statement--opening';
    opening.textContent = 'Demand does not need to absorb everything.';
    root.appendChild(opening);

    const mechanism = document.createElement('p');
    mechanism.className = 's4-fixed-supply__statement s4-fixed-supply__statement--mechanism';
    mechanism.textContent = 'It only needs to grow against a supply that cannot respond.';
    root.appendChild(mechanism);

    const stage = document.createElement('div');
    stage.className = 's4-fixed-supply__stage';

    const field = FixedSupplyField();
    stage.appendChild(field.el);
    root.appendChild(stage);

    const finalLine = document.createElement('p');
    finalLine.className = 's4-fixed-supply__final';
    finalLine.textContent = 'Marginal flows can reprice the entire stock.';
    root.appendChild(finalLine);

    container.appendChild(root);

    this._refs = {
      root,
      opening,
      mechanism,
      field,
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
    this._refs?.field.destroy();
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    // 0 the fixed stock at rest · 1 the margin — the sliver actually for sale ·
    // 2 the demand arriving at it · 3 the repricing of the whole stock. The
    // margin’s appearance and demand’s arrival used to share one build, which
    // put the mechanism’s two halves under a single spoken beat.
    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    refs.opening.dataset.quiet = String(n >= 2);
    refs.mechanism.dataset.quiet = String(n >= 3);
    setVisible(refs.opening, n >= 1);
    setVisible(refs.mechanism, n >= 2);
    setVisible(refs.finalLine, n >= 3);
    refs.field.applyState({
      marginVisible: n >= 1,
      demandArrived: n >= 2,
      repriced: n >= 3
    });
  },

  notes: `[→] Demand does not have to absorb every existing bitcoin. That is the version of the argument people imagine and then dismiss, and they are right to dismiss it. Look at what is actually for sale. At any moment only a sliver of the outstanding stock is on the market — the rest is held by people who are not selling at today’s price.

[→] So new buyers are not bidding against the whole stock. They are bidding against that sliver, and against existing holders’ willingness to part with it. In most markets that pressure eventually calls forth more supply: a higher price makes it worth producing more, issuing more, digging more. Here it does not. Additional demand meets a supply that cannot expand, because no one has the authority to expand it.

[→] And the price discovered in that narrow band gets applied to the entire outstanding stock. Now, two honest qualifications, because this is where the argument usually gets oversold. It is not a price formula — liquidity, expectations, leverage and holder behavior all still matter, and none of them are in this picture. And the mechanism is symmetric: the same microstructure that lets marginal inflows reprice the stock upward amplifies the falls when marginal flows reverse. Fixed supply explains sensitivity — in both directions. What it does explain is why a growing share of marginal savings can have an effect out of all proportion to its size. Bitcoin does not need to absorb everything. It only needs to win more of the margin.`
};
