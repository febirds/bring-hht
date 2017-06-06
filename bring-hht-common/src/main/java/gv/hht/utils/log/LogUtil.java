package gv.hht.utils.log;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 *
 * @author Runshine
 * @since 2015-5-30
 * @version 1.0.0
 *
 */
public class LogUtil {
    public static Log getLog(String logName) {
        return LogFactory.getLog(logName);
    }

    public static Log getLog(Class logClass) {
        return LogFactory.getLog(logClass);
    }
}
