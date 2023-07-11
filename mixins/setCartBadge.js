import {
	mapGetters
}
from 'vuex'

export default {
	computed: {
		...mapGetters('cart', ['_getterGoodsCount']),
	},
	methods: {
		_setBadge() {
			if (this._getterGoodsCount) {
				uni.setTabBarBadge({
					index: 2,
					text: this._getterGoodsCount + '',
				})
			} else {
				uni.removeTabBarBadge({
					index: 2,
				})
			}

		}
	},
	onShow() {
		this._setBadge();
	}
}