/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 Aug 2018     Tingyiyi
 *
 */

/**
 * @param {Object} dataIn Parameter object
 * @returns {Object} Output object
 */
function getRESTlet(dataIn) {
	return {};
}

/**
 * @param {Object} dataIn Parameter object
 * @returns {Object} Output object
 */
function postRESTlet(dataIn) {
	
	//创建采购订单
	var poId = createCuxPO(dataIn);
	return poId;
//	return JSON.stringify(dataIn);
}

/**
 * 创建采购订单
 * */
function createCuxPO(dataIn){
	
	//获取采购订单头信息
	var otherrefnum = dataIn.otherrefnum;
	var entity = dataIn.entity;
	var employee = dataIn.employee;
	var status = dataIn.status;
	var date = dataIn.date;
	var memo = dataIn.memo;
	
	//获取采购订单行信息
	var lineAry = dataIn.line;
	
	//创建采购订单
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