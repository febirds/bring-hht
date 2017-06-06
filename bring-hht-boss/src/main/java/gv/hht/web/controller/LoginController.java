package gv.hht.web.controller;

import gv.hht.components.LoginAccount;
import gv.hht.helper.SessionHelper;
import gv.hht.interior.biz.account.AccountAction;
import gv.hht.model.account.Account;
import gv.hht.model.user.User;
import gv.hht.utils.datastructures.Tuple;
import gv.hht.utils.db.DBMultipleResult;
import gv.hht.utils.db.DBPage;
import gv.hht.utils.db.DBSingleResult;
import gv.hht.utils.json.JsonResult;
import gv.hht.utils.spring.RequestJson;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 *
 * @author Runshine
 * @since 2015-6-23
 * @version 1.0.0
 *
 */
@Controller
@RequestMapping(value = "/Auth")
public class LoginController extends BaseController {
    @Autowired
    private AccountAction accountAction;

    @RequestMapping(value = "/login")
    @ResponseBody
    public JsonResult login(@RequestJson Account account, HttpServletRequest httpServletRequest) {
        String userName = account.getUserName();
        if (StringUtils.isBlank(userName)) {
            return baseResult(false, "用户名不能为空");
        }

        String password = account.getPassword();
        if (StringUtils.isBlank(password)) {
            return baseResult(false, "密码不能为空");
        }

        DBSingleResult<Account> byName = accountAction.getByName(account);
        if (!byName.isDBSuccess()) {
            return baseResult(false, byName);
        }

        if (!byName.isResultNotEmpty()) {
            return baseResult(false, "用户名或密码错误");
        }

        Account realAccount = byName.getResult();
        String realPassword = realAccount.getPassword();
        String salt = realAccount.getSalt();

        String saltPwd = accountAction.saltPwd(password, salt);

        if (!realPassword.equals(saltPwd)) {
            return baseResult(false, "用户名或密码错误");
        }

        LoginAccount loginAccount = new LoginAccount();
        loginAccount.setAccount(realAccount);
        SessionHelper.putLoginAccount(loginAccount, httpServletRequest);

        return baseResult(true, "登陆成功");
    }

    @RequestMapping(value = "/updatePassword")
    @ResponseBody
    public JsonResult update(@RequestJson Account account, HttpServletRequest request) {
        try {
            // 修改密码
            LoginAccount loginAccount = SessionHelper.getLoginAccount(request);
            if (StringUtils.isNotBlank(account.getPassword()) && loginAccount != null) {
                String operateAccountPassword = StringUtils.trimToEmpty(account.getOldPassword());
                accountAction.updatePassword(loginAccount.getAccount().getId(), loginAccount.getAccount(), operateAccountPassword, account.getPassword());
            }
        } catch (RuntimeException e) {
            return fail(e.getMessage());
        } catch (Exception e) {
            logger.error("update account occur error：", e);
            return fail("更改密码错误");
        }
        return success("更改密码成功");
    }

    @RequestMapping(value = "/isLogin")
    public void isLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
        LoginAccount loginUser = SessionHelper.getLoginAccount(request);
        if(loginUser == null) {
            JsonResult.fail("尚未登陆").autoConvertJSONP(request, response);
        } else {
            JsonResult.success().addResult("loginUser", loginUser).autoConvertJSONP(request, response);
        }
    }

    @RequestMapping(value = "/logout")
    @ResponseBody
    public JsonResult logout(HttpServletRequest httpServletRequest) {
        try {
            SessionHelper.removeLoginAccount(httpServletRequest);
            return baseResult(true, "退出成功");
        } catch (Exception e) {
            return baseResult(false, "退出失败");
        }
    }
}
