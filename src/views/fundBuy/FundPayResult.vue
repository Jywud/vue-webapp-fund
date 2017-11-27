<style lang="less">
    @import "../../common/style/common.less";
    #fundPayResult {
        .page-style();
        .content-box {
            background: #fff;
            margin: 16px 16px 30px;
            .header {
                text-align: center;
                padding: 25px 0;
                .iconfont {
                    color: @fail-color;
                    font-size: 60px;
                }
                .fund-state {
                    margin: 10px 0;
                    font-size: 20px;
                    color: @dark-color;
                }
                .state-info {
                    font-size: 12px;
                    color: @gray-color;
                }
            }
            .line-box {
                .line-item {
                    display: flex;
                    padding: 15px;
                    .border-t-1px();
                    .name {
                        font-size: 16px;
                        color: @dark-color;
                        width: 100px;
                    }
                    .value {
                        flex: 1;
                        text-align: right;
                        font-size: 14px;
                        color: @litdark-color;
                        &.reason{
                            color: #ff4e50;
                        }
                        i {
                            .arrow-r();
                        }
                    }
                }
            }
        }
        .next-button {
            margin: 0 16px;
        }
    }
</style>
<template>
    <div id="fundPayResult">
        <title-bar title="支付结果"></title-bar>
        <div class="content-box">
            <div class="header">
                <span class="iconfont icon-empty"></span>
                <p class="fund-state">{{state}}</p>
                <p class="state-info">{{stateInfo}}</p>
            </div>
            <div class="line-box">
                <div class="line-item">
                    <span class="name">失败原因</span>
                    <span class="value reason">银行卡(7765)余额不足</span>
                </div>
                <div class="line-item">
                    <span class="name">基金名称</span>
                    <span class="value">{{fundName}}</span>
                </div>
                <div class="line-item">
                    <span class="name">支付金额</span>
                    <span class="value">{{money}}元</span>
                </div>
                <div class="line-item" @click="selectBank">
                    <span class="name">支付方式</span>
                    <span class="value">{{bank}}<i></i></span>
                </div>
            </div>
        </div>
        <div class="btn btn-primary next-button" @click="confirm" v-btntouch>重新支付({{second | formatCountDown}})</div>
    </div>
</template>
<script>
    var interval = null;
    import utils from 'js/utils'
    export default {
        name: "fundPayResult",
        data() {
            return {
                second: 1800,
                stateInfo: '请于30分钟内完成支付，否则该笔交易将自动作废。',
                fundName: "测试基金", //基金名称
                state: "支付失败", //状态 
                money: '10000',
                bank: '招商银行(7765)'
            }
        },
        mounted() {
            this.bank = utils.getRouterData();
            this.countDown();            
        },
        methods: {
            /* 倒计时5分钟 */
            countDown() {
                clearInterval(interval);
                var interval = setInterval(() => {
                    this.second--;
                    if (this.second <= 0) {
                        clearInterval(interval);
                    }
                }, 1000);
            },
            confirm() {
                APP.openPopWin('passwordView', function (data) {
                    if(data.status == 2) {
                        // APP.openWin('/selectBankCard');
                    }
                });
            },
            selectBank() {
                APP.openWin('/selectBankCard');
            }
        }
    };
</script>
