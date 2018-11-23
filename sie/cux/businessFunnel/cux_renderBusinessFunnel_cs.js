/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       19 Sep 2018     liuhz
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
var mychart = undefined;
var funnelType = {
		'0' : ['商机阶段','商机数量','商机金额'],
		'1' : ['合约阶段','合约数量','合约金额']
};
var getType = undefined;
var funnelData = {};
var gUrl = nlapiResolveURL('SUITELET', 'customscript_getbusinessdata_ss', 'customdeploy_getbusinessdata_ss');

function clientPageInit(type){
	addStyle();
	dateInit();
	getDepratment();
	getEmployee();
	funnelInit();
	bindEvent();
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
//获取部门数据
function getDepratment(){
	$.ajax({
		url: gUrl,
		type:'POST',
		async: false,
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
//获取销售人员数据
function getEmployee(){
	$.ajax({
		url: gUrl,
		type:'POST',
		async: false,
		data : {
			'action' : 'getEmployee'
		},
		success : function(data){
			renderTool(data,'#funnel_employee');
		},
		error : function(e){
			console.log(e);
		}
	});
}
//渲染下拉列表
function renderTool(data,obj){
	var imports  = JSON.parse(data);
	var html = '<li id="all" class="selected">全部</li>';
	for(var i = 0; i < imports.length; i ++){
		html += '<li id="'+ imports[i]['value'] +'" class="noSelected">'+ imports[i]['text'] +'</li>';
	}
	$(obj).next().html(html);
}
//初始化添加css，日期及下拉列表需要
function addStyle(){
	var s = '#week{font:14px/1.8"Helvetica Neue","microsoft yahei";width: 214px;height: 210px;border: 1px solid #ccc;}' +
	'#week h1 {font-size:16px;overflow: hidden;height: 40px;line-height:40px;border-bottom: 1px solid #c9d9d9;}' +
	'#week h1 span {float:left;text-align:center;display:inline-block;height:40px;line-height:40px;}'+
	'#week .prev {float: left;font-size:12px;width:15%;cursor:pointer;font-family:"simsun";font-weight:bold;font-size:18px;}'+
	'#week .next {float: right;font-size:12px;width:15%;cursor:pointer;font-family:"simsun";font-weight:bold;font-size:18px;}' +
	'#week .content {width: 70%;font-weight: normal;}'+
	'#week ul{margin-left:0!important;}' +
	'#week ul li {list-style:none!important;width: 30px;float:left;text-align:center;height: 22px;cursor:pointer;line-height:36px;}'+
	'#ele {border:1px solid #555;font-size: 14px;line-height: 26px;height:26px;padding: 0 5px;color: #333}';
	
	var style= '<style>'+
								'.subtitle{margin-right:15px;display:inline-block}' +
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
								'#search{display:inline-block;width: 60px;height: 26px;line-height: 26px;background-color:#3D93FC;color:#fff;font-size:14px;'+
								'font-weight:600;text-align:center;border:1px solid #125ab2;border-radius:4px;}' +
								'#search:hover{background-color:#1467CC;cursor:pointer}' +
								'#funnel_loading,#prompt_message{position:absolute;top:0;left:0;width:100%;height:100%;z-index:900;overflow:hidden;text-align:center;'+
						    'color:#666666;}' +
						    '#funnel_loading{background-color:rgba(255, 255, 255, 0.7)}'+
						    '#prompt_message{background-color: #fff}' +
						    '#loading_content{display: inline-block;margin-top:200px;vertical-align: middle;}'+
						    '#funnel_loading img{-webkit-animation: spin 1.6s linear infinite;-moz-animation: spin 1.6s linear infinite;animation: spin 1.6s linear infinite;}' +
						    '@keyframes spin{0% { transform: rotate(0deg);}  100% { transform: rotate(360deg);}}'+
							'</style>';
	$('head').append(style);
}
//绑定事件
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
			setTimeout(refreshFunnel, 0);
	});
}
//初始化时间
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
//初始化漏斗

var datas = {
		name : '测试',
		data :[
		       ["aaa",110,"10%",1500],
		       ["bbb",110,"20%",1500],
		       ["ccc",110,"30%",1500],
		       ["ddd",110,"40%",1500],
		       ["eee",110,"50%",1500],
		       ["fff",110,"60%",1500],
		       ["ggg",110,"70%",1500],
		       ["hhh",110,"80%",1500]
		       ]
};
function funnelInit(){
	getFunnelData();
	var data = formatter(funnelData);
	var option = {
			chart: {
				type: 'funnel',
				animation : 1000,
				marginRight: 100,
			},
			title :{
				text : null,
				floating : true
			},
			credits :{
				enabled: false
			},
			legend : {
				enabled : true,
				align : 'left',
				verticalAlign: 'bottom',
				layout: 'vertical',
				borderRadius : '5px',
				itemMarginTop : 8,
			},
			colors : ['#75BBE8','#388FB3','#66CCCC','#99CC00','#FFCC00','#FF9999','#66CC66','#FF6633'],
			center : ['0','50%'],
			plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						crop : false,
						formatter: function(){
							var probability = this.series.data[0].series.userOptions.data;
							for(var i = 0; i <probability.length ;i++){
								if(probability[i][0] == this.key){	
									var html = this.key + '<span> </span>' + probability[i][2] +'<span style="color:red;">￥(' + probability[i][3] + ')</span>';
									if(i == probability.length - 1){
										html = this.key + ':' + probability[i][2] + ' ' +'<span style="color:red;"> 总金额 ： ￥ ' + probability[i][3] + '</span>';
									}
									return html;
								}
							}
						},
						color: 'black',
						softConnector: false,
					},
					neckWidth: '30%',
					neckHeight: '20%',
					width :  '420px',
					cursor: 'pointer',
					events : {
						click : function(e){
							var name = e.point.name;
							switch(name){
								case '赢单':
									window.open('https://system.netsuite.com/app/common/search/searchresults.nl?searchid=135&whence=');
									break;
								case '潜在业务机会':
									window.open('https://system.netsuite.com/app/common/search/searchresults.nl?searchid=128&whence=');
									break;
								case '商务谈判':
									window.open('https://system.netsuite.com/app/common/search/searchresults.nl?searchid=171&whence=');
									break;
								case '合约签署':
									window.open('https://system.netsuite.com/app/common/search/searchresults.nl?searchid=136&whence=');
									break;
								case '合格的决策者':
									window.open('https://system.netsuite.com/app/common/search/searchresults.nl?searchid=132&whence=');
									break;
								case '合格的支持者':
									window.open('https://system.netsuite.com/app/common/search/searchresults.nl?searchid=131&whence=');
									break;
								case '合格的业务机会':
									window.open('https://system.netsuite.com/app/common/search/searchresults.nl?searchid=129&whence=');
									break;
								case '决策定案':
									window.open('https://system.netsuite.com/app/common/search/searchresults.nl?searchid=133&whence=');
									break;
								case '中标通知书阶段':
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
								case '合约起拟阶段':
									window.open('https://system.netsuite.com/app/common/search/searchresults.nl?searchid=142&whence=');
									break;
								default:
									break;
							}
						}
					}
				}
			},
			series: [datas]
		};
	mychart= Highcharts.chart('funnel',option);
}
//获取渲染漏斗数据
function getFunnelData(){
	var type  = $('#funnel_type').siblings('.toolValue').val(),
			bu    = $('#funnel_department').siblings('.toolValue').val(),
	    sales = $('#funnel_employee').siblings('.toolValue').val(),
	    dateStar = $('#time_star').val(),
	    dateEnd  = $('#time_end').val();
		getType = type;
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
			},
			success : function(data){
				funnelData = JSON.parse(data);
			},
			error : function(e){
				console.log(e);
			},
		});
}
//刷新漏斗
function refreshFunnel(){
	if(mychart){
		console.log(1);
		if(!$('#prompt_message').is(':hidden')){
			$('#prompt_message').hide();
		}
		$("#funnel_loading").show();
		setTimeout(fillFunnel,10);
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

//漏斗所需数据
function formatter(data){
	renderTable(funnelData);
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
