<template>
    <div id="registeredSMS">
        <title-bar title="手机注册" :show-close="false"></title-bar>
        <div class="main-column-box main">
            <div class="main-mes">
                <div class="mes-description">请输入短信验证码</div>
                <div class="mes-prompt">验证码已发送至 {{phone}}</div>
                <div class="mes-code">
                    <div class="mes-code-value" v-for="index in codeLength" :key="index">{{showCode(index - 1)}}</div>
                </div>
                <div v-if="codeStatus" class="btn-sms-status " @click="getCode">重新获取验证码</div>
                <div v-if="!codeStatus" class="btn-sms-status status-wait">{{waitCount}}s后可重新发送</div>
            </div>
        </div>
        <keyboard-view @change="changeCode"></keyboard-view>
    </div>
</template>
<script>
import utils from 'js/utils'
    export default {
        name: 'login',
        mounted() {
        },
        data() {
            return {
                codeStatus: true,
                codeLength: 6,
                phone: "18767130228",
                smsCode: "",
                waitCount: 60
            }
        },
        methods: {
            getCode(){
                this.codeStatus = false;
                var _this = this;
                var oldCount = _this.waitCount
                var timer = setInterval(function () {
                    if (_this.waitCount == 0) {
                        _this.codeStatus = true;
                        clearInterval(timer);
                        _this.waitCount = oldCount;
                    } else {
                        _this.waitCount--;
                    }
                }, 1000);
            },
            showCode(index) {
                return this.smsCode[index]
            },
            changeCode(mes){
                if (mes == "×") {
                    this.smsCode = this.smsCode == "" ? "" : this.smsCode.substring(0, this.smsCode.length - 1);
                } else if (this.smsCode.length < this.codeLength) {
                    this.smsCode = this.smsCode == "" ? mes : this.smsCode + mes;
                }
            }
        },
        watch: {
            smsCode: function (val) {
                if (val.length == this.codeLength) {
                    setTimeout(function () {                        
                        APP.openWin("/registeredPwd");
                    }, 500)
                }
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";

    #registeredSMS {
        .page-style();
        .main {
            margin-top: 8px;
            background: @white-color;
            .main-mes {
                display: flex;
                flex-flow: column nowrap;
                margin: 0 30px;
                overflow: hidden;
                .mes-description {
                    flex: 1;
                    width: 100%;
                    margin: 60px 0 0;
                    font-size: 20px;
                    color: @dark-color;
                }
                .mes-prompt {
                    flex: 1;
                    width: 100%;
                    margin: 16px 0 0;
                    font-size: 14px;
                    color: @gray-color;
                }
                .mes-code {
                    flex: 1;
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    margin: 12px 0 0 -12px;
                    height: 52px;
                    .mes-code-value {
                        flex: 1px;
                        width: 100%;
                        height: 100%;                        
                        font-size: 20px;
                        line-height: 52px;
                        color: @dark-color;
                        text-align: center;
                        margin-left: 12px;
                        border-bottom: 1px solid #d8d8d8;
                    }

                }
                .btn-sms-status {
                    flex: 1;
                    margin: 20px 0;
                    width: 100%;
                    height: auto;
                    border-radius: 3px;
                    font-size: 14px;
                    color: @primary-color;
                }
                .status-wait {
                    color: @gray-color;
                }
            }
        }
    }
</style>