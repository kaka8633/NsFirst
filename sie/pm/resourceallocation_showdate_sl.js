/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       10 Oct 2018     zyt 资源分配弹出日历框
 *
 */

/**
 * @param {nlobjRequest}
 *            request Request object
 * @param {nlobjResponse}
 *            response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response) {
	nlapiLogExecution('ERROR', '测试', '===========');
	var form = nlapiCreateForm('', true);

	// 绑定cs
	form.setScript('customscript_ra_showdate_cs');
	var div = form.addField('custpage_div', 'inlinehtml');

	div.setDefaultValue(
			'<style>'+
					'#project_timeInfo{margin-top:-32px;width:490px;height:379px;font-size:16px;font-weight:600;-moz-box-shadow: 0 4px 12px #C5C5C5;'+
					'-webkit-box-shadow: 0 4px 12px #C5C5C5;box-shadow: 0 4px 12px #C5C5C5;}'+
					'.yello,.red{display:inline-block;width:30px;height:22px;vertical-align:middle;margin:0 15px 0 28px;border-radius:5px}'+
					'.yello{background-color:#FFCC00}.red{background-color:#FF6666}'+
					'#title_left{float:left;width:55%}#title_right{float:right;width:45%;color:#255599;text-align:right}'+
					'.a{display:inline-block;vertical-align:middle;}.date_time{width:138px;text-align:center;}'+
					'.prev,.next{width:20px;height:30px;cursor:pointer;line-height:30px;}'+
					'.next{margin-right:38px;}.b{display:inline-block;width:14.2857%;text-align:center;font-weight:normal;}'+
					'#data_content{margin:0;padding:0;width:498px;}'+
					'#date_info li{position:relative;list-style:none;float:left;box-sizing:border-box;width:14.2857%;height:52px;text-align:right;'+
					'border:1px solid #ccc;padding-right:5px;margin: 0 0 -1px -1px;}'+
					'.week_hours{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}'+
					'.outHours{background-color:#FF6666;color:#ffffff!important}.locatedHours{background-color:#FFCC00;color:#ffffff!important}' +
			'</style>'+
			'<div id="project_timeInfo">'+
					'<div id="project_title" style="height:50px;line-height:50px;overflow:hidden;background-color:#E0E6EF">'+
							'<div id="title_left">'+
									'<span class="red"></span><span style="display:inline-block;vertical-align:middle;font-weight:400">超出</span>'+
									'<span class="yello"></span><span style="display:inline-block;vertical-align:middle;font-weight:400">已分配</span>'+
							'</div>'+
							'<div id="title_right">'+
									'<span class="a prev"><</span>'+
									'<div class="a date_time">'+
											'<span id="year">2018</span>年'+
											'<span id="month">10</span>月'+
									'</div>'+
									'<span class="a next">></span>'+
							'</div>'+
					'</div>'+
					'<div id="project_content">'+
							'<div id="date_info">'+
									'<div style="background-color:#E0E6EF;">'+
											'<span class="b" style="color:#ff6666">日</span><span class="b">一</span><span class="b">二</span><span class="b">三</span>' +
											'<span class="b">四</span><span class="b">五</span><span class="b" style="color:#ff6666">六</span>'+
									'</div>'+
									'<ul id="data_content"></ul>'+
							'</div>'+
					'</div>'+
			'</div>'
	);

	response.writePage(form);
}
