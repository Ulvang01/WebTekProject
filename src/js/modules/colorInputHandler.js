/**
 * It changes the color of the text in the input field to black or white depending on the background
 * color
 */
const changeColor = () => {
	const colorInput = document.getElementById('color-input');
	const color = colorInput.value;
	const reg1 = /^#([0-9a-fA-F]{3}){1,2}$/i;
	const reg2 = /^([0-9a-fA-F]{3}){1,2}$/i;
	if (reg1.test(color) || reg2.test(color)) {
		if (reg1.test(color)) {
			colorInput.style.backgroundColor = color;
		} else {
			colorInput.style.backgroundColor = '#' + color;
		}

		const bgColor = window
			.getComputedStyle(colorInput, null)
			.getPropertyValue('background-color')
			.split('(')[1]
			.split(')')[0]
			.split(',');

		const colorYIQ = Math.round(
			(bgColor[0] * 299 + bgColor[1] * 587 + bgColor[2] * 114) / 1000
		);

		const textColor = colorYIQ >= 100 ? '#2e3440' : '#f9f7f7';
		colorInput.style.color = textColor;
	}
};

export default changeColor;
