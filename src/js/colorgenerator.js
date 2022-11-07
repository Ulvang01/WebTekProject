convert = {
    toHSL: function (hex) {
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        }
        else if (hex.length === 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
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
    },
    toHex: function (h, s, l) {
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
            r = "0" + r;
        }
        if (g.length == 1) {
            g = "0" + g;
        }
        if (b.length == 1) {
            b = "0" + b;
        }
        hex = "#" + r + g + b;

        return hex;
    },
    toRGB: function (hex) {
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        }
        else if (hex.length === 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);

        return [r, g, b];
    },
    toCMYK: function (hex) {
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        }
        else if (hex.length === 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }
        r = Math.round(r) / 255;
        g = Math.round(g) / 255;
        b = Math.round(b) / 255;

        let k = 1 - Math.max(r, g, b),
            c = (1 - r - k) / (1 - k),
            m = (1 - g - k) / (1 - k),
            y = (1 - b - k) / (1 - k);

        return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)];
    },
    toXYZ: function (hex) {
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        }
        else if (hex.length === 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }
        r = Math.round(r) / 255;
        g = Math.round(g) / 255;
        b = Math.round(b) / 255;

        if (r > 0.04045) r = Math.pow((r + 0.055) / 1.055, 2.4);
        else r = r / 12.92;
        if (g > 0.04045) g = Math.pow((g + 0.055) / 1.055, 2.4);
        else g = g / 12.92;
        if (b > 0.04045) b = Math.pow((b + 0.055) / 1.055, 2.4);
        else b = b / 12.92;

        r = r * 100;
        g = g * 100;
        b = b * 100;

        let x = r * 0.4124 + g * 0.3576 + b * 0.1805,
            y = r * 0.2126 + g * 0.7152 + b * 0.0722,
            z = r * 0.0193 + g * 0.1192 + b * 0.9505;

        return [Math.round(x), Math.round(y), Math.round(z)];
    },
    toLAB: function (hex) {
        var r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        }
        else if (hex.length === 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }
        r = Math.round(r) / 255;
        g = Math.round(g) / 255;
        b = Math.round(b) / 255;

        if (r > 0.04045) r = Math.pow((r + 0.055) / 1.055, 2.4);
        else r = r / 12.92;
        if (g > 0.04045) g = Math.pow((g + 0.055) / 1.055, 2.4);
        else g = g / 12.92;
        if (b > 0.04045) b = Math.pow((b + 0.055) / 1.055, 2.4);
        else b = b / 12.92;

        r = r * 100;
        g = g * 100;
        b = b * 100;

        let x = r * 0.4124 + g * 0.3576 + b * 0.1805,
            y = r * 0.2126 + g * 0.7152 + b * 0.0722,
            z = r * 0.0193 + g * 0.1192 + b * 0.9505;

        x = x / 95.047;
        y = y / 100;
        z = z / 108.883;

        if (x > 0.008856) x = Math.pow(x, 1 / 3);
        else x = (7.787 * x) + (16 / 116);
        if (y > 0.008856) y = Math.pow(y, 1 / 3);
        else y = (7.787 * y) + (16 / 116);
        if (z > 0.008856) z = Math.pow(z, 1 / 3);
        else z = (7.787 * z) + (16 / 116);

        let l = (116 * y) - 16,
            a = 500 * (x - y),
            b = 200 * (y - z);

        return [Math.round(l), Math.round(a), Math.round(b)];
    },
};

colors = {
    getHue: function (hex) {
        return convert.toHSL(hex)[0];
    },
    getSaturation: function (hex) {
        return convert.toHSL(hex)[1];
    },
    getLightness: function (hex) {
        return convert.toHSL(hex)[2];
    },
    setHue: function (hex, hue) {
        let h = hue;
        let s = colors.getSaturation(hex);
        let l = colors.getLightness(hex);
        return convert.toHex(h, s, l);
    },
    setSaturation: function (hex, saturation) {
        let h = colors.getHue(hex);
        let s = saturation;
        let l = colors.getLightness(hex);
        return convert.toHex(h, s, l);
    },
    setLightness: function (hex, lightness) {
        let h = colors.getHue(hex);
        let s = colors.getSaturation(hex);
        let l = lightness;
        return convert.toHex(h, s, l);
    },
    addHue: function (hex, hue) {
        let h = colors.getHue(hex) + hue;
        if (h > 360) { h -= 360; }
        if (h < 0) { h += 360; }
        let s = colors.getSaturation(hex);
        let l = colors.getLightness(hex);
        return convert.toHex(h, s, l);
    },
    addSaturation: function (hex, saturation) {
        let h = colors.getHue(hex);
        let s = colors.getSaturation(hex) + saturation;
        if (s > 100) { s -= 100; }
        if (s < 0) { s += 100; }
        let l = colors.getLightness(hex);
        return convert.toHex(h, s, l);
    },
    addLightness: function (hex, lightness) {
        let h = colors.getHue(hex);
        let s = colors.getSaturation(hex);
        let l = colors.getLightness(hex) + lightness;
        if (l > 100) { l -= 100; }
        if (l < 0) { l += 100; }
        return convert.toHex(h, s, l);
    },
    complementaryColor: function (hex) {
        return colors.addHue(hex, 180);
    },
    blackNorWhite: function (hex, threshold = 10, deltaUp = 10, deltaDown = 10) { 
        // threshold = how far from 50% lightness/Saturation, deltaUp = how much to add to lightness/Saturation, deltaDown = how much to subtract from lightness/Saturation
        if (colors.getLightness(hex) > 50 + threshold) {
            hex = colors.addLightness(hex, deltaDown);
        } else if (colors.getLightness(hex) < 50 - threshold) {
            hex = colors.addLightness(hex, deltaUp);
        }

        if (colors.getSaturation(hex) > 50 + threshold) {
            hex = colors.addSaturation(hex, -30);
        } else if (colors.getSaturation(hex) < 50 - threshold) {
            hex = colors.addSaturation(hex, 50);
        }

        return hex;
    }
};

schemes = {
    triadic: function (hex) {
        let newcolors = [hex];
        let currentColor = hex;
        currentColor = blackNorWhite(currentColor, 10, 10, 10);

        for (let i = 1; i < 3; i++) {
            newcolors.push(addHue(currentColor, 120 * i));
        }

        return newcolors;
    },
    tetradic: function (hex) {
        let newcolors = [hex];
        let currentColor = hex;
        currentColor = colors.blackNorWhite(currentColor, 10, 10, 10);

        for (let i = 1; i < 4; i++) {
            newcolors.push(addHue(currentColor, 90 * i));
        }

        return newcolors;
    },
    analogous: function (hex, ang, steps) { // ang = angle, steps = number of steps to reach angle
        let newcolors = [hex];
        let step = ang / steps;
        for (let i = 1; i <= steps; i++) {
            newcolors.push(colors.addHue(hex, step * i));
        }
        return newcolors;
    },
    monochromatic: function (hex, light, steps) { // light = how much lightness to be added each step, steps = number of steps
        let colors = [hex];
        for (let i = 1; i <= steps; i++) {
            colors.push(colors.addLightness(hex, light * i));
        }
        return colors;
    },
    splitComplementary: function (hex) {
        let newcolors = [hex];

        let currentColor = hex;
        currentColor = colors.blackNorWhite(currentColor, 30, 40, 20);
        
        newcolors.push(colors.addHue(currentColor, 150));
        newcolors.push(colors.addHue(currentColor, 210));

        return colors;
    },
    compound: function (hex) {
        return [hex, colors.addHue(hex, 72), colors.addHue(hex, 216)];
    },
    shades: function (hex) {
        return [hex, colors.addLightness(hex, 10), colors.addLightness(hex, 20), colors.addLightness(hex, 30), colors.addLightness(hex, 40), colors.addLightness(hex, 50), colors.addLightness(hex, 60), colors.addLightness(hex, 70), colors.addLightness(hex, 80), colors.addLightness(hex, 90)];
    },
    shadesOfGray: function (hex) {
        newcolors = [hex];
        let currentColor = hex;
        currentColor = colors.blackNorWhite(currentColor, 10, 10, 10);

        for (let i = 1; i < 10; i++) {
            newcolors.push(addSaturation(currentColor, -10 * i));
        }

        return newcolors;
    }
};

palett1 = {
    name: "Triadic",
    colors: [],
    generate: function (hex) {
        this.colors = schemes.triadic(hex);
    }
};

palett2 = {
    name: "Tetradic",
    colors: [],
    generate: function (hex) {
        this.colors = schemes.tetradic(hex);
    }
};

palett3 = {
    name: "Generic Analogous",
    colors: [],
    generate: function (hex) {
        this.colors = schemes.analogous(hex, 150, 5);
    }
};

palett4 = {
    name: "Reverse Analogous",
    colors: [],
    generate: function (hex) {
        this.colors = schemes.analogous(hex, -150, 5);
    }
};

palett5 = {
    name: "Monochromatic",
    colors: [],
    generate: function (hex) {
        this.colors = schemes.monochromatic(hex, 20, 5).sort();
    }
};

palett6 = {
    name: "Split Complementary",
    colors: [],
    generate: function (hex) {
        this.colors = schemes.splitComplementary(hex);
    }
};

palett7 = {
    name: "Compound",
    colors: [],
    generate: function (hex) {
        this.colors = schemes.compound(hex);
    }
};

palett8 = {
    name: "Shades",
    colors: [],
    generate: function (hex) {
        this.colors = schemes.shades(hex).sort();
    }
};

palett9 = {
    name: "Shades of Gray",
    colors: [],
    generate: function (hex) {
        this.colors = schemes.shadesOfGray(hex).sort();
    }
};

palett10 = {
    name: "Classy",
    colors: [],
    generate: function (hex) {
        let newcolors = [hex];
        let currentColor = colors.blackNorWhite(hex);

        newcolors.push(colors.addSaturation(colors.addLightness(currentColor, 20), 20));
        newcolors.push(colors.addSaturation(colors.addLightness(currentColor, 70), 60));

        let color2 = colors.addHue(currentColor, 130);
        newcolors.push(color2);
        newcolors.push(colors.addSaturation(colors.addLightness(color2, 20), 20));

        this.colors = newcolors;
    }
};