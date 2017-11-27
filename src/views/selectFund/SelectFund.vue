<template>
    <div id="selectFund">
        <div class="select-main">
            <div class="search-input">
                <span class=" iconfont icon-search search-icon"></span>
                <input class="search-value" v-model="searchText" placeholder="输入基金名称/代码进行搜索" v-focus>
                <span class="iconfont icon-empty mes-clean" v-show="isShowEmpty" @click="searchText=''"></span>
            </div>
            <div class="search-cancel" @click="cancel()">取消</div>
        </div>
        <div class="history-pan" v-show="showHistoryBtnPan">
            <span>搜索记录</span>
            <span class="btn-empty" @click="emptyHistoryList">清空搜索记录</span>
        </div>
        <div class="content-main">
            <list-layout v-show="isShowList" :setting="setting" @listener="listen"></list-layout>
            <empty-view v-show="!isShowList" message="搜索无结果" :needLogin="needLogin"></empty-view>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'selectFund',
        mounted() {
            this.nextPage();
        },
        data() {
            return {
                showHistoryBtnPan: true,
                searchText: '',
                isShowEmpty: false,
                setting: {},
                json: [],
                page: 0,
                weight: [4, 2, 3],
                needLogin: false,
                isShowOrder: false
            }
        },
        computed: {
            isShowList(){
                return this.json.length ? true : false;
            }
        },
        watch: {
            searchText(val) {
                this.isShowEmpty = val.length >0 ? true: false;
                if(val.length >0) {
                    this.showHistoryBtnPan = false;
                }
            }
        },
        methods: {
            /* 清空历史记录 */
            emptyHistoryList() {

            },
            cancel(){
                APP.closeWin();
            },
            search(){

            },
            listen(ret){
                if (ret.type == "onclick") {
                    APP.openWin("/fundDetails");
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
                    easySet: {
                        model: "fund",
                        weight: this.weight,
                        value: [["name", "id"], ["holdShare"], ["earningYesterday"]]
                    }
                }
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";

    #selectFund {
        .page-style();
        .select-main {
            display: flex;
            flex-flow: row nowrap;
            width: 100%;
            height: 44px;
            background: @colorful-color;
            z-index: 100;
            .search-input {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                flex: 1;
                margin: 6px 10px;
                width: 100%;
                height: 32px;
                background: rgba(0, 0, 0, 0.1);
                border-radius: 4px;
                .search-icon {
                    color: @white-color;
                    font-size: 16px;
                    padding: 0 10px;
                }
                .search-value {
                    flex: 1;
                    color: @white-color;                    
                    font-size: 14px;
                    text-align: left;
                    background: rgba(0, 0, 0, 0);
                }
                .mes-clean{
                    font-size: 16px;
                    color: rgba(255,255,255,0.6);                    
                    margin-right: 6px;
                }
            }
            .search-cancel {
                height: 45px;
                line-height: 45px;
                padding-right: 16px;
                font-size: 14px;
                color: @white-color;
            }
        }
        .history-pan{
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            color: @light-color;
            padding: 15px;
            background: #fff;
            .border-b-1px();
            .btn-empty{
                padding: 2px 4px;
                border: 1px solid @light-color;                
                text-align: right;
                border-radius: 100px;
            }
        }
        .content-main {
            flex: 1;
            height: 100%;
            overflow: hidden;
        }
    }
</style>