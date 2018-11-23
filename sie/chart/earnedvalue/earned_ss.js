/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       16 Oct 2018     yuming hu
 *
 */

/**
 * 
 * @param {String}
 *            type Context Types: scheduled, ondemand, userinterface, aborted,
 *            skipped
 * @returns {Void}
 * @author yuming
 * @description 刷新挣值图数据
 * @version 1.0
 */
function scheduled(type) {
	work(type);
}

/**
 * @author yuming hu
 * @description 年度指标相关信息
 * @version 1.0
 * @param type
 */

function work(type) {
	// 获取项目经理确认百分比
	var origSearch = nlapiLoadSearch(null, 'customsearch_earned_project_list');
	var origRs = origSearch.runSearch();

	// 获取字段
	var origColumns = origRs.getColumns();

	var startIndex = 0;

	// 遍历项目经理确认百分比
	do {
		var origResult = origRs.getResults(startIndex, startIndex + 1000);
		for (var i = 0; i < origResult.length; i++) {

			// 获取项目ID
			var projectId = parseInt(origResult[i].getValue(origColumns[0]));
			var projectNumber = origResult[i].getValue(origColumns[1]);
			var projectName = origResult[i].getValue(origColumns[2]);
			var managerPercent = parseFloat(origResult[i]
					.getValue(origColumns[3]));
			var week = 1;
			var pv = 0;
			var ac = 0;
			var ev = 0;
			var sv = 0;
			var cv = 0;
			var spi = 0;
			var cpi = 0;
			var cr = 0;

			// 查询客制化作业时间跟踪视图
			var currentFilters = [];
			currentFilters[0] = new nlobjSearchFilter('internalidnumber',
					'job', 'equalto', projectId);

			var currentSearch = nlapiLoadSearch(null,
					'customsearch_pojects_time_tracking_view');
			currentSearch.addFilters(currentFilters);
			var currentRs = currentSearch.runSearch();
			var currentResult = currentRs.getResults(0, 1);

			var currentColumns = currentRs.getColumns();

			if (currentResult.length > 0) {

				// nlapiLogExecution('DEBUG', 'TEST', projectId);
				ac = parseFloat(currentResult[0].getValue(currentColumns[3]));
				pv = parseFloat(currentResult[0].getValue(currentColumns[4]));
				ev = managerPercent * pv;
				sv = ev - pv;
				cv = ev - ac;
				spi = pv == 0 ? 0 : ev / pv;
				cpi = ac == 0 ? 0 : ev / ac;
				cr = spi * cpi;

				// 红绿灯
				var crFlag = 0;
				var cpiFlag = 0;
				var spiFlag = 0;

				if (cr > 1.3 || cr < 0.8) {
					crFlag = 1;
				} else if ((cr >= 0.8 && cr < 0.9) || (cr > 1.2 && cr <= 1.3)) {
					crFlag = -1;
				}

				if (cpi > 1.3 || cpi < 0.8) {
					cpiFlag = 1;
				} else if ((cpi >= 0.8 && cpi < 0.9)
						|| (cpi > 1.2 && cpi <= 1.3)) {
					cpiFlag = -1;
				}

				if (spi > 1.3 || spi < 0.8) {
					spiFlag = 1;
				} else if ((spi >= 0.8 && spi < 0.9)
						|| (spi > 1.2 && spi <= 1.3)) {
					spiFlag = -1;
				}

				nlapiSubmitField('job', projectId, 'custentity_cr_value',
						crFlag, true);
				nlapiSubmitField('job', projectId, 'custentity_cpi_value',
						cpiFlag, true);
				nlapiSubmitField('job', projectId, 'custentity_spi_value',
						spiFlag, true);
			}

			// 查询该项目是否已经存在挣值数据
			var earnedFilters = [];
			earnedFilters[0] = new nlobjSearchFilter('custrecord_project_id',
					null, 'equalto', projectId);
			var earnedColumns = [];
			earnedColumns[0] = new nlobjSearchColumn('custrecord_week_value',
					null, 'MAX');

			var earnedRecord = nlapiSearchRecord(
					'customrecord_project_earned_value', null, earnedFilters,
					earnedColumns);

			if (earnedRecord) {
				week = parseInt((earnedRecord[0].getValue(
						'custrecord_week_value', null, 'MAX') == '' ? 0
						: earnedRecord[0].getValue('custrecord_week_value',
								null, 'MAX'))) + 1;
			}

			// 周描述
			var weekDescription = '第' + week + '周';

			// 保存挣值图数据
			var newData = nlapiCreateRecord('customrecord_project_earned_value');
			newData.setFieldValue('custrecord_project_name', projectName);
			newData.setFieldValue('custrecord_project_number', projectNumber);
			newData.setFieldValue('custrecord_project_id', projectId);
			newData.setFieldValue('custrecord_ac_value', ac);
			newData.setFieldValue('custrecord_pv_value', pv);
			newData.setFieldValue('custrecord_ev_value', ev);
			newData.setFieldValue('custrecord_sv_value', sv);
			newData.setFieldValue('custrecord_cv_value', cv);
			newData.setFieldValue('custrecord_spi_value', spi);
			newData.setFieldValue('custrecord_cpi_value', cpi);
			newData.setFieldValue('custrecord_cr_value', cr);
			newData.setFieldValue('custrecord_week_value', week);
			newData.setFieldValue('custrecord_week_description',
					weekDescription);
			nlapiSubmitRecord(newData);
		}
		startIndex += 1000;
	} while (origResult != null && origResult.length > 0);
}