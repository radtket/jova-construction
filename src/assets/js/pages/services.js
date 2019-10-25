import $ from 'jquery';
import { isLoaded } from '../helpers';

const initServices = isMobile => {
	const $services = $('#services');
	// Centered Vertically
	$('.valign').css(
		'padding-top',
		$('.valign')
			.parent()
			.height() /
			2 -
			$('.valign').height() / 2
	);

	setTimeout(() => {
		isLoaded($('#block1 .card-container', $services));
		setTimeout(() => {
			isLoaded($('.btn-scroll-down', $services));
			if (isMobile) {
				isLoaded($('.to-load', $services));
			}
		}, 1500);
	}, 750);
};

export default initServices;
