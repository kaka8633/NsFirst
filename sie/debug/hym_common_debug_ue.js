/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Sep 2018     Administrator
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
	/*// var testtab = form.addSubTab('custpage_test_add_table2',
	// '测试表','general');
	var testtab = form.addTab('custpage_test_add_table2', '测试表');

	var testlist = form.addSubList('custpage_test_add_subtable', 'editor',
			'测试列表', 'custpage_test_add_table2');

	// testtab.addField('custpage_universityname', 'text', 'University Name',
	// null, 'custpage_test_add_table1s');
	testlist
			.setHelpText('<div id="div_funnel_1" style="height: 650px; width: 900px;">12</div>');
	// testtab.addField('custpage_period', 'select', '期间', 'AccountingPeriod');

	//submitbtn.setDisabled(true);
	var tabs = form.getTabs();
	for (var i = 0; i < tabs.length; i++) {
		nlapiLogExecution("DEBUG", "打印所有对的tabs", tabs[i]);
	}*/
    
	nlapiLogExecution('DEBUG', 'userEventBeforeLoad 1.0', type);
	nlapiLogExecution('DEBUG', 'userEventBeforeLoad 1.0', form);
	nlapiLogExecution('DEBUG', 'userEventBeforeLoad 1.0', request);
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
	nlapiLogExecution('DEBUG', 'userEventBeforeSubmit 1.0', type);
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
	nlapiLogExecution('DEBUG', 'userEventAfterSubmit 1.0', type);
}
