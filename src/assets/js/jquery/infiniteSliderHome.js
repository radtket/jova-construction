import $ from 'jquery';
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
		autoBind(this);
		this.init();
	}

	init() {
		const {
			autoRotation,
			arrows,
			arrowsClick,
			container,
			controls,
			controlsClick,
			count,
			index,
			infos,
			reset,
			running,
		} = this;
		$('> ul > li', container).each(function() {
			$(this).attr('data-slide', $(this).index() + 1);
			console.log('zzz', $(this).index());
			if ($(this).index() === 0) {
				$(controls).append(
					`<li class="active" data-slide="${$(this).index() +
						1}"><a href="">Slide ${$(this).index() + 1}</a></li>`
				);

				if ($('#gallery').length === 1) {
					$('h2 .big').html($(this).attr('data-project-title'));
					$('.infos .text > div').html($(this).attr('data-project-content'));
				}
			} else {
				$(this).addClass('inactive');
				$(controls).append(
					`<li class="inactive" data-slide="${$(this).index() +
						1}"><a href="">Slide ${$(this).index() + 1}</a></li>`
				);
			}
		});

		$('li', controls).each(function() {
			$(this).attr('data-slide', $(this).index() + 1);

			if ($(this).index() == 0) {
				$(this).addClass('active');
			} else {
				$(this).addClass('inactive');
			}
		});

		$(count).html(`${index + 1} / ${this.length + 1}`);

		if ($('> ul > li:eq(0)', container).attr('data-infos') != '') {
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

			return false;
		});

		$('li a', arrows).click(function(e) {
			e.preventDefault();
			arrowsClick($(this));

			return false;
		});

		$(window).resize(() => {
			reset();
		});

		$(document).keydown(({ keyCode }) => {
			if (keyCode === 39) {
				$('.slider-arrows .next a').trigger('click');
			}

			if (keyCode === 37) {
				$('.slider-arrows .previous a').trigger('click');
			}
		});

		if ($('#gallery').length === 1) {
			this.running = false;
		}
		if (running) {
			autoRotation();
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

		if ($('#gallery').length === 1) {
			this.running = false;
		}

		if ($('li', controls).length > 1 && autorotation && running) {
			this.t = setTimeout(function() {
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
			let clicked;
			if (
				$(object)
					.parent()
					.hasClass('next')
			) {
				clicked = this.indexSlide + 1;
			} else {
				clicked = this.indexSlide - 1;
			}

			changeSlide(indexSlide, clicked);
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

	controlsClick(object) {
		const { animated, changeSlide, indexSlide, container } = this;
		if (
			!animated &&
			$(object)
				.parent()
				.hasClass('active') == false
		) {
			this.autorotation = false;

			clearTimeout(this.t);

			const clicked = $(object)
				.parent()
				.index();

			$('> ul > li', container).each(function() {
				if ($(this).attr('data-slide') == clicked + 1) {
					changeSlide(indexSlide, $(this).index());
				}
			});
		}

		return false;
	}

	changeSlide(current, clickedArg) {
		const {
			autoRotation,
			container,
			controls,
			easing,
			height,
			mode,
			running,
			speed,
			width,
		} = this;
		this.animated = true;
		let direction = 'next';
		let clicked = clickedArg;
		if (clicked < current) {
			direction = 'previous';
		}
		if (clicked > this.length) {
			clicked = 0;
		} else if (clicked < 0) {
			clicked = this.length;
		}

		$('> ul > li', container)
			.removeClass('active')
			.addClass('inactive');
		$('> ul > li', container)
			.eq(clicked)
			.removeClass('inactive')
			.addClass('active');

		this.index =
			parseInt($('> ul > li.active', container).attr('data-slide'), 10) - 1;
		this.indexSlide = $('> ul > li.active', container).index();

		$('li', controls).removeClass('active');
		$('li', controls)
			.eq(this.index)
			.addClass('active');

		switch (mode) {
			case 'slide':
				console.log({ direction });
				if (direction === 'next') {
					$('> ul > li', container)
						.eq(clicked)
						.css('left', `${width}px`)
						.show();

					$('> ul > li', container).animate(
						{ left: `-=${width}` },
						{
							duration: speed,
							easing,
							complete() {
								this.animated = false;
								$('> ul > li.inactive', container).hide();
								if (running) {
									autoRotation();
								}
							},
						}
					);
				} else {
					$('> ul > li', container)
						.eq(clicked)
						.css('left', `${-width}px`)
						.show();

					$('> ul > li', container).animate(
						{ left: `+=${width}` },
						{
							duration: speed,
							easing,
							complete() {
								this.animated = false;
								$('> ul > li.inactive', container).hide();
								if (running) {
									autoRotation();
								}
							},
						}
					);
				}
				break;
			case 'slidev':
				if (direction === 'next') {
					$('> ul > li', container)
						.eq(clicked)
						.css('top', `${height}px`)
						.show();

					$('> ul > li', container).animate(
						{ top: `-=${height}` },
						{
							duration: speed,
							easing,
							complete() {
								this.animated = false;
								$('> ul > li.inactive', container).hide();
								if (running) {
									autoRotation();
								}
							},
						}
					);
				} else {
					$('> ul > li', container)
						.eq(clicked)
						.css('top', `${-height}px`)
						.show();

					$('> ul > li', container).animate(
						{ top: `+=${height}` },
						{
							duration: speed,
							easing,
							complete() {
								this.animated = false;
								$('> ul > li.inactive', container).hide();
								if (running) {
									autoRotation();
								}
							},
						}
					);
				}
				break;
			case 'fade':
				$('> ul > li.active', container).fadeIn(speed, function() {
					$('> ul > li', container)
						.eq(current)
						.hide();
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
					function() {
						$('> ul > li.inactive', container).width(0);
						this.animated = false;
						if (running) {
							autoRotation();
						}
					}
				);
				break;
			case 'columns':
				$('> ul > li', container)
					.eq(clicked)
					.css('left', '0');
				$('> ul > li', container)
					.eq(current)
					.find('.columns > li > div')
					.animate({ width: 0 }, speed, easing, function() {
						$('> ul > li', container)
							.eq(current)
							.css('left', '100%');
						$('> ul > li', container)
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
					$('#gallery').length === 1 &&
					$('h2 .big').html() !=
						$('> ul > li', container)
							.eq(clicked)
							.attr('data-project-title')
				) {
					$('h2 .big').html(
						$('> ul > li', container)
							.eq(clicked)
							.attr('data-project-title')
					);
					$('.infos .text > div').html(
						$('> ul > li', container)
							.eq(clicked)
							.attr('data-project-content')
					);
				}

				$('> ul > li', container)
					.eq(current)
					.addClass('leaving');
				setTimeout(() => {
					$('> ul > li', container)
						.eq(current)
						.addClass('no-anim');
					$('> ul > li', container)
						.eq(current)
						.removeClass('leaving');
					$('> ul > li', container)
						.eq(current)
						.removeClass('no-anim');
					this.animated = false;
					autoRotation();
				}, speed);
				break;
			default:
		}
	}
}

export default InfiniteSliderHome;
