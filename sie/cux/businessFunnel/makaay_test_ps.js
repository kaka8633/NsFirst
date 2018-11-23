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
	getStage(0);
	return;
//	var data = nlapiLoadRecord('opportunity',325);
//	var item_count = data.getLineItemCount('item');
//	var sum_amount = 0;
//	for(var k=1;k <= item_count;k++){
//		sum_amount = sum_amount + Number(data.getLineItemValue('item','grossamt',k));
//	}
//	nlapiLogExecution('error', 'sum_amount', sum_amount);
//	nlapiLogExecution('error', 'item_data', item_count);
////	nlapiLogExecution('error', '325_info', JSON.stringify(data));
//	return;
	var res = getOpportunityData('','','2018-9-14','2018-9-20',1);
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
 *@param bu BU部门 [可选]
 *@param sales 销售人员 [可选]
 *@param dateStart 开始日期 
 *@param dateEnd 结束日期
 *@param {number} type类型标识  0:按合约状态划分金额和数量（合约漏斗用）; 1:按商机状态划分金额和数量（销售漏斗用）。
 *
 *@author makaay
 */
function getOpportunityData(bu,sales,dateStart,dateEnd,type){
	var filters = new Array();
	//BU条件
	if(bu != ''){
		filters.push(
			new nlobjSearchFilter('department',null,'is',bu)
		);
	}
	//销售人员条件
	if(sales != ''){
		filters.push(
			new nlobjSearchFilter('custbody_emp',null,'is',sales)
		);
	}
	//日期条件
	if(dateStart == dateEnd){//某一天
		filters.push(
			new nlobjSearchFilter('trandate',null,'on',dateStart)
		);
	}else{
		filters.push(
			new nlobjSearchFilter('trandate',null, 'within',dateStart,dateEnd)
		);
	}
	//执行搜索，找出所有符合条件的商机id
	var opId = nlapiSearchRecord('opportunity', null,filters, null);
	//根据阶段组装商机的金额数据
	return getDataByContract(opId,type);
}

/**
 *按照合约阶段或商机阶段查找组装商机金额数据
 *@param {array} opId 商机Id
 *			入参格式示例:[{"id":"262"},{"id":"263"},{"id":"264"}]
 *@param {number} type类型标识  0:按合约状态划分金额和数量（合约漏斗用）; 1:按商机状态划分金额和数量（销售漏斗用）。
 *
 *@author makaay
 */
function getDataByContract(opId,type){
	if(type == 0){//合约漏斗
		//初始化合约阶段金额值和数量
		var notice_amount  = 0;//中标通知书阶段金额,id = 1
		var notice_count = 0;
		var draft_amount   = 0;//合约起拟阶段金额,id = 2
		var draft_count = 0;
		var frame_amount   = 0;//合约框架确定阶段金额,id = 3
		var frame_count = 0;
		var confirm_amount = 0;//合约审批阶段金额,id = 4
		var confirm_count = 0;
		var receive_amount = 0;//合约收到阶段金额,id = 5
		var receive_count = 0;
	}else{//销售漏斗
		//初始化，商机阶段金额值和数量
		var potential_amount = 0;//潜在商机,id = 11
		var potential_count = 0;
		var qualifield_amount = 0;//合格商机,id = 14
		var qualifield_count = 0;
		var support_amount = 0;//合格的支持者,id = 12
		var support_count = 0;
		var decision_amount = 0;//合格的决策者,id = 10
		var decision_count = 0;
		var pass_amount = 0;//决策定案,id = 17
		var pass_count = 0;
		var negotiation_amount = 0;//商务谈判,id =
		var negotiation_count = 0;
		var win_amount = 0;//赢单,id = 13
		var win_count = 0;
		var lose_amount = 0;//丢单,id = 16
		var lose_count = 0;
	}
	var len = opId.length;
	var dumpAmount = 0;
	if(type == 0){//合约漏斗
		for(var i=0;i<len;i++){
			dumpAmount =0;//归零
			var record = nlapiLoadRecord('opportunity',opId[i]['id']);
			var lineCount = record.getLineItemCount('estimates');
			var dumpAmount = record.getLineItemValue('estimates','total',lineCount);//合约金额
			var stageId = record.getFieldValue('custbody_contract_status');//阶段id
//			var createPer = record.getFieldValue('custbody_emp');
			//依据合约阶段，更新对应阶段金额值
			switch(stageId){
				case '1':
					notice_amount = notice_amount + parseFloat(dumpAmount);
					notice_count++;
					break;
				case '2':
					draft_amount = draft_amount + parseFloat(dumpAmount);
					draft_count++;
					break;
				case '3':
					frame_amount = frame_amount + parseFloat(dumpAmount);
					frame_count++;
					break;
				case '4':
					confirm_amount = confirm_count + parseFloat(dumpAmount);
					confirm_count++;
					break;
				case '5':
					receive_amount = receive_count + parseFloat(dumpAmount);
					receive_count++;
					break;
			}
		}
		//定义返回数据
		var returnData =[
		    {money:notice_amount ,count:notice_count,name:'中标通知书阶段'},
		    {money:draft_amount  ,count:draft_count,name:'合约起拟阶段'},
		    {money:frame_amount  ,count:frame_count,name:'合约框架确定阶段'},
		    {money:confirm_amount,count:confirm_count,name:'合约审批阶段'},
		    {money:receive_amount,count:receive_count,name:'合约收到阶段'}
		];
	}else{//销售漏斗
		for(var i=0;i<len;i++){
			dumpAmount =0;//归零
			var record = nlapiLoadRecord('opportunity',opId[i]['id']);
			var lineCount = record.getLineItemCount('estimates');
			if(lineCount > 0){//存在估价单
				var dumpAmount = record.getLineItemValue('estimates','total',lineCount);//合约金额
			}else{//取商机毛额汇总
				var item_count = record.getLineItemCount('item');
				for(var k=1;k <= item_count;k++){
					dumpAmount = dumpAmount + Number(record.getLineItemValue('item','grossamt',k));
				}
			}
			var stageId = record.getFieldValue('entitystatus');//合约阶段id
//			var createPer = record.getFieldValue('custbody_emp');
			//依据合约阶段，更新对应阶段金额值
			switch(stageId){
				case '10':
					decision_amount = decision_amount + parseFloat(dumpAmount);
					decision_count++;
					break;
				case '11':
					potential_amount = potential_amount + parseFloat(dumpAmount);
					potential_count++;
					break;
				case '12':
					support_amount = support_amount + parseFloat(dumpAmount);
					support_count++;
					break;
				case '13':
					win_amount = win_amount + parseFloat(dumpAmount);
					win_count++;
					break;
				case '14':
					qualifield_amount = qualifield_amount + parseFloat(dumpAmount);
					qualifield_count++;
					break;
				case '16':
					lose_amount = lose_amount + parseFloat(dumpAmount);
					lose_count++;
					break;
				case '17':
					pass_amount = pass_amount + parseFloat(dumpAmount);
					pass_count++;
					break;
			}
		}
		var returnData =[
		    {money:potential_amount,count:potential_count,name:'潜在商机'},
		    {money:qualifield_amount,count:qualifield_count,name:'合格商机'},
		    {money:support_amount,count:support_count,name:'合格的支持者'},
		    {money:decision_amount,count:decision_count,name:'合格的决策者'},
		    {money:pass_amount,count:pass_count,name:'决策定案'},
		    {money:negotiation_amount,count:negotiation_count,name:'商务谈判'},
		    {money:win_amount,count:win_count,name:'赢单'},
		    {money:lose_amount,count:lose_count,name:'丢单'}
		];
	}
	return returnData;
}

/**
 *获取阶段
 *@param type 0:销售漏斗；1：合约漏斗阶段。
 *
 */
function getStage(type){
	var returnData = new Array();
	var zeroData = new Array();
	if(type == 0){//销售漏斗
		var data = nlapiSearchRecord('customerstatus',null,null,null);
		for(var i=0;i<(data.length);i++){
			var dumpRecord = new nlapiLoadRecord('customerstatus',data[i]['id']);
			if((dumpRecord.getFieldText('stage') == 'Prospect' || dumpRecord.getFieldText('stage') == 'Customer')&& dumpRecord.getFieldValue('isinactive') == 'F'){//过滤阶段
				if(dumpRecord.getFieldValue('probability') == '0.0%'){//剔除0%，排序后插入
					zeroData.push({
						'id':dumpRecord.getFieldValue('id'),
						'money':0,
						'count':0,
						'name':dumpRecord.getFieldValue('name'),
						'percent':dumpRecord.getFieldValue('probability'),
						'count_percent':0
					});	
				}else{
					returnData.push({
						'id':dumpRecord.getFieldValue('id'),
						'money':0,
						'count':0,
						'name':dumpRecord.getFieldValue('name'),
						'percent':dumpRecord.getFieldValue('probability'),
						'count_percent':0
					});	
				}
			}
		}
	}else if(type == 1){//合约漏斗
		var filters = new Array();
		filters[0] = new nlobjSearchFilter('isinactive',null,'is','false');
		var columns = new Array();
		columns[0] = new nlobjSearchColumn('internalid');
		columns[1] = new nlobjSearchColumn('name');
		var data = nlapiSearchRecord('customlist_contract_status',null,filters,columns);
		//格式化
		for(var i =0;i<(data.length);i++){
			var tumpStr = data[i].getValue('name');
			var tumpArr = tumpStr.split(' ');
			//0%，单独处理
			if(tumpArr[1] == '0%'){
				zeroData.push({
					'id':data[i].getValue('internalid'),
					'money':0,
					'count':0,
					'name':tumpArr[0],
					'percent':tumpArr[1],
					'count_percent':0
				});
			}else{
				returnData.push({
					'id':data[i].getValue('internalid'),
					'money':0,
					'count':0,
					'name':tumpArr[0],
					'percent':tumpArr[1],
					'count_percent':0
				});
			}
		}
//		nlapiLogExecution('error','returnData',JSON.stringify(returnData));
	}else{//非法参数
		nlapiLogExecution('error','getStage()','type非法参数');
		return;
	}
	//依据占比排序，升序，例外：0%在尾部
	returnData.sort(function(a,b){
		return parseFloat(a.percent) - parseFloat(b.percent);
	});
	returnData = returnData.concat(zeroData);//0%放置末尾
	nlapiLogExecution('error','stage',JSON.stringify(returnData));
	return returnData;
}














