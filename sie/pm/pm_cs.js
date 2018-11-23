/**
 * Module Description
 * 
 * Version Date Author Remarks 1.00 19 Sep 2018 zyt
 * 
 */
// 跳转到suitelet的url
var url = nlapiResolveURL('SUITELET', 'customscript_pm_sl',
		'customdeploy_pm_sl');
/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Access mode: create, copy, edit
 * @returns {Void}
 */

function clientPageInit(type) {
	console.log('type='+type);//debug
	if (type != 'create') {
		if (type == 'edit') {
			// 给资源详细信息界面带出人员信息
			setResourceEmpInfo();
			nlapiDisableField('entityid', true);
		}
	} else {
		// add by Makaay 2018-10-24,自定义流水号用
		nlapiDisableField('autoname', true);
		nlapiSetFieldValue('autoname', 'F');
		nlapiDisableField('entityid', true);
		nlapiSetFieldValue('entityid', 'init');
		// add by 浩然
		var createDate = new Date();
		var createTime = nlapiDateToString(createDate);
		nlapiSetFieldValue('custentity_project_date', createTime, true, true);
	}
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @returns {Boolean} True to continue save, false to abort save
 */
function clientSaveRecord() {
	var commitRes = nlapiCommitLineItem('jobresources');
	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @param {String}
 *            name Field internal id
 * @param {Number}
 *            linenum Optional line item number, starts from 1
 * @returns {Boolean} True to continue changing field value, false to abort
 *          value change
 */
function clientValidateField(type, name, linenum) {

	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @param {String}
 *            name Field internal id
 * @param {Number}
 *            linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function clientFieldChanged(type, name, linenum) {
	console.log('type='+type);//debug
	console.log('name='+name);//debug
	var dumpData = nlapiGetLineItemValue('jobresources','role',1);
	console.log('dumpData='+dumpData);
  	//zxp
  	if(name == 'custentity_project_manager'){//项目经理
     	var managerId = nlapiGetFieldValue('custentity_project_manager');
        var count = nlapiGetLineItemCount('jobresources');
		// //更改项目的经理
		for(var i = 1;i<= count;i++){
			var employeeId = nlapiGetLineItemValue('jobresources', 'jobresource', i);
			nlapiSelectLineItem('jobresources',i);
			if(employeeId == managerId){
				nlapiSetLineItemValue('jobresources','jobresource', i,'-2');				
				nlapiSetCurrentLineItemValue('jobresources','role','-2',true,true);				
			}else{//修正旧的项目经理角色
				var tempRoleData = nlapiGetLineItemValue('jobresources', 'role', i);
				if(tempRoleData == '-2'){
					nlapiSetCurrentLineItemValue('jobresources','role','-3',true,true);//重置为项目成员	
				}
			}
			nlapiCommitLineItem('jobresources');
		}
		
    }
  
	if(name == 'custentity_project_director'){//项目总监
		var managerId = nlapiGetFieldValue('custentity_project_director');
		 
	    var count = nlapiGetLineItemCount('jobresources');
	    for(var i = 1; i <= count ; i++){
			nlapiSelectLineItem('jobresources',i);		 
			var employeeId = nlapiGetLineItemValue('jobresources', 'jobresource', i);
		 	if(employeeId == managerId){
		   		nlapiSetLineItemValue('jobresources','jobresource', i,'2');
		   		nlapiSetCurrentLineItemValue('jobresources','role','2',true,true);
		   	// break;
			}else{//修正旧的项目总监角色
		   		var tempRoleData = nlapiGetLineItemValue('jobresources', 'role', i);
		   		if(tempRoleData == '2'){
			   		nlapiSetCurrentLineItemValue('jobresources','role','-3',true,true);//重置为项目成员
		   		}
			}
	  	}
	   nlapiCommitLineItem('jobresources');	   
   }
   
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @param {String}
 *            name Field internal id
 * @returns {Void}
 */
function clientPostSourcing(type, name) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Void}
 */
function clientLineInit(type) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Boolean} True to save line item, false to abort save
 */
function clientValidateLine(type) {

	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Void}
 */
function clientRecalc(type) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Boolean} True to continue line item insert, false to abort insert
 */
function clientValidateInsert(type) {

	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Boolean} True to continue line item delete, false to abort delete
 */
function clientValidateDelete(type) {

	return true;
}

/**
 * 给资源详细信息界面带出人员信息
 * 
 * @author zyt
 */
function setResourceEmpInfo() {

	var jobResourcesCount = nlapiGetLineItemCount('jobresources');

	for (var i = 0; i < jobResourcesCount; i++) {

		var empId = nlapiGetLineItemValue('jobresources', 'jobresource',
				(i + 1));
		//匹配项目资源角色
		var project_director = nlapiGetFieldValue('custentity_project_director');//项目总监
		var project_manager = nlapiGetFieldValue('custentity_project_manager');//项目经理
		var empJson = getResourceEmpInfoFormSL(empId);// 给资源详细信息界面带出人员信息
		if (empJson) {
			//判定当前人员的资源角色
			if(empId == project_director){//项目总监
				nlapiSetLineItemValue('jobresources', 'role', (i + 1),'2');
			}else if(empId == project_manager){//项目经理
				nlapiSetLineItemValue('jobresources', 'role', (i + 1),'-2');
			}
			nlapiSetLineItemValue('jobresources', 'custpage_post', (i + 1),empJson.post);
			nlapiSetLineItemValue('jobresources', 'custpage_job', (i + 1),empJson.job);
			nlapiSetLineItemValue('jobresources', 'custpage_power', (i + 1),empJson.power);
		}

		// if (i < (jobResourcesCount - 2)) {
		// nlapiCommitLineItem('jobresources');
		// }

	}
		nlapiCommitLineItem('jobresources');
}
/**
 * 给资源详细信息界面带出人员信息
 * 
 * @author zyt
 * @param empId
 * @returns {___anonymous1144_1145}
 */
function getResourceEmpInfoFormSL(empId) {
	var empJson = {};

	$.ajax({
		type : "POST", // 提交方式
		url : url,// 路径
		async : false,
		data : {
			'action' : 'getresourceempinfo',
			'empid' : empId
		},
		success : function(result) {// 返回数据根据结果进行相应的处理
			// eval方法，将json格式的字符串转换为json
			var msg = eval("(" + result + ")");
			if (msg.status == 'E') {
				alert(msg.data);
			} else {
				if (msg.resultJson) {
					empJson = eval('(' + msg.resultJson + ')');
					console.info('empJson=' + empJson);
				} else {
					empJson = null;
				}

			}
		}
	});
	console.info('empJson=' + JSON.stringify(empJson));
	return empJson;
}

/**
 * 创建漏斗
 */
function createFunnel(funnelData) {
}

function funnelClick(parms) {
	console.info('parms=' + parms);
}