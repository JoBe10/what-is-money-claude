import { CarrierStressStage } from '../../components/section-4/CarrierStressStage.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 2;

function createGoverningQuestion() {
  const question = document.createElement('div');
  question.className = 's4-inversion__governing';

  const line1 = document.createElement('span');
  line1.textContent = 'What properties give this claim the best chance';

  const line2 = document.createElement('span');
  line2.append('of reaching 2126 with its ');
  const emphasis = document.createElement('strong');
  emphasis.textContent = 'purchasing power intact';
  line2.append(emphasis, '?');

  question.append(line1, line2);
  return question;
}

function createFraming(className, eyebrowCopy, questionCopy) {
  const framing = document.createElement('div');
  framing.className = `s4-inversion__framing ${className}`;

  const eyebrow = document.createElement('span');
  eyebrow.textContent = eyebrowCopy;

  const question = document.createElement('strong');
  question.textContent = questionCopy;

  framing.append(eyebrow, question);
  return framing;
}

export default {
  id: '4-10-invert-the-question',
  section: 'ideal-store',
  number: 31,
  title: 'Invert the Question',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-inversion';

    const governing = createGoverningQuestion();
    root.appendChild(governing);

    const direct = createFraming(
      's4-inversion__framing--direct',
      "DON’T BEGIN BY ASKING:",
      'What makes a good carrier?'
    );
    const inverted = createFraming(
      's4-inversion__framing--inverted',
      'ASK INSTEAD:',
      'How could the carrier fail?'
    );
    root.append(direct, inverted);

    const stage = CarrierStressStage({ className: 's4-inversion__stage' });
    root.appendChild(stage.el);

    container.appendChild(root);

    this._refs = {
      root,
      governing,
      direct,
      inverted,
      stage,
      appliedStep: 0,
      reconstruct: false
    };
    this._applyBuild(0);
  },

  onEnter(ctx) {
    markReconstruct(this._refs, ctx);
  },

  onExit() {
    this._refs?.stage.destroy();
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    // 0 the governing question, carried over, with the direct framing beneath ·
    // 1 the inversion replaces it — the framing alone, no carrier on stage ·
    // 2 the carrier goes on the stress stage, arriving on its word.
    // (R7: builds 1 and 2 used to render the identical frame; R7.4 §D.1
    // deleted the corner brackets and made them identical again. PRESENTER-
    // RULED 3 September 2026 (the Batch D implementation brief §1.1, master
    // §13): the carrier is keyed to build 2 — the one ruled change on this
    // treatment, made here at the source.)
    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    refs.governing.dataset.visible = String(n === 0);
    refs.governing.dataset.quiet = 'true';
    refs.direct.dataset.visible = String(n === 0);
    refs.inverted.dataset.visible = String(n >= 1);
    refs.stage.applyState({
      frameVisible: n >= 2,
      visible: n >= 2
    });
  },

  notes: `[→] We could go at that question head-on and start listing everything a good carrier ought to have. That is what almost every conversation about money does. There is a better way, and it is not mine — it is Charlie Munger’s, and he was blunt about it: invert, always invert. So instead of asking what makes a good carrier, ask how a carrier fails.

[→] What could stop this claim from reaching 2126 intact and still redeemable? Because that question has answers we can actually check — history is full of them. And once you have the ways it fails, the properties you need are not a matter of taste any more. They are just the failures, turned around. So let’s put a carrier on the bench and try to break it.`
};
