<style lang="less">
@import "../../common/style/common.less";
#pwdConfirm{
    .page-style();
    .main-column-box{
        margin-top: 10px;
        background: #fff;
    }
    .title{
        font-size:20px;
        color:@dark-color;
        letter-spacing:0; 
        margin: 54px 0 20px 30px;       
    }
    .pwd-box {        
        display: flex;        
        align-items: center;        
        margin: 0 30px;
        height: 52px;
        .pwd-item {
            &:first-child{
                margin-left: 0;
            }
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
            width: 100%;
            height: 100%;            
            font-size: 20px;
            line-height: 52px;
            color: @dark-color;
            text-align: center;
            margin-left: 12px;
            border-bottom: 1px solid #d8d8d8;
        }
        .input-sign{
            background: #000;
            width: 8px;
            height: 8px;
            border-radius: 8px;
            // margin-top: 18px;
        }
    }
}
</style>
<template>
    <div id="pwdConfirm">
        <title-bar title="密码确认"></title-bar>
        <div class="main-column-box">
            <p class="title">请输入交易密码</p>
            <div class="pwd-box">
                <div class="pwd-item" v-for="index in 6" :key="index">                    
                    <div class="input-sign" v-show="isShow(index)"></div>
                </div>
            </div>            
        </div>
        <keyboard-view @change="changeCode"></keyboard-view>
    </div>
</template>
<script>
import utils from 'js/utils'
export default {
    name: 'pwdConfirm',
    data() {
        return {
            pwdCode: []
        }
    },
    methods: {
        isShow(index) {            
            return index <= this.pwdCode.length? true: false;
        },
        changeCode(mes) {
            if(mes == '×') {
                this.pwdCode.pop();
            } else if (this.pwdCode.length < 6){
                this.pwdCode.push(mes);
            }

            //输入了6位密码
            if(this.pwdCode.length == 6) {
                var router = utils.getCommonRouter('pwdConfirm');
                APP.openWin(router);
            }
        }
    }
}
</script>

