var $doc = $(document);

function mobileSearch() {
	$(this).addClass('search--mobile--opened');
}

function stickToBottom () {
	var fixedButton = $('.filters .btn');
	var a = $(".filters").offset().top;
	var b = $(".filters").outerHeight();
	var c = $(window).height();
	var d = $(window).scrollTop();
	if((c+d)>(a+b)) {
		fixedButton.addClass('btn--fixed')
	} else {
		fixedButton.removeClass('btn--fixed')
	}
}

function topFunction() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
}

function bottomFunction() {
	window.scrollTo(0,document.body.scrollHeight);
}

function tabs() {
	$(this)
	    .addClass('active').siblings().removeClass('active')
	    .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
}

function toggleSideMenu() {
	$('._side-panel').toggleClass('active');
}

function accordeon() {
  $(this).parent().toggleClass('acc__row--active');
}

function selectInit() {
	var filters = {
			forum : "Все форумы",
			theme : "Все темы",
			year : "Все годы",
			author : "Все авторы"
		};

		$('.side-filters__filter--select').each(function() {
			var data = $(this).attr('data-filter');
			var placeholder = filters[data];
			$(this).select2({
				placeholder: placeholder,
  				allowClear: true
			})
		});

		$('.side-filters__filter--select').on("select2:selecting", function(e) {
			$(this).addClass('selected')
		});

		$('.side-filters__filter--select').on("select2:unselect", function(e) {
			$(this).removeClass('selected')
		});
}

function mainNavMarker () {
	var d = {
			duration:500,
			easing: 'easeOutExpo'
		},
		menu = $('.main-nav__menu'),
		header = menu.parents('header'),

		item = menu.children('li'),
		active = item.filter('.active'),
		marker = menu.children('.marker'),
		left = Math.round(item.eq(0).offset().left),
		W = 0,
		container = menu.parents('.container');

	var delta = function(){

		var paddingLeft = parseInt(container.css('padding-left'),10);

		return $doc.width() < 1280 ? paddingLeft : container.offset().left+paddingLeft;
	};

	////////////////////////////////////
	if (active.length) {

		left = Math.round(active.offset().left)-delta(),
		W = active.children().eq(0).width();
	};

	marker.css({left: left, width: W});

	////////////////////////////////////
	item.hover(function () {
		left = Math.round($(this).offset().left-delta());
		W = $(this).children().eq(0).width();
		marker.stop(false, true).animate({left: left, width: W}, d);

	}).click(function () {

		item.removeClass('active');
		$(this).addClass('active');

	});

	////////////////////////////////////
	menu.mouseleave(function () {

		active = item.filter('.active');

		if (active.length) {
			left = Math.round(active.offset().left-delta());
			W = active.children().eq(0).width();

		} else {

			//left = Math.round(item.eq(0).offset().left - menu_left + parseInt(item.eq(0).children().eq(0).css('padding-left'))),
			W = 0;
		};

		marker.stop(false, true).animate({left: left, width: W}, d);
	})
}



$(function () {

	mainNavMarker();

	var search_form_elements = $('#header-search-form, #header-search-input, #header-search-reset'),
		search_form = $('#header-search-form');

	var hide_form = function(e){

		//console.log(e.target.className);

		if ($(e.target).is(search_form_elements)) return;

		search_form.add('.navbar-search > a').removeClass('active');
		$('body').unbind('click', hide_form);
	};


	$doc.on('click','.navbar-search > a',function(e){

		e.preventDefault();
		$(this).toggleClass('active');
		search_form.toggleClass('active').find('input').focus();

		$('body').bind('click', hide_form);

	});

	$('.main-nav__hamburger').on('click', toggleSideMenu);

	$('ul.tabs__list').on('click', 'li:not(.active)', tabs);

	$('.search--mobile').on('click', mobileSearch);

	$('.search__cross').on('click', function(e) {
		e.stopPropagation();
		$(this).parent().removeClass('search--mobile--opened')
	});

	$('.acc__button').on('click', accordeon);

	if ($('.filters .btn').length){
		$doc.on('scroll', stickToBottom);
	}

	if ($('.side-filters__filter--select')) {
		selectInit();
	}

	if ($('.filters--mobile').length) {
		var swiper = new Swiper('.filters--mobile', {
			freeMode: true,
			slidesPerView : 'auto',
			initialSlide : 1,
		})
	}

});