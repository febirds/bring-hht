package gv.hht.interior.biz;


import gv.hht.interior.biz.components.ActionComponents;
import gv.hht.interior.service.BaseService;
import gv.hht.model.BaseModel;
import gv.hht.utils.datastructures.Tuple;
import gv.hht.utils.db.DBMultipleResult;
import gv.hht.utils.db.DBPage;
import gv.hht.utils.db.DBSingleResult;
import gv.hht.utils.json.ApiCode;
import gv.hht.utils.log.LogUtil;
import org.apache.commons.logging.Log;

import java.util.Collections;
import java.util.List;

/**
 * Created by tec_f on 2016/8/11.
 */
public abstract class BaseAction<Model extends BaseModel> {

    protected Log logger = LogUtil.getLog(this.getClass());

    protected abstract BaseService<Model> getService();



    public DBSingleResult<Boolean> add(Model model) {
        try {
            getService().create(model);
            return new DBSingleResult<>(true, ActionComponents.Success);
        }catch (Exception e) {
            logger.error(ActionComponents.DBError, e);
            return new DBSingleResult<>(false, ActionComponents.DBError);
        }
    }

    public DBSingleResult<Boolean> delete(int id) {
        try {
            if(id == 0 || getService().getById(id) == null){
                return new DBSingleResult<>(false, ApiCode.DATA_NOT_EXISTS);
            }
            getService().delete(id);
            return new DBSingleResult<>(true, ActionComponents.Success);
        } catch (RuntimeException e) {
            return new DBSingleResult<Boolean>(false, e).setResult(Boolean.FALSE).setResultmsg(e.getMessage());
        } catch (Exception e) {
            logger.error(ActionComponents.DBError, e);
            return new DBSingleResult<>(false, ActionComponents.DBError);
        }
    }

    public DBSingleResult<Boolean> update(Model model) {
        try {
            if(model.getId() == 0){
                return new DBSingleResult<>(false, ApiCode.DATA_NOT_EXISTS);
            }
            getService().update(model);
            return new DBSingleResult<>(true,ActionComponents.Success);
        } catch (RuntimeException e) {
            return new DBSingleResult<Boolean>(false, e).setResult(Boolean.FALSE).setResultmsg(e.getMessage());
        } catch (Exception e) {
            logger.error(ActionComponents.DBError, e);
            return new DBSingleResult<>(false, ActionComponents.DBError);
        }
    }


    public Tuple<Integer, DBMultipleResult<Model>> list(Model model, DBPage dBPage) {
        try {
            int count = getService().countAll(model);
            List<Model> listByPage = getService().listByPage(model, dBPage);
            DBMultipleResult<Model> result = new DBMultipleResult<Model>().setResult(listByPage).setResultmsg(ActionComponents.Success);
            return new Tuple<>(count, result);
        } catch (Exception e) {
            logger.error(ActionComponents.DBError, e);
            DBMultipleResult<Model> result = new DBMultipleResult<Model>(false, e).setResult(Collections.emptyList()).setResultmsg(ActionComponents.DBError);
            return new Tuple<>(0, result);
        }
    }

    public DBSingleResult<Model> getBy(Model model) {
        try {
            Model byId = getService().getById(model.getId());
            return new DBSingleResult<Model>().setResult(byId);
        } catch (Exception e) {
            logger.error(ActionComponents.DBError, e);
            return new DBSingleResult<Model>(false, e).setResultmsg(ActionComponents.DBError);
        }
    }
}
