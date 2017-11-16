<style lang="less">
@import "../../common/style/common.less";
    #transactionRecord{
        .page-style();
        background: #fff;        
        .list-box{
            border-top: 10px solid #f3f4f7;
            .line-item{
                display: flex;
                align-items: center;
                padding: 10px 16px;
                .border-b-1px();
                .left-pan{
                    flex: 3;
                    .name{
                        font-size:15px;
                        color:@dark-color;
                        margin-bottom: 3px;
                    }
                    .time{
                        font-family:HelveticaNeue;
                        font-size:12px;
                        color:@gray-color;                        
                    }
                }
                .middle-pan{
                    flex: 2;
                    .money{
                        font-size:15px;
                        color:@dark-color;
                        margin-bottom: 3px;
                    }
                    .action{
                        font-size:14px;
                        color:@primary-color;
                        &.not{
                            color: #2abecc;
                        }
                    }
                }
                .right-pan{
                    flex: 2;
                    text-align: right;
                    .status{
                        font-size: 14px;
                        color: @gray-color;
                        margin-bottom: 4px;
                    }
                    .doAction{
                        padding: 1px 4px;
                        text-align: center;
                        color: @primary-color;                        
                        border: 1px solid @primary-color;
                    }
                }
            }
        }
    }
</style>
<template>
    <div id="transactionRecord">
        <title-bar title="交易记录" back-path="/home/mine"></title-bar>
        <div class="main-column-box list-box">
            <div class="line-item" v-for="(item, index) in list" :key="index">
                <div class="left-pan">
                    <p class="name">{{item.name}}</p>
                    <p class="time">{{item.time}}</p>
                </div>
                <div class="middle-pan">
                    <p class="money">{{item.money}}</p>
                    <p class="action" :class="{not: item.action != '购买'}">{{item.action}}</p>
                </div>
                <div class="right-pan">
                    <p class="status">{{item.status}}</p>
                    <span class="doAction" v-if="!!item.doAction" @click="doClick(item)">{{item.doAction}}</span>                  
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'transactionRecord',
    data() {
        return {
            list: [
                {name: '模式货币', time: '2017-10-24 11:12:34', money: '7000元', action: '购买', status: '份额待确认', doAction: '撤销'},
                {name: '模式货币1', time: '2017-10-24 11:12:34', money: '7000元', action: '购买', status: '支付失败', doAction: '支付'},
                {name: '模式货币2', time: '2017-10-24 11:12:34', money: '7000元', action: '购买', status: '已完成', doAction: ''},
                {name: '模式货币3', time: '2017-10-24 11:12:34', money: '76500元', action: '赎回', status: '已完成', doAction: ''},
                {name: '模式货币4', time: '2017-10-24 11:12:34', money: '7000元', action: '购买', status: '已完成', doAction: ''},
                {name: '模式货币5', time: '2017-10-24 11:12:34', money: '7800元', action: '购买', status: '已完成', doAction: ''},
                {name: '模式货币5', time: '2017-10-24 11:12:34', money: '7000元', action: '购买', status: '已完成', doAction: ''},
                {name: '模式货币5', time: '2017-10-24 11:12:34', money: '45000元', action: '购买', status: '已完成', doAction: ''},
                {name: '模式货币5', time: '2017-10-24 11:12:34', money: '7000元', action: '购买', status: '已完成', doAction: ''}
            ]
        }
    },
    methods: {
        doClick(item) {            
            if(item.doAction == '撤销') {
                APP.openPopWin('passwordView', function (data) {
                    if(data.status == 2) {

                    }
                });
            } 
            if(item.doAction == '支付') {
                APP.openWin('/fundPayResult');
            }
        }
    }
}
</script>

