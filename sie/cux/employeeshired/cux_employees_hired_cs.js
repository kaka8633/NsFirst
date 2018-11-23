/**
 * Module Description
 * 
 * Version Date Author Remarks 1.00 16 Oct 2018 Administrator
 *233
 */

var formType = '';
var all = new Array();
var userInfo = nlapiGetContext()['user'];
var gUrl = nlapiResolveURL('SUITELET', 'customscript_employees_hired_sl',
		'customdeploy_employees_hired_sl');
var mainData = undefined;

// var mainData = nlapiLoadRecord('customrecord_emp_entry_info',recordId);
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

	nlapiSetFieldValue('custrecord_custpage_approval', userInfo);
	formType = type;

	getAll();
	formInit(type);

}

function getAll() {
	$.ajax({
		url : gUrl,
		type : 'POST',
		async : false,
		data : {
			'bu' : ''
		},
		success : function(data) {
			all = JSON.parse(data);
			console.log(all);
		},
		erroe : function() {

		}
	});
}

function getNewall(d) {

	var department = d;

	$.ajax({
		url : gUrl,
		type : 'POST',
		async : false,
		data : {
			'bu' : department
		},
		success : function(data) {
			all = JSON.parse(data);
			console.log(all);
		},
		erroe : function() {
			
		}
	});
}
/**
 * 不是被打回的请求不能编辑
 */
function formInit(type) {

	var approver = nlapiGetFieldValue('custrecord_custpage_approval');
	var initer = getIndex(approver, all);

	if (type == 'create') {// 创建时不是办公室秘书不能提交
		if (initer != 0) {
			$('.pgBntY').hide();
		}
	}

	if (type == 'edit') {
		// 获取状态值 获取当前用户是录入人 状态值=0 && 是办公室秘书才可以编辑
		var status = nlapiGetFieldValue('custrecord_custpage_status');
		if (status != 0) {// 不是被打回的不能编辑
			$('.pgBntY').hide();
			if (initer != 0) {// 被打回的不是办公室秘书不能编辑
				$('.pgBntY').hide();
			}
		}
	}
}
/**
 * 
 * @param d
 * @param obj
 * @returns {Number} 获取当前人员是否在流程中
 */
function getIndex(d, obj) {
	for (var i = 0; i < obj.length; i++) {
		for (var j = 0; j < obj[i].length; j++) {
			var current = obj[i][j]['id'];
			if (d == current) {
				return i;
			}
		}
	}
	return 5;
}

function bindEvent(i,record) {

	$('#custpage_sub').on('click', function() {

		var a,b,c,d,e,f;
		mainData = nlapiLoadRecord('customrecord_emp_entry_info',record);
		var val = {
			'true' : 'T',
			'false': 'F'
		}

		if(i == 1){

			a = document.getElementById('custpage_ordinary').checked;
			b = document.getElementById('custpage_management').checked;
			c = document.getElementById('custpage_other').value;
			d = document.getElementById('custpage_business_unit').checked;
			e = document.getElementById('custpage_other_email').checked;
			f = document.getElementById('custpage_email_address').value;

			if(!a && !b){
				alert('账号类型必选其一')
				return false
			}
			if(!d && !e){
				alert('邮箱类型必选其一')
				return false
			}

			mainData.setFieldValue('custrecord_ordinary_emp',val[a.toString()]);
			mainData.setFieldValue('custrecord_management_emp',val[b.toString()]);
			mainData.setFieldValue('custrecord_other_needs',c);
			mainData.setFieldValue('custrecord_this_mail',val[d.toString()]);
			mainData.setFieldValue('custrecord_other_mail',val[e.toString()]);
			mainData.setFieldValue('custrecord_other_mail_adress',f);

			mainData.setFieldValue('custrecord_custpage_status',2);
			nlapiSubmitRecord(mainData);

			alert('提交成功，请等待下一审批人审批');
			window.history.go(-1);

		}else if(i == 3){
			
			// a = mainData.getFieldValue('custrecord_ordinary_emp');
			// b = mainData.getFieldValue('custrecord_management_emp');
			// c = mainData.getFieldValue('custrecord_other_needs');
			// d = mainData.getFieldValue('custrecord_this_mail');
			// e = mainData.getFieldValue('custrecord_other_mail');
			// f = mainData.getFieldValue('custrecord_other_mail_adress');

			// document.getElementById('custpage_ordinary').checked = a;
		  // document.getElementById('custpage_management').checked = b;
			// document.getElementById('custpage_other').value = c;
			// document.getElementById('custpage_business_unit').checked = d;
			// document.getElementById('custpage_other_email').checked = e;
			// document.getElementById('custpage_email_address').value = f;

			mainData.setFieldValue('custrecord_custpage_status',4);
			nlapiSubmitRecord(mainData);
		
			alert('提交成功，审批结束');
			window.history.go(-1);

		}

		// window.history.go(-1);
	});

	$('#custpage_cancel').on('click', function() {
		$('#custpage_mask').hide();
	});

}

function pupInit() {
	var style = '<style>'
			+ '#custpage_mask{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:99;background-color:rgba(0,0,0,.6)}'
			+ '#custpage_context{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:999;'
			+ 'min-width:614px;border:1px solid #ccc;border-radius:4px}'
			+ '#custpage_title{padding-left:5px;height:28px;line-height:28px;background-color:#E0E6EF;color:#4d5f79}'
			+ '#custpage_context input{vertical-align:middle;cursor:pointer;}'
			+ '#custpage_context label{cursor:pointer}'
			+ '#custpage_wrap{padding:10px 25px;background-color:#ffffff;border-radius:0 0 4px 4px}'
			+ '.custpage_list{height:46px;line-height:23px;padding:10px 0}'
			+ '#custpage_management{margin-left:30px;}'
			+ '.m-30{margin-right:30px}'
			+ '#custpage_other{margin-left:12px}'
			+ '#custpage_email_address{margin-left:12px}'
			+ '#custpage_other_email{margin-left:17px}'
			+ '#custpage_email_address,#custpage_other{vertical-align:middle;height:22px;border:none;border:.5px solid;border-color:#696969;border-radius:4px}'
			+ '#custpage_btns{text-align:center;margin-top:40px}'
			+ '#custpage_sub,#custpage_cancel{padding:2px 36px; background-color:#ffffff;border-radius:6px;cursor:pointer;outline:none;}'
			+ '#custpage_sub{margin-right:30px}' + '</style>';

	var html = '<div id="custpage_mask" onselectstart="return false">'
			+ '<div id="custpage_context">'
			+ '<p id="custpage_title">系统账号权限分配</p>'
			+ '<div id="custpage_wrap">'
			+ '<p class="custpage_subtitle">Netsuite系统账号权限</p>'
			+ '<div class="custpage_list">'
			+ '<label for="custpage_ordinary"><input id="custpage_ordinary" type="checkbox" />普通员工账号</label>'
			+ '<label for="custpage_management"><input id="custpage_management" type="checkbox" /><span class="m-30">岗位管理账号</span><label>'
			+ '其他特殊需求<input id="custpage_other" type="text" />'
			+ '</div>'
			+ '<p class="custpage_subtitle">邮箱配置账号查看权限</p>'
			+ '<div class="custpage_list">'
			+ '<label for="custpage_business_unit"><input id="custpage_business_unit" type="checkbox" />本业务单元邮箱</label>'
			+ '<label for="custpage_other_email"><input id="custpage_other_email" type="checkbox" />其他邮箱</label>'
			+ '<input id="custpage_email_address" type="text" />' + '</div>'
			+ '<div id="custpage_btns">'
			+ '<button id="custpage_sub">提交</button>'
			+ '<button id="custpage_cancel">取消</button>' + '</div>' + '</div>'
			+ '</div>' + '<div>';
	$('#div__body').append((style + html));
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
	if (formType == 'creat') {
		// 取部门主管放到写入审批人
		nlapiSetFieldValue('custrecord_custpage_status',1);
	}
	var place = nlapiGetFieldValue('custrecord_custpage_emp_place');
	var company    = nlapiGetFieldValue('custrecord_custpage_emp_company');
	if(!!company)
	$.ajax({
		url : gUrl,
		type : 'POST',
		async : false,
		data : {
			'place' : place,
			'company' : company
		},
		success : function(data) {
			if(data == '0'){
				alert('请选择公司所存在的地点')
				return false
			}
		},
		erroe : function() {
			
		}
	});

	var department = nlapiGetFieldValue('custrecord_custpage_emp_department');
		if(!!department){
			var company    = nlapiGetFieldValue('custrecord_custpage_emp_company');
			$.ajax({
				url : gUrl,
				type : 'POST',
				async : false,
				data : {
					'department' : department,
					'company' : company
				},
				success : function(data) {
					if(data == '0'){
						alert('请选择所属公司下的部门')
						return false
					}
				},
				erroe : function() {
					
				}
			});
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

	if (name == 'custrecord_custpage_emp_id_number') {

		var id = nlapiGetFieldValue('custrecord_custpage_emp_id_number');

		if (!!id) {

			var currentYear = new Date().getFullYear();

			if (id.length > 18 || id.length < 18) {
				alert('身份证号错误，请核对')
				return true
			}

			var year = id.substring(6, 10);
			var month = id.substring(10, 12);
			var day = id.substring(12, 14);

			if (year > (currentYear - 15) || month > 12 || day > 31) {
				alert('请核对身份证号')
				return true
			}

			nlapiSetFieldValue('custrecord_custpage_emp_birth_day', year + '-'
					+ month + '-' + day);

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

	var currentYear = new Date().getFullYear();

	if (name == 'custrecord_custpage_emp_line_of_time') {

		var lineTime = nlapiGetFieldValue('custrecord_custpage_emp_line_of_time')
		console.log(lineTime);
		if (!!lineTime) {
			var workTimeFilters = [];
				workTimeFilters.push(new nlobjSearchFilter('internalid','is',overData));
			var workTimeColumns = [];
				workTimeColumns.push(new nlobjSearchColumn('name'));
			var workTimeData = nlapiSearchRecord('customlist_year_list',workTimeFilters,workTimeColumns);
			var workTimeYear = workTimeData.getText('name');
			console.log(workTimeYear);
		
			nlapiSetFieldValue('custrecord_custpage_emp_industry_age',
					(currentYear - workTimeYear) + '年');

		}
	}

	// custrecord_custpage_emp_over_dates毕业
	if (name == 'custrecord_custpage_emp_over_dates') {

		var overData = nlapiGetFieldValue('custrecord_custpage_emp_over_dates');

		if (!!overData) {

			var over = Number(overData.split('-')[0]);
			nlapiSetFieldValue('custrecord_custpage_work_time',
					(currentYear - over) + '年');

		}
	}
	
	if(name == 'custrecord_custpage_emp_labor_strat_time' || name == 'custrecord_custpage_emp_labor_end_time'){

		var type = 'recmachcustrecord_custpage_emp_labor_link';
		var index = nlapiGetCurrentLineItemIndex(type);

		nlapiSetCurrentLineItemValue(type, 'custrecord_custpage_emp_labor_num', index,
				true, true);
		// nlapiCommitLineItem(type);

	}

	if(name == 'custrecord_custpage_emp_department'){
		var department = nlapiGetFieldValue('custrecord_custpage_emp_department');
		if(!!department){
			var company    = nlapiGetFieldValue('custrecord_custpage_emp_company');
			$.ajax({
				url : gUrl,
				type : 'POST',
				async : false,
				data : {
					'department' : department,
					'company' : company
				},
				success : function(data) {
					if(data == '0'){
						alert('请选择所属公司下的部门')
					}
				},
				erroe : function() {
					
				}
			});
		}
	}

	if(name == 'custrecord_custpage_emp_place'){
		var place = nlapiGetFieldValue('custrecord_custpage_emp_place');
		var company    = nlapiGetFieldValue('custrecord_custpage_emp_company');
		if(!!company)
		$.ajax({
			url : gUrl,
			type : 'POST',
			async : false,
			data : {
				'place' : place,
				'company' : company
			},
			success : function(data) {
				if(data == '0'){
					alert('请选择公司所存在的地点')
				}
			},
			erroe : function() {
				
			}
		});
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
	// nlapiSetLineItemValue('recmachcustrecord_custpage_emp_labor_link','',1,'')

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

	if(type == 'recmachcustrecord_custpage_emp_labor_link'){

		var count = nlapiGetLineItemCount(type);

		for(var i = 1; i <= count; i ++){

			nlapiSelectLineItem(type,i);
			nlapiSetCurrentLineItemValue(type,'custrecord_custpage_emp_labor_num',i,true,true)
			
		}

	}

	return true;
}
/**
 * 审批通过
 */
function role(i, d , recordId) {

	mainData = nlapiLoadRecord('customrecord_emp_entry_info',recordId);
	getNewall(d);

	var index = i;
	var record = recordId;
	var index2 = getIndex(userInfo, all);

	// if(index == 1){
	// if(userInfo != nlapiGetFieldValue('custrecord_custpage_approval')){
	// alert("对不起，目前您没有审批权限");
	// window.history.go(-1);
	// }
	// }

	if (index != index2) {
		alert("对不起，目前您没有审批权限");
		window.history.go(-1);
	}

	if (index == 1 || index == 3) {
		if ($('#custpage_mask').length == 0) {
			pupInit();
			bindEvent(index,record);
		}

		if (index == 3) {// 填充弹窗

			var a,b,c,d,e,f;
			var val = {
				'T' : 'true',
				'F'	: 'false'
			};

			a = mainData.getFieldValue('custrecord_ordinary_emp');
			b = mainData.getFieldValue('custrecord_management_emp');
			c = mainData.getFieldValue('custrecord_other_needs');
			d = mainData.getFieldValue('custrecord_this_mail');
			e = mainData.getFieldValue('custrecord_other_mail');
			f = mainData.getFieldValue('custrecord_other_mail_adress');

			document.getElementById('custpage_ordinary').checked = val[a];
		  document.getElementById('custpage_management').checked = val[b];
			document.getElementById('custpage_other').value = c;
			document.getElementById('custpage_business_unit').checked = val[d];
			document.getElementById('custpage_other_email').checked = val[e];
			document.getElementById('custpage_email_address').value = f;

			// mainData.setFieldValue('custrecord_custpage_status',4);
			// 获取弹窗信息并填充
		}

		$('#custpage_mask').show();

	}else if(index == 2){

		mainData.setFieldValue('custrecord_custpage_status',3);
		nlapiSubmitRecord(mainData);
		window.history.go(-1);

	}

	// 此处获取审批人信息并更改，到hr负责人审批完以后 写入系统员工表 并写入流转信息
}
/**
 * 审批拒绝
 */
function refused(i,d,record) {

	getNewall(d);

	var index = i;
	var index2 = getIndex(userInfo, all);
	mainData = nlapiLoadRecord('customrecord_emp_entry_info',record);

	if(index == index2){

		mainData.setFieldValue('custrecord_custpage_status',0);
		nlapiSubmitRecord(mainData);
		alert('您已经拒绝了此次请求');
		window.history.go(-1);

	}else{
		alert('您没有审批权限')
	}
	// 此处拒绝请求 打回录入人 状态字段改为0 并写入流转信息 参数e为审批拒绝人id
}


