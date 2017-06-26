/**
 * CalculatorService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package gv.hht.web.ws;

public interface CalculatorService extends javax.xml.rpc.Service {
    public String getCalculatorPortAddress();

    public CalculatorDelegate getCalculatorPort() throws javax.xml.rpc.ServiceException;

    public CalculatorDelegate getCalculatorPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
