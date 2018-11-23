/**
 * Module Description
 * 
 * Version Date Author Remarks 1.00 13 Sep 2018 huyuming
 * 
 */

// 跳转到suitelet的url
var url = nlapiResolveURL('SUITELET', 'customscript_cux_salarydetails_sl',
		'customdeploy_cux_salarydetails_sl');

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

function search() {

	var subCompany = nlapiGetFieldValue('custpage_filter_subcompany');
	var period = nlapiGetFieldValue('custpage_filter_period');
	var department = nlapiGetFieldValue('custpage_filter_department');

	// 判断期间不能为空值
	if (period == '' || period == null) {
		alert('期间不能为空，请输入期间！');
		return;
	}
	// console.info('subCompany='+subCompany);
	// 跳转及参数
	window.location = url + '&' + serializeURL({
		action : 'search',
		subCompany : subCompany,
		period : period,
		department : department
	});
}

function deleteRecord() {
	var subCompany = nlapiGetFieldValue('custpage_filter_subcompany');
	var period = nlapiGetFieldValue('custpage_filter_period');
	var department = nlapiGetFieldValue('custpage_filter_department');
	
	// 判断期间不能为空值
	if (period == '' || period == null) {
		alert('期间不能为空，请输入期间！');
		return;
	}
	
	// 跳转及参数
	window.location = url + '&' + serializeURL({
		action : 'delete',
		subCompany : subCompany,
		period : period,
		department : department
	});
}

function importExcel() {
	var importUrl = getConfigValue('CUX_SALARY_CSV_IMPORT');

	// 打开新页面
	window.open(importUrl);
}

window.page_unload = null;// 去掉页面重载前提示

