/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       12 Oct 2018     Administrator
 *
 */
function createForm11(request, response){
	
	//从url中抓取传输信息
	var recordId = request.getAllParameters().custparam_id;
    var recordType = request.getAllParameters().custparam_type;
	
    if(request.getMethod() == 'GET'){
    	//创建一个用于填写同意原因的表格
    	var newForm = nlapiCreateForm('详细描述',true);
    	newForm.addFieldGroup('custpage_label','描述区域');
    	newForm.addFieldGroup('custpage_label2','止薪日期');
    	newForm.addField('custpage_textarea','textarea','请填写意见',null,'custpage_label');
    	newForm.addField('custpage_date','date','请填写预计止薪日期',null,'custpage_label2');
    	var text1 = newForm.addField('custpage_recordtype','text',null,null,'custpage_label').setDisplayType('hidden');
    	var text2 = newForm.addField('custpage_recordid','text',null,null,'custpage_label').setDisplayType('hidden');
    	
    	text1.setDefaultValue(recordType);
    	text2.setDefaultValue(recordId);
    	//此处放入saveRecord客户端脚本以确认信息填写
    	//newForm.setScript('customscript_emp_approval_cs');
    	newForm.setScript('customscript_emp_approval_click_cs');
    	
    	newForm.addButton('custpage_button', '提交', 'agree_A()');
    	
    	response.writePage(newForm);

    }

}