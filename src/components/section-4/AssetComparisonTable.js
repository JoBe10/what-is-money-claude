import { ComparisonAssetHeader } from './ComparisonAssetHeader.js';
import { DotRating } from './DotRating.js';

function createColumn(className) {
  const column = document.createElement('col');
  column.className = className;
  return column;
}

export function AssetComparisonTable({
  assets = [],
  groups = [],
  rows = []
} = {}) {
  const table = document.createElement('table');
  table.className = 's4-comparison-table';

  const colgroup = document.createElement('colgroup');
  colgroup.appendChild(createColumn('s4-comparison-table__property-column'));
  assets.forEach(() => {
    colgroup.appendChild(createColumn('s4-comparison-table__asset-column'));
  });
  table.appendChild(colgroup);

  const thead = document.createElement('thead');
  const groupRow = document.createElement('tr');
  groupRow.className = 's4-comparison-table__group-row';

  const groupCorner = document.createElement('th');
  groupCorner.className = 's4-comparison-table__group-corner';
  groupCorner.setAttribute('aria-hidden', 'true');
  groupRow.appendChild(groupCorner);

  groups.forEach((group, index) => {
    const cell = document.createElement('th');
    cell.className = 's4-comparison-table__group';
    if (index > 0) cell.classList.add('s4-comparison-table__family-break');
    cell.colSpan = group.assetIds.length;
    cell.scope = 'colgroup';
    cell.textContent = group.label;
    groupRow.appendChild(cell);
  });
  thead.appendChild(groupRow);

  const assetRow = document.createElement('tr');
  assetRow.className = 's4-comparison-table__asset-row';

  const propertyHeading = document.createElement('th');
  propertyHeading.className = 's4-comparison-table__property-heading';
  propertyHeading.scope = 'col';
  propertyHeading.textContent = 'PROPERTY';
  assetRow.appendChild(propertyHeading);

  assets.forEach((asset, index) => {
    const cell = document.createElement('th');
    cell.className = 's4-comparison-table__asset-heading';
    if (index === 3) cell.classList.add('s4-comparison-table__family-break');
    cell.scope = 'col';
    // The heading carries the label alone (the Acts III–IV final ruling 2,
    // 3 Sep 2026, master §13): the five glyph marks are retired, and the
    // candidates' renders ride as a header band above the table, built by the
    // comparison slide. The R7.4 table-header toggle is answered and gone.
    cell.appendChild(ComparisonAssetHeader({ asset, compact: true, mark: false }));
    assetRow.appendChild(cell);
  });
  thead.appendChild(assetRow);
  table.appendChild(thead);

  const ratingsByRow = [];
  const tbody = document.createElement('tbody');
  rows.forEach((row) => {
    const rowRatings = [];
    const tr = document.createElement('tr');
    tr.className = 's4-comparison-table__row';

    const property = document.createElement('th');
    property.className = 's4-comparison-table__property';
    property.scope = 'row';
    property.textContent = row.property;
    tr.appendChild(property);

    assets.forEach((asset, index) => {
      const cell = document.createElement('td');
      cell.className = 's4-comparison-table__score';
      if (index === 3) cell.classList.add('s4-comparison-table__family-break');

      const rating = DotRating({ score: row.scores[asset.id] });
      rowRatings.push(rating);
      cell.appendChild(rating);
      tr.appendChild(cell);
    });

    ratingsByRow.push(rowRatings);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  return {
    el: table,
    rowCount: ratingsByRow.length,
    // The scores fill in row order, so the reveal can be split across the two
    // groups the properties were derived in rather than landing all fifty
    // under a single spoken beat (R7). `count` is how many property rows are
    // scored; 0 leaves the table drawn and empty.
    setRowsRevealed(count) {
      const revealed = Math.max(0, Math.min(ratingsByRow.length, Number(count) || 0));
      table.dataset.rowsRevealed = String(revealed);
      table.dataset.scoresRevealed = String(revealed > 0);
      ratingsByRow.forEach((rowRatings, index) => {
        const value = String(index < revealed);
        rowRatings.forEach((rating) => {
          rating.dataset.revealed = value;
        });
      });
    }
  };
}

export default AssetComparisonTable;

