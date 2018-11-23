/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       25 Oct 2018     zyt 采购订单SL
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

		if (action == 'getempinfo') { // 获取员工部门和子公司

			var empId = request.getParameter('empid');
			var rtnMsg = getEmpInfo(empId);
			response.write(JSON.stringify(rtnMsg));

		}
	}
}

/**
 * 根据员工id获取员工子部门和
 * 
 * @param empId
 */
function getEmpInfo(empId) {

	var errorMsg = new custMsg('S', '', '');
	var resultJson = {};

	try {

		resultJson.subsidiary = getEmpSubsidiary(empId);// 获取子公司
		resultJson.dept = getEmpDept(empId);// 或者部门

		nlapiLogExecution('ERROR', '查询结果', JSON.stringify(resultJson));
		errorMsg.resultJson = resultJson;

	} catch (e) {
		errorMsg.status = 'E';
		errorMsg.data = e.message;
		errorMsg.resultJson = null;
	}
	return errorMsg;

}
