jQuery(function($) {
	$.post('/Home/consult/list', {
		languageType: language
	}, function(data) {
		var list = $('.list>ul');
		if (data.success) {
			$.each(data.result.data, function(k, v) {
				var img = $('<div class="image" image="' + v.artThumb + '"></div>').image();
				$('<li><a href="/consultDetails.html' + pars({
					id: v.id
				}) + '"><div class="left"></div><div class="center"><p>' + v.title + '</p><p>' + globals.timestamp(v.conTime, true) + '</p></div></a></li>').appendTo(list).find('.left').append(img);
			});
		}
	});
	$('.content').append('<div class="message">' + ['查不到想要的資訊？頂部搜「搜索」可以幫到你！', 'Finding the information you want? Top "search" can help you!', 'Finding the information you want? Top "search" can help you!'][language] + '</div></div>');
	$('.menu').empty().append('<a href=""><i class="iconfont">&#xe609</i><p>' + ['最新情報', 'News', 'Notícias'][language] + '</p></a><a href=""><i class="iconfont">&#xe60d</i><p>' + ['商家登記', 'Register', 'Inscrição'][language] + '</p></a>');
});