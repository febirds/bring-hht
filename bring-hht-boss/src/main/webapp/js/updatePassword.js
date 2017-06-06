jQuery(function($) {
	// 修改密码
	$('.content .updatePass ul li .right button.submit').click(function() {
		var pass = $('.content .updatePass ul li .right input[name="pass"]'),
			newPass = $('.content .updatePass ul li .right input[name="newPass"]'),
			newPassE = $('.content .updatePass ul li .right input[name="newPassE"]'),
			user = {
				userName: sessionStorage.userName,
				password: $.trim(newPass.val()),
				oldPassword: $.trim(pass.val())
			},
			error = function(msg) {
				$('.content .top .error').show().find('span').text(msg);
				return false;
			};
		if (user.password == '') {
			newPass.focus();
			return error('新密碼不能為空！');
		}
		if (user.password.length < 6 || user.password.length > 20) {
			newPass.focus();
			return error('新密碼必須在6-20位之間！');
		}
		if (user.password !== $.trim(newPassE.val())) {
			newPassE.val('').focus();
			return error('新密碼和確認密碼不一致！');
		}
		$.post('/Auth/updatePassword', JSON.stringify(user), function(data) {
			if (data.success) {
				error('密碼修改成功,請牢記您的密碼！');
			} else {
				pass.val('').focus();
				error('原密碼輸入錯誤，請重新檢查輸入！');
			}
		});
		return false;
	});
	// 返回
	$('.content .updatePass ul li .right button.return').click(function() {
		history.go(-1);
		return false;
	});
});