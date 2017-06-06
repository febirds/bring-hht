jQuery(function($) {
	// ui
	// data
	var id = globals.getParameters('id'),
		childData,
		date = $('#date'),
		siteList = $('#siteList'),
		picture = $('#picture'),
		titleCN = $('#titleCN'),
		sponsorCN = $('#sponsorCN'),
		editorCN = UE.getEditor('editor_cn'),
		tilteEN = $('#tilteEN'),
		sponsorEN = $('#sponsorEN'),
		editorEN = UE.getEditor('editor_en'),
		titlePO = $('#titlePO'),
		sponsorPO = $('#sponsorPO'),
		editorPO = UE.getEditor('editor_po'),
		// 错误信息
		error = function(msg) {
			$('.content .top .error').show().find('span').text(msg);
			return false;
		};
	$.post('/Admin/site/list', function(data) {
		siteList.empty();
		$.each(data.result.result, function(k, v) {
			if (k == 0) siteList.val(v.siteId);
			siteList.append('<option value="' + v.siteId + '">' + v.siteName + '</option>');
		});
	});
	// 修改
	if (id) {
		$.post('/Admin/info/get', {
			infoId: id
		}, function(data) {
			if (data.success) {
				var v = data.result;
				childData = v;
				date.val(globals.timestamp(v.main.infoTime, true));
				siteList.val(v.main.siteId);
				picture.val('/'+v.main.artThumb);
				$('#imageSrc').show().attr('src', '/'+v.main.artThumb);
				titleCN.val(v.viceCN.infoTitle);
				sponsorCN.val(v.viceCN.infoSponsor);
				editorCN.addListener("ready", function() {
					editorCN.setContent(v.viceCN.infoContent);
				});
				tilteEN.val(v.viceEN.infoTitle);
				sponsorEN.val(v.viceEN.infoSponsor);
				editorEN.addListener("ready", function() {
					editorEN.setContent(v.viceEN.infoContent);
				});
				titlePO.val(v.vicePOR.infoTitle);
				sponsorPO.val(v.vicePOR.infoSponsor);
				editorPO.addListener("ready", function() {
					editorPO.setContent(v.vicePOR.infoContent);
				});
			}
		});
	}
	$('#file_upload').on('change', function() {
		globals.uploadImage($(this)[0].id);
	});
	// 提交
	$('.content .tabBox .tab .child>ul>li button.submit').click(function() {
		var status = true,
			msg = {
			date: '請填寫發佈時間',
			siteList: '請填寫情報地點',
			picture: '請上傳情報縮略圖',
			titleCN: '請填寫情報標題(中文)',
			sponsorCN: '請填寫主辦方(中文)',
			editorCN: '請填寫情報內容(中文)',
			tilteEN: '請填寫情報標題(英文)',
			sponsorEN: '請填寫主辦方(英文)',
			editorEN: '請填寫情報內容(英文)',
			titlePO: '請填寫情報標題(葡萄牙語)',
			sponsorPO: '請填寫主辦方(葡萄牙語)',
			editorPO: '請填寫情報內容(葡萄牙語)',
		},
			data = {
				date: date.val(),
				siteList: siteList.val(),
				picture: picture.val(),
				titleCN: titleCN.val(),
				sponsorCN: sponsorCN.val(),
				editorCN: editorCN.getContent(),
				tilteEN: tilteEN.val(),
				sponsorEN: sponsorEN.val(),
				editorEN: editorEN.getContent(),
				titlePO: titlePO.val(),
				sponsorPO: sponsorPO.val(),
				editorPO: editorPO.getContent(),
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
			infoTime: globals.timestamp(data.date),
			siteId: data.siteList,
			artThumb: data.picture,
			infoSponsorCN: data.sponsorCN,
			infoTitleCN: data.titleCN,
			infoContentCN: data.editorCN,
			infoSponsorEN: data.sponsorEN,
			infoTitleEN: data.tilteEN,
			infoContentEN: data.editorEN,
			infoSponsorPOR: data.sponsorPO,
			infoTitlePOR: data.titlePO,
			infoContentPOR: data.editorPO
		};
		if (id) json = $.extend({}, json, {
			id: id,
			viceCNId: childData.viceCN.id,
			viceENId: childData.viceEN.id,
			vicePORId: childData.vicePOR.id
		});
		if (globals.intelligence(json)) {
			location.href = '/admin/intelligence.html';
		} else {

		}
		return false;
	});
});