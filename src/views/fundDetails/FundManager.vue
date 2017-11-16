<style lang="less">
@import "../../common/style/common.less";
#fundManager{
    .page-style();
    .manager-box{
        margin: 10px 0;
        padding: 14px;
        background: #fff;
        .header{
            display: flex;
            align-items: center;
            padding-bottom: 10px;
            .border-b-1px();
            .img{
                width: 46px;
                height: 46px;
                line-height: 46px;
                text-align: center;
                border-radius: 46px;
                background: #ededed;
                .iconfont{
                    color:#fff;
                    font-size: 24px;
                }
            }
            .right-pan{
                margin-left: 12px;
                flex: 1;
                display: flex;
                justify-content: space-around;
                flex-direction: column;
                .name{
                    font-size: 16px;
                    color: @dark-color;
                    margin-bottom: 8px;
                }
                .time{
                    font-size: 12px;
                    color: @gray-color;
                }
            }
        }
        .middle{
            padding: 12px 0;
            color: @dark-color;
            font-size: 14px;
            .border-b-1px();
        }
        .footer{
            padding-top: 10px;
            font-size: 12px;
            color: @gray-color;  
            span{
                vertical-align: middle;
            }
            .rate{
                font-size:18px;
                color:@primary-color;
            }          
        }
    }
}
</style>
<template>
    <div id="fundManager">
        <title-bar title="基金经理" :isColorful="true"></title-bar>
        <div class="main-column-box">
            <div class="manager-box" v-for="(item, index) in list" :key="index">
                <div class="header">
                    <div class="img">
                        <i class="iconfont icon-me"></i>
                    </div>
                    <div class="right-pan">
                        <p class="name">{{item.name}}</p>
                        <p class="time">{{item.timeRange}}</p>
                    </div>
                </div>
                <div class="middle">{{item.info}}</div>
                <div class="footer">
                    <span>任职期间基金收益：</span>
                    <span class="rate">{{item.rate}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'fundManager',
    data() {
        return {
            list: [
                {img: '', name: '王霄', timeRange: '2016.08.09-至今', info: '硕士,2011年6月获厦门大学硕士学位。2011年6月至2013年2月就职于华泰(联合)证券研究所任固定收益研究员,自2013年3月起加入东吴基金管理有限公司,一直从事债券投资研究工作,曾任固定收益部研究员、基金经理助理,自2015年6月8日起担任东吴鼎利债券型证券投资基金(LOF)(原东吴鼎利分级债券型证券投资基金)基金经理。', rate: '20.96%'},
                {img: '', name: '小小明', timeRange: '2013.03.07-2016.12.13', info: '硕士,2011年6月获厦门大学硕士学位。2011年6月至2013年2月就职于华泰(联合)证券研究所任固定收益研究员,自2013年3月起加入东吴基金管理有限公司,一直从事债券投资研究工作,曾任固定收益部研究员、基金经理助理,自2015年6月8日起担任东吴鼎利债券型证券投资基金(LOF)(原东吴鼎利分级债券型证券投资基金)基金经理。', rate: '21.96%'},
                {img: '', name: '王霄', timeRange: '2017.08.09-至今', info: '硕士,2011年6月获厦门大学硕士学位。2011年6月至2013年2月就职于华泰(联合)证券研究所任固定收益研究员,自2013年3月起加入东吴基金管理有限公司,一直从事债券投资研究工作,曾任固定收益部研究员、基金经理助理,自2015年6月8日起担任东吴鼎利债券型证券投资基金(LOF)(原东吴鼎利分级债券型证券投资基金)基金经理。', rate: '22.96%'}
            ]
        }
    }
}
</script>
