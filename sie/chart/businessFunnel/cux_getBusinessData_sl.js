/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 Sep 2018     liuhz
 *233
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response){
	var action = request.getParameter('action');
	var exports = {};
	var empId = null;
	empId = request.getParameter('employeeId');
	if(action && action === 'getEmployee'){
		exports = getEmployee(empId);
	}else if(action && action === 'getDepartment'){
		exports = getDepartment();
	}else{
		var bu   = request.getParameter('bu');
		var sales   = request.getParameter('sales');
		var dateStart   = request.getParameter('dateStart');
		var dateEnd   = request.getParameter('dateEnd');
		var type   = request.getParameter('type');
		exports = getOpportunityData(empId,bu,sales,dateStart,dateEnd,type);
	}
	//test
	var empSearch = nlapiLoadSearch(null,'customsearch_entry_approver_hr');
	var newSearch = nlapiCreateSearch(empSearch.getSearchType(), empSearch.getFilters(), empSearch.getColumns());
	var searchResults = newSearch.runSearch();
	var doResult = searchResults.getResults(0,1000);
	nlapiLogExecution('error','empTestInfo',JSON.stringify(doResult));
	response.write(JSON.stringify(exports));
}


//获取销售人员数据
function getEmployeeBak(){
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




/**
 * 获取销售人员的等级关系数据
 * @author Makaay
 * 
 */
function getSaleLevelData(){
	var returnData = new Array();//返回数据
	//所有销售人员数据
	var empFilters = new Array();
	empFilters.push(new nlobjSearchFilter('salesrep', null, 'is',true));
	var empSearch = nlapiLoadSearch(null,'customsearch_emp_info');
	var newSearch = nlapiCreateSearch(empSearch.getSearchType(), empSearch.getFilters(), empSearch.getColumns());
	newSearch.addFilters(empFilters);
	var searchResults = newSearch.runSearch();
	var doResult = searchResults.getResults(0,1000);
	var debugData = doResult;
	nlapiLogExecution('error','employeeData',JSON.stringify(debugData));//debug
	
	var salesManagerData = getTopLevelEmp();//漏斗管理层数据
	var debugData = salesManagerData;//debug
	nlapiLogExecution('error','salesManagerData',JSON.stringify(debugData));
	if(salesManagerData){//存在漏斗管理层
		var compareArr = [];
		for(var i=0;i<salesManagerData.length;i++){
			compareArr.push(salesManagerData[i]['id']);
		}
		//销售代表中的管理层
		var noManagerSales = [];
		for(var i = 0;i<doResult.length;i++){
			var managerFlag = 0;
			for(var j = 0;j<salesManagerData.length;j++){
				if(salesManagerData[j]['id'] == doResult[i].getValue('internalid')){//销售代表为管理层 
					managerFlag = 1;
					break;
				}
			}
			nlapiLogExecution('error','managerFlag'+i,managerFlag);
			if(managerFlag == 0){//非管理层
				noManagerSales.push(doResult[i]);
			}
		}
		var debugData = noManagerSales;//debug
		nlapiLogExecution('error','noManagerSales',JSON.stringify(debugData));//debug
	}
	// doResult = noManagerSales;//test
	for(var i = 0;i<doResult.length;i++){
		var dumpSort = doResult[i].getValue('supervisor');
		var dumpSupervisor = dumpSort;
		if(!dumpSort){
			dumpSort = 0;
		}
		returnData.push({
			'value':doResult[i].getValue('internalid'),
			'text':doResult[i].getValue('firstname'),
			'supervisor':dumpSupervisor,
			'sort':dumpSort,
			'level':2
		});
	}
	//销售人员划分等级，2为销售员，1为销售经理
	for(var i = 0; i<returnData.length;i++){
		for(var j = 0;j<returnData.length;j++){
			if(returnData[j]['supervisor'] == returnData[i]['value']){
				returnData[i]['level'] = 1;
			}
		}
	}
	var debugData = JSON.stringify(returnData);//debug
	nlapiLogExecution('error','return_data',debugData);//debug
	//根据销售经理,分组排序
	var newReturnData = new Array();
	var newReturnDataSec = new Array();//销售员
	for(var i = 0; i<returnData.length;i++){
		if(returnData[i]['level'] == 1){//销售经理
			newReturnData.push(returnData[i]);
			for(var j = 0;j<returnData.length;j++){
				if(returnData[j]['supervisor'] == returnData[i]['value']){
					newReturnData.push(returnData[j]);
				}
			}
		}else{//销售员
			newReturnDataSec.push(returnData[i]);
		}
	}
	//合并组长与组员
	newReturnDataLast = newReturnData.concat(newReturnDataSec);
	var debugData = newReturnDataLast;//debug
	nlapiLogExecution('error','newReturnDataLast',JSON.stringify(debugData));//debug
	nlapiLogExecution('error','employeeData_return',JSON.stringify(newReturnData));//debug
	return newReturnDataLast;
	// return JSON.stringify(newReturnDataLast);
} 

/**
 *获取漏斗图全员查看权限的管理层用户信息 
 *@author Makaay
 * 
 */
function getTopLevelEmp(){
	var empSearch = nlapiLoadSearch(null,'customsearch_custom_funnel_emp');
	var newSearch = nlapiCreateSearch(empSearch.getSearchType(), empSearch.getFilters(), empSearch.getColumns());
	var searchResults = newSearch.runSearch();
	var result = searchResults.getResults(0,1000);
	var returnData = new Array();
	for(var i = 0;i<result.length;i++){
		returnData.push({
			'id':result[i].getValue('internalid'),
			'name':result[i].getValue('altname')
		});
	}
	return returnData;  
}

/**
 * 获取销售人员数据 V1.3 加入权限控制
 * @param empId 当前登陆用户id
 * @author Makaay
 * 
 */
function getEmployee(empId){
	//当前员工职务判断，权限控制
	var topLevelData = getTopLevelEmp();
	var isTopFlag = 0;
	for(var i = 0;i<topLevelData.length;i++){
		if(topLevelData[i]['id'] == empId){
			isTopFlag = 1;
		}
	}
	if(isTopFlag == 1){//该用户为漏斗图管理层用户
//		return getSaleLevelData();//返回所有人员
		return {'data': getSaleLevelData(),'haveAll':1};
	}else{//非管理层
		var allSales = getSaleLevelData();
		// nlapiLogExecution('error','returnData_employee',allSales);
		var isSaleFlag = 0;
		var empLevel = 2;
		var empName = '';
		for(var i = 0;i<allSales.length;i++){
			if(allSales[i]['value'] == empId){
				isSaleFlag = 1;
				empName = allSales[i]['text'];
				if(allSales[i]['level'] == 1){//是否为销售经理判断
					empLevel = 1;
				}
			}
		}
		// nlapiLogExecution('error','returnData_employee_222',allSales);
		// nlapiLogExecution('error','empLevel',empLevel);
		// nlapiLogExecution('error','isSaleFlag',isSaleFlag);
		// nlapiLogExecution('error','empId',empId);
		// nlapiLogExecution('error','empId_type',typeof(empId));
		// nlapiLogExecution('error','allSales_length',allSales.length);
		if(isSaleFlag == 1){//销售部门
			if(empLevel == 1){//销售经理
				var dumpReturnData = new Array();
				for(var i = 0;i<allSales.length;i++){
					if(allSales[i]['value'] == empId || allSales[i]['supervisor'] == empId){
						dumpReturnData.push(allSales[i]);
					}
				}
//				return dumpReturnData;
				return {'data':dumpReturnData,'haveAll':0};
			}else{//销售人员
//				return [{'value':empId,'text':empName}];
				nlapiLogExecution('error','flag','flag is 2');
				nlapiLogExecution('error','returnData_employee_last',{'data':[{'value':empId,'text':empName}],'haveAll':0});
				return {'data':[{'value':empId,'text':empName}],'haveAll':0};
			}
		}else{//无权限
			nlapiLogExecution('error','funnelError','查看人员无权限');
		}
	}
}



/**
 * 获取部门数据
 * 
 * @author Makaay
 * */
function getDepartment(){
	//department基础数据获取
	var filters = new Array();
	filters[0] = new nlobjSearchFilter('isinactive',null,'is','false');
	var columns = new Array();
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('name');
	columns[2] = new nlobjSearchColumn('subsidiary');
	columns[3] = new nlobjSearchColumn('custrecord_department_number');
	var departments = nlapiSearchRecord('Department', null, filters, columns);
	var exports = new Array();
	//格式化
	for(var i = 0;i<(departments.length);i++){
		var nameData = departments[i].getValue('name').split(':');
		var dumpPush = {'id':departments[i].getValue('internalid'),'code':departments[i].getValue('custrecord_department_number')};
		for(var j = 0;j<(nameData.length);j++){
			var dumpNameStr = 'names_'+j;
			dumpPush[dumpNameStr] = nameData[j].trim();
		}
		exports.push(dumpPush);
	}
	var returnData = new Array();//返回变量
	for(var i = 0;i<(exports.length);i++){
		var dumpKey = 'names_'+(Object.getOwnPropertyNames(exports[i]).length - 3);
		returnData.push({
			'value':exports[i]['id'],
			'level':Number(Object.getOwnPropertyNames(exports[i]).length - 2),
			'text':exports[i]['code']+exports[i][dumpKey],
			'code':exports[i]['code']
		});
	}
	//按照code排序
	returnData.sort(function(a,b){
			if(a.code > b.code){
				return 1;
			}else{
				return -1;
			}
	})
	return {'data':returnData,'haveAll':1};
}

/**
 *获取符合条件的商机id
 *
 *@param bu BU部门 [可选]
 *@param empId 当前用户id
 *@param sales 销售人员 [可选]
 *@param dateStart 开始日期 
 *@param dateEnd 结束日期
 *@param {number} type类型标识  1:按合约状态划分金额和数量（合约漏斗用）; 0:按商机状态划分金额和数量（销售漏斗用）。
 *
 *@author makaay
 */
function getOpportunityData(empId,bu,sales,dateStart,dateEnd,type){
	var filters = new Array();
	//BU条件
	if(bu != '' &&  bu !== 'all'){
		//此BU是否存在子BU
		var parentData = getBuParentData();//获取BU间的从属关系
		var sonBu = new Array();
		for(var i = 0;i<(parentData.length);i++){
			if(parentData[i]['pid'] == bu){
				sonBu.push(parentData[i]['id']);
			}
		}
		if(sonBu.length > 0){//存在子BU
			sonBu.push(bu);
			filters.push(
					new nlobjSearchFilter('department',null,'anyof',sonBu)
			);
		}else{
			filters.push(
					new nlobjSearchFilter('department',null,'is',bu)
			);
		}
	}
	//初始化漏斗图时，默认显示数据
	if(!sales){
		//当前用户类型判断
		var topLevelData = getTopLevelEmp();
		var isTopFlag = 0;
		for(var i = 0;i<topLevelData.length;i++){
			if(topLevelData[i]['id'] == empId){
				isTopFlag = 1;
			}
		}
		if(isTopFlag == 1){//管理层
			sales = 'all';
		}else{//销售人员
			sales = empId;
		}
	}
	//销售人员条件
	if(sales != '' && sales !== 'all'){
		//销售人员等级判断
		var saleData = getSaleLevelData();//销售人员关系数据
		var isManagerFlag = 0;
		var sonSales = new Array();
		for(var i = 0;i<saleData.length;i++){
			if(saleData[i]['level'] == 1){//销售经理
				isManagerFlag = 1;
			}
		}
		if(isManagerFlag == 1){//销售经理
			sonSales.push(sales);
			for(var i = 0;i<saleData.length;i++){
				if(saleData[i]['supervisor'] == sales){
					sonSales.push(saleData[i]['value']);
				}
			}//获取其部下的id
			filters.push(
				new nlobjSearchFilter('salesrep',null,'anyof',sonSales)
			);
			
		}else{//销售人员
			filters.push(
				new nlobjSearchFilter('salesrep',null,'is',sales)
			);
		}
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
	//update code 2018/9/28
	var loadSearch = nlapiLoadSearch(null, 'customsearch_funnnel_data');
	var newSearch = nlapiCreateSearch(loadSearch.getSearchType(), loadSearch.getFilters(), loadSearch.getColumns());
	newSearch.addFilters(filters);
	var searchResults = newSearch.runSearch();
	var returnData = new Array();
	var doStart = 0;
	var doEnd = 1000;
	do{
		var doResult = searchResults.getResults(doStart,doEnd);
		if(doResult.length > 0 ){//过滤空值插入数据
			for(var i = 0;i<(doResult.length);i++){
				returnData.push({
					'id':doResult[i].getValue('internalid'),
					'date':doResult[i].getValue(new nlobjSearchColumn('trandate')),//商机创建日期
					'estimateDate':doResult[i].getValue(new nlobjSearchColumn('trandate','estimate')),//报价单日期
					'itemAmount':doResult[i].getValue('total'),//货品总毛额
					'estimateAmount':doResult[i].getValue(new nlobjSearchColumn('amount','estimate')),//报价单金额
					'entitystatus':doResult[i].getValue('entitystatus'),//商机阶段
					'custbody_contract_status':doResult[i].getValue('custbody_contract_status')//合约阶段
				});
			};
		}
		doStart = doStart + 1000;
		doEnd = doEnd + 1000;
	}while(doResult.length > 0);
	//合约漏斗空数据判定
	if(type == 1){
		var emptyFlag = 0;
		for(var i = 0;i < returnData.length;i++){
			if(returnData[i]['custbody_contract_status']){
				emptyFlag = 1;
			}
		}
		if(emptyFlag == 0){
			return [];
		}
	}
	//格式化数据
	var newData = new Array();
	for(var i = 0;i<(returnData.length);i++){
		var dumpId = returnData[i]['id'];
		if(dumpId){
			newData[dumpId] = returnData[i];
		}
	}
	var returnData = new Array();
	for(var i=0;i<(newData.length);i++){//去除null
		if(newData[i]){
			returnData.push(newData[i]);
		}
	}
//	nlapiLogExecution('error','returnData',JSON.stringify(returnData));
	if(!returnData || returnData.length < 1 ){//空数据返回
		return [];
	}else{
		//根据阶段组装商机的漏斗数据
		return getDataByContract(returnData,type);
	}
}

/**
 * 按照合约阶段或商机阶段查找组装商机金额数据
 *@param {number} type类型标识  1:按合约状态划分金额和数量（合约漏斗用）; 0:按商机状态划分金额和数量（销售漏斗用）。
 *@param opData 商机数据
 *@author makaay
 * */
function getDataByContract(opData,type){
	//初始化数据
	var stageData = getStage(type);//阶段
	var len = opData.length;
	var dumpAmount = 0;
	var sumCount = 0;//商机数量
	if(type == 0){//商机漏斗
		for(var i = 0;i<(stageData.length);i++){
			for(var j = 0;j<(opData.length);j++){
				if(stageData[i]['id'] == opData[j]['entitystatus']){//查对应商机阶段的数据
					if(opData[j]['estimateAmount'] > 0){//估价单存在，取估价单金额
						stageData[i]['money'] = stageData[i]['money'] + parseFloat(opData[j]['estimateAmount']);
					}else{//取货品总计毛额
						stageData[i]['money'] = stageData[i]['money'] + parseFloat(opData[j]['itemAmount']);
					}
					stageData[i]['count']++;//商机数量更新
					sumCount++;
				}
			}
		}
	}else if(type == 1){//合约漏斗
		for(var i = 0;i<(stageData.length);i++){
			for(var j = 0;j<(opData.length);j++){
				if(stageData[i]['id'] == opData[j]['custbody_contract_status']){
					stageData[i]['money'] = stageData[i]['money'] + parseFloat(opData[j]['estimateAmount']);
					stageData[i]['count']++;
					sumCount++;
				}
			}
		}
	}
	//计算数量占比
	for(var i = 0;i<(stageData.length);i++){
		stageData[i]['count_percent'] = (stageData[i]['count']/sumCount).toFixed(2);
		stageData[i]['money'] = stageData[i]['money'].toFixed(2);
	}
	return  stageData;
}	


/**
 *获取阶段
 *@param type 0:销售漏斗；1：合约漏斗阶段。
 *
 *@author Makaay
 */
function getStage(type){
	var returnData = new Array();
	var zeroData = new Array();
	if(type == 0){//销售漏斗
		var data = nlapiSearchRecord('customerstatus',null,null,null);
		for(var i=0;i<(data.length);i++){
			var dumpRecord = new nlapiLoadRecord('customerstatus',data[i]['id']);
			if((dumpRecord.getFieldText('stage') == 'Prospect' || dumpRecord.getFieldText('stage') == 'Customer' || dumpRecord.getFieldText('stage') == '潜在客户' || dumpRecord.getFieldText('stage') == '客户')&& dumpRecord.getFieldValue('isinactive') == 'F'){//过滤阶段
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
	return returnData;
}

/**
 * 获取BU间的从属关系
 * 
 * @author Makaay
 * 
 * */
function getBuParentData(){
	var columns = new Array();
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('name');
	var initData = nlapiSearchRecord('department',null,null,columns);
	var departData = new Array();
	for(var i = 0;i<(initData.length);i++){
		var dumpInternalid = initData[i].getValue('internalid');
		var dumpName = initData[i].getValue('name');
		var dumpLevel = dumpName.split(':');
		if(dumpLevel.length == 1){
			var dumpPid = dumpInternalid;
		}else{
			var dumpPid = '0';
		}
		departData.push({
			'id':dumpInternalid,
			'pid':dumpPid,
			'level':dumpLevel.length,
			'name':dumpName
		});
	}
	//格式化
	for(var i = 0;i<(departData.length);i++){
		if(departData[i]['level'] > 1){//忽略第一个顶级BU
			var dumpStrSite = departData[i]['name'].lastIndexOf(':');
			//与上一个BU进行比较
			var subParStr = departData[i]['name'].substring(0,dumpStrSite);//上一级BU名称
			if(departData[i]['level'] != departData[i-1]['level']){//上下级BU
				if(subParStr.trim() == departData[i-1]['name']){
					departData[i]['pid'] = departData[i-1]['pid'];
				}
			}else{//同层级BU
				var dumpUpStrSite = departData[i-1]['name'].lastIndexOf(':');
				var dumpUpBuName =  departData[i-1]['name'].substring(0,dumpUpStrSite);
				if(subParStr.trim() == dumpUpBuName.trim()){
					departData[i]['pid'] = departData[i-1]['pid'];
				}
			}
		}
	}
	for(var i = 0;i<(departData.length);i++){
		if(departData[i]['level'] == 1){
			departData[i]['pid'] = null;
		}
	}
	return departData;
}















