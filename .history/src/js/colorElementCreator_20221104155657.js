const createComponents = (colorPalletes) => {
    for (conts [KeyboardEvent, value] of Object.entries(colorPalletes)) {
        const colorElement = document.createElement('div');
        colorElement.classList.add('color-element');
        colorElement.style.backgroundColor = value;
        colorElement.addEventListener('click', () => {
            document.body.style.backgroundColor = value;
        });
        document.body.appendChild(colorElement);
    }
};