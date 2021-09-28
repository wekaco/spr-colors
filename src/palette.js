import { html, define, property } from 'hybrids';
import './color.js'

define({
  tag: "spr-palette",
  colors: property([]),
  render: ({ colors }) => html`
      ${colors.map(({name, color}) => html`
        <spr-color name="${name}" color=${JSON.stringify(color)}></spr-color>
        <style>
        :host {
          display: flex;
          flex-direction: row;
        }
        </style>
        `)
      }
  `,
});
