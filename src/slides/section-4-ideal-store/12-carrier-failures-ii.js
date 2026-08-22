import { FailureRows } from '../../components/section-4/FailureRows.js';
import { SECOND_FAILURE_GROUP } from './_failure-property-data.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 5;

export default {
  id: '4-12-carrier-failures-ii',
  section: 'ideal-store',
  number: 33,
  title: 'How the Carrier Can Fail: II',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-failures s4-failures--two';

    const rows = FailureRows({
      rows: SECOND_FAILURE_GROUP,
      className: 's4-failures__list'
    });
    root.appendChild(rows.el);

    container.appendChild(root);

    this._refs = {
      root,
      rows,
      appliedStep: 0,
      reconstruct: false
    };
    this._applyBuild(0);
  },

  onEnter(ctx) {
    markReconstruct(this._refs, ctx);
  },

  onExit() {
    this._refs?.rows.destroy();
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
    refs.rows.applyState(n);
  },

  notes: `[→] Sixth: it can be controlled. Somebody outside the arrangement can change who may access it, who owns it, or the rules it runs under — after you are already holding it. And notice this one does not need to destroy anything. It only needs a signature.

[→] Seventh: it can degrade. Physical decay, technical failure, damp, fire, a format nobody can read any more. The claim survives only as long as the thing carrying it survives.

[→] Eighth: it can be unverifiable. If the person holding it in 2126 cannot establish that it is authentic, that it is theirs, and how much of it exists — then they are not holding a claim, they are holding a hope.

[→] Ninth: the units may not be fungible. Two units that ought to be identical get treated differently because of where they have been. And a unit that has to be explained is a unit somebody can refuse.

[→] And tenth: it can simply be untested. A short history tells us very little about how something behaves across a war, a crisis, a technological break, a change of regime. This one is uncomfortable, and I want you to remember that I put it on the list myself, before you saw the table. So: ten distinct ways to fail. Now watch what happens when you turn them around.`
};
