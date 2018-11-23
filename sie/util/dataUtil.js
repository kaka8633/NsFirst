/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       13 Aug 2018     Tingyiyi
 *
 */

/**
 * 订单号自动比编号 规则：YYYYMMDD+2位流水号
 * 
 * @author zyt
 * @param name
 *            订单号字段id
 * @param recordtype
 *            记录类型内部id
 * @returns orderNum 订单编号
 */
function getOrderNumTwo(name, recordtype) {
	var orderNum = -1;
	var todayDate = getDateByTimeZone(8);
	var month;
	var day;
	// 获取当前日期
	if ((todayDate.getMonth()) + 1 < 10) {
		month = '0' + (todayDate.getMonth() + 1);
	} else {
		month = (todayDate.getMonth() + 1);
	}
	if ((todayDate.getDate()) < 10) {
		day = '0' + (todayDate.getDate());
	} else {
		day = (todayDate.getDate());
	}
	var todayStr = (todayDate.getFullYear()) + '' + month + '' + day;
	nlapiLogExecution('ERROR', 'todayStr=', todayStr);
	var filters = [];
	var searchColumns = [];
	searchColumns[0] = new nlobjSearchColumn(name);
	// 进行查询、这个参数表示的是表名的内部ID
	var searchResults = nlapiCreateSearch(recordtype, filters, searchColumns)
			.runSearch();

	var startIndex = 0;
	var result = [];// 已经存在的订单号数组
	do {
		var resultSet = searchResults.getResults(startIndex, startIndex + 1000);
		for (var i = 0; i < resultSet.length; i++) {

			if (resultSet[i].getValue(name)) {
				num = resultSet[i].getValue(name);
				result.push(parseInt(num));

			}

		}
		startIndex += 1000;

	} while (resultSet.length > 0);

	if (result != null && result != '' && result.length > 0) {

		nlapiLogExecution('ERROR', 'result-1', result);
		result.sort(function(x, y) {
			return y - x;
		});

		nlapiLogExecution('ERROR', 'result-2', result);

		var lastDate = result[0]; // 获取数据库中的序列号
		var lastDateT = lastDate + ''; // 将序列号转成字符串
		var lastDateStr = lastDateT.substring(0, lastDateT.length - 2); // 截取年月日

		nlapiLogExecution('ERROR', 'lastDateStr', lastDateStr);
		nlapiLogExecution('ERROR', 'todayStr', todayStr);

		/**
		 * 如果是同1天，则在最大的序列号后加一
		 */
		if (parseInt(lastDateStr) == parseInt(todayStr)) {

			orderNum = (result[0] + 1).toString();
		} else {

			orderNum = (todayStr + '01');

		}

	} else {

		// 如果数据库没有数据，序列号从01开始
		orderNum = (todayStr + '01');

	}

	return orderNum;
}

/**
 * 根据付款方式获取科目
 * 
 * @author zyt
 * @param payment
 *            付款方式id
 * @returns acount 科目id
 */
function getAccount(payment) {
	var account;
	var filter = [];
	filter.push(new nlobjSearchFilter('internalId', null, 'is', payment));
	var searchColumns = [];
	searchColumns[0] = new nlobjSearchColumn('account');
	var searchResults = nlapiSearchRecord('paymentmethod', null, filter,
			searchColumns);
	if (searchResults != null && searchResults.length > 0) {
		account = searchResults[0].getValue('account');
	}
	return account;
}

/**
 * 根据员工id获取员工的子公司id
 * 
 * @author zyt
 * @param empId
 * @returns {Number} 子公司id
 */

function getEmpSubsidiary(empId) {
	var subsidiary = -1;

	var filter = [];
	filter.push(new nlobjSearchFilter('internalId', null, 'is', empId));
	var searchColumns = [];
	searchColumns[0] = new nlobjSearchColumn('subsidiary');
	var searchResults = nlapiSearchRecord('employee', null, filter,
			searchColumns);
	if (searchResults != null && searchResults.length > 0) {
		subsidiary = searchResults[0].getValue('subsidiary');
	}

	return subsidiary;
}

/**
 * 根据员工id获取员工部门的id
 * 
 * @author zyt
 * @param empId
 * @returns {Number}部门id
 */
function getEmpDept(empId) {
	var dept = -1;

	var filter = [];
	filter.push(new nlobjSearchFilter('internalId', null, 'is', empId));
	var searchColumns = [];
	searchColumns[0] = new nlobjSearchColumn('department');
	var searchResults = nlapiSearchRecord('employee', null, filter,
			searchColumns);
	if (searchResults != null && searchResults.length > 0) {
		dept = searchResults[0].getValue('department');
	}

	return dept;
}

/**
 * 根据员工id获取员工的主管
 * 
 * @author zyt
 * @param empId
 * @returns {Number}部门id
 */
function getEmpManager(empId) {
	var manager = -1;

	var filter = [];
	filter.push(new nlobjSearchFilter('internalId', null, 'is', empId));
	var searchColumns = [];
	searchColumns[0] = new nlobjSearchColumn('supervisor');
	var searchResults = nlapiSearchRecord('employee', null, filter,
			searchColumns);
	if (searchResults != null && searchResults.length > 0) {
		manager = searchResults[0].getValue('supervisor');
	}

	return manager;
}

/**
 * 通过税类代码获取税率 add by zyt@sie 20180824
 * 
 * @param id
 * @returns {Number}
 */
function getTaxRate(id) {
	var rate;
	var filterArray = [];
	filterArray.push(new nlobjSearchFilter('internalId', null, 'is', id));
	var qryFieldArray = [];
	qryFieldArray[0] = new nlobjSearchColumn('rate');
	var list = nlapiSearchRecord(null, 'customsearch_tax_code_view',
			filterArray, qryFieldArray);
	if (list != null) {
		rate = list[0].getValue('rate');
	}
	console.info('rate' + typeof (rate));
	rate = rate.substring(0, rate.length - 1);
	return rate / 100;
}

/**
 * 设置费率 说明： 1、毛额及含税总额a 2、数量b 3、含税单价c=a/b 4、不含税总额d=a/(1+税率) 5、费率即不含税单价e=d/b
 * modify1.0 修改不显示费率
 */
function setAmountRef(type) {

	var taxCode = nlapiGetCurrentLineItemValue(type, 'taxcode');// 税类代码

	var grossAmt = nlapiGetCurrentLineItemValue(type, 'grossamt');// 毛额
	var quantity = nlapiGetCurrentLineItemValue(type, 'quantity');// 数量

	var unitPrice = null;

	if (quantity != 0) {
		unitPrice = grossAmt / quantity;
	}

	if (grossAmt) {
		nlapiSetCurrentLineItemValue(type, 'custcol_total_amount', grossAmt);
		nlapiSetCurrentLineItemValue(type, 'custcol_unit_price', unitPrice
				.toFixed(2));
	}

	if (taxCode) {

		var taxPercentage = getTaxRate(taxCode);// 获取税率

		// 不含税金额
		var totalAmount = grossAmt / (1 + taxPercentage);
		nlapiSetCurrentLineItemValue(type, 'amount', totalAmount.toFixed(2));

		// 设置税额
		var taxTotalAmount = grossAmt - totalAmount;
		nlapiSetCurrentLineItemValue(type, 'tax1amt', taxTotalAmount.toFixed(6));

		// 设置费率
		nlapiSetCurrentLineItemValue(type, 'rate', (totalAmount / quantity)
				.toFixed(2));

	}
}

/**
 * 获取自定义列表的value和id
 * 
 * @author zyt
 * @param list
 * @returns {Array}
 */
function searchListInfo(list) {
	var result = [];
	var filters = [];
	filters[0] = new nlobjSearchFilter('isinactive', null, 'is', 'false');
	var searchColumns = [];
	searchColumns[0] = new nlobjSearchColumn('internalId');
	searchColumns[1] = new nlobjSearchColumn('name');
	var searchResults = nlapiSearchRecord(list, null, filters, searchColumns);
	if (searchResults != null && searchResults.length > 0) {
		for (var i = 0; i < searchResults.length; i++) {
			var json = {};
			var internalId = searchResults[i].getValue('internalId');
			var name = searchResults[i].getValue('name');
			json.internalId = internalId;
			json.name = name;
			result.push(json);
		}

	}
	return result;
}

/**
 * 根据内部ID获取字段值
 * 
 * @param internalId
 * @param recordType
 * @param fileName
 * @returns
 */
function getFieldMeaningById(recordType, internalId, fileName) {
	var obj = nlapiLoadRecord(recordType, internalId);
	var meaning = obj.getFieldValue(fileName);
	return meaning;
}

/**
 * 根据部门ID获取部门名称
 * 
 * @param deptId
 * @returns
 */
function getDeptNameById(deptId) {
	var deptName;
	var filterArray = [];
	filterArray.push(new nlobjSearchFilter('internalId', null, 'is', deptId));
	var qryFieldArray = [];
	qryFieldArray[0] = new nlobjSearchColumn('custrecord_dept_name');
	var list = nlapiSearchRecord('department', null, filterArray, qryFieldArray);
	if (list != null) {
		deptName = list[0].getValue('custrecord_dept_name');
	}
	return deptName;
}

/**
 * 根据部门名称获取部门ID
 * 
 * @param deptName
 * @returns
 */
function getDeptIdByName(deptName) {
	var deptId;
	var filterArray = [];
	filterArray.push(new nlobjSearchFilter('custrecord_dept_name', null, 'is',
			deptName));
	var qryFieldArray = [];
	qryFieldArray[0] = new nlobjSearchColumn('internalId');
	var list = nlapiSearchRecord('department', null, filterArray, qryFieldArray);
	if (list != null) {
		deptId = list[0].getValue('internalId');
	}
	return deptId;
}

/**
 * 计算流水号,UE用
 * 
 * @author Makaay
 * @param type
 *            项目类型
 * @param num
 *            流水号位数
 * 
 * @return e.g [{"num":"00012","year":2018}]
 */
function makeSerialNum(type, num) {
	var yearNow = new Date().getFullYear();
	yearNow = yearNow.toString();
	// 当前年份的项目
	var filters = new Array();
	filters.push(new nlobjSearchFilter('custrecord_create_year', null, 'is',yearNow));
	filters.push(new nlobjSearchFilter('custrecord_' + type + '_num', null,'isnotempty'));
	var columns = new Array();
	columns.push(new nlobjSearchColumn('custrecord_' + type + '_num'));
	columns.push(new nlobjSearchColumn('internalid'));
	columns.push(columns[1].setSort());
	var searchResults = nlapiCreateSearch('customrecord_auto_serialnum_data',filters, columns).runSearch();
	var resultStart = 0;
	var resultEnd = 1000;
	var tempData = new Array();
	do {
		tempResult = searchResults.getResults(resultStart, resultEnd);
		if(tempResult.length > 0){
			tempData = tempData.concat(tempResult);
		}
		resultStart = resultStart + 1000;
		resultEnd = resultEnd + 1000;
	} while (tempResult.length > 0);
	if (tempData.length == 0) {// 不存在流水号，该年度第一条数据
		lastNum = '0';
	} else {
		if (tempData.length > 1) {// 避免pop()报错
			var lastNum = tempData.pop().getValue('custrecord_'+type+'_num');// last流水号
		} else {
			var lastNum = tempData[0].getValue('custrecord_'+type+'_num');// last流水号
		}
	}
	// console.log('lastNum='+lastNum);//debug
	// 更新流水号数据
	var record = nlapiCreateRecord('customrecord_auto_serialnum_data');
	record.setFieldValue('name', 'name');
	record.setFieldValue('custrecord_create_year', yearNow);
	record.setFieldValue('custrecord_' + type + '_num', (Number(lastNum) + 1).toString());
	var id = nlapiSubmitRecord(record, true);
	// console.log('saveRetuenId='+id);//debug
	// 流水号保留位数
	var zeroNum = PrefixInteger(Number(lastNum) + 1, num);
	return {
		'num' : zeroNum,
		'year' : yearNow
	};
}
// 数字补0,Makaay
function PrefixInteger(num, length) {
	return (num / Math.pow(10, length)).toFixed(length).substr(2);
}

/**
 * 给资源详细信息界面带出人员信息
 * 
 * @author zyt
 * @param empId
 * @returns {___anonymous1144_1145}
 */
function getResourceEmpInfo(empId) {
	var empJson = {};

	var emp = nlapiLoadRecord('employee', empId);

	empJson.post = emp.getFieldValue('title');// 岗位
	empJson.job = emp.getFieldValue('custentity_job_title');// 职称
	empJson.power = emp.getFieldValue('custentity_ability_level');// 能力

	nlapiLogExecution('ERROR', 'empJson', JSON.stringify(empJson));
	return empJson;
}
