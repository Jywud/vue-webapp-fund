<template>
    <div id="hotFundRanking">
        <title-bar v-if="!isShowOrder" title="热门排行" :show-close="false" :isColorful="true">
            <i class="iconfont icon-search" @click="search"></i>
        </title-bar>
        <div id="fund-type" class="fund-type" :style="getFundTypeStyle()">
            <div v-for="(item,index) in fundType" class="type-item" @click="chooseFundType(index)">
                <span class="fund-type-name" :class="{'choose-item':(choosedFundType == index)}">{{item}}</span>
            </div>
        </div>
        <div class="main">
            <list-layout v-show="isShowList" :setting="setting" @listener="listen"></list-layout>
            <empty-view v-show="!isShowList" message="暂无热门排行数据" :needLogin="needLogin"></empty-view>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'optionalFund',
        mounted() {
            this.nextPage();
        },
        data() {
            return {
                fundType: ["全部", "货币型", "混合型", "债券型", "指数型", "股票型"],
                choosedFundType: 0,
                chooseOrder: "日涨幅",
                isShowOrder: false,
                setting: {},
                json: [],
                page: 0,
                showEdit: false,
                weight: [4, 2, 3],
                needLogin: false
            }
        },
        computed: {
            isShowList(){
                return this.json.length ? true : false;
            }
        },
        methods: {
            getFundTypeStyle(){
                return this.isShowOrder ? {height: "45px", lineHeight: "45px"} : {};
            },
            chooseFundType(index){
                this.choosedFundType = index;
            },
            doEdit(){
                if (this.showEdit) {
                    this.showEdit = false;
                    this.weight = [4, 2, 3];
                } else {
                    this.showEdit = true;
                    this.weight = [1.5, 3, 2, 2];
                }
                this.setListView();
            },
            search(){
                APP.openWin("/selectFund")
            },
            edit(){

            },
            listen(ret){
                if (ret.type == "nextPage") {
                    this.nextPage();
                } else if (ret.type == "refresh") {
                    this.refresh();
                } else if (ret.type == "selected") {
                } else if (ret.type == "onclick") {
                    APP.openWin("/fundDetails");
                } else if (ret.type == "orderBy") {
                    this.isShowOrder = ret.data.isShowOrder;
                    this.chooseOrder = ret.data.chooseOrder;
                    alert(JSON.stringify(ret));
                } else if (ret.type == "edit-finish") {
                    this.doEdit();
                }
            },
            nextPage(){
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
            refresh(){
                this.json = [];
                this.page = 0;
                this.nextPage();
            },
            setListView(){
                this.setting = {
                    data: this.json,
                    controller: {
                        nextPage: true //是否有下一页
                    },
                    easySet: {
                        model: "fund",
                        orderBy: ["earningYesterday"],
                        weight: this.weight,
                        title: ["基金名称/基金代码", "单位净值", "日涨幅"],
                        value: [["name", "id"], ["holdShare"], ["earningYesterday"]]
                    }
                }
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";

    #hotFundRanking {
        .page-style();
        .fund-type {
            display: flex;
            flex-flow: row nowrap;
            height: 40px;
            line-height: 40px;
            width: 100%;
            background: @colorful-color;
            margin-top: -2px;
            z-index: 100;
            padding: 0 4px;
            overflow: scroll;
            .type-item {
                flex: 1 0 auto;
                height: 100%;
                color: @white-color;
                padding: 0 12px;
                font-size: 14px;
                .fund-type-name {
                    width: auto;
                    padding: 5px 0;
                }
            }
            .choose-item {
                border-bottom: 2px solid rgba(255, 255, 255, 1);
            }
        }
        .main {
            flex: 1;
            height: 100%;
            overflow: hidden;
        }
        .edit {
            width: auto;
            margin-left: 20px;
            font-size: 16px;
        }
    }
</style>