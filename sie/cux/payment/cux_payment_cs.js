/**
 * Module Description
 * 
 * Version Date Author Remarks 1.00 14 Sep 2018 Bman
 * 
 */
// 重定向URL
var url = nlapiResolveURL('SUITELET', 'customscript_cux_payment_sl',
		'customdeploy_cux_payment_sl');
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
	console.info(name + '=' + nlapiGetFieldValue(name));
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

	var period = nlapiGetFieldValue('custpage_filter_period');
	// borrow 时需要自己转换成期间为日期
	var periodText = nlapiGetFieldText('custpage_filter_period');
	var department = nlapiGetFieldValue('custpage_filter_department');
	var certificate = nlapiGetFieldValue('custpage_filter_certificate');
	var date = nlapiGetFieldValue('custpage_filter_date');
	var summary = nlapiGetFieldValue('custpage_filter_summary');

	if (certificate != 'salary' && date == '') {
		alert('请选择审批日期!');
		return false;
	} else if (certificate == 'salary' && period == '') {
		alert('请选择区间!');
		return false;
	} else if (certificate == 'salary' && department == '') {
		alert('请选择部门!');
		return false;
	}

	// 重定向页面及添加参数
	window.location = url + '&' + serializeURL({
		action : 'search',
		period : period,
		periodText : periodText,
		department : department,
		certificate : certificate,
		date : date,
		summary : summary
	});

}

function download(fileData) {
	var fileDataArr = fileData.split('|');
	var fileURL = fileDataArr[0];
	var fileId = fileDataArr[1];
	window.open('https://system.netsuite.com' + fileURL);
	// 重定向页面及添加参数
	window.location = url + '&' + serializeURL({
		action : 'delete',
		fileId : fileId
	});
}

//去掉页面重载提示
window.page_unload = null;