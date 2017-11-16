<style lang="less">
@import "../../common/style/common.less";
#fundSituation{
    .page-style();
    .group-box{
        background: #fff;
        margin: 10px 0;
        &.box{
            padding: 16px; 
        }
        .line-title{
            font-size:16px;
            color:@dark-color;
            margin-bottom: 10px;
        }
        .line-text{
            font-size:14px;
            color:@litdark-color;
        }
    }
    .right-pan{
        .text{
            color: @litdark-color;
        }
    }
}
</style>
<template>
    <div id="fundSituation">
        <title-bar title="基金概况" :isColorful="true"></title-bar>
        <div class="main-column-box">
            <div class="group-box">
                <line-cell :title="item.key" :text="item.value" v-for="(item, index) in list" :key="index"></line-cell>
            </div>
            <div class="group-box box">
                <p class="line-title">业绩比较基准</p>
                <p class="line-text">沪深300指数收益率*60%+上证国债指数收益率*40%。</p>
            </div>
            <div class="group-box box">
                <p class="line-title">投资目标</p>
                <p class="line-text">在控制风险和保持资产流动性的前提下,通过对债券组合久期、期限结构、债券品种的主动式管理,力争提供稳健的投资收益。</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'fundSituation',
    data() {
        return {
            list: [
                {key: '基金公司', value: '华夏基金管理有限公司'},
                {key: '基金类型', value: '债券型'},
                {key: '基金状态', value: '开放期'},
                {key: '成立时间', value: '2012-03-07'},
                {key: '托管人', value: '上海浦东发展银行股份有限公司'},
                {key: '基金经理', value: '邱离，王霄'},
                {key: '最低申购金额', value: '100元'},
                {key: '最低定投金额', value: '100元'},
                {key: '风险等级', value: '低风险'}
            ]
        }
    }
}
</script>
