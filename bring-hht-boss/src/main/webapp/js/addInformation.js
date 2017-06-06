jQuery(function($) {
	// ui
	// data
	var id = globals.getParameters('id'),
		childData,
		status = true,
		date = $('#date'),
		picture = $('#picture'),
		conTitleCN = $('#conTitleCN'),
		editorCN = UE.getEditor('editor_cn'),
		conTilteEN = $('#conTitleEN'),
		editorEN = UE.getEditor('editor_en'),
		conTitlePO = $('#conTitlePOR'),
		editorPO = UE.getEditor('editor_po'),
		// 错误信息
		error = function(msg) {
			$('.content .top .error').show().find('span').text(msg);
			return false;
		};
	// 修改
	if (id) {
		$.post('/Admin/consult/get', {
			id: id
		}, function(data) {
			if (data.success) {
				var v = data.result;
				childData = v;
				date.val(globals.timestamp(v.main.conTime, true));
				picture.val('/'+v.main.artThumb);
				$('#imageSrc').show().attr('src', '/'+v.main.artThumb);
				conTitleCN.val(v.detail[0].conTitle);
				editorCN.addListener("ready", function() {
					editorCN.setContent(v.detail[0].conContent);
				});
				conTilteEN.val(v.detail[1].conTitle);
				editorEN.addListener("ready", function() {
					editorEN.setContent(v.detail[1].conContent);
				});
				conTitlePO.val(v.detail[2].conTitle);
				editorPO.addListener("ready", function() {
					editorPO.setContent(v.detail[2].conContent);
				});
			}
		});
	}
	$('#file_upload').on('change', function() {
		globals.uploadImage($(this)[0].id);
	});
	// 提交
	$('.content .tabBox .tab .child>ul>li button.submit').click(function() {
		var msg = {
			date: '請填寫發佈時間',
			picture: '請上傳情報縮略圖',
			conTitleCN: '資訊標題(中文)',
			editorCN: '資訊內容(中文)',
			conTilteEN: '資訊標題(英文)',
			editorEN: '資訊內容(英文)',
			conTitlePO: '資訊標題(葡萄牙語)',
			editorPO: '資訊內容(葡萄牙語)',
		},
			data = {
				date: date.val(),
				picture: picture.val(),
				conTitleCN: conTitleCN.val(),
				editorCN: editorCN.getContent(),
				conTilteEN: conTilteEN.val(),
				editorEN: editorEN.getContent(),
				conTitlePO: conTitlePO.val(),
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
			conTime: globals.timestamp(data.date),
			artThumb: data.picture,
			consultVices: [{
				languageType: 0,
				conTitle: data.conTitleCN,
				conIntro: '',
				conContent: data.editorCN
			}, {
				languageType: 1,
				conTitle: data.conTilteEN,
				conIntro: '',
				conContent: data.editorEN
			}, {
				languageType: 2,
				conTitle: data.conTitlePO,
				conIntro: '',
				conContent: data.editorPO
			}]
		};
		if (id) {
			json = $.extend({}, json, {
				id: id,
			});
			json.consultVices[0].id = childData.detail[0].id;
			json.consultVices[1].id = childData.detail[1].id;
			json.consultVices[2].id = childData.detail[2].id;
		}
		json.consultVices = JSON.stringify(json.consultVices);
		if (globals.information(json)) {
			location.href = '/admin/information.html';
		} else {

		}
		return false;
	});
});