const state = {
	swiperMsg: {},
	navListMsg: {},
};
const getters = {
	_swiperMsgGetter(state) {
		return state.swiperMsg;
	}
};
const mutations = {
	GETSWIPER(state, result) {
		state.swiperMsg = result;
	},
	GETNAVLIST(state, result) {
		state.navListMsg = result;
	}
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
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}