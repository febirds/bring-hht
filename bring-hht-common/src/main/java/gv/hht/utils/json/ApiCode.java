package gv.hht.utils.json;

/**
 * @author Closure.Yang
 * @since 2014-07-23
 * <p/>
 * Api状态码
 * <p/>
 * 1xxx	通用状态码
 * 2xxx	类目&商品&搜索状态码
 * 3xxx	预留功能状态码
 * 4xxx	订单相关状态码
 * 5xxx	购物车&收藏夹状态码
 * 6xxx	预留功能状态码
 * 7xxx	优惠FAQ等相关状态码
 * 8xxx	账户相关状态码
 * 9xxx 商品咨询状态码
 * 11xxx 退款退货
 */
public enum ApiCode {
    NONE_CODE(0) {
                public String getMessage() {
                    return "";
                }
            },

    // 1XXX 通用状态码
    OK(1200) {
                public String getMessage() {
                    return "成功";
                }
            },
    REDIRECT(1302) {
                public String getMessage() {
                    return "重定向";
                }
            },

    ////////////////////////////华丽的分割线/////////////////////////////

    // 5xxx	购物车&收藏夹状态码
    FAVORIT_DEL_RPODUCT(5000) {
                public String getMessage() {
                    return "该商品已被删除！";
                }
            },
    FAVORIT_RPODUCT(5001) {
                public String getMessage() {
                    return "该商品已经被收藏！";
                }
            },
    EXCEED_UN_COLLECT(5005) {
                public String getMessage() {
                    return "取消收藏失败!";
                }
            },
    ////////////////////////////华丽的分割线/////////////////////////////
    USERNAME_OR_PASSWORD_ERROR(8000) {
                public String getMessage() {
                    return "用户名或密码错误!";
                }
            },
    ERROR_WHEN_LOGIN(8001) {
                public String getMessage() {
                    return "登录过程中发生错误!";
                }
            },
    NOT_LOGIN_YET(8002) {
                public String getMessage() {
                    return "尚未登录!";
                }
            },
    USERNAME_IS_EMPTY(8003) {
                public String getMessage() {
                    return "用户名为空!";
                }
            },
    PASSWORD_IS_EMPTY(8004) {
                public String getMessage() {
                    return "密码为空!";
                }
            },
    TOKEN_IS_EMPTY(8005) {
                public String getMessage() {
                    return "用户凭证不完整!";
                }
            },
    TOKEN_IS_INVALID(8006) {
                public String getMessage() {
                    return "非法的用户凭证!";
                }
            },
    VERIFYCODE_IS_NULL(8007) {
                public String getMessage() {
                    return "验证码为空!";
                }
            },
    USERNAME_LENGTH_INVALID(8008) {
                public String getMessage() {
                    return "用户名只能由4-20个字符组成!";
                }
            },
    EMAIL_LENGTH_INVALID(8009) {
                public String getMessage() {
                    return "邮箱长度只能由5-50个字符!";
                }
            },
    USER_ALREADY_EXISTS(8010) {
                public String getMessage() {
                    return "该用户已存在!";
                }
            },
    REGISTER_SUCCESSFULLY(8011) {
                public String getMessage() {
                    return "注册成功!";
                }
            },
    Email_IS_EMPTY(8012) {
                public String getMessage() {
                    return "邮箱为空!";
                }
            },
    Email_IS_INVALID(8013) {
                public String getMessage() {
                    return "邮箱格式错误!";
                }
            },
    Email_ALREADY_USED(8014) {
                public String getMessage() {
                    return "邮箱已被占用!";
                }
            },
    Email_IS_VALID(8015) {
                public String getMessage() {
                    return "邮箱检查通过!";
                }
            },
    USERNAME_IS_VALID(8016) {
                public String getMessage() {
                    return "用户名检查通过!";
                }
            },
    PASSWORD_LENGTH_INVALID(8017) {
                public String getMessage() {
                    return "密码长度应为6-16位!";
                }
            },
    PASSWORD_STYLE_VALID(8018) {
                public String getMessage() {
                    return "密码格式检查通过!";
                }
            },
    PHONE_NUMBER_INVALID(8019) {
                public String getMessage() {
                    return "手机号码无效!";
                }
            },
    PHONE_ALREADY_USED(8020) {
                public String getMessage() {
                    return "手机号码已被使用!";
                }
            },
    PHONE_IS_VALID(8021) {
                public String getMessage() {
                    return "手机号码检查通过!";
                }
            },
    REGISTER_WITH_ERROR(8022) {
                public String getMessage() {
                    return "注册过程中出现错误!";
                }
            },
    EMAIL_ALREADY_USED(8023) {
                public String getMessage() {
                    return "邮箱已被使用!";
                }
            },
    USERNAME_ALREADY_USED(8024) {
                public String getMessage() {
                    return "用户名已被使用!";
                }
            },
    MYINFO_QUERY_FAILED(8025) {
                public String getMessage() {
                    return "个人信息查询失败!";
                }
            },

    OLD_PASSWORD_ERROR(8032) {
                public String getMessage() {
                    return "原密码错误!";
                }
            },
    MODIFY_PASSWORD_WITH_ERROR(8033) {
                public String getMessage() {
                    return "修改密码过程中出现错误!";
                }
            },
    USER_NOT_EXISTS(8038) {
        public String getMessage() {
            return "账号名不存在!";
        }
    },
    USER_REAL_NAME_NOT_EXISTS(8039){
        @Override
        public String getMessage() {
            return "真实姓名不存在";
        }
    },

    ////////////////////////////华丽的分割线/////////////////////////////
    PARAM_CAN_NOT_EMPTY(9000){
        @Override
        public String getMessage() {
            return "某些数据不能为空";
        }
    },
    DATA_EXISTS(9001){
        @Override
        public String getMessage() {
            return "数据存在";
        }
    },
    DATA_NOT_EXISTS(9002){
        @Override
        public String getMessage() {
            return "未找到数据";
        }
    },
    LANGUAGE_TYPE_NOT_EXISTS(9003){
        @Override
        public String getMessage() {
            return "语言类型不存在";
        }
    },
    CATEGORY_NOT_EXISTS(9004){
        @Override
        public String getMessage() {
            return "类别不存在";
        }
    },
    PROPERTY_NOT_EXISTS(9005){
        @Override
        public String getMessage() {
            return "属性不存在";
        }
    },
    PROPERTY_VALUE_NOT_EXISTS(9006){
        @Override
        public String getMessage() {
            return "属性值不存在";
        }
    },
    COMPANY_NOT_EXISTS(9007){
        @Override
        public String getMessage() {
            return "企业不存在";
        }
    },
    PRODUCT_NOT_EXISTS(9008){
        @Override
        public String getMessage() {
            return "商品不存在";
        }
    },
    PICTURE_CAN_NOT_EMPTY(9009){
        @Override
        public String getMessage() {
            return "图片不能为空";
        }
    },
    PRODUCT_CAN_NOT_HANG_PARENT_CATEGORY(9010){
        @Override
        public String getMessage() {
            return "父分类不能挂在商品";
        }
    },
    PRODUCT_HAD_HANG_CATEGORY(9011){
        @Override
        public String getMessage() {
            return "商品已挂在分类";
        }
    },
    PWD_NOT_SAM(9012){
        @Override
        public String getMessage() {
            return "密码不一致";
        }
    },
    ARTICLE_NOT_EXISTS(9013){
        @Override
        public String getMessage() {
            return "文章不存在";
        }
    },
    ARTICLE_TITLE_CAN_NOT_EMPTY(9013){
        @Override
        public String getMessage() {
            return "文章标题不能为空";
        }
    },
    ARTICLE_CONTENT_CAN_NOT_EMPTY(9014){
        @Override
        public String getMessage() {
            return "文章内容不能为空";
        }
    },
    ARTICLE_SOURCE_CAN_NOT_EMPTY(9015){
        @Override
        public String getMessage() {
            return "文章来源不能为空";
        }
    },
    ARTICLE_COUNTRY_CAN_NOT_EMPTY(9016){
        @Override
        public String getMessage() {
            return "文章国家不存在";
        }
    },
    COUNTRY_CAN_NOT_EMPTY(9017){
        @Override
        public String getMessage() {
            return "国家不存在";
        }
    },
    PICTURE_NOT_EXISTS(9017){
        @Override
        public String getMessage() {
            return "图片不存在";
        }
    },
    ;


    ////////////////////////////华丽的分割线/////////////////////////////
    private final int value;

    private ApiCode(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public abstract String getMessage();
}
