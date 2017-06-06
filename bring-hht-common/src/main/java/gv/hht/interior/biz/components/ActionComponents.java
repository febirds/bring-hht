package gv.hht.interior.biz.components;

import gv.hht.utils.db.DBPage;

/**
 *
 * @author Runshine
 * @since 2015-6-8
 * @version 1.0.0
 *
 */
public interface ActionComponents {
    String Success = "操作成功";
    String DBError = "数据库异常";
    Integer invalidId = -1;

    /**
     * 给不需要分页的listByPage提供一个默认的事实不可变DBPage
     */
    DBPage nonDBPage = new DBPage() {
        @Override
        public void setTotalRow(int totalRow) {

        }

        @Override
        public void setPageSize(int pageSize) {

        }

        @Override
        public void setPage(int page) {

        }
    };
}
