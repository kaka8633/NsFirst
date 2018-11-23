/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       14 Nov 2018     Administrator
 *
 */

/**
 * @param {nlobjRequest}
 *            request Request object
 * @param {nlobjResponse}
 *            response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response) {
	testReport2(request, response);
}

function getExcel() {
	var xmlString = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>';
	xmlString += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" ';
	xmlString += 'xmlns:o="urn:schemas-microsoft-com:office:office" ';
	xmlString += 'xmlns:x="urn:schemas-microsoft-com:office:excel" ';
	xmlString += 'xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" ';
	xmlString += 'xmlns:html="http://www.w3.org/TR/REC-html40">';
	xmlString += '<Worksheet ss:Name="Sheet1">';
	xmlString += '<Table>' + '<Row>'
			+ '<Cell><Data ss:Type="String"> First Header </Data></Cell>'
			+ '<Cell><Data ss:Type="String"> Second Header </Data></Cell>'
			+ '<Cell><Data ss:Type="String"> Third Header </Data></Cell>'
			+ '<Cell><Data ss:Type="String"> Fourth Header </Data></Cell>'
			+ '<Cell><Data ss:Type="String"> Fifth Header </Data></Cell>'
			+ '</Row>';

	xmlString += '<Row>'
			+ '<Cell><Data ss:Type="String">Row 1 Column 1</Data></Cell>'
			+ '<Cell><Data ss:Type="String">Row 1 Column 2</Data></Cell>'
			+ '<Cell><Data ss:Type="String">Row 1 Column 3</Data></Cell>'
			+ '<Cell><Data ss:Type="String">Row 1 Column 4</Data></Cell>'
			+ '<Cell><Data ss:Type="String">Row 1 Column 5</Data></Cell>'
			+ '</Row>';

	xmlString += '<Row>'
			+ '<Cell><Data ss:Type="String">Row 2 Column 1</Data></Cell>'
			+ '<Cell><Data ss:Type="String">Row 2 Column 2</Data></Cell>'
			+ '<Cell><Data ss:Type="String">Row 2 Column 3</Data></Cell>'
			+ '<Cell><Data ss:Type="String">Row 2 Column 4</Data></Cell>'
			+ '<Cell><Data ss:Type="String">Row 2 Column 5</Data></Cell>'
			+ '</Row>';

	xmlString += '</Table></Worksheet></Workbook>';

	// create file
	var xlsFile = nlapiCreateFile('TEST_huyuming.xls', 'EXCEL', nlapiEncrypt(
			xmlString, 'base64'));

	xlsFile.setFolder(221);

	// save file
	var fileID = nlapiSubmitFile(xlsFile);
}

function getExcel1() {
	var xmlString = '<?xml version="1.0"?>';
	xmlString += '<?mso-application progid="Excel.Sheet"?>';
	xmlString += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"';
	xmlString += ' xmlns:o="urn:schemas-microsoft-com:office:office"';
	xmlString += ' xmlns:x="urn:schemas-microsoft-com:office:excel"';
	xmlString += ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"';
	xmlString += ' xmlns:html="http://www.w3.org/TR/REC-html40">';
	xmlString += ' <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">';
	xmlString += '  <Created>2006-09-16T00:00:00Z</Created>';
	xmlString += '  <LastSaved>2018-10-12T11:38:42Z</LastSaved>';
	xmlString += '  <Version>15.00</Version>';
	xmlString += ' </DocumentProperties>';
	xmlString += ' <OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">';
	xmlString += '  <AllowPNG/>';
	xmlString += '  <RemovePersonalInformation/>';
	xmlString += ' </OfficeDocumentSettings>';
	xmlString += ' <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">';
	xmlString += '  <WindowHeight>8010</WindowHeight>';
	xmlString += '  <WindowWidth>14805</WindowWidth>';
	xmlString += '  <WindowTopX>240</WindowTopX>';
	xmlString += '  <WindowTopY>105</WindowTopY>';
	xmlString += '  <ProtectStructure>False</ProtectStructure>';
	xmlString += '  <ProtectWindows>False</ProtectWindows>';
	xmlString += ' </ExcelWorkbook>';
	xmlString += ' <Styles>';
	xmlString += '  <Style ss:ID="Default" ss:Name="Normal">';
	xmlString += '   <Alignment ss:Vertical="Bottom"/>';
	xmlString += '   <Borders/>';
	xmlString += '   <Font ss:FontName="宋体" x:CharSet="134" ss:Size="11" ss:Color="#000000"/>';
	xmlString += '   <Interior/>';
	xmlString += '   <NumberFormat/>';
	xmlString += '   <Protection/>';
	xmlString += '  </Style>';
	xmlString += '  <Style ss:ID="s16">';
	xmlString += '   <Borders>';
	xmlString += '    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '   </Borders>';
	xmlString += '  </Style>';
	xmlString += '  <Style ss:ID="s17">';
	xmlString += '   <Borders>';
	xmlString += '    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '   </Borders>';
	xmlString += '   <NumberFormat ss:Format="Short Date"/>';
	xmlString += '  </Style>';
	xmlString += '  <Style ss:ID="s18">';
	xmlString += '   <Alignment ss:Vertical="Bottom" ss:WrapText="1"/>';
	xmlString += '   <Borders>';
	xmlString += '    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '   </Borders>';
	xmlString += '  </Style>';
	xmlString += '  <Style ss:ID="s19">';
	xmlString += '   <Borders>';
	xmlString += '    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '   </Borders>';
	xmlString += '   <Interior ss:Color="#92D050" ss:Pattern="Solid"/>';
	xmlString += '  </Style>';
	xmlString += '  <Style ss:ID="s20">';
	xmlString += '   <Borders>';
	xmlString += '    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '   </Borders>';
	xmlString += '   <Interior/>';
	xmlString += '  </Style>';
	xmlString += '  <Style ss:ID="s21">';
	xmlString += '   <Borders>';
	xmlString += '    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '   </Borders>';
	xmlString += '   <Interior ss:Color="#FF0000" ss:Pattern="Solid"/>';
	xmlString += '  </Style>';
	xmlString += '  <Style ss:ID="s22">';
	xmlString += '   <Borders>';
	xmlString += '    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '   </Borders>';
	xmlString += '   <Interior ss:Color="#FF0000" ss:Pattern="Solid"/>';
	xmlString += '   <NumberFormat ss:Format="Short Date"/>';
	xmlString += '  </Style>';
	xmlString += '  <Style ss:ID="s23">';
	xmlString += '   <Alignment ss:Vertical="Bottom" ss:WrapText="1"/>';
	xmlString += '   <Borders>';
	xmlString += '    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>';
	xmlString += '   </Borders>';
	xmlString += '   <Interior ss:Color="#FF0000" ss:Pattern="Solid"/>';
	xmlString += '  </Style>';
	xmlString += ' </Styles>';
	xmlString += ' <Worksheet ss:Name="Sheet1">';
	xmlString += '  <Table ss:ExpandedColumnCount="11" ss:ExpandedRowCount="26" x:FullColumns="1"';
	xmlString += '   x:FullRows="1" ss:DefaultColumnWidth="54" ss:DefaultRowHeight="13.5">';
	xmlString += '   <Column ss:Index="2" ss:AutoFitWidth="0" ss:Width="219.75"/>';
	xmlString += '   <Column ss:AutoFitWidth="0" ss:Width="87.75"/>';
	xmlString += '   <Column ss:AutoFitWidth="0" ss:Width="78.75" ss:Span="1"/>';
	xmlString += '   <Column ss:Index="6" ss:AutoFitWidth="0" ss:Width="84"/>';
	xmlString += '   <Column ss:Index="10" ss:AutoFitWidth="0" ss:Width="165.75"/>';
	xmlString += '   <Column ss:AutoFitWidth="0" ss:Width="81.75"/>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s19"><Data ss:Type="String">序号</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s19"><Data ss:Type="String">功能名称</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s19"><Data ss:Type="String">责任人</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s19"><Data ss:Type="String">功能顾问</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s19"><Data ss:Type="String">开始时间</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s19"><Data ss:Type="String">开发交付时间</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s19"><Data ss:Type="String">状态</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s19"><Data ss:Type="String">是否交付</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s19"><Data ss:Type="String">Bug修复</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s19"><Data ss:Type="String">备注</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s19"><Data ss:Type="String">修改后交付时间</Data></Cell>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">1</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">销售漏斗</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">客户开发人员</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">张世辉</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-08T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发完成</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">是</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">2</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">个人仪表盘（赢单到现金一览图）</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">客户开发人员</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">吴颖</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-20T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发中</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">3</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">资源分配</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">张依婷</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-20T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发中</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">4</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">商机区域省份城市管理</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">张依婷</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">张世辉</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-09T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发完成</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">是</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">5</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">费用报告审批流</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">张依婷</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">王岩</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-09T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发完成</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">是</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row ss:Height="67.5">';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">6</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s21"><Data ss:Type="String">员工借款&amp;还款功能</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s21"><Data ss:Type="String">张依婷</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s21"><Data ss:Type="String">王岩</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s21"/>';
	xmlString += '    <Cell ss:StyleID="s22"><Data ss:Type="DateTime">2018-09-30T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s21"><Data ss:Type="String">开发完成</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s21"/>';
	xmlString += '    <Cell ss:StyleID="s21"/>';
	xmlString += '    <Cell ss:StyleID="s23"><Data ss:Type="String">存在bug，已提交SR&#10;代码创建支票时，如果该用户为第一次创建，则报未知错误，如果该用户下已有支票，则创建成功</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">7</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s20"><Data ss:Type="String">项目计划排程页面编辑</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">张依婷</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">吴颖</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-09-30T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发完成</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">是</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">8</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">采购订单页面优化（员工带出部门、公司）</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">张依婷</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">吴颖</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-09-30T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发完成</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">是</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">9</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">项目资源能力信息</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">张依婷</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">吴颖</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-09T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发完成</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">是</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">10</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">联系人商机关联</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">张依婷</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">张世辉</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-09T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发完成</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">是</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">11</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">支付文件-费用报销</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">臧学普</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">王岩</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-09T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发完成</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">是</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row ss:Height="27">';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">12</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">支付文件-工资</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">臧学普</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">王岩</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-10T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发完成</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">是</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s18"><Data ss:Type="String">因文档部分内容不够清晰，开发改动较多，修改测试问题</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-15T00:00:00.000</Data></Cell>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">13</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">项目财务信息统计汇总</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">臧学普</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">吴颖</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-17T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发中</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">14</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s20"><Data ss:Type="String">竞争对手与商机关联</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">臧学普</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">张世辉</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-20T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">未开始</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">15</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">销售行含税价格</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">胡育铭</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">张世辉</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-09-30T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发完成</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">是</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">16</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">商机变现提醒</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">胡育铭</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">张世辉</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-10T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发完成</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">是</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">17</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">项目进度条</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">胡育铭</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">吴颖</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-09-30T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发完成</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">是</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">18</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">员工薪酬明细表单</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">胡育铭</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">王岩</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-08T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发完成</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">是</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">19</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">项目红绿灯</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">胡育铭</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">吴颖</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-14T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">未开始</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">20</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">合约变现提醒</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">胡育铭</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">张世辉</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-11T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发完成</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">是</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">21</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">项目挣值图、关键比率、红绿灯</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">胡育铭，杨浩然</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">吴颖</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-20T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发中</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row ss:Height="27">';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">22</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">员工离职申请功能</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">杨浩然</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">许大建</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-14T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">开发中</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s18"><Data ss:Type="String">10/12还有部分内容在确认，调&#10;整开发</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">财务-锁定表单</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">杨浩然</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">陈达闵</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"><Data ss:Type="DateTime">2018-10-16T00:00:00.000</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">未开始</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">23</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">地址表格自定义</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"/>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">未确认</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '   <Row>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="Number">24</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">商机立项</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s17"/>';
	xmlString += '    <Cell ss:StyleID="s16"><Data ss:Type="String">取消</Data></Cell>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '    <Cell ss:StyleID="s16"/>';
	xmlString += '   </Row>';
	xmlString += '  </Table>';
	xmlString += '  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">';
	xmlString += '   <PageSetup>';
	xmlString += '    <Header x:Margin="0.3"/>';
	xmlString += '    <Footer x:Margin="0.3"/>';
	xmlString += '    <PageMargins x:Bottom="0.75" x:Left="0.7" x:Right="0.7" x:Top="0.75"/>';
	xmlString += '   </PageSetup>';
	xmlString += '   <Print>';
	xmlString += '    <ValidPrinterInfo/>';
	xmlString += '    <PaperSizeIndex>9</PaperSizeIndex>';
	xmlString += '    <HorizontalResolution>600</HorizontalResolution>';
	xmlString += '    <VerticalResolution>600</VerticalResolution>';
	xmlString += '   </Print>';
	xmlString += '   <Selected/>';
	xmlString += '   <LeftColumnVisible>1</LeftColumnVisible>';
	xmlString += '   <Panes>';
	xmlString += '    <Pane>';
	xmlString += '     <Number>3</Number>';
	xmlString += '     <ActiveRow>20</ActiveRow>';
	xmlString += '     <ActiveCol>1</ActiveCol>';
	xmlString += '    </Pane>';
	xmlString += '   </Panes>';
	xmlString += '   <ProtectObjects>False</ProtectObjects>';
	xmlString += '   <ProtectScenarios>False</ProtectScenarios>';
	xmlString += '  </WorksheetOptions>';
	xmlString += ' </Worksheet>';
	xmlString += '</Workbook>';

	// create file
	var xlsFile = nlapiCreateFile('TEST_huyuming.xls', 'EXCEL', nlapiEncrypt(
			xmlString, 'base64'));

	xlsFile.setFolder(221);

	// save file
	var fileID = nlapiSubmitFile(xlsFile);
}

function runOpportunitiesPivot(request, response) {
	// Instantiate a report definition to work with
	var reportDefinition = nlapiCreateReportDefinition();

	// Define the rows/column hierarchy and the actual column data
	var customer = reportDefinition.addRowHierarchy('entity', 'Customer',
			'TEXT');
	var salesrep = reportDefinition.addColumn('salesrep', false, 'Sales Rep',
			null, 'TEXT', null);
	var entstat = reportDefinition.addColumnHierarchy('entitystatus',
			'Opportunity Status', null, 'TEXT');
	var total = reportDefinition.addColumn('projectedtotal', true,
			'Projected Total', entstat, 'CURRENCY', null);
	var prob = reportDefinition.addColumn('probability', false,
			'Probability %', entstat, 'PERCENT', null);

	// Create the search to feed the report
	var columns = new Array();
	columns[0] = new nlobjSearchColumn('internalID', null, 'group');
	columns[1] = new nlobjSearchColumn('entity', null, 'group');
	columns[2] = new nlobjSearchColumn('salesrep', null, 'group');
	columns[3] = new nlobjSearchColumn('expectedclosedate', null, 'group');
	columns[4] = new nlobjSearchColumn('entitystatus', null, 'group');
	columns[5] = new nlobjSearchColumn('projectedtotal', null, 'sum');
	columns[6] = new nlobjSearchColumn('probability', null, 'group');

	// Add search to the report and map the search columns to the reports
	// columns
	var filters = new Array();
	filters[0] = new nlobjSearchFilter('projectedtotal', null, 'greaterthan',
			2000);
	reportDefinition.addSearchDataSource('opportunity', null, filters, columns,
			{
				'internalID' : columns[0],
				'entity' : columns[1],
				'salesrep' : columns[2],
				'expectedclosedate' : columns[3],
				'entitystatus' : columns[4],
				'projectedtotal' : columns[5],
				'probability' : columns[6]
			});

	// Create a form to build the report on
	var form = nlapiCreateReportForm('Pivot Report Suitelet: Opportunities');

	// Build the form from the report definition
	var pvtTable = reportDefinition.executeReport(form);

	// Write the form to the browser
	response.writePage(form);
}

function testReport1(request, response) {

	var reportDefinition = nlapiCreateReportDefinition();

	// Create a form to put the report on
	
	/*var json = [];
	var obj1 = {};
	var obj2 = {};
	obj1.id = 1;
	obj1.number = '1121';
	obj1.name = 'huyuming';
	
	obj2.id = 2;
	obj2.number = '3345';
	obj2.name = 'huxinqi';
	
	json.push(obj1);
	json.push(obj2);*/
	
	/*var id = reportDefinition.addColumn('id', false, 'Sales Rep',
			null, 'TEXT', null);
	var number = reportDefinition.addColumn('number', false, 'Sales Rep',
			null, 'TEXT', null);
	var name = reportDefinition.addColumn('name', false, 'Sales Rep',
			null, 'TEXT', null);*/
	
	/*var columns = new Array();
	columns[0] = new nlobjSearchColumn('id');
	columns[1] = new nlobjSearchColumn('number');
	columns[2] = new nlobjSearchColumn('name');
	
	reportDefinition.addJSONDataSource(json, {
		'id' : columns[0],
		'number' : columns[1],
		'name' : columns[2]
	});*/
	
	var json = [];
	var obj1 = {};
	obj1.salesrep = 'huyuming';
	json.push(obj1);
	
	/*var customer = reportDefinition.addRowHierarchy('entity', 'Customer',
	'TEXT');*/

var salesrep = reportDefinition.addColumn('salesrep', false, 'Sales Rep',
	null, 'TEXT', null);
/*var entstat = reportDefinition.addColumnHierarchy('entitystatus',
	'Opportunity Status', null, 'TEXT');
var total = reportDefinition.addColumn('projectedtotal', true,
	'Projected Total', entstat, 'CURRENCY', null);
var prob = reportDefinition.addColumn('probability', false,
	'Probability %', entstat, 'PERCENT', null);*/

// Create the search to feed the report
var columns = new Array();
/*columns[0] = new nlobjSearchColumn('internalID', null, 'group');
columns[1] = new nlobjSearchColumn('entity', null, 'group');*/
columns[0] = new nlobjSearchColumn('salesrep', null, 'group');
/*columns[3] = new nlobjSearchColumn('expectedclosedate', null, 'group');
columns[4] = new nlobjSearchColumn('entitystatus', null, 'group');
columns[5] = new nlobjSearchColumn('projectedtotal', null, 'sum');
columns[6] = new nlobjSearchColumn('probability', null, 'group');*/

// Add search to the report and map the search columns to the reports
// columns
var filters = new Array();
filters[0] = new nlobjSearchFilter('projectedtotal', null, 'greaterthan',
	2000);

reportDefinition.addJSONDataSource([{"salesrep":"huyuming"}],
	{
		'salesrep' : columns[0]
	});
	
    
	var myForm = nlapiCreateReportForm('胡育铭测试报表');

	// Build the form from the report definition
	var myReportForm = reportDefinition.executeReport(myForm);

	// Write the form back to the browser
	response.writePage(myForm);
}


function testReport2(request, response) {
	// Instantiate a report definition to work with
	var reportDefinition = nlapiCreateReportDefinition();

	// Define the rows/column hierarchy and the actual column data
	var salesrep = reportDefinition.addColumn('salesrep', false, 'Sales Rep',
			null, 'TEXT', null);

	// Create the search to feed the report
	var columns = new Array();
	columns[0] = new nlobjSearchColumn('salesrep', null, 'group');

	// Add search to the report and map the search columns to the reports
	// columns
	var filters = new Array();
	filters[0] = new nlobjSearchFilter('projectedtotal', null, 'greaterthan',
			2000);
	reportDefinition.addSearchDataSource('opportunity', null, filters, columns,
			{
				'salesrep' : columns[0]
			});

	// Create a form to build the report on
	var form = nlapiCreateReportForm('Pivot Report Suitelet: Opportunities');

	// Build the form from the report definition
	var pvtTable = reportDefinition.executeReport(form);
	// Write the form to the browser
	response.writePage(form);
}