<style lang="less">
    @import "../../common/style/common.less";
    #fundBuyResult {
        .page-style();        
        .next-button {
            margin: 0 16px;
        }
    }
</style>

<template>
    <div id="fundBuyResult">
        <title-bar title="申请结果"></title-bar>
        <div class="content-box">
            <deal-result :state="state" :data-list="dataList"></deal-result>
        </div>
        <div class="btn btn-primary next-button" @click="confirm" v-btntouch>确定</div>
    </div>
</template>
<script>
    export default {
        name: "fundBuyResult",
        data() {
            return {
                state: true,
                dataList: [{
                        name: '基金名称',
                        value: '测试基金AAAA'
                    },
                    {
                        name: '购买金额',
                        value: '10000元'
                    },
                    {
                        name: '份额确认',
                        value: '预计10-15 12:14前'
                    },
                    {
                        name: '收益到账',
                        value: '预计08-23'
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
