<template>
	<view class="goods-item-box">
		<view class="goods-image-box">
			<image :src="goods.goods_big_logo||defaultImgUrl" mode="widthFix" style="width: 300rpx;"></image>
		</view>
		<view class="goods-detail-box">
			<view class="goods-detail">
				{{goods.goods_name}}
			</view>
			<view class="goods-price">
				￥{{goods.goods_price | tofixed}}

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		//prop传参
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		//过滤器
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		name: "my-goods",
		data() {
			return {
				defaultImgUrl: 'http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_800x800.jpg',
			};
		}
	}
</script>

<style lang="scss">
	.goods-item-box {
		display: flex;
		height: 135px;
		border-bottom: 1rpx solid #ccc;

		.goods-detail-box {
			margin: 0 50rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-detail {
				flex: 1;
				width: 80%;
				margin-top: 30rpx;
				font-size: 14px;
				word-wrap: break-word;
				overflow: hidden;
			}

			.goods-price {
				font-size: 18px;
				color: #E2211C;
				margin-bottom: 10rpx;
			}
		}
	}
</style>