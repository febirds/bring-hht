/**
 * Created by wanp on 17-2-6.
 */
$(function(){
    var id = $('#id').val();

    $('#mainForm').on('click', '#mainBtn', function(){
        var $inputs = $('#mainForm').find('input'),
            data = {}
        $.each($inputs, function(k, v){
            if (v.id == 'file_upload') {
                return
            }
            data[v.id] = v.value;
        })
        if (!data['categoryId']) {
            data['parentId'] = 0
        } else {
            data['parentId'] = data['categoryId']
        }
        if (id) {
            $.post('/ConventionCategory/'+id, data, function(response){
                alert(response.msg)
                window.location.href = '';
            })
        } else {
            delete data['id']
            $.post('/ConventionCategory', data, function(response){
                alert(response.msg)
            })
        }
    })
})