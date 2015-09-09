/**
 * @file 文件说明
 * @author XieZhendong
 * @date 15/9/8
 */
require.config({
   paths: {
       "CS": "page/myconsole"
   },
   shim: {
       'CS':{
           deps: ['jquery'],
           exports: '_CS'
       }
   }
});
define(['jquery','CS'],function($,c){
    var getInfo = function(){
        var settings = { validate: false, limit: 5, name: "foo" };
        var options = { validate: true, name: "bar" };
        cs($.extend(settings, options));
        //c.cs($.extend(settings, options));
        console.log(_CS);
    };
    return {
        getInfo: getInfo
    }
})