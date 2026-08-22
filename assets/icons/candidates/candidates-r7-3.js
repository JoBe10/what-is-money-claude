// The R7.3 Icon Studio round — PROPOSALS ONLY. Nothing here is wired to the
// deck, and that is deliberate: this module has no importer in `src/`, and the
// contact sheet is built from it directly by
// `review/rebuild-r7-3/harness/glyph-studio-r7-3.cjs`. The presenter selects;
// applying a selection means copying its body into `candidates.js` and swapping
// one letter in `src/components/section-2/glyphs.js`.
//
// Why a round at all: the set has repeatedly read as "basic" to the presenter,
// and the diagnosis in the brief is exact — the marks are *silhouettes*. A
// silhouette says what a thing looks like. It does not say anything. So the bar
// this round is drawn to is one sentence:
//
//     Every candidate must carry one memorable formal idea — something a
//     viewer could describe in words after seeing it once — not a generic
//     outline of the object.
//
// Where the idea is available in the record, it is taken from the record: the
// ox-head that became the letter A, the Ethiopian salt bar that was literally
// currency, the Kissi penny, the cowrie string of forty, the milled edge that
// stopped clipping, the split tally that is the ancestor of every paper claim.
// A mark whose idea is historical is memorable twice: it looks like something
// and it *is* something.
//
// Same grammar as every prior round, unchanged: 48×48 grid, 40×40 live area,
// one 2.5u stroke, round caps and joins, dot terminals at stroke scale, open
// linework, monochrome via currentColor. Fills are banned except dots (r ≤ 2).
//
// Out of this round's scope, and named so the boundary is visible rather than
// silent: the 2.1–2.2 barter goods (fish, grain, sandals), Section 4's
// derivation marks (operation, shoe, meal, wine — R7.1's second round, and
// three of the four now appear as dark-field renders at their display
// surfaces), and `ledger`. The brief's parenthetical enumerates the set.

export const STROKE = 2.5;

const dot = (x, y, r = 1.8) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="currentColor" stroke="none"/>`;

export const R73_CANDIDATES = {
  // ---------------------------------------------------------------- CONTENDERS
  cattle: {
    a: {
      title: 'the aleph',
      idea: 'The ox head that became the letter A — the mark is the origin of the alphabet\'s first letter, and of "capital" from caput, head. A closed wedge head under two long horns, and no face: it is a letter, not a portrait.',
      body: `
        <path d="M14 20 L24 36 L34 20 Z"/>
        <path d="M14 20 C10 13 8 10 6 8"/>
        <path d="M34 20 C38 13 40 10 42 8"/>
        ${dot(6, 8)}${dot(42, 8)}`
    },
    b: {
      title: 'the counted head',
      idea: 'Cattle as the unit of account it actually was: one head above a four-and-a-slash tally. The animal is the number.',
      body: `
        <path d="M17 15 A7 7 0 0 0 31 15"/>
        <path d="M17 15 C13 10 10 8 8 7"/>
        <path d="M31 15 C35 10 38 8 40 7"/>
        <path d="M15 28 L15 40 M21 28 L21 40 M27 28 L27 40 M33 28 L33 40"/>
        <path d="M12 41 L36 27"/>
        ${dot(8, 7)}${dot(40, 7)}`
    },
    c: {
      title: 'the standing ox',
      idea: 'The whole animal in one line, which is the wound: a body cannot be divided and stay a body. Back, head, two legs, a tail that ends in a terminal.',
      body: `
        <path d="M11 21 L31 21 C36 21 39 24 39 28"/>
        <path d="M39 28 L33 28"/>
        <path d="M35 20 C37 15 39 13 41 12"/>
        <path d="M16 21 L16 37 M28 21 L28 37"/>
        <path d="M11 21 C8 25 8 30 10 34"/>
        ${dot(41, 12)}${dot(10, 34)}${dot(36, 24, 1.4)}`
    }
  },

  salt: {
    a: {
      title: 'the crystal cube',
      idea: 'Salt is a cube — its actual crystal habit, and the one fact about it a viewer can verify by looking at a salt grain. Drawn isometric, one visible near corner.',
      body: `
        <path d="M10 17 L24 10 L38 17 L24 24 Z"/>
        <path d="M10 17 L10 33 L24 40 L38 33 L38 17"/>
        <path d="M24 24 L24 40"/>
        ${dot(24, 10)}${dot(24, 40)}`
    },
    b: {
      title: 'the amoleh bar',
      idea: 'The Ethiopian salt bar, which circulated as money into the twentieth century: a tapered block with its binding cord. Salt as struck currency, not seasoning.',
      body: `
        <path d="M8 20 L40 16 L40 32 L8 28 Z"/>
        <path d="M20 18.5 L20 30 M28 17.5 L28 31"/>
        ${dot(8, 20)}${dot(8, 28)}`
    },
    c: {
      title: 'the dissolving block',
      idea: 'The wound drawn into the mark: a solid block whose lower edge has given way into falling grains. One storm and the money is water.',
      body: `
        <path d="M11 14 L37 14 L37 28"/>
        <path d="M11 14 L11 28"/>
        <path d="M11 28 C15 31 19 25 23 28 C27 31 31 25 35 28"/>
        ${dot(17, 36, 1.6)}${dot(25, 40, 1.6)}${dot(33, 35, 1.6)}`
    }
  },

  shells: {
    a: {
      title: 'the string of forty',
      idea: 'Cowries were counted, strung and traded in fixed strings — the shell was a denomination. Three shells threaded on one cord, the cord running out both sides.',
      body: `
        <path d="M5 24 L43 24"/>
        <path d="M12 24 A5 7 0 0 1 22 24 A5 7 0 0 1 12 24"/>
        <path d="M26 24 A5 7 0 0 1 36 24 A5 7 0 0 1 26 24"/>
        <path d="M17 18.5 L17 29.5 M31 18.5 L31 29.5"/>
        ${dot(5, 24)}${dot(43, 24)}`
    },
    b: {
      title: 'the shell in profile',
      idea: 'The cowrie as it sits on a table rather than as an outline seen from above: a domed back on a flat base, with the toothed opening running the length of it. The one view in which a cowrie can be nothing else.',
      body: `
        <path d="M9 32 C9 17 16 10 24 10 C32 10 39 17 39 32"/>
        <path d="M7 32 L41 32"/>
        <path d="M14 29 L14 35 M19 29 L19 35 M24 29 L24 35 M29 29 L29 35 M34 29 L34 35"/>
        ${dot(7, 32)}${dot(41, 32)}`
    },
    c: {
      title: 'the one ship',
      idea: 'The defeat in the mark, and the script says it out loud one build earlier — "you\'re about to see the ship arrive". A shell on the waterline with a sail already on the horizon.',
      body: `
        <path d="M6 34 L42 34"/>
        <path d="M11 34 C11 24 15 20 20 20 C25 20 29 24 29 34"/>
        <path d="M20 22 L20 34"/>
        <path d="M35 34 L35 12 L43 26 L35 26"/>
        ${dot(6, 34)}${dot(35, 12)}`
    }
  },

  iron: {
    a: {
      title: 'the kissi penny',
      idea: 'West Africa\'s iron money for two centuries: a rod with a flared ear at one end and a paddle foot at the other, and one twist in the shaft. An iron shape nothing else in the deck could be mistaken for.',
      body: `
        <path d="M24 11 L24 37"/>
        <path d="M16 8 C21 8 24 10 24 14 C24 10 27 8 32 8"/>
        <path d="M17 41 L24 37 L31 41"/>
        <path d="M20 22 C24 20 24 28 28 26"/>
        ${dot(16, 8)}${dot(32, 8)}`
    },
    b: {
      title: 'the struck bloom',
      idea: 'Iron is the metal anyone with a furnace can make more of, and the mark says how: a rough bloom under a hammer face, with the strike drawn as two sparks.',
      body: `
        <path d="M12 30 C12 24 17 20 24 20 C31 20 36 24 36 30 L36 34 L12 34 Z"/>
        <path d="M14 12 L34 12 L34 16 L14 16 Z"/>
        <path d="M24 16 L24 20"/>
        ${dot(17, 26, 1.5)}${dot(30, 26, 1.5)}${dot(24, 40, 1.6)}`
    },
    c: {
      title: 'the rusting bar',
      idea: 'The wound as the drawing: a bar whose underside has broken into rust — a continuous top edge and a bottom edge that has stopped being a line.',
      body: `
        <path d="M8 18 L40 18 L40 27"/>
        <path d="M8 18 L8 27"/>
        <path d="M8 27 L14 27 M19 27 L23 27 M28 27 L31 27 M36 27 L40 27"/>
        ${dot(16.5, 32, 1.5)}${dot(25.5, 33, 1.5)}${dot(33.5, 31, 1.5)}`
    }
  },

  // -------------------------------------------------------------- RAIL STOPS
  metals: {
    a: {
      title: 'the pour',
      idea: 'What makes the metals one family: they melt and re-form, and nothing else on the rail does. A crucible tipping a stream into an ingot mold — the property drawn as an action.',
      body: `
        <path d="M9 11 L23 15 L20 26 L10 23 Z"/>
        <path d="M20 25 C23 30 25 33 25 36"/>
        <path d="M13 36 L41 36 L37 44 L17 44 Z"/>
        ${dot(9, 11)}${dot(25, 36, 1.6)}`
    },
    b: {
      title: 'the family brace',
      idea: 'Three different metal shapes — ingot, rod, disc — gathered under one brace. The rail\'s METALS is a category, and this is the only candidate that draws a category.',
      body: `
        <path d="M7 26 L17 26 L15 34 L9 34 Z"/>
        <path d="M21 26 L27 26 L27 34 L21 34 Z"/>
        <path d="M36 30 A5 5 0 1 1 35.99 30"/>
        <path d="M6 20 C6 16 10 16 17 16 C21 16 24 15 24 12 C24 15 27 16 31 16 C38 16 42 16 42 20"/>
        ${dot(6, 20)}${dot(42, 20)}`
    },
    c: {
      title: 'the stacked faces',
      idea: 'The incumbent\'s stack, re-cut so the top bar is seen end-on: a stack that reads as depth instead of as three trapezoids in a row.',
      body: `
        <path d="M9 32 L19 32 L17 39 L11 39 Z"/>
        <path d="M29 32 L39 32 L37 39 L31 39 Z"/>
        <path d="M19 22 L29 22 L27 29 L21 29 Z"/>
        <path d="M19 22 L21 29 M29 22 L27 29"/>
        ${dot(24, 15, 1.6)}`
    }
  },

  gold: {
    a: {
      title: 'the touchstone streak',
      idea: 'How gold was verified for three thousand years, and the deck says so out loud two slides later: a tablet with one drawn streak. The mark is the test, not the metal.',
      body: `
        <path d="M12 8 L36 8 L36 40 L12 40 Z"/>
        <path d="M19 15 C21 22 25 28 30 33"/>
        ${dot(19, 15, 1.6)}${dot(30, 33, 1.6)}`
    },
    b: {
      title: 'the cast bar',
      idea: 'The object the deck\'s own dark-field study shows: a trapezoid bar in three-quarter view, with the top face open. The rail mark and the photograph become the same object.',
      body: `
        <path d="M10 22 L38 22 L42 34 L6 34 Z"/>
        <path d="M10 22 L16 14 L32 14 L38 22"/>
        ${dot(16, 14)}${dot(32, 14)}`
    },
    c: {
      title: 'the closed orbit',
      idea: 'Gold\'s one chemical fact, drawn: nothing joins it and nothing leaves. A ring with a centered dot and a second ring that does not touch — the noble shell.',
      body: `
        <path d="M24 13 A11 11 0 1 1 23.99 13"/>
        <path d="M9 24 A15 15 0 0 1 15 12"/>
        <path d="M39 24 A15 15 0 0 1 33 36"/>
        ${dot(24, 24, 2)}`
    }
  },

  coinage: {
    a: {
      title: 'the milled edge',
      idea: 'The invention that made a coin trustworthy — the reeding that shows at a glance whether anyone has clipped it. The ticks straddle the rim rather than radiate from it, so the mark is an edge and not a sun.',
      body: `
        <path d="M24 11 A13 13 0 1 1 23.99 11"/>
        <path d="M34 24 L40 24 M31.1 16.9 L35.3 12.7 M24 14 L24 8 M16.9 16.9 L12.7 12.7 M14 24 L8 24 M16.9 31.1 L12.7 35.3 M24 34 L24 40 M31.1 31.1 L35.3 35.3"/>`
    },
    b: {
      title: 'the two dies',
      idea: 'A coin is a blank between two authorities: the upper die, the lower die, and the metal that takes whatever they say. The strike is the gap.',
      body: `
        <path d="M12 8 L36 8 L36 14 L12 14 Z"/>
        <path d="M12 34 L36 34 L36 40 L12 40 Z"/>
        <path d="M15 24 A9 9 0 1 1 33 24 A9 9 0 1 1 15 24"/>
        ${dot(24, 24, 1.6)}`
    },
    c: {
      title: 'the incuse, deepened',
      idea: 'The incumbent\'s punch mark, re-cut as a struck square inside a rim with the punch\'s own corner burr — the oldest mint mark in the record, drawn as a mark rather than a shape.',
      body: `
        <path d="M24 10 A14 14 0 1 1 23.99 10"/>
        <path d="M17 17 L31 17 L31 31 L17 31 Z"/>
        <path d="M17 17 L31 31"/>
        ${dot(31, 17, 1.5)}${dot(17, 31, 1.5)}`
    }
  },

  paper: {
    a: {
      title: 'the split tally',
      idea: 'The ancestor of every paper claim: a stick split lengthwise so that the two halves must match, and neither is worth anything alone. The facing edges are complementary — the mark is a proof, not a note.',
      body: `
        <path d="M6 13 L42 13 L42 19 L36 22 L30 19 L24 22 L18 19 L12 22 L6 19 Z"/>
        <path d="M6 29 L12 26 L18 29 L24 26 L30 29 L36 26 L42 29 L42 35 L6 35 Z"/>
        ${dot(6, 16, 1.5)}${dot(6, 32, 1.5)}`
    },
    b: {
      title: 'the redeemable note',
      idea: 'The whole of the paper rung on one sheet: a note with a small circle drawn on it — the claim, and the thing it is a claim on, at two scales.',
      body: `
        <path d="M7 14 L41 14 L41 34 L7 34 Z"/>
        <path d="M24 24 A6 6 0 1 1 23.99 24"/>
        <path d="M12 19 L17 19 M12 29 L17 29 M31 19 L36 19 M31 29 L36 29"/>`
    },
    c: {
      title: 'the folded promise',
      idea: 'Paper\'s own property, drawn: it folds. A sheet with a turned corner and a ruled line, light enough to travel any distance a name can.',
      body: `
        <path d="M10 10 L32 10 L38 16 L38 38 L10 38 Z"/>
        <path d="M32 10 L32 16 L38 16"/>
        <path d="M16 24 L32 24 M16 30 L27 30"/>
        ${dot(32, 16, 1.5)}`
    }
  },

  fiat: {
    a: {
      title: 'the cancelled redemption',
      idea: '1971 in one mark: a note, the arrow down to what it was redeemable in, and the arrow struck out. What changed in the record was not the paper — it was the promise.',
      body: `
        <path d="M8 11 L40 11 L40 27 L8 27 Z"/>
        <path d="M24 29 L24 39"/>
        <path d="M19 34 L24 39 L29 34"/>
        <path d="M13 42 L35 30"/>`
    },
    b: {
      title: 'the free float',
      idea: 'The rail\'s own sentence, in the glyph: a note above a line it does not touch, with the anchor still drawn on the line beneath it.',
      body: `
        <path d="M11 10 L37 10 L37 24 L11 24 Z"/>
        <path d="M6 38 L42 38"/>
        <path d="M24 34 A4 4 0 1 1 23.99 34"/>
        ${dot(6, 38)}${dot(42, 38)}`
    },
    c: {
      title: 'the decree stamp',
      idea: 'Money by order: a sheet under an official bar-stamp, the stamp overrunning the sheet\'s own edge because it is not asking.',
      body: `
        <path d="M10 12 L38 12 L38 36 L10 36 Z"/>
        <path d="M5 20 L43 20 L43 28 L5 28 Z"/>
        ${dot(5, 24, 1.5)}${dot(43, 24, 1.5)}`
    }
  },

  bitcoin: {
    a: {
      title: 'the linked blocks',
      idea: 'The thing itself: three blocks, each carrying the one before it. The only mark in the set that draws what makes the supply fixed.',
      body: `
        <path d="M6 18 L18 18 L18 30 L6 30 Z"/>
        <path d="M23 18 L35 18 L35 30 L23 30 Z"/>
        <path d="M18 24 L23 24 M35 24 L40 24"/>
        <path d="M40 18 L44 18 L44 30 L40 30"/>
        ${dot(12, 24, 1.5)}${dot(29, 24, 1.5)}`
    },
    b: {
      title: 'the held key',
      idea: 'No counterparty, drawn: a key, with nothing to hand it to. The deck\'s whole claim about bitcoin is that holding it is direct, and a key is the only object that says so. Laid horizontally — upright it reads as a gender sign, which is the trap the iron round already fell into once.',
      body: `
        <path d="M6 24 A7 7 0 1 1 20 24 A7 7 0 1 1 6 24"/>
        <path d="M20 24 L42 24"/>
        <path d="M33 24 L33 32 M40 24 L40 30"/>
        ${dot(13, 24, 2)}`
    },
    c: {
      title: 'the struck ₿, re-cut',
      idea: 'The incumbent\'s universal mark with the strike carried through both lobes and terminals on the stems — the same sign, drawn in the set\'s hand rather than borrowed from a font.',
      body: `
        <path d="M15 12 L15 36"/>
        <path d="M15 12 L28 12 C33 12 35 15 35 18 C35 21 33 24 28 24 L15 24"/>
        <path d="M15 24 L29 24 C34 24 37 27 37 30 C37 33 34 36 29 36 L15 36"/>
        <path d="M21 6 L21 12 M28 6 L28 12 M21 36 L21 42 M28 36 L28 42"/>
        ${dot(21, 6, 1.5)}${dot(28, 6, 1.5)}${dot(21, 42, 1.5)}${dot(28, 42, 1.5)}`
    }
  },

  // --------------------------------------------------------------- FUNCTIONS
  'through-time': {
    a: {
      title: 'the carried value',
      idea: 'The function rather than the instrument: the same value at two points on one line, carried from the first to the second. A store of value is a thing that arrives unchanged — which is what the arc says and an hourglass does not.',
      body: `
        <path d="M6 34 L42 34"/>
        <path d="M6 31 L6 37 M42 31 L42 37"/>
        <path d="M11 30 C16 18 32 18 37 30"/>
        <path d="M37.2 24 L37 30 L32.6 26"/>
        ${dot(11, 34, 2.6)}${dot(37, 34, 2.6)}`
    },
    b: {
      title: 'the growth rings',
      idea: 'Growth rings — the oldest record of duration there is, and one every viewer has seen in a cut trunk. The centers are offset, as real rings are, which is also what keeps the mark from reading as a target.',
      body: `
        <path d="M24 12 A13 13 0 1 1 23.99 12"/>
        <path d="M26 17.5 A8.5 8.5 0 1 1 25.99 17.5"/>
        <path d="M27 23 A4 4 0 1 1 26.99 23"/>
        ${dot(27, 27, 1.8)}`
    },
    c: {
      title: 'the sealed vessel',
      idea: 'A lidded jar with the value suspended inside, not resting on the bottom: held, not stored away. The seal is what makes it a store.',
      body: `
        <path d="M14 15 L34 15"/>
        <path d="M16 15 C13 22 13 32 18 38 L30 38 C35 32 35 22 32 15"/>
        ${dot(14, 15)}${dot(34, 15)}${dot(24, 27, 2.6)}`
    }
  },

  'between-people': {
    a: {
      title: 'the crossing',
      idea: 'What a trade is: two paths that cross, each ending where the other began, with the good on the crossing point. No figures — the exchange itself.',
      body: `
        <path d="M8 14 C18 14 30 34 40 34"/>
        <path d="M8 34 C18 34 30 14 40 14"/>
        ${dot(8, 14)}${dot(40, 14)}${dot(8, 34)}${dot(40, 34)}${dot(24, 24, 2.4)}`
    },
    b: {
      title: 'the handoff',
      idea: 'One line rising out of a giver and another descending into a receiver, with the good at the apex, mid-pass. The medium of exchange is the only thing on this arch that touches both ends.',
      body: `
        <path d="M7 33 C14 33 18 21 24 21"/>
        <path d="M24 21 C30 21 34 33 41 33"/>
        ${dot(7, 33)}${dot(41, 33)}${dot(24, 21, 3)}`
    },
    c: {
      title: 'the two figures, re-cut',
      idea: 'The incumbent\'s pair, drawn as heads and shoulders that overlap — two people at one transaction rather than two people standing apart.',
      body: `
        <path d="M17 16 A5 5 0 1 1 16.99 16"/>
        <path d="M31 16 A5 5 0 1 1 30.99 16"/>
        <path d="M8 38 C8 30 12 26 17 26 C20 26 22 27 24 29"/>
        <path d="M40 38 C40 30 36 26 31 26 C28 26 26 27 24 29"/>
        ${dot(8, 38)}${dot(40, 38)}`
    }
  },

  measure: {
    a: {
      title: 'the repeated unit',
      idea: 'A unit of account is one thing that everything else is counted in: a long good above, and the same small unit laid three times to measure it. No axis, no bars — the grammar has rejected a bar chart twice already.',
      body: `
        <path d="M6 15 L42 15"/>
        <path d="M6 11 L6 19 M42 11 L42 19"/>
        <path d="M7 27 L18 27 L18 38 L7 38 Z"/>
        <path d="M18.5 27 L29.5 27 L29.5 38 L18.5 38 Z"/>
        <path d="M30 27 L41 27 L41 38 L30 38 Z"/>`
    },
    b: {
      title: 'the balance',
      idea: 'The oldest measuring instrument there is, and the only one that measures by comparison — which is what a price is.',
      body: `
        <path d="M24 10 L24 34"/>
        <path d="M10 16 L38 16"/>
        <path d="M4 18 C4 25 10 29 16 29 C10 29 4 25 4 18"/>
        <path d="M32 18 C32 25 38 29 44 29 C38 29 32 25 32 18"/>
        <path d="M10 16 L4 18 M38 16 L44 18"/>
        <path d="M17 38 L31 38"/>
        ${dot(24, 10, 1.6)}`
    },
    c: {
      title: 'the caliper',
      idea: 'The instrument that measures by *holding a thing between two marks* — a fixed jaw, a sliding one, and a scale between them. Price is what the slider reads.',
      body: `
        <path d="M5 28 L43 28"/>
        <path d="M11 28 L11 9"/>
        <path d="M31 28 L31 13"/>
        <path d="M27 28 L35 28 L35 35 L27 35 Z"/>
        <path d="M15 28 L15 23 M19 28 L19 25 M23 28 L23 23"/>
        ${dot(5, 28)}${dot(43, 28)}`
    }
  },

  // ------------------------------------------------------------------ STAGES
  collectible: {
    a: {
      title: 'the kept object',
      idea: 'The stage drawn as behavior: an object on a small plinth. It is not being used for anything — it is being kept, which is the entire definition.',
      body: `
        <path d="M24 12 A8 8 0 1 1 23.99 12"/>
        <path d="M14 34 L34 34"/>
        <path d="M17 34 L17 40 L31 40 L31 34"/>
        ${dot(14, 34, 1.5)}${dot(34, 34, 1.5)}`
    },
    b: {
      title: 'the one that is wanted',
      idea: 'Scarcity as the drawing: a field of like things, and one of them circled. At this stage nothing about the object matters except that it is the one people are after.',
      body: `
        <path d="M8 13 L13 13 M35 11 L40 11 M7 33 L12 33 M36 35 L41 35 M20 41 L25 41"/>
        <path d="M24 17 A7 7 0 1 1 23.99 17"/>
        ${dot(24, 24, 2.6)}`
    },
    c: {
      title: 'the cut stone, re-cut',
      idea: 'The incumbent\'s gem seen from above instead of in profile: a table facet with four corner cuts — the shape a stone is *made* into, which is what makes it collectible.',
      body: `
        <path d="M15 15 L33 15 L39 24 L33 33 L15 33 L9 24 Z"/>
        <path d="M15 15 L18 24 L15 33 M33 15 L30 24 L33 33"/>
        <path d="M18 24 L30 24"/>
        ${dot(9, 24, 1.5)}${dot(39, 24, 1.5)}`
    }
  },

  // ------------------------------------------------------------------- BRICK
  brick: {
    a: {
      title: 'the floor at a time',
      idea: 'The Argentine idiom exactly: a course with one gap still in it, and the next brick waiting directly above the gap it will fill. Saving in bricks is something you do a brick at a time.',
      body: `
        <path d="M4 30 L18 30 L18 40 L4 40 Z"/>
        <path d="M30 30 L44 30 L44 40 L30 40 Z"/>
        <path d="M18 30 L30 30 L30 40 L18 40"/>
        <path d="M17 10 L31 10 L31 20 L17 20 Z"/>`
    },
    b: {
      title: 'the single brick',
      idea: 'One brick in three-quarter view — face, end and top. The object rather than the wall, which is what a saver actually buys.',
      body: `
        <path d="M8 22 L30 22 L30 34 L8 34 Z"/>
        <path d="M30 22 L38 16 L38 28 L30 34"/>
        <path d="M8 22 L16 16 L38 16"/>
        ${dot(16, 16, 1.5)}`
    },
    c: {
      title: 'the rising storeys',
      idea: 'The building going up as the money comes in: three courses, each shorter than the one below, with the top course still open at its end.',
      body: `
        <path d="M6 36 L42 36 L42 42 L6 42 Z"/>
        <path d="M11 27 L37 27 L37 33 L11 33 Z"/>
        <path d="M16 18 L32 18 L32 24 L16 24"/>
        ${dot(16, 21, 1.5)}`
    }
  },

  // --------------------------------------------------------------- PALLADIUM
  palladium: {
    a: {
      title: 'the unreachable furnace',
      idea: 'Why palladium lost: a flame with a bar drawn above it that the flame does not reach. The metal that no ancient fire could work.',
      body: `
        <path d="M8 12 L40 12"/>
        <path d="M24 40 C16 36 14 28 20 22 C21 26 23 27 24 26 C23 20 27 16 30 14 C29 20 36 24 34 31 C33 36 29 39 24 40 Z"/>
        ${dot(8, 12)}${dot(40, 12)}`
    },
    b: {
      title: 'the locked ore',
      idea: 'The other half of the reason it lost: it hides in ores no ancient chemist could crack. A closed crystal with a bar driven straight through it and nothing opening.',
      body: `
        <path d="M24 7 L37 17 L32 37 L16 37 L11 17 Z"/>
        <path d="M6 24 L42 24"/>
        ${dot(6, 24)}${dot(42, 24)}`
    },
    c: {
      title: 'the spear of Pallas',
      idea: 'The 1803 sign the metal was named for, cut back to its spear and lozenge — the glyph carries its own discovery date, as gold carries its ancient sign.',
      body: `
        <path d="M24 6 L24 42"/>
        <path d="M18 12 L24 6 L30 12"/>
        <path d="M24 20 L32 27 L24 34 L16 27 Z"/>
        ${dot(24, 42, 1.6)}`
    }
  },

  // ------------------------------------------------------------ TABLE ASSETS
  'real-estate': {
    a: {
      title: 'the parcel',
      idea: 'What real estate legally is: a boundary with pins in its corners. Drawn off-square, the way a surveyed parcel actually sits — a rectangle would read as a card, and an axis would read as a chart.',
      body: `
        <path d="M9 15 L38 9 L42 33 L13 39 Z"/>
        ${dot(9, 15, 2.2)}${dot(38, 9, 2.2)}${dot(42, 33, 2.2)}${dot(13, 39, 2.2)}`
    },
    b: {
      title: 'the floors',
      idea: 'The asset as it is actually bought and let: floors on one spine. Also the Argentine brick idiom seen from the other end of the deck.',
      body: `
        <path d="M24 8 L24 40"/>
        <path d="M10 16 L38 16 M10 24 L38 24 M10 32 L38 32"/>
        <path d="M10 16 L10 32 M38 16 L38 32"/>
        ${dot(24, 8, 1.6)}`
    },
    c: {
      title: 'the land and the improvement',
      idea: 'The asset is two things at once and the mark says both: a plot boundary, and a building standing inside it. The incumbent draws only the building, which is the half that does not appreciate.',
      body: `
        <path d="M5 12 L43 12 L43 40 L5 40 Z"/>
        <path d="M16 32 L24 24 L32 32"/>
        <path d="M19 32 L19 36 L29 36 L29 32"/>
        ${dot(5, 12, 1.5)}${dot(43, 40, 1.5)}`
    }
  },

  shares: {
    a: {
      title: 'the lifted wedge',
      idea: 'A share is a piece taken out of a whole and held — so the wedge is drawn outside the circle it came from, with the gap left open.',
      body: `
        <path d="M24 10 A14 14 0 1 0 34 33.9"/>
        <path d="M24 10 L24 24 L34 33.9"/>
        <path d="M32 6 L42 15 L34 19 Z"/>
        ${dot(24, 24, 1.8)}`
    },
    b: {
      title: 'the claim on a flow',
      idea: 'What a share actually is — not a slice of a thing but a claim on what the thing produces. An enterprise on the ground, three streams leaving it, a holder at the end of each.',
      body: `
        <path d="M15 30 L33 30 L33 42 L15 42 Z"/>
        <path d="M19 30 L14 16 M24 30 L24 13 M29 30 L34 16"/>
        ${dot(14, 16, 2.2)}${dot(24, 13, 2.2)}${dot(34, 16, 2.2)}`
    },
    c: {
      title: 'the register entry',
      idea: 'A share is a line in a register, and the register is the asset: a ruled book page with one entry marked and a fraction bar beside it. Ownership you can only prove on paper.',
      body: `
        <path d="M9 9 L39 9 L39 39 L9 39 Z"/>
        <path d="M9 17 L39 17"/>
        <path d="M14 24 L34 24 M14 31 L34 31"/>
        <path d="M27 20.5 L31 20.5"/>
        ${dot(13, 24, 2.2)}`
    }
  }
};

export default R73_CANDIDATES;
