import { html, define, property } from 'hybrids';

import './image.js';
import './search-result.js';

import ColorThief from 'colorthief';


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

function onImage(host, event) {
  const colorThief = new ColorThief();
  const file = event.target.files[0];
    const img = event.srcElement.form.querySelector('img#preview')
  img.file = file;

  const reader = new FileReader();
  reader.onload = (
    function(aImg) {
      return function(e) {
        aImg.src = e.target.result;
        if (aImg.complete) {
          host.q = colorThief.getPalette(img);
        } else {
          aImg.addEventListener('load', function() {
            host.q = colorThief.getPalette(img);
          });
        }
      };
  })(img);
  reader.readAsDataURL(file);
}

define({
  tag: "spr-search",
  q: property([]),
  input_src: property(),
  palette: property({ colors: [] }),
  limit: property(3),
  render: ({ q, palette, limit, available_limits, input_src }) => html`
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
    <form>
      <label>
        <input type="file"
           id="search_image" name="search_image"
           accept="image/png, image/jpeg"
           onchange="${onImage}">
       </label>
       <img id="preview" />
    </form>
    <div>${q.map((color) => html`
      <spr-search-result
        color="${color}"
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
