<style>
    #app {
        position: relative;
        height: 100%;
    }
</style>
<template>
    <div id="app">
        <!-- 主界面部分 -->
        <transition :name="getJumpAnima()">
            <router-view></router-view>
        </transition>
        <!-- 密码校验弹出层 -->
        <password-view v-if="passwordView.status" :params="passwordView.params"></password-view>
    </div>
</template>
<script>
    /* 页面过渡动画类对象 */
    const directionObj = {
        '-1': 'jumphome',
        '0': 'jumpback',
        '1': 'jumpgo'
    }
    export default {
        name: 'app',
        mounted() {
            APP.init(this);            
        },
        data() {
            return {
                passwordView: {
                    status: false,
                    params: {},
                    callback: {}
                }
            }
        },
        methods: {
            /**动态设置路由过渡动画**/
            getJumpAnima(){                
                return directionObj[this.$store.state.jumpDirection];                
            }
        }
    }
</script>