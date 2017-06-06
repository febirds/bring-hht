jQuery(function($) {
	// ui
	// data
	/*var id = globals.getParameters('id'),
		register = globals.getParameters('register') == 'true'
		error = function(msg) {
			$('.content .top .error').show().find('span').text(msg);
			return false;
		};*/
	$('#file_upload0').on('change', function() {
		globals.uploadImage($(this)[0].id, "imageSrc0");
	})
	$('#file_upload').on('change', function() {
		globals.uploadImage($(this)[0].id, "imageSrc");
	})
	var _getData = function() {
		var $inputs = $('#mainForm').find('input'),
			data = {}
		$.each($inputs, function(k, v){
			if (v.id.indexOf('upload')>0) {
				return
			}
			if (v.id != '' && v.value != '') {
				data[v.id] = v.value;
			}
		})
		var _serv = ''
		$.each($('input[name=service]:checked'), function(k, v){
			_serv += ',' + $(v).val()
		})
		data['services'] = _serv.substring(1)
		data['type'] = $('#type').val()
		data['nature'] = $('#nature').val()
		data['peopleNum'] = $('#peopleNum').val()
		data['country'] =$('#country').val()
		return data
	}
	var id = $('#id').val();

	$('#mainForm').on('click', '#mainBtn', function(){
		var data = _getData()
		// if(!data.country){
		// 	alert("请选择国家");
		// 	return;
		// }
		// if(!data.logo){
		// 	alert("请上传企业LOGO");
		// 	return;
		// }
		if (id) {
			$.post('/Company/'+id, data, function(response){
				alert(response.msg)
			})
		} else {
			$.post('/Company', data, function(response){
                $('#id').val(response.result.id)
				alert(response.msg)
			})
		}
	})

	$('#cnBtn').on('click', function(){
        var id = id || $('#id').val();
		var data = {}
		data['languageType'] = 'zh_CN'
		data['name'] = $('#nameCN').val()
		data['business'] = $('#businessCN').val()
		$.post('/Company/'+id, data, function(response){
			alert(response.msg)
		})
	})
	$('#enBtn').on('click', function(){
        var id = id || $('#id').val();
		var data = {}
		data['languageType'] = 'en_US'
		data['name'] = $('#nameEN').val()
		data['business'] = $('#businessEN').val()
		$.post('/Company/'+id, data, function(response){
			alert(response.msg)
		})
	})
	$('#porBtn').on('click', function(){
        var id = id || $('#id').val();
		var data = {}
		data['languageType'] = 'pt_PT'
		data['name'] = $('#namePOR').val()
		data['business'] = $('#businessPOR').val()
		$.post('/Company/'+id, data, function(response){
			alert(response.msg)
		})
	})
	$('input[name=service]').on('change', function(){
		var id = $("#id").val();
		if(id){
			if ($(this).prop('checked')) {
				$.post('/Company/addService', {companyId:id,service:$(this).val()}, function(response) {
					alert(response.msg);
				})
			} else {
				$.post('/Company/deleteService', {companyId:id,service:$(this).val()}, function(response) {
					alert(response.msg);
				})
			}
		}
	})
});