<template >
	<!-- 搜索框 -->
	<view>
		<view @click="goSearch" style="background-color: aqua;">
			<van-search  disabled value="搜索名录" placeholder="请输入搜索关键词"
				shape="round">123</van-search>
				<view>
					<uni-icons type="camera" size="30"></uni-icons>
				</view>
		</view>

	</view>

	<view>
		<van-tabs swipeable :ellipsis="false" title-active-color="#1296DB" @click="onClickAnimailMen">
			<van-tab v-for="(animal, index) in animalsMen" :title="animal.dw" :key="index"></van-tab>
		</van-tabs>
	</view>
	<view style="text-align: center; margin-top: 3%;">
		<image v-if="animalsGang[currentIndex] && animalsGang[currentIndex].dwtp" class="bg-set"
			:src="animalsGang[currentIndex].dwtp"></image>
		<!-- 
		 :current="currentIndex"当前展示的动物索引 
		 :interval="3000"      自动切换时间间隔 
		 :duration="1000"      切换动画时长
		 :circular="true"		是否采用衔接滑动
		 :previousMargin="previous_next"    :nextMargin="previous_next"         指示器与边框的距离
		 -->
		<swiper :current="currentIndex" class="swiper" :duration="1000" :circular="true" :previousMargin="previous_next"
			:nextMargin="previous_next" @change="swiperTab">
			<swiper-item v-for="(animal, index) in animalsGang" :key="index">
				<view>{{ animal.dw}}</view>
				<view class="swiper-item">
					<!-- 条件渲染 -->
					<view v-if="animal.dwtp">
						<view :class="currentIndex === index ? 'current-item' : ''" class="image-container">
							<image :src="animal.dwtp" class="swiper-itemImage"
								:class="currentIndex === index ? 'swiperItemActive' : ''"
								@tap="goToSearchPage(currentIndex)">
							</image>
						</view>
						<view class="animal-info">
							<view class="animal-details">
								<!-- 这里将来可能展示动物个人信息 -->
								<!-- 							<view>{{ animal.name }}</view>
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


</template>

<script>
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
				uni.request({
					url: 'http://110.41.178.59:8081/ysdw/xx1',
					success: (res) => {
						if (res.data.code === 200) {
							// 过滤掉dwtp为空或者值为"没有图片"的项
							this.animalsMen = res.data.message.filter(item => item.dwtp && item.dwtp !==
								"没有图片");
						}
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},
			//获取轮播图的动物纲
			getAnimalGang(animalsGangName) {
				uni.request({
					url: 'http://110.41.178.59:8081/ysdw/xx2/' + animalsGangName,
					success: (res) => {
						if (res.data.code === 200) {
							// 过滤掉dwtp为空或者值为"没有图片"的项
							this.animalsGang = [];
							res.data.message.forEach(item => {
								if (item.dwtp != "没有图片") {
									this.animalsGang.push(item)
								} else {
									console.log(item.dwtp)
								}
							});
							// this.animalsGang = res.data.message.filter(item => item.dwtp && item.dwtp !=="没有图片");
						}
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},
			// 点击图片方法
			goToSearchPage(index) {
				// 根据索引获取对应的门信息
				const gang = this.animalsGang[index].dw;
				console.log("传过来 的index", gang);
				uni.navigateTo({ //携带参数 传递
					url: `/pages/AnimalIndex/AnimalList?name=${gang}`,
				});

			},
			//轮播图
			swiperTab(e) {
				this.currentIndex = e.detail.current;
			},
			//动物门的点击事件
			onClickAnimailMen(event) {
				//选择动物门传递去查询动物纲
				this.getAnimalGang(event.detail.title);
			},
		},
	};
</script>

<style scoped>
	.van-search {
		width: 80%;
	}
	.swiper {
		width: 100%;
		height: 904rpx;
		position: absolute;
	}

	.swiper-item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* 设置当前图片高度 */
	.current-item .swiper-itemImage {
		width: 606rpx;
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
		z-index: -1;
		filter: blur(20rpx);
	}
</style>