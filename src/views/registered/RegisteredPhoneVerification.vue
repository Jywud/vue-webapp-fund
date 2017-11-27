<style lang="less">
    @import "../../common/style/common.less";
    #registeredPhoneVerification {
        .page-style();
        .main-column-box {
            margin-top: 10px;
            background: #fff;
        }
        .input-item {
            .border-b-1px();
            margin: 16px 0px;
            padding: 0 16px;
            height: 44px;
            display: flex;
            align-items: center;
            font-size: 16px;
            .text {
                width: 80px;
            }
            .phone-text {
                flex: 1;
            }
            input {
                font-size: 16px;
                flex: 1;
                width: 100%;
                height: 100%;
                color: @dark-color;
                border: 0;
            }
            .btn-code {
                width: 100px;
                height: 30px;
                border: 1px solid @primary-color;
                border-radius: 4px;
                font-size: 16px;
                color: @primary-color;
                line-height: 30px;
                text-align: center;
            }
            .btn-sms-status {
                width: 100px;
                height: 30px;
                border: 1px solid @gray-color;
                border-radius: 4px;
                font-size: 12px;
                color: @gray-color;
                line-height: 30px;
                text-align: center;
            }
        }
        .btn-login {
            margin: 30px 16px 0;
        }
    }
</style>
<template>
    <div id="registeredPhoneVerification">
        <title-bar title="手机验证"></title-bar>
        <div class="main-column-box">
            <div class="input-item">
                <span class="text">手机号</span>
                <input class="phone-text" type="text" v-model="phone" placeholder="请输入手机号" maxlength="11" v-focus>
            </div>
            <div class="input-item">
                <span class="text">验证码</span>
                <input type="tel" class="input" v-model="code" maxlength="6" placeholder="请输入验证码">
                <div class="btn btn-sms-status" v-if="isSendMes">{{waitCount}}s重新获取</div>
                <div class="btn btn-code" v-if="!isSendMes" @click="getMesCode">获取验证码</div>
            </div>
            <div class="btn btn-primary btn-login" @click="goPage" v-btntouch>下一步</div>
        </div>
    </div>
</template>
<script>
    import utils from 'js/utils'
    var timer = null;
    export default {
        name: "registeredPhoneVerification",
        data() {
            return {
                isSendMes: false,
                phone: "",
                code: "",
                waitCount: 60
            };
        },
        methods: {
            goPage() {
                //校验
                if(!utils.checkMobile(this.phone)) {
                    utils.toast('手机号格式有误');
                    return;
                }
                if(!utils.check6Num(this.phone)) {
                    utils.toast('验证码为6位数字');
                    return;
                }
                APP.openWin("/registeredPwd");
            },
            getMesCode() {
                //手机号格式校验
                if(!utils.checkMobile(this.phone)) {
                    utils.toast('手机号格式有误');
                    return;
                }
                this.isSendMes = true;
                timer = setInterval(() => {
                    if (this.waitCount == 1) {
                        this.isSendMes = false;
                        clearInterval(timer);
                        this.waitCount = 60;
                    } else {
                        this.waitCount--;
                    }
                }, 1000);
            }
        },
        beforeDestroy() {
            clearInterval(timer);
        }
    };
</script>
