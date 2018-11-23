/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       17 Oct 2018     Makaay
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response){
	//test
	// validateDepart('5','104','10');
	var company = request.getParameter('company');
	if(company){//校验公司与部门，公司与地点，是否搭配
		var department = request.getParameter('department');
		var place = request.getParameter('place');
		var res = validateDepart(company,department,place);
		response.write(res);
		return;
	}
	var bu = request.getParameter('bu');
	nlapiLogExecution('error','buParam',bu);
	var exports = returnEmpData(bu);//it管理员与办公室秘书
	response.write(JSON.stringify(exports));
}

/**
 *返回人员信息 
 * @param bu BU的id
 * @author Makaay
 * 
 */
function returnEmpData(bu){
	var officerData = getEmpData('customsearch_entry_approver_office');//办公室秘书
	var hrData = getEmpData('customsearch_entry_approver_hr');//人事经理	
	var itData = getEmpData('customsearch_entry_approver_it');//it管理员
	if(bu){//查找BU负责人信息
		var buData = getBuManager(bu)
	}else{
		var buData = [];//BU负责人留空
	}
	//组装返回数据
	var returnData = new Array();
	returnData.push(officerData);
	returnData.push(buData);
	returnData.push(hrData);
	returnData.push(itData);
	nlapiLogExecution('error','lastData',JSON.stringify(returnData));//debug
	return returnData;
}



/**
 *获取人员的信息
 * @param type  人员类型，已保存的搜索id
 * @author Makaay
 * 
 */
function getEmpData(type){
	var empSearch = nlapiLoadSearch(null,type);
	var newSearch = nlapiCreateSearch(empSearch.getSearchType(), empSearch.getFilters(), empSearch.getColumns());
	var searchResults = newSearch.runSearch();
	var doResult = searchResults.getResults(0,1000);
	var returnData = new Array();//定义返回数据
	for(var i = 0;i<doResult.length;i++){
		returnData.push({
			'id':doResult[i].getValue('internalid'),
			'name':doResult[i].getValue('altname'),
		});
	}
	return returnData;
//	nlapiLogExecution('error',type,JSON.stringify(returnData));//debug
}



/**
 * 根据BU获取bu负责人信息
 * @param bu BU的id
 * @author Makaay
 * 
 */
function getBuManager(bu){
	var filters = new Array();
	filters.push(new nlobjSearchFilter('internalid',null,'is',bu));
	var empSearch = nlapiLoadSearch(null,'customsearch_entry_approver_manager');
	var newSearch = nlapiCreateSearch(empSearch.getSearchType(), empSearch.getFilters(), empSearch.getColumns());
	newSearch.addFilters(filters);
	var searchResults = newSearch.runSearch();
	var doResult = searchResults.getResults(0,1000);
	var returnData = new Array();//定义返回数据
	for(var i = 0;i<doResult.length;i++){
		returnData.push({
			'id':doResult[i].getValue('custrecord_department_head'),
			'name':doResult[i].getText('custrecord_department_head'),
		});
	}
	nlapiLogExecution('error','ManageData',JSON.stringify(returnData));//debug
	return returnData;
}

/** 
 * 校验公司与部门，公司与地点，是否搭配
 * @author Makaay
 * 2018-11-1
 * @param  [company] 子公司id
 * @param  [department] 部门id
 * @param  [department] 地点id 
 * @return 0:不匹配。1：匹配。
 * 
*/
function  validateDepart(company,department,location){
	//校验公司与部门
	if(department){
		var departmentData = nlapiLoadRecord('department',department);
		var companyId = departmentData.getFieldValue('subsidiary');
		if(company == companyId){//部门的所属公司id与公司id不符
			nlapiLogExecution('error','validateDepart','department right');
			return '1';
		}else{
			nlapiLogExecution('error','validateDepart','department error');
			return '0';
		}
	}
	//校验公司与地点
	if(location){//办公地点与所选公司不符
		var locationData = nlapiLoadRecord('location',location);
		var companyId = locationData.getFieldValue('subsidiary');
		if(company == companyId){
			nlapiLogExecution('error','validateDepart','location right');
			return '1';
		}else{
			nlapiLogExecution('error','validateDepart','location error');
			return '0';
		}
	}
}



