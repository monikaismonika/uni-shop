const state = {
	goodsMsg: JSON.parse(uni.getStorageSync('goodsMsg') || '[]'),
	addressMsg: JSON.parse(uni.getStorageSync('addressMsg') || '{}'),
};
const getters = {
	//返回购物车商品数量
	_getterGoodsCount(state) {
		let goodsCount = 0;
		state.goodsMsg.forEach(item => {
			goodsCount += item.goods_count;
		})
		return goodsCount;
	},
	//返回购物车信息
	_getterCartGoodsMsg(state) {
		return state.goodsMsg;
	},
	//返回本地地址信息
	_getterAddressMsg(state) {
		return state.addressMsg;
	},
	//返回结算数量
	_getterSettleCount(state) {
		return state.goodsMsg.filter(item => item.goods_state).reduce((count, i2) => count += i2.goods_count, 0);
	},
	//返回结算总价
	_getterTotal(state) {
		return state.goodsMsg.filter(item => item.goods_state).reduce((total, i2) => total += i2.goods_count *
			i2.goods_price, 0);
	},
};
const mutations = {
	ADDGOODS(state, storeGoodsMsg) {
		const result = state.goodsMsg.find(item => item.goods_id == storeGoodsMsg.goods_id);
		result ? result.goods_count++ : state.goodsMsg.push(storeGoodsMsg);
		uni.setStorageSync('goodsMsg', JSON.stringify(state.goodsMsg));
	},
	CHANGEGOODSSTATE(state, goodsId) {
		state.goodsMsg.forEach(item => {
			if (item.goods_id === goodsId) {
				item.goods_state = !item.goods_state;
				uni.setStorageSync('goodsMsg', JSON.stringify(state.goodsMsg));
			}
		})
	},
	HANDLERGOODSNUMCHANGE(state, val) {
		state.goodsMsg.forEach(item => {
			if (item.goods_id === val.goodsId) {
				item.goods_count = val.newCount;
				uni.setStorageSync('goodsMsg', JSON.stringify(state.goodsMsg));
			}
		})
	},
	DELETEGOODS(state, goodsId) {

		state.goodsMsg = state.goodsMsg.filter(item => {
			return item.goods_id !== goodsId
		})
		uni.setStorageSync('goodsMsg', JSON.stringify(state.goodsMsg));
	},
	SAVEADDRESS(state, addressMsg) {
		uni.setStorageSync('addressMsg', JSON.stringify(addressMsg));
	},
	CHANGETOTALCHECKED(state, newTotalState) {
		state.goodsMsg.forEach(item => item.goods_state = newTotalState);
		uni.setStorageSync('goodsMsg', JSON.stringify(state.goodsMsg));
	},
};
const actions = {
	//添加购物车数据
	_addGoodsToCart({
		commit
	}, storeGoodsMsg) {
		commit('ADDGOODS', storeGoodsMsg);
	},
	//改变radio选中状态
	_changeGoodsState({
		commit
	}, goodsId) {
		commit('CHANGEGOODSSTATE', goodsId);
	},
	//处理数量变化
	_handlerGoodsNumChange({
		commit
	}, val) {
		commit('HANDLERGOODSNUMCHANGE', val);
	},
	//删除购物车商品
	_deleteCartGoods({
		commit
	}, goodsId) {
		commit('DELETEGOODS', goodsId);
	},
	//选择地址并将地址保存到本地
	async _chooseAddress({
		commit
	}) {
		const [err, succ] = await uni.chooseAddress().catch(err => err);
		if (err === null && succ.errMsg === 'chooseAddress:ok') {
			commit('SAVEADDRESS', succ);
		}
		return succ || {};
	},
	//修改全选
	async _changeTotalChecked({
		commit
	}, newState) {
		commit('CHANGETOTALCHECKED', newState);
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}