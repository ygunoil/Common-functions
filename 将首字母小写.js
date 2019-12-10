//将首字母小写
Common.prototype.replaceStr = function (str) {
        var strTemp = ""; //新字符串
        for(var i = 0; i < str.length; i++) {
            if(i == 0) {
                strTemp += str[i].toLowerCase(); //第一个
                continue;
            }
            if(str[i] == " " && i < str.length - 1) { //空格后
                strTemp +=     " ";
                strTemp += str[i + 1].toLowerCase();
                i++;
                continue;
            }
            strTemp += str[i];
        }


        return strTemp;
}
