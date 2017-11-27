<template>
    <div id="login">
        <div class="title-bar">
            <div class="iconfont icon-close right-icon" @click="doBack"></div>
        </div>
        <div class="main-column-box">
            <div class="login-title">登录</div>
            <div class="input-item">
                <input type="tel" v-model="account" placeholder="请输入手机号码或理财账号" maxlength="11" v-focus>
                <span class="iconfont icon-empty account-clean" v-show="!!account" @click="account=''"></span>
            </div>
            <div class="input-item">
                <input type="password" v-model="password" maxlength="6" placeholder="请输入交易密码">
                <span class="iconfont icon-empty pwd-clean" v-show="!!password" @click="password=''"></span>
            </div>
            <div class="input-item code-box">
                <input type="tel" class="input" v-model="code" placeholder="请输入验证码" maxlength="4">
                <img class="code-img" src="" />
            </div>
            <div class="btn btn-primary btn-login" @click="doLogin" v-btntouch>登 录</div>
            <div class="btn-otherdo">
                <span class="registered" @click="doRegister">立即注册</span>
                <span class="forget" @click="forgetPwd">忘记密码</span>
            </div>
        </div>
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
                account: "",
                password: "",
                code: ""
            }
        },
        methods: {
            doBack() {
                APP.closeTo("/home");
            },
            doLogin() {
                if (this.account == false) {
                    utils.toast('请输入手机号或者理财账号');
                    return;
                }
                if (this.password == false) {
                    utils.toast('请输入交易密码');
                    return;
                }
                if (this.code == false) {
                    utils.toast('请输入验证码');
                    return;
                }
                // console.log(APP.rsaEncrypt(this.password));
                APP.openWin("/home");
            },
            doRegister() {
                utils.setCommonRouter({
                    'registeredPwd': '/registeredResult'
                });
                APP.openWin("/registered");
            },
            refreshCaptcha() {},
            forgetPwd() {
                utils.setCommonRouter({
                    registeredPwd: '/login'
                });
                APP.openWin("/registeredPhoneVerification");
            }
        }
    }
</script>
<style lang="less">
    @import "../common/style/common.less";
    #login {
        .page-style();
        background-color: @white-color;
        .title-bar {
            height: 44px;
            width: 100%;
            background: #ffffff;
            .right-icon {
                margin: 13px 20px;
                display: block;
                width: 16px;
                height: 16px;
                float: right;
                font-size: 16px;
                color: @dark-color;
            }
        }
        .login-title {
            display: block;
            width: 100%;
            margin: 36px 0;
            text-align: center;
            font-size: 28px;
        }
        .input-item {
            position: relative;
            .border-b-1px(@border-color);
            margin: 7px 30px;
            height: 40px;
            .icon-empty {
                position: absolute;
                right: 8px;
                top: 12px;
            }
            input {
                font-size: 16px;
                width: 100%;
                height: 100%;
                display: block;
                border: 0;
                outline: none;
            }
        }
        .code-box {
            display: flex;
            .input {
                flex: 1;
            }
            .code-img {
                width: 100px;
            }
        }
        .btn-login {
            margin: 26px 30px 0;
            width: auto;
        }
        .btn-otherdo {
            display: flex;
            margin: 24px 30px 0;
            .registered {
                flex: 1;
                width: 100%;
                height: auto;
                font-size: 14px;
                color: @gray-color;
            }
            .forget {
                flex: 1;
                width: 100%;
                height: auto;
                font-size: 14px;
                color: @gray-color;
                text-align: right;
            }
        }
    }
</style>