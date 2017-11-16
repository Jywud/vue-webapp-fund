<template>
    <div id="fundRedemption">
        <title-bar title="赎回"></title-bar>
        <div class="fund-box">
            <div class="item-line">
                <span class="left-text">基金名称</span>
                <span class="right-text">{{name}}</span>
            </div>
            <div class="item-line">
                <span class="left-text">产品代码</span>
                <span class="right-text">{{productCode}}</span>
            </div>
            <div class="item-line input">
                <span class="left-text">赎回份额(份)</span>
                <div class="value-pan">
                    <input type="text" v-model="investAmount" placeholder="≤7654.32">
                </div>
            </div>
            <div class="tip">
                <p> 规则：最低赎回10份，增加份额为5，可全部赎回。
                    示例：10份、15份、20份.....7654.32份</p>
                </div>
                <div class="item-line" @click="chooseBank">
                    <span class="left-text">返回至</span>
                    <span class="right-text" >{{investPayment}}</span>
                    <span class="arrow"></span>
                </div>
            </div>
            <div class="btn btn-primary btn-next" @click="confirm" v-btntouch>赎回</div>
            <div class="tip">
                <p>*今日卖出，以07-11（周一）的净值确认收益，扣除手续费后将于3个工作日内返回至银行卡中。</p>
            </div>
        </div>
    </template>

    <script>
    export default {
        name: 'fundRedemption',
        data() {
            return {
                modelValue: false,
                name: '测试基金', //基金名称
                productCode: '500056', //产品代码
                investAmount: '', //定投金额
                investPayment: '招商银行(0370)', //支付方式
            }
        },
        methods: {
            chooseBank() {
                APP.openWin('/selectBankCard');
            },
            confirm() {
                APP.openPopWin('passwordView', (data)=> {
                    if(data.status == 2) {                    
                        APP.openWin('/redemptionResult');
                    }                
                });
            }
        }
    }
    </script>
    <style lang="less">
    @import "../../common/style/common.less";
    #fundRedemption{
        .page-style();
        .box-text {
            padding: 10px 15px;
            font-size: 14px;
            color: @litdark-color;
        }
        .fund-box {
            margin-top: 10px;
            background: #fff;
            .item-line {
                display: flex;
                align-items: center;
                padding: 15px 15px 15px 0;
                margin-left: 15px;
                .border-b-1px();
                &.input{
                    padding: 5px 15px 5px 0;
                }
                .left-text {
                    width: 100px;
                    font-size: 16px;
                    font-family: PingFangSC-Regular;
                    color: @dark-color;
                    letter-spacing: 0;
                    line-height: 16px;
                    text-align: left;
                }
                .right-text {
                    flex: 1;
                    text-align: right;
                    font-size: 14px;
                    font-family: PingFangSC-Regular;
                    color: @litdark-color;
                    line-height: 16px;
                }
                .arrow {
                    width: 20px;
                    text-align: right;
                    .arrow-r();
                }
                .value-pan{
                    flex: 1;
                    text-align: right;
                    input[type="text"]{
                        width: 120px;
                        border: 1px solid #ededed;
                        text-align: right;
                        padding: 10px;
                    }
                }
            }
            .tip {
                margin: 0;
                padding: 5px 16px 16px;
                background-color: rgba(244, 243, 248, 1);
                font-size:12px;
                color:@gray-color;
                line-height:16px;
            }
        }
        .agreement-line {
            padding: 15px;
            .agreen-text {
                color: @litdark-color;
            }
            .agreen-content {
                color: #4E8BD6;
            }
        }
        .btn-next {
            margin: 15px 15px 0;
            border-radius: 4px;
        }
        .tip {
            font-family:PingFangSC-Regular;
            font-size:12px;
            color:@gray-color;
            line-height:16px;
            margin: 10px 16px 0;
        }
    }
    </style>
