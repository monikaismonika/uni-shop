<template>
	<view class="goods_detail">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item @click="previewImg(index)" v-for="(item,index) in goodsDetailMsg.pics" :key="index">
				<image :src="item.pics_big" style="height: 100%; width: 100%;"></image>
			</swiper-item>
		</swiper>
		<view class="info-box">
			<view class="price-box">
				￥{{goodsDetailMsg.goods_price}}
			</view>
			<view class="info-detail-box">
				<view class="goods-name">
					{{goodsDetailMsg.goods_name}}
				</view>
				<view class="star-box">
					<uni-icons type="star" size="20" color="#818181;"></uni-icons>
					<view class="star-text">
						收藏
					</view>
				</view>
			</view>
			<view class="freight-box">
				快递：免运费
			</view>
		</view>
		<rich-text :nodes="goodsDetailMsg.goods_introduce"></rich-text>
		<view class="goods-carts">
			<uni-goods-nav :options="navOptions" :fill="true" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	let that = null;
	export default {
		data() {
			return {
				goodsDetailMsg: {},
				navOptions: [{
					icon: 'shop',
					text: '店铺',
					info: 0,
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
				customButtonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #1E83FF, #0053B8)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #60F3FF, #088FEB)',
						color: '#fff'
					}
				],
				customButtonGroup1: [{
					text: '立即购买',
					backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
					color: '#fff'
				}]
			};
		},
		async onLoad(Options) {
			that = this;
			await this._getDetailMsg(Options.goods_id);
		},
		methods: {
			previewImg(index) {
				uni.previewImage({
					current: index,
					urls: this.goodsDetailMsg.pics.map(item =>
						item.pics_big)
				})
			},
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				this.navOptions[1].info++
			},
			async _getDetailMsg(goodsId) {
				await uni._request({
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
					method: 'GET',
					data: {
						goods_id: goodsId
					},
					after(result) {
						if (result.statusCode && result.statusCode == 200) {
							that.goodsDetailMsg = result.data.message;
							that.goodsDetailMsg.goods_introduce = that.goodsDetailMsg.goods_introduce.replace(
								/<img /g,
								'<img style="display:block;" ')
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.goods_detail {
		padding-bottom: 20px;
	}

	swiper {
		height: 750rpx;
	}

	.info-box {
		.price-box {
			color: #c30001;
			font-size: 16px;
			margin: 20rpx 20rpx;
		}

		.info-detail-box {
			margin: 0 20rpx;
			display: flex;
			font-size: 12px;

			.star-box {
				width: 280rpx;
				margin-left: 20rpx;
				color: #818181;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				text-align: center;
				border-left: 2px solid #ccc;
			}
		}

		.freight-box {
			margin: 10rpx 20rpx;
			margin-bottom: 80rpx;
			color: #818181;
			font-size: 10px;
		}
	}

	.example-body {
		padding: 0;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
</style>