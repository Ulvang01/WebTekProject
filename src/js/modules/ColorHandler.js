/* It takes a hex color and returns a bunch of other colors based on the color theory */
class ColorHandler {
	constructor(hex) {
		this.hex = hex.length !== 4 ? hex : this.expandHex(hex);
	}

	expandHex(hex) {
		return hex.replace(
			/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/g,
			'#$1$1$2$2$3$3'
		);
	}

	/**
	 * It takes a hex color code and returns an array of three numbers: hue, saturation, and lightness
	 * @param hex - The hexadecimal color value.
	 * @returns An array of three numbers.
	 */
	toHSL(hex) {
		let r = 0,
			g = 0,
			b = 0;
		if (this.hex.length === 4) {
			r = '0x' + hex[1] + hex[1];
			g = '0x' + hex[2] + hex[2];
			b = '0x' + hex[3] + hex[3];
		} else if (hex.length === 7) {
			r = '0x' + hex[1] + hex[2];
			g = '0x' + hex[3] + hex[4];
			b = '0x' + hex[5] + hex[6];
		}
		r = Math.round(r) / 255;
		g = Math.round(g) / 255;
		b = Math.round(b) / 255;

		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;

		if (delta === 0) h = 0;
		else if (cmax === r) h = ((g - b) / delta) % 6;
		else if (cmax === g) h = (b - r) / delta + 2;
		else h = (r - g) / delta + 4;
		h = Math.round(h * 60);

		if (h < 0) h += 360;

		l = (cmax + cmin) / 2;
		s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

		return [h, Math.round(s), Math.round(l)];
	}

	/**
	 * It takes in a hue, saturation, and lightness value and returns a hexadecimal color value
	 * @param h - hue (0-360)
	 * @param s - saturation (0-100)
	 * @param l - lightness (0-100)
	 * @returns A hexadecimal color code.
	 */
	toHex(h, s, l) {
		s /= 100;
		l /= 100;

		let x = (1 - Math.abs(2 * l - 1)) * s,
			y = x * (1 - Math.abs(((h / 60) % 2) - 1)),
			z = l - x / 2,
			r = 0,
			g = 0,
			b = 0;

		if (h >= 0 && h < 60) {
			r = x;
			g = y;
			b = 0;
		} else if (h >= 60 && h < 120) {
			r = y;
			g = x;
			b = 0;
		} else if (h >= 120 && h < 180) {
			r = 0;
			g = x;
			b = y;
		} else if (h >= 180 && h < 240) {
			r = 0;
			g = y;
			b = x;
		} else if (h >= 240 && h < 300) {
			r = y;
			g = 0;
			b = x;
		} else if (h >= 300 && h <= 360) {
			r = x;
			g = 0;
			b = y;
		}

		r = Math.round((r + z) * 255);
		g = Math.round((g + z) * 255);
		b = Math.round((b + z) * 255);

		r = r.toString(16);
		g = g.toString(16);
		b = b.toString(16);

		if (r.length == 1) {
			r = '0' + r;
		}
		if (g.length == 1) {
			g = '0' + g;
		}
		if (b.length == 1) {
			b = '0' + b;
		}

		const hex = '#' + r + g + b;
		return hex;
	}

	/**
	 * It returns the hue of a hex color.
	 * @param hex - The hexadecimal color value to convert.
	 * @returns The hue value of the hex color.
	 */
	getHue(hex) {
		return this.toHSL(hex)[0];
	}

	/**
	 * It returns the saturation value of a hex color.
	 * @param hex - The hexadecimal color value to convert.
	 * @returns The saturation value of the hex color.
	 */
	getSaturation(hex) {
		return this.toHSL(hex)[1];
	}

	/**
	 * It converts a hex color to HSL, and then returns the lightness value
	 * @param hex - The hexadecimal color value to convert.
	 * @returns The lightness of the hex color.
	 */
	getLightness(hex) {
		return this.toHSL(hex)[2];
	}

	/**
	 *
	 * @param hex - The hex color to change the hue of.
	 * @param hue - 0-360
	 * @returns the hex value of the color with the hue value changed.
	 */
	setHue(hex, hue) {
		let h = hue;
		let s = this.getSaturation(hex);
		let l = this.getLightness(hex);
		return this.toHex(h, s, l);
	}

	/**
	 * It takes a hex color and a saturation value, and returns a hex color with the same hue and
	 * lightness but the saturation you specified
	 * @param hex - The hex color to change the saturation of.
	 * @param saturation - a number between 0 and 1
	 * @returns the hex value of the color with the saturation value changed.
	 */
	setSaturation(hex, saturation) {
		let h = this.getHue(hex);
		let s = saturation;
		let l = this.getLightness(hex);
		return this.toHex(h, s, l);
	}

	/**
	 * It takes a hex color and a lightness value, and returns a hex color with the same hue and
	 * saturation but the new lightness
	 * @param hex - The hex color to be modified.
	 * @param lightness - 0-100
	 * @returns the hex value of the color.
	 */
	setLightness(hex, lightness) {
		let h = this.getHue(hex);
		let s = this.getSaturation(hex);
		let l = lightness;
		return this.toHex(h, s, l);
	}

	/**
	 * It takes a hex color and a hue value, and returns a new hex color with the hue value added to the
	 * original color's hue
	 * @param hex - The hex color to add the hue to.
	 * @param hue - The amount of hue to add.
	 * @returns the hex value of the color after the hue has been adjusted.
	 */
	addHue(hex, hue) {
		let h = this.getHue(hex) + hue;
		if (h > 360) {
			h -= 360;
		}
		if (h < 0) {
			h += 360;
		}
		let s = this.getSaturation(hex);
		let l = this.getLightness(hex);
		return this.toHex(h, s, l);
	}

	/**
	 * It takes a hex color and a saturation value, and returns a new hex color with the saturation
	 * adjusted
	 * @param hex - The hex color to add saturation to.
	 * @param saturation - The amount of saturation to add.
	 * @returns the hex value of the color after the saturation has been adjusted.
	 */
	addSaturation(hex, saturation) {
		let h = this.getHue(hex);
		let s = this.getSaturation(hex) + saturation;
		if (s > 100) {
			s -= 100;
		}
		if (s < 0) {
			s += 100;
		}
		let l = this.getLightness(hex);
		return this.toHex(h, s, l);
	}

	/**
	 * It takes a hex color and a lightness value, and returns a new hex color with the same hue and
	 * saturation, but with the lightness adjusted by the given amount
	 * @param hex - The hex color to be modified.
	 * @param lightness - The amount of lightness to add to the color.
	 * @returns a hex value.
	 */
	addLightness(hex, lightness) {
		let h = this.getHue(hex);
		let s = this.getSaturation(hex);
		let l = this.getLightness(hex) + lightness;
		if (l > 100) {
			l -= 100;
		}
		if (l < 0) {
			l += 100;
		}
		return this.toHex(h, s, l);
	}

	/**
	 * It takes a hex color and adds 180 degrees to its hue
	 * @param hex - The hexadecimal color value to be converted.
	 * @returns The complementary color of the hex value.
	 */
	complementaryColor(hex) {
		return this.addHue(hex, 180);
	}

	/**
	 * If the lightness is greater than 50 + threshold, subtract deltaDown from the lightness. If the
	 * lightness is less than 50 - threshold, add deltaUp to the lightness. If the saturation is greater
	 * than 50 + threshold, subtract deltaDown from the saturation. If the saturation is less than 50 -
	 * threshold, add deltaUp to the saturation
	 * @param hex - the hex color to be modified
	 * @param [threshold=10] - How far from 50% lightness/saturation the color is.
	 * @param [deltaUp=10] - How much to add to the lightness/saturation if it's below the threshold.
	 * @param [deltaDown=10] - How much to subtract from the lightness/saturation if it's above the
	 * threshold.
	 * @returns The hex value of the color.
	 */
	blackNorWhite(hex, threshold = 10, deltaUp = 10, deltaDown = 10) {
		// threshold = how far from 50% lightness/Saturation, deltaUp = how much to add to lightness/Saturation, deltaDown = how much to subtract from lightness/Saturation
		if (this.getLightness(hex) > 50 + threshold) {
			hex = this.addLightness(hex, deltaDown);
		} else if (this.getLightness(hex) < 50 - threshold) {
			hex = this.addLightness(hex, deltaUp);
		}

		if (this.getSaturation(hex) > 50 + threshold) {
			hex = this.addSaturation(hex, -30);
		} else if (this.getSaturation(hex) < 50 - threshold) {
			hex = this.addSaturation(hex, 50);
		}

		return hex;
	}

	/**
	 * It takes the current color, makes it a little darker, then adds 120 degrees of hue to it twice
	 * @returns An array of three colors.
	 */
	triadic() {
		const newColors = [this.hex];
		let currentColor = this.hex;
		currentColor = this.blackNorWhite(currentColor, 10, 10, 10);

		for (let i = 1; i < 3; i++) {
			newColors.push(this.addHue(currentColor, 120 * i));
		}

		return newColors;
	}

	/**
	 * It takes the current color, makes it a little darker, then adds 90 degrees of hue to it three times
	 * @returns An array of 4 colors.
	 */
	tetradic() {
		const newColors = [this.hex];
		let currentColor = this.hex;
		currentColor = this.blackNorWhite(currentColor, 10, 10, 10);

		for (let i = 1; i < 4; i++) {
			newColors.push(this.addHue(currentColor, 90 * i));
		}
		return newColors;
	}

	/**
	 * It takes an angle and a number of steps, and returns an array of hex colors that are the same hue
	 * as the original color, but with different saturation and brightness
	 * @param ang - the angle to rotate the color wheel by
	 * @param [steps=5] - The number of steps to take to reach the angle.
	 * @returns An array of hex colors.
	 */
	analogous(ang, steps = 5) {
		// ang = angle, steps = number of steps to reach angle
		const newColors = [this.hex];
		const step = ang / steps;
		for (let i = 1; i <= steps; i++) {
			newColors.push(this.addHue(this.hex, step * i));
		}
		return newColors;
	}

	/**
	 * It takes a hex color and returns an array of hex colors that are lighter than the original color
	 * @param [light=20] - How much lightness to be added each step.
	 * @param [steps=5] - The number of colors you want to generate.
	 * @returns An array of hex colors.
	 */
	monochromatic(light = 20, steps = 5) {
		// light = how much lightness to be added each step, steps = number of steps
		const newColors = [];
		for (let i = 1; i <= steps; i++) {
			newColors.push(this.addLightness(this.hex, light * i));
		}
		return newColors.sort();
	}

	/**
	 * It takes the current color, makes it a little darker, then adds 150 and 210 degrees of hue to it
	 * @returns An array of three colors.
	 */
	splitComplementary() {
		const newColors = [this.hex];

		let currentColor = this.hex;
		currentColor = this.blackNorWhite(currentColor, 30, 40, 20);

		newColors.push(this.addHue(currentColor, 150));
		newColors.push(this.addHue(currentColor, 210));

		return newColors;
	}

	/**
	 * It takes a hex color, adds 72 to the hue, and returns the new hex color
	 * @returns An array of three hex values.
	 */
	compound() {
		return [this.hex, this.addHue(this.hex, 72), this.addHue(this.hex, 216)];
	}

	/**
	 * It returns an array of the original hex color and five lighter shades of the original color
	 * @returns An array of hex values that are sorted from lightest to darkest.
	 */
	shades() {
		return [
			this.hex,
			this.addLightness(this.hex, 10),
			this.addLightness(this.hex, 30),
			this.addLightness(this.hex, 50),
			this.addLightness(this.hex, 70),
			this.addLightness(this.hex, 90)
		].sort();
	}

	/**
	 * It takes a hex color, converts it to RGB, adds 10 to each of the RGB values, then converts it back
	 * to hex
	 * @returns An array of hex colors.
	 */
	shadesOfGray() {
		const newColors = [this.hex];
		let currentColor = this.hex;
		currentColor = this.blackNorWhite(currentColor, 10, 10, 10);

		for (let i = 1; i < 5; i++) {
			newColors.push(this.addSaturation(currentColor, -20 * i));
		}

		return newColors.sort();
	}

	/**
	 * It takes a hex color, and returns an array of 5 colors, the first being the original color, and the
	 * other 4 being variations of the original color
	 * @returns An array of colors.
	 */
	classy() {
		const newColors = [this.hex];
		let currentColor = this.blackNorWhite(this.hex);

		newColors.push(this.addSaturation(this.addLightness(currentColor, 20), 20));
		newColors.push(this.addSaturation(this.addLightness(currentColor, 70), 60));

		let color2 = this.addHue(currentColor, 130);
		newColors.push(color2);
		newColors.push(this.addSaturation(this.addLightness(color2, 20), 20));

		return newColors;
	}
}

export default ColorHandler;
