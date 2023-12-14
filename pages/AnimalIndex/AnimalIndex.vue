<template>
	<view class="container">
		<!-- 搜索框 -->

		<view class="search-bar">
			<view class="search-input" @tap="goSearch">
				<u-search :show-action="false" placeholder="搜索名录"></u-search>
			</view>

			<u-icon name="camera" size="30" @tap="getImages"></u-icon>
		</view>

		<!-- 标签栏 -->
		<view class="meng-bar">
			<u-tabs :list="tabList" @click="onClickAnimailMen" lineColor="#1296db" :activeStyle="{
				    color: '#1296db',
				    fontWeight: 'bold',
				    transform: 'scale(1.05)'
				}" lineWidth="100">
			</u-tabs>
		</view>
		<u-line></u-line>
		<view class="swiper-container">
			<!-- <view class="bg-set"></view> -->
			<!--             
			 :current="currentIndex"当前展示的动物索引 
			 :interval="3000"      自动切换时间间隔 
			 :duration="1000"      切换动画时长
			 :circular="true"		是否采用衔接滑动
			 :previousMargin="previous_next"    :nextMargin="previous_next"         指示器与边框的距离
			 -->
			<swiper :current="currentIndex" class="swiper" :duration="1000" :circular="true"
				:previousMargin="previous_next" :nextMargin="previous_next" @change="swiperTab">
				<swiper-item v-for="(animal, index) in animalsGang" :key="index">
					<view class="animal-text">{{ animal.dw }}</view>
					<view class="swiper-item">
						<!-- 条件渲染 -->
						<view v-if="animal.dwtp">
							<view @tap="goToSearchPage(index)" :class="currentIndex === index ? 'current-item' : ''"
								class="image-container">
								<image :src="animal.dwtp" class="swiper-itemImage shadow bg-white"
									:class="currentIndex === index ? 'swiperItemActive' : ''"
									:mode="currentIndex === index ? 'aspectFill' : ''">
								</image>
							</view>
							<view class="animal-info">
								<view class="animal-details">
									<!-- 这里将来可能展示动物个人信息 -->
									<!-- <view>{{ animal.name }}</view>
										 <view>{{ animal.protectionLevel }}</view> -->
								</view>
							</view>
						</view>
						<!-- 没图片显示的情况 -->
						<view v-else>
							<van-empty description="暂无图片"></van-empty>
						</view>

					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import { getRequest } from '@/http/index'
	export default {
		data() {
			return {
				currentIndex: 0,
				previous_next: '60rpx', //指示器与边框的距离
				previousHeight: 0,
				//动物门 标签导航栏
				animalsMen: [],
				//动物纲 
				animalsGang: [],
				//默认加载的轮播图
				animalsGangName: "脊索动物门 CHORDATA",
				src: '', // 存储拍照后的临时图片路径
				tpurl: "", //ai识别上传的在线图片路径
				qntoken: '',
				tabList: []
			};
		},


		onLoad() {
			//获取标签导航栏的动物门
			this.getAnimalMen();

			//获取轮播图的动物纲
			this.getAnimalGang(this.animalsGangName);
		},

		methods: {
			goSearch() {
				uni.navigateTo({
					url: '/pages/AnimalIndex/search',
				});
			},
			go2() {
				uni.navigateTo({
					url: '/pages/Animaldetails/Animaldetails',
				});
			},
			//获取轮播图门的信息
			getAnimalMen() {
				getRequest('/ysdw/xx1').then(res => {
					if (res.code === 200) {
						// 过滤掉dwtp为空或者值为"没有图片"的项
						this.animalsMen = res.message.filter(item => item.dwtp && item.dwtp !==
							"没有图片");
						this.animalsMen.forEach(item => {
							this.tabList.push({
								name: item.dw
							});
						})
					}
				}).catch(err => {
					console.error(err);
				});
		
			},
			// 获取动物纲信息
			getAnimalGang(animalsGangName) {
				getRequest(`/ysdw/xx2/${animalsGangName}`)
					.then(res => {
						if (res.code === 200) {
							this.animalsGang = res.message.filter(item => item.dwtp !== "没有图片");
						}
					})
					.catch(err => {
						console.error(err);
					});
			},
			// 点击图片方法
			goToSearchPage(index) {
				//console.log(index);
				// 根据索引获取对应的门信息
				const gang = this.animalsGang[index].dw;
				console.log("传过来 的index", gang);
				if (this.currentIndex === index) {
					uni.navigateTo({ //携带参数 传递
						url: `/pages/AnimalIndex/AnimalList?name=${gang}`,
					});
				}
			},
			//轮播图
			swiperTab(e) {
				this.currentIndex = e.detail.current;
			},
			//动物门的点击事件
			onClickAnimailMen(item) {
				//选择动物门传递去查询动物纲
				this.getAnimalGang(item.name);
			},
			//选择图片上传
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
						console.error("获取七牛云token失败", err)
					}
				})
			},

			//上传文件到七牛云
			uploadFileToQn() {
				console.log("上传文件时七牛云的token", this.qntoken);
				wx.uploadFile({
					url: 'https://upload-z2.qiniup.com',
					filePath: this.src,
					name: 'file',
					method: "POST",
					formData: {
						'token': this.qntoken
					},
					success: (res) => {
						console.log("上传七牛云的res", res)
						let strToObj = JSON.parse(res.data);
						this.tpurl = "http://s4s1fr5or.hn-bkt.clouddn.com/" + strToObj.key;
						this.animalShiBie(this.tpurl);
					},
					fail(err) {
						console.error("上传七牛云失败", err)
					}
				})
			},
			// AI动物识别
			animalShiBieThis() {
				console.log("this.tpurl", this.tpurl)
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
									// uni.showToast({
									// 	title: '相机权限已获取',
									// });
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
			},

		},
	};
</script>

<style scoped>
	.ai {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search-bar {
		display: flex;
		justify-content: space-between;
	}

	.search-input {
		display: flex;
		align-items: center;
		width: 85%;
		margin-right: 16px;
	}

	.search-bar,
	.meng-bar {
		height: 50px;
	}



	.swiper-container {
		display: flex;
		align-items: center;
		height: 80vh;
	}

	.swiper {
		width: 100%;
		height: 904rpx;
		position: absolute;
		/* left: 0; */
	}

	/* 设置当前图片高度 */
	.current-item .swiper-itemImage {
		/* width: 606rpx; */
		height: 836rpx;
		border-radius: 24rpx;
	}

	/* 设置其他图片高度为当前高度的80% */
	.swiper-itemImage {
		width: 606rpx;
		height: 668.8rpx;
		/* 80% of 836rpx */
		border-radius: 24rpx;
	}

	/* 包裹其他图片的容器样式 */
	.image-container {
		width: 606rpx;
		height: 836rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 24rpx;
	}

	/* 设置图片切换动画 */
	.swiper-itemImage {
		transition: height 0.5s ease-in-out;
	}

	/* 图片的条件渲染1 */
	.swiperItemActive {}

	.animal-image-container {
		position: relative;
		width: 606rpx;
		height: 836rpx;
		border-radius: 24rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;
	}

	.animal-info {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin-bottom: 20px;
	}

	.animal-name,
	.animal-protection {
		color: white;
		text-align: right;
		font-size: 18px;
		line-height: 24px;
	}

	.animal-details {
		position: absolute;
		bottom: 40px;
		right: 20px;
		color: white;
		text-align: right;
	}

	.bg-set {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 0;
		/* backdrop-filter: blur(10px); */
		filter: blur(20rpx);
		background-color: rgba(18, 150, 219, 0.5);
	}

	.animal-text {
		font-weight: bold;
		text-align: center;
		margin-bottom: 8px;
	}
</style>