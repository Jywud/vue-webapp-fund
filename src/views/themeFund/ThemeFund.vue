<style lang="less">
@import "../../common/style/common.less";
#themeFund{
    .page-style();
    .theme-box{
        background: #fff;
        margin: 10px 0;
        .title{
            padding: 10px;
            font-size: 13px;
            color: @litdark-color;
            .border-b-1px();
        }
        .item-box{
            display: flex;
            flex-flow: row wrap;
            margin: 0 5px;
            padding: 10px 0;
            .item-wrap{                
                width: 25%;
                padding: 4px;
                .item{
                    border: 1px solid #ededed;
                    padding: 6px 4px;
                    text-align: center;
                    font-size: 14px;
                    .fund-name{                        
                        color: @dark-color;                        
                    }
                    .percent{
                        color: @primary-color;
                        &.isDown{
                            color: @lose-color;
                        }
                    }
                    
                }                
            }
        }
        
    }
}

</style>
<template>
    <div id="themeFund">
        <title-bar title="主题基金" back-path="/home" :isColorful="true">
            <i class="iconfont icon-search" @click="search"></i>
        </title-bar>
        <div class="main-column-box">
            <div class="theme-box" v-for="(item, index) in list" :key="index">
                <p class="title">{{item.title}}</p>
                <div class="item-box">
                    <div class="item-wrap" v-for="(item2, index2) in item.data" :key="index2" @click="gotoDetail(item2)">
                        <div class="item">
                            <p class="fund-name">{{item2.name}}</p>
                            <p class="percent" :class="doPercent(item2.percent)">{{item2.percent}}</p>
                        </div>                    
                    </div>
                </div>            
            </div>
        </div>        
    </div>
</template>
<script>
import utils from 'js/utils'
export default {
    name: 'themeFund',
    mounted() {},
    data() {
        return {
            list:[
                {title: '指数', data: [
                    {name: '深成510', percent: '6.07%'},
                    {name: '深成520', percent: '-6.07%'},
                    {name: '深成530', percent: '6.07%'},
                    {name: '深成540', percent: '6.07%'},
                    {name: '深成500', percent: '-6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'}
                ]},
                {title: '指数2', data: [
                    {name: '深成500', percent: '-6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'}
                ]},
                {title: '指数3', data: [
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'}
                ]},
                {title: '指数3', data: [
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'}
                ]},
                {title: '指数3', data: [
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'},
                    {name: '深成500', percent: '6.07%'}
                ]}            
            ]
        }
    },
    methods: {
        search() {

        },
        doPercent(data) {
            return data.indexOf('-') == 0? 'isDown' : '';
        },
        gotoDetail(data) {
            utils.setData('themeFundData', data);
            APP.openWin('/themeFundDetail');
        }
    }
}
</script>
