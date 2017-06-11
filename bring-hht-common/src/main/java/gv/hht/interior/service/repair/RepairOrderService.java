package gv.hht.interior.service.repair;

import gv.hht.interior.mapper.BaseMapper;
import gv.hht.interior.mapper.repair.RepairOrderMapper;
import gv.hht.interior.service.BaseService;
import gv.hht.model.repair.RepairOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by wanp on 17-6-3.
 */
@Service
public class RepairOrderService extends BaseService<RepairOrder> {

    @Autowired
    private RepairOrderMapper mapper;

    @Override
    protected BaseMapper<RepairOrder> getMapper() {
        return mapper;
    }
}
