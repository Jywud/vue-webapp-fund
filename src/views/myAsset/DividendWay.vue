<style lang="less">
    @import "../../common/style/common.less";
    #dividendWay {
        .page-style();
        .choose-box {
            margin: 10px 0;
            background: #fff;
            .item {
                display: flex;
                align-items: center;
                margin-left: 15px;
                padding: 15px 15px 15px 0;
                .border-b-1px();
                .left-pan {
                    width: 180px;
                    .name {
                        font-size: 16px;
                        color: @dark-color;
                    }
                    .explain {
                        font-size: 12px;
                        color: @gray-color;
                    }
                }
                .right-pan {
                    flex: 1;
                    text-align: right;
                }
            }
        }
    }
</style>
<template>
    <div id="dividendWay">
        <title-bar title="分红方式" :isColorful="true"></title-bar>
        <div class="choose-box">
            <label class="item" @click="chooseItem(1)">
                    <div class="left-pan">
                        <p class="name">红利再投资</p>
                        <p class="explain">将分红所得现金再投资该基金</p>
                    </div>
                    <div class="right-pan">
                        <input type="radio" value="1" v-model="choose">
                        <i class="iconfont i-radio"></i>
                    </div>                
                </label>
            <label class="item" @click="chooseItem(2)">
                    <div class="left-pan">
                        <p class="name">现金分红</p>
                        <p class="explain">将分红所得现金返回银行卡</p>
                    </div>
                    <div class="right-pan">
                        <input type="radio" value="2" v-model="choose">
                        <i class="iconfont i-radio"></i>
                    </div>                
                </label>
        </div>
    </div>
</template>
<script>
    import utils from 'js/utils'
    export default {
        name: 'dividendWay',
        mounted() {
            var way = utils.getData('dividendWay');
            // console.log('way: ' + way);
            if (way) {
                this.choose = way;
            }
        },
        data() {
            return {
                choose: ''
            }
        },
        methods: {
            chooseItem(index) {
                if (index == 1) {
                    this.$vux.confirm.show({
                        content: '修改方式为红利再投资',
                        onCancel: ()=> {
                            this.choose = 2;
                        },
                        onConfirm: () => {                            
                            utils.setData('dividendWay', index);
                        }
                    });
                } else {
                    this.$vux.confirm.show({
                        content: '修改方式为现金分红',
                        onCancel: ()=> {
                            this.choose = 1;
                        },
                        onConfirm: () => {                            
                            utils.setData('dividendWay', index);
                        }
                    });
                }
            }
        }
    }
</script>
