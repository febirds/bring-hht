package gv.hht.interior.biz.repair;

import gv.hht.interior.biz.BaseAction;
import gv.hht.interior.service.BaseService;
import gv.hht.interior.service.repair.RepairOrderService;
import gv.hht.model.repair.RepairOrder;
import org.springframework.stereotype.Service;

/**
 * Created by Alienware on 2017/4/25.
 */
@Service
public class RepairOrderAction extends BaseAction<RepairOrder> {

    private RepairOrderService service;

    @Override
    protected BaseService<RepairOrder> getService() {
        return service;
    }
}
