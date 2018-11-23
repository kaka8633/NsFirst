/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       25 Oct 2018     Administrator
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm}
 *            form Current form
 * @param {nlobjRequest}
 *            request Request object
 * @returns {Void}
 */
function userEventBeforeLoad(type, form, request) {

	// 创建table
	var earnedTab = form.addTab('custpage_earned_table', '挣值图');

	/*var earnedlist = form.addSubList('custpage_earned_list', 'editor', '挣值图',
			'custpage_earned_table');

	earnedlist
			.setHelpText('<div id="earnediv" style="height: 650px; width: 900px;">100</div>');*/
	//form.setScript('customscript_hym_earned_debug_cs');
	var earnedField = form.addField('custpage_earned_field', 'inlinehtml', '挣值图', null, 'custpage_earned_table');
	//earnedField.setDefaultValue(earnedHtml());
	earnedField.setDefaultValue('<div id="earned_test_div">121</div>');

	nlapiLogExecution('DEBUG', 'userEventBeforeLoad 1.0', type);
	nlapiLogExecution('DEBUG', 'userEventBeforeLoad 1.0', form);
	nlapiLogExecution('DEBUG', 'userEventBeforeLoad 1.0', request);
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Operation types: create, edit, delete, xedit approve, reject,
 *            cancel (SO, ER, Time Bill, PO & RMA only) pack, ship (IF)
 *            markcomplete (Call, Task) reassign (Case) editforecast (Opp,
 *            Estimate)
 * @returns {Void}
 */
function userEventBeforeSubmit(type) {
	nlapiLogExecution('DEBUG', 'userEventBeforeSubmit 1.0', type);
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Operation types: create, edit, delete, xedit, approve,
 *            cancel, reject (SO, ER, Time Bill, PO & RMA only) pack, ship (IF
 *            only) dropship, specialorder, orderitems (PO only) paybills
 *            (vendor payments)
 * @returns {Void}
 */
function userEventAfterSubmit(type) {
	nlapiLogExecution('DEBUG', 'userEventBeforeSubmit 1.0', type);
}

function earnedHtml(){
	/*var earnedHtml = '<style>'+
    '  *{'+
    '      margin: 0;'+
    '      padding: 0;'+
    '  }'+
    '  canvas{'+
    '      padding-top: 7px !important;'+
    '  }'+
    '  table{'+
    '      text-align: center;'+
    '      border: 1px solid #cccccc;'+
    '      width: 99%;'+
    '      margin: 0 auto;'+
    '      margin-top: 20px;'+
    '      border-spacing: 0px;'+
    '  }'+
    '  table thead th,table tbody td{'+
    '      font-weight: normal;'+
    '      border-left: 1px solid #cccccc;'+
    '  }'+
    '  table tbody td{'+
    '      border-top: 1px solid #cccccc;'+
    '  }'+
    '  .borno{'+
    '      border-left: none;'+
    '  }'+
    '  .box{'+
    '      width: 100%;'+
    '      height: 100%;'+
    '  }'+
    '  .common{'+
    '      width: 98%;'+
    '      margin: 0 auto;'+
    '      border: 1px solid #cccccc;'+
    '  }'+
    '  .echartsbox{'+
    '      height: auto;'+
    '      overflow: hidden;'+
    '      border-top: none;'+
    '      padding-bottom: 20px;'+
    '      position: relative;'+
    '      min-width: 945px;'+
    '  }'+
    '  .echartscom{'+
    '      width: 49%;'+
    '      height: 300px;'+
    '      border: 1px solid #cccccc;'+
    '      margin-top: 5px;'+
    '      min-width: 460px;'+
    '  '+
    '  .echarts_left{'+
    '      float: left;'+
    '      margin-left: 5px;'+
    '  '+
    '  }'+
    '  .echarts_right{'+
    '      float: right;'+
    '      margin-right: 5px;'+
    '  }'+
    '  .ProgressBarox{'+
    '      position:absolute;'+
    '      height: 34px;'+
    '      font-size: 0.1em;'+
    '      width: 8%;'+
    '      text-align: center;'+
    '      top: 10px;'+
    '      left: 38%;'+
    '  }'+
    '  .ProgressBar1,.ProgressBar2,.ProgressBar3{'+
    '      position: relative;'+
    '      height: 10px;'+
    '      border: 1px solid #cccccc;'+
    '      line-height: 10px;'+
    '  }'+
    '  .ProgressBar1,.ProgressBar2{'+
    '      border-bottom: none;'+
    '  }'+
    '  .ProgressBarbg1,.ProgressBarbg2,.ProgressBarbg3{'+
    '      height: 10px;'+
    '      position: absolute;'+
    '      z-index: -1;'+
    '      left: 0;'+
    '      top: 0;'+
    '  }'+
    '  .ProgressBarbg1,.ProgressBarbg3{'+
    '      background: #69CB9A;'+
    '  }'+
    '  .ProgressBarbg2{'+
    '      background: #FD6868;'+
    '  }'+
    '  .ProgressBarbg1{'+
    '      width: 10%;'+
    '  }'+
    '  .ProgressBarbg2{'+
    '      width: 50%;'+
    '  }'+
    '  .ProgressBarbg3{'+
    '      width: 30%;'+
    '  }'+
    '  .switch{'+
    '      position: absolute;'+
    '      width: 13%;'+
    '      top: 10px;'+
    '      height: 34px;'+
    '      left: 90%;'+
    '      overflow: hidden;'+
    '  }'+
    '  .switch div{'+
    '      float: left;'+
    '      font-size: 0.1em;'+
    '      color: white;'+
    '  }'+
    '  .switch_CR,.switch_SPI,.switch_CPI{'+
    '      height: 20px;'+
    '      width: 20px;'+
    '      border-radius: 50%;'+
    '      text-align: center;'+
    '      line-height: 20px;'+
    '      margin-top: 5px;'+
    '  }'+
    '  .switch_CR{'+
    '      border: 1px solid #69CB9A;'+
    '      background: #69CB9A;'+
    '  }'+
    '   .switch_SPI{'+
    '      border: 1px solid #FDCB2E;'+
    '      background: #FDCB2E;'+
    '      margin-left: 3px;'+
    '  }'+
    '  .switch_CPI{'+
    '      border: 1px solid #FD6868;'+
    '      background: #FD6868;'+
    '      margin-left: 3px;'+
    '  }'+
    '  .switch_OFF{'+
    '      margin-top: 5px;'+
    '      margin-left: 3px;'+
    '      cursor: pointer;'+
    '  }'+
    '  @media screen and (max-width:1020px){'+
    '      .echarts_left{'+
    '          float:none;'+
    '          margin-left: 200px;'+
    '      }'+
    '      .echarts_right{'+
    '          float: none;'+
    '          margin-left:200px;'+
    '          margin-top: 20px;'+
    '      }'+
    '      .ProgressBarox{'+
    '          left: 60%;'+
    '      }'+
    '      .switch{'+
    '          top: 353px;'+
    '          left: 55%;'+
    '          width: 14%;'+
    '      }'+
    '  }'+
    '</style>' +' <div class="box">'+
    '        <div class="common echartsbox">'+
    '            <div class="echarts_left echartscom" id="echarts1">'+
    '           </div>'+
    '            <div class="echarts_right echartscom" id="echarts2">'+
    '            </div>'+
    '            <!-- 进度条开始-->'+
    '            <div class="ProgressBarox">'+
    '                <div class="ProgressBar1">'+
    '                    <div class="ProgressBarbg1">'+
    '                   </div>'+
    '                    10%'+
    '                </div>'+
    '                <div class="ProgressBar2">'+
    '                    <div class="ProgressBarbg2">'+
    '                   </div>'+
    '                    50%'+
    '                </div>'+
    '                <div class="ProgressBar3">'+
    '                    <div class="ProgressBarbg3">'+
    '                   </div>'+
    '                    30%'+
    '                </div>'+
    '            </div>'+
    '             <!-- 进度条结束-->'+
    '              <!-- 开关开始-->'+
    '             <div class="switch">'+
    '                    <div class="switch_CR">CR</div>'+
    '                    <div class="switch_SPI">SPI</div>'+
    '                    <div class="switch_CPI">CPI</div>'+
    '                    <div class="switch_OFF">'+
    '                        <img src="./img/off.png" alt="" id="tabOff" data-val="off">'+
    '                    </div>'+
    '             </div>'+
    '             <!-- 开关结束-->'+
    '            <div style="clear:both;"></div>'+
    '            <table>'+
    '                <thead>'+
    '                    <tr>'+
    '                        <th class="borno">计划值(PV)</th>'+
    '                        <th>实际值(AV)</th>'+
    '                        <th>挣值(EV)</th>'+
    '                        <th>进度偏差(SV)</th>'+
    '                        <th>成本偏差(CV)</th>'+
    '                        <th>关键比率(CR)</th>'+
    '                        <th>进度比率(SPI)</th>'+
    '                        <th class="borno">成本效率(CPI)</th>'+
    '                    </tr>'+
    '                </thead>'+
    '                <tbody>'+
    '                    <tr>'+
    '                        <td class="borno">11111</td>'+
    '                        <td>11111</td>'+
    '                        <td>11111</td>'+
    '                        <td>11111</td>'+
    '                        <td>11111</td>'+
    '                        <td>11111</td>'+
    '                        <td>11111</td>'+
    '                        <td class="borno">11111</td>'+
    '                    </tr>'+
    '                </tbody>'+
    '            </table>'+
    '        </div>'+
    '    </div>'+
    ' <script>'+
    ' var myChart1 = echarts.init(document.getElementById(\'echarts1\'));'+
    ' option1 = {'+
    '    tooltip: {'+
    '        trigger: \'axis\''+
    '    },'+
    '    legend: {'+
    '        data:[\'PV计划值\']'+
    '    },'+
    '    grid: {'+
    '        left: \'3%\','+
    '        right: \'4%\','+
    '        bottom: \'3%\','+
    '        containLabel: true'+
    '    },'+
    '    xAxis: {'+
    '        type: \'category\','+
    '        boundaryGap: false,'+
    '        data: [\'2018-1\']'+
    '    },'+
    '    yAxis: {'+
    '        type: \'value\''+
    '    },'+
    '    series: ['+
    '        {'+
    '            name:\'PV计划值\','+
    '            type:\'line\','+
    '            stack: \'总量\','+
    '            data:[12]'+
    '        }'+
    '    ]'+
    '};'+

    '        myChart1.setOption(option1);'+
    '</script>';*/
	//var earnedHtml ='<script>alert(1111)</script>';
	var html = '<div id="main" style="width: 600px;height:400px;"></div>';
	var earnedHtml =html +' <script>'+ ' var myChart = echarts.init(document.getElementById("main"));'+
	'var option = {'+
	'            title: {'+
	'                text: \'ECharts 入门示例\''+
	'            },'+
	'            tooltip: {},'+
	'            legend: {'+
	'                data:["销量"]'+
	'            },'+
	'            xAxis: {'+
	'                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]'+
	'            },'+
	'            yAxis: {},'+
	'            series: [{'+
	'                name: \'销量\','+
	'                type: \'bar\','+
	'                data: [5, 20, 36, 10, 10, 20]'+
	'            }]'+
	'        };' +
	'myChart.setOption(option);' +' </script>';
	/*var earnedHtml =html +' <script>'+ ' var myChart = document.getElementById("main");'+
	' myChart.style.backgroundColor="red";'
	+' </script>';*/
	return earnedHtml;
}
