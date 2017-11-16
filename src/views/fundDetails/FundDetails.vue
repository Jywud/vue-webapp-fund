<template>
    <div id="fundDetails">
        <title-bar :title="fundName" :subTitle="fundAccount" :isColorful="true">
            <i class="iconfont icon-kefu" @click="service"></i>
        </title-bar>
        <div class="main-column-box main">
            <div class="details-main">
                <div class="num-box">
                    <div class="item">
                        <div class="top">1.6564</div>
                        <div class="bottom">单位净值(07-11)</div>
                    </div>
                    <div class="item">
                        <div class="top top-up">
                            <span class="top-value" v-percent>0.0156</span>
                        </div>
                        <div class="bottom">日涨幅</div>
                    </div>
                </div>
                <div class="type-box">
                    <div class="item">低风险</div>
                    <div class="item">债券型</div>
                </div>
                <div class="rating-box">
                    <div class="title">晨星评级(07-11)</div>
                    <score-bar :score="4"></score-bar>
                </div>
            </div>
            <div class="detail-box">
                <div class="tab-bar">
                    <span class="item" :class="{active: isShowMovement}" @click="isShowMovement=true">收益走势</span>
                    <span class="item" :class="{active: !isShowMovement}" @click="isShowMovement=false">历史净值</span>
                </div>
                <div class="movement-pan" v-show="isShowMovement">
                    <div class="trend-chart" ref="trendChart"></div>
                    <div class="trend-type">
                        <div class="item" :class="{active: item.active}" v-for="(item, index) in dateList" :key="index" @click="clickTap(item)">{{item.text}}</div>
                    </div>
                </div>
                <div class="returns-pan" v-show="!isShowMovement">
                    <div class="title-line">
                        <span class="title-item">日期</span>
                        <span class="title-item">单位净值</span>
                        <span class="title-item">累计净值</span>
                        <span class="title-item">日涨幅</span>
                    </div>
                    <div class="content-pan" v-for="(item, index) in earningsList" :key="index">
                        <span class="item">{{item.date}}</span>
                        <span class="item">{{item.unitValue}}</span>
                        <span class="item">{{item.allValue}}</span>
                        <span class="item">{{item.daliyIncrease}}</span>
                    </div>
                    <div class="more" @click="goPage('/fundValueHistory')">查看更多</div>
                </div>
            </div>
            <div class="other-group">
                <row-cell title="基金概况" link="/fundSituation"></row-cell>
                <row-cell title="基金经理" link="/fundManager"></row-cell>
                <row-cell title="投资组合" link="/fundPortfolio"></row-cell>
                <row-cell title="基金分红" link="/fundDividend"></row-cell>
                <row-cell title="基金费率" link="/fundRate"></row-cell>
            </div>
        </div>
        <div class="bottom-box">
            <div class="rate">
                <span class="title">申购费率：</span>
                <span class="value-old">1.00%</span>
                <span class="value-new">0.60%</span>
            </div>
            <div class="button-box">
                <div class="add" @click="addOptional">
                    <span class="iconfont icon-white add-icon"></span>
                    <span class="">{{optional? '取消自选' : '加自选'}}</span>
                </div>
                <div class="vote" @click="goPage('/investModify')">
                    <span class="iconfont icon-dingtou vote-icon"></span>
                    <span class="vote-value">定投</span>
                </div>
                <div class="buy" @click="goPage('/fundBuy')" v-btntouch>
                    <span class="iconfont icon-goumai buy-icon"></span>
                    <span class="buy-value">购买</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/line');
    require('echarts/lib/component/tooltip');
    // require('echarts/lib/component/title');
    require('echarts/lib/component/legend');
    import utils from 'js/utils'
    export default {
        name: 'fundDetails',
        mounted() {            
            this.setChart();            
        },
        data() {
            return {
                fundName: '永赢双利债券A',
                fundAccount: '124562',
                isShowMovement: true,
                optional: false, // 自选
                json: [],
                setting: {},
                earningsList: [
                    {date: '2017-01-02', unitValue: '5.05', allValue: '121', daliyIncrease: '2.34%'},
                    {date: '2017-01-02', unitValue: '5.05', allValue: '121', daliyIncrease: '2.34%'},
                    {date: '2017-01-02', unitValue: '5.05', allValue: '121', daliyIncrease: '2.34%'},
                    {date: '2017-01-02', unitValue: '5.05', allValue: '121', daliyIncrease: '2.34%'}                    
                ],
                dateList: [{
                        text: '近1月',
                        active: true
                    },
                    {
                        text: '近3月',
                        active: false
                    },
                    {
                        text: '近6月',
                        active: false
                    },
                    {
                        text: '近1年',
                        active: false
                    }
                ]
            }
        },
        computed: {},
        methods: {
            /* 自选按钮 */
            addOptional() {
                this.optional = !this.optional;
            },
            goPage(url) {
                APP.openWin(url);
            },
            setChart() {
                this.$nextTick(() => {
                    var myChart = echarts.init(this.$refs.trendChart);
                    var colors = ['#ff4e50', '#2a8ecc', '#ffaa34'];
                    myChart.setOption({
                        color: colors,
                        tooltip: {
                            show: true,
                            axisPointer: {
                                type: 'cross'
                            },
                            textStyle: {
                                color: "#333333"
                            },
                            borderWidth: 1,
                            borderColor: "#20c060",
                            backgroundColor: "#ffffff"
                        },
                        legend: {
                            icon: 'rect',
                            top: 10,
                            itemWidth: 8,
                            itemHeight: 2,
                            data: [{
                                name: '本基金:0.30%',
                                icon: "null",
                                textStyle: {
                                    color: colors[0],
                                }
                            }, {
                                name: '同类均值:0.50%',
                                textStyle: {
                                    color: colors[1]
                                }
                            }, {
                                name: '沪深:0.40%',
                                textStyle: {
                                    color: colors[2]
                                }
                            }]
                        },
                        grid: {
                            top: 40,
                            bottom: 20
                        },
                        xAxis: [{
                            type: 'category',
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#f1f1f1', //网格线颜色
                                    width: 1, //网格线宽度
                                    type: 'dashed' //网格线样式
                                }
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            axisPointer: {
                                label: {
                                    formatter: function(params) {
                                        return '降水量  ' + params.value +
                                            (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                    }
                                }
                            },
                            data: ["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12", "2017-1", "2017-2", "2017-3", "2017-4", "2017-5", "2017-6", "2017-7", "2017-8", "2017-9", "2017-10", "2017-11", "2017-12"]
                        }],
                        yAxis: [{
                            type: 'value',
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#f1f1f1', //网格线颜色
                                    width: 1, //网格线宽度
                                    type: 'dashed' //网格线样式
                                }
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            min: -5,
                            max: 20
                        }],
                        series: [{
                                name: '本基金:0.30%',
                                type: 'line',
                                smooth: false,
                                data: [3.6, 4.9, 6.0, 5.3, 4.8, 7.3, 8.6, 6.2, 6.7, 5.8, 6.0, 6.3, 6.6, 7.9, 5.0, 8.3, 8.8, 13.3, 14.6, 15.2, 16.7, 15.8, 17.0, 18.3]
                            },
                            {
                                name: '同类均值:0.50%',
                                type: 'line',
                                smooth: false,
                                data: [5.2, 6.3, 6.1, 6.7, 5.3, 5.2, 6.3, 6.6, 7.4, 9.4, 7.3, 6.7, 5.2, 5.3, 4.1, 5.7, 5.3, 7.2, 8.3, 7.6, 9.4, 10.4, 15.3, 15.7]
                            },
                            {
                                name: '沪深:0.40%',
                                type: 'line',
                                smooth: false,
                                data: [5.2, 5.3, 5.1, 5.7, 6.3, 5.2, 5.3, 5.6, 4.4, 5.4, 5.3, 6.7, 5.2, 6.3, 6.1, 7.7, 8.3, 9.2, 8.3, 8.6, 8.4, 8.4, 8.3, 8.7]
                            }
                        ]
                    });
                });
            },
            /* 客服 */
            service() {},
            clickTap(item) {
                this.dateList.forEach((data) => {
                    data.active = false;
                });
                item.active = true;
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #fundDetails {
        .page-style();
        .main {
            .details-main {
                background: @white-color;
                width: 100%;
                .num-box {
                    display: flex;
                    flex-flow: row nowrap;
                    width: 100%;
                    padding: 20px 0 10px 0;
                    .item {
                        flex: 1;
                        width: 100%;
                        text-align: center;
                        .top {
                            font-size: 26px;
                            color: @dark-color;
                        }
                        .top-up {
                            color: @primary-color;
                            padding: 0;
                        }
                        .top-down {
                            color: @lose-color;
                            padding: 0;
                        }
                        .top-value {
                            padding: 0;
                            margin: 0;
                        }
                        .top-unit {
                            font-size: 13px;
                            padding: 0;
                            margin-left: -6px;
                        }
                        .bottom {
                            font-size: 13px;
                            color: @gray-color;
                        }
                    }
                    .item:first-child {
                        .border-r-1px(@border-color)
                    }
                }
                .type-box {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    padding: 4px 0 8px 0;
                    color: @gray-color;
                    font-size: 13px;
                    .item {
                        padding: 4px 7px;
                        border: 1px solid @border-color;
                        border-radius: 2px;
                    }
                    .item:first-child {
                        margin-right: 10px;
                    }
                }
                .rating-box {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    padding: 4px 0 14px 0;
                    color: @gray-color;
                    font-size: 13px;
                    .title {
                        margin-right: 10px;
                    }
                    .value {}
                }
            }
            .detail-box {
                margin: 10px 0;
                background: #fff;
                .tab-bar {
                    display: flex;
                    .border-b-1px(); // border-bottom: 1px solid @border-color;
                    .item {
                        flex: 1;
                        width: 0;
                        text-align: center;
                        padding: 12px 0;
                        font-size: 16px;
                        color: @dark-color;
                        margin: 0 40px;
                        &.active {
                            color: @primary-color;
                            border-bottom: 2px solid @primary-color;
                        }
                    }
                }
                .movement-pan {
                    width: 100%;
                    height: 244px;
                    display: flex;
                    flex-flow: column nowrap;
                    padding: 10px 16px;
                    .trend-chart {
                        flex: 1;
                        height: 100%;
                        width: 100%;
                        border: 1px solid @border-color;
                    }
                    .trend-type {
                        display: flex;
                        flex-flow: row nowrap;
                        width: 100%;
                        height: 26px;
                        margin-top: 10px;
                        .item {
                            flex: 1;
                            border: 1px solid @border-color;
                            text-align: center;
                            line-height: 26px;
                            font-size: 14px;
                            color: @gray-color;
                            &.active {
                                border-color: @primary-color;
                                color: @primary-color;
                            }
                        }
                    }
                }
                .returns-pan {                                        
                    .title-line {
                        display: flex;
                        padding: 10px 0;
                        background: #f8f8f8;
                        text-align: center;
                        font-size: 13px;
                        color: @litdark-color;
                        .title-item {
                            flex: 1;
                            width: 100%; 
                            &:first-child{
                                flex: 2;
                            }                           
                        }
                    }
                    .content-pan {
                        display: flex;
                        padding: 10px 0;
                        font-size: 16px;
                        color: @litdark-color;
                        text-align: center;
                        .border-b-1px();
                        .item {
                            flex: 1;
                            width: 100%;   
                            &:first-child{
                                flex: 2;
                            }                          
                        }
                    }
                    .more {
                        padding: 12px 0;
                        text-align: center;
                        color: @primary-color;
                        .border-t-1px(@border-color);
                    }
                }
            }
            .other-group {
                wdith: 100%;
                background: @white-color;
                margin-bottom: 80px;
            }
        }
        .bottom-box {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: auto;
            background: @white-color;
            .rate {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 24px;
                .border-t-1px(@border-color);
                .title,
                .value-old,
                .value-new {
                    font-size: 12px;
                    color: @dark-color;
                }
                .value-old {
                    text-decoration: line-through
                }
                .value-new {
                    color: @primary-color;
                    margin-left: 4px;
                }
            }
            .button-box {
                display: flex;
                flex-flow: row nowrap;
                width: 100%;
                height: 50px;
                .border-t-1px(@border-color);
                .add {
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: center;
                    align-items: center;
                    width: 72px;
                    height: 100%;
                    font-size: 12px;
                    color: @gray-color;
                    .border-r-1px(@border-color);
                    .add-icon {
                        font-size: 11px;
                        color: @gray-color;
                    }
                }
                .vote {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: center;
                    align-items: center;
                    flex: 1;
                    width: 100%;
                    font-size: 16px;
                    color: @primary-color;
                    .vote-icon {
                        padding: 4px 2px 0;
                        font-size: 14px;
                    }
                    .vote-value {
                        margin-left: 6px;
                    }
                }
                .buy {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: center;
                    align-items: center;
                    flex: 1;
                    width: 100%;
                    background: @primary-color;
                    font-size: 16px;
                    color: @white-color;
                    .buy-icon {
                        font-size: 14px;
                        padding: 4px 2px 0;
                    }
                    .buy-value {
                        margin-left: 6px;
                    }
                }
            }
        }
    }
</style>