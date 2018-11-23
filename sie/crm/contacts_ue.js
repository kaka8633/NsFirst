/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       26 Sep 2018     zyt 联系人UE
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

	if (type == 'edit' || type == 'view') {

		var entityid = nlapiGetFieldValue('entityid');// 获取联系人
		// 添加联系人关联商机子列表
		addContactsOp(form, entityid);
	}

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

}

/**
 * 添加联系人关联商机子列表
 * 
 * @author zyt
 * @param form
 */
function addContactsOp(form, entityid) {

	form.addTab('custpage_contacts_op_tab', '销售');
	var contactsOp = form.addSubList('custpage_contacts_op_sublist', 'staticlist',
			'商机', 'custpage_contacts_op_tab');
	contactsOp.addField('custpage_link_view', 'url', '查看').setLinkText('查看');
	contactsOp.addField('custpage_tranid', 'text', '商机编号');
	contactsOp.addField('custpage_title', 'text', '商机名称');
	contactsOp.addField('custpage_professional_type', 'text', '专业类别');
	contactsOp.addField('custpage_type_of_operation', 'text', '业态');
	contactsOp.addField('custpage_entitystatus', 'text', '商机状态');
	contactsOp.addField('custpage_sales_manager', 'text', '销售经理');
	contactsOp.addField('custpage_amount', 'text', '总金额');

	// 查询联系人关联的商机
	var data = getContactsOp(entityid);

	// 给联系人关联的商机子列表赋值
	setContactsOp(data, contactsOp);
}

/**
 * 从商机视图查询对应联系人商机数据
 * 
 * @author zyt
 * @param entityid
 * @returns {Array}
 */
function getContactsOp(entityid) {

	nlapiLogExecution('ERROR', '联系人', entityid);

	var filters = [];
	filters[0] = new nlobjSearchFilter('entityid', 'contact', 'is', entityid);// 筛选出对应联系人的商机
	var searchColumns = [];
	searchColumns[0] = new nlobjSearchColumn('tranid');// 商机编号
	searchColumns[1] = new nlobjSearchColumn('title');// 商机名称
	searchColumns[2] = new nlobjSearchColumn('custbody_professional_type');// 专业类别
	searchColumns[3] = new nlobjSearchColumn('custbody_type_of_operation');// 业态
	searchColumns[4] = new nlobjSearchColumn('entitystatus');// 商机状态
	searchColumns[5] = new nlobjSearchColumn('custbody_sales_manager');// 销售经理
	searchColumns[6] = new nlobjSearchColumn('firstname', 'contact');// 联系人
	searchColumns[7] = new nlobjSearchColumn('custbody_line_summary');// 行金额汇总
	searchColumns[8] = new nlobjSearchColumn('custbody_latest_offer_summary');// 机会最新报价

	var searchResults = nlapiCreateSearch('opportunity', filters, searchColumns)
			.runSearch();

	var startIndex = 0;
	var dataAry = [];
	var dataJson = {};
	do {
		var resultSet = searchResults.getResults(startIndex, startIndex + 1000);
		if (resultSet) {
			for (var i = 0; i < resultSet.length; i++) {
				var id = resultSet[i].id;
				var tranid = resultSet[i].getValue('tranid');// 商机编号
				var title = resultSet[i].getValue('title');// 商机名称
				var professionalType = resultSet[i]
						.getText('custbody_professional_type');// 专业类别
				var typeOfOperation = resultSet[i]
						.getText('custbody_type_of_operation');// 业态
				var entityStatus = resultSet[i].getText('entitystatus');// 商机状态
				var salesManager = resultSet[i]
						.getText('custbody_sales_manager');// 销售经理
				var lineSummary = resultSet[i]
						.getValue('custbody_line_summary');// 行金额汇总
				var latestOfferSummary = resultSet[i]
						.getValue('custbody_latest_offer_summary');// 机会最新售价
				var firstname = resultSet[i].getValue(new nlobjSearchColumn(
						'firstname', 'contact'));// 联系人
				dataJson = {};
				dataJson['internalid'] = id;
				dataJson['tranid'] = tranid;
				dataJson['title'] = title;
				dataJson['professionalType'] = professionalType;
				dataJson['typeOfOperation'] = typeOfOperation;
				dataJson['entityStatus'] = entityStatus;
				dataJson['salesManager'] = salesManager;
				dataJson['amount'] = (latestOfferSummary == 0 ? lineSummary
						: latestOfferSummary);
				dataJson['firstname'] = firstname;

				dataAry.push(dataJson);

			}
		}

		startIndex += 1000;
	} while (resultSet != null && resultSet.length > 0);

	nlapiLogExecution('ERROR', '联系人关联商机数组', JSON.stringify(dataAry));
	return dataAry;
}

/**
 * 给联系人关联的商机子列表赋值
 * 
 * @author zyt
 * @param data
 */
function setContactsOp(data, sublist) {

	var url = nlapiResolveURL('RECORD', 'opportunity', null, 'VIEW') + '&id=';

	for (var i = 0; i < data.length; i++) {
		sublist.setLineItemValue('custpage_link_view', (i + 1), url
				+ data[i].internalid);
		sublist.setLineItemValue('custpage_tranid', (i + 1), data[i].tranid);// 商机编号
		sublist.setLineItemValue('custpage_title', (i + 1), data[i].title);// 商机名称
		sublist.setLineItemValue('custpage_professional_type', (i + 1),
				data[i].professionalType);// 专业类别
		sublist.setLineItemValue('custpage_type_of_operation', (i + 1),
				data[i].typeOfOperation);// 业态
		sublist.setLineItemValue('custpage_entitystatus', (i + 1),
				data[i].entityStatus);// 商机状态
		sublist.setLineItemValue('custpage_sales_manager', (i + 1),
				data[i].salesManager);// 销售经理
		sublist.setLineItemValue('custpage_amount', (i + 1), data[i].amount);// 总金额
	}

}