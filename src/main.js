/**
 * 程序入口
 */
import Vue from 'vue'                       //vue对象
import App from './App'                     //最顶层的vue对象
import router from './router'               //vue-router 
import store from './vuex'                  //vue状态管理
import VueBus from './plugins/vue-bus'      //vue事件总线插件
import fastClick from 'fastclick'           //解决移动端click延迟库
import api from './common/js/api'           //网络请求
import $ from 'n-zepto'                     //模块化的zepto

import './common/js/rsa'                    //加密库
import './common/js/componentInit'          //vue全局组件和vue第三方插件初始化
import './common/js/filter'                 //vue全局过滤器
import './common/js/directive'              //vue自定义指令
import './common/js/global'                 //定义全局方法和原生方法的扩展


/*导入样式文件*/
import './common/style/base.less'           //基础样式
import './common/style/animate.css'         //第三方动画库
import './common/style/m-animate.less'      //自定义动画库
import './assets/iconfont/iconfont.css'     //字体库文件
import './assets/iconfont/iconfont.js'      //字体库svg文件
 
/**
 * http请求注入vue实例
 * 使用vue插件
 * 使用fastClick
 */
Vue.use(VueBus);
Vue.prototype.$http = api;
Vue.config.productionTip = false;
fastClick.attach(document.body);

/**
 * 封装路由方法
 * 封装自定义弹出组件方法
 * 历史记录回退监听
 */
(function (win) {    
    /* 监听历史记录回退，包含物理返回键 */
    window.addEventListener('popstate', function (e) {        
        store.dispatch('setJumpDirection', "0");
    }, false);

    /* 全局APP对象 */
    var app = {
        /**打开新页面**/
        openWin(url, data) {
            store.dispatch('setJumpDirection', "1");
            if (data) {
                router.push({
                    path: url,
                    query: data
                });
            } else {
                router.push(url);
            }            
        },
        /**关闭并跳转到指定页面**/
        closeTo(url, data){
            store.dispatch('setJumpDirection', "0");
            if (data) {
                router.push({
                    path: url,
                    query: data
                });
            } else {
                router.push(url);
            }
        },
        /**关闭当前页面**/
        closeWin(){
            store.dispatch('setJumpDirection', "0");
            history.back();
        },
        /**显示弹窗页面**/
        openPopWin(name, callback, params){
            this.app[name].status = true;
            this.app[name].params = params;
            this.app[name].callback = callback;
        },
        /**隐藏弹窗页面**/
        closePopWin(name){
            this.app[name].status = false;
        },
        /**弹窗回调事件**/
        callbackPopWin(name, data){
            this.app[name].callback(data);
        },
        /**初始化全局app实例**/
        init(app){
            this.app = app;
        }
    };

    /* 赋值全局 */
    win.APP = win.APP || {};
    Object.assign(win.APP, app);
})(window);

/*初始化顶级vue实例*/
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});
