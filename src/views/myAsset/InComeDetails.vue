<template>
    <div id="inComeDetails">
        <title-bar title="收益明细" :isColorful="true"></title-bar>
        <div class="main">
            <list-layout :setting="setting" @listener="listen"></list-layout>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'login',
        mounted() {
            this.nextPage();
        },
        data() {
            return {
                setting: {},
                incomeJson: []
            }
        },
        methods: {
            listen(ret){
                if (ret.type == "nextPage") {
                    this.nextPage();
                } else if (ret.type == "refresh") {
                } else if (ret.type == "onclick") {
                }
            },
            nextPage(){
                for (var i = 0; i < 20; i++) {
                    var item = {
                        date: '2017-09-20',
                        income: "+" + i
                    }
                    this.incomeJson.push(item);
                }
                this.setListView();
            },
            setListView(){
                this.setting = {
                    data: this.incomeJson,
                    controller: {
                        nextPage: true,
                    },
                    easySet: {
                        model: "inCome",
                        title: ["日期", "当日收益"],
                        value: [["date"], ["income"]]
                    }
                }
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #inComeDetails {
        display: flex;
        flex-flow: column nowrap;
        .page-style();
        .main {
            flex: 1;
            height: 100%;
            margin-top: 10px;
            overflow: hidden;
        }
    }
</style>