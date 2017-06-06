var init = function(options) {
	var center = new qq.maps.LatLng(options.lat, options.lng);
	var map = new qq.maps.Map(document.getElementById('map'), {
		center: center,
		zoom: 14
	});
	var infoWin = new qq.maps.InfoWindow({
		map: map
	});
	infoWin.open();
	//tips  自定义内容
	infoWin.setContent('<div class="point"><a href="https://map.qq.com/m/mqq/nav/eword=' + options.merName + '&epointx=' + options.lat + '&epointy=' + options.lng + '&noback=?from=light-app&ch=mc_h5marker&ref=groupActivity_myapp">去这里</a><p>' + options.merName + '</p><span>' + options.merAddress + '</span></div>');
	infoWin.setPosition(center);
};
jQuery(function($) {
	$.post('/Home/merchant/getMerchant', {
		languageType: language,
		merId: par.id
	}, function(data) {
		if (data.success) {
			init(data.result.result);
		}
	});
});