import { isLoaded } from '../helpers';
import triggerScroll from '../jquery/triggerScroll';
import $ from '../jquery/easing';

const initTips = () =>
	setTimeout(() => {
		isLoaded('#wrapper.tips #block1 .bullet');
		setTimeout(() => {
			isLoaded($('#wrapper.tips #block1 .sidebar .card-container'));
			// if (isMobile) {
			// 	isLoaded($('.to-load'));
			// }
			triggerScroll('#tips');
		}, 100);
	}, 250);

export default initTips;
