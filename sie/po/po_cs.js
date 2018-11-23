/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       18 Aug 2018     ZYT 采购订单
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
var gcontext = nlapiGetContext();// 上下文对象
// 跳转到suitelet的url
var url = nlapiResolveURL('SUITELET', 'customscript_po_sl',
		'customdeploy_po_sl');

function clientPageInit(type) {

	console.info('clientPageInit----');
	if (type == 'create') {

		var empId = gcontext.getUser();

		var empInfo = getEmpInfoFormSL(empId);// 获取员工信息
		var subsidiary = empInfo.subsidiary;// 获取子公司
		var dept = empInfo.dept;// 获取部门

		nlapiSetFieldValue('entity', 156, true, true);
		nlapiSetFieldValue('employee', empId, true, true);
		nlapiSetFieldValue('subsidiary', subsidiary, true, true);
		nlapiSetFieldValue('department', dept, true, true);
	}

	// 禁用费率字段
	//nlapiDisableLineItemField('item', 'rate', true);

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
	console.info('clientSaveRecord----');
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

	console.info('clientValidateField----');
	console.info('name=' + name);
	console.info('value=' + nlapiGetFieldValue(name));
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

	console.info('clientFieldChanged----');
	// 1选择员工时，根据员工带出部门和子公司
	if (name == 'employee' || name == 'entity') {

		var entity = nlapiGetFieldValue('entity');// 供应商
		var empId = nlapiGetFieldValue('employee');// 员工
		console.info('entity=' + entity);
		if (empId) {

			if (!entity) {

				alert('请先选择供应商！');
				nlapiSetFieldValue('employee', '', true, true);// 清空员工
				return false;

			} else {

				var empInfo = getEmpInfoFormSL(empId);// 获取员工信息
				var subsidiary = empInfo.subsidiary;// 获取子公司
				var dept = empInfo.dept;// 获取部门
				
				console.info('subsidiary1=' + subsidiary);
				console.info('dept1=' + dept);

				// nlapiSetFieldValue('entity', entity, true, true);
				nlapiSetFieldValue('subsidiary', subsidiary, true, true);
				nlapiSetFieldValue('department', dept, true, true);

			}
		}

	}

	// 2、新增含税单价字段，在输入货品，数量，含税单价后自动带出含税总价
	// delete by yuming hu 2018-10-23
	/*
	 * if (type == 'item' && (name == 'quantity' || name ==
	 * 'custcol_unit_price')) {
	 * 
	 * var item = nlapiGetCurrentLineItemValue(type, 'item'); var quantity =
	 * nlapiGetCurrentLineItemValue(type, 'quantity');// 数量 var unitPrice =
	 * nlapiGetCurrentLineItemValue(type, 'custcol_unit_price');// 含税单价
	 * 
	 * if (nlapiGetCurrentLineItemValue(type, name)) {
	 * 
	 * if (item) {
	 * 
	 * nlapiSetCurrentLineItemValue(type, 'custcol_total_amount', (quantity *
	 * unitPrice).toFixed(8));// 设置含税总价
	 * 
	 * setRate(type);// 设置费率 } else { alert('请先选择货品');
	 * nlapiSetCurrentLineItemValue(type, 'quantity', '');
	 * nlapiSetCurrentLineItemValue(type, 'custcol_unit_price', ''); } } }
	 */

	// 3、选择税类代码后，根据（含税单价/（1+税率））算出不含税单价
	// delete by yuming hu 2018-10-23
	/*
	 * if (type == 'item' && name == 'taxcode') {
	 * 
	 * setRate(type);// 设置费率 }
	 */

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
	console.info('clientPostSourcing----');
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

	console.info('clientLineInit----');

	// 禁用费率字段
	// delete by yuming hu 2018-10-23
	// nlapiDisableLineItemField(type, 'rate', true);
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

	console.info('clientValidateLine----');
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
	console.info('clientRecalc----');
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
	console.info('clientValidateInsert----');
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
	console.info('clientValidateDelete----');
	return true;
}

/**
 * 根据员工id从员工表取员工子公司和部门
 * 
 * @param empId
 * @returns {Array}
 */
function getEmpInfoFormSL(empId) {

	var empInfo = {};

	$.ajax({
		type : "POST", // 提交方式
		url : url,// 路径
		async : false,
		data : {
			'action' : 'getempinfo',
			'empid' : empId
		},
		success : function(result) {// 返回数据根据结果进行相应的处理
			// eval方法，将json格式的字符串转换为json
			var msg = eval("(" + result + ")");
			if (msg.status == 'E') {
				alert(msg.data);
			} else {
				empInfo = msg.resultJson;
			}
		}
	});

	return empInfo;
}
/**
 * 设置费率
 */
// delete by yuming hu 2018-10-23
/*
 * function setRate(type) {
 * 
 * var unitPrice = nlapiGetCurrentLineItemValue(type, 'custcol_unit_price');//
 * 含税单价 var taxCode = nlapiGetCurrentLineItemValue(type, 'taxcode');// 税类代码
 * 
 * if (taxCode) {
 * 
 * var taxPercentage = getTaxRate(taxCode);// 获取税率
 * 
 * nlapiSetCurrentLineItemValue(type, 'rate', (unitPrice / (1 +
 * taxPercentage)).toFixed(8));// 设置费率字段的值：费率 } }
 */

// 放在脚本的最后面,去除重载前提示
window.page_unload = null;