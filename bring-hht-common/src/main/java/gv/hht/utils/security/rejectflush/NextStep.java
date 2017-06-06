package gv.hht.utils.security.rejectflush;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.Serializable;

/**
 *
 * @author Runshine
 * @since 2015-7-17
 * @version 1.0.0
 *
 */
public interface NextStep {
    void doNext(HttpServletRequest request, HttpServletResponse response, Serializable blackKey);
}
