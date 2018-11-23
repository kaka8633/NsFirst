/**
 * Module Description:绑定事件
 * 
 * Version 1.0 Date Sep 2018 Author yuming hu Remarks
 */
// click事件
function clientFunction() {
	// 绑定事件

	$("#timeitem_splits tr").each(function() {
		$(this).find("td").eq(9).css("display", "none");
	});
};

var oBtn = document.getElementById('custpage_recalc');
oBtn.click();