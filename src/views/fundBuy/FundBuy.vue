<style lang="less">
@import "../../common/style/common.less";
#fundBuy {
	.page-style();
	.box-text {
		padding: 10px 15px;
		font-size: 14px;
		color: @litdark-color;
    }
    .group-box{
        margin-top: 10px;
        background: #fff;
        .item-line{
            display: flex;
            align-items: center;
            padding: 10px 16px 10px 0;
            margin-left: 16px;
            .border-b-1px();
            .name{
                font-size: 16px;
                width: 120px;
            }
            .value-pan{
                flex: 1;
                text-align: right;
                input[type="text"]{
                    width: 120px;
                    border: 1px solid #ededed;
                    padding: 10px;
                    text-align: right;
                }
            }

        }
    }
	.agreement-line {        
        margin: 15px 15px 0;            
        label{
            display: inline-block;
            height: 50px;;
        }
		.agreen-text {
			color: @litdark-color;
		}
		.agreen-content {
			color: #4E8BD6;
		}
	}
	.btn-next {
		margin: 0 15px;
		border-radius: 4px;
	}
	.tip {
		font-family:PingFangSC-Regular;
		font-size:12px;
		color:@gray-color;
		line-height:16px;
		margin: 10px 16px;
	}
}
</style>
<template>
	<div id="fundBuy">
		<title-bar title="购买"></title-bar>
        <div class="main-column-box">
            <div class="group-box">
                <line-cell title="基金名称" :text="name" ></line-cell>
                <line-cell title="产品代码" :text="productCode" ></line-cell>
                <div class="item-line">
                    <span class="name">购买金额（元)</span>
                    <div class="value-pan">
                        <input type="text" v-model="money" placeholder=">=10.00">
                    </div>
                </div>                
                <line-cell title="预计费用（元）" :text="estimatedCost" ></line-cell>   
                <line-cell title="支付方式" :text="choosedBank" :isLink="true" @tapItem="tapItemBank"></line-cell>         
            </div>
            <div class="agreement-line">
                <label>
                    <input type="checkbox" v-model="modelValue">
                    <i class="iconfont i-checkbox"></i>
                    <span class="agreen-text">同意</span>
                </label>
                <span class="agreen-content" @click="watchAgreen">《基金网上交易协议与投资人权益须知》</span>
            </div>
            <div class="btn btn-primary btn-next" @click="goNext" v-btntouch>下一步</div>
            <div class="tip">
                <p>*预计07-12（周二）以07-11（周一）净值确认份额。</p>
            </div>
        </div>        
	</div>
</template>

<script>
import utils from 'js/utils'
export default {
	name: 'fundBuy',
	data() {
		return {      
            choosedBank: '招商银行(5564)',      
            money: '',
			modelValue: false,
			name: '基金AAA', //基金名称
			productCode: '500056', //产品代码			
			estimatedCost: '100.00', //预计费用			
			investPayment: '招商银行(0370)' //支付方式
		}
	},
	methods: {
        tapItemBank() {
            APP.openWin('/selectBankCard');
        },
        tapItem() {},
		chooseBank() {

		},
		goNext() {
            utils.setCommonRouter({
                'appropriateAssessment': '/fundBuyResult'
            });
            APP.openWin('/appropriateAssessment');
            
		},
		watchAgreen() {
            APP.openWin('/fundBuyAgreement');
		}
	}
}
</script>
