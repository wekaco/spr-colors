import { html, define, property } from 'hybrids';

import './palette.js';
import './color.js';

import { calculate_distance} from './utils.js';


Array.prototype.limit = function(l) {
  this.splice(l);
  return this;
}


function name(color) {
  if (Array.isArray(color)) {
    return color.join(',');
  }
  return `#${color}`;
}


define({
  tag: "spr-search-result",
  color: property(),
  palette: property({ colors: [] }),
  limit: property(3),
  render: ({ color, palette, limit }) => html`
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
