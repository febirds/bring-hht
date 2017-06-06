jQuery(function($) {
	var type = ['CN', 'EN', 'POR'];
	$('.content').append('<div class="error"><p>請填寫商家的名稱!(必填項)</p></div><ul><li><p><i>*</i>' + ['商家名稱', 'Company Name', 'Nome da Empresa'][language] + '</p><input name="merName" type="text"></li><li><p><i>*</i>' + ['商家照片', 'Company Img', 'As fotos'][language] + '</p><input id="file_upload" name="file" type="file"><input name="filename" type="text" value="未选择任何文件" readonly="true"></li><li><p><i>*</i>' + ['商家类型', 'Company Style', 'Tipos de empresas'][language] + '</p><select name="merStyle"></select></li><li><p><i>*</i>' + ['經營範圍', 'Business Scope', 'Área de Negócio'][language] + '</p><input name="merOperation" type="text"></li><li><p><i>*</i>' + ['商家地址', 'Address', 'Endereço'][language] + '</p><input name="merAddress" type="text"></li><li><p><i>*</i>' + ['電話', 'Tel', 'Telefone'][language] + '</p><input name="merPhone" type="text"></li><li><p>' + ['&nbsp;郵箱', 'E-mail', 'E-mail'][language] + '</p><input name="email" type="text"></li><li><p>' + ['&nbsp;網址', 'Website', 'Website'][language] + '</p><input name="merUrl" type="text"></li></ul><button>' + ['提交', 'Submit', 'Submeter'][language] + '</button>');
	$.post('/Home/merchant/typeList', {
		language: language
	}, function(data) {
		if (data.success) {
			var list = $('.content ul li select').empty();
			$.each(data.result.result, function(k, v) {
				list.append('<option value="' + v.id + '">' + v['merchantTypeName' + type[language]] + '</option>')
			});
		}
	});
	var dom = {
		merName: $('input[name="merName"]'),
		artThumb: $('input[name="file"]'),
		merStyle: $('select[name="merStyle"]'),
		merOperation: $('input[name="merOperation"]'),
		merAddress: $('input[name="merAddress"]'),
		merPhone: $('input[name="merPhone"]'),
		email: $('input[name="email"]'),
		merUrl: $('input[name="merUrl"]')
	},
		msg = {
			merName: '請填寫商家的名稱!(必填項)',
			artThumb: '請上傳商家的相關圖片(必填項)',
			merOperation: '請填寫商家的經營範圍!(必填項)',
			merAddress: '請填寫商家的地址!(必填項)',
			merPhone: '請填寫商家聯繫方式!(必填項)',
		},
		error = function(msg) {
			$('.content .error').show().find('p').text(msg);
			return false;
		};
	$('#file_upload').on('change', function() {
		globals.uploadImage($(this)[0].id, 'filename');
	});
	$('.content button').on('click', function() {
		var data = {
			merName: dom.merName.val(),
			artThumb: dom.artThumb.val(),
			merStyle: dom.merStyle.val(),
			merOperation: dom.merOperation.val(),
			merAddress: dom.merAddress.val(),
			merPhone: dom.merPhone.val(),
			email: dom.email.val(),
			merUrl: dom.merUrl.val(),
			languageType: language
		},
			status = true;
		$.each(msg, function(k, v) {
			if (data[k] == '') {
				$('.content').scrollTop(0);
				status = false;
				error(v);
				return false;
			}
		});
		if (!status) return false;
		data.artThumb = $('input[name="filename"]').val();
		$.post('/reg', data, function(data) {
			if (data.success) {
				$('.success').show();
				$('.menu a').removeClass('current');
			}
		});
		return false;
	});

	$('.menu').empty().append('<a href="/news.html' + pars({
		language: language
	}) + '"><i class="iconfont">&#xe609</i><p>' + ['最新情報', 'News', 'Notícias'][language] + '</p></a><a class="current" href="/create.html' + pars({
		language: language
	}) + '"><i class="iconfont">&#xe60d</i><p>' + ['商家登記', 'Register', 'Inscrição'][language] + '</p></a>');
});