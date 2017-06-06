jQuery(function($) {
	// $('.content')
	$.post('/Home/consult/get', {
		id: par.id || 0,
		languageType: par.language || 0
	}, function(data) {
		console.log(data);
		if (data.success) {
			var v = data.result.detail;
			$('.content').append('<h1>' + v.conTitle + '</h1>').append(v.conContent);
		}
	});
});