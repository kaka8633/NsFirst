/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Sep 2018     Administrator
 *
 */
function clientPageInit(type) {
	showChart();
	
	//test hidden  custpage_test_add_subtable_buttons
	document.getElementById('custpage_test_add_subtable_buttons').style.display="none";
	document.getElementById('custpage_test_add_subtable_addedit').style.display="none";
	document.getElementById('tbl_custpage_test_add_subtable_clear').style.display="none";
	document.getElementById('custpage_test_add_subtable_insert').style.display="none";
	document.getElementById('custpage_test_add_subtable_remove').style.display="none";
}



function showChart() {
	var myChart = echarts.init(document.getElementById("div_funnel_1"));
    
	var colors = ['#5793f3', '#d14a61', '#675bba'];
// var myChart1 = echarts.init(document.getElementById('echarts1'));
// var myChart2 = echarts.init(document.getElementById('echarts2'));
	option1 = {
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['PV计划值','AV实际值','EV挣值']
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: ['2018-1','2018-2','2018-3','2018-4','2018-5','2018-6','2018-7']
		    },
		    yAxis: {
		        type: 'value'
		    },
		    series: [
		        {
		            name:'PV计划值',
		            type:'line',
		            stack: '总量',
		            data:[120, 132, 101, 134, 90, 230, 210]
		        },
		        {
		            name:'AV实际值',
		            type:'line',
		            stack: '总量',
		            data:[220, 182, 191, 234, 290, 330, 310]
		        },
		        {
		            name:'EV挣值',
		            type:'line',
		            stack: '总量',
		            data:[150, 232, 201, 154, 190, 330, 410]
		        },
		    ]
		};
	
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option1);
}