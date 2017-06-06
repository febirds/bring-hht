package gv.hht.utils.spring;

import org.springframework.web.bind.annotation.ValueConstants;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 *                                                                                                                      <br/>
 * 1:                                                                                                      <br/>
 * POST /path/resource?key=value&{pathQueryJson} HTTP 1.1                                                  <br/> 
 * HOST domain.com                                                                                         <br/> 
 *                                                                                                                      <br/> 
 * {contentBodyJson}                                                                                       <br/> 
 *                                                                                                                      <br/> 
 * 要么content-body整个是json或者path-query中完全被{}包装的部分（即不是key=value形式）为所需的json（取其一）          <br/> 
 * 可直接使用@RequestJson将JSON转换为被注解的对象，@RequestJson一个方法只能使用一次                                <br/> 
 * 解析器会首先查询{contentBodyJson}，如果{contentBodyJson}不为空或空字符串，则使用{contentBodyJson}内容解析为被注解的对象，此时会忽略{pathQueryJson}部分 <br/>
 * 只有当{contentBodyJson}为空或空字符串时，才会使用{pathQueryJson}部分，且当{pathQueryJson}不为空或空字符串时，将其解析为被注解的对象                    <br/>
 * <br/>/////////////////////////////////////////////////////////////////////<br/><br/>
 * 2:                                                                                                      <br/>
 * POST /path/resource?key1={pathQueryJson} HTTP 1.1                                                       <br/> 
 * HOST domain.com                                                                                         <br/> 
 *                                                                                                                      <br/> 
 * key2={contentBodyJson}                                                                                  <br/> 
 *                                                                                                                      <br/> 
 * content-body与path-query是表单提交key=value形式，value部分必须为json                                         <br/> 
 * 可直接使用@RequestJson(name="key")将对应key的value转换为被注解的对象，可以多次使用注解多个参数                    <br/> 
 * 解析器会查找content-body与path-query两个部分，当存在重名key时，只会使用一个，优先级别同request.getParameter       <br/>
 *                                                                                                                      <br/>
 * @author Runshine
 * @since 2015-6-9
 * @version 1.0.0
 *
 */
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequestJson {
    /**
     * @return 是否要要分配默认值，false: 获取不到body时则参数注入null，true: 获取不到body时则参数注入默认对象
     */
    boolean value() default false;

    /**
     * 当使用key=Json(key={"xx":"x"})方式时，指定对应的Key的名称，当不指定时则视整个content-body或path-query为一个json
     *
     * @return
     */
    String name() default "";
    
    String defaultValue() default ValueConstants.DEFAULT_NONE;
}
