package gv.hht.helper;

import java.util.regex.Pattern;

/**
 *
 * @author Runshine
 * @since 2015-6-23
 * @version 1.0.0
 *
 */
public class UrlPatternHelper {
    public static Pattern urlPattern(String url) {

        StringBuilder builder = new StringBuilder(url);

        for (int i = 0; i < builder.length();) {
            if (builder.charAt(i) == '.') {
                builder.replace(i, i + 1, "\\.");
                i += 2;
                continue;
            }
            if (builder.charAt(i) == '*') {
                builder.replace(i, i + 1, ".*?");
                i += 3;
                continue;
            }
            if (builder.charAt(i) == '?') {
                builder.replace(i, i + 1, ".");
            }
            i++;
        }

        builder.insert(0, "^").append("$");
        return Pattern.compile(builder.toString());
    }
}
