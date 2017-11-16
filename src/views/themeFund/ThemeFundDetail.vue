<style lang="less">
@import "../../common/style/common.less";
#themeFundDetail{
    .page-style();
    .top-box{
        display: flex;
        margin-bottom: 10px;
        padding: 16px;
        background: #fff;
        .item{
            flex: 1;
            text-align: center;
            .name{
                color: @gray-color;
                font-size: 13px;
                margin-top: 4px;
            }
        }
        .left-pan{
            .border-r-1px();
            .percent{
                font-size: 26px;
                color: @primary-color;
                line-height: 1;
            }
            .triangle{
                .triangle-down();
                margin: -2px 0 0 2px;
            }
        }
        .right-pan{
            .ranking{
                font-size: 20px;
                color: @primary-color;
            }
            .total{
                font-size: 20px;                
            }
        }
    }
    .list-box{
        flex: 1;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        .list-title{
            background: #fff;
        }
        
    }
}
</style>
<template>
    <div id="themeFundDetail">
        <title-bar :title="fromData.name" :isColorful="true">
            <i class="iconfont icon-search" @click="search"></i>
        </title-bar>
        <div class="top-box">
            <div class="item left-pan"  @click="select">
                <p class="percent" v-percent>0.065</p>
                <p class="name">
                    <span>{{increaseVal[0]}}</span>
                    <span class="triangle"></span>
                </p>
            </div>
            <div class="item right-pan">
                <p class="">
                    <span class="ranking">71</span>
                    <span class="total">/208</span>
                </p>
                <p class="name">排名</p>
            </div>
        </div>
        <div class="list-box">
            <list-layout :setting="setting" @listener="listen"></list-layout>
        </div>
        <popup-picker :show.sync="showIncreasePicker" :data="increaseList" :show-cell="false" v-model="increaseVal"></popup-picker>
    </div>
</template>
<script>
import utils from 'js/utils'
import { PopupPicker} from 'vux'
export default {
    name: 'themeFundDetail',
    mounted() {
        this.fromData = utils.getData('themeFundData');
        this.nextPage();
    },
    data() {
        return {
            showIncreasePicker: false,
            fromData: '',
            setting: {},
            fundJson: [],
            increaseVal:['日涨幅'],
            increaseList: [
                ['日涨幅', '周涨幅', '月涨幅', '季涨幅', '年涨幅']
            ]
        }
    },
    methods: {
        select() {
            this.showIncreasePicker = true;
        },
        search() {},
        listen(item) {
            if(item.type == "onclick") {
                APP.openWin('/fundDetails');
            }
        },
        nextPage(){
            for (var i = 0; i < 20; i++) {
                var item = {
                    name: '南京稳健性',
                    code: 10000 + i,
                    value: 111 + i,
                    dailyIncreases: '+2'
                }
                this.fundJson.push(item);
            }
            this.setListView();
        },
        setListView(){
            this.setting = {
                data: this.fundJson,
                style: {
                    height: document.body.clientHeight - 155 + "px"
                },
                easySet: {
                    model: "fund",
                    nextPage: true,                    
                    title: ["基金名称/代码", "单位净值", "日涨幅"],
                    value: [["name", "code"], ["value"], ["dailyIncreases"]]                    
                }
            }
        }
    },
    components: {
        PopupPicker
    }
}
</script>

