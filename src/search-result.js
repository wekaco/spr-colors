import { html, define, property } from 'hybrids';

import './palette.js';
import './color.js';

import { distance} from './utils.js';

Array.prototype.limit = function(l) {
  this.splice(l);
  return this;
}
define({
  tag: "spr-search-result",
  hex: property(),
  palette: property({ colors: [] }),
  limit: property(3),
  render: ({ hex, palette, limit }) => html`
    <spr-color name="#${hex}" hex="${hex}"></spr-color>
    <spr-palette
      colors="${palette.colors.map((current) =>  {
        return ({
          distance: distance(hex, current.hex),
          color: current,
        })
      }).sort((a,b) => a.distance - b.distance)
        .limit(limit)
        .map(({ color }) => color)}">
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
