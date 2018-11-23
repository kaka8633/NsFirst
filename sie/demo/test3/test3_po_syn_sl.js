/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 Aug 2018     ZYT 接口调用
 *
 */

/**
 * @param {nlobjRequest}
 *            request Request object
 * @param {nlobjResponse}
 *            response Response object
 * @returns {Void} Any output is written via response object
 */
// 要访问的URL
var gurl = 'https://5045270-sb1.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=189&deploy=1';
function suitelet(request, response) {

	// 头信息
	var postdata = '{ "otherrefnum":"001","entity":"276","employee":"804","status":"1","date":"2018-08-21","memo":"ZYT","line":[{"item":"10","amount":"100","quantity":"100","memo":"行1"},{"item":"10","amount":"101","quantity":"101","memo":"行2"}]}';
	var headers = new Array();
	headers['Content-Type'] = 'application/json';
	// headers['Accept'] = 'application/json';
	// headers['User-Agent-x'] = 'SuiteScript-Call';
	headers['Authorization'] = 'NLAuth nlauth_account=5045270_SB1, nlauth_email=zhangyiting1@chinasie.com, nlauth_signature=loveNetSuite1314, nlauth_role=1010';

	var rsp = nlapiRequestURL(gurl, postdata, headers);// 返回报文
	var body = rsp.getBody();// 返回报文内容

	response.writeLine(body);
}
