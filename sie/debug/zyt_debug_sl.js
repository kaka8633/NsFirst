/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 Sep 2018     zyt
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

	// var companyInfo = nlapiLoadConfiguration('userpreferences');
	// var language = companyInfo.getFieldValue('LANGUAGE');
	// response.writeLine('language='+language);
	// createCheck(107, response);
	// useView(response);
	// var result = searchListInfo('customlist_contract_status');
	// response.writeLine(JSON.stringify(result));
	// var dept = getDepartment();
	// response.writeLine(JSON.stringify(dept));

	// var result = spiltAry([ 1, 2, 3, 4, 5 ], 4);
	// response.writeLine(JSON.stringify(result));
	// var date = getCurrentTimeStr();
	// var date = getCurruentTime();
	// response.writeLine(date);

	// var str = escape2Html('wsad&nbsp;fjdj&lt;jshdue&gt;fhdai');
	// response.writeLine(str);
	// var columns = [];
	// // columns[0] = new nlobjSearchColumn('employee');
	// columns[0] = new nlobjSearchColumn('type');
	// columns[1] = new nlobjSearchColumn('hours');
	// var filters = [];
	// filters[0] = new nlobjSearchFilter('type',null,'is','B');
	// var searchResults = nlapiSearchRecord('timebill',null,filters,columns);
	// response.writeLine('length='+searchResults.length);
	// response.writeLine(JSON.stringify(searchResults));
	// testHtml(response);

	// var form = nlapiCreateForm('测试');
	// var test = form.addField('custpage_test', 'text', '测试');
	// test.setDefaultValue('1111111');
	// var list = form.addSubList('custpage_list', 'inlineeditor', '测试');
	// var f1 = list.addField('custpage_f1', 'text', '行号');
	// f1.setDefaultValue('222222');
	// response.writePage(form);

	var filter = [];
	filter.push(new nlobjSearchFilter('custrecord_region_province', null, 'is',
			3));
	var searchColumns = [];
	searchColumns[0] = new nlobjSearchColumn('name');
	var searchResults = nlapiSearchRecord('customrecord_region_province', null,
			filter, searchColumns);

	if (searchResults != null && searchResults.length > 0) {

		var areaname = searchResults[0].getValue('name');

		var areaId = getAreaId(areaname);// 根据区域中文获取区域在列表中的id
		response.writeLine('areaId=' + areaId);
	}
}
function getAreaId(name) {

	var areaId = 0;// 区域id
	switch (name) {
	case '东北区':
		areaId = 1;
		break;
	case '华中区':
		areaId = 2;
		break;
	case '华北区':
		areaId = 3;
		break;
	case '华南区':
		areaId = 4;
		break;
	case '西北区':
		areaId = 5;
		break;
	case '西南区':
		areaId = 6;
		break;
	case '华东区':
		areaId = 7;
		break;
	default:

	}

	return areaId;
}
/**
 * 同步删除项目组参考记录
 * 
 * @author zyt
 * @param id
 *            项目任务id
 */
function deleteProjectGroup(id, response) {

	// 根据项目任务查询关联的项目组参考记录
	var filter = [];
	filter.push(new nlobjSearchFilter('custrecord_pg_project_task', null, 'is',
			id));
	var searchColumns = [];
	searchColumns[0] = new nlobjSearchColumn('internalid');
	var searchResults = nlapiSearchRecord('customrecord_project_group', null,
			filter, searchColumns);

	response.writeLine('searchResults=' + JSON.stringify(searchResults));
	nlapiLogExecution('ERROR', 'searchResults', JSON.stringify(searchResults));
	if (searchResults != null && searchResults.length > 0) {
		var intId = searchResults[0].getValue('internalid');

		if (intId) {
			// nlapiDeleteRecord('customrecord_project_group', intId);// 删除
		}

	}

}
function getDepartment() {
	var departments = nlapiSearchRecord('Department', null, null, null);
	var exports = new Array();
	for (var i = 0; i < departments.length; i++) {
		var department = nlapiLoadRecord('Department', departments[i]['id']);
		var parent = department.getFieldText('parent');
		if (parent != '' && parent != null) {
			exports.push({
				text : parent + ' : ' + department.getFieldValue('name'),
				value : departments[i]['id']
			});
		}
	}

	return exports;
}

/**
 * 已保存搜索
 * 
 * @param response
 */
function useView(response) {
	var loadSearch = nlapiLoadSearch(null, 'customsearch_staff_assignment_time');
	var newSearch = nlapiCreateSearch(loadSearch.getSearchType(), loadSearch
			.getFilters(), loadSearch.getColumns());
	newSearch.addFilter(new nlobjSearchFilter('date', null, 'onorbefore',
			'2018-10-31'));
	newSearch.addFilter(new nlobjSearchFilter('date', null, 'onorafter',
			'2018-10-01'));
	newSearch.addFilter(new nlobjSearchFilter('employee', null, 'is', 144));
	var searchResults = newSearch.runSearch();
	var columnsold = searchResults.getColumns();
	var columns = new Object();
	if (columnsold) {
		for (var c = 0; c < columnsold.length; c++) {
			var co = columnsold[c];
			columns[co.getName()] = co;
			response.writeLine(columnsold[c]);
		}
		// for (var c = 0; c < columnsold.length; c++) {
		// var co = columnsold[c];
		// if (co.getName() == 'formulanumeric') {
		// columns[co.getName() + '' + c] = co;
		// } else {
		// columns[co.getName()] = co;
		// }
		// }
		// response.writeLine(columns);
	}
	var startIndex = 0;
	var list;
	var dataAry = [];
	var dataJson = {};
	// 一次最多还能取1000条，如果大于1000条数据，则拆开
	list = searchResults.getResults(startIndex, startIndex + 1000);
	if (list != null) {
		for (var i = 0; i < list.length; i++) {
			// var id = list[i].id;
			var date = list[i]
					.getValue(nlobjSearchColumn('date', null, 'GROUP'));
			var employee = list[i].getValue(nlobjSearchColumn('employee', null,
					'GROUP'));
			var formulanumeric = list[i].getValue(nlobjSearchColumn(
					'formulanumeric', null, 'SUM'));

			dataJson = {};
			dataJson['date'] = date;
			dataJson['employee'] = employee;
			dataJson['formulanumeric'] = parseFloat(formulanumeric).toFixed(1);
			;
			dataAry.push(dataJson);
		}
	}
	response.writeLine('1111=' + JSON.stringify(dataAry));
}
/**
 * 根据借款申请单创建支票
 * 
 * @author zyt
 * @param internalid
 *            借款申请单内部id
 * @id 支票id
 */
function createCheck(internalid, response) {

	var recCheck = nlapiCreateRecord('check');
	var rec = nlapiLoadRecord('customrecord_employee_borrow_head', internalid);
	// 通过付款方式取科目
	// var payment = nlapiGetFieldValue('custrecord_ebh_payment');
	var payment = rec.getFieldValue('custrecord_ebh_payment');
	response.writeLine('payment=' + payment);
	// 根据支付方式获取科目
	var account = getAccount(payment);
	response.writeLine('account=' + account);
	nlapiLogExecution('ERROR', 'account=', account);

	// var date = nlapiGetFieldValue('custrecord_ebh_date');
	var date = rec.getFieldValue('custrecord_ebh_date');
	response.writeLine('date=' + date);
	// 获取日期所属期间内部id
	var period = getPeriod(date);
	var amount = rec.getFieldValue('custrecord_ebh_money');// nlapiGetFieldValue('custrecord_ebh_money');
	var memo = rec.getFieldValue('custrecord_ebh_memo');// nlapiGetFieldValue('custrecord_ebh_memo');

	recCheck.setFieldValue('account', account);// 科目
	recCheck.setFieldValue('entity', rec.getFieldValue('custrecord_ebh_emp'));// 收款人
	recCheck.setFieldValue('trandate', date);// 日期
	recCheck.setFieldValue('postingperiod', period);// 期间

	nlapiLogExecution('ERROR', '期间=', period);

	recCheck.setFieldValue('usertotal', amount);// 金额
	recCheck.setFieldValue('memo', memo);// 备注
	// recCheck.setFieldValue('custbody_cseg_cn_cfi',
	// nlapiGetFieldValue('custrecord_ebh_cash_payment'));// 现金流量表项
	recCheck.setFieldValue('custbody_cseg_cn_cfi', rec
			.getFieldValue('custrecord_ebh_cash_payment'));// 现金流量表项
	recCheck.setFieldValue('subsidiary', rec
			.getFieldValue('custrecord_ebh_company'));// 子公司

	var lineType = 'expense';
	recCheck.setLineItemValue(lineType, 'account', 1,
			getConfigValue('EB_CHECK_ACCOUNT'));// 其他应收款

	nlapiLogExecution('ERROR', 'account1=', getConfigValue('EB_CHECK_ACCOUNT'));
	recCheck.setLineItemValue(lineType, 'amount', 1, amount);// 金额
	recCheck.setLineItemValue(lineType, 'taxcode', 1,
			getConfigValue('EB_CHECK_TAXCODE'));// 税类代码
	recCheck.setLineItemValue(lineType, 'memo', 1, memo);// 备注
	recCheck.setLineItemValue(lineType, 'department', 1, rec
			.getFieldValue('custrecord_ebh_dept'));// 部门
	recCheck.setLineItemValue(lineType, 'customer', 1, rec
			.getFieldValue('custrecord_ebh_project'));// 项目

	response.writeLine(JSON.stringify(recCheck));
	var id = nlapiSubmitRecord(recCheck);
	response.writeLine('id=' + id);
	return 1;
}