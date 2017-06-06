jQuery(function($) {
	// ui
	// data
	(function() {
		$.post('/Admin/site/list', function(data) {
			if (data.success) {
				$('.content .table table tr').not('.title').remove();
				$.each(data.result.result, function(k, v) {
					$('.content .table table').append('<tr siteId="' + v.siteId + '"><td class="tc">' + v.siteId + '</td><td>' + v.siteName + '</td><td>' + (v.siteType ? '博物館' : '其他') + '</td><td><a href="/admin/aedAddress.html?id=' + v.siteId + '">修改</a><a href="javascript: globals.delSite(' + v.siteId + ');">刪除</a></td></tr>');
				});
			}
		});
	})();
});