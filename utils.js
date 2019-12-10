window.urlParams = (function() {
  var url = window.location.href.split('#')[0];
  var theRequest = {};
  if (url.indexOf('?') !== -1) {
    var str = url.split('?')[1];
    var strs = str.split('&');
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1]);
    }
  }
  return theRequest;
})();

if (urlParams.hasOwnProperty('user') && urlParams.user != null && urlParams.user != '') {
	$.cookie('user', urlParams.user);
}


/**********获取当前登录账号***********/
var GET_CURRENT_ACCOUNT = function (){
    var name = GET_COOKIE("user");
	//name = 'xuzheyuan';
	//name = 'pe001';
	//name = 'chenyanlin';
	//name = 'liulishan';	
	//name = 'chenjun';	
	//name = 'zhouyun';	
	//name = 'sunbin';		
	//name = 'gaosongbiao';	
	//name = 'chaiguangfei';
	
    return name;
}

function GET_COOKIE(c_name){
    if (document.cookie.length>0){
      c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1)
        {
        c_start=c_start + c_name.length+1
        c_end=document.cookie.indexOf(";",c_start)
        if (c_end==-1) c_end=document.cookie.length
        return unescape(document.cookie.substring(c_start,c_end))
        }
     }
    return ""
}

function SET_COOKIE(c_name,value,expiredays){
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

/****************************************以下为公共方法******************************************/

/************数组去重************/
var UNIQUE_LIST = function (array , key){ 
	var r = []; 
	for(var i = 0, l = array.length; i < l; i++) { 
		for(var j = i + 1; j < l; j++) 
			if (array[i][key] === array[j][key]) j = ++i; 
		r.push(array[i]); 
	} 
	return r; 
}

/***********字符串为空判断************/
var IS_EMPTY = function (val){
	var flag = false;
	if(val == undefined || val == null || val.length == 0){
		flag = true;
	}
	return flag;
}

/****************获取两时间只差是多少天*************/
var DATE_DIFF_TO_DAY = function (startTime , endTime){
	var cnt = 0;
	if (startTime != '' && endTime != ''){
		startTime = new Date(startTime);
		endTime = new Date(endTime);
		var m = Math.abs(endTime - startTime);
		cnt = Math.floor(m / (24 * 3600 * 1000));					
	}	
	return cnt;
}

/****************合并单元格*************/
var COMBINE_CELL = function (list){
	for (field in list[0]) {
		var k = 0;
		while (k < list.length) {
			list[k][field + 'span'] = 1;
			list[k][field + 'dis'] = false;
			for (var i = k + 1; i <= list.length - 1; i++) {
				if (list[k][field] == list[i][field] && list[k][field] != '') {
					list[k][field + 'span']++;
					list[k][field + 'dis'] = false;
					list[i][field + 'span'] = 1;
					list[i][field + 'dis'] = true;
				} else {
					break;
				}
			}
			k = i;
		}
	}
	return list;		
}

/**
**获取当前日期加几天之后的日期
**参数说明 ：
** date: 当前的日期 (字符串类型 如:2018-01-01)
** cnt:  需要加上的天数(数字类型 如：7)
**/
var DAY_TO_ADD = function (date , cnt){
	var d = new Date(date);
	//cnt = Math.abs(cnt);
	d.setTime(d.getTime()+(cnt*24*60*60*1000));
	return d.Format('yyyy-MM-dd');
}

/**
**获取时间加多少分钟之后的时间
**参数说明 ：
** date: 当前的日期 (字符串类型 如:2018-01-01 12:00)
** min:  需要加上的分钟(数字类型 如：30)
**/
var MINUTE_TO_ADD = function (date , min){
	var d = new Date(date);
	//cnt = Math.abs(cnt);
	d.setTime(d.getTime()+(min*1000*60));
	return d.Format('yyyy-MM-dd hh:mm');	
}

/**
**获取当前时间是本年第几周(字符串类型 如:2018-01-01)
**以周一为每周的第一天。
**返回当前第几周，以及这周的开始和结束时间
**/
var GET_WEEK_OF_YEAR = function (date){
    var today = new Date(date);
    var firstDay = new Date(today.getFullYear(),0, 1);
    var dayOfWeek = firstDay.getDay(); 
    var spendDay= 1;
    if (dayOfWeek !=0) {
		spendDay=7-dayOfWeek+1;
    }
    firstDay = new Date(today.getFullYear(),0, 1+spendDay);
    var d =Math.ceil((today.valueOf()- firstDay.valueOf())/ 86400000);
    var result =Math.ceil(d/7);
	
	var d = today.Format('yyyy-MM-dd');	
	var end_date = DAY_TO_ADD(d , 7 - today.getDay());	
	var start_date = DAY_TO_ADD(d , - today.getDay() + 1);
	var result_map = {
		week : result+1,
		start_date : start_date,
		end_date   : end_date
	};
	
    return result_map;
	
};


/** 
* 获得相对当前周AddWeekCount个周的起止日期 
* AddWeekCount为0代表当前周   为-1代表上一个周   为1代表下一个周以此类推
* **/ 
function GET_WEEK_START_AND_END(AddWeekCount) { 

    //一天的毫秒数   
    var millisecond = 1000 * 60 * 60 * 24; 
    //获取当前时间   
    var currentDate = new Date();
    //相对于当前日期AddWeekCount个周的日期
    currentDate = new Date(currentDate.getTime() + (millisecond * 7*AddWeekCount));
    //返回date是一周中的某一天
    var week = currentDate.getDay(); 
    //返回date是一个月中的某一天   
    var month = currentDate.getDate();
    //减去的天数   
//    var minusDay = week != 0 ? week - 1 : 6; //此处为'周一为每星期的开始时间'
	var minusDay = week; //此处为'每周日为每星期的开始时间'
    //获得当前周的第一天   
    var currentWeekFirstDay = new Date(currentDate.getTime() - (millisecond * minusDay)); 
    //获得当前周的最后一天
    var currentWeekLastDay = new Date(currentWeekFirstDay.getTime() + (millisecond * 6));
	
	var map = {
		startTime : currentWeekFirstDay.Format('yyyy-MM-dd'),
		endTime   : currentWeekLastDay.Format('yyyy-MM-dd')
	};
    return map; 
}


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) 
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
    
}


/**************判断是否为手机端打开****************/
var IS_MOBILE = function (){
	var flag = false;
	var u = navigator.userAgent, app = navigator.appVersion;  
	
	flag = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
	return flag;
}


















/************格式化数据中心能耗告警信息************/
var formatDcWarnDesc = function (data,show_dc , row_style){
	var ln = '%ln';//位置名	
	var ls = '%ls';//位置短名
	
	var kn = '%kn';//指标内容
	var kv = '%kv';//指标值
	//var kp = '%kp';//指标上次值
	var ki = '%ki';//指标差值
	
	var sn = '%sn';//附属指标1内容
	var sv = '%sv';//附属指标1值
	//var sp = '%sp';//附属指标1上次值
	var si = '%si';//附属指标1差值
	
	var tn = '%tn';//附属指标2内容
	var tv = '%tv';//附属指标2值
	//var tp = '%tp';//附属指标2上次值
	var ti = '%ti';//附属指标2差值
	
	var head = '<div class="report-item" '+row_style+'>';
	if (show_dc){
		head = head + '<span class="report-label">'+data.dc_short_name+'</span>';
	}
	data.format = head + data.format;
	if (data.format.indexOf(ln)>=0){
		data.format = data.format.replace(new RegExp(ln, "g"),'<span class="a-ln">' + data.loc_name + '</span>');
	}
	if(data.format.indexOf(ls)>=0){
		data.format = data.format.replace(new RegExp(ls, "g"),'<span class="a-ls">' + data.loc_short_name + '</span>');
	}
	
	if(data.format.indexOf(kn)>=0){
		data.format = data.format.replace(new RegExp(kn, "g"),'<span class="a-kn">' + data.kpi_display + '</span>');
	}
	if(data.format.indexOf(kv)>=0){
		data.format = data.format.replace(new RegExp(kv, "g"),'<span class="a-kv">' + getFormatReportDataDesc(data.kpi_value,data.kpi_unit,data.kpi_decimal_digit) + '</span>');
	}
	if(data.format.indexOf(ki)>=0){
		if (!IS_EMPTY(data.kpi_diff) && data.kpi_diff >=0){
			data.format = data.format.replace(new RegExp(ki, "g"),'<span class="a-ki warn">+ ' + getFormatReportDataDesc(Math.abs(data.kpi_diff),data.kpi_unit,data.kpi_decimal_digit) + '</span>');			
		}else if (!IS_EMPTY(data.kpi_diff) && data.kpi_diff <0){			
			data.format = data.format.replace(new RegExp(ki, "g"),'<span class="a-ki normal">- ' + getFormatReportDataDesc(Math.abs(data.kpi_diff),data.kpi_unit,data.kpi_decimal_digit) + '</span>');
		}else {
			data.format = data.format.replace(new RegExp(ki, "g"),'');
		}
	}
	
	if(data.format.indexOf(sn)>=0){
		data.format = data.format.replace(new RegExp(sn, "g"),'<span class="a-sn">' + data.sub_kpi1_display + '</span>');
	}
	if(data.format.indexOf(sv)>=0){
		data.format = data.format.replace(new RegExp(sv, "g"),'<span class="a-sv">' + getFormatReportDataDesc(data.sub_kpi1_value,data.sub_kpi1_unit,data.sub_kpi1_decimal_digit) + '</span>');
	}
	if(data.format.indexOf(si)>=0){
		if (!IS_EMPTY(data.sub_kpi1_diff) && data.sub_kpi1_diff >=0){
			data.format = data.format.replace(new RegExp(si, "g"),'<span class="a-si warn">+ ' + getFormatReportDataDesc(Math.abs(data.sub_kpi1_diff),data.sub_kpi1_unit,data.sub_kpi1_decimal_digit) + '</span>');			
		}else if (!IS_EMPTY(data.sub_kpi1_diff) && data.sub_kpi1_diff <0){
			data.format = data.format.replace(new RegExp(si, "g"),'<span class="a-si normal">- ' + getFormatReportDataDesc(Math.abs(data.sub_kpi1_diff),data.sub_kpi1_unit,data.sub_kpi1_decimal_digit) + '</span>');
		}else {
			data.format = data.format.replace(new RegExp(si, "g"),'');
		}
	}
	
	if(data.format.indexOf(tn)>=0){
		data.format = data.format.replace(new RegExp(tn, "g"),'<span class="a-tn">' + data.sub_kpi2_display + '</span>');
	}
	if(data.format.indexOf(tv)>=0){
		data.format = data.format.replace(new RegExp(tv, "g"),'<span class="a-tv">' + getFormatReportDataDesc(data.sub_kpi2_value,data.sub_kpi2_unit,data.sub_kpi2_decimal_digit) + '</span>');
	}
	if(data.format.indexOf(ti)>=0){
		if (!IS_EMPTY(data.sub_kpi2_diff) && data.sub_kpi2_diff >=0){
			data.format = data.format.replace(new RegExp(ti, "g"),'<span class="a-ti warn">+ ' + getFormatReportDataDesc(Math.abs(data.sub_kpi2_diff),data.sub_kpi2_unit,data.sub_kpi2_decimal_digit) + '</span>');			
		}else if (!IS_EMPTY(data.sub_kpi2_diff) && data.sub_kpi2_diff <0){
			data.format = data.format.replace(new RegExp(ti, "g"),'<span class="a-ti normal">- ' + getFormatReportDataDesc(Math.abs(data.sub_kpi2_diff),data.sub_kpi2_unit,data.sub_kpi2_decimal_digit) + '</span>');
		}else {
			data.format = data.format.replace(new RegExp(ti, "g"),'');
		}		
	}
	//data.format = data.format.replace(new RegExp("。", "g"),'');
	data.format += '</div>';
}









/************格式化数据中心周报告信息************/
var formatDcWeekReportDesc = function (data,params){
	var ln = '%ln';//位置名	
	var ls = '%ls';//位置短名
	
	var kn = '%kn';//指标内容
	var kv = '%kv';//指标值
	var kp = '%kp';//指标上次值
	var ki = '%ki';//指标差值
	
	var sn = '%sn';//附属指标1内容
	var sv = '%sv';//附属指标1值
	var sp = '%sp';//附属指标1上次值
	var si = '%si';//附属指标1差值
	
	var tn = '%tn';//附属指标2内容
	var tv = '%tv';//附属指标2值
	var tp = '%tp';//附属指标2上次值
	var ti = '%ti';//附属指标2差值
	
	var row_style = IS_EMPTY(params)? '' : IS_EMPTY(params.row_style)? '' : params.row_style;
	var show_dc = IS_EMPTY(params)? '' : IS_EMPTY(params.show_dc)? '' : params.show_dc;
	var dc_name_style = IS_EMPTY(params)? '' : IS_EMPTY(params.dc_name_style)? '' : params.dc_name_style;
	
	var head = '<div class="report-item" '+ row_style +'>';
	if (show_dc){
		head = head + '<span '+dc_name_style+' class="report-label dc-name">'+data.dc_short_name+'</span>';
	}
	data.format = head + data.format;
	if (data.format.indexOf(ln)>=0){
		data.format = data.format.replace(new RegExp(ln, "g"),'<span class="w-ln">' + data.loc_name + '</span>');
	}
	if(data.format.indexOf(ls)>=0){
		data.format = data.format.replace(new RegExp(ls, "g"),'<span class="w-ls">' + data.loc_short_name + '</span>');
	}
	
	if(data.format.indexOf(kn)>=0){
		data.format = data.format.replace(new RegExp(kn, "g"),'<span class="w-kn">' + data.kpi_display + '</span>');
	}
	if(data.format.indexOf(kv)>=0){
		data.format = data.format.replace(new RegExp(kv, "g"),'<span class="w-kv">' + getFormatReportDataDesc(data.kpi_value,data.kpi_unit,data.kpi_decimal_digit) + '</span>');
	}
	if(data.format.indexOf(kp)>=0){
		data.format = data.format.replace(new RegExp(kp, "g"),'<span class="w-kp">' + getFormatReportDataDesc(data.kpi_value_previous,data.kpi_unit,data.kpi_decimal_digit) + '</span>');
	}	
	if(data.format.indexOf(ki)>=0){
		if (!IS_EMPTY(data.kpi_increament) && data.kpi_increament >=0){
			data.format = data.format.replace(new RegExp(ki, "g"),'<span class="w-ki warn">↑ ' + getFormatReportDataDesc(Math.abs(data.kpi_increament),data.kpi_unit,data.kpi_decimal_digit) + '</span>');			
		}else if (!IS_EMPTY(data.kpi_increament) && data.kpi_increament <0){			
			data.format = data.format.replace(new RegExp(ki, "g"),'<span class="w-ki normal">↓ ' + getFormatReportDataDesc(Math.abs(data.kpi_increament),data.kpi_unit,data.kpi_decimal_digit) + '</span>');
		}else {
			data.format = data.format.replace(new RegExp(ki, "g"),'');
		}
	}
	
	if(data.format.indexOf(sn)>=0){
		data.format = data.format.replace(new RegExp(sn, "g"),'<span class="w-sn">' + data.sub_kpi1_display + '</span>');
	}
	if(data.format.indexOf(sv)>=0){
		data.format = data.format.replace(new RegExp(sv, "g"),'<span class="w-sv">' + getFormatReportDataDesc(data.sub_kpi1_value,data.sub_kpi1_unit,data.sub_kpi1_decimal_digit) + '</span>');
	}
	if(data.format.indexOf(sp)>=0){
		data.format = data.format.replace(new RegExp(sp, "g"),'<span class="w-sp">' + getFormatReportDataDesc(data.sub_kpi1_value_previous,data.sub_kpi1_unit,data.sub_kpi1_decimal_digit) + '</span>');
	}		
	if(data.format.indexOf(si)>=0){
		if (!IS_EMPTY(data.sub_kpi1_increament) && data.sub_kpi1_increament >=0){
			data.format = data.format.replace(new RegExp(si, "g"),'<span class="w-si warn">↑' + getFormatReportDataDesc(Math.abs(data.sub_kpi1_increament),data.sub_kpi1_unit,data.sub_kpi1_decimal_digit) + '</span>');			
		}else if (!IS_EMPTY(data.sub_kpi1_increament) && data.sub_kpi1_increament <0){
			data.format = data.format.replace(new RegExp(si, "g"),'<span class="w-si normal">↓' + getFormatReportDataDesc(Math.abs(data.sub_kpi1_increament),data.sub_kpi1_unit,data.sub_kpi1_decimal_digit) + '</span>');
		}else {
			data.format = data.format.replace(new RegExp(si, "g"),'');
		}
	}
	
	if(data.format.indexOf(tn)>=0){
		data.format = data.format.replace(new RegExp(tn, "g"),'<span class="w-tn">' + data.sub_kpi2_display + '</span>');
	}
	if(data.format.indexOf(tv)>=0){
		data.format = data.format.replace(new RegExp(tv, "g"),'<span class="w-tv">' + getFormatReportDataDesc(data.sub_kpi2_value,data.sub_kpi2_unit,data.sub_kpi2_decimal_digit) + '</span>');
	}
	if(data.format.indexOf(tp)>=0){
		data.format = data.format.replace(new RegExp(tp, "g"),'<span class="w-tp">' + getFormatReportDataDesc(data.sub_kpi2_value_previous,data.sub_kpi2_unit,data.sub_kpi2_decimal_digit) + '</span>');
	}	
	if(data.format.indexOf(ti)>=0){
		if (!IS_EMPTY(data.sub_kpi2_increament) && data.sub_kpi2_increament >=0){
			data.format = data.format.replace(new RegExp(ti, "g"),'<span class="w-ti warn">↑' + getFormatReportDataDesc(Math.abs(data.sub_kpi2_increament),data.sub_kpi2_unit,data.sub_kpi2_decimal_digit) + '</span>');			
		}else if (!IS_EMPTY(data.sub_kpi2_increament) && data.sub_kpi2_increament <0){
			data.format = data.format.replace(new RegExp(ti, "g"),'<span class="w-ti normal">↓' + getFormatReportDataDesc(Math.abs(data.sub_kpi2_increament),data.sub_kpi2_unit,data.sub_kpi2_decimal_digit) + '</span>');
		}else {
			data.format = data.format.replace(new RegExp(ti, "g"),'');
		}		
	}
	//data.format = data.format.replace(new RegExp("。", "g"),'');
	data.format += '</div>';
}

var getFormatReportDataDesc = function (value ,unit,decimal){
	decimal = IS_EMPTY(decimal) ? 0 : decimal;

	if (!IS_EMPTY(value)){
		if (unit === '%'){
			value = ((value*100).toFixed(decimal)) +unit;
		}else {
			value = value.toFixed(decimal);
		}		
	}
	return value;
}