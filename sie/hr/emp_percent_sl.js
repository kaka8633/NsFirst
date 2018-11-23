/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       25 Oct 2018     zangxuepu
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response){
	
	if (request.getMethod() == 'GET') {
		var action = request.getParameter('action');
		if (action == null) {
			//创建表单
			var form = nlapiCreateForm('摊销百分比');
			
			form.setScript('customscript_emp_percent_cs');
			//创建tab
			form.addTab('custpage_emp_percent_tab', '摊销百分比');
			
		
			//创建子列表
			var sublist = form.addSubList('custpage_emp_percent_sublist', 'list', '列表', 'custpage_emp_percent_tab');
			
			//创建显示的字段
			sublist.addField('custpage_department', 'text','部门');
			sublist.addField('custpage_emp_amount','text','部门人员数');
			sublist.addField('custpage_emp_percent', 'percent', '摊销百分比数');
			
			var filters = [];
			filters.push(new nlobjSearchFilter('subsidiary', null, 'is', getConfigValue('CUX_DEFAULT_COMPANY')));
			var columns = [];
			columns[0] = new nlobjSearchColumn('entityid', null, 'count');
			//获取总人员数
			var empSearch = nlapiCreateSearch('employee', filters, columns);
			var empResultSet = empSearch.runSearch();
			var amountResult = empResultSet.getResults(0, 1);
			var empAmount = amountResult[0].getValue(columns[0]);
		
			//获取分组数据
			var departmentGroupSearch = nlapiLoadSearch(null, 'customsearch_emp_department_group');
			var resultSet = departmentGroupSearch.runSearch();
			//已保存搜索中，第一个字段是部门，第二个是部门人数
			var departmentColumns = departmentGroupSearch.getColumns();
			//子列表从1开始
			var index = 1;
			//遍历结果从0开始
			var startIndex = 0;
			//倒挤数据 合计为100%
			var lastPercentAdd = 0;
			var lastPercent = 0;
			var totalPercent = 0;
			//excel文件json
			var json = [];
			do {
				var result = resultSet.getResults(startIndex, startIndex+1000);
				for (var i = 0; i < result.length; i++) {
					//json中对象
					var obj = {};
					
					var department = result[i].getText(departmentColumns[0]);
					var departmentEmpAmount = result[i].getValue(departmentColumns[1]);
					var empPercent =(parseInt(departmentEmpAmount) / parseFloat(empAmount)) * 100;
					
					totalPercent += parseFloat(empPercent.toFixed(2));
					//obj 增加属性，并添加到json
					obj.department = department;
					obj.departmentEmpAmount = departmentEmpAmount;
					obj.empPercent = empPercent.toFixed(2);
					json.push(obj);
					//子列表赋值
					sublist.setLineItemValue('custpage_department', index, department);
					sublist.setLineItemValue('custpage_emp_amount', index, departmentEmpAmount);
					sublist.setLineItemValue('custpage_emp_percent', index, empPercent.toFixed(2));
					
					//保存最后一个百分数
					lastPercent = parseFloat(empPercent.toFixed(2));
					index++;
					
				}
				startIndex += 1000;
			} while (result != null && result.length > 0);
			
			//倒挤百分数 重制最后一个对象的百分比
			lastPercentAdd = 100 - totalPercent;
			lastPercent += lastPercentAdd;
			sublist.setLineItemValue('custpage_emp_percent', index-1, lastPercent.toFixed(2));
			
			//重置json中最后一个对像
			var oldObj = json.pop();
			oldObj.empPercent = lastPercent.toFixed(2);
			json.push(oldObj);
			//设置子列表最后一列
			sublist.setLineItemValue('custpage_department', index, '总计');
			sublist.setLineItemValue('custpage_emp_amount', index, empAmount);
			sublist.setLineItemValue('custpage_emp_percent', index, '100');
			//json 设置最后一个对象
			var lastObj = {department:'总计',departmentEmpAmount : empAmount, empPercent : '100'};
			json.push(lastObj);
			
			var fileObj = jsonToFile(json);
			//下载按钮
			form.addButton('custpage', '下载', "download('"+fileObj.fileURL+"|"+fileObj.fileId+"')");
			response.writePage(form);
		}else if(action == 'delete'){
			var fileId = request.getParameter('fileId');
			nlapiDeleteFile(parseInt(fileId));
		}
	}
		
}


//生产文件格式
function jsonToFile(json) {
	var xmlStr = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>';
	xmlStr += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" ';
	xmlStr += 'xmlns:o="urn:schemas-microsoft-com:office:office" ';
	xmlStr += 'xmlns:x="urn:schemas-microsoft-com:office:excel" ';
	xmlStr += 'xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" ';
	xmlStr += 'xmlns:html="http://www.w3.org/TR/REC-html40">';
	xmlStr += '<Styles>'
			+ '<Style ss:ID="s63">'
			+ '<Font x:CharSet="204" ss:Size="12" ss:Color="#000000" ss:Bold="1" ss:Underline="Single"/>'
			+ '</Style>' + '</Styles>';

	xmlStr += '<Worksheet ss:Name="Sheet1">';
	xmlStr += '<Table>' + '<Row>'
			+ '<Cell><Data ss:Type="String"> 部门 </Data></Cell>'// ss:StyleID="s63"
			+ '<Cell><Data ss:Type="String"> 部门人员数 </Data></Cell>'
			+ '<Cell><Data ss:Type="String">摊销百分比</Data></Cell>'
			+ '</Row>';

	for (var i = 0; i < json.length; i++) {
		xmlStr += '<Row>' 
			+ '<Cell><Data ss:Type="String">'+ json[i]['department']+ '</Data></Cell>'
			+ '<Cell><Data ss:Type="String">'+ json[i]['departmentEmpAmount'] + '</Data></Cell>'
			+ '<Cell><Data ss:Type="String">'+ json[i]['empPercent']+ '%' + '</Data></Cell>'
			+'</Row>';
	}

	xmlStr += '</Table></Worksheet></Workbook>';

	var file = nlapiCreateFile('分摊百分比.xls', 'EXCEL', nlapiEncrypt(xmlStr,'base64'));
	// 用配置
	file.setFolder(getConfigValue('TEMP_FOLDER'));
	var fileId = nlapiSubmitFile(file);
	var newFile = nlapiLoadFile(fileId);
	var fileURL = newFile.getURL();
	var obj = {
		'fileId' : fileId,
		'fileURL' : fileURL
	};
	return obj;

}
