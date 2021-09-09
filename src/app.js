import { html, define, property } from 'hybrids';
import './footer.js'
import './palette.js'

import { data } from './data/mtn94.json';

define({
  tag: "spr-app",
  palette: property(data),
  render: ({ palette }) => html`
    <header>
      <h1>spr-colors</h1>
      <em>Find spray color codes from hex</em>
    </header>
    <section>
      <article>
        <spr-palette colors="${palette.colors}"></spr-pallete>
      </article>
    </section>
    <hr/>
    <spr-footer></spr-footer>
  `,
});
