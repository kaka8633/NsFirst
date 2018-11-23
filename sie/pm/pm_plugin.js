/**
 * Module Description
 * 
 * Version Date Author Remarks 1.00 11 Sep 2018 huyuming
 * 
 */
// 全局变量
var earnedValues = [];
var weeks = [];
var pv = [];
var ac = [];
var ev = [];
var cr = [];
var spi = [];
var cpi = [];
var sv = [];
var cv = [];
var results = '';

function pmUeRef(form) {
	// 创建table
	form.addTab('custpage_earned_table', '挣值图');

	var chart = form.addField('custpage_chart', 'inlinehtml', '挣值图', null,
			'custpage_earned_table');

	// 获取数据
	results = getEarnedValues();
	// 展示图标
	chart.setDefaultValue(getHtml());
}

// 获取挣值图数据
function getEarnedValues() {
	var columns = [];
	columns[0] = new nlobjSearchColumn('custrecord_week_value').setSort(false);
	columns[1] = new nlobjSearchColumn('custrecord_week_description');
	columns[2] = new nlobjSearchColumn('custrecord_pv_value');
	columns[3] = new nlobjSearchColumn('custrecord_ac_value');
	columns[4] = new nlobjSearchColumn('custrecord_ev_value');
	columns[5] = new nlobjSearchColumn('custrecord_cr_value');
	columns[6] = new nlobjSearchColumn('custrecord_spi_value');
	columns[7] = new nlobjSearchColumn('custrecord_cpi_value');
	columns[8] = new nlobjSearchColumn('custrecord_sv_value');
	columns[9] = new nlobjSearchColumn('custrecord_cv_value');

	var filters = [];
	filters[0] = new nlobjSearchFilter('custrecord_project_id', null, 'equalto', nlapiGetRecordId());
	var searchResults = nlapiCreateSearch('customrecord_project_earned_value',
			filters, columns).runSearch();

	var startIndex = 0;
	do {
		var result = searchResults.getResults(startIndex, startIndex + 1000);
		for (var i = 0; i < result.length; i++) {
			weeks.push(result[i].getValue('custrecord_week_description'));
			pv.push(result[i].getValue('custrecord_pv_value'));
			ac.push(result[i].getValue('custrecord_ac_value'));
			ev.push(result[i].getValue('custrecord_ev_value'));
			cr.push(result[i].getValue('custrecord_cr_value'));
			spi.push(result[i].getValue('custrecord_spi_value'));
			cpi.push(result[i].getValue('custrecord_cpi_value'));
			sv.push(result[i].getValue('custrecord_sv_value'));
			cv.push(result[i].getValue('custrecord_cv_value'));
		}
		startIndex += 1000;
	} while (result != null && result.length > 0);

	earnedValues.push(weeks);
	earnedValues.push(pv);
	earnedValues.push(ac);
	earnedValues.push(ev);
	earnedValues.push(cr);
	earnedValues.push(spi);
	earnedValues.push(cpi);

	return JSON.stringify(earnedValues).replace(new RegExp('\"', 'g'), "'");
}

// 获取html内容
function getHtml() {

	var copmpanyId = nlapiGetFieldValue('id');
	var jobRec = nlapiLoadRecord('job', copmpanyId);

	// 进度条取值
//	var mainPer = jobRec.getFieldValue('custentity_main_percenttimecomplete')
//			.split("%")[0];
//	var perc = jobRec.getFieldValue('percenttimecomplete').split("%")[0];
//	var pmp = jobRec.getFieldValue('custentity_pm_percentage').split("%")[0];
	
	var mainPer = jobRec.getFieldValue('custentity_main_percenttimecomplete');
    var perc = jobRec.getFieldValue('percenttimecomplete');
    var pmp = jobRec.getFieldValue('custentity_pm_percentage');

	var barValue1 = mainPer == null ? "0" : mainPer.split("%")[0];
	var barValue2 = perc == null ? "0" : perc.split("%")[0];
	var barValue3 = pmp == null ? "0" : pmp.split("%")[0];

	// 第二个进度条的颜色
	var diff = parseFloat(barValue2) - parseFloat(barValue3);
	var bar2Color = '#66cc99';
	if (diff >= 10) {
		bar2Color = '#ff6666';
	}

	if (diff < 10 && diff > 0) {
		bar2Color = '#ffcc00';
	}

	// 红绿灯取值
	var staticCr = jobRec.getFieldValue('custentity_cr_value');
	var staticSpi = jobRec.getFieldValue('custentity_spi_value');
	var staticCpi = jobRec.getFieldValue('custentity_cpi_value');

	// 默认值
	var colorCr = '#66cc99';
	var colorSpi = '#66cc99';
	var colorCpi = '#66cc99';

	// 根据不同值获取不同的颜色
	// cr
	if (staticCr ==1) {
		colorCr = '#ff6666';
	}

	if (staticCr ==-1) {
		colorCr = '#ffcc00';
	}

	// spi
	if (staticSpi ==1) {
		colorSpi = '#ff6666';
	}

	if (staticSpi ==-1) {
		colorSpi = '#ffcc00';
	}

	// cpi
	if (staticCpi ==1) {
		colorCpi = '#ff6666';
	}

	if (staticCpi ==-1) {
		colorCpi = '#ffcc00';
	}

	var html = '<style>'
			+ '.zbox canvas{padding-top: 7px !important;}'
			+ '@media screen and (max-width:1020px){.echarts_left{float:none;margin-left: 200px;}'
			+ '.echarts_right{float: none;margin-left:200px;margin-top: 20px;}.ProgressBarox{left: 60%;}'
			+ '.switch{top: 353px;left: 55%;width: 14%;}}'
			+ '</style>'
			+ '<div class="zbox" style="height:100%;width:100%;">'
			+ '<div style="width:98%;margin:0 auto;border:1px solid #cccccc;height: auto;overflow: hidden;border-top: none;padding-bottom: 20px;position: relative;min-width: 945px;">'
			+ '<div class="echarts_left" id="echarts1" style="width:612px;height: 300px;border: 1px solid #cccccc;margin-top:5px;min-width: 460px;float: left; margin-left: 5px;">'
			+ '</div>'
			+ '<div class="echarts_right" id="echarts2" style="width:612px;height: 300px;border: 1px solid #cccccc;margin-top:5px;min-width: 460px; float: right;margin-right: 5px;">'
			+ '</div>'
			+ '<!-- 进度条开始-->'
			+ '<div style="position:absolute;height: 34px;font-size: 0.1em; width: 8%;text-align: center; top: 10px;left: 40%;">'
			+ '<!-- 进度条1-->'
			+ '<div style="overflow:hidden; height:11px; background-color:#ffffff;line-height: 11px;border-left:1px solid #e4e4e4;border-right:1px solid #e4e4e4;border-top:1px solid #e4e4e4;">'
			+ '<div style="float:left; width:0; height:100%; font-size:11px; line-height:11px; color:#333333; text-align:center; background-color:#66cc99; width:'
			+ barValue1
			+ '%;">'
			+ barValue1
			+ '%</div></div>'
			+ '<!-- 进度条2-->'
			+ '<div style="overflow:hidden; height:11px; background-color:#ffffff;line-height: 11px;border-left:1px solid #e4e4e4;border-right:1px solid #e4e4e4;border-top:1px solid #e4e4e4;">'
			+ '<div style="float:left; width:0; height:100%; font-size:11px; line-height:11px; color:#333333; text-align:center; background-color:'
			+ bar2Color
			+ '; width:'
			+ barValue2
			+ '%;">'
			+ barValue2
			+ '%</div></div>'
			+ '<!-- 进度条3-->'
			+ '<div style="overflow:hidden; height:11px; background-color:#ffffff;line-height: 11px;border-left:1px solid #e4e4e4;border-right:1px solid #e4e4e4;border-top:1px solid #e4e4e4;">'
			+ '<div style="float:left; width:0; height:100%; font-size:11px; line-height:11px; color:#333333; text-align:center; background-color:#66cc99; width:'
			+ barValue3
			+ '%;">'
			+ barValue3
			+ '%</div></div>'
			+ '</div>'
			+ '<!-- 进度条结束-->'
			+ '<!-- 开关开始-->'
			+ '<div style=" position: absolute;width: 13%;top: 10px;height: 34px;left: 90%;overflow: hidden;">'
			+ '<div style=" height: 20px;width: 20px;border-radius: 50%;text-align: center;line-height: 20px; margin-top: 5px;float: left;font-size: 10px;color: white; height: 20px;width: 20px;border-radius: 50%;text-align: center;line-height: 20px;margin-top: 5px;border: 1px solid '
			+ colorCr
			+ ';background: '
			+ colorCr
			+ ';">CR</div>'
			+ '<div style=" height: 20px;width: 20px;border-radius: 50%;text-align: center;line-height: 20px; margin-top: 5px;float: left;font-size: 10px;color: white; height: 20px;width: 20px;border-radius: 50%;text-align: center;line-height: 20px;margin-top: 5px; border: 1px solid '
			+ colorSpi
			+ '; background: '
			+ colorSpi
			+ ';margin-left: 3px;">SPI</div>'
			+ '<div style=" height: 20px;width: 20px;border-radius: 50%;text-align: center;line-height: 20px; margin-top: 5px;float: left;font-size: 10px;color: white; height: 20px;width: 20px;border-radius: 50%;text-align: center;line-height: 20px;margin-top: 5px;border: 1px solid '
			+ colorCpi
			+ ';background: '
			+ colorCpi
			+ ';margin-left: 3px;">CPI</div>'
			+ '<div style="  margin-top: 5px; margin-left: 3px;cursor: pointer;float: left;font-size: 10px;color: white;">'
			+ '<img src="https://system.netsuite.com/core/media/media.nl?id=4151&c=5045270_SB1&h=191029b732ed9666cb41" alt="" id="tabOff" onclick="changeEcharts()" data-val="off">'
			+ '</div>'
			+ '</div>'
			+ '<!-- 开关结束-->'
			+ '<div style="clear:both;"></div>'
			+ '<table style="text-align: center;border: 1px solid #cccccc;width: 99%;margin: 0 auto;margin-top: 20px;border-spacing: 0px;">'
			+ '<thead>'
			+ '<tr>'
			+ '<th style=" font-weight: normal;">计划值(PV)</th>'
			+ '<th style=" font-weight: normal;border-left: 1px solid #cccccc;">实际值(AC)</th>'
			+ '<th style=" font-weight: normal;border-left: 1px solid #cccccc;">挣值(EV)</th>'
			+ '<th style=" font-weight: normal;border-left: 1px solid #cccccc;">进度偏差(SV)</th>'
			+ '<th style=" font-weight: normal;border-left: 1px solid #cccccc;">成本偏差(CV)</th>'
			+ '<th style=" font-weight: normal;border-left: 1px solid #cccccc;">关键比率(CR)</th>'
			+ '<th style=" font-weight: normal;border-left: 1px solid #cccccc;">进度比率(SPI)</th>'
			+ '<th style=" font-weight: normal;border-left: 1px solid #cccccc;">成本效率(CPI)</th>'
			+ '</tr>'
			+ '</thead>'
			+ '<tbody>'
			+ '<tr>'
			+ '<td style=" font-weight: normal;border-top: 1px solid #cccccc">'
			+ pv[pv.length - 1]
			+ '</td>'
			+ '<td style=" font-weight: normal;border-left: 1px solid #cccccc;border-top: 1px solid #cccccc">'
			+ ac[pv.length - 1]
			+ '</td>'
			+ '<td style=" font-weight: normal;border-left: 1px solid #cccccc;border-top: 1px solid #cccccc">'
			+ ev[pv.length - 1]
			+ '</td>'
			+ '<td style=" font-weight: normal;border-left: 1px solid #cccccc;border-top: 1px solid #cccccc">'
			+ sv[pv.length - 1]
			+ '</td>'
			+ '<td style=" font-weight: normal;border-left: 1px solid #cccccc;border-top: 1px solid #cccccc">'
			+ cv[pv.length - 1]
			+ '</td>'
			+ '<td style=" font-weight: normal;border-left: 1px solid #cccccc;border-top: 1px solid #cccccc">'
			+ cr[pv.length - 1]
			+ '</td>'
			+ '<td style=" font-weight: normal;border-left: 1px solid #cccccc;border-top: 1px solid #cccccc">'
			+ spi[pv.length - 1]
			+ '</td>'
			+ '<td style=" font-weight: normal;border-left: 1px solid #cccccc;border-top: 1px solid #cccccc">'
			+ cpi[pv.length - 1]
			+ '</td>'
			+ '</tr>'
			+ '</tbody>'
			+ '</table>'
			+ '</div>' + '</div>';

	return html;
}

function addButtonEvent() {
	// 绑定事件
	form.setScript('customscript_pm_binding_cs');
	var btnc = form.addButton('custpage_recalc', 'Button (Client)',
			'clientFunction(' + results + ')');
	btnc.setVisible(false);
}