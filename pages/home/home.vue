<template>
	<view>
		home
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			test() {
				return uni._request({
					method: 'GET',
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
				});
			}
		},
		mounted() {},
	}
</script>

<style lang="scss">

</style>