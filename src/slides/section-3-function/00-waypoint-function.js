// 3.0 — the waypoint return (the §9.3 device’s debut as an interstitial).
// The pattern slide’s quiet frame dissolves to an authored black beat; the
// first advance brings the method line back exactly as 1.5 left it — the
// line’s first return after real absence — with waypoint 1 completed for
// the first time; the second advance ignites waypoint 2. Build 0 is the
// authored black beat before the return (the R2 §6.1 resolution: every
// spoken beat is a manual advance, so the return itself is build 1).

import { WaypointInterstitial } from '../../components/WaypointInterstitial.js';

const STATES = [
  { visible: false, completed: [], active: 0 },
  { visible: true, completed: [1], active: 0 },
  { visible: true, completed: [1], active: 2 }
];

export default {
  id: '3-00-waypoint-function',
  section: 'function',
  number: 14,
  title: 'The Second Question',
  totalBuildSteps: 2,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's3f s3f-way';

    const device = WaypointInterstitial();
    root.appendChild(device.el);
    container.appendChild(root);

    this._refs = { root, device, appliedStep: 0, reconstruct: false };
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

    const n = Math.max(0, Math.min(2, Number(step) || 0));
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

    refs.device.setState(STATES[n], { live });
  },

  notes: `[→] Remember the plan from the very beginning — three questions. We just spent twenty minutes on the first one. Where money came from, we now know: not from a decree — from a competition. A competition over salability that ran on every continent, produced the same two winners, built a ladder of convenience on top of them, and then, in its last chapter, was ended rather than won.

[→] Second question. What must a money actually *do*? Because “it won the competition” tells us it did the job — it doesn’t yet tell us what the job *is*. Let’s take the job apart.`
};
