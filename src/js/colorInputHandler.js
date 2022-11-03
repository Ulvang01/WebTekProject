export default function changeColor() {
	const colorInput = document.getElementById('color-input');
	const color = colorInput.value;
	const reg = /^#([0-9a-f]{3}){1,2}$/i;
	if (reg.test(color)) {
		colorInput.style.backgroundColor = color;
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
