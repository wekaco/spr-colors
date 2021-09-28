import { html, define, property } from 'hybrids';

function css(input_color) {
  const color = JSON.parse(input_color);
  console.log(color)
  if (Array.isArray(color)) {
    return `rgb(${color.join(',')})`;
  }
  return `#${color}`;
}


define({
  tag: "spr-color",
  name: property(""),
  color: property("\"ffffff\""),
  render: ({ name, color }) => html`
    <div>
      <div class="colored">&nbsp;</div>
      <span>${name}</span>
    </div>
    <style>
      :host .colored {
        background-color: ${css(color)};
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
