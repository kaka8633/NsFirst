/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       26 Oct 2018     zyt
 *
 */
/**
 * 消息对象
 * 
 * @param status
 * @param info
 * @returns json
 */
function custMsg(status, data) {
	this.status = status;
	this.data = data;
}

/**
 * 打开遮罩
 * 
 * @param message
 *            遮罩中显示的消息
 * @returns
 */

function startMask(message) {
	var cutomerModel = document.getElementById('cutomerModel');
	if (cutomerModel == null) {
		var htmlText = "<div id ='cutomerModel' style=\"position: absolute;top: 0;left: 0;display: block;background-color: rgba(9, 9, 9, 0.6);width: 100%;height: 100%;z-index: 1000;text-align:center\"/>\n"
				+ "<img src=\"https://system.na2.netsuite.com/core/media/media.nl?id=3583&c=4890821&h=8dca27f2eedc57f9d2a1\" style=\"margin-top:20%;width:40px;\" /></br>\n"
				+ "<b style=\"margin-top:2%;color:#fff\">"
				+ message
				+ "</b>\n"
				+ "</div>";
		insertHTML(document.body, 'beforeend', htmlText);
	} else {
		document.getElementById('cutomerModel').style.display = 'block';
	}
	// 计算窗体高度应用于遮罄1�7
	pageH = Math.max(document.body.scrollHeight,
			document.documentElement.scrollHeight);
	pageH = pageH > 0 ? pageH : 600;
	document.getElementById('cutomerModel').style.height = pageH + "px";

}

/**
 * 遮罩层工具类，往DOM中插入元約1�7
 * 
 * @param el
 * @param where
 * @param html
 * @returns
 */
function insertHTML(el, where, html) {
	if (!el) {
		return false;
	}

	where = where.toLowerCase();

	if (el.insertAdjacentHTML) {// IE
		el.insertAdjacentHTML(where, html);
	} else {
		var range = el.ownerDocument.createRange(), frag = null;

		switch (where) {
		case "beforebegin":
			range.setStartBefore(el);
			frag = range.createContextualFragment(html);
			el.parentNode.insertBefore(frag, el);
			return el.previousSibling;
		case "afterbegin":
			if (el.firstChild) {
				range.setStartBefore(el.firstChild);
				frag = range.createContextualFragment(html);
				el.insertBefore(frag, el.firstChild);
			} else {
				el.innerHTML = html;
			}
			return el.firstChild;
		case "beforeend":
			if (el.lastChild) {
				range.setStartAfter(el.lastChild);
				frag = range.createContextualFragment(html);
				el.appendChild(frag);
			} else {
				el.innerHTML = html;
			}
			return el.lastChild;
		case "afterend":
			range.setStartAfter(el);
			frag = range.createContextualFragment(html);
			el.parentNode.insertBefore(frag, el.nextSibling);
			return el.nextSibling;
		}
	}
}

/**
 * 关闭遮罩
 */
function endMask() {
	try {
		document.getElementById('cutomerModel').style.display = 'none';
	} catch (e) {

	}
}

/**
 * 判断数组中是否包含某元素
 * 
 * @param arr
 *            数组
 * @param obj
 *            字符
 * @returns true/false
 */
function contains(arr, obj) {
	var i = arr.length;
	while (i--) {
		if (arr[i] === obj) {
			return true;
		}
	}
	return false;
}

/**
 * 序列化url参数
 * 
 * @param obj
 * @returns
 */
function serializeURL(obj) {
	var str = [];
	for ( var p in obj)
		if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
	return str.join("&");
}

/**
 * 字符串前面用0补齐到指定位敄1�7
 * 
 * @param num
 * @param ws
 *            位数
 * @returns
 */
function addPreZero(num, ws) {
	var t = (num + '').length, s = '';

	for (var i = 0; i < ws - t; i++) {
		s += '0';
	}

	return s + num;
}

/**
 * 获取配置文件（记录类型：配置文件）的倄1�7
 * 
 * @param name
 * @returns
 */
function getConfigValue(name) {
	var value;
	try {
		var filterArray = [];
		filterArray.push(new nlobjSearchFilter('name', null, 'is', name));
		var qryFieldArray = [];
		qryFieldArray[0] = new nlobjSearchColumn('custrecord_config_value');
		var list = nlapiSearchRecord('customrecord_config', null, filterArray,
				qryFieldArray);
		if (list != null) {
			value = list[0].getValue('custrecord_config_value');
		}
	} catch (e) {
		value = '未配置�1�7�1�7';
	}
	return value;
}

/**
 * handlebars编译并加载对豄1�7
 * 
 * @param html
 * @param page_object
 * @returns
 */
function renderPage(html, page_object) {
	var template = Handlebars.compile(html);
	return template(page_object);
}

/**
 * 处理null值，如果a为空，则返回b，否则返回a
 * 
 * @param a
 * @param b
 * @returns
 */
function nvl(a, b) {
	var rtn;
	if (a == null || a == 'null') {
		rtn = b;
	} else {
		rtn = a;
	}
	return rtn;
}

/**
 * 自定义异帄1�7
 * 
 * @returns
 */
function cuxException(message, code) {
	this.message = message;
	this.code = code;
}

/**
 * 拆分数组到多个数组1�7
 * 
 * @param ary
 *            待拆分数组1�7
 * @param len
 *            每小数组包含多少个元約1�7
 * @returns {Array}
 */
function spiltAry(ary, len) {
	var aryLen = ary.length;
	var result = [];
	for (var i = 0; i < aryLen; i += len) {
		result.push(ary.slice(i, i + len));
	}
	return result;
}

/**
 * 转义符换成普通字笄1�7
 * 
 * @param str
 * @returns
 */
function escape2Html(str) {
	var arrEntities = {
		'lt' : '<',
		'gt' : '>',
		'nbsp' : ' ',
		'amp' : '&',
		'quot' : '"'
	};
	return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) {
		return arrEntities[t];
	});
}