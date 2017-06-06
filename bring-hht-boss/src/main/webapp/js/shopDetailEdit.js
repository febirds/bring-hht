jQuery(function($) {
	// ui
	// data
	var id = globals.getParameters('id'),
		childData,
		status = true,
		editorCN = UE.getEditor('editor_cn'),
		editorEN = UE.getEditor('editor_en'),
		editorPOR = UE.getEditor('editor_po'),
		// 错误信息
		error = function(msg) {
			$('.content .top .error').show().find('span').text(msg);
			return false;
		};
	if (!id) {
		location.href = '/admin/shopList.html';
		return;
	}
	$.post('/Admin/merchant/getMerchant', {
		merId: id
	}, function(data) {
		if (data.success) {
			var v = data.result;
			childData = v;
			editorCN.addListener("ready", function() {
				editorCN.setContent(v.viceCN.merCommodity);
			});
			editorEN.addListener("ready", function() {
				editorEN.setContent(v.viceEN.merCommodity);
			});
			editorPOR.addListener("ready", function() {
				editorPOR.setContent(v.vicePOR.merCommodity);
			});
		}
	});
	// 提交
	$('.content .tabBox .tab .child>ul>li button.submit').click(function() {
		var msg = {
			editorCN: '請填寫商品詳情(中文)',
			editorEN: '請填寫商品詳情(英文)',
			editorPOR: '請填寫商品詳情(葡萄牙語)'
		},
			data = {
				editorCN: editorCN.getContent(),
				editorEN: editorEN.getContent(),
				editorPOR: editorPOR.getContent()
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
		if (globals.shop($.extend({
			id: childData.main.id,
			viceCNId: childData.viceCN.id,
			viceENId: childData.viceEN.id,
			vicePORId: childData.vicePOR.id,
			merPhone: childData.main.merPhone,
			merEmail: childData.main.merEmail,
			merUrl: childData.main.merUrl,
			merStyle: childData.main.merStyle,
			artThumb: childData.main.artThumb,
			lat: childData.main.lat,
			lng: childData.main.lng,
			merSort: childData.main.merSort,
			merQrcode: childData.main.merQrcode,
			merNameCN: childData.viceCN.merName,
			merAddressCN: childData.viceCN.merAddress,
			merOperationCN: childData.viceCN.merOperation,
			merDigestCN: childData.viceCN.merCommodity,
			merNameEN: childData.viceEN.merName,
			merAddressEN: childData.viceEN.merAddress,
			merOperationEN: childData.viceEN.merOperation,
			merDigestEN: childData.viceEN.merCommodity,
			merNamePOR: childData.vicePOR.merName,
			merAddressPOR: childData.vicePOR.merAddress,
			merOperationPOR: childData.vicePOR.merOperation,
			merDigestPOR: childData.vicePOR.merCommodity,
			distance: childData.main.distance,
		}, {
			merCommodityCN: editorCN.getContent(),
			merCommodityEN: editorEN.getContent(),
			merCommodityPOR: editorPOR.getContent(),
		}))) {
			location.href = '/admin/shopDetail.html?id=' + childData.main.id;
		} else {

		}
		return false;
	});
});