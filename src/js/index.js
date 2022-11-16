/* Getting the elements from the HTML file. */
const nameContainer = document.getElementById('name-container');
const changeNameButton = document.getElementById('change-name');

/* Creating an array of names. */
const names = ['Edvard', 'Leif', 'Christoffer', 'Scott', 'Simon', 'Sepanta'];

/**
 * Generate a random name from a list of names.
 * @param names - An array of names to choose from.
 * @returns A random name from the array.
 */
const generateName = (names) => {
	const index = Math.floor(Math.random() * names.length);
	return names[index];
};

/**
 * It takes an array of names, generates a random name from that array, and then displays that name in
 * the HTML
 * @param names - an array of names
 */
const displayName = (names) => {
	let name = generateName(names);
	nameContainer.innerHTML = name;
};

/* An event listener that listens for a click on the button and then runs the function displayName. */
changeNameButton.onclick = () => {
	displayName(names);
};
