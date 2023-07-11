<template>
	<view class=" my-settle-container">
		<view class="check-money">
			<view class="check">
				<label class="radio">
					<radio color="#d00" value="" :checked="totalCheck" @click="HandlerTotalRadioChange" />
				</label>
				<view class="text">
					全选
				</view>
			</view>
			<view class="total">
				合计：<text style="color: #E1251B;">￥{{total}}</text>
			</view>
		</view>
		<view class="gotoPay">
			结算{{ '('+goodsCount+')'}}
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				goodsCount: 0,
				total: 0,
				totalCheck: false
			};
		},
		computed: {
			...mapGetters('cart', ['_getterSettleCount', '_getterTotal', '_getterGoodsCount']),
			_totalCheck() {
				return this._getterSettleCount === this._getterGoodsCount
			},
		},
		watch: {
			_totalCheck(newValue) {
				this.totalCheck = newValue;
			}
		},
		methods: {
			//改变全选状态并刷新页面数据
			async HandlerTotalRadioChange() {
				this.totalCheck = !this.totalCheck;
				await this.$store.dispatch('cart/_changeTotalChecked', this.totalCheck);
				this.setGoodsCount();
				this.setTotal();
			},
			//重设商品总数
			setGoodsCount() {
				this.goodsCount = this._getterSettleCount;
			},
			//重设总价
			setTotal() {
				this.total = this._getterTotal;
			}
		},
		mounted() {
			this.setGoodsCount();
			this.setTotal();
			this.totalCheck = this._totalCheck
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		width: 100%;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		z-index: 999;
		height: 50px;
		line-height: 50px;
		display: flex;
		justify-content: space-between;

		.check-money {
			margin-left: 3px;
			display: flex;
			justify-content: space-evenly;
			font-size: 14px;
			vertical-align: middle;

			.check {
				display: flex;

				.radio {
					margin-top: -2px;
				}
			}

			.total {
				margin-left: 40px;
			}
		}

		.gotoPay {
			background-color: #E1251B;
			width: 100px;
			font-size: 14px;
			color: #fff;
			text-align: center;
		}
	}
</style>