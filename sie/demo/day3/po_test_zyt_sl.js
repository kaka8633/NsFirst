/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       29 Aug 2018    	ZYT 		输出采购订单的页面
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

	var method = request.getMethod();// 提交方式
	nlapiLogExecution('ERROR', 'method', method);

	if (method == 'GET') {
		// 输出页面
		var form = initUI();
		response.writePage(form);// 输出form到页面
	} else {
		// 保存数据至采购订单
		var id = savePO(request);
		response.write('您提交了采购订单,采购订单id为：'+id);
	}

}

/**
 * 输出页面 add by zyt@sie 20180829
 */
function initUI() {

	// 创建form-采购头
	var form = nlapiCreateForm('采购订单界面-ZYT-suitelet');
	form.addField('custpage_poht_otherrefnum', 'text', '供应商编号');
	form.addField('custpage_poht_entity', 'select', '供应商', 'vendor');
	form.addField('custpage_poht_employee', 'select', '员工', 'employee');
	form.addField('custpage_poht_status', 'select', '状态',
			'customlist_test_zyt_list');
	form.addField('custpage_poht_date', 'date', '日期');
	form.addField('custpage_poht_memo', 'text', '备注');

	// 采购订单行
	var sublist = form.addSubList('custpage_pol_sublist', 'inlineeditor',
			'采购订单行');
	sublist.addField('custpage_polt_item', 'select', '货品', 'item');
	sublist.addField('custpage_polt_amount', 'float', '金额');
	sublist.addField('custpage_polt_quantity', 'integer', '整数');
	sublist.addField('custpage_polt_memo', 'text', '备注');

	form.addSubmitButton('保存');// 保存按钮
	return form;
}
/**
 * 保存数据至采购订单 add by zyt@sie 20180829
 */
function savePO(request) {

	var otherrefnum = request.getParameter('custpage_poht_otherrefnum');// 供应商编码
	var entity = request.getParameter('custpage_poht_entity');// 供应商
	var employee = request.getParameter('custpage_poht_employee');// 员工
	var status = request.getParameter('custpage_poht_status');// 状态
	var date = request.getParameter('custpage_poht_date');// 日期
	var memo = request.getParameter('custpage_poht_memo');// 备注

	// nlapiLogExecution('ERROR', 'otherrefnum=', otherrefnum);
	// nlapiLogExecution('ERROR', 'entity=', entity);
	// nlapiLogExecution('ERROR', 'employee=', employee);
	// nlapiLogExecution('ERROR', 'status=', status);
	// nlapiLogExecution('ERROR', 'date=', date);
	// nlapiLogExecution('ERROR', 'memo=', memo);

	// 创建采购订单
	var record = nlapiCreateRecord('customrecord_purchase_order_head');

	// 设置值
	record.setFieldValue('custrecord_poh_otherrefnum', otherrefnum);
	record.setFieldValue('custrecord_poh_entity', entity);
	record.setFieldValue('custrecord_poh_employee', employee);
	record.setFieldValue('custrecord_poh_status', status);
	record.setFieldValue('custrecord_poh_date', date);
	record.setFieldValue('custrecord_poh_memo', memo);

	var id = nlapiSubmitRecord(record, true);
	return id;
}