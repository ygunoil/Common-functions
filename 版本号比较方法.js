// 版本号比较方法,前者大则返回1,相等返回0,后者大返回-1
Common.prototype.compareVersion = function (curV, reqV) {
  if (curV && reqV) {
    //将两个版本号拆成数字  
    var arr1 = curV.split('.'),
      arr2 = reqV.split('.');
    var minLength = Math.min(arr1.length, arr2.length),
      position = 0;
    //依次比较版本号每一位大小，当对比得出结果后跳出循环
    while (position < minLength) {
      var arr1p = parseInt(arr1[position]);
      var arr2p = parseInt(arr2[position]);
      if (isNaN(arr1p) || isNaN(arr2p))
        return 2;
      if (arr1p - arr2p > 0) {
        return 1;
      } else if (arr1p - arr2p < 0) {
        return -1;
      }
      position++;
    }
    //若curV大于reqV，则返回1  
    if (arr1.length > arr2.length) {
      return 1;
    } else if (arr1.length == arr2.length) {
      return 0;
    } else {
      return -1;
    }
  } else {
    //输入为空
    return 2;
  }
}
