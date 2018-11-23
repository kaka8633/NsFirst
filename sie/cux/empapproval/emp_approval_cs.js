/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       24 Sep 2018     Administrator
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @returns {Boolean} True to continue save, false to abort save
 */
function clientSaveRecord(){
	
	var check1 = nlapiGetFieldValue('custrecord_emp_approval_one');
	var check2 = nlapiGetFieldValue('custrecord_emp_approval_two');
	var check3 = nlapiGetFieldValue('custrecord_emp_approval_three');
	var check4 = nlapiGetFieldValue('custrecord_emp_approval_four');
	var check5 = nlapiGetFieldValue('custrecord_emp_approval_five');
	var check6 = nlapiGetFieldValue('custrecord_emp_approval_six');
	var check7 = nlapiGetFieldValue('custrecord_emp_approval_seven');
	var check8 = nlapiGetFieldValue('custrecord_emp_approval_eight');
	var check9 = nlapiGetFieldValue('custrecord_emp_approval_nine');
	var leaveTime = nlapiGetFieldValue('custrecord_emp_approval_leavedate');
	
	if(check1 == 'F' && check2 == 'F' && check3 == 'F' && check4 == 'F' && check5 == 'F' && check6 == 'F' && check7 == 'F' && check8 == 'F'){
		alert('请选择至少一项离职原因');
		return false;
	}else if(check8 == 'T' && check9 == ''){
		alert('请填写其他离职原因');
		return false;
	}else if(leaveTime == '' || leaveTime == null){
		alert('请填写预计离职日期');
		return false;
	}else{	
		return true;
	}

}

function resubmit(){
	
	
	
}


function click1(){
    var url = '/app/site/hosting/scriptlet.nl?script=326&deploy=1';
    url += '&custparam_id=' + nlapiGetRecordId();
    url += '&custparam_type=' + nlapiGetRecordType();
    window.open(url,
    		"",
    		'height=250,innerHeight=250,width=350,innerWidth=350,top=100,left=400,status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}

function click11(){
    var url = '/app/site/hosting/scriptlet.nl?script=321&deploy=1';
    url += '&custparam_id=' + nlapiGetRecordId();
    url += '&custparam_type=' + nlapiGetRecordType();
    window.open(url,
    		"",
    		'height=350,innerHeight=350,width=360,innerWidth=360,top=100,left=400,status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}

function click2(){
	var url = '/app/site/hosting/scriptlet.nl?script=325&deploy=1';
    url += '&custparam_id=' + nlapiGetRecordId();
    url += '&custparam_type=' + nlapiGetRecordType();
    window.open(url,
    		"",
    		'height=250,innerHeight=250,width=350,innerWidth=350,top=100,left=400,status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}

function click22(){
    var url = '/app/site/hosting/scriptlet.nl?script=320&deploy=1';
    url += '&custparam_id=' + nlapiGetRecordId();
    url += '&custparam_type=' + nlapiGetRecordType();
    window.open(url,
    		"",
    		'height=250,innerHeight=250,width=350,innerWidth=350,top=100,left=400,status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}


function click3(){
	var url = '/app/site/hosting/scriptlet.nl?script=324&deploy=1';
    url += '&custparam_id=' + nlapiGetRecordId();
    url += '&custparam_type=' + nlapiGetRecordType();
    window.open(url,
    		"",
    		'height=250,innerHeight=250,width=350,innerWidth=350,top=100,left=400,status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}

function click33(){
    var url = '/app/site/hosting/scriptlet.nl?script=319&deploy=1';
    url += '&custparam_id=' + nlapiGetRecordId();
    url += '&custparam_type=' + nlapiGetRecordType();
    window.open(url,
    		"",
    		'height=250,innerHeight=250,width=350,innerWidth=350,top=100,left=400,status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}

function click4(){
	var url = '/app/site/hosting/scriptlet.nl?script=323&deploy=1';
    url += '&custparam_id=' + nlapiGetRecordId();
    url += '&custparam_type=' + nlapiGetRecordType();
    window.open(url,
    		"",
    		'height=250,innerHeight=250,width=350,innerWidth=350,top=100,left=400,status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}


function click44(){
    var url = '/app/site/hosting/scriptlet.nl?script=318&deploy=1';
    url += '&custparam_id=' + nlapiGetRecordId();
    url += '&custparam_type=' + nlapiGetRecordType();
    window.open(url,
    		"",
    		'height=250,innerHeight=250,width=350,innerWidth=350,top=100,left=400,status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}


function click5(){
    var url = '/app/site/hosting/scriptlet.nl?script=322&deploy=1';
    url += '&custparam_id=' + nlapiGetRecordId();
    url += '&custparam_type=' + nlapiGetRecordType();
    window.open(url,
    		"",
    		'height=250,innerHeight=250,width=350,innerWidth=350,top=100,left=400,status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}

function click55(){
    var url = '/app/site/hosting/scriptlet.nl?script=317&deploy=1';
    url += '&custparam_id=' + nlapiGetRecordId();
    url += '&custparam_type=' + nlapiGetRecordType();
    window.open(url,
    		"",
    		'height=250,innerHeight=250,width=350,innerWidth=350,top=100,left=400,status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}




function pageInit(type){
	if(type == 'edit'){

		//通过登录账户抓取审批人信息
		var userId = nlapiGetContext().getUser();
		
		//抓取当前审批记录的五层审批人信息和审批意见
		var recordType = 'customrecordcustomrecord_emp_approval';
		var recordId = nlapiGetRecordId();
		var approvalRecord = nlapiLoadRecord(recordType,recordId);
		var approvalStatus = approvalRecord.getFieldValue('custrecord_emp_approval_status');
		var userName = approvalRecord.getFieldValue('custrecord_emp_approval_name');
		
		if(approvalStatus == '审批驳回' && userName == userId){
			
		    //放开离职理由部分字段 允许重新编辑
		    nlapiDisableField('custrecord_emp_approval_one', false);
		    nlapiDisableField('custrecord_emp_approval_two', false);
		    nlapiDisableField('custrecord_emp_approval_three', false);
		    nlapiDisableField('custrecord_emp_approval_four', false);
		    nlapiDisableField('custrecord_emp_approval_five', false);
		    nlapiDisableField('custrecord_emp_approval_six', false);
		    nlapiDisableField('custrecord_emp_approval_seven', false);
		    nlapiDisableField('custrecord_emp_approval_eight', false);
		    nlapiDisableField('custrecord_emp_approval_suggest', false);
		    nlapiDisableField('custrecord_emp_approval_leavedate', false);
			
		};
    	
    	var approval1 = approvalRecord.getFieldValue('custrecord_emp_approval_departmenthead');
    	var opinion1 = approvalRecord.getFieldValue('custrecord_emp_approval_opinion1');
    	var approval2 = approvalRecord.getFieldValue('custrecord_emp_approval_accounting');
    	var opinion2 = approvalRecord.getFieldValue('custrecord_emp_approval_opinion2');
    	var approval3 = approvalRecord.getFieldValue('custrecord_emp_approval_director');
    	var opinion3 = approvalRecord.getFieldValue('custrecord_emp_approval_opinion3');
    	var approval4 = approvalRecord.getFieldValue('custrecord_emp_approval_management');
    	var opinion4 = approvalRecord.getFieldValue('custrecord_emp_approval_opinion4');
    	var approval5 = approvalRecord.getFieldValue('custrecord_emp_approval_administrative');
    	var opinion5 = approvalRecord.getFieldValue('custrecord_emp_approval_opinion5');
    	var testname = approvalRecord.getFieldValue('custrecord_emp_approval_name');
    	
    	if(userId == approval1 && opinion1 == null){
    		
    		//nlapiDisableField('custrecord_emp_approval_stoppay', false);
    		
    		nlapiSetFieldValue('custrecord_emp_approval_status','审批中');
    		
    	}else if(testname == userId && opinion1 == null){
    		
    		nlapiSetFieldValue('custrecord_emp_approval_status','审批中');
    		
    	}else if(userId == approval1 && opinion1 != null){
    		
    		alert('您已经完成审批');
    		
    	}else if(userId == approval2 && opinion2 != null){
    		
    		alert('您已经完成审批');
    		
    	}else if(userId == approval3 && opinion3 != null){
    		
    		alert('您已经完成审批');
    		
    	}else if(userId == approval4 && opinion4 != null){
    		
    		alert('您已经完成审批');
    		
    	}else if(userId == approval5 && opinion5 != null){
    		
    		alert('您已经完成审批');
    		
    	}
	}
	// 放在脚本的最后面,去除重载前提示
	window.page_unload = null;
}


function fieldChange(){
	
	if(nlapiGetFieldValue('custrecord_emp_approval_eight') == 'T'){
		nlapiDisableField('custrecord_emp_approval_nine',false);
	}else{
		nlapiDisableField('custrecord_emp_approval_nine',true);
	}
	
}

//放在脚本的最后面,去除重载前提示
window.page_unload = null;