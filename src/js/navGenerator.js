window.onload = () => {
	document.body.insertAdjacentHTML(
		'afterbegin',
		`<header>
                <nav>
                    <a class="logo" href="index.html">
                        <img src="./img/anchor.svg" alt="anchor" class="anchor" />
                        <p>Color<span class="logo-text">Ocean</span></p>
                    </a>
                    <div class="nav-list">
                        <a href="./index.html" id="index-nav">Home</a>
                        <a href="./about.html" id="about-nav">About</a>
                        <a href="./contact.html" id="contact-nav">Contact</a>
                    </div>
                </nav>
            </header>`
	);

	const fileName = location.href.split('/').slice(-1)[0].split('.')[0];
	fileName == ''
		? document.getElementById(`index-nav`).classList.add('inuse')
		: document.getElementById(`${fileName}-nav`).classList.add('inuse');
};
