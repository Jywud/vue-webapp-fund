<style lang="less">
    @import "../../common/style/common.less";
    .hs-lineCell{        
        &.line-item{
            display: flex;
            align-items: center;
            padding: 14px 16px;  
            overflow-x: hidden;         
            .border-b-1px(#e5e5e5, 16px);
            &:last-child::after{
                height: 0;
                border: 0;
            }            
            .left-pan{
                display: flex;
                align-items: center;
                width: 120px;      
                .icon{
                    display: inline-block;
                    width: 20px;
                    height: 20px; 
                    margin-right: 8px;
                }
                .title{                              
                    font-size:16px;
                    color:@dark-color;
                    text-align:left;
                }
            }
            .text{
                flex: 1;
                text-align: right;                
                color: @gray-color;
                font-size: 14px;
                .word-hide();
            }            
            .arrow{
                .arrow-r();
            }
        }
    }    
</style>
<template>   
    <div class="hs-lineCell line-item" @click="tapItem" v-touch> 
        <div class="left-pan">
            <slot><!-- 请加类名icon --></slot>           
            <span class="title">{{title}}</span>
        </div>        
        <div class="text">
            {{text}}            
        </div>
        <span class="arrow" v-if="showArrow"></span>
    </div>    
</template>
<script>
    export default {
        name: 'hs-lineCell',
        data() {
            return {
                
            }
        },
        methods: {
           tapItem() {
               /* 有url和右侧箭头 */
               if(!!this.url) {
                   APP.openWin(this.url);
                   return;
               }
               /* 只有右侧箭头，触发父组件事件 */
               if(this.isLink) {
                   this.$emit('tapItem', this.title);
               }               
           }
        },
        computed: {
            showArrow() {
                return this.isLink || this.url;
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
                default: ''                
            },   
            /* 路由地址 */
            url: {
                type: String,
                default: ''
            },    
            /* 是有显示右侧箭头 */
            isLink: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

