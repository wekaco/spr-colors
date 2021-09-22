import { html, define, property } from 'hybrids';

import './search-result.js'

const regex = /[0-9a-fA-F]{6}/gm;

function fibonacci(num){
  var a = 1, b = 0, temp;

  while (num >= 0){
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}


function range(total, map=(i)=>i) {
  let t = [];
  for (let i=1; total >= i; i++) {
    t.push(map(i));
  }
  return t;
}


function onChange(host, event) {
  host.limit = event.target.value;
}


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
  limit: property(3),
  render: ({ q, palette, limit, available_limits }) => html`
    <form>
      <label><input type="text" name="q" oninput="${onInput}"></input>&nbsp;🔍</label>
      <label>
        <select onchange="${onChange}">
          ${range(6, fibonacci).map((i) => html`
            <option value="${i}" selected="${i==limit}">${i}</option>
          `)}
        </select>
      </label>
    </form>
    <div>${q.map((hex) => html`
      <spr-search-result
        hex="${hex}"
        palette="${palette}"
        limit="${limit}"
      ></spr-search-result>
    `)}
    </div>
    <style>
      :host {
        margin: var(--spr-md-em);
      }
      :host form {
        margin-bottom: var(--spr-md-em);
      }
      :host > div {
        display: flex;
        flex-direction: column;
      }
    </style>
  `,
});
