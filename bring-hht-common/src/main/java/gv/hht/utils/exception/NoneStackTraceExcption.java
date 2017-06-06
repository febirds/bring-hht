package gv.hht.utils.exception;

/**
 *
 * @author Runshine
 * @since 2015-5-19
 * @version 1.0.0
 *
 */
public class NoneStackTraceExcption extends Exception {
    private static final long serialVersionUID = 8735590018344679380L;

    public NoneStackTraceExcption() {
        super(null, null, false, false);
    }

    public NoneStackTraceExcption(String message) {
        super(message, null, false, false);
    }

    public NoneStackTraceExcption(Throwable cause) {
        super(null, cause, false, false);
    }

    public NoneStackTraceExcption(String message, Throwable cause) {
        super(message, cause, false, false);
    }
}
