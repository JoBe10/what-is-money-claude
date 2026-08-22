import { ClaimObject } from './ClaimObject.js';
import { UnitGrid } from '../UnitField.js';

// R7 §4.2: the field’s units are the shared component’s units. 4.22 kept its own
// copy of the geometry in CSS, so the 1.1 ↔ 4.22 rhyme survived only as long as
// nobody edited either file; the grid now comes from UnitField’s grammar and
// this module owns the argument — the margin, the demand arriving at it, the
// repricing that sweeps back across the stock — and nothing else.
const STOCK_COLUMNS = 7;
const STOCK_ROWS = 5;
const FIXED_UNIT_COUNT = STOCK_COLUMNS * STOCK_ROWS;

export function FixedSupplyField({ unitCount = FIXED_UNIT_COUNT } = {}) {
  if (unitCount !== FIXED_UNIT_COUNT) {
    throw new RangeError(`FixedSupplyField requires exactly ${FIXED_UNIT_COUNT} units`);
  }

  const root = document.createElement('div');
  root.className = 's4-fixed-supply-field';
  root.dataset.unitCount = String(unitCount);
  root.setAttribute('role', 'img');

  const stockLabel = document.createElement('span');
  stockLabel.className = 's4-fixed-supply-field__stock-label';
  stockLabel.textContent = 'FIXED OUTSTANDING STOCK';
  stockLabel.setAttribute('aria-hidden', 'true');
  root.appendChild(stockLabel);

  const repriceFrame = document.createElement('div');
  repriceFrame.className = 's4-fixed-supply-field__reprice-frame';
  repriceFrame.setAttribute('aria-hidden', 'true');
  root.appendChild(repriceFrame);

  const grid = UnitGrid({
    cols: STOCK_COLUMNS,
    rows: STOCK_ROWS,
    className: 's4-fixed-supply-field__units'
  });
  grid.units.forEach((unit) => {
    const column = Number(unit.dataset.column);
    // The rightmost column is the sliver actually for sale; the repricing
    // sweeps right to left from it, which is the direction of the causal claim.
    unit.dataset.available = String(column === STOCK_COLUMNS - 1);
    unit.style.setProperty('--reprice-order', String((STOCK_COLUMNS - 1) - column));
  });
  root.appendChild(grid.el);

  const marginLabel = document.createElement('span');
  marginLabel.className = 's4-fixed-supply-field__margin-label';
  marginLabel.textContent = 'AVAILABLE AT THE MARGIN';
  marginLabel.setAttribute('aria-hidden', 'true');
  root.appendChild(marginLabel);

  const marginBracket = document.createElement('div');
  marginBracket.className = 's4-fixed-supply-field__margin-bracket';
  marginBracket.setAttribute('aria-hidden', 'true');
  root.appendChild(marginBracket);

  const priceDiscovery = document.createElement('span');
  priceDiscovery.className = 's4-fixed-supply-field__price-discovery';
  priceDiscovery.textContent = 'PRICE DISCOVERED HERE';
  priceDiscovery.setAttribute('aria-hidden', 'true');
  root.appendChild(priceDiscovery);

  const demand = document.createElement('div');
  demand.className = 's4-fixed-supply-field__demand';
  demand.setAttribute('aria-hidden', 'true');

  const demandClaims = Array.from({ length: 3 }, (_, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 's4-fixed-supply-field__demand-claim';
    wrapper.style.setProperty('--demand-index', String(index));

    // Sized to the field's own units (R7.1 §C4): these are marginal savings
    // arriving against the stock, so a claim must read as one more unit's worth
    // of demand, not as the section's hero object. At the component default it
    // dwarfed the margin column it is bidding for.
    const claim = ClaimObject({
      className: 's4-fixed-supply-field__claim',
      size: 44,
      ariaLabel: 'Incoming marginal savings demand'
    });
    wrapper.appendChild(claim.el);
    demand.appendChild(wrapper);
    return claim;
  });
  root.appendChild(demand);

  function applyState({
    marginVisible = false,
    demandArrived = false,
    repriced = false
  } = {}) {
    root.dataset.marginVisible = String(marginVisible);
    root.dataset.demandArrived = String(demandArrived);
    root.dataset.repriced = String(repriced);
    root.setAttribute(
      'aria-label',
      `${unitCount} fixed outstanding stock units; ${marginVisible ? `${STOCK_ROWS} units available at the margin` : 'the margin is not yet emphasized'}`
    );

    demandClaims.forEach((claim) => {
      claim.applyState({
        visible: marginVisible,
        emphasis: demandArrived ? 'focus' : 'neutral'
      });
    });
  }

  function destroy() {
    demandClaims.forEach((claim) => claim.destroy());
    root.remove();
  }

  applyState();
  return {
    el: root,
    unitCount,
    applyState,
    destroy
  };
}

export default FixedSupplyField;
