package gv.hht.interior.service;

import gv.hht.interior.service.account.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Closure.Yang
 * @since 2015/8/20
 */
@Service
public class ServiceProvider {

    /** autowired all service here **/
    @Autowired
    private AccountService accountService;

    public AccountService getAccountService() {
        return accountService;
    }

}

