/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 Sep 2018     Administrator
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
function userEventBeforeLoad(type, form, request){
	
    //当进入编辑页面且<审批状态>不为驳回时，增添批准和拒绝按钮
    if(type == 'edit'){
    	
    	//通过登录账户抓取审批人信息
    	var userId = nlapiGetContext().getUser();
    	
    	//抓取当前审批记录的五层审批人信息和审批意见
    	var recordType = 'customrecordcustomrecord_emp_approval';
    	var recordId = nlapiGetRecordId();
    	var approvalRecord = nlapiLoadRecord(recordType,recordId);
    	var approvalStatus = approvalRecord.getFieldValue('custrecord_emp_approval_status');
    	var userName = approvalRecord.getFieldValue('custrecord_emp_approval_name');
    	
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

    	//插入网页跳转函数
    	form.setScript('customscript_emp_yhrtest_cs');
    	
    	//当是创建人登录切审批被驳回时，给予重新编辑并提交审批的机会
    	if(approvalStatus == '审批驳回' && userName == userId){
    		
        	//隐藏<提交>等多余按钮
        	var result1 = form.getButton('changeid');
        	result1.setVisible(false);
        	var result2 = form.getButton('resetter');
        	result2.setVisible(false);
    	    //var result3 = form.getButton('submitter');
    	    //result3.setVisible(false);
    		
    	    var result4 = form.getButton('submitter');
    	    result4.setLabel('重新提交');
    		
    	}else{
    		
        	//隐藏<提交>等多余按钮
        	var result1 = form.getButton('changeid');
        	result1.setVisible(false);
        	var result2 = form.getButton('resetter');
        	result2.setVisible(false);
    	    var result3 = form.getButton('submitter');
    	    result3.setVisible(false);
    		
    	};
    	
    	//对五层审批人进行核对
    	if(userId == approval1 && opinion1 == null){
    		
    		approvalRecord.setFieldValue('custrecord_emp_approval_status','需办公室负责人审批');
    		   		
    		//借用url进行数据传输
    	    var script = 'click1()';
    		var script1 = 'click11()';
    		//form.addSubmitButton('同意');
    		form.addButton('custpage_button5', '批准', script1);
    		form.addButton('custpage_button1','拒绝',script);
    	}else if(userId == approval2 && opinion1 == '批准' && opinion2 == null){

    		var script = 'click2()';
    		var script1 = 'click22()';
    		//form.addSubmitButton('同意');
    		form.addButton('custpage_button6', '批准', script1);
    		form.addButton('custpage_button2','拒绝',script);
    	}else if(userId == approval5 && opinion2 == '批准' && opinion5 == null){

    		var script = 'click5()';
    		var script1 = 'click55()';
    		//form.addSubmitButton('同意');
    		form.addButton('custpage_button11', '批准', script1);
    		form.addButton('custpage_button12','拒绝',script);
    	}else if(userId == approval3 && opinion5 == '批准' && opinion3 == null){

    		var script = 'click3()';
    		var script1 = 'click33()';
    		//form.addSubmitButton('同意');
    		form.addButton('custpage_button7', '粘贴验证信息', script1);
    		form.addButton('custpage_button3','拒绝',script);
    	}else if(userId == approval4 && opinion3 == '批准' && opinion4 == null){
    		
    		var script = 'click4()';
    		var script1 = 'click44()';
    		//form.addSubmitButton('同意');
    		form.addButton('custpage_button8', '批准', script1);
    		form.addButton('custpage_button4','拒绝',script);
    	};
    	
    //当审批被驳回时，审批提交人可以编辑并重新提交	
    }else if(type == 'view'){
    	
    	//通过登录账户抓取审批人信息
    	var userId = nlapiGetContext().getUser();
    	
    	//抓取当前审批记录的五层审批人信息和审批意见
    	var recordType = 'customrecordcustomrecord_emp_approval';
    	var recordId = nlapiGetRecordId();
    	var approvalRecord = nlapiLoadRecord(recordType,recordId);
    	var approvalStatus = approvalRecord.getFieldValue('custrecord_emp_approval_status');
    	var userName = approvalRecord.getFieldValue('custrecord_emp_approval_name');
    	
    	var approval1 = approvalRecord.getFieldValue('custrecord_emp_approval_departmenthead');
    	var approval2 = approvalRecord.getFieldValue('custrecord_emp_approval_accounting');
    	var approval3 = approvalRecord.getFieldValue('custrecord_emp_approval_director');
    	var approval4 = approvalRecord.getFieldValue('custrecord_emp_approval_management');
    	var approval5 = approvalRecord.getFieldValue('custrecord_emp_approval_administrative');
    	
    	//当查看人为离职申请提交人且申请被驳回时，保留<编辑>按钮
    	if(approvalStatus == '审批驳回' && userName == userId){
    		
    		return false;
    		
    		//当查看人不为审批节点中的任何一位时，删除<编辑>按钮
    	}else if(userId != approval1 && userId != approval2 && userId != approval3 && userId != approval4 && userId != approval5){
    		
        	var result1 = form.getButton('edit');
        	result1.setVisible(false);
    		
    	}
    	
    	//当审批节点的用户进入界面时，’编辑‘按钮改为’审批‘；
	    var result2 = form.getButton('edit');
	    result2.setLabel('审批');
    	
    }
	
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit
 *                      approve, reject, cancel (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF)
 *                      markcomplete (Call, Task)
 *                      reassign (Case)
 *                      editforecast (Opp, Estimate)
 * @returns {Void}
 */
function userEventBeforeSubmit(type){
 
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */
function userEventAfterSubmit(type){
	
	if(type == 'edit'){
		
		//通过登录账户抓取审批人信息
		var userId = nlapiGetContext().getUser();
		
		//抓取当前审批记录的五层审批人信息和审批意见
		var recordType = 'customrecordcustomrecord_emp_approval';
		var recordId = nlapiGetRecordId();
		var approvalRecord = nlapiLoadRecord(recordType,recordId);
		var approvalStatus = approvalRecord.getFieldValue('custrecord_emp_approval_status');
		var userName = approvalRecord.getFieldValue('custrecord_emp_approval_name');
		
		if(approvalStatus == '审批驳回' && userId == userName){
			
			approvalRecord.setFieldValue('custrecord_emp_approval_opinion1', null);
			approvalRecord.setFieldValue('custrecord_emp_approval_description1', null);
			approvalRecord.setFieldValue('custrecord_emp_approval_time1', null);
			approvalRecord.setFieldValue('custrecord_emp_approval_opinion2', null);
			approvalRecord.setFieldValue('custrecord_emp_approval_description2', null);
			approvalRecord.setFieldValue('custrecord_emp_approval_time2', null);
			approvalRecord.setFieldValue('custrecord_emp_approval_opinion5', null);
			approvalRecord.setFieldValue('custrecord_emp_approval_description5', null);
			approvalRecord.setFieldValue('custrecord_emp_approval_time5', null);
			approvalRecord.setFieldValue('custrecord_emp_approval_opinion3', null);
			approvalRecord.setFieldValue('custrecord_emp_approval_description3', null);
			approvalRecord.setFieldValue('custrecord_emp_approval_time3', null);
			approvalRecord.setFieldValue('custrecord_emp_approval_opinion4', null);
			approvalRecord.setFieldValue('custrecord_emp_approval_description4', null);
			approvalRecord.setFieldValue('custrecord_emp_approval_time4', null);
			approvalRecord.setFieldValue('custrecord_emp_approval_leavedate', null);
			approvalRecord.setFieldValue('custrecord_emp_approval_status', '未开始');
			
			nlapiSubmitRecord(approvalRecord);
		}
		
	}

}
