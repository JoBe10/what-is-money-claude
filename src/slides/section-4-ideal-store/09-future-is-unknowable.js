import { ClaimObject } from '../../components/section-4/ClaimObject.js';
import { CarrierShell } from '../../components/section-4/CarrierShell.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 5;

const UNCERTAINTY_PAIRS = [
  ['WHERE WILL THEY LIVE?', 'WHAT WILL THEY WANT?'],
  ['WHICH GOVERNMENTS WILL EXIST?', 'WHICH INSTITUTIONS WILL SURVIVE?'],
  ['WHICH TECHNOLOGIES WILL DOMINATE?', 'WHICH RULES WILL APPLY?']
];

function createOpening() {
  const opening = document.createElement('div');
  opening.className = 's4-future-unknown__opening';

  const known = document.createElement('span');
  known.textContent = 'We know the date.';

  const unknown = document.createElement('strong');
  unknown.textContent = 'We do not know the world.';

  opening.append(known, unknown);
  return opening;
}

function createUncertaintyPairs() {
  const pairs = document.createElement('div');
  pairs.className = 's4-future-unknown__pairs';

  const rows = UNCERTAINTY_PAIRS.map(([leftCopy, rightCopy], index) => {
    const row = document.createElement('div');
    row.className = 's4-future-unknown__pair';
    row.dataset.pair = String(index);

    const left = document.createElement('div');
    left.className = 's4-future-unknown__pair-item s4-future-unknown__pair-item--left';
    left.textContent = leftCopy;

    const right = document.createElement('div');
    right.className = 's4-future-unknown__pair-item s4-future-unknown__pair-item--right';
    right.textContent = rightCopy;

    row.append(left, right);
    pairs.appendChild(row);
    return row;
  });

  return { pairs, rows };
}

function createFinalQuestion() {
  const question = document.createElement('div');
  question.className = 's4-future-unknown__final';

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

export default {
  id: '4-09-future-is-unknowable',
  section: 'ideal-store',
  number: 30,
  title: 'The Future Is Unknowable',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-future-unknown';

    const date = document.createElement('div');
    date.className = 's4-future-unknown__date';
    date.textContent = '2126';
    date.setAttribute('aria-hidden', 'true');
    root.appendChild(date);

    const opening = createOpening();
    root.appendChild(opening);

    const { pairs, rows } = createUncertaintyPairs();
    root.appendChild(pairs);

    const scene = document.createElement('div');
    scene.className = 's4-future-unknown__scene';

    const shell = CarrierShell({ className: 's4-future-unknown__shell' });
    scene.appendChild(shell.el);

    const claimStage = document.createElement('div');
    claimStage.className = 's4-future-unknown__claim-stage';
    const claim = ClaimObject({ className: 's4-future-unknown__claim' });
    claimStage.appendChild(claim.el);
    scene.appendChild(claimStage);

    root.appendChild(scene);

    const finalQuestion = createFinalQuestion();
    root.appendChild(finalQuestion);

    container.appendChild(root);

    this._refs = {
      root,
      opening,
      rows,
      scene,
      shell,
      claim,
      finalQuestion,
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

    // 0 the carrier arriving in 2126, inherited · 1 the known and the unknown ·
    // 2–4 one pair of unknowns each · 5 the governing question.
    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    refs.opening.dataset.visible = String(n >= 1 && n <= 4);
    refs.opening.dataset.quiet = String(n >= 2);
    refs.rows.forEach((row, index) => {
      row.dataset.visible = String(n === index + 2);
    });
    refs.scene.dataset.quiet = String(n >= MAX_STEP);
    refs.claim.applyState({
      visible: true,
      emphasis: n >= MAX_STEP ? 'neutral' : 'focus'
    });
    refs.shell.applyState({
      visible: true,
      focus: 'future'
    });
    refs.finalQuestion.dataset.visible = String(n >= MAX_STEP);
  },

  notes: `[→] Here is the awkward part. We know the date exactly. We know almost nothing about the world it belongs to.

[→] We don’t know where they’ll be living. We don’t know what they’ll want — the things you and I would consider luxuries may be free by then, and things we take for granted may be unobtainable.

[→] We don’t know which governments will exist. We don’t know which institutions will still be standing — and remember, a century ago the list of institutions that felt permanent was long, and most of it is gone.

[→] We don’t know which technologies will dominate, and we don’t know which rules will apply — which is a polite way of saying we don’t know what will be legal.

[→] And the carrier still has to be chosen. Today. By you. So the question can’t be “which future do I predict?” — nobody in this record has ever won that bet. The question is this one: what properties give this claim the best chance of reaching 2126 with its purchasing power intact — and still redeemable by whoever is holding it? And I don’t think you answer that by starting with the properties.`
};
