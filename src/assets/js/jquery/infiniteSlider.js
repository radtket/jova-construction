import $ from './easing';
import autoBind from 'auto-bind';
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
		this.wrapper = $(wrapperArg);
		this.container = $('.slider', this.wrapper);
		this.arrows = $('.slider-arrows', this.wrapper);
		this.count = $('.count', this.arrows);
		this.controls = $('.slider-controls', this.wrapper);
		this.infos = $('.slider-infos', this.wrapper);
		this.speed = speedArg;
		this.duration = durationArg;
		this.mode = modeArg; // slide - slidev - fade - demask
		this.easing = easingArg;
		this.width = this.container.width();
		this.height = this.container.height();
		// Setting index : slide ordered index || indexSlide : slide real index
		this.index = 0;
		this.indexSlide = 0;
		// Number of elements
		this.length = $('li', this.container).length - 1;
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
		$('> ul > li', container).each(function() {
			const i = $(this).index();
			const slideIndex = i + 1;
			const isActive = i === 0 ? 'active' : 'inactive';
			const template = `<li class="${isActive}" data-slide="${slideIndex}"><a href="">Slide ${slideIndex}</a></li>`;
			$(this).attr('data-slide', slideIndex);
			$(this).addClass(isActive);
			$(controls).append(template);
		});

		$('li', controls).each(function() {
			const i = $(this).index();
			const slideIndex = i + 1;
			const isActive = i === 0 ? 'active' : 'inactive';

			$(this).attr('data-slide', slideIndex);
			$(this).addClass(isActive);
		});

		// Fill Count values
		$(count).html(index + 1 + ' / ' + (length + 1));

		// Fill First Infos

		if ($('> ul > li:eq(0)', container).attr('data-infos') !== '') {
			$(infos).html($('> ul > li:eq(0)', container).attr('data-infos'));
		}

		// Disable if just one slide
		if (length === 0) {
			$(controls).hide();
			this.autorotation = false;
		}

		// Initiate Positioning
		this.reset();

		// Bind
		if (hover) {
			$(wrapper).mouseenter(() => {
				this.stop();
			});
			$(wrapper).mouseleave(() => {
				this.start();
			});
		}

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
			this.autorotation = false;
			// Stop timer
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
			// Stop timer
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
		const { animated, mode, container, infos, start } = this;
		if (!animated) {
			this.stop();
			this.width = container.width();
			this.height = container.height();
			$('> ul > li', container).width(this.width);

			// Demask Specific
			if (mode === 'demask') {
				$('> ul > li.inactive', container).width(0);
				$('> ul > li > img', container).width(this.width);
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
								-(backgroundNain.width() / 2 - wrapperWidth / 2) + 'px'
							)
							.css(
								'top',
								-(backgroundNain.height() / 2 - wrapperHeight / 2) + 'px'
							);

						backgroundNain
							.siblings('.columns')
							.width(imgWidth)
							.height(imgWidth / bgMainRatio)
							.css(
								'left',
								-(backgroundNain.width() / 2 - wrapperWidth / 2) + 'px'
							)
							.css(
								'top',
								-(backgroundNain.height() / 2 - wrapperHeight / 2) + 'px'
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
									-(backgroundNain.width() / 2 - wrapperWidth / 2) + 'px'
								)
								.css(
									'top',
									-(backgroundNain.height() / 2 - wrapperHeight / 2) + 'px'
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
				$(container).height() / 2 - $(infos).height() / 2 + 'px'
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
		const listItem = $('> ul > li', container);

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
		listItem.removeClass('active').addClass('inactive');

		const listItemClicked = listItem.eq(clicked);

		listItemClicked.removeClass('inactive').addClass('active');

		this.index =
			parseInt($('> ul > li.active', container).attr('data-slide'), 10) - 1;

		this.indexSlide = $('> ul > li.active', container).index();

		// Redefine active control
		$('li', controls).removeClass('active');
		$('li', controls)
			.eq(this.index)
			.addClass('active');

		// Change Count
		$(count).html(
			$('> ul > li.active', container).attr('data-slide') +
				' / ' +
				(this.length + 1)
		);

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

		const activeListItem = $('> ul > li.active', container);

		const stopAnumation = () => {
			this.animated = false;

			if (running) {
				autoRotation();
			}
		};

		// Animate Slides
		if (mode === 'slide') {
			animateIt('left', 'width', direction);
		} else if (mode === 'slidev') {
			animateIt('top', 'height', direction);
		} else if (mode === 'fade') {
			// Animate Slides
			activeListItem.fadeIn(speed, () => {
				listItem.eq(current).hide();
				stopAnumation();
			});
		} else if (mode === 'demask') {
			activeListItem.animate({ width: this.width }, speed, easing, () => {
				$('> ul > li.inactive', container).width(0);
				stopAnumation();
			});
		} else if (mode === 'columns') {
			const currentColumn = listItem.eq(current).find('.columns > li > div');
			listItemClicked.css('left', '0');

			currentColumn.animate({ width: 0 }, speed, easing, () => {
				listItem.eq(current).css('left', '100%');
				currentColumn.width('100%');
				stopAnumation();
			});
		}
	}
}

export default InfiniteSlider;
