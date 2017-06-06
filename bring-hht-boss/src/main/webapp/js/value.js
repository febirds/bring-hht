/**
 * Created by wanp on 17-2-6.
 */
$(function(){
    var id = $('#id').val();

    $('#file_upload').on('change', function() {
        globals.uploadImage($(this)[0].id);
    })

    $('#mainForm').on('click', '#mainBtn', function(){
        var $inputs = $('#mainForm').find('input'),
            data = {}
        $.each($inputs, function(k, v){
            if (v.id == 'file_upload') {
                return
            }
            data[v.id] = v.value;
        })
        delete data['id']
        if (id) {
            $.post('/Value/'+id, data, function(response){
                alert(response.msg)
            })
        } else {
            $.post('/Value', data, function(response){
                alert(response.msg)
            })
        }
    })
})