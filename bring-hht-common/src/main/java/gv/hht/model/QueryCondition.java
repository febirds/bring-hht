package gv.hht.model;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * 用于创建DAO层使用的查询条件，可以设置分页条件。<br/>
 * model是实际要设置的"实体bean"。<br/>
 * page是分页查询时所需要的第N页，默认是第1页。<br/>
 * pageSize是分页查询时每页的结果数，默认是20条。<br/>
 * totalRow是分页查询时需要给予的数据条数总量，方便确定正确的总页数。对某些不关心精确总页数的情形，可以不设置使用默认总量。<br/>
 *
 * @author Runshine
 * @since 2014-10-08
 * @version 1.0.0
 *
 */
public class QueryCondition<T> {
    private static final int default_page = 1;
    private static final int default_page_size = 20;
    private static final int default_total_row = Integer.MAX_VALUE;
    private T model;
    private int page = default_page;
    private int pageSize = default_page_size;
    private int totalRow = default_total_row;

    public static final String DESC = "desc";
    public static final String ASC = "asc";

    private Map<String, String> orderBy = new HashMap<String, String>(8);

    public QueryCondition() {}
    public QueryCondition(int page, int pageSize) {
        this.page = page;
        this.pageSize = pageSize;
    }

    public void orderBy(String col, String sort) {
        orderBy.put(col, sort);
    }

    public static <T> QueryCondition<T> with(T model, int pageNo, int pageSize) {
        QueryCondition<T> qc = new QueryCondition<T>();
        qc.setModel(model);
        qc.setPage(pageNo);
        qc.setPageSize(pageSize);
        return qc;
    }

    public static <T> QueryCondition<T> with(T model) {
        QueryCondition<T> qc = new QueryCondition<T>();
        qc.setModel(model);
        return qc;
    }

    public static <T> QueryCondition<T> with(int pageNo, int pageSize) {
        QueryCondition<T> qc = new QueryCondition<T>();
        qc.setPage(pageNo);
        qc.setPageSize(pageSize);
        return qc;
    }

    public T getModel() {
        return model;
    }

    public void setModel(T model) {
        this.model = model;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = (page < 1) ? default_page : page;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = (pageSize < 1) ? default_page_size : pageSize;
    }

    private int _getStartRow() {
        return (getPage() - 1) * getPageSize();
    }

    public int getStartRow() {
        int hopeRow = _getStartRow();
        if (totalRow > hopeRow) {
            return hopeRow;
        } else {
            setPage(getTotalPage());
            return _getStartRow();
        }
    }

    public int getTotalRow() {
        return totalRow;
    }

    public void setTotalRow(int totalRow) {
        this.totalRow = totalRow;
    }

    public int getTotalPage() {
        int totalRow1 = getTotalRow();
        int pageSize1 = getPageSize();
        int page = totalRow1 / pageSize1;
        page += (totalRow1 % pageSize1 == 0 ? 0 : 1);

        return page;
    }

    public Map<String, String> getOrderBy() {
        return orderBy;
    }
}
