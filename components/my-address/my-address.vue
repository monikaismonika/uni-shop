<template>
	<view>
		<view class="address-container" @click="addAddress">
			<view class="button-box" v-if="JSON.stringify(addressMsg) === '{}'">
				<button type="primary" size="mini" class="select-address-btn">请选择收货地址</button>
			</view>
			<view class="address-detail" v-else>
				<view class="row-one">
					<view class="one-left">
						收货人：{{addressMsg.userName}}
					</view>
					<view class="one-right">
						<view class="tel">
							电话：{{addressMsg.telNumber}}
						</view>
						<view class="select-other">
							<uni-icons type="arrowright" size="16"></uni-icons>
						</view>
					</view>

				</view>
				<view class="user-address">
					收货地址：{{userAddress}}
				</view>
			</view>
		</view>
		<view class="bottom-box">
			<image src="@/static/images/address-bottom-image.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {
				addressMsg: {}
			};
		},
		computed: {
			...mapGetters('cart', ['_getterAddressMsg']),
			userAddress() {
				return this.addressMsg.provinceName + this.addressMsg.cityName + this.addressMsg.countyName + this
					.addressMsg.detailInfo + ''
			}
		},
		methods: {
			async addAddress() {
				this.addressMsg = await this.$store.dispatch('cart/_chooseAddress');
			}
		},
		mounted() {
			this.addressMsg = this._getterAddressMsg;
		}
	}
</script>

<style lang="scss">
	.address-container {
		height: 160rpx;
		display: flex;
		align-items: center;

		.button-box {
			margin: 0 auto;

			.select-address-btn {}
		}

		.address-detail {
			width: 96%;
			margin: 0 auto;
			font-size: 14px;

			.row-one {
				display: flex;
				justify-content: space-between;

				.one-right {
					display: flex;

					.select-other {
						margin-left: 10rpx;
					}
				}
			}
		}
	}
</style>