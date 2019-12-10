import {Toast} from 'mint-ui'

export const checkRules = function (obj, rules) {
  let errormessage
  let flag = true
  for (let i in obj) {
    for (let j in rules) {
      if (i === j) {
        for (let m in rules[j]) {
          let val = rules[j][m]
          for (let check in val) {
            if (check === 'required') {
              if (obj[i] === '') {
                errormessage = val.message
                flag = false
                return showError(errormessage)
              }
            } else if (check === 'minlength') {
              if (obj[i].length < val[check]) {
                errormessage = val.message
                flag = false
                return showError(errormessage)
              }
            } else if (check === 'maxlength') {
              if (obj[i].length > val[check]) {
                errormessage = val.message
                flag = false
                return showError(errormessage)
              }
            } else if (check === 'checked') {
              if (typeof (val[check]) !== 'string') {
                for (let v of val[check]) {
                  if ((!new RegExp(v).test(obj[i]))) {
                    errormessage = val.message
                    flag = false
                    return showError(errormessage)
                  }
                }
              } else {
                if ((!new RegExp(val[check]).test(obj[i]))) {
                  errormessage = val.message
                  flag = false
                  return showError(errormessage)
                }
              }
            }
          }
        }
      }
    }
  }

  function showError(msg) {
    Toast({
      message: msg,
      position: 'top'
    })
    return flag
  }

  return flag
}

export const parseQueryString = function () {
  let url = location.search
  let theRequest = {}
  if (url.indexOf('?') !== -1) {
    let str = url.substr(1)
    let strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1])
    }
  }
  return theRequest
}
export const dateFormat = function (obj, fmt) {
  if (obj && obj.constructor === Date) {
    let o = {
      "M+": obj.getMonth() + 1,                 //月份
      "d+": obj.getDate(),                    //日
      "h+": obj.getHours(),                   //小时
      "m+": obj.getMinutes(),                 //分
      "s+": obj.getSeconds(),                 //秒
      "q+": Math.floor((obj.getMonth() + 3) / 3), //季度
      "S": obj.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (obj.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
}

export const uploadPic = function (event, uploadCallBack) {
  // 全局对象，不同function使用传递数据
  const imgFile = {};
  function handleInputChange (event) {
    // 获取当前选中的文件
    const file = event.target.files[0];
    const imgMasSize = 1024 * 1024 * 1; // 10MB

    // 检查文件类型
    if(['jpeg', 'png', 'gif', 'jpg'].indexOf(file.type.split("/")[1]) < 0){
      // 自定义报错方式
      Toast(
        {
          message: "文件类型仅支持 jpeg/png/gif！",
          position: 'top'
        }
      )
      return;
    }

    // 文件大小限制
    if(file.size > imgMasSize ) {
      // 文件大小自定义限制
      // Toast.error("文件大小不能超过10MB！", 2000, undefined, false);
      Toast(
        {
          message: `文件大小不能超过${imgMasSize}MB!`,
          position: 'top'
        }
      )
      return;
    }

    // 判断是否是ios
    if(!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
      // iOS
      transformFileToFormData(file);
      return;
    }

    // 图片压缩之旅
    transformFileToDataUrl(file);
  }
// 将File append进 FormData
  function transformFileToFormData (file) {
    const formData = new FormData();
    // 自定义formData中的内容
    // type
    formData.append('type', file.type);
    // size
    formData.append('size', file.size || "image/jpeg");
    // name
    formData.append('name', file.name);
    // lastModifiedDate
    formData.append('lastModifiedDate', file.lastModifiedDate);
    // append 文件
    formData.append('file', file);
    // 上传图片
    uploadCallBack(formData);
  }
// 将file转成dataUrl
  function transformFileToDataUrl (file) {
    const imgCompassMaxSize = 200 * 1024; // 超过 200k 就压缩

    // 存储文件相关信息
    imgFile.type = file.type || 'image/jpeg'; // 部分安卓出现获取不到type的情况
    imgFile.size = file.size;
    imgFile.name = file.name;
    imgFile.lastModifiedDate = file.lastModifiedDate;

    // 封装好的函数
    const reader = new FileReader();

    // file转dataUrl是个异步函数，要将代码写在回调里
    reader.onload = function(e) {
      const result = e.target.result;

      if(result.length < imgCompassMaxSize) {
        compress(result, processData, false );    // 图片不压缩
      } else {
        compress(result, processData);            // 图片压缩
      }
    };

    reader.readAsDataURL(file);
  }
// 使用canvas绘制图片并压缩
  function compress (dataURL, callback, shouldCompress = true) {
    const img = new window.Image();

    img.src = dataURL;

    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      let compressedDataUrl;

      if(shouldCompress){
        compressedDataUrl = canvas.toDataURL(imgFile.type, 0.2);
      } else {
        compressedDataUrl = canvas.toDataURL(imgFile.type, 1);
      }

      callback(compressedDataUrl);
    }
  }

  function processData (dataURL) {
    // 这里使用二进制方式处理dataUrl
    const binaryString = window.atob(dataUrl.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const intArray = new Uint8Array(arrayBuffer);
    const imgFile = this.imgFile;

    for (let i = 0, j = binaryString.length; i < j; i++) {
      intArray[i] = binaryString.charCodeAt(i);
    }

    const data = [intArray];

    let blob;

    try {
      blob = new Blob(data, { type: imgFile.type });
    } catch (error) {
      window.BlobBuilder = window.BlobBuilder ||
        window.WebKitBlobBuilder ||
        window.MozBlobBuilder ||
        window.MSBlobBuilder;
      if (error.name === 'TypeError' && window.BlobBuilder){
        const builder = new BlobBuilder();
        builder.append(arrayBuffer);
        blob = builder.getBlob(imgFile.type);
      } else {
        // Toast.error("版本过低，不支持上传图片", 2000, undefined, false);
        Toast(
          {
            message: `版本过低，不支持上传图片`,
            position: 'top'
          }
        )
        throw new Error('版本过低，不支持上传图片');
      }
    }

    // blob 转file
    const fileOfBlob = new File([blob], imgFile.name);
    const formData = new FormData();

    // type
    formData.append('type', imgFile.type);
    // size
    formData.append('size', fileOfBlob.size);
    // name
    formData.append('name', imgFile.name);
    // lastModifiedDate
    formData.append('lastModifiedDate', imgFile.lastModifiedDate);
    // append 文件
    formData.append('picture', fileOfBlob);

    uploadCallBack(formData);
  }
}

export const getWeekTime = function (...ang) {

    if(ang[0].length<1){
        console.log("getWeekTime 没有传递参数,getWeekTime 无法运行");
        return
    }
    if(!isNaN(ang[0]+1)){
        ang[0]=Number(ang[0]);
        let num=1000*60*60*24*(ang[0]); // 一天的时间戳
        let otuTime=(new Date()/1) + num;
        let unxTime=Number(new Date(otuTime));
        return js_date_time(unxTime);
    }else {
        console.log("getWeekTime 第一个参数必须填写数值 正整数,getWeekTime 无法运行");
        return "2020-10-10"
    }

}




function js_date_time (unixtime,str) {//格式化时间戳 借用下面的函数
    var timestr = new Date(parseInt(unixtime));
    var datetime = date_format(timestr, 'yyyy-MM-dd');//时间全格式
    if(str){
        var datetime = this.date_format(timestr, str);//时间全格式
    }
    return datetime;
}

function date_format(date, format) {
    var o = {
        "M+": date.getMonth() + 1, //month
        "d+": date.getDate(), //day
        "h+": date.getHours(), //hour
        "m+": date.getMinutes(), //minute
        "s+": date.getSeconds(), //second
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
        "S": date.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}















function  js_strto_time (str_time,reg) {//把年月日转为时间戳 js_strto_time('2017-10-10') => 1507564800
    var reg=reg||'-'; //默认使用'-'为分隔符
    var new_str = str_time.replace(/:/g, reg);
    new_str = new_str.replace(/ /g, reg);
    var arr = new_str.split(reg);
    var strtotime = 0;
    var datum = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] ||'0', arr[4]||'0', arr[5]||'0'));
    if (datum != null && typeof datum != 'undefined') {
        strtotime = datum.getTime() / 1000;
    }
    return strtotime;
}

function c() {  //简写console.log(); 和本页面功能无关
    var str='console.log(',reag,_argumentsleng=arguments.length;
    for (var  i= 0;i<_argumentsleng;i++){
        (i+1) == _argumentsleng ? reag='':reag=',';
        str += 'arguments['+i+']' + reag;
    }
    str+=')';
    return eval(str);
}















