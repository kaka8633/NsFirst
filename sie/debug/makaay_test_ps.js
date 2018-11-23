/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       12 Sep 2018     makaay
 *
 */

/**
 * @param {nlobjPortlet} portletObj Current portlet object
 * @param {Number} column Column position index: 1 = left, 2 = middle, 3 = right
 * @returns {Void}
 */
function portletName(portletObj, column) {
	portletObj.setTitle('Makaay_test_funnel');
	//test
	var res = getOpportunityData('203','37','2018-9-14','2018-9-20');
	nlapiLogExecution('error','res',JSON.stringify(res));
	return;
	var filters = new Array();
	filters[0] = new nlobjSearchFilter('custbody_contract_status',null, 'greaterthan',0);
	var resultId = nlapiSearchRecord('opportunity', null, null, null);
	nlapiLogExecution('error','id_result2',JSON.stringify(resultId));
	var data = getDataByContract(resultId);
	nlapiLogExecution('error','amount_result',JSON.stringify(data));
	return;
	
	
//	portletObj.setTitle('Makaay_test_funnel');
//	portletObj.setScript('customscript_test_makaay_cs');
//	var funnel = portlet.addField('custpage_funnel','inlinehtml');
//	funnel.setDefaultValue("<div id='main' style='height: 650px; width: 900px'></div>");
//	 portlet.setHtml(myHtml);
	
}

/**
 *鑾峰彇绗﹀悎鏉′欢鐨勫晢鏈篿d
 *
 *@param bu BU閮ㄩ棬 [鍙�塢
 *@param sales 閿�鍞汉鍛� [鍙�塢
 *@param dateStart 寮�濮嬫棩鏈� 
 *@param dateEnd 缁撴潫鏃ユ湡
 */
function getOpportunityData(bu,sales,dateStart,dateEnd){
	var filters = new Array();
	//BU鏉′欢
	if(bu != ''){
		filters.push(
			new nlobjSearchFilter('department',null,'is',bu)
		);
	}
	//閿�鍞汉鍛樻潯浠�
	if(sales != ''){
		filters.push(
			new nlobjSearchFilter('custbody_emp',null,'is',sales)
		);
	}
	//鏃ユ湡鏉′欢
	if(dateStart == dateEnd){//鏌愪竴澶�
		filters.push(
			new nlobjSearchFilter('trandate',null,'on',dateStart)
		);
//		nlapiLogExecution('error','filters',JSON.stringify(filters));
	}else{
		filters.push(
			new nlobjSearchFilter('trandate',null, 'within',dateStart,dateEnd)
		);
	}
	//鎵ц鎼滅储锛屾壘鍑烘墍鏈夌鍚堟潯浠剁殑鍟嗘満id
	var opId = nlapiSearchRecord('opportunity', null,filters, null);
//	nlapiLogExecution('error', 'opId', JSON.stringify(opId));
	
	//鏍规嵁鍚堢害闃舵缁勮鍟嗘満鐨勯噾棰濇暟鎹�
	return getDataByContract(opId);
}

/**
 *鎸夌収鍚堢害闃舵鏌ユ壘缁勮鍟嗘満閲戦鏁版嵁
 *@param {array} opId 鍟嗘満Id
 *			鍏ュ弬鏍煎紡绀轰緥:[{"id":"262"},{"id":"263"},{"id":"264"}]
 *
 */
function getDataByContract(opId){
	//鍒濆鍖栧悎绾﹂樁娈甸噾棰濆��
	var amount_notice  = 0;//涓爣閫氱煡涔﹂樁娈甸噾棰�,id = 1
	var amount_draft   = 0;//鍚堢害璧锋嫙闃舵閲戦,id = 2
	var amount_frame   = 0;//鍚堢害妗嗘灦纭畾闃舵閲戦,id = 3
	var amount_confirm = 0;//鍚堢害瀹℃壒闃舵閲戦,id = 4
	var amount_receive = 0;//鍚堢害鏀跺埌闃舵閲戦,id = 5
	//鍒濆鍖栵紝鍟嗘満闃舵閲戦鍊�
	var amount_potential = 0;//娼滃湪鍟嗘満,id = 11
	var amount_qualified = 0;//鍚堟牸鍟嗘満,id = 14
	var amount_support = 0;//鍚堟牸鐨勬敮鎸佽��,id = 12
	var amount_decision = 0;//鍚堟牸鐨勫喅绛栬��,id = 10
	var amount_pass = 0;//鍐崇瓥瀹氭,id = 17
	var amount_negotiation = 0;//鍟嗗姟璋堝垽,id =
	var amount_win = 0;//璧㈠崟,id = 13
	var amount_sign = 0;//鍚堢害绛剧讲,id = 15
	
	var len = opId.length;
	for(var i=0;i<len;i++){
		var record = nlapiLoadRecord('opportunity',opId[i]['id']);
		var lineCount = record.getLineItemCount('estimates');
		var dumpAmount = record.getLineItemValue('estimates','total',lineCount);//鍚堢害閲戦
		var stageId = record.getFieldValue('custbody_contract_status');//鍚堢害闃舵id
		var createPer = record.getFieldValue('custbody_emp');
		//渚濇嵁鍚堢害闃舵锛屾洿鏂板搴旈樁娈甸噾棰濆��
		switch(stageId){
			case '1':
				amount_notice = amount_notice + parseFloat(dumpAmount);
				break;
			case '2':
				amount_draft = amount_draft + parseFloat(dumpAmount);
				break;
			case '3':
				amount_frame = amount_frame + parseFloat(dumpAmount);
				break;
			case '4':
				amount_confirm = amount_confirm + parseFloat(dumpAmount);
				break;
			case '5':
				amount_receive = amount_receive + parseFloat(dumpAmount);
				break;
		}
	}
	var returnData =[
	    {value:amount_notice ,name:'涓爣閫氱煡涔﹂樁娈�'},
	    {value:amount_draft  ,name:'鍚堢害璧锋嫙闃舵'},
	    {value:amount_frame  ,name:'鍚堢害妗嗘灦纭畾闃舵'},
	    {value:amount_confirm,name:'鍚堢害瀹℃壒闃舵'},
	    {value:amount_receive,name:'鍚堢害鏀跺埌闃舵'}
	];
	return returnData;
}
