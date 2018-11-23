/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Aug 2018     ZYT 采购订单头
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
	nlapiLogExecution('ERROR', '第一个UE', 'HelloWorld');

	// 设置编辑订单时状态字段不可编辑。
	if (type == 'edit') {
		var statusObj = form.getField('custrecord_poh_status');
		statusObj.setDisplayType('Disabled');
	}

	
	if (type == 'view') {
		// 设置查看订单时，隐藏备注字段
		var statusObj = form.getField('custrecord_poh_memo');
		statusObj.setDisplayType('hidden');
		
		// 3、设置查看订单时，新增一个提示字段，内容为“您正处于查看模式”
		var tip = form.addField('custpage_tip', 'text', '提示');
		tip.setDefaultValue('您正处于查看模式');
	}

	if(type=='create'){
		// 4、创建采购订单时新增一个“添加一行”的按钮，点击按钮添加一行采购订单。
		form.addButton('custpage_addline_btn', '添加一行', 'addLine()');
	}
	


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

}
