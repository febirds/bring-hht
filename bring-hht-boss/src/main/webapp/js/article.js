$(function(){

    var contentCN_UE = UE.getEditor('contentCN');
    var contentEN_UE = UE.getEditor('contentEN');
    var contentPT_UE = UE.getEditor('contentPT');

    $('#productSearch').on('click',function(){
        var key = $("#searchKey").val(),
            id = $("#searchId").val(),
            online = $("#searchStatus").val(),
            href = "/product?key="+ key +"&id="+ id;
        if(key != '' || id != ''){
            online = '';
        }
        href += "&online=" + online;
        location.href = href;
    })

    if(typeof Dropzone == 'function'){
        var myDropzone = new Dropzone('form#imageList', {
            url: '/Picture/upload',
            dictDefaultMessage: "上傳圖片",
            addRemoveLinks: true,
            dictRemoveFile: '刪除'
        });
        myDropzone.on("complete", function(file) {
            console.log(file)
            var _response = JSON.parse(file.xhr.response)
            $.post('/ArticlePicture', {articleId: $('input[name=id]').val()?$('input[name=id]').val():0, image: _response.result.images[0].url}, function(response){
                console.log(response)
                $('#imageList').find('.dz-preview .dz-remove').last().data('ppid', response.result.id)
                $('#imageList').find('.dz-preview').last().append('<a style="margin-left: 2rem;font-size:14px" ' +
                    'class="dz-detail setMain" data-ppid="$!picture.id" data-ppurl="$!picture.image"' +
                    'href="javascript:undefined;">設爲主圖</a>')
                $('#imageList').find('.dz-preview .setMain').last().data('ppid', response.result.id)
            })
        });
        myDropzone.on("removedfile", function(file) {
            var _ppid = $(file._removeLink).data('ppid')
            $.ajax({
                url: '/ArticlePicture/'+_ppid,
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
            url: '/ArticlePicture/'+_ppid,
            type: 'DELETE',
            success: function(result) {
                $('[data-ppid='+_ppid+']').parent().remove()
            }
        })
    })
    $('input[type=file]').on('click', function (event) {
        if (!$('input[name=id]').val()) {
            alert('請先保存文章後再上傳')
            event.preventDefault()
            return
        }
    })
	$('#imageList').on('click', '.setMain', function(){
        var _ppid = $(this).data('ppid')
        $.ajax({
            url: '/ArticlePicture/setMainImage/'+_ppid,
            type: 'GET',
            success: function(response) {
                alert('設置成功')
            }
        })
	})

    $('#submit').on('click', function(){
        var _id = $('input[name=id]').val(), _data = {}

        $.each($('input'), function (k, v) {
            _data[v.name] = v.value
        })
        _data['countryId']  = $('#countryId').val()
        _data['contentCN'] = contentCN_UE.getContent()
        _data['contentEN'] = contentEN_UE.getContent()
        _data['contentPT'] = contentPT_UE.getContent()
        delete _data.id
        if (_id) {
            $.post('/Article/'+_id, _data, function(response){
                alert(response.msg)
            })
        } else {
            $.post('/Article', _data, function(response){
                $('input[name=id]').val(response.result.id)
                alert(response.msg)
            })
        }
    })

})