/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       18 Sep 2018     Administrator
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
	
	//判断，只有当离职申请已保存之后才可以进行提交
	if(type == 'view'){
	    
		//创建‘提交’按钮，并触发转到审批流
	    var status = nlapiGetFieldValue('custrecord_emp_status');
	    
	    if(status == null||status == '未提交'){
	    	
			var script = "window.location.href='/app/site/hosting/scriptlet.nl?script=945&deploy=1'";
			form.addButton('custpage_submit','提交',script);
	    	
	    }else if(status == '已提交'){
	    	
        	var result1 = form.getButton('edit');
        	result1.setVisible(false);
	    	
	    };
	    
	}else{
		
		var recordType = nlapiGetRecordType();
		var recordId = nlapiGetRecordId();
		var status = nlapiGetFieldValue('custrecord_emp_status');
		
		//编辑状态时去掉按钮<更改ID>
		if(type == 'edit'){
        	var result1 = form.getButton('changeid');
        	result1.setVisible(false);
        	
        	if(status == '已提交'){
        		nlapiSetRedirectURL('RECORD',recordType,recordId,false);
        	}
		}
		
		//通过登录账户抓取填表人信息
		var userId = nlapiGetContext().getUser();
		var userRecord = nlapiLoadRecord('employee',userId);
		var userName = userRecord.getFieldValue('entityid');
		
		nlapiSetFieldValue('custrecord_emp_id', userName, true, true);
		nlapiSetFieldValue('custrecord_emp_id', userId, true, true);
		
	    //生成年月日
	    var year = new Date().getFullYear(); 
	    var month = new Date().getMonth()+1;
	    var day = new Date().getDate();
	    var dateTime = String(year)+String(month)+String(day);
	    //抓取记录ID
	    var recordId = userRecord.getId();
	    
	    //生成状态
	    var status = nlapiGetFieldValue('custrecord_emp_status');
	    
	    if(status == null){
	    	
	    	nlapiSetFieldValue('custrecord_emp_status', '未提交',true,true);
	    	
	    }
	    //1.生成单号 
	     //var createNumber =  dateTime+recordId;
	     
	     nlapiSetFieldValue('custrecordcustrecord_emp_number', dateTime, true, true);
	     
	     //2.抓取 员工编号 字段的值放入 员工编号
	     var staffNumber = userRecord.getFieldValue('department');
	     
	     nlapiSetFieldValue('custrecordcustrecord_emp_custnumber',staffNumber,true,true);
	     
	     //3.抓取员工记录的部门信息并放置
	     var department1 = userRecord.getFieldValue('department');
	     
	     nlapiSetFieldValue('custrecordcustrecord_emp_department',department1,true,true);
	     
	     //4.抓取员工记录里的 岗位 来填充岗位
	     var post = userRecord.getFieldValue('title');
	     
	     nlapiSetFieldValue('custrecordcustrecord_emp_post',post,true,true);
	     
	     //5.抓取员工记录里 主管 项目的值，放入 直接领导
	     var leader = userRecord.getFieldValue('supervisor');
	     
	     nlapiSetFieldValue('custrecordcustrecord_emp_leader',leader,true,true);
	     
	     //6.抓取sublist里人力资源部分 类型 字段的值，放入员工类型
	     var type = userRecord.getFieldValue('custentity_type_if_billing');
	     
	     nlapiSetFieldValue('custrecordcustrecord_emp_types',type,true,true);
	     
	     //7.抓取sublist里人力资源部分 入职时间 字段的值，放入入职日期
	     var entryDate = userRecord.getFieldValue('hiredate');
	     
	     nlapiSetFieldValue('custrecordcustrecord_emp_entrydate',entryDate,true,true);
	     
	     //8.抓取员工记录里 邮寄地址 字段的值，放入通讯地址
	     var address = userRecord.getFieldValue('custentity_mailing_address');
	     
	     nlapiSetFieldValue('custrecordcustrecord_emp_address',address,true,true);
	     
	     //申请离职日期自动填写
	     var leaveDate = new Date();
	     
	     nlapiSetFieldValue('custrecordcustrecord_emp_resignationdate',leaveDate,true,true);
		
//----以下为审批节点部分-----------------------------------------------------------------------------------------------------

	     //通过<部门>字段抓取部门的负责人字段值
	     if(department1 != null && department1 != ''){
	    	 
		     var departmentHead = nlapiLookupField('department', department1, 'custrecord_department_head');
		     
		     nlapiSetFieldValue('custrecordcustrecord_emp_departmenthead',departmentHead,true,true);
	    	 
	     }
		
		//在以保存搜索中搜索相应审批节点的指定员工
		var columns = new nlobjSearchColumn('custentity_approval_authority').setSort(false);
		var approvalNode = nlapiSearchRecord('employee', 'customsearch_emp_approval_node', null, columns);
		
		if(approvalNode != null){
			
			 var node1 = approvalNode[0].getValue('custentity_approval_authority');
			 var node1Id = approvalNode[0].getId();
			 
			 var node2 = approvalNode[1].getValue('custentity_approval_authority');
			 var node2Id = approvalNode[1].getId();
			 
			 var node3 = approvalNode[2].getValue('custentity_approval_authority');
			 var node3Id = approvalNode[2].getId();
			 
			 var node4 = approvalNode[3].getValue('custentity_approval_authority');
			 var node4Id = approvalNode[3].getId();
			 
			 if(node1 == '1'){
				 nlapiSetFieldValue('custrecord_emp_accounting', node1Id, true, true);
			 }else if(node1 == '2'){
				 nlapiSetFieldValue('custrecord_emp_administrative', node1Id, true, true);
			 }else if(node1 == '3'){
				 nlapiSetFieldValue('custrecord_emp_director', node1Id, true, true);
			 }else if(node1 == '4'){
				 nlapiSetFieldValue('custrecord_emp_management', node1Id, true, true);
			 };
			 
			 if(node2 == '1'){
				 nlapiSetFieldValue('custrecord_emp_accounting', node2Id, true, true);
			 }else if(node2 == '2'){
				 nlapiSetFieldValue('custrecord_emp_administrative', node2Id, true, true);
			 }else if(node2 == '3'){
				 nlapiSetFieldValue('custrecord_emp_director', node2Id, true, true);
			 }else if(node2 == '4'){
				 nlapiSetFieldValue('custrecord_emp_management', node2Id, true, true);
			 };
			 
			 if(node3 == '1'){
				 nlapiSetFieldValue('custrecord_emp_accounting', node3Id, true, true);
			 }else if(node3 == '2'){
				 nlapiSetFieldValue('custrecord_emp_administrative', node3Id, true, true);
			 }else if(node3 == '3'){
				 nlapiSetFieldValue('custrecord_emp_director', node3Id, true, true);
			 }else if(node3 == '4'){
				 nlapiSetFieldValue('custrecord_emp_management', node3Id, true, true);
			 };
			 
			 if(node4 == '1'){
				 nlapiSetFieldValue('custrecord_emp_accounting', node4Id, true, true);
			 }else if(node4 == '2'){
				 nlapiSetFieldValue('custrecord_emp_administrative', node4Id, true, true);
			 }else if(node4 == '3'){
				 nlapiSetFieldValue('custrecord_emp_director', node4Id, true, true);
			 }else if(node4 == '4'){
				 nlapiSetFieldValue('custrecord_emp_management', node4Id, true, true);
			 }
			
		}

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
//当新建记录时，在单号后添加记录ID
function userEventAfterSubmit(type){
	
	if(type == 'create'){
		var empId = nlapiGetRecordId();
		var empRecord = nlapiLoadRecord('customrecord_emp_dismission',empId);
		var recordNumber = empRecord.getFieldValue('custrecordcustrecord_emp_number')+empId;
		empRecord.setFieldValue('custrecordcustrecord_emp_number',recordNumber);
		
	    nlapiSubmitRecord(empRecord);
	}

}


