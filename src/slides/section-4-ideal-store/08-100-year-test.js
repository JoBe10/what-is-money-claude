import { ClaimObject } from '../../components/section-4/ClaimObject.js';
import { CarrierShell } from '../../components/section-4/CarrierShell.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 3;

const STATEMENTS = [
  'You earn the claim today.',
  'You choose not to redeem it.',
  'You pass it forward.',
  'Your descendants receive it in 2126.'
];

function createTimeline() {
  const timeline = document.createElement('div');
  timeline.className = 's4-century-test__timeline';
  timeline.innerHTML = `
    <span class="s4-century-test__year s4-century-test__year--start">2026</span>
    <span class="s4-century-test__span">100 YEARS</span>
    <svg viewBox="0 0 1260 80" focusable="false" aria-hidden="true">
      <path class="s4-century-test__track" d="M0 40H1260" />
      <path class="s4-century-test__travel" d="M0 40H1260" />
    </svg>
    <span class="s4-century-test__year s4-century-test__year--end">2126</span>
  `;
  return timeline;
}

function createStatements() {
  const statements = document.createElement('div');
  statements.className = 's4-century-test__statements';

  // R7: the four statements are one spoken paragraph — the experiment, stated —
  // so they stand together as a block rather than replacing one another under a
  // single beat. They arrive in reading order inside that one gesture.
  const items = STATEMENTS.map((copy, index) => {
    const item = document.createElement('p');
    item.className = 's4-century-test__statement';
    item.dataset.statement = String(index);
    item.style.setProperty('--statement-index', String(index));
    item.textContent = copy;
    statements.appendChild(item);
    return item;
  });

  return { statements, items };
}

export default {
  id: '4-08-100-year-test',
  section: 'ideal-store',
  number: 29,
  title: 'The 100-Year Test',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-century-test';

    const { statements, items } = createStatements();
    root.appendChild(statements);

    const timeline = createTimeline();
    root.appendChild(timeline);

    const scene = document.createElement('div');
    scene.className = 's4-century-test__scene';

    const shell = CarrierShell({ className: 's4-century-test__shell' });
    scene.appendChild(shell.el);

    const claimStage = document.createElement('div');
    claimStage.className = 's4-century-test__claim-stage';
    const claim = ClaimObject({ className: 's4-century-test__claim' });
    claimStage.appendChild(claim.el);
    scene.appendChild(claimStage);

    root.appendChild(scene);
    container.appendChild(root);

    this._refs = {
      root,
      statements,
      items,
      timeline,
      scene,
      shell,
      claim,
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

    // 0 the carrier, inherited · 1 the experiment stated in full · 2 the
    // century, and the carrier setting out into it · 3 arrival in 2126.
    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    refs.statements.dataset.visible = String(n === 1);
    refs.items.forEach((item) => {
      item.dataset.visible = String(n === 1);
    });
    refs.timeline.dataset.visible = String(n >= 2);
    refs.timeline.dataset.spanVisible = String(n >= 2);
    refs.timeline.dataset.progress = n >= 3 ? 'end' : n >= 2 ? 'middle' : 'start';
    refs.timeline.dataset.destination = String(n >= 3);
    refs.timeline.dataset.held = String(n >= 3);
    refs.scene.dataset.position = n >= 3 ? 'end' : n >= 2 ? 'middle' : 'start';
    refs.claim.applyState({
      visible: true,
      emphasis: 'focus'
    });
    refs.shell.applyState({
      visible: true,
      focus: 'future'
    });
  },

  notes: `[→] Here’s the thought experiment the rest of the inquiry lives inside. You provide value today, and you receive the claim. You decide not to redeem it. Instead, it goes to your descendants — people you may never meet — and it must arrive in their hands in the year 2126, intact.

[→] You must choose one carrier. And you know nothing about the world it will travel through — not where they’ll live, not what they’ll want, not which governments will exist, which institutions will survive, which technologies will dominate, which currencies will still be accepted. One hundred years — long enough that you’re not allowed to *assume* any company, any arrangement, any government survives it. That’s the point of the number.

[→] And notice: you know exactly what the carrier is carrying. Not time. Not a fixed basket of goods. An unredeemed purchasing-power claim — the open half of an exchange, waiting a century to close. So the question becomes precise: which properties give that claim the best chance of arriving?`
};
