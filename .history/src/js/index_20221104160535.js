import changeColor from './colorInputHandler.js';
import createComponents from './colorElementCreator.js';

document.getElementById('color-input').oninput = () => changeColor();

const colorPalletes = {
    "pallette1": ["#F9F7F7", "#FD7702", "#65C6C4", "#408AB4", "#34699A", "#112D4E"]
};
