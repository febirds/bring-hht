package gv.hht.utils.common;

import java.util.Map;

/**
 * Created by spark on 2015/11/27.
 */
public class CommonResourceHolder {
    private Map sourceMap;

    public void setSourceMap(Map sourceMap) {
        this.sourceMap = sourceMap;
    }

    public String getValue(String key){
        return sourceMap.get(key).toString();
    }
}
