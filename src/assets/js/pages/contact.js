import loadGoogleMapsApi from 'load-google-maps-api';
import { isLoaded, innerDemensions } from '../helpers';
import img from '../../images/layout/sizer_contact-map.gif';

const initializeMap = (lat, lng, mapID) => {
	return loadGoogleMapsApi({
		key: process.env.API_KEY_GOOGLE_MAPS,
	})
		.then(googleMaps => {
			const map = new googleMaps.Map(document.getElementById(mapID), {
				center: {
					lat,
					lng,
				},
				zoom: 15,
				disableDefaultUI: true,
				mapTypeId: googleMaps.MapTypeId.ROADMAP,
				scrollwheel: false,
				navigationControl: false,
				mapTypeControl: false,
				scaleControl: false,
				styles: [
					{
						stylers: [
							{ gamma: 2.49 },
							{ lightness: -25 },
							{ hue: '#ff9100' },
							{ saturation: 10 },
						],
					},
					{
						featureType: 'water',
						stylers: [{ saturation: -67 }, { lightness: -7 }],
					},
					{
						featureType: 'road',
						stylers: [{ saturation: -65 }],
					},
					{
						featureType: 'landscape',
						stylers: [{ visibility: 'simplified' }],
					},
					{
						featureType: 'poi',
						stylers: [{ visibility: 'simplified' }, { saturation: -55 }],
					},
					{
						featureType: 'transit',
						stylers: [{ visibility: 'off' }],
					},
					{
						featureType: 'road.arterial',
						elementType: 'geometry',
						stylers: [{ lightness: 8 }, { hue: '#ffa200' }, { saturation: 30 }],
					},
					{
						featureType: 'poi.business',
						elementType: 'geometry',
						stylers: [{ visibility: 'off' }],
					},
					{
						featureType: 'poi.park',
						stylers: [
							{ visibility: 'simplified' },
							{ saturation: 6 },
							{ lightness: -11 },
						],
					},
					{
						featureType: 'road',
						elementType: 'labels',
						stylers: [
							{ visibility: 'on' },
							{ lightness: 15 },
							{ saturation: 17 },
						],
					},
					{
						featureType: 'poi.school',
						stylers: [{ visibility: 'off' }],
					},
					{
						featureType: 'road.local',
						stylers: [{ saturation: 24 }, { lightness: -6 }],
					},
				],
			});

			const icon = new googleMaps.MarkerImage(
				img,
				// This marker is 20 pixels wide by 32 pixels tall.
				new googleMaps.Size(47, 93),
				// The origin for this image is 0,0.
				new googleMaps.Point(0, 0),
				// The anchor for this image is the base of the flagpole at 0,32.
				new googleMaps.Point(23, 46)
			);

			googleMaps.Marker({
				position: new googleMaps.LatLng(lat, lng),
				map,
				icon,
			});

			googleMaps.event.addDomListener(window, 'resize', () => {
				const position = new googleMaps.LatLng(lat, lng);
				map.setCenter(position);
			});
		})
		.catch(error => {
			console.error(error);
		});
};

const $contact = document.querySelector('#contact');

export const adjustContactSectors = () => {
	if ($contact) {
		const { height: rBlockUlHeight } = innerDemensions(
			document.querySelector(
				'#wrapper #contact > #block1 > .centered .framed-block .content > .right-block ul'
			)
		);

		const { height: rBlockSectorHeight } = innerDemensions(
			document.querySelector(
				'#wrapper #contact > #block1 > .centered .framed-block .content  > .right-block .sectors'
			)
		);

		const content = document.querySelectorAll(
			'#wrapper #contact > #block1 > .centered .framed-block .content'
		);

		content.forEach(item => {
			const ul = item.querySelectorAll('ul');
			const sectors = item.querySelectorAll('.sectors');

			if (ul) {
				ul.forEach(ele => {
					ele.style.height = `${rBlockUlHeight}px`;
				});
			}

			if (sectors) {
				sectors.forEach(ele => {
					ele.style.height = `${rBlockSectorHeight}px`;
				});
			}
		});
	}
};

export const initContact = isMobile => {
	if ($contact) {
		$contact.querySelectorAll(' .map > div').forEach(item => {
			const lat = parseFloat(item.getAttribute('data-latitude'));
			const lng = parseFloat(item.getAttribute('data-longitude'));
			const id = item.getAttribute('id');
			initializeMap(lat, lng, id);
		});

		setTimeout(() => {
			isLoaded($contact.querySelector('#block1 > .centered .framed-block'));

			if (isMobile) {
				Array.from($contact.querySelectorAll('.to-load')).forEach(item => {
					isLoaded(item);
				});
			}
		}, 950);
	}
};
