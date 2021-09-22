import { html, define, property } from 'hybrids';

define({
  tag: "spr-color",
  name: property(""),
  hex: property("ffffff"),
  render: ({ name, hex }) => html`
    <div>
      <div class="colored">&nbsp;</div>
      <span>${name}</span>
    </div>
    <style>
      :host .colored {
        background-color: #${hex};
        min-height: var(--spr-sm-em);
        height: var(--spr-lg-em);
        border: 0.1em solid var(--spr-muted-hex);
      }
      :host {
        width: 100%;
      }
    </style>
  `,
});
