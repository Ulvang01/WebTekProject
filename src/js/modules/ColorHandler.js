class ColorHandler {
    constructor(hex) {
        this.hex = hex;
    }

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

    getHue(hex) {
        return this.toHSL(hex)[0];
    }

    getSaturation(hex) {
        return this.toHSL(hex)[1];
    }

    getLightness(hex) {
        return this.toHSL(hex)[2];
    }

    setHue(hex, hue) {
        let h = hue;
        let s = this.getSaturation(hex);
        let l = this.getLightness(hex);
        return this.toHex(h, s, l);
    }

    setSaturation(hex, saturation) {
        let h = this.getHue(hex);
        let s = saturation;
        let l = this.getLightness(hex);
        return this.toHex(h, s, l);
    }

    setLightness(hex, lightness) {
        let h = this.getHue(hex);
        let s = this.getSaturation(hex);
        let l = lightness;
        return this.toHex(h, s, l);
    }

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

    complementaryColor(hex) {
        return this.addHue(hex, 180);
    }

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

    triadic() {
        const newColors = [this.hex];
        let currentColor = this.hex;
        currentColor = this.blackNorWhite(currentColor, 10, 10, 10);

        for (let i = 1; i < 3; i++) {
            newColors.push(this.addHue(currentColor, 120 * i));
        }

        return newColors;
    }

    tetradic() {
        const newColors = [this.hex];
        let currentColor = this.hex;
        currentColor = this.blackNorWhite(currentColor, 10, 10, 10);

        for (let i = 1; i < 4; i++) {
            newColors.push(this.addHue(currentColor, 90 * i));
        }
        return newColors;
    }

    analogous(ang, steps = 5) {
        // ang = angle, steps = number of steps to reach angle
        const newColors = [this.hex];
        const step = ang / steps;
        for (let i = 1; i <= steps; i++) {
            newColors.push(this.addHue(this.hex, step * i));
        }
        return newColors;
    }

    monochromatic(light = 20, steps = 5) {
        // light = how much lightness to be added each step, steps = number of steps
        const newColors = [];
        for (let i = 1; i <= steps; i++) {
            newColors.push(this.addLightness(this.hex, light * i));
        }
        return newColors.sort();
    }

    splitComplementary() {
        const newColors = [this.hex];

        let currentColor = this.hex;
        currentColor = this.blackNorWhite(currentColor, 30, 40, 20);

        newColors.push(this.addHue(currentColor, 150));
        newColors.push(this.addHue(currentColor, 210));

        return newColors;
    }

    compound() {
        return [
            this.hex,
            this.addHue(this.hex, 72),
            this.addHue(this.hex, 216),
        ];
    }

    shades() {
        return [
            this.hex,
            this.addLightness(this.hex, 10),
            this.addLightness(this.hex, 30),
            this.addLightness(this.hex, 50),
            this.addLightness(this.hex, 70),
            this.addLightness(this.hex, 90),
        ].sort();
    }

    shadesOfGray() {
        const newColors = [this.hex];
        let currentColor = this.hex;
        currentColor = this.blackNorWhite(currentColor, 10, 10, 10);

        for (let i = 1; i < 5; i++) {
            newColors.push(this.addSaturation(currentColor, -20 * i));
        }

        return newColors.sort();
    }

    classy() {
        const newColors = [this.hex];
        let currentColor = this.blackNorWhite(this.hex);

        newColors.push(
            this.addSaturation(this.addLightness(currentColor, 20), 20)
        );
        newColors.push(
            this.addSaturation(this.addLightness(currentColor, 70), 60)
        );

        let color2 = this.addHue(currentColor, 130);
        newColors.push(color2);
        newColors.push(this.addSaturation(this.addLightness(color2, 20), 20));

        return newColors;
    }
}

export default ColorHandler;
