// 3.6 — what your money actually is. The tower builds downward from where
// the viewer lives: payment apps first, then the deposit beneath, then base
// money — and the widths tell the truth, so the inverted proportion (more
// claims above than base beneath) does the arguing before the sentence
// does. Then the foundation shivers and the shudder travels up; then the
// upper layers recede and the question narrows to the base; then the
// bottom-most line reaches into black and holds, unlabeled.
//
// Claim ladder rung 2 (§3.3 of the governing brief): the word appears here,
// in this slide’s copy and script, and nowhere else in Section 3 — the
// component takes its link captions from this file for exactly that reason.
//
// R3.1 §D: full rebuild of the visual (the three-boxes-and-side-text
// layout was org-chart generic, the tie glyphs were illegible, and the
// dangling question had no visual moment). Build 0 is the authored black
// beat before the app slab.

import { LayerDiagram } from '../../components/section-3/LayerDiagram.js';

const LINK_ONE = 'a claim on your deposit.';
const LINK_TWO = 'a claim on base money.';
const RUN = 'More claims than base. That is what a bank run runs on.';
const PRINCIPLE =
  'Layers are not a scam — they are how money scales. But layers inherit the soundness of their base.';
const SCOPING =
  'The real question is about the foundation asset — underneath them all.';

// Six advances — the script’s six arrows (the R2 §6.1 direction: every
// spoken beat is one manual advance). The tremor at build 4 and the drop
// line at build 6 are choreography over states 4 and 6, not extra beats.
const TOWER_STATES = [
  { slabs: {}, links: {} },
  { slabs: { apps: true }, links: {} },
  { slabs: { apps: true, deposits: true }, links: { l1: { caption: LINK_ONE } } },
  {
    slabs: { apps: true, deposits: true, base: true },
    links: { l1: { caption: LINK_ONE }, l2: { caption: LINK_TWO } }
  },
  {
    slabs: { apps: true, deposits: true, base: true },
    links: { l1: { caption: LINK_ONE }, l2: { caption: LINK_TWO } }
  },
  {
    slabs: { apps: true, deposits: true, base: true },
    links: { l1: { caption: LINK_ONE }, l2: { caption: LINK_TWO } },
    foundation: true
  },
  {
    slabs: { apps: true, deposits: true, base: true },
    links: { l1: { caption: LINK_ONE }, l2: { caption: LINK_TWO } },
    foundation: true,
    drop: true
  }
];

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '3-06-what-your-money-is',
  section: 'function',
  number: 20,
  title: 'What Your Money Is',
  totalBuildSteps: 6,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's3f s3f-money';

    const diagram = LayerDiagram();
    root.appendChild(diagram.el);

    // All copy lands beneath the tower — no side text.
    const run = document.createElement('p');
    run.className = 's3f-money__run';
    run.textContent = RUN;
    root.appendChild(run);

    const principle = document.createElement('p');
    principle.className = 's3f-money__principle';
    principle.textContent = PRINCIPLE;
    root.appendChild(principle);

    const scoping = document.createElement('p');
    scoping.className = 's3f-money__scoping';
    scoping.textContent = SCOPING;
    root.appendChild(scoping);

    container.appendChild(root);

    this._refs = {
      root, diagram, run, principle, scoping,
      appliedStep: 0, reconstruct: false
    };
    this._applyBuild(0);
  },

  onEnter(ctx) {
    if (this._refs && (ctx?.targetBuildStep || 0) > 0) this._refs.reconstruct = true;
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

    const n = Math.max(0, Math.min(6, Number(step) || 0));
    const live = !refs.reconstruct && n === refs.appliedStep + 1;
    refs.reconstruct = false;
    refs.appliedStep = n;
    refs.root.dataset.step = String(n);
    refs.root.dataset.live = String(live);
    if (!live) {
      refs.root.dataset.snap = 'true';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        delete refs.root.dataset.snap;
      }));
    }

    refs.diagram.applyState(TOWER_STATES[n], { live });

    // The final build holds the question with no copy on stage.
    setVisible(refs.run, n >= 3 && n <= 5);
    setVisible(refs.principle, n >= 4 && n <= 5);
    setVisible(refs.scoping, n === 5);
  },

  notes: `[→] Now let me pull the rug slightly. This whole time I’ve said “money” — but is the thing in your bank account actually the base good we’ve been talking about? Start from the top, where you live: the payment app.

[→] The app balance is not money. It’s a claim on your bank deposit — a number that points at another number.

[→] And the deposit — this is the part almost nobody is ever told — is not money sitting in a vault with your name on it either. It is your bank’s IOU: a claim, redeemable on demand, in base money — cash if you withdraw it, central-bank reserves when your bank settles with another. And look at the shape of the tower we just built, because the proportions are the point: the claims stacked above are *wider* than the base beneath them. There are far more claims on base money than there is base money. That’s not a metaphor and not a scandal — it’s arithmetic, and it’s exactly what a bank run runs on: it’s all fine, right up until too many claimants ask at once.

[→] So let me be fair to the tower in both directions. Layers are not a scam. Notes on gold, deposits on notes, apps on deposits — every mature money has grown credit layers, because layers are how money scales to daily commerce; they’re as old as sound money itself. But feel what just happened when the foundation shivered: every layer above it moved. Layers inherit the soundness of their base. A tower is only as good as what it stands on.

[→] Which finally makes the real question precise. It was never about payment apps, and it was never about banking layers — those are engineering on top, and engineering can be excellent. The question is about the foundation asset underneath them all.

[→] And before we go find it — sit with this for a moment. Every layer is a claim on the layer below. So what is the bottom layer a claim on? … Hold that question. We’re coming back to it.`
};
