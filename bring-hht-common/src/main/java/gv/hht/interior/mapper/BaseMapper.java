package gv.hht.interior.mapper;

import gv.hht.model.BaseModel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 *
 * @author Runshine
 * @since 2015-5-25
 * @version 1.0.0
 *
 */
public interface BaseMapper<Model extends BaseModel> {
    int create(Model model);

    int delete(int modelId);

    int update(Model model);

    Model getById(int modelId);

    Model getBy(Model model);

    int countAll(Model model);

    List<Model> listByPage(@Param("model") Model model, @Param("startRow") int startRow, @Param("pageSize") int pageSize);

    List<Integer> listIdByPage(@Param("model") Model model, @Param("startRow") int startRow, @Param("pageSize") int pageSize);
}
