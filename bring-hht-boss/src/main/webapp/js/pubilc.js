var par = globals.getParameters() || {},
	language = par.language || 0,
	lanStr = ['CN', 'EN', 'POR'][language],
	pars = function(op, ops) {
		var newpar = $.extend({}, globals.getParameters(), op);
		if(ops) $.each(ops, function(k, v){
			if(v) delete newpar[k];
		});
		if ($.isEmptyObject(newpar)) return '';
		var newp = '?';
		$.each(newpar, function(k, v) {
			newp += k + '=' + v + '&';
		});
		return newp;
	},
	search = function(){
			location.href = '/Retail.html' + pars({
					id: 1,
					search: escape($('.header .search .search-box').val())
				});
	};
jQuery(function($) {
	//$.adaptive({
	//	fn: function() {},
	//	//debug: true
	//});
	var header = $('.header'),
		icon = ['&#xe603', '&#xe607', '&#xe60a', '&#xe603', '&#xe607'];
	header.empty().append('<a class="menuBtn" href="javascript: void(0);"><i class="iconfont">&#xe610</i></a><div class="menuList"><a href="/index.html?language=' + language + '"><i class="iconfont">&#xe616</i>' + ['首页', 'home page', 'Home page'][language] + '</a><div id="create"></div><a href="/news.html?language=' + language + '"><i class="iconfont">&#xe600</i>' + ['最新情報', 'News', 'Notícias'][language] + '</a><a href="/consult.html?language=' + language + '"><i class="iconfont">&#xe608</i>' + ['貿促局資訊', 'About IPIM', 'Sobre IPIM'][language] + '</a><a href="/index.html?language=' + language + '"><i class="iconfont">&#xe601</i>' + ['商家登記', 'Register', 'Inscrição'][language] + '</a><a href="/aboutus.html?language=' + language + '"><i class="iconfont">&#xe602</i>' + ['關於我們', 'About us', 'Sobre nós'][language] + '</a></div>').append($('<a href="/index.html" class="logo" image="/images/new-logo.png"></a>').image()).append('<div class="search"><i class="iconfont" onclick="search()">&#xe611</i><input class="search-box" type="text" placeholder="' + ['搜索商家或商品', 'Please enter the name of the business you want to search for', 'Please enter the name of the business you want to search for'][language] + '"></div><a class="language" href="javascript: void(0);">' + ['ENG/POR', '中文/POR', '中文/ENG'][language] + '</a><div class="languageBox"><p></p><div class="list"></div></div>');
	$('.header .languageBox .list').append('<a href="' + pars({
		language: 0
	}) + '">中文</a><a href="' + pars({
		language: 1
	}) + '">ENG</a><a href="' + pars({
		language: 2
	}) + '">POR</a>');
	$.post('/Home/merchant/typeList', function(data) {
		var list = $('#create').empty();
		if (data.success) {
			$.each(data.result.result, function(k, v) {
				list.append('<a href="/'+['Wholesale', 'Retail', 'Souvenir', 'Restaurant', 'Located'][k]+'.html' + pars({
					id: v.id
				},{
						search: true
					}) + '"><i class="iconfont">' + icon[k] + '</i>' + v['merchantTypeName' + lanStr] + '</a>');
			});
		}
	});



	$('.header .menuBtn').on('click', function() {
		if ($('.header .menuList').is(':animated')) return false;
		var show = $('.header .menuList').hasClass('show');
		$('.header .menuList').toggleClass('show').animate({
			'left': show ? '-100%' : 0
		}, 300);
		return false;
	});
	$('.header .language').on('click', function() {
		if ($('.header .languageBox').is(':animated')) return false;
		var show = $('.header .languageBox').hasClass('show');
		$('.header .languageBox').toggleClass('show')[show ? 'fadeOut' : 'fadeIn'](300);
		return false;
	});
});