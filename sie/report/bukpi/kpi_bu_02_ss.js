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
			// 当前平均人数
			var perCapita = rateResult[i].getValue(rateColumns[13]);
			// 理论工时
			var planWorkHours = rateResult[i].getValue(rateColumns[14]);

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

			var projectCapita = perCapita == 0 ? 0 : projectAmount /
				perCapita;

			var invoiceCapita = perCapita == 0 ? 0 : invoiceAmount /
				perCapita;

			var paymentCapita = perCapita == 0 ? 0 : paymentAmount /
				perCapita;

			var planWorkHoursPer = planWorkHours == 0 ? 0 : invoiceAmount /
				planWorkHours;

			planWorkHoursPer = planWorkHoursPer == NaN ? 0 : planWorkHoursPer;


			// 年度目标完成率
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year_temp');
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
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year_temp');
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
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year_temp');
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
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year_temp');
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
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year_temp');
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

			// 人均立项金额
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year_temp');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 1);
			kpiData.setFieldValue('custrecord_class_description', '立项金额');
			kpiData.setFieldValue('custrecord_tpye', 6);
			kpiData.setFieldValue('custrecord_type_description', '人均立项金额');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount',
				projectCapita);
			nlapiSubmitRecord(kpiData);

			// 人均开票收入
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year_temp');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 3);
			kpiData.setFieldValue('custrecord_class_description', '开票收入');
			kpiData.setFieldValue('custrecord_tpye', 14);
			kpiData.setFieldValue('custrecord_type_description', '人均开票收入');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount',
				invoiceCapita);
			nlapiSubmitRecord(kpiData);

			// 人均回款收入
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year_temp');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 4);
			kpiData.setFieldValue('custrecord_class_description', '回款收入');
			kpiData.setFieldValue('custrecord_tpye', 18);
			kpiData.setFieldValue('custrecord_type_description', '人均回款收入');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount',
				paymentCapita);
			nlapiSubmitRecord(kpiData);

			// 开票收入/理论工时
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year_temp');
			kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
			kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
			kpiData.setFieldValue('custrecord_class', 11);
			kpiData.setFieldValue('custrecord_class_description', '人均小时价值');
			kpiData.setFieldValue('custrecord_tpye', 33);
			kpiData.setFieldValue('custrecord_type_description', '开票收入/理论工时');
			kpiData.setFieldValue('custrecord_kpi_year', years);
			kpiData.setFieldValue('custrecord_kpi_amount',
				planWorkHoursPer);
			nlapiSubmitRecord(kpiData);
		}
		startIndex += 1000;
	} while (rateResult != null && rateResult.length > 0);

	// 从临时表到正式表
	var tempSearch = nlapiLoadSearch(null, 'customsearch_kpi_bu_temp');
	var tempRs = tempSearch.runSearch();
	// 获取字段
	var tempColumns = tempRs.getColumns();

	var startIndex = 0;

	do {
		var tempResult = tempRs.getResults(startIndex, startIndex + 1000);
		for (var i = 0; i < tempResult.length; i++) {

			// 部门Id
			var kpiYears = tempResult[i].getValue(tempColumns[0]);
			var kpiClass = tempResult[i].getValue(tempColumns[1]);
			var kpiClassDescription = tempResult[i].getValue(tempColumns[2]);
			var kpiType = tempResult[i].getValue(tempColumns[3]);
			var kpiTypeDescription = tempResult[i].getValue(tempColumns[4]);
			var kpiB01 = tempResult[i].getValue(tempColumns[5]);
			var kpiB02 = tempResult[i].getValue(tempColumns[6]);
			var kpiB03 = tempResult[i].getValue(tempColumns[7]);
			var kpiB04 = tempResult[i].getValue(tempColumns[8]);
			var kpiB05 = tempResult[i].getValue(tempColumns[9]);
			var kpiB06 = tempResult[i].getValue(tempColumns[10]);
			var kpiC01 = tempResult[i].getValue(tempColumns[11]);
			var kpiC02 = tempResult[i].getValue(tempColumns[12]);
			var kpiD01 = tempResult[i].getValue(tempColumns[13]);
			var kpiE01 = tempResult[i].getValue(tempColumns[14]);
			var kpiF01 = tempResult[i].getValue(tempColumns[15]);
			var kpiTotal = kpiB01 + kpiB02 + kpiB03 + kpiB04 + kpiB05 + kpiB06 + kpiC01 + kpiC02 + kpiD01 + kpiE01 + kpiF01;

			// 年度目标完成率
			var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year');
			kpiData.setFieldValue('custrecord_kpi_year_f', kpiYears);
			kpiData.setFieldValue('custrecord_tpye_f', kpiType);
			kpiData.setFieldValue('custrecord_type_description_f', kpiTypeDescription);
			kpiData.setFieldValue('custrecord_class_f', kpiClass);
			kpiData.setFieldValue('custrecord_class_description_f', kpiClassDescription);
			kpiData.setFieldValue('custrecord_b01', kpiB01);
			kpiData.setFieldValue('custrecord_b02', kpiB02);
			kpiData.setFieldValue('custrecord_b03', kpiB03);
			kpiData.setFieldValue('custrecord_b04', kpiB04);
			kpiData.setFieldValue('custrecord_b05', kpiB05);
			kpiData.setFieldValue('custrecord_b06', kpiB06);
			kpiData.setFieldValue('custrecord_c01', kpiC01);
			kpiData.setFieldValue('custrecord_c02', kpiC02);
			kpiData.setFieldValue('custrecord_e01', kpiE01);
			kpiData.setFieldValue('custrecord_f01', kpiF01);
			kpiData.setFieldValue('custrecord_kpi_total', kpiTotal);

			nlapiSubmitRecord(kpiData);
		}
		startIndex += 1000;
	} while (tempResult != null && tempResult.length > 0);
}