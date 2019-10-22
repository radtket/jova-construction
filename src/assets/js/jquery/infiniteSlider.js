import autoBind from 'auto-bind';
import anime from 'animejs/lib/anime.es.js';
import $ from './easing';
import {
	addClass,
	hasClass,
	getElementIndex,
	show,
	hide,
	fadeIn,
} from '../helpers';

class InfiniteSlider {
	constructor(
		wrapperArg,
		speedArg,
		durationArg,
		modeArg,
		easingArg,
		hoverArg,
		animationArg
	) {
		// If true : running
		this.animated = false;
		// Autorotation
		this.hover = hoverArg;
		this.autorotation = animationArg;
		this.running = true;
		this.t = null;
		// Setting the container and controller
		this.wrapper = wrapperArg;
		this.container = this.wrapper.querySelector('.slider');
		this.arrows = this.wrapper.querySelector('.slider-arrows');
		this.count = this.arrows.querySelector('.count');
		this.controls = this.wrapper.querySelector('.slider-controls');
		this.infos = this.wrapper.querySelector('.slider-infos');
		this.speed = speedArg;
		this.duration = durationArg;
		this.mode = modeArg; // slide - slidev - fade - demask
		this.easing = easingArg;
		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;
		// Setting index : slide ordered index || indexSlide : slide real index
		this.index = 0;
		this.indexSlide = 0;
		// Number of elements
		this.length = Array.from(this.container.querySelectorAll('li')).length - 1;
		autoBind(this);
		this.init();
	}

	init() {
		const {
			arrows,
			arrowsClick,
			container,
			controls,
			controlsClick,
			count,
			hover,
			index,
			infos,
			length,
			reset,
			running,
			wrapper,
		} = this;

		// Identify each slide and control with initial order
		const listItems = container.querySelectorAll('ul > li');
		const controlsListItems = controls.querySelectorAll('li');

		Array.from(listItems).forEach((item, i) => {
			const slideIndex = i + 1;
			const isActive = i === 0 ? 'active' : 'inactive';
			item.setAttribute('data-slide', slideIndex);
			addClass(item, isActive);
			controls.innerHTML += `<li class="${isActive}" data-slide="${slideIndex}"><a href="">Slide ${slideIndex}</a></li>`;
		});

		Array.from(controlsListItems).forEach((item, i) => {
			const slideIndex = i + 1;
			const isActive = i === 0 ? 'active' : 'inactive';
			item.setAttribute('data-slide', slideIndex);
			addClass(item, isActive);
		});

		// Fill Count values
		count.innerHTML += `${index + 1} / ${length + 1}`;

		// Fill First Infos
		// ! TODO
		// if ($('> ul > li:eq(0)', container).attr('data-infos') !== '') {
		// 	$(infos).html($('> ul > li:eq(0)', container).attr('data-infos'));
		// }

		// Disable if just one slide
		if (length === 0) {
			controls.style.display = 'none';
			this.autorotation = false;
		}

		// Initiate Positioning
		this.reset();

		// Bind
		if (hover) {
			console.log({ wrapper });

			wrapper.onmouseenter = () => {
				this.stop();
			};

			wrapper.onmouseleave = () => {
				this.start();
			};
		}

		Array.from(controls.querySelectorAll('li a')).forEach(item => {
			item.addEventListener('click', e => {
				e.preventDefault();
				controlsClick(item);
			});
		});

		Array.from(arrows.querySelectorAll('li a')).forEach(item => {
			item.addEventListener('click', e => {
				e.preventDefault();
				arrowsClick(item);
			});
		});

		window.onresize = reset;

		// Start Autorotation
		if (running) {
			this.autoRotation();
		}
	}

	autoRotation() {
		console.log('autoRotation');
		clearTimeout(this.t);
		const {
			controls,
			autorotation,
			running,
			changeSlide,
			indexSlide,
			duration,
		} = this;

		if (
			Array.from(controls.querySelectorAll('li')).length > 1 &&
			autorotation &&
			running
		) {
			this.t = setTimeout(() => {
				changeSlide(indexSlide, indexSlide + 1);
			}, duration);
		}
	}

	start() {
		console.log('start');
		this.running = true;
		this.autoRotation();

		return false;
	}

	stop() {
		console.log('stop');
		clearTimeout(this.t);
		this.running = false;

		return false;
	}

	arrowsClick({ parentElement }) {
		console.log('arrowsClick');
		const { animated, changeSlide, indexSlide } = this;
		if (!animated) {
			this.autorotation = false;
			// Stop timer
			clearTimeout(this.t);

			const clicked = hasClass(parentElement, 'next')
				? indexSlide + 1
				: indexSlide - 1;

			changeSlide(indexSlide, clicked);
		}

		return false;
	}

	controlsClick({ parentElement }) {
		console.log('controlsClick');
		const { animated, changeSlide, indexSlide, container } = this;

		if (!animated && !hasClass(parentElement, 'active')) {
			this.autorotation = false;
			// Stop timer
			clearTimeout(this.t);

			// const clicked = listItem.index();
			const clicked = getElementIndex(parentElement);

			Array.from(container.querySelectorAll('ul > li')).forEach((item, i) => {
				const listItemIndex = parseInt(item.getAttribute('data-slide'), 10);
				if (listItemIndex === clicked + 1) {
					const index = getElementIndex(item);
					console.log(i, 'vs', index);
					changeSlide(indexSlide, index);
				}
			});
		}

		return false;
	}

	reset() {
		console.log('reset');
		const { animated, mode, container, infos, start } = this;

		if (!animated) {
			this.stop();
			this.width = container.offsetWidth;
			this.height = container.offsetHeight;

			Array.from(container.querySelectorAll('ul > li')).forEach(item => {
				item.style.width = `${this.width}px`;
			});

			// Demask Specific
			if (mode === 'demask') {
				Array.from(container.querySelectorAll('ul > li')).forEach(item => {
					if (hasClass(item, 'inactive')) {
						item.style.width = 0;
					}

					item.querySelector('img').style.width = `${this.width}px`;
				});
			}

			// Columns Specific
			if (mode === 'columns') {
				$('> ul > li > img', container).each(function() {
					const backgroundNain = $(this);
					const wrapper = $(this).parent();
					const wrapperWidth = wrapper.width();
					const wrapperHeight = wrapper.height();
					const colWidth = parseInt(
						$(this)
							.parent()
							.attr('data-col-width'),
						10
					);
					let nbCols;
					let columnsContent = '';

					// Background Image
					const bgMainRatio = 1920 / 1080;
					const wrapperRatio = wrapperWidth / wrapperHeight;

					// Background Main
					if (bgMainRatio > wrapperRatio) {
						// Calculate Width depending on ColWidth
						let imgWidth = wrapperHeight * bgMainRatio;

						nbCols = Math.ceil(imgWidth / colWidth);

						if (nbCols % 2 != 1) {
							nbCols += 1;
						}

						imgWidth = nbCols * colWidth;

						// Resize Containers
						backgroundNain
							.width(imgWidth)
							.height(imgWidth / bgMainRatio)
							.css(
								'left',
								`${-(backgroundNain.width() / 2 - wrapperWidth / 2)}px`
							)
							.css(
								'top',
								`${-(backgroundNain.height() / 2 - wrapperHeight / 2)}px`
							);

						backgroundNain
							.siblings('.columns')
							.width(imgWidth)
							.height(imgWidth / bgMainRatio)
							.css(
								'left',
								`${-(backgroundNain.width() / 2 - wrapperWidth / 2)}px`
							)
							.css(
								'top',
								`${-(backgroundNain.height() / 2 - wrapperHeight / 2)}px`
							);
					} else {
						// Calculate Width depending on ColWidth
						let imgWidth = wrapperWidth;

						nbCols = Math.ceil(imgWidth / colWidth);

						if (nbCols % 2 != 1) {
							nbCols += 1;
						}

						imgWidth = nbCols * colWidth;

						const applyBgStyles = element =>
							element
								.width(imgWidth)
								.height(imgWidth / bgMainRatio)
								.css(
									'left',
									`${-(backgroundNain.width() / 2 - wrapperWidth / 2)}px`
								)
								.css(
									'top',
									`${-(backgroundNain.height() / 2 - wrapperHeight / 2)}px`
								);

						// Resize Containers
						applyBgStyles(backgroundNain);
						applyBgStyles(backgroundNain.siblings('.columns'));
					}

					// Fill Columns
					for (let i = 0; i < nbCols; i += 1) {
						const imgSrc = $(this)
							.parent()
							.attr('data-img-src');
						columnsContent += `<li><div><img src="${imgSrc} alt="" style="left: ${-i *
							colWidth}px; width: ${backgroundNain.width()}px; height: ${backgroundNain.height()}px"/></div></li>`;
					}

					backgroundNain.siblings('.columns').html(columnsContent);
				});
			}

			$(infos).css(
				'top',
				`${$(container).height() / 2 - $(infos).height() / 2}px`
			);

			start();
		}
	}

	changeSlide(current, clickedArg) {
		let clicked = clickedArg;
		console.log('changeSlide');
		const {
			autoRotation,
			container,
			controls,
			count,
			easing,
			infos,
			mode,
			running,
			speed,
			reset,
		} = this;

		this.animated = true;

		let direction = 'next';
		const listItems = Array.from(container.querySelectorAll('ul > li'));

		if (clicked < current) {
			direction = 'previous';
		}

		// Check limits
		if (clicked > this.length) {
			clicked = 0;
		} else if (clicked < 0) {
			clicked = this.length;
		}

		// Redefine active slide
		listItems.forEach(item => {
			if (hasClass(item, 'active')) {
				item.classList.remove('active');
			}
			addClass(item, 'inactive');
		});

		const listItemClickedd = listItems[clicked];

		listItemClickedd.classList.remove('inactive');
		addClass(listItemClickedd, 'active');

		this.index = parseInt(listItemClickedd.getAttribute('data-slide'), 10) - 1;

		this.indexSlide = getElementIndex(listItemClickedd);

		// Redefine active control
		Array.from(controls.querySelectorAll('li')).forEach((item, i) => {
			if (hasClass(item, 'active')) {
				item.classList.remove('active');
			}
			addClass(item, 'inactive');

			if (i === this.index) {
				addClass(item, 'active');
			}
		});

		// Change Count
		count.innerHTML = `${this.index + 1} / ${this.length + 1}`;

		// Animate Infos
		$(infos).fadeOut(speed / 2, function() {
			$('> li', infos).hide();
			$('> li', infos)
				.eq(clicked)
				.show();
			$(this)
				.show()
				.css('opacity', '0');
			reset();
			$(this).animate({ opacity: 1 }, speed / 2);
		});

		const options = {
			duration: speed,
			easing,
			complete: () => {
				this.animated = false;

				container.querySelectorAll('ul > li.inactive').forEach(item => {
					hide(item);
				});
				if (running) {
					autoRotation();
				}
			},
		};

		const animateIt = (pos, widthOrHeight, dir) => {
			const opperator = dir === 'next' ? '-=' : '+=';
			const size = dir !== 'next' ? '-' : '';

			listItemClickedd.style[pos] = `${this[widthOrHeight]}px`;
			show(listItemClickedd);

			anime({
				targets: listItemClickedd,
				[pos]: `${opperator}${size}${this[widthOrHeight]}`,
				...options,
			});
		};

		const stopAnumation = () => {
			this.animated = false;

			if (running) {
				autoRotation();
			}
		};

		const isActive = container.querySelector('ul > li.active');
		const listItem = $('> ul > li', container);
		// Animate Slides
		switch (mode) {
			case 'slide':
				animateIt('left', 'width', direction);
				break;
			case 'slidev':
				animateIt('top', 'height', direction);
				break;
			case 'fade':
				fadeIn(isActive);
				hide(listItems[current]);
				stopAnumation();

				break;
			case 'demask':
				$('> ul > li.active', container).animate(
					{ width: this.width },
					speed,
					easing,
					() => {
						listItem.eq(current).hide();
						$('> ul > li.inactive', container).width(0);
						stopAnumation();
					}
				);
				break;
			case 'columns':
				const currentColumn = listItem.eq(current).find('.columns > li > div');

				listItemClickedd.style.left = 0;

				currentColumn.animate({ width: 0 }, speed, easing, () => {
					listItem.eq(current).css('left', '100%');
					currentColumn.width('100%');
					stopAnumation();
				});
				break;

			default:
			// code block
		}
	}
}

export default InfiniteSlider;
