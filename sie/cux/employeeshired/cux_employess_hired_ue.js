/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       16 Oct 2018     Administrator
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
function userEventBeforeLoad(type, form, request){

	formInit(type,form);
}

function formInit(type,form){
	var all = [0,1,2,3];
	
	if(type == 'view'){
	
        var approver = nlapiGetFieldValue('custrecord_custpage_status');
        var emp = nlapiGetFieldText('custrecord_custpage_approval');
		var department = nlapiGetFieldValue('custrecord_custpage_emp_department');
        var recordId = nlapiGetFieldValue('custrecord_record_id');
		if(approver > 0 && approver < 4){

            var button = form.getButton('edit');
            
			button.setVisible(false);
			form.setScript('customscript_cux_employees_hired');
			form.addButton('custpage_role','审批通过','role('+ approver+','+ department +','+ recordId +')');
            form.addButton('custpage_role','审批拒绝','refused('+approver+','+ department +')');
            
            if(approver == 3){//存入系统表
                // saveToEmployee(recordId);
            }

		}else if(all.indexOf(approver) < 0){
			
			var button = form.getButton('edit');
			button.setVisible(false);
			
		}
	};
}
/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit
 *                      approve, reject, cancel (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF)
 *                      markcomplete (Call, Task)
 *                      reassign (Case)
 *                      editforecast (Opp, Estimate)
 * @returns {Void}
 */
function userEventBeforeSubmit(type){
    nlapiLogExecution('error','type2',type)
    if(type == 'create'){
        nlapiSetFieldValue('custrecord_custpage_status',1);
    }
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */
function userEventAfterSubmit(type){
	if(type == 'create'){
        var backId = nlapiGetRecordId();//保存数据返回internalId
        var tempRecord = nlapiLoadRecord('customrecord_emp_entry_info',backId);
        tempRecord.setFieldValue('custrecord_record_id',backId);
        nlapiSubmitRecord(tempRecord);//记录以保存的记录id
	}
}

/**
 * 员工入职数据存入系统数据库
 * 2018-10-31
 * @author Makaay
 * @param recordId 员工入职记录id
 * 
*/
function saveToEmployee(recordId){
    if(!recordId){
        nlapiLogExecution('error','saveToEmployee_error','param error');
        return false;
    }
    nlapiLogExecution('error','jsStatus','bofore is ok2');//debug
    var mainData = nlapiLoadRecord('customrecord_emp_entry_info',recordId);//获取员工信息主表
    var debugData = mainData.getFieldValue('custrecord_custpage_emp_career_path');
    nlapiLogExecution('error','职业通道',debugData);//debug
    //劳动合同数据
    var contractFilters = new Array();
        contractFilters.push(new nlobjSearchFilter('custrecord_custpage_emp_labor_link',null,'anyof',recordId));
    var contractColumns = new Array();
        contractColumns.push(new nlobjSearchColumn('custrecord_custpage_emp_labor_num'));//签订次数
        contractColumns.push(new nlobjSearchColumn('custrecord_custpage_emp_labor_strat_time'));//date start
        contractColumns.push(new nlobjSearchColumn('custrecord_custpage_emp_labor_end_time'));//date end
        contractColumns.push(new nlobjSearchColumn('custrecord_custpage_emp_labor_link'));// pid
    var contractRes = nlapiSearchRecord('customrecord_custpage_emp_labor_number',null,contractFilters,contractColumns);//劳动合同数据
    //培训经历数据
    var trainFilters = new Array();
        trainFilters.push(new nlobjSearchFilter('custrecord_custpage_emp_trained_link',null,'anyof',recordId));
    var trainColumns = new Array();
        trainColumns.push(new nlobjSearchColumn('custrecord_custpage_emp_trained_star_tim'));//date start
        trainColumns.push(new nlobjSearchColumn('custrecord_custpage_emp_trained_end_time'));//date end
        trainColumns.push(new nlobjSearchColumn('custrecord_custpage_emp_trained_content'));//培训内容
        trainColumns.push(new nlobjSearchColumn('custrecord_custpage_emp_trained_link'));//pid
    var trainRes = nlapiSearchRecord('customrecord_custpage_emp_trained_experi',null,trainFilters,trainColumns);
    //工作经历数据
    var jobFilters = new Array();
        jobFilters.push(new nlobjSearchFilter('custrecord_custpage_emp_link',null,'anyof',recordId));
    var jobColumns = new Array();
        jobColumns.push(new nlobjSearchColumn('custrecordcustpage_job_start_time'));//date start
        jobColumns.push(new nlobjSearchColumn('custrecordcustpage_job_end_time'));//date end
        jobColumns.push(new nlobjSearchColumn('custrecord_custpage_emp_line_main'));//主要经历
    var jobRes = nlapiSearchRecord('customrecord_work_experience_line',null,jobFilters,jobColumns);
    var debugData = jobRes;//debug
    nlapiLogExecution('error','jobDebug',JSON.stringify(debugData));//debug
    var debugData = trainRes;//debug
    nlapiLogExecution('error','trainDebug',JSON.stringify(debugData));//debug
    var debugData = contractRes;//debug
    nlapiLogExecution('error','debugContract',JSON.stringify(debugData));//debug
    var debugData = mainData;//debug
    nlapiLogExecution('error','mainData',JSON.stringify(debugData));//debug
    var debugData = mainData.getFieldValue('custrecord_custpage_emp_photo');//debug
    nlapiLogExecution('error','image',JSON.stringify(debugData));//debug
    //存储员工数据
    var record = nlapiCreateRecord('employee');
        //主要信息
    record.setFieldValue('firstname',mainData.getFieldValue('custrecord_custpage_emp_name'));//firstName
    record.setFieldValue('entityid','test1028');//流水号
    record.setFieldValue('custentity_identity_number',mainData.getFieldValue('custrecord_custpage_emp_id_number'));//身份证号
    record.setFieldValue('custentity_birthplace',mainData.getFieldValue('custrecord_custpage_emp_native_place'));//籍贯
    record.setFieldValue('custentity_mentor',mainData.getFieldValue('custrecord_custpage_emp_mentor'));//职业导师
    record.setFieldValue('custentity_graduation_time',mainData.getFieldValue('custrecord_custpage_emp_over_dates'));//毕业时间
    record.setFieldValue('custentity_years_of_industry',mainData.getFieldValue('custrecord_custpage_emp_industry_age'));//行业年限
    record.setFieldValue('custentitycustentity_employee_status',mainData.getFieldValue('custrecord_custpage_emp_status'));//员工状态
    record.setFieldValue('custentitycustentity_date_of_birth',mainData.getFieldValue('custrecord_custpage_emp_birth_day'));//出生年月
    record.setFieldValue('custentity_education',mainData.getFieldValue('custrecord_custpage_emp_educational'));//学历	
    record.setFieldValue('custentity_job_title',mainData.getFieldValue('custrecord_custpage_emp_job_title'));//职称
    record.setFieldValue('custentity_gender',mainData.getFieldValue('custrecord_custpage_emp_sex'));//性别
    record.setFieldValue('custentity_marital_status',mainData.getFieldValue('custrecord_custpage_emp_marital_status'));//婚姻状况
    record.setFieldValue('supervisor',mainData.getFieldValue('custrecord_custpage_emp_subordinate_supe'));//主管
    record.setFieldValue('custentity_profession',mainData.getFieldValue('custrecord_custpage_emp_professional'));//专业
    record.setFieldValue('custentity_professional_title',mainData.getFieldValue('custrecord_custpage_emp_profes_tit'));//职称专业
    //联系信息
    record.setFieldValue('custentity_permanent_residence_address',mainData.getFieldValue('custrecord_custpage_emp_household_adress'));//户籍地址
    record.setFieldValue('custentity_mailing_address',mainData.getFieldValue('custrecord_custpage_emp_mailing_adress'));//邮寄地址
    record.setFieldValue('email',mainData.getFieldValue('custrecord_custpage_emp_email'));//e-mail
    record.setFieldValue('mobilephone',mainData.getFieldValue('custrecord_custpage_emp_phone'));//手机号码
    record.setFieldValue('homephone',mainData.getFieldValue('custrecord_custpage_emp_family_phone'));//家庭电话
    record.setFieldValue('custentity_wechat_id',mainData.getFieldValue('custrecord_custpage_emp_wechart'));//微信号
    //岗位信息
    record.setFieldValue('subsidiary',mainData.getFieldValue('custrecord_custpage_emp_company'));//subsidiary 子公司
    record.setFieldValue('department',mainData.getFieldValue('custrecord_custpage_emp_department'));//department
    record.setFieldValue('location',mainData.getFieldValue('custrecord_custpage_emp_place'));//地点
    record.setFieldValue('custentity_post',mainData.getFieldValue('custrecord_custpage_emp_jobs'));//岗位
    record.setFieldValue('custentity_type_if_billing',mainData.getFieldValue('custrecord_custpage_emp_type'));//是否计费员工
    record.setFieldValue('custentity_career_path',mainData.getFieldValue('custrecord_custpage_emp_career_path'));//职业通道
    record.setFieldValue('custentity_ability_level',mainData.getFieldValue('custrecord_custpage_emp_ability_level'));//能力等级
    record.setFieldValue('isjobresource',mainData.getFieldValue('custrecord_custpage_emp_project_resource'));//是否项目资源
    //基本信息
    record.setFieldValue('custentity_english_name',mainData.getFieldValue('custrecord_custpage_emp_english_name'));//英文名
    record.setFieldValue('image',mainData.getFieldValue('custrecord_custpage_emp_photo'));//照片
    record.setFieldValue('custentity_nationality',mainData.getFieldValue('custrecord_custpage_emp_ethnic'));//民族
    record.setFieldValue('custentity_departure_date',mainData.getFieldValue('custrecord_custpage_emp_departure_date'));//离职日期
    record.setFieldValue('custentity_country_of_citizenship',mainData.getFieldValue('custrecord_custpage_emp_nationality'));//国籍
    record.setFieldValue('custentity_political_status',mainData.getFieldValue('custrecord_custpage_emp_political_landsc'));//政治面貌
    record.setFieldValue('custentity_account_nature',mainData.getFieldValue('custrecord_custpage_emp_household_regist'));//户口性质
    record.setFieldValue('laborcost',mainData.getFieldValue('custrecord_custpage_emp_unit_price'));//工时单价，sublist
    record.setFieldValue('custentity_current_address',mainData.getFieldValue('custrecord_custpage_emp_live_adress'));//现住地址
    //劳动关系
    record.setFieldValue('custentity_social_security',mainData.getFieldValue('custrecord_custpage_emp_social_security'));//社保关系地
    record.setFieldValue('custentity_provident_fund_number',mainData.getFieldValue('custrecord_custpage_emp_fund_number'));//公积金号码
    record.setFieldValue('custentity_bank',mainData.getFieldValue('custrecord_custpage_emp_banl_number'));//开户银行
    record.setFieldValue('custentity_social_security_number',mainData.getFieldValue('custrecord_custpage_emp_security_account'));//社会保障号
    record.setFieldValue('custentity_bank_number',mainData.getFieldValue('custrecord_custpage_emp_card_number'));//工资卡号
    record.setFieldValue('custentity_file_location',mainData.getFieldValue('custrecord_custpage_emp_file_location'));//档案所在地
    record.setFieldValue('custentity_title_acquisition_time',mainData.getFieldValue('custrecord_custpage_emp_acquisition_time'));//职称获取时间
    //个人履历
    record.setFieldValue('custentity_working_hours_in_industry',mainData.getFieldValue('custrecord_custpage_emp_line_of_time'));//入行工作时间
    record.setFieldValue('custentity_working_years',mainData.getFieldValue('custrecord_custpage_work_time'));//工作年限
    //人才发展和盘点
    record.setFieldValue('custentity_grade_certification_record',mainData.getFieldValue('custrecord_custpage_emp_first_level'));//初次认证等级
    record.setFieldValue('custentity_talent_inventor_quadrant',mainData.getFieldValue('custrecord_custpage_emp_quadrant'));//人才盘点象限
    record.setFieldValue('custentity_initial_certification_time',mainData.getFieldValue('custrecord_custpage_emp_initial_certific'));//初次认证时间
    record.setFieldValue('custentity_disc_results',mainData.getFieldValue('custrecord_custpage_emp_disc_this'));//DISC本我
    record.setFieldValue('custentity_disc_results_external',mainData.getFieldValue('custrecord_custpage_emp_out'));//DISC外在我
    record.setFieldValue('custentity_disc_results_comprehensive',mainData.getFieldValue('custrecord_custpage_emp_disc'));//DISC综合
    record.setFieldValue('custentity_position_promotion_record',mainData.getFieldValue('custrecord_custpage_emp_promotion'));//职位晋升记录
    record.setFieldValue('custentity_advantage_evaluation_result',mainData.getFieldValue('custrecord_custpage_emp_glp'));//盖洛普优势评测结果
    record.setFieldValue('custentity_career_anchor',mainData.getFieldValue('custrecord_custpage_emp_anchor'));//职业锚
    record.setFieldValue('custentity_learning_acuity',mainData.getFieldValue('custrecord_custpage_emp_learn_acuity'));//学习敏锐度
    // var debugData = trainRes[0].getValue('custrecord_custpage_emp_trained_star_tim');//debug
    // nlapiLogExecution('error','startTime',JSON.stringify(debugData));//debug
    //sublist,培训经历
    if(trainRes){
        for(var i = 0;i < trainRes.length;i++){
            record.setLineItemValue('recmachcustrecord_training_experience','custrecord_training_xperience_start_ime',i+1,trainRes[i].getValue('custrecord_custpage_emp_trained_star_tim'));//开始时间
            record.setLineItemValue('recmachcustrecord_training_experience','custrecord_training_experience_end_time',i+1,trainRes[i].getValue('custrecord_custpage_emp_trained_end_time'));//结束时间
            record.setLineItemValue('recmachcustrecord_training_experience','custrecord_training_content_and_project',i+1,trainRes[i].getValue('custrecord_custpage_emp_trained_content'));//结束时间
        }
    }
    //sublist,劳动合同
    if(contractRes){
        for(var i = 0;i < contractRes.length;i++){
            record.setLineItemValue('recmachcustrecord_labor_contract_information','custrecord_number_of_contract_awards',i+1,contractRes[i].getValue('custrecord_custpage_emp_labor_num'));//劳动合同签订次数
            record.setLineItemValue('recmachcustrecord_labor_contract_information','custrecord_contract_time',i+1,contractRes[i].getValue('custrecord_custpage_emp_labor_strat_time'));//开始时间
            record.setLineItemValue('recmachcustrecord_labor_contract_information','custrecord_contract_end_time',i+1,contractRes[i].getValue('custrecord_custpage_emp_labor_end_time'));//结束时间
        }
    }
    //sublist,个人经历
    if(jobRes){
        for(var i = 0;i < jobRes.length;i++){
            record.setLineItemValue('recmachcustrecord15','custrecord_work_experience_start_time',i+1,jobRes[i].getValue('custrecordcustpage_job_start_time'));//开始时间
            record.setLineItemValue('recmachcustrecord15','custrecord_work_experience_end_time',i+1,jobRes[i].getValue('custrecordcustpage_job_end_time'));//开始时间
            record.setLineItemValue('recmachcustrecord15','custrecord_main_experience',i+1,jobRes[i].getValue('custrecord_custpage_emp_line_main'));//工作经历
        }
    }
    //sublist,紧急联系人信息
    record.setLineItemValue('emergencycontact','contact',1,mainData.getFieldValue('custrecord_custpage_emp_emergency_conta'));//姓名
    record.setLineItemValue('emergencycontact','relationship',1,mainData.getFieldValue('custrecord_custpage_emp_emergency_contac'));//关系
    record.setLineItemValue('emergencycontact','address',1,mainData.getFieldValue('custrecord_custpage_emp_emerg_adress'));//联系地址
    record.setLineItemValue('emergencycontact','phone',1,mainData.getFieldValue('custrecord_custpage_emp_gency_phone'));//联络电话
    //自定义流水号
    var buId = mainData.getFieldValue('custrecord_custpage_emp_department');//项目执行部门id
    nlapiLogExecution('error','buId',buId);//debug
    var buFilters = new Array();
    buFilters.push(new nlobjSearchFilter('internalid',null,'is',buId));
    var buColumns = new Array();
    buColumns.push(new nlobjSearchColumn('custrecord_department_number'));
    buColumns.push(new nlobjSearchColumn('name'));
    var buTempData = nlapiCreateSearch('department',buFilters,buColumns).runSearch();
    var buData = buTempData.getResults(0,1);
    var debugData = buData;//debug
    nlapiLogExecution('error','buData',JSON.debugData);//debug
    var buCode = buData[0].getValue('custrecord_department_number');//BU编号 
    var suId = nlapiSubmitRecord(record);//存入数据库
    if(!suId){
        nlapiLogExecution('error','saveToEmployee_error','员工入职信息存入系统表失败');
        return false;
    }
    var updataRecord = nlapiLoadRecord('employee',suId);
    var returnData = makeSerialNum('employee','3');//员工流水号
    //组装员工编码
    var codeStr = buCode+returnData['year']+returnData['num'];
    updataRecord.setFieldValue('entityid',codeStr);
    var res = nlapiSubmitRecord(updataRecord);
    if(!res){
        nlapiLogExecution('error','saveToEmployee_error','更新员工编码失败');
        return false;
    }else{
        return true;
    }
}


