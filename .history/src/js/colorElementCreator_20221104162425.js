const createComponents = (colorPalletes) => {
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
            colorCode.setAttribute('type', 'text');
            colorCode.setAttribute('value', color);
            colorCode.readOnly = true;
            colorContainer.appendChild(colorFrame);
            colorContainer.appendChild(colorCode);
        });

        colorSection.appendChild(colorContainer);
    }

    document.getElementsByTagName('main')[0].appendChild(colorSection);
};

export default createComponents;