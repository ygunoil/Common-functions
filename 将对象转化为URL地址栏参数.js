//将对象转化为URL地址栏参数
Common.prototype.toQueryString = function (obj) {
  var ret = [];
  for (var key in obj) {
    key = encodeURIComponent(key);
    var values = obj[key];
    if (values && values.constructor == Array) {//数组 
      var queryValues = [];
      for (var i = 0, len = values.length, value; i < len; i++) {
        value = values[i];
        queryValues.push(Common.prototype.toQueryPair(key, value));
      }
      ret = ret.concat(queryValues);
    } else {                                    //字符串 
      ret.push(Common.prototype.toQueryPair(key, values));
    }
  }
  return ret.join('&');
}
