var ebelp;
var txz01;
var menge;
var meins;
var mat_doc_no;
var zvendor;
var ebelp_c;
var zz_tmdocno_c;
var zz_tmdocno;
var bedat;
var menge_c;
var ebeln;
var Counti = [];
var Ponumarray = [];
var ChildQtyArray = [];
var POMainState = [];
var toggle;
var i;
var receiptdate;
var result;
var createXML;
var receiptDateText;
var Receiverid;
var ponumchildtblbool = true;
var dateString;
var podateformatstring;
var today;
var datepickerformat;
var dateformat;
var settingsuser;
var vesselID = "";
var childtblcreate = false;
var ReceiptDateText;
var selectedRows;
var loginUser;
var EmailNamespace = {};
var attachment = "";
var GROpenPoArray = [];
var m=0;
loginUser = localStorage.getItem("username");
//var variablereceiptdate =  ($.datepicker.formatDate('yy-mm-dd',new Date()));  

$(document).ready(function () {
    displayDate();
    loadOpenPO();
    GenerateXML('openporeceived');
    $("#section-loaderconf").fadeOut(100);
    $("#maindivconf").fadeIn(400);
    $("#section-loaderEmail").fadeOut(100);
    $("#maindivEmail").fadeIn(400);
    Reset();
   });

$(window).load(function() {
        Reset();
    }); 
function displayDate() {
            var today=new Date();

            var date=today.toISOString().slice(0, -14);
            document.getElementById("receiptDate").value=date;
         }
 function Dateformat(date){ 
        debugger;
       if(dateformat == "MM/DD/YYYY"){
           podateformatstring = date[1] + "/" + date[2] + "/" + date[0] ;
           variablereceiptdate  = variablereceiptdate.split('/');
           variablereceiptdate = variablereceiptdate[2] + "-" + variablereceiptdate[0] + "-" + variablereceiptdate[1] ;
       }
        else if(dateformat == "DD/MM/YYYY"){
           podateformatstring = date[2] + "/" + date[1] + "/" + date[0] ;
           variablereceiptdate  = variablereceiptdate.split('/');
           variablereceiptdate = variablereceiptdate[2] + "-" + variablereceiptdate[1] + "-" + variablereceiptdate[0] ;
            
       }
        else  if(dateformat == "DD-MM-YYYY"){
           podateformatstring = date[2] + "-" + date[1] + "-" + date[0] ;
           variablereceiptdate  = variablereceiptdate.split('-');
           variablereceiptdate = variablereceiptdate[2] + "-" + variablereceiptdate[1] + "-" + variablereceiptdate[0] ;
          
       }
        else if(dateformat == "MM-DD-YYYY"){
           podateformatstring = date[1] + "-" + date[2] + "-" + date[0] ;
           variablereceiptdate  = variablereceiptdate.split('-');
           variablereceiptdate = variablereceiptdate[2] + "-" + variablereceiptdate[0] + "-" + variablereceiptdate[1] ;
       } 
       
       
      }
function loginGR()
            {
                var username = "";
                var password = "";
                usernamecase = $('#username').val();
                username = usernamecase.toUpperCase();
                password = $('#password').val();
                if (username === "" & password === "")
                {
                    $(".error-msg").text("Please enter Username and Password.");
                }
                else if (username === "") {
                    //alert("Please enter username");
                    //createAlertMessage("Alert", "username" , "alert", "e");
                    $(".error-msg").text("Please enter Username.");
                    $('#username').focus();
                }
                else if (password === "")
                {
                    //createAlertMessage("Alert", "Please enter password" , "alert", "e");
                    $(".error-msg").text("Please enter Password.");
                    $('#password').focus();
                }
                else if (username !== "" && password !== "") {
                    //call login uri
                    userAuthentication(username, password);
                } 
            }

function userAuthentication(username, password) {

var xml;
$.ajax(
    {
        //url: "http://50.194.79.188:8080/sap/inv/opu/odata/sap/ZPO_CM_APPROVAL/zpo_approvalCollection?$filter=username%20eq'"+username+"'",
        url: "http://50.194.79.188:8080/sap/inv/opu/odata/sap/ZCM_VESSEL_ID/zmm_gr_vessel_idCollection?$filter=email%20eq%27highland%20citadel@gulfmark.com%27",
        //url: "http://50.194.79.188:8080/sap/inv/opu/odata/sap/ZCM_VESSEL_ID/zmm_gr_vessel_idCollection?$filter=email%20eq%27'"+username+"'",
        type: 'GET',
        contentType: "application/xml;charset=utf-8",
        dataType: "",
        cache: false,
        success: function (data) {
            $(data).find("content").each(function () {
                $(this).find("m\\:properties, properties").each(function () {
                    var $info = $(this);
                    var vsl_name = $info.find("d\\:vsl_name, vsl_name").text();
                    var vsl_id = $info.find("d\\:vsl_id, vsl_id").text();
                    
                        
                              localStorage.setItem("vsl_id", vsl_id);
                              window.location = "GROpenPO.html";
                        
                });
            });
//       if (navigator.userAgent.match("Android") || navigator.userAgent.match("iPhone")
//        || navigator.userAgent.match("iPod")) {
////               $("#openpodate").hide();
////               $('#GROpenPOprttbl td:nth-child(4)').hide();          
//        };
//          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            createAlertMessage("Alert", "Error" , "alert", "e");
        }
    });
}



  function validateReceiver(){
       var Receiver = document.getElementById('receiverid').value;
       if (Receiver == "") {
       msg = "Please fill the ReceiverID";
   createAlertMessage("Alert", msg , "alert", "e");
        return false;
    }
    else{
          return true;
    }
  }
   
function sendemail() {
   
  debugger;
 // $('#section-loaderEmail').show();
    var fromId = 'noreply_apps@gulfmark.com';
    var username = localStorage.getItem("username");
    var password = '';
    var toList = $('#to').val();
    if(toList == ''){
        msg = "Please Enter a valid email address";
        createAlertMessage("Alert", msg , "alert", "e");
    }
    else{
    $('#section-loaderEmail').show();
    var ccList = $('#cc').val();
    var bccList = $('#bcc').val();
    var subject = $('#subject').val();
    var input = $("#mailComments");
    if (input.val() === input.attr('placeholder')) {
        input.val('');
    }
    var comments = $("#mailComments").val();
    var arrContent = [];
    arrContent.push("<h3>" + "PO Confirmation(s) for "+vsl_name + "</h3>");
    var arrContentHeader = ["PO Number", "Doc/PR No#", "PO Date", "Vendor","Description","QTY","Unit"];
      
      var subcontentArray = [];
      var finalsubcontent = [];
      for(var i=0; i<selectedRows.length;i++){
         subcontentArray[0] = selectedRows[i].Ponumber;
         subcontentArray[1] = selectedRows[i].docprnumber;
         subcontentArray[2] = selectedRows[i].podate;
         subcontentArray[3] = selectedRows[i].vendor;
         subcontentArray[4] = selectedRows[i].description;
         subcontentArray[5] = selectedRows[i].Qty;
         subcontentArray[6] = selectedRows[i].Unit;
         finalsubcontent.push(subcontentArray);
         }
      
       var data = {'From': fromId, 'UserId': username,
        'password': password,
        'To': toList,
        'Cc': ccList, 'Bcc': bccList,
        'Subject': subject,
        'Comments': comments,
        'Contents': arrContent,
        'SubContentHeader': arrContentHeader,
        'Subcontent': finalsubcontent,
        'Attachment': attachment};
     
 $.ajax(
    {
        url: "https://nwdev.gulfmark.com:8080/applicationManagement/rest/mail/",
        type: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data),
        cache: false,
        success: function (response) {
        $('#section-loaderEmail').hide();
             msg = response.message;
        createAlertMessage("Alert", msg , "alert", "e");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        $('#section-loaderEmail').hide();
            createAlertMessage("Alert", "Error" , "stay", "e");
        }
    });
    }
  }
  
createAlertMessage = function(header, message, type, e) {
   $(".model-screen").css("display", "block");
   $("#header").text(header);
   $("#alertMessage").text(message);
    if (message.length > 40) {
        $(".model-container").height("118px");
    } else {
        $(".model-container").removeAttr('style');
    }
    if (type === "alert") {
        $("#ok").val('OK');
        $("#cancelAlert").css("display", "none");
        $("#ok").click(function() {
     //   location.href = "https://192.168.2.119:8080/GoodsReceipt-1.0/GROpenPO.html";
     
      	$(".model-screen").css("display", "none");
		        	 		
        });
        
    } 
    
    else if (type === "confirm") {
        $("#ok").val('OK');
        $("#cancelAlert").val('Cancel');
        $("#cancelAlert").css("display", "inline-block");
        $("#ok").click(function() {
        location.href = "https://192.168.2.119:8080/ContainerApplication-1.0/index.html#login";
        });
        $("#cancelAlert").click(function() {
            if(id==="logOut")
                {
                 location.href = "https://192.168.2.119:8080/GoodsReceipt-1.0/GROpenPO.html";
                  }
             else
                {
                 location.href = "https://192.168.2.119:8080/GoodsReceipt-1.0/GRPOConfirm.html";
                }
                });
    } else if (type === "continue") {
        $("#ok").val('OK');
        $("#cancelAlert").val('Cancel');
        $("#cancelAlert").css("display", "inline-block");
    }
      else if (type === "stay") {
        $("#ok").val('OK');
        $("#cancelAlert").val('Cancel');
        $("#cancelAlert").css("display", "inline-block");
        $("#ok").click(function() {
        location.href = "https://192.168.2.119:8080/GoodsReceipt-1.0/emailcompose.html";
        });
    }
};

function loadOpenPO(){
var xml;
$.ajax(
    {
        //url: "http://50.194.79.188:8080/sap/inv/opu/odata/sap/ZCM_GR_OPEN_PO/zmm_gr_open_poCollection?$filter=bednr%20eq%27'"+vsl_id+"'%27",
        //url: "http://50.194.79.188:8080/sap/inv/opu/odata/sap/ZCM_GR_OPEN_PO/zmm_gr_open_poCollection?$filter=bednr%20eq%2767%27",
        url: "http://50.194.79.186:8080/sap/inv/opu/odata/sap/Z_INTERNAL_APPS_SRV/z_get_grlist/?$filter=Bednr eq 'SKULKARNI'",
        type: 'GET',
        contentType: "application/xml;charset=utf-8",
        dataType: "",
        cache: false,
        success: function (data) {
            $('#section-loader').hide();
           
          var POreponse =  $(data).find("content");
          if (POreponse.length == 0){
           $('#openpomaintbl tbody').empty();
           $("#noItems").css("display", "block");
          }
          else{
            i = 0;
            $(data).find("content").each(function () {
                $(this).find("m\\:properties, properties").each(function () {
                    var xmlEntries = [];
                    var $info = $(this);
                    //mat_doc_no = $info.find("d\\:mat_doc_no, mat_doc_no").text();
                    zvendor = $info.find("d\\:zvendor, zvendor").text();
                    xmlEntries.push(zvendor);
                    //ebelp_c = $info.find("d\\:ebelp_c, ebelp_c").text();
                    zreceipt_date = $info.find("d\\:zreceipt_date, zreceipt_date").text();
                    xmlEntries.push(zreceipt_date);
                    zz_tmdocno = $info.find("d\\:zz_tmdocno, zz_tmdocno").text();
                    xmlEntries.push(zz_tmdocno);
                    bedat = $info.find("d\\:bedat, bedat").text();
                    xmlEntries.push(bedat);
                    //menge_c = $info.find("d\\:menge_c, menge_c").text();
                    ebeln = $info.find("d\\:ebeln, ebeln").text();
                    xmlEntries.push(ebeln);
                    
                    GROpenPoArray.push(xmlEntries);
                    podateformatstring = bedat.substring(0, 10);
                    dateString = podateformatstring.split('-');
                    Dateformat(dateString);
//                    localStorage.setItem("ebeln", ebeln);
//                    localStorage.setItem("zz_tmdocno", zz_tmdocno);
//                    localStorage.setItem("bedat", bedat);
//                    localStorage.setItem("zvendor", zvendor);
             if (navigator.userAgent.match("Android") || navigator.userAgent.match("iPhone")
                        || navigator.userAgent.match("iPod")) {
                        var prntpodate = "parentpodt" + ebeln;
                        $("#" + prntpodate).hide();
                    };
                    i += 1;
                    Ponumarray.push(ebeln);
                    toggle = 1;
                    $('#GROpenPOprttbl').append('<tr id="test' + ebeln + '" ><td><input type="checkbox" style="align="center !important" id="parentchkbox' + ebeln + '" class = "chcktbl" onchange="SelectAllchildcheck(this,' + i + ',' + ebeln + ')"/>\n\
                                    </td><td> <a href="javascript:showGRPODetails(chltd' + ebeln + ',' + i + ',' + ebeln + ',' + toggle + ')"><u><b>' + ebeln + '</b></u></a></td><td>' + zz_tmdocno + '</td><td id="parentpodt' + ebeln + '">' + podateformatstring + '</td>\n\
                                    <td>' + zvendor + '</td></tr>\n\
                                    <tr id="chldtr' + i + '" style="display: none;border:0px;" align="center !important">\n\
                                   <td></td> <td style="width:100% border:0px" id="chltd' + ebeln + '"  align="center !important" colspan="4";"></td>\n\
                                    </tr>');
                });
            });
            
            $("i[id^=sort-]").click(function() {
                 debugger;
                checkClass(this, this.id.split("sort-")[1]);
            });
            
       if (navigator.userAgent.match("Android") || navigator.userAgent.match("iPhone")
        || navigator.userAgent.match("iPod")) {
//               $("#openpodate").hide();
//               $('#GROpenPOprttbl td:nth-child(4)').hide();          
        };
        }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            createAlertMessage("Alert", "Error" , "alert", "e");
        }
    });
$('#section-loader').hide();
}

checkClass = function(element, app) {
    debugger;
    if ($(element).hasClass("active")) {
        $("i[id^=sort-]").removeClass("active active-down");
        sortDetails(parseInt(app), 2);
        $(element).addClass("active-down");
    } else if ($(element).hasClass("active-down") || $(element).hasClass("icon-arrow-down")) {
        sortDetails(parseInt(app), 1);
        $("i[id^=sort-]").removeClass("active active-down");
        $(element).addClass("active");
    }
};

sortDetails = function(index, order) {
    debugger;
    var rowCount = GROpenPoArray.length;
    var arrTemp;
    var numberRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;
    if (rowCount > 1) {
        if (order === 1) {
            for (var i = 0; i < rowCount - 1; i++) {
                for (var j = 0; j < (rowCount - 1) - i; j++) {
                    var first = GROpenPoArray[j][4].toLowerCase();
                    var second = GROpenPoArray[j + 1][4].toLowerCase();
                    if (numberRegex.test(first)) {
                        first = parseFloat(first);
                        second = parseFloat(second);
                    }
                    if (index === 2 && first === second) {
                        first = GROpenPoArray[j][1];
                        second = GROpenPoArray[j + 1][1];
                        if (first === second) {
                            first = parseFloat(GROpenPoArray[j][0]);
                            second = parseFloat(GROpenPoArray[j + 1][0]);
                        }
                    }
                    if (first > second) {
                        arrTemp = GROpenPoArray[j];
                        GROpenPoArray[j] = GROpenPoArray[j + 1];
                        GROpenPoArray[j + 1] = arrTemp;
                    }
                }
            }
        } else if (order === 2) {
            for (var i = 0; i < rowCount - 1; i++) {
                for (var j = 0; j < (rowCount - 1) - i; j++) {
                    var first = GROpenPoArray[j][4].toLowerCase();
                    var second = GROpenPoArray[j + 1][4].toLowerCase();
                    if (numberRegex.test(first)) {
                        first = parseFloat(first);
                        second = parseFloat(second);
                    }
                    if (index === 2 && first === second) {
                        first = GROpenPoArray[j][1];
                        second = GROpenPoArray[j + 1][1];
                        if (first === second) {
                            first = parseFloat(GROpenPoArray[j][0]);
                            second = parseFloat(GROpenPoArray[j + 1][0]);
                        }
                    }
                    if (first < second) {
                        arrTemp = GROpenPoArray[j];
                        GROpenPoArray[j] = GROpenPoArray[j + 1];
                        GROpenPoArray[j + 1] = arrTemp;
                    }
                }
            }
        }
    }
    $('#openpomaintbl tbody').empty();
    for (var i = 0; i < GROpenPoArray.length; i++) {
       
                    zvendor = GROpenPoArray[i][0];
                    //xmlEntries.push(mat_doc_no);
                    zreceipt_date = GROpenPoArray[i][1];
                   // xmlEntries.push(zvendor);
                    zz_tmdocno = GROpenPoArray[i][2];;
                    //xmlEntries.push(ebelp_c);
                    bedat = GROpenPoArray[i][3];;
                    //xmlEntries.push(zz_tmdocno_c);
                    ebeln = GROpenPoArray[i][4];;
                    //xmlEntries.push(zz_tmdocno);
                  
       m += 1;
       
        $('#GROpenPOprttbl').append('<tr id="test' + ebeln + '" ><td><input type="checkbox" style="align="center !important" id="parentchkbox' + ebeln + '" class = "chcktbl" onchange="SelectAllchildcheck(this,' + m + ',' + ebeln + ')"/>\n\
                                    </td><td> <a href="javascript:showGRPODetails(chltd' + ebeln + ',' + m + ',' + ebeln + ',' + toggle + ')"><u><b>' + ebeln + '</b></u></a></td><td>' + zz_tmdocno + '</td><td id="parentpodt' + ebeln + '">' + podateformatstring + '</td>\n\
                                    <td>' + zvendor + '</td></tr>\n\
                                    <tr class="expand-child" id="chldtr' + m + '" style="display: none;border:0px;" align="center !important">\n\
                                   <td></td> <td style="width:100% border:0px" id="chltd' + ebeln + '"  align="center !important" colspan="4";"></td>\n\
                                    </tr>');
}
};




function ExpandAll() {
    for (var z = 1; z <= Ponumarray.length; z++) {
        var childtr = "chldtr" + z;
        var childtd = "chltd" + Ponumarray[z - 1];
        $("#" + childtr).show();
        $("#" + childtd).empty();
        var xml;
        $.ajax(
            {
           beforeSend: function(){
            $('#preloader').show();
            },
            //url: "http://50.194.79.188:8080/sap/inv/opu/odata/sap/ZMM_CM_GR_OPENPO/zmm_gr_openpoCollection(bednr='',ponumber='" + Ponumarray[z - 1] + "')/poitems_r",
            url: "http://50.194.79.188:8080/sap/inv/opu/odata/sap/ZCM_GR_OPEN_PO/zmm_gr_open_poCollection(ponumber='" + Ponumarray[z - 1] + "',bednr='')/poitems_r",
            type: 'GET',
            contentType: "application/xml;charset=utf-8",
            dataType: "text",
            cache: false,
            success: function (data) {
            var childtableexpandall="",trHeaderExpandall="";
        trHeaderExpandall=trHeaderExpandall+'<table id="childtable" class="childTablecss" style="width:99.7%;" align="center">';
        trHeaderExpandall=trHeaderExpandall+'<tr id="trChildHeader" > <th width="6%" ></th>\n\
                                                <th width="40%"><span>Description</span></th>\n\
                                                <th width="10%"><span>Qty</span></th>\n\
                                                <th width="8%"><span>Unit</span></th>\n\
                                                <th style="display: none;" width="0%"></th>\n\
                                                <th style="display: none;" width="0%"></th>\n\
                                                <th style="display: none;" width="0%"></th>\n\
                                                </tr>';
                    var childtd12;
                    var k = 0;
                    $(data).find("content").each(function () {
                    $(this).find("m\\:properties, properties").each(function () {
                    var $info = $(this);
                            ebelp = $info.find("d\\:ebelp, ebelp").text();
                            txz01 = $info.find("d\\:txz01, txz01").text();
                            menge = $info.find("d\\:menge, menge").text();
                            meins = $info.find("d\\:meins, meins").text();
                            bpmng = $info.find("d\\:bpmng, bpmng").text();
                            bpmng =  parseInt(bpmng);
                            bpmng =  bpmng.toFixed(2);
                            chldebeln = $info.find("d\\:ebeln, ebeln").text();
                            childtd12 = "chltd" + chldebeln;
                            k += 1;
                            var b="";
                            if($.inArray('#childtd' + chldebeln + '_' + k ,  POMainState)>-1)
                                          {
                                          b="checked=checked";
                                      }
                            childtableexpandall=childtableexpandall+'<tr> <td width="10%" ><input type="checkbox" '+b+' class = "chcktbl" name="case[]" onchange="childonchangeExpandAll(this,\'childtd12' + chldebeln + '_' + k + '\',\'parentchkbox' + chldebeln + '\',' + chldebeln + ')" id="childtd' + chldebeln + '_' + k + '"/></td>\n\
                                                <td width="60%">' + txz01 + '</td>\n\
                                                <td width="20%"><input type="text" style="width:70px;text-align: right;"id="ChildQty' + childtd12 + '_' + k + '" name="txt1' + childtd + '" value="' + bpmng + '"  /></td>\n\
                                                <td width="10%">' + meins + '</td>\n\
                                                <td width="0px" style="display: none;">' + chldebeln + '</td>\n\
                                                <td width="0px" style="display: none;">\childtd' + chldebeln + '_' + k + '\</td>\n\
                                                <td width="0px" style="display: none;">' + k + '</td>\n\
                                                <td width="0px" style="display: none;">' + ebelp + '</td>\n\
                                                </tr>';
                        });
                    });
                    childtableexpandall=trHeaderExpandall+childtableexpandall+'</table>';
                    $("#" + childtd12).append(childtableexpandall);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                     createAlertMessage("Alert", "Error" , "alert", "e");
                }
            });
            $('#preloader').hide();
    }
}

function GenerateXML(buttonID){
    debugger;
  
if((buttonID == 'btnprocess')||(buttonID == 'openporeceived')){
 
 var variablereceiverid = JSON.parse(localStorage["Receiverid"]);
 selectedRows = JSON.parse(localStorage["finalarray"]);
 variablereceiptdate = JSON.parse(localStorage["ReceiptDateText"]);   
 //Dateformat(variablereceiptdate);
 result = "";
 result = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\
<atom:entry xmlns:atom=\"http://www.w3.org/2005/Atom\" xmlns:d=\"http://schemas.microsoft.com/ado/2007/08/dataservices\" xmlns:m=\"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata\">\n\
 <atom:content type=\"application/xml\">\n\
 <m:properties>\n\
 <d:Bednr>0112</d:Bednr>\n\
<d:Bedat>"+variablereceiptdate+"T00:00:00</d:Bedat>\n\
 <d:Rcvid>" + variablereceiverid + "</d:Rcvid>\n\
</m:properties>\n\
</atom:content>\n\
<atom:link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Items\" type=\"application/atom+xml;type=feed\" title=\"ZGR_PROJ2_SRV.Header_Items\">\n\
<m:inline>\n\
<atom:feed>\n\
";
    
for (var i = 0; i < selectedRows.length; i++) {
result += "<atom:entry>\n\
<atom:content type=\"application/xml\">\n\
<m:properties>\n\
<d:Bednr>0112</d:Bednr>\n\
<d:Ebeln>" + selectedRows[i].Ponumber + "</d:Ebeln>\n\
<d:Ebelp>" + selectedRows[i].ebelp + "</d:Ebelp>\n\
<d:Units>" + selectedRows[i].Unit + "</d:Units>\n\
<d:Menge>" + selectedRows[i].Qty + "</d:Menge>\n\
<d:Bedat>"+variablereceiptdate+"T00:00:00</d:Bedat>\n\
<d:Idesc>" + selectedRows[i].description + "</d:Idesc>\n\
<d:Vendr>" + selectedRows[i].vendor + "</d:Vendr>\n\
<d:Docno>" + selectedRows[i].docprnumber + "</d:Docno>\n\
</m:properties>\n\
</atom:content>\n\
</atom:entry>\n\
";
       
       if(buttonID != 'btnprocess'){
        
        $('#tblPOConfirm').append('<tr><td id="cPonumber"><b>' + selectedRows[i].Ponumber + '</b></td><td id="cdocprnumber">' + selectedRows[i].docprnumber + '</td><td id="cpodate">' + selectedRows[i].podate + '</td><td id="cvendor">' + selectedRows[i].vendor + '</td><td id="cdescription">' + selectedRows[i].description + '</td><td id="cQty" style="text-align:right;">' + selectedRows[i].Qty + '</td><td id="cUnit" style="text-align:center;">' + selectedRows[i].Unit + '</td></tr>');
        };
}


   if (navigator.userAgent.match("Android") || navigator.userAgent.match("iPhone")
        || navigator.userAgent.match("iPod")) {
       $("#cPonumber").hide();
       $("#cpodate").hide();
       $('#tblPOConfirm td:nth-child(1)').hide(); 
       $('#tblPOConfirm td:nth-child(3)').hide(); 
        };
result += "</atom:feed>\n\
</m:inline>\n\
</atom:link>\n\
</atom:entry>";
createXML = result;
    }    
}
var togglestatus = 0;
function OpenPoConfirmation() {
   debugger;
    var validreceiver = validateReceiver();
    if (validreceiver == true){
    var values = new Array();
    $.each($("input[name='case[]']:checked").closest("td").siblings("td"),
        function () {
            values.push($(this).text());
        });
    if (values == 0) {
        createAlertMessage("Alert", "Please select an item of PO " , "alert", "e");
    } else {
        var finalarray = new Array();
        for (var i = 0; i < values.length; i += 7) {
            obj = new Object();
            obj.description = values[i];
            obj.Unit = values[i + 2];
            obj.Ponumber = values[i + 3];
            obj.childtblrowid = values[i + 4];
            obj.childtblrownum = values[i + 5];
            obj.ebelp = values[i + 6];
            var truni = $("#test" + obj.Ponumber);
            obj.docprnumber = truni.closest("tr").find('td:nth-child(3)').text();
            obj.podate = truni.closest("tr").find('td:nth-child(4)').text();
            obj.vendor = truni.closest("tr").find('td:nth-child(5)').text();
            finalarray.push(obj);
        }
        for (var i = 0; i < finalarray.length; i++) {
            var childcheckboxid = finalarray[i].childtblrowid;
            if ($("#" + childcheckboxid).is(':checked')) {
                var ChildQtyValue = document.getElementById('ChildQtychltd' + finalarray[i].Ponumber + '_' + finalarray[i].childtblrownum + '').value;
                ChildQtyArray.push(ChildQtyValue);
               }
        }
        for (var i = 0; i < finalarray.length; i++) {
            finalarray[i].Qty = ChildQtyArray[i];
        }
        localStorage["finalarray"] = JSON.stringify(finalarray);
        selectedRows = JSON.parse(localStorage["finalarray"]);
        ReceiptDateText=document.getElementById("receiptDate").value;
         Receiverid=document.getElementById("receiverid").value;
       localStorage["Receiverid"] = JSON.stringify(Receiverid);
        localStorage["ReceiptDateText"] = JSON.stringify(ReceiptDateText);
        GenerateXML('openporeceived');
        window.location = "GRPOConfirm.html";
    }
    }
    
}

function ResetValues() {
   // CollapseAll();
   console.log(POMainState);
   debugger;
   POMainState=[];
   console.log(POMainState);

    for (var z = 1; z <= Ponumarray.length; z++) {
        var parentchkbox = "parentchkbox" + Ponumarray[z - 1];
        $("#" + parentchkbox).prop('checked', false);
        
        var childtr = "chldtr" + z;
        var childtd = "chltd" + Ponumarray[z - 1];
        $("#" + childtr).hide();
        $("#" + childtd).empty();
    }

  }


function childonchange(checkbox2, childtd, parentcheckboxid, ponumber) {
    var chklength = $("#chltd" + ponumber).find("input[type=checkbox]").length;
    var currentchk = $("#chltd" + ponumber).find("input:checkbox:checked").length;
    if (checkbox2.checked) {
        if($.inArray(checkbox2.id, POMainState)<0)
       POMainState.push("#"+checkbox2.id);
       if (chklength == currentchk) {
            $("#" + parentcheckboxid).prop('checked', true);
        }
    } else {
        POMainState.pop("#"+checkbox2.id);
        $("#" + parentcheckboxid).removeAttr('checked');
    }
}

function childonchangeExpandAll(checkbox2, childtd, parentcheckboxid, ponumber) {
    var chklength = $("#chltd" + ponumber).find("input[type=checkbox]").length;
    var currentchk = $("#chltd" + ponumber).find("input:checkbox:checked").length;
    if (checkbox2.checked) {
        if (chklength == currentchk) {
            $("#" + parentcheckboxid).prop('checked', true);
        }
    } else {
        $("#" + parentcheckboxid).removeAttr('checked');
    }
}

function SelectAllchildcheck(checkbox1, i, ponumber) {
    var childtr = "chldtr" + i;
    var childtd = "chltd" + ponumber;
    if (checkbox1.checked) {
        if ($("#" + childtd).find("input[type=checkbox]").length == 0) {
            for (var z = 1; z <= Ponumarray.length; z++) {
                var parentchkbox = "parentchkbox" + Ponumarray[z - 1];
                var childtr = "chldtr" + z;
                var childtd = "chltd" + Ponumarray[z - 1];
                $("#" + childtr).hide();
            }
            showGRPODetails(checkbox1.checked, i, ponumber, 0);
            $("#" + childtd).find("input[type=checkbox]").prop('checked', true);
        } 
        else {
            var childtr = "chldtr" + i;
            $("#" + childtr).show();
            $("#" + childtd).find("input[type=checkbox]").prop('checked', true);
            $("#" + childtd).find("input[type=checkbox]").each(
            function()
        {
       if($.inArray(this.id, POMainState)<0)
       POMainState.push("#"+this.id);
         });
        }
            } else {
        $("#" + childtd).find("input[type=checkbox]").removeAttr('checked');
        $("#" + childtd).find("input[type=checkbox]").each(
     function()
     {
       POMainState.pop("#"+this.id);  
     });
    }
}



function CollapseAll() {
    for (var z = 1; z <= Ponumarray.length; z++) {
        var parentchkbox = "parentchkbox" + Ponumarray[z - 1];
      //  $("#" + parentchkbox).prop('checked', false);
        
        var childtr = "chldtr" + z;
        var childtd = "chltd" + Ponumarray[z - 1];
        $("#" + childtr).hide();
        $("#" + childtd).empty();
    }
}



function poconfirmprint()
{
    window.print();
}

function poconfirmcancel()
{
    window.location = "GROpenPO.html";
}

function showGRPODetails(childtd1, i, ponumber, toggletrufls) {
    
      var childtr3 = "chldtr" + i;
        if ($("#chltd"+ponumber).is(":visible") == true) 
          {
              var childPODetails = "chldtr" + i;
              $("#" +childPODetails).toggle();
              //return false;
          }
          else{
        for (var z = 1; z <= Ponumarray.length; z++) {
        var parentchkbox = "parentchkbox" + Ponumarray[z - 1];
        var childtr = "chldtr" + z;
        var childtd = "chltd" + Ponumarray[z - 1];
        $("#" + childtr).hide();
            }
        var parentchkbox = "parentchkbox" + ponumber;
        // $("#" + parentchkbox).prop('checked', true);  
        var b="";
        //if (childtd1) b = "checked=checked";
        //else b = "";
        var childtr = "chldtr" + i;
        var childtd = "chltd" + ponumber;
    // alert(statustoggle);
        if (toggletrufls == 0) {
            $("#" + childtr).toggle(true);
        } 
        else {
        $("#" + childtr).toggle(true);
        }

        $("#" + childtd).append('<div id="preloader" align="center"><img src="images/section-loader.gif"/></div>');
        $('#preloader').show();
        var xml;
            $.ajax(
        {
                //url: "http://50.194.79.188:8080/sap/inv/opu/odata/sap/ZMM_CM_GR_OPENPO/zmm_gr_openpoCollection(bednr='',ponumber='" + ponumber + "')/poitems_r",
                url: "http://50.194.79.188:8080/sap/inv/opu/odata/sap/ZCM_GR_OPEN_PO/zmm_gr_open_poCollection(ponumber='" + ponumber + "',bednr='')/poitems_r",
                type: 'GET',
                contentType: "application/xml;charset=utf-8",
                dataType: "text",
                cache: false,
                success: function (data) {
                    var j = 0;
                    $("#" + childtd).show();
                    $("#" + childtd).empty();
                    var childtable="",trHeader="";
                    trHeader=trHeader+'<table id="childtable" class="childTablecss"  style="width:99.7%"  align="right">';
                    trHeader=trHeader+'<tr id="trChildHeader"> <th width="6%"></th>\n\
                                                    <th style="width:40%;"><span>Description</span></th>\n\
                                                    <th style="width:10%; align="right";"><span>Qty</span></th>\n\
                                                    <th style="width:8%;"><span>Unit</span></th>\n\
                                                    <th style="display: none;" width="0%"></th>\n\
                                                    <th style="display: none;" width="0%"></th>\n\
                                                    <th style="display: none;" width="0%"></th>\n\
                                                    <th style="display: none;" width="0%"></th>\n\
                                                    </tr>';
                    $(data).find("content").each(function () {
                    $(this).find("m\\:properties, properties").each(function () {
                            var $info = $(this);
                            ebelp = $info.find("d\\:ebelp, ebelp").text();
                            txz01 = $info.find("d\\:txz01, txz01").text();
                            menge = $info.find("d\\:menge, menge").text();
                            meins = $info.find("d\\:meins, meins").text();
                            bpmng = $info.find("d\\:bpmng, bpmng").text();
                            bpmng =  parseInt(bpmng);
                            bpmng =  bpmng.toFixed(2);
                            chldebeln1 = $info.find("d\\:ebeln, ebeln").text();
                            j += 1;
                            b="";
                            if( $.inArray('#childtd' + ponumber + '_' + j,  POMainState)>-1)
                                            {
                                            b="checked=checked";
                                        }
                            if(toggletrufls == 0)
                                {

                                if($.inArray('#childtd' + ponumber + '_' + j,  POMainState)<0)
                            POMainState.push('#childtd' + ponumber + '_' + j);
                                }
                            if(bpmng<=0)
                                {
                            childtable=childtable+'<tr> <td width="6%">\n\
                                                    <input type="checkbox" ' + b + ' class = "chcktbl" name="case[]" onchange="childonchange(this,\'childtd' + ponumber + '_' + j + '\',\'parentchkbox' + chldebeln1 + '\',' + ponumber + ')" id="childtd' + ponumber + '_' + j + '" disabled=true/></td>\n\
                                                    <td style="width:40%;">' + txz01 + '</td>\n\
                                                    <td style="width:10%;"align="right";"><input type="text" align="right" style="width:70px;text-align: right;" id="ChildQty' + childtd + '_' + j + '"  value="' + bpmng + '"  readonly/></td>\n\
                                                    <td style="width:8%;">' + meins + '</td>\n\
                                                    <td width="0px" style="display: none;">' + chldebeln1 + '</td>\n\
                                                    <td width="0px" style="display: none;">\childtd' + chldebeln1 + '_' + j + '\</td>\n\
                                                    <td width="0px" style="display: none;">' + j + '</td>\n\
                                                    <td width="0px" style="display: none;">' + ebelp + '</td>\n\
                                                    </tr>';

                                }
                                else
                                    {
                                        childtable=childtable+'<tr> <td width="6%">\n\
                                                    <input type="checkbox" ' + b + ' class = "chcktbl" name="case[]" onchange="childonchange(this,\'childtd' + ponumber + '_' + j + '\',\'parentchkbox' + chldebeln1 + '\',' + ponumber + ')" id="childtd' + ponumber + '_' + j + '"/></td>\n\
                                                    <td style="width:40%;">' + txz01 + '</td>\n\
                                                    <td style="width:10%;"><input type="text" align="right" style="width:70px;text-align: right;" id="ChildQty' + childtd + '_' + j + '"  value="' + bpmng + '" onBlur="checkvalue(this,\'ChildQty' + childtd + '_' + j + '\);"/></td>\n\
                                                    <td style="width:8%;">' + meins + '</td>\n\
                                                    <td width="0px" style="display: none;">' + chldebeln1 + '</td>\n\
                                                    <td width="0px" style="display: none;">\childtd' + chldebeln1 + '_' + j + '\</td>\n\
                                                    <td width="0px" style="display: none;">' + j + '</td>\n\
                                                    <td width="0px" style="display: none;">' + ebelp + '</td>\n\
                                                    </tr>';

                                    }
                        });
                    });
                    childtable=trHeader+childtable+'</table>';
                        $("#" + childtd).append(childtable);
                        if(toggletrufls==0)
                        $("#" + childtd).find("input[type=checkbox]").prop('checked', true);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    createAlertMessage("Alert", "Error" , "alert", "e");
                }
            });
          }   
 }     

function getTokenandProcessPO() {
   // GenerateXML();
    GenerateXML('btnprocess');
   //$('#section-loaderconf').show();
    OData.request({
            requestUri: "https://50.194.79.188:8080/sap/inv/opu/odata/sap/ZGR_PROJ2_SRV/Headers",
            method: "GET",
            headers: {
             "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/atom+xml",
                "DataServiceVersion": "2.0",
                "X-CSRF-Token": "fetch",
                "Authorization": "Basic TlJBSkFOOmd5YW5zeXMx"
            }
        },
        function (data, response) {
            var header_xcsrf_token = response.headers['x-csrf-token'];
            var header_content_type = response.headers['Content-Type'];
            response.data = response.body;
            processPO(header_xcsrf_token);
        },
        function (err) {
            alert("Read failed. \nError code " + err.response.statusCode + ". \n" + err.response.message);
        }
    );
}

 
function processPO(token)
{ 
   //  var resultXml = JSON.parse(localStorage["createXML"]);
 
    var resultXml = createXML;
    $.ajax({
        url: "https://192.168.2.133:8080/sap/inv/opu/odata/sap/ZGR_PROJ2_SRV/Headers",
        data: resultXml,
        type: 'POST',
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/atom+xml",
            "Accept": "application/atom+xml,application/atomsvc+xml,application/xml,application/json",
            "Authorization": "Basic TlJBSkFOOmd5YW5zeXMx"
        },
        success: function (xhr,response,a,b,c) {
            //$('#section-loaderconf').hide();
            $(xhr).find("content").each(function () {
            $(this).find("m\\:properties, properties").each(function () {
            var $info = $(this);
            Matdc = $info.find("d\\:Matdc, Matdc").text();
                });
            });
            msg = "Goods Receipt's "+Matdc+" created Successfully!";
            $('#section-loaderconf').hide();
            createAlertMessage("Success", msg,"btnprocess","alert","e");
        },
        error: function (xhr, ajaxOptions, thrownError) {
        $('#section-loaderconf').hide();
         var a =  xhr.responseText;
         var b = $(a).find("message");
         var c = $(b).text();
         c = c.split("'");
         msg = c[1];
           if(msg.indexOf("exceeded")==-1)
               {
                 
               }
               else{
                  msg = "GR was not created, Quantity Exceeded";
               }
        createAlertMessage("Error", msg,"btnprocess","alert","e");
        }
    });
}

function Reset() {
    debugger;
	conHeight = $('.content-area').outerHeight() - $('.content-container').height();	
	hdrHeight = $('.main-header').outerHeight() + $('.info-bar').outerHeight();	
	$('.content-container').height($(window).height() - (hdrHeight + conHeight));
	//$('.scrollable-area').height($(window).height() - (hdrHeight + conHeight));
       // $('#maindiv').height($(window).height() - (hdrHeight + conHeight));
	//$('#maindivconf').height($(window).height() - (hdrHeight + conHeight));
	$('.content-container').css("min-height",$(window).height() - (hdrHeight + conHeight)); 
        
          if (navigator.userAgent.match("iPad")) {
         $('.content-container').css("min-height",968); 
         $('.wrapper').css("max-width",1024); 
         
          }
	
};

function cancelemail(){
      location.href = "https://192.168.2.133:8080/GoodsReceipt-1.0/GRPOConfirm.html";
}
