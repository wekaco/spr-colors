import { html, define, property } from 'hybrids';
import './color.js'

define({
  tag: "spr-palette",
  colors: property([]),
  render: ({ colors }) => html`
    <div>
      ${colors.map(({name, hex}) => html`
        <spr-color name="${name}" hex=${hex}></spr-color>
        `)
      }
    </div>
  `,
});
