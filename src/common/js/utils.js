/**
 * created by wujiayu on 2017.10.9
 * 自定义工具类库,包括vux的弹框封装、storage方法封装、校验函数和其他常用的函数
 */
import _ from 'underscore'
import Vue from 'vue'

var utils = {
    /**    
     * 文字提示框
     * @param text   提示文字（string）
     * @param time   展示时间（ms）
     * @param width  弹框宽度（string）
     */
    toast(text, time, width) {
        Vue.$vux.toast.show({
            type: 'text',
            text: text || '',
            time: time || 2500,
            width: width || 'auto'
        });
    },
    /* 隐藏文字弹框 */
    hideToast() {
        Vue.$vux.toast.hide();
    },

    /**
     * alert弹出框
     * @param obj 对象类型
     * @param obj.title        弹窗标题（string）
     * @param obj.content      弹窗内容（string or htmlstring）
     * @param obj.onShow       取消回调函数（function）
     * @param obj.onHide       确定回调函数（function）
     */
    alert(obj={}) {
        Vue.$vux.alert.show({
            title: obj.title || '',
            content: obj.content || '',
            onShow() {
                obj.onShow && obj.onShow();
            },
            onHide() {
                obj.onHide && obj.onHide();
            }
        });
    }, 
    /* 隐藏alert弹框 */   
    hideAlert() {
        Vue.$vux.alert.hide();
    },

    /**      
     * confirm弹框
     * @param obj 对象类型
     * @param obj.title           弹窗标题（string）
     * @param obj.content         弹窗内容（string or htmlstring）
     * @param obj.onCancel        取消回调函数（function）
     * @param obj.onConfirm       确定回调函数（function）
     */ 
    confirm(obj={}) {
        Vue.$vux.confirm.show({
            title: obj.title || '',
            content: obj.content || '',
            onCancel() {
                obj.onCancel && obj.onCancel();
            },
            onConfirm() {                
                obj.onConfirm && obj.onConfirm();
            }
        });
    },
    /* 隐藏confirm弹框 */
    hideConfirm() {
        Vue.$vux.confirm.hide();
    },

    /**
     * 加载框
     * @param text 提示文字(string)
     */
    loading(text) {
        Vue.$vux.loading.show({
            text: text || '加载中'
        });
    },
    /* 隐藏loading加载框 */
    hideLoading() {
        Vue.$vux.loading.hide();
    },
    
    /**
     * 日期选择器
     * @param obj 对象类型
     * @param obj.format     日期格式（string YYYY-MM-DD HH:mm:ss）
     * @param obj.value      默认值（string 如'2017-02-12'）
     * @param obj.title      标题（string）
     * @param obj.startDate  开始日期（string）
     * @param obj.endDate    结束日期（string）
     * @param obj.onConfirm  确定回调函数（function）
     * @param obj.onShow     显示弹框回调函数（function）
     * @param obj.onHide     隐藏弹框函调函数（function）
     */
    showDateTime(obj={}) {
        Vue.$vux.datetime.show({
            format: obj.format || 'YYYY-MM-DD',
            title: obj.title || '',
            value: obj.value || '',  
            startDate: obj.startDate || '1949-01-01',
            endDate: obj.endDate || '2100-01-01',       
            confirmText: '确定',
            cancelText: '取消',
            onConfirm(val) {                
                obj.onConfirm && obj.onConfirm(val);
            },
            onShow() {
                obj.onShow && obj.onShow();
            },
            onHide() {
                obj.onHide && obj.onHide();
            }
        });
    },
    /* 隐藏日期弹出框 */
    hideDateTime() {
        Vue.$vux.datetime.hide();
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