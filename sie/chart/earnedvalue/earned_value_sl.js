/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       24 Oct 2018     YHR
 *
 */
function getValue(request,response){
	
	if(request.getMethod() == 'GET'){
		
		//获取当前记录的internal ID
		var recordId = nlapiGetRecordId();
		
		//创建丄1�7个搜索，找到对应记录ID的数据记彄1�7
		var filters = new nlobjSearchFilter('custrecord_project_id', null, 'is', recordId);
		var columns = [];
		columns[0] = new nlobjSearchColumn('custrecord_pv_value');
		columns[1] = new nlobjSearchColumn('custrecord_ac_value');
		columns[2] = new nlobjSearchColumn('custrecord_ev_value');
		columns[3] = new nlobjSearchColumn('custrecord_sv_value');
		columns[4] = new nlobjSearchColumn('custrecord_cv_value');
		columns[5] = new nlobjSearchColumn('custrecord_spi_value');
		columns[6] = new nlobjSearchColumn('custrecord_cpi_value');
		columns[7] = new nlobjSearchColumn('custrecord_cr_value');
		
		var result = nlapiSearchRecord('customrecord_project_earned_value',null,filters,columns);
		
		//从搜索结果中抽取扄1�7霄1�7数�1�7�1�7
		var PV = result[0].getValue('custrecord_pv_value');//抓取PV倄1�7
		var AC = result[0].getValue('custrecord_ac_value');//抓取AC倄1�7
		var EV = result[0].getValue('custrecord_ev_value');//抓取EV倄1�7
		var SV = result[0].getValue('custrecord_sv_value');//抓取SV倄1�7
		var CV = result[0].getValue('custrecord_cv_value');//抓取CV倄1�7
		var SPI = result[0].getValue('custrecord_spi_value');//抓取SPI倄1�7
		var CPI = result[0].getValue('custrecord_cpi_value');//抓取CPI倄1�7
		var CR = result[0].getValue('custrecord_cr_value');//抓取CR倄1�7
		
	    //创建数组并封装数捄1�7
	    var parameters = new Array();
	    parameters['value1'] = PV;
	    parameters['value2'] = AC;
	    parameters['value3'] = EV;
	    parameters['value4'] = SV;
	    parameters['value5'] = CV;
	    parameters['value6'] = SPI;
	    parameters['value7'] = CPI;
	    parameters['value8'] = CR;
	    //将封装好的数据传输回记录
	    //nlapiSetRedirectURL('SUITELET','customscript73','customdeploy2',null,parameters);
		
	    response.write(parameters);
	}	
}