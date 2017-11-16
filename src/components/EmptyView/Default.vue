<template>
    <div id="emptyView">
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

    #emptyView {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .empty-nologin {
            display: flex;
            position: absolute;
            width: 100%;
            height: 100%;
            background: @white-color;
            justify-content: center;
            align-items: center;
            .empty-login {
                padding: 0 30px;
                height: 45px;
                line-height: 45px;
                border-radius: 4px;
                color: @white-color;
                background: @primary-color;
                font-size: 16px;
            }
        }
        .empty-main {
            display: flex;
            flex-flow: column nowrap;
            position: absolute;
            width: 100%;
            height: 100%;
            background: @white-color;
            justify-content: center;
            text-align: center;
            .img {
                font-size: 80px;
                color: @litgray-color;
                margin-top: -100px;
            }
            .mess {
                margin-top: 16px;
                font-size: 16px;
                color: @litgray-color;
            }
        }
    }
</style>
