<style lang="less">
@import "../../common/style/common.less";

#recommend {
    .overflow-auto();
    padding-bottom: 50px;
    .search-main {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        position: fixed;
        top: 0px;
        width: 100%;
        height: 45px;
        z-index: 20;
        .search-input {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            flex: 1;
            margin: 6px 10px;
            width: 100%;
            height: 32px;
            background-color: rgba(255,255,255,0.8);
            color: #888;
            border-radius: 4px;
            .search-icon {               
                font-size: 16px;
                padding-right: 10px;
            }
            .search-description {                
                font-size: 14px;
                text-align: center;
            }
        }
    }
    .classify-box {
        display: flex;
        background: #fff;
        .item {
            flex: 1;
            width: 0;
            padding: 19px 0;
            text-align: center;            
            svg.icon {
                width: 0.26rem;
                height: 0.26rem;
            }
            .text {
                margin-top: 7px;
                color: @litdark-color;
                font-size: 14px;
            }
        }
    }
    .choiceness-box {
        margin: 10px 0;
        // background: #fff;
        .item {
            position: relative;
            width: 100%;
            overflow: hidden;
            padding: 21px 0 24px;
            border-bottom: 1px solid #f3f4f7;
            background-color: #fff;
            background-image: url(../../../static/image/decorate.png);
            .icon-text {
                position: absolute;
                top: 14px;
                right: -28px;
                width: 100px;
                height: 22px;
                line-height: 22px;
                font-size: 14px;
                background-image:@colorful-color;
                color: #fff;
                text-align: center;
                transform: rotate(45deg);
            }
            .name {
                margin-bottom: 15px;
                color: @dark-color;
                font-size: 18px;
            }
            .rate {
                margin-bottom: 10px;
                font-size: 30px;
                color: @primary-color;
            }
            .text {
                margin-bottom: 20px;
                font-size: 13px;
                color: #a8a8a8;
            }
            .btn-buy {
                margin: 0 auto;
                width: 220px;
                height: 36px;
                line-height: 36px;
                background: @primary-color;
                text-align: center;
                color: #fff;
            }
            .text-center {
                text-align: center;
            }
        }
    }
    .hot-box {
        background: #fff;
        .top-pan {
            width: 100%;
            padding: 12px;
            display: flex;
            .title {
                flex: 0 0 100px;
                width: 100px;
                padding-left: 4px;
                color: @dark-color;
                border-left: 3px solid @primary-color;
            }
            .more {
                flex: 1;
                color: @gray-color;
                text-align: right;
                .icon{
                    margin-left: 6px;
                    .triangle-right();
                }
                
            }
        }
        .content-pan {
            .item {
                padding: 12px 20px;
                display: flex;
                border-top: 1px solid #f3f4f7;
                .left-pan {
                    flex: 0 0 110px;
                    width: 110px;
                    border-right: 1px solid #f3f4f7;
                    .rate {
                        font-size: 24px;
                        color: @primary-color;
                        margin-bottom: 5px;
                    }
                    .text {
                        font-size: 13px;
                        color: #a8a8a8;
                    }
                }
                .right-pan {
                    flex: 1;
                    padding-left: 30px;
                    .name {
                        font-size: 17px;
                        color: @dark-color;
                        margin-bottom: 14px;
                    }
                    .detail {
                        color: #a8a8a8;
                        font-size: 13px;
                        .text {
                            border-right: 1px solid #a8a8a8;
                            padding-right: 8px;
                            &:last-child {
                                border: none;
                                padding-right: 0;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div id="recommend" @scroll="mScroll($event)">
        <div id="search-main" class="search-main">
            <div class="search-input" @click="goPage('/selectFund')">
                <span class=" iconfont icon-search search-icon"></span>
                <span class="search-description">输入基金名称/代码进行搜索</span>
            </div>
        </div>
        <swiper :list="list" auto loop dots-position="center" style="width:100%;margin:0 auto;"></swiper>
        <div class="classify-box">
            <div class="item" v-for="(item, index) in subjectList" @click="goSubject(item)" :key="index" v-touch>
                <img :src="item.image">
                <p class="text">{{item.name}}</p>
            </div>
        </div>            
        <div class="choiceness-box">
            <div class="item" v-for="(item, index) in choicenessList" :key="index">
                <div class="icon-text">精选</div>
                <p class="name text-center">{{item.name}}</p>
                <p class="rate text-center" v-percent>{{item.rate}}</p>
                <p class="text text-center">七日年化收益率</p>
                <div class="btn-buy" @click="goChoiceness(item)" v-btntouch>购买</div>
            </div>
        </div>
        <div class="hot-box">
            <div class="top-pan">
                <div class="title">热门基金</div>
                <div class="more"  @click="goPage('/hotFundRanking')">更多基金<span class="icon"></span></div>
            </div>
            <div class="content-pan">
                <div class="item" v-for="(item, index) in hotFundList" @click="goHotFund(item)" :key="index" v-touch>
                    <div class="left-pan">
                        <p class="rate" v-percent>{{item.rate}}</p>
                        <p class="text">{{item.dateText}}</p>
                    </div>
                    <div class="right-pan">
                        <p class="name">{{item.name}}</p>
                        <div class="detail">
                            <span class="text">{{item.minText}}</span>
                            <span class="text">{{item.riskText}}</span>
                            <span class="text">{{item.typeText}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <divider>我是有底线的</divider>
    </div>
</template>
<script>
import utils from 'js/utils'
import {Swiper, Divider} from 'vux'
import _ from 'underscore'

const baseList = [
    {img: 'static/image/1.jpg'},
    {img: 'static/image/2.jpg'},
    {img: 'static/image/3.jpg'}
] 
export default {
    name: 'recommend',
    mounted() {
        utils.setData('buttomBarActiveIndex', 0);          
    },
    data() {
        return {
            list: baseList,
            scrollTop: 0,
            subjectList: [
                {name: '定投专区', url: '/fixedInvestmentFunds', image:'static/image/clock.svg'},
                {name: '主题选基', url: '/themeFund', image:'static/image/theme.svg'},
                {name: '4433选基', url: '/fund4433', image:'static/image/purse.svg'},
                {name: '自选基金', url: '/optionalFund', image:'static/image/mine.svg'}
            ],
            choicenessList: [
                {name: '招商理财30天债券A', rate: '0.0521'},
                {name: '招商理财60天债券B', rate: '0.0645'}
            ],
            hotFundList: [
                {dateText: '近一年收益', rate: '0.052442', name: '建信深证60联接1', minText: '10元起购', riskText: '低风险', typeText: '混合型'},
                {dateText: '近一年收益', rate: '0.0641.17', name: '建信深证60联接2', minText: '100元起购', riskText: '中风险', typeText: '混合型'},
                {dateText: '近一年收益', rate: '0.0719.75', name: '建信深证60联接3', minText: '100元起购', riskText: '高风险', typeText: '混合型'}
            ]
        }
    },
    methods: {
        goSubject(item) {
            APP.openWin(item.url);
        },
        goChoiceness(item) {
             APP.openWin('/fundDetails');
        },
        goHotFund() {
             APP.openWin('/fundDetails');
        },
        goPage(data){
            APP.openWin(data);
        },
        /**滚动监听**/
        mScroll: function (event) {
            var view = event.srcElement ? event.srcElement : event.target;
            this.scrollTop = view.scrollTop;
            var colorProportion = view.scrollTop / 200;
            document.getElementById("search-main").style.backgroundColor = "rgba(172,153,153," + (colorProportion < 0.5 ? colorProportion : 0.5) + ")";
        }
    },
    components: {
        Swiper,
        Divider
    }
}
</script>
