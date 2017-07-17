/**
 * Created by wanp on 17-6-28.
 */
$(function () {
    $('#submit').on('click', function () {
        var check = true, data = {};
        mui("#queryForm input").each(function() {
            if (this.name == 'userName') {
                check = true
            } else if(!this.value || this.value.trim() == "") {
                var text = $(this).attr('placeholder');
                mui.alert(text + "不允许为空");
                check = false;
                return false
            }
            data[this.name] = this.value;
        });
        if (check) {
            window.location.href = '/query/product?cardNo='+data.cardNo;
        }
    })
    $('#cancel').on('click', function () {
        mui("#queryForm input").each(function() {
            this.value = '';
        })
    })
});