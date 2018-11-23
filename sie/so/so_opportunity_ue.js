/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       14 Sep 2018     zyt 销售计划UE
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

	// 创建时带出创建人和创建人的主管
	if (type == 'create') {
		var empId = nlapiGetContext().getUser();
		var manager = getEmpManager(empId);// 获取主管

		nlapiSetFieldValue('custbody_emp', empId, true, true);
		nlapiSetFieldValue('custbody_manager', manager, true, true);
	}

//	var competitorsSublist = form.getSubList('competitors');// 获取关系-》竞争对手子列表
//	
//	if(competitorsSublist){
//		
//		competitorsSublist.addField('custpage_service_product', 'text', '服务产品');
//		competitorsSublist.addField('custpage_num', 'integer', '数量');
//		competitorsSublist.addField('custpage_price', 'float', '价格');
//		competitorsSublist.addField('custpage_sum_prict', 'float', '总价');
//
//	}
	
	// add by yuming hu 20181010
	// 隐藏客制化机会状态字段和客制化状态改变日期字段
	//hiddenOpportunity();
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
	if(type == 'create'){
		//自定义流水号  Makaay 2018-10-23
		var returnData = makeSerialNum('opportunity','5');//estimate流水号
		var codeStr = 'OP'+returnData['year']+returnData['num'];//组装报价单编码
		nlapiLogExecution('error','getCode',codeStr);//debug
		var successId = nlapiSetFieldValue('tranid',codeStr);//重写编码
	}
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
	// 订单号自动生成
	var ctx = nlapiGetContext().getExecutionContext();
	nlapiLogExecution('ERROR', 'userEventAfterSubmit', type + '--' + ctx);

	var rectype = nlapiGetRecordType();
	var internalid = nlapiGetRecordId();

	nlapiLogExecution('ERROR', 'internalid=', internalid);
	// 当为界面录单为接口生成时
	if (ctx == 'userinterface' || ctx == 'userevent') {

		// 只在界面创建时执行
		// if (type == 'create') {

		// 订单号自动生成
////		var orderNum = getOrderNumTwo('tranid', rectype);
//
////		nlapiLogExecution('ERROR', '订单号=', orderNum);
////		nlapiSubmitField(rectype, internalid, 'tranid', 'op' + orderNum, false);
		
		// }
	}

	// add by yuming hu 20181010
	// 合约变现和商机变现
	controlOpportunity(type);
}

/**
 * 作者：yuming hu 时间：2018-10-18 描述：隐藏商机界面上客制化的商机变现和合约变现的相关字段 版本：1.0
 */
function hiddenOpportunity() {
	nlapiSetFieldDisplay('custbody_status_change_date', false);
	nlapiSetFieldDisplay('custbody_opportunity_status', false);
	nlapiSetFieldDisplay('custbody_contract_change_status', false);
	nlapiSetFieldDisplay('custbody_contact_status_change_date', false);
}

/**
 * @author Administrator
 * @
 * 作者：yuming hu 时间：2018-10-18 描述：商机变现和合约变现控制逻辑 版本：1.0
 */
function controlOpportunity(type) {
	// 商机变现
	var opportunityFlag = false;
	// 合约变现
	var contactFlag = false;

	if (type == 'create') {
		opportunityFlag = true;
		contactFlag = true;
	}

	var currentOpportunityStatus = nlapiGetFieldText('entitystatus');
	var currentContactStatus = nlapiGetFieldText('custbody_contract_status');

	// 获取客制化
	var oldOpportunityStatus = nlapiGetFieldValue('custbody_opportunity_status');
	var oldContactStatus = nlapiGetFieldValue('custbody_contract_change_status');

	if (type == 'edit'
			&& (currentOpportunityStatus != oldOpportunityStatus
					|| oldOpportunityStatus == null || oldOpportunityStatus == '')) {

		opportunityFlag = true;

	}

	if (type == 'edit'
			&& (currentContactStatus != oldContactStatus
					|| oldContactStatus == null || oldContactStatus == '')) {

		contactFlag = true;

	}

	if (opportunityFlag) {
		var recordId = nlapiGetRecordId();

		nlapiSubmitField('opportunity', recordId,
				'custbody_opportunity_status', currentOpportunityStatus, true);

		nlapiSubmitField('opportunity', recordId,
				'custbody_status_change_date', nlapiDateToString(new Date(),
						'yyyy-MM-dd'), true);
	}

	if (contactFlag) {
		var recordId = nlapiGetRecordId();

		nlapiSubmitField('opportunity', recordId,
				'custbody_contract_change_status', currentContactStatus, true);

		nlapiSubmitField('opportunity', recordId,
				'custbody_contact_status_change_date', nlapiDateToString(
						new Date(), 'yyyy-MM-dd'), true);
	}
}

/**
 * 计算流水号
 * @author Makaay
 * @param type 项目类型
 * @param num  流水号位数
 * 
 * @return e.g [{"num":"00012","year":2018}]
 * */
function makeSerialNumT(type,num){
	var yearNow = new Date().getFullYear();
	yearNow = yearNow.toString();
	//当前年份的项目
	var filters = new Array();
	filters.push(new nlobjSearchFilter('custrecord_create_year',null,'is',yearNow));
	filters.push(new nlobjSearchFilter('custrecord_'+type+'_num',null,'isnotempty'));
	var columns = new Array();
	columns.push(new nlobjSearchColumn('custrecord_'+type+'_num'));
	columns.push(new nlobjSearchColumn('internalid'));
	columns.push(columns[1].setSort());
	var searchResults = nlapiCreateSearch('customrecord_auto_serialnum_data',filters,columns).runSearch();
	var tempData = searchResults.getResults(0,1000);
	var debug_tempData =tempData;//debug
	nlapiLogExecution('error','tempData',JSON.stringify(debug_tempData));//debug
	nlapiLogExecution('error','tempDataRaw',tempData);//debug
	nlapiLogExecution('error','length',tempData.length);//debug
	if(tempData.length == 0){//不存在流水号，该年度第一条数据
		lastNum = '0';
	}else{
		if(tempData.length > 1){//避免pop()报错
//			var lastNum = tempData.pop().rawValues[0].value;//last流水号
			var lastNum = tempData.pop().getValue('custrecord_opportunity_num');//last流水号
		}else{
//			var lastNum = tempData[0].rawValues[0].value;//last流水号
			var lastNum = tempData[0].getValue('custrecord_opportunity_num');//last流水号
		}
	}
//	console.log('lastNum='+lastNum);//debug
	//更新流水号数据
	var record = nlapiCreateRecord('customrecord_auto_serialnum_data');
	record.setFieldValue('name','name');
	record.setFieldValue('custrecord_create_year',yearNow);
	record.setFieldValue('custrecord_'+type+'_num',Number(lastNum)+1);
	var id = nlapiSubmitRecord(record,true);
//	console.log('saveRetuenId='+id);//debug
	//流水号保留位数
	var zeroNum = PrefixIntegerT(Number(lastNum)+1,num);
	
	
	return {'num':zeroNum,'year':yearNow};
}
//数字补0,Makaay
function PrefixIntegerT(num, length) {
	return (num/Math.pow(10,length)).toFixed(length).substr(2);
}