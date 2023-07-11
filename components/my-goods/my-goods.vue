<template>
	<view class="goods-item-box">
		<label class="radio" v-if="radioShow" @click="handlerRadioChange(goods.goods_id)">
			<radio value="" color="red" :checked="goods.goods_state" />
		</label>
		<view class="goods-image-box">
			<image :src="goods.goods_big_logo||defaultImgUrl" mode="widthFix" style="width: 85px; margin-top: 25px;">
			</image>
		</view>
		<view class="goods-detail-box">
			<view class="goods-detail">
				{{goods.goods_name}}
			</view>
			<view class="price-count-box">
				<view class="goods-price">
					￥{{goods.goods_price | tofixed}}
				</view>
				<view class="count" v-if="radioShow">
					<uni-number-box :min="1" :max="99" size="small" background="#dcdcdc" :value="goods.goods_count"
						@change="handlerGoodsNumChange"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		//prop传参
		props: {
			goods: {
				type: Object,
				default: {}
			},
			radioShow: {
				type: Boolean,
				required: false,
				default: false
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
		},
		methods: {
			async handlerRadioChange(goodsId) {
				await this.$store.dispatch('cart/_changeGoodsState', goodsId);
				this.$emit('changeRadio')
			},
			//处理数量change事件
			handlerGoodsNumChange(newCount) {
				this.$store.dispatch('cart/_handlerGoodsNumChange', {
					newCount,
					goodsId: this.goods.goods_id
				});
				this.$emit('changeNum')
			}
		}
	}
</script>

<style lang="scss">
	.goods-item-box {
		position: relative;
		display: flex;
		height: 135px;
		border-bottom: 1rpx solid #ccc;

		.radio {
			line-height: 135px;
			text-align: center;
		}

		.goods-detail-box {
			margin: 0 10rpx;
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;

			.goods-detail {
				margin-top: 30rpx;
				font-size: 12px;
				word-wrap: break-word;
				overflow: hidden;
			}

			.price-count-box {
				display: flex;
				justify-content: space-between;



				.goods-price {
					font-size: 16px;
					color: #E2211C;
					margin-bottom: 10rpx;
				}
			}


		}

	}
</style>