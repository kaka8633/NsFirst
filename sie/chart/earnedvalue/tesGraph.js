/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       16 Oct 2018     Administrator
 *
 */

/**
 * 新建所有已存在项目的对应《客制化项目挣值图数据统计表》，创建时判断是否已有针对同一项目的同类型记录，如果有则周数+1新建下一周
 * 通过定时循环抓取已保存记录的信息，将可以抓取到的项目统计信息覆盖入已有的最新同项目数据统计记录
 * 已保存记录来源：客制化作业时间跟踪视图（by：胡育铭）
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 * @author YHR
 */
function scheduled(type) {
	
	// 第一部分，对所有已存在的项目数据采集建立初版，所有值为0
	var column = [];
	column[0] = new nlobjSearchColumn('companyname');
	column[1] = new nlobjSearchColumn('startdate');
	column[2] = new nlobjSearchColumn('calculatedenddate');
	var jobProject = nlapiSearchRecord('job', null, null, column);
	
	//抓取当前时间
	var todayTime = new Date();

	// 通过循环跑出并建立所有已存在项目的数据统计记录

	for (var v = 0; v < jobProject.length; v++) {

		var projectId = jobProject[v].getId();
		
		//抓取项目的<开始日期>和<结束日期>
		var startTime = nlapiStringToDate(jobProject[v].getValue('startdate'));
		var endTime = nlapiStringToDate(jobProject[v].getValue('calculatedenddate'));
		
		//将当日时间与项目木开的开始和结束日期做比对
		if(todayTime >= startTime && todayTime <= endTime){

			// 使用项目ID，对已建立的<挣值图数据统计表>进行搜索
			var filter = new nlobjSearchFilter('custrecord_project_id', null, 'equalto',projectId);
			var columns = new nlobjSearchColumn('custrecord_week_value').setSort(true);// 按周数排序
			var dataRecord = nlapiSearchRecord('customrecord_project_earned_value',null, filter, columns);

			// 判断在<挣值图数据统计>记录中是否有此项目的记录存在
			// 如果存在
			var newWeek = 1;
			var weekDescription = '第1周';
			if (dataRecord) {
				newWeek = parseInt(dataRecord[0].getValue('custrecord_week_value')) + 1;
				var weekDescription = '第'+newWeek+'周';
			}

			var newChartData = nlapiCreateRecord('customrecord_project_earned_value');
			// 在新纪录中全部放入数值0
			newChartData.setFieldValue('custrecord_project_name', jobProject[v]
					.getValue('companyname'));// 放入项目名称
			newChartData.setFieldValue('custrecord_project_id', projectId);// 放入项目ID
			newChartData.setFieldValue('custrecord_ac_value', '0');// 放入AC值
			newChartData.setFieldValue('custrecord_pv_value', '0');// 放入PV值
			newChartData.setFieldValue('custrecord_ev_value', '0');// 放入EV值
			newChartData.setFieldValue('custrecord_sv_value', '0');// 放入SV值
			newChartData.setFieldValue('custrecord_cv_value', '0');// 放入CV值
			newChartData.setFieldValue('custrecord_spi_value', '0');// 放入SPI值
			newChartData.setFieldValue('custrecord_cpi_value', '0');// 放入CPI值
			newChartData.setFieldValue('custrecord_cr_value', '0');// 放入CR值
			newChartData.setFieldValue('custrecord_week_value', newWeek);// 放入周数
			newChartData.setFieldValue('custrecord_week_description', weekDescription);//放入周数描述

			nlapiSubmitRecord(newChartData);
			
		}

	}

	//第二部分，通过已保存搜索整理已有的项目数据，并覆盖
    var loadSearch = nlapiLoadSearch(null, 'customsearch_pojects_time_tracking_view');//填入已保存搜索的id
    var searchResults = loadSearch.runSearch();
    var columnsold = searchResults.getColumns();
    var columns = new Object();
    if (columnsold) {
         for (var c = 0; c < columnsold.length; c++) {
             var co = columnsold[c];
             if (co.getName() == 'formulanumeric') {
                 columns[co.getName() + '' + c] = co;
             } else {
                 columns[co.getName()] = co;
             }
         }
    }
    var startIndex = 0;
    var list;
    var dataAry = [];
    var dataJson = {};
    // 一次最多还能取1000条，如果大于1000条数据，则拆开
    list = searchResults.getResults(startIndex, startIndex + 1000);
    if (list != null) {
         for (var i = 0; i < list.length; i++) {
             var formulanumeric0 = list[i].getValue(columns['altname']);//获取项目名称
             var formulanumeric1 = list[i].getValue(columns['entityid']);//获取项目编号
             var formulanumeric2 = list[i].getValue(columns['entitynumber']);
             var formulanumeric3 = list[i].getValue(columns['formulanumeric3']);//获取AC值
             var formulanumeric4 = list[i].getValue(columns['formulanumeric4']);//获取PV值
             var formulanumeric5 = list[i].getValue(columns['internalid']);//获取internal ID
             
             dataJson = {};
             dataJson['formulanumeric0'] = formulanumeric0;
             dataJson['formulanumeric1'] = formulanumeric1;
             dataJson['formulanumeric2'] = formulanumeric2;
             dataJson['formulanumeric3'] = formulanumeric3;
             dataJson['formulanumeric4'] = formulanumeric4;
             dataJson['formulanumeric5'] = formulanumeric5;
             dataAry.push(dataJson);
             
         }
         
         for(var n = 0; n < dataAry.length; n++){
        	 
 			if (dataAry[n].formulanumeric5) {

				// 根据项目ID获取项目记录
				var jobRecord = nlapiLoadRecord('job', dataAry[n].formulanumeric5);
				var percentage = jobRecord.getFieldValue('custentity_pm_percentage');

				if (percentage == '' || percentage == null) {
					percentage = '0';
				}

				var pv = parseInt(dataAry[n].formulanumeric4);
				var ac = parseInt(dataAry[n].formulanumeric3);
				var ev = parseInt(percentage) / 100 * pv;// 获取EV值
				var sv = ev - pv;// 获取SV值
				var cv = ev - ac;// 获取CV值
				var spi = ev / pv;// 获取SPI值
				if (spi > 1.3 || spi < 0.8) {
					spi = 1;
				}else if ((spi >= 0.8 && spi < 0.9) || (spi > 1.2 && spi <= 1.3)) {
					spi = -1;
				}else{
					spi = 0;
				}
				var cpi = ev / ac;// 获取CPI值
				var cr = spi * cpi;// 获取CR值

     			//使用项目ID，对已建立的<挣值图数据统计表>进行搜索
     			var filter = new nlobjSearchFilter('custrecord_project_id',null,'equalto',dataAry[n].formulanumeric5);
     			var columns = new nlobjSearchColumn('custrecord_week_value').setSort(true);//按周数排序
     			var dataRecord = nlapiSearchRecord('customrecord_project_earned_value', null, filter, columns);
     			
     			if(dataRecord){
     				
         			var recordId = dataRecord[0].getId();
         			
         			//选取其中最新的一组记录，并将统计数据覆盖
                     var lastRecord = nlapiLoadRecord('customrecord_project_earned_value',recordId);
                     lastRecord.setFieldValue('custrecord_project_name', dataAry[n].formulanumeric0);//放入项目名称
                     lastRecord.setFieldValue('custrecord_project_number', dataAry[n].formulanumeric1);//放入项目编号
                     lastRecord.setFieldValue('custrecord_project_id', dataAry[n].formulanumeric5);//放入项目ID
                     lastRecord.setFieldValue('custrecord_ac_value', dataAry[n].formulanumeric3);//放入AC值
                     lastRecord.setFieldValue('custrecord_pv_value', dataAry[n].formulanumeric4);//放入PV值
                     lastRecord.setFieldValue('custrecord_ev_value', ev);//放入EV值
                     lastRecord.setFieldValue('custrecord_sv_value', sv);//放入SV值
                     lastRecord.setFieldValue('custrecord_cv_value', cv);//放入CV值
                     lastRecord.setFieldValue('custrecord_spi_value', spi);//放入SPI值
                     lastRecord.setFieldValue('custrecord_cpi_value', cpi);//放入CPI值
                     lastRecord.setFieldValue('custrecord_cr_value', cr);//放入CR值
                     
                     nlapiSubmitRecord(lastRecord); 
                     
                     
                    var crFlag = 0;
                    var cpiFlag = 0;
                    var spiFlag = 0;
                    
                     if (cr > 1.3 || cr < 0.8) {
                    	 crFlag = 1;
     				}else if ((cr >= 0.8 && cr < 0.9) || (cr > 1.2 && cr <= 1.3)) {
     					crFlag = -1;
     				}
                     
                     if (cpi > 1.3 || cpi < 0.8) {
                    	 cpiFlag = 1;
     				}else if ((cpi >= 0.8 && cpi < 0.9) || (cpi > 1.2 && cpi <= 1.3)) {
     					cpiFlag = -1;
     				}
                     
                     if (spi > 1.3 || spi < 0.8) {
                    	 spiFlag = 1;
     				}else if ((spi >= 0.8 && spi < 0.9) || (spi > 1.2 && spi <= 1.3)) {
     					spiFlag = -1;
     				}
                     
                     nlapiSubmitField('job', dataAry[n].formulanumeric5, 'custentity_cr_value', crFlag);
                     nlapiSubmitField('job', dataAry[n].formulanumeric5, 'custentity_spi_value', spiFlag);
                     nlapiSubmitField('job', dataAry[n].formulanumeric5, 'custentity_cpi_value', cpiFlag);
     				
     			}
			}
         }
	}
}


//循环删除记录
function useView(request,response){

	  if(request.getMethod() == 'GET'){
	    
	    var result = nlapiSearchRecord('customrecord_project_earned_value');
	    
	    for(var i = 0;i < result.length; i++){
	      
	      nlapiDeleteRecord('customrecord_project_earned_value',result[i].getId());
	      
	    }
	    
	  }
	  
	}














