package gv.hht.utils.json;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializeConfig;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.MessageFormat;

/**
 * @author Runshine
 * @version 1.0.0
 * @since 2015-5-19
 */
public class BaseJsonResult {
    /*public static final SerializeConfig serializeConfig = new SerializeConfig();
    static {
        serializeConfig.put(Long.class, new LongCurrencySerializer());
    }*/
    /**
     * 是否成功,默认成功
     */
    protected boolean success = true;

    /**
     * 消息
     */
    protected String msg = "";

    /**
     * API状态码
     */
    protected ApiCode apiCode = ApiCode.NONE_CODE;

    protected boolean jsonp;
    protected String callback;

    public BaseJsonResult() {
    }

    public BaseJsonResult(boolean success) {
        this.success = success;
    }

    public BaseJsonResult(boolean success, String msg) {
        this.success = success;
        this.msg = msg;
    }

    public BaseJsonResult(boolean success, ApiCode apiCode) {
        this.success = success;
        this.msg = apiCode.getMessage();
        this.apiCode = apiCode;
    }

    public BaseJsonResult(boolean success, String msg, ApiCode apiCode) {
        this.success = success;
        this.msg = msg;
        this.apiCode = apiCode;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMsg() {
        return msg;
    }

    public int getApiCode() {
        return apiCode.getValue();
    }

    public static String formatMsg(String msg, Object[] arguments) {
        return MessageFormat.format(msg, arguments);
    }

    public String toJson() {
        SerializeConfig serializeConfig = SerializeConfigHolder.getConfig();
        if (serializeConfig == null) {
            return JSON.toJSONString(this,
                    SerializerFeature.WriteDateUseDateFormat,
                    SerializerFeature.WriteEnumUsingToString);
        } else {
            return JSON.toJSONString(this, serializeConfig,
                    SerializerFeature.WriteDateUseDateFormat,
                    SerializerFeature.WriteEnumUsingToString);
        }

        /*return JSONObject.toJSONString(this,
                SerializerFeature.WriteDateUseDateFormat,
                SerializerFeature.WriteEnumUsingToString);*/
    }

    public void toJson(HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(toJson());
    }

    public void toGsonJson(HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(toGsonJson());
    }

    public String toGsonJson() {
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        return gson.toJson(this);
    }

   /* @Override
    public String toString() {
        return toJson();
    }*/

    public boolean isJsonp() {
        return jsonp;
    }

    public void setJsonp(boolean jsonp) {
        this.jsonp = jsonp;
    }

    public String getCallback() {
        return callback;
    }

    public void setCallback(String callback) {
        this.callback = callback;
    }
}
