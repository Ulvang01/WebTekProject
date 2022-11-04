const createComponents = (colorPalletes) => {
    document.body.appendChild()
    const colorSection = document.createElement('section');
    colorElement.classList.add('color-element');
    for (conts [KeyboardEvent, value] of Object.entries(colorPalletes)) {
        colorElement.style.backgroundColor = value;
        colorElement.addEventListener('click', () => {
            document.body.style.backgroundColor = value;
        });
        document.body.appendChild(colorElement);
    }
};