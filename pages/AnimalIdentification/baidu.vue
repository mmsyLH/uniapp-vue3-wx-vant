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
			console.log(this.url);
		},
		methods: {

		}
	}
</script>

<style>

</style>