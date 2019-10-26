import { addClass, isLoaded, hasClass, getOffsetTop } from '../helpers';

export const showHideHeader = () => {
	const tempHead = document.querySelector('#homepage #block1 .card-container');
	const $header = document.querySelector('#header');
	const $btnHeader = document.querySelector('#header_btn-menu');

	if (tempHead && $header) {
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

export const initHome = () =>
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
