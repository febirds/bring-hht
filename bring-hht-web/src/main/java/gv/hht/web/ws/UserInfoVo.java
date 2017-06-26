/**
 * UserInfoVo.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package gv.hht.web.ws;

public class UserInfoVo  implements java.io.Serializable {
    private String addressOne;

    private String addressThress;

    private String addressTwo;

    private String btype;

    private String childOrder;

    private String groupName;

    private String hostUserid;

    private String loadAddress;

    private String opDate;

    private String opName;

    private String status;

    private String userid;

    private String watchHour;

    private String zfType;

    public UserInfoVo() {
    }

    public UserInfoVo(
           String addressOne,
           String addressThress,
           String addressTwo,
           String btype,
           String childOrder,
           String groupName,
           String hostUserid,
           String loadAddress,
           String opDate,
           String opName,
           String status,
           String userid,
           String watchHour,
           String zfType) {
           this.addressOne = addressOne;
           this.addressThress = addressThress;
           this.addressTwo = addressTwo;
           this.btype = btype;
           this.childOrder = childOrder;
           this.groupName = groupName;
           this.hostUserid = hostUserid;
           this.loadAddress = loadAddress;
           this.opDate = opDate;
           this.opName = opName;
           this.status = status;
           this.userid = userid;
           this.watchHour = watchHour;
           this.zfType = zfType;
    }


    /**
     * Gets the addressOne value for this UserInfoVo.
     *
     * @return addressOne
     */
    public String getAddressOne() {
        return addressOne;
    }


    /**
     * Sets the addressOne value for this UserInfoVo.
     *
     * @param addressOne
     */
    public void setAddressOne(String addressOne) {
        this.addressOne = addressOne;
    }


    /**
     * Gets the addressThress value for this UserInfoVo.
     *
     * @return addressThress
     */
    public String getAddressThress() {
        return addressThress;
    }


    /**
     * Sets the addressThress value for this UserInfoVo.
     *
     * @param addressThress
     */
    public void setAddressThress(String addressThress) {
        this.addressThress = addressThress;
    }


    /**
     * Gets the addressTwo value for this UserInfoVo.
     *
     * @return addressTwo
     */
    public String getAddressTwo() {
        return addressTwo;
    }


    /**
     * Sets the addressTwo value for this UserInfoVo.
     *
     * @param addressTwo
     */
    public void setAddressTwo(String addressTwo) {
        this.addressTwo = addressTwo;
    }


    /**
     * Gets the btype value for this UserInfoVo.
     *
     * @return btype
     */
    public String getBtype() {
        return btype;
    }


    /**
     * Sets the btype value for this UserInfoVo.
     *
     * @param btype
     */
    public void setBtype(String btype) {
        this.btype = btype;
    }


    /**
     * Gets the childOrder value for this UserInfoVo.
     *
     * @return childOrder
     */
    public String getChildOrder() {
        return childOrder;
    }


    /**
     * Sets the childOrder value for this UserInfoVo.
     *
     * @param childOrder
     */
    public void setChildOrder(String childOrder) {
        this.childOrder = childOrder;
    }


    /**
     * Gets the groupName value for this UserInfoVo.
     *
     * @return groupName
     */
    public String getGroupName() {
        return groupName;
    }


    /**
     * Sets the groupName value for this UserInfoVo.
     *
     * @param groupName
     */
    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }


    /**
     * Gets the hostUserid value for this UserInfoVo.
     *
     * @return hostUserid
     */
    public String getHostUserid() {
        return hostUserid;
    }


    /**
     * Sets the hostUserid value for this UserInfoVo.
     *
     * @param hostUserid
     */
    public void setHostUserid(String hostUserid) {
        this.hostUserid = hostUserid;
    }


    /**
     * Gets the loadAddress value for this UserInfoVo.
     *
     * @return loadAddress
     */
    public String getLoadAddress() {
        return loadAddress;
    }


    /**
     * Sets the loadAddress value for this UserInfoVo.
     *
     * @param loadAddress
     */
    public void setLoadAddress(String loadAddress) {
        this.loadAddress = loadAddress;
    }


    /**
     * Gets the opDate value for this UserInfoVo.
     *
     * @return opDate
     */
    public String getOpDate() {
        return opDate;
    }


    /**
     * Sets the opDate value for this UserInfoVo.
     *
     * @param opDate
     */
    public void setOpDate(String opDate) {
        this.opDate = opDate;
    }


    /**
     * Gets the opName value for this UserInfoVo.
     *
     * @return opName
     */
    public String getOpName() {
        return opName;
    }


    /**
     * Sets the opName value for this UserInfoVo.
     *
     * @param opName
     */
    public void setOpName(String opName) {
        this.opName = opName;
    }


    /**
     * Gets the status value for this UserInfoVo.
     *
     * @return status
     */
    public String getStatus() {
        return status;
    }


    /**
     * Sets the status value for this UserInfoVo.
     *
     * @param status
     */
    public void setStatus(String status) {
        this.status = status;
    }


    /**
     * Gets the userid value for this UserInfoVo.
     *
     * @return userid
     */
    public String getUserid() {
        return userid;
    }


    /**
     * Sets the userid value for this UserInfoVo.
     *
     * @param userid
     */
    public void setUserid(String userid) {
        this.userid = userid;
    }


    /**
     * Gets the watchHour value for this UserInfoVo.
     *
     * @return watchHour
     */
    public String getWatchHour() {
        return watchHour;
    }


    /**
     * Sets the watchHour value for this UserInfoVo.
     *
     * @param watchHour
     */
    public void setWatchHour(String watchHour) {
        this.watchHour = watchHour;
    }


    /**
     * Gets the zfType value for this UserInfoVo.
     *
     * @return zfType
     */
    public String getZfType() {
        return zfType;
    }


    /**
     * Sets the zfType value for this UserInfoVo.
     *
     * @param zfType
     */
    public void setZfType(String zfType) {
        this.zfType = zfType;
    }

    private Object __equalsCalc = null;
    public synchronized boolean equals(Object obj) {
        if (!(obj instanceof UserInfoVo)) return false;
        UserInfoVo other = (UserInfoVo) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true &&
            ((this.addressOne==null && other.getAddressOne()==null) ||
             (this.addressOne!=null &&
              this.addressOne.equals(other.getAddressOne()))) &&
            ((this.addressThress==null && other.getAddressThress()==null) ||
             (this.addressThress!=null &&
              this.addressThress.equals(other.getAddressThress()))) &&
            ((this.addressTwo==null && other.getAddressTwo()==null) ||
             (this.addressTwo!=null &&
              this.addressTwo.equals(other.getAddressTwo()))) &&
            ((this.btype==null && other.getBtype()==null) ||
             (this.btype!=null &&
              this.btype.equals(other.getBtype()))) &&
            ((this.childOrder==null && other.getChildOrder()==null) ||
             (this.childOrder!=null &&
              this.childOrder.equals(other.getChildOrder()))) &&
            ((this.groupName==null && other.getGroupName()==null) ||
             (this.groupName!=null &&
              this.groupName.equals(other.getGroupName()))) &&
            ((this.hostUserid==null && other.getHostUserid()==null) ||
             (this.hostUserid!=null &&
              this.hostUserid.equals(other.getHostUserid()))) &&
            ((this.loadAddress==null && other.getLoadAddress()==null) ||
             (this.loadAddress!=null &&
              this.loadAddress.equals(other.getLoadAddress()))) &&
            ((this.opDate==null && other.getOpDate()==null) ||
             (this.opDate!=null &&
              this.opDate.equals(other.getOpDate()))) &&
            ((this.opName==null && other.getOpName()==null) ||
             (this.opName!=null &&
              this.opName.equals(other.getOpName()))) &&
            ((this.status==null && other.getStatus()==null) ||
             (this.status!=null &&
              this.status.equals(other.getStatus()))) &&
            ((this.userid==null && other.getUserid()==null) ||
             (this.userid!=null &&
              this.userid.equals(other.getUserid()))) &&
            ((this.watchHour==null && other.getWatchHour()==null) ||
             (this.watchHour!=null &&
              this.watchHour.equals(other.getWatchHour()))) &&
            ((this.zfType==null && other.getZfType()==null) ||
             (this.zfType!=null &&
              this.zfType.equals(other.getZfType())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getAddressOne() != null) {
            _hashCode += getAddressOne().hashCode();
        }
        if (getAddressThress() != null) {
            _hashCode += getAddressThress().hashCode();
        }
        if (getAddressTwo() != null) {
            _hashCode += getAddressTwo().hashCode();
        }
        if (getBtype() != null) {
            _hashCode += getBtype().hashCode();
        }
        if (getChildOrder() != null) {
            _hashCode += getChildOrder().hashCode();
        }
        if (getGroupName() != null) {
            _hashCode += getGroupName().hashCode();
        }
        if (getHostUserid() != null) {
            _hashCode += getHostUserid().hashCode();
        }
        if (getLoadAddress() != null) {
            _hashCode += getLoadAddress().hashCode();
        }
        if (getOpDate() != null) {
            _hashCode += getOpDate().hashCode();
        }
        if (getOpName() != null) {
            _hashCode += getOpName().hashCode();
        }
        if (getStatus() != null) {
            _hashCode += getStatus().hashCode();
        }
        if (getUserid() != null) {
            _hashCode += getUserid().hashCode();
        }
        if (getWatchHour() != null) {
            _hashCode += getWatchHour().hashCode();
        }
        if (getZfType() != null) {
            _hashCode += getZfType().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(UserInfoVo.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://ws.myeclipseide.com/", "userInfoVo"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("addressOne");
        elemField.setXmlName(new javax.xml.namespace.QName("", "addressOne"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("addressThress");
        elemField.setXmlName(new javax.xml.namespace.QName("", "addressThress"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("addressTwo");
        elemField.setXmlName(new javax.xml.namespace.QName("", "addressTwo"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("btype");
        elemField.setXmlName(new javax.xml.namespace.QName("", "btype"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("childOrder");
        elemField.setXmlName(new javax.xml.namespace.QName("", "childOrder"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("groupName");
        elemField.setXmlName(new javax.xml.namespace.QName("", "groupName"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("hostUserid");
        elemField.setXmlName(new javax.xml.namespace.QName("", "hostUserid"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("loadAddress");
        elemField.setXmlName(new javax.xml.namespace.QName("", "loadAddress"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("opDate");
        elemField.setXmlName(new javax.xml.namespace.QName("", "opDate"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("opName");
        elemField.setXmlName(new javax.xml.namespace.QName("", "opName"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("status");
        elemField.setXmlName(new javax.xml.namespace.QName("", "status"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("userid");
        elemField.setXmlName(new javax.xml.namespace.QName("", "userid"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("watchHour");
        elemField.setXmlName(new javax.xml.namespace.QName("", "watchHour"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("zfType");
        elemField.setXmlName(new javax.xml.namespace.QName("", "zfType"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           String mechType,
           Class _javaType,
           javax.xml.namespace.QName _xmlType) {
        return
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           String mechType,
           Class _javaType,
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
