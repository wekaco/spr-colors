import { html, define, property } from 'hybrids';
import './color.js'

define({
  tag: "some-palette",
  colors: property([]),
  render: ({ colors }) => html`
    <div>
      ${colors.map(({name, hex}) => html`
        <some-color name="${name}" hex=${hex}></some-color>
        `)
      }
    </div>
  `,
});
