/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       24 Oct 2018     YHR
 *
 */
function getValue(request,response){
	
	if(request.getMethod() == 'GET'){
		
		//鑾峰彇褰撳墠璁板綍鐨刬nternal ID
		var recordId = nlapiGetRecordId();
		
		//鍒涘缓涓�涓悳绱紝鎵惧埌瀵瑰簲璁板綍ID鐨勬暟鎹褰�
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
		
		//浠庢悳绱㈢粨鏋滀腑鎶藉彇鎵�闇�鏁板��
		var PV = result[0].getValue('custrecord_pv_value');//鎶撳彇PV鍊�
		var AC = result[0].getValue('custrecord_ac_value');//鎶撳彇AC鍊�
		var EV = result[0].getValue('custrecord_ev_value');//鎶撳彇EV鍊�
		var SV = result[0].getValue('custrecord_sv_value');//鎶撳彇SV鍊�
		var CV = result[0].getValue('custrecord_cv_value');//鎶撳彇CV鍊�
		var SPI = result[0].getValue('custrecord_spi_value');//鎶撳彇SPI鍊�
		var CPI = result[0].getValue('custrecord_cpi_value');//鎶撳彇CPI鍊�
		var CR = result[0].getValue('custrecord_cr_value');//鎶撳彇CR鍊�
		
	    //鍒涘缓鏁扮粍骞跺皝瑁呮暟鎹�
	    var parameters = new Array();
	    parameters['value1'] = PV;
	    parameters['value2'] = AC;
	    parameters['value3'] = EV;
	    parameters['value4'] = SV;
	    parameters['value5'] = CV;
	    parameters['value6'] = SPI;
	    parameters['value7'] = CPI;
	    parameters['value8'] = CR;
	    //灏嗗皝瑁呭ソ鐨勬暟鎹紶杈撳洖璁板綍
	    //nlapiSetRedirectURL('SUITELET','customscript73','customdeploy2',null,parameters);
		
	    response.write(parameters);
	}	
}