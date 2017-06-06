jQuery(function($) {
	// 登录
	$('.login ul li button').click(function() {
		doLogin();
		return false;
	});

	$("#login-form").on("submit", function(e){
		e.preventDefault();
		doLogin();
	});

	function doLogin(){
		var userName = $('.login ul li input[name="userName"]'),
			password = $('.login ul li input[name="password"]'),
			user = {
				userName: $.trim(userName.val()),
				password: $.trim(password.val())
			},
			error = function(msg) {
				$('.login ul li .error').text(msg).show();
				return false;
			};
		if (user.userName == '') {
			userName.focus();
			return error('用户名不能为空！');
		}
		if (user.password == '') {
			password.focus();
			return error('密码不能为空！');
		}
		$.post('/Auth/login', JSON.stringify(user), function(data) {
			console.log(data);
			if (data.success) {
				sessionStorage.userName = user.userName;
				window.location.href = '/';
				//parent.location.reload();
			} else {
				error('用户名或密码错误！');
			}
		});
	}
});