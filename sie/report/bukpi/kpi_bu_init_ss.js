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
	var kpiRecord = nlapiSearchRecord('customrecord_kpi_bu_by_year_temp');
	if (kpiRecord) {
		for (var i = 0; i < kpiRecord.length; i++) {
			nlapiDeleteRecord('customrecord_kpi_bu_by_year_temp', kpiRecord[i]
				.getId());
		}
	}

	// 格式化数据
	var initcolumns = new Array();
	initcolumns[0] = new nlobjSearchColumn('custrecord_types');
	initcolumns[1] = new nlobjSearchColumn('custrecord_type_description1');
	initcolumns[2] = new nlobjSearchColumn('custrecord_department');
	initcolumns[3] = new nlobjSearchColumn('custrecord_year1');
	initcolumns[4] = new nlobjSearchColumn('custrecord_amount1');
	initcolumns[5] = new nlobjSearchColumn('custrecord_class1');
	initcolumns[6] = new nlobjSearchColumn(
		'custrecord_classification_description');
	var initRecord = nlapiSearchRecord('customrecord_bu_initialize', null,
		null, initcolumns);

	for (var i = 0; i < initRecord.length; i++) {
		var kpiType = initRecord[i].getValue('custrecord_types');
		var kpiTypeDescription = initRecord[i]
			.getValue('custrecord_type_description1');
		var buId = initRecord[i].getValue('custrecord_department');
		var buName = initRecord[i].getText('custrecord_department');
		var years = initRecord[i].getValue('custrecord_year1');
		var kpi = initRecord[i].getValue('custrecord_amount1');
		var kpiClass = initRecord[i].getValue('custrecord_class1');
		var kpiClassDescription = initRecord[i]
			.getValue('custrecord_classification_description');

		// 已签约
		var kpiData = nlapiCreateRecord('customrecord_kpi_bu_by_year_temp');
		kpiData.setFieldValue('custrecord_kpi_bu_id', buId);
		kpiData.setFieldValue('custrecord_kpi_bu_name', buName);
		kpiData.setFieldValue('custrecord_class', kpiClass);
		kpiData.setFieldValue('custrecord_class_description',
			kpiClassDescription);
		kpiData.setFieldValue('custrecord_tpye', kpiType);
		kpiData
			.setFieldValue('custrecord_type_description',
				kpiTypeDescription);
		kpiData.setFieldValue('custrecord_kpi_year', years);
		kpiData.setFieldValue('custrecord_kpi_amount', kpi);
		nlapiSubmitRecord(kpiData);
	}

	// 删除kpi表数据
	kpiRecord = nlapiSearchRecord('customrecord_kpi_bu_by_year');
	if (kpiRecord) {
		for (var i = 0; i < kpiRecord.length; i++) {
			nlapiDeleteRecord('customrecord_kpi_bu_by_year', kpiRecord[i]
				.getId());
		}
	}

	//调度
	nlapiScheduleScript('customscript_kpi_bu_01_ss', 'customdeploy_kpi_bu_01_ss');
}