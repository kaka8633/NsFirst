/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       12 Sep 2018     Bman
 *
 */

/**
 * @param {nlobjRequest}
 *            request Request object
 * @param {nlobjResponse}
 *            response Response object
 * @returns {Void} Any output is written via response object
 */
function demoForm(request, response) {

	if (request.getMethod() == 'GET') {
		var form = nlapiCreateForm('薪资明细表单');
		var field = form.addField('textfield', 'text', 'Text');
	//	field.setLayoutType('normal', 'startcol');
		form.addField('datefileld', 'date', 'Date');
		form.addField('currencyfield', 'currency', 'Currency');
		form.addField('textareafield', 'textarea', 'Textarea');

		var select = form.addField('selectfield', 'select', 'Select');
		select.addSelectOption('', '');
		select.addSelectOption('a', 'Albert');
		select.addSelectOption('b', 'Baron');
		select.addSelectOption('c', 'Chris');
		select.addSelectOption('d', 'Drake');
		select.addSelectOption('e', 'Edgar');

		var sublist = form.addSubList('sublist', 'inlineeditor',
				'Inline Editor Sublist');
		sublist.addField('sublist1', 'date', 'Date');
		sublist.addField('sublist2', 'text', 'Text');
		sublist.addField('sublist3', 'currency', 'Currency');
		sublist.addField('sublist4', 'textarea', 'Large Text');
		sublist.addField('sublist5', 'float', 'Float');
		
		
		var script = "alert('Hello World')";
		var params = request.getAllParameters();
		//var script1 = ""
		form.addButton('searchbutton','Search',script);
		form.addButton('delbutton','DeleteAll',script);
		//form.addButton('downloadfile','下载附件',script1);
		
		//var f = nlapiLoadFile('SuiteScripts/SieForster/sie/debug/zxp_salary_sl.js')
		//nlapiAttachRecord('file',7646,)
		
		//response.write(f);
		form.addPageLink('crosslink','下载附件','https://system.netsuite.com/core/media/media.nl?id=8148&c=5045270_SB1&h=974837663ff34c8cf327&id=8148&_xt=.csv&_xd=T&e=T');
		response.writePage(form);

	} else {
		dumpResponse(request,response);
	}

}
