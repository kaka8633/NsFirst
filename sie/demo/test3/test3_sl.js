/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Aug 2018     Tingyiyi
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
	// response.write('<html>');
	// response.write('<body>');
	// response.write('<font size="10" color="red">Hello World</font>');
	// response.write('</body>');
	// response.write('</html>');

//	var method = request.getMethod();
//	nlapiLogExecution('ERROR', 'method=', method);
//
//	if (method == 'GET') {
//		// 输出界面
//		var form = initUI();
//		response.writePage(form);
//	} else {
//		// 保存数据
//		var poId = saveRecord(request);
//		response.writeLine('保存成功,采购订单id='+poId);
//	}
	
//	var context = nlapiGetContext();
//	var account = context.getCompany();
//	var role = context.getRole();
//	var email = context.getEmail();
//	response.writeLine('account='+account);
//	response.writeLine('email='+email);
//	response.writeLine('role='+role);

	var filters = [];
	filters [0] = new nlobjSearchFilter('custrecord_poh_otherrefnum', null, 'is', '1');
	var returncols = new Array();
	returncols[0] = new nlobjSearchColumn('custrecord_poh_otherrefnum');
	returncols[1] = new nlobjSearchColumn('custrecord_poh_entity');
	var results = nlapiSearchRecord('customrecord_purchase_order_head', null,
			filters, returncols);
	response.writeLine('results='+JSON.stringify(results));

}

/**
 * 输出界面 add by zyt@sie 20180820
 */
function initUI() {

	// 创建一个FORM
	var form = nlapiCreateForm('采购订单界面-Suitelet');

	// 添加采购订单头字段
	form.addField('custpage_poh_otherrefnum', 'text', '供应商编号', null);// 供应商编号
	form.addField('custpage_poh_entity', 'select', '供应商', 'vendor');// 供应商
	form.addField('custpage_poh_employee', 'select', '员工', 'employee');// 员工
	form.addField('custpage_poh_status', 'select', '状态',
			'customlist_po_status_list');// 状态
	form.addField('custpage_poh_date', 'date', '日期', null);// 日期
	form.addField('custpage_poh_memo', 'text', '备注', null);// 备注

	// 添加采购订单行字段
	var sublist = form.addSubList('custpage_pol_sublist', 'inlineeditor',
			'采购订单行');
	sublist.addField('cust_pol_item', 'select', '货品', 'item');
	sublist.addField('cust_pol_amount', 'float', '金额');
	sublist.addField('cust_pol_quantity', 'integer', '数量');
	sublist.addField('cust_pol_memo', 'text', '备注');

	// 添加提交按钮
	form.addSubmitButton('保存');

	return form;

}

/**
 * 保存数据
 */
function saveRecord(request) {

	var lineType = 'custpage_pol_sublist';
	var lineAry = [];// 采购订单行数据数组
	// 获取采购订单头字段
	var otherrefnum = request.getParameter('custpage_poh_otherrefnum');
	var entity = request.getParameter('custpage_poh_entity');
	var employee = request.getParameter('custpage_poh_employee');
	var status = request.getParameter('custpage_poh_status');
	var date = request.getParameter('custpage_poh_date');
	var memo = request.getParameter('custpage_poh_memo');

	nlapiLogExecution('ERROR', 'otherrefnum', otherrefnum);
	nlapiLogExecution('ERROR', 'employee', employee);
	nlapiLogExecution('ERROR', 'status', status);
	nlapiLogExecution('ERROR', 'entity', entity);
	nlapiLogExecution('ERROR', 'date', date);
	nlapiLogExecution('ERROR', 'memo', memo);

	// 获取采购订单行字段
	var lineCount = request.getLineItemCount(lineType);// 行数

	nlapiLogExecution('ERROR', 'lineCount', lineCount);

	for (var i = 1; i <= lineCount; i++) {
		var json = {};
		var item = request.getLineItemValue(lineType, 'cust_pol_item', i);
		var amount = request.getLineItemValue(lineType, 'cust_pol_amount', i);
		var quantity = request.getLineItemValue(lineType, 'cust_pol_quantity',
				i);
		var lineMemo = request.getLineItemValue(lineType, 'cust_pol_memo', i);

		// nlapiLogExecution('ERROR', 'item', item);
		// nlapiLogExecution('ERROR', 'amount', amount);
		// nlapiLogExecution('ERROR', 'quantity', quantity);
		// nlapiLogExecution('ERROR', 'lineMemo', lineMemo);

		json.item = item;// 货品
		json.amount = amount;// 金额
		json.quantity = quantity;
		json.lineMemo = lineMemo;

		lineAry.push(json);
	}

	nlapiLogExecution('ERROR', 'lineAry', JSON.stringify(lineAry));

	// 创建采购订单
	var record = nlapiCreateRecord('customrecord_purchase_order_head');
	record.setFieldValue('custrecord_poh_otherrefnum', otherrefnum);
	record.setFieldValue('custrecord_poh_entity', entity);
	record.setFieldValue('custrecord_poh_employee', employee);
	record.setFieldValue('custrecord_poh_status', status);
	record.setFieldValue('custrecord_poh_date', date);
	record.setFieldValue('custrecord_poh_memo', memo);

	var polType = 'recmachcustrecord_pol_poh_link';
	for (var i = 0; i < lineAry.length; i++) {
		record.setLineItemValue(polType, 'custrecord_pol_item', (i + 1),
				lineAry[i].item);
		record.setLineItemValue(polType, 'custrecord_pol_amount', (i + 1),
				
				lineAry[i].amount);
		record.setLineItemValue(polType, 'custrecord_pol_quantity', (i + 1),
				lineAry[i].quantity);
		record.setLineItemValue(polType, 'custrecord_pol_memo', (i + 1),
				lineAry[i].memo);
	}

	// 提交记录
	var poId = nlapiSubmitRecord(record, true, true);
	
	return poId;
}
