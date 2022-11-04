const createComponents = (colorPalletes) => {
    const colorSection = document.createElement('section');
    colorElement.setAttribute('id', 'color-section');

    for (conts [key, value] of Object.entries(colorPalletes)) {
        // const colorContainer = document.createElement('div');
        // colorContainer.setAttribute('class', 'color-container');
        // const colorName = document.createElement('h1');
        // colorName.setAttribute('class', 'palette-name');
        // colorElement.addEventListener('click', () => {
        //     document.body.style.backgroundColor = value;
        // });
        // colorSection.appendChild(colorContainer);
        
        value.forEach((color) => {
            const colorFrame = document.createElement('div');
            colorFrame.setAttribute('class', 'color');
        });
    }
    document.body.main.appendChild(colorSection);
};

export default createComponents;