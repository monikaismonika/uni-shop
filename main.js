// #ifndef VUE3
import Vue from 'vue'
import App from './App'

//引入请求模块并绑定
import './api/request.js'
//引入自定义showMsg
import './utils/showMsg.js'
//引入vuex
import store from './store/store.js'

Vue.config.productionTip = false

App.mpType = 'app'

//绑定vuex
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app,
	}
}
// #endif