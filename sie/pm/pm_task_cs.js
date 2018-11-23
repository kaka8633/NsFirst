/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       19 Sep 2018     zyt 项目任务CS
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

	if (type == 'create') {
		var id = nlapiGetRecordId();
		nlapiSetFieldValue('custevent_delete', id, true, true);// 删除

		console.info('2222');
	}

	// nlapiSubmitField('job', '149', 'companyname', '电影项目 test by huyuming',
	// true);

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

	// 受分配人 20181029方案变更取消此逻辑
	// var assigneeCount = nlapiGetLineItemCount('assignee');
	// if (assigneeCount > 0) {
	//
	// // 如果存在受分配人，修改"是父任务" 为false
	// nlapiSetFieldValue('custevent_is_parent_task', 'F', true, true);
	// } else {
	//
	// // 如果存在受分配人，修改"是父任务" 为true
	// nlapiSetFieldValue('custevent_is_parent_task', 'T', true, true);
	// }
	// 根据是否有资源分配回写"是父字段的值"
	console.info('setIsParentTeskVaule--');
//	setIsParentTeskVaule();
	
	return true;
}

/**
 * 根据是否有资源分配回写"是父字段的值"
 * 
 * @author zyt
 */
//function setIsParentTeskVaule() {
//
//	var filters = [];
//	filters[0] = new nlobjSearchFilter('projecttask', null, 'is',
//			nlapiGetRecordId());
//	var searchResults = nlapiSearchRecord('resourceallocation', null, filters,
//			null);
//	var count = 0;
//
//	if (searchResults != null && searchResults.length > 0) {
//		count = searchResults.length;
//	}
//	if (count > 0) {
//
//		// 如果存在受分配人，修改"是父任务" 为false
//		nlapiSetFieldValue('custevent_is_parent_task', 'F', true, true);
//	} else {
//
//		// 如果存在受分配人，修改"是父任务" 为true
//		nlapiSetFieldValue('custevent_is_parent_task', 'T', true, true);
//	}
//}
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
	console.info('type=' + type);
	console.info('name=' + name);
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
