package gv.hht.utils.upload;

import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by wanp on 16-12-15.
 */
public class CommonsMultipartResolverUtil extends CommonsMultipartResolver {
    @Override
    public boolean isMultipart(HttpServletRequest request) {
        String url = request.getRequestURI();
        if (url!=null && url.contains("fileUpload")) {
            return false;
        } else {
            return super.isMultipart(request);
        }
    }
}