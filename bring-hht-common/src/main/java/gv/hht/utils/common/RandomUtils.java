package gv.hht.utils.common;

import org.apache.commons.lang3.RandomStringUtils;

import java.util.Random;

/**
 * Created by spark on 2015/12/2.
 */
public class RandomUtils {
    /**
     * 获取一个长度为count的随机数字字符串
     * @param count
     * @return
     */
    public static String getRandomNumericString(int count) {
        return RandomStringUtils.randomNumeric(count);
    }

    public static int getRandomInteger(int min,int max){
        Random random = new Random();
        return random.nextInt(max)%(max-min+1) + min;

    }
}
