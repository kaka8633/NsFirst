/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       11 Sep 2018     huyuming
 *
 */
/**
 * 描述：自定义薪资明细查询页面
 * 
 * @param {nlobjRequest}
 *            request Request object
 * @param {nlobjResponse}
 *            response Response object
 * @returns {Void} Any output is written via response object
 */
function salaryDetailSearch(request, response) {
    
	response.setEncoding('UTF-8');
	var method = request.getMethod();
	nlapiLogExecution('DEBUG', 'method', method);
	if (method == 'GET') {
		
		// 获取参数进行动作的判断
		var action = request.getParameter('action');
		// action为空时展示界面
		if (action == null) {
			// 初始化页面
			var form = initUI(null, null, null);
			// 将创建的form渲染到界面
			response.writePage(form);
		}else if(action=='search'){
			var subCompany = request.getParameter('subCompany');
			var period = request.getParameter('period');
			var department = request.getParameter('department');
			
			var form = initUI(subCompany,period,department);
			searchRecord(form,subCompany,period,department);
			response.writePage(form);
		}else if(action=='delete'){
			var subCompany = request.getParameter('subCompany');
			var period = request.getParameter('period');
			var department = request.getParameter('department');
			
			var form = initUI(subCompany,period,department);
			deleteRecord(form,subCompany,period,department);
			response.writePage(form);
		}else{
			form = initUI(null, null, null);
			response.writePage(form);
		}
	} 
}

/**
 * 初始化界面UI
 * 
 * @param subCompanyFilter
 *            子公司
 * @param periodFilter
 *            期间
 * @param departmentFilter
 *            部门
 * @returns form
 */
function initUI(subCompanyFilter, periodFilter, departmentFilter) {

	nlapiLogExecution('DEBUG', 'debug initUI', '测试进入初始化话界面功能');

	var form = nlapiCreateForm('客户化薪资明细界面');
	form.setScript('customscript_cux_salarydetails_cs');

	// 查询条件
	var custpage_subcompany_field = form.addField('custpage_filter_subcompany',
			'select', '子公司', 'Subsidiary');
	var custpage_period_field = form.addField('custpage_filter_period',
			'select', '期间', 'AccountingPeriod');

	custpage_period_field.setMandatory(true);
	//custpage_period_field.setDefaultValue(null);
	var custpage_department_field = form.addField('custpage_filter_department',
			'select', '部门', 'Department');

	// 按钮事件
	form.addButton('custpage_search_btn', '查询', 'search()');
	form.addButton('custpage_delete_btn', '删除', 'deleteRecord()');
	form.addButton('custpage_import_btn', '导入', 'importExcel()');

	// 创建table标签
	var salaryTable = form.addTab('custpage_salary_tab', '薪资页签');

	// 挂载sublist
	var detailSublist = form.addSubList('custpage_salary_detail_sublist',
			'list', '列表', 'custpage_salary_tab');
	
	//
	/*var attachSublist = form.addSubList('custpage_attach_sublist',
			'list', '附件', 'custpage_salary_tab');*/

	// 创建显示字段
	detailSublist.addField('custpage_link', 'url', '查看').setLinkText('查看');
	//detailSublist.addField('custpage_internal_id', 'integer', '内部ID');
	detailSublist.addField('custpage_sd_subcompany', 'text', '子公司');
	detailSublist.addField('custpage_sd_period', 'text', '期间');
	detailSublist.addField('custpage_sd_employee', 'text', '员工');
	detailSublist.addField('custpage_sd_professional_staff', 'text', '职等');
	detailSublist.addField('custpage_sd_department', 'text', '部门');
	detailSublist.addField('custpage_sd_mobile', 'text', '手机号');
	detailSublist.addField('custpage_sd_bank_of_deposit', 'text', '开户行');
	detailSublist.addField('custpage_sd_cnaps', 'text', '联行号');
	detailSublist.addField('custpage_sd_account_number', 'text', '银行账号');
	detailSublist.addField('custpage_sd_basic_salary', 'text', '基本工资');
	detailSublist.addField('custpage_sd_ability_salary', 'text', '能力薪酬');
	detailSublist.addField('custpage_sd_branch_salary', 'text', '岗位薪酬');
	detailSublist.addField('custpage_sd_devison_salary', 'text', '司龄工资');
	detailSublist.addField('custpage_sd_trap_salary', 'text', '出差补助');
	detailSublist.addField('custpage_sd_lunch_salary', 'text', '午餐补助');
	detailSublist.addField('custpage_sd_bonuse', 'text', '全勤奖');
	detailSublist.addField('custpage_sd_adjustment', 'text', '当月调整');
	detailSublist.addField('custpage_sd_adjustment_comment', 'text', '调整备注');
	detailSublist.addField('custpage_sd_total_salary', 'text', '应发工资');
	detailSublist.addField('custpage_sd_social_planning', 'text', '社会统筹');
	detailSublist.addField('custpage_sd_fund', 'text', '公积金');
	detailSublist.addField('custpage_sd_tax', 'text', '个调税');
	detailSublist.addField('custpage_sd_others', 'text', '其他');
	detailSublist.addField('custpage_sd_minus_totail', 'text', '代扣合计');
	detailSublist.addField('custpage_sd_actual_salary', 'text', '实发数');
	
	//附件
	//attachSublist.addField('custpage_attachment', 'url', '查看').setLinkText('薪资明细导入模板');
	//nlapiLogExecution('DEBUG', 'salary',getConfigValue('CUX_SALARY_CSV_IMPORT'));
	//attachSublist.setLineItemValue('custpage_attachment', 1, getConfigValue('CUX_SALARY_TEMPLATE_URL'));

	// 如果子公司不为空，设置默认值d
	if (subCompanyFilter) {
		custpage_subcompany_field.setDefaultValue(subCompanyFilter);
	}

	// 如果子公司不为空，设置默认值
	if (periodFilter) {
		custpage_period_field.setDefaultValue(periodFilter);
	}

	// 如果子公司不为空，设置默认值
	if (departmentFilter) {
		custpage_department_field.setDefaultValue(departmentFilter);
	}

	return form;
}


