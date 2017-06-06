package gv.hht.utils.spring;

import org.springframework.web.bind.annotation.ValueConstants;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 参照RequestJson的示例
 *
 * @author Runshine
 * @since 2015-6-9
 * @version 1.0.0
 *
 */
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequestJsonArray {
    /**
     * @return 是否要要分配默认值，false: 获取不到body时则参数注入null，true: 获取不到body时则参数注入默认对象
     */
    boolean value() default false;

    /**
     * 当使用key=Json(key={"xx":"x"})方式时，指定对应的Key的名称，当不指定时则视整个content-body或path-query为一个json
     *
     * @return key的名称
     */
    String name() default "";

    /**
     * @return collections中元素的类型,如果无法自动解析请人工明确指定,人工指定优先级高于自动解析
     */
    Class<?> type() default RequestJsonArrayNoneClass.class;
    
    String defaultValue() default ValueConstants.DEFAULT_NONE;
}
