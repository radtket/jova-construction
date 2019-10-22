import imagesLoaded from 'imagesLoaded';
import anime from 'animejs/lib/anime.es.js';
import {
	addClass,
	isLoaded,
	hasClass,
	scrollIt,
	getOffsetTop,
} from './helpers';
import InfiniteSlider from './jquery/infiniteSlider';
import InfiniteSliderHome from './jquery/infiniteSliderHome';
import $ from 'jquery';

// Elements
const $btnHeader = document.querySelector('#header_btn-menu');
const $header = document.querySelector('#header');
const $scrollButton = document.querySelector('.btn-scroll-down');
const $wrapper = document.querySelector('#wrapper');
const $footer = document.querySelector('#footer');
const $body = document.querySelector('body');
let isAnimationRunning = false;

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

const triggerScroll = (sectionId, currentScroll) => {
	if (window.location.hash !== '') {
		const $target = $(sectionId + window.location.hash.replace('#', ''));
		const scroll = Math.abs(currentScroll - $target.offset().top);
		const scrollTop = $target.offset().top;
		const scrollTime = scroll * 0.5;

		$('html,body').animate(
			{ scrollTop },
			scrollTime < 1250 ? 1250 : scrollTime,
			'easeInOutQuad'
		);
	}
};

const initTips = () => {
	console.log($('#wrapper.tips #block1 .bullet'));

	setTimeout(() => {
		isLoaded('#wrapper.tips #block1 .bullet');
		setTimeout(() => {
			isLoaded($('#wrapper.tips #block1 .sidebar .card-container'));
			// if (isMobile) {
			// 	isLoaded($('.to-load'));
			// }
			triggerScroll('#tips');
		}, 100);
	}, 250);

	// $('#tips').each(() => {
	// 	setTimeout(() => {
	// 		isLoaded($('#block1 .bullet'));
	// 		setTimeout(() => {
	// 			isLoaded($('#block1 .sidebar .card-container'));
	// 			// if (isMobile) {
	// 			// 	isLoaded($('.to-load'));
	// 			// }
	// 			triggerScroll('#tips');
	// 		}, 100);
	// 	}, 250);
	// });
};

const initHome = () =>
	setTimeout(() => {
		console.log("	console.log('initHome');");
		isLoaded('#block1 .card-container');
		setTimeout(() => {
			isLoaded('.btn-scroll-down');
			// if (isMobile) {
			// 	isLoaded('.to-load');
			// }
		}, 1500);
	}, 750);

const infiniteSliderSquares = new InfiniteSliderHome(
	$('#slider-container-squares'),
	2000,
	6000,
	'css',
	'easeOutQuad',
	false,
	true
);

Array.from(document.querySelectorAll('#tips .slider-container')).forEach(
	item => {
		const numberOfSlides = item.querySelectorAll('.slider > ul > li');

		if (numberOfSlides.length > 1) {
			new InfiniteSlider(
				item,
				1500,
				4000,
				'slide',
				'easeInOutQuint',
				false,
				false
			);
		} else {
			console.log({ item });
			addClass(item, 'disabled');
		}
	}
);

// Tips
$('#tips').each(function() {
	$('.slider-container > .slider > ul > li > div > div', this).width(
		$('.slider-container > .slider > ul > li > div > div img').width() - 1
	);
});

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
	Array.from(sliderSquares.querySelectorAll('.blur')).forEach(item => {
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
	if (tempHead) {
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

		if (scrollHeight * 0.95 > offset) {
			item.classList.remove('no-anim');
			isLoaded(item);
		} else if (scrollHeight < offset) {
			addClass(item, 'no-anim');
			item.classList.remove('loaded');
		}
	});

	// Slider Arrows in Header
	Array.from(
		document.querySelectorAll(
			'.card-container.home .btn-previous, .card-container.home .btn-next'
		)
	).forEach(btn => {
		btn.addEventListener('click', e => {
			e.preventDefault();
			const btnDirection = btn.className.split('-')[1];
			const currentScroll = window.scrollY;
			const delay = currentScroll > 0 ? 750 : 1;

			if (currentScroll > 0) {
				anime({
					targets: ['html', 'body'],
					scrollTop: 0,
					easing: 'easeInOutQuad',
				});
			}

			setTimeout(() => {
				document
					.querySelector(
						`#slider-container-squares .slider-arrows .${btnDirection} a`
					)
					.click();
			}, delay);
		});
	});
};

function scrollContent() {
	const newScroll = window.scrollY;
	const isPastTopOfWindow = newScroll > 10;

	if (isPastTopOfWindow) {
		addClass('.btn-scroll-down', 'hidden');
	} else if (hasClass('.btn-scroll-down', 'hidden')) {
		$scrollButton.classList.remove('hidden');
	}

	if (infiniteSliderSquares.running !== undefined) {
		if (isPastTopOfWindow && infiniteSliderSquares.running) {
			infiniteSliderSquares.running = false;
			// infiniteSliderSquares.stop();
		}

		if (!isPastTopOfWindow && !infiniteSliderSquares.running) {
			infiniteSliderSquares.running = true;
			// infiniteSliderSquares.start();
		}
	}

	// Tips - Sidebar
	const sidebar = $('#tips .sidebar');
	const sidebarHeight = sidebar.height();
	const sidebarOffset = parseInt(sidebar.css('top'), 10);

	const one = newScroll + sidebarHeight + sidebarOffset;
	const two = $('#tips #block1').height() - 210;

	const sidebarTransform =
		one > two
			? newScroll - (newScroll + sidebarHeight + sidebarOffset - two)
			: newScroll;

	sidebar.css({
		transform: 'translate(0, ' + sidebarTransform + 'px)',
		'-webkit-transform': 'translate(0, ' + sidebarTransform + 'px)',
	});

	const tipsListing = $('#tips #block1 .listing');
	const sidebarNav = $('#tips #block1 .sidebar ul');
	const activeNavItem = $('> li.active', sidebarNav);
	const currentIndex = activeNavItem.index();
	let newIndex = currentIndex;

	$('> li', tipsListing).each(function() {
		if (newScroll + $('window').height() / 2 > $(this).offset().top) {
			newIndex = $(this).index();
		}
	});

	if (newIndex !== currentIndex) {
		activeNavItem.removeClass('active');
		$('> li', sidebarNav)
			.eq(newIndex)
			.addClass('active');
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
	const $textGrid = document.querySelector('.text-grid');
	const modell = $textGrid.querySelector('.line:first-child > div:first-child')
		.clientWidth;

	$textGrid.style.marginTop = `${-modell / 2}px`;

	Array.from($textGrid.querySelectorAll('.line > div')).forEach(item => {
		const node = item;
		node.style.height = `${modell}px`;
	});
};

const fullHeight = () => {
	const $fullHeight = document.querySelector('.full-height');

	if ($fullHeight) {
		$fullHeight.style.height = `${window.innerHeight}px`;
	}
};

const initScrollSpy = () => {
	Array.from(document.querySelectorAll('.btn-anchor')).forEach(item => {
		item.addEventListener('click', e => {
			e.preventDefault();
			if (!isAnimationRunning && !hasClass(item, 'active')) {
				const targetScrollTop = getOffsetTop(
					document.querySelector(`#${item.getAttribute('data-anchor')}`)
				);
				const scroll = Math.abs(window.scrollY - targetScrollTop);
				const duration = scroll * 0.5 < 1250 ? 1250 : scroll * 0.5;

				anime({
					targets: ['html', 'body'],
					scrollTop: targetScrollTop,
					duration,
					easing: 'easeInOutQuad',
				});
			}
		});
	});
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
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
	scrollContent();
};

const { readyState, documentElement } = document;

if (
	readyState === 'complete' ||
	(readyState !== 'loading' && !documentElement.doScroll)
) {
	onReady();
} else {
	document.addEventListener('DOMContentLoaded', onReady);
}

const jqOnLoad = () => {
	initScrollSpy();
};

$btnHeader.addEventListener('click', openHeaderMenu);
$header.addEventListener('click', closeHeaderMenu);
window.onload = initHome();
window.onload = initTips();
window.onload = addClass('#slider-container-squares', 't-translate');
window.onload = positionContent();
window.onload = jqOnLoad();
