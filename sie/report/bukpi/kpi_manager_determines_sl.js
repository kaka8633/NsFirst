/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Nov 2018     Administrator
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
	test02(request, response);
}

function test01(request, response) {
	var origSearch = nlapiLoadSearch(null,
			'customsearch_manager_determines_percent');
	var origRs = origSearch.runSearch();

	// 获取字段
	var resultColumns = origRs.getColumns();

	var startIndex = 0;

	do {
		var origResult = origRs.getResults(startIndex, startIndex + 1000);
		for (var i = 0; i < origResult.length; i++) {
			response.write(origResult[i].getValue(resultColumns[0]) + '</br>');
		}
		startIndex += 1000;
	} while (origResult != null && origResult.length > 0);
}

function test02(request, response) {
	// 获取项目经理确认百分比
	var origSearch = nlapiLoadSearch(null,
			'customsearch_manager_determines_percent');
	var origRs = origSearch.runSearch();

	// 获取字段
	var resultColumns = origRs.getColumns();

	var startIndex = 0;

	// 遍历项目经理确认百分比
	do {
		var origResult = origRs.getResults(startIndex, startIndex + 1000);
		for (var i = 0; i < origResult.length; i++) {

			var actionType = 'CREATION';
			// 获取项目ID
			projectId = origResult[i].getValue(resultColumns[0]);
			projectNumber = origResult[i].getValue(resultColumns[1]);
			projectName = origResult[i].getValue(resultColumns[2]);
			projectYears = origResult[i].getValue(resultColumns[3]);
			projectBuID = origResult[i].getValue(resultColumns[4]);
			projectBuName = origResult[i].getText(resultColumns[4]);
			projectPercent = origResult[i].getValue(resultColumns[5]);
			projectSigned = origResult[i].getValue(resultColumns[6]);
			projectBesigned = origResult[i].getValue(resultColumns[7]);
			projectBill = origResult[i].getValue(resultColumns[8]);
			projectUnbill = origResult[i].getValue(resultColumns[9]);

			// 查询*KPI.项目经理确认年度百分比
			var filters = [];
			filters[0] = new nlobjSearchFilter(
					'custrecord_kpi_year_project_id', null, 'equalto',
					projectId);
			filters[1] = new nlobjSearchFilter('custrecord_kpi_year_y', null,
					'is', projectYears);

			var currentRecord = nlapiSearchRecord(
					'customrecord_manager_determines_percent', null, filters);

			// 当前kpi记录的ID
			var kpiPercentId = -1;
			var currentPercent = 0;

			if (currentRecord) {
				actionType = 'UPDATE';
				kpiPercentId = currentRecord[0].getId();
			}

			// 获取项目百分比
			filters = [];
			filters[0] = new nlobjSearchFilter(
					'custrecord_kpi_year_project_id', null, 'equalto',
					projectId);
			filters[1] = new nlobjSearchFilter('custrecord_kpi_year_y', null,
					'isnot', projectYears);

			var columns = [];
			columns[0] = new nlobjSearchColumn('custrecord_percent', null,
					'SUM');

			currentRecord = nlapiSearchRecord(
					'customrecord_manager_determines_percent', null, filters,
					columns);

			if (currentRecord) {
				currentPercent = currentRecord[0].getValue(
						'custrecord_percent', null, 'SUM');
			}

			if (actionType == 'UPDATE') {
				nlapiSubmitField('customrecord_manager_determines_percent',
						kpiPercentId, 'custrecord_percent', projectPercent
								- currentPercent, true);
				nlapiSubmitField('customrecord_manager_determines_percent',
						kpiPercentId, 'custrecord_kpi_year_buid', projectBuID,
						true);
				nlapiSubmitField('customrecord_manager_determines_percent',
						kpiPercentId, 'custrecord_kpi_year_bu_name',
						projectBuName, true);
				nlapiSubmitField('customrecord_manager_determines_percent',
						kpiPercentId, 'custrecord_kpi_year_signedup',
						projectSigned, true);
				nlapiSubmitField('customrecord_manager_determines_percent',
						kpiPercentId, 'custrecord_kpi_year_be_signed',
						projectBesigned, true);
				nlapiSubmitField('customrecord_manager_determines_percent',
						kpiPercentId, 'custrecord_kpi_bill_amount',
						projectBill, true);
				nlapiSubmitField('customrecord_manager_determines_percent',
						kpiPercentId, 'custrecord_kpi_unbill_amount',
						projectUnbill, true);
			} else {
				var newData = nlapiCreateRecord('customrecord_manager_determines_percent');
				newData.setFieldValue('custrecord_kpi_year_project_id',
						projectId);
				newData.setFieldValue('	custrecord_kpi_year_project_number',
						projectNumber);
				newData.setFieldValue('custrecord__kpi_year_project_name',
						projectName);
				newData.setFieldValue('custrecord_kpi_year_y', projectYears);
				newData.setFieldValue('custrecord_kpi_year_buid', projectBuID);
				newData.setFieldValue('custrecord_kpi_year_bu_name',
						projectBuName);
				newData.setFieldValue('custrecord_percent', projectPercent);
				newData.setFieldValue('custrecord_kpi_year_signedup',
						projectSigned);
				newData.setFieldValue('custrecord_kpi_year_be_signed',
						projectBesigned);
				newData
						.setFieldValue('custrecord_kpi_bill_amount',
								projectBill);
				newData.setFieldValue('custrecord_kpi_unbill_amount',
						projectUnbill);

				nlapiSubmitRecord(newData);
			}
		}
		startIndex += 1000;
	} while (origResult != null && origResult.length > 0);
}
