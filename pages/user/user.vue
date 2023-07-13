<template>
	<view class="user-container">
		<view class="login">
			<view class="head-icon">
				<uni-icons type="contact" size="100px" color="#bfbfbf"></uni-icons>
			</view>
			<view class="login-button-box">
				<button class="login-button" open-type="getUserInfo" @getuserinfo="getuserinfo">一键登录</button>
			</view>
			<view class="login-text">
				登录后尽享更多权益
			</view>
			<view class="shadow-box">
				<view class="line-box">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import setCartBadge from '@/mixins/setCartBadge.js'
	export default {
		mixins: [setCartBadge],
		data() {
			return {

			};
		},
		methods: {
			getuserinfo(e) {
				if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录')
				console.log(e);
			}
		},
	}
</script>

<style lang="scss">
	.login {
		position: absolute;
		top: 15%;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		width: 100%;
		height: 200px;

		.login-button-box {
			width: 80%;

			.login-button {
				border-radius: 30px;
				color: #fff;
				background-color: #ba1b15;
			}
		}

		.login-text {
			font-size: 10px;
			color: #a5a5a5;
			font-weight: 500;
		}

		.shadow-box {
			position: absolute;
			bottom: -30%;
			height: 60px;
			width: 100%;
			overflow: hidden;

			.line-box {
				position: absolute;
				top: 30px;
				width: 100%;
				height: 100%;
				border: 1px solid #dfdfdf;
				border-radius: 100%;
				box-shadow: -3px -1px 10px 6px rgba(0, 0, 0, .3);
			}
		}
	}
</style>