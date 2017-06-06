jQuery(function($) {
	// ui
	// data
	var id = globals.getParameters('id'),
		register = globals.getParameters('register') == 'true'
		error = function(msg) {
			$('.content .top .error').show().find('span').text(msg);
			return false;
		};
	var _getData = function() {
		var $inputs = $('#mainForm').find('input')
			data = {}
		$.each($inputs, function(k, v){
			if (v.id.indexOf('upload')>0) {
				return
			}
			if (v.id != '' && v.value != '') {
				data[v.id] = v.value;
			}
		})
		data['reply'] = $('#reply').val()
		var _serv = []
		$.each($('input[name=service]:checked'), function(k, v){
			_serv.push($(v).val())
		})
		data['services'] = JSON.stringify(_serv)
		data['type'] = $('#type').val()
		data['nature'] = $('#nature').val()
		return data
	}
	var id = $('#id').val();

	$('#mainForm').on('click', '#mainBtn', function(){
		var data = _getData()
		if (id) {
			$.post('/LeaveMsg/'+id, data, function(response){
				alert(response.msg)
				window.location.href = '/message';
			})
		}
	})
});