import { html, define, property } from 'hybrids';

import './palette.js';
import './color.js';

import { calculate_distance } from './utils.js';

const fibonacci_range = [1,2,3,5,8,13];


function name(color) {
  if (Array.isArray(color)) {
    return color.join(',');
  }
  return `#${color}`;
}


function onChangeLimit(host, event) {
  host.limit = event.target.value;
}


define({
  tag: "spr-search-result",
  color: property(),
  palette: property({ colors: [] }),
  limit: property(3),
  render: ({ color, palette, limit }) => html`
    <form>
      <label>
        <select onchange="${onChangeLimit}">
          ${fibonacci_range.map((i) => html`
            <option value="${i}" selected="${i==limit}">${i}</option>
          `)}
        </select>
      </label>
    </form>
    <spr-color name="${name(color)}" color=${JSON.stringify(color)}></spr-color>
    <spr-palette
      colors="${palette.colors.map((current) =>  {
        let result = calculate_distance(color, current.hex);
        return ({
            color: result.color,
            distance: result.distance,
            name: current.name,
        })
      }).sort((a,b) => a.distance - b.distance)
        .limit(limit)}">
    </spr-palette>
    <style>
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    </style>
  `,
});
