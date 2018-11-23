/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       14 Oct 2018     Administrator
 *
 */

/**
 * @param {nlobjRequest}
 *            request Request object
 * @param {nlobjResponse}
 *            response Response object
 * @returns {Void} Any output is written via response object
 */
// 测试输出已保存搜索
/*
 * function hands_up(request, response) { var search = nlapiLoadSearch(null,
 * 'customsearch_test_function'); var searchColumns = []; searchColumns[0] = new
 * nlobjSearchColumn('formulanumeric', null, 'sum')
 * .setFormula('to_number(substr({duration},1,instr({duration},\':\')-1))+to_number(substr({duration},instr({duration},\':\')+1))/60');
 * searchColumns[1] = new nlobjSearchColumn('formulanumeric', null, 'sum')
 * .setFormula('to_number(substr({duration},1,instr({duration},\':\')-1))');
 * //search.addColumns(searchColumns); var resultSet = search.runSearch(); var
 * result = resultSet.getResults(0, 10);
 * response.write(result[0].getValue(searchColumns[0])); //
 * response.write(result[0].getValue(); }
 */

function hands_up(request, response) {
	// 销售订单
	// var search = nlapiLoadSearch(null, 'customsearch_contract_sales_order');
	// search.addFilter(new nlobjSearchFilter('internalid', 'jobMain', 'is',
	// 753));
	// var resultSet = search.runSearch();
	// var result = resultSet.getResults(0, 1);
	// response.write(JSON.stringify(result));
	/*var search = nlapiLoadSearch(null, 'customsearch_project_financial_info');
	var resultSet = search.runSearch();*/
	//var result = resultSet.getResults(0, 1000);
	// response.write(result.length);
	// response.write(JSON.stringify(result));

	// 获取字段名称
	//var columnsold = resultSet.getColumns();

	//var startIndex = 0;
	// var index = 1;
	//var lines = new Array();
	/*var json  = [];
	do {
		var result = resultSet.getResults(startIndex, startIndex + 1000);
		for (var i = 0; i < result.length; i++) {
         
			//var cell = new Array(result[i].getValue(columnsold[2]), result[i]
			//		.getValue(columnsold[3]), result[i].getValue(columnsold[4]));
			//lines[i] = cell;
			//response.write(JSON.stringify(cell));
			// index++;
			
			var obj = {};
			obj.internalID = result[i].getValue(columnsold[2]);
			obj.salesAmount = result[i].getValue(columnsold[3]);
			obj.InvoiceAmount = result[i].getValue(columnsold[4]);
			response.write(typeof(obj.internalID));
			response.write(typeof(obj.salesAmount));
			response.write(typeof(obj.salesAmount));
			json.push(obj);
		}
		startIndex += 1000;
	} while (resultSet != null && resultSet.length > 0);
	
	

	response.write(JSON.stringify(json));*/
	/*do {
		var result = resultSet.getResults(startIndex, startIndex + 1000);
		for (var i = 0; i < result.length; i++) {

			// 分别获取内部标识，
			var internalId = parseInt(result[i].getValue(columnsold[2]));
			var salesAmount = parseFloat(result[i].getValue(columnsold[3]));
			var invoiceAmount = parseFloat(result[i].getValue(columnsold[4]));

			var amountPercent = 0;

			//获取项目任务百分比
			if(parseFloat(salesAmount) != 0)
			{
				amountPercent = invoiceAmount / salesAmount;
			}
			
			response.write(JSON.stringify(amountPercent)+'<br>');
		}
		startIndex += 1000;
	} while (resultSet != null && resultSet.length > 0);*/
	/*try {

		// 获取客制化项目财务信息已保存搜索
		var search = nlapiLoadSearch(null,
				'customsearch_project_financial_info');
		var resultSet = search.runSearch();

		// 获取字段
		var columnsold = resultSet.getColumns();

		var startIndex = 0;

		// 查询数据，每次查询1000条
		do {
			var result = resultSet.getResults(startIndex, startIndex + 1000);
			for (var i = 0; i < result.length; i++) {

				// 分别获取内部标识，
				var internalId = parseInt(result[i].getValue(columnsold[2]));
				var salesAmount = parseFloat(result[i].getValue(columnsold[3]));
				var invoiceAmount = parseFloat(result[i]
						.getValue(columnsold[4]));

				var amountPercent = 0;

				// 获取项目任务百分比
				if (parseFloat(salesAmount) != 0) {
					amountPercent = invoiceAmount / salesAmount;
				}

				// 更新百分比
				nlapiSubmitField('job', internalId,
						'custentity_main_percenttimecomplete', amountPercent,
						true);
			}
			startIndex += 1000;
		} while (resultSet != null && resultSet.length > 0);
	} catch (error) {
		nlapiLogExecution('ERROR', '开票金额百分比计划任务执行异常', error.message);
	}*/
	// 获取字段名称
	//var columnsold = resultSet.getColumns();

	// response.write(JSON.stringify(columnsold[3].getName()));
	/*
	 * var columns = new Object(); if (columnsold) { for (var c = 0; c <
	 * columnsold.length; c++) { var co = columnsold[c]; if (co.getName() ==
	 * 'formulanumeric') { columns[co.getName() + '' + c] = co; } else {
	 * columns[co.getName()] = co; } } }
	 */

	// 数组
	// var cell = new Array(result[15].getValue(columnsold[2]), result[15]
	// .getValue(columnsold[3]), result[15].getValue(columnsold[4]));
	//	
	// response.write(JSON.stringify(cell));
	// cell[0] = result[15].getValue(columnsold[2]);
	// response.write(JSON.stringify(result[15].getValue(columnsold[0])));
	// response.write(JSON.stringify(result[15].getValue(columnsold[1])));
	// response.write(JSON.stringify(result[15].getValue(columnsold[2])));
	// response.write(JSON.stringify(result[15].getValue(columnsold[3])));
	// response.write(JSON.stringify(result[15].getValue(columnsold[4])));
	// result[0].getValue(columnsold[0]);
	/*
	 * var startIndex = 0; var index = 1; do { var resultSet =
	 * searchResults.getResults(startIndex, startIndex + 1000); for (var i = 0;
	 * i < resultSet.length; i++) { var intIdRs =
	 * resultSet[i].getValue('internalId'); var subcompanyRs =
	 * resultSet[i].getText('custrecord_sd_subcompany'); var periodRs =
	 * resultSet[i].getText('custrecord_sd_period'); var employeeRs =
	 * resultSet[i].getText('custrecord_sd_employee');
	 * 
	 * 
	 * index++; } startIndex += 1000; } while (resultSet != null &&
	 * resultSet.length > 0);
	 */
	//测试挣值图
	/*var columns = [];
	columns[0] = new nlobjSearchColumn('entityid');
	columns[1] = new nlobjSearchColumn('companyname');
	var jobProject = nlapiSearchRecord('job',null,null,columns);
	
	response.write(JSON.stringify(jobProject));
	
	for (var i = 0; i < jobProject.length; i++) {
		response.write(jobProject[i].getValue('entityid'));
	}
	
	response.write('<br>');
	
	var filter = new nlobjSearchFilter('custrecord_project_id', null, 'is',
			1);
	// 倒叙
	var columns1 = new nlobjSearchColumn('custrecord_week_value')
			.setSort(false);
	
	var dataRecord = nlapiSearchRecord('customrecord_project_earned_value',
			null, filter, columns1);
	
	response.write(JSON.stringify(dataRecord));*/
}
