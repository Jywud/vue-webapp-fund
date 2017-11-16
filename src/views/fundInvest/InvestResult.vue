<style lang="less">
    @import "../../common/style/common.less";
    #investResult {
        .page-style();        
        .next-button {
            margin: 0 16px;
        }
    }
</style>

<template>
    <div id="investResult">
        <title-bar title="申请结果"></title-bar>
        <div class="content-box">
            <deal-result :state="state" :data-list="dataList"></deal-result>
        </div>
        <div class="btn btn-primary next-button" @click="confirm" v-btntouch>确定</div>
    </div>
</template>
<script>
    export default {
        name: "investResult",
        data() {
            return {
                state: true,
                dataList: [{
                        name: '基金名称',
                        value: '博时货币A'
                    },
                    {
                        name: '定投金额',
                        value: '10000元'
                    },
                    {
                        name: '定投时间',
                        value: '周一'
                    },
                    {
                        name: '第一次扣款',
                        value: '2017-11-06'
                    },
                    {
                        name: '第二次扣款',
                        value: '2017-11-09'
                    }
                ]
            }
        },
        methods: {
            confirm() {
                APP.closeTo('/home');
            }
        }
    };
</script>
