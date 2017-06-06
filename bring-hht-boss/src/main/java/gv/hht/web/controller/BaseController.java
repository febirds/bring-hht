package gv.hht.web.controller;

import gv.hht.interior.biz.components.ActionComponents;
import gv.hht.interior.service.ServiceProvider;
import gv.hht.utils.db.DBMultipleResult;
import gv.hht.utils.db.DBSingleResult;
import gv.hht.utils.json.JsonResult;
import gv.hht.utils.log.LogUtil;
import gv.hht.utils.session.LoginUser;
import gv.hht.utils.session.SessionHelper;
import gv.hht.utils.uri.URLBrokerFactory;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Runshine
 * @since 2015-6-4
 * @version 1.0.0
 *
 */
public abstract class BaseController {
    protected Log logger = LogUtil.getLog(this.getClass());

    @Autowired
    protected URLBrokerFactory urlBrokerFactory;
    @Autowired
    protected ServiceProvider serviceProvider;



    public LoginUser getLoginUser(HttpServletRequest request) {
        return SessionHelper.getLoginUser(request);
    }

    public JsonResult baseResult(boolean success, String res) {
        return new JsonResult(success, res);
    }

    public JsonResult baseResult(boolean success, DBSingleResult<?> res) {
        if (!res.isDBSuccess()) {
            String s = res.getResultmsg() == null ? ActionComponents.DBError : res.getResultmsg();
            return new JsonResult(false, s);
        }
        return new JsonResult(success, res.getResultmsg());
    }

    public JsonResult baseResult(boolean success, DBMultipleResult<?> res) {
        if (!res.isDBSuccess()) {
            String s = res.getResultmsg() == null ? ActionComponents.DBError : res.getResultmsg();
            return new JsonResult(false, s);
        }
        return new JsonResult(success, res.getResultmsg());
    }

    public JsonResult baseResult(DBSingleResult<?> res) {
        return baseResult(true, res);
    }

    public JsonResult baseResult(DBMultipleResult<?> res) {
        return baseResult(true, res);
    }

    public final JsonResult success() {
        return success("");
    }

    public final JsonResult success(String res) {
        return baseResult(true, res);
    }

    public final JsonResult fail(String res) {
        return baseResult(false, res);
    }


    public final JsonResult success(HttpServletRequest request) {
        return wrapCallback(baseResult(true, ""), request);
    }

    public final JsonResult success(String msg, HttpServletRequest request) {
        return wrapCallback(baseResult(true, msg), request);
    }

    public final JsonResult fail(HttpServletRequest request) {
        return wrapCallback(baseResult(false, ""), request);
    }

    public final JsonResult fail(String msg, HttpServletRequest request) {
        return wrapCallback(baseResult(false, msg), request);
    }

    public final JsonResult wrapCallback(JsonResult result, HttpServletRequest request) {
        String callback = request.getParameter("callback");
        if (StringUtils.isNotBlank(callback)) {
            result.setJsonp(true);
            result.setCallback(callback);
        }
        return result;
    }
}
