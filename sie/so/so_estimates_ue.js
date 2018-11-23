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
		// 流水规则重写
		var returnData = makeSerialNum('estimate', '5');// estimate流水号
		// 组装报价单编码
		var codeStr = 'QU' + returnData['year'] + returnData['num'];
		nlapiLogExecution('error', 'resultCode', codeStr);
		// 重写编码
		var successId = nlapiSetFieldValue('tranid', codeStr);
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

	// 将最新估价单总金额赋值到机会上
	setLatestOfferSummary(type);
}

/**
 * 创建/編輯时将最新估价单总金额赋值到机会上
 * 
 * @author zyt
 */
function setLatestOfferSummary(type) {

	// add by huyuming 20181112
	var flag = false;

	// var total = nlapiGetFieldValue('custcol_total_tax_included');// 估价单总金额
	// update by Makaay 2018-11-1
	var lineCount = nlapiGetLineItemCount('item');
	var total = 0;
	if (lineCount > 0) {
		for (var i = 0; i < lineCount; i++) {
			var dumpAmount = nlapiGetLineItemValue('item', 'grossamt', i + 1);
			total = total + Number(dumpAmount);
		}
	}
	nlapiLogExecution('error', 'estimateTotal', total);// debug
	var op = nlapiGetFieldValue('opportunity');// 机会id

	if (op != null && op != "") {
		flag = true;
	}

	if (type == 'create' && flag) {
		nlapiSubmitField('opportunity', op, [ 'custbody_latest_offer_summary',
				'custbody_latest_offer_id' ], [ total, nlapiGetRecordId() ],
				true);
	} else if (type == 'edit' && flag) {
		var offerId = nlapiLookupField('opportunity', op,
				'custbody_latest_offer_id');// 机会关联的最新估价单id
		if (offerId && (offerId == nlapiGetRecordId())) {
			nlapiSubmitField('opportunity', op,
					'custbody_latest_offer_summary', total, true);
		}
	}

}