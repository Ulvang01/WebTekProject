import changeColor from './colorInputHandler.js';
import createComponents from    './colorElementCreator.js';

document.getElementById('color-input').oninput = () => changeColor();
