/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       29 Sep 2018     Administrator
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response){
	var bu = request.getParameter('bu');
	var dateStart = request.getParameter('dateStart');
	var dateEnd = request.getParameter('dateEnd');
//	getIdData(bu,dateStart,dateEnd);
	response.write(getMoneyData(bu,dateStart,dateEnd));
	return;
	
}


/**
 * 
 *筛选出符合条件的商机id与工程id
 * 
 *@param bu BU部门id 
 *@param dateStart 开始日期
 *@param dateEnd   开始日期
 *
 * @author Makaay
 */
function getIdData(bu,dateStart,dateEnd){
	
	var returnData = new Array();
	var filters = new Array();
	var columns = new Array();
	return returnData;
}


/**
 *获取对应的金额数据、 
 *
 *@param bu 部门id
 *@param dateStart 开始时间
 *@param dateEnd   结束时间
 * 
 *@author Makaay
 */
function getMoneyData(bu,dateStart,dateEnd){
	//从opportunity获取的金额
	if(dateStart > dateEnd || !dateStart || !dateEnd){//日期入参过滤
		return 'date error';
	}
	//筛选条件
	var dateFilters = null;
	var jobDateFilters = undefined;
	if(dateStart == dateEnd){//某一天
		dateFilters = new nlobjSearchFilter('trandate',null,'on',dateStart);
		jobDateFilters = new nlobjSearchFilter('dateCreated',null,'on',dateStart);
	}else{
		dateFilters = new nlobjSearchFilter('trandate',null, 'within',dateStart,dateEnd);
		jobDateFilters = new nlobjSearchFilter('dateCreated',null, 'within',dateStart,dateEnd);	
	}
	//赢单金额,取值
	var winAmount = 0;//赢单金额
	var opFilters = new Array();
	var oppoSearch = nlapiLoadSearch(null,'customsearch_custom_win_to_cash');
	var newSearch = nlapiCreateSearch(oppoSearch.getSearchType(), oppoSearch.getFilters(), oppoSearch.getColumns());
	opFilters.push(dateFilters);
	newSearch.addFilters(opFilters);
	var winResults = newSearch.runSearch();
	winAmount = winResults.getResults(0,1);
//	nlapiLogExecution('error','winAmount',JSON.stringify(winAmount));//debug
	winAmount = winAmount[0].getValue(new nlobjSearchColumn('custbody_latest_offer_summary',null,'sum'));
	//未立项金额,取值
	var noJobAmount = 0;//未立项金额
	var noJobFilters = new Array();
	noJobFilters.push(new nlobjSearchFilter('custbody_job_id',null,'anyof','@NONE@'));
	noJobFilters.push(dateFilters);
	var oppoSearch = nlapiLoadSearch(null,'customsearch_custom_win_to_cash');
	var newSearch = nlapiCreateSearch(oppoSearch.getSearchType(), oppoSearch.getFilters(), oppoSearch.getColumns());
	newSearch.addFilters(noJobFilters);
	var winResults = newSearch.runSearch();
	noJobAmount = winResults.getResults(0,1);
	noJobAmount = noJobAmount[0].getValue(new nlobjSearchColumn('custbody_latest_offer_summary',null,'sum'));
	//nlapiLogExecution('error','noJobAmount',noJobAmount);//debug
	//立项金额，取值
	var jobAmount = 0;//立项金额
	var jobFilters = new Array();
	jobFilters.push(new nlobjSearchFilter('custbody_job_id',null,'noneof','@NONE@'));
	jobFilters.push(dateFilters);
	var oppoSearch = nlapiLoadSearch(null,'customsearch_custom_win_to_cash');
	var newSearch = nlapiCreateSearch(oppoSearch.getSearchType(), oppoSearch.getFilters(), oppoSearch.getColumns());
	newSearch.addFilters(jobFilters);
	var jobResults = newSearch.runSearch();
	jobAmount = jobResults.getResults(0,1);
	jobAmount = jobAmount[0].getValue(new nlobjSearchColumn('custbody_latest_offer_summary',null,'sum'));
	//从job获取的金额

	var jobNewFilters = new Array();//项目条件
	jobNewFilters.push(jobDateFilters);

	if(bu != 'all' && bu != ''){
		var department = new nlobjSearchFilter('custentity_executive_department',null,'anyof', bu);
		jobNewFilters.push(department);
	}

	//年度KPI取值
	  //已保存搜索获取数据
	var year = new Date().getFullYear();
	var yearList = nlapiLoadSearch(null,'customsearch_bu_year_indicators');
	var yearListSearch = nlapiCreateSearch(yearList.getSearchType(), yearList.getFilters(),yearList.getColumns()).runSearch();
	var y = yearListSearch.getResults(0,50);
	var val = undefined;
	var yearIndicators = new Object();
	var response = undefined;

	// nlapiLogExecution('error','lastResults',JSON.stringify(response));

	//筛选填充
	nlapiLogExecution('error','y',!!y)
	if(!!y){
		if(y.length > 0){
			nlapiLogExecution('error','length',y.length)
			for(var x = 0; x < y.length; x ++){
				
				var ye = JSON.parse(JSON.stringify(y[x]));
				var l = ye['columns']['custrecord_year_2']['name'];
				
				if(l == year){
	
					val = ye['id'];
	
					response = nlapiLoadRecord('customrecord_bu_year_kpi',val);
					response = JSON.parse(JSON.stringify(response));

					for(var q = 0; q < response['recmachcustrecord_depart_quote'].length; q ++){
						nlapiLogExecution('error','response',response['recmachcustrecord_depart_quote'].length)
	
						if(bu == 'all' || bu == ''){
	
							yearIndicators.custrecord_year_project = response['custrecord_year_project'];
							yearIndicators.custrecord_bill_kpi = response['custrecord_bill_kpi'];
							yearIndicators.custrecord_income_kpi = response['custrecord_income_kpi'];
							break;
	
						}else{
							nlapiLogExecution('error','lastResults',JSON.stringify(response))
							if(response['recmachcustrecord_depart_quote'][q]['custrecord_department_name']['internalid'] == bu){

								yearIndicators.custrecord_year_project = response['recmachcustrecord_depart_quote'][q]['custrecord_quote_1'];
								yearIndicators.custrecord_bill_kpi = response['recmachcustrecord_depart_quote'][q]['custrecord_dep_quote_2'];
								yearIndicators.custrecord_income_kpi = response['recmachcustrecord_depart_quote'][q]['custrecord_dep_quote_3'];
								break;
	
							}
	
							if(q == (response['recmachcustrecord_depart_quote'].length - 1)){
								
								yearIndicators.custrecord_year_project = 'N/A';
								yearIndicators.custrecord_bill_kpi = 'N/A';
								yearIndicators.custrecord_income_kpi = 'M/A';
	
							}
	
						}			
					}			
					break
				}
			}
		}else{

			yearIndicators.custrecord_year_project = 'N/A';
			yearIndicators.custrecord_bill_kpi = 'N/A';
			yearIndicators.custrecord_income_kpi = 'N/A';
	
		}
	}else{

		yearIndicators.custrecord_year_project = 'N/A';
		yearIndicators.custrecord_bill_kpi = 'N/A';
		yearIndicators.custrecord_income_kpi = 'N/A';

	}
	
	var jobSearch = nlapiLoadSearch(null,'customsearch_win_to_cash_job');
	var jobNewSearch = nlapiCreateSearch(jobSearch.getSearchType(), jobSearch.getFilters(),jobSearch.getColumns());
	jobNewSearch.addFilters(jobNewFilters);
	var jobResultsData = jobNewSearch.runSearch();
	var columnsold = jobResultsData.getColumns();
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
    var list;
    var dataJson = {};//金额数据
    list = jobResultsData.getResults(0,1);
    if (list != null) {
         for (var i = 0; i < list.length; i++) {
             dataJson['shouldAmount'] = list[i].getValue(columns['formulanumeric0']);//应收账款
             dataJson['cashBackAmount'] = list[i].getValue(columns['formulanumeric1']);//现金回款
             dataJson['noBillAmount'] = list[i].getValue(columns['formulanumeric2']);//未开票收入
             dataJson['formulanumeric3'] = list[i].getValue(columns['formulanumeric3']);//开票收入
             dataJson['noDoneAmount'] = list[i].getValue(columns['formulanumeric4']);//未完工金额
             dataJson['doneAmount'] = list[i].getValue(columns['formulanumeric5']);//已完工金额
         }
    }
    //组装返回数据
    var returnAmountData = null;
    returnAmountData = [
         {'id':1,'value':winAmount==''?'0':winAmount,'text':'赢单金额'},
         {'id':2,'value':noJobAmount==''?'0':noJobAmount,'text':'未立项金额'},
         {'id':3,'value':jobAmount==''?'0':jobAmount,'text':'立项金额'},
         {'id':4,'value':dataJson['shouldAmount']==''?'0':dataJson['shouldAmount'],'text':'应收账款'},
         {'id':5,'value':dataJson['cashBackAmount']==''?'0':dataJson['cashBackAmount'],'text':'现金回款'},
         {'id':6,'value':dataJson['noBillAmount']==''?'0':dataJson['noBillAmount'],'text':'未开票收入'},
         {'id':7,'value':dataJson['formulanumeric3']==''?'0':dataJson['formulanumeric3'],'text':'开票收入'},
         {'id':8,'value':dataJson['noDoneAmount']==''?'0':dataJson['noDoneAmount'],'text':'未完工金额'},
				 {'id':9,'value':dataJson['doneAmount']==''?'0':dataJson['doneAmount'],'text':'已完工金额'},
				 yearIndicators
    ];
  // nlapiLogExecution('error','lastResults',JSON.stringify(returnAmountData));//debug
    return JSON.stringify(returnAmountData);
}






















