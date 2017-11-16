<template>
    <div id="optionalFund">
        <title-bar title="自选基金" :show-close="false" :isColorful="true">
            <i class="iconfont icon-search" @click="search"></i>
            <span v-if="isShowList" class="edit" @click="doEdit">编辑</span>
        </title-bar>
        <div class="main">
            <list-layout v-show="isShowList" :setting="setting" @listener="listen" :showRefresh="true"></list-layout>
            <empty-view v-show="!isShowList" message="暂无自选数据" :needLogin="needLogin"></empty-view>
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
                setting: {},
                json: [],
                page: 0,
                showEdit: false,
                weight: [4, 2, 3],
                needLogin: false,
                isShowOrder: false,
            }
        },
        computed: {
            isShowList(){
                return this.json.length ? true : false;
            }
        },
        methods: {
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
                        nextPage: true,
                        refresh: true,
                        edit: this.showEdit
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

    #optionalFund {
        display: flex;
        flex-flow: column nowrap;
        .page-style();
        .main {
            flex: 1;
            height: 100%;
            overflow: hidden;
            position: relative;
        }
        .edit {
            width: auto;
            margin-left: 20px;
            font-size: 16px;
        }
    }
</style>