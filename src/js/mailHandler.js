document.getElementById('submit').onclick = (event) => mailHandler(event);

/**
 * The function takes the value of the subject and body inputs and opens a new window with the mailto
 * link
 * @param event - The event object that is passed to the event handler.
 */
const mailHandler = (event) => {
	event.preventDefault();
	const subject = document.getElementById('subject').value;

	const body = document.getElementById('problem').value;

	window.open(
		`mailto:test@example.com?subject=${subject}&body=${body}`,
		'_self'
	);
};
