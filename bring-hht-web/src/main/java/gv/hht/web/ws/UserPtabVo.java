/**
 * UserPtabVo.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package gv.hht.web.ws;

public class UserPtabVo  implements java.io.Serializable {
    private String accountId;

    private String bchg;

    private String cashTypeName;

    private String checkNo;

    private String gdate;

    private String invoiceNo;

    private String opName;

    private String packageName;

    private String pchg;

    private String ptabId;

    private String ptabType;

    private String schg;

    public UserPtabVo() {
    }

    public UserPtabVo(
           String accountId,
           String bchg,
           String cashTypeName,
           String checkNo,
           String gdate,
           String invoiceNo,
           String opName,
           String packageName,
           String pchg,
           String ptabId,
           String ptabType,
           String schg) {
           this.accountId = accountId;
           this.bchg = bchg;
           this.cashTypeName = cashTypeName;
           this.checkNo = checkNo;
           this.gdate = gdate;
           this.invoiceNo = invoiceNo;
           this.opName = opName;
           this.packageName = packageName;
           this.pchg = pchg;
           this.ptabId = ptabId;
           this.ptabType = ptabType;
           this.schg = schg;
    }


    /**
     * Gets the accountId value for this UserPtabVo.
     *
     * @return accountId
     */
    public String getAccountId() {
        return accountId;
    }


    /**
     * Sets the accountId value for this UserPtabVo.
     *
     * @param accountId
     */
    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }


    /**
     * Gets the bchg value for this UserPtabVo.
     *
     * @return bchg
     */
    public String getBchg() {
        return bchg;
    }


    /**
     * Sets the bchg value for this UserPtabVo.
     *
     * @param bchg
     */
    public void setBchg(String bchg) {
        this.bchg = bchg;
    }


    /**
     * Gets the cashTypeName value for this UserPtabVo.
     *
     * @return cashTypeName
     */
    public String getCashTypeName() {
        return cashTypeName;
    }


    /**
     * Sets the cashTypeName value for this UserPtabVo.
     *
     * @param cashTypeName
     */
    public void setCashTypeName(String cashTypeName) {
        this.cashTypeName = cashTypeName;
    }


    /**
     * Gets the checkNo value for this UserPtabVo.
     *
     * @return checkNo
     */
    public String getCheckNo() {
        return checkNo;
    }


    /**
     * Sets the checkNo value for this UserPtabVo.
     *
     * @param checkNo
     */
    public void setCheckNo(String checkNo) {
        this.checkNo = checkNo;
    }


    /**
     * Gets the gdate value for this UserPtabVo.
     *
     * @return gdate
     */
    public String getGdate() {
        return gdate;
    }


    /**
     * Sets the gdate value for this UserPtabVo.
     *
     * @param gdate
     */
    public void setGdate(String gdate) {
        this.gdate = gdate;
    }


    /**
     * Gets the invoiceNo value for this UserPtabVo.
     *
     * @return invoiceNo
     */
    public String getInvoiceNo() {
        return invoiceNo;
    }


    /**
     * Sets the invoiceNo value for this UserPtabVo.
     *
     * @param invoiceNo
     */
    public void setInvoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }


    /**
     * Gets the opName value for this UserPtabVo.
     *
     * @return opName
     */
    public String getOpName() {
        return opName;
    }


    /**
     * Sets the opName value for this UserPtabVo.
     *
     * @param opName
     */
    public void setOpName(String opName) {
        this.opName = opName;
    }


    /**
     * Gets the packageName value for this UserPtabVo.
     *
     * @return packageName
     */
    public String getPackageName() {
        return packageName;
    }


    /**
     * Sets the packageName value for this UserPtabVo.
     *
     * @param packageName
     */
    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }


    /**
     * Gets the pchg value for this UserPtabVo.
     *
     * @return pchg
     */
    public String getPchg() {
        return pchg;
    }


    /**
     * Sets the pchg value for this UserPtabVo.
     *
     * @param pchg
     */
    public void setPchg(String pchg) {
        this.pchg = pchg;
    }


    /**
     * Gets the ptabId value for this UserPtabVo.
     *
     * @return ptabId
     */
    public String getPtabId() {
        return ptabId;
    }


    /**
     * Sets the ptabId value for this UserPtabVo.
     *
     * @param ptabId
     */
    public void setPtabId(String ptabId) {
        this.ptabId = ptabId;
    }


    /**
     * Gets the ptabType value for this UserPtabVo.
     *
     * @return ptabType
     */
    public String getPtabType() {
        return ptabType;
    }


    /**
     * Sets the ptabType value for this UserPtabVo.
     *
     * @param ptabType
     */
    public void setPtabType(String ptabType) {
        this.ptabType = ptabType;
    }


    /**
     * Gets the schg value for this UserPtabVo.
     *
     * @return schg
     */
    public String getSchg() {
        return schg;
    }


    /**
     * Sets the schg value for this UserPtabVo.
     *
     * @param schg
     */
    public void setSchg(String schg) {
        this.schg = schg;
    }

    private Object __equalsCalc = null;
    public synchronized boolean equals(Object obj) {
        if (!(obj instanceof UserPtabVo)) return false;
        UserPtabVo other = (UserPtabVo) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true &&
            ((this.accountId==null && other.getAccountId()==null) ||
             (this.accountId!=null &&
              this.accountId.equals(other.getAccountId()))) &&
            ((this.bchg==null && other.getBchg()==null) ||
             (this.bchg!=null &&
              this.bchg.equals(other.getBchg()))) &&
            ((this.cashTypeName==null && other.getCashTypeName()==null) ||
             (this.cashTypeName!=null &&
              this.cashTypeName.equals(other.getCashTypeName()))) &&
            ((this.checkNo==null && other.getCheckNo()==null) ||
             (this.checkNo!=null &&
              this.checkNo.equals(other.getCheckNo()))) &&
            ((this.gdate==null && other.getGdate()==null) ||
             (this.gdate!=null &&
              this.gdate.equals(other.getGdate()))) &&
            ((this.invoiceNo==null && other.getInvoiceNo()==null) ||
             (this.invoiceNo!=null &&
              this.invoiceNo.equals(other.getInvoiceNo()))) &&
            ((this.opName==null && other.getOpName()==null) ||
             (this.opName!=null &&
              this.opName.equals(other.getOpName()))) &&
            ((this.packageName==null && other.getPackageName()==null) ||
             (this.packageName!=null &&
              this.packageName.equals(other.getPackageName()))) &&
            ((this.pchg==null && other.getPchg()==null) ||
             (this.pchg!=null &&
              this.pchg.equals(other.getPchg()))) &&
            ((this.ptabId==null && other.getPtabId()==null) ||
             (this.ptabId!=null &&
              this.ptabId.equals(other.getPtabId()))) &&
            ((this.ptabType==null && other.getPtabType()==null) ||
             (this.ptabType!=null &&
              this.ptabType.equals(other.getPtabType()))) &&
            ((this.schg==null && other.getSchg()==null) ||
             (this.schg!=null &&
              this.schg.equals(other.getSchg())));
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
        if (getAccountId() != null) {
            _hashCode += getAccountId().hashCode();
        }
        if (getBchg() != null) {
            _hashCode += getBchg().hashCode();
        }
        if (getCashTypeName() != null) {
            _hashCode += getCashTypeName().hashCode();
        }
        if (getCheckNo() != null) {
            _hashCode += getCheckNo().hashCode();
        }
        if (getGdate() != null) {
            _hashCode += getGdate().hashCode();
        }
        if (getInvoiceNo() != null) {
            _hashCode += getInvoiceNo().hashCode();
        }
        if (getOpName() != null) {
            _hashCode += getOpName().hashCode();
        }
        if (getPackageName() != null) {
            _hashCode += getPackageName().hashCode();
        }
        if (getPchg() != null) {
            _hashCode += getPchg().hashCode();
        }
        if (getPtabId() != null) {
            _hashCode += getPtabId().hashCode();
        }
        if (getPtabType() != null) {
            _hashCode += getPtabType().hashCode();
        }
        if (getSchg() != null) {
            _hashCode += getSchg().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(UserPtabVo.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://ws.myeclipseide.com/", "userPtabVo"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("accountId");
        elemField.setXmlName(new javax.xml.namespace.QName("", "accountId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("bchg");
        elemField.setXmlName(new javax.xml.namespace.QName("", "bchg"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("cashTypeName");
        elemField.setXmlName(new javax.xml.namespace.QName("", "cashTypeName"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("checkNo");
        elemField.setXmlName(new javax.xml.namespace.QName("", "checkNo"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("gdate");
        elemField.setXmlName(new javax.xml.namespace.QName("", "gdate"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("invoiceNo");
        elemField.setXmlName(new javax.xml.namespace.QName("", "invoiceNo"));
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
        elemField.setFieldName("packageName");
        elemField.setXmlName(new javax.xml.namespace.QName("", "packageName"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("pchg");
        elemField.setXmlName(new javax.xml.namespace.QName("", "pchg"));
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
        elemField.setFieldName("ptabType");
        elemField.setXmlName(new javax.xml.namespace.QName("", "ptabType"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("schg");
        elemField.setXmlName(new javax.xml.namespace.QName("", "schg"));
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
