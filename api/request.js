//二次封装request
uni._request = (method, url, data) => {
	uni.request({
		method,
		url,
		data,
		timeout: 5000,
		success: function(res) {
			console.log(res.data);
			return res.data
		},
		fail: function(res) {
			console.log(res);
			return res.code;
		}
	})
}