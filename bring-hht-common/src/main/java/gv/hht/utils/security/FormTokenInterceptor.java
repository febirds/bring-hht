package gv.hht.utils.security;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.UUID;

/**
 *
 * @author Runshine
 * @since 2014-11-20
 * @version 1.0.0
 *
 */
public class FormTokenInterceptor extends HandlerInterceptorAdapter {
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HttpSession session = request.getSession();
        String uuid = UUID.randomUUID().toString();
        session.setAttribute("formToken", uuid);
        modelAndView.addObject("__form_token__", uuid);
    }
}
