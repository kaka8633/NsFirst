/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Aug 2018     ZYT	采购订单头CS
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
var gLineType = 'recmachcustrecord_pol_poh_link';
function clientPageInit(type) {
	// alert('Hello World!');

	// 给时间设置默认值
	var date = new Date();
	nlapiSetFieldValue('custrecord_poh_date', nlapiDateToString(date,
			'YYYY-MM-DD'), true, true);

	// 给备注设置默认值
	nlapiSetFieldValue('custrecord_poh_memo', 'ZYT', true, true);
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

	// 验证备注必须是自己的名字
	var memo = nlapiGetFieldValue('custrecord_poh_memo');
	if (memo != 'ZYT') {
		alert('备注必须为自己的名字！');
		return false;
	}

	// 验证员工字段必须有值
	var employee = nlapiGetFieldValue('custrecord_poh_employee');
	if (employee == '' || employee == null) {
		alert('请选择员工！');
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
function clientValidateField(type, name, linenum) {

	if (nlapiGetFieldValue('custrecord_poh_status') != 1
			&& nlapiGetFieldValue('custrecord_poh_status') != '') {
		alert('新建采购订单状态须为已提交！');
		nlapiSetFieldValue('custrecord_poh_status', '', true, true);
	}

	// console.info('sublisttype='+type);
//	console.info('name=' + nlapiGetCurrentLineItemValue(gLineType, name));
	
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
 * 点击按钮，添加一行时调用此方法 add by zyt@sie 20180820
 */
function addLine() {
	// 获取当前行数
	var count = nlapiGetLineItemCount(gLineType);
	console.info('count=' + count);

	nlapiSelectNewLineItem(gLineType);
	nlapiSetCurrentLineItemValue(gLineType, 'custrecord_pol_item', 10, true,
			true);// 设置货品
	nlapiSetCurrentLineItemValue(gLineType, 'custrecord_pol_amount', 1, true,
			true);// 设置金额
	nlapiSetCurrentLineItemValue(gLineType, 'custrecord_pol_quantity', 1, true,
			true);// 设置数量
	nlapiCommitLineItem(gLineType);
}
