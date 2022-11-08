import changeColor from './colorInputHandler.js';
import createComponents from './colorElementCreator.js';

document.getElementById('color-input').oninput = () => changeColor();

const colorPalletes = {
	'Palette 1': [
		'#F9F7F7',
		'#FD7702',
		'#65C6C4',
		'#408AB4',
		'#34699A',
		'#112D4E'
	],
	'Palette 2': [
		'#F9F871',
		'#FFC75F',
		'#FF9671',
		'#FF6F91',
		'#D65DB1',
		'#845EC2'
	]
};

document.getElementById('submit-btn').onclick = () => {
	const footerWrapper = document.querySelector('.wrapper');
	if (!footerWrapper.classList.contains('generated-colors')) {
		footerWrapper.classList.add('generated-colors');
		footerWrapper.innerHTML += `<a href="#home">Back to the top</a>`;
	}

	createComponents(colorPalletes);
	document.getElementById('color-section').scrollIntoView();
};
