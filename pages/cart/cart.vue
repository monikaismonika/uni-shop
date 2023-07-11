<template>
	<view class="catr-container">
		<view class="address-box" v-if="_getterCartGoodsMsg.length !==0">
			<my-address></my-address>
		</view>
		<view class="cart-box" v-if="_getterCartGoodsMsg.length !==0">
			<view class="cart-head">
				<uni-icons type="shop" size="22px"></uni-icons>
				<view class="head-text">
					购物车
				</view>
			</view>
			<view class="goods-list-box">
				<view class="goods-item" v-for="(item,index) in _getterCartGoodsMsg" :key="index"
					@longtap="handlerLongtap(item.goods_id)">
					<my-goods :goods="item" :radioShow="true" @changeNum="changeNum"
						@changeRadio="changeRadio"></my-goods>
				</view>
				<view>
					<!-- 提示窗示例 -->
					<uni-popup ref="alertDialog" type="dialog">
						<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确认" title="删除"
							content="将该商品移出购物车" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
					</uni-popup>
				</view>
			</view>
		</view>
		<my-settle class="my-settle" ref="goodsSettle" v-if="_getterCartGoodsMsg.length !==0"></my-settle>
		<view class="empty" v-else>
			<image src="@/static/images/empty.png" mode="widthFix" style="width: 400rpx;"></image>
		</view>
	</view>
</template>

<script>
	import setCartBadge from '@/mixins/setCartBadge.js';
	import {
		mapGetters
	} from 'vuex';
	export default {
		mixins: [setCartBadge],
		data() {
			return {
				deleteGoodsId: -1,
			};
		},
		computed: {
			...mapGetters('cart', ['_getterCartGoodsMsg']),
		},
		methods: {
			async changeNum(e) {
				await this._setBadge();
				this.$refs.goodsSettle.setGoodsCount();
				this.$refs.goodsSettle.setTotal();
			},
			//当radio总数发生改变，通知结算组件变化
			changeRadio() {
				this.$refs.goodsSettle.setGoodsCount();
				this.$refs.goodsSettle.setTotal();
			},
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				this.$store.dispatch('cart/_deleteCartGoods', this.deleteGoodsId);
				this.changeNum();
			},
			dialogClose() {
				console.log('点击关闭');
			},
			handlerLongtap(goodsId) {
				this.deleteGoodsId = goodsId;
				this.dialogToggle('error');
			},
		},
		onShow() {
			if (this.$refs.goodsSettle) {
				this.$refs.goodsSettle.setGoodsCount();
				this.$refs.goodsSettle.setTotal();
			}
		}
	}
</script>

<style lang="scss">
	.catr-container {
		width: 100%;
		position: relative;
		padding-bottom: 50px;

		.empty {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: 280rpx;
			box-shadow: 6px 6px 6px 3px rgba(0, 0, 0, .1);
		}
	}

	.address-box {
		// height: 160rpx;
		border-bottom: 1px solid;
	}

	.cart-head {
		height: 100rpx;
		display: flex;
		line-height: 100rpx;
		font-size: 14px;
		font-weight: 540;
		box-shadow: 1rpx 1rpx 1rpx rgba(0, 0, 0, .3);

		.uni-icons {
			margin-left: 10rpx;
		}

		.head-text {
			margin-left: 10rpx;
			line-height: 94rpx;
		}
	}

	.uni-dialog-title {
		color: red;
	}
</style>