/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       11 Sep 2018     huyuming
 *
 */
/**
 * 全局变量
 */
var salary_record_url = nlapiResolveURL('RECORD', 'customrecord_salary_detail')
		+ '&id=';
/**
 * 查询逻辑
 * 
 * @param form
 * @param status
 *            状态
 * @param subCompanyFilter
 *            子公司
 * @param periodFilter
 *            期间
 * @param departmentFilter
 *            部门
 * @returns
 */
function searchRecord(form, subCompanyFilter, periodFilter, departmentFilter) {
	var filters = [];
	// 参数不为空时添加参数到查询条件
	if (subCompanyFilter) {
		filters.push(new nlobjSearchFilter('custrecord_sd_subcompany', null,
				'is', subCompanyFilter));
	}
	/*if (periodFilter) {
		filters.push(new nlobjSearchFilter('custrecord_sd_period', null, 'is',
				periodFilter));
	}*/
	if (departmentFilter) {
		filters.push(new nlobjSearchFilter('custrecord_sd_department', null,
				'is', departmentFilter));
	}
	
	filters.push(new nlobjSearchFilter('custrecord_sd_period', null, 'is',
			periodFilter));

	// 定义搜索的列：查询结果需要展示的列（表的列名内部ID）
	var searchColumns = [];
	searchColumns[0] = new nlobjSearchColumn('custrecord_sd_subcompany');
	searchColumns[1] = new nlobjSearchColumn('custrecord_sd_period');
	searchColumns[2] = new nlobjSearchColumn('custrecord_sd_employee');
	searchColumns[3] = new nlobjSearchColumn('custrecord_sd_professional_staff');
	searchColumns[4] = new nlobjSearchColumn('custrecord_sd_department');
	searchColumns[5] = new nlobjSearchColumn('custrecord_sd_mobile');
	searchColumns[6] = new nlobjSearchColumn('custrecord_sd_bank_of_deposit');
	searchColumns[7] = new nlobjSearchColumn('custrecord_sd_cnaps');
	searchColumns[8] = new nlobjSearchColumn('custrecord_sd_account_number');
	searchColumns[9] = new nlobjSearchColumn('custrecord_sd_basic_salary');
	searchColumns[10] = new nlobjSearchColumn('custrecord_sd_ability_salary');
	searchColumns[11] = new nlobjSearchColumn('custrecord_sd_branch_salary');
	searchColumns[12] = new nlobjSearchColumn('custrecord_sd_devison_salary');
	searchColumns[13] = new nlobjSearchColumn('custrecord_sd_trip_salary');
	searchColumns[14] = new nlobjSearchColumn('custrecord_sd_lunch_salary');
	searchColumns[15] = new nlobjSearchColumn('custrecord_sd_bonuse');
	searchColumns[16] = new nlobjSearchColumn('custrecord_sd_adjustment');
	searchColumns[17] = new nlobjSearchColumn(
			'custrecord_sd_adjustment_comment');
	searchColumns[18] = new nlobjSearchColumn('custrecord_sd_total_salary');
	searchColumns[19] = new nlobjSearchColumn('custrecord_sd_social_planning');
	searchColumns[20] = new nlobjSearchColumn('custrecord_sd_fund');
	searchColumns[21] = new nlobjSearchColumn('custrecord_sd_tax');
	searchColumns[22] = new nlobjSearchColumn('custrecord_others');
	searchColumns[23] = new nlobjSearchColumn('custrecord_sd_minus_totail');
	searchColumns[24] = new nlobjSearchColumn('custrecord_sd_actual_salary');
	searchColumns[25] = new nlobjSearchColumn('internalid');

	var searchResults = nlapiCreateSearch('customrecord_salary_detail',
			filters, searchColumns).runSearch();

	var sublist = form.getSubList('custpage_salary_detail_sublist');
	var startIndex = 0;
	var index = 1;
	do {
		var resultSet = searchResults.getResults(startIndex, startIndex + 1000);
		for (var i = 0; i < resultSet.length; i++) {
			var intIdRs = resultSet[i].getValue('internalId');
			var subcompanyRs = resultSet[i].getText('custrecord_sd_subcompany');
			var periodRs = resultSet[i].getText('custrecord_sd_period');
			var employeeRs = resultSet[i].getText('custrecord_sd_employee');
			var staffRs = resultSet[i]
					.getValue('custrecord_sd_professional_staff');
			var departmentRs = resultSet[i].getText('custrecord_sd_department');
			var mobileRs = resultSet[i].getValue('custrecord_sd_mobile');
			var depositRs = resultSet[i]
					.getValue('custrecord_sd_bank_of_deposit');
			var cnapsRs = resultSet[i].getValue('custrecord_sd_cnaps');
			var accountNumberRs = resultSet[i]
					.getValue('custrecord_sd_account_number');
			var basicSalaryRs = resultSet[i]
					.getValue('custrecord_sd_basic_salary');
			var abilitySalaryRs = resultSet[i]
					.getValue('custrecord_sd_ability_salary');
			var branchSalaryRs = resultSet[i]
					.getValue('custrecord_sd_branch_salary');
			var devisonSalaryRs = resultSet[i]
					.getValue('custrecord_sd_devison_salary');
			var tripSalaryRs = resultSet[i]
					.getValue('custrecord_sd_trip_salary');
			var lunchSalaryRs = resultSet[i]
					.getValue('custrecord_sd_lunch_salary');
			var bonuseRs = resultSet[i].getValue('custrecord_sd_bonuse');
			var adjustmentRs = resultSet[i]
					.getValue('custrecord_sd_adjustment');
			var adjustmentCommentRs = resultSet[i]
					.getValue('custrecord_sd_adjustment_comment');
			var totalSalaryRs = resultSet[i]
					.getValue('custrecord_sd_total_salary');
			var socialPlanningRs = resultSet[i]
					.getValue('custrecord_sd_social_planning');
			var fundRs = resultSet[i].getValue('custrecord_sd_fund');
			var taxRs = resultSet[i].getValue('custrecord_sd_tax');
			var othersRs = resultSet[i].getValue('custrecord_others');
			var minusTotailRs = resultSet[i]
					.getValue('custrecord_sd_minus_totail');
			var actualSalaryRs = resultSet[i]
					.getValue('custrecord_sd_actual_salary');

			// 赋值
			sublist.setLineItemValue('custpage_internal_id', index, intIdRs);
			sublist.setLineItemValue('custpage_sd_subcompany', index,
					subcompanyRs);
			sublist.setLineItemValue('custpage_sd_period', index, periodRs);
			sublist.setLineItemValue('custpage_sd_employee', index, employeeRs);
			sublist.setLineItemValue('custpage_sd_professional_staff', index,
					staffRs);
			sublist.setLineItemValue('custpage_sd_department', index,
					departmentRs);
			sublist.setLineItemValue('custpage_sd_mobile', index, mobileRs);
			sublist.setLineItemValue('custpage_sd_bank_of_deposit', index,
					depositRs);
			sublist.setLineItemValue('custpage_sd_cnaps', index, cnapsRs);
			sublist.setLineItemValue('custpage_sd_account_number', index,
					accountNumberRs);
			sublist.setLineItemValue('custpage_sd_basic_salary', index,
					basicSalaryRs);
			sublist.setLineItemValue('custpage_sd_ability_salary', index,
					abilitySalaryRs);
			sublist.setLineItemValue('custpage_sd_branch_salary', index,
					branchSalaryRs);
			sublist.setLineItemValue('custpage_sd_devison_salary', index,
					devisonSalaryRs);
			sublist.setLineItemValue('custpage_sd_trap_salary', index,
					tripSalaryRs);
			sublist.setLineItemValue('custpage_sd_lunch_salary', index,
					lunchSalaryRs);
			sublist.setLineItemValue('custpage_sd_bonuse', index, bonuseRs);
			sublist.setLineItemValue('custpage_sd_adjustment', index,
					adjustmentRs);
			sublist.setLineItemValue('custpage_sd_adjustment_comment', index,
					adjustmentCommentRs);
			sublist.setLineItemValue('custpage_sd_total_salary', index,
					totalSalaryRs);
			sublist.setLineItemValue('custpage_sd_social_planning', index,
					socialPlanningRs);
			sublist.setLineItemValue('custpage_sd_fund', index, fundRs);
			sublist.setLineItemValue('custpage_sd_tax', index, taxRs);
			sublist.setLineItemValue('custpage_sd_others', index, othersRs);
			sublist.setLineItemValue('custpage_sd_minus_totail', index,
					minusTotailRs);
			sublist.setLineItemValue('custpage_sd_actual_salary', index,
					actualSalaryRs);
			var salary_record_link = salary_record_url + intIdRs;

			sublist
					.setLineItemValue('custpage_link', index,
							salary_record_link);
			index++;
		}
		startIndex += 1000;
	} while (resultSet != null && resultSet.length > 0);
}

/**
 * 删除逻辑
 * 
 * @param form
 * @param status
 *            状态
 * @param subCompanyFilter
 *            子公司
 * @param periodFilter
 *            期间
 * @param departmentFilter
 *            部门
 * @returns
 */
function deleteRecord(form, subCompanyFilter, periodFilter, departmentFilter) {
	var filters = [];
	// 参数不为空时添加参数到查询条件
	if (subCompanyFilter) {
		filters.push(new nlobjSearchFilter('custrecord_sd_subcompany', null,
				'is', subCompanyFilter));
	}
	/*
	 * if (periodFilter) { filters.push(new
	 * nlobjSearchFilter('custrecord_sd_period', null, 'is', periodFilter)); }
	 */
	if (departmentFilter) {
		filters.push(new nlobjSearchFilter('custrecord_sd_department', null,
				'is', departmentFilter));
	}

	// 添加期间参数
	filters.push(new nlobjSearchFilter('custrecord_sd_period', null, 'is',
			periodFilter));

	// 定义搜索的列：查询结果需要展示的列（表的列名内部ID）
	var searchColumns = [];
	searchColumns[0] = new nlobjSearchColumn('internalid');

	var searchResults = nlapiCreateSearch('customrecord_salary_detail',
			filters, searchColumns).runSearch();

	var startIndex = 0;
	do {
		var resultSet = searchResults.getResults(startIndex, startIndex + 1000);
		for (var i = 0; i < resultSet.length; i++) {
			nlapiDeleteRecord(resultSet[i].getRecordType(), resultSet[i]
					.getId());
		}
		startIndex += 1000;
	} while (resultSet != null && resultSet.length > 0);
}