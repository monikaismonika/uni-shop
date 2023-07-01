<template>
	<view>
		<swiper class="home_swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
			:circular="true">
			<swiper-item v-for="(item,index) in swiperMsg" :key="item">
				<navigator class="swiper-item" :url="`/subpkg/good_detail/goods_detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src" mode="aspectFit" style="height: 340rpx;"></image>
				</navigator>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				swiperMsg: {},
			};
		},
		methods: {
			_getSwiperMsg() {
				return this.$store.dispatch('home/_getSwiper', {
					method: 'GET',
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
				})
			}
		},
		async mounted() {
			this.swiperMsg = await this._getSwiperMsg();
			console.log(this.swiperMsg);
		},
	}
</script>

<style lang="scss">
	// .home_swiper {
	// 	margin-top: 0px;
	// }
</style>