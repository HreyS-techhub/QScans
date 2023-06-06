"use strict";

jQuery( function() {

	initSwiper();
	initEvents();
	initStyles();
	initMap();
	initCollapseMenu();	
	checkCountUp();	
	initScrollReveal();
	initCountDown();
	ltxMenuCollapse();
	initBeforeAfter();
	initStaticFilter();
	//initOnScroll();

	if (!/Mobi/.test(navigator.userAgent) && jQuery(window).width() > 768) jQuery('.matchHeight').matchHeight();
});

jQuery(window).on('scroll', function (event) {

	checkNavbar();
	checkGoTop();
	ltxChartDoughnut();
}).scroll();

jQuery(window).on('load', function(){

	initMasonry();
	initParallax();
	initServicesMenu();
	refreshServicesMenu();
});

jQuery(window).on("resize", function () {

	setResizeStyles();
	refreshServicesMenu();
}).resize();



/* Navbar menu initialization */
function initCollapseMenu() {

	var navbar = jQuery('#navbar'),
		navbar_toggle = jQuery('.navbar-toggle'),
		navbar_wrapper = jQuery("#nav-wrapper");

    navbar_wrapper.on('click', '.navbar-toggle', function (e) {

        navbar_toggle.toggleClass('collapsed');
        navbar.toggleClass('collapse');
        navbar_wrapper.toggleClass('mob-visible');
    });

	// Anchor mobile menu
	navbar.on('click', '.menu-item-type-custom > a', function(e) {

		if ( e.target.tagName != 'A' && typeof jQuery(this).attr('href') !== 'undefined' && jQuery(this).attr('href') !== '#' && jQuery(this).attr('href').charAt(0) === '#' )  {

	        navbar_toggle.addClass('collapsed');
	        navbar.addClass('collapse');
	        navbar_wrapper.removeClass('mob-visible');
    	}  	    
    });

    navbar.on('click', '.menu-item-has-children > a', function(e) {

    	var el = jQuery(this);

    	if (!el.closest('#navbar').hasClass('collapse')) {

    		if ((el.attr('href') === undefined || el.attr('href') === '#') || e.target.tagName == 'A') {

		    	el.next().toggleClass('show');
		    	el.next().children().toggleClass('show');
		    	el.parent().toggleClass('show');

		    	return false;
		    }
	    }
    });

    var lastWidth;
    jQuery(window).on("resize", function () {

    	checkNavbar();

    	var winWidth = jQuery(window).width(),
    		winHeight = jQuery(window).height();

       	lastWidth = winWidth;
    });	
}

/* Navbar attributes depends on resolution and scroll status */
function checkNavbar() {

	var navbar = jQuery('#navbar'),
		scroll = jQuery(window).scrollTop(),
    	navBar = jQuery('nav.navbar:not(.no-dark)'),
    	topBar = jQuery('.ltx-topbar-block'),
    	navbar_toggle = jQuery('.navbar-toggle'),
    	navbar_wrapper = jQuery("#nav-wrapper"),
	    slideDiv = jQuery('.slider-full'),
	    winWidth = jQuery(window).width(),
    	winHeight = jQuery(window).height(),
		navbar_mobile_width = navbar.data('mobile-screen-width');

   	if ( winWidth < navbar_mobile_width ) {

		navbar.addClass('navbar-mobile').removeClass('navbar-desktop');
		ltxMenuCollapse();
	}
		else {

		navbar.addClass('navbar-desktop').removeClass('navbar-mobile');
		ltxMenuCollapse();
	}

	navbar_wrapper.addClass('inited');

	if ( topBar.length ) {

		navBar.data('offset-top', topBar.height());
	}

    if (winWidth > navbar_mobile_width && navbar_toggle.is(':hidden')) {

        navbar.addClass('collapse');
        navbar_toggle.addClass('collapsed');
        navbar_wrapper.removeClass('mob-visible');
    }

    jQuery("#nav-wrapper.navbar-layout-transparent + .page-header, #nav-wrapper.navbar-layout-transparent + .main-wrapper").css('margin-top', '-' + navbar_wrapper.height() + 'px');


    if (scroll > 1) navBar.addClass('dark'); else navBar.removeClass('dark');
}


/**	
 * Checking that menu width fits container 
 * 
*/
function ltxMenuCollapse() {

	var navbar = jQuery('#navbar'),
		navbarMax = jQuery('nav.navbar > .container').outerWidth() - jQuery('#navbar .ltx-navbar-icons').outerWidth() - jQuery('nav.navbar .navbar-logo').outerWidth() - jQuery('#navbar .navbar-btn').outerWidth() + 440,
		ul = jQuery('#navbar > ul'),
		ulCounter = 0,
		liCollapsedItems = [],
		ulCollapse = jQuery(ul).find('.menu-collapse'),
		ulSub = jQuery(ul).find('.menu-collapse > .sub-menu');

	if ( ulSub.length && ulSub.find('> li').length > 0 ) {

		var items = ulSub.find('> li');

		items.each(function(i, el) {

			jQuery(el).insertBefore(ulCollapse);
		});

		ulCollapse.hide();
	}

	if ( navbar.hasClass('navbar-desktop') ) {

		ul.find('> li:not(.menu-collapse)').each(function(i, el) {

			var item = jQuery(el);

			ulCounter += item.outerWidth();

			if (ulCounter > navbarMax) {

				if ( !ulSub.length ) {

					ul.append('<li class="menu-item menu-item-has-children menu-collapse"><a href="#" class="collapse-icon fa fa-ellipsis-v"></a><ul class="sub-menu"></ul></li>');
					ulSub = jQuery(ul).find('.menu-collapse > .sub-menu');

				}

				item.appendTo(ulSub);
			}
		});

		if ( ulSub.find('> li').length > 0 ) {

			ulCollapse.show();
		}
	}
}


/* Check GoTop Visibility*/
function checkGoTop() {

	var gotop = jQuery('.ltx-go-top'),
		scrollBottom = jQuery(document).height() - jQuery(window).height() - jQuery(window).scrollTop();

	if ( gotop.length ) {

		if ( jQuery(window).scrollTop() > 100 ) {

			gotop.addClass('show');
		}
			else {

			gotop.removeClass('show');
    	}

    	if ( scrollBottom < 50 ) {

    		gotop.addClass('scroll-bottom');
    	}
    		else {

    		gotop.removeClass('scroll-bottom');
   		}
	}	
}

/* All keyboard and mouse events */
function initEvents() {

	setTimeout(function() { if ( typeof Pace !== 'undefined' ) { Pace.stop(); }  }, 3000);	

	jQuery('.swipebox.photo').magnificPopup({type:'image', gallery: { enabled: true }});
	jQuery('.swipebox.image-video').magnificPopup({type:'iframe'});

	// WooCommerce grid-list toggle
	jQuery('.gridlist-toggle').on('click', 'a', function() {

		jQuery('.matchHeight').matchHeight();
	});

	jQuery('.menu-types').on('click', 'a', function() {

		var el = jQuery(this);

		el.addClass('active').siblings('.active').removeClass('active');
		el.parent().find('.type-value').val(el.data('value'));

		return false;
	});

	/* Scrolling to navbar from "go top" button in footer */
    jQuery('footer').on('click', '.ltx-go-top', function() {

	    jQuery('html, body').animate({ scrollTop: 0 }, 1200);
	});

    jQuery('.alert').on('click', '.close', function() {

	    jQuery(this).parent().fadeOut();
	    return false;
	});	

	jQuery(".topbar-icons.mobile, .topbar-icons.icons-hidden")
		.mouseover(function() {

			jQuery('.topbar-icons.icons-hidden').addClass('show');
			jQuery('#navbar').addClass('muted');
		})
		.mouseout(function() {
			jQuery('.topbar-icons.icons-hidden').removeClass('show');
			jQuery('#navbar').removeClass('muted');
	});

	// TopBar Search
    var searchHandler = function(event){

        if (jQuery(event.target).is(".top-search, .top-search *")) return;
        jQuery(document).off("click", searchHandler);
        jQuery('.top-search').removeClass('show-field');
        jQuery('#navbar').removeClass('muted');
    }

    jQuery('#top-search-ico-close').on('click', function (e) {

		jQuery(this).parent().toggleClass('show-field');
		jQuery('#navbar').toggleClass('muted');    	
    });

	jQuery('#top-search-ico').on('click', function (e) {

		e.preventDefault();
		jQuery(this).parent().toggleClass('show-field');
		jQuery('#navbar').toggleClass('muted');

        if (jQuery(this).parent().hasClass('show-field')) {

        	jQuery(document).on("click", searchHandler);
        }
        	else {

        	jQuery(document).off("click", searchHandler);
        }
	});

	var search_href = jQuery('.top-search').data('base-href');

	jQuery('#top-search-ico-mobile').on('click', function() {

		window.location = search_href + '?s=' + jQuery(this).next().val();
		return false;
	});

	jQuery('.top-search input').keypress(function (e, i) {

		if (e.which == 13) {

			window.location = search_href + '?s=' + jQuery(this).val();
			return false;
		}
	});

	jQuery('.ltx-navbar-search input').keypress(function (e, i) {

		if (e.which == 13) {

			window.location = search_href + '?s=' + jQuery(this).val();
			return false;
		}
	});

	

	jQuery('.ltx-navbar-search span').on('click', function (e) {
		window.location = search_href + '?s=' + jQuery('.ltx-navbar-search input').val();
	});	

	jQuery('.woocommerce').on('click', 'div.quantity > span', function(e) {

		var f = jQuery(this).siblings('input');
		if (jQuery(this).hasClass('more')) {
			f.val(Math.max(0, parseInt(f.val()))+1);
		} else {
			f.val(Math.max(1, Math.max(0, parseInt(f.val()))-1));
		}
		e.preventDefault();

		jQuery(this).siblings('input').change();

		return false;
	});

	/* Tabs block on main page */
	jQuery('.ltx-tabs').on('click', '.item', function() {

		var parentDiv = jQuery(this).closest(".ltx-tabs");

		parentDiv.find('.active').removeClass('active');
		parentDiv.find('.'+jQuery(this).data('block')).addClass('active');
		jQuery(this).addClass('active');

		return false;
	});
}

function initCountDown() {

	var countDownEl = jQuery('.ltx-countdown');

	if (jQuery(countDownEl).length) {

			jQuery(countDownEl).each(function(i, el) {

			jQuery(el).countdown(jQuery(el).data('date'), function(event) {

				jQuery(this).html(event.strftime('' + jQuery(countDownEl).data('template')));
			});		
		});
	}
}

function ltxUrlDecode(str) {

   return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

/* Parallax initialization */
function initParallax() {

	// Only for desktop
	if (/Mobi/.test(navigator.userAgent)) return false;

	jQuery('.ltx-parallax').parallax("50%", 0.4);	

	if ( jQuery('.ltx-parallax-slider').length ) {

		jQuery('.ltx-parallax-slider').each(function(e, el) {

			var scene = jQuery(el).get(0);
			var parallaxInstance = new Parallax(scene, {

				hoverOnly : true,
				selector : '.ltx-layer',
				limitY : 0,
			});
		});
	}

	jQuery('.ltx-bg-parallax-enabled').each(function(i, el) {

		var val = jQuery(el).attr('class').match(/ltx-bg-parallax-value-(\S+)/); 	

		jQuery(el).parallax("50%", parseFloat(val[1]));	
	});	

	jQuery(".ltx-scroll-parallax").each(function(i, el) {

		jQuery(el).paroller({ factor: jQuery(el).data('factor'), type: 'foreground', direction: jQuery(el).data('direction') });
	});
}

/* Adding custom classes to element */
function initStyles() {

	jQuery('form:not(.checkout, .woocommerce-shipping-calculator) select:not(#rating), aside select').wrap('<div class="select-wrap"></div>');
	jQuery('.wpcf7-checkbox').parent().addClass('margin-none');

	jQuery('input[type="submit"], button[type="submit"]').not('.btn').addClass('btn btn-default btn-xs');
//	jQuery('button.single_add_to_cart_button, .add_to_cart_button');
	jQuery('#send_comment').removeClass('btn-xs');
	jQuery('#searchsubmit').removeClass('btn');

	jQuery('table:not([class]):not(#wp-calendar)').addClass('ltx-table');

	jQuery('.form-btn-shadow .btn,.form-btn-shadow input[type="submit"]').addClass('btn-shadow');
	jQuery('.form-btn-wide .btn,.form-btn-wide input[type="submit"]').addClass('btn-wide');

	jQuery('.woocommerce .button').addClass('btn btn-black color-hover-main').removeClass('button');
	jQuery('.woocommerce-message .btn, .woocommerce-info .btn').addClass('btn-xs');
	jQuery('.woocommerce .price_slider_amount .button').addClass('btn btn-black btn-xs color-text-white color-hover-second').removeClass('button');

	jQuery('.widget_product_search button').removeClass('btn btn-default btn-xs');
	jQuery('.input-group-append .btn').removeClass('btn-default btn-xs');

	jQuery('.ltx-hover-logos img').each(function(i, el) { jQuery(el).clone().addClass('ltx-img-hover').insertAfter(el); });
	
	jQuery(".container input[type=\"submit\"], .container input[type=\"button\"]").not('.btn-xs').wrap('<span class="ltx-btn-wrap"></span');
	jQuery(".container .wpcf7-submit").addClass('btn-lg').removeClass('btn-xs').wrap('<span class="ltx-btn-wrap"></span');

	jQuery('.blog-post .nav-links > a').wrapInner('<span></span>');
	jQuery('.blog-post .nav-links > a[rel="next"]').wrap('<span class="next"></span>');
	jQuery('.blog-post .nav-links > a[rel="prev"]').wrap('<span class="prev"></span>');

	jQuery('section.bg-overlay-true-black, .wpb_row.bg-overlay-true-black').prepend('<div class="ltx-overlay-true-black"></div>');
	jQuery('section.bg-overlay-white, .wpb_row.bg-overlay-white').prepend('<div class="ltx-overlay-white"></div>');
	jQuery('section.bg-overlay-black, .wpb_row.bg-overlay-black').prepend('<div class="ltx-overlay-black"></div>');
	jQuery('section.bg-overlay-dark, .wpb_row.bg-overlay-dark').prepend('<div class="ltx-overlay-dark"></div>');
	jQuery('section.bg-overlay-xblack, .wpb_row.bg-overlay-xblack').prepend('<div class="ltx-overlay-xblack"></div>');
	jQuery('section.bg-overlay-gradient, .wpb_row.bg-overlay-gradient').prepend('<div class="ltx-overlay-gradient"></div>');
	jQuery('section.bg-overlay-waves, .wpb_row.bg-overlay-waves').prepend('<div class="ltx-overlay-waves"></div>');
	jQuery('section.white-space-top, .wpb_row.white-space-top').prepend('<div class="ltx-white-space-top"></div>');

	var update_width = jQuery('.woocommerce-cart-form__contents .product-subtotal').outerWidth();

	jQuery('button[name="update_cart"]').css('width', update_width);

	// Settings copyrights overlay for non-default heights
	var copyrights = jQuery('.copyright-block.copyright-layout-copyright-transparent'),
		footer = jQuery('#ltx-widgets-footer + .copyright-block'),
		widgets_footer = jQuery('#ltx-widgets-footer'),
		footerHeight = footer.outerHeight() + 1;

	widgets_footer.css('padding-bottom', 55 + footerHeight + 'px');
	footer.css('margin-top', '-' + footerHeight + 'px');

	copyrights.css('margin-top', '-' + copyrights.outerHeight() + 'px')


	// Cart quanity change
	jQuery('.woocommerce div.quantity,.woocommerce-page div.quantity').append('<span class="more"></span><span class="less"></span>');
	jQuery(document).off('updated_wc_div').on('updated_wc_div', function () {

		jQuery('.woocommerce div.quantity,.woocommerce-page div.quantity').append('<span class="more"></span><span class="less"></span>');
		initStyles();
	});
}

/* Styles reloaded then page has been resized */
function setResizeStyles() {

	var videos = jQuery('.blog-post article.format-video iframe'),
		container = jQuery('.blog-post');
	jQuery.each(videos, function(i, el) {

		var height = jQuery(el).height(),
			width = jQuery(el).width(),
			containerW = jQuery(container).width(),
			ratio = containerW / width;

		jQuery(el).css('width', width * ratio);
		jQuery(el).css('height', height * ratio);
	});
}

/* Starting countUp function */
function checkCountUp() {

	if (jQuery(".countUp").length){

		jQuery('.countUp').counterUp();
	}
}

function ltxChartDoughnut() {

	var scroll = jQuery(window).scrollTop() + jQuery(window).height();

	if (jQuery(".ltx-chart-doughnut").length) {

		jQuery(".ltx-chart-doughnut:not(.inited)").each(function(i, el) {

			var canvasEl = jQuery(el).prev().get(0).getContext("2d"),
				value = jQuery(el).data('percent'),
				scrollEl = jQuery(el).offset().top,
				bodyStyles = window.getComputedStyle(document.body),
				colorMain = jQuery.trim(bodyStyles.getPropertyValue('--main')),
				colorSecond = jQuery.trim(bodyStyles.getPropertyValue('--gray'));


			var gradient = canvasEl.createLinearGradient(0, 0, 0, 600);
			gradient.addColorStop(0, colorMain);
			gradient.addColorStop(1, '#029ADF');

			var data = {
				datasets: [{
				    data: [value, 100-value],
				    borderWidth: 0,
				    backgroundColor: [
						gradient,
						colorSecond
				    ]
			    }]
			};

			if (scroll > scrollEl) {

				new Chart(canvasEl, {
					type: 'doughnut',
					data: data,
					options: {
						responsive: true,
						legend: {
						  display: false
						},
						cutoutPercentage: 88,
						tooltips: {enabled: false},
						hover: {mode: null},
					}
				});

				jQuery(el).addClass('inited');
			}
		});
	}
}

/* 
	Scroll Reveal Initialization
	Catches the classes: ltx-sr-fade_in ltx-sr-text_el ltx-sr-delay-200 ltx-sr-duration-300 ltx-sr-sequences-100
*/
function initScrollReveal() {

	if (/Mobi/.test(navigator.userAgent) || jQuery(window).width() < 768) return false;

	window.sr = ScrollReveal();

	var srAnimations = {
		zoom_in: {
			
			opacity : 1,
			scale    : 0.01,
		},
		fade_in: {
			distance: 0,
			opacity : 0,
			scale : 1,
		},
		slide_from_left: {
			distance: '200%',
			origin: 'left',			
		},
		slide_from_right: {
			distance: '150%',
			origin: 'right',			
		},
		slide_from_top: {
			distance: '150%',
			origin: 'top',			
		},
		slide_from_bottom: {
			distance: '150%',
			origin: 'bottom',			
		},
		slide_rotate: {
			rotate: { x: 0, y: 0, z: 360 },		
		},		
	};

	var srElCfg = {

		block: [''],
		items: ['article', '.item'],
		text_el: ['.heading', '.header', '.subheader', '.btn', 'p', 'ul'],
		list_el: ['li']
	};


	/*
		Parsing elements class to get variables
	*/
	jQuery('.ltx-sr').each(function() {

		var el = jQuery(this),
			srClass = el.attr('class');

		var srId = srClass.match(/ltx-sr-id-(\S+)/),
			srEffect = srClass.match(/ltx-sr-effect-(\S+)/),
			srEl = srClass.match(/ltx-sr-el-(\S+)/),
			srDelay = srClass.match(/ltx-sr-delay-(\d+)/),
			srDuration = srClass.match(/ltx-sr-duration-(\d+)/),
			srSeq = srClass.match(/ltx-sr-sequences-(\d+)/); 

		var cfg = srAnimations[srEffect[1]];

		var srConfig = {

			delay : parseInt(srDelay[1]),
			duration : parseInt(srDuration[1]),
			easing   : 'ease-in-out',
			afterReveal: function (domEl) { jQuery(domEl).css('transition', 'all .3s ease'); }
		}			

		cfg = jQuery.extend({}, cfg, srConfig);

		var initedEls = [];
		jQuery.each(srElCfg[srEl[1]], function(i, e) {

			initedEls.push('.ltx-sr-id-' + srId[1] + ' ' + e);
		});

		sr.reveal(initedEls.join(','), cfg, parseInt(srSeq[1]));
	});
}

/*
	Slider filter 
	Filters element in slider and reinits swiper slider after
*/
function initSliderFilter(swiper) {

	var btns = jQuery(swiper.el).find('.slider-filter'),
		container = jQuery(swiper.el);

	var ww = jQuery(window).width(),
		wh = jQuery(window).height();

	if (btns.length) {

		btns.on('click', 'a.cat, span.cat, span.img', function() {

			var el = jQuery(this),
				filter = el.data('filter'),
				limit = el.data('limit');

			container.find('.filter-item').show();
			el.parent().parent().find('.cat-active').removeClass('cat-active')
			el.parent().parent().find('.cat-li-active').removeClass('cat-li-active')
			el.addClass('cat-active');
			el.parent().addClass('cat-li-active');

			if (filter !== '') {

				container.find('.filter-item').hide();
				container.find('.filter-item.filter-type-' + filter + '').fadeIn(900);
			}

			if ( filter === 0 ) {

				container.find('.filter-item').fadeIn(900);
			}

			if (swiper !== 0) {

				swiper.slideTo(0, 0);

				swiper.update();
			}

			return false;
		});

		// First Init, Activating first tab
		var firstBtn = btns.find('.cat:first')

		firstBtn.addClass('cat-active');
		firstBtn.parent().addClass('cat-li-active');
		container.find('.filter-item').hide();
		container.find('.filter-item.filter-type-' + firstBtn.data('filter') + '').show();

		if ( firstBtn.data('filter') == 0 ) {

			container.find('.filter-item').show();
		}
	}
}

function initStaticFilter() {

	var btns = jQuery('.static-filter-container').find('.slider-filter'),
		container = jQuery('.static-filter-container');

	var ww = jQuery(window).width(),
		wh = jQuery(window).height();

	if (btns.length) {

		btns.on('click', 'a.cat, span.cat, span.img', function() {

			var el = jQuery(this),
				filter = el.data('filter'),
				limit = el.data('limit');

			container.find('.filter-item').show();
			el.parent().parent().find('.cat-active').removeClass('cat-active')
			el.parent().parent().find('.cat-li-active').removeClass('cat-li-active')
			el.addClass('cat-active');
			el.parent().addClass('cat-li-active');

			if (filter !== '') {

				container.find('.filter-item').hide();
				container.find('.filter-item.filter-type-' + filter + '').fadeIn(900);
			}

			return false;
		});

		// First Init, Activating first tab
		var firstBtn = btns.find('.cat:first')

		firstBtn.addClass('cat-active');
		firstBtn.parent().addClass('cat-li-active');
		container.find('.filter-item').hide();
		container.find('.filter-item.filter-type-' + firstBtn.data('filter') + '').show();
	}
}


/* Swiper slider initialization */
function initSwiper() {

	var products = jQuery('.products-slider'),
		slidersLtx = jQuery('.slider-sc'),
		servicesEl = jQuery('.services-slider'),
		clientsSwiperEl = jQuery('.testimonials-slider'),
		gallerySwiperEl = jQuery('.swiper-gallery'),
		postGalleryEl = jQuery('.ltx-post-gallery'),
		teamEl = jQuery('.ltx-team-slider'),		
		sliderFc = jQuery('.ltx-slider-fc'),		
		textSwiperEl = jQuery('.swiper-text'),
		schedule = jQuery('.swiper-schedule');
		

	if (teamEl.length) {

		jQuery(teamEl).each(function(i, el) {

			var autoplay = false;

		    var teamSwiper = new Swiper(el, {

				speed		: 1000,
				//loop: true,
				spaceBetween : 30,
				navigation: {
					nextEl: '.arrow-right',
					prevEl: '.arrow-left',
				},
				pagination : {

					el: '.swiper-pages',
					clickable: true,				
				},			
				slidesPerView : 3,
			
				autoplay: autoplay,			
		    });

		    initSliderFilter(teamSwiper);

			jQuery(window).on('resize', function() {

				var ww = jQuery(window).width(),
					wh = jQuery(window).height();					

				teamSwiper.params.slidesPerView = 3;
				if (ww <= 1199) { teamSwiper.params.slidesPerView = 2; }
				if (ww <= 768) { teamSwiper.params.slidesPerView = 1; }		
			
				teamSwiper.update();			
			});
		});
	}
		else {

	    initSliderFilter(0);
	}

	if (slidersLtx.length) {

		if ( slidersLtx.data('autoplay') === 0 ) {

			var autoplay = false;
		}
			else {

			var autoplay = {
				delay: slidersLtx.data('autoplay'),
				disableOnInteraction: false,
			}
		}

	    var slidersSwiper = new Swiper(slidersLtx, {

			speed		: 1000,

			effect : 'fade',
			fadeEffect: { crossFade: true },

			autoplay: autoplay,	

			navigation: {
				nextEl: '.arrow-right',
				prevEl: '.arrow-left',
			},			
	
			pagination : {

				el: '.swiper-pages',
				clickable: true,				
			},

	    });

	    slidersSwiper.update();   
	}

	if (sliderFc.length) {

	    var sliderFcSwiper = new Swiper(sliderFc, {

			direction   : 'horizontal',
			
			navigation: {
				nextEl: '.arrow-right',
				prevEl: '.arrow-left',
			},	
			spaceBetween : 5,

			loop		: true,   
			speed		: 1000,   
			slidesPerView : sliderFc.data('cols'),
		
			autoplay    : sliderFc.data('autoplay'),
			autoplayDisableOnInteraction	: false,
		
	    });

	    sliderFcSwiper.update();
	}


	if (postGalleryEl.length) {

	    var postGallerySwiper = new Swiper(postGalleryEl, {

			navigation: {
				nextEl: '.arrow-right',
				prevEl: '.arrow-left',
			},

			speed		: 1000,   
		
			autoplay    : postGalleryEl.data('autoplay'),
			autoplayDisableOnInteraction	: false,
		
	    });

	    postGallerySwiper.update();
	}

	if (clientsSwiperEl.length) {

		jQuery(clientsSwiperEl).each(function(i, el) {

			if ( clientsSwiperEl.data('autoplay') === 0 ) {

				var autoplay = false;
			}
				else {

				var autoplay = {
					delay: clientsSwiperEl.data('autoplay'),
					disableOnInteraction: false,
				}
			}

	  	  var clientsSwiper = new Swiper(el, {

	    	initialSlide : 1,
			speed		: 1000,
			slidesPerView : clientsSwiperEl.data('cols'),

			spaceBetween: 30,

			navigation: {
				nextEl: '.arrow-right',
				prevEl: '.arrow-left',
			},
	
			autoplay: autoplay,	
			pagination : {

				el: '.swiper-pages',
				clickable: true,				
			},

	   	 });

			jQuery(window).on('resize', function() {

				var ww = jQuery(window).width(),
					wh = jQuery(window).height();		    

				if (ww > 1600) { clientsSwiper.params.slidesPerView = 3; }
				if (ww <= 1599) { clientsSwiper.params.slidesPerView = 2; }
				if (ww <= 1000) { clientsSwiper.params.slidesPerView = 1; }		
			
				clientsSwiper.update();			
			});

			
	    	clientsSwiper.update();
		});
	}

	if (products.length) {

	    var productsSwiper = new Swiper(products, {

			speed		: 1000,
			slidesPerView : products.data('cols'),	        
			slidesPerGroup : 1,	        

			autoplay    : products.data('autoplay'),
			autoplayDisableOnInteraction	: false,
	    });

	    initSliderFilter(productsSwiper);
	}

	if (servicesEl.length) {

		jQuery(servicesEl).each(function(i, el) {

			if ( servicesEl.data('autoplay') === 0 ) {

				var autoplay = false;
			}
				else {

				var autoplay = {
					delay: servicesEl.data('autoplay'),
					disableOnInteraction: false,
				}
			}

		    var servicesSwiper = new Swiper(jQuery(el), {

				speed		: 1000,
				spaceBetween: 30,
				loop: true,

				navigation: {
					nextEl: jQuery(el).find('.arrow-right'),
					prevEl: jQuery(el).find('.arrow-left'),
				},	    
				slidesPerView : servicesEl.data('cols'),
			
				autoplay: autoplay,	
		    });

			jQuery(window).on('resize', function() {

				var ww = jQuery(window).width();		    

				if (ww > 1600) { servicesSwiper.params.slidesPerView = 3; }
				if (ww <= 1599) { servicesSwiper.params.slidesPerView = 3; }
				if (ww <= 1199) { servicesSwiper.params.slidesPerView = 2; }		
				if (ww <= 768) { servicesSwiper.params.slidesPerView = 1; }		
			
				servicesSwiper.update();			
			});
		});
	}

	if (gallerySwiperEl.length) {	

	    var gallerySwiperEl = new Swiper(gallerySwiperEl, {
			direction   : 'horizontal',
	        pagination: '.swiper-pagination',
	        paginationClickable: true,		
			autoplay    : 4000,
			autoplayDisableOnInteraction	: false,        
	    });
	}

	if (textSwiperEl.length) {	

	    var textSwiperEl = new Swiper(textSwiperEl, {
			direction   : 'horizontal',
			nextButton	: '.arrow-right',
			prevButton	: '.arrow-left',
			loop		: true,
			autoplay    : 4000,
			autoplayDisableOnInteraction	: false,        
	    });
	}	

	jQuery(window).on('resize', function(){

		var ww = jQuery(window).width(),
			wh = jQuery(window).height();


		if (sliderFc.length && sliderFc.data('cols') >= 3) {

			if (ww > 1200) { sliderFcSwiper.params.slidesPerView = 4; }
			if (ww <= 1200) { sliderFcSwiper.params.slidesPerView = 3; }
			if (ww <= 1000) { sliderFcSwiper.params.slidesPerView = 2; }
			if (ww <= 768) { sliderFcSwiper.params.slidesPerView = 1; }		
		
			sliderFcSwiper.update();			
		}
/*
		if (clientsSwiperEl.length && clientsSwiperEl.data('cols') >= 3) {

			if (ww > 1600) { clientsSwiper.params.slidesPerView = 3; }
			if (ww <= 1599) { clientsSwiper.params.slidesPerView = 2; }
			if (ww <= 1000) { clientsSwiper.params.slidesPerView = 1; }		
		
			clientsSwiper.update();			
		}
			else
		if (clientsSwiperEl.length && clientsSwiperEl.data('cols') == 2) {

			if (ww > 1600) { clientsSwiper.params.slidesPerView = 2; }
			if (ww <= 1000) { clientsSwiper.params.slidesPerView = 1; }		
			if (ww <= 768) { clientsSwiper.params.slidesPerView = 1; }		
		
			clientsSwiper.update();			
		}					
*/

		if (products.length && products.data('cols') >= 2) {

			if (ww >= 1600) { productsSwiper.params.slidesPerView = 3; }
			if (ww <= 1599) { productsSwiper.params.slidesPerView = 3; }
			if (ww <= 1199) { productsSwiper.params.slidesPerView = 2; }
			if (ww <= 768) { productsSwiper.params.slidesPerView = 1; }		
		
			productsSwiper.update();			
		}	

	}).resize();

}

function initBeforeAfter() {

	if ( jQuery('.ltx-before-after').length ) {

		var filter = jQuery('.ltx-ba-filter'),
			wrap = jQuery('.ltx-before-after');

		filter.on('click', 'span', function() {

			var el = jQuery(this),
				current = el.data('filter');

			wrap.find('.ltx-ba-wrap').removeClass('active').hide();
			wrap.find('.ltx-ba-filter-' + current).addClass('active').show();
			initBeforeAfterEl(wrap.find('.ltx-ba-filter-' + current));

			filter.find('span').removeClass('cat-active');
			jQuery(this).addClass('cat-active');
		});

		wrap.find('.ltx-ba-filter-0').addClass('active').show();
		initBeforeAfterEl(wrap.find('.ltx-ba-filter-0'));
		filter.find('li:first-child span').addClass('cat-active');		
	}
}


function initBeforeAfterEl(el) {

	var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

	var $container = jQuery(el),
	$before = $container.find('.before'),
	$after = $container.find('.after'),
	$handle = $container.find('.handle');

	var maxX = $container.outerWidth(),
	offsetX = $container.offset().left,
	startX = 0;

	var touchstart, touchmove, touchend;
	var mousemove = function(e) {
		e.preventDefault();
		var curX = e.clientX - offsetX,
		diff = startX - curX,
		curPos = (curX / maxX) * 100;
		if ( curPos > 100 ) {
			curPos = 100;
		}
		if ( curPos < 0 ) {
			curPos = 0;
		}
		$before.css({right: (100 - curPos) + "%"});
		$handle.css({left: curPos+"%"});
	};
	var mouseup = function(e) {
		e.preventDefault();
		if ( supportsTouch ) {
			jQuery(document).off('touchmove', touchmove);
			jQuery(document).off('touchend', touchend);
		} else {
			jQuery(document).off('mousemove', mousemove);
			jQuery(document).off('mouseup', mouseup);
		}
	};
	var mousedown = function(e) {
		e.preventDefault();
		startX = e.clientX - offsetX;
		if ( supportsTouch ) {
			jQuery(document).on('touchmove', touchmove);
			jQuery(document).on('touchend', touchend);
		} else {
			jQuery(document).on('mousemove', mousemove);
			jQuery(document).on('mouseup', mouseup);
		}
	};

	touchstart = function(e) {
		mousedown({preventDefault: e.preventDefault, clientX: e.originalEvent.changedTouches[0].pageX});
	};
	touchmove = function(e) {
		mousemove({preventDefault: e.preventDefault, clientX: e.originalEvent.changedTouches[0].pageX});
	};
	touchend = function(e) {
		mouseup({preventDefault: e.preventDefault, clientX: e.originalEvent.changedTouches[0].pageX});
	};
	if ( supportsTouch ) {
		$handle.on('touchstart', touchstart);
	} else {
		$handle.on('mousedown', mousedown);
	}
}


function initServicesMenu() {
	
	if ( jQuery('.services-sc.layout-list').length ) {

		jQuery('.services-sc.layout-list').each(function(i, el) {

			var el = jQuery(el),
				filter = el.find('.services-menu'),
				wrap = el.find('.ltx-wrap'),
				menu_wrap = el.find('.menu-wrap');

				filter.off('click').on('click', 'li', function() {

					var li = jQuery(this),
						current = li.data('filter');

					wrap.find('.ltx-service').removeClass('show');
					wrap.find('.ltx-service-' + current).addClass('show');

					filter.find('li').removeClass('cat-active');
					jQuery(this).addClass('cat-active');
				});

				wrap.find('article:first-child').addClass('show');
				filter.find('li:first-child').addClass('cat-active');		
		});
	}
}

function refreshServicesMenu() {
	
	if ( jQuery('.services-sc.layout-list').length ) {

		var el = jQuery('.services-sc.layout-list'),
			filter = el.find('.services-menu'),
			wrap = el.find('.ltx-wrap'),
			menu_wrap = el.find('.menu-wrap');

		var bodyStyles = window.getComputedStyle(document.body);
		var niceScrollConf = {cursorcolor:bodyStyles.getPropertyValue('--main'),cursorborder:"0px",background:bodyStyles.getPropertyValue('--gray'),cursorwidth: "7px",cursorborderradius: "8px",autohidemode:false};

		el.find('.menu-wrap').niceScroll(niceScrollConf);	

		menu_wrap.css('max-height', wrap.outerHeight());
		el.css('min-height', wrap.outerHeight());
	}
}

/* Masonry initialization */
function initMasonry() {

	jQuery('.masonry').masonry({
	  itemSelector: '.item',
	  columnWidth:  '.item'
	});		

	jQuery('.gallery-inner').masonry({
	  itemSelector: '.mdiv',
	  columnWidth:  '.mdiv'
	});			
}

/* Google maps init */
function initMap() {

	jQuery('.ltx-google-maps').each(function(i, mapEl) {

		mapEl = jQuery(mapEl);
		if (mapEl.length) {

			var uluru = {lat: mapEl.data('lat'), lng: mapEl.data('lng')};
			var map = new google.maps.Map(document.getElementById(mapEl.attr('id')), {
			  zoom: mapEl.data('zoom'),
			  center: uluru,
			  scrollwheel: false,
			  styles: mapStyles
			});

			var marker = new google.maps.Marker({
			  position: uluru,
			  icon: mapEl.data('marker'),
			  map: map
			});
		}
	});
}

function initOnScroll() {

   var c, currentScrollTop = 0,
       navbar = jQuery('nav.navbar');

   jQuery(window).scroll(function () {
      var a = jQuery(window).scrollTop();
      var b = navbar.height() - 100;
     
      currentScrollTop = a;
     
      if (c < currentScrollTop && a > b + b) {
        navbar.addClass("scrollUp");
      } else if (c > currentScrollTop && !(a <= b)) {
        navbar.removeClass("scrollUp");
      }
      c = currentScrollTop;
  });	
}