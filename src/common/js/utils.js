/*工具类*/
import _ from 'underscore'
import Vue from 'vue'

var utils = {
    showToast() {
        /* Vue.$vux.alert.show({            
            content: 'Do you agree?'
        }) */
        Vue.$vux.confirm.show({
            // 组件除show外的属性
            content: '我当麻溜的沙隆达色舒服舒服水电费水电费水电费水电费是否是否',
            onCancel() {
                
            },
            onConfirm() { }
        });
    },
    /* sessionStorage-setItem */
    setData(key, data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    },
    /* sessionStorage-getItem */
    getData(key) {
        return JSON.parse(sessionStorage.getItem(key) || '""');
    },
    /* 路由跳转携带数据 */
    setRouterData(data) {
        this.setData('prePageData', data);
    },
    /* 获取路由携带数据 */
    getRouterData() {
        var rouerData = this.getData('prePageData');
        // this.removeData('prePageData');
        return rouerData;
    },
    /* 公用页面的下一个路由地址对象,页面的id为key，下一个路由为value*/
    setCommonRouter(data) {
        this.setData('commonRouter', data);
    },
    /* 获取公用页面的下一个路由地址 */
    getCommonRouter(id) {
        var rouerData = this.getData('commonRouter');
        // this.removeData('commonRouter');
        return rouerData[id] || '/home'; //返回下一个路由地址
    },
    /* sessionStorage-removeItem */
    removeData(key) {
        sessionStorage.removeItem(key);
    },
    /* sessionStorage-clear */
    clear() {
        sessionStorage.clear();
    },
    /* 处理日涨幅展示 */
    showDailyIncreases(val) {
        var newVal = (parseFloat(val) * 100).toFixed(2);
        return parseFloat(newVal) >= 0 ? '+'+newVal+'%' : newVal+'%';
    },
    /* 获取uuid */
    uuidMaker(len, radix) {
        len = len || 16;
        radix = radix || 16;
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [],
            i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    },
    /* 校验手机 */    
    checkMobile(val) {
        return /^((13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8})$/.test(val);
    },
    /* 校验6位数字 */    
    check6Num(val) {
        return /\d{6}/.test(val);
    },
    /* 校验身份证 */
    checkIdcardNo(val) {
        return /^\d{15}(\d{2}(\d|x))?$/i.test(val);
    },
    /* 校验邮箱地址 */
    checkMail(val) {
        return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(val);
    }
}

export default utils