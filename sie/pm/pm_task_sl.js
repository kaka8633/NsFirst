/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       19 Sep 2018     zyt 项目任务SL
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

	var id = request.getParameter('id');// 获取任务id

	var rec = nlapiLoadRecord('projecttask', id);

	var company = rec.getFieldValue('company');// 获取项目id

	var pgId = rec.getFieldValue('custevent_pg_link');

	nlapiDeleteRecord('projecttask', id);// 删除任务

	nlapiLogExecution('ERROR', 'pgId', pgId);
	if (pgId) {
		nlapiDeleteRecord('customrecord_project_group', pgId);// 删除项目组参考
	}

	nlapiSetRedirectURL('RECORD', 'job', company, 'EDIT');// 删除任务后跳转到项目编辑

	nlapiLogExecution('ERROR', 'params111', JSON.stringify(rec));
}
