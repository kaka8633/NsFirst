/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       19 Sep 2018     liuhz
 *
 */
var mychart = undefined;
var funnelType = {
		'0' : ['商机阶段','商机数量','商机金额'],
		'1' : ['合约阶段','合约数量','合约金额']
};//图标表格表头使用数据
var getType = undefined;//图表表格类型
var funnelData = {};
var gUrl = nlapiResolveURL('SUITELET', 'customscript_getbusinessdata_ss', 'customdeploy_getbusinessdata_ss');
var colors = ['#75BBE8','#388FB3','#66CCCC','#99CC00','#FFCC00','#FF9999','#66CC66','#FF6633'];
/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
function clientPageInit(type){
	nlapiResizePortlet();
	dateInit();
	getDepratment();
	getEmployee();
	funnelInit();
	bindEvent();
	removePadding();
}
/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function clientFieldChanged(type, name, linenum){
}



/**
 * 去掉系统padding
 */
function removePadding(){
	var parentWindow = $(window.parent.document);
	parentWindow.find('.ns-script-portlet-content-wrapper[data-script-type="form"]').css({'padding':'0'}).end()
	.find('iframe[title="NLPagemessageContext.PORTLET_CONTENT"]').css({'width':'100%'});
	$('body').find('form[name="main_form"]').removeAttr('style').css({'overflow-x':'auto','overflow-y':'hidden'});
}
/**
 * 获取部门数据
 */
function getDepratment(){
	$.ajax({
		url: gUrl,
		type:'POST',
		async: true,
		data : {
			'action' : 'getDepartment'
		},
		success : function(data){
			renderTool(data,'#funnel_department');
		},
		error : function(e){
			console.log(e);
		}
	});
}
/**
 * 获取销售人员数据
 */
function getEmployee(){
	var employeeId = nlapiGetContext()['user'];
	$.ajax({
		url: gUrl,
		type:'POST',
		async: true,
		data : {
			'action' : 'getEmployee',
			'employeeId' : employeeId
		},
		success : function(data){
			renderTool(data,'#funnel_employee');
		},
		error : function(e){
			console.log(e);
		}
	});
}
/**
 * 渲染下拉列表
 * @param data 所需数据
 * @param obj 渲染到的html对象
 */
function renderTool(data,obj){
	var importss  = JSON.parse(data);
	var imports   = importss['data'];
	var all       = importss['haveAll'];
	var html      = '';
	if(all && all == 1){
		 html = '<li id="all" class="selected">全部</li>';
	}
	for(var i = 0; i < imports.length; i ++){
		var level = Number(imports[i]['level']);
		if(!!level && level != 1 ){
			html += '<li id="'+ imports[i]['value'] +'" class="noSelected '+ 'level_'+ (level + 1) +'">'+ imports[i]['text'] +'</li>';
		}else{
			html += '<li id="'+ imports[i]['value'] +'" class="noSelected">'+ imports[i]['text'] +'</li>';
		}		
	}
	$(obj).next().html(html);
	var first = $(obj).next().find('li:first');
	$(obj).val(first.text()).siblings('.toolValue').val(first.attr('id'));
}
/**
 * 初始化添加css，日期及下拉列表需要
 */
/**
 * 绑定事件
 */
function bindEvent(){
	$('#funnel_type,#funnel_department,#funnel_employee').on('click',function(e){
		var target = e.currentTarget;
		if($('.active').attr('id') !== $(target).attr('id')){
			$('.active').removeClass('active');
			$('.tooltip').hide();
		};
		if($(this).next().is(':hidden')){
			var value = $(this).siblings('.tool_index').val();
			if(!value){
				$(this).next().find('li:first').removeClass('noSelected').addClass('selected');
			}else{
				var index = Number(value);				
				$(this).next().find('li').removeClass('selected').addClass('noSelected')
				.eq(index).addClass('selected');
			}
			$(this).addClass('active')
				.next().show();
		}else{
			$(this).next().hide();
		}
	});
		
	$(document).on('click',function(e){
		var target = e.target;
		if(!$(target).hasClass('selected') && !$(target).hasClass('dropdownInput')){
			$('.dropdownInput').removeClass('active');
			$('.tooltip').hide();
		}
		if($(target).parents('.times').length === 0 && $(target).parents('#week').length === 0){
			$("#week").remove();
		}
	});
	
	$('.tooltip').on('mouseenter','li',function(){
		$(this).removeClass('noSelected').addClass('selected');
	}).on('mouseleave','li',function(){
		$(this).addClass('noSelected').removeClass('selected');
	});
	
	$(document).on('click','.selected',function(){
		var parent = $(this).parent();
		parent.hide();
		parent.prev().val($(this).text()).select().end()
			.next().val($(this).index())
			.siblings('.toolValue').val($(this).attr('id')).end();
	});
	$('#search').on('click',function(){
			setTimeout(refreshFunnel, 10);
	});
}
/**
 * 初始化时间
 */
function dateInit(){
	var date = new Date();
	var initYear = date.getFullYear();
	var initMonth = date.getMonth() + 1;
	var todaya = date.getDate();
	$("#time_star").calendar();
	$("#time_end").calendar();
	$("#time_star").val(initYear + '-1-1');
	$("#time_end").val(initYear + '-' + initMonth + '-' + todaya);
}
/**
 * 初始化漏斗
 */
var datas = {
		name : '测试',
		data :[
		       ["潜在商机",3,"10%",150011111],
		       ["合格商机",1,"20%",1500],
		       ["合格的支持者",1,"30%",1500],
		       ["商务谈判",3,"40%",1500],
		       ["合格的决策者",3,"50%",1500],
		       ["决策定案",10,"60%",1500],
		       ["赢单",15,"70%",1500],
		       ["丢单",20,"80%",150011111111]
		       ]
};//测试数据
function funnelInit(){
	$("#funnel_loading").show();
	getFunnelData();
	var data = formatter(funnelData);
	var option = {
			chart: {
				type: 'funnel',
				animation : 1000,
				marginLeft: -190,
				events: {
					load: function() {
						var chart = this;
						Highcharts.each(chart.series[0].data, function(p, i) {
							p.dataLabel.attr({
								x: (chart.plotWidth - chart.plotLeft) / 2 -100,
								'text-anchor': 'middle'
							});
						});
					},
					redraw: function() {
						var chart = this;
						Highcharts.each(chart.series[0].data, function(p, i) {
							p.dataLabel.attr({
								x: (chart.plotWidth - chart.plotLeft) / 2 -100,
								'text-anchor': 'middle'
							});
						});
					}
				}
			},
			title :{
				text : null,
				floating : true
			},
			credits :{
				enabled: false
			},
			colors : colors,
			legend : {
				enabled : true,
				align : 'left',
				verticalAlign: 'bottom',
				layout: 'vertical',
				borderRadius : '5px',
				itemMarginTop : 8,
			},
			plotOptions: {
				series: {
					dataLabels: {
						connectorWidth: 0,
						distance: 0,
						enabled: true,
						formatter: function(){
							var probability = this.series.data[0].series.userOptions.data;
							for(var i = 0; i <probability.length ;i++){
								if(probability[i][0] == this.key){	
									var html =  this.y + '<span>   </span>'+ ' <span style="color:red;">(￥' + probability[i][3] + ')</span>';
									return html;
								}
							}
						},
						color: 'black',
						softConnector: true,
						crop: false
					},
					neckWidth: '17%',
					neckHeight: '10%',
					width :  '420px',
					cursor: 'pointer',
					events : {
						click : function(e){
							var name = e.point.name;
							switch(name){
								case '赢单':
									window.open('/app/common/search/searchresults.nl?searchid=258&whence=');
									break;
								case '潜在商机':
									window.open('/app/common/search/searchresults.nl?searchid=259&whence=');
									break;
								case '商务谈判':
									window.open('app/common/search/searchresults.nl?searchid=260&whence=');
									break;
								case '丢单':
									window.open('app/common/search/searchresults.nl?searchid=261&whence=');
									break;
								case '合格的决策者':
									window.open('app/common/search/searchresults.nl?searchid=262&whence=');
									break;
								case '合格的支持者':
									window.open('app/common/search/searchresults.nl?searchid=263&whence=');
									break;
								case '合格商机':
									window.open('app/common/search/searchresults.nl?searchid=264&whence=');
									break;
								case '决策定案':
									window.open('app/common/search/searchresults.nl?searchid=265&whence=');
									break;
								case '中标通知书':
									window.open('https://system.netsuite.com/app/common/search/searchresults.nl?searchid=140&whence=');
									break;
								case '合约审批':
									window.open('https://system.netsuite.com/app/common/search/searchresults.nl?searchid=147&whence=');
									break;
								case '合约收到':
									window.open('https://system.netsuite.com/app/common/search/searchresults.nl?searchid=148&whence=');
									break;
								case '合约框架确定':
									window.open('https://system.netsuite.com/app/common/search/searchresults.nl?searchid=146&whence=');
									break;
								case '合约起拟':
									window.open('https://system.netsuite.com/app/common/search/searchresults.nl?searchid=142&whence=');
									break;
								default:
									break;
							}
						}
					}
				}
			},
			series: [data]
		};
	mychart= Highcharts.chart('funnel',option);
	if(funnelData.length != 0){
		$('#funnel_loading').hide();
	}else{
		$('#funnel_loading').hide();
		$('#prompt_message').show();
	}
}
/**
 * 获取渲染漏斗数据
 */
function getFunnelData(){
	var type  = $('#funnel_type').siblings('.toolValue').val(),
			bu    = $('#funnel_department').siblings('.toolValue').val(),
	    sales = $('#funnel_employee').siblings('.toolValue').val(),
	    dateStar = $('#time_star').val(),
	    dateEnd  = $('#time_end').val();
		getType = type;
		var employeeId = nlapiGetContext()['user'];
		$.ajax({
			url: gUrl,
			type:'POST',
			async: false,
			data : {
				'bu' : bu,
				'sales' : sales,
				'dateStart' : dateStar,
				'dateEnd' : dateEnd,
				'type' : type,
				'employeeId' : employeeId
			},
			success : function(data){
				funnelData = JSON.parse(data);
			},
			error : function(e){
				console.log(e);
			},
		});
}
/**
 * 刷新漏斗
 */
function refreshFunnel(){
	if(mychart){
		if(!$('#prompt_message').is(':hidden')){
			$('#prompt_message').hide();
		}
		$("#funnel_loading").show();
		setTimeout(fillFunnel,20);
	};
}

function fillFunnel(){
	getFunnelData();
	if(funnelData.length != 0){
		var data = formatter(funnelData);
		mychart.update({
			series:[data]
		});
		$('#funnel_loading').hide();
	}else{
		$('#funnel_loading').hide();
		$('#prompt_message').show();
	}
}

/**
 * 漏斗所需数据
 * @param data 需要格式化的数据
 * @returns 格式完供漏斗所用数据{___anonymous12386_12450}
 */
function formatter(data){
	renderTable(funnelData);
	renderLogo(funnelData);
	var dataCloumn = new Array();
	for(var i = 0; i < data.length; i ++){
		dataCloumn.push([data[i]['name'],data[i]['count'],data[i]['percent'],data[i]['money']]);
	}
	return {
		name : '条数',
		data : dataCloumn,
//		showInLegend : true,
	};
}
function renderLogo(data){
	var html = '<li>阶段</li>';
	for(var i = 0 ; i < data.length; i ++){
		html += '<li><span class="color_piece" style="background-color:'+ colors[i] +'"></span>'+ data[i]['name'] +'</li>';
	}
	$('#funnel_logo').html(html);
}
/**
 * 渲染表格
 * @param data 格式好的数据 供渲染表格使用
 */
function renderTable(data){
	var thead = funnelType[getType];
	var html = '<tr>';
	for(var i = 0; i < thead.length; i ++){
		html += '<td>'+ thead[i] +'</td>';
	}
	html += '</tr>'; 
	for(var j = 0 ; j < data.length; j ++){
		html += '<tr>' + '<td>'+ data[j]['name'] +'</td>' + '<td>'+ data[j]['count'] +'</td>' + '<td>'+ '￥' + data[j]['money'] +'</td>' +'</tr>';
	}
	$('#table_content').html(html);
}
