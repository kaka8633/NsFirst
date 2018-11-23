/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       29 Oct 2018     zyt 测试SL
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

	// response.writeLine('hello 刚哥~');

//	var form = nlapiCreateForm('开心', true);// 标题
//
//	form.addField('custpage_happy', 'text', '今天开心');
//	
//	form.addField('custpage_hi', 'select', '丽丽','employee');
//	
//	response.writePage(form);
	
	 response.writeLine('<html><p>hello</p><p>刚哥~</p><html>');
}

