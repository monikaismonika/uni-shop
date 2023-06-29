import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
//引入小仓库
import home from './home/index.js'
import cate from './cate/index.js'
import cart from './cart/index.js'
import user from './user/index.js'

export default new Vuex.Store({
	modules: {
		home,
		cate,
		cart,
		user
	}
});