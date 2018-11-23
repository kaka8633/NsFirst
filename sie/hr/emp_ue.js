/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       25 Oct 2018     Makaay
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
function userEventBeforeLoad(type, form, request){
 
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit
 *                      approve, reject, cancel (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF)
 *                      markcomplete (Call, Task)
 *                      reassign (Case)
 *                      editforecast (Opp, Estimate)
 * @returns {Void}
 */
function userEventBeforeSubmit(type){
	if(type == 'create'){
		var buId = nlapiGetFieldValue('department');//项目执行部门id
		nlapiLogExecution('error','buId',buId);//debug
		var buFilters = new Array();
		buFilters.push(new nlobjSearchFilter('internalid',null,'is',buId));
		var buColumns = new Array();
		buColumns.push(new nlobjSearchColumn('custrecord_department_number'));
		buColumns.push(new nlobjSearchColumn('name'));
		var buTempData = nlapiCreateSearch('department',buFilters,buColumns).runSearch();
		var buData = buTempData.getResults(0,1);
		var buCode = buData[0].getValue('custrecord_department_number');//BU编号
		
		//自定义流水号
		var returnData = makeSerialNum('employee','3');//项目流水号
		//组装报价单编码
		var codeStr = buCode+returnData['year']+returnData['num'];
		nlapiLogExecution('error','resultEmpCode',codeStr);
		//重写编码
		var successId = nlapiSetFieldValue('entityid',codeStr);
	}
 
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */
function userEventAfterSubmit(type){
  
}
