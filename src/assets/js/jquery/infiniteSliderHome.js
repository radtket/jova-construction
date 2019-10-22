import $ from './easing';
import autoBind from 'auto-bind';

class InfiniteSliderHome {
	constructor(
		wrapperArg,
		speedArg,
		durationArg,
		modeArg,
		easingArg,
		hoverArg,
		animationArg
	) {
		this.animated = false;
		this.hover = hoverArg;
		this.autorotation = animationArg;
		this.running = true;
		this.t = null;
		this.wrapper = $(wrapperArg);
		this.container = $('.slider', this.wrapper);
		this.arrows = $('.slider-arrows', this.wrapper);
		this.count = $('.count', this.arrows);
		this.controls = $('.slider-controls', this.wrapper);
		this.infos = $('.slider-infos', this.wrapper);
		this.speed = speedArg;
		this.duration = durationArg;
		this.mode = modeArg;
		this.easing = easingArg;
		this.width = this.container.width();
		this.height = this.container.height();
		this.index = 0;
		this.indexSlide = 0;
		this.length = $('li', this.container).length - 1;
		this.isGallery = $('#gallery').length === 1;
		autoBind(this);
		this.init();
	}

	init() {
		const {
			arrows,
			arrowsClick,
			autoRotation,
			container,
			controls,
			controlsClick,
			count,
			index,
			infos,
			isGallery,
			reset,
		} = this;

		$('> ul > li', container).each(function() {
			const i = $(this).index();
			const slideIndex = i + 1;
			const isActive = i === 0 ? 'active' : 'inactive';
			const template = `<li class="${isActive}" data-slide="${slideIndex}"><a href="">Slide ${slideIndex}</a></li>`;

			$(this).attr('data-slide', slideIndex);
			$(this).addClass(isActive);
			$(controls).append(template);

			//! gallery
			if (i === 0 && isGallery) {
				$('h2 .big').html($(this).attr('data-project-title'));
				$('.infos .text > div').html($(this).attr('data-project-content'));
			}
		});

		$('li', controls).each(function() {
			const i = $(this).index();
			const slideIndex = i + 1;
			const isActive = i === 0 ? 'active' : 'inactive';

			$(this).attr('data-slide', slideIndex);
			$(this).addClass(isActive);
		});

		$(count).html(`${index + 1} / ${this.length + 1}`);

		if ($('> ul > li:eq(0)', container).attr('data-infos') !== '') {
			$(infos).html($('> ul > li:eq(0)', container).attr('data-infos'));
		}

		if (this.length === 0) {
			$(controls).hide();
			this.autorotation = false;
		}

		reset();

		$('li a', controls).click(function(e) {
			e.preventDefault();
			controlsClick($(this));
		});

		$('li a', arrows).click(function(e) {
			e.preventDefault();
			arrowsClick($(this));
		});

		$(window).resize(() => {
			reset();
		});

		$(document).keydown(({ keyCode }) => {
			switch (keyCode) {
				case 39:
					$('.slider-arrows .next a').trigger('click');
					break;
				case 37:
					$('.slider-arrows .previous a').trigger('click');
					break;
				default:
					break;
			}
		});

		if (isGallery) {
			this.running = false;
		}

		if (this.running) {
			autoRotation();
		}
	}

	autoRotation() {
		console.log('autoRotation');
		clearTimeout(this.t);
		const {
			autorotation,
			changeSlide,
			controls,
			duration,
			indexSlide,
			isGallery,
			running,
		} = this;

		if (isGallery) {
			this.running = false;
		}

		if ($('li', controls).length > 1 && autorotation && running) {
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

	arrowsClick(object) {
		console.log('arrowsClick');
		const { animated, changeSlide, indexSlide } = this;
		if (!animated) {
			clearTimeout(this.t);
			const clicked = $(object)
				.parent()
				.hasClass('next')
				? indexSlide + 1
				: indexSlide - 1;

			changeSlide(indexSlide, clicked);
		}

		return false;
	}

	controlsClick(object) {
		console.log('controlsClick');
		const { animated, changeSlide, indexSlide, container } = this;
		const listItem = $(object).parent();

		if (!animated && listItem.hasClass('active') === false) {
			this.autorotation = false;

			clearTimeout(this.t);

			const clicked = listItem.index();

			$('> ul > li', container).each(function() {
				const listItemIndex = parseInt($(this).attr('data-slide'), 10);
				if (listItemIndex === clicked + 1) {
					changeSlide(indexSlide, $(this).index());
				}
			});
		}

		return false;
	}

	reset() {
		console.log('reset');
		const { animated, container, start, stop } = this;

		if (!animated) {
			stop();
			this.width = container.width();
			this.height = container.height();

			start();
		}
	}

	changeSlide(current, clickedArg) {
		const {
			autoRotation,
			container,
			controls,
			easing,
			isGallery,
			mode,
			running,
			speed,
			width,
		} = this;
		this.animated = true;
		let direction = 'next';
		let clicked = clickedArg;
		const listItem = $('> ul > li', container);

		if (clicked < current) {
			direction = 'previous';
		}

		if (clicked > this.length) {
			clicked = 0;
		} else if (clicked < 0) {
			clicked = this.length;
		}

		listItem.removeClass('active').addClass('inactive');

		const listItemClicked = listItem.eq(clicked);

		listItemClicked.removeClass('inactive').addClass('active');

		const activeListItem = $('> ul > li.active', container);

		this.index = parseInt(activeListItem.attr('data-slide'), 10) - 1;
		this.indexSlide = activeListItem.index();

		$('li', controls).removeClass('active');
		$('li', controls)
			.eq(this.index)
			.addClass('active');

		const options = {
			duration: speed,
			easing,
			complete: () => {
				console.log(this.animated);
				this.animated = false;
				$('> ul > li.inactive', container).hide();
				if (running) {
					autoRotation();
				}
			},
		};

		const animateIt = (pos, widthOrHeight, dir) => {
			const opperator = dir === 'next' ? '-=' : '+=';
			const size = dir !== 'next' ? '-' : '';

			listItemClicked.css(pos, this[widthOrHeight] + 'px').show();

			// Animate slides
			listItem.animate(
				{ [pos]: opperator + `${size}${this[widthOrHeight]}` },
				options
			);
		};

		switch (mode) {
			case 'slide':
				animateIt('left', 'width', direction);
				break;
			case 'slidev':
				animateIt('top', 'height', direction);
				break;
			case 'fade':
				activeListItem.fadeIn(speed, () => {
					listItem.eq(current).hide();
					this.animated = false;
					if (running) {
						autoRotation();
					}
				});
				break;
			case 'demask':
				$('> ul > li.active', container).animate(
					{ width },
					speed,
					easing,
					() => {
						$('> ul > li.inactive', container).width(0);
						this.animated = false;
						if (running) {
							autoRotation();
						}
					}
				);
				break;
			case 'columns':
				listItem.eq(clicked).css('left', '0');

				listItem
					.eq(current)
					.find('.columns > li > div')
					.animate({ width: 0 }, speed, easing, function() {
						listItem.eq(current).css('left', '100%');
						listItem
							.eq(current)
							.find('.columns > li > div')
							.width('100%');
						this.animated = false;
						if (running) {
							autoRotation();
						}
					});
				break;
			case 'css':
				if (
					isGallery &&
					$('h2 .big').html() != listItem.eq(clicked).attr('data-project-title')
				) {
					$('h2 .big').html(listItem.eq(clicked).attr('data-project-title'));

					$('.infos .text > div').html(
						listItem.eq(clicked).attr('data-project-content')
					);
				}

				listItem.eq(current).addClass('leaving');
				setTimeout(() => {
					listItem.eq(current).addClass('no-anim');
					listItem.eq(current).removeClass('leaving');
					listItem.eq(current).removeClass('no-anim');
					this.animated = false;
					autoRotation();
				}, speed);
				break;
			default:
		}
	}
}

export default InfiniteSliderHome;
