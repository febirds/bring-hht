package gv.hht.web.controller;

import gv.hht.utils.json.JsonResult;
import gv.hht.web.ws.CalculatorDelegate;
import gv.hht.web.ws.CalculatorServiceLocator;
import gv.hht.web.ws.UserCardCtmCardRltVo;
import gv.hht.web.ws.UserPdtOrderChgVo;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

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
            if (vos.length>0 && vos[0] != null && vos[0].getCtmCard() != null) {
                uvos = service.getUserPdtOrderChgAll(vos[0].getCtmCard(), cardNo);
            }
            map.put("success", true);
            map.put("result", uvos);
        } catch (javax.xml.rpc.ServiceException ex) {
            ex.printStackTrace();
        } catch (java.rmi.RemoteException ex) {
            ex.printStackTrace();
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
