/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       15 Aug 2018     ZYT   测试区块
 *
 */

/**
 * @param {nlobjPortlet}
 *            portletObj Current portlet object
 * @param {Number}
 *            column Column position index: 1 = left, 2 = middle, 3 = right
 * @returns {Void}
 */
function portletName(portletObj, column) {

	portlet.setTitle('提交离职申请表');// 区块标题

	// portlet.setSubmitButton(url, '新建离职申请');

	// a标签跳转
	// var fld1 = portlet.addField('custpage_view', 'inlinehtml');
	// fld1.setDefaultValue('<a
	// href="https://system.netsuite.com/app/common/custom/custrecordentry.nl?rectype=88&id=2"
	// target="_blank">查看离职申请</a>');

	// 新建离职申请按钮
	var submitDiss = portlet.addField('custpage_submit_dismiss', 'inlinehtml');

	/**
	 * -webkit-border-radius:按钮四角的弧度 position:absolute:设置按钮位置为绝对位置 top:设置按钮据顶端距离
	 * width，height：设置按钮的长宽 background-color：设置按钮背景色 color：按钮文字颜色
	 * formtarget='_blank 设置区块不被刷新
	 */

	submitDiss
			.setDefaultValue("<button style='-webkit-border-radius:5px;position:absolute;top:50px;width:110px;height:30px;background-color:#2483F5;color:white;font-weight:bold' onclick='submitDiss()'formtarget='_blank'>新建离职申请</button>");

	// 查看离职申请按钮
	var viewDiss = portlet.addField('custpage_view_dismiss', 'inlinehtml');

	viewDiss
			.setDefaultValue("<button style='-webkit-border-radius:5px;position:absolute;top:50px;width:110px;height:30px;background-color:#2483F5;color:white;font-weight:bold' onclick='viewDiss()' formtarget='_blank'>查看离职申请</button>");

	portlet.setScript('customscript_test1_cs');
}
