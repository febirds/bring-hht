$(function(){

    var contentCN_UE = UE.getEditor('descriptionCN');
    var contentEN_UE = UE.getEditor('descriptionEN');
    var contentPT_UE = UE.getEditor('descriptionPT');

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
            $('input[name=bannerImage]').val(_response.result.images[0].url)
        });
        myDropzone.on("removedfile", function(file) {
        });
    }

    $('select[name=showBanner]').on('click', function () {
        if (this.value == 1) {
            $('#imageLi').show()
        } else {
            $('#imageLi').hide()
        }
    })

    $('#submit').on('click', function(){
        var _id = $('input[name=id]').val(), _data = {}

        $.each($('input'), function (k, v) {
            if (v.name && v.value) {
                _data[v.name] = v.value
            }
        })
        _data['showBanner'] = $('select[name=showBanner]').val() || 0
        _data['startTime'] = new Date(_data['startTime'])
        _data['endTime'] = new Date(_data['endTime'])
        _data['countryId']  = $('#countryId').val()
        if (contentCN_UE.getContent())
            _data['descriptionCN'] = contentCN_UE.getContent()
        if (contentEN_UE.getContent())
            _data['descriptionEN'] = contentEN_UE.getContent()
        if (contentPT_UE.getContent())
            _data['descriptionPT'] = contentPT_UE.getContent()
        delete _data.id
        if (_id) {
            $.post('/Convention/'+_id, _data, function(response){
                alert(response.msg)
            })
        } else {
            $.post('/Convention', _data, function(response){
                $('input[name=id]').val(response.result.id)
                alert(response.msg)
            })
        }
    })

})