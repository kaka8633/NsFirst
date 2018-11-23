/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       17 Sep 2018     zyt 资源分配CS
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Access mode: create, copy, edit
 * @returns {Void}
 */
var gurl = nlapiResolveURL('SUITELET', 'customscript_ra_showdate_sl',
		'customdeploy_ra_showdate_sl');
function clientPageInit(type) {
	// alert('测试资源分配');
	// nlapiSetFieldValue('allocationresource', 6, true, true);

	addSpan();// 添加日历框和搜索框图标

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

/**
 * 弹出日历框
 */
function showdate() {

	// alert(11111);
	// if (window.showModalDialog != null)// IE判断
	// {
	// result = window
	// .showModalDialog(
	// gurl,
	// '',
	// "dialogWidth:490px;dialogHeight:317px;status:no;help:no;scrolling=yes;scrollbars=no;center:yes");
	//
	// if (result != null && result != '') {
	// //
	// }
	//
	// } else {
	this.returnAction = function(strResult) {
		if (strResult != null) {
			if (strResult != null && strResult != '') {
				//
			}
		}
	}

	var iWidth = 720; // 弹出窗口的宽度;
	var iHeight = 600; // 弹出窗口的高度;
	// 获得窗口的垂直位置
	var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
	// 获得窗口的水平位置
	var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;

	var empId = nlapiGetFieldValue('allocationresource');// 获取资源id
	if (empId) {
		window
				.open(
						gurl + '&empid=' + empId,
						"",
						'height=317,innerHeight=317,width=490,innerWidth=490,top='
								+ iTop
								+ ',left='
								+ iLeft
								+ ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no')

	} else {
		alert('请先选择资源！');
	}

	// }
}

/**
 * 添加日历框和搜索框图标
 */
function addSpan() {

	$('#allocationresource_fs')
			.append(
					'<span  class="field_widget_pos uir-field-widget"><a onclick="showdate();" onkeypress="event.cancelBubble = true; return true;"class="smalltextul field_widget i_calendar"></a></span>')

	$('#allocationresource_fs')
			.append(
					'<span  class="uir-field-widget"><a onclick="goResource();" class="rndbuttoninpt bntBgt"  onkeypress="event.cancelBubble = true; return true;"style="background: transparent url(/uirefresh/img/find.png) center 50% no-repeat !important;"></a></span>')

}

/**
 * 跳转到资源管理器界面
 */
function goResource() {
	window
			.open('https://system.netsuite.com/app/site/hosting/scriptlet.nl?script=41&deploy=1&compid=5045270_SB1&whence=');
}