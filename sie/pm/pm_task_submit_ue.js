/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 Sep 2018     Administrator
 *铭哥测试用的，后面要删除的-20181017
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
	if (type == 'edit' || type == 'create') {
		// nlapiLogExecution('DEBUG', 'huyuming', '123412');

		// 获取项目ID
		var projectId = parseInt(nlapiGetFieldValue('company'));

		// 加载自定义查询
		var searchStat = nlapiLoadSearch(null,
				'customsearch_milestone_percentage');

		// 查询条件
		// nlobjSearchColumn('company',null,'group')分组查询时定义查询条件
		// var filterColumn = new nlobjSearchColumn('company', null, 'group');
		var searchFilter = new nlobjSearchFilter('company', null, 'is',
				projectId);
		// 加载的查询设置filter
		// searchStat.setFilters(searchFilter);
		searchStat.addFilter(searchFilter);
		// 执行查询
		var searchResults = searchStat.runSearch();

		// 如果存在数据，则取第一条记录 custevent_milestone_percentage
		resultSet = searchResults.getResults(0, 1);
		if (resultSet.length > 0) {
			nlapiLogExecution('DEBUG', 'huyuming', resultSet[0]
					.getValue('custevent_milestone_percentage'));
		}
	}
}
