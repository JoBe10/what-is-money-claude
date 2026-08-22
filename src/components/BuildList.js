// Progressively-revealed numbered or bulleted lists.
// Each item gets a thin vertical orange tick (rendered as an explicit DOM element)
// that is anchored to the FIRST LINE of its text, even for multi-line items.
// Returns { el, reveal(n) } — reveal(n) shows items 1..n.

export function BuildList(items, { className = '', itemClassName = '' } = {}) {
  const el = document.createElement('ul');
  el.className = `build-list ${className}`.trim();

  const itemEls = items.map((item) => {
    const style = item.style || 'default';
    const li = document.createElement('li');
    li.className = `build-list__item build-list__item--${style} ${itemClassName}`.trim();

    const tick = document.createElement('span');
    tick.className = 'build-list__tick';
    li.appendChild(tick);

    const text = document.createElement('div');
    let textClass = 'build-list__text';
    if (style === 'accent') textClass += ' build-list__text--accent';
    if (style === 'punch') textClass += ' build-list__text--punch';
    text.className = textClass;
    if (item.html) text.innerHTML = item.html;
    else text.textContent = item.text || '';
    li.appendChild(text);

    el.appendChild(li);
    return li;
  });

  function reveal(n) {
    itemEls.forEach((li, i) => {
      li.setAttribute('data-visible', i < n ? 'true' : 'false');
    });
  }

  reveal(0);

  return { el, reveal, items: itemEls };
}

export default BuildList;
