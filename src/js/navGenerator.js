window.onload = () => {
	generateHeader();
	setActiveNavLink();
	hamburgerMenuHandler();
};

/**
 * It inserts a header element with a nav element inside of it, which contains an anchor element with a
 * logo image, a paragraph element with a span element inside of it, a div element with three div
 * elements inside of it, and a div element with three anchor elements inside of it
 */
const generateHeader = () => {
	document.body.insertAdjacentHTML(
		'afterbegin',
		`<header>
            <nav>
                <a class="logo" href="index.html">
                    <img src="./img/anchor.svg" alt="anchor" class="anchor" />
                    <p>Color<span class="logo-text">Ocean</span></p>
                </a>
                <div class="menu-btn">
                    <div class="btn-line"></div>
                    <div class="btn-line"></div>
                    <div class="btn-line"></div>
                </div>
                <div class="nav-list">
                    <a href="./index.html" id="index-nav" class="nav-item">Home</a>
                    <a href="./about.html" id="about-nav" class="nav-item">About</a>
                    <a href="./contact.html" id="contact-nav" class="nav-item">Contact</a>
                </div>
            </nav>
        </header>`
	);
};

/**
 * It adds the class 'inuse' to the nav link that corresponds to the current page
 */
const setActiveNavLink = () => {
	const fileName = location.href.split('/').slice(-1)[0].split('.')[0];
	fileName == ''
		? document.getElementById(`index-nav`).classList.add('inuse')
		: document.getElementById(`${fileName}-nav`).classList.add('inuse');
};

/**
 * When the hamburger menu button is clicked, the menu button is toggled to an 'X' and the nav menu is
 * shown
 */
const hamburgerMenuHandler = () => {
	const menuBtn = document.querySelector('.menu-btn');
	const menuNav = document.querySelector('.nav-list');
	const navItems = document.querySelectorAll('.nav-item');

	let showMenu = false;

	menuBtn.onclick = () => toggleMenu();

	const toggleMenu = () => {
		if (!showMenu) {
			menuBtn.classList.add('close');
			menuNav.classList.add('show', 'fly-in');
			navItems.forEach((item) => item.classList.add('show'));

			showMenu = true;
		} else {
			menuNav.classList.remove('fly-in');
			menuBtn.classList.remove('close');
			menuNav.classList.add('fly-out');
			menuNav.addEventListener(
				'animationend',
				() => {
					menuNav.classList.remove('show', 'fly-out');
					navItems.forEach((item) => item.classList.remove('show'));
					showMenu = false;
				},
				{ once: true }
			);
		}
	};
};
