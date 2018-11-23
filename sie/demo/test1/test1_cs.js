/**
 * Module Description
 * 
 * Version Date Author Remarks 1.00 15 Aug 2018 Tingyiyi
 * 
 */
var gurl = nlapiResolveURL('SUITELET', 'customscript_test1_sl',
		'customdeploy_test1_sl');// sl路径
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
 * 提交离职申请按钮 验证该员工是否已提交离职申请 否：跳转到离职申请界面；是：给出不可重复申请提示
 */
function submitDiss() {

	// 验证改员工是否已经提交离职申请
	var intId = checkDiss();

	if (intId == -1) {

		nlapiSetRedirectURL('record', 'customrecord_emp_dismission', null, true);

	} else {

		alert('离职申请已存在，请勿重复创建！');

	}
}

/**
 * 查看离职申请按钮 验证该员工是否已提交离职申请 否：给出请提交离职申请提示；是：跳转到离职申请查看界面
 */
function viewDiss() {

	// 验证改员工是否已经提交离职申请
	var intId = checkDiss();

	if (intId == -1) {

		alert('请先提交离职申请！');

	} else {

		window.open('/app/common/custom/custrecordentry.nl?rectype=88&id='
				+ intId);

	}

}

/**
 * 验证该员工是否已提交离职申请
 */
function checkDiss() {

	var intId = -1;// 若离职申请还未创建，返回-1

	$.ajax({
		type : "POST", // 提交方式
		url : gurl,// 路径
		async : false,
		data : {
			'action' : 'checkDiss'
		},
		success : function(result) {
			// 返回数据根据结果进行相应的处理 eval方法，将json格式的字符串转换为json
			var msg = eval("(" + result + ")");
			if (msg.status == 'E') {
				alert(msg.data);
			} else {
				// 查询到了离职申请id之后将离职申请id赋值给intid
				if (msg.intId) {
					intId = msg.intId;
				}
			}
		}
	});

	return intId;
}
window.page_unload = null;
