/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       18 Sep 2018     Administrator
 *
 */

/**
 * @param {nlobjPortlet} portletObj Current portlet object
 * @param {Number} column Column position index: 1 = left, 2 = middle, 3 = right
 * @returns {Void}
 */
function portletName(portletObj, column) {
	portletObj.setTitle('销售漏斗');
	portletObj.setScript('customscript_renderbusinessfunnel_cs');
	var funnel = portletObj.addField('custpage_funnel', 'inlinehtml');
	var html = '<div id="content_wrap" style="width:100%;min-width:1300px;height: 470px">' +
							'<div id="screen_filter" style="padding:10px 0;width:100%;min-width:850px;height:47px;background-color:#E0E6EF;">' +
								'<div class="tool_wrap" style="width:17%;display:inline-block">'+
									'<span class="subtitle">类型</span>' +
									'<div style="display:inline-block;position:relative">' +
										'<input id="funnel_type" class="dropdownInput" value="商机漏斗" readonly>' +
										'<ul class="tooltip" style="display:none">'+
											'<li id="0" class="selected">商机漏斗</li>'+
											'<li id="1" class="noSelected">合约漏斗</li></ul>' +
										'<input class="tool_index" type="hidden" value="0">'+
										'<input class="toolValue" type="hidden" value="0">'+
									'</div>' +
								'</div>' +
								'<div class="tool_wrap" style="width:17%;display:inline-block">' +
									'<span class="subtitle">部门</span>' +
									'<div style="display:inline-block;position:relative">' +
										'<input id="funnel_department" class="dropdownInput" value="全部" readonly>' +
										'<ul class="tooltip" style="display:none"><li id="1" class="noSelected">aaa</li><li id="2" class="noSelected">aaa</li><li id="3" class="noSelected">aaa</li><li id="4" class="noSelected">aaa</li><li id="5" class="noSelected">aaa</li><li class="noSelected">aaa</li></ul>' +
										'<input class="tool_index" type="hidden" value="">'+
										'<input class="toolValue" type="hidden" value="">'+
									'</div>' +
								'</div>' +
								'<div class="tool_wrap" style="width:17%;display:inline-block">' +
									'<span class="subtitle">员工</span>' +
									'<div style="display:inline-block;position:relative">' +
										'<input id="funnel_employee" class="dropdownInput" value="全部" readonly>' +
										'<ul class="tooltip" style="display:none"><li>aaa</li></ul>' +
										'<input class="tool_index" type="hidden" value="">'+
										'<input class="toolValue" type="hidden" value="">'+
									'</div>' +
								'</div>' +
								'<div class="times" style="width:34%;display:inline-block">'	+
									'<span class="subtitle">日期</span>' +
									'<div style="display:inline-block;">'+
										'<div class="calendar">'+
											'<input type="text" id="time_star" />'+
										'</div>'+
									'</div>'+
									'<div class="times" style="display:inline-block;margin-left:20px;">'+
										'<div class="calendar">'+
											'<input type="text" id="time_end" />'+
										'</div>'+
								   '</div>'+
								 '</div>' +
								 '<span id="search">搜索</span>' + 
							'</div>' +
								'<div id="funnel_wrap" style="overflow:hidden;padding-top:10px;position:relative">' + 
									'<div id="funnel" style="float:left;width: 50%;height: 460px;"></div>' +
									'<div id="amount" style="float:left;margin-left:5%;width: 40%;height: 460px;padding: 12px 0 16px 0">'+
										'<table id="table_content"></table>' +
									'</div>' +
									'<div id="funnel_loading" style="display:none">'+
										'<div id="loading_content">'+
											'<img src="/images/dashboard/loading.png" alt="loading"><br/><span>正在努力加载中 ^_^ ...</span>' +
										'</div>' +
									'</div>' +
									'<div id="prompt_message" style="display:none"><span style="display:inline-block;margin-top:200px">很抱歉，没有查询到相关数据 ~T_T~ ...</span></div>'+
								'</div>' +
							'</div>';
	funnel.setDefaultValue(html);
}
