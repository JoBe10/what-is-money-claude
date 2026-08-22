import { FailureRows } from '../../components/section-4/FailureRows.js';
import { FIRST_FAILURE_GROUP } from './_failure-property-data.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 5;

export default {
  id: '4-11-carrier-failures-i',
  section: 'ideal-store',
  number: 32,
  title: 'How the Carrier Can Fail: I',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-failures s4-failures--one';

    const rows = FailureRows({
      rows: FIRST_FAILURE_GROUP,
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

  notes: `[→] The first one is dilution. If somebody can create additional units of the carrier whenever they choose, then the claim embodied in every unit already held gets quietly divided into a smaller share. Nobody takes anything from you. Your number does not change. What it commands does.

[→] Second: it could be indivisible. It might hold enormous value and be impossible to break into the sizes ordinary life needs — and a carrier you cannot cut is a carrier you can only spend all at once.

[→] Third: illiquid. The claim looks valuable, and the holder still cannot turn it into anything without waiting, without friction, or without taking a real loss to get out.

[→] Fourth: trapped. Value that cannot cross a border, a jurisdiction, or simply a distance may never reach the person who needs it — and the people who most need to move value are usually the people least allowed to.

[→] And fifth: the carrier can eat the claim. Storage, insurance, maintenance, administration — costs that arrive every year and are paid out of the thing you were trying to preserve. Those are five. There are five more, and the second five are the ones that do the most damage.`
};
