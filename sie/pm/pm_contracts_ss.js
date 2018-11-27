/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       06 Nov 2018     zangxuepu
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */
function scheduled(type) {
	
	//if (type != 'scheduled' && type != 'skipped') return;

	var Column = new Array();
	Column[0] = new nlobjSearchColumn('custentity_pm_percentage')
	var search = nlapiCreateSearch('job', null, Column);
	var jobResultSet = search.runSearch();
	var index = 0;
	
	do {
		var jobResult = jobResultSet.getResults(index,index+1000);
		var debugData = jobResult;//debug
		var fieldArr = new Array();
		var valuesArr = new Array();
		nlapiLogExecution('error','jobResult_'+index,JSON.stringify(debugData));//debug
		for( var i = 0 ; i < jobResult.length ;i++){
			// 合同编号
			var tranid = '';
			// 合同名称
			var contractName = '';
			// 合约状态
			var statusValue = '';
			// 合同金额
			var total = 0;
			// 已完成金额
			var finishedTotal = 0;
			// 未完成的金额
			var unfinishedTotal = 0;
			
			var jobId = jobResult[i].getId(); //获取id
			// var record = nlapiLoadRecord('job', jobId);
			// var pm_percentage = parseInt(record.getFieldValue('custentity_pm_percentage')) * 0.01;
			var pm_percentage = parseInt(jobResult[i].getValue('custentity_pm_percentage')) * 0.01;

			
			var filters = [];
			filters.push(new nlobjSearchFilter('internalid', 'jobMain', 'is', jobId));
			//做了两个已保存搜索，customsearch_contract_sales_order 此已保存搜索合约状态都不为 合约收到100% ，合约状态 都为合约收到100%的在customsearch_contract_sales_order_100中
			var search = nlapiLoadSearch(null,'customsearch_contract_sales_order');
			search.addFilters(filters);
			var searchResult = search.runSearch();
			var result = searchResult.getResults(0, 1);
			//合约状态不为  合约收到100% 时
			if (result[0] != undefined) {
				tranid = result[0].getValue('tranid');
				contractName = result[0].getValue('custbody_contract_name');
				statusValue = result[0].getText('custbody_contract_status2');
			} else {
				var sales100search = nlapiLoadSearch(null,'customsearch_contract_sales_order_100');
				sales100search.addFilters(filters);
				var search100Result = sales100search.runSearch();
				var result100 = search100Result.getResults(0,1);
				var debugData = result100;//debug
        		nlapiLogExecution('error','result100_ss_'+i,JSON.stringify(debugData));//debug	
				// 可能是内部项目，所以销售合同可能不存在
				if (result100[0] != undefined) {
					tranid = result100[0].getValue('tranid');
					contractName = result100[0].getValue('custbody_contract_name');
					total = result100[0].getValue('amount');
					finishedTotal = (total * pm_percentage).toFixed(2);
					unfinishedTotal = (total - finishedTotal).toFixed(2);
					statusValue = result100[0].getText('custbody_contract_status2');
				}
			}
			
			// 已保存搜索 开票收入
			var invoiceSearch = nlapiLoadSearch(null, 'customsearch_contract_invoice_income');
			invoiceSearch.addFilter(new nlobjSearchFilter('internalid', 'jobMain','is', jobId));
			var invoiceResultSet = invoiceSearch.runSearch();
			var invoiceResult = invoiceResultSet.getResults(0, 1);
			var invoiceIncome = 0;
			if (invoiceResult[0] != undefined) {
				invoiceIncome = invoiceResult[0].getValue('amount', null, 'sum');
			}

			// 已保存搜索 现金（回款）
			var invoiceCashSearch = nlapiLoadSearch(null, 'customsearch_contract_invoice_cash');
			invoiceCashSearch.addFilter(new nlobjSearchFilter('internalid', 'jobMain','is', jobId));
			var invoiceCashResultSet = invoiceCashSearch.runSearch();
			var invoiceCashResult = invoiceCashResultSet.getResults(0, 1);
			var cash = 0;
			if (invoiceCashResult[0] != undefined) {
				cash = invoiceCashResult[0].getValue('amount', null, 'sum');
			}

			// 已保存搜索 应收账款
			var invoiceReceivablesSearch = nlapiLoadSearch(null,'customsearch_contract_invoice_receivable');
			invoiceReceivablesSearch.addFilter(new nlobjSearchFilter('internalid','jobMain', 'is', jobId));
			var invoiceReceivablesResultSet = invoiceReceivablesSearch.runSearch();
			var invoiceReceivablesSetResult = invoiceReceivablesResultSet.getResults(0,1);
			var receivables = 0;
			if (invoiceReceivablesSetResult[0] != undefined) {
				receivables = invoiceReceivablesSetResult[0].getValue('amount', null, 'sum');
			}
			//合同编号
			//nlapiSubmitField('job',jobId,'custentity_contract_number',tranid)//record.setFieldValue('custentity_contract_number', tranid);
			fieldArr.push('custentity_contract_number');
			valuesArr.push(tranid)
			//合同名称
			//nlapiSubmitField('job',jobId,'custentity_contract_name',contractName)//record.setFieldValue('custentity_contract_name', contractName);
			fieldArr.push('custentity_contract_name');
			valuesArr.push(contractName)
			//合同状态
			//nlapiSubmitField('job',jobId,'custentity_contract_status',statusValue)//record.setFieldValue('custentity_contract_status', statusValue);
			fieldArr.push('custentity_contract_status');
			valuesArr.push(statusValue)
			//合同金额
			//nlapiSubmitField('job',jobId,'custentity_contract_amount',total)//record.setFieldValue('custentity_contract_amount', total);
			fieldArr.push('custentity_contract_amount');
			valuesArr.push(total)
			//已完成金额
			//nlapiSubmitField('job',jobId,'custentity_finished_amount',finishedTotal)//record.setFieldValue('custentity_finished_amount', finishedTotal);
			fieldArr.push('custentity_finished_amount');
			valuesArr.push(finishedTotal)
			//未完成金额
			//nlapiSubmitField('job',jobId,'custentity_not_finished_amount',unfinishedTotal)//record.setFieldValue('custentity_not_finished_amount', unfinishedTotal);
			fieldArr.push('custentity_not_finished_amount');
			valuesArr.push(unfinishedTotal)
			//开票金额
			//record.setFieldValue('custentity_bill_amount',invoiceIncome);
			//未开票金额
			var uninvoiceIncomeValue = 0;
                uninvoiceIncomeValue = (finishedTotal - invoiceIncome).toFixed(2);
                if (uninvoiceIncomeValue < 0) {
                  uninvoiceIncomeValue = 0;
                }
							//nlapiSubmitField('job',jobId,'custentity_not_bill_amount',uninvoiceIncomeValue)   	//record.setFieldValue('custentity_not_bill_amount',uninvoiceIncomeValue);
							fieldArr.push('custentity_not_bill_amount');
							valuesArr.push(uninvoiceIncomeValue)
			//现金（回款）
			//nlapiSubmitField('job',jobId,'custentity_cash_amount',cash)//record.setFieldValue('custentity_cash_amount',cash);
			fieldArr.push('custentity_cash_amount');
			valuesArr.push(cash)
			//应收账款
			//nlapiSubmitField('job',jobId,'custentity_to_receive_amount',receivables)//record.setFieldValue('custentity_to_receive_amount',receivables);
			fieldArr.push('custentity_to_receive_amount');
			valuesArr.push(receivables)
			nlapiSubmitField('job',jobId,fieldArr,valuesArr)
			// nlapiSubmitRecord(record,false,true);
			
		}
		index += 1000;
	} while (result != null && result.length > 0);
}
