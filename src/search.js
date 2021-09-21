import { html, define, property } from 'hybrids';

import './search-result.js'

const regex = /[0-9a-fA-F]{6}/gm;

function onInput(host, event) {
  const str = event.target.value;
  let m;
  let q = []
  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      q.push(match);
    });
  }
  host.q = q;
}

define({
  tag: "spr-search",
  q: property([]),
  palette: property({ colors: [] }),
  render: ({ q, palette }) => html`
    <form>
      <label><input type="text" name="q" oninput="${onInput}"></input>&nbsp;🔍</label>
    </form>
    <div>${q.map((hex) => html`
      <spr-search-result hex="${hex}" palette="${palette}"></spr-search-result>
    `)}
    </div>
    <style>
      :host {
        margin: var(--spr-md-em);
      }
    </style>
  `,
});
