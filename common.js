//由于通过类名class和name属性获取DOM对象时有兼容性的问题,我们可以封装一个函数解决
function getByClass(classname) {
	var allItems = document.getElementsByTagName("*"); //通过className来获取某个元素的class属性的属性值
	//var str = allItems.className;
	var result = [];
	for(var i = 0; i < allItems.length; i++) {
		var cn = allItems[i].className; //获取单个元素的class值
		/*if(cn.indexOf(classname)!=-1){
																//return allItems[i]
														  }*/
		var arr = cn.split(" "); //indexOf方法在IE低版本中不兼容
		/*if(arr.indexOf(classname) != -1){
			result.push(allItems[i]);
		}*/
		for(var j = 0; j < arr.length; j++) {
			if(arr[j] === classname) {
				result.push(allItems[i]);
				break;
			}
		}
	}
	return result;
}

/*
 * 
 * 
 * 
 */
function $$(id) {
	return document.getElementById(id);
}
/*
 * 获取多父级元素的坐标
 * 
 * 
 */
function getOffset(obj) {
	var oOffset = {
		left: 0,
		top: 0
	};
	do {
		oOffset.left += obj.offsetLeft;
		oOffset.top += obj.offsetTop;

		obj = obj.parentNode;
	} while (obj && obj !== document);

	return oOffset;

}

function setCookie(name, value, day) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + day);
	document.cookie = name + "=" + value + ";expires=" + oDate;

}

function getCookie(name) {
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for(var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if(arr[0] == name) {
			return arr[1];
		}
	}
}

function removeCookie(name) {
	setCookie(name, 1, -1);

}
/*
 * 
 * 获取当前的属性值
 */

function getStyle(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];

	}
	return getComputedStyle(obj, false)[attr];
}

/*
 * 拖拽
 * 
 */
function drag(ele) {
	ele.onmousedown = function(e) {
		var evt = e || event;
		var disX = evt.offsetX;
		var disY = evt.offsetY;
		document.onmousemove = function(e) {
			var evt = e || event;
			var _left = evt.clientX - disX;
			var _top = evt.clientY - disY;

			if(_left <= 0) {
				_left = 0;
			}

			if(_left >= document.documentElement.clientWidth - ele.offsetWidth) {
				_left = document.documentElement.clientWidth - ele.offsetWidth;
			}

			if(_top <= 0) {

				_top = 0;
			}

			if(_top >= document.documentElement.clientHeight - ele.offsetHeight) {
				_top = document.documentElement.clientHeight - ele.offsetHeight;
			}
			ele.style.left = _left + "px";
			ele.style.top = _top + "px";
			return false;
		}
		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
		}
		return false;
	}
}
/*
 * TAB栏切换
 * arr表示要实现切换的元素数组
 * "classname"表示元素的效果类名
 */
function tab(arr, classname) {
	for(var i = 0; i < arr.length; i++) {
		arr[i].onclick = function() {
			for(var j = 0; j < arr.length; j++) {
				arr[j].className = "";
			}
			this.className = classname;
		}
	}
}

/*
 * 获取元素
 * ele表示元素
 */
function get(ele) {
	if(ele.charAt(0) == ".") {
		var newEle = ele.slice(1);
		return document.getElementsByClassName(newEle);
	} else if(ele.charAt(0) == "#") {
		var newEle = ele.slice(1);
		return document.getElementById(newEle);
	} else {
		return document.getElementsByTagName(ele);
	}
}
/*
 * 让一些对象的部分属性做缓冲运动
 * obj表示对象
 * oTarget：对象的属性集合
 * fn回调函数
 * 
 * 
 * bufferMove(oBox, {width: 400, height:800, left:600, top: 300, opacity: 30}, function () {
					console.log('我已经运动完毕了！');
				});
			}
 * 
 * 链式运动
 * bufferMove(oBox, {width: 400}, function () {
				bufferMove(oBox, {height: 600}, function () {
					bufferMove(oBox, {opacity: 40});
				});
 */
function bufferMove(obj, oTarget, fn) {
	clearInterval(obj.oTimer);
	obj.oTimer = setInterval(function() {
		var bBtn = true;
		for(var sAttr in oTarget) {
			if(sAttr === 'opacity') {
				var iCur = parseInt(getStyle(obj, sAttr) * 100);
			} else {
				var iCur = parseInt(getStyle(obj, sAttr));
			}

			var iSpeed = (oTarget[sAttr] - iCur) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			var iNext = iCur + iSpeed;
			if(sAttr === 'opacity') {
				obj.style.opacity = iNext / 100;
				obj.style.filter = 'alpha(opacity=' + iNext + ')';
			} else {
				obj.style[sAttr] = iNext + 'px';
			}

			// 当前的位置不等于中点値，说明属性尚未运动完毕
			if(iNext !== oTarget[sAttr]) {
				bBtn = false;
			}
		}

		if(bBtn) {
			clearInterval(obj.oTimer);
			if(fn) {
				fn();
			}
		}
	}, 50);
}
/*
 * 
 * 匀速运动
 */
function yunsu(obj, oTarget, fn) {
	clearInterval(obj.oTimer);
	obj.oTimer = setInterval(function() {
		var bBtn = true;
		for(var sAttr in oTarget) {
			if(sAttr === 'opacity') {
				var iCur = parseInt(getStyle(obj, sAttr) * 100);
			} else {
				var iCur = parseInt(getStyle(obj, sAttr));
			}

			var iNext = iCur + iSpeed;
			if(sAttr === 'opacity') {
				obj.style.opacity = iNext / 100;
				obj.style.filter = 'alpha(opacity=' + iNext + ')';
			} else {
				obj.style[sAttr] = iNext + 'px';
			}

			// 当前的位置不等于中点値，说明属性尚未运动完毕
			if(iNext !== oTarget[sAttr]) {
				bBtn = false;
			}
		}

		if(bBtn) {
			clearInterval(obj.oTimer);
			if(fn) {
				fn();
			}
		}
	}, 50);
}

function startMove(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var flag = true; //看到此定义时，先忽略，具体为什么要定义flag，参考下边的说明
		for(var attr in json) {
			if(attr == "opacity") {
				var iCur = Math.round(getStyle(obj, attr) * 100);
			} else {
				var iCur = parseInt(getStyle(obj, attr));
			}
			var iTarget = json[attr];
			var iSpeed = (iTarget - iCur) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(attr == "opacity") {
				obj.style.opacity = (iCur + iSpeed) / 100;
				obj.style.filter = "alpha(opacity=" + (iCur + iSpeed) + ")";
			} else {
				obj.style[attr] = iCur + iSpeed + "px";
			}
			//正常来讲，当当前值和目标值相等时要清除定时器，但是此时可能设计多个属性值同时发生变化
			//如果其中某一个属性值先达到目标值，直接清除，其他属性值没法再发生变化
			//考虑使用一个公共变量去相应各个属性值的变化 定义一个flag
			//只要没有达到目标值，就让flag值为flase，此时不清除定时器
			if(iCur != iTarget) {
				flag = false;
			}

		}

		//所有都到达了目标值
		if(flag) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}

	}, 30)
}

/**
	type  请求类型， 值为 get、post
	url   请求地址
	data  往后台发送的数据 数据类型为对象或者字符串
	// 字符串格式：a=b&c=d&e=f
	// 对象格式：{a:b,c:d,e:f}
	fn    回调函数
	async 是否为异步， 默认值为true
*/
/*function ajax({type, url, data, fn, async = true}={}) {
	// 将请求类型转换为大写
	type = type.toUpperCase();

	// 第一步创建AJAX对象
	let oXhr = null;
	if(window.ActiveXObject) {
		oXhr = new ActiveXObject('Microsoft.XMLHTTP');
	} else {
		oXhr = new XMLHttpRequest();
	}

	// 允许CORS发送cookie
	oXhr.withCredentials = true;

	// 处理数据
	let sData = '';
	if(typeof data === 'object') {
		for(var sAttr in data) {
			sData += sAttr + '=' + encodeURIComponent(data[sAttr]) + '&';
		}
		// 去除最后一个&
		sData = sData.slice(0, -1);
	} else {
		sData = data;
	}

	// GET请求，将数据追加到URL后面
	if(type === 'GET') {
		url += '?' + sData;
	}

	// 第二步 配置
	oXhr.open(type, url, async);

	// POST请求
	if(type === 'POST') {
		oXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		oXhr.send(sData);
	} else {
		// 第三步 发送数据
		oXhr.send();
	}
	// 第四步 接收数据
	oXhr.onreadystatechange = function () {
		if(oXhr.readyState === 4 && oXhr.status === 200) {
			fn && fn(oXhr.responseText);
		}
	}
}*/

/*
	使用promise完成ajax效果
*/
function promiseAjax({
	type,
	url,
	data,
	fn,
	async = true
} = {}) {
	return new Promise(function(resolve, reject) {
		// 将请求类型转换为大写
		type = type.toUpperCase();

		// 第一步创建AJAX对象
		let oXhr = null;
		if(window.ActiveXObject) {
			oXhr = new ActiveXObject('Microsoft.XMLHTTP');
		} else {
			oXhr = new XMLHttpRequest();
		}

		// 处理数据
		let sData = '';
		if(typeof data === 'object') {
			for(var sAttr in data) {
				sData += sAttr + '=' + encodeURIComponent(data[sAttr]) + '&';
			}
			// 去除最后一个&
			sData = sData.slice(0, -1);
		} else {
			sData = data;
		}

		// GET请求，将数据追加到URL后面
		if(type === 'GET') {
			url += '?' + sData;
		}

		// 第二步 配置
		oXhr.open(type, url, async);

		// POST请求
		if(type === 'POST') {
			oXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			oXhr.send(sData);
		} else {
			// 第三步 发送数据
			oXhr.send();
		}
		// 第四步 接收数据
		oXhr.onreadystatechange = function() {
			if(oXhr.readyState === 4) {
				if(oXhr.status === 200) {
					resolve(oXhr.responseText);
				} else {
					reject();
				}
			}
		}
	});
}
// 碰撞检测函数
function pz(obj1, obj2) {
	var
		iW1 = obj1.offsetWidth,
		iH1 = obj1.offsetHeight,
		iL1 = obj1.offsetLeft,
		iT1 = obj1.offsetTop,
		iW2 = obj2.offsetWidth,
		iH2 = obj2.offsetHeight,
		iL2 = obj2.offsetLeft,
		iT2 = obj2.offsetTop;
	if(iW1 + iL1 <= iL2 || iT1 + iH1 <= iT2 || iL2 + iW2 <= iL1 || iT2 + iH2 <= iT1) {
		return false;
	} else {
		return true;
	}
}
//投票通用js用于新开窗口
function voteOpenWin(url) {
	if(typeof url == "undefined" || url == "" || url == "0") {
		newWindow = window.open("", "vote_opener", "toolbar,resizable,scrollbars,dependent,width=640,height=520,left=150,top=80");
		newWindow.focus();
	} else {
		newWindow = window.open(url, "vote_opener", "toolbar,resizable,scrollbars,dependent,width=640,height=520,left=150,top=80");
		newWindow.focus();
	}
}

function lunbo(className) {

	//无缝轮播 需要在尾部添加一张图片（跟第一张一样的）
	this.box = document.getElementsByClassName(className)[0];
	this.ul = this.box.getElementsByClassName('item')[0];
	this.lis = this.ul.getElementsByTagName('li');
	this.page = this.box.getElementsByClassName('page')[0];
	this.pages = this.page.getElementsByTagName('li');
	this.imgsNum = this.lis.length;

	//轮播图当前页码
	this.pageNum = 0;

	this.rightBtn = document.getElementsByClassName('rightBtn')[0];
	this.leftBtn = document.getElementsByClassName('leftBtn')[0];

	//         	var lastLi = document.createElement('li');
	//         	var img = document.createElement('img');
	//         	img.src = lis[0].children[0].src;
	//         	lastLi.appendChild(img);
	//         	ul.appendChild(lastLi);
	var that = this;

	//无缝轮播需要在尾部添加一张图片
	this.addPic = function() {
		var lastLi = this.lis[0].cloneNode(true); //参数 true  复制整个节点
		this.ul.appendChild(lastLi);
	}

	this.addBtnEvent = function() {
		console.log(this); //轮播对象

		this.rightBtn.onclick = function() {
			console.log(that); //按钮
			that.pageNum++;
			that.play();

		}

		this.leftBtn.onclick = function() {

			that.pageNum--;
			that.play();

		}
	}

	this.addAutoPlay = function() {
		var timer1 = this.autoPlay();
		//停止自动播放
		this.box.onmouseenter = function() {
			clearInterval(timer1)
		}
		this.box.onmouseleave = function() {
			timer1 = that.autoPlay();
		}
	}

	//小圆点
	//pageNum

	this.pageEvent = function() {
		for(var i = 0; i < this.pages.length; i++) {
			this.pages[i].index = i;
			this.pages[i].onclick = function() {
				//this.index;
				that.pageNum = this.index;
				that.play();
			}
		}

	}

	//自动播放
	this.autoPlay = function() {
		var timer = setInterval(function() {
			that.pageNum++;
			that.play();
		}, 2000);
		return timer;
	}

	this.play = function() {
		if(this.pageNum == this.imgsNum + 1) {
			//瞬间改变  ul 的坐标
			this.ul.style.left = 0 + 'px';
			this.pageNum = 1;
		}
		if(this.pageNum == -1) {
			//瞬间改变  ul 的坐标
			this.ul.style.left = -590 * this.imgsNum + 'px';
			this.pageNum = this.imgsNum - 1;
		}

		animate(this.ul, {
			left: -590 * this.pageNum
		});

		for(var i = 0; i < this.pages.length; i++) {
			this.pages[i].style.background = 'red'
		}
		if(this.pageNum == this.imgsNum) {
			this.pages[0].style.background = 'white';
		} else {
			this.pages[this.pageNum].style.background = 'white';
		}

	}
	/*
	 * 
	 * 
	 * 
	 * 
	 */

	//init 初始化方法
	this.init = function() {
		console.log(this)
		this.addPic(); //
		this.pages[this.pageNum].style.background = 'white';
		this.addBtnEvent(); //
		this.addAutoPlay(); //自动播放
		this.pageEvent();

	}
	this.init();

}

/*
 * 
 * 
 * 
 * 
 */

function animate(ele, obj, callback) {

	clearInterval(ele.timer);

	var speed = 0;
	ele.timer = setInterval(function() {

		//width  
		//left 
		//opatciy
		var flag = true; //假设 已经到了目的地

		for(key in obj) {
			//			console.log(typeof key);
			var attr = key;
			//						var value = obj[key];
			var current = parseFloat(getComputedStyle(ele, null)[attr]);

			var target = obj[attr];

			if(attr == 'opacity') {
				//1.0   0.51111
				//100  50
				target = parseInt(target * 100);
				current = parseInt(current * 100);

				speed = (target - current) / 8;

			} else {
				speed = (target - current) / 8;
			}

			if(speed != 0) {
				flag = false;
			}
			if(attr == 'opacity') {
				if(speed > 0) {
					speed = Math.ceil(speed)
				} else {
					speed = Math.floor(speed);
				}
				ele.style[attr] = (current + speed) / 100;
			} else {
				//当speed 小于 0.5 就不会发生位移
				if(speed > 0) {
					speed = Math.ceil(speed)
				} else {
					speed = Math.floor(speed);
				}
				ele.style[attr] = current + speed + 'px';
			}
			//			console.log(current, target, speed);

		}
		//全都到达目的地 就停止定时器
		if(flag == true) {
			clearInterval(ele.timer);
			console.log('运动结束')

			if(callback) {
				callback();
			}

		}

	}, 50);
}

/*
 * 缓动动画封装（仅限于水平方向）
 * ele表示元素
 * target表示目标值
 */
function huandong(ele, target) {
	clearInterval(ele.timer);
	ele.timer = setInterval(function() {
		var step = (target - ele.offsetLeft) / 10;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		ele.style.left = ele.offsetLeft + step + "px";
		if(ele.offsetLeft == target) {
			clearInterval(ele.timer);
		}
	}, 30)
}

/*
 * 匀速运动封装（仅限于水平方向）
 * ele表示元素
 * target表示目标值
 */
function yunsu1(ele, target) {
	clearInterval(ele.timer);
	var speed = target > ele.offsetLeft ? 10 : -10;
	ele.timer = setInterval(function() {
		ele.style.left = ele.offsetLeft + speed + "px";
		if(Math.abs(target - ele.offsetLeft) <= Math.abs(speed)) {
			ele.style.left = target + "px";
			clearInterval(ele.timer);
		}
	}, 30)
}

/*
 * 页面滚动条跳转
 * target表示要滚动条要跳转到的目标值
 */
function toTop(target) {
	clearInterval(timer);
	timer = setInterval(function() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var step = (target - scrollTop) / 10;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		document.documentElement.scrollTop = document.body.scrollTop = scrollTop + step;
		if(Math.abs(target - scrollTop) <= Math.abs(step)) {
			document.documentElement.scrollTop = document.body.scrollTop = target;
			clearInterval(timer);
		}
	}, 30)
}

/*
 * 获取数组中的最小值的索引
 * arr表示数组
 */
function getMinIndex(arr) {
	var minVal = Math.min.apply(null, arr);
	var minIndex = arr.indexOf(minVal);
	return minIndex;
}

/*
 * 获取数组中的最大值的索引
 * arr表示数组
 */
function getMaxIndex(arr) {
	var maxVal = Math.max.apply(null, arr);
	var maxIndex = arr.indexOf(maxVal);
	return maxIndex;
}

/*
 * 获取当前标准格式的时间
 * 
 * 
 */
function formatDate() {
	var d, s;

	d = new Date();
	s = guodu(d.getFullYear()) + "-"; //取年份
	s = guodu(s + (d.getMonth()) + 1) + "-"; //取月份
	s += guodu(d.getDate()) + " "; //取日期
	s += guodu(d.getHours()) + ":"; //取小时
	s += guodu(d.getMinutes()) + ":"; //取分
	s += guodu(d.getSeconds()); //取秒

	return(s);

	function guodu(str) {
		if(str < 10) {
			str = "0" + str;
		}
		return str;
	} //消除一个数字现象
}

function randomColor() { //随机颜色
	var str = "0123456789abcdef";
	var color = "#";
	for(var i = 0; i < 6; i++) {
		var s1 = str.charAt(Math.floor(Math.random() * str.length));
		color += s1;
	}
	return color;

}
/*
 *随机验证码 
 * ele为要显示验证码的元素
 */
function randCode(ele) {
	var sStr = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	var sStr1 = "";
	for(i = 0; i < 4; i++) {

		var iKey = Math.floor(Math.random() * sStr.length);
		var sCode = sStr.charAt(iKey);
		sStr1 += sCode;

	}
	ele.innerHTML = sStr1;
}
/*
 * 随机图片验证码
 * ele为要显示验证码的元素
 * picWidth显示区域的宽度
 * picHeight显示区域的高度
 * cols 所有验证码图片的列数
 * rows 所有验证码图片的行数
 * left左边多出来的距离 （默认为2）
 * top上边多出来的距离（默认为-5）
 */
function randomCode(ele, picWidth, picHeight, cols, rows) {
	var x = 2 - parseInt(Math.random() * cols) * picWidth;
	var y = -5 - parseInt(Math.random() * rows) * picHeight;
	ele.style.background = "url(bj.jpg) no-repeat " + x + "px " + y + "px";
}

/*
 * 
 * 秒杀
 * ele为要显示秒杀的的元素
 * futuretime将来的某个时间，日期格式一定要完整！例如：miaosha(spans[1],'10-28-2017 18:00:00')
 */
function miaosha(ele, futuretime) {
	var num = setInterval(function() {
		var date1 = new Date();
		var date2 = new Date(futuretime);
		var time1 = date1.getTime();
		var time2 = date2.getTime();
		var time3 = Math.abs(time1 - time2);
		var day = parseInt(time3 / 1000 / 3600 / 24)
		var shi = parseInt(time3 / 1000 / 3600 % 24);
		var fen = parseInt(time3 / 1000 / 60 % 60);
		var miao = parseInt(time3 / 1000 % 60);
		var hm = parseInt(time3 % 1000);
		ele.innerHTML = guodu(day) + "天" + guodu(shi) + "时" + guodu(fen) + "分" + guodu(miao) + "秒" + guodu(hm) + "毫秒";
		var num1 = day + shi + fen + miao + hm
		if(num1 == 0) {
			ele.innerHTML = "该还款了!"
			clearInterval(num);
		}
	}, 1);

}
/*
 * 
 * 深拷贝
 */
function deepCopy(obj) {
	if(typeof obj == "object") {
		if(Array.isArray(obj)) {
			var newObj = [];
		} else {
			var newObj = {};
		}
		for(var i in obj) {
			if(typeof obj[i] == "object") {
				newObj[i] = deepCopy(obj[i]);
			} else {
				newObj[i] = obj[i];
			}
		}
		return newObj;
	}
	return obj;

}
/*function deepCopy(o,c){
					    var c = c || {}
					    for(var i in o){
					        if(typeof o[i] === 'object'){
					  	   	   	  //要考虑深复制问题了
				                    if(o[i].constructor === Array){
				                    	//这是数组
				                    	c[i] =[]
				                    }else{
				                    	//这是对象
				                    	c[i] = {}
				                    }
				                    deepCopy(o[i],c[i])
					  	   	   }else{
					  	   	   	 c[i] = o[i]
					  	   	}
					  	}
					  	   return c
					  }*/

//http://www.baidu.com?username=john&age=20
//var data = {"username":"john","age":20}
/**
	type  请求类型， 值为 get、post
	url   请求地址
	data  往后台发送的数据 数据类型为对象或者字符串
	// 字符串格式：a=b&c=d&e=f
	// 对象格式：{a:b,c:d,e:f}
	fn    回调函数
	async 是否为异步， 默认值为true
*/
function Ajax(type, url, data, fnSuc, fnFail) {
	var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	var str = "";
	for(var i in data) {
		str += i + "=" + data[i] + "&";
	}
	str = str.replace(/&$/, "");

	if(type.toUpperCase() == "GET") {
		xhr.open("GET", url + "?" + str, true);
		xhr.send();
	} else {
		xhr.open("POST", url, true);
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhr.send(str);
	}
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				if(fnSuc) {
					var data = xhr.responseText;
					fnSuc(data);
				}
			} else {
				if(fnFail) {
					fnFail();
				}
			}
		}
	}
}

/*function Ajax(url,fn){ //fn称为回调函数-》foo和bar是回调函数
	var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	console.log(xhr.readyState);
	xhr.open("GET",url,true);
	console.log(xhr.readyState);
	
	xhr.send();
	console.log(xhr.readyState);
	
	xhr.onreadystatechange = function(){
	console.log(xhr.readyState);
		
		if(xhr.status== 200 && xhr.readyState == 4){
			var data = xhr.responseText;
			if(fn){
				fn(data);
			}

		}
	}
}*/