/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       24 Oct 2018     yuming hu
 *
 */

/**
 * @param {String}
 *            type Context Types: scheduled, ondemand, userinterface, aborted,
 *            skipped
 * @returns {Void}
 * @author yuming hu
 * @date 2018-10-24
 * @description 刷新项目进度条 获取项目的开票金额百分比=开票金额/合同总金额
 */

function scheduled(type) {

	try {

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
					amountPercent = (invoiceAmount / salesAmount) * 100;
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
	}
}
