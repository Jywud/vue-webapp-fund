<template>
    <div id="registeredPwd">
        <title-bar title="设置密码" :show-close="false"></title-bar>
        <div class="main-column-box main">
            <div class="input-item">
                <div class="item-title">
                    设置交易密码
                </div>
                <div class="item-value">
                    <input type="tel" v-model="pwd" placeholder="6位数字组合" maxlength="6" v-focus>
                </div>
            </div>
            <div class="input-item">
                <div class="item-title">
                    确定交易密码
                </div>
                <div class="item-value">
                    <input type="tel" v-model="confirmPwd" placeholder="6位数字组合" maxlength="6">
                </div>
            </div>
            <div class="sure-layout">
                <div class="btn btn-primary btn-sure" @click="confirm" v-btntouch>
                    确定
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import utils from 'js/utils'
    export default {
        name: 'registeredPwd',
        data() {
            return {
                pwd: "",
                confirmPwd: ""
            }
        },
        methods: {
            confirm(){
                var router = utils.getCommonRouter('registeredPwd');
                if(this.pwd == '' || this.confirmPwd == '') {
                    utils.toast('密码不能为空');
                    return;
                }
                if(this.pwd !== this.confirmPwd) {
                    utils.toast('密码不一致');
                    return;
                }
                APP.openWin(router);
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";

    #registeredPwd {
        .page-style();
        .main {
            margin-top: 8px;
            background: @white-color;
            .input-item {
                display: flex;
                flex-flow: row wrap;
                min-height: 50px;
                margin-top: 16px;
                font-size: 16px;
                .border-b-1px(@border-color);
                .item-title {
                    width: auto;
                    padding: 0 4px 0 16px;
                    line-height: 50px;
                }
                .item-value {
                    flex: 1;
                    line-height: 50px;
                    padding-left: 16px;
                    input {
                        width: 100%;
                        height: 100%;
                        font-size: 16px;
                    }
                }
            }
            .sure-layout {
                display: flex;
                flex-flow: row nowrap;
                margin: 30px 16px;
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
</style>