/**
 * @file 文件说明
 * @author XieZhendong
 * @date 15/9/18
 */
(function ($) {
    var Index = transfar.Base.extend({
        initialize: function () {
            this.data = {
                userInfo: {
                    name: '12344'
                }
            };
            this.$el.ngRender(this.data)
            this.bind('test',function(){
                alert('test');
            })
        }
    });

    var demo = new Index({
        $el: $('#body')
    });

    demo.trigger('test');
})(jQuery);