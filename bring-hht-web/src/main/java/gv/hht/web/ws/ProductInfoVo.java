/**
 * ProductInfoVo.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package gv.hht.web.ws;

public class ProductInfoVo  implements java.io.Serializable {
    private String pdtId;

    private String pdtName;

    private String price;

    private String unit;

    public ProductInfoVo() {
    }

    public ProductInfoVo(
           String pdtId,
           String pdtName,
           String price,
           String unit) {
           this.pdtId = pdtId;
           this.pdtName = pdtName;
           this.price = price;
           this.unit = unit;
    }


    /**
     * Gets the pdtId value for this ProductInfoVo.
     *
     * @return pdtId
     */
    public String getPdtId() {
        return pdtId;
    }


    /**
     * Sets the pdtId value for this ProductInfoVo.
     *
     * @param pdtId
     */
    public void setPdtId(String pdtId) {
        this.pdtId = pdtId;
    }


    /**
     * Gets the pdtName value for this ProductInfoVo.
     *
     * @return pdtName
     */
    public String getPdtName() {
        return pdtName;
    }


    /**
     * Sets the pdtName value for this ProductInfoVo.
     *
     * @param pdtName
     */
    public void setPdtName(String pdtName) {
        this.pdtName = pdtName;
    }


    /**
     * Gets the price value for this ProductInfoVo.
     *
     * @return price
     */
    public String getPrice() {
        return price;
    }


    /**
     * Sets the price value for this ProductInfoVo.
     *
     * @param price
     */
    public void setPrice(String price) {
        this.price = price;
    }


    /**
     * Gets the unit value for this ProductInfoVo.
     *
     * @return unit
     */
    public String getUnit() {
        return unit;
    }


    /**
     * Sets the unit value for this ProductInfoVo.
     *
     * @param unit
     */
    public void setUnit(String unit) {
        this.unit = unit;
    }

    private Object __equalsCalc = null;
    public synchronized boolean equals(Object obj) {
        if (!(obj instanceof ProductInfoVo)) return false;
        ProductInfoVo other = (ProductInfoVo) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true &&
            ((this.pdtId==null && other.getPdtId()==null) ||
             (this.pdtId!=null &&
              this.pdtId.equals(other.getPdtId()))) &&
            ((this.pdtName==null && other.getPdtName()==null) ||
             (this.pdtName!=null &&
              this.pdtName.equals(other.getPdtName()))) &&
            ((this.price==null && other.getPrice()==null) ||
             (this.price!=null &&
              this.price.equals(other.getPrice()))) &&
            ((this.unit==null && other.getUnit()==null) ||
             (this.unit!=null &&
              this.unit.equals(other.getUnit())));
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
        if (getPdtId() != null) {
            _hashCode += getPdtId().hashCode();
        }
        if (getPdtName() != null) {
            _hashCode += getPdtName().hashCode();
        }
        if (getPrice() != null) {
            _hashCode += getPrice().hashCode();
        }
        if (getUnit() != null) {
            _hashCode += getUnit().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ProductInfoVo.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://ws.myeclipseide.com/", "productInfoVo"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
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
        elemField.setFieldName("price");
        elemField.setXmlName(new javax.xml.namespace.QName("", "price"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("unit");
        elemField.setXmlName(new javax.xml.namespace.QName("", "unit"));
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
