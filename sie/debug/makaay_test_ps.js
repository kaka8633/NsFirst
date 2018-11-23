/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       12 Sep 2018     makaay
 *
 */

/**
 * @param {nlobjPortlet} portletObj Current portlet object
 * @param {Number} column Column position index: 1 = left, 2 = middle, 3 = right
 * @returns {Void}
 */
function portletName(portletObj, column) {
	portletObj.setTitle('Makaay_test_funnel');
	//test
	var res = getOpportunityData('203','37','2018-9-14','2018-9-20');
	nlapiLogExecution('error','res',JSON.stringify(res));
	return;
	var filters = new Array();
	filters[0] = new nlobjSearchFilter('custbody_contract_status',null, 'greaterthan',0);
	var resultId = nlapiSearchRecord('opportunity', null, null, null);
	nlapiLogExecution('error','id_result2',JSON.stringify(resultId));
	var data = getDataByContract(resultId);
	nlapiLogExecution('error','amount_result',JSON.stringify(data));
	return;
	
	
//	portletObj.setTitle('Makaay_test_funnel');
//	portletObj.setScript('customscript_test_makaay_cs');
//	var funnel = portlet.addField('custpage_funnel','inlinehtml');
//	funnel.setDefaultValue("<div id='main' style='height: 650px; width: 900px'></div>");
//	 portlet.setHtml(myHtml);
	
}

/**
 *获取符合条件的商机id
 *
 *@param bu BU部门 [可�1�7�]
 *@param sales 锄1�7售人呄1�7 [可�1�7�]
 *@param dateStart 弄1�7始日朄1�7 
 *@param dateEnd 结束日期
 */
function getOpportunityData(bu,sales,dateStart,dateEnd){
	var filters = new Array();
	//BU条件
	if(bu != ''){
		filters.push(
			new nlobjSearchFilter('department',null,'is',bu)
		);
	}
	//锄1�7售人员条仄1�7
	if(sales != ''){
		filters.push(
			new nlobjSearchFilter('custbody_emp',null,'is',sales)
		);
	}
	//日期条件
	if(dateStart == dateEnd){//某一处1�7
		filters.push(
			new nlobjSearchFilter('trandate',null,'on',dateStart)
		);
//		nlapiLogExecution('error','filters',JSON.stringify(filters));
	}else{
		filters.push(
			new nlobjSearchFilter('trandate',null, 'within',dateStart,dateEnd)
		);
	}
	//执行搜索，找出所有符合条件的商机id
	var opId = nlapiSearchRecord('opportunity', null,filters, null);
//	nlapiLogExecution('error', 'opId', JSON.stringify(opId));
	
	//根据合约阶段组装商机的金额数捄1�7
	return getDataByContract(opId);
}

/**
 *按照合约阶段查找组装商机金额数据
 *@param {array} opId 商机Id
 *			入参格式示例:[{"id":"262"},{"id":"263"},{"id":"264"}]
 *
 */
function getDataByContract(opId){
	//初始化合约阶段金额�1�7�1�7
	var amount_notice  = 0;//中标通知书阶段金预1�7,id = 1
	var amount_draft   = 0;//合约起拟阶段金额,id = 2
	var amount_frame   = 0;//合约框架确定阶段金额,id = 3
	var amount_confirm = 0;//合约审批阶段金额,id = 4
	var amount_receive = 0;//合约收到阶段金额,id = 5
	//初始化，商机阶段金额倄1�7
	var amount_potential = 0;//潜在商机,id = 11
	var amount_qualified = 0;//合格商机,id = 14
	var amount_support = 0;//合格的支持�1�7�1�7,id = 12
	var amount_decision = 0;//合格的决策�1�7�1�7,id = 10
	var amount_pass = 0;//决策定案,id = 17
	var amount_negotiation = 0;//商务谈判,id =
	var amount_win = 0;//赢单,id = 13
	var amount_sign = 0;//合约签署,id = 15
	
	var len = opId.length;
	for(var i=0;i<len;i++){
		var record = nlapiLoadRecord('opportunity',opId[i]['id']);
		var lineCount = record.getLineItemCount('estimates');
		var dumpAmount = record.getLineItemValue('estimates','total',lineCount);//合约金额
		var stageId = record.getFieldValue('custbody_contract_status');//合约阶段id
		var createPer = record.getFieldValue('custbody_emp');
		//依据合约阶段，更新对应阶段金额�1�7�1�7
		switch(stageId){
			case '1':
				amount_notice = amount_notice + parseFloat(dumpAmount);
				break;
			case '2':
				amount_draft = amount_draft + parseFloat(dumpAmount);
				break;
			case '3':
				amount_frame = amount_frame + parseFloat(dumpAmount);
				break;
			case '4':
				amount_confirm = amount_confirm + parseFloat(dumpAmount);
				break;
			case '5':
				amount_receive = amount_receive + parseFloat(dumpAmount);
				break;
		}
	}
	var returnData =[
	    {value:amount_notice ,name:'中标通知书阶殄1�7'},
	    {value:amount_draft  ,name:'合约起拟阶段'},
	    {value:amount_frame  ,name:'合约框架确定阶段'},
	    {value:amount_confirm,name:'合约审批阶段'},
	    {value:amount_receive,name:'合约收到阶段'}
	];
	return returnData;
}
