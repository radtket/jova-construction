import { isLoaded, getElementIndex, getOffsetTop } from '../helpers';
import triggerScroll from '../jquery/triggerScroll';
import InfiniteSlider from '../jquery/infiniteSlider';

export const positionSliderImages = () => {
	const $tips = document.querySelectorAll(
		'#tips .slider-container > .slider > ul > li > div > div'
	);

	if ($tips) {
		Array.from($tips).forEach(item => {
			const { offsetWidth } = item.querySelector('img');
			item.style.width = `${offsetWidth - 1}px`;
		});
	}
};

export const tipsSidebar = () => {
	const newScroll = window.scrollY;
	const $tips = document.querySelector('#tips');
	if ($tips) {
		const $sidebar = $tips.querySelector('.sidebar');
		const $block1 = $tips.querySelector('#block1');
		const $tipsListing = $block1.querySelectorAll('.listing > li');
		const $sidebarNavItems = $block1.querySelectorAll('.sidebar ul > li');
		const $sidebarActiveNavItem = $block1.querySelector(
			'.sidebar ul > li.active'
		);
		const $sidebarHeight = $sidebar.offsetHeight;
		const $sidebarOffset = parseInt(getComputedStyle($sidebar).top, 10);

		const $one = newScroll + $sidebarHeight + $sidebarOffset;
		const $two = $block1.offsetHeight - 210;

		const $sidebarTransform =
			$one > $two
				? newScroll - (newScroll + $sidebarHeight + $sidebarOffset - $two)
				: newScroll;

		$sidebar.style.transform = `translate(0, ${$sidebarTransform}px)`;

		const $currentIndex =
			$sidebarActiveNavItem && getElementIndex($sidebarActiveNavItem);
		let $newIndex = $currentIndex;

		$tipsListing.forEach(item => {
			if (newScroll + window.innerHeight / 2 > getOffsetTop(item)) {
				$newIndex = getElementIndex(item);
			}
		});

		if ($newIndex !== $currentIndex) {
			if ($sidebarActiveNavItem) {
				$sidebarActiveNavItem.classList.remove('active');
			}

			Array.from($sidebarNavItems)[$newIndex].classList.add('active');
		}
	}
};

export const initTipsSlider = () =>
	Array.from(document.querySelectorAll('#tips .slider-container')).filter(
		item => {
			if (item.querySelectorAll('.slider > ul > li').length > 1) {
				item.classList.remove('disabled');
				return new InfiniteSlider(
					item,
					1500,
					4000,
					'slide',
					'easeInOutQuint',
					false,
					false
				);
			}
			return false;
		}
	);

export const initTips = () =>
	setTimeout(() => {
		isLoaded('#wrapper.tips #block1 .bullet');
		setTimeout(() => {
			isLoaded('#wrapper.tips #block1 .sidebar .card-container');
			// if (isMobile) {
			// 	isLoaded($('.to-load'));
			// }
			triggerScroll('#tips');
		}, 100);
	}, 250);
