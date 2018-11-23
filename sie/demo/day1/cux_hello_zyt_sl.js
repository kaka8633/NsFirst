/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Aug 2018     zyt 培训demo1
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response){
	
	
	var context = nlapiGetContext();
	var account = context.getCompany();
	var applictionId = context.getDeploymentId();
	var environment = context.getEnvironment();
	var executionContext = context.getExecutionContext();
	response.writeLine('applictionId='+applictionId);
	response.writeLine('account='+account);
	response.writeLine('environment='+environment);
	response.writeLine('executionContext='+executionContext);
}
