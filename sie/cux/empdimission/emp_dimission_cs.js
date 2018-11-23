/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 Sep 2018     Administrator
 *
 */

function saveRecord(){
	
	var check1 = nlapiGetFieldValue('custrecordcustrecord_emp_one');
	var check2 = nlapiGetFieldValue('custrecordcustrecord_emp_two');
	var check3 = nlapiGetFieldValue('custrecordcustrecord_emp_three');
	var check4 = nlapiGetFieldValue('custrecordcustrecord_emp_four');
	var check5 = nlapiGetFieldValue('custrecordcustrecord_emp_five');
	var check6 = nlapiGetFieldValue('custrecordcustrecord_emp_six');
	var check7 = nlapiGetFieldValue('custrecordcustrecord_emp_seven');
	var check8 = nlapiGetFieldValue('custrecordcustrecord_emp_eight');
	var check9 = nlapiGetFieldValue('custrecordcustrecord_emp_nine');
	
	if(check1 == 'F' && check2 == 'F' && check3 == 'F' && check4 == 'F' && check5 == 'F' && check6 == 'F' && check7 == 'F' && check8 == 'F'){
		alert('请选择至少一项离职原因');
		return false;
	}else if(check8 == 'T' && check9 == ''){
		alert('请填写其他离职原因');
		return false;
	}else{
		return true;
	}
	
}

function fieldChanged(){
	
	if(nlapiGetFieldValue('custrecordcustrecord_emp_eight') == 'T'){
		nlapiDisableField('custrecordcustrecord_emp_nine',false);
	}else{
		nlapiDisableField('custrecordcustrecord_emp_nine',true);
	}
		
}



//当审核界面点击同意按钮时打开新网页
function agreeButton(){
	
//    var objbutton = document.getElementById('custpageworkflow182');
//    
//    bojbutton.onclick = function(){
//    	
//    	window.open('www.baidu.com');
        alert('123'); 	
//        $('#custpageworkflow188').hide();
//    	$('#custpageworkflow188').on('click',function(){
//    		window.open('www.baidu.com');
//    	});
    
    
}

function showButton( ) {
	$('#custpageworkflow188').show();
	return true;
}

