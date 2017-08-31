package gv.hht.web.controller;

import gv.hht.utils.json.JsonResult;
import gv.hht.web.ws.*;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by wanp on 17-6-16.
 */
@Controller
public class ProductController {

    @RequestMapping("/query")
    public String query() {
        return "queryProduct/add";
    }

    @RequestMapping(value = "/query/product")
    public ModelAndView queryProductEndTime(@RequestParam String cardNo) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            if (StringUtils.isEmpty(cardNo)) {
                map.put("success", false);
                map.put("msg", "请输入卡号进行查询");
            }
            CalculatorServiceLocator locator = new CalculatorServiceLocator();
            CalculatorDelegate service = locator.getCalculatorPort();
            UserCardCtmCardRltVo[] vos = service.getUserCardCtmCardAll(cardNo);
            UserPdtOrderChgVo[] uvos = new UserPdtOrderChgVo[]{};
            CustomerVo[] cvos = null;
            if (vos != null && vos.length>0 && vos[0] != null && vos[0].getCtmCard() != null) {
                uvos = service.getUserPdtOrderChgAll(vos[0].getCtmCard(), cardNo);
                cvos = service.getCustomerAll(vos[0].getCtmCard(), cardNo);
                Arrays.sort(uvos, new UserPdtOrderChgVoComparator());
            }
            List<String> cardNos = new ArrayList<String>();
            List<UserPdtOrderChgVo> list = new ArrayList<UserPdtOrderChgVo>();
            DateFormat format = SimpleDateFormat.getDateInstance();
            Date now = new Date();
            for (UserPdtOrderChgVo vo: uvos) {
                if (!StringUtils.isEmpty(vo.getReturnDate())) {
                    Date returnDate = format.parse(vo.getReturnDate());
                    if (returnDate.compareTo(now) < 0) {
                        continue;
                    }
                }
                if (!cardNos.contains(vo.getCardno())) {
                    vo.setUserName(cvos != null?cvos[0].getCustomerName():vo.getUserName());
                    list.add(vo);
                    cardNos.add(vo.getCardno());
                }
            }
            map.put("success", true);
            map.put("result", list);
        } catch (javax.xml.rpc.ServiceException ex) {
            ex.printStackTrace();
        } catch (java.rmi.RemoteException ex) {
            ex.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return new ModelAndView("queryProduct/list", map);
    }

    public static void main(String[] argv) {
        try {
            CalculatorServiceLocator locator = new CalculatorServiceLocator();
            CalculatorDelegate service = locator.getCalculatorPort();
            UserCardCtmCardRltVo[] vos = service.getUserCardCtmCardAll("8471502365004215");
            if (vos.length>0 && vos[0] != null && vos[0].getCtmCard() != null) {
                    UserPdtOrderChgVo[] uvos = service.getUserPdtOrderChgAll(vos[0].getCtmCard(), "8471502365004215");
                System.out.println("========"+uvos[0].getEDate() + "    "+uvos[0].getUserName());
            } else {

            }
        } catch (javax.xml.rpc.ServiceException ex) {
            ex.printStackTrace();
        } catch (java.rmi.RemoteException ex) {
            ex.printStackTrace();
        }
    }

}
