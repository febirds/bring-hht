package gv.hht.model.common;

/**
 * Created by spark on 2015/12/30.
 */
public class SystemConstantWrapper {
    /**
     * 阿里云帐号的AccessID.
     */
    private String accessId;
    /**
     * 阿里云帐号的AccessKey.
     */
    private String accessKey;
    /**
     * OSS的bucket名称前缀，如xljing-
     */
    private String ossBucketPrefix;
    /**
     * 阿里云的endpoint
     */
    private String ossEndPoint;

    /**
     * 微信第三方平台APP ID
     */
    private String wxOpenId;
    /**
     * 微信第三方平台APP SECRET
     */
    private String wxOpenSecret;
    /**
     * 微信第三方平台公众号消息校验Token
     */
    private String wxVerifyToken;
    /**
     * 微信第三方平台公众号消息加解密Key
     */
    private String wxEncodingKey;



    /**
     * 营销帐户短信公司签名
     */
    private String smsCompanyNamePromotion;
    /**
     * 营销帐户短信api key
     */
    private String smsApiKeyPromotion;

    /**
     * 短信公司签名
     */
    private String smsCompanyName;
    /**
     * 短信api key
     */
    private String smsApiKey;

    /**
     * 运维号码
     */
    private String adminMobile;

    /**
     *
     * @return
     */
    private String shareFeeRate;

    public String getShareFeeRate() {
        return shareFeeRate;
    }

    public void setShareFeeRate(String shareFeeRate) {
        this.shareFeeRate = shareFeeRate;
    }

    public String getSmsCompanyNamePromotion() {
        return smsCompanyNamePromotion;
    }

    public void setSmsCompanyNamePromotion(String smsCompanyNamePromotion) {
        this.smsCompanyNamePromotion = smsCompanyNamePromotion;
    }

    public String getSmsApiKeyPromotion() {
        return smsApiKeyPromotion;
    }

    public void setSmsApiKeyPromotion(String smsApiKeyPromotion) {
        this.smsApiKeyPromotion = smsApiKeyPromotion;
    }

    public String getAccessId() {
        return accessId;
    }

    public void setAccessId(String accessId) {
        this.accessId = accessId;
    }

    public String getAccessKey() {
        return accessKey;
    }

    public void setAccessKey(String accessKey) {
        this.accessKey = accessKey;
    }

    public String getOssBucketPrefix() {
        return ossBucketPrefix;
    }

    public void setOssBucketPrefix(String ossBucketPrefix) {
        this.ossBucketPrefix = ossBucketPrefix;
    }

    public String getSmsCompanyName() {
        return smsCompanyName;
    }

    public void setSmsCompanyName(String smsCompanyName) {
        this.smsCompanyName = smsCompanyName;
    }

    public String getSmsApiKey() {
        return smsApiKey;
    }

    public void setSmsApiKey(String smsApiKey) {
        this.smsApiKey = smsApiKey;
    }

    public String getOssEndPoint() {
        return ossEndPoint;
    }

    public void setOssEndPoint(String ossEndPoint) {
        this.ossEndPoint = ossEndPoint;
    }

    public String getWxOpenId() {
        return wxOpenId;
    }

    public void setWxOpenId(String wxOpenId) {
        this.wxOpenId = wxOpenId;
    }

    public String getWxOpenSecret() {
        return wxOpenSecret;
    }

    public void setWxOpenSecret(String wxOpenSecret) {
        this.wxOpenSecret = wxOpenSecret;
    }

    public String getWxVerifyToken() {
        return wxVerifyToken;
    }

    public void setWxVerifyToken(String wxVerifyToken) {
        this.wxVerifyToken = wxVerifyToken;
    }

    public String getWxEncodingKey() {
        return wxEncodingKey;
    }

    public void setWxEncodingKey(String wxEncodingKey) {
        this.wxEncodingKey = wxEncodingKey;
    }

    public String getAdminMobile() {
        return adminMobile;
    }

    public void setAdminMobile(String adminMobile) {
        this.adminMobile = adminMobile;
    }

    @Override
    public String toString() {
        return "SystemConstantWrapper{" +
                "accessId='" + accessId + '\'' +
                ", accessKey='" + accessKey + '\'' +
                ", ossBucketPrefix='" + ossBucketPrefix + '\'' +
                ", ossEndPoint='" + ossEndPoint + '\'' +
                ", smsCompanyName='" + smsCompanyName + '\'' +
                ", smsApiKey='" + smsApiKey + '\'' +
                '}';
    }
}
