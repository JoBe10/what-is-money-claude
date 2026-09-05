// Act II — the settled states of Scenes 5, 6 and 7 on the rail world.
//
// ONE TRANSCRIPTION, CELL BY CELL, of `review/act-2/harness/rail.mjs` — the
// builders that rendered the presenter-approved r2 sheet. Each entry below
// names the cell it is, and the landed-state proof compares the deck's frame
// against that cell's PNG pixel by pixel. Nothing here is chosen: a value that
// is not the sheet's is a defect.
//
// THE BEAT MAP IS UNTOUCHED — S5 8, S6 9, S7 5. Two things about it are worth
// stating because a reader will count:
//
//   · S6 beats 3–7 are the elimination's interior. The sheet CARRIES those
//     five cells byte-identical from the approved states sheet, so their
//     content is the legacy `ElementGrid`'s own waves, unchanged, and the rail
//     waits beneath them at the legacy's deep dim exactly as it does at beat 2.
//     They are the only S5–S7 states the pixel proof cannot cover, because the
//     carried cell shows the overlay without the rail beneath it.
//   · S6 carries ONE STATE PAST ITS LAST BEAT — `s6-b9-return`, the rail
//     returned with gold's dependency note landed. The sheet's own note is
//     that this return seam "is not itself a mapped beat", so it is not a
//     build: `TOTAL_BUILDS` still stops S6 at 8. It is the state Scene 7's
//     morph launches from — the rail coming back before COINAGE arrives — and
//     the proof mounts it directly. Flagged in the report: the amendment
//     allows reading beat 9 as settling on the return instead, which is one
//     line here.

import { frame, MESH_R } from './_railWorld.js';

// The specimens the evidence grammar carries (states.mjs SPECIMEN, verbatim).
export const RAIL_SPECIMEN = {
  zanzibar: {
    place: 'WEST AFRICA', date: '1800s',
    fact: 'Shiploads of cheaper Zanzibar cowries collapsed the shell rate. Local savings, out-supplied.'
  },
  severance: {
    place: '', date: '1971',
    fact: 'Redemption ends. For the first time in the record, the world’s money is pure decree — the trust rung with nothing under it.'
  }
};

// The entrant's rows (states.mjs ENTRANT, verbatim) — `2-08`'s own block, now
// landing at the BITCOIN station instead of standing free.
export const RAIL_ENTRANT = {
  facts: '2009: digital · no state, no company · supply fixed by its own rules.',
  capabilities: ['DIGITAL MOBILITY', 'NON-DISCRETIONARY SUPPLY', 'INDEPENDENT VERIFICATION'],
  limitation: 'Very young. Its price still swings far more than the monies it would compete with. Not yet twenty years into a hundred-year question.'
};

// On-screen copy — every string a verbatim element of an approved cell.
export const RAIL_COPY = {
  functionStayed: 'The function stayed. The carrier changed.',
  whyChanged: 'Why did the carrier keep changing?',
  scarcity: 'SCARCITY IN MATTER',
  hardCreate: 'Hard to create. Hard to destroy.',
  mint: 'Solves verification and division. Trust required: the mint.',
  vaultLine: 'A claim on gold in a vault. Trust required: the vault.',
  goldStayed: 'The gold stayed. The claim moved.',
  portability: 'Portability improved. Trust moved to the issuer.',
  becameInformation: 'MONEY BECAME INFORMATION',
  mostAccepted: 'The most universally accepted medium of exchange in history.',
  residue: 'Extraordinary at moving value. Measurably poor at storing it.',
  twoQuestions: 'The market’s valuation of a young asset, and the architecture of the claim, are two different questions.',
  volatility: 'Volatility is a stage, not a verdict.',
  historyLine: 'The history of money is a history of changing trade-offs.',
  betterForWhat: 'Better for what job?',
  // The mass overlay's own closing line — part of `massCounted()`, the
  // approved builder, and so part of the beat's frame rather than the rail's.
  massGrows: 'As the value grows, the weight grows.'
};

// ---------------------------------------------------------- the state timeline

const EARLY_FALLEN = { cattle: 'prior', salt: 'prior', iron: 'prior' };
const EARLY_WOUNDS = (latest) => ({
  cattle: { wound: latest === 'cattle' ? 'latest' : true },
  salt: { wound: latest === 'salt' ? 'latest' : true },
  iron: { wound: latest === 'iron' ? 'latest' : true }
});
const SHELLS_VIRTUE = { shells: { virtue: true } };
const METALS_VIRTUE = { metals: { virtue: true } };

const S6_STATIONS = { shells: 'prior', ...EARLY_FALLEN, metals: 'prior', gold: 'live' };
const S6_ROWS = { ...EARLY_WOUNDS(null), shells: { wound: true }, ...METALS_VIRTUE };
const S7_STATIONS = { ...S6_STATIONS, gold: 'alive', coinage: 'live' };
const S7_CLAIM_STATIONS = { ...S6_STATIONS, gold: 'alive', coinage: 'prior', claim: 'live' };
const S7_ROWS = { ...S6_ROWS, gold: { gain: true, dep: true } };

const S8_STATIONS = {
  ...S6_STATIONS, gold: 'alive', coinage: 'prior', claim: 'alive', ledger: 'live'
};
const S8_ROWS = {
  ...S6_ROWS,
  gold: { gain: true, dep: true },
  coinage: { wound: true },
  claim: { gain: true, dep: true }
};
// From 1971 the redemption gold and its claim stood on is cancelled: they dim
// together, captured rather than beaten.
const S8_FALLEN = { ...S8_STATIONS, gold: 'prior', claim: 'prior' };

const S9_STATIONS = {
  ...S6_STATIONS, gold: 'prior', coinage: 'prior', claim: 'prior',
  ledger: 'alive', bitcoin: 'live'
};
const S9_ROWS = {
  ...S6_ROWS,
  gold: { gain: true, dep: true }, coinage: { wound: true },
  claim: { gain: true, dep: true }, ledger: { gain: true, dep: true }
};

const S10_STATIONS = { ...S9_STATIONS, bitcoin: 'live' };
const S10_ROWS = {
  ...S6_ROWS, coinage: { wound: true },
  gold: { gain: true, dep: true }, claim: { gain: true, dep: true },
  ledger: { gain: true, dep: true }, bitcoin: { gain: true, dep: true }
};

// The rail spec S6 holds beneath the elimination overlay, beats 2 through 7:
// the record receded to the legacy deep dim with gold's gain settled from
// beat 1's landing. Beat 2 is the sheet's `s6-b2`; beats 3–7 hold it while the
// carried waves play over it.
const S6_TABLE_RAIL = () => ({
  head: 'gold', cam: frame('shells', 'gold'),
  st: S6_STATIONS, rows: { ...S6_ROWS, gold: { gain: true } }, recede: 'deep'
});

export const RAIL_STATES = {
  'the-function-stayed': [
    // s5-b1 — the rail begins, at the left edge of the record.
    {
      rail: {
        head: 'shells', cam: frame('shells', 'shells'),
        st: { shells: 'live' }, rows: { ...SHELLS_VIRTUE }
      }
    },
    // s5-b2 — CATTLE arrives to the right of the shells, and falls.
    {
      rail: {
        head: 'cattle', cam: frame('shells', 'cattle'),
        st: { shells: 'alive', cattle: 'prior' },
        rows: { ...SHELLS_VIRTUE, cattle: { wound: 'latest' } }
      }
    },
    // s5-b3 — SALT falls; CATTLE's wound recedes (§9.4 rule 10).
    {
      rail: {
        head: 'salt', cam: frame('shells', 'salt'),
        st: { shells: 'alive', cattle: 'prior', salt: 'prior' },
        rows: { ...SHELLS_VIRTUE, cattle: { wound: true }, salt: { wound: 'latest' } }
      }
    },
    // s5-b4 — IRON falls; SHELLS is the one still standing.
    {
      rail: {
        head: 'iron', cam: frame('shells', 'iron', { cap: 1.5 }),
        st: { shells: 'alive', ...EARLY_FALLEN },
        rows: { ...SHELLS_VIRTUE, ...EARLY_WOUNDS('iron') }
      }
    },
    // s5-b5 — METALS rises, arriving with its own line beneath it.
    {
      rail: {
        head: 'metals', cam: frame('shells', 'metals'),
        st: { shells: 'alive', ...EARLY_FALLEN, metals: 'live' },
        rows: { ...SHELLS_VIRTUE, ...EARLY_WOUNDS(null), ...METALS_VIRTUE }
      }
    },
    // s5-b6 — ZANZIBAR at the far-left SHELLS station. The virtue is gone and
    // the wound is landing here, at full scale, in the dated-fact register: the
    // landing IS the station's line on its own beat (r2.2), and it settles into
    // the rail's row at beat 7.
    {
      rail: {
        head: 'metals', cam: frame('shells', 'metals', { cy: 400 }),
        st: { shells: 'prior', ...EARLY_FALLEN, metals: 'alive' },
        rows: { ...EARLY_WOUNDS(null), ...METALS_VIRTUE }
      },
      datedFact: ['zanzibar', 'shells', 620]
    },
    // s5-b7 — the act's thesis over the receded rail.
    {
      rail: {
        head: 'metals', cam: frame('shells', 'metals', { cy: 470 }),
        st: { shells: 'prior', ...EARLY_FALLEN, metals: 'alive' },
        rows: { ...EARLY_WOUNDS(null), shells: { wound: true }, ...METALS_VIRTUE },
        recede: 'statement'
      },
      statements: [[RAIL_COPY.functionStayed, { top: 800 }]]
    },
    // s5-b8 — the exit question over the receded record.
    {
      rail: {
        head: 'metals', cam: frame('shells', 'metals', { cy: 470 }),
        st: { shells: 'prior', ...EARLY_FALLEN, metals: 'alive' },
        rows: { ...EARLY_WOUNDS(null), shells: { wound: true }, ...METALS_VIRTUE },
        recede: 'statement'
      },
      question: [RAIL_COPY.whyChanged, 790]
    }
  ],

  'scarcity-in-matter': [
    // s6-b1 — GOLD arrives; SCARCITY IN MATTER lands at the station.
    {
      rail: {
        head: 'gold', cam: frame('shells', 'gold', { cy: 520 }),
        st: S6_STATIONS, rows: S6_ROWS
      },
      landing: [RAIL_COPY.scarcity, 'gold', { y: 790, size: 40, reg: 'caps', a: 0.92 }]
    },
    // s6-b2 — the periodic-table overlay enters over the deep-dimmed rail.
    { rail: S6_TABLE_RAIL(), survivors: 1 },
    // beats 3–7 — the elimination's waves, the approved interiors unchanged,
    // the rail waiting beneath them (the five carried cells).
    { rail: S6_TABLE_RAIL(), survivors: 2 },
    { rail: S6_TABLE_RAIL(), survivors: 3 },
    { rail: S6_TABLE_RAIL(), survivors: 4 },
    { rail: S6_TABLE_RAIL(), survivors: 5 },
    { rail: S6_TABLE_RAIL(), survivors: 6 },
    // s6-b8 — the rail returns, GOLD crowned.
    {
      rail: {
        head: 'gold', cam: frame('shells', 'gold', { cy: 520 }),
        st: S6_STATIONS, rows: { ...S6_ROWS, gold: { gain: true } }
      },
      landing: [RAIL_COPY.hardCreate, 'gold', { y: 790, size: 40 }]
    },
    // s6-b9 — the mass-state overlay: gold's weakness, weight growing with
    // value, over the deep-dimmed rail.
    {
      rail: {
        head: 'gold', cam: frame('shells', 'gold'),
        st: S6_STATIONS, rows: { ...S6_ROWS, gold: { gain: true } }, recede: 'deep'
      },
      mass: true,
      statements: [[RAIL_COPY.massGrows, { top: 848, size: 40 }]]
    },
    // s6-b9-return — PAST THE LAST BEAT (see the header): the rail comes back
    // carrying the overlay's answer as GOLD's dependency note, at full voice.
    // Scene 7's morph launches from here.
    {
      rail: {
        head: 'gold', cam: frame('shells', 'gold'),
        st: S6_STATIONS, rows: { ...S6_ROWS, gold: { gain: true, dep: 'latest' } }
      }
    }
  ],

  'claims-on-gold': [
    // s7-b1 — COINAGE arrives, photographic for the first time.
    {
      rail: {
        head: 'coinage', cam: frame('shells', 'coinage', { cy: 520 }),
        st: S7_STATIONS, rows: { ...S6_ROWS, gold: { gain: true, dep: true } }
      },
      landing: [RAIL_COPY.mint, 'coinage', { y: 780, size: 36 }]
    },
    // s7-b2 — the fleet problem: the station's limit lands in the wound row.
    {
      rail: {
        head: 'coinage', cam: frame('shells', 'coinage'),
        st: S7_STATIONS,
        rows: { ...S7_ROWS, coinage: { wound: 'latest' } }
      }
    },
    // s7-b3 — THE VAULT FOLDS INTO THE RAIL (r2.4): CLAIM ON GOLD arrives, the
    // dependency arc runs back to GOLD, and the vault line lands as the
    // featured line at full voice.
    {
      rail: {
        head: 'claim', cam: frame('shells', 'claim', { cy: 520 }),
        st: S7_CLAIM_STATIONS,
        rows: { ...S7_ROWS, coinage: { wound: true } },
        depLine: true
      },
      landing: [RAIL_COPY.vaultLine, 'claim', { y: 790, size: 36, w: 1040 }]
    },
    // s7-b4 — the sentence condenses into the station's own row; the line
    // persists in the record.
    {
      rail: {
        head: 'claim', cam: frame('shells', 'claim', { cy: 520 }),
        st: S7_CLAIM_STATIONS,
        rows: { ...S7_ROWS, coinage: { wound: true }, claim: { note: 'latest' } },
        depLine: true
      }
    },
    // s7-b5 — the trade named honestly, over the receded rail.
    {
      rail: {
        head: 'claim', cam: frame('shells', 'claim', { cy: 470 }),
        st: { ...S7_CLAIM_STATIONS, claim: 'alive' },
        rows: { ...S7_ROWS, coinage: { wound: true }, claim: { note: true } },
        depLine: true, recede: 'statement'
      },
      statements: [
        [RAIL_COPY.goldStayed, { top: 690, size: 50 }],
        [RAIL_COPY.portability, { top: 790, size: 50 }]
      ]
    }
  ],

  'money-becomes-information': [
    // s8-b1 — LEDGER arrives; the certificate's claim on gold dematerializes:
    // the dependency arc is gone and the note it carried has become the named
    // trade in the record. MONEY BECAME INFORMATION lands at the station.
    {
      rail: {
        head: 'ledger', cam: frame('shells', 'ledger', { cy: 520 }),
        st: S8_STATIONS, rows: S8_ROWS
      },
      landing: [RAIL_COPY.becameInformation, 'ledger', { y: 780, size: 40, reg: 'caps', a: 0.92 }]
    },
    // s8-b2 — the honest strengths land; INSTANT TRANSFER settles beneath.
    {
      rail: {
        head: 'ledger', cam: frame('shells', 'ledger', { cy: 520 }),
        st: S8_STATIONS, rows: { ...S8_ROWS, ledger: { gain: true } }
      },
      landing: [RAIL_COPY.mostAccepted, 'ledger', { y: 780, size: 36 }]
    },
    // s8-b3 — 1971, the featured moment at the LEDGER station. Gold and its
    // claim dim together: captured, not beaten.
    {
      rail: {
        head: 'ledger', cam: frame('shells', 'ledger', { cy: 420 }),
        st: S8_FALLEN, rows: { ...S8_ROWS, ledger: { gain: true } }
      },
      datedFact: ['severance', 'ledger', 600]
    },
    // s8-b4 — the chart overlay enters over the deep-dimmed rail.
    {
      rail: {
        head: 'ledger', cam: frame('shells', 'ledger'),
        st: S8_FALLEN, rows: { ...S8_ROWS, ledger: { gain: true } }, recede: 'deep'
      },
      chart: 'severance'
    },
    // s8-b5 — the measured wound, over the receded record.
    {
      rail: {
        head: 'ledger', cam: frame('shells', 'ledger', { cy: 470 }),
        st: { ...S8_FALLEN, ledger: 'alive' },
        rows: { ...S8_ROWS, ledger: { gain: true, dep: true } },
        recede: 'statement'
      },
      statements: [[RAIL_COPY.residue, { top: 720, size: 50 }]]
    },
    // s8-b4-return — PAST THE LAST BEAT, like Scene 6's: the rail comes back
    // with the residue noted at the LEDGER station, at full voice. The chart's
    // slope has become one line of the record. Beat 5 launches from here.
    {
      rail: {
        head: 'ledger', cam: frame('shells', 'ledger'),
        st: S8_FALLEN, rows: { ...S8_ROWS, ledger: { gain: true, dep: 'latest' } }
      }
    }
  ],

  'scarcity-becomes-digital': [
    // s9-b1 — THE MESH FORMS OUT OF THE LEDGER STATION (r2.6). The record
    // recedes to the legacy deep dim, the LEDGER station alone stays lit — the
    // issuer the act has just watched fail — and its hub dissolves into the
    // ring. The approved geometry is unchanged; only where it stands moved.
    {
      rail: {
        head: 'ledger', cam: frame('shells', 'ledger', { cy: 540, rightAir: MESH_R }),
        st: { ...S8_FALLEN, ledger: 'alive' },
        rows: { ...S8_ROWS, ledger: { gain: true, dep: true } },
        recede: 'deep', lit: 'ledger', mesh: 'ledger'
      }
    },
    // s9-b2 — the rail returns and BITCOIN takes its station beside the
    // ledger; the facts land as its entrant annotation.
    {
      rail: {
        head: 'bitcoin', cam: frame('shells', 'bitcoin', { cy: 430 }),
        st: S9_STATIONS, rows: S9_ROWS
      },
      landings: [[RAIL_ENTRANT.facts, 'bitcoin', { y: 620, size: 33 }]]
    },
    // s9-b3 — the three capabilities land at full voice; the facts recede.
    {
      rail: {
        head: 'bitcoin', cam: frame('shells', 'bitcoin', { cy: 430 }),
        st: S9_STATIONS, rows: S9_ROWS
      },
      landings: [
        [RAIL_ENTRANT.facts, 'bitcoin', { y: 590, size: 27, a: 0.42 }],
        ...RAIL_ENTRANT.capabilities.map((copy, i) =>
          [copy, 'bitcoin', { y: 668 + i * 52, size: 26, reg: 'caps' }])
      ]
    },
    // s9-b4 — the honest line takes its own advance at full voice while
    // everything above it recedes: the legacy entrant treatment's whole point.
    {
      rail: {
        head: 'bitcoin', cam: frame('shells', 'bitcoin', { cy: 430 }),
        st: S9_STATIONS, rows: S9_ROWS
      },
      landings: [
        ...RAIL_ENTRANT.capabilities.map((copy, i) =>
          [copy, 'bitcoin', { y: 590 + i * 44, size: 24, reg: 'caps', a: 0.42 }]),
        [RAIL_ENTRANT.limitation, 'bitcoin', { y: 770, size: 27, w: 860 }]
      ]
    },
    // s9-b5 — the stability distinction, over the receded record.
    {
      rail: {
        head: 'bitcoin', cam: frame('shells', 'bitcoin', { cy: 430 }),
        st: { ...S9_STATIONS, bitcoin: 'alive' },
        rows: { ...S9_ROWS, bitcoin: { gain: true, dep: true } },
        recede: 'statement'
      },
      statements: [
        [RAIL_COPY.twoQuestions, { top: 660, size: 44 }],
        [RAIL_COPY.volatility, { top: 830, size: 38, a: 0.72 }]
      ]
    }
  ],

  'the-trade-off-keeps-moving': [
    // s10-b1 — the rail, complete, read again as argument. NO SECOND STRIP:
    // this is the same rail the act has been building since station one, and
    // the pairs stand lit at the four architecture stations.
    {
      rail: {
        head: 'bitcoin', cam: frame('shells', 'bitcoin', { cy: 470 }),
        st: S10_STATIONS, rows: S10_ROWS
      }
    },
    // s10-b2 — the history line lands ON the complete rail, not over a
    // receded one: the sentence and its evidence share the frame.
    {
      rail: {
        head: 'bitcoin', cam: frame('shells', 'bitcoin', { cy: 470 }),
        st: S10_STATIONS, rows: S10_ROWS
      },
      statements: [[RAIL_COPY.historyLine, { top: 780, size: 44 }]]
    },
    // s10-b3 — the palladium overlay, against the extended rail.
    {
      rail: {
        head: 'bitcoin', cam: frame('shells', 'bitcoin'),
        st: S10_STATIONS, rows: S10_ROWS, recede: 'deep'
      },
      palladium: 3
    },
    // s10-b4 — THE BAR, inside the ported palladium frame. The sheet carries
    // this cell byte-identical from the states sheet, so the approved cell
    // holds the frame WITHOUT the rail the film keeps deep-dimmed beneath it;
    // it is the one S8–S10 state the pixel proof cannot cover, exactly as
    // Scene 6's elimination interiors are.
    {
      rail: {
        head: 'bitcoin', cam: frame('shells', 'bitcoin'),
        st: S10_STATIONS, rows: S10_ROWS, recede: 'deep'
      },
      palladium: 5
    },
    // s10-b5 — the pivot that opens Act III, over the receded complete record.
    {
      rail: {
        head: 'bitcoin', cam: frame('shells', 'bitcoin', { cy: 420 }),
        st: S10_STATIONS, rows: S10_ROWS, recede: 'statement'
      },
      question: [RAIL_COPY.betterForWhat, 640]
    }
  ]
};

// The cell each state is, for the landed-state proof and for anyone reading a
// frame and wanting the sheet's own name for it.
export const RAIL_CELL = {
  'the-function-stayed': ['s5-b1', 's5-b2', 's5-b3', 's5-b4', 's5-b5', 's5-b6', 's5-b7', 's5-b8'],
  'scarcity-in-matter': ['s6-b1', 's6-b2', null, null, null, null, null, 's6-b8', 's6-b9', 's6-b9-return'],
  'claims-on-gold': ['s7-b1', 's7-b2', 's7-b3', 's7-b4', 's7-b5'],
  'money-becomes-information': ['s8-b1', 's8-b2', 's8-b3', 's8-b4', 's8-b5', 's8-b4-return'],
  'scarcity-becomes-digital': ['s9-b1', 's9-b2', 's9-b3', 's9-b4', 's9-b5'],
  // s10-b4 is the carried palladium bar: the approved cell holds the frame
  // without the rail the film keeps beneath it, so it has no pixel proof.
  'the-trade-off-keeps-moving': ['s10-b1', 's10-b2', 's10-b3', null, 's10-b5']
};

// The build count the engine advances through — Scenes 6 and 8 stop at their
// last beat even though their states arrays carry a return seam past it.
export const RAIL_BUILDS = {
  'the-function-stayed': 7,
  'scarcity-in-matter': 8,
  'claims-on-gold': 4,
  'money-becomes-information': 4,
  'scarcity-becomes-digital': 4,
  'the-trade-off-keeps-moving': 4
};

// The two states that are not builds: the return seams, addressed by index.
export const S6_RETURN = 9;
export const S8_RETURN = 5;
