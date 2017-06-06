package gv.hht.utils.exception;

/**
 *
 * @author Runshine
 * @since 2015-5-19
 * @version 1.0.0
 *
 */
public class NoneStackTraceRuntimeExcption extends RuntimeException {
    private static final long serialVersionUID = -8601298290305918088L;

    public NoneStackTraceRuntimeExcption() {
        super(null, null, false, false);
    }

    public NoneStackTraceRuntimeExcption(String message) {
        super(message, null, false, false);
    }

    public NoneStackTraceRuntimeExcption(Throwable cause) {
        super(null, cause, false, false);
    }

    public NoneStackTraceRuntimeExcption(String message, Throwable cause) {
        super(message, cause, false, false);
    }

}
