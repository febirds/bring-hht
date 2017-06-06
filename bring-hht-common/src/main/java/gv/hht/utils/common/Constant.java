package gv.hht.utils.common;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.UnsupportedEncodingException;
import java.util.Locale;
import java.util.Map;

/**
 * Created by spark on 2015/11/12.
 */
public class Constant {

    private static Log logger = LogFactory.getLog(Constant.class);

    /** 默认国际化的Locale */
    public static ThreadLocal<String> localeThreadLocal = new ThreadLocal<String>() {
        @Override
        protected String initialValue() {
            return Locale.CHINA.toString().toLowerCase();    // 默认Locale是zh_cn
        }
    };
    /** url来源referer */
    public static ThreadLocal<String> refererThreadLocal = new ThreadLocal<>();
    /** sessionId */
    public static ThreadLocal<String> sessionIdThreadLocal = new ThreadLocal<>();
    /** 平台 */
    /*public static ThreadLocal<SystemType> systemTypeThreadLocal = new ThreadLocal<>();*/
    /** login userId */
    public static ThreadLocal<Integer> loginUserIdThreadLocal = new ThreadLocal<Integer>() {
        @Override
        protected Integer initialValue() {
            return -1;
        }
    };

    /*public static String getDecodingString(String str) {

        if (StringUtils.isBlank(str)) {
            return StringUtils.EMPTY;
        }

        try {
            String result = new String(Base64.decodeBase64(str), "UTF-8");
            if (StringUtils.isBlank(result)) {
                return str;
            }
            return result;
        }
        catch (UnsupportedEncodingException e) {
            logger.error(e.getMessage(), e);
        }
        return StringUtils.EMPTY;
    }*/

    /**
     * 根据当前币种获取币种符号（目前只能获取人民币，港币和美金）
     *
     * @return
     */
    public static String getCurrencySign() {
        if (getLocal().equalsIgnoreCase(Locale.CHINA.toString())) {
            return "￥";
        }
        else if (getLocal().equalsIgnoreCase(Locale.US.toString())) {
            return "$";
        }
        else if (getLocal().equalsIgnoreCase("zh_HK")) {
            return "HK$";
        }
        return "￥";
    }

    /**
     * 获取当前local
     *
     * @return
     */
    public static String getLocal() {
        return localeThreadLocal.get();
    }

    /**
     * 获取字节数(一个中文相当于2个字节).
     *
     * @param str
     *
     * @return
     */
    public static int getBytes(String str) {
        if (StringUtils.isEmpty(str)) {
            return 0;
        }
        try {
            return str.getBytes("GBK").length;
        }
        catch (UnsupportedEncodingException e) {
            throw new RuntimeException("转换编码出错.");
        }
    }

    public static void sleep(long millis) {
        try {
            Thread.sleep(millis);
        }
        catch (InterruptedException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    public static boolean isContains(Map<Integer, Integer> selectedPresents, Integer id) {
        Integer get = selectedPresents.get(id);
        if (get != null && get > 0) {
            selectedPresents.put(id, get - 1);
            return true;
        }
        return false;
    }

    public static void exit() {
        System.exit(0);
    }

}
