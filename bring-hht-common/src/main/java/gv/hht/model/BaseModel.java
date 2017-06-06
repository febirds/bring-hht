package gv.hht.model;

import java.io.Serializable;

/**
 *
 * @author Runshine
 * @since 2015-6-11
 * @version 1.0.0
 *
 */
public interface BaseModel extends Serializable {
    Integer Status_enable = 0;
    Integer Status_disable = 1;

    Integer getId();

    void setId(Integer id);
}
