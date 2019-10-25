import imagesLoaded from 'imagesLoaded';
import anime from 'animejs/lib/anime.es.js';
import $ from 'jquery';
import {
	addClass,
	isLoaded,
	hasClass,
	scrollIt,
	getOffsetTop,
	fadeOut,
	fadeIn,
} from './helpers';
import InfiniteSlider from './jquery/infiniteSlider';
import InfiniteSliderHome from './jquery/infiniteSliderHome';
import triggerScroll from './jquery/triggerScroll';

// Pages
import initHome from './pages/home';
import initAbout from './pages/about';
import initTips from './pages/tips';

// Elements
const $btnHeader = document.querySelector('#header_btn-menu');
const $header = document.querySelector('#header');
const $scrollButton = document.querySelector('.btn-scroll-down');
const $wrapper = document.querySelector('#wrapper');
const $footer = document.querySelector('#footer');
const $body = document.querySelector('body');
let isAnimationRunning = false;
let aboutTimeout;

// Pages
const $about = document.querySelector('#about');
/* Feature detection */
let passiveIfSupported = false;

try {
	window.addEventListener(
		'test',
		null,
		Object.defineProperty({}, 'passive', {
			get() {
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

const initGallery = () => {
	const $cardContainer = document.querySelector(
		'#slider-container-squares .card-container'
	);

	if ($cardContainer) {
		const $btnMenu = $cardContainer.querySelector('.btn-menu a');
		const $btnInfosOpen = $cardContainer.querySelector('.btn-infos a');
		const $btnInfosClose = $cardContainer.querySelector('.btn-infos-close a');

		if ($btnMenu) {
			// Open Menu
			$btnMenu.addEventListener('click', e => {
				e.preventDefault();
				$btnHeader.click();
			});
		}

		if ($btnInfosOpen) {
			$btnInfosOpen.addEventListener('click', function(e) {
				e.preventDefault();
				const { parentElement } = this;
				const container = this.closest('.card-container');
				const closeButton = container.querySelector('.btn-infos-close');
				const wrapper = container.querySelector('div:first-child > div');

				if (!isAnimationRunning) {
					isAnimationRunning = true;
					fadeOut(parentElement);
					fadeIn(closeButton);
					wrapper.style.width = 'auto';

					anime({
						targets: container,
						width: 585,
						easing: 'easeInQuad',
						duration: 450,
						complete(anim) {
							const { offsetHeight } = container.querySelector(
								'.infos > .text'
							);
							anim.finished.then(() => {
								anime({
									targets: container.querySelector('.infos'),
									height: offsetHeight,
									easing: 'easeInQuad',
									duration: 550,
									complete(ani) {
										ani.finished.then(() => {
											isAnimationRunning = false;
										});
									},
								});
							});
						},
					});
				}
			});
		}

		if ($btnInfosClose) {
			$btnInfosClose.addEventListener('click', function(e) {
				e.preventDefault();
				const { parentElement } = this;
				const container = this.closest('.card-container');
				const openButton = container.querySelector('.btn-infos');
				const wrapper = container.querySelector('div:first-child > div');

				if (!isAnimationRunning) {
					isAnimationRunning = true;
					fadeOut(parentElement);
					fadeIn(openButton);

					anime({
						targets: container.querySelector('.infos'),
						height: 0,
						easing: 'easeOutQuad',
						duration: 550,
						complete(anim) {
							anim.finished.then(() => {
								anime({
									targets: container,
									width: 480,
									easing: 'easeOutQuad',
									duration: 450,
									complete(ani) {
										ani.finished.then(() => {
											wrapper.style.width = 'auto';
											isAnimationRunning = false;
										});
									},
								});
							});
						},
					});
				}
			});
		}

		return setTimeout(() => {
			isLoaded('#slider-container-squares .card-container');
		}, 750);
	}

	return false;
};

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
			addClass(item, 'disabled');
		}
	}
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

	if (sliderSquares) {
		sliderSquares.style.top = `${sliderPos}px`;
		sliderSquares.querySelector('.slider').style.top = `${-sliderPos * 0.75}px`;

		// Homepage Blur
		Array.from(sliderSquares.querySelectorAll('.blur')).forEach(item => {
			item.style.opacity = (newScroll * 1.5) / windowHeight;
		});
	}
};

// Parallax
const initParallax = () => {
	const $parallax = document.querySelectorAll('.parallax');
	const newScroll = window.scrollY;
	const windowHeight = window.innerHeight;
	if ($parallax) {
		Array.from($parallax).forEach(item => {
			const parallaxHeight = item.offsetHeight;
			const parallaxOffset = getOffsetTop(item);
			const textScroll = parallaxOffset - newScroll;
			let tempScroll = textScroll;
			const percTranslate = tempScroll / parallaxHeight;
			const scollHalfWay = newScroll + windowHeight * 0.5;

			// Set Limits
			if (tempScroll < -parallaxHeight) {
				tempScroll = -parallaxHeight;
			}

			if (tempScroll > parallaxHeight) {
				tempScroll = parallaxHeight;
			}

			const $card2 = item.querySelector('.card-container.card2');
			const $img = item.querySelector('.img');
			const $tg1 = item.querySelector('.text-grid');

			if ($card2) {
				$card2.style.transform = `translate(0, ${150 * -percTranslate}px)`;
			}

			if ($img) {
				$img.style.transform = `translate(0, ${550 * -percTranslate}px)`;
			}

			if ($tg1) {
				$tg1.style.transform = `translate(0, ${-textScroll}px)`;
			}

			if (
				scollHalfWay > parallaxOffset &&
				scollHalfWay < parallaxOffset + parallaxHeight &&
				!hasClass(item, 'active')
			) {
				// Unload
				Array.from($parallax).forEach(item1 => {
					const $tg2 = item1.querySelector('.text-grid');
					const $lines = $tg2.querySelectorAll('.line');
					item1.classList.remove('active');
					$tg2.classList.remove('visible');

					if ($lines) {
						Array.from($lines).forEach(line => {
							line.classList.remove('loaded');
						});
					}
				});

				// Reload
				addClass(item, 'active');
				clearTimeout(aboutTimeout);
				aboutTimeout = setTimeout(() => {
					const newTg = item.querySelector('.text-grid');
					addClass(newTg, 'visible');
					const $newLines = newTg.querySelectorAll('.line');

					if ($newLines) {
						Array.from($newLines).forEach(l => {
							isLoaded(l);
						});
					}
				}, 750);
			}
		});
	}
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
	const $toLoad = document.querySelectorAll('.to-load');

	Array.from($toLoad).forEach(item => {
		const offset = getOffsetTop(item);

		if (window.scrollY + window.innerHeight * 0.85 > offset) {
			item.classList.remove('no-anim');
			isLoaded(item);
		} else if (window.scrollY + window.innerHeight < offset) {
			addClass(item, 'no-anim');
			item.classList.remove('loaded');
		}
	});

	// Slider Arrows in Header
	Array.from(
		document.querySelectorAll(
			'.card-container .btn-previous, .card-container .btn-next'
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
			infiniteSliderSquares.stop();
		}

		if (!isPastTopOfWindow && !infiniteSliderSquares.running) {
			infiniteSliderSquares.start();
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
		transform: `translate(0, ${sidebarTransform}px)`,
		'-webkit-transform': `translate(0, ${sidebarTransform}px)`,
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
	// Parallax
	initParallax();
	// Parallax Icons
	parallaxIcons();

	demaskFooter();
}

const adjustTextGrids = () => {
	const $textGrid = document.querySelectorAll('.text-grid');

	if ($textGrid) {
		Array.from($textGrid).forEach(item => {
			const modell = item.querySelector('.line:first-child > div:first-child')
				.clientWidth;
			item.style.marginTop = `${-modell / 2}px`;

			Array.from(item.querySelectorAll('.line > div')).forEach(node => {
				node.style.height = `${modell}px`;
			});
		});
	}
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

	// Tips
	const $tips = document.querySelectorAll(
		'#tips .slider-container > .slider > ul > li > div > div'
	);

	if ($tips) {
		Array.from($tips).forEach(item => {
			const { offsetWidth } = item.querySelector('img');
			item.style.width = `${offsetWidth - 1}px`;
		});
	}
}

window.addEventListener(
	'scroll',
	() => {
		scrollContent();
	},
	passiveIfSupported
);

const jqOnLoad = () => {
	initScrollSpy();
};

$btnHeader.addEventListener('click', openHeaderMenu);
$header.addEventListener('click', closeHeaderMenu);
window.onload = initHome();
window.onload = initGallery();
window.onload = initTips();
window.onLoad = initAbout($about);
window.onload = addClass('#slider-container-squares', 't-translate');
window.onload = positionContent();
window.onload = jqOnLoad();

document.addEventListener('readystatechange', event => {
	if (document.readyState === 'complete') {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		scrollContent();
		$wrapper.style.paddingBottom = `${$footer.offsetHeight}px`;
	}
});
