jQuery(function($) {
	// ui
	// data
	var id = globals.getParameters('id'),
		childData,
		status = true,
		siteType = $('#siteType'),
		latlng = $('#latlng'),
		siteNameCN = $('#siteNameCN'),
		siteIntroCN = UE.getEditor('editor_cn'),
		siteNameEN = $('#siteNameEN'),
		siteIntroEN = UE.getEditor('editor_en'),
		siteNamePOR = $('#siteNamePOR'),
		siteIntroPOR = UE.getEditor('editor_po'),
		// 错误信息
		error = function(msg) {
			$('.content .top .error').show().find('span').text(msg);
			return false;
		};
	// 修改
	if (id) {
		$.post('/Admin/site/get', {
			siteId: id
		}, function(data) {
			console.log(data);
			if (data.success) {
				var v = data.result;
				childData = v;
				siteType.val(v.main.siteType);
				latlng.val(v.main.lat + ', ' + v.main.lng);
				siteNameCN.val(v.viceCN.siteName);
				siteIntroCN.addListener("ready", function() {
					siteIntroCN.setContent(v.viceCN.siteIntro);
				});
				siteNameEN.val(v.viceEN.siteName);
				siteIntroEN.addListener("ready", function() {
					siteIntroEN.setContent(v.viceEN.siteIntro);
				});
				siteNamePOR.val(v.vicePOR.siteName);
				siteIntroPOR.addListener("ready", function() {
					siteIntroPOR.setContent(v.vicePOR.siteIntro);
				});
			}
		});
	}
	// 提交
	$('.content .tabBox .tab .child>ul>li button.submit').click(function() {
		var msg = {
			siteType: '請填寫地點類型',
			latlng: '請填寫地址座標',
			siteNameCN: '請填寫地點名称(中文)',
			siteIntroCN: '請填寫地點簡介(中文)',
			siteNameEN: '請填寫地點名称(英文)',
			siteIntroEN: '請填寫地點簡介(英文)',
			siteNamePOR: '請填寫地點名称(葡萄牙語)',
			siteIntroPOR: '請填寫地點簡介(葡萄牙語)',
		},
			data = {
				siteType: siteType.val(),
				latlng: latlng.val(),
				siteNameCN: siteNameCN.val(),
				siteIntroCN: siteIntroCN.getContent(),
				siteNameEN: siteNameEN.val(),
				siteIntroEN: siteIntroEN.getContent(),
				siteNamePOR: siteNamePOR.val(),
				siteIntroPOR: siteIntroPOR.getContent(),
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
			siteType: data.siteType,
			lat: data.latlng.split(',')[0],
			lng: data.latlng.split(',')[1],
			siteNameCN: data.siteNameCN,
			siteIntroCN: data.siteIntroCN,
			siteNameEN: data.siteNameEN,
			siteIntroEN: data.siteIntroEN,
			siteNamePOR: data.siteNamePOR,
			siteIntroPOR: data.siteIntroPOR,
		};
		if (id) json = $.extend({}, json, {
			id: id,
			viceCNId: childData.viceCN.id,
			viceENId: childData.viceEN.id,
			vicePORId: childData.vicePOR.id
		});
		if (globals.addSite(json)) {
			location.href = '/admin/address.html';
		} else {

		}
		return false;
	});
});