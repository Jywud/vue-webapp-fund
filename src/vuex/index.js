/**
 * 组件状态管理 by wujiayu 官网地址https://vuex.vuejs.org/zh-cn/
 */
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {        
        jumpDirection: "-1"     //0:后退，1：前进, -1回到首页
    },
    getters: {
        
    },
    mutations: {        
        setJumpDirection(state, type){
            state.jumpDirection = type;
        }
    },
    actions: {        
        setJumpDirection({commit}, data) {
            commit("setJumpDirection", data);
        }
    }
});
