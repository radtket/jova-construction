/* eslint-disable no-cond-assign */
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
		if ((' ' + elements[i].className + ' ').indexOf(' ' + myClass + ' ') < 0) {
			// add class
			elements[i].className += ' ' + myClass;
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
		var val = parseFloat(element.style.opacity);
		if (!((val += 0.1) > 1)) {
			element.style.opacity = val;
			requestAnimationFrame(fade);
		}
	})();
}
