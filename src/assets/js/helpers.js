export const hasClass = (target, className) => {
	return new RegExp(`(\\s|^)${className}(\\s|$)`).test(target.className);
};

export const addClass = (ele, myClass) => {
	let elements = ele;
	// if there are no elements, we're done
	if (!elements) {
		return;
	}

	// if we have a selector, get the chosen elements
	if (typeof elements === 'string') {
		elements = document.querySelectorAll(elements);
	}

	// if we have a single DOM element, make it an array to simplify behavior
	else if (elements.tagName) {
		elements = [elements];
	}

	// add class to all chosen elements
	for (let i = 0; i < elements.length; i += 1) {
		// if class is not already found
		if (` ${elements[i].className} `.indexOf(` ${myClass} `) < 0) {
			// add class
			elements[i].className += ` ${myClass}`;
		}
	}
};

export const isLoaded = qs => addClass(qs, 'loaded');

export function fadeOut(el) {
	const element = el;
	element.style.opacity = 1;

	(function fade() {
		if ((element.style.opacity -= 0.1) < 0) {
			element.style.display = 'none';
		} else {
			requestAnimationFrame(fade);
		}
	})();
}

export function fadeIn(el, display) {
	const element = el;
	element.style.opacity = 0;
	element.style.display = display || 'block';

	(function fade() {
		let val = parseFloat(element.style.opacity);
		if (!((val += 0.1) > 1)) {
			element.style.opacity = val;
			requestAnimationFrame(fade);
		}
	})();
}

export function scrollIt(
	destination,
	duration = 200,
	easing = 'linear',
	callback
) {
	const easings = {
		linear(t) {
			return t;
		},
		easeInQuad(t) {
			return t * t;
		},
		easeOutQuad(t) {
			return t * (2 - t);
		},
		easeInOutQuad(t) {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		},
		easeInCubic(t) {
			return t * t * t;
		},
		easeOutCubic(t) {
			return --t * t * t + 1;
		},
		easeInOutCubic(t) {
			return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
		},
		easeInQuart(t) {
			return t * t * t * t;
		},
		easeOutQuart(t) {
			return 1 - --t * t * t * t;
		},
		easeInOutQuart(t) {
			return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
		},
		easeInQuint(t) {
			return t * t * t * t * t;
		},
		easeOutQuint(t) {
			return 1 + --t * t * t * t * t;
		},
		easeInOutQuint(t) {
			return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
		},
	};

	const start = window.pageYOffset;
	const startTime =
		'now' in window.performance ? performance.now() : new Date().getTime();

	const documentHeight = Math.max(
		document.body.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.clientHeight,
		document.documentElement.scrollHeight,
		document.documentElement.offsetHeight
	);
	const windowHeight =
		window.innerHeight ||
		document.documentElement.clientHeight ||
		document.getElementsByTagName('body')[0].clientHeight;
	const destinationOffset =
		typeof destination === 'number' ? destination : destination.offsetTop;
	const destinationOffsetToScroll = Math.round(
		documentHeight - destinationOffset < windowHeight
			? documentHeight - windowHeight
			: destinationOffset
	);

	if ('requestAnimationFrame' in window === false) {
		window.scroll(0, destinationOffsetToScroll);
		if (callback) {
			callback();
		}
		return;
	}

	function scroll() {
		const now =
			'now' in window.performance ? performance.now() : new Date().getTime();
		const time = Math.min(1, (now - startTime) / duration);
		const timeFunction = easings[easing](time);
		window.scroll(
			0,
			Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start)
		);

		if (window.pageYOffset === destinationOffsetToScroll) {
			if (callback) {
				callback();
			}
			return;
		}

		requestAnimationFrame(scroll);
	}

	scroll();
}

export const getOffsetTop = elem => {
	// Set our distance placeholder
	let distance = 0;

	// Loop up the DOM

	if (elem && elem.offsetParent) {
		do {
			distance += elem.offsetTop;
			elem = elem.offsetParent;
		} while (elem);
	}

	// Return our distance
	return distance < 0 ? 0 : distance;
};

export const getElementIndex = elm => {
	// return [...elm.parentNode.children].findIndex(c => c === elm);
	// or
	return [...elm.parentNode.children].indexOf(elm);
};

export const show = elem => {
	elem.style.display = 'block';
};

// Hide an element
export const hide = elem => {
	elem.style.display = 'none';
};
