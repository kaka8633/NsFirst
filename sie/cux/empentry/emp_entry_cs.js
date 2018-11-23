/**
 * Module Description
 * 
 * Version Date Author Remarks 1.00 15 Oct 2018 zyt 员工预入职申请表CS
 * 
 */
var gurl = nlapiResolveURL('SUITELET', 'customscript_emp_entry_sl',
		'customdeploy_emp_entry_sl');
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

	if (name == 'custrecord_employee_approve_status'
			&& nlapiGetFieldValue(name) == '提交') {
		alert('发邮件');
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
 * 打开已准备页面
 */
function showPrepare() {

	// 获得窗口的垂直位置
	var iTop = (window.screen.availHeight - 30 - 600) / 2;
	// 获得窗口的水平位置
	var iLeft = (window.screen.availWidth - 10 - 800) / 2;

	window
			.open(
					gurl + '&recid=' + nlapiGetRecordId(),
					"",
					'height=600,innerHeight=600,width=800,innerWidth=800,top='
							+ iTop
							+ ',left='
							+ iLeft
							+ ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no')

}

/**
 * 验证准备事项是否已勾选，若存在未勾选给出提示。如都勾选，修改状态并关闭页面。
 */
function approve(id) {

	var computer = nlapiGetFieldValue('custpage_computer');// 办公电脑
	var wechat = nlapiGetFieldValue('custpage_wechat');// 企业微信账号
	var manual = nlapiGetFieldValue('custpage_manual');// IT信息化指引手册准备
	var system = nlapiGetFieldValue('custpage_computer_system');// 电脑系统优化

	if (computer != 'T' || wechat != 'T' || manual != 'T' || system != 'T') {
		alert('请勾选全部准备事项！');
	} else {

		window.close();
		console.info('id=' + id);

		nlapiSubmitField('customrecord_employee_entry_info', id,
				'custrecord_employee_approve_status', '已审批');// 修改单据审批状态为已审批

		opener.location.reload();// 刷新父窗口
	}
}

// 放在脚本的最后面,去除重载前提示
window.page_unload = null;