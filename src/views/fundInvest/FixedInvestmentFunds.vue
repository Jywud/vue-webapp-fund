<template>
    <div id="fixedInvestmentFunds">
        <title-bar title="定投专区" :isColorful="true" v-show='isShowNavBar' back-path="/home">
            <i class="iconfont icon-search" @click="search"></i>
        </title-bar>
        <div class="tab-bar">
            <div class="content">
                <span :class="{active: isShowMovement}" @click="isShowMovement=true">定投排行</span>
            </div>
            <div class="content">
                <span :class="{active: !isShowMovement}" @click="isShowMovement=false">我的定投</span>
            </div>
        </div>
        <div class="main-column-box">
            <div class="funds-ranking" v-show='isShowMovement'>
                <list-layout v-show="isShowList" :setting="setting" @listener="listen"></list-layout>
                <empty-view v-show="!isShowList" message="暂无数据" :needLogin="isNeedLogin"></empty-view>
            </div>
            <div class="my-funds" v-show='!isShowMovement'>                
                <div class="all" v-for="(item, index) in myFunds" :key="index" @click="goMyPageDetail(item)" v-if="isShowMyFundList">
                    <p>{{item.name}}<span>{{item.code}}</span></p>
                    <div class="product">
                        <div class="item-left item">累计定投金额</div>
                        <div class="item-right item">{{item.totleMoney}}元</div>
                    </div>
                    <div class="product">
                        <div class="item-left item">累计份额</div>
                        <div class="item-right item">{{item.totleShare}}元</div>
                    </div>
                    <div class="product">
                        <div class="item-left item">下次扣款日期</div>
                        <div class="item-right item">{{item.date}}</div>
                    </div>
                </div>
                <empty-view v-if="!isShowMyFundList" :needLogin="isNeedLogin" message="无定投计划"></empty-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'fixedInvestmentFunds',
        mounted() {
            this.nextPage();
        },
        data() {
            return {
                setting: {},
                json: [],
                page: 0,
                weight: [4, 2, 3],
                isShowMovement: true,
                isShowNavBar: true,
                isShowMyFundList: true, //是否显示我的定投列表
                isNeedLogin: false,     //是否展示登录再查看按钮
                myFunds: [
                    {
                        name: '南方稳健壹号',
                        code: '234533',
                        totleMoney: '100',
                        totleShare: '100',
                        date: '2017-10-26'
                    },
                    {
                        name: '南方稳健壹号2',
                        code: '234513',
                        totleMoney: '200',
                        totleShare: '100',
                        date: '2017-10-26'
                    },
                    {
                        name: '南方稳健壹号2',
                        code: '264533',
                        totleMoney: '300',
                        totleShare: '100',
                        date: '2017-10-26'
                    },
                    {
                        name: '南方稳健壹号2',
                        code: '234833',
                        totleMoney: '100',
                        totleShare: '400',
                        date: '2017-10-26'
                    },
                    {
                        name: '南方稳健壹号3',
                        code: '230533',
                        totleMoney: '100',
                        totleShare: '100',
                        date: '2017-10-26'
                    }                    
                ]
            }
        },
        computed: {
            isShowList() {
                return this.json.length ? true : false;
            }
        },
        methods: {
            goMyPageDetail(item) {
                APP.openWin('/investDetail')
            },
            doEdit() {
                if (this.showEdit) {
                    this.showEdit = false;
                    this.weight = [4, 2, 3];
                } else {
                    this.showEdit = true;
                    this.weight = [1.5, 3, 2, 2];
                }
                this.setListView();
            },
            search() {
            },
            listen(ret) {
                if (ret.type == "nextPage") {
                    this.nextPage();
                } else if (ret.type == "refresh") {
                    this.refresh();
                } else if (ret.type == "selected") {} else if (ret.type == "onclick") {} else if (ret.type == "orderBy") {
                    this.isShowNavBar = !ret.data.isShowOrder;
                    //alert(JSON.stringify(ret));
                } else if (ret.type == "edit-finish") {
                    this.doEdit();
                }
            },
            nextPage() {
                for (var i = 0; i < 20; i++) {
                    var item = {
                        name: '南方稳健壹号' + (i + this.page * 20),
                        id: '200165',
                        holdShare: '1.0721',
                        earningYesterday: '-5.23',
                    }
                    this.json.push(item);
                }
                this.page = this.page + 1;
                this.setListView();
            },
            refresh() {
                this.json = [];
                this.page = 0;
                this.nextPage();
            },
            setListView() {
                this.setting = {
                    data: this.json,
                    controller: {
                        nextPage: true, //是否有下一页
                        edit: this.showEdit //是否可编辑
                    },
                    easySet: {
                        model: "fund",
                        orderBy: ["earningYesterday"],
                        weight: this.weight,
                        orderType: ["近1月", "近3月", "近6月", "近一年", "成立以来收益"],
                        title: ["基金名称/基金代码", "单位净值", "近一年收益"],
                        value: [
                            ["name", "id"],
                            ["holdShare"],
                            ["earningYesterday"]
                        ]
                    }
                }
            }
        }
    }
</script>

<style lang="less">
    @import "../../common/style/common.less";
    #fixedInvestmentFunds {
        // display: flex;
        // flex-flow: column nowrap;
        .page-style();
        .hs-titleBar {
            border-bottom: none;
        }
        .tab-bar {
            display: flex;
            color: #fff;
            width: 100%;
            background-image: @colorful-color;
            height: 36px;
            .content {
                flex: 1;                
                height: 36px;    
                font-size: 16px;
                text-align: center;   
                line-height: 1.8;        
                span {
                    padding-bottom: 2px;
                    &.active {
                        color: #fff;
                        border-bottom: 2px solid #fff;
                    }
                }
            }
        }
        .main-column-box {
            display: flex;
        }
        .funds-ranking {
            width: 100%;
        }
        .my-funds {
            flex: 1;
            width: 100%;
            .all {
                background: #fff;
                border-radius: 6px;
                margin: 12px;
                font-size: 18px;
                line-height: 16px;
                p {
                    font-size: 16px;
                    color: @dark-color;                   
                    .border-b-1px();
                    padding: 15px;
                    span {
                        font-family: HelveticaNeue;
                        font-size: 12px;
                        color: @gray-color;
                        line-height: 12px;
                        margin-left: 8px;
                    }
                }
                .product {
                    display: flex;
                    .item {
                        flex: 1;
                        font-size: 14px;                        
                        margin: 10px 16px;
                    }
                    .item-left {
                        color: @gray-color;
                        text-align: left;
                    }
                    .item-right {
                        color: @dark-color;
                        text-align: right;
                    }
                }
            }
        }
    }
</style>
