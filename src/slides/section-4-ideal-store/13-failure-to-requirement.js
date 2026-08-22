import { FAILURE_PROPERTY_PAIRS } from './_failure-property-data.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 2;

function createMappingRow(pair, index) {
  const row = document.createElement('div');
  row.className = 's4-mapping__row';
  row.dataset.mapping = String(index);

  const failure = document.createElement('span');
  failure.className = 's4-mapping__failure';
  failure.textContent = pair.failure;

  const arrow = document.createElement('span');
  arrow.className = 's4-mapping__arrow';
  arrow.textContent = '→';
  arrow.setAttribute('aria-hidden', 'true');

  const property = document.createElement('span');
  property.className = 's4-mapping__property';
  property.textContent = pair.property;

  row.append(failure, arrow, property);
  return row;
}

export default {
  id: '4-13-failure-to-requirement',
  section: 'ideal-store',
  number: 34,
  title: 'From Failure to Requirement',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-mapping';

    const mainLine = document.createElement('p');
    mainLine.className = 's4-mapping__main';
    mainLine.textContent = 'Invert each failure. The properties emerge.';
    root.appendChild(mainLine);

    const grid = document.createElement('div');
    grid.className = 's4-mapping__grid';
    const rows = FAILURE_PROPERTY_PAIRS.map((pair, index) => {
      const row = createMappingRow(pair, index);
      grid.appendChild(row);
      return row;
    });
    root.appendChild(grid);

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
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    // The ten failures invert in the two groups they were derived in, so the
    // sweep matches the two slides that produced it rather than flipping all
    // ten under one spoken sentence.
    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    refs.rows.forEach((row, index) => {
      row.dataset.mapped = String(n >= (index < 5 ? 1 : 2));
    });
  },

  notes: `[→] Take the first five and turn each one around. If extra units can dilute what is already held, then what you need is a carrier where no one can add units: no supply inflation. Indivisible becomes divisible. Illiquid becomes liquid. Trapped becomes portable. And a carrier that eats the claim through carrying costs becomes one that costs nothing to keep.

[→] And the same operation on the second five. Control becomes resistance to control. Degradation becomes durability. Uncertainty becomes verifiability. Unequal units become fungible ones. And thin evidence becomes the demand for a track record. Notice what just happened, because this is the whole method: I did not choose these. I did not sit down and decide what a good money should look like. Each one is a failure with a minus sign in front of it.`
};
