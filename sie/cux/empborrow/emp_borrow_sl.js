/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       11 Sep 2018     zyt 借款申请单
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

	nlapiLogExecution('ERROR', '1', '进来了suitelet--');
	var method = request.getMethod();
	if (method == 'POST') {
		// 获取参数进行动作的判断
		var action = request.getParameter('action');

		if (action == 'getaccountinfo') { // 获取货品id和是否为赠品

			var empId = request.getParameter('empid');
			var rtnMsg = getAccountInfo(empId);
			response.write(JSON.stringify(rtnMsg));

		} else if (action == 'getprojectperson') {// 根据项目id获取项目负责人id

			var projectId = request.getParameter('projectid');
			var rtnMsg = getProjectPerson(projectId);
			response.write(JSON.stringify(rtnMsg));

		}
	}

}

/**
 * 根据员工ID，获取员工银行信息
 * 
 * @param empId
 * @returns {___anonymous1968_1975}
 */
function getAccountInfo(empId) {

	var errorMsg = new custMsg('S', '', '');
	var resultJson = {};

	try {
		var filter = [];
		filter.push(new nlobjSearchFilter('internalId', null, 'is', empId));
		var searchColumns = [];
		// 银行账号
		searchColumns[0] = new nlobjSearchColumn('custentity_bank');
		// 联行号
		searchColumns[1] = new nlobjSearchColumn('custentity_union_number');
		// 银行账号
		searchColumns[2] = new nlobjSearchColumn('custentity_bank_number');
		var searchResults = nlapiSearchRecord('employee', null, filter,
				searchColumns);
		if (searchResults != null && searchResults.length > 0) {
			var bankName = searchResults[0].getValue('custentity_bank');
			var unionNo = searchResults[0].getValue('custentity_union_number');
			var bankAccount = searchResults[0]
					.getValue('custentity_bank_number');

			resultJson.bankName = bankName;
			resultJson.unionNo = unionNo;
			resultJson.bankAccount = bankAccount;

		}

		nlapiLogExecution('ERROR', '银行信息查询结果', JSON.stringify(resultJson));
		errorMsg.resultJson = resultJson;

	} catch (e) {
		errorMsg.status = 'E';
		errorMsg.data = e.message;
		errorMsg.resultJson = null;
	}
	return errorMsg;
}

/**
 * 根据项目ID，获取项目负责人ID
 * 
 * @param projectId
 * @returns {___anonymous1968_1975}
 */
function getProjectPerson(projectId) {

	var errorMsg = new custMsg('S', '', '');
	var resultJson = {};

	try {
		var filter = [];
		filter.push(new nlobjSearchFilter('internalId', null, 'is', projectId));
		var searchColumns = [];
		// 项目负责人id
		searchColumns[0] = new nlobjSearchColumn('custentity_project_manager');

		var searchResults = nlapiSearchRecord('job', null, filter,
				searchColumns);
		if (searchResults != null && searchResults.length > 0) {
			var projectManager = searchResults[0]
					.getValue('custentity_project_manager');
			resultJson.projectManager = projectManager;

		}

		nlapiLogExecution('ERROR', '项目负责人信息查询结果', JSON.stringify(resultJson));
		errorMsg.resultJson = resultJson;

	} catch (e) {
		errorMsg.status = 'E';
		errorMsg.data = e.message;
		errorMsg.resultJson = null;
	}
	return errorMsg;
}
