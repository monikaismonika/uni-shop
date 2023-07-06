<template>
	<view>
		<view class="goods-list-box">
			<view v-for="(item,index) in showList" :key="index" @click="goToDetail(item.goods_id)">
				<my-goods :goods="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pagenum: 1,
				pagesize: 10,
				total: 0,
				goodsList: [],
				arrStarPoint: 0,
				options: {},
				timer: null,
				inLoop: false,
			};
		},
		async onLoad(options) {
			this.options = options;
			await this._getGoodsList(options);
		},
		async onPullDownRefresh() {
			this.pagenum = 1;
			this.goodsList = [];
			this.arrStarPoint = 0;
			await this._getGoodsList(this.options);
			uni.stopPullDownRefresh();
		},
		computed: {
			showList() {
				return this.goodsList.slice(this.arrStarPoint, this.arrStarPoint + 8);
			}
		},
		methods: {
			//转跳至详情页
			goToDetail(goodsId) {
				uni.navigateTo({
					url: `/subpkg/good_detail/goods_detail?goods_id=${goodsId}`
				})
			},
			async _getGoodsList(options) {
				if (this.total !== 0 && this.goodsList.length == this.total) {
					return;
				}
				const result = await uni._request({
					method: 'GET',
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
					data: {
						query: options.query || '',
						cid: options.cid || '',
						pagesize: this.pagesize,
						pagenum: this.pagenum,
					}
				})
				this.total = result.message.total;
				this.goodsList = [...this.goodsList, ...result.message.goods];
			},
			//改变当前可视数组
			async _chageShowList(step) {
				if (step > 0) {
					if (this.arrStarPoint + 8 == this.total) return;
					this.arrStarPoint = this.arrStarPoint + 1;
					if (this.arrStarPoint + 8 == this.goodsList.length - 1) {
						this.pagenum = this.pagenum + 1;
						await this._getGoodsList(this.options);
					}
				} else {
					this.arrStarPoint >= 1 ? this.arrStarPoint = this.arrStarPoint + step : this.inLoop = false;
				}

			},
			//自定义页面滚动事件
			_myScroll(showListStep, pageScrollStep) {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this._chageShowList(showListStep);
					uni.pageScrollTo({
						scrollTop: 135 * 2 + pageScrollStep,
						duration: 0 // 滚动动画的时长
					});
				}, 10)
			}
		},
		onPageScroll(res) {
			if (Number(res.scrollTop).toFixed(2) > 135 * 3 && this.arrStarPoint + 8 !== this.total) {
				this.inLoop = true;
				this._myScroll(1, res.scrollTop % 135);
			} else if (Number(res.scrollTop).toFixed(2) < 135 * 1.3 && this.inLoop) {
				this._myScroll(-1, res.scrollTop % 135);
			}
		}
	}
</script>

<style lang="scss">
</style>