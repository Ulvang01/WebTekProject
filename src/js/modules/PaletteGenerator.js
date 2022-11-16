import ColorHandler from './ColorHandler.js';

/* It generates a bunch of palettes based on the color you give it */
class PaletteGenerator extends ColorHandler {
	constructor(hex) {
		super(hex);
		this.palettes = {};
	}

	/**
	 * > It creates a new palette called 'Triadic' and assigns it the value of the triadic() function
	 */
	generateTriadic() {
		this.palettes['Triadic'] = this.triadic();
	}

	/**
	 * It creates a new palette called 'Tetradic' and assigns it the value of the tetradic() function
	 */
	generateTetradic() {
		this.palettes['Tetradic'] = this.tetradic();
	}

	/**
	 * It creates a new palette called "Generic Analogous" and sets it to the result of the analogous
	 * function, which takes a value of 150 as its argument
	 */
	generateAnalogous() {
		this.palettes['Generic Analogous'] = this.analogous(150);
	}

	/**
	 * It creates a new palette called "Reverse Generic Analogous" and sets it equal to the result of the
	 * analogous function with a value of -150
	 */
	generateReverseAnalogous() {
		this.palettes['Reverse Generic Analogous'] = this.analogous(-150);
	}

	/**
	 * It creates a new palette called 'Monochromatic' and assigns it the value of the monochromatic()
	 * function
	 */
	generateMonochromatic() {
		this.palettes['Monochromatic'] = this.monochromatic();
	}

	/**
	 * It generates a split complementary palette.
	 */
	generateSplitComplementary() {
		this.palettes['Split Complementary'] = this.splitComplementary();
	}

	/**
	 * It creates a new palette called 'Compound' and assigns it the value of the function compound()
	 */
	generateCompound() {
		this.palettes['Compound'] = this.compound();
	}

	/**
	 * It creates a new palette called "Shades" and assigns it the value of the shades() function
	 */
	generateShades() {
		this.palettes['Shades'] = this.shades();
	}

	/**
	 * It creates a new property on the `palettes` object called `Shades of Gray` and assigns it the value
	 * returned by the `shadesOfGray()` function
	 */
	generateShadesGray() {
		this.palettes['Shades of Gray'] = this.shadesOfGray();
	}

	/**
	 * It generates a palette of colors called Classy.
	 */
	generateClassy() {
		this.palettes['Classy'] = this.classy();
	}

	/**
	 * It generates all the palettes
	 */
	generatePalettes() {
		this.generateTriadic();
		this.generateTetradic();
		this.generateAnalogous();
		this.generateReverseAnalogous();
		this.generateMonochromatic();
		this.generateSplitComplementary();
		this.generateCompound();
		this.generateShades();
		this.generateShadesGray();
		this.generateClassy();
	}
}

export default PaletteGenerator;
