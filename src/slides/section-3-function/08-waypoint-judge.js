// 3.8 — the S3→S4 boundary. The handoff question clears to an authored
// black beat; the method line returns with two questions settled, and the
// third waypoint ignites. The advance that leaves this slide hands into
// the existing Section 4 opener through the standard crossfade — the
// stylistic step-change at that seam is expected until R7 rebuilds
// Section 4's execution.

import { WaypointInterstitial } from '../../components/WaypointInterstitial.js';

const STATES = [
  { visible: false, completed: [], active: 0 },
  { visible: true, completed: [1, 2], active: 0 },
  { visible: true, completed: [1, 2], active: 3 }
];

export default {
  id: '3-08-waypoint-judge',
  section: 'function',
  number: 22,
  title: 'The Third Question',
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

  notes: `[→] Two questions down. We know where money came from. We know what it must do, and in what order it must do it.

[→] One question left — the one everything has been building toward. How would you judge anything that tries to be it? Not by trusting a chart. Not by trusting me. From first principles — starting with a thought experiment about the next hundred years.`
};
