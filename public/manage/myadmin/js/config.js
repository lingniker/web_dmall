// (function(){
// var url = "http://140.143.25.27:8080/";
// var url = "http://192.168.1.115:8080/";
var url = "http://192.168.1.108:8080/";
var mykey = "afafda7193c3787f899217b5b09d4a9e";
// var url = "http://47.105.54.146:8080/";
// var mykey = "union_supermarket_2018";
console.log("config1");
var tokenFlag = sessionStorage.access_token == undefined ||sessionStorage.access_token == "undefined";
if(tokenFlag){
    location.href="login.html";
    console.log("跳转2");
};


//退出登陆按钮
$(".back-login").on("click",function(){
    sessionStorage.access_token = undefined;
    location.href="login.html";
});

/*
*对象key值排序
*@paremet 对象
*/
function srotKeyObj(obj){
    var arr = [];
    var newobj = {};
    for(var key in obj){
        arr.push(key);
    }
    arr.sort();
    var i=0;
    for(var key in obj){
        newobj[arr[i]] = obj[arr[i]];
        i++;
    };
    return newobj;
};
/*
*加密获取签名
*@paramet 对象
*/
function objmd5(obj){
    var str = '';
    for(var key in obj){
        str +=  key +"="+ obj[key] + "&";
    }
    var newstr = str.substr(0,str.length-1);
    var encodeStr = encodeURIComponent(newstr) + mykey;
    encodeStr = encodeStr.replace(/\(/g,'%28');
    encodeStr = encodeStr.replace(/\)/g,'%29');
    var sign = md5(encodeStr);
    newstr += "&sign=" + sign;
    return newstr;
};

// })();