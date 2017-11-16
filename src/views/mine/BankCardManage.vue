<style lang="less">
    @import "../../common/style/common.less";
    #bankCardManage {
        .page-style();
        .noBankCardBox {
            .icon-pan {
                margin: 100px 0 46px;
                text-align: center;
                color: #cdcdcd;
                .iconfont {
                    font-size: 80px;
                }
                .text {
                    margin-top: 20px;
                    font-size: 16px;
                }
            }
            .btn-add {
                width: auto;
                margin: 0 16px;
                .iconfont {
                    margin-right: 5px;
                }
            }
        }
        .bankCardBox {
            margin: 10px 10px 0;
            .card-item {
                position: relative;
                width: 100%;
                border-radius: 4px;
                background-color: #ef3f62;
                height: 100px;
                padding: 14px 16px;
                margin-bottom: 10px;
                .quick-payment {
                    position: absolute;
                    right: 6px;
                    top: 6px;
                    color: #fff;
                }
                .name-line {
                    .icon {
                        display: inline-block;
                        width: 24px;
                        height: 24px;
                        background: #561;
                        vertical-align: middle;
                    }
                    .bank-name {
                        letter-spacing: 0;
                        font-size: 16px;
                        color: #fff;
                    }
                    .card-kind {
                        letter-spacing: 0;
                        font-size: 12px;
                        color: #fff;
                    }
                }
                .cardnum-line {
                    color: #fff;
                    font-size: 20px;
                    padding-left: 30px;
                    margin: 4px 0 6px;
                }
                .tip-line {
                    opacity: 0.6;
                    font-size: 12px;
                    color: #fff;
                }
            }
        }
    }
</style>
<template>
    <div id="bankCardManage">
        <title-bar title="银行卡管理" back-path="/home/mine">
            <i class="iconfont icon-black" @click="addCard" v-if="isShowBankCard"></i>
        </title-bar>
        <div class="main-column-box">
            <!-- 未添加过银行卡界面 -->
            <div class="noBankCardBox" v-if="!isShowBankCard">
                <div class="icon-pan">
                    <span class="iconfont icon-nocard"></span>
                    <p class="text">您暂无添加银行卡</p>
                </div>
                <div class="btn btn-primary btn-add" @click="addCard" v-btntouch>
                    <i class="iconfont icon-black"></i>添加银行卡
                </div>
            </div>
            <!-- 已添加过银行卡界面 -->
            <div class="bankCardBox" v-if="isShowBankCard">
                <div class="card-item" :style="getCardBackground(item)" v-for="(item, index) in cardList" :key="index" @click="showDeleteCard(item, index)">
                    <div class="quick-payment">快捷支付</div>
                    <div class="name-line">
                        <span class="icon"></span>
                        <span class="bank-name">{{item.bankName}}</span>
                        <span class="card-kind">{{item.cardKing}}</span>
                    </div>
                    <div class="cardnum-line">
                        {{item.cardNum}}
                    </div>
                    <div class="tip-line">
                        {{item.info}}
                    </div>
                </div>
            </div>
        </div>
        <action-sheet title="您可对7765尾号招商银行的储蓄卡进行操作" @tapIndex="tapIndex" v-if="isShowActionSheet"></action-sheet>
    </div>
</template>
<script>
    export default {
        name: 'bankCardManage',
        data() {
            return {
                isShowActionSheet: false,
                isShowBankCard: true,
                cardList: [{
                        icon: '',
                        bankName: '招商银行',
                        cardKing: '储蓄卡',
                        cardNum: '***  ****  **** 3461',
                        info: '单笔5万    单日10万    单月1000万'
                    },
                    {
                        icon: '',
                        bankName: '交通银行',
                        cardKing: '储蓄卡',
                        cardNum: '***  ****  **** 3462',
                        info: '单笔5万    单日10万    单月1000万'
                    },
                    {
                        icon: '',
                        bankName: '农业银行',
                        cardKing: '储蓄卡',
                        cardNum: '***  ****  **** 3463',
                        info: '单笔5万    单日10万    单月1000万'
                    }
                ]
            }
        },
        methods: {
            getCardBackground(item) {
                var cardColorObj = {
                    '招商银行':  'linear-gradient(-224deg, #fc5a9e 0%, #ffa75f 100%)',
                    '交通银行': 'linear-gradient(-224deg, #359ef8 0%, #6bccf8 100%)',
                    '农业银行': 'linear-gradient(-224deg, #20c084 0%, #70ec9e 100%)'
                }
                return {
                    'background-image': cardColorObj[item.bankName]
                }
            },
            tapIndex(index) {
                this.isShowActionSheet = false;
                // console.log(index);
                if (index == 0) {
                    APP.openPopWin('passwordView', (data) => {
                        if (data.status == 2) {
                            this.cardList.splice(index, 1);
                        }
                    });
                }
            },
            addCard() {
                APP.openWin('/addBankCard');
            },
            showDeleteCard(item, index) {
                this.isShowActionSheet = true;
                /* APP.openPopWin('passwordView', (data)=> {
                    if(data.status == 2) {                    
                        this.cardList.splice(index, 1);
                    }                
                }); */
            }
        }
    }
</script>


