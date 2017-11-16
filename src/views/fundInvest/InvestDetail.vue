<style lang="less">
@import url("../../common/style/common.less");
#investDetail {
	.page-style();
	.content {
        flex: 1;
		background: #fff;
		margin: 13px 12px;
		border-radius: 6px;		
		.header {
			text-align: center;
			padding: 16px 0px;
			margin-bottom:10px;
			.border-b-1px();
			.fund-name {
				font-family: PingFangSC-Regular;
				font-size: 20px;
                color: @dark-color;
                margin-bottom: 4px;
                .arrow-r();
			}
			.fund-code {
				font-family: HelveticaNeue;
				font-size: 12px;
				color: @gray-color;
				letter-spacing: 0;
				line-height: 12px;
			}
			.fund-state {
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #f58700;
				letter-spacing: 0;
				line-height: 20px;
			}
		}
		.product {
			display: flex;
            background: #fff;
            padding: 0 20px;
			.item {
				flex: 1;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				line-height: 14px;
				padding: 14px 0;
			}
			.item-left {
                color: @gray-color;
				text-align: left;
			}
			.item-right {
                color: @dark-color;
				text-align: right;
			}
		}
	}
	.buttom-box {
        display: flex;
		height: 50px;
        background: #fff;
        text-align: center;
        color: #b8b8b8;
        font-size: 16px;
        line-height: 50px;   
		.item {
            .border-r-1px();
            flex: 1;			
			width: 100%;
			color: @primary-color;			         
            .iconfont{
                margin-right: 3px;
            }
        }
        .not-modify{            
            width: 100%;
        }
	}
}
</style>
<template>
	<div id="investDetail">
		<title-bar title="详情" :isColorful="true"></title-bar>
		<div class="content">
			<div class="header">
				<p class="fund-name" @click="goPage('/fundDetails')">
					{{name}}
				</p>
				<p class="fund-code">
					{{product_code}}
				</p>				
			</div>
			<div class="product" v-for="(item, index) in list" :key="index">
				<div class="item-left item">{{item.name}}</div>
				<div class="item-right item">{{item.content}}</div>
			</div>
		</div>
		<div class="buttom-box" v-if="isModify">
			<div class="item" @click="goPage('/investModify')"><i class="iconfont icon-xiugai"></i>  修改</div>
			<div class="item" @click="stop"><i class="iconfont icon-stop"></i>  终止</div>
		</div>
		<div class="buttom-box" v-if="!isModify">
			<div class="not-modify">终止审核中</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "investDetail",
	data() {
		return {
            isModify: true, //是否可以修改和终止
			name: '测试基金', //基金名称
			product_code: '500056', //产品代码
			state: '终止审核中',
			invest_amount: '1,000,00.66', //定投金额
			invest_rate: '0.60%', //费率
			invest_cycle: '周', //定投周期
			list: [
                {
                    name: '定投周期:',
                    content: '周'
                },
                {
                    name: '定投日期:',
                    content: '周一'
                },
                {
                    name: '下次扣款日期:',
                    content: '2017-08-21'
                },
                {
                    name: '定投金额:',
                    content: '100元'
                },
                {
                    name: '支付方式:',
                    content: '****7806(招商)'
                },
                {
                    name: '累计定投金额:',
                    content: '100元'
                },
                {
                    name: '累计份额:',
                    content: '100份'
                }			
		    ]
        }
    },    
    methods:{
        showPasswordPan() {
            APP.openPopWin('passwordView', (data)=> {                
                if(data.status == 2) {
                    //终止审核
                    this.isModify = false;
                }                
            });
        },
        stop() {
            this.$vux.confirm.show({
                content: '终止后将不再扣款，且定投计划不可恢复。',
                onCancel: ()=> {                    
                },
                onConfirm: () => {                            
                    this.showPasswordPan();
                }
            });            
        },
        goPage(url) {
            APP.openWin(url);
        }
    }
}
</script>
