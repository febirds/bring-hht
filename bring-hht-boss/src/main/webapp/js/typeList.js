jQuery(function($) {
	// ui
	// data
	(function() {
		$.post('/Admin/merchant/typeList', function(data) {
			if (data.success) {
				$('.content .table table tr').not('.title').remove();
				$.each(data.result.result, function(k, v) {
					$('.content .table table').append('<tr typeId="' + v.id + '"><td class="tc">' + v.id + '</td><td>' + v.merchantTypeNameCN + '</td><td><a href="/admin/shopType.html?id=' + v.id + '">修改</a><a href="javascript: globals.delshopTyle(' + v.id + ');">删除</a></td></tr>');
				});
			}
		});
	})();
});