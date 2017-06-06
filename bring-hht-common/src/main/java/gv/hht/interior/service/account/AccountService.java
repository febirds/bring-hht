package gv.hht.interior.service.account;

import gv.hht.interior.mapper.BaseMapper;
import gv.hht.interior.mapper.account.AccountMapper;
import gv.hht.interior.service.BaseService;
import gv.hht.model.account.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Runshine
 * @since 2015-5-25
 * @version 1.0.0
 *
 */
@Service
public class AccountService extends BaseService<Account> {
    @Autowired
    private AccountMapper accountMapper;

    @Override
    protected BaseMapper<Account> getMapper() {
        return accountMapper;
    }
}
