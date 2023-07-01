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
		<ul class="nav-list">
			<li v-for="(item,index) in navListMsg" :key="index">
				<navigator :url="item.navigator_url" @click="handlerClickNavList(item.name)">
					<image :src="item.image_src" mode="aspectFit" style="width: 90%;height: 90%;"></image>
				</navigator>
			</li>
		</ul>
		<view class="hot-celling-products">
			<view v-for="(item,index) in topCellingproductsMsg" :key="index">
				<view class="cell-cate">
					<image :src="item.floor_title.image_src" mode="heightFix" style="height: 60rpx;"></image>
				</view>
				<view class="product_box">
					<navigator class="left-product" :url="item.product_list[0].navigator_url">
						<image :src="item.product_list[0].image_src" mode="widthFix"
							:style="{width: item.product_list[0].image_width+'rpx;'}"></image>
					</navigator>
					<view class="right-box">
						<navigator v-for="(i2,index2) in item.product_list" :key="index2" v-if="index2 !==0"
							:url="i2.navigator_url">
							<image :src="i2.image_src" mode="widthFix" :style="{width: i2.image_width+'rpx;'}"></image>
						</navigator>
					</view>
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
		data() {
			return {
				swiperMsg: {},
				navListMsg: {},
			};
		},
		methods: {
			//处理点击navList
			handlerClickNavList(name) {
				if (name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate',
					})
				}
			},
			//M 抓取轮播图信息
			_getSwiperMsg() {
				return this.$store.dispatch('home/_getSwiper', {
					method: 'GET',
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
				})
			},
			//M 抓取导航列表信息
			_getNavListMsg() {
				return this.$store.dispatch('home/_getNavList', {
					method: 'GET',
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'
				})
			},
			//M 抓取热门商品模块
			_getTopCellingproductsMsg() {
				this.$store.dispatch('home/_getTopCellingproduct', {
					method: 'GET',
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'
				})
			},
		},
		computed: {
			...mapGetters('home', {
				topCellingproductsMsg: '_topCellingproductsMsg'
			})
		},
		async mounted() {
			this.swiperMsg = await this._getSwiperMsg();
			this.navListMsg = await this._getNavListMsg();
			await this._getTopCellingproductsMsg();
			// console.log(this.swiperMsg);
			// console.log(this.navListMsg);
			console.log(this.topCellingproductsMsg);
		},
	}
</script>

<style lang="scss">
	.home_swiper {
		height: 340rpx;
	}

	.nav-list {
		height: 150rpx;
		// background-color: orange;
		margin: 20rpx 0;
		display: flex;
		justify-content: space-between;
		list-style: none;
	}

	.nav-list li,
	.nav-list navigator,
	.nav-list navigator image {
		height: 140rpx;
		text-align: center;
	}

	.nav-list li {
		flex: 1;
	}

	.product_box {
		display: flex;
	}

	.right-box {
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
	}
</style>