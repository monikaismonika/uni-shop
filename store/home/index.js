const state = {
	swiperMsg: {},
	navListMsg: {},
	topCellingproductsMsg: {},
};
const getters = {
	_swiperMsgGetter(state) {
		return state.swiperMsg;
	},
	_topCellingproductsMsg(state) {
		return state.topCellingproductsMsg;
	}
};
const mutations = {
	GETSWIPER(state, result) {
		state.swiperMsg = result;
	},
	GETNAVLIST(state, result) {
		state.navListMsg = result;
	},
	GETTOPCELLINGPRODUCTS(state, result) {
		result.forEach(product => {
			product.product_list.forEach(item => {
				item.navigator_url = '/subpkg/goods_list/goods_list?' + item.navigator_url.split(
					'?')[1]
			})
		})
		state.topCellingproductsMsg = result;
	},
};
const actions = {
	//抓取轮播图信息
	async _getSwiper({
		commit
	}, reqMsg) {
		const result = await uni._request(reqMsg);
		result == 'error' ? {} : commit('GETSWIPER', result.message);
		return result.message;
	},
	//抓取导航列表信息
	async _getNavList({
		commit
	}, reqMsg) {
		const result = await uni._request(reqMsg);
		result == 'error' ? {} : commit('GETNAVLIST', result.message);
		return result.message;
	},

	//M 抓取热门商品模块
	async _getTopCellingproduct({
		commit
	}, reqMsg) {
		const result = await uni._request(reqMsg);
		result == 'error' ? {} : commit('GETTOPCELLINGPRODUCTS', result.message);
		// return result.message;
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}