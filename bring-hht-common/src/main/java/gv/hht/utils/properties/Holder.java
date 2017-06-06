package gv.hht.utils.properties;

/**
 *
 * @author Runshine
 * @since 2015-8-11
 * @version 1.0.0
 *
 */
public class Holder {
    private String uploadPath;
    private boolean taskDevMode;
    private boolean despatchDevmode;

    public boolean isTaskDevMode() {
        return taskDevMode;
    }

    public void setTaskDevMode(String taskDevMode) {
        if("true".equalsIgnoreCase(taskDevMode) || "false".equalsIgnoreCase(taskDevMode)) {
            this.taskDevMode = Boolean.valueOf(taskDevMode);
        } else {
            this.taskDevMode = false;
        }
    }

    public String getUploadPath() {
        return uploadPath;
    }

    public void setUploadPath(String uploadPath) {
        this.uploadPath = uploadPath;
    }

    public boolean isDespatchDevmode() {
        return despatchDevmode;
    }

    //使用String防止意外
    public void setDespatchDevmode(String despatchDevmode) {
        if("true".equalsIgnoreCase(despatchDevmode) || "false".equalsIgnoreCase(despatchDevmode)) {
            this.despatchDevmode = Boolean.valueOf(despatchDevmode);
        } else {
            this.despatchDevmode = false;
        }
    }
}
