import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';
import {
  FIRST_FAILURE_GROUP,
  SECOND_FAILURE_GROUP
} from './_failure-property-data.js';

const MAX_STEP = 2;

function createPropertyColumn(group, className, numberOffset) {
  const column = document.createElement('div');
  column.className = `s4-properties__column ${className}`;

  const rows = group.map(({ property }, index) => {
    const row = document.createElement('div');
    row.className = 's4-properties__row';
    row.style.setProperty('--property-index', String(index));

    const number = document.createElement('span');
    number.className = 's4-properties__number';
    number.textContent = String(numberOffset + index).padStart(2, '0');

    const label = document.createElement('span');
    label.className = 's4-properties__label';
    label.textContent = property;

    row.append(number, label);
    column.appendChild(row);
    return row;
  });

  return { column, rows };
}

export default {
  id: '4-14-ten-properties',
  section: 'ideal-store',
  number: 35,
  title: 'The Ten Properties',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-properties';

    const grid = document.createElement('div');
    grid.className = 's4-properties__grid';

    const left = createPropertyColumn(
      FIRST_FAILURE_GROUP,
      's4-properties__column--left',
      1
    );
    const right = createPropertyColumn(
      SECOND_FAILURE_GROUP,
      's4-properties__column--right',
      6
    );
    grid.append(left.column, right.column);
    root.appendChild(grid);

    container.appendChild(root);

    this._refs = {
      root,
      columns: [left.rows, right.rows],
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

    // R7: the slide used to stand complete at build 0 while the presenter read
    // all ten properties over it. The list now arrives in the two groups it was
    // derived in — five rows per advance, sequenced inside one gesture.
    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    refs.columns.forEach((rows, columnIndex) => {
      rows.forEach((row) => {
        row.dataset.visible = String(n >= columnIndex + 1);
      });
    });
  },

  notes: `[→] So here is the first five, and every one of them is a question you can put to anything that claims to be money. No supply inflation: can anybody create more units and dilute what I already hold? Divisibility: can it carry both very large and very small value? Liquidity: can I exchange it without waiting and without a haircut? Portability: can it move across distance, and across a border? No carrying costs: can I simply hold it — without paying to?

[→] And the second five. Resistance to control: can anyone outside change the access, the ownership, or the rules? Durability: does it survive physical, technical and institutional change? Verifiability: can authenticity, ownership and supply be established — by me, rather than by somebody telling me? Fungibility: is one unit treated as good as another? And track record: what evidence do we actually have that it survives crises and changing regimes? Ten criteria — derived, not chosen. Now let’s point them at something.`
};
