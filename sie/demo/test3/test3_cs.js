/**
 * Module Description
 * 
 * Version Date Author Remarks 1.00 28 Aug 2018 Tingyiyi
 * 
 */
var gLineType = 'recmachcustrecord_pol_poh_link'// 子列表ID
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

	var recId = nlapiGetRecordId();

	if (recId < 3) {
		nlapiSetFieldValue('custrecord_test_circle', 4837, true, true);// 设置图形为绿色
	} else if (3 < recId < 8) {
		nlapiSetFieldValue('custrecord_test_circle', 4838, true, true);// 设置图形为黄色
	} else {
		nlapiSetFieldValue('custrecord_test_circle', 4839, true, true);// 设置图形为红色
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

	// 获取员工
	// var emp = nlapiGetFieldValue('custrecord_poh_employee');
	// var empName = nlapiGetFieldText('custrecord_poh_employee');
	// alert('emp=' + emp + ' ' + 'empName=' + empName);

	// 获取部门
	// var dept = nlapiGetFieldValues('custrecord_poh_dept');
	// var deptName = nlapiGetFieldTexts('custrecord_poh_dept');
	// alert('dept=' + dept[0]);
	// var count = nlapiGetLineItemCount(gLineType);
	// alert('count=' + count);

	// 校验备注
	var memo = nlapiGetFieldValue('custrecord_poh_memo');
	if (memo != 'ZYT') {
		alert('备注必须为ZYT!');
		return false;
	}

	// 校验员工
	var emp = nlapiGetFieldValue('custrecord_poh_employee');
	if (!emp) {
		alert('员工不能为空！');
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
	// alert('clientValidateField!');
	// alert('type=' + type);
	// 供应商编号
	// if (name == 'custrecord_poh_otherrefnum') {
	// var vendor = nlapiGetFieldValue('custrecord_poh_otherrefnum');
	// alert('type=' + typeof (vendor));
	// if (vendor != '1') {
	// alert('供应商编号必须为1' + vendor);
	// }
	// }

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
	// alert('clientFieldChanged!');
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
	// alert('clientPostSourcing!');
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
	// alert('clientLineInit!');
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
	// alert('clientValidateLine!');
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
	// alert('clientRecalc!');
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
	// alert('clientValidateInsert!');
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
	// alert('clientValidateDelete!');
	return true;
}

/**
 * 点击按钮，添加一行时调用此方法 add by zyt@sie 20180820
 */
function addLine() {
	// 获取当前行数
	// var count = nlapiGetLineItemCount(gLineType);
	// console.info('count=' + count);

	nlapiSelectNewLineItem(gLineType);
	nlapiSetCurrentLineItemValue(gLineType, 'custrecord_pol_item', 10, true,
			true);// 设置货品
	nlapiSetCurrentLineItemValue(gLineType, 'custrecord_pol_amount', 1, true,
			true);// 设置金额
	nlapiSetCurrentLineItemValue(gLineType, 'custrecord_pol_quantity', 1, true,
			true);// 设置数量
	nlapiCommitLineItem(gLineType);
}
