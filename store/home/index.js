const state = {
	swiperMsg: {}
};
const getters = {
	_swiperMsgGetter(state) {
		return state.swiperMsg;
	}
};
const mutations = {
	GETSWIPER(state, result) {
		this.swiperMsg = result;
	}
};
const actions = {
	async _getSwiper({
		commit
	}, reqMsg) {
		const result = await uni._request(reqMsg);
		result == 'error' ? {} : commit('GETSWIPER', result.message);
		return result.message;
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}