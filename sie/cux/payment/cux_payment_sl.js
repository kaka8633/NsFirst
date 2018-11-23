/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       13 Sep 2018     Bman
 *
 */

/**
 * @param {nlobjRequest}
 *            request Request object
 * @param {nlobjResponse}
 *            response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response) {

	if (request.getMethod() == 'GET') {

		var action = request.getParameter('action');

		if (action == null) {
			//-1 表示没有
			var form = initUI(-1, null, null, null, null);
			response.writePage(form);
		} else if (action == 'search') {
			var period = request.getParameter('period');
			var department = request.getParameter('department');
			var date = request.getParameter('date');
			var certificate = request.getParameter('certificate');
			var periodText = request.getParameter('periodText');
			var summary = request.getParameter('summary');
			var form = initUI(period, department, date, certificate, summary);
			var  fileData = searchRecord(form, period, department, date, certificate, summary,periodText);
			//下载按钮
			form.addButton('custpage_download_btn', '下载', "download('"+fileData.fileURL+"|"+fileData.fileId+"')");
			response.writePage(form);
			
		}else if(action == 'delete'){
			var fileId = request.getParameter('fileId');
			nlapiDeleteFile(parseInt(fileId));
		}

	}

}

/**
 * 初始化页面信息
 * 
 * @returns
 */
function initUI(period, department, date, certificate, summary) {

	var form = nlapiCreateForm('支付文件-费用报销');

	form.setScript('customscript_cux_payment_cs');
	// 查询条件
	var custpage_certificate_field = form.addField('custpage_filter_certificate', 'select', '单据');
	//单据是必填，所以没有空选项
	custpage_certificate_field.addSelectOption('bill', '账单');
	custpage_certificate_field.addSelectOption('salary', '工资');
	custpage_certificate_field.addSelectOption('report', '费用报告');
	custpage_certificate_field.addSelectOption('borrow', '借款申请单');
	var custpage_period_field = form.addField('custpage_filter_period', 'select', '期间', 'AccountingPeriod');
	var custpage_department_field = form.addField('custpage_filter_department','select', '部门', 'department');
	var custpage_date_field = form.addField('custpage_filter_date', 'date', '审批时间');
	var custpage_summary_field = form.addField('custpage_filter_summary','select', '按照收款账号进行汇总');
	
	custpage_summary_field.addSelectOption('Y', 'Y');
	custpage_summary_field.addSelectOption('N', 'N',true);

	// 查询按钮
	form.addButton('custpage_search_btn', '查询', 'search()');
	

	// 创建table标签
	form.addTab('custpage_payment_tab', '支付页签');
	// 挂载sublist
	var paymentSublist = form.addSubList('custpage_attach_sublist', 'list', '列表', 'custpage_payment_tab');

	// 创建显示字段
	paymentSublist.addField('custpage_sp_payment_index', 'integer', '序号');
	paymentSublist.addField('custpage_sp_payment_account', 'text', '付款账号');
	paymentSublist.addField('custpage_sp_payment_account_name', 'text','付款账号名称');
	paymentSublist.addField('custpage_sp_collection_account', 'text', '收款账号');
	paymentSublist.addField('custpage_sp_collection_account_name', 'text','收款账号名称');
	paymentSublist.addField('custpage_sp_collection_account_bank', 'text','收款账号开户行');
	paymentSublist.addField('custpage_sp_transfer_type', 'text', '转账类型');
	paymentSublist.addField('custpage_sp_union_number','text','收报行联行号');
	paymentSublist.addField('custpage_sp_amount', 'text', '金额');
	paymentSublist.addField('custpage_sp_remittance_purpose', 'text', '汇款用途');
	// 如果字段不为空，填充字段
	if (certificate) {
		custpage_certificate_field.setDefaultValue(certificate);
	}

	//给一个没有的值，不展示默认值
    if(period == ''){ //解决跳转后出现默认值的情况
      custpage_period_field.setDefaultValue(-1);
    }else{
      custpage_period_field.setDefaultValue(period);
    }

	if (department) {
		custpage_department_field.setDefaultValue(department);
	}
	//自定义地段默认是空字符串
	if (date != null && date != '') {
		custpage_date_field.setDefaultValue(date);
	}

	if (summary) {
		custpage_summary_field.setDefaultValue(summary);
	}

	return form;
}
