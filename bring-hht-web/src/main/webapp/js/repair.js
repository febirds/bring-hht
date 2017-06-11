$(function () {
    $('#submit').on('click', function () {
        var check = true, data = {};
        mui("#repairForm input").each(function() {
            if(!this.value || this.value.trim() == "") {
                var text = $(this).attr('placeholder');
                mui.alert(text + "不允许为空");
                check = false;
                return false;
            }
            data[this.name] = this.value;
        });
        if (!/^1\d{10}$/.test($('input[name=phone]').val()) && !/^0\d{2,3}-?\d{7,8}$/.test($('input[name=phone]').val()))
            mui.alert('联系电话不合法');
        if(check){
            data['description'] = $('textarea[name=description]').val();
            $.post('/RepairOrder', data, function (response) {
                if (response.success) {
                    $('#repairForm')[0].reset();
                    mui.alert('故障报修成功！稍后（24小时内）安排师傅上门处理，谢谢！');
                }
            })
        }
    })
})