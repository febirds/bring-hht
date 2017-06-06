package gv.hht.utils.pidvid;

import org.apache.commons.lang3.StringUtils;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

/**
 *
 * @author Runshine
 * @since 2015-5-25
 * @version 1.0.0
 *
 */
public class PropertyValueUtil {

    /**
     * 根据属性ID和值ID生成long,高32位为属性ID，低32位为值ID
     *
     * @param propertyId
     * @param valueId
     * @return
     */
    public static long mergePidVidToLong(int propertyId, int valueId) {
        return ((long)propertyId << 32) | (long)valueId;
    }

    /**
     * 将long型的pidvid转换为int的pid和vid对，数组中第0个元素表示propertyId，第1个元素 valueId
     *
     * @param pidvid
     * @return
     */
    public static PV parseLongToPidVid(long pidvid) {
        int[] result = new int[2];
        result[1] = (int)pidvid; // 得到低32位
        result[0] = (int)(pidvid >> 32); // 得到高32位
        return new PV(result[0], result[1]);
    }

    /**
     * 将一组PV排序后转换成sku可用的pv,pv,pv字符串的形式
     *
     * @param pvs
     * @return
     */
    public static String pvListToPvString(List<PV> pvs) {
        Collections.sort(pvs);
        StringBuilder pvString = new StringBuilder(pvs.size() * 20);
        for (PV pv : pvs) {
            pvString.append(mergePidVidToLong(pv.pid, pv.vid)).append(',');
        }
        if (pvString.length() > 0 && pvString.codePointAt(pvString.length() - 1) == ',') {
            return pvString.substring(0, pvString.length() - 1);
        }
        return pvString.toString();
    }

    /**
     * 将sku的pv字符串形式转换为一组排序了的List
     *
     * @param pvString
     * @return
     */
    public static List<PV> pvStringToPvList(String pvString) {
        if (StringUtils.isBlank(pvString)) {
            return Collections.emptyList();
        }

        String[] split = pvString.split(",");

        List<PV> pvs = new LinkedList<>();

        for (String s : split) {
            PV pv = parseLongToPidVid(Long.parseLong(s));
            pvs.add(pv);
        }

        Collections.sort(pvs);
        return pvs;
    }

    public static class PV implements Comparable<PV> {

        public PV(int pid, int vid) {
            this.pid = pid;
            this.vid = vid;
        }

        public final int pid;

        public final int vid;

        @Override
        public int compareTo(PV o) {
            int compare = Integer.compare(this.pid, o.pid);
            if (compare == 0) {
                return Integer.compare(this.vid, o.vid);
            } else {
                return compare;
            }
        }

        @Override
        public boolean equals(Object obj) {
            if (obj == null) {
                return false;
            }
            if (getClass() != obj.getClass()) {
                return false;
            }
            final PV other = (PV)obj;
            if (this.pid != other.pid) {
                return false;
            }
            if (this.vid != other.vid) {
                return false;
            }
            return true;
        }

        @Override
        public String toString() {
            return "" + pid + ':' + vid;
        }
    }
}
