/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Sep 2018     zyt 项目SL
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

	var action = request.getParameter('action');

	if (action == 'getresourceempinfo') {

		var empId = request.getParameter('empid');
		var rtnMsg = getResourceEmpInfoSL(empId);// 获取员工能力信息
		response.write(JSON.stringify(rtnMsg));
	}
}

/**
 * 根据员工id获取员工能力信息
 * 
 * @param empId
 */
function getResourceEmpInfoSL(empId) {

	var errorMsg = new custMsg('S', '', '');
	var resultJson = {};

	try {

		resultJson = getResourceEmpInfo(empId);// 获取子公司

		nlapiLogExecution('ERROR', '查询结果', JSON.stringify(resultJson));
		errorMsg.resultJson = JSON.stringify(resultJson);

	} catch (e) {
		errorMsg.status = 'E';
		errorMsg.data = e.message;
		errorMsg.resultJson = null;
	}
	return errorMsg;

}

/**
 * 查询销售订单按类型汇总计数视图
 */
// function getSalesTypeCount() {
//
// var errorMsg = new custMsg('S', '');
// var json = {};// 查询结果返回JSON
//
// try {
// // 自定义视图取字段id
// var loadSearch = nlapiLoadSearch(null,
// 'customsearch_sales_order_type_view'); // 加载搜索
// var searchResults = loadSearch.runSearch();// 查询
// var resultIndex = 0;
// var resultStep = 1000;
// var list;
// do {
// // 一次最多还能取1000条，如果大于1000条数据，则拆开
// list = searchResults.getResults(resultIndex, resultIndex
// + resultStep);
// resultIndex = resultIndex + resultStep;
// if (list != null) {
// for (var i = 0; i < list.length; i++) {
//
// var salesType = list[i].getText(new nlobjSearchColumn(
// 'type', null, 'group'));
// var typeCount = list[i].getValue(new nlobjSearchColumn(
// 'internalId', null, 'count'));
//
// json[salesType] = typeCount;
// }
// }
// } while (list != null && list.length > 0);
//
// nlapiLogExecution('ERROR', '查询JSON结果', JSON.stringify(json));
//
// errorMsg.json = JSON.stringify(json);
//
// } catch (e) {
// errorMsg.status = 'E';
// errorMsg.data = e.message;
// errorMsg.resultAry = '';
// }
//
// return errorMsg;
//}