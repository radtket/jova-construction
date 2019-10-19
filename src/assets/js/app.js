import imagesLoaded from 'imagesLoaded';
import { addClass, isLoaded } from './helpers';

// Elements
const btnHeader = document.querySelector('#header_btn-menu');
const $header = document.querySelector('#header');

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
} catch (err) {
	console.log({ err });
}

imagesLoaded(document.querySelector('#wrapper'), instance => {
	const { isComplete } = instance;
	if (isComplete) {
		isLoaded('#loading-mask');
		setTimeout(() => isLoaded('#header_btn-menu'), 450);
	}
});

function openHeaderMenu(e) {
	e.preventDefault();
	this.classList.add('hidden');
	addClass('#header', 'opened');
	setTimeout(() => {
		isLoaded('#header > .card-container');
		$header.querySelector('.card-container').classList.remove('no-anim');
	}, 450);
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

window.addEventListener(
	'scroll',
	event => {
		console.log('scrollinggg', { event });
	},
	passiveIfSupported
);
