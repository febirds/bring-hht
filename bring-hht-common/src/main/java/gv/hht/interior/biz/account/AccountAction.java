package gv.hht.interior.biz.account;

import gv.hht.interior.biz.components.ActionComponents;
import gv.hht.interior.service.ServiceProvider;
import gv.hht.model.account.Account;
import gv.hht.utils.checker.ParamCheck;
import gv.hht.utils.datastructures.Tuple;
import gv.hht.utils.db.DBMultipleResult;
import gv.hht.utils.db.DBPage;
import gv.hht.utils.db.DBSingleResult;
import gv.hht.utils.log.LogUtil;
import gv.hht.utils.security.MD5;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.commons.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

/**
 *
 * @author Runshine
 * @since 2015-6-22
 * @version 1.0.0
 *
 */
@Service
public class AccountAction {
    private static final Log logger = LogUtil.getLog(AccountAction.class);

    @Autowired
    private ServiceProvider serviceProvider;

    private String createSalt() {
        return UUID.randomUUID().toString();
    }

    private void paddingPwd(Account account) {
        String password = account.getPassword();
        String salt = createSalt();
        account.setSalt(salt);
        String hashString = saltPwd(password, salt);
        account.setPassword(hashString);
    }

    public String saltPwd(String password, String salt) {
        return MD5.getHashString(password + salt, "UTF8");
    }


    public void updatePassword(int targetAccountId, Account operateAccount, String operateAccountPassword, String newPassword) {
        boolean sameAccount = targetAccountId == operateAccount.getId().intValue();
        boolean isAdmin = false;

        // 只有级管理员或本人能修改账号密码
        boolean checkUpdatePasswordPermission = isAdmin || sameAccount;
        ParamCheck.throwsRuntimeException(!checkUpdatePasswordPermission, "此账号不允许修改账号密码");

        if (checkUpdatePasswordPermission) {
            Account targetAccount = serviceProvider.getAccountService().getById(targetAccountId);
            if (targetAccount != null) {

                // 验证操作人员的密码，如果是本人则验证本人的登陆密码，如果是超级管理员，则是验证超级管理员的密码
                String operateAccountSalt = operateAccount.getSalt();
                String operateAccountCurrentPassword = operateAccount.getPassword();
                String operateAccountSaltPassword = saltPwd(operateAccountPassword, operateAccountSalt);
                ParamCheck.throwsRuntimeException(!StringUtils.equals(operateAccountCurrentPassword, operateAccountSaltPassword), "登陆密码不正确");

                targetAccount.setPassword(saltPwd(newPassword, targetAccount.getSalt()));
                serviceProvider.getAccountService().update(targetAccount);
            }
        }
    }

    public DBSingleResult<Boolean> add(Account account) {
        try {
            String userName = account.getUserName();
            String password = account.getPassword();
            if (StringUtils.isBlank(password) || StringUtils.isBlank(userName)) {
                return new DBSingleResult<Boolean>().setResult(Boolean.FALSE).setResultmsg("用户名或密码不能为空");
            }

            Account by = serviceProvider.getAccountService().getBy(account);
            if (by != null) {
                return new DBSingleResult<Boolean>().setResult(Boolean.FALSE).setResultmsg("用户名已注册");
            }

            paddingPwd(account);
            account.setFailedNum(NumberUtils.toInt(account.getFailedNum() + ""));
            serviceProvider.getAccountService().create(account);
            return new DBSingleResult<Boolean>().setResult(Boolean.TRUE).setResultmsg(ActionComponents.Success);
        } catch (RuntimeException e) {
            return new DBSingleResult<Boolean>(false, e).setResult(Boolean.FALSE).setResultmsg(e.getMessage());
        } catch (Exception e) {
            logger.error(ActionComponents.DBError, e);
            return new DBSingleResult<Boolean>(false, e).setResult(Boolean.FALSE).setResultmsg(ActionComponents.DBError);
        }
    }

    @Transactional
    public void delete(int id) {

        // 删除账号
        serviceProvider.getAccountService().delete(id);
    }

    public DBSingleResult<Boolean> updateSelf(Account updateAccount, Account loginAccount) {
        try {

            Account byId = serviceProvider.getAccountService().getById(updateAccount);
            if (byId == null || !byId.getId().equals(loginAccount.getId())) {
                return new DBSingleResult<Boolean>().setResult(Boolean.FALSE).setResultmsg("无法修改");
            }

            String password = updateAccount.getPassword();
            if (StringUtils.isBlank(password)) {
                updateAccount.setPassword(null);
                updateAccount.setSalt(null);
            } else {
                paddingPwd(updateAccount);
            }

            serviceProvider.getAccountService().update(updateAccount);
            return new DBSingleResult<Boolean>().setResult(Boolean.TRUE).setResultmsg(ActionComponents.Success);
        } catch (Exception e) {
            logger.error(ActionComponents.DBError, e);
            return new DBSingleResult<Boolean>(false, e).setResult(Boolean.FALSE).setResultmsg(ActionComponents.DBError);
        }
    }

    public Tuple<Integer, DBMultipleResult<Account>> list(Account account, DBPage dBPage) {
        try {
            account.setStatus(Account.Status_enable);
            int countAll = serviceProvider.getAccountService().countAll();
            dBPage.setTotalRow(countAll);
            List<Account> listByPage = serviceProvider.getAccountService().listByPage(account, dBPage);
            DBMultipleResult<Account> result = new DBMultipleResult<Account>().setResult(listByPage).setResultmsg(ActionComponents.Success);
            return new Tuple<>(countAll, result);
        } catch (Exception e) {
            logger.error(ActionComponents.DBError, e);
            DBMultipleResult<Account> result = new DBMultipleResult<Account>(false, e).setResult(Collections.emptyList()).setResultmsg(ActionComponents.DBError);
            return new Tuple<>(0, result);
        }
    }

    public DBSingleResult<Account> getByName(Account account) {
        try {
            Account by = serviceProvider.getAccountService().getBy(account);

            return new DBSingleResult<Account>().setResult(by);
        } catch (Exception e) {
            logger.error(ActionComponents.DBError, e);
            return new DBSingleResult<Account>(false, e).setResultmsg(ActionComponents.DBError);
        }
    }
}
