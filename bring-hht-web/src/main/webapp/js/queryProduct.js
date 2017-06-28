/**
 * Created by wanp on 17-6-28.
 */
$(function () {
    $('#submit').on('click', function () {
        var check = true, data = {};
        mui("#queryForm input").each(function() {
            if(!this.value || this.value.trim() == "") {
                var text = $(this).attr('placeholder');
                mui.alert(text + "不允许为空");
                check = false;
                return false;
            }
            data[this.name] = this.value;
        });
        if(check){
            $.post('/RepairOrder', data, function (response) {
                if (response.success) {
                    $('#repairForm')[0].reset();
                    mui.alert('故障报修成功！稍后（24小时内）安排师傅上门处理，谢谢！');
                }
            })
        }
    })
});