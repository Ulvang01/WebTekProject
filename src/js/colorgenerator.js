const hexColor = "#0ba0db";


////#region _______________________ Converting _________________________________________


function hexToRGB(hex) {
    // converts from hex to rgb
    let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    } else if (hex.length == 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }

    return [Math.round(r), Math.round(g), Math.round(b)];
}


function rgbToHex(r, g, b) {
    // Direct convertion from rbg color to hex color
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1) { r = "0" + r }
    if (g.length == 1) { g = "0" + g }
    if (b.length == 1) { b = "0" + b }
    hex = "#" + r + g + b;

    return hex;
}  

function hexToHSL(hex) {
    // first converts to rbg
    let rgb = hexToRGB(hex);
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    // then converting from rgb to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
    cmax = Math.max(r,g,b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, Math.round(s), Math.round(l)];
}


function hslToHex(h, s, l) {
    //Converting from hsl color to hex color
    s /= 100;
    l /= 100;
    
    console.log("hsl:", h, s, l)

    let x = (1 - Math.abs(2 * l - 1)) * s,
        y = x * (1 - Math.abs((h / 60) % 2 - 1)),
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

    console.log("rgb2:", r, g, b);

    hex = rgbToHex(r, g, b);

    return hex;
}

//#endregion

//#region __________________________ Palette generator ________________________________

function triadic(h, s, l, n) {
    // Make a triadic color palett with n amounts of colors, n >= 3
    // Returns hex colors
    if (n < 3) { n = 3};

    color1 = hslToHex(h, s, l);

    h1 = h + 120;
    if (h1 >= 360) { h1 -= 360 }
    color2 = hslToHex(h1, s, l);
    
    h2 = h1 + 120;
    if (h2 >= 360) { h2 -= 360 }
    color3 = hslToHex(h2, s, l);
    console.log("h2: " + h2);
    if (n == 3) {
        return [color1, color2, color3];
    } else {
        if (n % 3 == 0) {

        } else if (n % 3 == 1) {

        } else if (n % 3 == 2) {

        }
    }
}


//#endregion



// Trying convertion results
red = hexToRGB(hexColor)[0];
green = hexToRGB(hexColor)[1];
blue = hexToRGB(hexColor)[2];

hue = hexToHSL(hexColor)[0];
saturation = hexToHSL(hexColor)[1];
lightness = hexToHSL(hexColor)[2];

console.log(red + ",", green + ",", blue);
console.log(hue + ",", saturation + ",", lightness);
console.log(rgbToHex(red, green, blue));
console.log(hslToHex(hue, saturation, lightness));
console.log(triadic(hue, saturation, lightness, 3));

