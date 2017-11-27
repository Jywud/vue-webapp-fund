<template>
    <div class="hs-emptyView">
        <div v-if="!needLogin" class="empty-main">
            <span class="iconfont img" :class="icon"></span>
            <span class="mess">{{message}}</span>
        </div>
        <div v-else class="empty-nologin">
            <div class="empty-login">登录后查看</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'hs-emptyView',
        data() {
            return {}
        },
        methods: {},
        props: {
            /* 提示文字 */
            message: {
                type: String,
                default: "暂无数据"
            },
            icon: {
                type: String,
                default: "icon-nodata"
            },
            /* 是否需要登录 */
            needLogin: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";

    .hs-emptyView {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .empty-nologin {
            display: flex;            
            width: 100%;
            height: 100%;
            background: @white-color;
            justify-content: center;
            align-items: center;
            .empty-login {
                padding: 0 30px;
                height: 40px;
                line-height: 40px;
                border-radius: 4px;
                color: @white-color;
                background-color: @primary-color;
                font-size: 16px;
            }
        }
        .empty-main {
            display: flex;
            flex-flow: column nowrap;
            width: 100%;
            height: 100%;
            background: @white-color;
            justify-content: center;
            align-items: center;          
            .img {
                font-size: 80px;
                color: @litgray-color;                
            }
            .mess {
                margin-top: 16px;
                font-size: 16px;
                color: @litgray-color;
            }
        }
    }
</style>
