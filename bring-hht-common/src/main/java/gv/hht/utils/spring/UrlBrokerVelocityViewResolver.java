package gv.hht.utils.spring;

import org.springframework.web.servlet.view.AbstractUrlBasedView;
import org.springframework.web.servlet.view.velocity.VelocityLayoutViewResolver;
import org.springframework.web.servlet.view.velocity.VelocityView;

import java.util.HashMap;
import java.util.Map;

/**
 * 工程里的VM视图解析，可注入一些在页面上公共的类
 *
 * @author Runshine
 */
public class UrlBrokerVelocityViewResolver extends VelocityLayoutViewResolver {

    private boolean debug = false;

    public boolean isDebug() {
        return debug;
    }

    public void setDebug(boolean debug) {
        this.debug = debug;
    }

    /**
     * 全局注入vm模板上下文使用工具类或对象
     */
    public void setViewContextUtils(Map<Object, Object> viewContextUtils) {
        Map<String, Object> staticAttributes = new HashMap<>(viewContextUtils.size(), 1.0f);
        viewContextUtils.forEach((key, value) -> {
            if (value instanceof String) {
                try {
                    Class<?> forName = Class.forName((String)value);
                    staticAttributes.put(key.toString(), forName);
                } catch (ClassNotFoundException ex) {
                    staticAttributes.put(key.toString(), value);
                }
            } else {
                staticAttributes.put(key.toString(), value);
            }
        });
        setAttributesMap(staticAttributes);
    }

    @Override
    protected AbstractUrlBasedView buildView(String viewName) throws Exception {
        VelocityView view = (VelocityView)super.buildView(viewName);
        return view;
    }
}
