/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       15 Aug 2018     ZYT  测试区块
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

	nlapiLogExecution('ERROR', '进入sl', '');
	// 获取用户id
	var userId = nlapiGetContext().getUser();

	var action = request.getParameter('action');

	// 验证该员工的员工申请表是否已提交
	if (action == 'checkDiss') {
		var rtnMsg = checkDiss(userId);
		response.write(JSON.stringify(rtnMsg));
	}
	

}

/**
 * 验证该员工的员工申请表是否已提交
 * 
 * @param userId
 * @returns errorMsg
 */
function checkDiss(userId) {
	
	var errorMsg = new custMsg('S', '');

	try {

		//添加查询条件
		var filter = [];
		filter.push(new nlobjSearchFilter('custrecord_emp_id', null, 'is',
				userId));

		//添加要查询的字段
		var searchColumns = [];
		searchColumns[0] = new nlobjSearchColumn('internalId');

		//执行查询
		var searchResults = nlapiSearchRecord('customrecord_emp_dismission',
				null, filter, searchColumns);

		nlapiLogExecution('ERROR', '用户id=' + userId + '查询结果', JSON
				.stringify(searchResults));
		
		if (searchResults != null && searchResults.length > 0) {
			var intId = searchResults[0].getValue('internalId');
			errorMsg.intId = intId;
		} else {
			errorMsg.intId = '';
		}
		
	} catch (e) {
		errorMsg.status = 'E';
		errorMsg.data = e.message;
		errorMsg.intId = '';
	}
	return errorMsg;

}
