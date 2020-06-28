var $ = jQuery.noConflict();

$(document).ready(function () {

	jQuery('img.svg').each(function () {
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		jQuery.get(imgURL, function (data) {
			var $svg = jQuery(data).find('svg');
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}
			$svg = $svg.removeAttr('xmlns:a');
			$img.replaceWith($svg);
		}, 'xml');
	});

	/*Custom slect box js*/
	$(function () {
		$(".selectbox1").selectbox();
	});

	// Welcome page slider 
	$slick_slider = $('.welcome-slider');
	settings_slider = {
		dots: true,
		autoplay: true,
		autoplaySpeed: 2500,
		arrows: true
		// more settings
	}
	slick_on_mobile($slick_slider, settings_slider);

	// slick on mobile
	function slick_on_mobile(slider, settings) {
		$(window).on('load resize', function () {
			if ($(window).width() > 767) {
				if (slider.hasClass('slick-initialized')) {
					slider.slick('unslick');
				}
				return
			}
			if (!slider.hasClass('slick-initialized')) {
				return slider.slick(settings);
			}
		});
	};

});