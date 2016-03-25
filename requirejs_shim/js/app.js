require.config({
    baseUrl: "./js",
    paths:{
        'jquery': "jquery",
        'log': 'log'
    },
    shim:{
        'log':{
            deps: ['jquery'],
            exports: 'writeLog'
        }
    }
});

require(['jquery','log'], function ($,logx) {
    logx.writeLog('测试测试！！！');
});
