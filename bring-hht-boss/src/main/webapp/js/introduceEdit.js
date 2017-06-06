jQuery(function($) {
	// ui
	// data
	(function() {
		$('#file_upload').uploadify({
			buttonText: '图片上传',
			swf: '/admin/stylesheets/Uploadify.swf',
			uploader: '/addShop/upload',
			onUploadSuccess: function(file, data, response) {
				console.log(data);
				$('input[name="imageSrc"]').val(data);
				$('#imageSrc').attr('src', '/' + data).show();
			}
		});
		$.post('/Admin/info/introduce', function(data) {
			if (data.success) {
				var v = data.result.result;
				$('.content .tabBox .tab .child>ul>li input[name="imageSrc"]').val(v.image);
				$('#imageSrc').attr('src', v.image).show()
				$('#editor_cn').val(v.introductionCN);
				$('#editor_en').val(v.introductionEN);
				$('#editor_po').val(v.introductionPOR);
			}
		});
	})();
});