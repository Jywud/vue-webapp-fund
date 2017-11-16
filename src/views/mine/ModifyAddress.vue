<style lang="less">
    @import "../../common/style/common.less";
    #modifyAddress {
        .page-style();
        .content {
            margin-top: 10px;
            background: @white-color;
            .input-item {
                .border-b-1px(@border-color);
                height: 50px;
                margin: 16px;
                input {
                    font-size: 16px;
                    width: 100%;
                    height: 100%;
                    color: @dark-color;
                }
            }
            .btn-login {
                margin: 30px 16px 0;
            }
        }
    }
</style>

<template>
    <div id="modifyAddress">
        <title-bar title="修改联系地址"></title-bar>
        <div class="content main-column-box">
            <div class="input-item">
                <input type="text" v-model="address" placeholder="请输入联系地址">
            </div>
            <div class="btn btn-primary btn-login" @click="confirm" v-btntouch>确定</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "modifyAddress",
        data() {
            return {
                address: ""
            }
        },
        methods: {
            confirm() {
                if(this.address.length == 0) {
                    this.$vux.toast.text('地址不能为空');
                    return;                    
                }
                this.$vux.toast.text('修改成功');
                APP.closeTo('/myInformation');
            }
        }
    };
</script>
