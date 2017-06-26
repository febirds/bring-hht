/**
 * AreaInfoVo.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package gv.hht.web.ws;

public class AreaInfoVo  implements java.io.Serializable {
    private String areaId;

    private String areaLevel;

    private String areaName;

    private String supareaid;

    public AreaInfoVo() {
    }

    public AreaInfoVo(
           String areaId,
           String areaLevel,
           String areaName,
           String supareaid) {
           this.areaId = areaId;
           this.areaLevel = areaLevel;
           this.areaName = areaName;
           this.supareaid = supareaid;
    }


    /**
     * Gets the areaId value for this AreaInfoVo.
     *
     * @return areaId
     */
    public String getAreaId() {
        return areaId;
    }


    /**
     * Sets the areaId value for this AreaInfoVo.
     *
     * @param areaId
     */
    public void setAreaId(String areaId) {
        this.areaId = areaId;
    }


    /**
     * Gets the areaLevel value for this AreaInfoVo.
     *
     * @return areaLevel
     */
    public String getAreaLevel() {
        return areaLevel;
    }


    /**
     * Sets the areaLevel value for this AreaInfoVo.
     *
     * @param areaLevel
     */
    public void setAreaLevel(String areaLevel) {
        this.areaLevel = areaLevel;
    }


    /**
     * Gets the areaName value for this AreaInfoVo.
     *
     * @return areaName
     */
    public String getAreaName() {
        return areaName;
    }


    /**
     * Sets the areaName value for this AreaInfoVo.
     *
     * @param areaName
     */
    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }


    /**
     * Gets the supareaid value for this AreaInfoVo.
     *
     * @return supareaid
     */
    public String getSupareaid() {
        return supareaid;
    }


    /**
     * Sets the supareaid value for this AreaInfoVo.
     *
     * @param supareaid
     */
    public void setSupareaid(String supareaid) {
        this.supareaid = supareaid;
    }

    private Object __equalsCalc = null;
    public synchronized boolean equals(Object obj) {
        if (!(obj instanceof AreaInfoVo)) return false;
        AreaInfoVo other = (AreaInfoVo) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true &&
            ((this.areaId==null && other.getAreaId()==null) ||
             (this.areaId!=null &&
              this.areaId.equals(other.getAreaId()))) &&
            ((this.areaLevel==null && other.getAreaLevel()==null) ||
             (this.areaLevel!=null &&
              this.areaLevel.equals(other.getAreaLevel()))) &&
            ((this.areaName==null && other.getAreaName()==null) ||
             (this.areaName!=null &&
              this.areaName.equals(other.getAreaName()))) &&
            ((this.supareaid==null && other.getSupareaid()==null) ||
             (this.supareaid!=null &&
              this.supareaid.equals(other.getSupareaid())));
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
        if (getAreaId() != null) {
            _hashCode += getAreaId().hashCode();
        }
        if (getAreaLevel() != null) {
            _hashCode += getAreaLevel().hashCode();
        }
        if (getAreaName() != null) {
            _hashCode += getAreaName().hashCode();
        }
        if (getSupareaid() != null) {
            _hashCode += getSupareaid().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(AreaInfoVo.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://ws.myeclipseide.com/", "areaInfoVo"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("areaId");
        elemField.setXmlName(new javax.xml.namespace.QName("", "areaId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("areaLevel");
        elemField.setXmlName(new javax.xml.namespace.QName("", "areaLevel"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("areaName");
        elemField.setXmlName(new javax.xml.namespace.QName("", "areaName"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("supareaid");
        elemField.setXmlName(new javax.xml.namespace.QName("", "supareaid"));
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
