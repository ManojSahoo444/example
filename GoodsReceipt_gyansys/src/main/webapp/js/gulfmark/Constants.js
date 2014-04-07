// Invoice Approval App urls
var Constants = {
};
Constants.clientDNS = 'https://nwdev.gulfmark.com:8080';
Constants.clientProxyDNS = 'https://10.114.184.104:8080';
Constants.clientProxyDNS2 = 'https://8.18.102.109:8080';
Constants.QA1 = 'https://192.168.1.205:8080';//App Management
Constants.QA2 = 'https://192.168.1.101:8080';//netweaver
Constants.localHostDNS = 'http://localhost:8181'; //Reshma
Constants.localDNS = 'https://192.168.2.133:8080';//Reshma
Constants.altLocalDNS = 'http://192.168.1.68:8181';
//------------------------------------------------------------------------------------------------------------------------------------
Constants.appManagementDNS = Constants.localDNS;
Constants.netweaverDNS = Constants.localDNS;
//-------------------------------------------------------------------------------------------------------------------------------------
//Client Urls
//getInboxInvoices: Constants.clientDNS + "/sap/opu/odata/sap/Z_INV_MOBILE_APP_CM/z_inv_mobile_appCollection?$filter=username eq",
//invoiceDetailsLink: Constants.clientDNS + "/sap/opu/odata/sap/Z_INV_MOBILE_APP_CM/",
//invoiceStatusChange: Constants.clientDNS + "/sap/opu/odata/sap/Z_INV_APPROVAL_CM/z_inv_approvalCollection(value='',username='',",
//---------------------------------------------------------------------------------------------------------------------------------------
//Proxy Urls
//Constants.getInboxInvoices = Constants.netweaverDNS + "/sap/inv/opu/odata/sap/Z_INV_MOBILE_APP_CM/z_inv_mobile_appCollection?$filter=username eq";
//Constants.invoiceDetailsLink = Constants.netweaverDNS + "/sap/inv/opu/odata/sap/Z_INV_MOBILE_APP_CM/";
//Constants.invoiceStatusChange = Constants.netweaverDNS + "/sap/inv/opu/odata/sap/Z_INV_APPROVAL_CM/z_inv_approvalCollection(value='',username='',";
//----------------------------------------------------------------------------------------------------------------------------------------
//Test Proxy Urls
Constants.getInboxInvoices = Constants.netweaverDNS + "/sap/inv/opu/odata/sap/ZFI_QAS_CM_INVOICE_DISPLAY/z_fi_qas_invoice_displayCollection?$filter=username%20eq";
Constants.invoiceDetailsLink = Constants.netweaverDNS + "/sap/inv/opu/odata/sap/ZFI_QAS_CM_INVOICE_DISPLAY/";
Constants.invoiceStatusChange = Constants.netweaverDNS + "/sap/inv/opu/odata/sap/Z_FI_QAS_CM_INVOICE_APPROVA/z_fi_qas_invoice_approvaCollection(value='',username='',";
//-----------------------------------------------------------------------------------------------------------------------------------------
//Application Management
Constants.loginUrl = Constants.appManagementDNS + "/applicationManagement/rest/user/";
Constants.iconPath = Constants.appManagementDNS + "/applicationManagement";
Constants.sendEmail = Constants.appManagementDNS + "/applicationManagement/rest/mail/";
//---------------------------------------------------------------------------------------------------------------------------------------
//Pdf Link
//Constants.getInvoiceDocument = "https://dev.gulfmark.com/sap/bc/webdynpro/sap/zfi_disp_att_pdf?sap-language=EN&BUKRS=";

//Test Proxy pdf link
//Constants.getInvoiceDocument = "http://houspqa1.gulfmark.com:8000/sap/bc/webdynpro/sap/zfi_disp_att_pdf?sap-language=EN&BUKRS=";

//New Pdf link
Constants.getInvoiceDocument = "https://qas.gulfmark.com/sap/bc/webdynpro/sap/zfi_disp_att_pdf?sap-language=EN&BUKRS=";
