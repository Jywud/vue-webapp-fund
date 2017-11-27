<template>
    <div class="hs-keyboardView">
        <div class="box" v-for="(item ,index) in itemList" :key="index">
            <div :class="changeClass(child)" v-for="(child ,cindex) in item" :key="cindex" @click="onclick(child)">
                <div class="value">{{child}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'hs-keyboardView',
        data() {
            return {
                itemList: [
                    ["1", "2", "3"],
                    ["4", "5", "6"],
                    ["7", "8", "9"],
                    ["", "0", "×"]
                ]
            }
        },
        methods: {
            onclick(item){
                if(item == '') {
                    return;
                }
                this.$emit('change', item);
            },
            changeClass(item){
                return (item == "" || item == "×") ? "item grayItem" : "item";
            }
        },
        props: {}
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";

    .hs-keyboardView {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: auto;
        background: @white-color;
        z-index: 100;
        .box {
            height: 54px;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            overflow: hidden;
            .border-t-1px(@border-color);
            .item {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                flex: 1;
                width: 100%;
                height: 100%;
                color: #030303;
                font-size: 28px;
                .border-r-1px(@border-color);
                .value {
                    flex: 1;
                    text-align: center;
                }
            }
            .grayItem {
                background: #e8e8e8;
            }
            .item:last-child {
                border-right: 0;
            }
        }
    }
</style>
