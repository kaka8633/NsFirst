/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       16 Oct 2018     Administrator
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */
function scheduled(type) {
	
	var newRecord = nlapiCreateRecord('customrecord_project_earned_value');
	newRecord.setFieldValue('custrecord_week_value', 'a');
	nlapiSubmitRecord(newRecord);

}
