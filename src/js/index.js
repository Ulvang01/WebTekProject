import changeColor from './modules/colorInputHandler.js';
import createComponents from './modules/colorElementCreator.js';
import PaletteGenerator from './modules/PaletteGenerator.js';

document.getElementById('color-input').oninput = () => changeColor();

document.getElementById('submit-btn').onclick = () => {
    const color = document.getElementById('color-input').value;

    if (color.includes('#') && (color.length === 4 || color.length === 7)) {
        const colorGenerator = new PaletteGenerator(color);
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
                document.querySelector('.back-to-top').style.display =
                    'inline-block';
            }
        };
    } else {
        console.error('Please enter a valid color code');
    }
};
