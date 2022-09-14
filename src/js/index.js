const nameContainer = document.getElementById('name-container');
const changeNameButton = document.getElementById('change-name');

const names = ['Edvard', 'Leif', 'Christoffer', 'Scott', 'Simon', 'Sepanta'];

const generateName = (names) => {
	const index = Math.floor(Math.random() * names.length);
	return names[index];
};
const displayName = (names) => {
	let name = generateName(names);
	nameContainer.innerHTML = name;
};
changeNameButton.onclick = () => {
	displayName(names);
};
