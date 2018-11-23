/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Sep 2018     zyt 项目任务UE
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm}
 *            form Current form
 * @param {nlobjRequest}
 *            request Request object
 * @returns {Void}
 */
function userEventBeforeLoad(type, form, request) {

	nlapiLogExecution('ERROR', '2', type);
	if (type == 'create') {

		var projectDirector = request.getParameterValues('custparam_director');// 抓取项目总监的值

		var projectManager = request.getParameterValues('custparam_manager');// 抓取项目总监的值

		// 将参数的值放入对应字段

		nlapiSetFieldValue('custevent_project_director', projectDirector, true,
				true);

		nlapiSetFieldValue('custevent_project_manager', projectManager, true,
				true);

	}

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Operation types: create, edit, delete, xedit approve, reject,
 *            cancel (SO, ER, Time Bill, PO & RMA only) pack, ship (IF)
 *            markcomplete (Call, Task) reassign (Case) editforecast (Opp,
 *            Estimate)
 * @returns {Void}
 */
function userEventBeforeSubmit(type) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Operation types: create, edit, delete, xedit, approve,
 *            cancel, reject (SO, ER, Time Bill, PO & RMA only) pack, ship (IF
 *            only) dropship, specialorder, orderitems (PO only) paybills
 *            (vendor payments)
 * @returns {Void}
 */
function userEventAfterSubmit(type) {

	if (type == 'create') {
		var id = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();

		var value = nlapiResolveURL('SUITELET', 'customscript_pm_task_sl',
				'customdeploy_pm_task_sl')
				+ '&id=' + id;
		// 将项目任务url存到自定义的删除字段供项目任务界面的删除链接使用
		nlapiSubmitField(recordType, id, 'custevent_delete', value);

	} else if (type == 'edit') {

	} else if (type == 'delete') {

	}

	// add by huyuming 20181113
	taskGroupLooksup(type);
}

/**
 * 
 * @param type
 * @author yuming hu
 * @version 1.0
 * @description 任务组确认
 */
function taskGroupLooksup(type) {

	var taskId = nlapiGetRecordId();

	if (type == 'create' || type == 'edit') {
		// 获取根任务
		var rootTask = recursive(taskId);

		if (rootTask != taskId) {
			nlapiSubmitField('projectTask', taskId, 'custevent_root_task',
					rootTask, true);
		}
	}
}

/**
 * 
 * @author yuming hu
 * @version 1.0
 * @description 任务组获取字段 递归函数
 */
function recursive(parentTaskId) {

	// 过滤
	var taskFilters = [];
	taskFilters[0] = new nlobjSearchFilter('internalidnumber', null, 'equalto',
			parentTaskId);

	// 获取父任务
	var taskColumns = [];
	taskColumns[0] = new nlobjSearchColumn('parent');

	// 获取记录集
	var taskResults = nlapiSearchRecord('projecttask', null, taskFilters,
			taskColumns);

	if (taskResults != null && taskResults != "") {
		var taskId = taskResults[0].getValue('parent');

		if (taskId != undefined && taskId != null && taskId != "") {
			return recursive(taskId);
		}
	}

	return parentTaskId;
}

/**
 * 
 * @param type
 * @author yuming hu
 * @deprecated
 * @version 1.0
 * @description
 */
function projectMilestone(type) {
	// author:ym on 2018/09/24
	// description:项目里程碑获取逻辑
	if (type == 'edit' || type == 'create') {

		// 获取当前 项目ID
		var projectId = parseInt(nlapiGetFieldValue('company'));

		// 加载自定义查询
		var searchStat = nlapiLoadSearch(null,
				'customsearch_milestone_percentage');

		// 查询条件
		var searchFilter = new nlobjSearchFilter('company', null, 'is',
				projectId);
		searchStat.addFilter(searchFilter);

		// 执行查询
		var searchResults = searchStat.runSearch();

		// 存在数据则取第一条数据
		resultSet = searchResults.getResults(0, 1);

		if (resultSet.length > 0) {

			// 更新项目页面
			nlapiSubmitField('job', projectId,
					'custentity_main_percenttimecomplete', resultSet[0]
							.getValue('custevent_milestone_percentage'), true);

		}
	}
}