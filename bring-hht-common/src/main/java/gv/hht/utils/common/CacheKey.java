package gv.hht.utils.common;

/**
 * Created by spark on 2015/12/2.
 */
public class CacheKey {
    private static final String PREFIX_ALL = "all_";

    public static String getIPForbiddenCacheKey(String IP) {
        return PREFIX_ALL + "getMobileForbiddenCacheKey&IP=" + IP;
    }

    public static String getMobileSendCaptchaFrequencyKey(String mobile) {
        return PREFIX_ALL + "getMobileSendCaptchaFrequencyKey&mobile=" + mobile;
    }

    public static String getWcRegisterCheckCodeKey(String mobile) {
        return PREFIX_ALL + "getAuthCode&mobile=" + mobile;
    }

    public static String keyOfMobileCaptcha(String mobile, String smsType) {
        return PREFIX_ALL + "mobileCaptcha#mobile=" + mobile + "#smsType=" + smsType;
    }

    public static String keyOfMobileGetCaptchaFrequency(String mobile, String smsType) {
        return PREFIX_ALL + "mobileGetCaptchaFrequency#mobile=" + mobile + "#smsType=" + smsType;
    }

    public static String keyOfMobileCaptchaTryTimes(String mobile, String smsType) {
        return PREFIX_ALL + "mobileCaptchaTryTimes#mobile=" + mobile + "#smsType=" + smsType;
    }

    public static String getGiftCardErrorCount(int userId) {
        return PREFIX_ALL + "getGiftCardErrorCount#userId="  + userId;
    }
}
