import { isLoaded, innerDemensions } from '../helpers';

const $services = document.querySelector('#services');

export const adjustServiceBlocks = () => {
	if ($services) {
		const $block3 = $services.querySelector('#block3');

		$block3.querySelector('.left-block > div').style.height = `${
			$block3.querySelector('.right-block > div').offsetHeight
		}px`;
	}
};

// Centered Vertically
export const verticalAlign = () => {
	const vAlign = document.querySelector('.valign');
	if (vAlign) {
		const height =
			innerDemensions(vAlign.parentElement).height / 2 -
			innerDemensions(vAlign).height / 2;

		vAlign.style.paddingTop = `${height}px`;
	}
};

export const initServices = isMobile => {
	if ($services) {
		setTimeout(() => {
			isLoaded('#services #block1 .card-container');
			setTimeout(() => {
				isLoaded('#services .btn-scroll-down');
				if (isMobile) {
					Array.from($services.querySelectorAll('.to-load')).forEach(item => {
						isLoaded(item);
					});
				}
			}, 1500);
		}, 750);
	}
};
