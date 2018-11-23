/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       17 Sep 2018     huyuming
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
function clientPageInit(type) {
	
	var nowDate = new Date();
	var contractStatus = nlapiGetFieldValue('custbody_contract_status2');
	
	if(type == 'create' || type == 'copy'){
		nlapiDisableField('tranid',true);
		nlapiSetFieldValue('tranid','');
		
	}else if(type == 'edit'){
		nlapiDisableField('tranid',true);
	}
	//fieldDisable();
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
	if(type == 'item'){
		if(name == 'custcol_price_tax_included' || name == 'taxrate1'){
			var taxPrice = nlapiGetCurrentLineItemValue(type,'custcol_price_tax_included');
			var ratea  = nlapiGetCurrentLineItemValue(type,'taxrate1');
			rate = Number(ratea.replace('%',''))/100;
			var price = rate > 0 ? (taxPrice / (1 + rate)) : taxPrice;
			nlapiSetCurrentLineItemValue(type, 'rate', price,true, true);
		}
	}
	
	var nowDate = new Date();
	var contractStatus = nlapiGetFieldValue('custbody_contract_status2');
	  
	//根据<合同状态>字段值的改变来进行变更
	if(name == 'custbody_contract_status2'){
		
		    //当<合同状态>字段的值为合同收到或合同无效时
            if(contractStatus == '5' || contractStatus == '6'){
			//在<预计结束（合同）>字段放入当前日期
			var nowTime = nlapiDateToString(nowDate);
			nlapiSetFieldValue('custbody_expected_termination_contract', nowTime);
			
			//在<合同变现天数>字段放入0
			nlapiSetFieldValue('custbody_contract_realization_days', '0');
		}
		
	}
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
	fieldDisable();
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

function fieldDisable() {
	nlapiDisableLineItemField('item', 'amount', true);
	nlapiDisableLineItemField('item', 'tax1amt', true);
	nlapiDisableLineItemField('item', 'rate', true);
	nlapiDisableLineItemField('item', 'custcol_total_amount', true);
	nlapiDisableLineItemField('item', 'custcol_unit_price', true);
}

window.page_unload = null;