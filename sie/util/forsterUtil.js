/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       13 Aug 2018     zyt 弗思特项目公用方法
 *
 */
/**
 * 设置费率 说明： 1、毛额及含税总额a 2、数量b 3、含税单价c=a/b 4、不含税总额d=a/(1+税率) 5、费率即不含税单价e=d/b
 * modify1.0 修改不显示费率
 */
function setAmountRef(type) {

	var taxCode = nlapiGetCurrentLineItemValue(type, 'taxcode');// 税类代码

	var grossAmt = nlapiGetCurrentLineItemValue(type, 'grossamt');// 毛额
	var quantity = nlapiGetCurrentLineItemValue(type, 'quantity');// 数量

	var unitPrice = null;

	if (quantity != 0) {
		unitPrice = grossAmt / quantity;
	}

	if (grossAmt) {
		nlapiSetCurrentLineItemValue(type, 'custcol_total_amount', grossAmt);
		nlapiSetCurrentLineItemValue(type, 'custcol_unit_price', unitPrice
				.toFixed(2));
	}

	if (taxCode) {

		var taxPercentage = getTaxRate(taxCode);// 获取税率

		// 不含税总额
		var totalAmount = grossAmt / (1 + taxPercentage);
		nlapiSetCurrentLineItemValue(type, 'amount', totalAmount.toFixed(2));

		// 设置税额
		var taxTotalAmount = grossAmt - totalAmount;
		nlapiSetCurrentLineItemValue(type, 'tax1amt', taxTotalAmount.toFixed(6));

		// 设置费率
		/*nlapiSetCurrentLineItemValue(type, 'rate', (totalAmount / quantity)
				.toFixed(2));*/

	}
}