package gv.hht.utils.email;
import java.util.Date;
import java.util.Properties;
import javax.mail.Address;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
/**
 * Created by Alienware on 2017/2/7.
 */
public class SimpleMailSender {
    /**
     *      */
    /**
     * 以文本格式发送邮件
     *
     * @param mailInfo 待发送的邮件的信息
     */
    public static boolean sendTextMail(MailSenderInfo mailInfo) {
        // 判断是否需要身份认证
        MyAuthenticator authenticator = null;
        Properties pro = mailInfo.getProperties();
        if (mailInfo.isValidate()) {
            // 如果需要身份认证，则创建一个密码验证器
            authenticator = new MyAuthenticator(mailInfo.getUserName(), mailInfo.getPassword());
        }
        // 根据邮件会话属性和密码验证器构造一个发送邮件的session
        Session sendMailSession = Session.getInstance(pro, authenticator);
        try {
            // 根据session创建一个邮件消息
            Message mailMessage = new MimeMessage(sendMailSession);
            // 创建邮件发送者地址
            Address from = new InternetAddress(mailInfo.getFromAddress());
            // 设置邮件消息的发送者
            mailMessage.setFrom(from);
            // 创建邮件的接收者地址，并设置到邮件消息中
            Address to = new InternetAddress(mailInfo.getToAddress());
            mailMessage.setRecipient(Message.RecipientType.TO, to);
            // 设置邮件消息的主题
            mailMessage.setSubject(mailInfo.getSubject());
            // 设置邮件消息发送的时间
            mailMessage.setSentDate(new Date());
            // 设置邮件消息的主要内容
            String mailContent = mailInfo.getContent();
            mailMessage.setText(mailContent);
            // 发送邮件
            Transport.send(mailMessage);
            return true;
        } catch (MessagingException ex) {
            System.out.println("can't sendemail,the messages is :"+ex.getMessage());
            ex.printStackTrace();
        }
        return false;
    }

    /**
     *      */
    /**
     * 以HTML格式发送邮件
     *
     * @param mailInfo 待发送的邮件信息
     */
    public static boolean sendHtmlMail(MailSenderInfo mailInfo) {
        // 判断是否需要身份认证
        MyAuthenticator authenticator = null;
        Properties pro = mailInfo.getProperties();
        //如果需要身份认证，则创建一个密码验证器
        if (mailInfo.isValidate()) {
            authenticator = new MyAuthenticator(mailInfo.getUserName(), mailInfo.getPassword());
        }
        // 根据邮件会话属性和密码验证器构造一个发送邮件的session
        Session sendMailSession = Session.getInstance(pro, authenticator);
        try {
            // 根据session创建一个邮件消息
            Message mailMessage = new MimeMessage(sendMailSession);
            // 创建邮件发送者地址
            Address from = new InternetAddress(mailInfo.getFromAddress());
            // 设置邮件消息的发送者
            mailMessage.setFrom(from);
            // 创建邮件的接收者地址，并设置到邮件消息中
            Address to = new InternetAddress(mailInfo.getToAddress());
            // Message.RecipientType.TO属性表示接收者的类型为TO
            mailMessage.setRecipient(Message.RecipientType.TO, to);
            // 设置邮件消息的主题
            mailMessage.setSubject(mailInfo.getSubject());
            // 设置邮件消息发送的时间
            mailMessage.setSentDate(new Date());
            // MiniMultipart类是一个容器类，包含MimeBodyPart类型的对象
            Multipart mainPart = new MimeMultipart();
            // 创建一个包含HTML内容的MimeBodyPart
            BodyPart html = new MimeBodyPart();
            // 设置HTML内容
            html.setContent(mailInfo.getContent(), "text/html; charset=utf-8");
            mainPart.addBodyPart(html);
            // 将MiniMultipart对象设置为邮件内容
            mailMessage.setContent(mainPart);
            // 发送邮件
            Transport.send(mailMessage);
            return true;
        } catch (MessagingException ex) {
            System.out.println("can't sendemail,the messages is :"+ex.getMessage());
            ex.printStackTrace();
        }
        return false;
    }

    public static void main(String[] args) {
        MailSenderInfo info = new MailSenderInfo();
        info.setToAddress("369504543@qq.com");
        info.setSubject("萄語國家信息網 - 密碼修改");
        String content = "<p>\n" +
                "    <span style=\"font-family:宋体\">致（<span style=\"color:red\">主辦單位</span>）：</span>\n" +
                "</p>\n" +
                "<p>\n" +
                "    <span style=\"font-family:宋体\">您好！</span>\n" +
                "</p>\n" +
                "<p>\n" +
                "    <span style=\"font-family:宋体\">我們是中國</span>-<span style=\"font-family:宋体\">葡語國家經貿合作及人才信息網（簡稱：信息網），一個致力為促進中葡平台發展的信息類型網站。現有我們網站用戶對貴單位主辦的（<span style=\"color:red\">會展名稱</span>）有參展意向，經用戶同意的情況下，我們將轉介用戶信息予貴單位，勞請與其聯繫協助參展事宜：</span>\n" +
                "</p>\n" +
                "<table>\n" +
                "    <tbody>\n" +
                "        <tr class=\"firstRow\">\n" +
                "            <td width=\"142\" valign=\"top\" style=\"border-width: 1px; border-color: windowtext; padding: 0px 7px;\">\n" +
                "                <p>\n" +
                "                    <span style=\"font-family:宋体\">名字</span>\n" +
                "                </p>\n" +
                "            </td>\n" +
                "            <td width=\"142\" valign=\"top\" style=\"border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-left: none; padding: 0px 7px;\">\n" +
                "                <p>\n" +
                "                    <span style=\"font-family:宋体\">電子郵箱</span>\n" +
                "                </p>\n" +
                "            </td>\n" +
                "            <td width=\"142\" valign=\"top\" style=\"border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-left: none; padding: 0px 7px;\">\n" +
                "                <p>\n" +
                "                    <span style=\"font-family:宋体\">聯繫電話</span>\n" +
                "                </p>\n" +
                "            </td>\n" +
                "            <td width=\"142\" valign=\"top\" style=\"border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-left: none; padding: 0px 7px;\">\n" +
                "                <p>\n" +
                "                    <span style=\"font-family:宋体\">備註</span>\n" +
                "                </p>\n" +
                "            </td>\n" +
                "        </tr>\n" +
                "        <tr>\n" +
                "            <td width=\"142\" valign=\"top\" style=\"border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;\"></td>\n" +
                "            <td width=\"142\" valign=\"top\" style=\"border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;\"></td>\n" +
                "            <td width=\"142\" valign=\"top\" style=\"border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;\"></td>\n" +
                "            <td width=\"142\" valign=\"top\" style=\"border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px; word-break: break-all;\"></td>\n" +
                "        </tr>\n" +
                "    </tbody>\n" +
                "</table>\n" +
                "<p>\n" +
                "    <br/>\n" +
                "</p>\n" +
                "<p>\n" +
                "    <span style=\"font-size:12px;font-family:宋体\">中國</span><span style=\"font-size:12px\">-</span><span style=\"font-size:12px;font-family:宋体\">葡語國家經貿合作及人才信息網</span>\n" +
                "</p>\n" +
                "<p>\n" +
                "    <span style=\"font-size:12px\">Portal para a Cooperação na Área Económica,</span>\n" +
                "</p>\n" +
                "<p>\n" +
                "    <span style=\"font-size:12px\">Comercial e de Recursos Humanos entre a China</span>\n" +
                "</p>\n" +
                "<p>\n" +
                "    <span style=\"font-size:12px\">e os Países de Língua Portuguesa</span>&nbsp;\n" +
                "</p>\n" +
                "<p>\n" +
                "    <span style=\"font-size:12px;font-family:宋体\">電話</span><span style=\"font-size:12px\">/Tel</span><span style=\"font-size:12px;font-family:宋体\">∥</span><span style=\"font-size:12px\">(853) 8798 9693 / 2872 8328 </span>\n" +
                "</p>\n" +
                "<p>\n" +
                "    <span style=\"font-size:12px;font-family:宋体\">傳真</span><span style=\"font-size:12px\">/Fax</span><span style=\"font-size:12px;font-family:宋体\">∥</span><span style=\"font-size:12px\">(853) 2872 7506 </span>\n" +
                "</p>\n" +
                "<p>\n" +
                "    <span style=\"font-size:12px;font-family:宋体\">電郵</span><span style=\"font-size:12px\">/Email</span><span style=\"font-size:12px;font-family:宋体\">∥</span><span style=\"font-size:12px\">info@platformchinaplp.mo</span>\n" +
                "</p>\n" +
                "<p>\n" +
                "    <span style=\"font-size:12px;font-family:宋体\">網址</span><span style=\"font-size:12px\">/Website</span><span style=\"font-size:12px;font-family:宋体\">∥</span><span style=\"font-size:12px\">http://www.platformchinaplp.mo</span>\n" +
                "</p>\n" +
                "<p>\n" +
                "    <span style=\"font-size:12px;font-family:宋体\">地</span> <span style=\"font-size:12px;font-family:宋体\">址</span><span style=\"font-size: 12px\">/Address</span><span style=\"font-size:12px;font-family:宋体\">∥澳門宋玉生廣場</span><span style=\"font-size:12px\">263</span><span style=\"font-size:12px;font-family:宋体\">號中土大廈</span><span style=\"font-size:12px\">19-20</span><span style=\"font-size:12px;font-family: 宋体\">樓</span><span style=\"font-size:12px\"> </span>\n" +
                "</p>\n" +
                "<p>\n" +
                "    <span style=\"font-size:12px\">Alameda Dr. Carlos d&#39;Assumpcao No 263 Edif.China Civil Plaza 19-20/F Macau</span>\n" +
                "</p>\n" +
                "<p>\n" +
                "    <br/>\n" +
                "</p>";
        info.setContent(content);
        SimpleMailSender.sendHtmlMail(info);
        System.out.println("over");
    }
}
