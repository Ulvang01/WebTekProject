import ColorHandler from './ColorHandler.js';

class PaletteGenerator extends ColorHandler {
	constructor(hex) {
		super(hex);
		this.palettes = {};
	}

	generateTriadic() {
		this.palettes['Triadic'] = this.triadic();
	}

	generateTetradic() {
		this.palettes['Tetradic'] = this.tetradic();
	}

	generateAnalogous() {
		this.palettes['Generic Analogous'] = this.analogous(150);
	}

	generateReverseAnalogous() {
		this.palettes['Reverse Generic Analogous'] = this.analogous(-150);
	}

	generateMonochromatic() {
		this.palettes['Monochromatic'] = this.monochromatic();
	}

	generateSplitComplementary() {
		this.palettes['Split Complementary'] = this.splitComplementary();
	}

	generateCompound() {
		this.palettes['Compound'] = this.compound();
	}

	generateShades() {
		this.palettes['Shades'] = this.shades();
	}

	generateShadesGray() {
		this.palettes['Shades of Gray'] = this.shadesOfGray();
	}

	generateClassy() {
		this.palettes['Classy'] = this.classy();
	}

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
