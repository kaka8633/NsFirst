/**
 * Module Description
 * 
 * Version Date Author Remarks 1.00 11 Oct 2018 zyt
 * 
 */
var outArr = new Array();// 超出的工时数组
var allocated = new Array();// 未超出的工时数组
var empId = ''; // 获取员工工时的id
var currentDate = new Date();// 当前时间对象
var currentYear = currentDate.getFullYear();// 获取当前年份
var currentMonth = currentDate.getMonth();// 获取当前月份
/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Access mode: create, copy, edit 初始化时第一次渲染
 * @returns {Void}
 */
function clientPageInit(type) {

	updateDate(currentMonth, $('#project_timeInfo'));

	bindEvent();

	getId();

	initDate();
}

function getId() {
	var href = location.href;
	var id = href.split('?')[1].split('&');
	id = id[id.length - 1].split('=');
	empId = id[id.length - 1];
}
/**
 * 
 * @param y
 *            获取数据年份
 * @param m
 *            获取数据月份
 * @param emp
 *            获取数据员工id
 */
function getData(y, m, emp) {
	var d = new Date(y, m, 0);
	var s = y + '-' + m + '-1';
	var e = y + '-' + m + '-' + d.getDate();

	// s = nlapiDateToString(nlapiStringToDate(s, 'datetime'),'date');
	// e = nlapiDateToString(nlapiStringToDate(e, 'datetime'),'date');
	// console.info('111='+s);
	// console.info('122='+e);
	
	var list = getTimeResult(s, e, empId);// 根据7.5小时分组后的员工分配时间数组

	console.info('s=' + s);
	console.info('e=' + e);
	console.info('empId=' + empId);
	console.info('list=' + JSON.stringify(list));

	if (list) {
		var data = JSON.parse(JSON.stringify(list));
		outArr = data['aryOver'];
		allocated = data['ary'];
	}

}
/**
 * 初始化获取数据并渲染
 */
function initDate() {
	getData(currentYear, currentMonth + 1, empId);
	renderList();
}
/**
 * 
 * @param y
 *            获取数据年份
 * @param m
 *            获取数据月份
 * @param emp
 *            获取数据员工id
 */
function renderData(y, m, emp) {
	var a = y, b = m, c = emp;
	getData(a, b, c);
	renderList();
}
/**
 * 渲染工时数据
 */
function renderList() {
	$.each($('#data_content li'), function() {
		var dates = $(this).attr('data-time');
		var out = hasdate(outArr, dates);
		var located = hasdate(allocated, dates);
		if (out >= 0) {
			$(this).addClass('outHours').append(
					"<span class='week_hours'>" + outArr[out]['time'] + 'h'
							+ "</span>");
		} else if (located >= 0) {
			$(this).addClass('locatedHours').append(
					"<span class='week_hours'>" + allocated[located]['time']
							+ 'h' + "</span>");
		}
		;
	});
}
/**
 * 
 * @param obj
 *            需要渲染的数组
 * @param d
 *            日历中对应的日期
 * @returns {___anonymous2014_2018} 当数组中有对应值返回index
 */
function hasdate(obj, d) {
	var len = obj.length;
	if (len > 0) {
		for (var i = 0; i < len; i++) {
			var t = obj[i].date;
			if (t == d) {
				return i;
			}
			;
		}
		;
	}
	return -1;
}
/**
 * 绑定点击上一个月下一个月事件
 */
function bindEvent() {
	$(".prev").click(function() {
		updateDate(--currentMonth, $('#project_timeInfo'));
		renderData($('#year').text(), $('#month').text(), empId);
	});
	$(".next").click(function() {
		updateDate(++currentMonth, $('#project_timeInfo'));
		renderData($('#year').text(), $('#month').text(), empId);
	});
}
/**
 * 
 * @param m
 *            需要渲染日历的月份
 * @param obj
 *            日历容器
 */
function updateDate(m, obj) {// m = mounth obj = $project_timeInfo
	var activeDate = new Date(currentYear, m, 1); // 外面传进来的不断变化的日期对象
	var year = activeDate.getFullYear();
	var month = activeDate.getMonth();
	obj.find('#year').text(year).end().find('#month').text(month + 1);
	var $calendarList = obj.find($("#data_content"));
	$calendarList.html("");
	var n = 1 - activeDate.getDay();
	if (n == 1) {
		n = -6;
	}
	activeDate.setDate(n);
	for (var i = 0; i < 42; i++) {
		var date = activeDate.getDate();
		$calendarList.append('<li>' + date + '</li>');
		var $li = $calendarList.find("li");
		if (activeDate.getMonth() == month) {
			$li.eq(i).css("color", "#A8A5A6");
		} else {
			$li.eq(i).html('');
		}
		$li.eq(i).attr('data-time',
				year + "-" + (activeDate.getMonth() + 1) + "-" + date);
		activeDate.setDate(date + 1);
	}
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @returns {Boolean} True to continue save, false to abort save
 */
function clientSaveRecord() {

	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @param {String}
 *            name Field internal id
 * @param {Number}
 *            linenum Optional line item number, starts from 1
 * @returns {Boolean} True to continue changing field value, false to abort
 *          value change
 */
function clientValidateField(type, name, linenum) {

	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @param {String}
 *            name Field internal id
 * @param {Number}
 *            linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function clientFieldChanged(type, name, linenum) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @param {String}
 *            name Field internal id
 * @returns {Void}
 */
function clientPostSourcing(type, name) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Void}
 */
function clientLineInit(type) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Boolean} True to save line item, false to abort save
 */
function clientValidateLine(type) {

	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Void}
 */
function clientRecalc(type) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Boolean} True to continue line item insert, false to abort insert
 */
function clientValidateInsert(type) {

	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Boolean} True to continue line item delete, false to abort delete
 */
function clientValidateDelete(type) {

	return true;
}
