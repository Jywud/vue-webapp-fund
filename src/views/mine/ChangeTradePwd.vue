<style lang="less">
    @import "../../common/style/common.less";
    #changeTradePwd {
        .page-style();
        background: #fff;
        .pwd-box {
            border-top: 10px solid #f3f4f7;
            .line-item {
                display: flex;
                padding: 25px 10px 15px 15px;
                .border-b-1px();
                .text {
                    width: 120px;
                    color: @dark-color;
                    font-size: 16px;
                }
                .input-text {
                    flex: 1;
                }
            }
        }
        .btn {
            margin: 20px 15px 0;
        }
    }
</style>
<template>
    <div id="changeTradePwd">
        <title-bar title="修改交易密码"></title-bar>
        <div class="main-column-box">
            <div class="pwd-box">
                <div class="line-item">
                    <span class="text">原交易密码</span>
                    <input class="input-text" type="tel" v-model="oldPwd" placeholder="请输入原交易密码" maxlength="6">
                </div>
                <div class="line-item">
                    <span class="text">新交易密码</span>
                    <input class="input-text" type="tel" v-model="newPwd" placeholder="请输入新交易密码" maxlength="6">
                </div>
                <div class="line-item">
                    <span class="text">确定新密码</span>
                    <input class="input-text" type="tel" v-model="confirmPwd" placeholder="请输入新交易密码" maxlength="6">
                </div>
            </div>
            <div class="btn btn-primary" @click="confirm" v-btntouch>确定</div>
        </div>
    </div>
</template>
<script>
    import utils from 'js/utils'
    export default {
        name: 'changeTradePwd',
        data() {
            return {
                oldPwd: '',
                newPwd: '',
                confirmPwd: ''
            }
        },
        methods: {
            confirm() {
                if(this.oldPwd == '' || this.newPwd == '' || this.confirmPwd == '') {
                    utils.toast('密码不能为空');
                    return;
                }
                if(this.newPwd !== this.confirmPwd) {
                    utils.toast('新密码和确认密码不一致');
                    return;
                }
            }
        }
    }
</script>


