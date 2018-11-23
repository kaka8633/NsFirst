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
	//fieldDisable();
	if(type == 'copy'){//新建报价单，流水号定义为空
		nlapiSetFieldValue('tranid','');
	}
	//给总BU和利润率赋值
	setValueToBUAndProfit();
	//清除所有行
	delAllItem();
	//设置字段不可编辑
	nlapiDisableLineItemField('item','grossamt',true);
	nlapiDisableLineItemField('item','custcol_total_tax_included',true);
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
	
	// console.info(name);
	// console.info(type);
	// 1、新增输入毛额，带出含税单价，税费，金额，税额，含税单价
	/*if (type == 'item' && (name == 'quantity' || name == 'grossamt')) {

		setAmountRef(type);// 设置费率

	}

	// 2、选择税类代码后，根据（含税单价/（1+税率））算出不含税单价
	if (type == 'item' && name == 'taxcode') {

		setAmountRef(type);// 设置费率

	}*/
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
  console.log('type='+type);//debug
  console.log('name='+name);//debug
  
	//给总BU和利润率赋值
	//setValueToBUAndProfit(type,name);
	if(type == 'item'){
		console.log(name)
    if(name == 'quantity' || name == 'custcol_price_tax_included' || name == 'taxcode' || name == 'taxrate1'){

				var taxPrice = nlapiGetCurrentLineItemValue(type,'custcol_price_tax_included');//含税单价
				var quant = nlapiGetCurrentLineItemValue(type,'quantity');//数量
				var ratea  = nlapiGetCurrentLineItemValue(type,'taxrate1');
				rate = Number(ratea.replace('%',''))/100;
			
					var p = rate > 0 ? (taxPrice / (1 + rate)) : taxPrice;
				
					nlapiSetCurrentLineItemValue(type, 'rate', p,
									true, true);

				

				if(!!taxPrice && !!quant){
	
					// nlapiSetCurrentLineItemValue(type, 'custcol_total_tax_included', (taxPrice * quant),
					// true, true);
					
					if(!!ratea){
	
							// var price = rate > 0 ? (taxPrice / (1 + rate)).toFixed(2) : taxPrice;
																	
							// nlapiSetCurrentLineItemValue(type, 'amount', p * quant,
							// 	true, true);
								
							// nlapiSetCurrentLineItemValue(type, 'tax1amt', p * rate,
							// 	true, true);
								
					}
				}
			}
      // var index    = nlapiGetCurrentLineItemIndex(type);//当前行数
		return false
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
	if(type == 'item'){
		nlapiDisableLineItemField('item','custcol_total_tax_included',true);
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
	// 禁用字段金额、税额、费率、含税总价、含税单价
	nlapiDisableLineItemField('item', 'amount', true);
	nlapiDisableLineItemField('item', 'tax1amt', true);
	nlapiDisableLineItemField('item', 'rate', true);
	nlapiDisableLineItemField('item', 'custcol_total_amount', true);
	nlapiDisableLineItemField('item', 'custcol_unit_price', true);
}


/**
 * 根据BU成本 和 总计  计算利润率
 * author zxp
 */
function setValueToBUAndProfit() {
	$('#item_addedit,#item_remove').click(function() {
		
		var count = nlapiGetLineItemCount('item');
		var buTotal = 0;
		var grossamtTotal = 0;
		// 行是从1开始的
		for (var i = 1; i <= count; i++) {
			var buTempValue = nlapiGetLineItemValue('item', 'custcol_bu_cost', i);
			if (buTempValue.trim() == '') {
              	buTempValue = 0;
			}
			buTotal += parseFloat(buTempValue);
          //2018-11-7 zxp 需求修改成小计，既金额的总计，为amount，修改毛额grossamt 为 amount
			var grossamtTempValue = nlapiGetLineItemValue('item', 'amount', i);
			if (grossamtTempValue == '') {
				grossamtTempValue = 0;
			}
			grossamtTotal += parseFloat(grossamtTempValue);
		}
		// 给总BU成本赋值
		nlapiSetFieldValue('custbody_bu_total_cost', buTotal);
		var profit = 0;
		// 防止分母为0
		if (buTotal == 0) {
			profit = (parseFloat(grossamtTotal)) * 100;
		} else {
			profit = ((parseFloat(grossamtTotal) / parseFloat(buTotal)) - 1) * 100;
		}
		// 字段设置成百分数，直接给数字就好 去掉百分号，用数字2018.10.29
		nlapiSetFieldValue('custbody_profit_margin', profit.toFixed(2));
	});
}

// 清除所有行
function delAllItem() {
	$('#clearsplitsitem').click(function() {
		//给总BU成本赋值
	nlapiSetFieldValue('custbody_bu_total_cost', 0.00);
	//字段设置成百分数，直接给数字就好
	nlapiSetFieldValue('custbody_profit_margin', 0.00);
	});
}

/**
 * 计算流水号
 * @author Makaay
 * @param type 项目类型
 * @param num  流水号位数
 * 
 * @return e.g [{"num":"00012","year":2018}]
 * */
function makeSerialNumBak(type,num){
	var yearNow = new Date().getFullYear();
	//当前年份的项目
	var filters = new Array();
	filters.push(new nlobjSearchFilter('custrecord_create_year',null,'is',yearNow));
	filters.push(new nlobjSearchFilter('custrecord_'+type+'_num',null,'isnotempty'));
	var columns = new Array();
	columns.push(new nlobjSearchColumn('custrecord_'+type+'_num'));
	columns.push(new nlobjSearchColumn('internalid'));
	columns.push(columns[1].setSort());
	var searchResults = nlapiCreateSearch('customrecord_auto_serialnum_data',filters,columns).runSearch();
	var tempData = searchResults.getResults(0,1000);
	if(!tempData){//不存在流水号，该年度第一条数据
		lastNum = '0';
	}else{
		if(tempData.length > 1){//避免pop()报错
			var lastNum = tempData.pop().rawValues[0].value;//last流水号
		}else{
			var lastNum = tempData[0].rawValues[0].value;//last流水号
		}
	}
//	console.log('lastNum='+lastNum);//debug
	//更新流水号数据
	var record = nlapiCreateRecord('customrecord_auto_serialnum_data');
	record.setFieldValue('name','name');
	record.setFieldValue('custrecord_create_year',yearNow);
	record.setFieldValue('custrecord_'+type+'_num',Number(lastNum)+1);
	var id = nlapiSubmitRecord(record,true);
//	console.log('saveRetuenId='+id);//debug
	//流水号保留位数
	var zeroNum = PrefixInteger(Number(lastNum)+1,num);
	return {'num':zeroNum,'year':yearNow};
}
//数字补0,Makaay
function PrefixIntegerBak(num, length) {
	return (num/Math.pow(10,length)).toFixed(length).substr(2);
}


// 放在脚本的最后面,去除重载前提示
window.page_unload = null;