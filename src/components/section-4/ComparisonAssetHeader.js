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
// decision row keeps its marks.
//
// THE TABLE'S HEADERS — the one open question R7.4 left at the boundary, a
// toggle screenshotted both ways for a ruling — ARE RULED (the Acts III–IV
// final ruling 2, 3 September 2026, master §13): the five glyphs retire from
// the asset headings, and the renders ride as a header band ABOVE the table
// at the rails-law band scale, built by the comparison slide itself
// (slides/section-4-ideal-store/16-the-comparison.js). The heading cell
// carries the label alone — `mark: false` — so the drawn grammar beneath the
// band is untouched. The toggle is gone with the question it asked.

const GLYPHS = {
  gold: 'gold',
  fiat: 'fiat',
  bitcoin: 'bitcoin',
  property: 'real-estate',
  shares: 'shares'
};

// Subject keys in the dark-field manifest — all five renders are in the
// shipping set (`fiat` ingested at Batch A; `shares` and `property` restored
// candidate-lineup studies). The component stubs a missing subject to its
// mark, so a lineup is complete the moment a render lands and nothing here
// changes.
const SUBJECTS = {
  gold: 'gold',
  fiat: 'fiat',
  bitcoin: 'bitcoin',
  property: 'property',
  shares: 'shares'
};

const DISPLAY_SIZE = 96;
const COMPACT_SIZE = 56;
// The render box at display scale is the mark's own box, so nothing around the
// asset moves: the five candidates keep their positions, their labels and their
// spacing, and only the register inside the box changes.
const DISPLAY_BOX = [180, 150];
const COMPACT_BOX = [96, 72];

export function ComparisonAssetHeader({ asset, compact = false, darkField = null, mark = true } = {}) {
  const root = document.createElement('figure');
  root.className = 's4-comparison-asset';
  root.dataset.asset = asset.id;
  if (compact) root.classList.add('s4-comparison-asset--compact');

  // Display scale is dark-field; compact is the grammar, unless a caller asks
  // otherwise (4.21's decision row carries renders in the compact box).
  const wantsRender = darkField == null ? !compact : darkField;

  if (mark) {
    let markEl;
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
      markEl = document.createElement('div');
      markEl.className = 's4-comparison-asset__mark s4-comparison-asset__mark--df';
      markEl.appendChild(df.el);
    } else {
      markEl = document.createElement('div');
      markEl.className = 's4-comparison-asset__mark';
      markEl.setAttribute('role', 'img');
      markEl.setAttribute('aria-label', asset.alt);
      markEl.innerHTML = glyph(GLYPHS[asset.id], compact ? COMPACT_SIZE : DISPLAY_SIZE);
    }
    root.appendChild(markEl);
  }

  const label = document.createElement('figcaption');
  label.className = 's4-comparison-asset__label';
  label.textContent = asset.label;
  root.appendChild(label);

  return root;
}

export default ComparisonAssetHeader;
