import { isLoaded, innerDemensions } from '../helpers';

const $portfolio = document.querySelector('#portfolio');

export const initPortfolioCards = () => {
	const $portfolioCardLeft = document.querySelector(
		'#portfolio > #block1 > .centered .framed-block .content > .left-block .intro'
	);

	if ($portfolioCardLeft) {
		const { height } = innerDemensions(
			document.querySelector(
				'#portfolio > #block1 > .centered .framed-block .content > .right-block .intro'
			)
		);
		$portfolioCardLeft.style.height = `${height}px`;
	}
};

export const initPortfolioCardsText = () => {
	const $portfolioCards = Array.from(
		document.querySelectorAll('#portfolio .card-container > div > div')
	);

	if ($portfolioCards) {
		$portfolioCards.forEach(item => {
			const { offsetWidth: h2 } = item.querySelector('h2');
			const { offsetWidth: h3 } = item.querySelector('h3');
			item.style.width = `${h2 + h3 + 1}px`;
		});
	}
};

export const initPortfolio = isMobile => {
	const $framedBlock = document.querySelector(
		'#portfolio #block1 > .centered .framed-block'
	);

	setTimeout(() => {
		isLoaded($framedBlock);

		if (isMobile) {
			Array.from($portfolio.querySelectorAll('.to-load')).forEach(item => {
				isLoaded(item);
			});
		}
	}, 950);
};
