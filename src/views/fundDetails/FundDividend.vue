<style lang="less">
@import "../../common/style/common.less";
#fundDividend{
    .page-style();
    .main-column-box{
        background: #fff;
    }
}
</style>
<template>
    <div id="fundDividend">
        <title-bar title="基金分红" :isColorful="true"></title-bar>
        <div class="main-column-box">
            <list-layout :setting="setting" @listener="listen"></list-layout>
        </div>
    </div>
</template>
<script>
export default {
    name: 'fundDividend',
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
                        dividendDate: '2017-09-20',
                        recordDate: '2015-09-20',
                        money: '0.12'
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
                        title: ["派息日", "登记日", "分红金额"],
                        value: [["dividendDate"], ["recordDate"], ["money"]]
                    }
                }
            }
        }
}
</script>
