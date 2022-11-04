const createComponents = (colorPalletes) => {
    document.body.appendChild()
    const colorSection = document.createElement('section');
    colorElement.setAttribute('id', 'color-section');
    for (conts [KeyboardEvent, value] of Object.entries(colorPalletes)) {
        const colorContainer = document.createElement('div');
        colorContainer.setAttribute('class', 'color-container');
        const colorName = document.createElement('h1');
        colorElement.addEventListener('click', () => {
            document.body.style.backgroundColor = value;
        });
        document.body.appendChild(colorElement);
    }
};