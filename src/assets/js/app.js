import imagesLoaded from 'imagesLoaded';
import { addClass } from './helpers';

console.log('hi');
const btnHeader = document.querySelector('#header_btn-menu');
const loadingMask = document.querySelector('#loading-mask');
const $header = document.querySelector('#header');
const isLoaded = qs => addClass(qs, 'loaded');

/* Feature detection */
let passiveIfSupported = false;

try {
	window.addEventListener(
		'test',
		null,
		Object.defineProperty({}, 'passive', {
			get: function() {
				passiveIfSupported = { passive: false };
			},
		})
	);
} catch (err) {}

window.addEventListener(
	'scroll',
	event => {
		console.log({ event });
	},
	passiveIfSupported
);

imagesLoaded(document.querySelector('#wrapper'), function(instance) {
	isLoaded('#loading-mask');

	setTimeout(() => {
		isLoaded('#header_btn-menu');
	}, 450);
});

function openHeaderMenu(e) {
	e.preventDefault();
	this.classList.add('hidden');
	addClass('#header', 'opened');
	setTimeout(() => {
		isLoaded('#header > .card-container');
		$header.querySelector('.card-container').classList.remove('no-anim');
	}, 450);
	console.log('You finally clicked without jQuery', this);
}

function closeHeaderMenu({ target: { nodeName } }) {
	if (nodeName === 'HEADER') {
		this.classList.remove('opened');
		btnHeader.classList.remove('hidden');
		setTimeout(() => {
			const cardContainer = $header.querySelector('.card-container').classList;
			cardContainer.add('no-anim');
			cardContainer.remove('loaded');
		}, 450);
	}
}

btnHeader.addEventListener('click', openHeaderMenu);
$header.addEventListener('click', closeHeaderMenu);
