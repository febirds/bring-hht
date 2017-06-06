package gv.hht.helper;

import gv.hht.components.LoginAccount;
import gv.hht.utils.session.SessionConstants;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Runshine
 * @since 2015-6-23
 * @version 1.0.0
 *
 */
public class SessionHelper {
    public static final String SessionAttribute_LoginAccount = "SessionAttribute_LoginAccount";

    public static LoginAccount getLoginAccount(HttpServletRequest request) {
        return getLoginAccount(request.getSession(false));
    }

    public static LoginAccount getLoginAccount(HttpSession session) {
        if (session == null) {
            return null;
        }
        return (LoginAccount) session.getAttribute(SessionConstants.LOGIN_USER);
    }

    public static void putLoginAccount(LoginAccount loginAccount, HttpServletRequest request) {
        putLoginAccount(loginAccount, request.getSession(true));
    }

    public static void putLoginAccount(LoginAccount loginAccount, HttpSession session) {
        session.setAttribute(SessionConstants.LOGIN_USER, loginAccount);
        session.setAttribute(SessionConstants.LOGIN, "true");
    }

    public static void removeLoginAccount(HttpServletRequest request) {
        removeLoginAccount(request.getSession(false));
    }

    public static void removeLoginAccount(HttpSession session) {
        if (session != null) {
            session.removeAttribute(SessionConstants.LOGIN_USER);
        }
    }
}