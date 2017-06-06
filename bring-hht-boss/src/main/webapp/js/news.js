jQuery(function($) {
	var par = globals.getParameters() || {},
		language = par.language || 0;
	$.post('/Home/info/getInstro', function(data) {
		if (data.success) {
			var v = data.result.result,
				lanStr = ['CN', 'EN', 'POR'][language];
			$('<div class="banner" image="' + v.image + '"><p>' + v['introduction' + lanStr] + '</p></div>').appendTo('.content').image();
			$('.content').append('<div class="list"><ul></ul></div><div class="message">' + ['查不到想要的資訊？頂部搜「搜索」可以幫到你！', 'Finding the information you want? Top "search" can help you!', 'Finding the information you want? Top "search" can help you!'][language] + '</div></div>');
			$.post('/Home/info/listAll', {
				merStyle: par.id,
				languageType: language
			}, function(data) {
				if (data.success) {
					$('.list>ul').empty();
					var infoSponsor = ['主辦方:', 'Sponsor：', 'Organizadores：'],
						address = ['地點:', 'Position：', 'Local：']
					$.each(data.result.result, function(k, v) {
						var image =
							$('<div class="image" image="' + v.artThumb + '"></div>').appendTo($('<li onclick="location.href = \'/intelligence.html' + pars({
								id: v.infoId,
								language: language
							}) + '\'"><div class="left"></div><div class="center"><p>' + v.infoTitle + '</p><div class="details"><ul><li><p>'+infoSponsor[language]+'</p><span>' + v.infoSponsor + '</span></li><li><p>'+address[language]+'</p><span>' + v.site_name + '</span></li></ul></div></div></li>').appendTo('.list>ul').find('.left')).image();
					});
				}
			});
		}
	});
	$('.menu').empty().append('<a class="current" href="/news' + pars({
		language: language
	}) + '"><i class="iconfont">&#xe609</i><p>' + ['最新情報', 'News', 'Notícias'][language] + '</p></a><a href="/create' + pars({
		language: language
	}) + '"><i class="iconfont">&#xe60d</i><p>' + ['商家登記', 'Register', 'Inscrição'][language] + '</p></a>');
});