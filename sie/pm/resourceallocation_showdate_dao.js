/**
 * Module Description
 * 
 * Version Date Author Remarks 1.00 12 Oct 2018 zyt
 * 
 */

/**
 * 获取根据7.5h进行分组后的数组
 * 
 * @param startDate
 *            开发时间
 * @param endDate
 *            结束时间
 * @returns list 员工在该时间段的分配数据分组后的数组
 */
function getTimeResult(startDate, endDate, empId) {

	var list = useView(startDate, endDate, empId);
	console.info('list=' + JSON.stringify(list));
	var result = {};
	var ary = [];// 小于等于7.5数组
	var aryOver = [];// 大于7.5小时数组

	if (list) {
		for (var i = 0; i < list.length; i++) {

			var json = {};
			var jsonOver = {};
			if (list[i].time > 7.5) {

				jsonOver = list[i];
				aryOver.push(jsonOver);

			} else {

				json = list[i];
				ary.push(json);

			}
		}

		console.info('list=' + JSON.stringify(list));
		nlapiLogExecution('ERROR', '等于小于7.5时间数组', JSON.stringify(ary));
		nlapiLogExecution('ERROR', '大于7.5时间数组', JSON.stringify(aryOver));
		result.ary = ary;
		result.aryOver = aryOver;
	}

	nlapiLogExecution('ERROR', '时间结果数组', JSON.stringify(result));
	return result;
}

/**
 * 从已保存搜索：员工分配时间 取值
 * 
 * @author zyt
 * @param startDate
 *            开发时间
 * @param endDate
 *            结束时间
 * @returns list 员工在该时间段的分配数据数组
 */
function useView(startDate, endDate, empId) {
	console.info('endDate=' + endDate);
	console.info('startDate=' + startDate);
	var loadSearch = nlapiLoadSearch(null, 'customsearch_staff_assignment_time');
	var newSearch = nlapiCreateSearch(loadSearch.getSearchType(), loadSearch
			.getFilters(), loadSearch.getColumns());
	newSearch.addFilter(new nlobjSearchFilter('date', null, 'onorbefore',
			endDate));
	newSearch.addFilter(new nlobjSearchFilter('date', null, 'onorafter',
			startDate));
	newSearch.addFilter(new nlobjSearchFilter('employee', null, 'is', empId));
	var searchResults = newSearch.runSearch();
	var columnsold = searchResults.getColumns();
	var columns = new Object();
	if (columnsold) {
		for (var c = 0; c < columnsold.length; c++) {
			var co = columnsold[c];
			columns[co.getName()] = co;
		}
	}
	var startIndex = 0;
	var list;
	var dataAry = [];
	var dataJson = {};
	// 一次最多还能取1000条，如果大于1000条数据，则拆开
	list = searchResults.getResults(startIndex, startIndex + 1000);

	if (list != null && list.length > 0) {
		for (var i = 0; i < list.length; i++) {
			// var id = list[i].id;
			var date = list[i].getValue(new nlobjSearchColumn('date', null,
					'GROUP'));
			var employee = list[i].getValue(new nlobjSearchColumn('employee',
					null, 'GROUP'));
			var time = list[i].getValue(new nlobjSearchColumn('formulanumeric',
					null, 'SUM'));
			dataJson = {};
			dataJson['date'] = date;
			dataJson['employee'] = employee;
			dataJson['time'] = parseFloat(time).toFixed(1);
			dataAry.push(dataJson);
		}
	}

	return dataAry;
	nlapiLogExecution('ERROR', 'list', JSON.stringify(dataAry));
}