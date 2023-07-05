<template>
	<view class="search-container">
		<view class="search-box">
			<uni-search-bar class="uni-mt-10" radius="100" placeholder="搜索" clearButton="auto" cancelButton="none"
				@confirm="search" @input="input" />
		</view>
		<view class="goods-list" v-if="searchValue">
			<view class="goods-item" v-for="(item,index) in queryResult" :key="index">
				<view class="search-icon">
					<uni-icons type="search" size="18"></uni-icons>
				</view>
				<view class="goods-name">
					{{item.goods_name}}
				</view>

			</view>
		</view>
		<view class="history" v-show="historys&&historys.length !== 0">
			<view class="history-box-head">
				<view class="text">
					搜索历史
				</view>
				<uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" class="history-item" @click="navigatorToHistory(item)"
					v-for="(item,index) in historys" :key="index"
					custom-style="background-color: #ccc; border-color: #ccc; color:#272822;font-weight: 500;">
				</uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				searchValue: '',
				queryResult: [],
				tempHistory: [],
				test: [],
			}
		},
		computed: {
			//页面用的翻转过的历史记录
			historys() {
				return this.tempHistory.length === 0 ? [] : [...this.tempHistory].reverse();
			}
		},
		methods: {
			input(e) {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.searchValue = e;
					this._getSeacherList();
					this._addAndSaveHistory(e);
				}, 1000)
			},
			//历史记录的转跳
			navigatorToHistory(queryValue) {
				uni.navigateTo({
					url: `/subpkg/goods_list/goods_list?query=${queryValue}`
				})
			},
			//添加并保存历史记录
			_addAndSaveHistory(key) {
				if (key === "") return;
				const historySet = new Set(this.tempHistory);
				historySet.delete(key);
				historySet.add(key);
				this.tempHistory = Array.from(historySet);
				uni.setStorageSync('historyList', JSON.stringify(this.tempHistory));
			},
			//清空搜索历史
			cleanHistory() {
				this.tempHistory.splice(0, this.tempHistory.length);
				uni.setStorageSync('historyList', '[]');
			},
			//ajax抓取搜索推荐
			async _getSeacherList() {
				if (this.searchValue !== '') {
					const result = await uni._request({
						url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
						method: 'GET',
						data: {
							query: this.searchValue
						}
					})
					if (result !== null) {
						this.queryResult = result.message.goods;
					}
				}
			}
		},
		onLoad() {
			this.tempHistory = JSON.parse(uni.getStorageSync('historyList') || '[]')
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: relative;
		height: 50px;
		background-color: #E1251B;

		.search-ipt {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
			width: 88%;
			height: 70%;
		}
	}

	.goods-item {
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #ccc;
		height: 80rpx;
		margin: 10rpx 0;
		line-height: 80rpx;

		.search-icon {
			margin: 0 34rpx;
		}

		.goods-name {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			margin-right: 50rpx;
		}
	}

	.history-box-head {
		height: 80rpx;
		line-height: 80rpx;
		margin: 0 30rpx;
		font-size: 12px;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #ccc;
	}

	.history-list {
		display: flex;
		flex-wrap: wrap;

		.history-item {
			margin: 20rpx;
		}
	}
</style>