package gv.hht.utils.security.rejectflush;

import gv.hht.utils.cache.Cache;
import gv.hht.utils.common.SerializeUtil;
import gv.hht.utils.json.JsonResult;
import gv.hht.utils.security.GeneralSecretUtil;
import net.sourceforge.jeval.EvaluationException;
import net.sourceforge.jeval.Evaluator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Random;

/**
 *
 * @author Runshine
 * @since 2015-7-13
 * @version 1.0.0
 *
 */
@Controller
public class UserIdentityRationalityValidationController {
    private static final String keyPref = "RejectFlushController:";
    private static final String keyCountPref = "RejectFlushCountController:";
    private static final int sec = 120;

    private Cache cache;

    public Cache getCache() {
        return cache;
    }

    public void setCache(Cache cache) {
        this.cache = cache;
    }

    @RequestMapping("/userx/identity/rationality/validation/{blackKey}")
    public String RequestMapping(@PathVariable("blackKey") String blackKey, HttpServletRequest request, Model model) throws IOException {
        model.addAttribute("blackKey", blackKey);
        return "screen/user/identity/rationality/validation";
    }

    @RequestMapping("/userx/identity/rationality/validation/image")
    public void image(HttpServletRequest request, HttpServletResponse response) throws IOException, EvaluationException {
        String key = keyPref + request.getSession().getId();

        String expression = expression();
        Evaluator evaluator = new Evaluator();
        int evaluate = (int)evaluator.getNumberResult(expression);
        BufferedImage image = randomImage(expression);

        cache.put(key, evaluate, sec);

        ServletOutputStream out = response.getOutputStream();
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ImageIO.write(image, "JPG", bos);
        byte[] buf = bos.toByteArray();

        response.setContentLength(buf.length);
        out.write(buf);
        bos.close();
        out.close();
    }

    private final char[] symbol = {'+', '-', '*', '+', '-', '*'};
    private final int expressionLength = 10 + 1;

    private String expression() {
        StringBuilder stringBuilder = new StringBuilder(16);
        Random r = new Random();
        int n1 = r.nextInt(expressionLength);
        int n2 = r.nextInt(expressionLength);
        int n3 = r.nextInt(expressionLength);
        int n4 = r.nextInt(expressionLength);

        int s1 = r.nextInt(symbol.length);
        int s2 = r.nextInt(symbol.length);
        int s3 = r.nextInt(symbol.length);

        return stringBuilder.append(n1).append(' ').append(symbol[s1]).append(' ').append(n2).append(' ').append(symbol[s2]).append(' ').append(n3).append(' ').append(symbol[s3]).append(' ').append(n4).toString();
    }

    private static int WIDTH = 200;
    private static int HEIGHT = 40;

    private static int RED = 240;
    private static int GREEN = 238;
    private static int BLUE = 229;

    private BufferedImage randomImage(String key) {
        key = key.replaceAll("\\*", "x") + " = ?";
        // Random r = new Random();
        BufferedImage image = new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);

        Graphics g = image.getGraphics();
        g.setColor(new Color(RED, GREEN, BLUE));
        g.fillRect(0, 0, WIDTH, HEIGHT);

        int NUM = key.length();
        for(int i = 0; i < NUM; i++) {
            g.setColor(new Color(0, 0, 0));
            g.setFont(new Font(Integer.toString(Font.ITALIC), Font.ITALIC, 20));
            g.drawString(key.substring(i, i + 1), (((i * WIDTH) / NUM + 10) * 90) / 100, 30);
        }
        return image;
    }

    @RequestMapping("/userx/identity/rationality/validation/action/{blackKey}")
    @ResponseBody
    public JsonResult action(@PathVariable("blackKey") String blackKey, @RequestParam("code") int code, HttpServletRequest request, HttpServletResponse response) throws IOException {
        String key = keyPref + request.getSession().getId();
        Object cc = cache.get(key);

        if(cc == null) {
            return new JsonResult(false, "验证码已过期");
        } else {
            String key2 = keyCountPref + request.getSession().getId();
            Long count = cache.incrBy(key2, 1, sec);

            if(count > 3) {
                return new JsonResult(false, "超过最大验证次数，请" + sec + "秒后再试");
            } else if(cc.equals(code)) {
                cache.del(key);
                cache.del(key2);
                byte[] decode = GeneralSecretUtil.decode(blackKey);
                Object blackKeyList = SerializeUtil.unserialize(decode);
                cache.del(blackKeyList.toString()); //移出黑名单

                return new JsonResult(true, "验证通过").addResult("direct", "/")
                        .addResult("appType", "home").addResult("appDirect", "");
            } else {
                return new JsonResult(false, "验证码输入错误");
            }
        }

    }
}
