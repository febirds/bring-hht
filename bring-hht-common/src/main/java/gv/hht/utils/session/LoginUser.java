package gv.hht.utils.session;

import gv.hht.model.user.User;

import java.io.Serializable;

/**
 *
 * @author Runshine
 * @since 2015-8-13
 * @version 1.0.0
 *
 */
public class LoginUser implements Serializable{
    private static final long serialVersionUID = 1L;

    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
