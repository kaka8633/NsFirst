/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Sep 2018     Administrator
 *
 */

/**
 * @param {nlobjPortlet} portletObj Current portlet object
 * @param {Number} column Column position index: 1 = left, 2 = middle, 3 = right
 * @returns {Void}
 */
function portletName(portletObj, column) {
	portletObj.setTitle('赢单到现金一览图');
//	portletObj.setScript('');
	var funnel = portletObj.addField('custpage_chart', 'inlinehtml');
	
}
