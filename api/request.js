//二次封装request
uni._request = async (obj) => {
	let {
		before,
		after,
		stopErrorCallBack,
		...val
	} = obj
	//执行前置处理器
	before ? before() : null;
	//发送请求
	let res = await uni.request({
		...val,
		timeout: 5000,
	})
	//执行后置处理器
	after ? after(result = res[1]) : null;
	//成功则返回结果
	if (res[1].statusCode === 200) {
		return res[1].data;
	}

	// 是否阻止默认失败回调
	if (!stopErrorCallBack) {
		uni.showToast({
			title: '请求失败',
			icon: 'none',
			duration: 1500
		})
	}
	//失败则返回error
	return 'error';
}