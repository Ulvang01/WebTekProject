document.getElementById('submit').onclick = (event) => {
	event.preventDefault();
	const subject = document.getElementById('subject').value;

	const body = document.getElementById('problem').value;

	window.open(
		`mailto:test@example.com?subject=${subject}&body=${body}`,
		'_self'
	);
};
