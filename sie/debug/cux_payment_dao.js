/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       14 Sep 2018     Bman
 *
 */
/**
 * 查询 period 期间 department 部门 date 审批日期 certificate 单据 summary汇总
 * 
 */
function searchRecord(form, period, department, date, certificate, summary) {

	var filters = new Array();

	// 参数不为空时添加参数到查询条件
	// 根据单据的不同查询不同的记录
	if (certificate == 'bill') {
		nlapiLogExecution('DEBUG', 'certificate', certificate);
		if (period) {
			filters.push(new nlobjSearchFilter('postingperiod', null, 'is',
					period));
		}

		if (department) {
			filters.push(new nlobjSearchFilter('department', null, 'is',
					department));
		}

		if (date) {
			filters.push(new nlobjSearchFilter('custbody_approve_date', null,
					'is', date));
		}

		// 定义搜索的列：查询结果显示的列
		var searchColumns = new Array();
		searchColumns[0] = new nlobjSearchColumn('department');
		searchColumns[1] = new nlobjSearchColumn('custbody_approve_date');
		searchColumns[2] = new nlobjSearchColumn('postingperiod');

		var searchResults = nlapiCreateSearch('vendorbill', filters,
				searchColumns).runSearch();
		// nlapiLogExecution('DEBUG','data',searchResults.getResults(0,1).getText('department'));
		var sublist = form.getSubList('custpage_attach_sublist');

		var startIndex = 0;
		// 子列表的起始列是1开始的
		var index = 1;
		do {
			var resultSet = searchResults.getResults(startIndex,
					startIndex + 1000);

			for (var i = 0; i < resultSet.length; i++) {

				sublist.setLineItemValue('custpage_sp_payment_index', index,
						index.toFixed(0));
				sublist.setLineItemValue('custpage_sp_payment_account', index,
						getConfigValue('cux_payment_account'));
				sublist.setLineItemValue('custpage_sp_payment_account_name',index,
						getConfigValue('cux_payment_account_name'));

				index++

			}
			startIndex += 1000;
		} while (resultSet != null && resultSet.length > 0);

	} else if (certificate == 'salary') {

	} else if (certificate == 'report') {

	} else if (certificate == 'borrow') {

	}

}