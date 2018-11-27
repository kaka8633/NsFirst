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
	nlapiLogExecution('ERROR', 'start', new Date());
	var status = nlapiScheduleScript('customscript_kpi_bu_init_ss', 'customdeploy_kpi_bu_init_ss');
	nlapiLogExecution('ERROR', 'status01', status);
	status = nlapiScheduleScript('customscript_kpi_bu_01_ss', 'customdeploy_kpi_bu_01_ss');
	nlapiLogExecution('ERROR', 'status02', status);
	status = nlapiScheduleScript('customscript_kpi_bu_02_ss', 'customdeploy_kpi_bu_02_ss');
	nlapiLogExecution('ERROR', 'status03', status);
	nlapiLogExecution('ERROR', 'end', new Date());
}