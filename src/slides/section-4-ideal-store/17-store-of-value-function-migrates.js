import { ClaimObject } from '../../components/section-4/ClaimObject.js';
import { ComparisonAssetHeader } from '../../components/section-4/ComparisonAssetHeader.js';
import { COMPARISON_ASSETS } from './_comparison-data.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 3;
const FLOW_LEFT = 390;
// Where the claim starts, and — since R7.4 §F.3 — where its disc's centre
// starts, which was the whole problem. The wrapper used to be a 90×36 box, so
// `offset-path` rode its middle while the disc inside it sat somewhere else,
// and every disc landed beside the connector it was supposed to stand on. The
// wrapper is a zero-size point now: the path moves the point, the disc is
// centred on the point, and the only number either of them needs is this one.
const CLAIM_ORIGIN_CENTRE = 450;
const DESTINATIONS = [
  { id: 'gold', centreX: 1110 },
  { id: 'property', centreX: 1380 },
  { id: 'shares', centreX: 1650 }
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

function createAsset(id, className) {
  const asset = getAsset(id);
  const view = ComparisonAssetHeader({ asset });
  view.classList.add('s4-migration__asset', className);
  view.dataset.visible = 'false';
  return view;
}

export default {
  id: '4-17-store-of-value-function-migrates',
  section: 'ideal-store',
  number: 38,
  title: 'When the Store-of-Value Function Migrates',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-migration';
    // Display-scale candidates render on the dark-field register (§9.4.9, R7.4 §B).
    root.dataset.register = 'mixed';

    const opening = document.createElement('p');
    opening.className = 's4-migration__opening';
    opening.textContent = 'The demand to save does not disappear.';
    root.appendChild(opening);

    const migrationLine = document.createElement('p');
    migrationLine.className = 's4-migration__reveal';
    migrationLine.textContent = 'It migrates.';
    root.appendChild(migrationLine);

    const fiat = createAsset('fiat', 's4-migration__asset--fiat');
    root.appendChild(fiat);

    const fiatFunctions = document.createElement('div');
    fiatFunctions.className = 's4-migration__fiat-functions';
    fiatFunctions.innerHTML = `
      <span>MEDIUM OF EXCHANGE</span>
      <span>UNIT OF ACCOUNT</span>
    `;
    root.appendChild(fiatFunctions);

    const flow = document.createElement('div');
    flow.className = 's4-migration__flow';
    flow.setAttribute('aria-hidden', 'true');
    const branchPaths = DESTINATIONS.map(({ centreX }) => (
      `<path class="s4-migration__flow-branch" d="M${centreX - FLOW_LEFT} 152V40" />`
    )).join('');
    const laneEnd = DESTINATIONS.at(-1).centreX - FLOW_LEFT;
    flow.innerHTML = `
      <svg viewBox="0 0 1320 190" focusable="false">
        <path class="s4-migration__flow-lane s4-migration__flow-lane--base" d="M28 152H${laneEnd}" />
        <path class="s4-migration__flow-lane s4-migration__flow-lane--active" d="M28 152H${laneEnd}" />
        ${branchPaths}
      </svg>
    `;
    root.appendChild(flow);

    const demandClaims = DESTINATIONS.map(({ centreX }, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 's4-migration__claim';
      wrapper.dataset.index = String(index);
      wrapper.style.offsetPath = `path("M 0 0 H ${centreX - CLAIM_ORIGIN_CENTRE} V -110")`;

      const claim = ClaimObject({
        className: 's4-migration__claim-object',
        ariaLabel: 'Savings demand seeking a long-term carrier'
      });
      wrapper.appendChild(claim.el);
      root.appendChild(wrapper);
      return { wrapper, claim };
    });

    const recipients = DESTINATIONS.map(({ id, centreX }) => {
      const asset = createAsset(id, `s4-migration__asset--${id}`);
      asset.style.setProperty('--destination-centre-x', `${centreX}px`);
      root.appendChild(asset);
      return asset;
    });

    const finalLine = document.createElement('p');
    finalLine.className = 's4-migration__final';
    finalLine.textContent = 'When money is not trusted to preserve purchasing power, savings demand moves into other assets.';
    root.appendChild(finalLine);

    container.appendChild(root);

    this._refs = {
      root,
      opening,
      migrationLine,
      fiat,
      fiatFunctions,
      flow,
      demandClaims,
      recipients,
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
    this._refs?.demandClaims.forEach(({ claim }) => claim.destroy());
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    setVisible(refs.fiat, true);
    setVisible(refs.fiatFunctions, true);
    setVisible(refs.opening, n >= 1);
    setVisible(refs.migrationLine, n >= 2);
    setVisible(refs.flow, n >= 2);
    refs.recipients.forEach((asset) => setVisible(asset, n >= 2));
    refs.demandClaims.forEach(({ wrapper, claim }, index) => {
      const visible = n >= 2 || (n >= 1 && index === 0);
      wrapper.dataset.migrated = String(n >= 2);
      claim.applyState({
        visible,
        emphasis: n >= 2 ? 'focus' : 'neutral'
      });
    });
    setVisible(refs.finalLine, n >= 3);
  },

  notes: `Fiat, holding two of the three jobs — and holding them extremely well.

[→] Because it is genuinely excellent as a medium of exchange and as a unit of account. That is not a grudging concession; it is the most universally accepted payment medium in history. What a great many savers do not trust it to do is the third job — hold value over long periods. And here is the thing people miss: when a money stops doing that job, the *desire* to do it does not go anywhere. The demand to save does not disappear.

[→] It migrates. It comes out as monetary demand for gold, for real estate, for shares, for art, for collectibles — for anything scarce enough to hold a claim. Which means those assets are quietly asked to do two jobs at once: their own, and money’s. And to be precise: migration doesn’t mean everyone’s savings march to one carrier on one day. During transitions, savings diversify — which is exactly what the world looks like right now. The margin mechanism you’re about to see works either way: wholesale or fractional, the direction is set at the edge.

[→] So: when money is not trusted to preserve purchasing power, savings demand moves into other assets. And that additional demand creates something we have to be able to name, because it is not the same thing as what the asset actually does. It creates a monetary premium.`
};
