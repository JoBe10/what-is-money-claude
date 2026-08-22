import { ComparisonAssetHeader } from '../../components/section-4/ComparisonAssetHeader.js';
import {
  COMPARISON_ASSETS,
  COMPARISON_GROUPS
} from './_comparison-data.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 4;

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '4-15-framework-to-comparison',
  section: 'ideal-store',
  number: 36,
  title: 'From Framework to Comparison',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-candidates';
    // Display-scale candidates render on the dark-field register (§9.4.9, R7.4 §B).
    root.dataset.register = 'mixed';

    const question = document.createElement('h1');
    question.className = 's4-candidates__question';
    question.textContent = 'How well can each asset carry purchasing power through time?';
    root.appendChild(question);

    const stage = document.createElement('div');
    stage.className = 's4-candidates__stage';

    const groups = COMPARISON_GROUPS.map((group) => {
      const label = document.createElement('div');
      label.className = `s4-candidates__group s4-candidates__group--${group.id}`;
      label.dataset.group = group.id;
      label.textContent = group.label;
      stage.appendChild(label);
      return label;
    });

    const divider = document.createElement('div');
    divider.className = 's4-candidates__divider';
    divider.setAttribute('aria-hidden', 'true');
    stage.appendChild(divider);

    const assets = COMPARISON_ASSETS.map((asset) => {
      const assetView = ComparisonAssetHeader({ asset });
      assetView.classList.add('s4-candidates__asset');
      assetView.dataset.group = asset.group;
      stage.appendChild(assetView);
      return assetView;
    });

    root.appendChild(stage);

    container.appendChild(root);

    this._refs = {
      root,
      stage,
      groups,
      divider,
      assets,
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

    // 0 the question · 1 the monetary candidates and their holding assumptions ·
    // 2 the productive ones · 3 the five settle into one candidate set — the
    // beat that answers why these five, and why no other digital candidate ·
    // 4 the question recedes and the candidates hold the frame alone.
    //
    // Build 4 carried "The framework is explicit. The scores are judgments."
    // until the presenter's R7.4 ruling took it off screen — the point survives
    // in the spoken layer and lands again at the table. Rather than leave an
    // advance that changes nothing, the build now recedes the question it has
    // just finished answering (§9.4 rule 10's dimmed-prior step), so the last
    // frame before the table is the five candidates and nothing else.
    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    refs.stage.dataset.settled = String(n >= 3);

    refs.groups.forEach((group) => {
      const visible = group.dataset.group === 'monetary' ? n >= 1 : n >= 2;
      setVisible(group, visible);
    });

    refs.assets.forEach((asset) => {
      const visible = asset.dataset.group === 'monetary' ? n >= 1 : n >= 2;
      setVisible(asset, visible);
    });

    setVisible(refs.divider, n >= 2);
    refs.root.dataset.answered = String(n >= MAX_STEP);
  },

  notes: `[→] So let’s point them at the three assets people actually use as money. Gold, fiat, Bitcoin — principally monetary assets. And before a single score appears I have to tell you exactly what I mean by each, because a score without a holding assumption is a score you cannot check. Gold means physical investment-grade bullion, held directly or through secure bullion custody, with no tokenized wrapper. Fiat means a major developed-market currency in ordinary contemporary forms — bank deposits and cash, normal access through regulated financial infrastructure; I am not treating an unusual capital-control edge case as the default, and I am not claiming deposits and physical cash are structurally identical. And Bitcoin means native BTC held in self-custody on the Bitcoin network, with valid private-key control and no custodial or synthetic wrapper. Hold on to that last one — it does real work later.

[→] And two productive assets, because this is where most of the world’s savings actually sit. Real estate means direct, unlevered title to real property — no REIT, no tokenized wrapper, and with the ordinary legal and maintenance obligations that come with owning a building. Shares means a diversified portfolio of listed ordinary shares held through standard brokerage and custody infrastructure — not private-company shares; I am not assuming fractional access is universal, and the voting and economic rights stay with legally recognized shares and share classes. These two are not the same kind of instrument as the first three. Their value can come from rents, from profits, from productive activity. But people use all five to carry purchasing power through time, which is the only job we are scoring.

[→] Why these five? Because this is where the world’s savings actually sit — cash and bonds, gold, real estate, shares — plus the one new entrant that credibly claims the foundation role on its properties. And one more question I should answer before you ask it: why is Bitcoin the only digital candidate? The palladium logic, applied internally. At the base layer, the deciding properties are a credibly fixed supply, no issuer, and resistance to control — and a coin with a foundation, a management team, or a changeable supply schedule fails the *properties*, before the network bar is even raised. And that same logic answers tomorrow’s version of the question — why not the *next* one, in 2080? Because beyond a fixed supply and near-zero costs of transport and verification, there is very little categorical room left to stand in. Marginally better has never moved a crown — and at the frontier, categorically better may have nowhere left to be. Structure, not prophecy: the century stays a question, and the table will say so.

[→] One last thing before we score. The framework makes the trade-offs explicit; the scores stay judgments, and reasonable people can disagree with them. That is not a disclaimer. It is the point of doing it this way.`
};
