jQuery(function($) {
	// ui
	// data
	(function() {
		$.post('/Admin/info/list', function(data) {
			if (data.success) {
				$('.content .table table tr').not('.title').remove();
				$.each(data.result.result, function(k, v) {
					$('.content .table table').append('<tr infoId="' + v.info_id + '"><td class="tc">' + v.info_id + '</td><td>' + v.info_title + '</td><td>' + globals.timestamp(v.info_time, true) + '</td><td><a href="/admin/addIntelligence.html?id=' + v.info_id + '">修改</a><a href="javascript: void(0);" onclick="globals.addIntelligence(' + v.info_id + ');">删除</a></td></tr>');
				});
			}
		});
	})();
});