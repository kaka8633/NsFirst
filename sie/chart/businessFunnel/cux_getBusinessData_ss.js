/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 Sep 2018     liuhz
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
//获取销售人员数据
function getEmployee(){
	var filters = new Array();
	filters[0] = new nlobjSearchFilter('salesrole', null, 'is','-2');
	var columns = new nlobjSearchColumn('firstname');
	var employees = nlapiSearchRecord('Employee', null, filters, columns);
	var employee;
	var exports = new Array();
	for(var i = 0; i < employees.length; i ++){
		exports.push({
			text : employees[i].getValue('firstname'),
			value : employees[i]['id']
		});
	}
	return exports;
}

//获取销售部门数据 
function getDepartmentBak(){
	var departments = nlapiSearchRecord('Department', null, null, null);
	var exports = new Array();
	for(var i = 0; i < departments.length; i ++){
		var department = nlapiLoadRecord('Department',departments[i]['id']);
		var parent = department.getFieldText('parent');
		if(parent != '' && parent != null){
			exports.push({
				text : parent + ' : ' + department.getFieldValue('name'),
				value : departments[i]['id']
			});
		}	
	}
	return exports;
}

function getDepartment(){
	var filters = new Array();
	filters[0] = new nlobjSearchFilter('isinactive',null,'is','false');
	var columns = new Array();
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('name');
	columns[2] = new nlobjSearchColumn('subsidiary');
	columns[3] = new nlobjSearchColumn('isinactive');
	var departments = nlapiSearchRecord('Department', null, filters, columns);
	var exports = new Array();
	//格式化
	for(var i = 0;i<(departments.length);i++){
		var nameData = departments[i].getValue('name').split(':');
		exports.push({
			'id':departments[i].getValue('internalid'),
			'subname':nameData[1],
			'parentName':nameData[0]
		});
	}
	var returnData = new Array();
	for(var i = 0;i<(exports.length);i++){
		//一级部门
		if(!exports[i]['name']){
			returnData.push(exports[i]);
		}
	}
	nlapiLogExecution('error','department',JSON.stringify(exports));
	nlapiLogExecution('error','department',JSON.stringify(returnData));
	return;
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
	if(!opId){//空数据返回
		return [];
	}else{
		//根据阶段组装商机的漏斗数据
		return getDataByContract(opId,type);
	}
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
	//初始化数据
	var initData = getStage(type);//阶段
	var len = opId.length;
	var dumpAmount = 0;
	var sumCount = 0;//商机数量
	if(type == '1'){//合约漏斗
		for(var i=0;i<len;i++){
			dumpAmount =0;//归零
			var record = nlapiLoadRecord('opportunity',opId[i]['id']);
			var lineCount = record.getLineItemCount('estimates');
			var dumpAmount = record.getLineItemValue('estimates','total',lineCount);//合约金额
			var stageId = record.getFieldValue('custbody_contract_status');//阶段id
			//依据合约阶段，更新对应阶段金额值
			for(var j=0;j<(initData.length);j++){
				if(initData[j]['id'] == stageId){
					initData[j]['money'] = initData[j]['money'] + parseFloat(dumpAmount);
					initData[j]['count'] ++;
					sumCount++;
				}
			}
		}
		//计算数量占比
		for(var i = 0;i<(initData.length);i++){
			initData[i]['count_percent'] = (initData[i]['count']/sumCount).toFixed(2);
		}
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
			//依据合约阶段，更新对应阶段金额值
			for(var j=0;j<(initData.length);j++){
				if(initData[j]['id'] == stageId){
					initData[j]['money'] = initData[j]['money'] + parseFloat(dumpAmount);
					initData[j]['count'] ++;
					sumCount++;
				}
			}
		}
		//计算数量占比
		for(var i = 0;i<(initData.length);i++){
			initData[i]['count_percent'] = (initData[i]['count']/sumCount).toFixed(2);
		}
	}
	nlapiLogExecution('error','return',JSON.stringify(initData));
	return initData;
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

















