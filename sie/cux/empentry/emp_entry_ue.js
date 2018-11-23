/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       15 Oct 2018     zyt  员工预入职申请表UE
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm}
 *            form Current form
 * @param {nlobjRequest}
 *            request Request object
 * @returns {Void}
 */
function userEventBeforeLoad(type, form, request) {

	var role = nlapiGetContext().getRoleId();
	var approveStatus = nlapiGetFieldValue('custrecord_employee_approve_status');
	
	if (approveStatus != '新建' && type == 'edit') {
		nlapiSetRedirectURL('RECORD', nlapiGetRecordType(), nlapiGetRecordId(),
				false);
	}

	nlapiLogExecution('ERROR', 'role', role);
	// it管理员能看到已准备按钮
	 if (approveStatus == '提交' && role == 'customrole_it_admin') {
		form.setScript('customscript_emp_entry_cs');
		form.addButton('custpage_prepare_btn', '已准备', 'showPrepare()');

	 }

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Operation types: create, edit, delete, xedit approve, reject,
 *            cancel (SO, ER, Time Bill, PO & RMA only) pack, ship (IF)
 *            markcomplete (Call, Task) reassign (Case) editforecast (Opp,
 *            Estimate)
 * @returns {Void}
 */
function userEventBeforeSubmit(type) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Operation types: create, edit, delete, xedit, approve,
 *            cancel, reject (SO, ER, Time Bill, PO & RMA only) pack, ship (IF
 *            only) dropship, specialorder, orderitems (PO only) paybills
 *            (vendor payments)
 * @returns {Void}
 */
function userEventAfterSubmit(type) {

	var context = nlapiGetContext();
	var name = context.getUser();
	var email = context.getEmail();

	var approveStatus = nlapiGetFieldValue('custrecord_employee_approve_status');// 审批状态

	if (approveStatus == '提交') {
		nlapiLogExecution('ERROR', '发邮件', '11');

		var unit = nlapiGetFieldText('custrecord_employee_business_unit');// 业务单元
		var date = nlapiGetFieldValue('custrecord_employee_date');// 预入职时间
		var empName = nlapiGetFieldValue('custrecord_employee_name_forst');// 姓名
		var gender = nlapiGetFieldText('custrecord_employee_gender');// 性别
		var phone = nlapiGetFieldValue('custrecord_employee_phone');// 手机号码
		var station = nlapiGetFieldValue('custrecord_employee_station');// 岗位
		var resName = nlapiGetFieldText('custrecord_employee_entry_name');// 录入人姓名

		var html = '<html><table style="width:594px;height:110px">'
				+ '<tr><td style="width:28%">姓名</td><td style="width:22%">性别</td><td style="width:25%">手机号码</td><td style="width:25%">预计到岗时间</td></tr>'
				+ '<tr>' + '<td>'	+ empName	+ '</td>'	+ '<td>'	+ gender	+ '</td>'	+ '<td>'	+ phone	+ '</td>'	+ '<td>'	+ date	+ '</td>'	+ '</tr>'
				+ '<tr><td>所属业务单元</td><td>岗位</td><td>录入人姓名</td><td>&nbsp;</td></tr>'
				+ '<tr>' + '<td>'	+ unit	+ '</td>'	+ '<td>'	+ station		+ '</td>'		+ '<td>'	+ resName + '</td>' + '<td>&nbsp;</td></tr>' + 
				'</table></html>'
		// 发送邮件
		var record = {};
		record[nlapiGetRecordType()] = nlapiGetRecordId();
		var sendEmp = [{'name':'4','email':'99982547@qq.com'},{},{}];
		for(var i = 0; i < sendEmp.length; i ++){
			nlapiSendEmail(sendEmp[i]['name'],sendEmp[i]['email'],'【员工预入职通知】' + unit + '将于' + date
					+ '办理入职手续，请您悉知 !', '预计' + date + ' ' + unit
					+ '将新入职一名新员工，详细信息如下：' + html + ' ' + resName + ' '
					+ nlapiDateToString(new Date(), 'YYYY-MM-DD'), null, null,
					record, null, true);
		}
	}
}
