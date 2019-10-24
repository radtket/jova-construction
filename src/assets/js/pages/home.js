import { isLoaded } from '../helpers';

const initHome = () =>
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

export default initHome;
