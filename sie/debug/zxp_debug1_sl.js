/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       19 Sep 2018     Bman
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response) {



	if(request.getMethod() == 'GET'){

//		var filters = [];
//		var columns = [];
//		filters.push(new nlobjSearchFilter('custbody_job_id',null,'is', '753'));
//		columns[0] = new nlobjSearchColumn('custbody_contract_status_y_n');
//		var search =  nlapiCreateSearch('opportunity', filters, columns);
//var invoiceSearch = nlapiLoadSearch(null,'customsearch_contract_invoice_income');
//		
//		invoiceSearch.addFilter(new nlobjSearchFilter('companyname', null, 'is',jobName));
//		
		//var resultSet = invoiceSearch.runSearch();

	//	var jobRecord  = nlapiLoadRecord('job', '753');
		
		//项目名称，在查询发票时需要
		//var jobName = jobRecord.getFieldValue('companyname');
//		var search = nlapiLoadSearch(null, 'customsearch_contract_invoice_income');
//		search.addFilter(new nlobjSearchFilter('internalid', 'jobMain', 'is','753'));
//		var resultSet = search.runSearch();
//		var result = resultSet.getResults(0,1000);
//		var invoiceIncome = result[0].getValue('amount',null,'sum');

//		var invoiceCashSearch = nlapiLoadSearch(null,'customsearch_contract_invoice_cash');
//		
//		invoiceCashSearch.addFilter(new nlobjSearchFilter('internalid', 'jobMain', 'is','753'));
//		var invoiceCashResultSet = invoiceCashSearch.runSearch();
//		var invoiceCashResult = invoiceCashResultSet.getResults(0,1);
//		var cash = invoiceCashResult[0].getValue('amount',null,'sum');
		//var search = nlapiSearchRecord('opportunity', null, filters, columns);
		
	var invoiceReceivablesSearch = nlapiLoadSearch(null,'customsearch_contract_invoice_receivable');
		
		invoiceReceivablesSearch.addFilter(new nlobjSearchFilter('internalid', 'jobMain', 'is','753'));
		var invoiceReceivablesResultSet = invoiceReceivablesSearch.runSearch();
		var invoiceReceivablesSetResult = invoiceReceivablesResultSet.getResults(0,1);
		var receivables = invoiceReceivablesSetResult[0].getValue('amount',null,'sum');
		var t = 0;
//		//查询销售订单
//		var salesOrderFilters = [];
//		var salesOrderColumns = [];
//		salesOrderFilters.push(new nlobjSearchFilter('job', null, 'is', '753'));
//		//销售订单号，合同编号
//		salesOrderColumns[0] = new nlobjSearchColumn('tranid');
//		//合同名称
//		salesOrderColumns[1] = new nlobjSearchColumn('custbody_contract_name');
//		//合同金额
//		salesOrderColumns[2] = new nlobjSearchColumn('total');
//		
//		var search = nlapiCreateSearch('salesorder',salesOrderFilters,salesOrderColumns);
//		var resultSet = search.runSearch();
//		var result = resultSet.getResults(0,1);
////		//合同编号
////		var tranid = result.getValue(salesOrderColumns[0]);
////		//合同名称
////		var contractName = result.getValue(salesOrderColumns[1]);
////		//合同金额
////		var total  = result.getValue(salesOrderColumns[2]);
		response.write(JSON.stringify(receivables));
		
//		//查询销售订单
//		var salesOrderFilters = [];
//		var salesOrderColumns = [];
//		salesOrderFilters.push(new nlobjSearchFilter('job', null, 'is',  '753'));
//		//销售订单号，合同编号
//		salesOrderColumns[0] = new nlobjSearchColumn('tranid');
//		//合同名称
//		salesOrderColumns[1] = new nlobjSearchColumn('custbody_contract_name');
//		//合同金额
//		salesOrderColumns[2] = new nlobjSearchColumn('total');
//		
//		var search = nlapiCreateSearch('salesorder',salesOrderFilters,salesOrderColumns);
//		var resultSet = search.runSearch();
//		var result = resultSet.getResults(0,1);
////		//合同编号
////		var tranid = result.getValue(salesOrderColumns[0]);
////		//合同名称
////		var contractName = result.getValue(salesOrderColumns[1]);
////		//合同金额
////		var total  = result.getValue(salesOrderColumns[2]);
//		response.write(JSON.stringify(result));
	}


}

function testLoadRecord() {
	
	var record = nlapiLoadRecord('vendor', 156);
	
	nlapiLogExecution('DEBUG', 'field', record.getFieldValue('custentity_bank'));
}


function testSalary(){
	//var filters = [];
	//var searchColumns = [];
	//filters.push(new nlobjSearchFilter('mainline', null, 'is', 'T'));
	//searchColumns[0] = new nlobjSearchColumn('custrecord_sd_actual_salary');
	//searchColumns[1] = new nlobjSearchColumn('custrecord_sd_employee',null,'group');
	//searchColumns[1] = new nlobjSearchColumn('internalid',null,'group');
	//searchColumns[0] = new nlobjSearchColumn('custrecord_sd_bank_of_deposit');
	//searchColumns[1] = new nlobjSearchColumn('custrecord_sd_account_number',null,'group');
//	searchColumns[2] = new nlobjSearchColumn('custrecord_sd_employee',null,'group');
//	searchColumns[2] = new nlobjSearchColumn('custrecord_sd_employee');
//	searchColumns[3] = new nlobjSearchColumn('custrecord_sd_cnaps',null,'group');
//	searchColumns[4] = new nlobjSearchColumn('custrecord_sd_actual_salary',null,'sum');
	//searchColumns[0] = new nlobjSearchColumn('custrecord_sd_employee',null,'group');
	//searchColumns[1] = new nlobjSearchColumn('custrecord_sd_actual_salary').setFormula('TO_NUMBER({custrecord_sd_actual_salary})');
	//searchColumns[1]
	//search = nlapiCreateSearch('customrecord_salary_detail',null, searchColumns);
	//var json = amountData(sublist, search, 'salary');
	//fileData = jsonToFile(json);
	//var resultSet = search.runSearch();	
	return resultSet.getResults(0, 100);
}

function testSearchSalary() {
	
	search = nlapiLoadSearch('customrecord_salary_detail','customsearch_payment_salary_search');
	var searchColumns = [];
	searchColumns[0] = new nlobjSearchColumn('custrecord_sd_bank_of_deposit');
	searchColumns[1] = new nlobjSearchColumn('custrecord_sd_account_number');
	searchColumns[2] = new nlobjSearchColumn('custrecord_sd_employee');
	searchColumns[3] = new nlobjSearchColumn('custrecord_sd_cnaps');
	searchColumns[4] = new nlobjSearchColumn('custrecord_sd_actual_salary');
	search.addColumns(searchColumns);
	var resultSet = search.runSearch();	
	return resultSet.getResults(0, 100);
	
}

function borrow() {
	var searchColumns = [];
	var filters = [];
//	searchColumns[0] = new nlobjSearchColumn('custrecord_ebh_bank_name');
//	searchColumns[1] = new nlobjSearchColumn('custrecord_ebh_bank_account');
//	searchColumns[2] = new nlobjSearchColumn('custrecord_ebh_emp');
//	searchColumns[3] = new nlobjSearchColumn('custrecord_ebh_union_no');
//	searchColumns[4] = new nlobjSearchColumn('custrecord_ebh_money');
//	searchColumns[5] = new nlobjSearchColumn('custrecord_ebh_date');
	searchColumns[0] = new nlobjSearchColumn('custrecord_ebh_bank_name',null,'max');
	searchColumns[1] = new nlobjSearchColumn('custrecord_ebh_bank_account',null,'max');
	searchColumns[2] = new nlobjSearchColumn('custrecord_ebh_emp',null,'group');
	searchColumns[3] = new nlobjSearchColumn('custrecord_ebh_union_no',null,'max');
	searchColumns[4] = new nlobjSearchColumn('custrecord_ebh_money',null,'max');
	
//	var startDate = new Date('2018-9-1');
//	var endDate = new Date('2018-9-30');
	filters.push(new nlobjSearchFilter().constructor('custrecord_ebh_date', null, 'onorafter', '2018-9-14'));
	filters.push(new nlobjSearchFilter().constructor('custrecord_ebh_date', null, 'onorbefore', '2018-9-30'));
	//filters.push(new nlobjSearchFilter('custrecord_ebh_date', null, 'before', '2018-9-16'));
	//filters.push(new nlobjSearchFilter('custrecord_ebh_date', null, 'before', endDate));
	var search = nlapiCreateSearch('customrecord_employee_borrow_head', filters, searchColumns);
	var resultSet = search.runSearch();	
	return resultSet.getResults(0, 100);
	
}