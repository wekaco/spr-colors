import update from './update.js';
import './palette.js';
import { data } from './data/mtn94.json';

// even though Rollup is bundling all your files together, errors and
// logs will still point to your original source modules
console.log('if you have sourcemaps enabled in your devtools, click on main.js:5 -->');

update();

var main = document.querySelector('#main');
var palette = document.createElement('some-palette');
palette.colors = data.colors;
main.appendChild(palette);
