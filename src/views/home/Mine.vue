<style lang="less">
@import "../../common/style/common.less";
#mine {
    .overflow-auto();    
    padding-bottom: 55px;    
    .name-pan{
        background-image: @colorful-color;      
        padding: 54px 16px 54px 30px;
        display: flex;
        align-items: center;
        color: #fff;
        .img{
            width: 70px;
            height: 70px;
            line-height: 70px;
            text-align: center;            
            border-radius: 70px;
            background: rgba(255,255,255, 0.9);
            margin-right: 14px;
            .iconfont{
                color:#e7d7b6;
                font-size: 40px;
            }
        }
        .des-pan{       
            flex: 1; 
            display: flex;
            flex-direction: column;     
            justify-content: space-around;   
            color: #fff;
            .name{
                font-size: 18px;
                margin-bottom: 6px;
            }
            .num{
                font-size: 14px;
                opacity: 0.8;
            }
        }
    }    
    .group{
        margin: 14px 0;
        background: #fff;        
    }
    .version{
        font-family:PingFangSC-Light;
        font-size:12px;
        color:#999999;   
        text-align: center;     
    }
}
</style>
<template>
    <div id="mine">                   
        <div class="name-pan" @click="goPage('/myInformation')">
            <div class="img">
                <i class="iconfont icon-me"></i>
            </div>
            <div class="des-pan">
                <p class="name">张三</p>
                <p class="num">理财账号:123456</p>
            </div>
            <span class="iconfont icon-arrows"></span>
        </div>
        <div class="group">
            <line-cell title="交易记录" url="/transactionRecord">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiaoyijilu"></use>
                </svg>
            </line-cell>
        </div>
        <div class="group">
            <line-cell title="银行卡管理" url="/bankCardManage">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yinhangka"></use>
                </svg>
            </line-cell>
            <line-cell title="密码管理" url="/changeTradePwd">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mimaguanli"></use>
                </svg>
            </line-cell>
            <line-cell title="风险测评" url="/evaluationResult">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fengxianceping1"></use>
                </svg>
            </line-cell>
        </div>       
        <p class="version">-版本 1.0.0-</p>
    </div>
</template>
<script>
import utils from 'js/utils'
export default {
    name: 'mine',
    mounted() {
        utils.setData('buttomBarActiveIndex', 2);
    },
    methods: {
        goPage(url) {
            APP.openWin(url);
        }
    }
}
</script>