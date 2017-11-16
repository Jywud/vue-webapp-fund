<style lang="less">
    @import "../../common/style/common.less";
    #v-lineCell{        
        &.line-item{
            display: flex;
            padding: 18px 16px 18px 0;
            margin-left: 16px;
            .border-b-1px();
            &:last-child::after{
                height: 0;
                border: 0;
            }
            .title{
                width: 120px;                
                font-size:16px;
                color:@dark-color;
                text-align:left;
            }
            .right-pan{
                flex: 1;
                text-align: right;                
                color: @gray-color;
            }
            .text{
                font-size: 14px;
            }
            .icon-modify{
                color: #cdcdcd;
            }
        }
    }    
</style>
<template>   
    <div id="v-lineCell" class="line-item">       
        <span class="title">{{title}}</span>
        <div class="right-pan" @click="tapItem">
            <span class="text">{{text}}</span>
            <span class="icon-modify iconfont icon-arrows" v-if="isLink"></span>
        </div>
    </div>    
</template>
<script>
    export default {
        name: 'v-lineCell',
        data() {
            return {
                
            }
        },
        methods: {
           tapItem() {
               if(this.isLink) {
                   this.$emit('tapItem', this.title);
               }               
           }
        },
        props: {
            /* 左侧标题 */
            title: {
                type: String,
                required: true,
                default: ' '                
            },    
            /* 右侧内容 */  
            text: {
                type: String,
                required: false,
                default: '--'                
            },       
            /* 是有显示右侧箭头 */
            isLink: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

