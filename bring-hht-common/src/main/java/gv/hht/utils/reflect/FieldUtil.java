package gv.hht.utils.reflect;

import gv.hht.utils.datastructures.Tuple;

import java.lang.reflect.Field;
import java.util.LinkedList;
import java.util.List;

/**
 *
 * @author Runshine
 * @since 2015-9-25
 * @version 1.0.0
 *
 */
public class FieldUtil {
    /**
     @param bean
     @return 返回bean所有的属性，包括父类链的所有属性. <br/>
     left表示继承的关系，0为当前，1为父类，2为父类的父类...以此类推.<br/>
     Field的accessible为false
     */
    public static List<Tuple<Integer, Field>> listAllFields(Object bean) {
        return listAllFields(bean, false);
    }

    /**
     @param bean
     @return 返回bean所有的属性，包括父类链的所有属性. <br/>
     left表示继承的关系，0为当前，1为父类，2为父类的父类...以此类推
     */
    public static List<Tuple<Integer, Field>> listAllFields(Object bean, boolean accessible) {
        List<Tuple<Integer, Field>> allFields = new LinkedList<>();
        listAllFields(0, bean.getClass(), allFields, accessible);
        return allFields;
    }

    /**
     @return 返回bean所有的属性，包括父类链的所有属性. <br/>
     left表示继承的关系，0为当前，1为父类，2为父类的父类...以此类推.<br/>
     Field的accessible为false
     */
    public static List<Tuple<Integer, Field>> listAllFields(Class<?> clazz) {
        return listAllFields(clazz, false);
    }

    /**
     @return 返回bean所有的属性，包括父类链的所有属性. <br/>
     left表示继承的关系，0为当前，1为父类，2为父类的父类...以此类推
     */
    public static List<Tuple<Integer, Field>> listAllFields(Class<?> clazz, boolean accessible) {
        List<Tuple<Integer, Field>> allFields = new LinkedList<>();
        listAllFields(0, clazz, allFields, accessible);
        return allFields;
    }

    private static void listAllFields(Integer p, Class<?> clazz, List<Tuple<Integer, Field>> allFields, boolean accessible) {
        Field[] declaredFields = clazz.getDeclaredFields();
        if(declaredFields != null) {
            for(Field declaredField : declaredFields) {
                if(accessible) {
                    declaredField.setAccessible(accessible);
                }
                allFields.add(new Tuple<>(p, declaredField));
            }
        }

        Class<?> superclass = clazz.getSuperclass();
        if(superclass != null) {
            listAllFields(p + 1, superclass, allFields, accessible);
        }
    }

    public static void main(String[] args) {
        A a = new A();
        List<Tuple<Integer, Field>> listAllFields = listAllFields(a, true);

        listAllFields.stream().forEach(tup -> System.out.println(tup.right().getType().cast(tup)));
    }
}

class A {
    private String a1;
    private int a2;
    private Integer a3;
    private StringBuilder a4;
}
