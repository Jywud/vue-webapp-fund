<style lang="less">
    @import "../../common/style/common.less";
    #fundValueHistory {
        .page-style();
        .main-column-box {
            background: #fff;
        }
    }
</style>
<template>
    <div id="fundValueHistory">
        <title-bar title=历史净值 :isColorful="true"></title-bar>
        <div class="main-column-box">
            <list-layout :setting="setting" @listener="listen"></list-layout>
        </div>
    </div>
</template>
<script>
    export default {
        name: "fundValueHistory",
        mounted() {
            this.nextPage();
        },
        data() {
            return {
                setting: {},
                incomeJson: []
            };
        },
        methods: {
            listen(ret) {
                if (ret.type == "nextPage") {
                    this.nextPage();
                } else if (ret.type == "refresh") {} else if (ret.type == "onclick") {}
            },
            nextPage() {
                for (var i = 0; i < 20; i++) {
                    var item = {
                        date: "2017-09-20",
                        unitValue: "1.22",
                        totleValye: "2.12",
                        dailyIncreases: "12.33%"
                    };
                    this.incomeJson.push(item);
                }
                this.setListView();
            },
            setListView() {
                this.setting = {
                    data: this.incomeJson,
                    controller: {
                        nextPage: true
                    },
                    easySet: {
                        model: "inCome",
                        weight: [3, 2, 2, 2],
                        title: ["日期", "单位净值", "累计金额", "日涨幅"],
                        value: [
                            ["date"],
                            ["unitValue"],
                            ["totleValye"],
                            ["dailyIncreases"]
                        ]
                    }
                };
            }
        }
    };
</script>
