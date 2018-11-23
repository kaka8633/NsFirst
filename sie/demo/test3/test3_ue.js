/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       28 Aug 2018     zyt 采购订单UE
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
	

	if(type=='view'){
		var memo = form.getField('custrecord_poh_memo');
		memo.setDisplayType('hidden');// 隐藏
	}
	
//	var status = form.getField('custrecord_poh_status');
//	status.setDisplayType('disabled');// 禁用
	
	var tip = form.addField('custpage_tip', 'text', '提示');
	tip.setDefaultValue('您正处于查看模式');
	tip.setDisplayType('disabled');
	nlapiLogExecution('ERROR', 'UE DEMO', 'HELLO WORLD');

	form.addButton('custpage_addLine_btn', '添加一行', 'addLine()');
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
	var context = nlapiGetContext();
	nlapiLogExecution('ERROR', 'context', context.email);
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
	var id = nlapiGetRecordId();
	nlapiLogExecution('ERROR', 'id=', id);
}
