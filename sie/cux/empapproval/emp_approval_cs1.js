/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       16 Oct 2018     Administrator
 *
 */
function refuse_A(){

    var value = nlapiGetFieldValue('custpage_textarea');
    var recordType = nlapiGetFieldValue('custpage_recordtype');
    var recordId = nlapiGetFieldValue('custpage_recordid');
    
    if(value == null || value == ''){
    	
    	alert('请填写拒绝原因');
    	
    }else{
    	
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_opinion1','拒绝');
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_description1',value);
        var approvalDate = new Date();
        var approvalTime = nlapiDateToString(approvalDate);
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_time1',approvalTime);
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_status','审批驳回');

        window.close();

        opener.location.reload();//刷新父窗口
    	
    }
}

function agree_A(){

    var value = nlapiGetFieldValue('custpage_textarea');
    var recordType = nlapiGetFieldValue('custpage_recordtype');
    var recordId = nlapiGetFieldValue('custpage_recordid');
    var leaveTime = nlapiGetFieldValue('custpage_date');
    
    if(leaveTime == null || leaveTime == ''){
    	
    	alert('请填写预计止薪日期');
    	
    }else{
    	
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_opinion1','批准');
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_description1',value);
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_stoppay',leaveTime);
        var approvalDate = new Date();
        var approvalTime = nlapiDateToString(approvalDate);
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_time1',approvalTime);
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_status','需财务中心负责人审批');

        window.close();

        opener.location.reload();//刷新父窗口
    	
    }
    
}

function refuse_B(){

    var value = nlapiGetFieldValue('custpage_textarea');
    var recordType = nlapiGetFieldValue('custpage_recordtype');
    var recordId = nlapiGetFieldValue('custpage_recordid');
    
    if(value == null || value == ''){
    	
    	alert('请填写拒绝原因');
    	
    }else{
    	
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_opinion2','拒绝');
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_description2',value);
        var approvalDate = new Date();
        var approvalTime = nlapiDateToString(approvalDate);
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_time2',approvalTime);
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_status','审批驳回');

        window.close();

        opener.location.reload();//刷新父窗口
    	
    }
}

function agree_B(){

    var value = nlapiGetFieldValue('custpage_textarea');
    var recordType = nlapiGetFieldValue('custpage_recordtype');
    var recordId = nlapiGetFieldValue('custpage_recordid');
    nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_opinion2','批准');
    nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_description2',value);
    var approvalDate = new Date();
    var approvalTime = nlapiDateToString(approvalDate);
    nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_time2',approvalTime);
    nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_status','需人才行政中心负责人审批');

    window.close();

    opener.location.reload();//刷新父窗口
}

function refuse_C(){

    var value = nlapiGetFieldValue('custpage_textarea');
    var recordType = nlapiGetFieldValue('custpage_recordtype');
    var recordId = nlapiGetFieldValue('custpage_recordid');
    
    if(value == null || value == ''){
    	
    	alert('请填写拒绝原因');
    	
    }else{
    	
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_opinion3','拒绝');
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_description3',value);
        var approvalDate = new Date();
        var approvalTime = nlapiDateToString(approvalDate);
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_time3',approvalTime);
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_status','审批驳回');

        window.close();

        opener.location.reload();//刷新父窗口
    	
    }
}

function agree_C(){

    var value = nlapiGetFieldValue('custpage_textarea');
    var recordType = nlapiGetFieldValue('custpage_recordtype');
    var recordId = nlapiGetFieldValue('custpage_recordid');
    
    if(value == null || value == ''){
    	
    	alert('请填写验证信息');
    	
    }else{
    	
    nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_opinion3','批准');
    nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_description3',value);
    var approvalDate = new Date();
    var approvalTime = nlapiDateToString(approvalDate);
    nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_time3',approvalTime);
    nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_status','需IT管理专员审批');

    window.close();

    opener.location.reload();//刷新父窗口
    
    }
}

function refuse_D(){

    var value = nlapiGetFieldValue('custpage_textarea');
    var recordType = nlapiGetFieldValue('custpage_recordtype');
    var recordId = nlapiGetFieldValue('custpage_recordid');
    
    if(value == null || value == ''){
    	
    	alert('请填写拒绝原因');
    	
    }else{
    	
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_opinion4','拒绝');
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_description4',value);
        var approvalDate = new Date();
        var approvalTime = nlapiDateToString(approvalDate);
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_time4',approvalTime);
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_status','审批驳回');

        window.close();

        opener.location.reload();//刷新父窗口
    	
    }
}

function agree_D(){

    var value = nlapiGetFieldValue('custpage_textarea');
    var recordType = nlapiGetFieldValue('custpage_recordtype');
    var recordId = nlapiGetFieldValue('custpage_recordid');
    nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_opinion4','批准');
    nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_description4',value);
    var approvalDate = new Date();
    var approvalTime = nlapiDateToString(approvalDate);
    nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_time4',approvalTime);
    nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_status','审批完成');

    window.close();

    opener.location.reload();//刷新父窗口
}

function refuse_E(){

    var value = nlapiGetFieldValue('custpage_textarea');
    var recordType = nlapiGetFieldValue('custpage_recordtype');
    var recordId = nlapiGetFieldValue('custpage_recordid');
    
    if(value == null || value == ''){
    	
    	alert('请填写拒绝原因');
    	
    }else{
    	
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_opinion5','拒绝');
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_description5',value);
        var approvalDate = new Date();
        var approvalTime = nlapiDateToString(approvalDate);
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_time5',approvalTime);
        nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_status','审批驳回');

        window.close();

        opener.location.reload();//刷新父窗口
    	
    }
}

function agree_E(){

    var value = nlapiGetFieldValue('custpage_textarea');
    var recordType = nlapiGetFieldValue('custpage_recordtype');
    var recordId = nlapiGetFieldValue('custpage_recordid');
    nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_opinion5','批准');
    nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_description5',value);
    var approvalDate = new Date();
    var approvalTime = nlapiDateToString(approvalDate);
    nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_time5',approvalTime);
    nlapiSubmitField(recordType,recordId,'custrecord_emp_approval_status','需综合管理专员审批');

    window.close();

    opener.location.reload();//刷新父窗口
}

////创建函数用于隐藏SL窗口的header
//(function hiddenHeader(){
//	
//	document.getElementById('div__header').style.display="none";//此写法为立即执行函数
//	
//})();

//创建函数用于删除SL窗口的header
//(function hiddenHeader(){
//	
//	var header = document.getElementById('div__header');
//	if (header != undefined)
//		header.parentNode.removeChild(header);
//	
//})();

//放在脚本的最后面,去除重载前提示
window.page_unload = null;