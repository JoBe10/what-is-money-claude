import { glyph } from '../section-2/glyphs.js';
import { DarkFieldImage } from '../DarkField.js';

// The five candidates, in two registers (§9.4.9, corrected at R7.4).
//
// R7 drew all five in the deck's own hand, at every size, and R7.2 kept that
// when it admitted the dark-field register — the reasoning being that the same
// asset must not be a photograph on one slide and a mark in the table two
// slides later with no designed handoff between them. The presenter's ruling
// reverses the emphasis, and the correction is a rule rather than a taste:
//
//   **display scale is the sensory register; diagram scale is the grammar.**
//
// So the handoff exists after all, and it is the same one Section 2 makes at
// 2.4 — the good is a render where it is being *shown to you* and a mark where
// it is an *entry in a structure*. A 180×150 candidate standing alone on a
// frame is the first; a 56px cell in a fifty-score table is the second.
//
// `compact` is that boundary, and every call site already passed it correctly,
// so the change is confined to this file: 4.15's lineup, the migration slide,
// the premium and other-assets slides all render photographs now; 4.21's
// decision row and the comparison table's own headers keep their marks.
//
// The one open question is the table's headers, which sit at the boundary — a
// 56px cell is diagram scale by size and the table's masthead by function. It
// is a toggle rather than a decision, screenshotted both ways for the ruling.

const GLYPHS = {
  gold: 'gold',
  fiat: 'fiat',
  bitcoin: 'bitcoin',
  property: 'real-estate',
  shares: 'shares'
};

// Subject keys in the dark-field manifest. `fiat` has no graded render yet —
// the historical one fails four of the five clauses (a neutral key, a lit
// ground) and is listed for regeneration in docs/dark-field-manifest.md. The
// component stubs it to its mark, so the lineup is complete the moment the
// render lands and nothing here changes.
const SUBJECTS = {
  gold: 'gold',
  fiat: 'fiat',
  bitcoin: 'bitcoin',
  property: 'property',
  shares: 'shares'
};

/** The table-header exception test (R7.4 §B). Presenter rules; both states are
 *  screenshotted in review/rebuild-r7-4/screenshots/table-headers/. */
export const TABLE_HEADERS_DARK_FIELD = false;

const DISPLAY_SIZE = 96;
const COMPACT_SIZE = 56;
// The render box at display scale is the mark's own box, so nothing around the
// asset moves: the five candidates keep their positions, their labels and their
// spacing, and only the register inside the box changes.
const DISPLAY_BOX = [180, 150];
const COMPACT_BOX = [96, 72];

export function ComparisonAssetHeader({ asset, compact = false, darkField = null } = {}) {
  const root = document.createElement('figure');
  root.className = 's4-comparison-asset';
  root.dataset.asset = asset.id;
  if (compact) root.classList.add('s4-comparison-asset--compact');

  // Display scale is dark-field; compact is the grammar, unless a caller (the
  // comparison table, under its toggle) asks otherwise.
  const wantsRender = darkField == null ? !compact : darkField;

  let mark;
  if (wantsRender) {
    const [w, h] = compact ? COMPACT_BOX : DISPLAY_BOX;
    const df = DarkFieldImage({
      name: SUBJECTS[asset.id],
      width: w,
      height: h,
      alt: asset.alt,
      className: 's4-comparison-asset__render',
      stubSize: compact ? COMPACT_SIZE : DISPLAY_SIZE
    });
    df.el.dataset.visible = 'true';
    mark = document.createElement('div');
    mark.className = 's4-comparison-asset__mark s4-comparison-asset__mark--df';
    mark.appendChild(df.el);
  } else {
    mark = document.createElement('div');
    mark.className = 's4-comparison-asset__mark';
    mark.setAttribute('role', 'img');
    mark.setAttribute('aria-label', asset.alt);
    mark.innerHTML = glyph(GLYPHS[asset.id], compact ? COMPACT_SIZE : DISPLAY_SIZE);
  }

  const label = document.createElement('figcaption');
  label.className = 's4-comparison-asset__label';
  label.textContent = asset.label;

  root.append(mark, label);
  return root;
}

export default ComparisonAssetHeader;
