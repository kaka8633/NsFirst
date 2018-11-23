/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       24 Oct 2018     Makaay
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
	if (type == 'create') {
		// 自定义流水号
		var jobId = nlapiGetFieldValue('job');
		var jobData = nlapiLoadRecord('job', jobId);
		var jobCode = jobData.getFieldValue('entityid');

		// nlapiLogExecution('error','jsStatus','start_ok');//debug
		// var buId = nlapiGetFieldValue('custbody_implement_bu');//实施BU id
		// var jobId = nlapiGetFieldValue('job');//项目 id
		// //获取BU信息
		// var buFilters = new Array();
		// buFilters.push(new nlobjSearchFilter('internalid',null,'is',buId));
		// var buColumns = new Array();
		// buColumns.push(new
		// nlobjSearchColumn('custrecord_department_number'));
		// buColumns.push(new nlobjSearchColumn('name'));
		// var buTempData =
		// nlapiCreateSearch('department',buFilters,buColumns).runSearch();
		// var buData = buTempData.getResults(0,1);
		// var buCode =
		// buData[0].getValue('custrecord_department_number');//BU编号
		// //获取项目信息
		// var jobFilters = new Array();
		// jobFilters.push(new nlobjSearchFilter('internalid',null,'is',jobId));
		// var jobColumns = new Array();
		// jobColumns.push(new nlobjSearchColumn('custentity_project_grade'));
		// var jobTempData = nlapiCreateSearch('job',jobFilters,
		// jobColumns).runSearch();
		// var jobData = jobTempData.getResults(0,1);
		// var jobCode = jobData[0].getText('custentity_project_grade');//项目级别编号
		// //生成流水号
		// var returnData = makeSerialNum('contract','3');//estimate流水号
		// //组装合同编码
		// var codeStr =
		// buCode+'.'+(returnData['year']).substring(2)+returnData['num']+jobCode;
		// nlapiLogExecution('error','resultCode',codeStr);
		// 重写编码
		var successId = nlapiSetFieldValue('tranid', jobCode);
		// nlapiLogExecution('error','buCode',buCode);//debug
		nlapiLogExecution('error', 'jobCode', jobCode);// debug
	}
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

}

/**
 * 
 * @param type
 * @deprecated
 * @author haoran yang
 */
function contractChangeDateDep(type) {
	if (type != 'delete') {

		var recordType = nlapiGetRecordType();
		var recordId = nlapiGetRecordId();
		var soRecord = nlapiLoadRecord(recordType, recordId);

		var nowDate = new Date();
		var contractStatus = soRecord
				.getFieldValue('custbody_contract_status2');

		// 当<合同状态>的值为合同拟定 30%时
		if (contractStatus == '7') {
			// 在<预计结束（合同）>字段放入当前日期延后19天
			var endDtae = nlapiAddDays(nowDate, 19);
			var endTime = nlapiDateToString(endDtae);
			soRecord.setFieldValue('custbody_expected_termination_contract',
					endTime);
			// 在<合同变现天数>字段放入19
			soRecord.setFieldValue('custbody_contract_realization_days', '19');

			nlapiSubmitRecord(soRecord);
			// 当<合同状态>的值为审批中 70%时
		} else if (contractStatus == '4') {
			// 在<预计结束（合同）>字段放入当前日期延后17天
			var endDtae = nlapiAddDays(nowDate, 17);
			var endTime = nlapiDateToString(endDtae);
			soRecord.setFieldValue('custbody_expected_termination_contract',
					endTime);
			// 在<合同变现天数>字段放入17
			soRecord.setFieldValue('custbody_contract_realization_days', '17');

			nlapiSubmitRecord(soRecord);
			// 当<合同状态>的值为已寄出 90%时
		} else if (contractStatus == '3') {
			// 在<预计结束（合同）>字段放入当前日期延后7天
			var endDtae = nlapiAddDays(nowDate, 7);
			var endTime = nlapiDateToString(endDtae);
			soRecord.setFieldValue('custbody_expected_termination_contract',
					endTime);
			// 在<合同变现天数>字段放入7
			soRecord.setFieldValue('custbody_contract_realization_days', '7');

			nlapiSubmitRecord(soRecord);
		}

	}
}

/**
 * @author Administrator @ 作者：yuming hu 时间：2018-10-18 描述：商机变现和合约变现控制逻辑 版本：1.0
 */
function controlContact(type) {
	// 合约变现
	var contactFlag = false;

	if (type == 'create') {
		contactFlag = true;
	}

	var currentContactStatus = nlapiGetFieldText('custbody_contract_status2');

	// 获取客制化
	var oldContactStatus = nlapiGetFieldValue('custbody_contract_change_status');

	if (type == 'edit'
			&& (currentContactStatus != oldContactStatus
					|| oldContactStatus == null || oldContactStatus == '')) {

		contactFlag = true;

	}

	if (contactFlag) {
		var recordId = nlapiGetRecordId();

		nlapiSubmitField('opportunity', recordId,
				'custbody_contract_change_status', currentContactStatus, true);

		nlapiSubmitField('opportunity', recordId,
				'custbody_contact_status_change_date', nlapiDateToString(
						new Date(), 'yyyy-MM-dd'), true);
	}
}
