/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Sep 2018     Administrator
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response){
	var action = request.getParameter('action');
	var data = undefined;
//	var json = new Array();
	if(action && action === 'getDepartment'){
		data = new nlapiSearchRecord('Department',null,null,null);
		for(var i = 0; i < data.length; i ++){
			var id = data[i]['id'];
			nlapiLogExecution('ERROR', 'xxx', id);
			json = nlapiLoadRecord(id).getFieldValue('name');
//			json.push({
//				id : id,
//				text : nlapiLoadRecord(id).getFieldValue('name')
//			});
//		}
	}
	
	if(action && action === 'getEmployee'){
		var searchCloumn = new Array();
		searchCloumn[0]  = new nlobjSearchColumn('firstname');
	}
	
	if(action && action === 'getFunnelData'){
		
	}
	
	response.write(JSON.stringify(json));
}


function getDepartment(){
	
}

function getEmployee(){
	
}