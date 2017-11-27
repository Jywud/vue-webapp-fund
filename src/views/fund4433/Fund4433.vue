<style lang="less">
    @import "../../common/style/common.less";

    #fund4433 {
        .page-style();
        .icon-search {
            margin-right: 20px;
        }
        .content-box {
            display: flex;
            flex-direction: column;
        }
        .info-box {
            background: #fff;
            padding: 10px 16px;
            margin-bottom: 10px;
            .text-pan {
                display: flex;
                align-items: flex-start;
                padding: 8px;
                .circle-icon {
                    margin: 6px 4px 0 0;
                    flex: 0 0 5px;
                    width: 5px;
                    height: 5px;
                    border-radius: 5px;
                    background: @primary-color;
                }
            }
        }
    }
</style>
<template>
    <div id="fund4433">
        <title-bar title="4433选基法" :isColorful="true" back-path="/home">
            <i class="iconfont icon-search"></i>
            <i class="iconfont icon-explain" @click="goPage"></i>
        </title-bar>
        <div class="main-column-box content-box">
            <div class="info-box">
                <div class="text-pan">
                    <div class="circle-icon"></div>
                    <span class="text">近1年收益率在同类型基金中排名前1/4</span></div>
                <div class="text-pan">
                    <div class="circle-icon"></div>
                    <span class="text">今年以来、两年、三年、五年收益率在同类型基金中排名前1/4</span></div>
                <div class="text-pan">
                    <div class="circle-icon"></div>
                    <span class="text">近3个月收益率在同类型基金中排名前1/3</span></div>
                <div class="text-pan">
                    <div class="circle-icon"></div>
                    <span class="text">近6个月收益率在同类型基金中排名前1/3</span></div>
            </div>
            <list-layout :setting="setting" @listener="listen"></list-layout>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'fund4433',
        mounted() {
            this.nextPage();
        },
        data() {
            return {
                fundJson: [],
                setting: {}
            }
        },
        methods: {
            listen(item) {
                if(item.type="onclick") {
                    APP.openWin('/fundDetails');
                }
                // console.log(item)
            },
            goPage() {
                APP.openWin('/fund4433Introduce');
            },
            nextPage(){
                for (var i = 0; i < 15; i++) {
                    var item = {
                        name: '南京稳健性',
                        code: 10000 + i,
                        value: 1 + i,
                        dailyIncreases: '+2'
                    }
                    this.fundJson.push(item);
                }
                this.setListView();
            },
            setListView(){
                this.setting = {
                    data: this.fundJson,
                    easySet: {
                        model: "fund",
                        nextPage: true,
                        weight: [2, 1, 2],
                        title: ["基金名称/代码", "单位净值", "日涨幅"],
                        value: [["name", "code"], ["value"], ["dailyIncreases"]]
                    }
                }
            }
        }
    }
</script>
