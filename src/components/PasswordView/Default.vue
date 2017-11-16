<template>
    <div id="passwordView">
        <div class="mask-layer" @click="close"></div>
        <transition name="transition-up-down">
            <div class="main-box" v-show="isShowBox">
                <div class="title-view">
                    <div class="title-left" @click="close">
                        <span class="iconfont icon-back left-icon"></span>
                    </div>
                    <div class="title-center">
                        输入交易密码
                    </div>
                    <div class="title-right"></div>
                </div>
                <div v-if="doStatus==0" class="inputMess">
                    <div class="input-code-view">
                        <div class="input-code-item" v-for="index in codeLength" :key="index">
                            <div v-show="isSign(index)" class="input-code-sign"></div>                           
                        </div>
                    </div>
                    <keyboard-view @change="changeCode"></keyboard-view>
                </div>
                <div v-else class="resultMess">
                    <div class="iconfont" :class="getMessClass()"></div>
                    <div class="mess">{{resultMess}}</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        name: "login",
        mounted() {
            setTimeout(() => {
                this.isShowBox = true;
            }, 100);
        },
        data() {
            return {
                isShowBox: false,
                doStatus: 0, //当前状态
                codeLength: 6, //输入验证串长度限制
                code: [], //输入验证串
                resultMess: "" //验证结果
            };
        },
        props: {
            /* 需要传入的对象 */
            params: {
                required: false,
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        methods: {
            close() {
                this.isShowBox = false;
                setTimeout(() => {
                    APP.closePopWin("passwordView");
                }, 500);
            },
            changeCode(mes) {
                if (mes == "×") {
                    this.code.pop();
                } else if (this.code.length < 6) {
                    this.code.push(mes);
                }

                //输入了6位密码
                if(this.code.length == 6) {
                    this.pwdConfirm();
                }
            },
            /* 输入了6位密码回调 */
            pwdConfirm() {
                console.log(this.code.join(''));
                this.doStatus = 1;
                this.resultMess = "正在验证";
                // APP.callbackPopWin("passwordView", {status: this.doStatus, resultMess: this.resultMess});
                setTimeout(() => {
                    this.doStatus = 2;
                    this.resultMess = "验证成功";
                    setTimeout(() => {
                        APP.callbackPopWin("passwordView", {
                            status: this.doStatus,
                            resultMess: this.resultMess
                        });
                        APP.closePopWin("passwordView");
                    }, 1000);
                }, 2000);
            },
            isSign(index) {
                return index <= this.code.length ? true : false;
            },
            getMessClass() {
                return {
                    "icon-success image": this.doStatus != 1,
                    "icon-yanzheng checkImage": this.doStatus === 1
                };
            }
        }
    };
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #passwordView {
        .page-style();
        .mask-layer {
            .mask-layer();
        }
        .main-box {
            position: absolute;
            z-index: 9999;
            display: flex;
            flex-flow: column nowrap;
            bottom: 0;
            height: 396px;
            width: 100%;
            background: @white-color;
            border-top: 1px solid @border-color;
            .title-view {
                display: flex;
                flex-flow: row nowrap;
                position: absolute;
                width: 100%;
                height: 48px;
                background: @white-color;
                .border-b-1px(@border-color);
                .title-left {
                    width: 100px;
                    height: 100%;
                    .left-icon {
                        padding: 0px 20px;
                        line-height: 48px;
                        color: @dark-color;
                        font-size: 20px;
                    }
                }
                .title-center {
                    flex: 1px;
                    width: 100%;
                    height: 100%;
                    line-height: 48px;
                    text-align: center;
                    color: @dark-color;
                    font-size: 20px;
                }
                .title-right {
                    width: 100px;
                    height: 100%;
                    line-height: 48px;
                    font-size: 20px;
                }
            }
            .inputMess {
                flex: 1;
                width: 100%;
                height: 100%;
                .input-code-view {
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    margin: 30px 16px;
                    height: 45px;
                    border: 1px solid @border-color;
                    border-radius: 5px;
                    .input-code-item {
                        display: flex;
                        flex: 1;
                        justify-content: center;
                        align-items: center;                        
                        width: 100%;
                        height: 100%;
                        border-right: 1px solid @border-color;                        
                        &:last-child{
                            border-right: none;
                        }                      
                        .input-code-sign {
                            background: #000;
                            width: 8px;
                            height: 8px;
                            border-radius: 8px;
                        }
                    }
                }
            }
            .resultMess {
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                flex: 1;
                width: 100%;
                height: 100%;
                text-align: center;
                .image {
                    height: auto;
                    width: 100%;
                    font-size: 63px;
                    color: #55a532;
                }
                .checkImage {
                    height: auto;
                    width: 100%;
                    font-size: 63px;
                    color: #b90d2f;
                    animation: rotate-infinite 2s linear infinite;
                }
                .mess {
                    height: auto;
                    width: 100%;
                    margin-top: 20px;
                    font-size: 16px;
                    color: @dark-color;
                }
            }
        }
    }
</style>