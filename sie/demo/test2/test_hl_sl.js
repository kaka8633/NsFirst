/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       15 Aug 2018     Tingyiyi
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

	// getViewItem(response, 'customsearch_sales_order_type_view');
	//
	// var resultAry = getSalesTypeCount();
	//
	// response.writeLine(JSON.stringify(resultAry));

	// var copyorder = nlapiCopyRecord('customrecord_purchase_order_head', 1, {
	// recordmode : 'dynamic'
	// });
	// copyorder.setFieldValue('custrecord_poh_status', 2);
	// copyorder.setFieldValue('custrecord_poh_memo', '这条数据是copy来的');
	// var copiedId = nlapiSubmitRecord(copyorder);
	// response.writeLine('copiedId=' + copiedId);
	// var record = nlapiCreateRecord('customrecord_purchase_order_head');
	// record.setFieldValue('custrecord_poh_status', 2);
	// record.setFieldValue('custrecord_poh_memo', '这条是有create创建的');
	// var id = nlapiSubmitRecord(record, true);
	// response.writeLine('id=' + id);
	// var partnerPhone = nlapiLookupField('customer', 274, 'partner.phone');
	// response.writeLine('partnerPhone=' + partnerPhone);

	// showAssistant(request, response);
}

function renderRecord(request, response) {
	var salesOrderID = 3;
	var salesOrder = nlapiLoadRecord('salesorder ', salesOrderID);
	var renderer = nlapiCreateTemplateRenderer();
	renderer.setTemplate('...');
	renderer.addRecord('record', salesOrder);
	response.setContentType('HTMLDOC ');
	renderer.renderToResponse(response);
}
/**
 * nlapiCreateAssistant demo
 * 
 * @param request
 * @param response
 * @returns
 */
function showAssistant(request, response) {
	/* first create assistant object and define its steps. */
	var assistant = nlapiCreateAssistant("测试助手界面", true);
	assistant.setOrdered(true);// 设置必须按顺序录入

	assistant.addStep('custpage_info', '基本信息').setHelpText("请输入<b>基本</b>信息");
	assistant.addStep('custpage_location', '地址信息').setHelpText(
			"请输入<b>地址</b> 信息");
	assistant.addStep('custpage_school', '学历信息').setHelpText("请输入学历信息");

	/* handle page load (GET) requests. */
	if (request.getMethod() == 'GET') {
		/* .Check whether the assistant is finished */
		if (!assistant.isFinished()) {
			// If initial step, set the Splash page and set the intial step
			if (assistant.getCurrentStep() == null) {
				assistant.setCurrentStep(assistant.getStep("custpage_info"));

				assistant
						.setSplash(
								"欢迎设置个人信息",
								"<b>Whatyou'll be doing</b><br>The Small Business Setup Assistant will walk youthrough the process of configuring your NetSuite account for your initial use..",
								"<b>When you finish</b><br>your account will be ready for you to use torun your business.");
			}
			var step = assistant.getCurrentStep();

			if (step.getName() == "custpage_info") {
				assistant.addField('custpage_name', 'text', '姓名')
				assistant.addField('custpage_sex_tip', 'label', '性别')
						.setLayoutType('startrow');
				assistant.addField('custpage_sex', 'radio', '女', 'girl')
						.setLayoutType('midrow');
				assistant.addField('custpage_sex', 'radio', '男', 'boy')
						.setLayoutType('endrow');
				assistant.getField('custpage_sex', 'girl').setDefaultValue(
						'girl');

				assistant.addFieldGroup("custpage_contact", "联系方式");
				assistant.addField("custpage_contact_phone", "text", "电话号码",
						null, "custpage_contact").setMandatory(true);
				assistant.addField("custpage_contact_tell", "text", "座机", null,
						"custpage_contact")
				assistant.addField("custpage_contact_email", "text", "邮件",
						null, "custpage_contact").setMandatory(true);
				assistant.getField("custpage_contact_phone").setHelpText(
						"请输入有效的手机号码");
				assistant.getField("custpage_contact_email").setHelpText(
						"请输入合法的邮箱");
			}

			if (step.getName() == "custpage_location") {

				assistant.addField('custpage_loc_address', 'label', '请选择你的位置');
				assistant.addField('custpage_address', 'radio', '国内', 'china');
				assistant
						.addField('custpage_address', 'radio', '国外', 'foreign');

				assistant.addFieldGroup("custpage_loc_age", "星期");

				var age = assistant.addField("custpage_first_day", "select",
						"年龄", null, "custpage_loc_age");
				var chk = assistant.addField("custpage_loc_choice", "checkbox",
						"选择框", null, "custpage_loc_age");
				var address = assistant.addField("custpage_loc_message",
						"text", "详细地址", null, "custpage_loc_age");
				address.setMandatory(true);

				var selectOptions = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

				for (var i = 0; i < selectOptions.length; i++) {
					age.addSelectOption(selectOptions[i], selectOptions[i]);
				}

				chk.setDefaultValue('T');
				address.setDefaultValue('湖南长沙');

			} else if (step.getName() == "custpage_school") {
				var sublist = assistant.addSubList("custpage_sch_mes",
						"inlineeditor", "学校信息");

				sublist.addField("cust_sch_name", "text", "名称");
				sublist.addField("cust_sch_loc", "text", "地址");
				sublist.addField("cust_sch_major", "text", '专业');

				sublist.setUniqueField("cust_sch_name");
			}

		}
		response.writePage(assistant);
	}

	else {

		assistant.setError(null);

		// 点击完成按钮，给出填写完成提示
		if (assistant.getLastAction() == "finish") {
			assistant.setFinished("个人信息填写完成！");

			assistant.sendRedirect(response);
		}
		/*
		 * 2. 点击取消时，调到设置管理界面
		 */
		else if (assistant.getLastAction() == "cancel") {
			nlapiSetRedirectURL('tasklink', "CARD_-10");
		}
		/*
		 * 如果是其他动作，下一步或返回或者跳过时
		 */
		else {

			if (assistant.getLastStep().getName() == "companyinformation"
					&& assistant.getLastAction() == "next") {
				// update the company information page
				var configCompInfo = nlapiLoadConfiguration('companyinformation');

				configCompInfo.setFieldValue('city', request
						.getParameter('city'));

				nlapiSubmitConfiguration(configCompInfo);
			}

			if (assistant.getLastStep().getName() == "companypreferences"
					&& assistant.getLastAction() == "next") {
				// update the company preferences page
				var configCompPref = nlapiLoadConfiguration('companypreferences');

				configCompPref.setFieldValue('CUSTOMERWELCOMEMESSAGE', request
						.getParameter('customerwelcomemessage'));

				nlapiSubmitConfiguration(configCompPref);

				// update the accounting preferences pages
				var configAcctPref = nlapiLoadConfiguration('accountingpreferences');

				configAcctPref.setFieldValue('CREDLIMDAYS', request
						.getParameter('credlimdays'));

				nlapiSubmitConfiguration(configAcctPref);
			}

			if (assistant.getLastStep().getName() == "enterlocations"
					&& assistant.getLastAction() == "next") {
				// create locations

				for (var i = 1; i <= request.getLineItemCount('locations'); i++) {
					locationRec = nlapiCreateRecord('location');

					locationRec.setFieldValue('name', request.getLineItemValue(
							'locations', 'name', i));
					locationRec.setFieldValue('tranprefix', request
							.getLineItemValue('locations', 'tranprefix', i));
					locationRec.setFieldValue('makeinventoryavailable', request
							.getLineItemValue('locations',
									'makeinventoryavailable', i));
					locationRec.setFieldValue('makeinventoryavailablestore',
							request.getLineItemValue('locations',
									'makeinventoryavailablestore', i));

					try {
						// add a location to the account
						nlapiSubmitRecord(locationRec);
					} catch (error) {
						assistant.setError(error);
					}
				}

			}
			if (!assistant.hasError()) {
				assistant.setCurrentStep(assistant.getNextStep());
			}

			assistant.sendRedirect(response);

		}
	}
}

function getLinkoutURL(redirect, type) {
	var url = redirect;

	if (type == "record")
		url = nlapiResolveURL('record', redirect);

	url += url.indexOf('?') == -1 ? '?' : '&';

	var context = nlapiGetContext();
	url += 'customwhence='
			+ escape(nlapiResolveURL('suitelet', context.getScriptId(), context
					.getDeploymentId()))

	return url;

}
/**
 * 输出搜索的字段id
 */
function getViewItem(response, view) {
	// 自定义视图取字段id
	var loadSearch = nlapiLoadSearch(null, view); // 加载搜索
	var searchResults = loadSearch.runSearch();// 查询
	var columnsold = searchResults.getColumns();// 获取行
	var columns = new Object();
	if (columnsold) {
		for (var c = 0; c < columnsold.length; c++) {
			var co = columnsold[c];
			columns[co.getName()] = co;
			response.writeLine('name=' + co.getName());
		}
	}
}

/**
 * 查询销售订单按类型汇总计数视图
 */
function getSalesTypeCount() {

	var resultAry = [];// 查询结果返回数组
	// 自定义视图取字段id
	var loadSearch = nlapiLoadSearch(null, 'customsearch_sales_order_type_view'); // 加载搜索
	var searchResults = loadSearch.runSearch();// 查询
	var resultIndex = 0;
	var resultStep = 1000;
	var list;
	do {
		// 一次最多还能取1000条，如果大于1000条数据，则拆开
		list = searchResults.getResults(resultIndex, resultIndex + resultStep);
		resultIndex = resultIndex + resultStep;
		if (list != null) {
			for (var i = 0; i < list.length; i++) {
				var json = {};

				var salesType = list[i].getText(new nlobjSearchColumn('type',
						null, 'group'));
				var typeCount = list[i].getValue(new nlobjSearchColumn(
						'internalId', null, 'count'));

				json.salesType = salesType;
				json.typeCount = typeCount;

				resultAry.push(json);
			}
		}
	} while (list != null && list.length > 0);
	return resultAry;
}