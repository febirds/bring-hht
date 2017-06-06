jQuery(function($) {
	// data
	(function() {
		$.post('/Admin/consult/list', function(data) {
			if (data.success) {
				$('.content .table table tr').not('.title').remove();
				$.each(data.result.data, function(k, v) {
					$('.content .table table').append('<tr infoId="' + v.id + '"><td class="tc">' + v.id + '</td><td>' + v.title + '</td><td>' + globals.timestamp(v.conTime, true) + '</td><td><a href="/admin/addInformation.html?id=' + v.id + '">修改</a><a href="javascript: globals.delInformation(' + v.id + ');">删除</a></td></tr>');
				});
			}
		});
	})();
});