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
      div.colored {
        background-color: #${hex};
        line-height: 2em;
      }
    </style>
  `,
});
