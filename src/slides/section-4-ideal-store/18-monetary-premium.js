import { ComparisonAssetHeader } from '../../components/section-4/ComparisonAssetHeader.js';
import { COMPARISON_ASSETS } from './_comparison-data.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 3;

const EXAMPLES = [
  { id: 'property', baseLabel: 'SHELTER / RENT' },
  { id: 'shares', baseLabel: 'PROFITS / CASH FLOWS' },
  { id: 'gold', baseLabel: 'ORNAMENTAL / INDUSTRIAL' }
];

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

function getAsset(id) {
  const asset = COMPARISON_ASSETS.find((candidate) => candidate.id === id);
  if (!asset) throw new Error(`Unknown comparison asset: ${id}`);
  return asset;
}

// R7.1 §C3: no boxed tile. The premium was drawn as a bordered octagon around
// each asset — a filled-panel outline, the chrome §9.4.3 forbids. It is now a
// warm halo on the mark itself, which says the same thing in the deck's own
// language: the premium is value added *on top of* the asset, not a container
// drawn around it.
function createExample({ id, baseLabel }, index) {
  const asset = getAsset(id);
  const example = document.createElement('div');
  example.className = `s4-premium__example s4-premium__example--${id}`;
  example.dataset.visible = 'false';
  example.style.setProperty('--example-index', String(index));

  const view = ComparisonAssetHeader({ asset });
  view.classList.add('s4-premium__asset');
  example.appendChild(view);

  const label = document.createElement('p');
  label.className = 's4-premium__base-label';
  label.textContent = baseLabel;
  example.appendChild(label);

  return { example };
}

export default {
  id: '4-18-monetary-premium',
  section: 'ideal-store',
  number: 39,
  title: 'The Monetary Premium',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-premium';
    // Display-scale candidates render on the dark-field register (§9.4.9, R7.4 §B).
    root.dataset.register = 'mixed';

    // §C3: the equation assembles term by term, and the terms land on the
    // advances the script already gives them — "the part that is easy to
    // defend" is the utility term, "the other part" is the premium.
    const equation = document.createElement('div');
    equation.className = 's4-premium__equation';
    equation.setAttribute('aria-label', 'Asset value equals underlying utility or productive value plus monetary premium');

    const mkTerm = (html, className = '') => {
      const el = document.createElement('span');
      el.className = `s4-premium__equation-term ${className}`.trim();
      el.innerHTML = html;
      equation.appendChild(el);
      return el;
    };
    const mkMark = (text) => {
      const el = document.createElement('span');
      el.className = 's4-premium__equation-mark';
      el.textContent = text;
      equation.appendChild(el);
      return el;
    };

    const termValue = mkTerm('ASSET VALUE');
    const markEquals = mkMark('=');
    const termUtility = mkTerm('UNDERLYING UTILITY<br />/ PRODUCTIVE VALUE');
    const markPlus = mkMark('+');
    const termPremium = mkTerm('MONETARY PREMIUM', 's4-premium__equation-term--premium');
    root.appendChild(equation);

    const examples = EXAMPLES.map((definition, index) => {
      const created = createExample(definition, index);
      root.appendChild(created.example);
      return created;
    });

    const premiumLabel = document.createElement('p');
    premiumLabel.className = 's4-premium__shared-label';
    premiumLabel.textContent = 'MONETARY PREMIUM';
    root.appendChild(premiumLabel);

    const supporting = document.createElement('p');
    supporting.className = 's4-premium__supporting';
    supporting.textContent = 'Savings demand adds value beyond what the asset produces, provides or represents.';
    root.appendChild(supporting);

    const finalLine = document.createElement('p');
    finalLine.className = 's4-premium__final';
    finalLine.append('Bitcoin competes for the monetary premium—');
    const finalQualification = document.createElement('span');
    finalQualification.textContent = "not the asset’s entire value.";
    finalLine.appendChild(finalQualification);
    root.appendChild(finalLine);

    container.appendChild(root);

    this._refs = {
      root,
      equation,
      terms: { termValue, markEquals, termUtility, markPlus, termPremium },
      examples,
      premiumLabel,
      supporting,
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

    // 0 the equation opens — ASSET VALUE = · 1 the part that is easy to
    // defend, with the three assets that have it · 2 the other part, and the
    // premium as a halo on each mark · 3 the closing pair, alone.
    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    const { termValue, markEquals, termUtility, markPlus, termPremium } = refs.terms;
    setVisible(termValue, true);
    setVisible(markEquals, true);
    setVisible(termUtility, n >= 1);
    setVisible(markPlus, n >= 2);
    setVisible(termPremium, n >= 2);

    // The three assets are one spoken sentence naming three things, so they are
    // one accumulating element (§9.4.1) sequenced inside a single gesture —
    // the same ruling as 4.03's capabilities.
    refs.examples.forEach(({ example }) => {
      setVisible(example, n >= 1);
      example.dataset.premium = String(n >= 2);
    });

    setVisible(refs.premiumLabel, n >= 2);
    setVisible(refs.supporting, n >= 2);

    // §C3: the closing pair lands alone, everything above it dimmed.
    refs.equation.dataset.quiet = String(n >= 3);
    refs.examples.forEach(({ example }) => {
      example.dataset.quiet = String(n >= 3);
    });
    refs.premiumLabel.dataset.quiet = String(n >= 3);
    refs.supporting.dataset.quiet = String(n >= 3);
    setVisible(refs.finalLine, n >= 3);
  },

  notes: `An asset’s value, split into two parts.

[→] Start with the part that is easy to defend. Real estate has value because it provides shelter and rental services. Shares have value because businesses produce goods, earn profits, and may distribute cash flows. Gold has ornamental and limited industrial uses — although with gold, a large part of its historical value is already monetary, which is exactly why it sits in this comparison at all.

[→] And then there is the other part. When savers also use these things to preserve purchasing power, that demand adds something on top: a monetary premium. Because people do not buy every asset only for what it produces. They also buy it because they need somewhere to *put* the claim. And here is the distinction the whole objections block rests on. Saving preserves a general monetary claim; investing deploys it into a specific arrangement in pursuit of a return. Those are different acts. Under depreciating money they have been quietly merged — investing has become the new saving — which is precisely the diagnosis this whole section began from. If money itself reliably preserved purchasing power, other assets would likely be valued more for their underlying utility and cash flows, and less for their role as savings vehicles.

[→] Two honest qualifications. We cannot observe monetary premium directly, and we certainly cannot measure it precisely — it is a conceptual distinction, not a line item. But it is an essential one, because it is what Bitcoin is actually competing for. Not the entire value of a house. Not the entire value of a business. The monetary demand embedded inside those markets. So what happens when something whose *only* utility is monetary walks into a market where other assets have been doing money’s job for decades?`
};
