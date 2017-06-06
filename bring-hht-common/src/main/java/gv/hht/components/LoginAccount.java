package gv.hht.components;

import gv.hht.model.account.Account;

import java.io.Serializable;

/**
 *
 * @author Runshine
 * @since 2015-6-23
 * @version 1.0.0
 *
 */
public class LoginAccount implements Serializable {
    private static final long serialVersionUID = 1L;

    private Account account;

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
