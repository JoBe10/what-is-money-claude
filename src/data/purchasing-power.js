// GENERATED DATA — do not hand-edit. Regenerate from the sources below.
// Audit trail: docs/SOURCES.md entries WIM-FX-001 (USD), WIM-FX-002 (GBP),
// WIM-FX-003 (JPY), WIM-FX-004 (CHF). Consumed by Scene 8 beat 4, the chart
// "What one unit still buys." — ported whole from slide 2.7's build 3
// (`2-07-the-severance`, left the manifest at the Batch B splice).
//
// WHAT THESE NUMBERS ARE. Purchasing power of one unit of each currency,
// CPI-deflated, indexed 1971 = 100, annual, 1971 through 2025 (the latest
// complete calendar year for all four series as of 30 July 2026). For each
// year: value = 100 × CPI(1971) / CPI(year), using each country’s own
// national consumer price index at annual-average frequency. A value of
// 12.58 means one 1971 unit buys 12.58% of what it bought in 1971.
//
// SERIES AND SOURCES (all retrieved 2026-07-30):
//   USD — U.S. Bureau of Labor Statistics, CPI-U, U.S. city average, all
//         items, not seasonally adjusted (series CUUR0000SA0), annual
//         averages, 1982-84 = 100. 1971 = 40.5; 2025 = 321.943.
//   GBP — Office for National Statistics. CPIH-consistent long run: ONS
//         modelled historical CPIH (series JF4D, 1965 = 100) for 1971-1988,
//         spliced at 1988 to the published CPIH all-items index (series
//         L522, 2015 = 100). See WIM-FX-002 for why CPIH and not RPI, and
//         for the two alternatives and what they would have shown.
//   JPY — Statistics Bureau of Japan, Consumer Price Index, 2020-base,
//         Japan, All items (総合), annual averages. 1971 = 32.9;
//         2025 = 111.9.
//   CHF — Swiss National Bank data portal, cube `plkopr`, Landesindex der
//         Konsumentenpreise (Swiss CPI), December 2010 = 100; annual
//         averages computed from the 12 monthly values of each year.
//         1971 = 33.8028; 2025 = 100.4144.
//
// HONEST NOTES, carried here because the chart cannot show them:
//   - 2025 for the USD is the BLS-published annual average of the eleven
//     months that exist: October 2025 CPI was never published because of
//     the lapse in appropriations. BLS’s figure and the mean of the
//     available months agree exactly at 321.943.
//   - These are not monotonic. Deflation years raise purchasing power, so
//     JPY rises in 12 of the 54 year-steps and CHF in 7 (largest single-year
//     rise: JPY +0.46 index points in 2009, CHF +0.42 in 2015 — under 2px
//     on this chart, but real). The trend over the span is one direction for
//     all four; individual years are not. See docs/archive/r4-report.md.

export const PP_YEAR_MIN = 1971;
export const PP_YEAR_MAX = 2025;

// One entry per year from PP_YEAR_MIN to PP_YEAR_MAX inclusive.
export const PURCHASING_POWER = {
  USD: [
    100.00, 96.89, 91.22, 82.15, 75.28, 71.18, 66.83, 62.12, 55.79, 49.15,
    44.55, 41.97, 40.66, 38.98, 37.64, 36.95, 35.65, 34.23, 32.66, 30.99,
    29.74, 28.87, 28.03, 27.33, 26.57, 25.81, 25.23, 24.85, 24.31, 23.52,
    22.87, 22.51, 22.01, 21.44, 20.74, 20.09, 19.53, 18.81, 18.88, 18.57,
    18.00, 17.64, 17.39, 17.11, 17.09, 16.87, 16.52, 16.13, 15.84, 15.65,
    14.95, 13.84, 13.29, 12.91, 12.58
  ],
  GBP: [
    100.00, 94.24, 87.12, 77.24, 65.19, 57.62, 51.11, 47.79, 43.67, 38.98,
    35.76, 33.46, 31.98, 30.66, 29.25, 28.17, 27.18, 25.95, 24.53, 22.70,
    21.13, 20.21, 19.70, 19.27, 18.78, 18.26, 17.87, 17.54, 17.23, 17.04,
    16.77, 16.52, 16.31, 16.08, 15.75, 15.37, 15.02, 14.51, 14.23, 13.88,
    13.36, 13.03, 12.74, 12.56, 12.51, 12.38, 12.07, 11.80, 11.60, 11.49,
    11.21, 10.38, 9.73, 9.41, 9.06
  ],
  JPY: [
    100.00, 95.36, 85.23, 69.26, 61.96, 56.63, 52.39, 50.23, 48.45, 44.95,
    42.89, 41.70, 40.97, 40.02, 39.26, 39.03, 38.98, 38.71, 37.86, 36.72,
    35.53, 34.96, 34.49, 34.27, 34.31, 34.27, 33.67, 33.47, 33.57, 33.81,
    34.02, 34.34, 34.45, 34.45, 34.56, 34.45, 34.45, 33.99, 34.45, 34.70,
    34.81, 34.81, 34.67, 33.74, 33.50, 33.54, 33.37, 33.07, 32.90, 32.90,
    32.97, 32.16, 31.16, 30.32, 29.40
  ],
  CHF: [
    100.00, 93.76, 86.21, 78.54, 73.61, 72.37, 71.44, 70.71, 68.23, 65.59,
    61.59, 58.30, 56.63, 55.02, 53.19, 52.80, 52.05, 51.09, 49.53, 46.99,
    44.39, 42.66, 41.30, 40.95, 40.23, 39.91, 39.70, 39.69, 39.38, 38.77,
    38.39, 38.15, 37.90, 37.60, 37.17, 36.78, 36.51, 35.65, 35.82, 35.57,
    35.49, 35.74, 35.82, 35.82, 36.24, 36.39, 36.20, 35.86, 35.73, 36.00,
    35.79, 34.80, 34.07, 33.72, 33.66
  ]
};

// Draw order and line weight: the dollar carries the argument, the franc is
// the honesty point (the strongest currency of the era, still declining).
export const PP_SERIES = [
  { id: 'USD', alpha: 0.95 },
  { id: 'GBP', alpha: 0.75 },
  { id: 'JPY', alpha: 0.6 },
  { id: 'CHF', alpha: 0.45 }
];
