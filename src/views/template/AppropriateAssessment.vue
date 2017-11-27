<style lang="less">
    @import "../../common/style/common.less";
    #appropriateAssessment {
        .page-style();
        .main-column-box {
            background: #fff;
            padding: 15px;
            margin-bottom: 4px;
        }
        .btn-box{
            display: flex;
            justify-content:center;
            align-items:center;
            height: 50px;
            background: #fff;
            .btn-confirm{
                height: 36px;
                line-height: 36px;
                text-align: center;
                width: 170px;
            }
        }
    }
</style>
<template>
    <div id="appropriateAssessment">
        <title-bar title="适当性评估确认"></title-bar>
        <div class="main-column-box">
            协议内容
        </div>
        <div class="btn-box">
            <div class="btn btn-primary btn-confirm" @click="confirm" v-btntouch>确认签署</div>
        </div>
    </div>
</template>

<script>
    import utils from 'js/utils'
    export default {
        name: 'appropriateAssessment',
        data() {
            return {}
        },
        methods: {
            confirm() {
                var router = utils.getCommonRouter('appropriateAssessment');
                APP.openPopWin('passwordView', (data)=> {
                // console.log(data);
                if(data.status == 2) {                    
                    APP.openWin(router);
                }                
            });
            }
        }
    }
</script>
