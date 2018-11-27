/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       19 Sep 2018     zyt 工作UE
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

	// showEcharts();
	nlapiLogExecution('error','type',type);//debug

	// 创建时从url中抓取参数(建筑高度和建筑面积)
	if (type == 'create') {

		// 已抽取放入页面底部，从url中抓取数据并放入相应字段
		dataTransfer();

	}

	// 创建时没有资源页签
	if (type == 'edit' || type == 'view') {

		// 创建子标签并添加挣值图
		// addEarnValueChart(type, form);
		pmUeRef(form);

		// 资源详细信息，带出资源岗位、职称和能力
		addJobResourcesItem(form, type);

	}
	// if(type == 'edit'){
	// 	getProjectProfit();//计算利润率		
	// }
	if (type == 'view' || type == 'edit') {
		// 创建销售合同子列表
		contractsData(form);
		// 同步合同数据
		//syncContractsData(form)
	}

	// 调用绑定事件
	addButtonEvent();
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
	//test
	if (type == 'create') {
		// add by Makaay 2018-10-24
		var jobCode = nlapiGetFieldText('custentity_project_grade');// 项目级别代码
		var buId = nlapiGetFieldValue('custentity_executive_department');// 项目执行部门id
		var buFilters = new Array();
		buFilters.push(new nlobjSearchFilter('internalid', null, 'is', buId));
		var buColumns = new Array();
		buColumns.push(new nlobjSearchColumn('custrecord_group_number'));
		buColumns.push(new nlobjSearchColumn('name'));
		var buTempData = nlapiCreateSearch('department', buFilters, buColumns).runSearch();
		var buData = buTempData.getResults(0, 1);
		var buCode = buData[0].getValue('custrecord_group_number');// BU编号
		// 生成流水号
		var returnData = makeSerialNum('project', '3', buId);// 项目流水号
		// 组装报价单编码
		var codeStr = buCode + '.' + (returnData['year']).substring(2)+ returnData['num'] + jobCode;
		// 重写编码
		var successId = nlapiSetFieldValue('entityid', codeStr);
	}
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
	// add by yuming hu
	batchModifyTaskManager();
}

/**
 * 资源详细信息，带出资源岗位、职称和能力 如为编辑界面，使用标准资源信息sublist 如为查看界面，使用客户化的资源信息sublist
 * 
 * @author zyt
 */
function addJobResourcesItem(form, type) {

	if (type == 'edit') {

		var jobResources = form.getSubList('jobresources');

		jobResources.addField('custpage_post', 'text', '岗位').setDisplayType('Disabled');// 岗位

		jobResources.addField('custpage_job', 'text', '职称','customlist_job_title').setDisplayType('Disabled');// 职称
		jobResources.addField('custpage_power', 'text', '能力','customlist_ability_grade').setDisplayType('Disabled');// 能力
	} else {

		form.getSubList('jobresources').setDisplayType('hidden');

		// 创建销售合同的子列表
		var jobResources = form.addSubList('custpage_jobresources', 'list','资源详细信息', 'resources');

		jobResources.addField('custpage_name', 'text', '名称');// 名称
		jobResources.addField('custpage_email', 'text', '电子邮件');// 电子邮件
		jobResources.addField('custpage_role', 'text', '角色');// 角色

		jobResources.addField('custpage_default_cost', 'float', '默认成本');// 默认成本
		jobResources.addField('custpage_cover_cost', 'float', '成本覆盖');// 成本覆盖

		jobResources.addField('custpage_post', 'text', '岗位');// 岗位
		jobResources.addField('custpage_job', 'text', '职称','customlist_job_title');// 职称
		jobResources.addField('custpage_power', 'text', '能力','customlist_ability_grade');// 能力

		// 赋值 客户化资源能力子列表
		var count = nlapiGetLineItemCount('jobresources');

		for (var i = 0; i < count; i++) {

			nlapiSetLineItemValue('custpage_jobresources', 'custpage_name',(i + 1), nlapiGetLineItemText('jobresources','jobresource', (i + 1)));// 名称
			nlapiSetLineItemValue('custpage_jobresources', 'custpage_email',(i + 1), nlapiGetLineItemValue('jobresources', 'email',(i + 1)));// 邮件
			nlapiSetLineItemValue('custpage_jobresources','custpage_default_cost', (i + 1), nlapiGetLineItemValue('jobresources', 'defaultcost', (i + 1)));// 默认成本
			nlapiSetLineItemValue('custpage_jobresources','custpage_cover_cost', (i + 1), nlapiGetLineItemValue('jobresources', 'overridencost', (i + 1)));// 成本覆盖
			nlapiSetLineItemValue('custpage_jobresources', 'custpage_role',(i + 1), nlapiGetLineItemText('jobresources', 'role',(i + 1)));// 角色

			var empJson = getResourceEmpInfo(nlapiGetLineItemValue('jobresources', 'jobresource', (i + 1)));// 给资源详细信息界面带出人员信息

			if (empJson) {// 通用资源返回-1

				// nlapiLogExecution('ERROR', '11', JSON.stringify(empJson));
				nlapiSetLineItemValue('custpage_jobresources', 'custpage_post',(i + 1), empJson.post);
				nlapiSetLineItemValue('custpage_jobresources', 'custpage_job',(i + 1), empJson.job);
				nlapiSetLineItemValue('custpage_jobresources','custpage_power', (i + 1), empJson.power);
			}

		}

	}

}

/**
 * 用于beforeload触发 功能为接收来自so_opportunity_cs中放入url的参数，并放入相应的字段
 * 
 * @author YHR
 */
function dataTransfer() {

	var buildingHeight = request.getParameter('custentity_jzgd');
	var coveredArea = request.getParameter('custentity_jzmj');
	var businessStatus = request.getParameter('custentity_xmyt');
	var province = request.getParameter('custentity_province_zxp');
	var professionalType = request.getParameter('custentity_business_type');
	var address = request.getParameter('custentity_address');
	var serviceArea = request.getParameter('custentity_service_area');
	var city = request.getParameter('custentity_city1');
	var businessLevel = request.getParameter('custentity_project_grade');
	var bu = request.getParameter('custentity_executive_department');
	var opTitle = request.getParameter('opTitle');// 商机标题
	var opId = request.getParameter('opId');// 商机标题
	// 服务范围
	var custbody_combined_with = request.getParameter('custbody_combined_with');// 方案设计
	var custbody_curtain_wall_drug_safety = request.getParameter('custbody_curtain_wall_drug_safety');// 幕墙安评
	var custbody_tender_for_q_a_review = request.getParameter('custbody_tender_for_q_a_review');// 招标答疑评审
	var custbody_test_station = request.getParameter('custbody_test_station');// 试验旁站
	var custbody_project_final_accounts = request.getParameter('custbody_project_final_accounts');// 项目决算
	var custbody_animation_design = request.getParameter('custbody_animation_design');// 动画设计
	var custbody_construction_e_appraisal = request.getParameter('custbody_construction_e_appraisal');// 建筑工程鉴定
	var custbody_in_depth_design_not_icd = request.getParameter('custbody_in_depth_design_not_icd');// 深化设计（不含施工图)
	var custbody_the_tender_list = request.getParameter('custbody_the_tender_list');// 招标清单
	var custbody_selection_of_c_materials = request.getParameter('custbody_selection_of_c_materials');// 施工材料资源筛选
	var custbody_site_factory_inspections = request.getParameter('custbody_site_factory_inspections');// 现场（工厂）检查
	var custbody_completion_a_cooperation = request.getParameter('custbody_completion_a_cooperation');// 竣工验收配合
	var custbody_bim_design = request.getParameter('custbody_bim_design');// BIM设计
	var custbody_program_coordination_ir = request.getParameter('custbody_program_coordination_ir');// 方案配合（含送审）
	var custbody_bidding_budget = request.getParameter('custbody_bidding_budget');// 招标预算
	var custbody_construction_unit_dr_or_o = request.getParameter('custbody_construction_unit_dr_or_o');// 施工单位图纸审核或优化
	var custbody_in_field_service = request.getParameter('custbody_in_field_service');// 驻场服务
	var custbody_a_rendering_or_effect_model = request.getParameter('custbody_a_rendering_or_effect_model');// 效果图或效果模型
	var custbody_bmu_design = request.getParameter('custbody_bmu_design');// BMU设计

	// nlapiLogExecution('ERROR', 'buildingHeight', buildingHeight);
	// nlapiLogExecution('ERROR', 'coveredArea', coveredArea);

	nlapiSetFieldValue('custentity_jzgd', buildingHeight, true, true);
	nlapiSetFieldValue('custentity_jzmj', coveredArea, true, true);
	nlapiSetFieldValue('custentity_xmyt', businessStatus, true, true);
	nlapiSetFieldValue('custentity_province_zxp', province, true, true);
	nlapiSetFieldValue('custentity_business_type', professionalType, true, true);
	nlapiSetFieldValue('custentity_address', address, true, true);
	nlapiSetFieldValue('custentity_service_area', serviceArea, true, true);
	nlapiSetFieldValue('custentity_city1', city, true, true);
	nlapiSetFieldValue('custentity_project_grade', businessLevel, true, true);
	nlapiSetFieldValue('custentity_executive_department', bu, true, true);
	// nlapiSetFieldValue('entitystatus', '22', true, true);
	nlapiSetFieldValue('custentity_pm_percentage', '0', true, true);
	nlapiSetFieldValue('companyname', opTitle);// 项目名称
	nlapiSetFieldValue('custentity_project_op', opId);// 项目
	// 服务范围
	nlapiSetFieldValue('custentity_project_coordinate', custbody_combined_with,true, true);// 方案配合
	nlapiSetFieldValue('custentity_mqap', custbody_curtain_wall_drug_safety,true, true);// 幕墙安评
	nlapiSetFieldValue('custentity_zbdyps', custbody_tender_for_q_a_review,true, true);// 招标答疑评审
	nlapiSetFieldValue('custentity_sypz', custbody_test_station, true, true);// 试验旁站
	nlapiSetFieldValue('custentity_xmjs', custbody_project_final_accounts,true, true);// 项目决算
	nlapiSetFieldValue('custentity_dhsj', custbody_animation_design, true, true);// 动画设计
	nlapiSetFieldValue('custentity_jzgcpgjd',custbody_construction_e_appraisal, true, true);// 建筑工程鉴定
	nlapiSetFieldValue('custentity_shsj', custbody_in_depth_design_not_icd,true, true);// 深化设计（不含施工图)
	nlapiSetFieldValue('custentity_zbqd', custbody_the_tender_list, true, true);// 招标清单
	nlapiSetFieldValue('custentity_sgcl', custbody_selection_of_c_materials,true, true);// 施工材料资源筛选
	nlapiSetFieldValue('custentity_xcjc', custbody_site_factory_inspections,true, true);// 现场（工厂）检查
	nlapiSetFieldValue('custentity1', custbody_completion_a_cooperation, true,true);// 竣工验收配合
	nlapiSetFieldValue('custentity_bmi', custbody_bim_design, true, true);// BIM设计
	nlapiSetFieldValue('custentity_faph', custbody_program_coordination_ir,true, true);// 方案配合（含送审）
	nlapiSetFieldValue('custentity_zbys', custbody_bidding_budget, true, true);// 招标预算
	nlapiSetFieldValue('custentity_sgdw', custbody_construction_unit_dr_or_o,true, true);// 施工单位图纸审核或优化
	nlapiSetFieldValue('custentity_zcfw', custbody_in_field_service, true, true);// 驻场服务
	nlapiSetFieldValue('custentity_xgt', custbody_a_rendering_or_effect_model,true, true);// 效果图或效果模型
	nlapiSetFieldValue('custentity_bmu', custbody_bmu_design, true, true);// BMU设计

}

/**
 * 创建销售合同子列表
 * 
 * @author zxp
 */

function contractsData(form) {
	// 创建销售合同的子列表
	var contractsSublist = form.addSubList('custpage_sale_contracts_list','list', '销售合同', 'relrecords');

	contractsSublist.addField('custpage_contracts_codes', 'text', '合同编号');
	contractsSublist.addField('custpage_contracts_name', 'text', '合同名称');
	contractsSublist.addField('custpage_contracts_status', 'text', '合同状态');
	contractsSublist.addField('custpage_contracts_money', 'text', '合同金额');
	contractsSublist.addField('custpage_contracts_finished_money', 'text','已完工金额');
	contractsSublist.addField('custpage_contracts_unfinished_money', 'text','未完工金额');
	contractsSublist.addField('custpage_contracts_invoice_income', 'text','开票收入');
	contractsSublist.addField('custpage_contracts_uninvoice_income', 'text','未开票收入');
	contractsSublist.addField('custpage_contracts_cash', 'text', '现金(回款)');
	contractsSublist.addField('custpage_contracts_receivables', 'text', '应收账款');

	// 获取项目的类型及内部id
	var type = nlapiGetRecordType();
	var jobId = nlapiGetRecordId();
	var jobRecord = nlapiLoadRecord(type, jobId);

	// 项目经历确定百分比 转换成小数
	var pm_percentage = parseInt(jobRecord.getFieldValue('custentity_pm_percentage')) * 0.01;

	// 查询销售订单 由于jobId不能查询，只能做已保存搜索
	// 做了两个已保存搜索，customsearch_contract_sales_order 此已保存搜索合约状态都不为 合约收到100% ，合约状态
	// 都为合约收到100%的在customsearch_contract_sales_order_100中
	var search = nlapiLoadSearch(null, 'customsearch_contract_sales_order');
	search.addFilter(new nlobjSearchFilter('internalid', 'jobMain', 'is',jobId));
	var resultSet = search.runSearch();
	var result = resultSet.getResults(0, 1);
	// var debugData = result;//debug
		// nlapiLogExecution('error','result',JSON.stringify(debugData));//debug
	// 合同编号
	var tranid = '';
	// 合同名称
	var contractName = '';
	// 合约状态
	var statusValue = '';
	// 合同金额
	var total = 0;
	// 已完成金额
	var finishedTotal = 0;
	// 未完成的金额
	var unfinishedTotal = 0;

	// 可能是内部项目，所以销售合同可能不存在
	// if (result[0] != null) {
	// tranid = result[0].getValue('tranid');
	// contractName = result[0].getValue('custbody_contract_name');
	// total = result[0].getValue('amount');
	// finishedTotal = (total * pm_percentage).toFixed(2);
	// unfinishedTotal = (total - finishedTotal).toFixed(2);
	// statusValue = result[0].getText('custbody_contract_status2');
	// }

	// 合约状态不为 合约收到100% 时
	if (result[0] != undefined) {
		tranid = result[0].getValue('tranid');
		contractName = result[0].getValue('custbody_contract_name');
		statusValue = result[0].getText('custbody_contract_status2');
	} else {
		var sales100search = nlapiLoadSearch(null,'customsearch_contract_sales_order_100');
		sales100search.addFilter(new nlobjSearchFilter('internalid', 'jobMain','is', jobId));
		var search100Result = sales100search.runSearch();
		//留存项目，多个合同的情况
		var result100 = search100Result.getResults(0, 1000);
		// var debugData = result100;//debug
			// nlapiLogExecution('error','result100',JSON.stringify(debugData));//debug
		// 可能是内部项目，所以销售合同可能不存在
		if (result100[0] != undefined) {
			//累计多个合同的金额
			for(var i = 0;i<result100.length;i++){
				total = total + Number(result100[i].getValue('amount'));
			}
			tranid = result100[0].getValue('tranid');
			contractName = result100[0].getValue('custbody_contract_name');
			// total = result100[0].getValue('amount');
			finishedTotal = (total * pm_percentage).toFixed(2);
			unfinishedTotal = (total - finishedTotal).toFixed(2);
			statusValue = result100[0].getText('custbody_contract_status2');
		}
	}
	//“各BU项目已开票已回款清单”的现金
	var projectNum = jobRecord.getFieldValue('entityid');//项目编号
	var filters = new Array();
		filters.push(new nlobjSearchFilter('custrecord_bu_sale_contract',null,'is',projectNum));//根据项目编号匹配
	var columns = new Array();
		columns.push(new nlobjSearchColumn('custrecord_bu_billed_amount'));//回款金额
	var cashTempData = nlapiCreateSearch('customrecord_bu_back_amount',filters, columns).runSearch();
	var customBackCash = cashTempData.getResults(0, 1000);
	var customSumCash = 0;	
	if(customBackCash.length > 0){
		for(var i = 0; i< customBackCash.length;i++){
			customSumCash = customSumCash + Number(customBackCash[i].getValue('custrecord_bu_billed_amount'));
		}
	}
	nlapiLogExecution('error','customSumCash',customSumCash);//debug


	// 已保存搜索 开票收入
	var invoiceSearch = nlapiLoadSearch(null,'customsearch_contract_invoice_income');
	invoiceSearch.addFilter(new nlobjSearchFilter('internalid', 'jobMain','is', jobId));
	var invoiceResultSet = invoiceSearch.runSearch();
	var invoiceResult = invoiceResultSet.getResults(0, 1);

	// var debugData = invoiceResult;//debug
	// nlapiLogExecution('error','invoiceResult',JSON.stringify(debugData));//debug
	var invoiceIncome = 0;
	if (invoiceResult[0] != null) {
		invoiceIncome = invoiceResult[0].getValue('amount', null, 'sum');
		if(customSumCash > 0){//存在维护的现金回款
			invoiceIncome = Number(invoiceIncome) + customSumCash;
		}
	}else{
		invoiceIncome = Number(customSumCash);
	}

	// 已保存搜索 现金（回款）
	var invoiceCashSearch = nlapiLoadSearch(null,'customsearch_contract_invoice_cash');
	invoiceCashSearch.addFilter(new nlobjSearchFilter('internalid', 'jobMain','is', jobId));
	var invoiceCashResultSet = invoiceCashSearch.runSearch();
	var invoiceCashResult = invoiceCashResultSet.getResults(0, 1);
	var cash = 0;
	if (invoiceCashResult[0] != undefined) {
		cash = invoiceCashResult[0].getValue('amountpaid', null, 'sum');
	}
	//现金回款需要加上“各BU项目已开票已回款清单”的现金
	
	//积累计算出所有的回款金额
	if(customSumCash > 0){//存在维护的现金回款
		cash = Number(cash) + customSumCash;
	}
	
	// var debugData = customSumCash;//debug
	// nlapiLogExecution('error','customSumCash',JSON.stringify(debugData));//debug
	


	// 已保存搜索 应收账款
	var invoiceReceivablesSearch = nlapiLoadSearch(null,'customsearch_contract_invoice_receivable');
	invoiceReceivablesSearch.addFilter(new nlobjSearchFilter('internalid','jobMain', 'is', jobId));
	var invoiceReceivablesResultSet = invoiceReceivablesSearch.runSearch();
	var invoiceReceivablesSetResult = invoiceReceivablesResultSet.getResults(0,1);
	var receivables = 0;
	// var debugData = invoiceReceivablesSetResult[0];//debug
	// nlapiLogExecution('error','yingshou1',JSON.stringify(debugData));//debug
	if (invoiceReceivablesSetResult[0] != undefined) {
		// var debugData = invoiceReceivablesSetResult[0];//debug
		// nlapiLogExecution('error','yingshou2',JSON.stringify(debugData));//debug
		receivables = invoiceReceivablesSetResult[0].getValue('amountremaining', null,'sum');
	}

	// 子列表赋值
	contractsSublist.setLineItemValue('custpage_contracts_codes', 1, tranid);
	contractsSublist.setLineItemValue('custpage_contracts_name', 1,contractName);
	contractsSublist.setLineItemValue('custpage_contracts_status', 1,statusValue);
	contractsSublist.setLineItemValue('custpage_contracts_money', 1, total);//合同金额
	contractsSublist.setLineItemValue('custpage_contracts_finished_money', 1,finishedTotal);//完工金额
	contractsSublist.setLineItemValue('custpage_contracts_unfinished_money', 1,unfinishedTotal);//未完工金额
	contractsSublist.setLineItemValue('custpage_contracts_invoice_income', 1,invoiceIncome);//开票收入
	var uninvoiceIncomeValue = 0;
	uninvoiceIncomeValue = (finishedTotal - invoiceIncome).toFixed(2);
	// 当未开票收入是负数时，设置为0；
	if (uninvoiceIncomeValue < 0) {
		uninvoiceIncomeValue = 0;
	}

	contractsSublist.setLineItemValue('custpage_contracts_uninvoice_income', 1,uninvoiceIncomeValue);
	var debugData = cash;//debug
	nlapiLogExecution('error','cash',cash);//debug
	contractsSublist.setLineItemValue('custpage_contracts_cash', 1, cash);
	contractsSublist.setLineItemValue('custpage_contracts_receivables', 1,receivables);

}

// 同步合同数据，可能是旧数据，数据需要时钟15分钟的倍数触发
function syncContractsData(form) {

	// 创建销售合同的子列表
	var contractsSublist = form.addSubList('custpage_sale_contracts_list_sync','list', '销售合同(同步)', 'relrecords');

	contractsSublist.addField('custpage_contracts_codes_sync', 'text', '合同编号');
	contractsSublist.addField('custpage_contracts_name_sync', 'text', '合同名称');
	contractsSublist.addField('custpage_contracts_status_sync', 'text', '合同状态');
	contractsSublist.addField('custpage_contracts_money_sync', 'text', '合同金额');
	contractsSublist.addField('custpage_contracts_finished_money_sync', 'text','已完工金额');
	contractsSublist.addField('custpage_contracts_unfinished_money_sync','text', '未完工金额');
	contractsSublist.addField('custpage_contracts_invoice_income_sync', 'text','开票收入');
	contractsSublist.addField('custpage_contracts_uninvoice_income_sync','text', '未开票收入');
	contractsSublist.addField('custpage_contracts_cash_sync', 'text', '现金(回款)');
	contractsSublist.addField('custpage_contracts_receivables_sync', 'text','应收账款');

	var type = nlapiGetRecordType();
	var jobId = nlapiGetRecordId();
	var jobRecord = nlapiLoadRecord(type, jobId);

	// 合同编号
	var tranid = jobRecord.getFieldValue('custentity_contract_number');
	// 合同名称
	var contractName = jobRecord.getFieldValue('custentity_contract_name');
	// 合同状态
	var statusValue = jobRecord.getFieldValue('custentity_contract_status');
	// 合同金额
	var total = jobRecord.getFieldValue('custentity_contract_amount');
	// 已完成金额
	var finishedTotal = jobRecord.getFieldValue('custentity_finished_amount');
	// 未完成金额
	var unfinishedTotal = jobRecord.getFieldValue('custentity_not_finished_amount');
	// 开票金额
	var invoiceIncome = jobRecord.getFieldValue('custentity_bill_amount');
	// 未开票金额
	var uninvoiceIncomeValue = jobRecord.getFieldValue('custentity_not_bill_amount');
	// 现金（回款）
	var cash = jobRecord.getFieldValue('custentity_cash_amount');
	// 应收账款
	var receivables = jobRecord.getFieldValue('custentity_to_receive_amount');

	// 子列表赋值
	contractsSublist.setLineItemValue('custpage_contracts_codes_sync', 1,tranid);
	contractsSublist.setLineItemValue('custpage_contracts_name_sync', 1,contractName);
	contractsSublist.setLineItemValue('custpage_contracts_status_sync', 1,statusValue);
	contractsSublist.setLineItemValue('custpage_contracts_money_sync', 1, total);
	contractsSublist.setLineItemValue('custpage_contracts_finished_money_sync',1, finishedTotal);
	contractsSublist.setLineItemValue('custpage_contracts_unfinished_money_sync', 1, unfinishedTotal);
	contractsSublist.setLineItemValue('custpage_contracts_invoice_income_sync',1, invoiceIncome);
	contractsSublist.setLineItemValue('custpage_contracts_uninvoice_income_sync', 1,uninvoiceIncomeValue);
	contractsSublist.setLineItemValue('custpage_contracts_cash_sync', 1, cash);
	contractsSublist.setLineItemValue('custpage_contracts_receivables_sync', 1,receivables);

}
/**
 * @author yuming hu
 * @description 批量更改项目经理以及项目总监
 * @date 2018-11-14
 */
function batchModifyTaskManager() {
	var director = nlapiGetFieldValue('custentity_project_director');
	var manager = nlapiGetFieldValue('custentity_project_manager');

	if (director != null || manager != null) {
		var project = nlapiGetRecordId();
		var taskFilters = [];
		taskFilters[0] = new nlobjSearchFilter('company', null, 'is', project);
		taskFilters[1] = new nlobjSearchFilter('custevent_milestone', null,'is', 'T');

		var taskColumns = [];
		taskColumns[0] = new nlobjSearchColumn('custevent_project_manager');
		taskColumns[1] = new nlobjSearchColumn('custevent_project_director');

		var taskResults = nlapiSearchRecord('projecttask', null, taskFilters);

		if (taskResults) {
			for (var i = 0; i < taskResults.length; i++) {
				var taskId = taskResults[i].getId();

				var cdirector = taskResults[i].getValue('custevent_project_director');
				var cmanager = taskResults[i].getValue('custevent_project_manager');

				if (director != cdirector) {
					nlapiSubmitField('projecttask', taskId,'custevent_project_director', director, true);
				}

				if (manager != cmanager) {
					nlapiSubmitField('projecttask', taskId,'custevent_project_manager', manager, true);
				}
			}
		}
	}
}


