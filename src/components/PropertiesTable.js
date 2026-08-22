// Two-column properties list — used on slide 4.4 (Properties of an ideal store
// of value). Splits an array of { name, meaning } rows into two side-by-side
// columns to keep the slide digestible (vs a single 17-row tall list).
// Each row: orange dot + property name (bold) | meaning (muted).

export function PropertiesTable(rows, { splitAt = null } = {}) {
  const root = document.createElement('div');
  root.style.cssText = `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 56px;
    width: 100%;
  `;

  const splitIndex = splitAt ?? Math.ceil(rows.length / 2);
  const left = rows.slice(0, splitIndex);
  const right = rows.slice(splitIndex);

  root.appendChild(_renderColumn(left));
  root.appendChild(_renderColumn(right));

  return root;
}

function _renderColumn(rows) {
  const col = document.createElement('div');
  col.style.cssText = `
    display: flex; flex-direction: column;
  `;
  rows.forEach((row, i) => {
    col.appendChild(_renderRow(row, i === 0));
  });
  return col;
}

function _renderRow(row, isFirst) {
  const r = document.createElement('div');
  r.style.cssText = `
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px 22px;
    padding: 14px 0;
    border-top: ${isFirst ? 'none' : '1px solid var(--border-subtle)'};
    align-items: baseline;
  `;

  // Orange dot.
  const dot = document.createElement('div');
  dot.style.cssText = `
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--accent);
    margin-top: 0.45em;
    grid-row: 1 / span 2;
    align-self: start;
  `;
  r.appendChild(dot);

  // Property name.
  const name = document.createElement('div');
  name.textContent = row.name;
  name.style.cssText = `
    font-size: 22px; font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.008em;
    line-height: 1.25;
  `;
  r.appendChild(name);

  // Meaning row spans below the name (occupies col 2 of row 2).
  const meaning = document.createElement('div');
  meaning.textContent = row.meaning;
  meaning.style.cssText = `
    font-size: 18px; font-weight: 400;
    color: var(--text-muted);
    letter-spacing: -0.005em;
    line-height: 1.4;
    grid-column: 2;
  `;
  r.appendChild(meaning);

  return r;
}

export default PropertiesTable;
