<template>
	<view class="container">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'',
			}
		},
		onLoad(options) {
			this.url = decodeURIComponent(options.url);
			console.log("要显示的百度百科页面：",this.url);
		},
		methods: {

		}
	}
</script>

<style>

</style>