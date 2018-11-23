/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       19 Nov 2018     huyuming
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
	test3(request, response);
}

function test1(request, response) {
	// var search = nlapiLoadSearch(null, 'customsearch_signed_up');
	// var resultSet = search.runSearch();
	// var result = resultSet.getResults(0, 100);
	// response.write(JSON.stringify(result));

	// var resultC = resultSet.getColumns();
	// response.write(result[0].getText(resultC[0]));

	var yearTargetSearch = nlapiLoadSearch(null, 'customsearch_year_target');

	var yearTargetFilters = [];
	yearTargetFilters[0] = new nlobjSearchFilter('custrecord_department_name',
			'custrecord_depart_quote', 'is', 211);
	yearTargetFilters[1] = new nlobjSearchFilter('formulatext', null, 'is',
			'2018').setFormula('to_char({custrecord_year_2})');

	/*
	 * yearTargetSearch.addFilter(new nlobjSearchFilter(
	 * 'custrecord_department_name', 'custrecord_depart_quote', 'is', 211));
	 */

	yearTargetSearch.addFilters(yearTargetFilters);

	var yearTargetRs = yearTargetSearch.runSearch();
	var yearTargetResult = yearTargetRs.getResults(0, 100);
	response.write(JSON.stringify(yearTargetResult));
}

function test2(request, response) {
	// 查询并保存立项金额视图
	var signedupSearch = nlapiLoadSearch(null, 'customsearch_signed_up');
	var signedupRs = signedupSearch.runSearch();
	// 获取字段
	var resultColumns = signedupRs.getColumns();

	var startIndex = 0;

	do {
		var signedupResult = signedupRs.getResults(startIndex,
				startIndex + 1000);
		for (var i = 0; i < signedupResult.length; i++) {
			response.write(signedupResult[i].getValue(resultColumns[2])
					+ '</br>');
		}
		startIndex += 1000;
	} while (signedupResult != null && signedupResult.length > 0);
}

function test3(request, response) {
	// 删除kpi表数据
	var kpiRecord = nlapiSearchRecord('customrecord_kpi_bu_by_year');
	if (kpiRecord) {
		for (var i = 0; i < kpiRecord.length; i++) {
			nlapiDeleteRecord('customrecord_kpi_bu_by_year', kpiRecord[i]
					.getId());
		}
	}

	// 查询并保存立项金额视图
	var signedupSearch = nlapiLoadSearch(null, 'customsearch_signed_up');
	var signedupRs = signedupSearch.runSearch();
	// 获取字段
	var resultColumns = signedupRs.getColumns();

	var startIndex = 0;

	do {
		var signedupResult = signedupRs.getResults(startIndex,
				startIndex + 1000);
		for (var i = 0; i < signedupResult.length; i++) {

			// 部门Id
			var buId = signedupResult[i].getValue(resultColumns[0]);
			// 部门名称
			var buName = signedupResult[i].getText(resultColumns[0]);
			// 年份
			var years = signedupResult[i].getValue(resultColumns[1]);
			// 已签金额
			var signedAmount = signedupResult[i].getValue(resultColumns[2]);
			// 未签金额
			var unSignAmount = signedupResult[i].getValue(resultColumns[3]);
			// 立项数量
			var signedCount = signedupResult[i].getValue(resultColumns[4]);

			// 已签约
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_tpye', '01');
			kpiData.setFieldValue('custrecord_type_description', '已签约');
			kpiData.setFieldValue('	custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', signedAmount);

			nlapiSubmitRecord(kpiData);

			// 待签约
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');

			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_tpye', '02');
			kpiData.setFieldValue('custrecord_type_description', '待签约');
			kpiData.setFieldValue('	custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', unSignAmount);

			nlapiSubmitRecord(kpiData);

			// 立项金额
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');

			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_tpye', '03');
			kpiData.setFieldValue('custrecord_type_description', '立项金额合计');
			kpiData.setFieldValue('	custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', signedAmount
					+ unSignAmount);

			nlapiSubmitRecord(kpiData);

			// 立项数量
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');

			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_tpye', '07');
			kpiData.setFieldValue('custrecord_type_description', '立项数量');
			kpiData.setFieldValue('	custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', signedCount);

			nlapiSubmitRecord(kpiData);
		}
		startIndex += 1000;
	} while (signedupResult != null && signedupResult.length > 0);

	// 年度指标
	var targetSearch = nlapiLoadSearch(null, 'customsearch_year_target');
	var targetRs = targetSearch.runSearch();
	// 获取字段
	var targetColumns = targetRs.getColumns();

	var startIndex = 0;

	do {
		var targetResult = targetRs.getResults(startIndex, startIndex + 1000);
		for (var i = 0; i < targetResult.length; i++) {

			// 部门Id
			var buId = targetResult[i].getValue(targetColumns[0]);
			// 部门名称
			var buName = targetResult[i].getText(targetColumns[0]);
			// 年份
			var years = targetResult[i].getValue(targetColumns[1]);
			// 年度立项指标
			var projectAmount = targetResult[i].getValue(targetColumns[2]);

			// 已签约
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_tpye', '04');
			kpiData.setFieldValue('custrecord_type_description', '本年度立项金额目标');
			kpiData.setFieldValue('	custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', projectAmount);

			nlapiSubmitRecord(kpiData);
		}
		startIndex += 1000;
	} while (targetResult != null && targetResult.length > 0);

	// 已完工金额
	var confirmSearch = nlapiLoadSearch(null, 'customsearch_kpi_year_confirm');
	var confirmRs = confirmSearch.runSearch();
	// 获取字段
	var confirmColumns = confirmRs.getColumns();

	var startIndex = 0;

	do {
		var confirmResult = confirmRs.getResults(startIndex, startIndex + 1000);
		for (var i = 0; i < confirmResult.length; i++) {

			// 部门Id
			var buId = confirmResult[i].getValue(confirmColumns[0]);
			// 部门名称
			var buName = confirmResult[i].getValue(confirmColumns[1]);
			// 年份
			var years = confirmResult[i].getValue(confirmColumns[2]);
			// 已签金额
			var signedAmount = confirmResult[i].getValue(confirmColumns[3]);
			// 未签金额
			var unSignAmount = confirmResult[i].getValue(confirmColumns[4]);

			// 已签约
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_tpye', '09');
			kpiData.setFieldValue('custrecord_type_description', '已完工金额（已签约）');
			kpiData.setFieldValue('	custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', signedAmount);

			nlapiSubmitRecord(kpiData);

			// 待签约
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');

			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_tpye', '10');
			kpiData.setFieldValue('custrecord_type_description', '已完工金额（待签约）');
			kpiData.setFieldValue('	custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', unSignAmount);

			nlapiSubmitRecord(kpiData);
		}
		startIndex += 1000;
	} while (confirmResult != null && confirmResult.length > 0);
}
