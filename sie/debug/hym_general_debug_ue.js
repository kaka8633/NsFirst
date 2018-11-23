/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       29 Sep 2018     Administrator
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm}
 *            form Current form
 * @param {nlobjRequest}
 *            request Request object
 * @returns {Void}
 */
function userEventBeforeLoad(type, form, request) {
	nlapiLogExecution("DEBUG", "1.0 userEventBeforeLoad", type);

	// 隐藏客制化机会状态字段和客制化状态改变日期字段
	nlapiSetFieldDisplay('custbody_status_change_date', false);
	nlapiSetFieldDisplay('custbody_opportunity_status', false);
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Operation types: create, edit, delete, xedit approve, reject,
 *            cancel (SO, ER, Time Bill, PO & RMA only) pack, ship (IF)
 *            markcomplete (Call, Task) reassign (Case) editforecast (Opp,
 *            Estimate)
 * @returns {Void}
 */
function userEventBeforeSubmit(type) {
	nlapiLogExecution("DEBUG", "2.0 userEventBeforeSubmit", type);
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Operation types: create, edit, delete, xedit, approve,
 *            cancel, reject (SO, ER, Time Bill, PO & RMA only) pack, ship (IF
 *            only) dropship, specialorder, orderitems (PO only) paybills
 *            (vendor payments)
 * @returns {Void}
 */
function userEventAfterSubmit(type) {
	nlapiLogExecution("DEBUG", "3.0 userEventAfterSubmit", type);

	var flag = false;

	if (type == 'create') {
		flag = true;
	}

	var currentStatus = nlapiGetFieldValue('entitystatus');
	// 获取客制化
	var oldStatus = nlapiGetFieldValue('custbody_opportunity_status');

	/*
	 * var filter = new nlobjSearchFilter('internalid', null, 'is',
	 * parseInt(nlapiGetRecordId()));
	 * 
	 * var results = nlapiSearchRecord("opportunity",null, filter);
	 */

	// var oldStatus = null;
	// if(results.length > 0){
	// oldStatus = results[0].getValue("custbody_opportunity_status");
	// }
	if (type == 'edit'
			&& (currentStatus != oldStatus || oldStatus == null || oldStatus == '')) {

		flag = true;

	}

	if (flag) {
		// nlapiLogExecution("DEBUG", "test", oldStatus);
		// nlapiLogExecution("DEBUG", "test",
		// nlapiGetFieldValue('entitystatus'));
		nlapiLogExecution("DEBUG", "test", '1234 year');

		// nlapiLogExecution("DEBUG", "test", nlapiGetRecordId());
		nlapiSubmitField('opportunity', parseInt(nlapiGetRecordId()),
				'custbody_opportunity_status', currentStatus, true);
		/*
		 * nlapiSubmitField('opportunity', 315, 'custbody_opportunity_status',
		 * currentStatus, true);
		 */
	}
}
