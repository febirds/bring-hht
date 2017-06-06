jQuery(function($) {
	// ui
	// data
	var id = globals.getParameters('id'),
		childData,
		status = true,
		icon = $('#icon'),
		image = $('#image'),
		merchantTypeNameCN = $('#merchantTypeNameCN'),
		introductionCN = $('#introductionCN'),
		merchantTypeNameEN = $('#merchantTypeNameEN'),
		introductionEN = $('#introductionEN'),
		merchantTypeNamePOR = $('#merchantTypeNamePOR'),
		introductionPOR = $('#introductionPOR'),
		// 错误信息
		error = function(msg) {
			$('.content .top .error').show().find('span').text(msg);
			return false;
		};
	// 修改
	if (id) {
		$.post('/Admin/merchant/getType', {
			id: id
		}, function(data) {
			if (data.success) {
				var v = data.result.result;
				childData = v;
				icon.val(v.icon);
				$('#imageSrc_icon').show().attr('src', v.icon);
				image.val(v.image);
				$('#imageSrc_image').show().attr('src', v.image);
				merchantTypeNameCN.val(v.merchantTypeNameCN);
				introductionCN.val(v.introductionCN);
				merchantTypeNameEN.val(v.merchantTypeNameEN);
				introductionEN.val(v.introductionEN);
				merchantTypeNamePOR.val(v.merchantTypeNamePOR);
				introductionPOR.val(v.introductionPOR);
			}
		});
	}
	$('#upload_icon').on('change', function() {
		globals.uploadImage($(this)[0].id, 'imageSrc_icon');
	});
	$('#upload_image').on('change', function() {
		globals.uploadImage($(this)[0].id, 'imageSrc_image');
	});
	// 提交
	$('.content .tabBox .tab .child>ul>li button.submit').click(function() {
		var msg = {
			icon: '請上傳商家圖標',
			image: '請上傳商家圖片',
			merchantTypeNameCN: '請填寫商家類型名稱（中文）',
			introductionCN: '請填寫商家类型介紹（中文）',
			merchantTypeNameEN: '請填寫商家類型名稱（英文）',
			introductionEN: '請填寫商家类型介紹（英文）',
			merchantTypeNamePOR: '請填寫商家類型名稱（葡萄牙語）',
			introductionPOR: '請填寫商家类型介紹（葡萄牙語）',
		},
			data = {
				icon: icon.val(),
				image: image.val(),
				merchantTypeNameCN: merchantTypeNameCN.val(),
				introductionCN: introductionCN.val(),
				merchantTypeNameEN: merchantTypeNameEN.val(),
				introductionEN: introductionEN.val(),
				merchantTypeNamePOR: merchantTypeNamePOR.val(),
				introductionPOR: introductionPOR.val(),
			};
		$.each(data, function(k, v) {
			if (v == '') {
				$('.content').scrollTop(0);
				error(msg[k]);
				status = false;
				return false;
			}
		});
		if (!status) return status;
		var json = {
			icon: icon.val(),
			image: image.val(),
			merchantTypeNameCN: merchantTypeNameCN.val(),
			introductionCN: introductionCN.val(),
			merchantTypeNameEN: merchantTypeNameEN.val(),
			introductionEN: introductionEN.val(),
			merchantTypeNamePOR: merchantTypeNamePOR.val(),
			introductionPOR: introductionPOR.val(),
			merchantUrl: ''
		};
		if (id) json = $.extend({}, json, {
			id: id
		});
		if (globals.shopTyle(json)) {
			location.href = '/admin/typeList.html';
		} else {

		}
		return false;
	});
});