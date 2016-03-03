/**
 * @file 文件说明
 * @author XieZhendong
 * @date 15/11/2
 */

;(function(){
    var DU = {};

    DU.hasClass = function(element,clazz){
        clazz = Util.trim(clazz);
        return element.className.indexOf(clazz) >= 0;
    }

    DU.addClass = function(element,clazz){
        clazz = Util.trim(clazz);
        var list = clazz.split(/\s+/),
            len = list.length,
            className = element.className;
        list.forEach(function(v){
            if(!DU.hasClass(element,v))
                className += ' ' + v;
        });
    }

    DU.removeClass = function(element,clazz){
        clazz = Util.trim(clazz);
        var list = clazz.split(/\s+/),
            len = list.length,
            className = element.className;
        list.forEach(function(v){
            if(DU.hasClass(element,v))
                className.replace(new RegExp('^' + v +'$'),' ');
        });
    }

    window.DomUtil =  DU;
})();
