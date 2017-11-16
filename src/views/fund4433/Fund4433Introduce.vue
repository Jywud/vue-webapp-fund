<style lang="less">
@import "../../common/style/common.less";
#fund4433Introduce{
    .page-style();  
    .icon-search{
        margin-right: 20px; 
    }
    .main-column-box{
        background: #fff;
    }  
    .main-title{
        font-size:18px;
        color:@dark-color;            
        text-align:center;
        margin: 40px 0 20px;
    }
    .content-box{
        margin:0 30px;        
        text-align:left;
        .border-t-1px();
        .item-pan{
            padding: 20px 0;
            .title{
                font-size:16px;
                color:@dark-color;   
                margin-bottom: 10px;         
            }
            .text{
                font-size:13px;
                color:@litdark-color;
                line-height:24px;
            }
        }
    }
    
}
</style>
<template>
    <div id="fund4433Introduce">
        <title-bar title="4433选基法" :isColorful="true">
            <!-- <i class="iconfont icon-search"></i>
            <i class="iconfont icon-explain" @click="goPage"></i> -->
        </title-bar>
        <div class="main-column-box">
            <p class="main-title">4433选基法介绍</p>
            <div class="content-box">
                <div class="item-pan">
                    <p class="title">1、什么是4433法选基？</p>
                    <div class="text">4433法选基是筛选同时满足下述4个筛选条件的基金：
                        1、近1年收益率在同类型基金中排名前1/4
                        2、今年以来、两年、三年、五年收益率在同类型基金中排名前1/4
                        3、近3个月收益率在同类型基金中排名前1/3
                        4、近6个月收益率在同类型基金中排名前1/3
                    </div>
                </div>
                <div class="item-pan">
                    <p class="title">2、为何采用4433法选基？</p>
                    <div class="text">4433法旨在扩大投资者选基关注的时长，一只能够穿越牛熊市场的并不一定都比同类3/4的基金业绩都要好，但是一定具有一些实力。4433法挑的基金除了中长期绩效稳定外，短期绩效表现也比较稳定。
                    </div>
                </div>
                
            </div>
        </div>   
    </div>
</template>
<script>
export default {
    name: 'fund4433Introduce'
}
</script>
