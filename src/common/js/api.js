import _ from 'underscore'

/*ajax请求对象*/
var ajaxObj = '';

/*公用请求函数*/
function execute(url, params, type) {    
    params = params || {};
    params = _.extend(params, {
        user_token: '',
        op_entrust_way: '',
        op_station: ''
    });

    return new Promise((resove, reject) => {
        ajaxObj = $.ajax({
            type: type || 'post',
            url: config_base_url + url,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            dataType: "json",
            timeout: 10000,
            data: params,
            beforeSend() { 

            },
            success(res) {
            	resove(res);
            },
            error(err) {
                reject("error");
            },
            complete() {

            }
        });
    });
}

var API = {
    /*终止当前请求*/
    abortAjax() {
        ajaxObj.abort(); 
    },
    getSysConfig(params) {
        return execute('hsobm/v2/getSysConfig', params);
    }
};

export default API;