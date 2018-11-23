/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       30 Oct 2018     Administrator
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Access mode: create, copy, edit
 * @returns {Void}
 */
function clientPageInit(type) {
	// add by yuming hu 2018-10-19
	if (nlapiGetFieldText('entitystatus') != null
			&& nlapiGetFieldText('entitystatus') != '') {
		changeCloseDate();
	}
	// add by Makaay 2018-10-23
	console.log('m_type=' + type);// debug
	if (type == 'create') {// 新建商机，流水号定义为空
		nlapiDisableField('tranid', true);
		nlapiSetFieldValue('tranid', '');
	}
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @returns {Boolean} True to continue save, false to abort save
 */
function clientSaveRecord() {
	// 进行货品行金额汇总,并回写到行总金额字段
	setLineSummary();

	// // 如果存在报价，取最新报价，赋值到最近报价字段
	// setLatestOfferSummary();

	console.log('cs is ok!');

	// 更新商机关联的机会字段，为 从赢单到现金 功能使用 获取job作业id
	var jobId = nlapiGetFieldValue('job');
	// 写入自定义字段
	if (jobId) {
		nlapiSetFieldValue('custbody_job_id', jobId);
	}
	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @param {String}
 *            name Field internal id
 * @param {Number}
 *            linenum Optional line item number, starts from 1
 * @returns {Boolean} True to continue changing field value, false to abort
 *          value change
 */
function clientValidateField(type, name, linenum) {
	console.info('name=' + name);
	console.info('type=' + type);

	// 选择省份后自动带出区域
	if (name == 'custbody_custom_province') {
		var province = nlapiGetFieldValue(name);

		var filter = [];
		filter.push(new nlobjSearchFilter('custrecord_region_province', null,
				'is', province));
		var searchColumns = [];
		searchColumns[0] = new nlobjSearchColumn('name');
		var searchResults = nlapiSearchRecord('customrecord_region_province',
				null, filter, searchColumns);
		if (searchResults != null && searchResults.length > 0) {

			var areaname = searchResults[0].getValue('name');

			var areaId = getAreaId(areaname);// 根据区域中文获取区域在列表中的id

			nlapiSetFieldValue('custbody_custom_area', areaId, true, true);
		}

	}

	if (type == 'recmachcustrecord_soc_link'
			&& (name == 'custrecord_soc_number' || name == 'custrecord_soc_price')) {

		var num = nlapiGetCurrentLineItemValue(type, 'custrecord_soc_number');// 数量
		var price = nlapiGetCurrentLineItemValue(type, 'custrecord_soc_price')// 单价

		if (num && price) {
			nlapiSetCurrentLineItemValue(type, 'custrecord_soc_summary', num
					* price, true, true);// 总价
		}
	}
	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @param {String}
 *            name Field internal id
 * @param {Number}
 *            linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function clientFieldChanged(type, name, linenum) {
	// add by yuming hu on 2018-10-19
	// 根据状态修改项目预计关闭日期
	if (name == 'entitystatus') {
		changeCloseDate();
	}
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @param {String}
 *            name Field internal id
 * @returns {Void}
 */
function clientPostSourcing(type, name) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Void}
 */
function clientLineInit(type) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Boolean} True to save line item, false to abort save
 */
function clientValidateLine(type) {

	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Void}
 */
function clientRecalc(type) {

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Boolean} True to continue line item insert, false to abort insert
 */
function clientValidateInsert(type) {

	return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @returns {Boolean} True to continue line item delete, false to abort delete
 */
function clientValidateDelete(type) {

	return true;
}

/**
 * 根据区域中文获取区域在列表中的id
 * 
 * @param name
 * @returns {Number}
 */
function getAreaId(name) {

	var areaId = 0;// 区域id
	switch (name) {
	case '东北区':
		areaId = 1;
		break;
	case '华中区':
		areaId = 2;
		break;
	case '华北区':
		areaId = 3;
		break;
	case '华南区':
		areaId = 4;
		break;
	case '西北区':
		areaId = 5;
		break;
	case '西南区':
		areaId = 6;
		break;
	case '华东区':
		areaId = 7;
		break;
	default:

	}

	return areaId;
}

/**
 * 进行货品行金额汇总,并回写到行总金额字段
 */
function setLineSummary() {
	var amount = 0;
	var lineCount = nlapiGetLineItemCount('item');

	for (var i = 0; i < lineCount; i++) {
		var lineAmount = nlapiGetLineItemValue('item', 'grossamt', (i + 1));// 行毛额
		if (!lineAmount) {
			lineAmount = 0;
		}
		amount = amount + parseFloat(lineAmount);
	}

	nlapiSetFieldValue('custbody_line_summary', amount);
}

/**
 * @description 根据商机状态改变预计关闭日期
 * @author yuming hu
 * @date 2018-10-18
 * @version 1.0
 * 
 */
function changeCloseDate() {
	var opportunityStatus = nlapiGetFieldText('entitystatus');
	var changeDays = 0;

	// 根据商机状态判断计算预计关闭日期
	switch (opportunityStatus) {
	case '潜在商机':
		changeDays = 41;
		break;
	case '合格商机':
		changeDays = 40;
		break;
	case '合格的支持者':
		changeDays = 37;
		break;
	case '合格的决策者':
		changeDays = 32;
		break;
	case '决策定案':
		changeDays = 22;
		break;
	case '商务谈判':
		changeDays = 7;
		break;
	default:

	}

	// 获取当前日期
	var currentDate = new Date();

	// 获取加成的日期
	var closeDate = new Date(currentDate.setDate(currentDate.getDate()
			+ changeDays));

	// 给预计关闭日期设置值
	nlapiSetFieldValue('expectedclosedate', nlapiDateToString(closeDate,
			'yyyy-MM-dd'), true, true);

}

function Syncjob(fieldspec, linenum, onlySlaveSelect, mach, addlparams,
		callbacks) {
	var sel = document.forms['main_form'].elements['job'];
	var value = sel != null ? getSelectValue(sel) : -1;
	var value_currency = document.forms['items_form'].elements['currency'].value;
	var value_entity = getSelectValue(document.forms['main_form'].elements['entity']);
	var value_item_units = getSelectValue(document.forms['item_form'].elements['units']);
	var value_subsidiary = document.forms['main_form'].elements['subsidiary'].value;
	var value_trandate = document.forms['s_sysinfo_form'].elements['trandate'].value;
	var value_item_quantity = document.forms['item_form'].elements['quantity'].value;
	
	// 以下为客户化新增
	var buildingHeight = nlapiGetFieldValue('custbody_building_height');// 建筑高度
	var coveredArea = nlapiGetFieldValue('custbody_covered_area');// 建筑面积
	var businessStatus = nlapiGetFieldValue('custbody_type_of_operation');// 项目业态
	var businessLevel = nlapiGetFieldValue('custbody_business_level');// 商机级别
	var professionalType = nlapiGetFieldValue('custbody_professional_type');// 业务类型
	var province = nlapiGetFieldValue('custbody_custom_province');// 省份
	var city = nlapiGetFieldValue('custbody_custom_city');// 城市
	var address = nlapiGetFieldValue('custbody_address');// 详细地址
	var serviceArea = nlapiGetFieldValue('custbody_service_area');// 服务范围
	var bu = nlapiGetFieldValue('custbody_implement_bu');//获取实施BU
	
	if (value == -1) {
		resetlist(sel);
		nlOpenWindow(
				'/app/accounting/project/project.nl?job=T&target=main:job&label=%E9%A1%B9%E7%9B%AE%E5%90%8D%E7%A7%B0&parent='
						+ nlapiGetFieldValue('entity')
						+ '&entity='
						+ getSelectValue(document.forms['main_form'].elements['entity'])
						+ '&custentity_jzgd='
						+ buildingHeight
						+ '&custentity_jzmj='
						+ coveredArea
						+ '&custentity_xmyt='
						+ businessStatus
						+ '&custentity_province_zxp='
						+ province
						+ '&custentity_business_type='
						+ professionalType
						+ '&custentity_address='
						+ address
						+ '&custentity_service_area='
						+ serviceArea
						+ '&custentity_city1='
						+ city
						+ '&custentity_executive_department='
						+ bu
						+ '&custentity_project_grade=' + businessLevel
						+ '', 'newjob',
				'width=600,height=800,resizable=yes,scrollbars=yes');
		setSelectValue(sel, '');
		return;
	}
	if (sel.noslaving == true)
		return;
	NS.form.setInited(false);
	window.status = 'Searching...';
	var eventVar = '';
	if (window.lastKeyStroke == 13) {
		window.lastKeyStroke = -1;
		eventVar = 'enterEvent=T';
	}
	var serverUrl = '/app/accounting/transactions/opprtnty.nl?nexus=1&warnnexuschange=F&at=T&cf=102&id=385&id='
			+ encodeURIComponent(document.forms['main_form'].elements.id.value)
			+ '&e=T&q=job&si='
			+ encodeURIComponent(value)
			+ '&si_currency='
			+ encodeURIComponent(emptyIfNull(value_currency))
			+ '&si_entity='
			+ encodeURIComponent(emptyIfNull(value_entity))
			+ '&si_units='
			+ encodeURIComponent(emptyIfNull(value_item_units))
			+ '&si_subsidiary='
			+ encodeURIComponent(emptyIfNull(value_subsidiary))
			+ '&si_trandate='
			+ encodeURIComponent(emptyIfNull(value_trandate))
			+ '&si_quantity='
			+ encodeURIComponent(emptyIfNull(value_item_quantity))
			+ (fieldspec == true ? '&f=T' : (fieldspec != null
					&& fieldspec.length > 0 ? '&f=' + fieldspec : ''))
			+ '&si_entity='
			+ encodeURIComponent(getSelectValue(document.forms['main_form'].elements['entity']));
	if (eventVar.length != 0)
		serverUrl += '&' + eventVar;
	if (mach != null)
		serverUrl += '&mach=' + mach;
	if (addlparams != null)
		serverUrl += '&' + addlparams;
	if (window.document.page_is_resetting == true)
		serverUrl += '&pgreset=T';
	serverUrl += '&' + new Date().getTime();
	loadSlavingResults(serverUrl, callbacks);
}

// 放在脚本的最后面,去除重载前提示
window.page_unload = null;