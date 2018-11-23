/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Sep 2018     liuhz
 *
 */

/**
 * @param {nlobjPortlet} portletObj Current portlet object
 * @param {Number} column Column position index: 1 = left, 2 = middle, 3 = right
 * @returns {Void}
 */
function portletName(portletObj, column) {
	portletObj.setTitle('赢单到现金一览图');
	portletObj.setScript('customscript_render_win_to_cash_cs');
	var funnel = portletObj.addField('custpage_chart', 'inlinehtml');
	var style = '<style>'+
								'#week{font:14px/1.8"Helvetica Neue","microsoft yahei";width: 214px;height: 210px;border: 1px solid #ccc;}' +
								'#week h1 {font-size:16px;overflow: hidden;height: 40px;line-height:40px;border-bottom: 1px solid #c9d9d9;}' +
								'#week h1 span {float:left;text-align:center;display:inline-block;height:40px;line-height:40px;}'+
								'#week .prev {float: left;font-size:12px;width:15%;cursor:pointer;font-family:"simsun";font-weight:bold;font-size:18px;}' +
								'#week .next {float: right;font-size:12px;width:15%;cursor:pointer;font-family:"simsun";font-weight:bold;font-size:18px;}' +
								'#week .content {width: 70%;font-weight: normal;}'+
								'#week ul{margin-left:0!important;}' +
								'#week ul li {list-style:none!important;width: 30px;float:left;text-align:center;height: 22px;cursor:pointer;line-height:36px;}'+
								'#ele {border:1px solid #555;font-size: 14px;line-height: 26px;height:26px;padding: 0 5px;color: #333}' +
								'#time_star,#time_end{display:inline-block;width:14vw;padding-right:2vw;background:url("/uirefresh/img/field/calendar.png") no-repeat right center;'+								
								'background-color:#fff;cursor:pointer;}' +
								'.subtitle{display:inline-block;}' +
								'.dropdownInput{display:inline-block;width:16vw;background:url(/uirefresh/img/field/dropdown.png) no-repeat right 50%;background-color:#fff;'+
								'cursor:pointer;border:1px solid #cccccc !important}' +
								'.active{box-shadow:0px 0px 2px 2px rgba(64, 143, 219, 0.75)}' +
								'.tooltip{position:absolute;z-index:9999;margin:0!important;top:100%;left:0;right:0;max-height:198px;list-style:none!important;' +
								'overflow-x:hidden!important;overflow-y:auto!important;border:1px solid #187bf2!important;box-shadow:none!important;background-color:#fff}' +
								'.noSelected{padding: 5px 3px;font-size: 13px;color: #000;cursor:pointer;}' +
								'.selected{padding:5px 3px;background:#607799!important;cursor:pointer;font-size: 13px;color:#fff}' +
								'#chart>div{margin-top:9px;overflow:hidden}#chart>div>div{float:left;height:63px;text-align:center;}' +
								'#chart p{margin-top:8px;font-size:14px}' +
								'input{box-sizing:border-box;}.cl_green{background-color:#66CC9A}.cl_cyan{background-color:#94CE58}.cl_yello{background-color:#FFCC33}' +
								'.cl_red{background-color:#FF6666}.cl_blue{background-color:#0099CC}.lf_10{margin-left:1.19vw}' +
								'#cash_table{position:absolute;right:.5vw;bottom:0;width:46.60vw;height:135px;'+
								'border-collapse:collapse;border-spacing:0;table-layout:fixed;font-size:14px}' +
								'#cash_table td{border:1px solid #D7D7D7;;text-align:center}' +
								'#cash_table tr:first-child td{width: 25%;background-color:#E4E4E4}' +
								'#search{margin-left:1vw;display:inline-block;width: 60px;height: 25px;line-height: 23px;background-color:#3D93FC;color:#fff;font-size:14px;'+
								'font-weight:600;text-align:center;vertical-align:middle;border:1px solid #125ab2;border-radius:4px;}' +
								'#search:hover{background-color:#1467CC;cursor:pointer}' +
						    '.level_2{padding-left:15px;}.level_3{padding-left:30px;}.level_4{padding-left:45px;}.level_5{padding-left:60px;}.level_6{padding-left:75px;}'+ 
						    '#chart>div{padding-left:.5vw}' +
							'</style>';
	
	var html = '<div id="chart_wrap" style="min-width:840px">' +
								'<div id="screen_filter" style="padding:10px 1vw;width:100%;min-width:850px;height:47px;background-color:#E0E6EF;">' +
										'<div class="times" style="width:36vw;display:inline-block">'	+
												'<span class="subtitle" style="display:inline-block;width:3vw;margin-right:1vw;max-width:32px;">日期</span>' +
												'<div style="display:inline-block;width: 14vw">'+
														'<div class="calendar">'+
														   '<input type="text" id="time_star" />'+
												    '</div>'+
										    '</div>'+
										    '<div class="times" style="display:inline-block;width:14vw;margin-left:2vw;">'+
											      '<div class="calendar">'+
												        '<input type="text" id="time_end" />'+
											      '</div>'+
									      '</div>'+
									   '</div>' +
										 '<div class="tool_wrap" style="display:inline-block;width: 24vw">' +
										 		'<span class="subtitle" style="width:7vw;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;'+
										 		'vertical-align:middle;margin-right:1vw;max-width:75px;">部门 (BU/组)</span>' +
										 		'<div style="display:inline-block;position:relative;width:16vw">' +
										 				'<input id="funnel_department" class="dropdownInput" value="全部" readonly>' +
										 				'<ul class="tooltip" style="display:none"><li>aaa</li></ul>' +
										 				'<input class="tool_index" type="hidden" value="">' +
										 				'<input class="toolValue" type="hidden" value="">'+
										 		 '</div>' +
										 '</div>' +
										 '<span id="search">搜索</span>' + 
								'</div>' +
								'<div id="chart" style="position:relative">' +
										'<div>'+
												'<div id="" class="cl_green" style="width:99vw">'+
														'<p>赢单金额</p>' +
														'<p>￥<span id="amount1"></span></p>' +
												'</div>'+
										'</div>' +
										'<div>'+
												'<div class="cl_cyan" style="width:75vw">'+
														'<p>立项金额</p>' +
														'<p>￥<span id="amount3"></span></p>' +
												'</div>'+
												'<div class="cl_cyan" style="width:22.8vw;margin-left:1.19vw">'+
														'<p>未立项金额</p>' +
														'<p>￥<span id="amount2"></span></p>' +
												'</div>'+
										'</div>' +
										'<div>'+
												'<div class="cl_yello" style="width:51.19vw">' +
														'<p>已完工金额</p>' +
														'<p>￥<span id="amount9"></span></p>' +
												'</div>'+
												'<div class="cl_yello" style="width:22.62vw;margin-left:1.19vw">' +
														'<p>未完合约额</p>' +
														'<p>￥<span id="amount8"></span></p>' +
												'</div>'+
										'</div>' +
										'<div>'+
												'<div class="cl_red" style="width:33.33vw">'+
														'<p>开票收入</p>' +
														'<p>￥<span id="amount7"></span></p>' +
												'</div>'+
												'<div class="cl_red" style="width:16.66vw;margin-left:1.19vw">' +
														'<p>未开票收入</p>' +
														'<p>￥<span id="amount6"></span></p>' +
												'</div>'+
										'</div>' +
										'<div>'+
												'<div class="cl_blue" style="width:16.07vw">'+
														'<p>现金</p>' +
														'<p>￥<span id="amount5"></span></p>' +
												'</div>'+
												'<div class="cl_blue" style="width:16.07vw;margin-left:1.19vw">' +
														'<p>应收账款</p>' +
														'<p>￥<span id="amount4"></span></p>' +
												'</div>'+
										'</div>' +
										'<table id="cash_table">'+
											'<tr><td>KPI</td><td>目标</td><td>实际</td><td>完成率</td></tr>' +
											'<tr><td>立项合同额</td><td id="project_year"></td><td id="actual_project_year"></td><td></td></tr>' +
											'<tr><td>开票收入</td><td id="bill_kpi"></td><td id="actual_bill_kpi"></td><td></td></tr>' +
											'<tr><td>现金</td><td id="income_kpi"></td><td id="actual_income_kpi"></td><td></td></tr>' +
										'</table>' +
								'</div>' +
						 '</div>';
	funnel.setDefaultValue((style + html));
}
