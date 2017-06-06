package gv.hht.web.controller;

import gv.hht.interior.biz.BaseAction;
import gv.hht.model.BaseModel;
import gv.hht.utils.datastructures.Tuple;
import gv.hht.utils.db.DBMultipleResult;
import gv.hht.utils.db.DBPage;
import gv.hht.utils.db.DBSingleResult;
import gv.hht.utils.json.JsonResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by Alienware on 2017/1/18.
 */
public abstract class BaseActionController<Model extends BaseModel> extends BaseController{
    protected abstract BaseAction<Model> getAction();

    @RequestMapping(method = RequestMethod.POST)
    JsonResult create(Model model) {
        DBSingleResult<Boolean> result = getAction().add(model);
        return baseResult(result.isDBSuccess(),result.getResultmsg()).addResult("id", model.getId());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    JsonResult delete(@PathVariable("id") int id) {
        DBSingleResult<Boolean> result = getAction().delete(id);
        return baseResult(result.isDBSuccess(),result.getResultmsg());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    JsonResult update(@PathVariable("id") int id, Model model) {
        model.setId(id);
        DBSingleResult<Boolean> result = getAction().update(model);
        return baseResult(result.isDBSuccess(),result.getResultmsg());
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    JsonResult get(Model model) {
        DBSingleResult<Model> result = getAction().getBy(model);
        return baseResult(result.isDBSuccess(),result.getResultmsg()).addResult("data", result.getResult());
    }

    @RequestMapping(method = RequestMethod.GET)
    JsonResult list(
            Model model,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "pageSize", required = false, defaultValue = "20") int pageSize) {
        Tuple<Integer, DBMultipleResult<Model>> list = getAction().list(model, DBPage.page(page, pageSize));
        return baseResult(list.right().isDBSuccess(), list.right().getResultmsg())
                .addResult("totalCount", list.left())
                .addResult("data", list.right().getResult());
    }
}
