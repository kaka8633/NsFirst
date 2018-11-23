/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 Sep 2018     Administrator
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response){
	var action = request.getParameter('action');
	var exports = {};
	if(action && action === 'getEmployee'){	
		exports = getEmployee();
	}else if(action && action === 'getDepartment'){
		exports = getDepartment();
	}
	else{
		var bu   = request.getParameter('bu');
		var sales   = request.getParameter('sales');
		var dateStart   = request.getParameter('dateStart');
		var dateEnd   = request.getParameter('dateEnd');
		var type   = request.getParameter('type');

		exports = getOpportunityData(bu,sales,dateStart,dateEnd,type);
	}
	
	response.write(JSON.stringify(exports));
}

function getEmployee(){
	var employees = nlapiSearchRecord('Employee', null, null, null);
	var employee;
	var exports = new Array();
	for(var i = 0; i < employees.length; i ++){
		employee = nlapiLoadRecord('Employee',employees[i]['id']);
		if(employee.getFieldValue('salesrole') == '-2'){
			exports.push({
				text : employee.getFieldValue('firstname'),
				value : employees[i]['id']
			});
		}
	}
	return exports;
}

function getDepartment(){
	var departments = nlapiSearchRecord('Department', null, null, null);
	var exports = new Array();
	for(var i = 0; i < departments.length; i ++){
		var department = nlapiLoadRecord('Department',departments[i]['id']);
		exports.push({
			text : department.getFieldValue('name'),
			value : departments[i]['id']
		});
	}
	return exports;
}

/**
 *获取符合条件的商机id
 *
 *@param bu BU部门 [可选]
 *@param sales 销售人员 [可选]
 *@param dateStart 开始日期 
 *@param dateEnd 结束日期
 *@param {number} type类型标识  1:按合约状态划分金额和数量（合约漏斗用）; 0:按商机状态划分金额和数量（销售漏斗用）。
 *
 *@author makaay
 */
function getOpportunityData(bu,sales,dateStart,dateEnd,type){
	var filters = new Array();
	//BU条件
	if(bu != '' &&  bu !== 'all'){
		filters.push(
			new nlobjSearchFilter('department',null,'is',bu)
		);
	}
	//销售人员条件
	if(sales != '' && sales !== 'all'){
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
 *@param {number} type类型标识  1:按合约状态划分金额和数量（合约漏斗用）; 0:按商机状态划分金额和数量（销售漏斗用）。
 *
 *@author makaay
 */
function getDataByContract(opId,type){
	if(type == '1'){//合约漏斗
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
		var fail_amount = 0;//合约失败阶段金额,id = 
		var fail_count = 0;
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
	if(type == '1'){//合约漏斗
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
		//计算数量占比
		var allCount = notice_count + draft_count + frame_count + confirm_count + receive_count + fail_count;
		var notice_count_percent = (notice_count/allCount).toFixed(2);
		var draft_count_percent = (draft_count/allCount).toFixed(2);
		var frame_count_percent = (frame_count/allCount).toFixed(2);
		var confirm_count_percent = (confirm_count/allCount).toFixed(2);
		var receive_count_percent = (receive_count/allCount).toFixed(2);
		var fail_count_percent = (fail_count/allCount).toFixed(2);
		//定义返回数据
		var returnData =[
		    {money:notice_amount ,count:notice_count,name:'中标通知书',percent:'10%',count_percent:notice_count_percent},
		    {money:draft_amount  ,count:draft_count,name:'合约起拟',percent:'20%',count_percent:draft_count_percent},
		    {money:frame_amount  ,count:frame_count,name:'合约框架确定',percent:'60%',count_percent:frame_count_percent},
		    {money:confirm_amount,count:confirm_count,name:'合约审批',percent:'80%',count_percent:confirm_count_percent},
		    {money:receive_amount,count:receive_count,name:'合约收到',percent:'100%',count_percent:receive_count_percent},
		    {money:fail_amount,count:fail_count,name:'合约失败',percent:'0%',count_percent:fail_count_percent}
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
		//计算数量占比
		var allCount = potential_count + qualifield_count + support_count + decision_count + pass_count + negotiation_count + win_count + lose_count;
		var potential_count_percent = (potential_count/allCount).toFixed(2);
		var qualifield_count_percent = (qualifield_count/allCount).toFixed(2);
		var support_count_percent = (support_count/allCount).toFixed(2);
		var decision_count_percent = (decision_count/allCount).toFixed(2);
		var pass_count_percent = (pass_count/allCount).toFixed(2);
		var negotiation_count_percent = (negotiation_count/allCount).toFixed(2);
		var win_count_percent = (win_count/allCount).toFixed(2);
		var lose_count_percent = (lose_count/allCount).toFixed(2);
		//定义返回数据
		var returnData =[
		    {money:potential_amount,count:potential_count,name:'潜在商机',percent:'10%',count_percent:potential_count_percent},
		    {money:qualifield_amount,count:qualifield_count,name:'合格商机',percent:'20%',count_percent:qualifield_count_percent},
		    {money:support_amount,count:support_count,name:'合格的支持者',percent:'40%',count_percent:support_count_percent},
		    {money:decision_amount,count:decision_count,name:'合格的决策者',percent:'60%',count_percent:decision_count_percent},
		    {money:pass_amount,count:pass_count,name:'决策定案',percent:'80%',count_percent:pass_count_percent},
		    {money:negotiation_amount,count:negotiation_count,name:'商务谈判',percent:'90%',count_percent:negotiation_count_percent},
		    {money:win_amount,count:win_count,name:'赢单',percent:'100%',count_percent:win_count_percent},
		    {money:lose_amount,count:lose_count,name:'丢单',percent:'0%',count_percent:lose_count_percent}
		];
	}
	nlapiLogExecution('error','return',JSON.stringify(returnData));
	return returnData;
}