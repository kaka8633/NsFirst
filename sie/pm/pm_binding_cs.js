/**
 * Module Description:绑定事件
 * 
 * Version 1.0 Date Sep 2018 Author yuming hu Remarks
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

// click事件
function clientFunction(message) {
	// 获取挣值图的值
	earnedValues = message;

	weeks = earnedValues[0];
	pv = earnedValues[1];
	ac = earnedValues[2];
	ev = earnedValues[3];
	cr = earnedValues[4];
	spi = earnedValues[5];
	cpi = earnedValues[6];

	// 绑定事件
	$(document).ready(function() {
		$("#newtask").click(function() {
			bindingTaskOnclick();
		});
	});
};

/**
 * 通过点击<计划>标签下的<新建 项目任务>传值
 * 
 * @author YHR
 */
function bindingTaskOnclick() {

	// 抓取项目总监
	var projectDirector = nlapiGetFieldValue('custentity_project_director');
	// 抓取项目经理
	var projectManager = nlapiGetFieldValue('custentity_project_manager');

	var copmpanyId = nlapiGetFieldValue('id');
	var jobRec = nlapiLoadRecord('job', copmpanyId);

	if (projectDirector == null || projectDirector == '') {
		projectDirector = jobRec.getFieldValue('custentity_project_director');
	}

	if (projectManager == null || projectManager == '') {
		projectManager = jobRec.getFieldValue('custentity_project_manager');
	}

	nlOpenWindow('/app/accounting/project/projecttask.nl?l=T' + '&company='
			+ copmpanyId + '&custparam_director=' + projectDirector
			+ '&custparam_manager=' + projectManager, 'newtaskpopup',
			'width=1000,height=1000,resizable=yes,scrollbars=yes');
	return false;
}

// 抓取按钮事件并自动触发
var oBtn = document.getElementById('custpage_recalc');
oBtn.click();

// 处理挣值图展示
var myChart1 = echarts.init($("#echarts1")[0]);
var myChart2 = echarts.init($("#echarts2")[0]);
// 开关
var toggleOn = "https://system.netsuite.com/core/media/media.nl?id=4152&c=5045270_SB1&h=c3b86933207c3c8c97cf";
var toggleOff = "https://system.netsuite.com/core/media/media.nl?id=4151&c=5045270_SB1&h=191029b732ed9666cb41";
var colors = [ "#676CFB", "#FD9940", "#FC101B" ];

var option1 = {
	color : colors,
	tooltip : {
		trigger : 'axis'
	},
	legend : {
		data : [ 'PV计划值', 'AC实际值', 'EV挣值' ]
	},
	grid : {
		left : '3%',
		right : '4%',
		bottom : '3%',
		containLabel : true
	},
	xAxis : {
		type : 'category',
		boundaryGap : false,
		data : weeks
	// [ '第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周' ]
	},
	yAxis : {
		type : 'value'
	},
	series : [ {
		name : 'PV计划值',
		type : 'line',
		data : pv,
		smooth : true,
		itemStyle : {
			normal : {
				lineStyle : {
					width : 1.1
				}
			}
		},
	}, {
		name : 'AC实际值',
		type : 'line',
		data : ac,
		smooth : true,
		itemStyle : {
			normal : {
				lineStyle : {
					width : 1.1
				}
			}
		},
	}, {
		name : 'EV挣值',
		type : 'line',
		data : ev,
		smooth : true,
		itemStyle : {
			normal : {
				lineStyle : {
					width : 1.1
				}
			}
		},
	} ]
};

var option2 = {
	color : colors,
	tooltip : {
		trigger : 'axis'
	},
	legend : {
		data : [ 'CR关键比率', 'SPI进度效率', 'CPI成本效率' ],
		left: '15%',
		top : '3%'
	},
	grid : {
		left : '3%',
		right : '4%',
		bottom : '3%',
		containLabel : true
	},
	xAxis : [ {
		type : 'category',
		boundaryGap : false,
		data : weeks
	} ],
	yAxis : [ {
		type : 'value'
	} ],
	series : [ {
		name : 'CR关键比率',
		type : 'line',
		data : cr,
		// smooth : true,
		itemStyle : {
			normal : {
				lineStyle : {
					width : 1.1
				}
			}
		},
		// lineStyle : {
		// color : '#676CFB'
		// },
		markPoint : {
			data : []
		},
		markLine : {
			data : [ {
				type : 'average',
				name : '平均值'
			} ]
		}
	}, {
		name : 'SPI进度效率',
		type : 'line',
		data : [],
		// smooth : true,
		itemStyle : {
			normal : {
				lineStyle : {
					width : 1.1
				}
			}
		},
		markPoint : {
			data : []
		},
		markLine : {
			data : [ {
				type : 'average',
				name : '平均值'
			} ]
		}
	}, {
		name : 'CPI成本效率',
		type : 'line',
		data : cpi,
		// smooth : true,
		itemStyle : {
			normal : {
				lineStyle : {
					width : 1.1
				}
			}
		},
		markPoint : {
			data : []
		},
		markLine : {
			data : [ {
				type : 'average',
				name : '平均值'
			} ]
		}
	} ]
};

function showEcharts() {
	myChart1.setOption(option1);
	myChart2.setOption(option2);
};

showEcharts();

function changeEcharts() {

	if ($("#tabOff").attr("data-val") == "off") {
		$("#tabOff").attr("data-val", "no");
		option2.series[1].data = spi;
		myChart2.setOption(option2);
		$("#tabOff").attr("src", toggleOn);
	} else {
		$("#tabOff").attr("data-val", "off");
		option2.series[1].data = [];
		myChart2.setOption(option2);
		$("#tabOff").attr("src", toggleOff);
	}
};

window.onresize = function() {
	myChart1.resize();
	myChart2.resize();
};
