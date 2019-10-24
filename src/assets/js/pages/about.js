import { isLoaded } from '../helpers';
import triggerScroll from '../jquery/triggerScroll';

const initAbout = $about => {
	if ($about) {
		const $block1 = $about.querySelector('#block1');
		const $block1TextGrid = $block1.querySelector('.text-grid');
		const { offsetLeft } = $block1.querySelector('.centered:first-child');

		document.querySelector('.btn-scroll-down').style.left = `${offsetLeft}px`;
		$block1.classList.add('active');
		$block1TextGrid.classList.add('visible');

		Array.from($block1TextGrid.querySelectorAll('.line')).forEach(item => {
			isLoaded(item);
		});

		// Timesouts
		setTimeout(() => {
			Array.from($about.querySelectorAll('img')).forEach(item => {
				isLoaded(item);
			});
		}, 250);

		setTimeout(() => {
			$block1.querySelector('.card-container').classList.add('loaded');

			setTimeout(() => {
				isLoaded('.btn-scroll-down');

				// if (isMobile) {
				// 	isLoaded($('.to-load', $aboutpage));
				// }
			}, 1500);
		}, 750);

		triggerScroll('#block', window.scrollY);
	}
};

export default initAbout;
