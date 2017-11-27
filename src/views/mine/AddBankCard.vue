<style lang="less">
    @import "../../common/style/common.less";
    #addBankCard {
        .page-style();
        .box-text {
            padding: 10px 15px;
            font-size: 14px;
            color: @litdark-color;
        }
        .person-box {
            background: #fff;
            .item-line {
                display: flex;
                padding: 15px 15px 15px 0;
                margin-left: 15px;
                .border-b-1px();
                .left-text {
                    width: 100px;
                    font-size: 16px;
                    color: @dark-color;
                }
                .right-text {
                    flex: 1;
                    font-size: 14px;
                    color: @litdark-color;
                }
            }
        }
        .card-box {
            background: #fff;
            .item-line {
                display: flex;
                padding: 15px 15px 15px 0;
                margin-left: 15px;
                .border-b-1px();
                &:last-child::after{
                    display: none;
                }
                .left-text {
                    width: 100px;
                    font-size: 16px;
                    color: @dark-color;
                }
                .middle-text {
                    flex: 1;
                    color: #cdcdcd;
                }
                .arrow {
                    width: 60px;
                    text-align: right;
                    .arrow-r();
                }
                .right-text {
                    flex: 1;
                    font-size: 14px;
                }
            }
        }
        .agreement-line {
            margin: 15px 15px 0;            
            label{
                display: inline-block;
                height: 50px;;
            }
            .agreen-text {
                color: @litdark-color;
            }
            .agreen-content {
                color: #4E8BD6;
            }
        }
        .btn-next {
            margin: 0 15px;
        }
    }
</style>
<template>
    <div id="addBankCard">
        <title-bar title="添加银行卡"></title-bar>
        <div class="main-column-box">
            <p class="box-text">持卡人信息</p>
            <div class="person-box">
                <div class="item-line">
                    <span class="left-text">真实姓名</span>
                    <input class="right-text" v-model="name" placeholder="请输入真实姓名">
                    <!-- <span class="right-text">{{name}}</span> -->
                </div>
                <div class="item-line">
                    <span class="left-text">证件号码</span>
                    <input class="right-text" v-model="IDcard" placeholder="请输入身份证号码">
                    <!-- <span class="right-text">{{IDcard}}</span> -->
                </div>
            </div>
            <p class="box-text">银行卡信息</p>
            <div class="card-box">
                <div class="item-line" @click="chooseBank">
                    <span class="left-text">银行</span>
                    <span class="middle-text">{{bank}}</span>
                    <span class="arrow"></span>
                </div>
                <div class="item-line">
                    <span class="left-text">卡号</span>
                    <input class="right-text" v-model="cardNum" placeholder="请输入银行卡号">
                </div>
                <div class="item-line">
                    <span class="left-text">预留手机</span>
                    <input class="right-text" v-model="phone" maxlength="11" placeholder="请输入银行预留手机号码">
                </div>
            </div>
            <div class="agreement-line">
                <label>
                    <input type="checkbox" v-model="modelValue">
                    <i class="iconfont i-checkbox"></i>
                    <span class="agreen-text">我已同意并阅读</span>
                </label>
                <span class="agreen-content" @click="watchAgreen">《快捷支付服务协议》</span>
            </div>
            <div class="btn btn-primary btn-next" @click="goNext" v-btntouch>下一步</div>
        </div>
    </div>
</template>
<script>
    import utils from 'js/utils'
    export default {
        name: 'addBankCard',
        data() {
            return {
                cardNum: '',
                phone: '',
                name: '',
                IDcard: '',
                modelValue: false,
                bank: '请选择银行'
            }
        },
        mounted() {
            this.bank = utils.getRouterData() || '请选择银行';            
        },
        methods: {
            chooseBank() {
                APP.openWin('/selectBankCard');
            },
            goNext() {
                utils.setCommonRouter({
                    'phoneVerification': '/bankCardManage'
                });
                APP.openWin('/phoneVerification')
            },
            watchAgreen() {
            }
        }
    }
</script>


