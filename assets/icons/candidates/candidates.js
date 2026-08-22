// The Icon Studio (R2.2 §D) — every candidate drawing for the WIM glyph
// set, three genuinely distinct constructions per glyph, all on the
// primitives grammar: the 48×48 grid (40×40 live area), one 2.5u stroke
// with round caps and joins, small dot terminals at stroke scale, open
// linework only — each good a minimal engraved mark, the way it might be
// stamped on an ancient coin or drawn as a constellation.
//
// This module is the source of truth for the drawings. The deck selects
// per glyph in `src/components/section-2/glyphs.js` (the SELECTIONS map) —
// swapping any selection is a one-letter change there, no redesign. The
// standalone .svg files beside this module and the contact sheet under
// `review/rebuild-r2/icon-studio/` are generated from it by
// `review/rebuild-r2/icon-studio/build-contact-sheet.mjs`.
//
// Fills are banned except dots at stroke scale (r ≤ 2): terminals r 1.8,
// detail dots (eyes, nostrils, grains, beads) r 1.4–2.

export const STROKE = 2.5;

const dot = (x, y, r = 1.8) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="currentColor" stroke="none"/>`;

export const CANDIDATES = {
  fish: {
    a: {
      title: 'the vesica',
      idea: 'Vesica body from two meeting arcs, nose right; open-chevron tail with dot terminals; one gill arc; stroke-scale eye.',
      body: `
        <path d="M13.5 24 C21 13.8 32.5 14.6 40 24 C32.5 33.4 21 34.2 13.5 24 Z"/>
        <path d="M13.5 24 L6 16.8 M13.5 24 L6 31.2"/>
        <path d="M31.8 17.6 C29.8 21.6 29.8 26.4 31.8 30.4"/>
        ${dot(6, 16.8)}${dot(6, 31.2)}${dot(33.8, 20.8, 1.6)}`
    },
    b: {
      title: 'the ichthys',
      idea: 'The carved two-arc fish: both arcs spring from the nose and cross at the tail — the oldest fish mark in the record, redrawn.',
      body: `
        <path d="M41 24 C31 9 14 11.5 6.5 30.5"/>
        <path d="M41 24 C31 39 14 36.5 6.5 17.5"/>
        ${dot(6.5, 30.5)}${dot(6.5, 17.5)}${dot(33.5, 20.5, 1.6)}`
    },
    c: {
      title: 'the skeleton',
      idea: 'Constellation fish: spine line, rib ticks, head arc, chevron tail — the fish as star-chart bones.',
      body: `
        <path d="M10 24 L34 24"/>
        <path d="M10 24 L5 18.5 M10 24 L5 29.5"/>
        <path d="M34 17.5 C41.5 19 41.5 29 34 30.5"/>
        <path d="M16 20 L16 28 M22 19.5 L22 28.5 M28 20 L28 28"/>
        ${dot(5, 18.5)}${dot(5, 29.5)}${dot(37.8, 22, 1.6)}`
    }
  },

  grain: {
    a: {
      title: 'the kernel arcs',
      idea: 'Wheat ear as open arcs: three mirrored kernel strokes sweeping off the stem, each ending in a dot terminal; awn leaning one unit.',
      body: `
        <path d="M24 44 L24 12"/>
        <path d="M24 12 C24 8.6 24.8 6 26.4 4"/>
        <path d="M24 20 C19.6 18.8 16.6 15.6 16.4 11.6 M24 20 C28.4 18.8 31.4 15.6 31.6 11.6"/>
        <path d="M24 28 C19.6 26.8 16.6 23.6 16.4 19.6 M24 28 C28.4 26.8 31.4 23.6 31.6 19.6"/>
        <path d="M24 36 C19.6 34.8 16.6 31.6 16.4 27.6 M24 36 C28.4 34.8 31.4 31.6 31.6 27.6"/>
        ${dot(26.4, 4)}${dot(16.4, 11.6)}${dot(31.6, 11.6)}${dot(16.4, 19.6)}${dot(31.6, 19.6)}${dot(16.4, 27.6)}${dot(31.6, 27.6)}`
    },
    b: {
      title: 'the constellation ear',
      idea: 'Dots as grains: a straight stem, short stalk ticks, and six grain dots in mirrored pairs — the ear drawn as stars.',
      body: `
        <path d="M24 44 L24 11"/>
        <path d="M24 11 L27 4.5"/>
        <path d="M24 16.5 L20 15 M24 16.5 L28 15"/>
        <path d="M24 24 L18.8 22.5 M24 24 L29.2 22.5"/>
        <path d="M24 31.5 L17.6 30 M24 31.5 L30.4 30"/>
        ${dot(27, 4.5)}${dot(18, 14.5, 2)}${dot(30, 14.5, 2)}${dot(16.8, 22, 2)}${dot(31.2, 22, 2)}${dot(15.6, 29.5, 2)}${dot(32.4, 29.5, 2)}`
    },
    c: {
      title: 'the bowed stalk',
      idea: 'Barley bowing under its own weight: one arced stalk, three awns fanning from the head, two grain dots at the neck.',
      body: `
        <path d="M12 44 C12 32 15 20 26 11"/>
        <path d="M26 11 L31 4 M28.5 13 L35.5 7.5 M30.5 15.5 L39 11.5"/>
        ${dot(31, 4)}${dot(35.5, 7.5)}${dot(39, 11.5)}${dot(23, 16, 1.6)}${dot(26.5, 19, 1.6)}`
    }
  },

  sandals: {
    a: {
      title: 'the outsole and thong',
      idea: 'One sandal, top view: footprint outsole (fuller outer edge, tapered heel) under the thong V, toe-post dot at the apex.',
      body: `
        <path d="M23.5 4.5 C30.5 4.5 34.4 9 34 15.5 C33.7 20.5 33 24.5 32.4 29 C31.8 34 30.9 38.6 28.5 41.6 C26.4 44.2 20.9 44.2 18.9 41.2 C17 38.2 16.4 33.5 16.2 29 C16 24.5 15 20.5 14.6 15.5 C14.1 9 16.5 4.5 23.5 4.5 Z"/>
        <path d="M17.5 26 L24 14.5 L30.5 26"/>
        ${dot(24, 14.2)}`
    },
    b: {
      title: 'the harness',
      idea: 'The sandal reduced to its straps: toe post with its dot, the V running back, the heel band closing the loop — no outsole at all.',
      body: `
        <path d="M24 7 L24 13"/>
        <path d="M24 13 L12.5 27 M24 13 L35.5 27"/>
        <path d="M12.5 27 C16 36.5 32 36.5 35.5 27"/>
        ${dot(24, 7, 2)}`
    },
    c: {
      title: 'the strapped sole',
      idea: 'The same footprint outsole crossed by three strap bars instead of the thong — the workaday sandal, banded.',
      body: `
        <path d="M23.5 4.5 C30.5 4.5 34.4 9 34 15.5 C33.7 20.5 33 24.5 32.4 29 C31.8 34 30.9 38.6 28.5 41.6 C26.4 44.2 20.9 44.2 18.9 41.2 C17 38.2 16.4 33.5 16.2 29 C16 24.5 15 20.5 14.6 15.5 C14.1 9 16.5 4.5 23.5 4.5 Z"/>
        <path d="M17.2 14.5 L31 14.5 M17.8 22 L30.8 22 M19 29.5 L29.6 29.5"/>`
    }
  },

  cattle: {
    a: {
      title: 'the lyre head',
      idea: 'Front-on: lyre horns with dot-terminal tips, the head narrowing to the muzzle, nostrils at stroke scale. The silhouette is the animal.',
      body: `
        <path d="M17.5 15.5 C11.5 15 7.6 10.6 8.6 4.6"/>
        <path d="M30.5 15.5 C36.5 15 40.4 10.6 39.4 4.6"/>
        <path d="M17.5 15.5 C15.6 20 15.6 25.2 18 29.6 C20 33.4 21.9 35.6 24 35.6 C26.1 35.6 28 33.4 30 29.6 C32.4 25.2 32.4 20 30.5 15.5 C28.4 13.7 19.6 13.7 17.5 15.5 Z"/>
        ${dot(8.6, 4.6)}${dot(39.4, 4.6)}${dot(21.7, 30.6, 1.6)}${dot(26.3, 30.6, 1.6)}`
    },
    b: {
      title: 'the bucranium',
      idea: 'The ox-skull mark ancient coins actually carried: one wide horn-brow sweep, the hanging muzzle, nostril dots.',
      body: `
        <path d="M6.5 12 C6.5 21 13 25.5 19 25.5 L29 25.5 C35 25.5 41.5 21 41.5 12"/>
        <path d="M17.5 25.5 C16.5 34 19.5 40.5 24 40.5 C28.5 40.5 31.5 34 30.5 25.5"/>
        ${dot(6.5, 12)}${dot(41.5, 12)}${dot(21, 34.5, 1.6)}${dot(27, 34.5, 1.6)}`
    },
    c: {
      title: 'the horn constellation',
      idea: 'Brow line, two horn arcs with dot tips, eye dots, chin arc — the head implied entirely by its stars.',
      body: `
        <path d="M15 19 L33 19"/>
        <path d="M15 19 C8 17.5 5.5 10 9 4.5"/>
        <path d="M33 19 C40 17.5 42.5 10 39 4.5"/>
        <path d="M19 33.5 C20.5 38.5 27.5 38.5 29 33.5"/>
        ${dot(9, 4.5)}${dot(39, 4.5)}${dot(18.5, 26)}${dot(29.5, 26)}`
    }
  },

  salt: {
    a: {
      title: 'the crystal facet',
      idea: 'Halite flat-on: the diamond facet with a single grain dot at its center — no isometric box, no false depth.',
      body: `
        <path d="M24 6.5 L41 24 L24 41.5 L7 24 Z"/>
        ${dot(24, 24, 2)}`
    },
    b: {
      title: 'the heap',
      idea: 'The measured pile on its ground line, three grain dots falling onto it — salt as the poured, pinched, spent good.',
      body: `
        <path d="M7 38.5 L41 38.5"/>
        <path d="M11.5 38.5 C15.5 28 19.5 24 24 24 C28.5 24 32.5 28 36.5 38.5"/>
        ${dot(24, 9, 2)}${dot(19.5, 15.5, 2)}${dot(28.5, 15.5, 2)}`
    },
    c: {
      title: 'the crystal cluster',
      idea: 'Three halite facets heaped together — one large, two small — the pile drawn as its own crystals.',
      body: `
        <path d="M24 17 L32.5 25.5 L24 34 L15.5 25.5 Z"/>
        <path d="M12 25.5 L17.5 31 L12 36.5 L6.5 31 Z"/>
        <path d="M36 25.5 L41.5 31 L36 36.5 L30.5 31 Z"/>`
    }
  },

  shells: {
    a: {
      title: 'the cowrie',
      idea: 'The money shell, top view: egg outline, S-curved aperture, four tooth ticks crossing it.',
      body: `
        <path d="M24 5.5 C33.5 5.5 39 13 39 23.5 C39 34.5 33 42.5 24 42.5 C15 42.5 9 34.5 9 23.5 C9 13 14.5 5.5 24 5.5 Z"/>
        <path d="M24 11 C22.4 15.6 22.4 19.8 24 24 C25.6 28.2 25.6 32.4 24 37"/>
        <path d="M20.8 14.6 L25.4 15 M20.6 21 L25.2 21.3 M22.8 26.7 L27.4 27 M22.6 33 L27.2 33.4"/>`
    },
    b: {
      title: 'the aperture',
      idea: 'The cowrie reduced to its mouth: two lip arcs, the S between them, tooth ticks, dot terminals — the part that names the shell.',
      body: `
        <path d="M17.5 9.5 C14 16 14 32 17.5 38.5"/>
        <path d="M30.5 9.5 C34 16 34 32 30.5 38.5"/>
        <path d="M24 6.5 C22 13 22 18.5 24 24 C26 29.5 26 35 24 41.5"/>
        <path d="M20.6 13.5 L25.2 14 M20.4 20 L25 20.4 M22.8 26.5 L27.4 26.9 M22.6 32.8 L27.2 33.2"/>
        ${dot(24, 6.5)}${dot(24, 41.5)}`
    },
    c: {
      title: 'the scallop fan',
      idea: 'Fan construction: rays from a hinge dot to a rim arc — the shell as radiating lines.',
      body: `
        <path d="M18 39 L30 39"/>
        <path d="M24 38.5 L7.5 17 M24 38.5 L15 9.5 M24 38.5 L24 7 M24 38.5 L33 9.5 M24 38.5 L40.5 17"/>
        <path d="M7.5 17 C12 10.5 17.5 7 24 7 C30.5 7 36 10.5 40.5 17"/>
        ${dot(24, 41.8, 2)}`
    }
  },

  iron: {
    a: {
      title: 'the flat ingot',
      idea: 'The cast bar face-on: one trapezoid with a row of three rivet dots — no receding faces, no perspective.',
      body: `
        <path d="M7.5 32.5 L13 17.5 L35 17.5 L40.5 32.5 Z"/>
        ${dot(17, 25, 1.6)}${dot(24, 25, 1.6)}${dot(31, 25, 1.6)}`
    },
    b: {
      title: 'the iron mark',
      idea: 'The alchemical sign for iron redrawn in the grammar: the circle and the angled arrow — the metal named by its oldest symbol.',
      body: `
        <path d="M19.5 38.5 C25 38.5 29.5 34 29.5 28.5 C29.5 23 25 18.5 19.5 18.5 C14 18.5 9.5 23 9.5 28.5 C9.5 34 14 38.5 19.5 38.5 Z"/>
        <path d="M26.8 21.2 L38 10"/>
        <path d="M30.5 10 L38 10 L38 17.5"/>`
    },
    c: {
      title: 'the bloom',
      idea: 'Raw ore before the cast: an arc-built lump carrying two strike hatches — iron as it comes out of the furnace.',
      body: `
        <path d="M13.5 34.5 C8 31 8.5 21.5 15 16.5 C21 11.5 32 12 37 18.5 C41.5 24.5 39.5 31.5 33.5 34.5 C27 37.5 19 37.5 13.5 34.5 Z"/>
        <path d="M17.5 21.5 L23.5 27.5 M25 18.5 L31 24.5"/>`
    }
  },

  metals: {
    a: {
      title: 'the stack',
      idea: 'The family: three flat ingots of iron’s trapezoid, stacked two-and-one, all face-on.',
      body: `
        <path d="M4.5 41 L8.5 32 L20 32 L23.5 41 Z"/>
        <path d="M24.5 41 L28 32 L39.5 32 L43.5 41 Z"/>
        <path d="M14.5 30 L18 21 L30 21 L33.5 30 Z"/>`
    },
    b: {
      title: 'the bars',
      idea: 'The stack edge-on: three bars narrowing upward, dot terminals at every end — the hoard as constellation.',
      body: `
        <path d="M9.5 38 L38.5 38"/>
        <path d="M13.5 30 L34.5 30"/>
        <path d="M17.5 22 L30.5 22"/>
        ${dot(9.5, 38)}${dot(38.5, 38)}${dot(13.5, 30)}${dot(34.5, 30)}${dot(17.5, 22)}${dot(30.5, 22)}`
    },
    c: {
      title: 'the ziggurat',
      idea: 'The whole family in one stepped contour: two courses of ingots merged into a single engraved outline.',
      body: `
        <path d="M6 39.5 L10 31 L16.5 31 L20 22.5 L28 22.5 L31.5 31 L38 31 L42 39.5 Z"/>`
    }
  },

  gold: {
    a: {
      title: 'the planchet',
      idea: 'The unmarked round: a blank planchet with one inner luster arc — deliberately not yet a struck coin.',
      body: `
        <circle cx="24" cy="24.5" r="16"/>
        <path d="M14.6 19.6 C16.2 15.4 19.7 12.6 24 12"/>`
    },
    b: {
      title: 'the sun mark',
      idea: 'The alchemical sign for gold: the circle with its center dot — the round that needs no stamp to be itself.',
      body: `
        <circle cx="24" cy="24" r="15.5"/>
        ${dot(24, 24, 2)}`
    },
    c: {
      title: 'the nugget',
      idea: 'Native gold before the melt: a faceted lump with two facet lines meeting at a point of light.',
      body: `
        <path d="M13 31 L16 15.5 L29.5 11.5 L38 21.5 L33.5 34.5 L19 36.5 Z"/>
        <path d="M16 15.5 L25.5 23 L29.5 11.5"/>`
    }
  },

  coinage: {
    a: {
      title: 'the incuse square',
      idea: 'Gold’s round taking the stamp: the quadratum incusum, the first mint mark in the record.',
      body: `
        <circle cx="24" cy="24" r="15.5"/>
        <path d="M24 17.5 L30.5 24 L24 30.5 L17.5 24 Z"/>`
    },
    b: {
      title: 'the strike',
      idea: 'The die landing: four radial ticks and a center dot inside the round — the moment of coining, not its result.',
      body: `
        <circle cx="24" cy="24" r="15.5"/>
        <path d="M24 14.5 L24 19 M24 29 L24 33.5 M14.5 24 L19 24 M29 24 L33.5 24"/>
        ${dot(24, 24)}`
    },
    c: {
      title: 'the beaded rim',
      idea: 'The struck coin’s oldest ornament: the round carrying its ring of rim beads — dots as bead-knots.',
      body: `
        <circle cx="24" cy="24" r="15.5"/>
        ${dot(35, 24, 1.5)}${dot(31.78, 31.78, 1.5)}${dot(24, 35, 1.5)}${dot(16.22, 31.78, 1.5)}${dot(13, 24, 1.5)}${dot(16.22, 16.22, 1.5)}${dot(24, 13, 1.5)}${dot(31.78, 16.22, 1.5)}`
    }
  },

  paper: {
    a: {
      title: 'the folded note',
      idea: 'The note with one corner folded: the fold breaks the app-icon rectangle; the medallion ring sits off-center.',
      body: `
        <path d="M8.5 14 L32.5 14 L39.5 21 L39.5 34 L8.5 34 Z"/>
        <path d="M32.5 14 L32.5 21 L39.5 21"/>
        <circle cx="19" cy="24" r="4.25"/>`
    },
    b: {
      title: 'the deed',
      idea: 'The claim as document: upright sheet, two script lines, the issuer’s seal ring below — paper as promise, not as bill.',
      body: `
        <path d="M13.5 6.5 L34.5 6.5 L34.5 41.5 L13.5 41.5 Z"/>
        <path d="M18.5 15 L29.5 15 M18.5 21 L29.5 21"/>
        <circle cx="24" cy="31.5" r="3.4"/>`
    },
    c: {
      title: 'the counterfoil',
      idea: 'The note torn from its stub: a zigzag tear for a left edge — every claim check implies the ledger it was cut from.',
      body: `
        <path d="M40.5 14 L16 14 L13 18 L16 22 L13 26 L16 30 L13 34 L40.5 34 Z"/>
        <circle cx="29" cy="24" r="4.25"/>`
    }
  },

  fiat: {
    a: {
      title: 'the severed tether',
      idea: 'The note floating over its own broken anchor line — the claim layer with the cut drawn in, designed for the severance state.',
      body: `
        <path d="M10.5 11.5 L37.5 11.5 L37.5 29.5 L10.5 29.5 Z"/>
        <circle cx="24" cy="20.5" r="4"/>
        <path d="M24 33.5 L24 37.5 M24 41.5 L24 44.5"/>`
    },
    b: {
      title: 'the drift',
      idea: 'The note caught mid-float: the rectangle let go of its grid, skewed as if sliding on air — unanchored by construction.',
      body: `
        <path d="M11.5 13.5 L40.5 9.5 L36.5 34.5 L7.5 38.5 Z"/>
        <circle cx="24" cy="24" r="4"/>`
    },
    c: {
      title: 'the empty seal',
      idea: 'Paper’s contents with the paper removed: seal ring and script lines floating with no sheet under them — the note without backing.',
      body: `
        <circle cx="24" cy="15" r="4.5"/>
        <path d="M14 27 L34 27 M17 33.5 L31 33.5"/>`
    }
  },

  // ----- The R3 extension (Section 3: functions, stages, the Argentina
  // triad, palladium, and the ladder/layer marks). Function and stage marks
  // prefer constellation constructions — dots and lines over pictographs —
  // per the grammar headroom note; palladium carries its own sign the way
  // gold does; dollar and bitcoin share the struck-mark treatment. -----

  'through-time': {
    a: {
      title: 'the hourglass',
      idea: 'Time’s own instrument, flat-on: two open chambers at a waist, grain dots falling through — the good passing intact from now to later.',
      body: `
        <path d="M14.5 6.5 L33.5 6.5"/>
        <path d="M14.5 41.5 L33.5 41.5"/>
        <path d="M16 6.5 C16 15 21.8 18.6 21.8 24 C21.8 29.4 16 33 16 41.5"/>
        <path d="M32 6.5 C32 15 26.2 18.6 26.2 24 C26.2 29.4 32 33 32 41.5"/>
        ${dot(24, 28.5, 1.5)}${dot(24, 33, 1.5)}${dot(24, 37.5, 1.5)}`
    },
    b: {
      title: 'the vessel',
      idea: 'The granary jar: an open amphora holding three grain dots — value parked on purpose, the store drawn as what a store is.',
      body: `
        <path d="M17 7 L31 7"/>
        <path d="M17.5 7 C17.5 13 14 16.5 14 24.5 C14 33.5 18.5 40.5 24 40.5 C29.5 40.5 34 33.5 34 24.5 C34 16.5 30.5 13 30.5 7"/>
        ${dot(20.8, 29, 1.6)}${dot(27.2, 29, 1.6)}${dot(24, 34, 1.6)}`
    },
    c: {
      title: 'the horizon arc',
      idea: 'Constellation: a timeline with two moments ticked, one arc carrying a dot from the first to the second — value in flight across time.',
      body: `
        <path d="M6 35 L42 35"/>
        <path d="M10 35 L10 30 M38 35 L38 30"/>
        <path d="M10 30 C15 12 33 12 38 30"/>
        ${dot(10, 30)}${dot(38, 30)}${dot(24, 16.5, 2)}`
    }
  },

  'between-people': {
    a: {
      title: 'the exchange arcs',
      idea: 'Two person-dots joined by opposing travel arcs, a value dot riding each apex — the discovery slide’s trade routes compressed to a mark.',
      body: `
        <path d="M10 20.5 C17 10.5 31 10.5 38 20.5"/>
        <path d="M38 27.5 C31 37.5 17 37.5 10 27.5"/>
        ${dot(7.5, 24, 2)}${dot(40.5, 24, 2)}${dot(24, 13, 1.6)}${dot(24, 35, 1.6)}`
    },
    b: {
      title: 'the two figures',
      idea: 'Two minimal figures — head ring, shoulder arc — facing each other across one value dot; the trade drawn as the people it moves between.',
      body: `
        <circle cx="12.5" cy="15.5" r="4.2"/>
        <path d="M5.5 34 C5.5 25.5 19.5 25.5 19.5 34"/>
        <circle cx="35.5" cy="15.5" r="4.2"/>
        <path d="M28.5 34 C28.5 25.5 42.5 25.5 42.5 34"/>
        ${dot(24, 24, 2)}`
    },
    c: {
      title: 'the facing chevrons',
      idea: 'Give and take reduced to geometry: two chevrons pointing at one another, the value dot held at the meeting point.',
      body: `
        <path d="M8 14.5 L17.5 24 L8 33.5"/>
        <path d="M40 14.5 L30.5 24 L40 33.5"/>
        ${dot(24, 24, 2)}`
    }
  },

  measure: {
    a: {
      title: 'the beam balance',
      idea: 'The oldest instrument of monetary measure: post, beam, two hanging pans — value weighed, not guessed.',
      body: `
        <path d="M24 13 L24 40"/>
        <path d="M17 40 L31 40"/>
        <path d="M10 13 L38 13"/>
        <path d="M10 13 L10 22.5 M38 13 L38 22.5"/>
        <path d="M4.5 22.5 C7 28 13 28 15.5 22.5"/>
        <path d="M32.5 22.5 C35 28 41 28 43.5 22.5"/>
        ${dot(24, 13)}${dot(10, 22.5, 1.5)}${dot(38, 22.5, 1.5)}`
    },
    b: {
      title: 'the graduated rule',
      idea: 'The measuring stick of value itself: a baseline with alternating graduations, one good-dot held against the scale.',
      body: `
        <path d="M5 30 L43 30"/>
        <path d="M10 30 L10 22 M16.5 30 L16.5 25.5 M23 30 L23 22 M29.5 30 L29.5 25.5 M36 30 L36 22"/>
        ${dot(5, 30, 1.5)}${dot(43, 30, 1.5)}${dot(23, 17, 2)}`
    },
    c: {
      title: 'the dividers',
      idea: 'Drafting dividers spanning a dimension: hinge dot at the apex, two legs, the measured chord drawn between their tips.',
      body: `
        <path d="M24 8 L13 36 M24 8 L35 36"/>
        <path d="M13 36 C17 32.5 31 32.5 35 36"/>
        ${dot(24, 8, 2)}${dot(13, 36)}${dot(35, 36)}`
    }
  },

  collectible: {
    a: {
      title: 'the strung beads',
      idea: 'Three bead dots threaded on a sagging strand — shells and beads, the first goods held for their own strange reasons.',
      body: `
        <path d="M7 18 C13 30 35 30 41 18"/>
        ${dot(15, 24.4, 2)}${dot(24, 27, 2)}${dot(33, 24.4, 2)}
        ${dot(7, 18, 1.4)}${dot(41, 18, 1.4)}`
    },
    b: {
      title: 'the kept shelf',
      idea: 'A shelf line holding three small treasures of different sizes under a sheltering arc — a few things, kept because somebody cares.',
      body: `
        <path d="M8 33 L40 33"/>
        <path d="M11 17.5 C16 12.5 32 12.5 37 17.5"/>
        ${dot(15, 30.6, 1.5)}${dot(24, 30.2, 2)}${dot(33, 30.6, 1.7)}`
    },
    c: {
      title: 'the cut stone',
      idea: 'A faceted gem, flat-on: crown, girdle line, pavilion point — the scarce, interesting object before it is anyone’s money.',
      body: `
        <path d="M16.5 10.5 L31.5 10.5 L38.5 19 L24 39 L9.5 19 Z"/>
        <path d="M9.5 19 L38.5 19"/>
        ${dot(24, 14.8, 1.5)}`
    }
  },

  palladium: {
    a: {
      title: 'the Pallas mark',
      idea: 'The sign of the asteroid Pallas — lozenge on a crossed stem — the sign palladium was named for in 1803; the glyph carries the beat’s own date.',
      body: `
        <path d="M24 6 L31 15 L24 24 L17 15 Z"/>
        <path d="M24 24 L24 42"/>
        <path d="M17.5 33 L30.5 33"/>
        ${dot(24, 42)}`
    },
    b: {
      title: 'the assay ingot',
      idea: 'The metals-family trapezoid with an assay scratch instead of iron’s rivets — the metal perpetually tested, never crowned.',
      body: `
        <path d="M14 17 L34 17 L38 31 L10 31 Z"/>
        <path d="M20.5 21.5 L27.5 26.5"/>
        ${dot(20.5, 21.5, 1.4)}${dot(27.5, 26.5, 1.4)}`
    },
    c: {
      title: 'the satellite round',
      idea: 'The round family answered: gold’s circle with its center empty, a small dot riding outside the rim — the metal that orbits the throne.',
      body: `
        <circle cx="24" cy="26" r="14"/>
        ${dot(37.5, 9.5, 2)}`
    }
  },

  dollar: {
    a: {
      title: 'the struck $',
      idea: 'The universal mark whole, in the set’s stroke: one through-struck stem carrying the S, dot terminals at stem and curve ends.',
      body: `
        <path d="M24 5.5 L24 42.5"/>
        <path d="M32.5 13.5 C30 10.5 20.5 9.5 17 13 C13.5 16.8 17 20.8 24 23 C31 25.2 34.5 29 31 33.5 C27.5 37.8 18 37 15.5 34"/>
        ${dot(24, 5.5)}${dot(24, 42.5)}${dot(32.5, 13.5, 1.5)}${dot(15.5, 34, 1.5)}`
    },
    b: {
      title: 'the double strike',
      idea: 'The older two-stem form, the stems run full height the way the bitcoin candidate’s do — the S carried on a double strike.',
      body: `
        <path d="M20.5 5.5 L20.5 42.5 M27.5 5.5 L27.5 42.5"/>
        <path d="M32.5 13.5 C30 10.5 20.5 9.5 17 13 C13.5 16.8 17 20.8 24 23 C31 25.2 34.5 29 31 33.5 C27.5 37.8 18 37 15.5 34"/>
        ${dot(20.5, 5.5)}${dot(27.5, 5.5)}${dot(20.5, 42.5)}${dot(27.5, 42.5)}`
    },
    c: {
      title: 'the coin S',
      idea: 'The milled round carrying the bare S — the dollar as coin rather than letterform, no stem at all.',
      body: `
        <circle cx="24" cy="24" r="15.5"/>
        <path d="M29.5 17.5 C27.5 15.5 21 15 18.5 17.5 C16 20.5 19.5 23 24 24 C28.5 25 32 27.5 29.5 30.5 C27 33 20.5 32.5 18.5 30.5"/>
        ${dot(29.5, 17.5, 1.4)}${dot(18.5, 30.5, 1.4)}`
    }
  },

  peso: {
    a: {
      title: 'the sol de mayo',
      idea: 'The sun from Argentina’s first peso coinage of 1813: an open ring under eight rays, cardinal tips dotted — the coin’s own face, no gold-mark center dot.',
      body: `
        <circle cx="24" cy="24" r="8"/>
        <path d="M24 9 L24 13 M24 35 L24 39 M9 24 L13 24 M35 24 L39 24"/>
        <path d="M13.4 13.4 L16.2 16.2 M31.8 31.8 L34.6 34.6 M34.6 13.4 L31.8 16.2 M16.2 31.8 L13.4 34.6"/>
        ${dot(24, 9, 1.4)}${dot(24, 39, 1.4)}${dot(9, 24, 1.4)}${dot(39, 24, 1.4)}`
    },
    b: {
      title: 'the piece of eight',
      idea: 'The peso’s ancestor, the real de a ocho: the numeral eight as two open rounds, struck through once by the assayer’s line.',
      body: `
        <circle cx="24" cy="15" r="7"/>
        <circle cx="24" cy="31.5" r="8.5"/>
        <path d="M33.5 7 L14.5 41"/>
        ${dot(33.5, 7, 1.5)}${dot(14.5, 41, 1.5)}`
    },
    c: {
      title: 'the struck P',
      idea: 'The abbreviation that named the sign: a P with one horizontal strike, dot terminals — the peso as letterform.',
      body: `
        <path d="M18 42 L18 7 L28 7 C33.5 7 36.5 10.5 36.5 15 C36.5 19.5 33.5 23 28 23 L18 23"/>
        <path d="M12.5 15 L23 15"/>
        ${dot(18, 42)}${dot(12.5, 15, 1.5)}`
    }
  },

  brick: {
    a: {
      title: 'the coursing',
      idea: 'A wall fragment as pure line: three course lines, head joints staggered bond-wise between them — brickwork with no filled shape.',
      body: `
        <path d="M8 16 L40 16 M8 24 L40 24 M8 32 L40 32"/>
        <path d="M18 16 L18 24 M30 16 L30 24"/>
        <path d="M12 24 L12 32 M24 24 L24 32 M36 24 L36 32"/>`
    },
    b: {
      title: 'the floor by floor',
      idea: 'The savings building mid-rise: walls, two finished floor lines, and the top floor left open — bought floor by floor as the money comes in.',
      body: `
        <path d="M9 41 L39 41"/>
        <path d="M13 41 L13 13 M35 41 L35 13"/>
        <path d="M13 22.5 L35 22.5 M13 32 L35 32"/>
        <path d="M13 13 L20 13 M28 13 L35 13"/>
        ${dot(20, 13, 1.4)}${dot(28, 13, 1.4)}`
    },
    c: {
      title: 'the bonded pair',
      idea: 'One brick on two — the smallest true bond: three course edges, the middle one running long, joints closing the courses.',
      body: `
        <path d="M12 20.5 L36 20.5"/>
        <path d="M7 28.5 L41 28.5"/>
        <path d="M12 36.5 L36 36.5"/>
        <path d="M12 20.5 L12 28.5 M36 20.5 L36 28.5"/>
        <path d="M24 28.5 L24 36.5"/>`
    }
  },

  gate: {
    a: {
      title: 'the gateposts',
      idea: 'Two upright posts with capped tips, straddling the climb line — a gate stands vertical even on a slope; passage is between them.',
      body: `
        <path d="M19.5 14.5 L19.5 33.5"/>
        <path d="M28.5 14.5 L28.5 33.5"/>
        ${dot(19.5, 14.5, 1.6)}${dot(28.5, 14.5, 1.6)}`
    },
    b: {
      title: 'the arch',
      idea: 'A single arch bridging the line — the stage passed under, footed with dot terminals.',
      body: `
        <path d="M14.5 31 C14.5 16.5 33.5 16.5 33.5 31"/>
        ${dot(14.5, 31)}${dot(33.5, 31)}`
    },
    c: {
      title: 'the climb chevron',
      idea: 'One chevron pointing up the ladder, apex dotted — the next stage unlocked, direction drawn as the mark itself.',
      body: `
        <path d="M15.5 30.5 L24 17.5 L32.5 30.5"/>
        ${dot(24, 17.5, 1.6)}`
    }
  },

  tie: {
    a: {
      title: 'the plumb drop',
      idea: 'A vertical tether ending in its bob — the upper layer hanging its weight on the one below.',
      body: `
        <path d="M24 8 L24 34"/>
        ${dot(24, 8, 1.5)}${dot(24, 36.5, 2)}`
    },
    b: {
      title: 'the counterfoil jog',
      idea: 'The tether with the counterfoil’s tear drawn into it: a Z-jog mid-line — the link that is a redeemable slip, in the paper family’s language.',
      body: `
        <path d="M24 8.5 L24 19 L19.5 22.5 L28.5 25.5 L24 29 L24 39.5"/>
        ${dot(24, 8.5, 1.5)}${dot(24, 39.5, 1.5)}`
    },
    c: {
      title: 'the hook and eye',
      idea: 'A J-hook reaching down from the upper layer toward the eye-dot beneath — the layer holds the base, it does not stand on its own.',
      body: `
        <path d="M24 8 L24 26 C24 31.5 16.5 31.5 16.5 26.5"/>
        ${dot(24, 8, 1.5)}${dot(24, 38, 2)}`
    }
  },

  bitcoin: {
    a: {
      title: 'the struck ₿',
      idea: 'The symbol redrawn whole in the set’s stroke: stem, two bowls, and the four protruding strokes ending in dot terminals.',
      body: `
        <path d="M17.5 10 L17.5 38"/>
        <path d="M17.5 10 L26 10 C30.8 10 33.2 12.4 33.2 16.4 C33.2 20.4 30.4 23 26 23 L17.5 23"/>
        <path d="M17.5 23 L27 23 C32 23 34.8 25.6 34.8 30.2 C34.8 34.8 31.6 38 27 38 L17.5 38"/>
        <path d="M21 10 L21 5 M25.5 10 L25.5 5 M21 38 L21 43 M25.5 38 L25.5 43"/>
        ${dot(21, 5)}${dot(25.5, 5)}${dot(21, 43)}${dot(25.5, 43)}`
    },
    b: {
      title: 'the double strike',
      idea: 'The mark reduced to its two through-struck verticals carrying the bowls — the strokes run the full height, dots at all four ends.',
      body: `
        <path d="M21 4.5 L21 43.5 M26.5 4.5 L26.5 43.5"/>
        <path d="M21 10.5 L25 10.5 C29.8 10.5 32.3 13 32.3 16.7 C32.3 20.3 29.5 23 25 23 L21 23"/>
        <path d="M21 23 L26 23 C31 23 33.7 25.7 33.7 30.2 C33.7 34.7 30.5 37.5 26 37.5 L21 37.5"/>
        ${dot(21, 4.5)}${dot(26.5, 4.5)}${dot(21, 43.5)}${dot(26.5, 43.5)}`
    },
    c: {
      title: 'the constellation ₿',
      idea: 'Spine and two open bowl arcs, with the four protrusions left as unconnected dots — the symbol implied, star-chart style.',
      body: `
        <path d="M17.5 9.5 L17.5 38.5"/>
        <path d="M17.5 10.5 C28 8.5 33 12.5 32.5 17 C32 20.8 28 22.8 17.5 23"/>
        <path d="M17.5 23 C29.5 22.2 35 26.5 34.4 31 C33.8 35.5 29 38.3 17.5 38"/>
        ${dot(21, 5)}${dot(26, 5)}${dot(21, 43)}${dot(26, 43)}`
    }
  },

  // ----- The R7 extension: the comparison set's two productive assets and
  // the ledger the claim/carrier lineage needs, so every monetary object in
  // the deck is drawn in one hand. Gold, fiat and bitcoin are the anchors and
  // are reused unchanged.

  'real-estate': {
    a: {
      title: 'the gable',
      idea: 'The building as its own silhouette: two roof strokes meeting at an apex over the walls, a ground line running past both, one door aperture. Flat-on, eaves dotted.',
      body: `
        <path d="M9 22.5 L24 10.5 L39 22.5"/>
        <path d="M12.5 22.5 L12.5 38 M35.5 22.5 L35.5 38"/>
        <path d="M6 38 L42 38"/>
        <path d="M20.5 38 L20.5 28.5 L27.5 28.5 L27.5 38"/>
        ${dot(9, 22.5)}${dot(39, 22.5)}${dot(24, 10.5, 1.5)}`
    },
    b: {
      title: 'the elevation',
      idea: 'A facade drawn flat: outer walls, one floor line, four window ticks in two courses, ground line extending past the walls — the asset, not the home.',
      body: `
        <path d="M13 11 L13 38 L35 38 L35 11 Z"/>
        <path d="M13 24.5 L35 24.5"/>
        <path d="M19 16 L19 20 M29 16 L29 20 M19 29.5 L19 33.5 M29 29.5 L29 33.5"/>
        <path d="M7 38 L41 38"/>
        ${dot(7, 38, 1.5)}${dot(41, 38, 1.5)}`
    },
    c: {
      title: 'the plot',
      idea: 'Title to land seen from above: the boundary with a corner dot at each turn, the footprint set inside it — ownership of ground rather than of a house.',
      body: `
        <path d="M8 12 L40 12 L40 36 L8 36 Z"/>
        <path d="M17.5 19 L30.5 19 L30.5 29 L17.5 29 Z"/>
        ${dot(8, 12)}${dot(40, 12)}${dot(40, 36)}${dot(8, 36)}`
    }
  },

  shares: {
    a: {
      title: 'the parted round',
      idea: 'The whole with one part taken out of it and set beside it, on its own radius, the same size as the gap it left — a share is a fraction of an enterprise, and the fraction is what you hold.',
      body: `
        <path d="M20 27 L20 13 A14 14 0 1 0 34 27 Z"/>
        <path d="M29 18 L29 4 A14 14 0 0 1 43 18 Z"/>
        ${dot(20, 27, 1.6)}${dot(29, 18, 1.6)}`
    },
    b: {
      title: 'the divided round',
      idea: 'The whole still whole: a ring with three radii from a center dot, the held sector marked by dot terminals where its boundaries meet the rim.',
      body: `
        <path d="M24 7.5 A16.5 16.5 0 1 1 23.99 7.5 Z"/>
        <path d="M24 24 L24 7.5 M24 24 L38.3 32.2 M24 24 L9.7 32.2"/>
        ${dot(24, 24, 1.6)}${dot(24, 7.5)}${dot(38.3, 32.2)}`
    },
    c: {
      title: 'the stacked slips',
      idea: 'A bundle of certificates: three offset leaves with one ruled entry line on the front slip — the holding as a stack of paper.',
      body: `
        <path d="M14 14 L34 14 L34 34 L14 34 Z"/>
        <path d="M17.5 10.5 L37.5 10.5 L37.5 30.5"/>
        <path d="M21 7 L41 7 L41 27"/>
        <path d="M19 26 L29 26"/>`
    }
  },

  ledger: {
    a: {
      title: 'the ruled book',
      idea: 'The account book open on its spine: two page arcs springing from one center line, two ruled entries on each page — the record, not the money.',
      body: `
        <path d="M24 14 L24 38"/>
        <path d="M24 14 C19 10.5 13 9.5 7 10.5 L7 34 C13 33 19 34 24 38"/>
        <path d="M24 14 C29 10.5 35 9.5 41 10.5 L41 34 C35 33 29 34 24 38"/>
        <path d="M11.5 18 L19 19 M11.5 24.5 L19 25.5 M29 19 L36.5 18 M29 25.5 L36.5 24.5"/>`
    },
    b: {
      title: 'the tally column',
      idea: 'One account column: the rule that opens it, three entry lines shortening down the page, dot terminals where each entry stops.',
      body: `
        <path d="M11 10 L11 38"/>
        <path d="M11 16 L37 16 M11 24 L32 24 M11 32 L27 32"/>
        ${dot(37, 16)}${dot(32, 24)}${dot(27, 32)}${dot(11, 10, 1.5)}`
    },
    c: {
      title: 'the double entry',
      idea: 'Bookkeeping’s own construction: two columns on one baseline, divided by the central rule, one entry dot in each — every credit answered by a debit.',
      body: `
        <path d="M24 9 L24 39"/>
        <path d="M8 39 L40 39"/>
        <path d="M8 15 L20 15 M28 15 L40 15"/>
        <path d="M8 15 L8 39 M40 15 L40 39"/>
        ${dot(14, 24, 2)}${dot(34, 30, 2)}`
    }
  },

  // ----- The R7.1 extension (Section 4's derivation scene) -----
  //
  // The surgeon's delivered service, and the three final goods that the $400
  // could close the exchange against. These replace photographs, so they carry
  // a heavier burden than the Section 2 goods: they must read as *the specific
  // thing* at a glance, without a caption doing the work.

  // Second studio round (R7.1). The first three candidates all drew the
  // *procedure* — an incision, an instrument, a monitor trace — and the best of
  // them still read as a comb. The direction changed: draw the value delivered,
  // not the operation performed. What the patient receives is a body that was
  // going wrong and is now going right, so the mark is a rhythm resolving.
  operation: {
    a: {
      title: 'the steadying pulse',
      idea: 'One line, read left to right: two irregular beats of differing height and spacing, then three even ones at one amplitude on one baseline. The value delivered is the resolution — the mark states the outcome, not the procedure, and needs no knowledge of surgery to read.',
      body: `
        <path d="M5 26 L9 26 L11.5 15.5 L14 32 L16.5 21 L19 26 L22 26 L24 19 L26 33 L28 26
                 L31 26 L32.6 20.5 L34.2 26 L36 26 L37.6 20.5 L39.2 26 L43 26"/>
        ${dot(5, 26)}${dot(43, 26)}`
    },
    b: {
      title: 'the mending arc',
      idea: 'The alternative direction the round was set against: a break in a curve, closed. Two arc segments approach from either side and a third bridges the gap between their inner terminals — repair drawn as continuity restored, with the join dotted.',
      body: `
        <path d="M6 32 C10 22 15 17 21 15.5"/>
        <path d="M42 32 C38 22 33 17 27 15.5"/>
        <path d="M21 15.5 C23 15 25 15 27 15.5"/>
        ${dot(6, 32)}${dot(42, 32)}${dot(21, 15.5, 1.5)}${dot(27, 15.5, 1.5)}`
    },
    c: {
      title: 'the settled interval',
      idea: 'The same argument as A without a waveform: four vertical strokes whose spacing and height are erratic on the left and regular on the right, over one baseline. Rhythm alone, no medical vocabulary at all.',
      body: `
        <path d="M5 34 L43 34"/>
        <path d="M9 34 L9 17 M14.5 34 L14.5 25 M21 34 L21 14"/>
        <path d="M28.5 34 L28.5 20 M34 34 L34 20 M39.5 34 L39.5 20"/>
        ${dot(5, 34)}${dot(43, 34)}`
    }
  },

  shoe: {
    // Re-cut once (R7.1): the first pass at all three failed the legibility
    // rule outright — the side profile read as a rock, the high-top as a bird.
    // What makes a shoe read is not its outline but three features together:
    // a flat sole, an ankle opening, and a toe that lifts off the ground.
    a: {
      title: 'the profile last',
      idea: 'A shoe from the side, built from the three features that make one legible: the flat sole, the ankle opening dipped into the top line, and the toe spring lifting off the ground. Two lace ticks cross the instep. Distinct from Section 2\'s sandal, which is an outsole-and-thong mark.',
      body: `
        <path d="M8 34 L40 34"/>
        <path d="M8 34 L8.6 24 C8.9 20.8 11.6 19.8 13.6 21.4 L15.4 22.8"/>
        <path d="M15.4 22.8 C20 25 25 26.2 29.5 27.8 C34 29.4 37.6 31.2 40 34"/>
        <path d="M17.6 24.2 L19.8 27.4 M22.4 25.4 L24.4 28.6"/>
        ${dot(8, 34)}${dot(40, 34)}`
    },
    b: {
      title: 'the head-on last',
      idea: 'The shoe seen head-on: the ankle opening as an open arc, the upper falling to a rounded toe box, three lace rungs across it, the sole a bar beneath. Symmetry does the work the profile\'s silhouette could not.',
      body: `
        <path d="M17 14 C21 11.4 27 11.4 31 14"/>
        <path d="M17 14 L13.4 29 M31 14 L34.6 29"/>
        <path d="M13.4 29 C16 33.6 32 33.6 34.6 29"/>
        <path d="M19.6 18 L28.4 18 M18.8 22 L29.2 22 M18.2 26 L29.8 26"/>
        <path d="M11.5 36 L36.5 36"/>
        ${dot(11.5, 36)}${dot(36.5, 36)}`
    },
    c: {
      title: 'the print',
      idea: 'The impression rather than the object: sole outline with the ball and heel separated, three toe dots.',
      body: `
        <path d="M18 16 C25 16 29 20 29 25 C29 29 26 31 22 31 C18 31 15 28.5 15 24 C15 19.5 16 16 18 16 Z"/>
        <path d="M20 35 C24 35 26.5 37 26.5 39.5 C26.5 42 24.5 43.5 22 43.5 C19.5 43.5 17.5 42 17.5 39.5 C17.5 37 18 35 20 35 Z"/>
        ${dot(31, 17, 1.5)}${dot(33.5, 21, 1.5)}${dot(34, 25.5, 1.5)}`
    }
  },

  meal: {
    a: {
      title: 'the cut and the bone',
      idea: 'The steak itself: one closed-contour cut with the bone drawn as an open hook at its edge and a single marbling stroke inside. Reads as food, not as a plate of something.',
      body: `
        <path d="M14 15 C25 12 36 15 39 22 C41.5 28 36 34 27 35 C18 36 11 32 10 26 C9.2 21 10.5 16.5 14 15 Z"/>
        <path d="M16 20 C20 18.5 24.5 19 27 21.5"/>
        <path d="M14 15 C11 12 7.5 12.5 6.5 15.5 C5.6 18.2 7.5 20.5 10.2 20.2"/>
        ${dot(6.8, 15.6, 1.5)}`
    },
    b: {
      title: 'the plate and cover',
      idea: 'The served meal: dome arc with its handle dot over a plate line, the oldest sign for a meal about to be eaten.',
      body: `
        <path d="M9 32 L39 32"/>
        <path d="M12 32 C12 22 17.5 16 24 16 C30.5 16 36 22 36 32"/>
        <path d="M6 36 L42 36"/>
        ${dot(24, 13.5, 2)}`
    },
    c: {
      title: 'the fork and the cut',
      idea: 'Utensil and food together: three-tine fork left, the cut as an open arc right — the moment of eating rather than the object.',
      body: `
        <path d="M12 10 L12 20 M17 10 L17 20 M22 10 L22 20"/>
        <path d="M12 20 C12 24 17 24.5 17 28 L17 40"/>
        <path d="M27 22 C31 18 38 18.5 41 23 C43 27 39.5 32 34 32 C29 32 26.5 28 27 22 Z"/>
        ${dot(17, 40)}`
    }
  },

  wine: {
    a: {
      title: 'the glass',
      idea: 'The stemmed glass in three strokes: bowl arc, stem, foot — the most legible wine mark at riser scale, and the one that reads as a good rather than as a container of liquid.',
      body: `
        <path d="M15 10 C15 21 18.5 27 24 27 C29.5 27 33 21 33 10 Z"/>
        <path d="M24 27 L24 37"/>
        <path d="M16.5 37 L31.5 37"/>
        ${dot(16.5, 37)}${dot(31.5, 37)}`
    },
    b: {
      title: 'the bottle',
      idea: 'Neck, shoulder and body as one open contour with a punt line at the base and a shoulder label tick.',
      body: `
        <path d="M20 8 L20 17 C20 20 16 22 16 27 L16 40 L32 40 L32 27 C32 22 28 20 28 17 L28 8"/>
        <path d="M16 31 L32 31"/>
        ${dot(20, 8)}${dot(28, 8)}`
    },
    c: {
      title: 'the amphora',
      idea: 'The ancient vessel: two open handles off a tapering body, rhyming with Section 2\'s traded goods rather than with a modern bottle.',
      body: `
        <path d="M17 12 L31 12"/>
        <path d="M18.5 12 C15 20 14 28 19 36 L29 36 C34 28 33 20 29.5 12"/>
        <path d="M17.5 15 C12 16 11 21 14.5 24"/>
        <path d="M30.5 15 C36 16 37 21 33.5 24"/>
        ${dot(19, 36)}${dot(29, 36)}`
    }
  }
};

// The order the studio reviews and documents the set in. The R3 extension
// (functions, stages, the Argentina triad, palladium, and the gate/tie
// marks) follows the original thirteen; the R7 extension (Section 4's
// productive assets and the ledger) follows those.
export const GLYPH_ORDER = [
  'fish', 'grain', 'sandals', 'cattle', 'salt', 'shells',
  'iron', 'metals', 'gold', 'coinage', 'paper', 'fiat', 'bitcoin',
  'through-time', 'between-people', 'measure', 'collectible',
  'palladium', 'dollar', 'peso', 'brick', 'gate', 'tie',
  'real-estate', 'shares', 'ledger',
  'operation', 'shoe', 'meal', 'wine'
];

// A standalone SVG for one candidate drawing.
export function candidateSvg(name, letter, size = 48) {
  const c = CANDIDATES[name] && CANDIDATES[name][letter];
  if (!c) return '';
  return `<svg viewBox="0 0 48 48" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${c.body}</svg>`;
}
