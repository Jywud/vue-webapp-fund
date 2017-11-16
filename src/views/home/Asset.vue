<style lang="less">
    @import "../../common/style/common.less";
    #asset {
        .overflow-auto();
        padding-bottom: 50px;
        display: flex;
        flex-flow: column;
        .header-box{
            background-image: @colorful-color;
        }
        .header {            
            color: #fff;
            .border-b-1px();
            .center {
                height: 45px;
                line-height: 45px;
                text-align: center;
                font-size: 18px;
                font-weight: 600;
            }
            .text {
                padding: 33px 0 10px;
                font-size: 16px;
                margin-left: 24px;
            }
            .money {
                padding-bottom: 20px;
                font-size: 27px;
                margin-left: 24px;
            }
        }
        .income-box {
            display: flex;
            background-color: rgba(255,255,255,0.1);
            padding: 20px 0;            
            .item {
                flex: 1;
                width: 100%;
                .border-r-1px();
                color: #fff;
                text-align: center;
                &:last-child::after {
                    border: none;
                }
                .text {
                    font-size: 12px;
                    opacity: 0.7;
                    margin-bottom: 4px;
                }
                .income {
                    font-size: 20px;
                }
                /* .add {
                        color: @primary-color;
                    }
                    .lose {
                        color: @lose-color;
                    } */
            }
        }
        .product-layout {
            flex: 1;
            width: 100%;
            overflow: auto;
        }
        .list-title {
            display: flex;
            background: #fff;
            .border-b-1px();
            .item {
                flex: 1;
                padding: 10px 0;
                width: 100%;
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #666;
                text-align: center;
            }
        }
        .product-list {
            .product {
                display: flex;
                padding: 10px 0;
                background: #fff;
                .border-b-1px();
                .item {
                    flex: 1;
                    width: 100%;
                    text-align: center;
                    color: #333;
                    font-size: 14px;
                }
                .add {
                    color: @primary-color;
                }
                .lose {
                    color: @lose-color;
                }
            }
        }
    }
</style>
<template>
    <div id="asset">
        <div class="header-box">
            <div class="header">
                <p class="center">我的资产</p>
                <p class="text">总资产(元)</p>
                <p class="money" v-fixed2small>{{allMoney}}</p>
            </div>
            <div class="income-box">
                <div class="item yesterday">
                    <p class="text">昨日收益(元)</p>
                    <div class="income add" :class="{lose: earningYesterday < 0}">
                        <span>{{earningYesterday > 0 ? '+' : ''}}</span><span v-fixed2small>{{earningYesterday}}</span>
                    </div>
                </div>
                <div class="item hold">
                    <p class="text">持有收益(元)</p>
                    <div class="income add" :class="{lose: holdingGains < 0}">
                        <span>{{holdingGains > 0 ? '+' : ''}}</span><span v-fixed2small>{{holdingGains}}</span>
                    </div>
                </div>
                <div class="item total">
                    <p class="text">累计收益(元)</p>
                    <div class="income add" :class="{lose: accumulatedEarning < 0}">
                        <span>{{accumulatedEarning > 0 ? '+' : ''}}</span><span v-fixed2small>{{accumulatedEarning}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-layout">
            <list-layout :setting="setting" @listener="listen"></list-layout>
        </div>
    </div>
</template>
<script>
    import utils from 'js/utils'
    export default {
        name: 'asset',
        data() {
            return {
                setting: {},
                allMoney: 108002.14, //总资产
                earningYesterday: -29.23,
                holdingGains: 129.23,
                accumulatedEarning: 1029.23,
                productList: []
            }
        },
        mounted() {
            utils.setData('buttomBarActiveIndex', 1);
            this.nextPage();
        },
        methods: {
            listen(ret) {
                if (ret.type == "nextPage") {
                    this.nextPage();
                } else if (ret.type == "refresh") {
                    this.refresh();
                } else if (ret.type == "onclick") {
                    this.gotoDetail(ret.data);
                }
            },
            nextPage() {
                for (var i = 0; i < 10; i++) {
                    var item = {
                        name: '博时货币A',
                        holdShare: '5753.07',
                        earningYesterday: '-5.23',
                        yesterdayFlag: '1',
                        holdingGains: '+150',
                        gainsFlag: '1'
                    }
                    this.productList.push(item);
                }
                this.setListView();
            },
            gotoDetail(data) {
                utils.setData('detailAssetItem', data);
                APP.openWin('/myDetailAsset');
            },
            setListView() {
                this.setting = {
                    data: this.productList,
                    easySet: {
                        lineStyle: {
                            height: "44px"
                        },
                        model: "asset",
                        title: ["产品名称", "持有份额(份)", "昨日收益(元)", "持有收益(元)"],
                        value: [
                            ["name"],
                            ["holdShare"],
                            ["earningYesterday"],
                            ["holdingGains"]
                        ]
                    }
                }
            }
        }
    }
</script>

