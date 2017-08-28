/**
 * CalculatorServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package gv.hht.web.ws;

public class CalculatorServiceLocator extends org.apache.axis.client.Service implements CalculatorService {

    public CalculatorServiceLocator() {
    }


    public CalculatorServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public CalculatorServiceLocator(String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for CalculatorPort
    private String CalculatorPort_address = "http://tg6rhr.natappfree.cc/WebChargePro/CalculatorPort";

    public String getCalculatorPortAddress() {
        return CalculatorPort_address;
    }

    // The WSDD service name defaults to the port name.
    private String CalculatorPortWSDDServiceName = "CalculatorPort";

    public String getCalculatorPortWSDDServiceName() {
        return CalculatorPortWSDDServiceName;
    }

    public void setCalculatorPortWSDDServiceName(String name) {
        CalculatorPortWSDDServiceName = name;
    }

    public CalculatorDelegate getCalculatorPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(CalculatorPort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getCalculatorPort(endpoint);
    }

    public CalculatorDelegate getCalculatorPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            CalculatorPortBindingStub _stub = new CalculatorPortBindingStub(portAddress, this);
            _stub.setPortName(getCalculatorPortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setCalculatorPortEndpointAddress(String address) {
        CalculatorPort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (CalculatorDelegate.class.isAssignableFrom(serviceEndpointInterface)) {
                CalculatorPortBindingStub _stub = new CalculatorPortBindingStub(new java.net.URL(CalculatorPort_address), this);
                _stub.setPortName(getCalculatorPortWSDDServiceName());
                return _stub;
            }
        }
        catch (Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        String inputPortName = portName.getLocalPart();
        if ("CalculatorPort".equals(inputPortName)) {
            return getCalculatorPort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://ws.myeclipseide.com/", "CalculatorService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://ws.myeclipseide.com/", "CalculatorPort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(String portName, String address) throws javax.xml.rpc.ServiceException {

if ("CalculatorPort".equals(portName)) {
            setCalculatorPortEndpointAddress(address);
        }
        else
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
