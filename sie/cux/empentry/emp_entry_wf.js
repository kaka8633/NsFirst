/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       15 Oct 2018     zyt 员工预入职申请表WF
 *
 */

/**
 * @returns {Void} Any or no return value
 */
function workflowAction(id, type, form) {

	nlapiLogExecution('ERROR', '测试', '进入');
	nlapiLogExecution('ERROR', 'form', form);
	nlapiLogExecution('ERROR', 'id', id);
	nlapiLogExecution('ERROR', 'type', type);
//	form.addButton('custpage_testBtn', 'Test', '');
//	form.setScript('');
	// nlapiLogExecution('ERROR', '测试', '进入');
	// // nlapiSetRedirectURL('SUITELET', 'customscript_emp_entry_wf',
	// // 'customdeploy_emp_entry_wf');
	// nlapiRequestURL('https://system.netsuite.com/app/common/custom/custrecordentry.nl?rectype=220&whence=');
	nlapiLogExecution('ERROR', '测试', '退出');
}
