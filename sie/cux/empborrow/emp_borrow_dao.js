/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       11 Sep 2018     zyt 借款申请单dao
 *
 */

/**
 * 订单号自动生成 规则：YYYYMMDD+2位流水
 */
function getEbOrderNum() {
	var orderNum = -1;
	var todayDate = getDateByTimeZone(8);
	var month;
	var day;
	// 获取当前日期年/月/日
	if ((todayDate.getMonth()) + 1 < 10) {
		month = '0' + (todayDate.getMonth() + 1);
	} else {
		month = (todayDate.getMonth() + 1);
	}
	if ((todayDate.getDate()) < 10) {
		day = '0' + (todayDate.getDate());
	} else {
		day = (todayDate.getDate());
	}
	var todayStr = (todayDate.getFullYear()) + '' + month + '' + day;
	nlapiLogExecution('ERROR', 'todayStr=', todayStr);
	var filters = [];
	var searchColumns = [];
	searchColumns[0] = new nlobjSearchColumn('name');
	// 进行查询、这个参数表示的是表名的内部ID
	var searchResults = nlapiCreateSearch('customrecord_employee_borrow_head',
			filters, searchColumns).runSearch();

	var startIndex = 0;
	var result = [];// 已经存在的订单号数组
	do {
		var resultSet = searchResults.getResults(startIndex, startIndex + 1000);
		for (var i = 0; i < resultSet.length; i++) {

			if (resultSet[i].getValue('name')) {
				num = resultSet[i].getValue('name');
				result.push(parseInt(num));

			}

		}
		startIndex += 1000;

	} while (resultSet.length > 0);

	if (result != null && result != '' && result.length > 0) {

		nlapiLogExecution('ERROR', 'result-1', result);
		result.sort(function(x, y) {
			return y - x;
		});

		nlapiLogExecution('ERROR', 'result-2', result);
		// 获取数据库中最大的序列号
		var lastDate = result[0];
		// 将序列号转成字符串
		var lastDateT = lastDate + '';
		// 截取年月日
		var lastDateStr = lastDateT.substring(0, lastDateT.length - 2);

		nlapiLogExecution('ERROR', 'lastDateStr', lastDateStr);
		nlapiLogExecution('ERROR', 'todayStr', todayStr);

		// 如果是同一天，则在最大的序列号后加一
		if (parseInt(lastDateStr) == parseInt(todayStr)) {

			orderNum = (result[0] + 1).toString();
		} else {

			orderNum = (todayStr + '01');

		}

	} else {

		// 如果数据库没有数据，从01开始
		orderNum = (todayStr + '01');

	}

	return orderNum;
}