<template>
    <div id="login">
        <!--<list-layout :setting="setting"></list-layout>-->
        <div class="title-bar">
            <div class="iconfont icon-close right-icon" @click="doBack"></div>
        </div>
        <div class="login-title">登录</div>
        <div class="input-item">
            <input type="tel" v-model="userName" placeholder="请输入手机号码或理财账号">
        </div>
        <div class="input-item">
            <input type="password" v-model="password" maxlength="6" placeholder="请输入交易密码">
        </div>
        <div class="input-item code-box">
            <input type="tel" class="input" v-model="code" placeholder="请输入验证码">
            <img class="code-img" src="" />
        </div>
        <div class="btn btn-primary btn-login" @click="doLogin" v-btntouch>登 录</div>
        <div class="btn-otherdo">
            <span class="registered" @click="doRegister">立即注册</span>
            <span class="forget" @click="forgetPwd">忘记密码</span>
        </div>
    </div>
</template>
<script>
    import utils from 'js/utils'
    export default {
        name: 'login',
        mounted() {
            this.getJson();
            this.setting = {
                data: this.json,
                title: [{
                        style: {
                            textAlign: "left"
                        },
                        value: "bbb"
                    },
                    {
                        style: {
                            textAlign: "right"
                        },
                        value: "aaa"
                    }
                ],
                column: [{
                        style: {
                            textAlign: "left",
                            flex: 1,
                        },
                        item: [{
                            value: "name",
                            type: "",
                            style: {
                                fontSize: "14px"
                            }
                        }, {
                            value: "id",
                            type: ""
                        }]
                    },
                    {
                        style: {
                            textAlign: "right",
                            flex: 1,
                        },
                        item: [{
                            value: "",
                            type: "t",
                            class: "iconfont icon-more"
                        }]
                    }
                ]
            }
        },
        data() {
            return {
                userName: "",
                password: "",
                code: "",
                setting: {},
                json: []
            }
        },
        methods: {
            doBack() {
                APP.closeTo("/home");
            },
            doLogin() {
                APP.openWin("/home");
            },
            doRegister() {
                utils.setCommonRouter({
                    'registeredPwd': '/registeredResult'
                });
                APP.openWin("/registered");
            },
            refreshCaptcha() {
            },
            forgetPwd() {
                utils.setCommonRouter({
                    registeredPwd: '/login'
                });
                APP.openWin("/registeredPhoneVerification");
            },
            getJson() {
                for (var i = 0; i < 40; i++) {
                    this.json.push({
                        id: "200168",
                        name: "南方稳健一号" + i,
                        value1: "1.2872",
                        value2: "+1.23%"
                    });
                }
            }
        }
    }
</script>
<style lang="less">
    @import "../common/style/common.less";
    #login {
        .page-style();
        background-color: @white-color;
        padding-bottom: 30px;
        .title-bar {
            height: 44px;
            width: 100%;
            background: #ffffff;
            .right-icon {
                margin: 13px 20px 13px 20px;
                display: inline-block;
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
            margin: 36px 0px 46px;
            text-align: center;
            font-size: 28px;
        }
        .input-item {
            .border-b-1px(@border-color);
            margin: 7px 30px;
            height: 44px;
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
            margin: 36px 30px 0;
            width: auto;
        }
        .btn-otherdo {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
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