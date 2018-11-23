/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       26 Oct 2018     Administrator
 *
 */
$(document).ready(function() {
	$("#newmilestone").click(function() {
		console.info(nlapiGetUser());
	});
});

			var myChart1 = echarts.init(document.getElementById('echarts1'));
            var myChart2 = echarts.init(document.getElementById('echarts2'));
	//在页面刷新时增加挣值图html的script部分
    function optionRight2(){
        option2 = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:[]
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
                    name:'',
                    type:'line',
                    stack: '总量',
                    data:[]
                },
                {
                    name:'',
                    type:'line',
                    stack: '总量',
                    data:[]
                },
                {
                    name:'',
                    type:'line',
                    stack: '总量',
                    data:[]
                },
            ]
        };
        return  option2;
    }
    function optionRight3(){
        option3 = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['CR关键比率','SPI进度效率','CPI成本效率']
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
                    name:'CR关键比率',
                    type:'line',
                    stack: '总量',
                    data:[0.1, 0.4, 0.8, 1.2,1.9,1.5, 1.4]
                },
                {
                    name:'SPI进度效率',
                    type:'line',
                    stack: '总量',
                    data:[0.3, 0.5, 0.8, 0.5, 1.0, 1.1, 1.3]
                },
                {
                    name:'CPI成本效率',
                    type:'line',
                    stack: '总量',
                    data:[0.2, 0.7, 0,6, 1,3, 0.4, 0.7, 1.2]
                },
            ]
        };
            return option3;
    }
    function showEcharts(){
        var myChart1 = echarts.init(document.getElementById('echarts1'));
        console.log(document.getElementById('echarts1').style.width);
        var myChart2 = echarts.init(document.getElementById('echarts2'));
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
        option2 = optionRight2();
        myChart1.setOption(option1);
        myChart2.setOption(option2);
    };

 showEcharts();

    function changeEcharts(){
            var myChart1 = echarts.init(document.getElementById('echarts1'));
            var myChart2 = echarts.init(document.getElementById('echarts2'));
            var option2 = optionRight2();
            var option3 = optionRight3();
            if($("#tabOff").attr("data-val") == "off"){
                $("#tabOff").attr("data-val","no");
                myChart2.setOption(option3);
                $("#tabOff").attr("src","https://system.na2.netsuite.com/core/media/media.nl?id=9159&c=1979444&h=42dfacdc701bcf7e6008");
            }else{
                $("#tabOff").attr("data-val","off");
                myChart2.setOption(option2);
                $("#tabOff").attr("src","https://system.na2.netsuite.com/core/media/media.nl?id=9158&c=1979444&h=db66243fdd9b511b369d");
            }
    };
       
       
    window.onresize = function () {
        myChart1.resize();
        myChart2.resize();
    };
    
    