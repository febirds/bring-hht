package gv.hht.web.controller;

import gv.hht.interior.service.repair.RepairOrderService;
import gv.hht.model.repair.RepairOrder;
import gv.hht.utils.db.DBPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wanp on 17-1-19.
 */
@Controller
public class PageRouteController extends BaseController {

    @Autowired
    private RepairOrderService repairOrderService;

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @RequestMapping("/repair")
    public ModelAndView repair(@RequestParam(defaultValue = "") String userName, @RequestParam(value = "page", defaultValue = "1") int page,
                         @RequestParam(value = "pageSize", defaultValue = "20") int pageSize) {
        RepairOrder repairOrder = new RepairOrder();
        if (!StringUtils.isEmpty(userName))
            repairOrder.setUserName(userName);
        List<RepairOrder> list = repairOrderService.listByPage(repairOrder, DBPage.page(page, pageSize));
        int total = repairOrderService.countAll(repairOrder);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("result", list);
        map.put("totalCount", total);
        map.put("pageNo", page);
        return new ModelAndView("repair/list", map);
    }

}
