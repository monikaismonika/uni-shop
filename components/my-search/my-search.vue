<template>
	<view class="my-search" @click="gotoSeach">
		<view class="my-search-box">
			<view class="click-box">
				<uni-icons type="search" size="16"></uni-icons>
				搜索
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		data() {
			return {

			};
		},
		methods: {
			gotoSeach() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-search {}

	.my-search-box {
		position: relative;
		height: 50px;
		background-color: #E1251B;

		.click-box {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
			width: 88%;
			height: 70%;
			border-radius: 50rpx;
			background-color: aliceblue;
			line-height: 84rpx;
			text-align: center;
		}
	}
</style>