// GENERATED DATA — do not hand-edit. Regenerate from the sources below.
// Audit trail: docs/SOURCES.md entries WIM-PD-001 (mine supply) and
// WIM-PD-002 (prices). Consumed by Scene 10 beats 3–4 — ported whole from
// slide 3.5 (`3-05-the-palladium-test`, left the manifest at the Batch B
// splice) by architecture Ruling 4, which placed palladium in Scene 10.
//
// ---------------------------------------------------------------------------
// WHY THE LEFT PANEL IS SUPPLY AND NOT CRUSTAL ABUNDANCE (R4 §1.2.1)
// ---------------------------------------------------------------------------
// The panel used to say CRUSTAL RARITY. It cannot. Standard references
// disagree with each other about which of the two is the scarcer in the
// crust — and they disagree in *direction*, not just magnitude:
//
//   CRC Handbook-class values      Au ~0.004 ppm  ·  Pd ~0.015 ppm  -> Pd MORE abundant
//   Rudnick & Gao (2003), upper crust   Au ~1.5 ppb  ·  Pd ~0.52 ppb  -> Pd LESS abundant
//   Wedepohl (1995), continental crust  Au ~2.5 ppb  ·  Pd ~0.4 ppb   -> Pd LESS abundant
//
// When the standard sources cannot agree on the sign of the comparison, no
// honest chart can assert it. So the panel switched to the metric that is
// both unambiguous and the one that actually matters to a monetary argument:
// how much of each metal reaches the world each year. On that metric the
// answer is not close, and every published source agrees.
//
// Annual mine production, 2024 actuals, both from one edition of one source
// (USGS Mineral Commodity Summaries 2026) so the comparison is like-for-like:
//   gold       3,280 t   (world total, rounded, "Data in metric tons")
//   palladium    217 t   (world total, rounded; MCS prints 217,000 kg)
// Gold’s annual mine supply is about 15 times palladium’s. 2025 estimates in
// the same edition are 3,300 t and 190 t (a 17x ratio); the deck plots the
// 2024 actuals rather than the 2025 estimates.
//
// ---------------------------------------------------------------------------
// PRICES (R4 §1.2.2)
// ---------------------------------------------------------------------------
// LBMA daily benchmark prices, USD per troy ounce, arithmetic mean of every
// published fixing in the calendar year. Gold: LBMA Gold Price PM. Palladium:
// LBMA/LPPM Palladium Price PM. One convention for both metals, stated.
// Window 1990-2025; 2026 is excluded because it is incomplete. The LBMA
// palladium series begins 2 April 1990, so the 1990 palladium average covers
// April-December (187 fixings) while gold’s covers the full year (251).
//
// On annual averages, palladium closed above gold in two four-year stretches:
// 1999-2002 and 2019-2022. That is the beat’s sentence, and it survives contact
// with the real series.

export const PD_MINE_SUPPLY_YEAR = 2024;

// Tonnes per year, world total mine production. Order is draw order.
export const MINE_SUPPLY = [
  { id: 'GOLD', tonnes: 3280, alpha: 0.9 },
  { id: 'PALLADIUM', tonnes: 217, alpha: 0.65 }
];

export const PRICE_YEAR_MIN = 1990;
export const PRICE_YEAR_MAX = 2025;

// One entry per year from PRICE_YEAR_MIN to PRICE_YEAR_MAX inclusive,
// USD per troy ounce, annual mean of LBMA PM fixings.
export const PRICES = {
  GOLD: [
    383.56, 362.26, 343.95, 359.82, 384.15, 384.05, 387.87, 331.29, 294.09,
    278.57, 279.10, 271.04, 309.68, 363.32, 409.17, 444.45, 603.77, 695.39,
    871.96, 972.35, 1224.52, 1571.52, 1668.98, 1411.23, 1266.40, 1160.06,
    1250.80, 1257.15, 1268.49, 1392.60, 1769.59, 1798.61, 1800.09, 1940.54,
    2386.20, 3431.54
  ],
  PALLADIUM: [
    108.75, 88.36, 88.13, 122.46, 142.75, 151.29, 128.12, 177.97, 284.12,
    357.74, 680.33, 603.68, 337.56, 200.52, 230.22, 201.08, 320.00, 354.78,
    352.25, 263.22, 525.24, 733.63, 643.19, 725.06, 803.22, 691.63, 613.72,
    868.96, 1028.32, 1536.74, 2192.54, 2398.28, 2112.06, 1337.39, 983.62,
    1151.40
  ]
};

export const PRICE_SERIES = [
  { id: 'GOLD', alpha: 0.9 },
  { id: 'PALLADIUM', alpha: 0.65 }
];
