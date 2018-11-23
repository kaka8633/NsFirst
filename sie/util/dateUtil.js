/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       13 Aug 2018     ZYT  常用时间方法工具包
 *
 */


/**
 * 判断两个时间区间是否有交叉部分
 * 
 * @param as
 *            string A区间开始日期
 * @param ae
 *            string A区间结束日期
 * @param bs
 *            string B区间开始日期
 * @param be
 *            string B区间结束日期
 * @returns boolean 是否有交叉
 */
function isDateCross(aStart, aEnd, bStart, bEnd) {
	var flag;
	var as = nlapiStringToDate(aStart, 'datetime');
	var ae = nlapiStringToDate(aEnd, 'datetime');
	var bs = nlapiStringToDate(bStart, 'datetime');
	var be = nlapiStringToDate(bEnd, 'datetime');

	if (Math.max(as, bs) <= Math.min(ae, be)) {
		flag = true;
	} else {
		flag = false;
	}
	return flag;
}

/**
 * 日期范围验证：开始日期必须早于结束日期
 * 
 * @param startDateStr
 * @param endDateStr
 * @returns true:验证通过，false：验证不通过
 */
function dateRangeVaild(startDateStr, endDateStr) {
	var startDate = nlapiStringToDate(startDateStr, 'datetime');
	var endDate = nlapiStringToDate(endDateStr, 'datetime');
	if (startDate > endDate) {
		return false;
	} else {
		return true;
	}
}

/**
 * 获取该时区的当前时间
 * 
 * @param timeZone：时区，东为正，西为负
 * @returns Date
 */
function getDateByTimeZone(timeZone) {
	var d = new Date();
	var localTime = d.getTime();
	var localOffset = d.getTimezoneOffset() * 60000;
	var utc = localTime + localOffset;
	var offset = timeZone;
	var calctime = utc + (3600000 * offset);
	var nd = new Date(calctime);
	return nd;
}

/**
 * 获取当前时间，以字符串格式返回
 * 
 * @returns 
 */
function getCurrentTimeStr() {
	var d = new Date();
	var a = d.getFullYear() + (d.getMonth() + 1).toString()
			+ d.getDate().toString() + d.getHours().toString()
			+ d.getMinutes().toString() + d.getSeconds().toString()
			+ d.getMilliseconds().toString();
	return a;
}

/**
 * 获得当前时间 YYYYMMDDHHMISS
 * 
 * @returns
 */
function getCurruentTime() {
	var date = getDateByTimeZone(8);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = month < 10 ? "0" + month : month;
	var day = date.getDate();
	day = day < 10 ? "0" + day : day;
	var hour = date.getHours();
	hour = hour < 10 ? "0" + hour : hour;
	var minute = date.getMinutes();
	minute = minute < 10 ? "0" + minute : minute;
	var second = date.getSeconds();
	second = second < 10 ? "0" + second : second;
	return (year + month + day + hour + minute + second);
}

/**
 * 获取当月第一天的日期
 * 
 * @returns {getDateByTimeZone}
 */
function getCurrentMonthFirstDay() {
	var current = getDateByTimeZone(8);
	current.setDate(1);
	return current;
}

/**
 * 获取当月最后一天的日期
 * 
 * @returns {Date}
 */
function getCurrentMonthLastDay() {
	var current = getDateByTimeZone(8);
	var currentMonth = current.getMonth();
	var nextMonth = ++currentMonth;

	var nextMonthDayOne = new Date(current.getFullYear(), nextMonth, 1);

	var minusDate = 1000 * 60 * 60 * 24;

	return new Date(nextMonthDayOne.getTime() - minusDate);
}

/**
 * 获取日期所属期间的内部ID
 * 
 * @param theDate
 * @returns {Number}
 */
function getPeriod(theDate) {
	var periodId = -1;
	try {

		var filterArray = [];
		filterArray.push(new nlobjSearchFilter('startdate', null, 'onorbefore',
				theDate));
		filterArray.push(new nlobjSearchFilter('enddate', null, 'onorafter',
				theDate));
		filterArray.push(new nlobjSearchFilter('isyear', null, 'is', 'F'));
		filterArray.push(new nlobjSearchFilter('isquarter', null, 'is', 'F'));
		var qryFieldArray = [];
		qryFieldArray[0] = new nlobjSearchColumn('internalId');

		var list = nlapiSearchRecord('accountingperiod', null, filterArray,
				qryFieldArray);
		if (list != null) {
			periodId = list[0].getValue('internalId');
		}
	} catch (e) {
		periodId = -1;
	}

	return periodId;
}

/**
 * 验证该日期所在期间是否关闭
 * 
 * @param accountDate
 * @returns
 */
function periodValid(accountDate) {
	// 根据时间去查询对应的期间状况
	var periodId;
	var filters = [];
	filters.push(new nlobjSearchFilter('startdate', null, 'onorbefore',
			accountDate));
	filters.push(new nlobjSearchFilter('enddate', null, 'onorafter',
			accountDate));
	filters.push(new nlobjSearchFilter('isyear', null, 'is', "F"));
	filters.push(new nlobjSearchFilter('isquarter', null, 'is', "F"));
	// 定义搜索的列：查询结果需要展示的列（表的列名内部ID）
	var searchColumns = [];
	searchColumns[0] = new nlobjSearchColumn('alllocked');
	searchColumns[1] = new nlobjSearchColumn('periodname');
	searchColumns[2] = new nlobjSearchColumn('internalId');
	// 进行查询、这个参数表示的是表名的内部ID
	var searchResults = nlapiSearchRecord('accountingperiod', null, filters,
			searchColumns);
	if (searchResults && searchResults.length > 0) {
		var alllocked = searchResults[0].getValue('alllocked');
		if (alllocked == 'T') {
			return "F";
		} else {
			periodId = searchResults[0].getValue('internalId');
		}
	} else {
		return "E";
	}
	return periodId;
}