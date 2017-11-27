<template>
    <div id="registeredResult">
        <title-bar title="设置密码" :show-close="false" back-path="/login"></title-bar>
        <div class="main-column-box main">
            <div class="mes-layout">
                <div class="mes-top">
                    <div class="item-image"></div>
                    <div class="item-mes">恭喜您注册成功!</div>
                </div>
                <div class="mes-bottom">
                    <div class="mes-value">您的理财账号为</div>
                    <div class="mes-value mes-important">{{account}}</div>
                </div>
                <div class="sure-layout">
                    <div class="btn btn-primary btn-sure" v-btntouch @click="goLogin">
                        马上登录
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'registeredResult',        
        data() {
            return {                
                account: ''
            }
        },
        methods: {
            goLogin() {
                APP.openWin("/login");
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #registeredResult {
        .page-style();
        .main {
            background: @body-color;
            .mes-layout {
                wdith: 100%;
                margin: 16px;
                .mes-top {
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: center;
                    align-items: center;
                    height: 286px;
                    background: @white-color;
                    border-radius: 6px;
                    border-bottom: 1px dashed @border-color;
                    .item-image {
                        width: 100px;
                        height: 100px;
                        background: #63a35c;
                    }
                    .item-mes {
                        width: auto;
                        height: auto;
                        font-size: 20px;
                        text-align: center;
                        margin-top: 25px;
                    }
                }
                .mes-bottom {
                    display: flex;
                    padding: 0 10px;
                    flex-flow: row wrap;
                    justify-content: center;
                    min-height: 72px;
                    background: @white-color;
                    border-radius: 6px;
                    .mes-value {
                        width: auto;
                        line-height: 72px;
                        font-size: 16px;
                        text-align: center;
                    }
                    .mes-important {
                        color: @primary-color
                    }
                }

                .sure-layout {
                    display: flex;
                    flex-flow: row nowrap;
                    margin: 30px 0;
                    .btn-sure {
                        flex: 1;
                        width: 100%;
                        height: 45px;
                        text-align: center;
                        line-height: 45px;
                        border-radius: 3px;
                        font-size: 16px;
                    }
                }
            }
        }
    }
</style>