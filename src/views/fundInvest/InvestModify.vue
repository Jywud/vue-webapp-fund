<style lang="less">
@import "../../common/style/common.less";
#investModify {
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
                width: 120px;
            }
            .value-pan{
                flex: 1;
                text-align: right;
                input[type="text"]{
                    height: 30px;
                    width: 120px;
                    border: 1px solid #ededed;
                    padding: 0 10px;
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
	<div id="investModify">
		<title-bar :title="title"></title-bar>
        <div class="main-column-box">
            <div class="group-box">
                <line-cell title="基金名称" :text="name" ></line-cell>
                <line-cell title="产品代码" :text="productCode" ></line-cell>
                <div class="item-line">
                    <span class="name">定投金额（元)</span>
                    <div class="value-pan">
                        <input type="text" v-model="money" placeholder=">=10.00">
                    </div>
                </div>
                <!-- <line-cell title="定投金额（元)" :text="investAmount" ></line-cell>-->
                <line-cell title="定投费率" :text="investRate" ></line-cell>            
            </div>
            <div class="group-box">
                <line-cell title="定投周期" :text="periodVal[0]" :isLink="true" @tapItem="tapItem"></line-cell>
                <line-cell title="定投日期" :text="dateVal[0]" :isLink="true" @tapItem="tapItem"></line-cell>
                <line-cell title="支付方式" :text="investPayment" :isLink="true" @tapItem="tapItem"></line-cell>
            </div>
            <div class="agreement-line">
                <label>
                    <input type="checkbox" v-model="modelValue">
                    <i class="iconfont i-checkbox"></i>
                    <span class="agreen-text">同意</span>
                </label>
                <span class="agreen-content" @click="watchAgreen">《基金定投协议》</span>
            </div>
            <div class="btn btn-primary btn-next" @click="goNext" v-btntouch>确定</div>
            <div class="tip">
                <p>*将在定投扣款日10:00进行第一次扣款，请确保资金充足。如扣款失败，系统将在当日14:00再次尝试扣款，两次均失败，此期不再扣款。</p>
            </div>
        </div>   
        <popup-picker :show.sync="showPeriodPicker" :data="periodList" :show-cell="false" v-model="periodVal"></popup-picker>
        <popup-picker :show.sync="showDatePicker" :data="dateList" :show-cell="false" v-model="dateVal"></popup-picker>     
	</div>
</template>

<script>
import { PopupPicker} from 'vux'
import utils from 'js/utils'
export default {
	name: 'investModify',
	data() {
		return {
            showPeriodPicker: false,
            showDatePicker: false,
            periodList: [
                [' 每周', '每两周', '每月', '每半年', '每年']
            ],
            dateList: [],
            periodVal: ['每月'],
            dateVal: ['15'],
            title: '定投',
            money: '',
			modelValue: false,
			name: '测试基金', //基金名称
			productCode: '500056', //产品代码
			investAmount: '1,000,00.66', //定投金额
			investRate: '0.60%', //费率
			investCycle: '周', //定投周期
			investDate: '周三', //定投日期
			investPayment: '' //支付方式
		}
    },
    mounted() {
        this.investPayment = utils.getRouterData();

        var list = [];
        for(let i=1;i<=30;i++) {
            list.push(i);
        }
        this.dateList.push(list);        
    },
	methods: {
        tapItem(title) {
            if(title == '定投周期') {
                this.showPeriodPicker = true;
            } else if(title == '定投日期') {
                this.showDatePicker = true;
            } else {
                APP.openWin('/selectBankCard');
            }
        },
		chooseBank() {

		},
		goNext() {            
            utils.setCommonRouter({
                'appropriateAssessment': '/investResult'
            });                 
            APP.openWin('/appropriateAssessment');
		},
		watchAgreen() {

		}
    },
    components: {
        PopupPicker
    }
}
</script>
