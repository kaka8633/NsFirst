function hands_up(request, response) {
	
	if(request.getMethod() == 'GET'){
		
		var newForm = nlapiCreateForm('挣值图',true);
		
		newForm.setScript('customscript_earnedvalue_echarts_cs');
		
		newForm.setScript('customscript_earnedvalue_jquery_cs');
		
		newForm.setScript('customscript_earnedvalue_option_cs');
		
		newForm.addField('custpage_earnedvalue', 'inlinehtml').setDefaultValue(
				
				'<style>'+
			    '.zbox canvas{padding-top: 7px !important;}'+
			    '@media screen and (max-width:1020px){.echarts_left{float:none;margin-left: 200px;}'+
			        '.echarts_right{float: none;margin-left:200px;margin-top: 20px;}.ProgressBarox{left: 60%;}'+
			        '.switch{top: 353px;left: 55%;width: 14%;}}'+
			'</style>'+
			
		    '<div class="zbox" style="height:100%;width:100%;">'+
		        '<div style="width:98%;margin:0 auto;border:1px solid #cccccc;height: auto;overflow: hidden;border-top: none;padding-bottom: 20px;position: relative;min-width: 945px;">'+
		            '<div class="echarts_left" id="echarts1" style="width:612px;height: 300px;border: 1px solid #cccccc;margin-top:5px;min-width: 460px;float: left; margin-left: 5px;">'+
	
		            '</div>'+
		            '<div class="echarts_right" id="echarts2" style="width:612px;height: 300px;border: 1px solid #cccccc;margin-top:5px;min-width: 460px; float: right;margin-right: 5px;">'+
		                
		            '</div>'+
		            '<!-- 进度条开始-->'+
		            '<div style="position:absolute;height: 34px;font-size: 0.1em; width: 8%;text-align: center; top: 10px;left: 38%;">'+
		                '<div style=" position: relative;height: 10px;border: 1px solid #cccccc;line-height: 10px;border-bottom: none;">'+
		                    '<div style="  height: 10px;position: absolute;z-index: -1; left: 0; top: 0; background: #69CB9A; width: 10%;">'+
	
		                    '</div>'+
		                    '10%'+
		                '</div>'+
		                '<div style=" position: relative;height: 10px;border: 1px solid #cccccc;line-height: 10px;border-bottom: none;">'+
		                    '<div style="  height: 10px;position: absolute;z-index: -1; left: 0; top: 0; background: #FD6868;width: 50%;">'+
	
		                    '</div>'+
		                    '50%'+
		                '</div>'+
		                '<div style=" position: relative;height: 10px;border: 1px solid #cccccc;line-height: 10px;">'+
		                    '<div style="  height: 10px;position: absolute;z-index: -1; left: 0; top: 0; background: #69CB9A; width: 30%;">'+
	
		                    '</div>'+
		                    '30%'+
		                '</div>'+
		            '</div>'+
		             '<!-- 进度条结束-->'+
		              '<!-- 开关开始-->'+
		             '<div style=" position: absolute;width: 13%;top: 10px;height: 34px;left: 90%;overflow: hidden;">'+
		                    '<div style=" height: 20px;width: 20px;border-radius: 50%;text-align: center;line-height: 20px; margin-top: 5px; float: left;font-size: 10px;color: white; height: 20px;width: 20px;border-radius: 50%;text-align: center;line-height: 20px;margin-top: 5px;border: 1px solid #69CB9A;background: #69CB9A;">CR</div>'+
		                    '<div style=" height: 20px;width: 20px;border-radius: 50%;text-align: center;line-height: 20px; margin-top: 5px;float: left;font-size: 10px;color: white; height: 20px;width: 20px;border-radius: 50%;text-align: center;line-height: 20px;margin-top: 5px; border: 1px solid #FDCB2E; background: #FDCB2E;margin-left: 3px;">SPI</div>'+
		                    '<div style=" height: 20px;width: 20px;border-radius: 50%;text-align: center;line-height: 20px; margin-top: 5px;float: left;font-size: 10px;color: white; height: 20px;width: 20px;border-radius: 50%;text-align: center;line-height: 20px;margin-top: 5px;border: 1px solid #FD6868;background: #FD6868;margin-left: 3px;">CPI</div>'+
		                    '<div style="  margin-top: 5px; margin-left: 3px;cursor: pointer;float: left;font-size: 10px;color: white;">'+
		                        '<img src="https://system.na2.netsuite.com/core/media/media.nl?id=9158&c=1979444&h=db66243fdd9b511b369d" alt="" id="tabOff" onclick="changeEcharts()" data-val="off">'+
		                    '</div>'+
		             '</div>'+
		             '<!-- 开关结束-->'+
		            '<div style="clear:both;"></div>'+
		            '<table style="text-align: center;border: 1px solid #cccccc;width: 99%;margin: 0 auto;margin-top: 20px;border-spacing: 0px;">'+
		                '<thead>'+
		                    '<tr>'+
		                        '<th style=" font-weight: normal;">计划值(PV)</th>'+
		                        '<th style=" font-weight: normal;border-left: 1px solid #cccccc;">实际值(AV)</th>'+
		                        '<th style=" font-weight: normal;border-left: 1px solid #cccccc;">挣值(EV)</th>'+
		                        '<th style=" font-weight: normal;border-left: 1px solid #cccccc;">进度偏差(SV)</th>'+
		                        '<th style=" font-weight: normal;border-left: 1px solid #cccccc;">成本偏差(CV)</th>'+
		                        '<th style=" font-weight: normal;border-left: 1px solid #cccccc;">关键比率(CR)</th>'+
		                        '<th style=" font-weight: normal;border-left: 1px solid #cccccc;">进度比率(SPI)</th>'+
		                        '<th style=" font-weight: normal;">成本效率(CPI)</th>'+
		                    '</tr>'+
		                '</thead>'+
		                '<tbody>'+
		                    '<tr>'+
		                        '<td style=" font-weight: normal;border-top: 1px solid #cccccc;">11111</td>'+
		                        '<td style=" font-weight: normal;border-left: 1px solid #cccccc;border-top: 1px solid #cccccc">11111</td>'+
		                        '<td style=" font-weight: normal;border-left: 1px solid #cccccc;border-top: 1px solid #cccccc">11111</td>'+
		                        '<td style=" font-weight: normal;border-left: 1px solid #cccccc;border-top: 1px solid #cccccc">11111</td>'+
		                        '<td style=" font-weight: normal;border-left: 1px solid #cccccc;border-top: 1px solid #cccccc">11111</td>'+
		                        '<td style=" font-weight: normal;border-left: 1px solid #cccccc;border-top: 1px solid #cccccc">11111</td>'+
		                        '<td style=" font-weight: normal;border-left: 1px solid #cccccc;border-top: 1px solid #cccccc">11111</td>'+
		                        '<td style=" font-weight: normal;border-top: 1px solid #cccccc">11111</td>'+
		                    '</tr>'+
		                '</tbody>'+
		            '</table>'+
		        '</div>'+
		    '</div>'
				
		);
		
		response.writePage(newForm);
		
	}
	
}