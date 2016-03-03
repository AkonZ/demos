/**
 * @file 文件说明
 * @author XieZhendong
 * @date 15/11/2
 */
(function () {
    var EU = {};

    EU.addHandler = function (element, type, handler) {
        //DOM2级事件处理，IE9也支持
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        else if (element.attachEvent) {
            //type加'on'
            //IE9也可以这样绑定
            element.attachEvent('on' + type, handler);
        }
        //DOM0级事件处理步，事件流也是冒泡
        else {
            element['on' + type] = handler;
        }
    };

    EU.removeHandler = function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler);
        }
        else if (element.attachEvent) {
            element.detachEvent('on' + type, handler);
        }
        else {
            //属性置空就可以
            element['on' + type] = null;
        }
    };

    EU.getEvent = function (event) {
        return event || window.event;
    }

    EU.addTarget = function (event) {
        return event.target || event.srcElement;
    }

    EU.preventDefault = function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        //IE下处理
        else {
            event.returnValue = false; //默认为true
        }
    }

    EU.stopPropagation = function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        //IE下处理
        else {
            event.cancelBubble = true;//默认为false，注意区分于returnValue
        }
    }

    window.EventUtil = EU;
})();