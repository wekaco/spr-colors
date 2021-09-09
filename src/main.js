import './palette.js';
import { data } from './data/mtn94.json';

var palette = document.createElement('spr-palette');
palette.colors = data.colors;

var main = document.querySelector('#main');
main.appendChild(palette);
