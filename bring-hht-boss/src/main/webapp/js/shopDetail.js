jQuery(function($) {
	// ui
	// data
	var id = globals.getParameters('id');
	if (!id) location.href = '/admin/shopList.html';
	$.post('/Admin/merchant/getMerchant', {
		merId: id
	}, function(data) {
		if (data.success) {
			var v = data.result;
			$('.detail ul').empty().append('<li><div class="title">商家通用信息</div><table><tr><td><p>商家ID</p></td><td><p>' + v.main.id + '</p></td></tr><tr><td><p>商家圖片</p></td><td><img class="small" src="' + v.main.artThumb + '"></td></tr><tr><td><p>商家名稱</p></td><td><p>' + v.viceCN.merName + '</p></td></tr><tr><td><p>商家的類型</p></td><td><p>290</p></td></tr><tr><td><p>商家的經營範圍</p></td><td><p>' + v.viceCN.merOperationCN + '</p></td></tr><tr><td><p>商家的地址</p></td><td><p>' + v.viceCN.merAddress + '</p></td></tr><tr><td><p>商家聯繫方式</p></td><td><p>' + v.main.merPhone + '</p></td></tr><tr><td><p>商家座標</p></td><td><p>' + v.main.lat + ',' + v.main.lng + '</p></td></tr><tr><td><p>商家郵箱</p></td><td><p>' + v.main.merEmail + '</p></td></li><tr><td><p>商家網址</p></td><td><p>' + v.main.merUrl + '</p></td></tr><tr><td><p>商家摘要（中文）</p></td><td><p>' + v.viceCN.merDigest + '</p></td></tr><tr><td><p>商家詳情</p></td><td><p>' + v.viceCN.merCommodity + '</p></td></tr><tr><td><p>商家狀態</p></td><td><p>' + v.main.merState + '</p></td></tr><tr><td><p>排序</p></td><td><p>' + v.main.merSort + '</p></td></tr></table></li><li><div class="title">商家其他信息(英文)</div><table><tr><td><p>商家名稱(英文)</p></td><td><p>' + v.viceEN.merName + '</p></td></tr><tr><td><p>商家地址(英文)</p></td><td><p>' + v.viceEN.merAddress + '</p></td></tr><tr><td><p>商家的經營範圍(英文)</p></td><td><p>' + v.viceEN.merOperationCN + '</p></td></tr><tr><td><p>商家摘要（英文）</p></td><td><p>' + v.viceEN.merDigest + '</p></td></tr><tr><td><p>商家詳情（詳情）</p></td><td><p>' + v.viceEN.merCommodity + '</p></td></tr></table></li><li><div class="title">商家其他信息(葡萄牙語)</div><table><tr><td><p>商家名稱(葡萄牙語)</p></td><td><p>' + v.vicePOR.merName + '</p></td></tr><tr><td><p>商家地址(葡萄牙語)</p></td><td><p>' + v.vicePOR.merAddress + '</p></td></tr><tr><td><p>商家的經營範圍(商家葡萄牙語)</p></td><td><p>' + v.vicePOR.merOperationCN + '</p></td></tr><tr><td><p>商家摘要（葡萄牙語）</p></td><td><p>' + v.vicePOR.merDigest + '</p></td></tr><tr><td><p>商家詳情（詳情）</p></td><td><p>' + v.vicePOR.merCommodity + '</p></td></tr><tr><td><a href="/admin/addShop.html?id=' + v.main.id + '">修改</a></td><td><a href="javascript: history.go(-1);">返回</a></td></tr></table></li>');
		}
	});
});