package gv.hht.utils.cache;

import gv.hht.utils.exception.NoneStackTraceRuntimeExcption;

/**
 *
 * @author Runshine
 * @since 2015-12-14
 * @version 1.0.0
 *
 */
final class BaseValue<T> {
    private final Long expireTime;
    private final T value;

    public BaseValue(T value) {
        checkValue(value);
        this.value = value;
        this.expireTime = null;
    }

    public BaseValue(T value, Long expireTime) {
        checkValue(value);
        this.expireTime = expireTime;
        this.value = value;
    }

    public Long getExpireTime() {
        return expireTime;
    }

    public T getValue() {
        return value;
    }

    private void checkValue(T value) {
        if(value == null) throw new NoneStackTraceRuntimeExcption("value不可以为空");
    }

    /**
    判断是否已经过期
    @return 
     */
    public boolean isExpired() {
        return !(expireTime == null || expireTime > System.currentTimeMillis());
    }

    @Override
    public String toString() {
        return "BaseValue{" + "expireTime=" + expireTime + ", value=" + value + '}';
    }
}
