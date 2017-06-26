/**
 * UserPtabDetailVo.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package gv.hht.web.ws;

public class UserPtabDetailVo  implements java.io.Serializable {
    private String charge;

    private String chargeName;

    private String ptabId;

    private String ramark;

    public UserPtabDetailVo() {
    }

    public UserPtabDetailVo(
           String charge,
           String chargeName,
           String ptabId,
           String ramark) {
           this.charge = charge;
           this.chargeName = chargeName;
           this.ptabId = ptabId;
           this.ramark = ramark;
    }


    /**
     * Gets the charge value for this UserPtabDetailVo.
     *
     * @return charge
     */
    public String getCharge() {
        return charge;
    }


    /**
     * Sets the charge value for this UserPtabDetailVo.
     *
     * @param charge
     */
    public void setCharge(String charge) {
        this.charge = charge;
    }


    /**
     * Gets the chargeName value for this UserPtabDetailVo.
     *
     * @return chargeName
     */
    public String getChargeName() {
        return chargeName;
    }


    /**
     * Sets the chargeName value for this UserPtabDetailVo.
     *
     * @param chargeName
     */
    public void setChargeName(String chargeName) {
        this.chargeName = chargeName;
    }


    /**
     * Gets the ptabId value for this UserPtabDetailVo.
     *
     * @return ptabId
     */
    public String getPtabId() {
        return ptabId;
    }


    /**
     * Sets the ptabId value for this UserPtabDetailVo.
     *
     * @param ptabId
     */
    public void setPtabId(String ptabId) {
        this.ptabId = ptabId;
    }


    /**
     * Gets the ramark value for this UserPtabDetailVo.
     *
     * @return ramark
     */
    public String getRamark() {
        return ramark;
    }


    /**
     * Sets the ramark value for this UserPtabDetailVo.
     *
     * @param ramark
     */
    public void setRamark(String ramark) {
        this.ramark = ramark;
    }

    private Object __equalsCalc = null;
    public synchronized boolean equals(Object obj) {
        if (!(obj instanceof UserPtabDetailVo)) return false;
        UserPtabDetailVo other = (UserPtabDetailVo) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true &&
            ((this.charge==null && other.getCharge()==null) ||
             (this.charge!=null &&
              this.charge.equals(other.getCharge()))) &&
            ((this.chargeName==null && other.getChargeName()==null) ||
             (this.chargeName!=null &&
              this.chargeName.equals(other.getChargeName()))) &&
            ((this.ptabId==null && other.getPtabId()==null) ||
             (this.ptabId!=null &&
              this.ptabId.equals(other.getPtabId()))) &&
            ((this.ramark==null && other.getRamark()==null) ||
             (this.ramark!=null &&
              this.ramark.equals(other.getRamark())));
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
        if (getCharge() != null) {
            _hashCode += getCharge().hashCode();
        }
        if (getChargeName() != null) {
            _hashCode += getChargeName().hashCode();
        }
        if (getPtabId() != null) {
            _hashCode += getPtabId().hashCode();
        }
        if (getRamark() != null) {
            _hashCode += getRamark().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(UserPtabDetailVo.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://ws.myeclipseide.com/", "userPtabDetailVo"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("charge");
        elemField.setXmlName(new javax.xml.namespace.QName("", "charge"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("chargeName");
        elemField.setXmlName(new javax.xml.namespace.QName("", "chargeName"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("ptabId");
        elemField.setXmlName(new javax.xml.namespace.QName("", "ptabId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("ramark");
        elemField.setXmlName(new javax.xml.namespace.QName("", "ramark"));
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
