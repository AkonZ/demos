/**
 * @file 文件说明
 * @author XieZhendong
 * @date 15/11/2
 */
;(function(){
    var U = {};
    U.requireJs = function(arr){
        var str = ''
        arr.forEach(function(v){
            str += '<script src="' + v + '.js" ></script>'
        });
        document.write(str);
    };

    U.trim = function(str){
         return str.replace(/(^\s+)|(\s+$)/g,'');
    }

    window.Util = U;
})();

Util.requireJs([
    '/demos/common/js/jsDomUtil',
    '/demos/common/js/jsEventUtil'
]);