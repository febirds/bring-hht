package gv.hht.web.ws;

import java.util.Comparator;

/**
 * Created by wanp on 17-7-17.
 */
public class UserPdtOrderChgVoComparator implements Comparator<UserPdtOrderChgVo> {
    @Override
    public int compare(UserPdtOrderChgVo o1, UserPdtOrderChgVo o2) {
        int date1 = Integer.parseInt(o1.getEDate().substring(0, 10).replaceAll("-", ""));
        int date2 = Integer.parseInt(o2.getEDate().substring(0, 10).replaceAll("-", ""));
        return date2 - date1;
    }
}
