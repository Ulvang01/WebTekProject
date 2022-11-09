import changeColor from './colorInputHandler.js';
import createComponents from './colorElementCreator.js';
import PaletteGenerator from './paletteGenerator.js';

document.getElementById('color-input').oninput = () => changeColor();

document.getElementById('submit-btn').onclick = () => {
	const colorGenerator = new PaletteGenerator(
		document.getElementById('color-input').value
	);

	colorGenerator.generatePalettes();

	createComponents(colorGenerator.palettes);
	document.getElementById('color-section').scrollIntoView();

	if (!document.querySelector('footer')) {
		document.body.insertAdjacentHTML(
			'beforeend',
			`
			<footer>
				<div class="wrapper">
					<div class="logo">
						<img src="./img/anchor.svg" alt="anchor" class="anchor-footer" />
						<p>Color<span class="logo-text">Ocean</span></p>
					</div>
					<a href="#home" id="back-to-top">Back to the top</a>
				</div>
			</footer>`
		);
	}

	window.onscroll = () => {
		if (window.scrollY <= 0) {
			document.querySelector('footer').style.display = 'none';
		} else {
			document.querySelector('footer').style.display = 'flex';
		}
	};
};
