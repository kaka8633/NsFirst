/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       01 Mar 2018     pc
 *
 */

/**
 * 自定义银行对账匹配界面
 * 
 * @param {nlobjRequest}
 *            request Request object
 * @param {nlobjResponse}
 *            response Response object
 * @returns {Void} Any output is written via response object
 */

function service(request, response) {

	var method = request.getMethod();
	if (method == 'GET') {
		// 获取参数进行动作的判断
		var action = request.getParameter('action');
		// action为空时展示界面
		if (action == null) {
			// 初始化页面
			var form = initUI(null, null, null, null, null, null, null, null);
			// 将创建的form渲染到界面
			response.writePage(form);
		}
	} else {
		// 获取要查询的个案序列号和状态

		var serialNum = request.getParameter('serialNum');
		var status = request.getParameter('status');
		var toleranceDays = request.getParameter('toleranceDays');
		var serialMatch = request.getParameter('serialMatch');
		var lot = request.getParameter('lot');
		var customer = request.getParameter('customer');
		var repayDateForm = request.getParameter('repayDateForm');
		var repayDateTo = request.getParameter('repayDateTo');
		var nowPage = request.getParameter('nowPage');
		var pageSize = request.getParameter('pageSize');
		// 初始化页面
		var form = initUI(serialNum, status, toleranceDays, serialMatch, lot,
				customer, repayDateForm, repayDateTo);
		// 调用查询方法
		search(form, nowPage, serialNum, status, serialMatch, lot, customer,
				repayDateForm, repayDateTo, pageSize);
		// 将创建的form渲染到界面
		response.writePage(form);
	}
}
/**
 * 初始化界面UI
 * 
 * @param status
 *            状态
 * @param serialNumber
 *            个案序列号
 * @returns form
 */
function initUI(serialNum, status, toleranceDays, serialMatch, lot, customer,
		repayDateForm, repayDateTo) {

	nlapiLogExecution('ERROR', '--进来了initUI', 1);
	// 设置页面名称
	var form = nlapiCreateForm("自定义银行对账匹配界面");
	// 给页面绑定脚本
	form.setScript('customscript_bank_reconciliation_cs');
	form.addFieldGroup('custpage_query_group', '筛选条件');
	// 添加字段
	var serialNumShow = form.addField('custpage_serial_num', 'select', '个案序列号',
			'customrecord_case', 'custpage_query_group');
	// 客户
	var customerShow = form.addField('custpage_customer', 'select', '客户',
			'customrecord_sc', 'custpage_query_group');
	// 还款日期从
	var repayDateFormShow = form.addField('custpage_repaydate_form', 'date',
			'还款日期从', null, 'custpage_query_group');
	// 还款日期至
	var repayDateToShow = form.addField('custpage_repaydate_to', 'date',
			'还款日期至', null, 'custpage_query_group');
	var statusShow = form.addField('custpage_recon_status', 'select', '状态',
			'customlist_aob_state_list', 'custpage_query_group');
	// 批次
	var lotShow = form.addField('custpage_lot_number', 'text', '批次', null,
			'custpage_query_group').setDisplaySize(36.8);
	// 个案序列号匹配
	var serialMatchShow = form.addField('custpage_serial_match', 'select',
			'个案序列号匹配', null, 'custpage_query_group');
	serialMatchShow.addSelectOption('', '', false);
	serialMatchShow.addSelectOption('T', '是', false);
	serialMatchShow.addSelectOption('F', '否', false);

	var toleranceDaysShow = form.addField('custpage_tolerance_days', 'integer',
			'匹配允差天数*', null, 'custpage_query_group').setDisplaySize(10);
	toleranceDaysShow.setDefaultValue(2);
	// 添加按钮
	form.addButton('custpage_search_btn', '查询', 'search()');
	form.addButton('custpage_match_btn', '部分匹配', 'match()');
	form.addButton('custpage_allmatch_btn', '全部匹配', 'allmatch()');
	form.addButton('custpage_matchnodes_btn', '手工匹配', 'matchNodes()');
	form.addButton('custpage_cancelmatch_btn', '取消匹配', 'cancelMatch()');
	form.addButton('custpage_posting_btn', '部分登账', 'posting()');
	form.addButton('custpage_allposting_btn', '全部登账', 'allposting()');
	form.addButton('custpage_cancelpost_btn', '取消登账', 'cancelPost()');
	form.addButton('custpage_cancelpost_btn', '全部取消登账', 'allcancelpost()');
	form.addButton('custpage_cancelpost_btn', '全部匹配并登账', 'matchpost()');
	// 增加页数选择、当前页信息
	initPageChoose(form);
	// 添加子列表
	var sublist = form.addSubList('custpage_bank_recon_sublist', 'list',
			'银行对账详情');
	// 选择
	sublist.addField('custpage_check', 'checkbox', '选择').setDisplaySize(2);
	// 姓名
	sublist.addField('custpage_aob_id', 'select', '个案序列号', 'customrecord_case')
			.setDisplayType('disabled');
	sublist.addField('custpage_aob_repaymoney', 'text', '还款金额').setDisplayType(
			'disabled');
	sublist.addField('custpage_aob_repaydate', 'text', '还款日期').setDisplayType(
			'disabled');
	sublist.addField('custpage_aob_state', 'text', '状态').setDisplayType(
			'disabled');
	sublist.addField('custpage_aob_police', 'text', '公安催收').setDisplayType(
			'disabled');
	sublist.addField('custpage_aob_cpmoney', 'text', 'CP金额').setDisplayType(
			'disabled');
	sublist.addField('custpage_aob_cpdate', 'text', 'CP日期').setDisplayType(
			'disabled');
	sublist.addField('custpage_aob_postdate', 'datetimetz', '登账日期')
			.setDisplayType('disabled');
	sublist.addField('custpage_aob_postperson', 'select', '登账人员', 'employee')
			.setDisplayType('disabled');
	sublist.addField('custpage_aob_idmatch', 'text', '个案序列号匹配').setDisplayType(
			'disabled');
	sublist.addField('custpage_aob_lot', 'text', '批次号').setDisplayType(
			'disabled');
	sublist
			.addField('custpage_aob_client', 'select', '客户简称',
					'customrecord_sc').setDisplayType('disabled');
	sublist.addField('custpage_aob_name', 'text', '姓名').setDisplayType(
			'disabled');
	sublist.addField('custpage_aob_card', 'text', '卡号').setDisplayType(
			'disabled');
	sublist.addField('custpage_aob_idcard', 'text', '证件号').setDisplayType(
			'disabled');
	sublist.addField('custpage_aob_casedate', 'text', '委案时间').setDisplayType(
			'disabled');
	sublist.addField('custpage_aob_casemoney', 'text', '委案金额').setDisplayType(
			'disabled');
	sublist.addField('custpage_int_id', 'text', '内部标识')
			.setDisplayType('hidden');
	sublist.addButton("custpage_check_all", "全选", "checkAll()");
	// 子列表添加上一页、下一页按钮
	sublist.addButton("custpage_last_page_btn", "上一页", "lastPage()");
	sublist.addButton("custpage_next_page_btn", "下一页", "nextPage()");

	// 如果个案序列号不为空，设置默认值
	if (serialNum) {
		serialNumShow.setDefaultValue(serialNum);
	}
	// 如果状态不为空，设置默认值
	if (status) {
		statusShow.setDefaultValue(status);
	}
	// 如果允差天数不为空，设置默认值
	if (toleranceDays) {
		toleranceDaysShow.setDefaultValue(toleranceDays);
	}
	// 如果个案序列号匹配不为空，设置默认值
	if (serialMatch) {
		serialMatchShow.setDefaultValue(serialMatch);
	}
	// 如果批次不为空，设置默认值
	if (lot) {
		lotShow.setDefaultValue(lot);
	}
	// 如果客户不为空，设置默认值
	if (customer) {
		customerShow.setDefaultValue(customer);
	}
	// 如果还款日期从不为空，设置默认值
	if (repayDateForm) {
		repayDateFormShow.setDefaultValue(repayDateForm);
	}
	// 如果还款日期至不为空，设置默认值
	if (repayDateTo) {
		repayDateToShow.setDefaultValue(repayDateTo);
	}

	return form;
}
/**
 * 查询逻辑
 * 
 * @param form
 * @param status
 *            状态
 * @param serialNumber
 *            个案序列号
 * @returns
 */
function search(form, nowPage, serialNum, status, serialMatch, lot, customer,
		repayDateForm, repayDateTo, pageSizeParam) {
	var filters = [];
	// 参数不为空时添加参数到查询条件
	if (serialNum) {
		filters.push(new nlobjSearchFilter('custrecord_aob_id', null, 'is',
				serialNum));
	}
	if (status) {
		filters.push(new nlobjSearchFilter('custrecord_aob_state', null, 'is',
				status));
	}
	if (serialMatch) {
		filters.push(new nlobjSearchFilter('custrecord_aob_idmatch', null,
				'is', serialMatch));
	}
	if (lot) {
		filters.push(new nlobjSearchFilter('custrecord_aob_lot', null, 'is',
				lot));
	}
	if (customer) {
		filters.push(new nlobjSearchFilter('custrecord_aob_sc', null, 'is',
				customer));
	}
	if (repayDateForm) {
		filters.push(new nlobjSearchFilter('custrecord_aob_repaydate', null,
				'onorafter', repayDateForm));
	}
	if (repayDateTo) {
		filters.push(new nlobjSearchFilter('custrecord_aob_repaydate', null,
				'onorbefore', repayDateTo));
	}
	// 定义搜索的列：查询结果需要展示的列（表的列名内部ID）
	var searchColumns = [];
	searchColumns[0] = new nlobjSearchColumn('custrecord_aob_id');
	searchColumns[1] = new nlobjSearchColumn('custrecord_aob_repaymoney');
	searchColumns[2] = new nlobjSearchColumn('custrecord_aob_repaydate');
	searchColumns[3] = new nlobjSearchColumn('custrecord_aob_state');
	searchColumns[4] = new nlobjSearchColumn('custrecord_aob_police');
	searchColumns[5] = new nlobjSearchColumn('custrecord_aob_cpmoney');
	searchColumns[6] = new nlobjSearchColumn('custrecord_aob_cpdate');
	searchColumns[7] = new nlobjSearchColumn('custrecord_aob_postdate');
	searchColumns[8] = new nlobjSearchColumn('custrecord_aob_postperson');
	searchColumns[9] = new nlobjSearchColumn('custrecord_aob_idmatch');
	searchColumns[10] = new nlobjSearchColumn('custrecord_aob_lot');
	searchColumns[11] = new nlobjSearchColumn('custrecord_aob_sc');
	searchColumns[12] = new nlobjSearchColumn('custrecord_aob_name');
	searchColumns[13] = new nlobjSearchColumn('custrecord_aob_card');
	searchColumns[14] = new nlobjSearchColumn('custrecord_aob_idcard');
	searchColumns[15] = new nlobjSearchColumn('custrecord_aob_casedate');
	searchColumns[16] = new nlobjSearchColumn('custrecord_aob_casemoney');
	searchColumns[17] = new nlobjSearchColumn('internalId');
	// 进行查询、这个参数表示的是表名的内部ID
	// var searchResults = nlapiSearchRecord('customrecord_aob', null, filters,
	// searchColumns);
	var searchResults = nlapiCreateSearch('customrecord_aob', filters,
			searchColumns).runSearch();
	var totalCount = getTotalCount(filters, 'customrecord_aob');
	// var pageSize = 500;// 每页数量
	var pageSize = (pageSizeParam == '' ? 200 : parseInt(pageSizeParam));// 每页数量
	var startIndex = (nowPage - 1) * pageSize;

	var resultSet = searchResults.getResults(startIndex, startIndex + pageSize);
	var sublist = form.getSubList('custpage_bank_recon_sublist');
	var index = 1;
	// 往查询结果容器sublist里赋值
	for (var i = 0; i < resultSet.length; i++) {
		var serialNumRs = resultSet[i].getValue('custrecord_aob_id');
		var repayMoneyRs = resultSet[i].getValue('custrecord_aob_repaymoney');
		var repayDateRs = resultSet[i].getValue('custrecord_aob_repaydate');
		var statusRs = resultSet[i].getValue('custrecord_aob_state');
		var policeRs = resultSet[i].getValue('custrecord_aob_police');
		var cpMoneyRs = resultSet[i].getValue('custrecord_aob_cpmoney');
		var cpDateRs = resultSet[i].getValue('custrecord_aob_cpdate');
		var postDateRs = resultSet[i].getValue('custrecord_aob_postdate');
		var postPerson = resultSet[i].getValue('custrecord_aob_postperson');
		var idMatchRs = resultSet[i].getValue('custrecord_aob_idmatch');
		var lotRs = resultSet[i].getValue('custrecord_aob_lot');
		var clientRs = resultSet[i].getValue('custrecord_aob_sc');
		var nameRs = resultSet[i].getValue('custrecord_aob_name');
		var cardRs = resultSet[i].getValue('custrecord_aob_card');
		var idcardRs = resultSet[i].getValue('custrecord_aob_idcard');
		var caseDateRs = resultSet[i].getValue('custrecord_aob_casedate');
		var caseMoneyRs = resultSet[i].getValue('custrecord_aob_casemoney');

		var intIdRs = resultSet[i].getValue('internalId');
		// 赋值
		sublist.setLineItemValue('custpage_aob_id', index, serialNumRs);
		sublist
				.setLineItemValue('custpage_aob_repaymoney', index,
						repayMoneyRs);
		sublist.setLineItemValue('custpage_aob_repaydate', index, repayDateRs);
		if (statusRs == 1) {
			sublist.setLineItemValue('custpage_aob_state', index, '已导入');
		} else if (statusRs == 2) {
			sublist.setLineItemValue('custpage_aob_state', index, '匹配成功');
		} else if (statusRs == 3) {
			sublist.setLineItemValue('custpage_aob_state', index, '自动匹配失败');
		} else if (statusRs == 4) {
			sublist.setLineItemValue('custpage_aob_state', index, '已登账');
		} else if (statusRs == 5) {
			sublist.setLineItemValue('custpage_aob_state', index, '手工匹配失败');
		} else if (statusRs == 6) {
			sublist.setLineItemValue('custpage_aob_state', index, '取消登账');
		}
		if (policeRs == 'T') {
			sublist.setLineItemValue('custpage_aob_police', index, '是');
		} else {
			sublist.setLineItemValue('custpage_aob_police', index, '否');
		}
		sublist.setLineItemValue('custpage_aob_cpmoney', index, cpMoneyRs);
		sublist.setLineItemValue('custpage_aob_cpdate', index, cpDateRs);
		sublist.setLineItemValue('custpage_aob_postdate', index, postDateRs);
		sublist.setLineItemValue('custpage_aob_postperson', index, postPerson);
		if (idMatchRs == 'T') {
			sublist.setLineItemValue('custpage_aob_idmatch', index, '是');
		} else {
			sublist.setLineItemValue('custpage_aob_idmatch', index, '否');
		}
		sublist.setLineItemValue('custpage_aob_lot', index, lotRs);
		sublist.setLineItemValue('custpage_aob_client', index, clientRs);
		sublist.setLineItemValue('custpage_aob_name', index, nameRs);
		sublist.setLineItemValue('custpage_aob_card', index, cardRs);
		sublist.setLineItemValue('custpage_aob_idcard', index, idcardRs);
		sublist.setLineItemValue('custpage_aob_casedate', index, caseDateRs);
		sublist.setLineItemValue('custpage_aob_casemoney', index, caseMoneyRs);
		sublist.setLineItemValue('custpage_int_id', index, intIdRs);
		index++;
	}
	// 设置数据选择列表、当前页、总页数到界面
	setPageInfo(form, nowPage, totalCount, pageSize);
	response.writePage(form);
}
