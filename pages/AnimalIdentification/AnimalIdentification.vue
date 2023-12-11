<template>
	<view>
		<!-- <button @tap="checkCameraPermission">获取相机权限</button> -->
		<button @tap="getImages">获取图片相册/拍照</button>

		<view class="preview-tips">预览</view>
		<button @tap="animalShiBieThis()" v-if="tpurl!=''">确认上传</button>
		<image v-if="src" mode="widthFix" :src="src"></image>
		<!-- 显示用户信息 -->
		<view v-if="userInfo.id">
			<view>用户ID：{{ userInfo.id }}</view>
			<view>用户OpenID：{{ userInfo.openid }}</view>
			<view>用户Token：{{ userInfo.token }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}, // 存储用户信息
				src: '', // 存储拍照后的临时图片路径
				tpurl: "", //ai识别上传的在线图片路径
				qntoken: '',
				aiResult: [] // 存储AI识别结果
			};
		},
		onLoad() {
			// 页面加载时的逻辑
			this.checkCameraPermission();
		},
		methods: {
			//获取图片方式
			getImages() {
				wx.showActionSheet({
					itemList: ['从手机相册选择', '拍照'],
					success: (res) => {
						if (res.tapIndex === 0) {
							console.log("选择了相册")
							// 从手机相册选择照片
							wx.chooseImage({
								count: 1,
								sourceType: ['album'],
								success: (res) => {
									console.log("选择相册的结果:", res)
									this.src = res.tempFilePaths[0];
									console.log(JSON.stringify(res.tempFilePaths));
									//上传文件
									this.getqntoken();

								},
								fail: (err) => {
									console.error('chooseImage fail', err);
								}
							});
						} else if (res.tapIndex === 1) {
							// 拍照
							wx.chooseImage({
								count: 1,
								sourceType: ['camera'],
								success: (res) => {
									console.log("选择相册的结果:", res)
									this.src = res.tempFilePaths[0];
									console.log(JSON.stringify(res.tempFilePaths));
									//获取七牛云token
									this.getqntoken();


								},
								fail: (err) => {
									console.error('chooseImage fail', err);
								}
							});
						}
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				});
			},
			//获取七牛云token
			getqntoken() {
				console.log("正在获取七牛云token")
				uni.request({
					url: 'http://110.41.178.59:8080/user/getqntoken',
					method: "GET",
					success: (res) => {
						if (res.data.code === 0) {
							this.qntoken = res.data.message;
							//上传到七牛云
							this.uploadFileToQn();
						}

					},
					fail(err) {
						console.log("获取七牛云token失败", err)
					}
				})
			},

			//上传文件到七牛云
			uploadFileToQn() {
				console.log("上传文件时七牛云的token",	this.qntoken);
				wx.uploadFile({
					url: 'https://upload-z2.qiniup.com', 
					filePath: this.src,
					name: 'file',
					method:"POST",
					formData: {
						'token': this.qntoken
					},
					success: (res) => {
						console.log("上传七牛云的res",res)
						let strToObj=JSON.parse(res.data);
						this.tpurl="http://s4s1fr5or.hn-bkt.clouddn.com/"+strToObj.key;
						this.animalShiBie(this.tpurl);
					},
					fail(err) {
						console.log("上传七牛云失败", err)
					}
				})
			},

			//上传文件到本地后端 本机调试
			uploadFile() {
				wx.uploadFile({
					url: 'http://localhost:8080//admin/common/upload', //仅为示例，非真实的接口地址
					filePath: this.src,
					name: 'file',
					formData: {
						'user': this.src
					},
					success: (res) => {
						const responseData = JSON.parse(res.data); // 解析返回的 JSON 数据
						console.log("文件上传的结果res.data.code", responseData.code);
						if (responseData.code === 1) {
							console.log("文件上传成功")
							this.tpurl = responseData.data;
							this.animalShiBie(responseData.data);
						}
					},
					fail(err) {
						console.log("失败", err)
					}
				})
			},
			// AI动物识别
			animalShiBieThis(){
				console.log("this.tpurl",this.tpurl)
				this.animalShiBie(this.tpurl);
			},
			// AI动物识别 方法重载
			animalShiBie(tpurl) {
				// 在上传成功后进行页面跳转到 aiAnimalResult.vue，并携带 tpurl 参数
				uni.navigateTo({
					url: '/pages/AnimalIdentification/aiAnimalResult?tpurl=' + tpurl,
					success: () => {
						console.log('跳转成功');
					},
					fail: (err) => {
						console.error('跳转失败', err);
					}
				});
			},
			//获取相机权限
			checkCameraPermission() {
				uni.getSetting({
					success: (res) => {
						if (res.authSetting['scope.camera']) {
							uni.showToast({
								title: '相机权限已获取',
							});
						} else {
							uni.authorize({
								scope: 'scope.camera',
								success() {
									uni.showToast({
										title: '相机权限已获取',
									});
								},
								fail() {
									uni.showModal({
										title: '授权提示',
										content: '请前往设置页打开摄像头',
										success: (tipRes) => {
											if (tipRes.confirm) {
												uni.openSetting();
											}
										}
									});
								}
							});
						}
					}
				});
			}
		},

	};
</script>

<style scoped>
	.preview-tips {
		width: 300rpx;
		height: auto;
	}
</style>