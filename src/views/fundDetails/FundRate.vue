<style lang="less">
@import "../../common/style/common.less";
#fundRate{
    .page-style();
    .item-box{
        margin: 12px;
        border-top: 1px solid @primary-color;  
        .title{
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #fff;
            color: @dark-color;
            font-size: 16px;
        }
        .content-pan{
            .item{
                display: flex;
                padding: 15px 30px 15px 15px;
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
    <div id="fundRate">
        <title-bar title="基金费率" :isColorful="true"></title-bar>
        <div class="main-column-box">
            <div class="item-box">
                <div class="title">申购费率</div>                
                <div class="content-pan">
                    <div class="item">
                        <span class="left">单笔金额(M)</span>
                        <span class="right">收费标准</span>
                    </div>
                    <div class="item">
                        <span class="left">0≤M＜500万元</span>
                        <span class="right">0.60%</span>
                    </div>
                    <div class="item">
                        <span class="left">500万元≤M＜1000万元</span>
                        <span class="right">0.60%</span>
                    </div>
                    <div class="item">
                        <span class="left">M≥1000万元</span>
                        <span class="right">0.60%</span>
                    </div>
                </div>
            </div>
            <div class="item-box">
                <div class="title">赎回费率</div>                
                <div class="content-pan">
                    <div class="item">
                        <span class="left">持有年限(N)</span>
                        <span class="right">收费标准</span>
                    </div>
                    <div class="item">
                        <span class="left">0≤N＜7天</span>
                        <span class="right">0.60%</span>
                    </div>
                    <div class="item">
                        <span class="left">7天≤N＜30天</span>
                        <span class="right">0.60%</span>
                    </div>
                    <div class="item">
                        <span class="left">N≥30天</span>
                        <span class="right">0.60%</span>
                    </div>
                </div>
            </div>
            <div class="item-box">
                <div class="title">运作费率</div>                
                <div class="content-pan">
                    <div class="item">
                        <span class="left">费率名称</span>
                        <span class="right">收费标准</span>
                    </div>
                    <div class="item">
                        <span class="left">管理费率</span>
                        <span class="right">0.60%</span>
                    </div>
                    <div class="item">
                        <span class="left">托管费率</span>
                        <span class="right">0.60%</span>
                    </div>
                    <div class="item">
                        <span class="left">销售服务费</span>
                        <span class="right">0.60%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'fundRate',
    data() {
        return {
            
        }
    }
}
</script>
