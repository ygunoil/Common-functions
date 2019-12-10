    //修改地址栏参数
Common.prototype.changeQueryString =function (arg,arg_val){
          var url = window.location.href
           var pattern=arg+'=([^&]*)';
           var replaceText=arg+'='+arg_val;
          if(url.match(pattern)){
            var tmp='/('+ arg+'=)([^&]*)/gi';
                   tmp=url.replace(eval(tmp),replaceText);
                   return tmp;
               }else{
                  if(url.match('[\?]')){
                            return url+'&'+replaceText;
                        }else{
                           return url+'?'+replaceText;
                        }
             }
    }
