package gv.hht.utils.common;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.Map;

/**
 * Created by spark on 2015/11/12.
 */
public class LocaleMessageHolder {
    protected Log logger = LogFactory.getLog(this.getClass());

    private static LocaleMessageHolder instance = new LocaleMessageHolder();

    private volatile Map<String, Map<String, String>> messages;

    private static volatile boolean isLoading;


    /*private LocaleMessageHolder() {
        messages = loading();
    }

    private Map<String, Map<String, String>> loading() {
        Map<String, Map<String, String>> messages = new HashMap<>();
        Sephomei18nService sephomei18nService = ApplicationContextUtils.getBean(Sephomei18nService.class);
        List<String> locales = sephomei18nService.getAllLocales();
        if (CollectionUtils.isEmpty(locales)) {
            logger.error("读取localmap出错，请检查数据库或者网络链接！");
            throw new IllegalStateException("读取localmap出错，请检查数据库或者网络链接！");
        }
        for (String locale : locales) {
            List<LocaleMessage> localMessages = sephomei18nService.getLocalMessages(locale);
            if (CollectionUtils.isEmpty(localMessages)) {
                logger.warn("没有找到对应的localeMessages:" + locale);
                continue;
            }
            HashMap<String, String> localeMessageMap = new HashMap<>();
            messages.put(locale, localeMessageMap);
            for (LocaleMessage localMessage : localMessages) {
                localeMessageMap.put(localMessage.getKey(), localMessage.getValue());
            }

        }

        return messages;
    }*/

    /*public static void reload() {
        if (isLoading) {
            return;
        }
        isLoading = true;
        Map<String, Map<String, String>> reloadedMessages = null;
        try {
            reloadedMessages = LocaleMessageHolder.getInstance().loading();
        } catch (Exception ex) {
            LocaleMessageHolder.getInstance().logger.error("重新读取国家化数据错误");
        }
        if (reloadedMessages != null) {
            LocaleMessageHolder.getInstance().messages = reloadedMessages;
        }
        isLoading = false;
    }*/

    public static LocaleMessageHolder getInstance() {
        return instance;
    }

    public String getLocaleMessage(String messageKey) {
        String currentlocale = Constant.localeThreadLocal.get();
        if (StringUtils.isNotBlank(currentlocale)) {
            Map<String, String> currentLocalMap = messages.get(currentlocale);
            if (currentLocalMap != null) {
                String message = currentLocalMap.get(messageKey);
                return message == null ? getDefaultLocaleMessage(messageKey) : message;
            } else {
                return getDefaultLocaleMessage(messageKey);
            }
        } else {
            return getDefaultLocaleMessage(messageKey);
        }

    }

    private String getDefaultLocaleMessage(String messageKey) {
        String message = messages.get("zh_cn").get(messageKey);
        return message == null ? messageKey : message;
    }

    public static String slm(String messageKey) {
        return LocaleMessageHolder.getInstance().getLocaleMessage(messageKey);

    }
}
