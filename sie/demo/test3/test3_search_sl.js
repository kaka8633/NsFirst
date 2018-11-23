/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Aug 2018     Tingyiyi
 *
 */

/**
 * @param {nlobjRequest}
 *            request Request object
 * @param {nlobjResponse}
 *            response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response) {
	// response.write('<html>');
	// response.write('<body>');
	// response.write('<font size="10" color="red">Hello World</font>');
	// response.write('</body>');
	// response.write('</html>');

}

/**
 * 输出界面 add by zyt@sie 20180820
 */
function initUI() {

	// 创建一个FORM
	var form = nlapiCreateForm('采购订单界面-Suitelet');

	// 添加查询条件
	form.addFieldGroup('custpage_search_group', '筛选条件');

	// 添加员工到筛选条件
	form.addField('custpage_employee', 'select', '员工', 'employee',
			'custpage_search_group');
	// 添加状态到筛选条件
	form.addField('custpage_status', 'select', '状态', '',
			'custpage_search_group');
	// 添加供应商到筛选条件
	form.addField('custpage_vendor', 'select', '供应商', 'vendor',
			'custpage_search_group');
	
	
}