package gv.hht.web.interceptor;

import gv.hht.helper.SessionHelper;
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

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (SessionHelper.getLoginAccount(request) != null) {
            return true;
        } else {
            response.sendRedirect("/login");
            return false;
        }
    }
}
