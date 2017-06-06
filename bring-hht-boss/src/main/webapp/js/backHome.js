jQuery(function($) {
	// load
	(function() {
		$('.header .user span').text(sessionStorage.userName);
		$('.header .user .link a.exit').click(function() {
			delete sessionStorage.userName;
			$.get('/Auth/logout', function(resp){
				if(resp.success){
					parent.location.href = '/login';
				}else{
					alert("退出失败");
				}
			});
		});
	})();
	// ui
	var listSwitch = function(obj) {
		var open = obj.hasClass('open');
		obj.toggleClass('open').siblings('.child')[open ? 'slideUp' : 'slideDown']();
	};
	$('.content .list ul li .title').on('click', function() {
		listSwitch($(this));
		return false;
	});
	$('.content .list ul li .child a').on('click', function() {
		$(this).parents('.list').find('.child a').removeClass('current');
		$(this).addClass('current');
	});
	$('.header .menu a.mananger').on('click', function() {
		$('.content .list ul li .child a').removeClass('current');
	});
	listSwitch($('.content .list ul li .title').first());
});