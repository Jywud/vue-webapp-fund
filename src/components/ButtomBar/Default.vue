<style lang="less">
@import "../../common/style/common.less";
	#buttom-bar{		
		position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        width: 100%;        
        background-color: #fff;
        border-top: 1px solid #ebebeb;
        z-index: 99;        
        .item{
        	flex: 1;
        	width: 100%;
        	padding: 5px 0 5px;
        	text-align: center;
        	color: #999;
        	&.active{
        		color: @primary-color;
            }
            .iconfont{
                font-size: 20px;
            }
			.text{				
				font-size: 12px;
			}
        }
	}
</style>
<template>
	<div id="buttom-bar">
		<div class="item" v-for="(item, index) in list" :key="index" :class="{active: item.isActive}" @click="select(item, index)">
			<i class="iconfont" :class="item.icon"></i>
			<p class="text">{{item.name}}</p>
		</div>
	</div>
</template>
<script>
import utils from 'js/utils'
	export default {
		name: 'ButtomBar',
		data() {
			return {
				list: [
				{
					name: '首页',
					isActive: false,
                    url: '/home',
                    icon: 'icon-normal1'
				},
				{
					name: '资产',
					isActive: false,
                    url: '/home/asset',
                    icon: 'icon-active'
				},
				{
					name: '我的',
					isActive: false,
                    url: '/home/mine',
                    icon: 'icon-normal'
				}]
			}
		},
		mounted() {            
            // var activeIndex = this.$store.state.buttomBarActiveIndex;
            var activeIndex = utils.getData('buttomBarActiveIndex') || 0;			
			this.list[activeIndex].isActive = true;
		},
		computed: {
		    /*activeIndex() {		    	
		      return this.$store.state.buttomBarActiveIndex;
		    }*/
		},
		methods: {
			select(item, index) {				
				if(item.isActive) {
					return;
				}

				this.list.forEach( data =>{
					data.isActive = false;
				});
				item.isActive = true;

                // this.$store.dispatch('setButtomBarActiveIndex', index);
                utils.setData('buttomBarActiveIndex', index);
				this.$router.push(item.url);
			}
		}
	}
</script>