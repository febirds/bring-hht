/**
 * UserDevRltVo.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package gv.hht.web.ws;

public class UserDevRltVo  implements java.io.Serializable {
    private String devNo;

    private String devStyle;

    private String devType;

    private String userId;

    public UserDevRltVo() {
    }

    public UserDevRltVo(
           String devNo,
           String devStyle,
           String devType,
           String userId) {
           this.devNo = devNo;
           this.devStyle = devStyle;
           this.devType = devType;
           this.userId = userId;
    }


    /**
     * Gets the devNo value for this UserDevRltVo.
     *
     * @return devNo
     */
    public String getDevNo() {
        return devNo;
    }


    /**
     * Sets the devNo value for this UserDevRltVo.
     *
     * @param devNo
     */
    public void setDevNo(String devNo) {
        this.devNo = devNo;
    }


    /**
     * Gets the devStyle value for this UserDevRltVo.
     *
     * @return devStyle
     */
    public String getDevStyle() {
        return devStyle;
    }


    /**
     * Sets the devStyle value for this UserDevRltVo.
     *
     * @param devStyle
     */
    public void setDevStyle(String devStyle) {
        this.devStyle = devStyle;
    }


    /**
     * Gets the devType value for this UserDevRltVo.
     *
     * @return devType
     */
    public String getDevType() {
        return devType;
    }


    /**
     * Sets the devType value for this UserDevRltVo.
     *
     * @param devType
     */
    public void setDevType(String devType) {
        this.devType = devType;
    }


    /**
     * Gets the userId value for this UserDevRltVo.
     *
     * @return userId
     */
    public String getUserId() {
        return userId;
    }


    /**
     * Sets the userId value for this UserDevRltVo.
     *
     * @param userId
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    private Object __equalsCalc = null;
    public synchronized boolean equals(Object obj) {
        if (!(obj instanceof UserDevRltVo)) return false;
        UserDevRltVo other = (UserDevRltVo) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true &&
            ((this.devNo==null && other.getDevNo()==null) ||
             (this.devNo!=null &&
              this.devNo.equals(other.getDevNo()))) &&
            ((this.devStyle==null && other.getDevStyle()==null) ||
             (this.devStyle!=null &&
              this.devStyle.equals(other.getDevStyle()))) &&
            ((this.devType==null && other.getDevType()==null) ||
             (this.devType!=null &&
              this.devType.equals(other.getDevType()))) &&
            ((this.userId==null && other.getUserId()==null) ||
             (this.userId!=null &&
              this.userId.equals(other.getUserId())));
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
        if (getDevNo() != null) {
            _hashCode += getDevNo().hashCode();
        }
        if (getDevStyle() != null) {
            _hashCode += getDevStyle().hashCode();
        }
        if (getDevType() != null) {
            _hashCode += getDevType().hashCode();
        }
        if (getUserId() != null) {
            _hashCode += getUserId().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(UserDevRltVo.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://ws.myeclipseide.com/", "userDevRltVo"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("devNo");
        elemField.setXmlName(new javax.xml.namespace.QName("", "devNo"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("devStyle");
        elemField.setXmlName(new javax.xml.namespace.QName("", "devStyle"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("devType");
        elemField.setXmlName(new javax.xml.namespace.QName("", "devType"));
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
