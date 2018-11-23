/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       29 Aug 2018     zyt 测试PS
 *
 */

/**
 * @param {nlobjPortlet}
 *            portletObj Current portlet object
 * @param {Number}
 *            column Column position index: 1 = left, 2 = middle, 3 = right
 * @returns {Void}
 */
function portletName(portletObj, column) {

//	portletObj.setTitle('输出HTML');
//	var html = '<font color="red">Hello World</font>';
//	portletObj.setHtml(html);

//	 portletObj.setTitle('输出图片');
//	 var html = '<div><img src="/core/media/media.nl?id=245&c=5045270_SB1&h=8990c4eddde7b6dc81db"></img></div>';
//	 portletObj.setHtml(html);

	portlet.setTitle('采购订单');
	portlet.addColumn('custrecord_poh_otherrefnum', 'text', '供应商编号', 'CENTER');
	portlet.addColumn('custrecord_poh_entity', 'text', '供应商', 'CENTER');

	var returncols = new Array();
	returncols[0] = new nlobjSearchColumn('custrecord_poh_otherrefnum');
	returncols[1] = new nlobjSearchColumn('custrecord_poh_entity');
	var results = nlapiSearchRecord('customrecord_purchase_order_head', null,
			null, returncols);
	if (results != null) {
		for (var i = 0; i < results.length; i++) {
			var json = {};
			json.custrecord_poh_otherrefnum = results[i]
					.getValue('custrecord_poh_otherrefnum');
			json.custrecord_poh_entity = results[i]
					.getValue('custrecord_poh_entity');
			portlet.addRow(json);
		}

	}

}
