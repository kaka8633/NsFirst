/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       09 Nov 2018     yuming hu
 *
 */

/**
 * @param {nlobjRequest}
 *            request Request object
 * @param {nlobjResponse}
 *            response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response) {
	// var parentTaskId = 479;

	response.write(recursive(481));

	// response.write(1);
}

// 递归函数
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
