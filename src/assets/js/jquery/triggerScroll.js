import $ from './easing';

const triggerScroll = (sectionId, currentScroll) => {
	if (window.location.hash !== '') {
		const $target = $(sectionId + window.location.hash.replace('#', ''));
		const scroll = Math.abs(currentScroll - $target.offset().top);
		const scrollTop = $target.offset().top;
		const scrollTime = scroll * 0.5;

		$('html,body').animate(
			{ scrollTop },
			scrollTime < 1250 ? 1250 : scrollTime,
			'easeInOutQuad'
		);
	}
};

export default triggerScroll;
