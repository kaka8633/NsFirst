/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       16 Aug 2018     Tingyiyi
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Access mode: create, copy, edit
 * @returns {Void}
 */
var gurl = nlapiResolveURL('SUITELET', 'customscript_test_funnel_sl',
		'customdeploy_test_funnel_sl');// sl路径
function clientPageInit(type) {

	// 获取漏斗要展示的数据
	var funnelData = getFunnelData();

	// console.info(JSON.stringify(funnelData));
	// var div = document.getElementById('div_funnel');
	// div.style.backgroundColor = "red";

	// 创建销售漏斗
	createFunnel(funnelData);

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @returns {Boolean} True to continue save, false to abort save
 */
function clientSaveRecord() {

	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @param {String}
 *            name Field internal id
 * @param {Number}
 *            linenum Optional line item number, starts from 1
 * @returns {Boolean} True to continue changing field value, false to abort
 *          value change
 */
function clientValidateField(type, name, linenum) {

	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @param {String}
 *            name Field internal id
 * @param {Number}
 *            linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function clientFieldChanged(type, name, linenum) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @param {String}
 *            name Field internal id
 * @returns {Void}
 */
function clientPostSourcing(type, name) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Void}
 */
function clientLineInit(type) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Boolean} True to save line item, false to abort save
 */
function clientValidateLine(type) {

	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Void}
 */
function clientRecalc(type) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Boolean} True to continue line item insert, false to abort insert
 */
function clientValidateInsert(type) {

	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Boolean} True to continue line item delete, false to abort delete
 */
function clientValidateDelete(type) {

	return true;
}

/**
 * 获取销售漏斗要展示的数据
 */
function getFunnelData() {

	var json = {};
	$.ajax({
		type : "POST", // 提交方式
		url : gurl,// 路径
		async : false,
		data : {
			'action' : 'getSalesTypeCount'
		},
		success : function(result) {
			// 返回数据根据结果进行相应的处理 eval方法，将json格式的字符串转换为json
			var msg = eval('(' + result + ')');
			if (msg.status == 'E') {
				alert(msg.data);
			} else {
				json = eval('(' + msg.json + ')');
			}
		}
	});

	return json;
}
/**
 * 创建漏斗
 */
function createFunnel(funnelData) {

	var dataCross = [];// 横向显示的date数组
	var dataVertical = [];// 竖向显示的date数组
	for (key in funnelData) {

		var json = {};
		dataCross.push(key);

		json.name = key;
		json.value = funnelData[key];

		dataVertical.push(json);
	}
	// console.info(JSON.stringify(dataCross));
	// console.info(JSON.stringify(dataVertical));
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('div_funnel'));

	// 指定图表的配置项和数据
	option = {
		title : {
			text : '漏斗图',// 大标题
			subtext : '销售订单类型漏斗图',// 小标题
		},
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c}%"
		},
		toolbox : {
			feature : {
				dataView : {
					readOnly : true
				},// 数据视图-只读
				restore : {},// 还原
				saveAsImage : {}
			// 另存为图片
			}
		},
		legend : {
			orient : 'vertical', // 'horizontal'
			data : dataCross,
			// itemWidth : 50,
			// itemHeight : 8,
			x : 'right' | 800,
			y : 'top' | 80
		// 横向标识
		},
		calculable : true,
		series : [ {
			name : '漏斗图',
			type : 'funnel',
			left : '5%',
			top : 50,
			// x2: 80,
			bottom : 20,
			width : '80%',
			// height: {totalHeight} - y - y2,
			min : 0,
			max : 100,
			minSize : '0%',
			maxSize : '100%',
			sort : 'descending',
			gap : 2,
			label : {
				normal : {
					show : true,
					position : 'inside'
				},
				emphasis : {
					textStyle : {
						fontSize : 20
					}
				}
			},
			labelLine : {
				normal : {
					length : 10,
					lineStyle : {
						width : 1,
						type : 'solid'
					}
				}
			},
			itemStyle : {
				normal : {
					borderColor : '#fff',
					borderWidth : 1
				}
			},
			data : dataVertical
		// 漏斗上的说明
		} ]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	// 点击事件
	myChart
			.on(
					'click',
					function(params) {
						console.log('params=' + params.name);// 获取漏斗的名字
						console.log('params=' + params.value);// 获取漏斗的值

						if (params.name == '销售订单') {
							window
									.open('https://system.netsuite.com/app/accounting/transactions/transactionlist.nl?Transaction_TYPE=SalesOrd&whence=','_blank');
						}
					});
}

function funnelClick(parms) {
	console.info('parms=' + parms);
}