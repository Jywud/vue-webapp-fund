<style lang="less">
@import url("../../common/style/common.less");
#selectBankCard {
	.page-style();
	.content {
		background: #fff;
		margin-top: 11px;
		.product {
			background: #fff;
			margin-left: 16px;
			padding: 11px 11px 11px 0;
			.border-b-1px();
			.item {
				display: flex;
				font-family: PingFangSC-Regular;
				font-size:16px;
				color:@dark-color;
                line-height:26px;               
            }
			.item-left {
				flex: 1;
				text-align: left;
			}
			.item-right {
				text-align: right;
			}
		}
		.add-bank-card {
			padding: 11px 11px 11px 20px;
			font-family:PingFangSC-Regular;
			font-size:14px;
			color:@gray-color;
			line-height:26px;
			text-align:left;
		}
	}
}
</style>
<template>
	<div id="selectBankCard">
		<title-bar title="选择银行卡"></title-bar>
		<div class="content">
			<div class="product" v-for="(item, index) in list" :key="index">
				<label class="item">
					<span class=" item-left">{{item.name}}</span>
					<input type="radio" :value="item.name" v-model="select">
					<i class="iconfont i-radio"></i>
				</label>
			</div>
			<div class="add-bank-card" @click="addCard">
                <i class="iconfont icon-black"></i> 添加银行卡
            </div>
		</div>
	</div>
</template>
<script>
import utils from 'js/utils'
export default {
	name: "selectBankCard",
	data() {
		return {
            select: '',
			list: [{
				name: '招商银行(尾号5555)',
				isSelect: false,
				userName:'李李'
			},
			{
				name: '交通银行(尾号6666)',
				isSelect: false,
				userName:'李李'
			},
			{
				name: '华夏银行(尾号8888)',
				isSelect: false,
				userName:'李李'
			}]
	    }
    },
    methods: {
        addCard() {
            APP.openWin('/addBankCard');
        }
    },
    watch: {
        select(val) {
            setTimeout(()=> {
                utils.setRouterData(val);
                APP.closeWin();
            }, 500);
            
        }
    }
}
</script>
