import $ from 'jquery';

function InfiniteSliderHome(
	wrapper,
	speed,
	duration,
	mode,
	easing,
	hover,
	animation
) {
	const $infiniteSlider = this;
	this.animated = false;
	this.hover = hover;
	this.autorotation = animation;
	this.running = true;
	this.t;
	this.wrapper = $(wrapper);
	this.container = $('.slider', this.wrapper);
	this.arrows = $('.slider-arrows', this.wrapper);
	this.count = $('.count', this.arrows);
	this.controls = $('.slider-controls', this.wrapper);
	this.infos = $('.slider-infos', this.wrapper);
	this.speed = speed;
	this.duration = duration;
	this.mode = mode;
	this.easing = easing;
	this.width = this.container.width();
	this.height = this.container.height();
	this.index = 0;
	this.indexSlide = 0;
	this.length = $('li', this.container).length - 1;

	$('> ul > li', this.container).each(function() {
		$(this).attr('data-slide', $(this).index() + 1);

		if ($(this).index() == 0) {
			$(this).addClass('active');
			$($infiniteSlider.controls).append(
				`<li class="active" data-slide="${$(this).index() +
					1}"><a href="">Slide ${$(this).index() + 1}</a></li>`
			);

			if ($('#gallery').length == 1) {
				$('h2 .big').html($(this).attr('data-project-title'));
				$('.infos .text > div').html($(this).attr('data-project-content'));
			}
		} else {
			$(this).addClass('inactive');
			$($infiniteSlider.controls).append(
				`<li class="inactive" data-slide="${$(this).index() +
					1}"><a href="">Slide ${$(this).index() + 1}</a></li>`
			);
		}
	});

	$('li', this.controls).each(function() {
		$(this).attr('data-slide', $(this).index() + 1);

		if ($(this).index() == 0) {
			$(this).addClass('active');
		} else {
			$(this).addClass('inactive');
		}
	});

	$(this.count).html(`${this.index + 1} / ${this.length + 1}`);

	if ($('> ul > li:eq(0)', this.container).attr('data-infos') != '') {
		$(this.infos).html($('> ul > li:eq(0)', this.container).attr('data-infos'));
	}

	if (this.length == 0) {
		$(this.controls).hide();
		this.autorotation = false;
	}

	this.reset($infiniteSlider);

	$('li a', this.controls).click(function(e) {
		e.preventDefault();
		$infiniteSlider.controlsClick($(this), $infiniteSlider);

		return false;
	});

	$('li a', this.arrows).click(function(e) {
		e.preventDefault();
		$infiniteSlider.arrowsClick($(this), $infiniteSlider);

		return false;
	});

	$(window).resize(() => {
		$infiniteSlider.reset($infiniteSlider);
	});

	$(document).keydown(function(event) {
		if (event.keyCode == 39) $('.slider-arrows .next a').trigger('click');

		if (event.keyCode == 37) $('.slider-arrows .previous a').trigger('click');
	});

	if ($('#gallery').length == 1) $infiniteSlider.running = false;
	if (this.running) this.autoRotation($infiniteSlider);
}

InfiniteSliderHome.prototype.autoRotation = function($infiniteSlider) {
	clearTimeout($infiniteSlider.t);

	if ($('#gallery').length == 1) $infiniteSlider.running = false;

	if (
		$('li', $infiniteSlider.controls).length > 1 &&
		$infiniteSlider.autorotation
	) {
		if ($infiniteSlider.running) {
			$infiniteSlider.t = setTimeout(function() {
				$infiniteSlider.changeSlide(
					$infiniteSlider.indexSlide,
					$infiniteSlider.indexSlide + 1,
					$infiniteSlider
				);
			}, $infiniteSlider.duration);
		}
	}
};

InfiniteSliderHome.prototype.start = function($infiniteSlider) {
	$infiniteSlider.running = true;
	$infiniteSlider.autoRotation($infiniteSlider);

	return false;
};

InfiniteSliderHome.prototype.stop = function($infiniteSlider) {
	clearTimeout($infiniteSlider.t);
	$infiniteSlider.running = false;

	return false;
};

InfiniteSliderHome.prototype.arrowsClick = (object, $infiniteSlider) => {
	if (!$infiniteSlider.animated) {
		clearTimeout($infiniteSlider.t);
		let clicked;
		if (
			$(object)
				.parent()
				.hasClass('next')
		) {
			clicked = $infiniteSlider.indexSlide + 1;
		} else {
			clicked = $infiniteSlider.indexSlide - 1;
		}

		$infiniteSlider.changeSlide(
			$infiniteSlider.indexSlide,
			clicked,
			$infiniteSlider
		);
	}

	return false;
};

InfiniteSliderHome.prototype.controlsClick = (object, $infiniteSlider) => {
	if (
		!$infiniteSlider.animated &&
		$(object)
			.parent()
			.hasClass('active') == false
	) {
		$infiniteSlider.autorotation = false;

		clearTimeout($infiniteSlider.t);

		const clicked = $(object)
			.parent()
			.index();

		$('> ul > li', $infiniteSlider.container).each(function() {
			if ($(this).attr('data-slide') == clicked + 1) {
				$infiniteSlider.changeSlide(
					$infiniteSlider.indexSlide,
					$(this).index(),
					$infiniteSlider
				);
			}
		});
	}

	return false;
};

InfiniteSliderHome.prototype.reset = $infiniteSlider => {
	if (!$infiniteSlider.animated) {
		$infiniteSlider.stop($infiniteSlider);
		$infiniteSlider.width = $infiniteSlider.container.width();
		$infiniteSlider.height = $infiniteSlider.container.height();

		$infiniteSlider.start($infiniteSlider);
	}
};

InfiniteSliderHome.prototype.changeSlide = (
	current,
	clicked,
	$infiniteSlider
) => {
	$infiniteSlider.animated = true;
	let direction = 'next';
	if (clicked < current) direction = 'previous';

	if (clicked > $infiniteSlider.length) {
		clicked = 0;
	} else if (clicked < 0) {
		clicked = $infiniteSlider.length;
	}

	$('> ul > li', $infiniteSlider.container)
		.removeClass('active')
		.addClass('inactive');
	$('> ul > li', $infiniteSlider.container)
		.eq(clicked)
		.removeClass('inactive')
		.addClass('active');

	$infiniteSlider.index =
		parseInt(
			$('> ul > li.active', $infiniteSlider.container).attr('data-slide')
		) - 1;
	$infiniteSlider.indexSlide = $(
		'> ul > li.active',
		$infiniteSlider.container
	).index();

	$('li', $infiniteSlider.controls).removeClass('active');
	$('li', $infiniteSlider.controls)
		.eq($infiniteSlider.index)
		.addClass('active');

	if ($infiniteSlider.mode == 'slide') {
		if (direction == 'next') {
			$('> ul > li', $infiniteSlider.container)
				.eq(clicked)
				.css('left', `${$infiniteSlider.width}px`)
				.show();

			$('> ul > li', $infiniteSlider.container).animate(
				{ left: `-=${$infiniteSlider.width}` },
				{
					duration: $infiniteSlider.speed,
					easing: $infiniteSlider.easing,
					complete() {
						$infiniteSlider.animated = false;
						$('> ul > li.inactive', $infiniteSlider.container).hide();
						if ($infiniteSlider.running)
							$infiniteSlider.autoRotation($infiniteSlider);
					},
				}
			);
		} else {
			$('> ul > li', $infiniteSlider.container)
				.eq(clicked)
				.css('left', `${-$infiniteSlider.width}px`)
				.show();

			$('> ul > li', $infiniteSlider.container).animate(
				{ left: `+=${$infiniteSlider.width}` },
				{
					duration: $infiniteSlider.speed,
					easing: $infiniteSlider.easing,
					complete() {
						$infiniteSlider.animated = false;
						$('> ul > li.inactive', $infiniteSlider.container).hide();
						if ($infiniteSlider.running)
							$infiniteSlider.autoRotation($infiniteSlider);
					},
				}
			);
		}
	} else if ($infiniteSlider.mode == 'slidev') {
		if (direction == 'next') {
			$('> ul > li', $infiniteSlider.container)
				.eq(clicked)
				.css('top', `${$infiniteSlider.height}px`)
				.show();

			$('> ul > li', $infiniteSlider.container).animate(
				{ top: `-=${$infiniteSlider.height}` },
				{
					duration: $infiniteSlider.speed,
					easing: $infiniteSlider.easing,
					complete() {
						$infiniteSlider.animated = false;
						$('> ul > li.inactive', $infiniteSlider.container).hide();
						if ($infiniteSlider.running)
							$infiniteSlider.autoRotation($infiniteSlider);
					},
				}
			);
		} else {
			$('> ul > li', $infiniteSlider.container)
				.eq(clicked)
				.css('top', `${-$infiniteSlider.height}px`)
				.show();

			$('> ul > li', $infiniteSlider.container).animate(
				{ top: `+=${$infiniteSlider.height}` },
				{
					duration: $infiniteSlider.speed,
					easing: $infiniteSlider.easing,
					complete() {
						$infiniteSlider.animated = false;
						$('> ul > li.inactive', $infiniteSlider.container).hide();
						if ($infiniteSlider.running) {
							$infiniteSlider.autoRotation($infiniteSlider);
						}
					},
				}
			);
		}
	} else if ($infiniteSlider.mode == 'fade') {
		$('> ul > li.active', $infiniteSlider.container).fadeIn(
			$infiniteSlider.speed,
			function() {
				$('> ul > li', $infiniteSlider.container)
					.eq(current)
					.hide();
				$infiniteSlider.animated = false;
				if ($infiniteSlider.running) {
					$infiniteSlider.autoRotation($infiniteSlider);
				}
			}
		);
	} else if ($infiniteSlider.mode == 'demask') {
		$('> ul > li.active', $infiniteSlider.container).animate(
			{ width: $infiniteSlider.width },
			$infiniteSlider.speed,
			$infiniteSlider.easing,
			function() {
				$('> ul > li.inactive', $infiniteSlider.container).width(0);
				$infiniteSlider.animated = false;
				if ($infiniteSlider.running) {
					$infiniteSlider.autoRotation($infiniteSlider);
				}
			}
		);
	} else if ($infiniteSlider.mode == 'columns') {
		$('> ul > li', $infiniteSlider.container)
			.eq(clicked)
			.css('left', '0');
		$('> ul > li', $infiniteSlider.container)
			.eq(current)
			.find('.columns > li > div')
			.animate(
				{ width: 0 },
				$infiniteSlider.speed,
				$infiniteSlider.easing,
				function() {
					$('> ul > li', $infiniteSlider.container)
						.eq(current)
						.css('left', '100%');
					$('> ul > li', $infiniteSlider.container)
						.eq(current)
						.find('.columns > li > div')
						.width('100%');
					$infiniteSlider.animated = false;
					if ($infiniteSlider.running)
						$infiniteSlider.autoRotation($infiniteSlider);
				}
			);
	} else if ($infiniteSlider.mode == 'css') {
		if (
			$('#gallery').length == 1 &&
			$('h2 .big').html() !=
				$('> ul > li', $infiniteSlider.container)
					.eq(clicked)
					.attr('data-project-title')
		) {
			$('h2 .big').html(
				$('> ul > li', $infiniteSlider.container)
					.eq(clicked)
					.attr('data-project-title')
			);
			$('.infos .text > div').html(
				$('> ul > li', $infiniteSlider.container)
					.eq(clicked)
					.attr('data-project-content')
			);
		}

		$('> ul > li', $infiniteSlider.container)
			.eq(current)
			.addClass('leaving');
		setTimeout(function() {
			$('> ul > li', $infiniteSlider.container)
				.eq(current)
				.addClass('no-anim');
			$('> ul > li', $infiniteSlider.container)
				.eq(current)
				.removeClass('leaving');
			$('> ul > li', $infiniteSlider.container)
				.eq(current)
				.removeClass('no-anim');
			$infiniteSlider.animated = false;
			$infiniteSlider.autoRotation($infiniteSlider);
		}, $infiniteSlider.speed);
	}
};

export default InfiniteSliderHome;
