/**
 * 全局扩展方法
 */ 
(function () {
    /**数组删除指定坐标的元素**/
    Array.prototype.remove = function (dx) {
        if (isNaN(dx) || dx > this.length) {
            return false;
        }
        for (var i = 0, n = 0; i < this.length; i++) {
            if (this[i] != this[dx]) {
                this[n++] = this[i]
            }
        }
        this.length -= 1
    };
    /**数组删除指定元素**/
    Array.prototype.removeObj = function (obj) {
        if (obj) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == obj) {
                    this.remove(i)
                }
            }
        }
    };
    /**判断数组是否包含某元素**/
    Array.prototype.contains = function (obj) {
        for (var i in this) {
            if (this[i] == obj) {
                return true;
            }
        }
        return false;
    }    

})();
