<style lang="less">
// @import "../../common/style/common.less";
.v-scoreBar{    
    display: flex;
    flex-flow: nowrap;
    .score{
        margin-right: 4px;
        &:last-child{
            margin-right: 0;
        }
    }
}
</style>
<template>
    <div class="v-scoreBar">
        <span class="score iconfont icon-unchecked2" 
        :style="{'font-size': fontSize, color: color}" :class="{'icon-unchecked1': index<=score}" v-for="index in scoreCounts" :key="index"></span>
    </div>
</template>
<script>
export default {
    name: 'v-scoreBar',
    data() {
        return {}
    },
    props: {
        /* 五角星的数量 */
        scoreCounts: {
            required: false,
            type: Number,
            default: 5
        },
        /* 评分数 */
        score: {
            required: false,
            type: Number,
            default: 0
        },
        /* 五角星的大小 */
        fontSize: {
            required: false,
            type: String,
            default: '12px'
        },
        /* 五角星颜色 */
        color: {
            required: false,
            type: String,
            default: '#ffaa34'
        }
    }
}
</script>
