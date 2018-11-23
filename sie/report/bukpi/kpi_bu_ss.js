/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 Nov 2018     yuming hu
 *
 */

/**
 * @param {String}
 *            type Context Types: scheduled, ondemand, userinterface, aborted,
 *            skipped
 * @returns {Void}
 */
function scheduled(type) {
	work(type);
}

function work(type) {
	// 删除kpi表数据
	var kpiRecord = nlapiSearchRecord('customrecord_kpi_bu_by_year');
	if (kpiRecord) {
		for (var i = 0; i < kpiRecord.length; i++) {
			nlapiDeleteRecord('customrecord_kpi_bu_by_year', kpiRecord[i]
				.getId());
		}
	}

	//格式化数据
	var initcolumns = new Array();
	initcolumns[0] = new nlobjSearchColumn('custrecord_types');
	initcolumns[1] = new nlobjSearchColumn('custrecord_type_description1');
	initcolumns[2] = new nlobjSearchColumn('custrecord_department');
	initcolumns[3] = new nlobjSearchColumn('custrecord_year1');
	initcolumns[4] = new nlobjSearchColumn('custrecord_amount1');
	initcolumns[5] = new nlobjSearchColumn('custrecord_class1');
	initcolumns[6] = new nlobjSearchColumn('custrecord_classification_description');
	var initRecord = nlapiSearchRecord('customrecord_bu_initialize', null, null, initcolumns);

	for (var i = 0; i < initRecord.length; i++) {
		var kpiType = initRecord[i].getValue('custrecord_types');
		var kpiTypeDescription = initRecord[i].getValue('custrecord_type_description1');
		var buId = initRecord[i].getValue('custrecord_department');
		var buName = initRecord[i].getText('custrecord_department');
		var years = initRecord[i].getValue('custrecord_year1');
		var kpi = initRecord[i].getValue('custrecord_amount1');
		var kpiClass = initRecord[i].getValue('custrecord_class1');
		var kpiClassDescription = initRecord[i].getValue('custrecord_classification_description');

		// 已签约
		var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
		kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
		kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
		kpiData.setFieldValue('custrecord_class', kpiClass);
		kpiData.setFieldValue('custrecord_class_description', kpiClassDescription);
		kpiData.setFieldValue('custrecord_tpye', kpiType);
		kpiData.setFieldValue('custrecord_type_description', kpiTypeDescription);
		kpiData.setFieldValue('custrecord_kpi_year', years);
		kpiData.setFieldValue('custrecord_kpi_amount', kpi);
		nlapiSubmitRecord(kpiData);
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
			// 应收账款
			var receivableCount = signedupResult[i].getValue(resultColumns[5]);
			// 非项目工时
			var nonProjectTime = signedupResult[i].getValue(resultColumns[6]);
			// 记录工时
			var keepTaskTime = signedupResult[i].getValue(resultColumns[7]);
			// 项目收费工时
			var ProjectTime = signedupResult[i].getValue(resultColumns[8]);
			// 项目收费工时产值
			var ProjectTimeValue = signedupResult[i].getValue(resultColumns[9]);

			// 已签约
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 1);
			kpiData.setFieldValue('custrecord_class_description', '立项金额');
			kpiData.setFieldValue('custrecord_tpye', 1);
			kpiData.setFieldValue('custrecord_type_description', '已签约');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', signedAmount);
			nlapiSubmitRecord(kpiData);

			// 待签约
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 1);
			kpiData.setFieldValue('custrecord_class_description', '立项金额');
			kpiData.setFieldValue('custrecord_tpye', 2);
			kpiData.setFieldValue('custrecord_type_description', '待签约');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', unSignAmount);
			nlapiSubmitRecord(kpiData);

			// 立项金额
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 1);
			kpiData.setFieldValue('custrecord_class_description', '立项金额');
			kpiData.setFieldValue('custrecord_tpye', 3);
			kpiData.setFieldValue('custrecord_type_description', '立项金额合计');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', signedAmount +
				unSignAmount);
			nlapiSubmitRecord(kpiData);

			// 立项数量
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 1);
			kpiData.setFieldValue('custrecord_class_description', '立项金额');
			kpiData.setFieldValue('custrecord_tpye', 7);
			kpiData.setFieldValue('custrecord_type_description', '立项数量');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', signedCount);
			nlapiSubmitRecord(kpiData);

			// 应收账款
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 5);
			kpiData.setFieldValue('custrecord_class_description', '应收账款');
			kpiData.setFieldValue('custrecord_tpye', 19);
			kpiData.setFieldValue('custrecord_type_description', '应收账款');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', receivableCount);
			nlapiSubmitRecord(kpiData);

			// 记录工时
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 9);
			kpiData.setFieldValue('custrecord_class_description', '工时');
			kpiData.setFieldValue('custrecord_tpye', 28);
			kpiData.setFieldValue('custrecord_type_description', '记录工时');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', keepTaskTime);
			nlapiSubmitRecord(kpiData);

			// 非项目工时
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 9);
			kpiData.setFieldValue('custrecord_class_description', '工时');
			kpiData.setFieldValue('custrecord_tpye', 29);
			kpiData.setFieldValue('custrecord_type_description', '非项目工时');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', nonProjectTime);
			nlapiSubmitRecord(kpiData);

			// 项目收费工时
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 9);
			kpiData.setFieldValue('custrecord_class_description', '工时');
			kpiData.setFieldValue('custrecord_tpye', 30);
			kpiData.setFieldValue('custrecord_type_description', '项目收费工时');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', ProjectTime);
			nlapiSubmitRecord(kpiData);

			// 项目收费工时产值
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 10);
			kpiData.setFieldValue('custrecord_class_description', '产值');
			kpiData.setFieldValue('custrecord_tpye', 32);
			kpiData.setFieldValue('custrecord_type_description', '项目收费工时产值');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', ProjectTimeValue);
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
			// 本年度开票收入目标
			var invoiceAmount = targetResult[i].getValue(targetColumns[3]);
			// 本年度回款收入目标
			var incomeAmount = targetResult[i].getValue(targetColumns[4]);
			// 年度平均人数指标
			var indicatorCount = targetResult[i].getValue(targetColumns[5]);

			// 本年度立项金额目标
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 1);
			kpiData.setFieldValue('custrecord_class_description', '立项金额');
			kpiData.setFieldValue('custrecord_tpye', 4);
			kpiData.setFieldValue('custrecord_type_description', '本年度立项金额目标');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', projectAmount);
			nlapiSubmitRecord(kpiData);

			// 本年度开票收入目标
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 3);
			kpiData.setFieldValue('custrecord_class_description', '开票收入');
			kpiData.setFieldValue('custrecord_tpye', 12);
			kpiData.setFieldValue('custrecord_type_description', '本年度开票收入目标');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', invoiceAmount);
			nlapiSubmitRecord(kpiData);

			// 本年度开票收入目标
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 4);
			kpiData.setFieldValue('custrecord_class_description', '回款收入');
			kpiData.setFieldValue('custrecord_tpye', 16);
			kpiData.setFieldValue('custrecord_type_description', '本年度回款收入目标');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', indicatorCount);
			nlapiSubmitRecord(kpiData);

			// 年度平均人数目标
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 8);
			kpiData.setFieldValue('custrecord_class_description', '人数');
			kpiData.setFieldValue('custrecord_tpye', 26);
			kpiData.setFieldValue('custrecord_type_description', '年度平均人数目标');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', incomeAmount);
			nlapiSubmitRecord(kpiData);
		}
		startIndex += 1000;
	} while (targetResult != null && targetResult.length > 0);

	// *KPI.BU.03.年度确认
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
			// 未开票金额
			var unBillAmount = confirmResult[i].getValue(confirmColumns[6]);

			// 已签约
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 2);
			kpiData.setFieldValue('custrecord_class_description', '已完工金额');
			kpiData.setFieldValue('custrecord_tpye', 9);
			kpiData.setFieldValue('custrecord_type_description', '已完工金额（已签约）');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', signedAmount);
			nlapiSubmitRecord(kpiData);

			// 待签约
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 2);
			kpiData.setFieldValue('custrecord_class_description', '已完工金额');
			kpiData.setFieldValue('custrecord_tpye', 10);
			kpiData.setFieldValue('custrecord_type_description', '已完工金额（待签约）');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', unSignAmount);
			nlapiSubmitRecord(kpiData);

			// 未开票收入（已签约）
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 6);
			kpiData.setFieldValue('custrecord_class_description', '未开票收入');
			kpiData.setFieldValue('custrecord_tpye', 20);
			kpiData.setFieldValue('custrecord_type_description', '未开票收入（已签约）');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', unBillAmount);
			nlapiSubmitRecord(kpiData);

			// 未开票收入（未签约）
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 6);
			kpiData.setFieldValue('custrecord_class_description', '未开票收入');
			kpiData.setFieldValue('custrecord_tpye', 21);
			kpiData.setFieldValue('custrecord_type_description', '未开票收入（未签约）');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', unSignAmount);
			nlapiSubmitRecord(kpiData);
		}
		startIndex += 1000;
	} while (confirmResult != null && confirmResult.length > 0);

	// *KPI.BU.04.年度发票付款
	var invoiceSearch = nlapiLoadSearch(null, 'customsearch_kpi_invoice_info');
	var invoiceRs = invoiceSearch.runSearch();
	// 获取字段
	var invoiceColumns = invoiceRs.getColumns();

	var startIndex = 0;

	do {
		var invoiceResult = confirmRs.getResults(startIndex, startIndex + 1000);
		for (var i = 0; i < confirmResult.length; i++) {

			// 部门Id
			var buId = invoiceResult[i].getValue(invoiceColumns[0]);
			// 部门名称
			var buName = invoiceResult[i].getText(invoiceColumns[0]);
			// 年份
			var years = invoiceResult[i].getValue(invoiceColumns[1]);
			// 开票金额
			var invoiceAmount = invoiceResult[i].getValue(invoiceColumns[2]);
			// 付款金额
			var paymentAmount = invoiceResult[i].getValue(invoiceColumns[3]);

			// 本年度开票收入
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 3);
			kpiData.setFieldValue('custrecord_class_description', '开票收入');
			kpiData.setFieldValue('custrecord_tpye', 11);
			kpiData.setFieldValue('custrecord_type_description', '本年度开票收入');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', invoiceAmount);
			nlapiSubmitRecord(kpiData);

			// 回款收入
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 4);
			kpiData.setFieldValue('custrecord_class_description', '回款收入');
			kpiData.setFieldValue('custrecord_tpye', 15);
			kpiData.setFieldValue('custrecord_type_description', '回款收入');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', paymentAmount);
			nlapiSubmitRecord(kpiData);

			// 现金流入
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 7);
			kpiData.setFieldValue('custrecord_class_description', '现金流入');
			kpiData.setFieldValue('custrecord_tpye', 22);
			kpiData.setFieldValue('custrecord_type_description', '现金流入');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', paymentAmount);
			nlapiSubmitRecord(kpiData);
		}
		startIndex += 1000;
	} while (confirmResult != null && confirmResult.length > 0);

	// *KPI.BU.06.当前在职人数
	var beonJobSearch = nlapiLoadSearch(null, 'customsearch_be_on_job');
	var beonJobRs = beonJobSearch.runSearch();
	// 获取字段
	var beonJobColumns = beonJobRs.getColumns();

	var startIndex = 0;

	do {
		var beonJobResult = confirmRs.getResults(startIndex, startIndex + 1000);
		for (var i = 0; i < confirmResult.length; i++) {

			// 部门Id
			var buId = beonJobResult[i].getValue(beonJobColumns[0]);
			// 部门名称
			var buName = beonJobResult[i].getText(beonJobColumns[0]);
			// 年份
			var years = beonJobResult[i].getValue(beonJobColumns[1]);
			// 开票金额
			var beonJobAmount = beonJobResult[i].getValue(beonJobColumns[2]);

			// 本年度开票收入
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 8);
			kpiData.setFieldValue('custrecord_class_description', '人数');
			kpiData.setFieldValue('custrecord_tpye', 24);
			kpiData.setFieldValue('custrecord_type_description', '当前在职人数');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', beonJobAmount);
			nlapiSubmitRecord(kpiData);

			// 回款收入
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 4);
			kpiData.setFieldValue('custrecord_class_description', '回款收入');
			kpiData.setFieldValue('custrecord_tpye', 15);
			kpiData.setFieldValue('custrecord_type_description', '回款收入');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', paymentAmount);
			nlapiSubmitRecord(kpiData);

			// 现金流入
			kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 7);
			kpiData.setFieldValue('custrecord_class_description', '现金流入');
			kpiData.setFieldValue('custrecord_tpye', 22);
			kpiData.setFieldValue('custrecord_type_description', '现金流入');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', paymentAmount);
			nlapiSubmitRecord(kpiData);
		}
		startIndex += 1000;
	} while (confirmResult != null && confirmResult.length > 0);

	// kpi 比率
	var rateSearch = nlapiLoadSearch(null, 'customsearch_kpi_bu_rate');
	var rateRs = rateSearch.runSearch();
	// 获取字段
	var rateColumns = rateRs.getColumns();

	var startIndex = 0;

	do {
		var rateResult = rateRs.getResults(startIndex, startIndex + 1000);
		for (var i = 0; i < rateResult.length; i++) {

			// 部门Id
			var buId = rateResult[i].getValue(rateColumns[0]);
			// 部门名称
			var buName = rateResult[i].getValue(rateColumns[1]);
			// 年份
			var years = rateResult[i].getValue(rateColumns[2]);
			// 年度立项指标
			var projectAmount = rateResult[i].getValue(rateColumns[3]);
			// 本年度立项金额目标
			var targetAmount = rateResult[i].getValue(rateColumns[4]);
			// 立项数量
			var projectCount = rateResult[i].getValue(rateColumns[5]);
			// 本年度开票收入
			var invoiceAmount = rateResult[i].getValue(rateColumns[6]);
			// 本年度开票收入目标
			var invoiceTargetAmount = rateResult[i].getValue(rateColumns[7]);
			// 回款收入
			var paymentAmount = rateResult[i].getValue(rateColumns[8]);
			// 本年度回款收入目标
			var paymentTargetAmount = rateResult[i].getValue(rateColumns[9]);
			// 项目收费工时
			var ProjectTime = rateResult[i].getValue(rateColumns[12]);

			var projectAmountRate = targetAmount == 0 ? 0 : projectAmount /
				targetAmount;

			var projectCountRate = projectCount == 0 ? 0 : projectAmount /
				projectCount;

			var invoiceRate = invoiceTargetAmount == 0 ? 0 : invoiceAmount /
				invoiceTargetAmount;

			var paymentRate = paymentTargetAmount == 0 ? 0 : paymentAmount /
				paymentTargetAmount;

			var ivoiceProjectTimeRate = ProjectTime == 0 ? 0 : invoiceAmount /
				ProjectTime;

			// 年度目标完成率
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 1);
			kpiData.setFieldValue('custrecord_class_description', '立项金额');
			kpiData.setFieldValue('custrecord_tpye', 5);
			kpiData.setFieldValue('custrecord_type_description', '年度目标完成率');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', projectAmountRate);
			nlapiSubmitRecord(kpiData);

			// 平均立项金额
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 1);
			kpiData.setFieldValue('custrecord_class_description', '立项金额');
			kpiData.setFieldValue('custrecord_tpye', 8);
			kpiData.setFieldValue('custrecord_type_description', '平均立项金额');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', invoiceRate);
			nlapiSubmitRecord(kpiData);

			// 年度目标完成率(开票)
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 3);
			kpiData.setFieldValue('custrecord_class_description', '开票收入');
			kpiData.setFieldValue('custrecord_tpye', 13);
			kpiData.setFieldValue('custrecord_type_description', '年度目标完成率');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', projectCountRate);
			nlapiSubmitRecord(kpiData);

			// 年度目标完成率(回款)
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 4);
			kpiData.setFieldValue('custrecord_class_description', '回款收入');
			kpiData.setFieldValue('custrecord_tpye', 17);
			kpiData.setFieldValue('custrecord_type_description', '年度目标完成率');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount', paymentRate);
			nlapiSubmitRecord(kpiData);

			// 开票收入/项目收费工时
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 11);
			kpiData.setFieldValue('custrecord_class_description', '人均小时价值');
			kpiData.setFieldValue('custrecord_tpye', 34);
			kpiData.setFieldValue('custrecord_type_description', '开票收入/项目收费工时');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount',
				ivoiceProjectTimeRate);
			nlapiSubmitRecord(kpiData);
		}
		startIndex += 1000;
	} while (rateResult != null && rateResult.length > 0);
}