import imagesLoaded from 'imagesLoaded';
import {
	addClass,
	isLoaded,
	hasClass,
	scrollIt,
	getOffsetTop,
} from './helpers';
import InfiniteSlider from './jquery/infiniteSlider';
import $ from 'jquery';

// Elements
const $btnHeader = document.querySelector('#header_btn-menu');
const $header = document.querySelector('#header');
const scrollButton = document.querySelector('.btn-scroll-down');
const $wrapper = document.querySelector('#wrapper');
const $footer = document.querySelector('#footer');
const $body = document.querySelector('body');
const $html = document.querySelector('html');

/* Feature detection */
let passiveIfSupported = false;

try {
	window.addEventListener(
		'test',
		null,
		Object.defineProperty({}, 'passive', {
			get: function() {
				passiveIfSupported = { passive: false };
			},
		})
	);
} catch (err) {
	console.log({ err });
}

imagesLoaded($wrapper, instance => {
	const { isComplete } = instance;
	if (isComplete) {
		isLoaded('#loading-mask');
		setTimeout(() => isLoaded('#header_btn-menu'), 450);
	}
});

function openHeaderMenu(e) {
	e.preventDefault();
	this.classList.add('hidden');
	addClass('#header', 'opened');
	setTimeout(() => {
		isLoaded('#header > .card-container');
		$header.querySelector('.card-container').classList.remove('no-anim');
	}, 450);
}

function closeHeaderMenu({ target: { nodeName } }) {
	if (nodeName === 'HEADER') {
		this.classList.remove('opened');
		$btnHeader.classList.remove('hidden');
		setTimeout(() => {
			const cardContainer = $header.querySelector('.card-container').classList;
			cardContainer.add('no-anim');
			cardContainer.remove('loaded');
		}, 450);
	}
}

const initHome = setTimeout(() => {
	isLoaded('#block1 .card-container');
	setTimeout(() => {
		isLoaded('.btn-scroll-down');
		// if (isMobile) {
		// 	isLoaded('.to-load');
		// }
	}, 1500);
}, 750);

const infiniteSliderSquares = new InfiniteSlider(
	$('#slider-container-squares'),
	2000,
	6000,
	'css',
	'easeOutQuad',
	false,
	true
);

const scrollSliderSquares = () => {
	const windowHeight = window.innerHeight;
	const newScroll = window.scrollY;
	const scrollHeight = newScroll + windowHeight;
	const sliderSquares = document.querySelector('#slider-container-squares');
	const noSlider = document.querySelector('.no-slider');
	const sliderOffset = getOffsetTop(noSlider);
	const sliderPos =
		newScroll + windowHeight > sliderOffset ? sliderOffset - scrollHeight : 0;

	sliderSquares.style.top = `${sliderPos}px`;
	sliderSquares.querySelector('.slider').style.top = `${-sliderPos * 0.75}px`;

	// Homepage Blur
	const activeSquare = sliderSquares.querySelectorAll('.blur');

	Array.from(activeSquare).forEach(item => {
		item.style.opacity = (newScroll * 1.5) / windowHeight;
	});
};

// Parallax Icons
const parallaxIcons = () => {
	const $parallaxIcons = document.querySelectorAll('.parallax-icon');

	Array.from($parallaxIcons).forEach(item => {
		const { parentElement } = item;
		const scrollBase =
			getOffsetTop(parentElement) - (window.scrollY + window.innerHeight);

		let textScroll = scrollBase * 0.5;

		if (hasClass(item, 'icon-2')) {
			textScroll = scrollBase * 0.75;
		}

		if (hasClass(item, 'icon-10')) {
			textScroll = scrollBase * 0.25;
		}

		item.style.transform = `translate(0,  ${-textScroll}px)`;
	});
};

// Show/Hide Header
const showHideHeader = () => {
	const tempHead = document.querySelector('#homepage #block1 .card-container');
	const isHeaderInViewport =
		window.scrollY < getOffsetTop(tempHead) + tempHead.offsetHeight;
	const headerIsOpen = hasClass($header, 'opened');

	// Hide Header
	if (isHeaderInViewport) {
		addClass('#header_btn-menu', 'no-menu');

		if (headerIsOpen) {
			$header.click();
		}
	}

	// Show Header
	else if (!headerIsOpen) {
		$btnHeader.classList.remove('no-menu');
	}
};

// Demask Footer
const demaskFooter = () => {
	const { innerHeight: windowHeight, scrollY } = window;
	const totalScroll = $body.scrollHeight - windowHeight;
	const footerScroll =
		scrollY > totalScroll - 220 ? 220 - (scrollY - (totalScroll - 220)) : 220;

	$footer.querySelector(
		'.centered'
	).style.transform = `translate(0, ${footerScroll}px)`;
};

// initToLoad
const initToLoad = () => {
	const { innerHeight: windowHeight, scrollY } = window;
	const scrollHeight = scrollY + windowHeight;
	const $toLoad = document.querySelectorAll('.to-load');

	Array.from($toLoad).forEach(item => {
		const offset = getOffsetTop(item);

		if (scrollHeight * 0.85 > offset) {
			item.classList.remove('no-anim');
			isLoaded(item);
		} else if (scrollHeight < offset) {
			addClass(item, 'no-anim');
			item.classList.remove('loaded');
		}
	});
};

function scrollContent() {
	const newScroll = window.scrollY;
	const windowHeight = window.innerHeight;
	const scrollHeight = newScroll + windowHeight;

	if (newScroll > 10) {
		addClass('.btn-scroll-down', 'hidden');
	} else {
		scrollButton.classList.remove('hidden');
	}

	if (infiniteSliderSquares.running !== undefined) {
		if (newScroll > 10 && infiniteSliderSquares.running) {
			infiniteSliderSquares.stop();
		}

		if (newScroll < 10 && !infiniteSliderSquares.running) {
			infiniteSliderSquares.start();
		}
	}

	initToLoad();

	// Show/Hide Header
	showHideHeader();
	// Scroll Slider Squares
	scrollSliderSquares();
	// Parallax Icons
	parallaxIcons();

	demaskFooter();
}

const adjustTextGrids = () => {
	const textGrid = document.querySelector('.text-grid');
	const modell = textGrid.querySelector('.line:first-child > div:first-child')
		.clientWidth;
	textGrid.style.marginTop = `${-modell / 2}px`;
	const mannnn = textGrid.querySelectorAll('.line > div');

	Array.from(mannnn).forEach(item => {
		const node = item;
		node.style.height = `${modell}px`;
	});
};

const fullHeight = () => {
	document.querySelector(
		'.full-height'
	).style.height = `${window.innerHeight}px`;
};

function positionContent() {
	// Full Height
	fullHeight();
	// Adjust Text Grids
	adjustTextGrids();
	$wrapper.style.paddingBottom = `${$footer.offsetHeight}px`;
}

window.addEventListener(
	'scroll',
	() => {
		scrollContent();
	},
	passiveIfSupported
);

const onReady = () => {
	$html.scrollTop = 0;
	$body.scrollTop = 0;
	scrollContent();
};

if (
	document.readyState === 'complete' ||
	(document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
	onReady();
} else {
	document.addEventListener('DOMContentLoaded', onReady);
}

$btnHeader.addEventListener('click', openHeaderMenu);
$header.addEventListener('click', closeHeaderMenu);
window.onload = initHome;
window.onload = addClass('#slider-container-squares', 't-translate');
window.onload = positionContent;
