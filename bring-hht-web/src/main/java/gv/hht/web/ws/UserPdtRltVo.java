/**
 * UserPdtRltVo.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package gv.hht.web.ws;

public class UserPdtRltVo  implements java.io.Serializable {
    private String jftype;

    private String orderType;

    private String pdtId;

    private String pdtName;

    private String pdtType;

    private String userId;

    private String bDate;

    private String eDate;

    public UserPdtRltVo() {
    }

    public UserPdtRltVo(
           String jftype,
           String orderType,
           String pdtId,
           String pdtName,
           String pdtType,
           String userId,
           String bDate,
           String eDate) {
           this.jftype = jftype;
           this.orderType = orderType;
           this.pdtId = pdtId;
           this.pdtName = pdtName;
           this.pdtType = pdtType;
           this.userId = userId;
           this.bDate = bDate;
           this.eDate = eDate;
    }


    /**
     * Gets the jftype value for this UserPdtRltVo.
     *
     * @return jftype
     */
    public String getJftype() {
        return jftype;
    }


    /**
     * Sets the jftype value for this UserPdtRltVo.
     *
     * @param jftype
     */
    public void setJftype(String jftype) {
        this.jftype = jftype;
    }


    /**
     * Gets the orderType value for this UserPdtRltVo.
     *
     * @return orderType
     */
    public String getOrderType() {
        return orderType;
    }


    /**
     * Sets the orderType value for this UserPdtRltVo.
     *
     * @param orderType
     */
    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }


    /**
     * Gets the pdtId value for this UserPdtRltVo.
     *
     * @return pdtId
     */
    public String getPdtId() {
        return pdtId;
    }


    /**
     * Sets the pdtId value for this UserPdtRltVo.
     *
     * @param pdtId
     */
    public void setPdtId(String pdtId) {
        this.pdtId = pdtId;
    }


    /**
     * Gets the pdtName value for this UserPdtRltVo.
     *
     * @return pdtName
     */
    public String getPdtName() {
        return pdtName;
    }


    /**
     * Sets the pdtName value for this UserPdtRltVo.
     *
     * @param pdtName
     */
    public void setPdtName(String pdtName) {
        this.pdtName = pdtName;
    }


    /**
     * Gets the pdtType value for this UserPdtRltVo.
     *
     * @return pdtType
     */
    public String getPdtType() {
        return pdtType;
    }


    /**
     * Sets the pdtType value for this UserPdtRltVo.
     *
     * @param pdtType
     */
    public void setPdtType(String pdtType) {
        this.pdtType = pdtType;
    }


    /**
     * Gets the userId value for this UserPdtRltVo.
     *
     * @return userId
     */
    public String getUserId() {
        return userId;
    }


    /**
     * Sets the userId value for this UserPdtRltVo.
     *
     * @param userId
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }


    /**
     * Gets the bDate value for this UserPdtRltVo.
     *
     * @return bDate
     */
    public String getBDate() {
        return bDate;
    }


    /**
     * Sets the bDate value for this UserPdtRltVo.
     *
     * @param bDate
     */
    public void setBDate(String bDate) {
        this.bDate = bDate;
    }


    /**
     * Gets the eDate value for this UserPdtRltVo.
     *
     * @return eDate
     */
    public String getEDate() {
        return eDate;
    }


    /**
     * Sets the eDate value for this UserPdtRltVo.
     *
     * @param eDate
     */
    public void setEDate(String eDate) {
        this.eDate = eDate;
    }

    private Object __equalsCalc = null;
    public synchronized boolean equals(Object obj) {
        if (!(obj instanceof UserPdtRltVo)) return false;
        UserPdtRltVo other = (UserPdtRltVo) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true &&
            ((this.jftype==null && other.getJftype()==null) ||
             (this.jftype!=null &&
              this.jftype.equals(other.getJftype()))) &&
            ((this.orderType==null && other.getOrderType()==null) ||
             (this.orderType!=null &&
              this.orderType.equals(other.getOrderType()))) &&
            ((this.pdtId==null && other.getPdtId()==null) ||
             (this.pdtId!=null &&
              this.pdtId.equals(other.getPdtId()))) &&
            ((this.pdtName==null && other.getPdtName()==null) ||
             (this.pdtName!=null &&
              this.pdtName.equals(other.getPdtName()))) &&
            ((this.pdtType==null && other.getPdtType()==null) ||
             (this.pdtType!=null &&
              this.pdtType.equals(other.getPdtType()))) &&
            ((this.userId==null && other.getUserId()==null) ||
             (this.userId!=null &&
              this.userId.equals(other.getUserId()))) &&
            ((this.bDate==null && other.getBDate()==null) ||
             (this.bDate!=null &&
              this.bDate.equals(other.getBDate()))) &&
            ((this.eDate==null && other.getEDate()==null) ||
             (this.eDate!=null &&
              this.eDate.equals(other.getEDate())));
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
        if (getJftype() != null) {
            _hashCode += getJftype().hashCode();
        }
        if (getOrderType() != null) {
            _hashCode += getOrderType().hashCode();
        }
        if (getPdtId() != null) {
            _hashCode += getPdtId().hashCode();
        }
        if (getPdtName() != null) {
            _hashCode += getPdtName().hashCode();
        }
        if (getPdtType() != null) {
            _hashCode += getPdtType().hashCode();
        }
        if (getUserId() != null) {
            _hashCode += getUserId().hashCode();
        }
        if (getBDate() != null) {
            _hashCode += getBDate().hashCode();
        }
        if (getEDate() != null) {
            _hashCode += getEDate().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(UserPdtRltVo.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://ws.myeclipseide.com/", "userPdtRltVo"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("jftype");
        elemField.setXmlName(new javax.xml.namespace.QName("", "jftype"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("orderType");
        elemField.setXmlName(new javax.xml.namespace.QName("", "orderType"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("pdtId");
        elemField.setXmlName(new javax.xml.namespace.QName("", "pdtId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("pdtName");
        elemField.setXmlName(new javax.xml.namespace.QName("", "pdtName"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("pdtType");
        elemField.setXmlName(new javax.xml.namespace.QName("", "pdtType"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("userId");
        elemField.setXmlName(new javax.xml.namespace.QName("", "userId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("BDate");
        elemField.setXmlName(new javax.xml.namespace.QName("", "bDate"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("EDate");
        elemField.setXmlName(new javax.xml.namespace.QName("", "eDate"));
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
