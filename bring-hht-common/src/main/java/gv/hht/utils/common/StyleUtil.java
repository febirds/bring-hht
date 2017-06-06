package gv.hht.utils.common;

import gv.hht.utils.checker.FormatChecker;
import org.apache.commons.lang3.StringUtils;

/**
 * @author Closure.Yang
 * @since 2015/11/30
 */
public class StyleUtil {

    public final static String DEFAULT_REPLACE = "***";

    public static String getStyleString(String val, String replace, String defaultString) {
        try {
            if(StringUtils.isBlank(val)) {
                return defaultString;
            }
            if(FormatChecker.checkMobile(val)) {
                int len = StringUtils.length(val);
                int start = len / 2 - 1;
                int end = (start + 3) > len ? (len - 1) : start + 3;
                val = StringUtils.replace(val, StringUtils.substring(val, start, end), replace);
            } else if (FormatChecker.checkEmail(val)) {
                String[] token = val.split("@");
                String prefix = token[0];
                int len = StringUtils.length(prefix);
                int start = len / 2 - 1;
                int end = (start + 3) > len ? (len - 1) : start + 3;
                val = StringUtils.replace(prefix, StringUtils.substring(prefix, start, end), replace) + "@" + token[1];
            } else {
                if(StringUtils.length(val) > 15) {
                    String after = StringUtils.substring(val, 0, 14);
                    int len = StringUtils.length(val);
                    int start = len / 2 - 1;
                    int end = (start + 3) > len ? (len - 1) : start + 3;
                    val = StringUtils.replace(after, StringUtils.substring(after, start, end), replace);
                }
            }
        } catch (Exception e) {
        }
        return val;
    }
}
