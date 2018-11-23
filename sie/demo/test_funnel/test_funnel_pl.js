/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       16 Aug 2018     zyt 测试漏斗
 *
 */

/**
 * @param {nlobjPortlet}
 *            portletObj Current portlet object
 * @param {Number}
 *            column Column position index: 1 = left, 2 = middle, 3 = right
 * @returns {Void}
 */
function portletName(portletObj, column) {

	portlet.setTitle('测试漏斗');
	portlet.setScript('customscript_test_funnel_cs');

	var funnel = portlet.addField('custpage_funnel', 'inlinehtml');
	funnel
			.setDefaultValue("<div id='div_funnel' style='height: 650px; width: 900px'></div>");

	// var html =
	// // '<div onload="showFunnel()"></div>';
	// '<div id="main" style="width:
	// 600px;height:400px;background-color:green"></div>'
	// + '<script type="text/javascript">'
	// // // + 'var myChart = echarts.init(document.getElementById("main"));'
	// +'var myChart = document.getElementById("main");'
	// + 'myChart.style.backgroundColor = "blue";'
	// +'</script>';
	// // 指定图表的配置项和数据
	// + 'var option = {title: {text: "ECharts 入门示例"},tooltip:
	// {},legend: {data:["销量"]},xAxis: {data:
	// ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]},yAxis: {},series: [{name:
	// "销量",type: "bar",data: [5, 20, 36, 10, 10, 20]}]};'
	// // 使用刚指定的配置项和数据显示图表。
	// + 'myChart.setOption(option);</script></body>';

	// var html =
	// '<div id="main" style="width:
	// 600px;height:400px;background-color:green"></div>'
	// + '<script type="text/javascript">'
	// +'var myChart = document.getElementById("main");'
	// + 'myChart.style.backgroundColor = "blue";'
	// +'</script>';
	// portlet.setTitle('测试漏斗');
	// portlet.setHtml(html);

}
