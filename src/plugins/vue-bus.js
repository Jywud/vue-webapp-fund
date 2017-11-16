/* vue事件总线插件 by wujiayu*/
var install = function (Vue) {
    var Bus = new Vue({
        methods: {
            emit(event, params, callback) {
                this.$emit(event, params, callback);
            },
            on(event, callback) {
                this.$on(event, callback);
            },
            off(event, callback) {
                this.$off(event, callback);
            }
        }
    });
    Vue.prototype.$bus = Bus;
};

export default install;

/* =====实例====== */
// this.$bus.emit('testBus', { name: '小明', age: 22 }, function (params) {
//     console.log(params);
// });  
// this.$bus.on('testBus', function (data, fn) {
//     console.log(data);
//     fn && fn('aaaa');
// });
