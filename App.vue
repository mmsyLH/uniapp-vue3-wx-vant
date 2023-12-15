<script>
	import routingIntercept from '@/router/index.js'
	export default {
		onLaunch: function() {
			routingIntercept();
		
		},
		onShow: function() {
			//console.log('App Show')
		},
		onHide: function() {
			//console.log('App Hide')
		}
	}
</script>
	
<style lang="scss">
	@import 'uview-plus/index.scss';
	
	@import 'static/css/colorui/main.css';
	@import 'static/css/index.css';
	
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		font-family: "customicons" !important;
	}
	html, body {
	  font-family: "customicons" !important;
	}
	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	

</style>
