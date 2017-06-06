package gv.hht.utils.checker;


import gv.hht.utils.exception.NoneStackTraceRuntimeExcption;

/**
 *
 * @author Runshine
 * @since 2015-9-26
 * @version 1.0.0
 *
 */
public class Assert {
    public static void nullAssert(Object obj, String message) {
        if (obj == null) throw new NoneStackTraceRuntimeExcption(message);
    }

    public static void nullAssert(Object obj) {
        if (obj == null) throw new NoneStackTraceRuntimeExcption();
    }

    public static void gtZero(int obj) {
        if (obj <= 0) throw new NoneStackTraceRuntimeExcption("参数必须大于0");
    }

    public static void gtZero(long obj) {
        if (obj <= 0) throw new NoneStackTraceRuntimeExcption("参数必须大于0");
    }
}
