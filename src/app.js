import { html, define, property } from 'hybrids';
import './footer.js'
import './palette.js'
import './search.js'

import { data } from './data/mtn94.json';


Array.prototype.limit = function(l) {
  if (this.length > l) {
    console.log('here')
    this.splice(l);
  }
  return this;
}


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
        <spr-search palette="${palette}"></spr-search>
        <!--<spr-palette colors="${palette.colors}"></spr-pallete>-->
      </article>
    </section>
    <hr/>
    <spr-footer></spr-footer>
  `,
});
