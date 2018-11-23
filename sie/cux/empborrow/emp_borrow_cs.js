/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       11 Sep 2018     zyt 借款申请单CS
 *
 */

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
// 跳转到suitelet的url
var url = nlapiResolveURL('SUITELET', 'customscript_emp_borrow_sl',
		'customdeploy_emp_borrow_sl');
function clientPageInit(type) {

	if (type == 'create' || type == 'edit') {
		var empId = nlapiGetFieldValue('custrecord_ebh_emp');
		if (empId) {
			// 根据员工id获取银行信息
			var json = getEbBankAccount(empId);
			// alert('json1'+JSON.stringify(json));
			nlapiSetFieldValue('custrecord_ebh_bank_name', json.bankName, true,
					true);
			nlapiSetFieldValue('custrecord_ebh_union_no', json.unionNo, true,
					true);
			nlapiSetFieldValue('custrecord_ebh_bank_account', json.bankAccount,
					true, true);

		}

		// 创建时给币种、支付方式、现金流量表项-支付、现金流量表项-收款给默认值
		nlapiSetFieldValue('custrecord_ebh_currency', 1, true, true);// 币种
																		// CNY
		nlapiSetFieldValue('custrecord_ebh_payment', 8, true, true);// 支付方式 电汇
		nlapiSetFieldValue('custrecord_ebh_cash_payment', 67, true, true);// 现金流量表项-支付
																			// 员工往来
																			// 借款
		nlapiSetFieldValue('custrecord_ebh_payee', 5, true, true);// 现金流量表项-收款
																	// 员工往来还款

		var dept = getEmpDept(empId);
		nlapiSetFieldValue('custrecord_ebh_dept', dept, true, true);// 部门

		var subsidary = getEmpSubsidiary(empId);
		nlapiSetFieldValue('custrecord_ebh_company', subsidary, true, true);// 子公司

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

	// 金额保留两位小数
	var money = nlapiGetFieldValue('custrecord_ebh_money');
	nlapiSetFieldValue('custrecord_ebh_money', parseInt(money).toFixed(2),
			true, true);

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

	// 选择项目后带出项目负责人
	if (name == 'custrecord_ebh_project') {

		var projectId = nlapiGetFieldValue('custrecord_ebh_project');

		if (projectId) {

			var json = getProjectPerson(projectId);
			nlapiSetFieldValue('custrecord_ebh_project_person',
					json.projectManager, true, true);// 项目负责人

		}

	}
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

	// 选择员工后带出银行信息
	if (name == 'custrecord_ebh_emp') {
		var empId = nlapiGetFieldValue('custrecord_ebh_emp');
		if (empId) {
			// 根据员工id获取银行信息
			var json = getEbBankAccount(empId);

			nlapiSetFieldValue('custrecord_ebh_bank_name', json.bankName, true,
					true);
			nlapiSetFieldValue('custrecord_ebh_union_no', json.unionNo, true,
					true);
			nlapiSetFieldValue('custrecord_ebh_bank_account', json.bankAccount,
					true, true);

		}

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
 * 根据员工Id跳转到Suitelet取员工的银行信息
 * 
 * @author zyt
 * @param empId
 * @returns {___anonymous_json}
 */

function getEbBankAccount(empId) {

	$.ajax({
		type : "POST", // 提交方式
		url : url,// 路径
		async : false,
		data : {
			'action' : 'getaccountinfo',
			'empid' : empId
		},
		success : function(result) {// 返回数据根据结果进行相应的处理
			// eval方法，将json格式的字符串转换为json
			var msg = eval("(" + result + ")");
			if (msg.status == 'E') {
				alert(msg.data);
			} else {
				json = msg.resultJson;
				console.info('json=' + json);
			}
		}
	});
	return json;
}

/**
 * 退款按钮
 * 
 * @author zyt
 */
// function ebBack() {
// alert('退款申请已发起');
// var id = nlapiGetRecordId();
//
// nlapiSubmitField('customrecord_employee_borrow_head', id,
// 'custrecord_ebh_status', 6, true);
// window.location.reload();// 刷新当前页
// }
/**
 * 根据员工Id跳转到Suitelet取员工的银行信息
 * 
 * @author zyt
 * @param empId
 * @returns {___anonymous_json}
 */

function getProjectPerson(projectId) {

	$.ajax({
		type : "POST", // 提交方式
		url : url,// 路径
		async : false,
		data : {
			'action' : 'getprojectperson',
			'projectid' : projectId
		},
		success : function(result) {// 返回数据根据结果进行相应的处理
			// eval方法，将json格式的字符串转换为json
			var msg = eval("(" + result + ")");
			if (msg.status == 'E') {
				alert(msg.data);
			} else {
				json = msg.resultJson;
				console.info('json=' + json);
			}
		}
	});
	return json;
}
// 放在脚本的最后面,去除重载前提示
window.page_unload = null;