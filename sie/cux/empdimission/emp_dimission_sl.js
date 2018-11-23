/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 Sep 2018     Administrator
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function createapproval(request, response){
	
    if(request.getMethod() == 'GET'){
    	
		//通过登录账户抓取填表人信息
		var userId = nlapiGetContext().getUser();
		var userRecord = nlapiLoadRecord('employee',userId);
		var userName = userRecord.getFieldValue('entityid');
    	
        //使用填表人信息抓取之前填写的辞职申请
        var columns = [];
        columns[0] = new nlobjSearchColumn('custrecord_emp_id');
        columns[1] = new nlobjSearchColumn('custrecordcustrecord_emp_number').setSort(true);
        var filters = [];
        filters[0] = new nlobjSearchFilter('custrecord_emp_id',null,'is',userId);    
        var result = nlapiSearchRecord('customrecord_emp_dismission',null,filters,columns);
        
        var recordId =result[0].getId();
        var recordType = 'customrecord_emp_dismission';
        var empRecord = nlapiLoadRecord(recordType,recordId);
        
        //创建一个新的辞职审批记录
        var newRecord = nlapiCreateRecord('customrecordcustomrecord_emp_approval');
        
        //将辞职申请表的信息填入辞职审批表（主要信息部分）
        newRecord.setFieldValue('custrecord_emp_approval_number',empRecord.getFieldValue('custrecordcustrecord_emp_number'));
        newRecord.setFieldValue('custrecord_emp_approval_customnumber',empRecord.getFieldValue('custrecordcustrecord_emp_custnumber'));
        newRecord.setFieldValue('custrecord_emp_approval_name',empRecord.getFieldValue('custrecord_emp_id'));
        newRecord.setFieldValue('custrecord_emp_approval_department',empRecord.getFieldValue('custrecordcustrecord_emp_department'));
        newRecord.setFieldValue('custrecord_emp_approval_post',empRecord.getFieldValue('custrecordcustrecord_emp_post'));
        newRecord.setFieldValue('custrecord_emp_approval_leader',empRecord.getFieldValue('custrecordcustrecord_emp_leader'));
        newRecord.setFieldValue('custrecord_emp_approval_types',empRecord.getFieldValue('custrecordcustrecord_emp_types'));
        newRecord.setFieldValue('custrecord_emp_approval_entrydate',empRecord.getFieldValue('custrecordcustrecord_emp_entrydate'));
        newRecord.setFieldValue('custrecord_emp_approval_resignationdate',empRecord.getFieldValue('custrecordcustrecord_emp_resignationdate'));
        newRecord.setFieldValue('custrecord_emp_approval_leavedate',empRecord.getFieldValue('custrecordcustrecord_emp_leavedate'));
        newRecord.setFieldValue('custrecord_emp_approval_address',empRecord.getFieldValue('custrecordcustrecord_emp_address'));
        newRecord.setFieldValue('custrecord_emp_approval_status','未开始');
        nlapiSubmitField(recordType, recordId, 'custrecord_emp_status', '已提交');
        
        //将辞职申请表的信息填入辞职审批表（离职原因部分）
        newRecord.setFieldValue('custrecord_emp_approval_one',empRecord.getFieldValue('custrecordcustrecord_emp_one'));
        newRecord.setFieldValue('custrecord_emp_approval_two',empRecord.getFieldValue('custrecordcustrecord_emp_two'));
        newRecord.setFieldValue('custrecord_emp_approval_three',empRecord.getFieldValue('custrecordcustrecord_emp_three'));
        newRecord.setFieldValue('custrecord_emp_approval_four',empRecord.getFieldValue('custrecordcustrecord_emp_four'));
        newRecord.setFieldValue('custrecord_emp_approval_five',empRecord.getFieldValue('custrecordcustrecord_emp_five'));
        newRecord.setFieldValue('custrecord_emp_approval_six',empRecord.getFieldValue('custrecordcustrecord_emp_six'));
        newRecord.setFieldValue('custrecord_emp_approval_seven',empRecord.getFieldValue('custrecordcustrecord_emp_seven'));
        newRecord.setFieldValue('custrecord_emp_approval_eight',empRecord.getFieldValue('custrecordcustrecord_emp_eight'));
        newRecord.setFieldValue('custrecord_emp_approval_nine',empRecord.getFieldValue('custrecordcustrecord_emp_nine'));
        newRecord.setFieldValue('custrecord_emp_approval_suggest',empRecord.getFieldValue('custrecordcustrecord_emp_suggest'));
        
        //将辞职申请表的信息填入辞职审批表（审批流程部分）
        newRecord.setFieldValue('custrecord_emp_approval_departmenthead',empRecord.getFieldValue('custrecordcustrecord_emp_departmenthead'));
        newRecord.setFieldValue('custrecord_emp_approval_accounting',empRecord.getFieldValue('custrecord_emp_accounting'));
        newRecord.setFieldValue('custrecord_emp_approval_director',empRecord.getFieldValue('custrecord_emp_director'));
        newRecord.setFieldValue('custrecord_emp_approval_management',empRecord.getFieldValue('custrecord_emp_management'));
        newRecord.setFieldValue('custrecord_emp_approval_administrative',empRecord.getFieldValue('custrecord_emp_administrative'));

        nlapiSubmitRecord(newRecord); 
        
        //response.write('提交成功');
        response.sendRedirect('RECORD', 'customrecord_emp_dismission',recordId,false);
        
        //window.location.href='https://system.netsuite.com/app/common/custom/custrecordentrylist.nl?rectype=112&whence=';
    }else{
    	response.write('提交失败');
    }
	
}



