/**
 * Created by wanp on 17-2-6.
 */
$(function(){
    var id = $('#id').val();

    $('#mainForm').on('click', '#mainBtn', function(){
        var $inputs = $('#mainForm').find('input'),
            data = {}
        $.each($inputs, function(k, v){
            data[v.id] = v.value;
        })
        if (!data['parentId']) {
            data['parentId'] = 0
        }
        delete data['id']
        if (id) {
            $.post('/Property/'+id, data, function(response){
                alert(response.msg)
            })
        } else {
            $.post('/Property', data, function(response){
                alert(response.msg)
            })
        }
    })
})