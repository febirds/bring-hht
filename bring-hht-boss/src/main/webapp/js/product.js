$(function(){
    $('#productSearch').on('click',function(){
        var key = $("#searchKey").val(),
            id = $("#searchId").val(),
            online = $("#searchStatus").val(),
            company = $("#company").val(),
            href = "/product?key="+ key +"&id="+ id + "&company="+company;
        if(key != '' || id != ''){
            online = '';
        }
        href += "&online=" + online;
        location.href = href;
    })
    var _renderProperty = function() {
        var _id = $('#categoryId').val()
        $('.property').html('')
        if (_id) {
            $.get('/CategoryProperty/listByCategory?categoryId=' + _id, function(response){
                console.log(response)
                if (response.result.data && response.result.data.length > 0) {
                    $.each(response.result.data, function(k, v){
                        var _dom = $('.property').append('<div data-property="'+ v.propertyId+'">' + v.propertyName + ':</div>')
                        $.get('/CategoryPropertyValue/list', {categoryId: v.categoryId, propertyId:v.propertyId}, function(response){
                            console.log(response)
                            var _result = response.result.data
                            $.each(_result, function(kk, vv){
                                _dom.find('div[data-property='+ v.propertyId+']').append('<label style="display: inline"><input style="display: inline" type="checkbox" data-property="'+ v.propertyId+'" name="propertyValue" value="' + vv.valueId + '">' + vv.valueName + '</label>')
                            })
                        })
                    })
                }
            })
        }
    }

    var _renderService = function() {
        $('.service').html('')
        var _id = $('#companyId').val()
        if (_id) {
            $.post('/Company/getCompanyServices?companyId=' + _id, function(response){
                console.log(response)
                if (response.result.data && response.result.data.length > 0) {
                    for(var i=0; i<response.result.data.length; i++){
                        var v = response.result.data[i]
                        switch (v.service) {
                            case 'deliver' :
                                $('.service').append('<label style="display: inline"><input style="display: inline" type="checkbox" name="service" value="deliver">支持送貨到內地</label>');continue
                            case 'exports' :
                                $('.service').append('<label style="display: inline"><input style="display: inline" type="checkbox" name="service" value="exports">可出口中國內地，建議買賣雙方自行了解報關手續</label>');continue
                            case 'agents' :
                                $('.service').append('<label style="display: inline"><input style="display: inline" type="checkbox" name="service" value="agents">代理商</label>');continue
                            case 'manufacturer' :
                                $('.service').append('<label style="display: inline"><input style="display: inline" type="checkbox" name="service" value="manufacturer">生產商</label>');continue
                            case 'partners' :
                                $('.service').append('<label style="display: inline"><input style="display: inline" type="checkbox" name="service" value="partners">尋找合作夥伴</label>');continue
                            case 'online' :
                                $('.service').append('<label style="display: inline"><input style="display: inline" type="checkbox" name="service" value="online">提供網購參考連結</label>');continue
                        }
                    }
                }
                var _services = $('#services').val()
                var _servArr = _services.split(',')
                $.each(_servArr, function(k, v){
                    $('input[name=service][value='+v+']').prop('checked', true)
                })
            })
        }
    }
    _renderService()

    var _id = $('#id').val()
    var _categoryId = $('#categoryId').val()
    if (_id && _categoryId) {
        $.get('/CategoryProduct/getCategoryByProduct?productId=' + _id, function(response){
            var _result = response.result.data
            $('#categoryId').val(_result.id)
            $('#category').val(_result.nameCN)
            _renderProperty()
        })
        setTimeout(function(){
            $.each($('[data-property]'), function(k, v) {
                var _propertyId = $(v).data('property')
                $.get('/ProductPropertyValueDetail', {productId: _id, propertyId: _propertyId}, function(response){
                    var _data = response.result.data
                    $.each(_data, function(k, v){
                        $('[value=' + v.valueId + ']').prop('checked', true)
                        $('[value=' + v.valueId + ']').data('id', v.id)
                    })
                    console.log(response)
                })
            })
        },500)
    }
	$('#selectCO').on('click', function(){
		$("#dialog").dialog({
			height: 500,
			width: 700,
			modal: true,
            closeText: '',
            close: function(){
                _renderService()
            }
		});
		$('#dialog iframe').show();
	})
	$('#selectCT').on('click', function(){
		$("#dialogCT").dialog({
			height: 500,
			width: 700,
			modal: true,
			closeText: '',
			close: function(){
                // _renderProperty()
			}
		});
		$('#dialogCT iframe').show();
	})
    // $("button[name='selectValue']").on('click', function(){
    //     $("#dialogValue").dialog({
    //         height: 500,
    //         width: 700,
    //         modal: true,
    //         closeText: '',
    //         close: function(){
    //             // _renderProperty()
    //         }
    //     });
    //     $('#dialogValue iframe').show();
    // })

    if(typeof Dropzone == 'function'){
        var myDropzone = new Dropzone('form#imageList', {
            url: '/Picture/upload',
            dictDefaultMessage: "上传图片",
            addRemoveLinks: true,
            dictRemoveFile: '删除'
        });
        myDropzone.on("accept", function(file) {
            console('accept===='+file)
        })
        myDropzone.on("complete", function(file) {
            console.log(file)
            var _response = JSON.parse(file.xhr.response)
            //$('#imageList').find('.dz-preview').last().append('<input type="hidden" name="image" value="'+_response.result.images[0].url+'"><a style="margin-left: 2rem" class="dz-detail setMain" href="javascript:undefined;">主图</a>')
            $.post('/ProductPicture', {productId: $('#id').val()?$('#id').val():1, image: _response.result.images[0].url}, function(response){
                console.log(response)
                $('#imageList').find('.dz-preview .dz-remove').last().data('ppid', response.result.id)
            })
        });
        myDropzone.on("removedfile", function(file) {
            var _ppid = $(file._removeLink).data('ppid')
            $.ajax({
                url: '/ProductPicture/'+_ppid,
                type: 'DELETE',
                success: function(result) {
                    // Do something with the result
                }
            })
        });
    }
    $('#imageList').on('click', '.remove', function(){
        var _ppid = $(this).data('ppid')
        $.ajax({
            url: '/ProductPicture/'+_ppid,
            type: 'DELETE',
            success: function(result) {
                $('[data-ppid='+_ppid+']').parent().remove()
            }
        })
    })
	$('#imageList').on('click', '.setMain', function(){
		alert('test')
	})
	$('.property').on('change', 'input[name=propertyValue]', function(){
		var _productId = $('#id').val();
		if (_productId) {
            var _propertyId = $(this).data('property'),
                _valueId = $(this).val(),
                _id = $(this).data('id')
            if ($(this).prop('checked')) {
                $.ajax({
                    url: '/ProductPropertyValueDetail',
                    type: 'POST',
                    data: {productId: _productId, propertyId: _propertyId, valueId: _valueId},
                    success: function(response) {
                        console.log(response)
                    }
                })
            } else {
                $.ajax({
                    url: '/ProductPropertyValueDetail/'+_id,
                    type: 'DELETE',
                    success: function(response) {
                        console.log(response)
                    }
                })
            }
		}
	})
    $('#mainBtn').on('click', function(){
        var _servicesDom = $('input[name=service]:checked'),
            _services = ''
        $.each(_servicesDom, function(k, v){
            _services += ',' + $(v).val()
        })
        _id = $('#id').val()
        if (_id) {
            $.post('/Product/'+_id, {companyId: $('#companyId').val(), services: _services.substring(1), price: $('#price').val(), countryId: $('#countryId').val(),buyUrl:$('#buyUrl').val()}, function(response){
                alert(response.msg)
            })
        } else {
            $.post('/Product', {companyId: $('#companyId').val(), services: _services.substring(1), price: $('#price').val(), countryId: $('#countryId').val(),buyUrl:$('#buyUrl').val()}, function(response){
                $('#id').val(response.result.id)
                alert(response.msg)
            })
        }
    })

    $('#cnBtn').on('click', function(){
        var data = {}
        _id = $('#id').val()
        data['languageType'] = 'zh_CN'
        data['name'] = $('#nameCN').val()
        data['size'] = $('#sizeCN').val()
        data['detail'] = $('#detailCN').val()
        $.post('/Product/'+_id, data, function(response){
            alert(response.msg)
        })
    })
    $('#catBtn').on('click', function(){
        var data = {}
        _id = $('#id').val()
        data['categoryId'] = $('#categoryId').val()
        data['productId'] = _id
        $.post('/CategoryProduct/'+_id, data, function(response){
            alert(response.msg)
        })
    })
    $('#enBtn').on('click', function(){
        var data = {}
        _id = $('#id').val()
        data['languageType'] = 'en_US'
        data['name'] = $('#nameEN').val()
        data['size'] = $('#sizeEN').val()
        data['detail'] = $('#detailEN').val()
        $.post('/Product/'+_id, data, function(response){
            alert(response.msg)
        })
    })
    $('#porBtn').on('click', function(){
        var data = {}
        _id = $('#id').val()
        data['languageType'] = 'pt_PT'
        data['name'] = $('#namePOR').val()
        data['size'] = $('#sizePOR').val()
        data['detail'] = $('#detailPOR').val()
        $.post('/Product/'+_id, data, function(response){
            alert(response.msg)
        })
    })


    $('.service').on('change', 'input[name=service]', function(){
        var _productId = $('#id').val();

        if (_productId) {
            var _propertyId = $(this).data('property'),
                _value = $(this).val();

            if ($(this).prop('checked')) {
                $.ajax({
                    url: '/Product/addService',
                    type: 'POST',
                    data: {productId: _productId, service: _value},
                    success: function(response) {
                        console.log(response)
                    }
                })
            } else {
                $.ajax({
                    url: '/Product/deleteService',
                    type: 'POST',
                    data: {productId: _productId, service: _value},
                    success: function(response) {
                        console.log(response)
                    }
                })
            }
        }
    })
})