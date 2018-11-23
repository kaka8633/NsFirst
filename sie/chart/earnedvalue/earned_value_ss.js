/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       16 Oct 2018     Administrator
 *
 */

/**
 * 新建所有已存在项目的对应《客制化项目挣值图数据统计表》，创建时判断是否已有针对同一项目的同类型记录，如果有则周数+1新建下一周
 * 通过定时循环抓取已保存记录的信息，将可以抓取到的项目统计信息覆盖入已有的最新同项目数据统计记录 已保存记录来源：客制化作业时间跟踪视图（by：胡育铭）
 * 
 * @param {String}
 *            type Context Types: scheduled, ondemand, userinterface, aborted,
 *            skipped
 * @returns {Void}
 * @author YHR
 */
function scheduled(type) {

	// 第一部分，对所有已存在的项目数据采集建立初版，所有值为0
	var column = new nlobjSearchColumn('companyname');
	var jobProject = nlapiSearchRecord('job', null, null, column);

	// 通过循环跑出并建立所有已存在项目的数据统计记录

	for (var v = 0; v < jobProject.length; v++) {

		var projectId = jobProject[v].getId();

		// 使用项目ID，对已建立的<挣值图数据统计表>进行搜索
		var filter = new nlobjSearchFilter('custrecord_project_id', null, 'is',
				projectId);
		var columns = new nlobjSearchColumn('custrecord_week_value')
				.setSort(true);// 按周数排序
		var dataRecord = nlapiSearchRecord('customrecord_project_earned_value',
				null, filter, columns);

		// 判断在<挣值图数据统计>记录中是否有此项目的记录存在
		// 如果存在
		var newWeek = 1;
		if (dataRecord) {
			newWeek = parseInt(dataRecord[0].getValue('custrecord_week_value')) + 1;
		}

		var newChartData = nlapiCreateRecord('customrecord_project_earned_value');
		// 在新纪录中全部放入数值0
		newChartData.setFieldValue('custrecord_project_name', jobProject[v]
				.getValue('companyname'));// 放入项目名称
		newChartData.setFieldValue('custrecord_project_id', projectId);// 放入项目ID
		newChartData.setFieldValue('custrecord_ac_value', '0');// 放入AC值
		newChartData.setFieldValue('custrecord_pv_value', '0');// 放入PV值
		newChartData.setFieldValue('custrecord_ev_value', '0');// 放入EV值
		newChartData.setFieldValue('custrecord_sv_value', '0');// 放入SV值
		newChartData.setFieldValue('custrecord_sv_value', '0');// 放入SV值
		newChartData.setFieldValue('custrecord_cv_value', '0');// 放入CV值
		newChartData.setFieldValue('custrecord_spi_value', '0');// 放入SPI值
		newChartData.setFieldValue('custrecord_cpi_value', '0');// 放入CPI值
		newChartData.setFieldValue('custrecord_cr_value', '0');// 放入CR值
		newChartData.setFieldValue('custrecord_week_value', newWeek);// 放入周数

		nlapiSubmitRecord(newChartData);

	}

	// 第二部分，通过已保存搜索整理已有的项目数据，并覆盖
	var loadSearch = nlapiLoadSearch(null,
			'customsearch_pojects_time_tracking_view');// 填入已保存搜索的id
	var searchResults = loadSearch.runSearch();
	var columnsold = searchResults.getColumns();
	var columns = new Object();
	if (columnsold) {
		for (var c = 0; c < columnsold.length; c++) {
			var co = columnsold[c];
			if (co.getName() == 'formulanumeric') {
				columns[co.getName() + '' + c] = co;
			} else {
				columns[co.getName()] = co;
			}
		}
	}
	var startIndex = 0;
	var list;
	// 一次最多还能取1000条，如果大于1000条数据，则拆开
	list = searchResults.getResults(startIndex, startIndex + 1000);
	if (list != null) {
		for (var i = 0; i < list.length; i++) {
			var formulanumeric0 = list[i].getValue(columns['altname']);// 获取项目名称
			var formulanumeric1 = list[i].getValue(columns['entityid']);// 获取项目编号
			var formulanumeric2 = list[i].getValue(columns['entitynumber']);
			var formulanumeric3 = list[i].getValue(columns['formulanumeric3']);// 获取AC值
			var formulanumeric4 = list[i].getValue(columns['formulanumeric4']);// 获取PV值
			var formulanumeric5 = list[i].getValue(columns['internalid']);// 获取internal

			if (formulanumeric5 != '' && formulanumeric5 != null) {

				// 根据项目ID获取项目记录
				var jobRecord = nlapiLoadRecord('job', formulanumeric5);
				var percentage = jobRecord
						.getFieldValue('custentity_pm_percentage');

				if (percentage == '' || percentage == null) {
					percentage = '0';
				}

				var PV = parseInt(formulanumeric4);
				var AC = parseInt(formulanumeric3);
				var EV = parseInt(percentage) / 100 * PV;// 获取EV值
				var SV = EV - PV;// 获取SV值
				var CV = EV - AC;// 获取CV值
				var SPI = EV / PV;// 获取SPI值
				var CPI = EV / AC;// 获取CPI值
				var CR = SPI * CPI;// 获取CR值

				// 使用项目ID，对已建立的<挣值图数据统计表>进行搜索
				var filter = new nlobjSearchFilter('custrecord_project_id',
						null, 'is', formulanumeric5);
				var columns = new nlobjSearchColumn('custrecord_week_value')
						.setSort(true);// 按周数排序
				var dataRecord = nlapiSearchRecord(
						'customrecord_project_earned_value', null, filter,
						columns);

				// 选取其中最新的一组记录，并将统计数据覆盖
				dataRecord[0].setFieldValue('custrecord_project_name',
						formulanumeric0);// 放入项目名称
				dataRecord[0].setFieldValue('custrecord_project_number',
						formulanumeric1);// 放入项目编号
				dataRecord[0].setFieldValue('custrecord_project_id',
						formulanumeric5);// 放入项目ID
				dataRecord[0].setFieldValue('custrecord_ac_value',
						formulanumeric3);// 放入AC值
				dataRecord[0].setFieldValue('custrecord_pv_value',
						formulanumeric4);// 放入PV值
				dataRecord[0].setFieldValue('custrecord_ev_value', EV);// 放入EV值
				dataRecord[0].setFieldValue('custrecord_sv_value', SV);// 放入SV值
				dataRecord[0].setFieldValue('custrecord_cv_value', CV);// 放入CV值
				dataRecord[0].setFieldValue('custrecord_spi_value', SPI);// 放入SPI值
				dataRecord[0].setFieldValue('custrecord_cpi_value', CPI);// 放入CPI值
				dataRecord[0].setFieldValue('custrecord_cr_value', CR);// 放入CR值

				nlapiSubmitRecord(dataRecord[0]);
			}
		}
	}
}