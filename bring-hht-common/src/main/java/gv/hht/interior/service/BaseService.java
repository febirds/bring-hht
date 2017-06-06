package gv.hht.interior.service;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Joiner;
import com.google.common.base.Splitter;
import gv.hht.interior.mapper.BaseMapper;
import gv.hht.model.BaseModel;
import gv.hht.utils.annotation.EnableCache;
import gv.hht.utils.cache.RedisCache;
import gv.hht.utils.common.RandomUtils;
import gv.hht.utils.datastructures.Triple;
import gv.hht.utils.db.DBPage;
import gv.hht.utils.reflect.ClassUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;

import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

/**
 * @author Runshine
 * @version 1.0.0
 * @since 2015-5-25
 */
public abstract class BaseService<Model extends BaseModel> {

    protected final Log logger = LogFactory.getLog(getClass());
    @Autowired
    private RedisCache redisCache;

    protected abstract BaseMapper<Model> getMapper();

    public int create(Model model) {
        int i = getMapper().create(model);

        Triple<Boolean, Annotation, Class> cache = getReady(null);
        if (cache.left()) {
            Class modelClazz = cache.right();

            // 创建对象时，列表和列表数量的缓存需要清除
            evictKeys(modelClazz, true);
        }
        return i;
    }

    public void delete(Model model) {
        delete(model.getId());
    }

    public void delete(int modelId) {
        getMapper().delete(modelId);

        Triple<Boolean, Annotation, Class> cache = getReady(null);
        if (cache.left()) {
            Class modelClazz = cache.right();

            // 删除对象时，需要清除对象的ID缓存
            redisCache.remove(modelClazz.getName() + "#" + modelId);

            // 删除对象时，列表和列表数量的缓存需要清除
            evictKeys(modelClazz, true);

        }
    }

    public void update(Model model) {
        getMapper().update(model);

        Triple<Boolean, Annotation, Class> cache = getReady(null);
        if (cache.left()) {
            Class modelClazz = cache.right();

            // 更新对象时，需要清除对象的ID缓存
            redisCache.remove(modelClazz.getName() + "#" + model.getId());

            // 更新对象时，列表和列表数量的缓存不需要清除
            evictKeys(modelClazz, false);
        }
    }


    public Model getById(Model model) {
        return getById(model.getId());
    }

    public Model getById(Integer modelId) {
        if(modelId == null || modelId ==0){
            return null;
        }
        try {
            Triple<Boolean, Annotation, Class> ctx = getReady(EnableCache.Method.GET);
            String cacheKey = "";
            if (ctx.left()) {
                Class modelClazz = ctx.right();
                cacheKey = modelClazz.getName() + "#" + modelId;
                if(StringUtils.isNotBlank(cacheKey)) {
                    String cacheVal = redisCache.getRaw(cacheKey);
                    if (StringUtils.isNotBlank(cacheVal)) {
                        try {
                            return (Model) JSON.parseObject(cacheVal, modelClazz);
                        } catch (Exception e) {
                        }
                    }
                }
            }

            Model model = getMapper().getById(modelId);

            if (ctx.left() && model != null && StringUtils.isNotBlank(cacheKey)) {
                EnableCache enableCache = (EnableCache) ctx.middle();
                int expire = enableCache.expire();
                if (expire == -1) {
                    redisCache.put(cacheKey, JSON.toJSONString(model));
                } else {
                    int min = enableCache.randomMin();
                    int max = enableCache.randomMax();
                    if(min != -1 || max != -1) {
                        int random = RandomUtils.getRandomInteger(min <= -1 ? 1 : min, max <= -1 ? 1 : max);
                        expire *= random;
                    }
                    redisCache.put(cacheKey, JSON.toJSONString(model), expire);
                }
            }
            return model;
        } catch (Exception e) {
            logger.error("getById occur error:" + modelId);
        }
        return null;
    }

    public Model getBy(Model model) {
        try {
            Triple<Boolean, Annotation, Class> cache = getReady(EnableCache.Method.GETBY);
            String cacheKey = "";
            if (cache.left()) {
                cacheKey = model.getClass().getName() + "#params=" + JSON.toJSONString(model) + "";
                if(StringUtils.isNotBlank(cacheKey)) {
                    String cacheVal = redisCache.getRaw(cacheKey);
                    if (StringUtils.isNotBlank(cacheVal)) {
                        try {
                            return (Model) JSON.parseObject(cacheVal, model.getClass());
                        } catch (Exception e) {
                        }
                    }
                }
            }

            Model result = getMapper().getBy(model);

            if (cache.left() && result != null && StringUtils.isNotBlank(cacheKey)) {
                EnableCache enableCache = (EnableCache) cache.middle();
                int expire = enableCache.expire();
                if (expire == -1) {
                    redisCache.put(cacheKey, JSON.toJSONString(result));
                } else {
                    int min = enableCache.randomMin();
                    int max = enableCache.randomMax();
                    if(min != -1 || max != -1) {
                        int random = RandomUtils.getRandomInteger(min <= -1 ? 1 : min, max <= -1 ? 1 : max);
                        expire *= random;
                    }
                    redisCache.put(cacheKey, JSON.toJSONString(result), expire);
                }
            }
            if(StringUtils.isNotBlank(cacheKey)) {
                rememberKeys(model.getClass(), cacheKey);
            }
            return result;
        } catch (Exception e) {
            logger.error("getBy occur error", e);
        }
        return null;
    }


    public int countAll() {
        Model model = newModel();
        if(model == null) {
            return 0;
        }
        return countAll(model);
    }

    public int countAll(Model model) {
        try {
            Triple<Boolean, Annotation, Class> cache = getReady(EnableCache.Method.COUNT);
            String cacheKey = "";
            if (cache.left()) {
                cacheKey = "[count]" + model.getClass().getName() + "#params=" + JSON.toJSONString(model) + "";
                if(StringUtils.isNotBlank(cacheKey)) {
                    String cacheVal = redisCache.getRaw(cacheKey);
                    if (StringUtils.isNotBlank(cacheVal)) {
                        return NumberUtils.toInt(cacheVal);
                    }
                }
            }

            Integer count = getMapper().countAll(model);
            count = count == null ? 0 : count;

            if (cache.left() && StringUtils.isNotBlank(cacheKey)) {
                EnableCache enableCache = (EnableCache) cache.middle();
                int expire = enableCache.expire();
                if (expire == -1) {
                    redisCache.put(cacheKey, count + "");
                } else {
                    int min = enableCache.randomMin();
                    int max = enableCache.randomMax();
                    if(min != -1 || max != -1) {
                        int random = RandomUtils.getRandomInteger(min <= -1 ? 1 : min, max <= -1 ? 1 : max);
                        expire *= random;
                    }
                    redisCache.put(cacheKey, count + "", expire);
                }
            }
            if(StringUtils.isNotBlank(cacheKey)) {
                rememberKeys(model.getClass(), cacheKey);
            }
            return count;
        } catch (Exception e) {
            logger.error("count all occur error", e);
        }
        return 0;
    }

    public List<Model> listByPage(DBPage page) {
        Model model = newModel();
        if(model == null) {
            return new ArrayList<>(0);
        }
        return listByPage(model, page);
    }

    public List<Model> listByPage(Model model) {
        if (model == null) {
            return new ArrayList<>(0);
        }
        return listByPage(model, DBPage.maxPage());
    }

    public List<Model> listByPage(Model model, DBPage page) {
        try {
            Triple<Boolean, Annotation, Class> cache = getReady(EnableCache.Method.LIST);
            if(!cache.left()) {
                List<Model> models = getMapper().listByPage(model, page.getStartRow(), page.getPageSize());
                return CollectionUtils.isEmpty(models) ? new ArrayList<Model>(0) : models;
            }
            String cacheKey = "";
            if (cache.left()) {
                cacheKey = "[list]" + model.getClass().getName() + "#params=" + JSON.toJSONString(model) + "#page=" + page.getPage() + "#pageSize=" + page.getPageSize();
                if(StringUtils.isNotBlank(cacheKey)) {
                    String cacheVal = redisCache.getRaw(cacheKey);
                    if (StringUtils.isNotBlank(cacheVal)) {
                        Iterator<String> ids = Splitter.on(",").split(cacheVal).iterator();
                        List<Model> models = new ArrayList<Model>();
                        while(ids.hasNext()) {
                            int id = NumberUtils.toInt(ids.next());
                            if(id > 0) {
                                Model byId = getById(id);
                                if(byId != null) {
                                    models.add(byId);
                                }
                            }
                        }
                        return models;
                    }
                }
            }

            List<Model> models = null;
            List<Integer> ids = getMapper().listIdByPage(model, page.getStartRow(), page.getPageSize());

            if (cache.left() && !CollectionUtils.isEmpty(ids) && StringUtils.isNotBlank(cacheKey)) {
                models = new ArrayList<Model>(ids.size());
                EnableCache enableCache = (EnableCache) cache.middle();
                for(Integer id : ids) {
                    Model byId = getById(id);
                    if (byId != null) {
                        models.add(byId);
                    }
                }
                int expire = enableCache.expire();
                if (expire == -1) {
                    redisCache.put(cacheKey, Joiner.on(",").join(ids));
                } else {
                    int min = enableCache.randomMin();
                    int max = enableCache.randomMax();
                    if(min != -1 || max != -1) {
                        int random = RandomUtils.getRandomInteger(min <= -1 ? 1 : min, max <= -1 ? 1 : max);
                        expire *= random;
                    }
                    redisCache.put(cacheKey, Joiner.on(",").join(ids), expire);
                }
            }

            if(StringUtils.isNotBlank(cacheKey)) {
                rememberKeys(model.getClass(), cacheKey);
            }
            return CollectionUtils.isEmpty(models) ? new ArrayList<Model>(0) : models;
        } catch (Exception e) {
            logger.error("listByPage occur error", e);
        }
        return new ArrayList<Model>(0);
    }

    private Model newModel() {
        try {
            Class modelClazz = ClassUtil.getClassGenericType(getClass(), 0);
            if(modelClazz != null) {
                return (Model) modelClazz.newInstance();
            }
        } catch (Exception e) {
        }
        return null;
    }

    private Triple<Boolean, Annotation, Class> getReady(EnableCache.Method method) {
        try {
            Class modelClazz = ClassUtil.getClassGenericType(getClass(), 0);
            if (modelClazz != null) {
                EnableCache enableCache = (EnableCache) modelClazz.getAnnotation(EnableCache.class);
                if (enableCache != null) {
                    EnableCache.Method[] methods = enableCache.excludeMethods();
                    if(methods != null && methods.length > 0) {
                        for(EnableCache.Method it : methods) {
                            if(method != null && it.name().equals(method.name())) {
                                return new Triple<>(false, null, null);
                            }
                        }
                    }
                    return new Triple<>(true, enableCache, modelClazz);
                }
            }
        } catch (Exception e) {
        }
        return new Triple<>(false, null, null);
    }

    /**
     * 记住对象关联的key，以便根据id删除和更新的时候，能够找回对象相关的缓存进行清除（evict）。
     * @param modelClass
     * @param key
     */
    private void rememberKeys(Class modelClass, String key) {
        redisCache.zaddOne("[keys]" + modelClass.getName(), 0, key);
    }

    private void evictKeys(Class modelClass, boolean flushList) {
        Set<String> keys = redisCache.zrange("[keys]" + modelClass.getName(), 0, -1);
        if(!CollectionUtils.isEmpty(keys)) {
            for(String key : keys) {
                // 对象更新的时候，list和count的缓存可以不清除
                if((StringUtils.startsWith(key, "[list]") || StringUtils.startsWith(key, "[count]")) && !flushList) {
                    continue;
                }
                redisCache.remove(key);
                redisCache.zrem("[keys]" + modelClass.getName(), key);
            }
        }
    }
}