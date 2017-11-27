<template>
    <div>
        <div class="hs-titleBar" :class="{colorful: isColorful}">
            <div class="left-wrap">
                <span class="iconfont icon-back back-icon" @click="back" v-if="showBack"></span>
            </div>
            <div class="title-text">
                <p class="title-bar-title">{{title}}</p>
                <p class="title-bar-subtitle">{{subTitle}}</p>
            </div>
            <div class="right-wrap">
                <slot></slot>
            </div>
        </div>
        <div class="title-height" style="height: 45px;">
        </div>
    </div>
</template>
<script>
    export default {
        name: 'hs-titleBar',
        data() {
            return {}
        },
        mounted() {},
        methods: {
            back() {
                if (this.backPath) {
                    APP.closeTo(this.backPath);
                } else {
                    APP.closeWin();
                }
            }
            /* close() {
             APP.closeWin();
             } */
        },
        props: {
            /* 标题 */
            title: {
                required: true,
                type: String,
                default: ""
            },
            /* 副标题 */
            subTitle: {
                required: false,
                type: String,
                default: ""
            },
            /* 返回路由地址 */
            backPath: {
                type: String,
                default: ""
            },
            /* 是否显示左侧返回 */
            showBack: {
                type: Boolean,
                default: true
            },
            /* 背景色是否是彩色 */
            isColorful: {
                type: Boolean,
                default: false
            }
            /* closePath: {
             type: String,
             default: "/home"
             }, */
            /* showClose: {
             type: Boolean,
             default: false
             }, */
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    .hs-titleBar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 45px;
        background-color: #fff;
        text-align: center;
        border-bottom: 1px solid #ebebeb;
        z-index: 98;
        color: #000;
        &.colorful {
            color: #fff;
            background-image: @colorful-color;
        }
        .left-wrap {
            position: absolute;
            top: 0;
            left: 0;
            line-height: 45px;
            height: 45px;
            font-size: 16px;
            padding-left: 14px;
            text-align: left;
            .icon-back {
                display: inline-block;
                height: 100%;
                width: 40px;
            }
        }
        .right-wrap {
            position: absolute;
            top: 0;
            right: 0;
            line-height: 45px;
            height: 45px;
            padding-right: 14px;
            font-size: 16px;
        }
        .close {
            margin-left: 16px;
        }
        .title-text {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            left: 80px;
            right: 80px;
            top: 0;
            bottom: 0;
            font-size: 18px;
            text-align: center;
            .title-bar-title {
                font-weight: bold;
                .word-hide();
            }
            .title-bar-subtitle {
                font-size: 12px;
            }
        }
    }
</style>
