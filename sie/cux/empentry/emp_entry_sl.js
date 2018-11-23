/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       15 Oct 2018     zyt 员工预入职申请表SL
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

	var form = nlapiCreateForm('准备', false);

	form.setScript('customscript_emp_entry_cs');

	form.addFieldGroup('custpage_prepare_group', '准备事项');
	form.addFieldGroup('custpage_opinion_group', '审批意见');
	form.addField('custpage_computer', 'checkbox', '办公电脑', null,
			'custpage_prepare_group');
	form.addField('custpage_wechat', 'checkbox', '企业微信账号', null,
			'custpage_prepare_group');
	form.addField('custpage_manual', 'checkbox', 'IT信息化指引手册准备', null,
			'custpage_prepare_group');
	form.addField('custpage_computer_system', 'checkbox', '电脑系统优化', null,
			'custpage_prepare_group');

	form.addField('custpage_audit_opinion', 'textarea', '审批意见', null,
			'custpage_opinion_group');

	form.addButton('custpage_approve_btn', '批准', 'approve('
			+ request.getParameter('recid') + ')');

	response.writePage(form);
}
