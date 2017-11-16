<template>
    <div id="v-dealResult">
        <div class="dealResult-header">
            <span class="iconfont" :class="getStateClass()"></span>
            <p class="fund-state">{{getStateText()}}</p>
        </div>
        <div class="line-box">
            <div class="line-item" v-for="(item, index) in dataList" :key="index">
                <span class="name">{{item.name}}</span>
                <span class="value">{{item.value}}</span>
            </div>            
        </div>
    </div>
</template>
<script>
    export default {
        name: 'v-dealResult',
        data() {
            return {}
        },
        methods: {
            getStateClass() {
                return this.state? 'icon-success1' : 'icon-empty';
            },
            getStateText() {
                return this.state? '申请成功' : '申请失败';
            }
        },
        props: {
            /* 对象数组 */
            dataList: {
                required: true,
                type: Array
            },
            state: {
                required: true,
                type: Boolean
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #v-dealResult {
        margin: 16px 16px 30px;
        background: #fff;
        .dealResult-header {
            text-align: center;
            padding: 20px 0;
            .icon-success1{
                color: @success-color;
            }
            .icon-empty{
                color: @fail-color;
            }
            .iconfont {                
                font-size: 54px;
            }
            .fund-state {
                margin-top: 12px;
                font-size: 20px;
                color: @dark-color;
            }
        }
        .line-box {
            .line-item {
                display: flex;
                padding: 15px;
                .border-t-1px();
                .name {
                    font-size: 16px;
                    color: @dark-color;
                    width: 120px;
                }
                .value {
                    flex: 1;
                    text-align: right;
                    font-size: 14px;
                    color: @litdark-color;
                }
            }
        }
    }
</style>
