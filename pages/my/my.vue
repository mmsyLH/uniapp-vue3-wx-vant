<template>
	<view>
		<view class="my-center">
			<view class="my-setting" :style="{backgroundColor:bgColor}">
				<uni-icons type="scan" size="24" class="item" color="#d4e4ff" @click="btnScanCode"></uni-icons>
				<uni-icons type="settings" size="24" class="item" color="#d4e4ff"></uni-icons>
			</view>
			<view class="my" :style="{backgroundColor:bgColor}">
				<view class="my-pic">
					<uni-icons type="person" size="60" color="white"></uni-icons>
					<uni-icons class="my-pic-upload" type="cloud-upload" size="18" color="#d4e4ff" @click="btnMyPic"></uni-icons>
				</view>
				<view class="my-info">

				</view>
			</view>
		</view>

		<view class="toolbars">
			<view class="toolbars-1">
				<view class="box-bg">
					<uni-nav-bar shadow right-icon="right" title="开启阴影" />
					<uni-nav-bar shadow right-icon="right" title="开启阴影" />
					<uni-nav-bar shadow right-icon="right" title="开启阴影" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgColor: "#2979ff",
				fontColor: "#ffffff", //只能设置白色和黑色
				value:9
			}
		},
		onLoad() {
			uni.setNavigationBarColor({
				backgroundColor: this.bgColor,
				frontColor: this.fontColor
			})
		},
		methods: {
			btnScanCode(){
				uni.scanCode({
					scanType:['qrCode','barCode'],
					success(res) {
						console.log('success',res)
					},
					fail(err) {
						console.log('fail',err)
					}
				})
			},
			btnMyPic(){
				uni.chooseImage({
					extension:['png','jpg'],
					crop:{
						width:100,
						height:100
					},
					success(res) {
						console.log('success',res)
					},
					fail(err) {
						console.log('fail',err)
					}
				})
			}

		}
	}
</script>

<style>
	.my-setting {
		display: flex;
		width: 100%;
		justify-content: flex-end;
	}

	.my-setting .item {
		margin-right: 20upx;
	}

	.my {
		display: flex;
		width: 100%;
		height: 400upx;
		align-items: center;

	}

	.my-pic {
		position: relative;
		display: flex;
		width: 200upx;
		height: 200upx;
		border: 1upx solid white;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		margin: 0 10upx 0 20upx;
		z-index: 5;
	}

	.my-pic-upload {
		position: absolute;
		top: 10upx;
		right: 10upx;
		z-index: 999;
	}

	.my-info {
		height: 200upx;
		flex: 1;
		border: 1upx solid white;
		margin: 0 20upx 0 10upx;

	}

	.toolbars {
		width: 100%;
		height: calc(100vh - 420upx);
		background-color: white;
		border-radius: 40upx 40upx 0 0;
		position: relative;
		z-index: 1;
		top: -40upx;


	}

	.toolbars-1 {
		position: absolute;
		width: 100%;
		padding-top: 20upx;
		top: 20px;
	}

	.box-bg {
		padding: 0 10upx;
	}
</style>