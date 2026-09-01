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

import {
  frame, RECEDE
} from './_railWorld.js';

// The specimens the evidence grammar carries (states.mjs SPECIMEN, verbatim).
export const RAIL_SPECIMEN = {
  zanzibar: {
    place: 'WEST AFRICA', date: '1800s',
    fact: 'Shiploads of cheaper Zanzibar cowries collapsed the shell rate. Local savings, out-supplied.'
  }
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
  ]
};

// The cell each state is, for the landed-state proof and for anyone reading a
// frame and wanting the sheet's own name for it.
export const RAIL_CELL = {
  'the-function-stayed': ['s5-b1', 's5-b2', 's5-b3', 's5-b4', 's5-b5', 's5-b6', 's5-b7', 's5-b8'],
  'scarcity-in-matter': ['s6-b1', 's6-b2', null, null, null, null, null, 's6-b8', 's6-b9', 's6-b9-return'],
  'claims-on-gold': ['s7-b1', 's7-b2', 's7-b3', 's7-b4', 's7-b5']
};

// The build count the engine advances through — S6 stops at beat 9 even though
// the states array carries the return state past it.
export const RAIL_BUILDS = {
  'the-function-stayed': 7,
  'scarcity-in-matter': 8,
  'claims-on-gold': 4
};

// The one state that is not a build: S6's return seam, addressed by index.
export const S6_RETURN = 9;

export { RECEDE };
