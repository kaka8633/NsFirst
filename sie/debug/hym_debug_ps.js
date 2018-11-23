/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       11 Sep 2018     Administrator
 *
 */

/**
 * @param {nlobjPortlet} portletObj Current portlet object
 * @param {Number} column Column position index: 1 = left, 2 = middle, 3 = right
 * @returns {Void}
 */
function portletName(portletObj, column) {
	portlet.setTitle(column != 2 ? "Estimates List" : "Estimates List Detail");
	var col = portlet.addColumn('tranid', 'text', 'Number', 'LEFT');
	col.setURL(nlapiResolveURL('RECORD', ''));
	col.addParamToURL('id', 'id', true);
	portlet.addColumn('trandate', 'date', 'Date', 'LEFT');
	portlet.addColumn('entity_display', 'text', 'Customer', 'LEFT');
	if (column == 2) {
		portlet.addColumn('salesrep_display', 'text', 'Sales Rep', 'LEFT');
		portlet.addColumn('amount', 'currency', 'Amount', 'RIGHT');
	}
	var returncols = new Array();
	returncols[0] = new nlobjSearchColumn('trandate');
	returncols[1] = new nlobjSearchColumn('tranid');
	returncols[2] = new nlobjSearchColumn('entity');
	returncols[3] = new nlobjSearchColumn('salesrep');
	returncols[4] = new nlobjSearchColumn('amount');
	var results = nlapiSearchRecord('estimate', null, new nlobjSearchFilter(
			'mainline', null, 'is', 'T'), returncols);
	for (var i = 0; i < Math.min((column != 2 ? 5 : 15), results.length); i++) {
		portlet.addRow(results[i]);
	}
}
