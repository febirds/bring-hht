package gv.hht.model.repair;

import gv.hht.model.BaseModel;

import java.util.Date;

/**
 * Created by wanp on 17-6-3.
 *
 * CREATE TABLE `cghht`.`repair_order` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `user_name` VARCHAR(45) NOT NULL,
 `address` VARCHAR(200) NOT NULL,
 `phone` VARCHAR(45) NOT NULL,
 `description` VARCHAR(500) NOT NULL,
 `status` TINYINT NOT NULL DEFAULT 0,
 `create_time` DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00',
 `update_time` DATETIME NULL DEFAULT '1970-01-01 00:00:00',
 PRIMARY KEY (`id`));
 */
public class RepairOrder implements BaseModel {

    private static final long serialVersionUID = 1L;

    private Integer id;
    private String userName;
    private String address;
    private String phone;
    private String description;
    private Integer status;
    private Date createTime;
    private Date updateTime;

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}
