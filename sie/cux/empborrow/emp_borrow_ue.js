/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       11 Sep 2018     zyt 借款申请单UE
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

	// 设置订单号不可编辑,创建的时候设置默认值
	if (type == 'create') {
		nlapiSetFieldValue('name', '待生成', true, true);
	} else if (type == 'view') {
		//
	} else if (type == 'edit') {
		// 已支付和已还款订单不允许编辑，状态为已取消状态订单不允许编辑
		if (nlapiGetFieldValue('custrecord_ebh_payment_status') == '已支付'
				|| nlapiGetFieldValue('custrecord_ebh_repayment_status') == '已还款'
				|| nlapiGetFieldValue('custrecord_ebh_status') == '5') {
			nlapiSetRedirectURL('RECORD', nlapiGetRecordType(),
					nlapiGetRecordId(), false);
		}
	}

	nlapiGetField('name').setDisplayType('disabled');//禁用名称字段
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

	// 订单号自动生成
	var ctx = nlapiGetContext().getExecutionContext();
	nlapiLogExecution('ERROR', 'userEventAfterSubmit', type + '--' + ctx);

	var rectype = nlapiGetRecordType();
	var internalid = nlapiGetRecordId();

	nlapiLogExecution('ERROR', 'internalid=', internalid);

	var payStatus = nlapiGetFieldValue('custrecord_ebh_payment_status');// 获取支付状态
	var repayStatus = nlapiGetFieldValue('custrecord_ebh_repayment_status');// 获取还款状态
	// 当为界面录单为接口生成时
	if (ctx == 'userinterface' || ctx == 'userevent') {

		// 只在界面创建时执行
		if (type == 'create') {

			// 订单号自动生成
			var orderNum = getOrderNumTwo('name', rectype);

			nlapiLogExecution('ERROR', '订单号=', orderNum);
			nlapiSubmitField(rectype, internalid, 'name', orderNum, true);

		} else if (type == 'edit') {
			// 如果支付状态为已支付且没有对应的支票，创建支票
			if (payStatus == '已支付') {
				var checkId = nlapiGetFieldValue('custrecord_ebh_invoice');
				if (!checkId) {
					nlapiLogExecution('ERROR', 'create-begin', checkId);
					var checkId = createCheck(internalid);
					nlapiLogExecution('ERROR', 'create-end', checkId);
					// 把关联的支票id写到借款申请单上
					nlapiSubmitField(rectype, internalid,
							'custrecord_ebh_invoice', checkId);
				}
			}

			// 如果还款状态为已支付且没有对应的 存款，创建存款
			if (repayStatus == '已还款') {
				var depositId = nlapiGetFieldValue('custrecord_ebh_repayment');
				if (!depositId) {
					nlapiLogExecution('ERROR', 'create-begin', depositId);
					var depositId = createDeposit(internalid);
					nlapiLogExecution('ERROR', 'create-end', depositId);
					// 把关联的存款id写到借款申请单上
					nlapiSubmitField(rectype, internalid,
							'custrecord_ebh_repayment', depositId);
				}
			}
		}

	}

}
/**
 * 根据借款申请单创建支票
 * 
 * @author zyt
 * @param internalid
 *            借款申请单内部id
 * @id 支票id
 */
function createCheck(internalid) {

	var recCheck = nlapiCreateRecord('check');

	// 通过付款方式取科目
	var payment = nlapiGetFieldValue('custrecord_ebh_payment');

	nlapiLogExecution('ERROR', '付款方式=', payment);

	// 根据支付方式获取科目
	var account = getAccount(payment);

	nlapiLogExecution('ERROR', 'account=', account);

	// var date =
	// nlapiGetFieldValue('custrecord_ebh_date');//由借款单头日期改成生成单据的系统当前日期20181010
	var date = new Date();
	// 获取日期所属期间内部id
	var period = getPeriod(date);
	var amount = nlapiGetFieldValue('custrecord_ebh_money');
	var memo = nlapiGetFieldValue('custrecord_ebh_memo');

	recCheck.setFieldValue('entity', nlapiGetFieldValue('custrecord_ebh_emp'));// 收款人
	recCheck.setFieldValue('account', account);// 科目
	recCheck.setFieldValue('trandate', date);// 日期
	recCheck.setFieldValue('postingperiod', period);// 期间

	nlapiLogExecution('ERROR', '期间=', period);

	recCheck.setFieldValue('usertotal', amount);// 金额
	recCheck.setFieldValue('memo', memo);// 备注
	recCheck.setFieldValue('cseg1',
			nlapiGetFieldValue('custrecord_ebh_cash_payment'));// 现金流量表项
	recCheck.setFieldValue('subsidiary',
			nlapiGetFieldValue('custrecord_ebh_company'));// 子公司
	recCheck.setFieldValue('custbody_loan_bill_number', internalid);// 借款申请单

	var lineType = 'expense';
	recCheck.setLineItemValue(lineType, 'account', 1,
			getConfigValue('EB_CHECK_ACCOUNT'));// 其他应收款

	nlapiLogExecution('ERROR', 'account1=', getConfigValue('EB_CHECK_ACCOUNT'));
	recCheck.setLineItemValue(lineType, 'amount', 1, amount);// 金额
	recCheck.setLineItemValue(lineType, 'taxcode', 1,
			getConfigValue('EB_CHECK_TAXCODE'));// 税类代码
	recCheck.setLineItemValue(lineType, 'memo', 1, memo);// 备注
	recCheck.setLineItemValue(lineType, 'department', 1,
			nlapiGetFieldValue('custrecord_ebh_dept'));// 部门
	recCheck.setLineItemValue(lineType, 'customer', 1,
			nlapiGetFieldValue('custrecord_ebh_project'));// 项目
	var id = nlapiSubmitRecord(recCheck,true);
	return id;
}

/**
 * 根据借款申请单创建支票
 * 
 * @author zyt
 * @param internalid
 *            借款申请单内部id
 * @id 存款id
 */
function createDeposit(internalid) {

	var recDeposit = nlapiCreateRecord('deposit');

	// 通过付款方式取科目
	var payment = nlapiGetFieldValue('custrecord_ebh_payment');

	nlapiLogExecution('ERROR', '付款方式=', payment);

	// 根据支付方式获取科目
	var account = getAccount(payment);
	var currency = nlapiGetFieldValue('custrecord_ebh_currency');

	// var date =
	// nlapiGetFieldValue('custrecord_ebh_date');//由借款单头日期改成生成单据的系统当前日期20181010
	var date = new Date();

	// 获取日期所属期间内部id
	var period = getPeriod(date);
	var amount = nlapiGetFieldValue('custrecord_ebh_money');
	var memo = nlapiGetFieldValue('custrecord_ebh_memo');

	recDeposit.setFieldValue('account', account);// 科目
	recDeposit.setFieldValue('currency', currency);// 币种
	recDeposit.setFieldValue('trandate', date);// 日期
	recDeposit.setFieldValue('postingperiod', period);// 期间
	recDeposit.setFieldValue('custbody_loan_bill_number', internalid);// 借款申请单

	nlapiLogExecution('ERROR', '期间=', period);

	recDeposit.setFieldValue('total', amount);// 金额
	recDeposit.setFieldValue('memo', memo);// 备注
	recDeposit.setFieldValue('cseg1',
			nlapiGetFieldValue('custrecord_ebh_payee'));// 现金流量表项
	recDeposit.setFieldValue('subsidiary',
			nlapiGetFieldValue('custrecord_ebh_company'));// 子公司
	recDeposit.setFieldValue('department',
			nlapiGetFieldValue('custrecord_ebh_dept'));// 部门

	var lineType = 'cashback';
	recDeposit.setLineItemValue(lineType, 'account', 1,
			getConfigValue('EB_DIPOSIT_ACCOUNT'));// 其他应收款
	recDeposit.setLineItemValue(lineType, 'amount', 1, amount);// 金额
	recDeposit.setLineItemValue(lineType, 'memo', 1, memo);// 备注
	recDeposit.setLineItemValue(lineType, 'department', 1,
			nlapiGetFieldValue('custrecord_ebh_dept'));// 部门
	recDeposit.setLineItemValue(lineType, 'entity', 1,
			nlapiGetFieldValue('custrecord_ebh_emp'));// 申请人
	var id = nlapiSubmitRecord(recDeposit,true);
	return id;
}