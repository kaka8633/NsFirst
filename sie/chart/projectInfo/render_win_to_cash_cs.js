/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Sep 2018     liuhz
 *
 */
var gUrl = nlapiResolveURL('SUITELET', 'customscript_getbusinessdata_ss', 'customdeploy_getbusinessdata_ss');
var gWurl = nlapiResolveURL('SUITELET', 'customscript_get_win_to_cash_sl', 'customdeploy_get_win_to_cash_sl');
var chartData = undefined;
/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
function clientPageInit(type){
	console.log(2)
	dateInit();
	bindEvents();
	getDepratment();
	chartInit();
	removePadding();
}

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

function bindEvents(){
	$('#funnel_department').on('click',function(e){
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
			setTimeout(refreshChart, 20);
	});
}

function renderTool(data,obj){
	var importss  = JSON.parse(data);
	var imports   = importss['data'];
	var all       = importss['haveAll'];
	var html      = '';
	if(all && all == 1){
		 html = '<li id="all" class="selected">全部</li>';
	}
	for(var i = 0; i < imports.length; i ++){
		if(!!imports[i]['level'] && imports[i]['level'] != 1 ){
			html += '<li id="'+ imports[i]['value'] +'" class="noSelected '+ 'level_'+imports[i]['level'] +'">'+ imports[i]['text'] +'</li>';
		}else{
			html += '<li id="'+ imports[i]['value'] +'" class="noSelected">'+ imports[i]['text'] +'</li>';
		}		
	}
	$(obj).next().html(html);
	var first = $(obj).next().find('li:first');
	$(obj).val(first.text()).siblings('.toolValue').val(first.attr('id'));
}

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

function chartInit(){
	getChartData();
	renderChart(chartData);
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

function getChartData(){
	var dateStart  = $('#time_star').val(),
			dateEnd    = $('#time_end').val(),
			bu = $('#funnel_department').siblings('.toolValue').val();
 	$.ajax({
		url: gWurl,
		type:'POST',
		async: false,
		data : {	
				dateStart : dateStart,
				dateEnd  : dateEnd,
				bu : bu
		},
		success : function(data){
			chartData = JSON.parse(data);
			// console.log(chartData);
		},
		error : function(e){
			console.log(e);
		}
	});
}

function refreshChart(){
	getChartData();
	renderChart(chartData);
}

function renderChart(data){

		for(var i = 0; i < data.length -1; i ++){
			$('#amount'+ data[i]['id']).text(data[i]['value']);

			if( i == 2){
				var k = data[data.length - 1]['custrecord_year_project'];
				$('#project_year').text( '￥' + k );
				$('#actual_project_year').text('￥' + data[i]['value']).next().text(((data[i]['value'] / k)*100).toFixed(2) + '%' )
			}

			if(i == 4){
				var m = data[data.length - 1]['custrecord_income_kpi'];
				$('#income_kpi').text( '￥' + m);
				$('#actual_income_kpi').text('￥' + data[i]['value']).next().text(((data[i]['value'] / m)*100).toFixed(2) + '%' )
			}

			if( i == 6){
					var n = data[data.length - 1]['custrecord_bill_kpi'];
					$('#bill_kpi').text(  '￥' + n );
					$('#actual_bill_kpi').text('￥' + data[i]['value']).next().text(((data[i]['value'] / n)*100).toFixed(2) + '%' )
			}

		}

}