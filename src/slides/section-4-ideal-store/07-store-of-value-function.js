import { ClaimObject } from '../../components/section-4/ClaimObject.js';
import { CarrierShell } from '../../components/section-4/CarrierShell.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 5;

function createTimePath() {
  const path = document.createElement('div');
  path.className = 's4-store-function__time';
  path.innerHTML = `
    <span class="s4-store-function__time-label s4-store-function__time-label--now">NOW</span>
    <svg viewBox="0 0 1120 72" focusable="false" aria-hidden="true">
      <path d="M76 36H1040" />
      <path d="M1018 22L1042 36L1018 50" />
    </svg>
    <span class="s4-store-function__time-label s4-store-function__time-label--later">LATER</span>
  `;
  return path;
}

function createMeasure(className, title, explanation) {
  const measure = document.createElement('div');
  measure.className = `s4-store-function__measure ${className}`;

  const heading = document.createElement('strong');
  heading.textContent = title;

  const detail = document.createElement('span');
  detail.textContent = explanation;

  measure.append(heading, detail);
  return measure;
}

function createDefinition() {
  const definition = document.createElement('div');
  definition.className = 's4-store-function__definition';

  const line1 = document.createElement('span');
  line1.textContent = 'A store of value is a monetary carrier that preserves';

  const line2 = document.createElement('span');
  line2.append('the ');
  const purchasingPower = document.createElement('strong');
  purchasingPower.textContent = 'purchasing power';
  line2.append(purchasingPower, ' of an unredeemed claim');

  const line3 = document.createElement('span');
  line3.append('and keeps that claim ');
  const redeemable = document.createElement('strong');
  redeemable.textContent = 'redeemable';
  line3.append(redeemable, ' through time.');

  definition.append(line1, line2, line3);
  return definition;
}

export default {
  id: '4-07-store-of-value-function',
  section: 'ideal-store',
  number: 28,
  title: 'The Store-of-Value Function',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-store-function';

    const question = document.createElement('div');
    question.className = 's4-store-function__question';
    question.textContent = 'What must the carrier actually preserve?';
    root.appendChild(question);

    const scene = document.createElement('div');
    scene.className = 's4-store-function__scene';

    const shell = CarrierShell({ className: 's4-store-function__shell' });
    scene.appendChild(shell.el);

    const claimStage = document.createElement('div');
    claimStage.className = 's4-store-function__claim-stage';
    const claim = ClaimObject({ className: 's4-store-function__claim' });
    claimStage.appendChild(claim.el);
    scene.appendChild(claimStage);
    root.appendChild(scene);

    const timePath = createTimePath();
    root.appendChild(timePath);

    const purchasingPower = createMeasure(
      's4-store-function__measure--purchasing-power',
      'PURCHASING POWER',
      'The claim can still command real value later.'
    );
    root.appendChild(purchasingPower);

    const redeemability = createMeasure(
      's4-store-function__measure--redeemability',
      'REDEEMABILITY',
      'The future holder can still exercise it.'
    );
    root.appendChild(redeemability);

    const definition = createDefinition();
    root.appendChild(definition);

    container.appendChild(root);

    this._refs = {
      root,
      question,
      scene,
      shell,
      claim,
      timePath,
      purchasingPower,
      redeemability,
      definition,
      appliedStep: 0,
      reconstruct: false
    };
    this._applyBuild(0);
  },

  onEnter(ctx) {
    markReconstruct(this._refs, ctx);
  },

  onExit() {
    this._refs?.claim.destroy();
    this._refs?.shell.destroy();
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

    refs.scene.dataset.position = n >= 2 ? 'later' : 'now';
    refs.question.dataset.visible = String(n >= 1);
    refs.question.dataset.quiet = String(n >= 5);
    refs.timePath.dataset.visible = String(n >= 2);
    refs.timePath.dataset.quiet = String(n >= 5);
    refs.purchasingPower.dataset.visible = String(n >= 3);
    refs.purchasingPower.dataset.quiet = String(n >= 5);
    refs.redeemability.dataset.visible = String(n >= 4);
    refs.redeemability.dataset.quiet = String(n >= 5);
    refs.claim.applyState({
      visible: true,
      emphasis: n >= 3 ? 'focus' : 'neutral'
    });
    refs.shell.applyState({
      visible: true,
      focus: n >= 4 ? 'future' : 'none'
    });
    refs.definition.dataset.visible = String(n >= 5);
  },

  notes: `[→] So with the claim and the carrier finally apart, I can ask the question that actually matters, and ask it precisely. What must the carrier preserve?

[→] Because a carrier does not succeed just by surviving. A stone survives a century. It carries nothing. What has to survive is the claim, and it has to cross time — from now, to later.

[→] Two things have to arrive. The first is purchasing power: the person holding it later must still be able to command real value with it. And let me qualify that immediately, because it is easy to overclaim. This does not mean freezing every relative price, or guaranteeing the same basket of goods forever — preferences change, productivity changes, scarcity changes. It means the carrier itself should preserve the claim as faithfully as it can, rather than quietly eroding it.

[→] The second is redeemability. The future holder has to still be able to reach it, verify it, move it, and finally exercise it. A claim you cannot exercise is not a store of value. It is a souvenir.

[→] So here is the definition we will use for the rest of the evening: a store of value is a monetary carrier that preserves the purchasing power of an unredeemed claim, and keeps that claim redeemable through time. Now — the only way I know to test a definition like that is to stop being polite about it, and stretch it until something breaks.`
};
