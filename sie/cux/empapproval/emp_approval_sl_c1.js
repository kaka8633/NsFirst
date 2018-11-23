/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       24 Sep 2018     Administrator
 *
 */
function createForm3(request, response){
	
	//从url中抓取传输信息
	var recordId = request.getAllParameters().custparam_id;
    var recordType = request.getAllParameters().custparam_type;
	
    if(request.getMethod() == 'GET'){
    	//创建一个用于填写拒绝原因的表格
    	var newForm = nlapiCreateForm('详细描述',true);
    	newForm.addFieldGroup('custpage_label','描述区域');
    	newForm.addField('custpage_textarea','textarea','请填写验证信息',null,'custpage_label');
    	var text1 = newForm.addField('custpage_recordtype','text',null,null,'custpage_label').setDisplayType('hidden');
    	var text2 = newForm.addField('custpage_recordid','text',null,null,'custpage_label').setDisplayType('hidden');
    	
    	text1.setDefaultValue(recordType);
    	text2.setDefaultValue(recordId);
    	//此处放入saveRecord客户端脚本以确认信息填写
    	newForm.setScript('customscript_emp_approval_click_cs');
    	
    	newForm.addButton('custpage_button', '提交', 'agree_C()');
    	
    	response.writePage(newForm);
    	
    }

}