package gv.hht.utils.spring;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import gv.hht.utils.common.URLDecoder;
import gv.hht.utils.exception.NoneStackTraceRuntimeExcption;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.annotation.ValueConstants;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

/**
 *
 * @author Runshine
 * @since 2016-1-30
 * @version 1.0.0
 *
 */
public class RequestJsonArgumentResolver2 implements HandlerMethodArgumentResolver {
    private static final String RequestObjectAttribute = "__[ParsedPram]_";
//    private static final String RequestObjectAttributeAllQuery = "__[ParsedPramAll_Query]_";
    private static final String RequestObjectAttributeAllBody = "__[ParsedPramAll_Body]_";
    private static final String RequestObjectAttributeParsedFlag = "__[ParsedPramParsedFlag]_";
    private static final String RequestObjectAttributeParsedPramTempMap = "__[ParsedPramTemp_Map]_";

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterAnnotation(RequestJson.class) != null || parameter.getParameterAnnotation(RequestJsonArray.class) != null;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        if(!isParsed(webRequest)) parse(webRequest);
        RequestJson requestJsonAnnotation = parameter.getParameterAnnotation(RequestJson.class);
        if(requestJsonAnnotation != null) {
            return resolveJsonArgument(requestJsonAnnotation, parameter, webRequest);
        } else {
            RequestJsonArray parameterAnnotation = parameter.getParameterAnnotation(RequestJsonArray.class);
            return resolveJsonArrayArgument(parameterAnnotation, parameter, webRequest);
        }
    }

    private Object resolveJsonArgument(RequestJson requestJsonAnnotation, MethodParameter parameter, NativeWebRequest webRequest) throws Exception {
        Class<?> parameterType = parameter.getParameterType();
        String name = requestJsonAnnotation.name();
        if(StringUtils.isEmpty(name)) {
            Object requestAttributeAllBody = getRequestAttributeAllBody(webRequest);
            if(requestAttributeAllBody != null && requestAttributeAllBody instanceof JSONArray) {
                return JSON.parseObject(((JSONArray)requestAttributeAllBody).getJSONObject(0).toJSONString(), parameterType);
            }
        } else {
            Object requestAttribute = getRequestAttribute(webRequest, name);
            if(requestAttribute != null) {
                return _resolveJsonArgument((String[])requestAttribute, parameterType, parameter);
            }
        }

        if(!ValueConstants.DEFAULT_NONE.equals(requestJsonAnnotation.defaultValue())) {
            String defaultValue = requestJsonAnnotation.defaultValue();
            String[] s = new String[1];
            s[0] = defaultValue;
            return _resolveJsonArgument(s, parameterType, parameter);
        } else if(requestJsonAnnotation.value()) {
            return parameterType.newInstance();
        } else {
            return null;
        }
    }

    private Object _resolveJsonArgument(String[] reso, Class<?> clazz, MethodParameter parameter) {
        String res = reso[0];
        if(clazz == int.class || clazz == Integer.class) {
            return Integer.parseInt(res);
        } else if(clazz == long.class || clazz == Long.class) {
            return Long.parseLong(res);
        } else if(clazz == short.class || clazz == Short.class) {
            return Short.parseShort(res);
        } else if(clazz == byte.class || clazz == Byte.class) {
            return Byte.parseByte(res);
        } else if(clazz == char.class || clazz == Character.class) {
            return res.charAt(0);
        } else if(clazz == boolean.class || clazz == Boolean.class) {
            return Boolean.parseBoolean(res);
        } else if(clazz == float.class || clazz == Float.class) {
            return Float.parseFloat(res);
        } else if(clazz == double.class || clazz == Double.class) {
            return Double.parseDouble(res);
        } else if(clazz == String.class) {
            return res;
        } else if(clazz == Object.class) {
            return res;
        } else {
            try {
                return JSON.parseObject(res, clazz);
            } catch(Exception e) {
                Class<?> containingClass = parameter.getContainingClass();
                Method method = parameter.getMethod();
                String parameterName = parameter.getParameterName();
                parameterName = parameterName == null ? "" : parameterName;
                throw new NoneStackTraceRuntimeExcption(containingClass.getSimpleName() + "." + method.getName() + "方法参数" + parameterName + "无法解析");
            }
        }
    }

    private Object resolveJsonArrayArgument(RequestJsonArray requestJsonAnnotation, MethodParameter parameter, NativeWebRequest webRequest) throws Exception {
        Class<?> type = requestJsonAnnotation.type();
        if(type == RequestJsonArrayNoneClass.class) {
            try {
                Type c = parameter.getGenericParameterType();
                Type targ = ((java.lang.reflect.ParameterizedType)c).getActualTypeArguments()[0];
                if(targ instanceof Class) {
                    type = (Class<?>)targ;
                }
            } catch(Exception e) {
            }
        }

        if(type == null || type == RequestJsonArrayNoneClass.class) {
            Class<?> containingClass = parameter.getContainingClass();
            Method method = parameter.getMethod();
            String parameterName = parameter.getParameterName();
            parameterName = parameterName == null ? "" : parameterName;

            throw new NoneStackTraceRuntimeExcption(containingClass.getSimpleName() + "." + method.getName() + "方法参数" + parameterName + "需要注解明确的类型");
        }

        Class<?> parameterType = type;

        String name = requestJsonAnnotation.name();
        if(StringUtils.isEmpty(name)) {
            Object requestAttributeAllBody = getRequestAttributeAllBody(webRequest);
            if(requestAttributeAllBody != null && requestAttributeAllBody instanceof JSONArray) {
                return JSON.parseArray(((JSONArray)requestAttributeAllBody).toJSONString(), parameterType);
            }
        } else {
            Object requestAttribute = getRequestAttribute(webRequest, name);
            if(requestAttribute != null) {
                return _resolveJsonArrayArgument((String[])requestAttribute, parameterType, parameter);
            }
        }

        if(!ValueConstants.DEFAULT_NONE.equals(requestJsonAnnotation.defaultValue())) {
            String defaultValue = requestJsonAnnotation.defaultValue();
            String[] s = new String[1];
            s[0] = defaultValue;
            return _resolveJsonArrayArgument(s, parameterType, parameter);
        } else if(requestJsonAnnotation.value()) {
            return Collections.emptyList();
        } else {
            return null;
        }
    }

    private Object _resolveJsonArrayArgument(String[] reso, Class<?> clazz, MethodParameter parameter) {
        int arrayLength = reso.length;
        if(clazz == int[].class) {
            int[] ret = new int[arrayLength];
            for(int i = 0; i < arrayLength; i++) {
                ret[i] = Integer.parseInt(reso[i]);
            }
            return ret;
        } else if(clazz == Integer[].class) {
            Integer[] ret = new Integer[arrayLength];
            for(int i = 0; i < arrayLength; i++) {
                ret[i] = Integer.valueOf(reso[i]);
            }
            return ret;
        } else if(clazz == long[].class) {
            long[] ret = new long[arrayLength];
            for(int i = 0; i < arrayLength; i++) {
                ret[i] = Long.parseLong(reso[i]);
            }
            return ret;
        } else if(clazz == Long[].class) {
            Long[] ret = new Long[arrayLength];
            for(int i = 0; i < arrayLength; i++) {
                ret[i] = Long.valueOf(reso[i]);
            }
            return ret;
        } else if(clazz == short[].class) {
            short[] ret = new short[arrayLength];
            for(int i = 0; i < arrayLength; i++) {
                ret[i] = Short.parseShort(reso[i]);
            }
            return ret;
        } else if(clazz == Short[].class) {
            Short[] ret = new Short[arrayLength];
            for(int i = 0; i < arrayLength; i++) {
                ret[i] = Short.valueOf(reso[i]);
            }
            return ret;
        } else if(clazz == byte[].class) {
            byte[] ret = new byte[arrayLength];
            for(int i = 0; i < arrayLength; i++) {
                ret[i] = Byte.parseByte(reso[i]);
            }
            return ret;
        } else if(clazz == Byte[].class) {
            Byte[] ret = new Byte[arrayLength];
            for(int i = 0; i < arrayLength; i++) {
                ret[i] = Byte.valueOf(reso[i]);
            }
            return ret;
        } else if(clazz == char[].class) {
            char[] ret = new char[arrayLength];
            for(int i = 0; i < arrayLength; i++) {
                ret[i] = reso[i].charAt(0);
            }
            return ret;
        } else if(clazz == Character[].class) {
            Character[] ret = new Character[arrayLength];
            for(int i = 0; i < arrayLength; i++) {
                ret[i] = reso[i].charAt(0);
            }
            return ret;
        } else if(clazz == boolean[].class) {
            boolean[] ret = new boolean[arrayLength];
            for(int i = 0; i < arrayLength; i++) {
                ret[i] = Boolean.parseBoolean(reso[i]);
            }
            return ret;
        } else if(clazz == Boolean[].class) {
            Boolean[] ret = new Boolean[arrayLength];
            for(int i = 0; i < arrayLength; i++) {
                ret[i] = Boolean.valueOf(reso[i]);
            }
            return ret;
        } else if(clazz == float[].class) {
            float[] ret = new float[arrayLength];
            for(int i = 0; i < arrayLength; i++) {
                ret[i] = Float.parseFloat(reso[i]);
            }
            return ret;
        } else if(clazz == Float[].class) {
            Float[] ret = new Float[arrayLength];
            for(int i = 0; i < arrayLength; i++) {
                ret[i] = Float.valueOf(reso[i]);
            }
            return ret;
        } else if(clazz == double[].class) {
            double[] ret = new double[arrayLength];
            for(int i = 0; i < arrayLength; i++) {
                ret[i] = Double.parseDouble(reso[i]);
            }
            return ret;
        } else if(clazz == Double[].class) {
            Double[] ret = new Double[arrayLength];
            for(int i = 0; i < arrayLength; i++) {
                ret[i] = Double.valueOf(reso[i]);
            }
            return ret;
        } else if(clazz == String[].class) {
            return reso;
        } else if(clazz == Object.class) {
            return reso;
        } else {
            try {
                return JSON.parseArray(reso[0], clazz);
            } catch(Exception e) {
                Class<?> containingClass = parameter.getContainingClass();
                Method method = parameter.getMethod();
                String parameterName = parameter.getParameterName();
                parameterName = parameterName == null ? "" : parameterName;
                throw new NoneStackTraceRuntimeExcption(containingClass.getSimpleName() + "." + method.getName() + "方法参数" + parameterName + "无法解析");
            }
        }
    }

    private void setRequestAttribute(NativeWebRequest webRequest, String name, Object value) {
        webRequest.setAttribute(RequestObjectAttribute + name, value, RequestAttributes.SCOPE_REQUEST);
    }

//    private void setRequestAttributeAllQuery(NativeWebRequest webRequest, Object value) {
//        webRequest.setAttribute(RequestObjectAttributeAllQuery, value, RequestAttributes.SCOPE_REQUEST);
//    }
    private void setRequestAttributeAllBody(NativeWebRequest webRequest, Object value) {
        webRequest.setAttribute(RequestObjectAttributeAllBody, value, RequestAttributes.SCOPE_REQUEST);
    }

    private Object getRequestAttribute(NativeWebRequest webRequest, String name) {
        return webRequest.getAttribute(RequestObjectAttribute + name, RequestAttributes.SCOPE_REQUEST);
    }

//    private Object getRequestAttributeAllQuery(NativeWebRequest webRequest) {
//        return webRequest.getAttribute(RequestObjectAttributeAllQuery, RequestAttributes.SCOPE_REQUEST);
//    }
    private Object getRequestAttributeAllBody(NativeWebRequest webRequest) {
        return webRequest.getAttribute(RequestObjectAttributeAllBody, RequestAttributes.SCOPE_REQUEST);
    }

    private void addRequestObjectAttributeParsedPramTempMap(NativeWebRequest webRequest, String name, String value) {
        HashMap<String, LinkedList<String>> attribute = (HashMap<String, LinkedList<String>>)webRequest.getAttribute(RequestObjectAttributeParsedPramTempMap, RequestAttributes.SCOPE_REQUEST);
        if(attribute == null) {
            attribute = new HashMap<>();
            webRequest.setAttribute(RequestObjectAttributeParsedPramTempMap, attribute, RequestAttributes.SCOPE_REQUEST);
        }

        LinkedList<String> ll = attribute.get(name);
        if(ll == null) {
            ll = new LinkedList<>();
            attribute.put(name, ll);
        }

        ll.add(value);
    }

    private LinkedList<String> getRequestObjectAttributeParsedPramTempMapContent(NativeWebRequest webRequest, String name) {
        HashMap<String, LinkedList<String>> attribute = (HashMap<String, LinkedList<String>>)webRequest.getAttribute(RequestObjectAttributeParsedPramTempMap, RequestAttributes.SCOPE_REQUEST);
        if(attribute == null) {
            return null;
        }

        LinkedList<String> ll = attribute.get(name);
        if(ll == null) {
            return null;
        }

        return ll;
    }

    private HashMap<String, LinkedList<String>> getRequestObjectAttributeParsedPramTempMap(NativeWebRequest webRequest) {
        HashMap<String, LinkedList<String>> attribute = (HashMap<String, LinkedList<String>>)webRequest.getAttribute(RequestObjectAttributeParsedPramTempMap, RequestAttributes.SCOPE_REQUEST);
        if(attribute == null) {
            return null;
        }

        return attribute;
    }

    private void parse(NativeWebRequest webRequest) {
        //可以基于这几种假设：
        //1.如果客户端是x-www-form-urlencoded提交，那么容器或者框架可能会做解析，那么流的内容以及QueryString可以从Parameter中获取
        //2.如果不是使用x-www-form-urlencoded提交，那么可以自己来解析流以及QueryString。
        //3.如果被容器或者框架解析过，那么如果QueryString或流是纯Json，那么整个Json会是key
        HttpServletRequest nativeRequest = webRequest.getNativeRequest(HttpServletRequest.class);
        String contentType = nativeRequest.getContentType();
        if(contentType != null && contentType.contains("x-www-form-urlencoded")) {
            formParse(webRequest);
        } else {
            plainParse(webRequest);
        }

        webRequest.setAttribute(RequestObjectAttributeParsedFlag, Boolean.TRUE, RequestAttributes.SCOPE_REQUEST);
    }

    private void formParse(NativeWebRequest webRequest) {
        Map<String, String[]> parameterMap = webRequest.getParameterMap();
        HashMap<String, LinkedList<String>> newParameterMap = new HashMap<>();

        if(parameterMap != null) {
            for(Map.Entry<String, String[]> entry : parameterMap.entrySet()) {
                String key = entry.getKey();
                String[] value = entry.getValue();

                if(isStringArrayEmpty(value)) {
                    if(key.startsWith("{") && key.endsWith("}")) {
                        //放入RequestObjectAttributeAllBody，将其添加到JSONARRAY
                        try {
                            JSONObject json = JSONObject.parseObject(key);
                            _formParse(webRequest, json);
                        } catch(Exception e) {
                            setRequestAttribute(webRequest, key, value);
                        }
                    } else if(key.startsWith("[") && key.endsWith("]")) {
                        //放入RequestObjectAttributeAllBody，将其中的JSON添加到JSONARRAY
                        try {
                            JSONArray parseArray = JSONArray.parseArray(key);
                            for(Object json : parseArray) {
                                _formParse(webRequest, (JSON)json);
                            }
                        } catch(Exception e) {
                            setRequestAttribute(webRequest, key, value);
                        }
                    } else {
                        //放入RequestObjectAttribute
                        setRequestAttribute(webRequest, key, value);
                    }
                } else {
                    //放入RequestObjectAttribute
                    setRequestAttribute(webRequest, key, value);
                }

//                LinkedList<String> ll = new LinkedList<>();
//                newParameterMap.put(key, ll);
//                if(value != null) {
//                    for(String string : value) {
//                        ll.add(string);
//                    }
//                }
            }
        }
    }

    private void _formParse(NativeWebRequest webRequest, JSON json) {
        Object requestAttributeAllBody = getRequestAttributeAllBody(webRequest);
        JSONArray arrayBody;
        if(requestAttributeAllBody != null && requestAttributeAllBody instanceof JSONArray) {
            arrayBody = (JSONArray)requestAttributeAllBody;
            arrayBody.add(json);
        } else {
            arrayBody = new JSONArray();
            arrayBody.add(json);
        }

        setRequestAttributeAllBody(webRequest, arrayBody);
    }

    private void plainParse(NativeWebRequest webRequest) {
        queryStringParse(webRequest);
        bodyParse(webRequest);
    }

    private void queryStringParse(NativeWebRequest webRequest) {
        HttpServletRequest nativeRequest = webRequest.getNativeRequest(HttpServletRequest.class);
        String characterEncoding = nativeRequest.getCharacterEncoding();
        characterEncoding = (characterEncoding == null) ? "UTF-8" : characterEncoding;

        String queryString = nativeRequest.getQueryString();
        if(queryString != null) {
            if(queryString.startsWith("{") && queryString.endsWith("}") || queryString.startsWith("%7B") && queryString.endsWith("%7D")) {
                try {
                    JSONObject json = JSONObject.parseObject(URLDecoder.decode(queryString, characterEncoding));
                    _formParse(webRequest, json);
                } catch(Exception e) {
                    process(webRequest, queryString, characterEncoding);
                }
            } else if(queryString.startsWith("[") && queryString.endsWith("]") || queryString.startsWith("%5B") && queryString.endsWith("%5D")) {
                try {
                    JSONArray parseArray = JSONArray.parseArray(URLDecoder.decode(queryString, characterEncoding));
                    for(Object json : parseArray) {
                        _formParse(webRequest, (JSON)json);
                    }
                } catch(Exception e) {
                    process(webRequest, queryString, characterEncoding);
                }
            } else {
                process(webRequest, queryString, characterEncoding);
            }
        }
    }

    private void process(NativeWebRequest webRequest, String res, String characterEncoding) {
        String[] split = res.split("&");
        HashMap<String, LinkedList<String>> map = new HashMap<>(split.length);

        for(String s : split) {
            String[] ps = s.split("=", 2);

            try {
                String key = URLDecoder.decode(ps[0], characterEncoding);
                if(ps.length >= 2) {
                    String value = URLDecoder.decode(ps[1], characterEncoding);
                    addRequestObjectAttributeParsedPramTempMap(webRequest, key, value);
                } else if(key.startsWith("{") && key.endsWith("}")) {
                    JSONObject json = JSONObject.parseObject(key);
                    _formParse(webRequest, json);
                } else if(key.startsWith("[") && key.endsWith("]")) {
                    JSONArray parseArray = JSONArray.parseArray(key);
                    for(Object json : parseArray) {
                        _formParse(webRequest, (JSON)json);
                    }
                }
            } catch(UnsupportedEncodingException ex) {
            }
        }
        HashMap<String, LinkedList<String>> requestObjectAttributeParsedPramTempMap = getRequestObjectAttributeParsedPramTempMap(webRequest);
        for(Map.Entry<String, LinkedList<String>> entry : requestObjectAttributeParsedPramTempMap.entrySet()) {
            String key = entry.getKey();
            LinkedList<String> value = entry.getValue();
            String[] s = new String[value.size()];
            setRequestAttribute(webRequest, key, value.toArray(s));

        }
    }

    private void bodyParse(NativeWebRequest webRequest) {
        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class
        );
        String characterEncoding = request.getCharacterEncoding();
        String res = null;

        // 把reqeust的body读取到StringBuilder
        try {
            BufferedReader reader = request.getReader();
            if(reader != null) {
                reader.reset();
                StringBuilder sb = new StringBuilder(96);
                reader.lines().forEach(line -> sb.append(line));
                if(sb.length() != 0) {
                    res = sb.toString();
                }
            }

            if(res != null) {
                if(res.startsWith("{") && res.endsWith("}")) {
                    try {
                        JSONObject json = JSONObject.parseObject(res);
                        _formParse(webRequest, json);
                    } catch(Exception e) {
                        process(webRequest, res, characterEncoding);
                    }
                } else if(res.startsWith("[") && res.endsWith("]")) {
                    try {
                        JSONArray parseArray = JSONArray.parseArray(res);
                        for(Object json : parseArray) {
                            _formParse(webRequest, (JSON)json);
                        }
                    } catch(Exception e) {
                        process(webRequest, res, characterEncoding);
                    }
                } else {
                    process(webRequest, res, characterEncoding);
                }
            }
        } catch(Exception e) {

        }
    }

    private boolean isParsed(NativeWebRequest webRequest) {
        return webRequest.getAttribute(RequestObjectAttributeParsedFlag, RequestAttributes.SCOPE_REQUEST) != null;
    }

    private boolean isStringArrayEmpty(String[] array) {
        if(array == null) return true;
        if(array.length == 0) return true;
        for(String string : array) {
            if(string != null && !"".equals(string)) {
                return false;
            }
        }
        return true;
    }
}
