<template>
	<view class="cateContainer">
		<my-search class="my-search-component"></my-search>
		<view class="scroll_box" :style=" 'height:'+ _windowHeight+'px;' ">
			<scroll-view scroll-y=" true" class="left_box">
				<view :class="'cate-msg-item '+ (index === isCurrent ? 'current':'') " v-for="(item,index) in cateMsg"
					:key="index" @click="changeCurrent(index)">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<scroll-view scroll-y=" true" class="scroll_right" :scroll-top="scrollTop">
				<view v-for="(item,index) in cate2" :key="index" class="brand-box">
					<view class="cate-head">
						/ {{item.cat_name}} /
					</view>
					<view class="branch-list">
						<navigator v-for="(brand,brand_index) in item.children" :key="brand_index"
							:url="'../../subpkg/goods_list/goods_list?cid='+brand.cat_id">
							<image :src="brand.cat_icon" mode="widthFix" style="width:120rpx;"></image>
							<view class="brand_name">
								{{brand.cat_name}}
							</view>
						</navigator>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	}
	from 'vuex';
	export default {
		data() {
			return {
				isCurrent: 0,
				value: 0,
				cate2: [],
				scrollTop: 0,
			};
		},
		methods: {
			//切换分类
			changeCurrent(index) {
				this.isCurrent = index;
				//渲染右侧二级分类选项
				this.cate2 = this.cateMsg[index].children;
				//列表重新回到顶部
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},

			_getCateMsg() {
				this.$store.dispatch('cate/_getCate');
			}
		},
		computed: {
			_windowHeight() {
				console.log(uni.getWindowInfo().windowHeight);
				return uni.getWindowInfo().windowHeight - 50;
			},
			...mapGetters('cate', {
				cateMsg: 'getterCateMsg'
			})
		},
		watch: {
			cateMsg(newValue, oldValue) {
				this.cate2 = newValue[0].children;
			},
		},
		async mounted() {
			await this._getCateMsg()
		}
	}
</script>

<style lang="scss">
	.scroll_box {
		display: flex;
		width: 100%;

		.left_box {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 300rpx;

			view {
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				background-color: #fff;
			}

			.current {
				position: relative;
				background-color: #ccc;
				color: #fff;
				box-shadow: 17rpx 20rpx 40rpx rgba(0, 0, 0, .3);

				&:before {
					content: ' ';
					position: absolute;
					height: 70rpx;
					width: 8rpx;
					left: 0;
					top: 50%;
					border-radius: 4rpx;
					transform: translateY(-50%);
					background-color: orangered;
				}
			}

		}

		.scroll_right {
			background-color: #fff;

			.brand-box {
				.cate-head {
					text-align: center;
					margin: 40rpx 0;
				}

				.branch-list {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: space-between;
					margin: 0 20rpx;

					navigator {
						margin: 5rpx;
						text-align: center;
						font-size: 12px;
					}

					// image
				}
			}
		}
	}
</style>