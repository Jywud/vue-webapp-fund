<style lang="less">
    @import "../../common/style/common.less";
    #modifyEmail {
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
    <div id="modifyEmail">
        <title-bar title="修改电子邮箱"></title-bar>
        <div class="main-column-box">
            <div class="input-item">
                <span class="text">电子邮箱</span>
                <input v-model="email" placeholder="请输入电子邮箱">
            </div>
            <div class="input-item">
                <span class="text">验证码</span>
                <input type="tel" class="input" v-model="code" maxlength="6" placeholder="请输入验证码">
                <div class="btn btn-sms-status" v-if="isSendMes">{{waitCount}}s后可重新发送</div>
                <div class="btn btn-code" v-if="!isSendMes" @click="getMesCode">获取验证码</div>
            </div>
            <div class="btn btn-primary btn-login" @click="done" v-btntouch>确定</div>
        </div>
    </div>
</template>

<script>
    import utils from 'js/utils'
    var timer = null;
    export default {
        name: "modifyEmail",
        data() {
            return {
                isSendMes: false,
                email: "",
                code: "",
                waitCount: 60
            };
        },
        methods: {
            done() {
                if(!utils.checkMail(this.email)) {
                    utils.toast('邮箱格式有误');
                    return;
                }
                if(!utils.check6Num(this.code)) {
                    utils.toast('验证码为6位数字');
                    return;
                }
                utils.toast('修改成功');
                APP.closeTo("/myInformation");
            },
            getMesCode() {
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
