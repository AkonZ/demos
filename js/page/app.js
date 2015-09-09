/**
 * @file 文件说明
 * @author XieZhendong
 * @date 15/9/8
 */


//循环依赖
//
require.config({
    baseUrl: "../js",
    paths:{
        "jquery": "jquery",
        "text": "text",
        "upper": "upper",
        "test": "page/test"
    }
});

require(["jquery","text!data.txt","test"],function($,data,test){
    //console.log(data);
    test.getInfo();
});