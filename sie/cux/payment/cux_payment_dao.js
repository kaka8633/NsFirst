/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       14 Sep 2018     Bman
 *
 */
/**
 * 查询 只有单据borrow时，periodText用来转化期间
 * 
 * @param period
 *            期间
 * @param department
 *            部门
 * @param date
 *            审批日期
 * @param certificate
 *            单据
 * @param summary汇总
 * 
 */
function searchRecord(form, period, department, date, certificate, summary,
		periodText) {

	// 参数不为空时添加参数到查询条件
	// 根据单据的不同查询不同的记录
	var fileData = {};
	var searchColumns = [];
	var filters = [];
	var search = {};
	// 自列表
	var sublist = form.getSubList('custpage_attach_sublist');
	if (certificate == 'bill') {
		filters.push(new nlobjSearchFilter('custbody_approve_date', null, 'on',
				date));
		if (department) {
			filters.push(new nlobjSearchFilter('department', null, 'is',
					department));
		}
		if (period != -1) {
			filters.push(new nlobjSearchFilter('postingperiod', null, 'is',
					period));
		}
		if (summary == 'N') {
			// 定义搜索的列：查询结果显示的列 查询顺序依次是 银行，银行账号，实体，银联号，总计
			// 在创建已保存搜索时，已经定义好
			search = nlapiLoadSearch('vendorbill', 'customsearch_payment_bill');
			searchColumns = search.getColumns();
			search.addFilters(filters);
			var json = setValuesToSublist(sublist, searchColumns, search,
					'bill');
			fileData = jsonToFile(json);

		} else if (summary == 'Y') {
			var searchName = '';

			if (department == '' && period == -1) {
				searchName = 'customsearch_payment_bill_group_date';
			} else if (department == '' && period != -1) {
				searchName = 'customsearch_payment_bill_group_period';
			} else if (department != '' && period == -1) {
				searchName = 'customsearch_payment_bill_group_depart';
			} else if (department != '' && period != -1) {
				searchName = 'customsearch_payment_bill_all';
			}

			search = nlapiLoadSearch(null, searchName);
			// 定义搜索的列：查询结果显示的列 查询顺序依次是 银行，银行账号，实体，银联号，总计
			// 在创建已保存搜索时，已经定义好
			searchColumns = search.getColumns();
			search.addFilters(filters);
			var json = setValuesToSublist(sublist, searchColumns, search,
					'bill');
			fileData = jsonToFile(json);
		}

		// 工资明细，期间必填，每个期间每个人只有一条记录
	} else if (certificate == 'salary') {
		if (department) {
			filters.push(new nlobjSearchFilter('custrecord_sd_department',
					null, 'is', department));
		}
		filters.push(new nlobjSearchFilter('custrecord_sd_period', null, 'is',
				period));
		// 定义搜索的列：查询结果显示的列 查询顺序依次是 银行，银行账号，实体，银联号，总计
//		searchColumns[0] = new nlobjSearchColumn('custentity_bank',
//				'custrecord_sd_employee');
//		searchColumns[1] = new nlobjSearchColumn('custentity_bank_number',
//				'custrecord_sd_employee');
//		searchColumns[2] = new nlobjSearchColumn('altname','CUSTRECORD_SD_EMPLOYEE');//"altname" custrecord_sd_employee
//		
//		searchColumns[3] = new nlobjSearchColumn('custentity_union_number',
//				'custrecord_sd_employee');
//		searchColumns[4] = new nlobjSearchColumn('custrecord_sd_actual_salary');
		search = nlapiLoadSearch(null,'customsearch_payment_salary');
		searchColumns = search.getColumns();
		search.addFilters(filters);
		var json = setValuesToSublist(sublist, searchColumns, search, 'salary');
		fileData = jsonToFile(json);

	} else if (certificate == 'report') {

		filters.push(new nlobjSearchFilter('custbody_approve_date', null, 'on',
				date));
		if (department) {
			filters.push(new nlobjSearchFilter('department', null, 'is',
					department));
		}
		if (period != -1) {
			filters.push(new nlobjSearchFilter('postingperiod', null, 'is',
					period));
		}

		if (summary == 'N') {
			search = nlapiLoadSearch('expensereport',
					'customsearch_payment_expense');
			search.addFilters(filters);
			// 定义搜索的列：查询结果显示的列 查询顺序依次是 银行，银行账号，实体，银联号，总计
			searchColumns = search.getColumns();
			var json = setValuesToSublist(sublist, searchColumns, search,
					'report');
			fileData = jsonToFile(json);
		} else if (summary == 'Y') {
			var searchName = '';
			if (department == '' && period == -1) {
				searchName = 'customsearch_payment_expense_date';
			} else if (department == '' && period != -1) {
				searchName = 'customsearch_payment_expense_period';
			} else if (department != '' && period == -1) {
				searchName = 'customsearch_payment_expense_depart';
			} else if (department != '' && period != -1) {
				searchName = 'customsearch_payment_expense_all';
			}
			search = nlapiLoadSearch(null, searchName);
			search.addFilters(filters);
			searchColumns = search.getColumns();
			var json = setValuesToSublist(sublist, searchColumns, search,
					'report');
			fileData = jsonToFile(json);
		}

	} else if (certificate == 'borrow') {
		filters.push(new nlobjSearchFilter('custrecord_ebh_approve_date', null,
				'on', date));
		if (department) {
			filters.push(new nlobjSearchFilter('custrecord_ebh_dept', null,
					'is', department));
		}
		if (period != -1) {
			// 借款申请单中没有期间，需要自己把期间转换成日期
			var periodToDate = periodText.substring(
					periodText.lastIndexOf(':') + 1).replace('年度', '-')
					.replace('月', '').split('-');
			var startDate = new Date(periodToDate[0],
					parseInt(periodToDate[1]) - 1, 1);
			var day = new Date(periodToDate[0], periodToDate[1], 0).getDate();
			var endDate = new Date(periodToDate[0],
					parseInt(periodToDate[1]) - 1, day);
			filters.push(new nlobjSearchFilter('custrecord_ebh_date', null,
					'onorafter', startDate));
			filters.push(new nlobjSearchFilter('custrecord_ebh_date', null,
					'onorbefore', endDate));
		}
		if (summary == 'N') {
			search = nlapiLoadSearch(null, 'customsearch_payment_borrow');
			// 定义搜索的列：查询结果显示的列 查询顺序依次是 银行，银行账号，实体，银联号，总计
			searchColumns = search.getColumns();
			search.addFilters(filters);
			var json = setValuesToSublist(sublist, searchColumns, search,
					'borrow');
			fileData = jsonToFile(json);
		} else if (summary == 'Y') {
			var searchName = '';
			if (department == '' && period == -1) {
				searchName = 'customsearch_payment_borrow_date';
			} else if (department == '' && period != -1) {
				searchName = 'customsearch_payment_borrow_period';
			} else if (department != '' && period == -1) {
				searchName = 'customsearch_payment_borrow_depart';
			} else if (department != '' && period != -1) {
				searchName = 'customsearch_payment_borrow_all';
			}
			search = nlapiLoadSearch(null, searchName);
			// 定义搜索的列：查询结果显示的列 查询顺序依次是 银行，银行账号，实体，银联号，总计
			searchColumns = search.getColumns();
			search.addFilters(filters);
			var json = setValuesToSublist(sublist, searchColumns, search,
					'borrow');
			fileData = jsonToFile(json);
		}
	}

	return fileData;
}

/**
 * 给子列表赋值 没有合并金额
 * 
 * @param form
 * @param searchColumns
 * @param search
 */
function setValuesToSublist(sublist, searchColumns, search, type) {
	var searchResults = search.runSearch();
	var startIndex = 0;
	// 生成excel文件
	var json = [];
	// 汇款用途
	var purpose = '';
	// 子列表的起始列是1开始的
	var index = 1;
	do {
		var resultSet = searchResults.getResults(startIndex, startIndex + 1000);

		for (var i = 0; i < resultSet.length; i++) {
			// json中的对象
			var obj = {};
			var custentityBank = resultSet[i].getValue(searchColumns[0]);
			var custentityBankNumber = resultSet[i].getValue(searchColumns[1]);
			var companyname = '';
			if (type == 'bill') {
				companyname = resultSet[i].getValue(searchColumns[2]);
				// 汇款用途
				purpose = getConfigValue('cux_payment_purpose_bill');
			} else if (type == 'report') {
				companyname = resultSet[i].getValue(searchColumns[2]);
				// 汇款用途
				purpose = getConfigValue('cux_payment_purpose_report');
			} else if (type == 'salary') {
				companyname = resultSet[i].getValue(searchColumns[2]);
				// 汇款用途
				purpose = getConfigValue('cux_payment_purpose_salary');
			} else if (type == 'borrow') {
				companyname = resultSet[i].getValue(searchColumns[2]);
				// 汇款用途
				purpose = getConfigValue('cux_payment_purpose_borrow');
			}
			var custentityUnionNumber = resultSet[i].getValue(searchColumns[3]);
			var usertotal = resultSet[i].getValue(searchColumns[4]);

			var transferType = 1;

			if (custentityBank != getConfigValue('cux_payment_account_bank')) {
				transferType = 2;
			}
			var cuxPaymentAccount = getConfigValue('cux_payment_account');
			var cuxPaymentAccountName = getConfigValue('cux_payment_account_name');
			// excel一条记录
			obj.index = index;
			obj.cuxPaymentAccount = cuxPaymentAccount;
			obj.cuxPaymentAccountName = cuxPaymentAccountName;
			obj.custentityBankNumber = custentityBankNumber;
			obj.usertotal = usertotal;
			obj.accountName = companyname;
			//如果转账类型为1，联行号 为空
			if (transferType == 1) {
				custentityUnionNumber = '';
			}
			obj.custentityBank = custentityBank;
			obj.custentityUnionNumber = custentityUnionNumber;
			obj.transferType = transferType.toFixed(0);
			obj.purpose = purpose;
			json.push(obj);
			// 子列表赋值
			sublist.setLineItemValue('custpage_sp_payment_index', index, index
					.toFixed(0));
			sublist.setLineItemValue('custpage_sp_payment_account', index,
					cuxPaymentAccount);
			sublist.setLineItemValue('custpage_sp_payment_account_name', index,
					cuxPaymentAccountName);
			sublist.setLineItemValue('custpage_sp_collection_account', index,
					custentityBankNumber);
			sublist.setLineItemValue('custpage_sp_amount', index, usertotal);
			sublist.setLineItemValue('custpage_sp_collection_account_name',
					index, companyname);
			sublist.setLineItemValue('custpage_sp_collection_account_bank',
					index, custentityBank);
			sublist.setLineItemValue('custpage_sp_union_number', index,
					custentityUnionNumber);
			sublist.setLineItemValue('custpage_sp_transfer_type', index,
					transferType.toFixed(0));
			sublist.setLineItemValue('custpage_sp_remittance_purpose', index,
					purpose);
			index++;

		}
		startIndex += 1000;
	} while (resultSet != null && resultSet.length > 0);

	return json;
}

//生产文件格式
function jsonToFile(json) {
	var xmlStr = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>';
	xmlStr += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" ';
	xmlStr += 'xmlns:o="urn:schemas-microsoft-com:office:office" ';
	xmlStr += 'xmlns:x="urn:schemas-microsoft-com:office:excel" ';
	xmlStr += 'xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" ';
	xmlStr += 'xmlns:html="http://www.w3.org/TR/REC-html40">';
	xmlStr += '<Styles>'
			+ '<Style ss:ID="s63">'
			+ '<Font x:CharSet="204" ss:Size="12" ss:Color="#000000" ss:Bold="1" ss:Underline="Single"/>'
			+ '</Style>' + '</Styles>';

	xmlStr += '<Worksheet ss:Name="Sheet1">';
	xmlStr += '<Table>' + '<Row>'
			+ '<Cell><Data ss:Type="String"> 序号 </Data></Cell>'// ss:StyleID="s63"
			+ '<Cell><Data ss:Type="String"> 付款账号 </Data></Cell>'
			+ '<Cell><Data ss:Type="String">付款账号名称</Data></Cell>'
			+ '<Cell><Data ss:Type="String">收款账号</Data></Cell>'
			+ '<Cell><Data ss:Type="String">收款账号名称</Data></Cell>'
			+ '<Cell><Data ss:Type="String">收款账号开户行</Data></Cell>'
			+ '<Cell><Data ss:Type="String">转账类型</Data></Cell>'
			+ '<Cell><Data ss:Type="String">收报行联行号</Data></Cell>'
			+ '<Cell><Data ss:Type="String">金额</Data></Cell>'
			+ '<Cell><Data ss:Type="String">汇款用途</Data></Cell>' + '</Row>';

	for (var i = 0; i < json.length; i++) {
		xmlStr += '<Row>' 
			+ '<Cell><Data ss:Type="String">'+ json[i]['index']+ '</Data></Cell>'
			+ '<Cell><Data ss:Type="String">'+ json[i]['cuxPaymentAccount'] + '</Data></Cell>'
			+ '<Cell><Data ss:Type="String">'+ json[i]['cuxPaymentAccountName'] + '</Data></Cell>'
			+ '<Cell><Data ss:Type="String">'+ json[i]['custentityBankNumber'] + '</Data></Cell>'
			+ '<Cell><Data ss:Type="String">'+ json[i]['accountName']+ '</Data></Cell>' 
			+ '<Cell><Data ss:Type="String">'+ json[i]['custentityBank'] + '</Data></Cell>'
			+ '<Cell><Data ss:Type="String">'+ json[i]['transferType']+ '</Data></Cell>'
			+ '<Cell><Data ss:Type="String">'+ json[i]['custentityUnionNumber'] + '</Data></Cell>'
			+ '<Cell><Data ss:Type="String">'+ json[i]['usertotal']+ '</Data></Cell>'
			+ '<Cell><Data ss:Type="String">'+ json[i]['purpose'] + '</Data></Cell>' + '</Row>';
	}

	xmlStr += '</Table></Worksheet></Workbook>';

	var file = nlapiCreateFile('支付文件.xls', 'EXCEL', nlapiEncrypt(xmlStr,
			'base64'));
	// 用配置一下
	file.setFolder(getConfigValue('TEMP_FOLDER'));
	var fileId = nlapiSubmitFile(file);
	var newFile = nlapiLoadFile(fileId);
	var fileURL = newFile.getURL();
	var obj = {
		'fileId' : fileId,
		'fileURL' : fileURL
	};
	return obj;

}