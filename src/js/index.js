import changeColor from './modules/colorInputHandler.js';
import createComponents from './modules/colorElementCreator.js';
import PaletteGenerator from './modules/PaletteGenerator.js';

document.getElementById('color-input').oninput = () => changeColor();

document.querySelector('.button-container').onsubmit = (event) => {
	event.preventDefault();
	handleColorSubmit();
};

/**
 * It takes the color code from the input field, checks if it's a valid color code, and if it is, it
 * creates a new PaletteGenerator object, generates the palettes, creates the components, and scrolls
 * to the color section
 */
const handleColorSubmit = () => {
	if (document.querySelector('.error-message')) {
		document.querySelector('.error-message').remove();
	}

	const colorInput = document.getElementById('color-input');
	const color = colorInput.value;

	/* A regular expression that checks if the input is a valid hex code. */
	const reg1 = /^#([0-9a-fA-F]{3}){1,2}$/i;
	const reg2 = /^([0-9a-fA-F]{3}){1,2}$/i;

	if (reg1.test(color) || reg2.test(color)) {
		const colorGenerator = new PaletteGenerator(
			reg1.test(color) ? color : '#' + color
		);
		colorGenerator.generatePalettes();

		createComponents(colorGenerator.palettes);
		document.getElementById('color-section').scrollIntoView();

		if (!document.querySelector('.back-to-top')) {
			document.body.insertAdjacentHTML(
				'beforeend',
				`
					<a href="#home" class="back-to-top">
						<img src="./img/arrow-up.svg" alt="arrow-up" />
					</a>
				`
			);
		}

		window.onscroll = () => {
			if (window.scrollY <= 0) {
				document.querySelector('.back-to-top').style.display = 'none';
			} else {
				document.querySelector('.back-to-top').style.display = 'inline-block';
			}
		};
	} else {
		document.getElementById('color-input').classList.add('invalid');
		generateErrorComponent();
		setTimeout(
			() => document.getElementById('color-input').classList.remove('invalid'),
			500
		);
	}
};

const generateErrorComponent = () => {
	const errorText = document.createElement('p');
	errorText.innerText = 'Please enter a valid Hex color code';
	errorText.classList.add('error-message');
	document.querySelector('.button-container').appendChild(errorText);
};
