/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       28 Aug 2018     lhz
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
// 定义全乎变量字列表id
var sublistId = 'recmachcustrecord_cs_link';
var s = document.getElementsByTagName('dropdownInput')[0];
// 编辑模式下禁止更改自定义字段值
function clientPageInit(type) {
	alert('lhz');
	if (type === 'edit') {
		nlapiDisableLineItemField(sublistId, 'custrecord_lb_lhz', true);
	}
	console.log(s);
	// $('.dropdownInput').on('focus',function(){
	// var css = '<style>#nl1:before { content: "hello" }</style>';
	// $('head').append(css);
	// console.log('focus');
	// nlapiSetFieldValue('custpage_name', 25,true,true);
	// var text = nlapiGetField('custpage_text');
	// text.setDefaultValue('hello');
	// nlapiSetFieldValue('custpage_text', 'hello');
	// });
	nlapiSetFieldValue('custpage_name', 25, true, true);
	var text = nlapiGetField('custpage_text');
	text.setDefaultValue('hello');
	nlapiSetFieldValue('custpage_text', 'hello');
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @returns {Boolean} True to continue save, false to abort save
 */
// 提交时验证字列表是否大于三行
function clientSaveRecord() {
	var lines = getLines(sublistId);
	if (lines > 3) {
		alert('保存条数不能超过三行');
		return false;
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
 * @returns {Boolean} True to continue changing field value, false to abort
 *          value change
 */
// 弹出自定义列表值
function clientValidateField(type, name, linenum) {
	// alert(nlapiGetCurrentLineItemValue(sublistId, 'custrecord_lb_lhz'));
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
	console.log('init');
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
// 获取行数
function getLines(obj) {
	var lines = nlapiGetLineItemCount(obj);
	return lines;
}

function saveForSave() {
	record.setFieldValue('custpage_first', '测试');
	record.setFieldValue('custpage_secord', '测试2');

	var id = nlapiSubmitRecord(record, true);

	nlapiLogExecution('ERROR', 'id', id);
};

function getForGet() {
	var serchCloumn = new Array();

	serchCloumn[0] = new nlobjSearchColumn('custpage_first');
	serchCloumn[0] = new nlobjSearchColumn('custpage_secord');

	var custpage_first = data[0].getValue('custpage_first'), custpage_secord = data[0]
			.getValue('custpage_secord');

	nlapiLogExecution('ERROR', 'custpage_first', custpage_first);
	nlapiLogExecution('ERROR', 'custpage_secord', custpage_secord);
}
