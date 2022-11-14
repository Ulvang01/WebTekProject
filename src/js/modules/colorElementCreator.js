/**
 * It removes the color section from the DOM
 */
const deleteSection = () => {
	const colorSection = document.getElementById('color-section');
	if (colorSection) {
		colorSection.remove();
	}
};

/**
 * It takes in an object of color palettes, deletes the current color section, creates a new color
 * section, and then creates a color container for each color palette, which contains a color box with
 * a color frame for each color in the palette
 * @param colorPalletes - An object containing the color palletes.
 */
const createComponents = (colorPalletes) => {
	deleteSection();

	const colorSection = document.createElement('section');
	colorSection.setAttribute('id', 'color-section');

	for (const [paletteName, colors] of Object.entries(colorPalletes)) {
		const colorContainer = document.createElement('div');
		colorContainer.setAttribute('class', 'color-container');

		const colorName = document.createElement('h1');
		colorName.setAttribute('class', 'palette-name');
		colorName.innerText = paletteName;
		colorContainer.appendChild(colorName);

		const colorBox = document.createElement('div');
		colorBox.setAttribute('class', 'color-box');

		colors.forEach((color) => {
			const colorFrame = document.createElement('div');
			colorFrame.setAttribute('class', 'color-frame');

			const colorDiv = document.createElement('div');
			colorDiv.setAttribute('class', 'color');
			colorDiv.style.backgroundColor = color;
			colorFrame.appendChild(colorDiv);

			const colorCode = document.createElement('input');
			colorCode.setAttribute('class', 'color-code-input');
			colorCode.setAttribute('type', 'text');
			colorCode.setAttribute('value', color);
			colorCode.readOnly = true;
			colorFrame.appendChild(colorCode);
			colorBox.appendChild(colorFrame);
		});
		colorContainer.appendChild(colorBox);
		colorSection.appendChild(colorContainer);
	}

	document.getElementsByTagName('main')[0].appendChild(colorSection);
};

export default createComponents;
