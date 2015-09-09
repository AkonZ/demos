/**
 * @file 文件说明
 * @author XieZhendong
 * @date 15/8/25
 */
(function(){
    var EU = {};

    //跨浏览器的事件处理程序
    //绑定事件
    EU.addHandler = function(element,type,handler){
        //DOM2级事件处理，IE9也支持
        if(element.addEventListener){
            element.addEventListener(type,handler,false);//IE8以下只支持事件冒泡,保持一致
        }
        //IE事件处理
        else if(element.attachEvent){
            element.attachEvent('on' + type,handler);//type加'on',兼容IE8及以下
        }
        //DOM0级事件处理
        else{
            element['on' + type] = handler;
        }
    };

    //必须与绑定事件时的Handler完全相同
    EU.removeHandler = function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler);
        }
        else if(element.attachEvent){
           element.detachEvent('on' + type,handler);
        }
        else{
            element['on' + type] = null;
        }
    };


    //事件对象
    EU.getEvent = function(event){
        return event || window.event;
    }

    //目标对象
    EU.addTarget = function(event){
        return event.target || event.srcElement;
    }

    //阻止默认事件
    EU.preventDefault = function(event){
        if(event.preventDefault){
            event.preventDefault();
        }
        else{
            event.returnValue = false; //默认为true
        }
    }

    //阻止事件传播
    EU.stopPropagation = function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }
        else{
            event.cancelBubble = true;//默认为false
        }
    }
    window.EventUtil = EU;
})();