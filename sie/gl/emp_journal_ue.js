/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       15 Oct 2018     Administrator
 *
 *如果审核状态为<已核准> 则禁用整个记录的编辑
 *
 *
 *杨浩然
 */
function beforeLoad(type,form,request){
	
	//当状态为view时
	if(type == 'view'){
		
		//抓取当前记录信息并拿到审核状态字段值
		var recordType = nlapiGetRecordType();
		var recordId = nlapiGetRecordId();
		var result = nlapiLoadRecord(recordType, recordId);
		var status = result.getFieldValue('approvalstatus');
		
		//当审核状态为<已审核> 隐藏<编辑>按钮
		if(status == '2'){
			
	    	var result1 = form.getButton('edit');
	    	
	    	if(result1 == null){
	    		
	    		return false;
	    		
	    	}else{
	    		
	    		result1.setVisible(false);
	    		
	    	}
			
	    }
	
	//当页面状态为编辑
	}else if(type == 'edit'){
		
		var recordType = nlapiGetRecordType();
		var recordId = nlapiGetRecordId();
		var result = nlapiLoadRecord(recordType, recordId);
		var status = result.getFieldValue('approvalstatus');
		
		//当审核状态为<已审核> 则从编辑页面跳转到view页面
		if(status == '2'){
			
			nlapiSetRedirectURL('RECORD',recordType,recordId,false);
			
		}		
		
	}
	
}



	

	