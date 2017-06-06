package gv.hht.utils.common;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.security.MessageDigest;

/**
 * Created by spark on 2015/11/12.
 */
public class EncryptUtil {
    private static final Log LOGGER = LogFactory.getLog(EncryptUtil.class);

    public static String md5(String str) {
        return EncryptUtil.getMD5(str).toLowerCase();
    }

    public static String md5(String str, String encode) {
        return EncryptUtil.getMD5(str, encode).toLowerCase();
    }

    public static String des(String str) {
        return EncryptUtil.getDES(str).toLowerCase();
    }

    public static String sha1(String str) {
        return EncryptUtil.getSHA1(str);
    }

    public static String getMD5(String str) {
        return encode(str, "MD5");
    }

    public static String getMD5(String str, String encode) {
        return encode(str, "MD5", encode);
    }

    public static String getDES(String str) {
        return encode(str, "DES");
    }

    public static String getSHA1(String str) {
        return encode(str, "SHA-1");
    }

    private static String encode(String str, String type) {
        try {
            MessageDigest alga = MessageDigest.getInstance(type);
            alga.update(str.getBytes());
            byte digesta[] = alga.digest();
            String hex = byte2hex(digesta);
            return hex;
        }
        catch (Exception e) {
            LOGGER.info(e.getMessage(), e);
        }
        return "";
    }

    private static String encode(String str, String type, String encode) {
        try {
            MessageDigest alga = MessageDigest.getInstance(type);
            alga.update(str.getBytes(encode));
            byte digesta[] = alga.digest();
            String hex = byte2hex(digesta);
            return hex;
        }
        catch (Exception e) {
            LOGGER.info(e.getMessage(), e);
        }
        return "";
    }

    public static String uuid(String strs[]) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-1");
            for (int i = 0; i < strs.length; i++) {
                if (strs[i] != null) {
                    md.update(strs[i].getBytes());
                }
            }

            byte bs[] = md.digest();
            return byte2hex(bs);
        }
        catch (Exception e) {
            LOGGER.info(e.getMessage(), e);
        }
        return null;
    }

    private static String byte2hex(byte b[]) {
        StringBuilder sb = new StringBuilder();
        for (int n = 0; n < b.length; n++) {
            String stmp = Integer.toHexString(b[n] & 0xff);
            if (stmp.length() == 1) {
                // hs = hs + "0" + stmp;
                sb.append("0");
            }
            sb.append(stmp);
            // else {
            // // hs = hs + stmp;
            // }
        }

        return sb.toString().toUpperCase();
    }
}
