package gv.hht.web.controller;

import gv.hht.web.ws.CalculatorDelegate;
import gv.hht.web.ws.CalculatorServiceLocator;
import gv.hht.web.ws.UserCardCtmCardRltVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by wanp on 17-6-16.
 */
@Controller
public class ProductController {

    @RequestMapping("/queryProduct")
    public String queryProductEndTime() {
        return "queryProduct/add";
    }

    public static void main(String[] argv) {
        try {
            CalculatorServiceLocator locator = new CalculatorServiceLocator();
            CalculatorDelegate service = locator.getCalculatorPort();
            // If authorization is required
            //((CalculatorPortBindingStub)service).setUsername("user3");
            //((CalculatorPortBindingStub)service).setPassword("pass3");
            // invoke business method
            UserCardCtmCardRltVo[] vos = service.getUserCardCtmCardAll("8471502365004215");
            System.out.println("========"+vos[0].getCardNo());
        } catch (javax.xml.rpc.ServiceException ex) {
            ex.printStackTrace();
        } catch (java.rmi.RemoteException ex) {
            ex.printStackTrace();
        }
    }

}
