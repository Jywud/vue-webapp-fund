<style lang="less">
    @import "../../common/style/common.less";
    #rowCell{        
        display: flex;        
        margin-left: 18px;
        padding: 14px 0;
        .border-b-1px();       
        &:last-child::after{
            border: none;
            height: 0;
        }    
        .icon{
            width: 20px;
            height: 20px;            
        }            
        .title{
            flex: 1;
            font-size: 16px;
            color: #333;
            margin-left: 10px;
        }
        .arrow{    
            width: 36px;            
            color: #999;
            .arrow-r();
        }        
    }    
</style>
<template>   
    <div id="rowCell" class="cell" @click="gotoNext">   
        <slot>
        <!-- 请加类名icon -->    
        </slot>                  
        <span class="title">{{title}}</span>
        <span class="arrow" v-show="isLink"></span>
    </div>    
</template>
<script>
    export default {
        name: 'rowCell',
        data() {
            return {
                
            }
        },
        methods: {
           gotoNext() {
                this.link && APP.openWin(this.link);
                // this.$router.push(this.link);
           }
        },
        props: {
            /* 标题 */
            title: {
                type: String,
                required: true,
                default: ' '                
            },
            /* 路由地址 */
            link: {
                type: String,
                default: ''
            },
            /* 是有显示右侧箭头 */
            isLink: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

