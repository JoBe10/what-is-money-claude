import { ClaimObject } from '../../components/section-4/ClaimObject.js';
import { ComparisonAssetHeader } from '../../components/section-4/ComparisonAssetHeader.js';
import { COMPARISON_ASSETS } from './_comparison-data.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 2;
const CANDIDATE_CENTRES = [300, 630, 960, 1290, 1620];

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

function getAsset(id) {
  const asset = COMPARISON_ASSETS.find((candidate) => candidate.id === id);
  if (!asset) throw new Error(`Unknown comparison asset: ${id}`);
  return asset;
}

function createDecisionPaths() {
  const paths = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  paths.classList.add('s4-marginal__paths');
  paths.setAttribute('viewBox', '0 0 1920 720');
  paths.setAttribute('focusable', 'false');
  paths.setAttribute('aria-hidden', 'true');

  CANDIDATE_CENTRES.forEach((endX) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const controlX = (960 + endX) / 2;
    path.setAttribute('d', `M960 650Q${controlX} 540 ${endX} 458`);
    paths.appendChild(path);
  });
  return paths;
}

export default {
  id: '4-21-marginal-store-of-value-decision',
  section: 'ideal-store',
  number: 43,
  title: 'The Marginal Store-of-Value Decision',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-marginal';
    // Display-scale candidates render on the dark-field register (§9.4.9, R7.4 §B).
    root.dataset.register = 'mixed';

    const question = document.createElement('h1');
    question.className = 's4-marginal__question';
    question.textContent = 'Where does the next unredeemed claim go?';
    root.appendChild(question);

    const paths = createDecisionPaths();
    root.appendChild(paths);

    const candidates = COMPARISON_ASSETS.map((asset, index) => {
      // Compact box, sensory register: five candidates standing on the frame as
      // the choice itself, not five cells in a table (R7.4 §B).
      const view = ComparisonAssetHeader({ asset, compact: true, darkField: true });
      view.classList.add('s4-marginal__candidate');
      view.style.setProperty('--candidate-x', `${CANDIDATE_CENTRES[index]}px`);
      root.appendChild(view);
      return view;
    });

    const decisionClaim = ClaimObject({
      className: 's4-marginal__claim-object',
      ariaLabel: 'The next unredeemed monetary claim'
    });
    const decisionPoint = document.createElement('div');
    decisionPoint.className = 's4-marginal__decision-point';
    decisionPoint.appendChild(decisionClaim.el);
    root.appendChild(decisionPoint);

    const supporting = document.createElement('p');
    supporting.className = 's4-marginal__supporting';
    supporting.textContent = 'Every new unit of savings creates a new carrier decision.';
    root.appendChild(supporting);

    container.appendChild(root);

    this._refs = {
      root,
      paths,
      candidates,
      decisionClaim,
      supporting,
      appliedStep: 0,
      reconstruct: false
    };
    this._applyBuild(0);
  },

  onEnter(ctx) {
    markReconstruct(this._refs, ctx);
  },

  onExit() {
    this._refs?.decisionClaim.destroy();
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

    refs.decisionClaim.applyState({ visible: true, emphasis: 'focus' });
    setVisible(refs.paths, n >= 1);
    refs.candidates.forEach((candidate) => setVisible(candidate, n >= 1));
    setVisible(refs.supporting, n >= 2);
  },

  notes: `One claim, and five places it could go.

[→] Here is the thing that makes this tractable, and it is the opposite of how these conversations usually go. The entire existing stock of the world’s wealth does not have to move. Nothing has to be sold. Look instead at the decisions being made right now: every new unit of savings is one. So is every refinancing, every inheritance, every asset sale, every portfolio rebalance. A maturing bond is another. A business exit is another. And notice what this question actually is. It’s the one every saver eventually asks — you’re just asking it calmly, in advance, with time to think. Instead of during the run.

[→] So the question that matters is not who owns what today. It is which carrier wins a growing share of those decisions at the edge. The monetary competition is decided at the margin. Which means: where does the next unredeemed claim go?`
};
