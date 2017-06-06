package gv.hht.model.account;

import gv.hht.model.BaseModel;

/**
 *
 * @author Runshine
 * @since 2015-6-18
 * @version 1.0.0
 *
 * CREATE TABLE `account` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`user_name` varchar(45) NOT NULL,
`password` varchar(255) NOT NULL,
`salt` varchar(255) NOT NULL,
`failed_num` int(11) DEFAULT NULL,
`forbidden` tinyint(4) NOT NULL,
`status` tinyint(4) NOT NULL DEFAULT '0',
`create_time` datetime NOT NULL,
`update_time` datetime NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `cghht`.`account` (`id`, `user_name`, `password`, `salt`, `failed_num`, `forbidden`, `status`, `create_time`, `update_time`) VALUES ('1', 'admin', '303a443a6c95c323f824a7552b7364c2', '388bf610-594f-40a0-87a7-282a07ad4be9', '0', '0', '0', '1970-01-01 00:00:00', '1970-01-01 00:00:00');

 *
 */
public class Account implements BaseModel {
    private static final long serialVersionUID = 1L;

    private Integer id;
    private String userName;
    private String password;
    private String salt;
    private Integer failedNum;
    private Integer forbidden;
    private Integer status;
    private String oldPassword;

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public Integer getFailedNum() {
        return failedNum;
    }

    public void setFailedNum(Integer failedNum) {
        this.failedNum = failedNum;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getForbidden() {
        return forbidden;
    }

    public void setForbidden(Integer forbidden) {
        this.forbidden = forbidden;
    }

}
