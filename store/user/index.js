const state = {
	token: '',
};
const getters = {
	_getterToken(state) {
		return state.token;
	}
};
const mutations = {
	SAVETOKEN(state, token) {
		state.token = token
	}
};
const actions = {
	//设置token
	_setToken({
		commit
	}, token) {
		commit('SAVETOKEN', token);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}