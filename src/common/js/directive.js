import Vue from 'vue'

/*输入框自动获得焦点*/
Vue.directive('focus', {
    inserted(el) {
        el.focus()
    }
});

/* 普通点击效果,支持传递点击后的背景色 */
Vue.directive('touch', {
    inserted(el, binding) {
        var currentColor = $(el).css('background-color');
        var activeColor = binding.value || '#FFF8DC';
        el.addEventListener("touchstart", function () {
            $(el).css('background-color', activeColor);
        }, false);
        el.addEventListener("touchend", function () {            
            $(el).css('background-color', currentColor);
        }, false);
        el.addEventListener("touchmove", function () {            
            $(el).css('background-color', currentColor);
        }, false);
        el.addEventListener("touchcancel", function () {            
            $(el).css('background-color', currentColor);
        }, false);
    }
});

/* 按钮点击效果 */
Vue.directive('btntouch', {
    inserted(el) {
        var view = el;
        view.addEventListener("touchstart", function () {
            $(view).addClass("btn-touch-on");
        }, false);
        view.addEventListener("touchend", function () {
            $(view).removeClass("btn-touch-on");
        }, false);
        view.addEventListener("touchmove", function () {
            $(view).removeClass("btn-touch-on");
        }, false);
        view.addEventListener("touchcancel", function () {
            $(view).removeClass("btn-touch-on");
        }, false);
    }
});

/* %字体大小比前面的数字小 */
Vue.directive('percent', {
    bind(el, binding) {
        var val = el.innerText;
        var newVal = (parseFloat(val)*100).toFixed(2);
        var fontSize = binding.value ? binding.value : '14';
        $(el).html(`${newVal}<span style='font-size:${fontSize}px'>%<span>`);
    }
});

/* 小数点后两位字体小 */
Vue.directive('fixed2small', {
    bind(el, binding) {
        var val = el.innerText, t = "";
        val = parseFloat((val + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
        var l = val.split(".")[0].split("").reverse(),
            r = val.split(".")[1];
        
        for (let i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        var intVal = t.split("").reverse().join("");

        var fontSize = binding.value ? binding.value : '12';
        $(el).html(`<span>${intVal}.<span style="font-size:${fontSize}px">${r}</span></span>`);
    }
});
