jQuery(function($) {
	// ui
	// data
	(function() {
		$.post('/Admin/merchant/regList', function(data) {
			if (data.success) {
				$('.content .table table tr').not('.title').remove();
				$.each(data.result.result, function(k, v) {
					$('.content .table table').append('<tr><td class="tc">' + v.regId + '</td><td class="tc">中文</td><td class="tc">' + v.merName + '</td><td class="tc">' + v.merPhone + '</td><td class="tc">' + v.merAddress + '</td><td class="tc">' + v.merOperation + '</td><td class="tc">' + ['待審核(需要補充資料)', '', '審核不通過'][v.regState] + '</td><td>' + ['<a href="/admin/addShop.html?id=' + v.regId + '&register=true">审核(补充资料)</a><a href="javascript: globals.rejectApplication(' + v.regId + ');">拒絕申請</a>', '', '<a href="javascript: void(0);">禁止操作</a>'][v.regState] + '</td></tr>');
				});
			}
		});
	})();
});