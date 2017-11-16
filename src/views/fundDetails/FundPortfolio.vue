<style lang="less">
@import "../../common/style/common.less";
#fundPortfolio{
    .page-style();
    .main-column-box{
        
    }
    .group{
        margin: 10px 0;
        background: #fff;
        .title-pan{
            padding: 12px;
            .border-b-1px();
            .title{
                padding-left: 4px;
                border-left: 3px solid @primary-color;
            }
        }
        .content-pan{
            padding: 10px;            
            height: 200px;
        }
        .list-pan{
            .item{
                display: flex;
                padding: 15px 30px;
                background: #fff;
                color: @dark-color;
                font-size: 14px;
                .border-b-1px();
                &:first-child{
                    background: #f8f8f8;
                    font-size: 13px;
                    color: @gray-color;
                }
                .left{                                        
                    text-align: left;
                }
                .right{
                    flex: 1;
                    text-align: right;
                }
            }
        }
    }

}
</style>
<template>
    <div id="fundPortfolio">
        <title-bar title="投资组合" :isColorful="true"></title-bar>
        <div class="main-column-box">
            <div class="group">
                <div class="title-pan">
                    <div class="title">资产分布</div>
                </div>
                <div class="content-pan" ref="assets"></div>
            </div>
            <div class="group">
                <div class="title-pan">
                    <div class="title">前五大行业分布</div>
                </div>
                <div class="content-pan" ref="industry"></div>
            </div>
            <div class="group">
                <div class="title-pan">
                    <div class="title">十大重仓股票</div>
                </div>
                <div class="list-pan">
                    <div class="item">
                        <span class="left">股票名称</span>
                        <span class="right">占净资产比例</span>
                    </div>
                    <div class="item" v-for="(item, index) in list" :key="index">
                        <span class="left">{{item.name}}</span>
                        <span class="right">{{item.value}}</span>
                    </div>                   
                </div>
            </div>
        </div>
    </div>
</template>
<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legendScroll');
var optionAssets = {    
    tooltip: {
        trigger: 'item',
        formatter: "{b}: {d}%"
    },
    legend: {
        orient: 'vertical',
        x: 'right',
        itemWidth: 16,
        data:['股票','债券','现金','其他'],
        formatter: function(name) {
            return name
        }
    },
    series: [
        {
            name:'',
            type:'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '18'
                    }
                },
                normal: {
                    formatter: '{d}%'
                }
            },
            data:[
                {value:60, name:'股票'},
                {value:20, name:'债券'},
                {value:10, name:'现金'},
                {value:10, name:'其他'}
            ]
        }
    ]
};
var optionIndustry = {    
    tooltip: {
        trigger: 'item',
        formatter: "{b}: {d}%"
    },
    legend: {
        orient: 'vertical',
        x: 'right',
        itemWidth: 16,
        data:['制造业', '金融业', '建筑业', '电力、热力、燃气及水生产和供应', '批发和零售业'],
        formatter: function(name) {
            return name
        }
    },
    series: [
        {
            name:'',
            type:'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '18'
                    }
                },
                normal: {
                    formatter: '{d}%'
                }
            },
            data:[
                {value:60, name:'制造业'},
                {value:10, name:'金融业'},
                {value:10, name:'建筑业'},
                {value:10, name:'电力、热力'},
                {value:10, name:'批发和零售业'}
            ]
        }
    ]
};
export default {
    name: 'fundPortfolio',
    mounted() {
        this.$nextTick( ()=> {
            var chartAssets = echarts.init(this.$refs.assets); 
            var chartIndustry = echarts.init(this.$refs.industry); 
            chartAssets.setOption(optionAssets);            
            chartIndustry.setOption(optionIndustry);
        });
        
    },
    data() {
        return {
            list: [
                {name: '长江电力', value: '5.63%'},
                {name: '长江电力', value: '5.63%'},
                {name: '长江电力', value: '5.63%'},
                {name: '长江电力', value: '5.63%'},
                {name: '长江电力', value: '5.63%'},
                {name: '长江电力', value: '5.63%'},
                {name: '长江电力', value: '5.63%'},
                {name: '长江电力', value: '5.63%'},
                {name: '长江电力', value: '5.63%'},
                {name: '长江电力', value: '5.63%'}
            ]
        }
    },
    methods: {
         
    }
}
</script>
