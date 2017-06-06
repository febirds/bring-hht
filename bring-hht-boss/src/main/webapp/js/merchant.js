jQuery(function($) {
	var par = globals.getParameters(),
		language = par.language || 0;
	window.jump = function() {
		var url = 'http://apis.map.qq.com/tools/poimarker?type=0&marker=';
		for (var i = 0; i < 10; i++) {
			var v = shopList[i];
			url += 'coord:' + v.lat + ',' + v.lng + ';title:' + v.merName + ';addr:' + v.merAddress + (i == 9 ? '' : '|');
		};
		url += '&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp';
		location.href = url;
	};
	if (!par.id) location.href = '/index.html';
	$.post( '/Home/merchant/getType',{
		typeId: par.id
	}, function(data) {
		if (data.success) {
			var v = data.result.result,
				lanStr = ['CN', 'EN', 'POR'][language];
			document.title = v['merchantTypeName' + lanStr];
			$('<div class="banner" image="' + v.img + '"><p>' + v['introduction' + lanStr] + '</p></div>').appendTo('.content').image();
			$('.content').append('<div class="map" onclick="jump();"><i class="iconfont">&#xe615</i></div><div class="list"><ul></ul></div><div class="message">' + ['查不到想要的資訊？頂部搜「搜索」可以幫到你！', 'Finding the information you want? Top "search" can help you!', 'Finding the information you want? Top "search" can help you!'][language] + '</div></div>');
			$.post('/Home/merchant/list', {
				merStyle: par.id,
				languageType: language
			}, function(data) {
				if (data.success) {
					$('.list>ul').empty();
					window.shopList = data.result.data;
					$.each(data.result.data, function(k, v) {
						$('.list>ul').append('<li onclick="location.href = \'/product.html' + pars({
							id: v.merId,
							language: language
						}) + '\'"><div class="left"><div class="image" image="' + v.artThumb + '"></div></div><div class="center"><p>' + v.merName + '</p><div class="details"><ul><li><p>電&nbsp;話:</p><a href="tel: ' + v.merPhone + '">' + v.merPhone + '</a></li><li><p>地&nbsp;址:</p><span>' + v.merAddress + '</span></li></ul></div></div><div class="right"><i class="iconfont">&#xe604</i><p>' + v.distance + '</p><p>km</p></div></li>');
					});
				}
			});
		}
	});
});