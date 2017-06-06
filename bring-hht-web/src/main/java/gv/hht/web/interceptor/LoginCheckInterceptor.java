package gv.hht.web.interceptor;

import gv.hht.utils.log.LogUtil;
import org.apache.commons.logging.Log;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Runshine
 * @since 2015-9-21
 * @version 1.0.0
 *
 */
public class LoginCheckInterceptor extends HandlerInterceptorAdapter {
    protected Log logger = LogUtil.getLog(this.getClass());

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return true;
    }
}
