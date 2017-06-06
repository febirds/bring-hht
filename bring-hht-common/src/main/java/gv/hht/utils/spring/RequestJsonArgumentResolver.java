package gv.hht.utils.spring;

import com.alibaba.fastjson.JSON;
import gv.hht.utils.common.URLDecoder;
import gv.hht.utils.exception.NoneStackTraceRuntimeExcption;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.util.Collections;

/**
 *
 * @author Runshine
 * @since 2015-6-9
 * @version 1.0.0
 *
 */
public class RequestJsonArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterAnnotation(RequestJson.class) != null || parameter.getParameterAnnotation(RequestJsonArray.class) != null;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        RequestJson requestJsonAnnotation = parameter.getParameterAnnotation(RequestJson.class);

        if (requestJsonAnnotation != null) {
            return resolveJsonArgument(requestJsonAnnotation, parameter, webRequest);
        } else {
            return resolveJsonArrayArgument(parameter, webRequest);
        }
    }

    private Object resolveJsonArgument(RequestJson requestJsonAnnotation, MethodParameter parameter, NativeWebRequest webRequest) throws Exception {
        String name = requestJsonAnnotation.name();
        return resolveJsonResult(getKey(webRequest, name, false), requestJsonAnnotation, parameter);
    }

    private Object resolveJsonResult(String key, RequestJson annotation, MethodParameter parameter) throws InstantiationException, IllegalAccessException {
        if (key == null) {
            if (annotation.value()) {
                return parameter.getParameterType().newInstance();
            } else {
                return null;
            }
        } else {
            return JSON.parseObject(key, parameter.getParameterType());
        }
    }

    private Object resolveJsonArrayArgument(MethodParameter parameter, NativeWebRequest webRequest) throws IOException {

        RequestJsonArray parameterAnnotation = parameter.getParameterAnnotation(RequestJsonArray.class);

        Class<?> type = parameterAnnotation.type();

        if (type == RequestJsonArrayNoneClass.class) {
            try {
                Type c = parameter.getGenericParameterType();
                Type targ = ((java.lang.reflect.ParameterizedType)c).getActualTypeArguments()[0];
                if (targ instanceof Class) {
                    type = (Class<?>)targ;
                }
            } catch (Exception e) {
            }
        }

        if (type == null || type == RequestJsonArrayNoneClass.class) {
            Class<?> containingClass = parameter.getContainingClass();
            Method method = parameter.getMethod();
            String parameterName = parameter.getParameterName();
            parameterName = parameterName == null ? "" : parameterName;

            throw new NoneStackTraceRuntimeExcption(containingClass.getSimpleName() + "." + method.getName() + "方法参数" + parameterName + "需要注解明确的类型");
        }

        String name = parameterAnnotation.name();
        return resolveJsonArrayResult(getKey(webRequest, name, true), parameterAnnotation, type);
    }

    private Object resolveJsonArrayResult(String key, RequestJsonArray annotation, Class<?> type) {
        if (key == null) {
            if (annotation.value()) {
                return Collections.emptyList();
            } else {
                return null;
            }
        } else {
            return JSON.parseArray(key, type);
        }
    }

    private String getKey(NativeWebRequest webRequest, String name, boolean isArray) throws IOException {
        String key = null;
        if (name.length() > 0) {
            String trim = name.trim();
            if (trim.length() > 0) {
                key = getName(webRequest, trim);
            }
        } else {
            key = getBody(webRequest, isArray);
        }
        return key;
    }

    private String getName(NativeWebRequest webRequest, String name) {
        String key = webRequest.getParameter(name);
        if (key == null || key.length() == 0) {
            return null;
        }
        String trim = key.trim();
        if (trim.length() == 0) {
            return null;
        } else {
            return trim;
        }
    }

    private String getBody(NativeWebRequest webRequest, boolean isArray) throws IOException {
        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        String characterEncoding = request.getCharacterEncoding();
        String res = null;

        // 把reqeust的body读取到StringBuilder
        BufferedReader reader = request.getReader();
        if (reader != null) {
            reader.reset();
            StringBuilder sb = new StringBuilder(96);
            reader.lines().forEach(line -> sb.append(line));
            if (sb.length() != 0) {
                res = URLDecoder.decode(sb.toString(), characterEncoding).trim();
            }
            reader.reset(); //还原现场
        }

        if (res == null || res.length() == 0) {
            String queryString = request.getQueryString();
            if (queryString != null) {
                res = process(queryString, characterEncoding, isArray);
            }
        }

        if (res == null || res.length() == 0) {
            return null;
        } else {
            return res;
        }
    }

    private static String process(String res, String characterEncoding, boolean isArray) throws UnsupportedEncodingException {
        //服务端不会收到客户端url中#以以后的部分
//        int hashIndex = res.indexOf("#");
//        if (hashIndex > -1) {
//            res = res.substring(0, hashIndex);
//        }
        if (!res.contains("&")) {
            res = URLDecoder.decode(res, characterEncoding).trim();
            if (isArray) {
                return processArray(res);
            } else {
                return processJSON(res);
            }
        } else {
            String[] split = res.split("&");
            if (isArray) {
                for (String s : split) {
                    String p = processArray(URLDecoder.decode(s, characterEncoding).trim());
                    if (p != null) {
                        return p;
                    }
                }
            } else {
                for (String s : split) {
                    String p = processJSON(URLDecoder.decode(s, characterEncoding).trim());
                    if (p != null) {
                        return p;
                    }
                }
            }
        }
        return null;
    }

    private static String processArray(String res) {
        char lc = '[', rc = ']';
        return process(lc, rc, res);
    }

    private static String processJSON(String res) {
        char lc = '{', rc = '}';
        return process(lc, rc, res);
    }

    private static String process(char lc, char rc, String res) {
        if (res.charAt(0) == lc && res.charAt(res.length() - 1) == rc) {
            return res;
        }
        return null;
//        else {
//            int l = -1, r = -1;
//
//            for (int i = 0, j = res.length() - 1;i < j;) {
//                if (l == -1 && res.charAt(i) == lc) {
//                    l = i;
//                }
//
//                if (r == -1 && res.charAt(j) == rc) {
//                    r = j;
//                }
//
//                if (l != -1 && r != -1) {
//                    break;
//                }
//                if (l == -1) i++;
//                if (r == -1) j--;
//            }
//
//            if (l != -1 && r != -1) {
//                return res.substring(l, r + 1);
//            } else {
//                return null;
//            }
//        }
    }
}
