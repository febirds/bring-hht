/**
 * CalculatorDelegate.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package gv.hht.web.ws;

public interface CalculatorDelegate extends java.rmi.Remote {
    public CustomerVo[] getCustomerAll(String arg0, String arg1) throws java.rmi.RemoteException;
    public UserInfoVo[] getUserInfoAll(String arg0) throws java.rmi.RemoteException;
    public AreaInfoVo[] syn_area_info(String arg0) throws java.rmi.RemoteException;
    public ProductInfoVo[] syn_product_info(String arg0) throws java.rmi.RemoteException;
    public UserPdtRltVo[] getUserPdtRltInfo(String arg0) throws java.rmi.RemoteException;
    public UserDevRltVo[] getUserDevRltInfo(String arg0) throws java.rmi.RemoteException;
    public UserPtabVo[] getUserPtabInfo(String arg0, String arg1, String arg2) throws java.rmi.RemoteException;
    public UserPtabDetailVo[] getPtabDetailAll(String arg0) throws java.rmi.RemoteException;
    public UserPdtOrderChgVo[] getUserPdtOrderChgAll(String arg0, String arg1) throws java.rmi.RemoteException;
    public UserDevHTBchgVo[] getUserDevHTBchgAll(String arg0, String arg1, String arg2) throws java.rmi.RemoteException;
    public UserDevPurchaseChgVo[] getUserDevPurchaseAll(String arg0) throws java.rmi.RemoteException;
    public UserCardCtmCardRltVo[] getUserCardCtmCardAll(String arg0) throws java.rmi.RemoteException;
    public ResultVo[] chargePriceByCall(String arg0, String arg1, String arg2) throws java.rmi.RemoteException;
    public ResultVo[] updateCustomerInfo(String arg0, String arg1, String arg2) throws java.rmi.RemoteException;
    public ResultVo[] ht_charge_pdt_judge(String arg0, String arg1, String arg2, String arg3, String arg4, String arg5, String arg6) throws java.rmi.RemoteException;
    public ResultVo[] ht_charge_pdt(String arg0, String arg1, String arg2, String arg3, String arg4, String arg5, String arg6) throws java.rmi.RemoteException;
}
