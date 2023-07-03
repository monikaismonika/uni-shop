const state = {
	_cateMsg: [],
};
const getters = {
	getterCateMsg(state) {
		return state._cateMsg;
	}
};
const mutations = {
	GETCATE(state, result) {
		state._cateMsg = result;
	}
};
const actions = {
	async _getCate({
		commit
	}) {
		const {
			message: result
		} = await uni._request({
			method: 'GET',
			url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'
		})
		console.log(result);
		commit('GETCATE', result);
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}