/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       18 Oct 2018     zyt 员工每周时间表CS
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
	disableField(type, name);
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

function disableField(type, name) {
	/**
	 * 1.如果选择了商机，则“客户：项目”字段自动默认或更新为“营销CRM通用项目”且不可更新项目名称，进一步可以选择对应的任务组和子任务；如果未选择商机，则按标准逻辑执行。
	 * 营销CRM通用项目 720
	 */
	var projectId = nlapiGetCurrentLineItemValue('timeitem', 'customer');

	if (type == 'timeitem' && name == 'custcol_opportunity_list') {

		if (nlapiGetCurrentLineItemValue(type, name) != null) {
			nlapiSetCurrentLineItemValue('timeitem', 'customer',
					getConfigValue('EMP_TIMESHEET_CUSTOMER'), true, true);// 客户
			nlapiDisableLineItemField('timeitem', 'customer', true);
		} else {
			nlapiDisableLineItemField('timeitem', 'customer', false);
		}
	}

	/*if (type == 'timeitem' && name == 'customer') {

		// var op = nlapiGetCurrentLineItemValue(type,
		// 'custcol_opportunity_list');

		nlapiSetCurrentLineItemValue('timeitem', 'custcol_join_project',
				projectId, true, true);// 将客户的值赋值给自定义客户
		// 选择客户时判断机会是否有值，若有，不允许修改。
		// if (op) {
		// return false;
		// }
	}

	if (validateProject(projectId)) {
		nlapiDisableLineItemField('timeitem', 'custcol_non_fee_items', false);
		nlapiDisableLineItemField('timeitem', 'casetaskevent', true);
	} else {
		nlapiDisableLineItemField('timeitem', 'custcol_non_fee_items', true);
		nlapiDisableLineItemField('timeitem', 'casetaskevent', false);
	}*/
}

// 判断是否为非收费项目
function validateProject(projectId) {
	// 过滤
	var projectFilters = [];
	projectFilters[0] = new nlobjSearchFilter('internalidnumber', null,
			'equalto', projectId);

	var projectColumns = [];
	projectColumns[0] = new nlobjSearchColumn('custentity_whether_non_fee_item');

	// 获取记录集
	var projectResults = nlapiSearchRecord('job', null, projectFilters,
			projectColumns);

	if (projectResults[0].getValue('custentity_whether_non_fee_item') == 1) {
		return true;
	}

	return false;
}
