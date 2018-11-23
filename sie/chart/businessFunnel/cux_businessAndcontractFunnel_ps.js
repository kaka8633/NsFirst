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
	var html = '<div id="content_wrap" style="width:100%;min-width:1250px;height: 510px">' +
							'<div id="screen_filter" style="padding:10px 1vw;width:100vw;min-width:850px;height:47px;background-color:#E0E6EF;">' +
								'<div class="tool_wrap" style="width:17vw;display:inline-block">'+
									'<span class="subtitle">类型</span>' +
									'<div style="display:inline-block;position:relative">' +
										'<input id="funnel_type" class="dropdownInput" value="商机漏斗" readonly style="width:12vw">' +
										'<ul class="tooltip" style="display:none">'+
											'<li id="0" class="selected">商机漏斗</li>'+
											'<li id="1" class="noSelected">合约漏斗</li></ul>' +
										'<input class="tool_index" type="hidden" value="0">'+
										'<input class="toolValue" type="hidden" value="0">'+
									'</div>' +
								'</div>' +
								'<div class="tool_wrap" style="width:17vw;display:inline-block">' +
									'<span class="subtitle">部门</span>' +
									'<div style="display:inline-block;position:relative">' +
										'<input id="funnel_department" class="dropdownInput" value="" readonly style="width:12vw">' +
										'<ul class="tooltip" style="display:none"><li id="1" class="noSelected">aaa</li><li id="2" class="noSelected">aaa</li><li id="3" class="noSelected">aaa</li><li id="4" class="noSelected">aaa</li><li id="5" class="noSelected">aaa</li><li class="noSelected">aaa</li></ul>' +
										'<input class="tool_index" type="hidden" value="">'+
										'<input class="toolValue" type="hidden" value="">'+
									'</div>' +
								'</div>' +
								'<div class="tool_wrap" style="width:17vw;display:inline-block">' +
									'<span class="subtitle">员工</span>' +
									'<div style="display:inline-block;position:relative">' +
										'<input id="funnel_employee" class="dropdownInput" value="" readonly style="width:12vw">' +
										'<ul class="tooltip" style="display:none"><li>aaa</li></ul>' +
										'<input class="tool_index" type="hidden" value="">'+
										'<input class="toolValue" type="hidden" value="">'+
									'</div>' +
								'</div>' +
								'<div class="times" style="width:30vw;display:inline-block">'	+
									'<span class="subtitle">日期</span>' +
									'<div style="display:inline-block;">'+
										'<div class="calendar">'+
											'<input type="text" id="time_star" style="width:12vw" />'+
										'</div>'+
									'</div>'+
									'<div class="times" style="display:inline-block;margin-left:20px;">'+
										'<div class="calendar">'+
											'<input type="text" id="time_end" style="width:12vw" />'+
										'</div>'+
								   '</div>'+
								 '</div>' +
								 '<span id="search">搜索</span>' + 
							'</div>' +
								'<div id="funnel_wrap" style="overflow:hidden;padding-top:10px;position:relative">' + 
									'<div id="funnel" style="float:left;width: 50%;height: 460px;">'+
									'</div>' +
									'<ul id="funnel_logo">'+
										'<li><span class="color_piece"></span>adaa</li>'+
									'</ul>'+
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
		var s = '#week{font:14px/1.8"Helvetica Neue","microsoft yahei";width: 214px;height: 210px;border: 1px solid #ccc;}' +
						'#week h1 {font-size:16px;overflow: hidden;height: 40px;line-height:40px;border-bottom: 1px solid #c9d9d9;}' +
						'#week h1 span {float:left;text-align:center;display:inline-block;height:40px;line-height:40px;}'+
						'#week .prev {float:left;width:15%;font-size:12px;cursor:pointer;font-family:"simsun";font-weight:bold;font-size:18px;}'+
						'#week .next {float:right;width:15%;font-size:12px;cursor:pointer;font-family:"simsun";font-weight:bold;font-size:18px;}' +
						'#week .content {width: 70%;font-weight: normal;}'+
						'#week ul{margin-left:0!important;}' +
						'#week ul li {list-style:none!important;width: 30px;float:left;text-align:center;height: 22px;cursor:pointer;line-height:36px;}'+
						'#ele {border:1px solid #555;font-size: 14px;line-height: 26px;height:26px;padding: 0 5px;color: #333}';
	
		var style= '<style>'+
								'.subtitle{width:3vw;display:inline-block}' +
								'.dropdownInput{background:url(/uirefresh/img/field/dropdown.png) no-repeat right 50%;background-color:#fff;'+
								'cursor:pointer;border:1px solid #cccccc !important}' +
								'.active{box-shadow:0px 0px 2px 2px rgba(64, 143, 219, 0.75)}' +
								'.tooltip{position:absolute;z-index:9999;margin:0!important;top:100%;left:0;right:0;max-height:198px;list-style:none!important;' +
								'overflow-x:hidden!important;overflow-y:auto!important;border:1px solid #187bf2!important;box-shadow:none!important;background-color:#fff}' +
								'.noSelected{padding: 5px 3px;font-size: 13px;color: #000;cursor:pointer;}' +
								'.selected{padding:5px 3px;background:#607799!important;cursor:pointer;font-size: 13px;color:#fff}'+ s +
								'#time_star,#time_end{padding-right: 25px;background:url("/uirefresh/img/field/calendar.png") no-repeat right center;'+								
								'background-color:#fff}' +
								'#table_content{width:100%;height:100%;border-collapse:collapse;border-spacing:0;table-layout:fixed;font-size:14px}' +				
								'#table_content td{border:1px solid #D7D7D7;;text-align:center}' +
								'#table_content tr:first-child td{width: 33%;background-color:#E4E4E4}' +
								'#search{display:inline-block;width: 60px;height: 26px;line-height: 24px;background-color:#3D93FC;color:#fff;font-size:14px;'+
								'font-weight:600;text-align:center;border:1px solid #125ab2;border-radius:4px;}' +
								'#search:hover{background-color:#1467CC;cursor:pointer}' +
								'#funnel_loading,#prompt_message{position:absolute;top:0;left:0;width:100%;height:100%;z-index:900;overflow:hidden;text-align:center;'+
						    'color:#666666;}' +
						    '#funnel_loading{background-color:rgba(255, 255, 255, 0.7)}'+
						    '#prompt_message{background-color: #fff}' +
						    '#loading_content{display: inline-block;margin-top:200px;vertical-align: middle;}'+
						    '#funnel_loading img{-webkit-animation: spin 1.6s linear infinite;-moz-animation: spin 1.6s linear infinite;animation: spin 1.6s linear infinite;}' +
						    '@keyframes spin{0% { transform: rotate(0deg);}  100% { transform: rotate(360deg);}}'+
						    '.level_2{padding-left:15px;}.level_3{padding-left:30px;}.level_4{padding-left:45px;}.level_5{padding-left:60px;}.level_6{padding-left:75px;}'+ 
						    '#funnel_logo{position:absolute;margin:0;padding:0;bottom:1vw;left:30%;border:1px solid #ccc}'+
						    '#funnel_logo li{padding:0 15px;list-style:none;height:24px;line-height:24px;margin-right:40px}'+
						    '#funnel_logo li:first-of-type{text-align:center;}'+
						    '.color_piece{display:inline-block;margin-right:15px;width:15px;height:15px;vertical-align:middle;}'+
							'</style>';
	funnel.setDefaultValue((style + html));
}
