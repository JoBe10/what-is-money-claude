export const COMPARISON_GROUPS = Object.freeze([
  Object.freeze({
    id: 'monetary',
    label: 'MONETARY ASSETS',
    assetIds: Object.freeze(['gold', 'fiat', 'bitcoin'])
  }),
  Object.freeze({
    id: 'productive',
    label: 'PRODUCTIVE ASSETS',
    assetIds: Object.freeze(['property', 'shares'])
  })
]);

export const COMPARISON_ASSETS = Object.freeze([
  Object.freeze({
    id: 'gold',
    label: 'GOLD',
    group: 'monetary',
    alt: 'Physical investment-grade gold bullion'
  }),
  Object.freeze({
    id: 'fiat',
    label: 'FIAT',
    group: 'monetary',
    alt: 'A major developed-market fiat currency'
  }),
  Object.freeze({
    id: 'bitcoin',
    label: 'BITCOIN',
    group: 'monetary',
    alt: 'Native BTC held in self-custody'
  }),
  // The asset is labeled REAL ESTATE, not PROPERTY: the comparison table’s
  // row-header column is PROPERTY (the ten derived properties), and the two
  // must not collide in header position. Every slide that names this asset
  // reads its label from here.
  Object.freeze({
    id: 'property',
    label: 'REAL ESTATE',
    group: 'productive',
    alt: 'Direct, unlevered ownership of real estate'
  }),
  Object.freeze({
    id: 'shares',
    label: 'SHARES',
    group: 'productive',
    alt: 'A diversified portfolio of listed ordinary shares'
  })
]);

const comparisonRows = [
  {
    property: 'NO SUPPLY INFLATION',
    scores: { gold: 4, fiat: 1, bitcoin: 5, property: 3, shares: 2 }
  },
  {
    property: 'DIVISIBILITY',
    scores: { gold: 3, fiat: 4, bitcoin: 5, property: 1, shares: 3 }
  },
  {
    property: 'LIQUIDITY',
    scores: { gold: 3, fiat: 5, bitcoin: 4, property: 2, shares: 5 }
  },
  {
    property: 'PORTABILITY',
    scores: { gold: 2, fiat: 4, bitcoin: 5, property: 1, shares: 4 }
  },
  {
    property: 'NO CARRYING COSTS',
    scores: { gold: 2, fiat: 4, bitcoin: 4, property: 1, shares: 4 }
  },
  {
    property: 'RESISTANCE TO CONTROL',
    scores: { gold: 4, fiat: 1, bitcoin: 5, property: 1, shares: 1 }
  },
  {
    property: 'DURABILITY',
    scores: { gold: 5, fiat: 3, bitcoin: 5, property: 4, shares: 3 }
  },
  {
    property: 'VERIFIABILITY',
    scores: { gold: 4, fiat: 4, bitcoin: 5, property: 3, shares: 4 }
  },
  {
    property: 'FUNGIBILITY',
    scores: { gold: 5, fiat: 4, bitcoin: 4, property: 1, shares: 4 }
  },
  {
    property: 'TRACK RECORD',
    scores: { gold: 5, fiat: 3, bitcoin: 2, property: 4, shares: 4 }
  }
];

export const COMPARISON_ROWS = Object.freeze(
  comparisonRows.map(({ property, scores }) => Object.freeze({
    property,
    scores: Object.freeze({ ...scores })
  }))
);

