// Final slide of the deck. 4.23 is the true final frame — it lands the argument
// and holds — so this slide exists only to close the road and release the
// audience.
//
// R7 §1.3 gives it one build before the release: the method line from 1.5
// returns a last time with all three waypoints in `completed` state — the
// promise, kept — and one slow warmth pulse travels the whole line, left to
// right, in the order the three questions were asked. Then the line dissolves
// and the existing frame is retained exactly: one line of typography on black,
// no second line, no watermark, no kicker, no chrome.

import { WaypointInterstitial } from '../../components/WaypointInterstitial.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 2;

const WAYLINE_STATES = [
  { visible: false, completed: [], active: 0 },
  { visible: true, completed: [1, 2, 3], active: 0 },
  { visible: false, completed: [1, 2, 3], active: 0 }
];

export default {
  id: '5-01-thank-you',
  section: 'close',
  number: 46,
  title: 'Thank you',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's5c';

    const device = WaypointInterstitial();
    root.appendChild(device.el);

    const line = document.createElement('div');
    line.className = 's5c__thanks';
    line.textContent = 'Thank you.';
    root.appendChild(line);

    container.appendChild(root);

    this._refs = { root, device, line, appliedStep: 0, reconstruct: false };
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

    const n = clampStep(step, MAX_STEP);
    const live = beginBuild(refs, n);

    refs.device.setState(WAYLINE_STATES[n], { live });
    refs.line.dataset.visible = String(n >= MAX_STEP);
  },

  notes: `[→] There’s the whole road — all three questions, kept. An hour ago I told you something strange: that you’d spend eighty thousand hours of your life earning something you couldn’t define. Now you can define it. You know where it came from. You know what it must do, and in what order. And you know how to judge anything that tries to be it — including everything in your bank account, and everything on the news.

[→] Here’s the last thing I’ll tell you about seeing money this way: you won’t be able to stop. Every headline, every paycheck, every price — you’ll see the claim, the carrier, and the rules underneath. That framework is yours now. Not my conclusions — the framework. Check every score. None of this is investment advice; it’s the education you were never given. What it offers you is a way to ask, about any money you’ll ever hold, one question: can the rules be moved beneath you? Thank you.`
};
