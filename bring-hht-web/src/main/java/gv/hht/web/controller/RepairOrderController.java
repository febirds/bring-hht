package gv.hht.web.controller;

import gv.hht.interior.service.repair.RepairOrderService;
import gv.hht.model.repair.RepairOrder;
import gv.hht.utils.json.JsonResult;
import gv.hht.utils.spring.RequestJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class RepairOrderController extends BaseController {
    @Autowired
    private RepairOrderService service;

    @RequestMapping("/repair")
    public String index() {
        return "repair/add";
    }

    @RequestMapping(value = "/RepairOrder", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult create(RepairOrder repairOrder) {
        service.create(repairOrder);
        return success();
    }

}
