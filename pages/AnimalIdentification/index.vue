<template>
	<view class="ar-floor view">
		<div class="z-title">《《动物识别结果》》</div>
		<view class="ar-floor__wrapper">
			<!-- 背景层 -->
			<view class="color ar-colorful-bg">
				<view class="color__content"></view>
				<view class="color-radius1" style="animation-play-state: running;"></view>
				<view class="color-radius2" style="animation-play-state: running;"></view>
				<view class="color__mask"></view>
			</view>
			<!-- 描述详情层 -->
			<view class="ar-floor__content">
				<view class="ar-floor__content-sku-img">
					<image :src="datalist[index].baike_info.image_url" mode="heightFix"></image>
				</view>
				<view class="ar-floor__content-sku-info">
					<view class="sku-info-top">
						<view class="animal-name">
							{{datalist[index].name}}
						</view>
						<view class="try-btn" @click="goToBaike(datalist[index].baike_info.baike_url)">
							查看百科
						</view>
					</view>
					<view class="sku-info-bottom">
						<view class="score score--number score--large price">
							<text>相似度：</text>
							<text class="score-number">{{datalist[index].score}}</text>
						</view>
						<view class="wenan"></view>
					</view>
				</view>
				<!-- 轮播层 -->
				<view class="turntable">
					<!-- 轮播组件 -->
					<siucat-sectors ref='sectors' @Chend='Chend'></siucat-sectors>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datalist: [{
						image: "https://m.360buyimg.com/mobile/s300x300_jfs/t1/170948/25/3671/756019/600924e7E6e895689/30c25b9f688cd686.png!q80.png",
						price: "51.18",
						name: "爱死坤坤了❤124",
					},
					{
						"image": "//m.360buyimg.com/babel/jfs/t19072/106/897521151/792959/d15657af/5aaf7d21N0b0efbed.png",
						"name": "佳洁士牙膏美白热感美白去烟渍淡黄淡化牙垢美国配方超值装+热感便携装共544g(北美设计)(新老包装,随机发货)",
						"price": "119.8"
					}
				],
				index: 0,
			}
		},
		onLoad(query) {
			//获取ai查询数据
			this.animalShiBie("http://s4s1fr5or.hn-bkt.clouddn.com/FhfXgcZNFC19VEU620T4puco0Tzf"); // 测试代码
		},
		created() {},
		methods: {
			Chend(index) {
				this.index = index
			},
			//动物识别
			animalShiBie(tpurl) {
				uni.request({
					method: 'GET',
					url: "http://110.41.178.59:8081//ysdw/AI?tpurl=" + tpurl,
					success: (res) => {
						// 如果返回了识别结果，则更新 aiResult 数组
						if (res && res.data && res.data.message && res.data.message.result) {
							this.aiResult = res.data.message.result;
							this.datalist = res.data.message.result;
							this.$nextTick(() => this.$refs.sectors.add(this.datalist));
						}
					},
					error: (err) => {
						console.error('animalShiBie error', err);
					}
				})
			},
			//跳转百度百科
			goToBaike(url) {
				console.log(url)
				wx.navigateTo({
					url: '/pages/AnimalIdentification/baidu?url=' + encodeURIComponent(url),
				});
			},
		}
	}
</script>

<style scoped>

	.ar-floor {
		width: 100%;
		min-height: 100vh;
		/* font-family: "customicons" !important; */
		background-color: #1F0020;
	}

	.z-title {
		width: 100%;
		height: 51.75rpx;
		color: white;
		font-family: Arial, sans-serif;
		font-size: 22px;
		padding-left: 145rpx;
		padding-bottom: 26.496rpx;
		padding-top: 50.7838rpx;
	}

	.ar-floor__wrapper {
		position: relative;
		margin: 0 auto;
		width: 100%;
		height: 928rpx;
		overflow: hidden;
	}

	.ar-floor .ar-colorful-bg {
		margin: 0 auto;
		width: 90%;
		height: 100%;
		border-radius: 13.248rpx;
		overflow: hidden;
		transform: translateZ(0);
		position: relative;
		background-color: #6236cd;
	}

	.color__content {
		width: 100%;
		height: 100%;
		background: radial-gradient(circle 30rem at top left, #bffba3, transparent 50%), radial-gradient(circle 30rem at top right, #2fced5, transparent 50%), radial-gradient(circle 40rem at bottom left, #7241c4, transparent 50%);
		animation: hue 10s linear infinite;
	}

	.color-radius1 {
		width: 300%;
		height: 300%;
		position: absolute;
		top: -150%;
		left: -150%;
		opacity: .5;
		background: radial-gradient(circle 30rem at top left, #bffba3, transparent 50%), radial-gradient(circle 30rem at top right, #2fced5, transparent 50%), radial-gradient(circle 40rem at bottom left, #7241c4, transparent 50%);
		animation: rotate 10s linear infinite;
		animation-play-state: paused;
	}

	.color-radius2 {
		width: 300%;
		height: 300%;
		position: absolute;
		top: -150%;
		left: -150%;
		opacity: .8;
		background: radial-gradient(circle 50rem at top left, #bffba3, transparent 50%), radial-gradient(circle 50rem at top right, #7241c4, transparent 50%), radial-gradient(circle 40rem at bottom left, #2fced5, transparent 50%);
		animation: rotate 10s linear infinite reverse;
		animation-play-state: paused;
	}

	.color__mask {
		width: 100%;
		height: 100%;
		background: url(//m.360buyimg.com/babel/jfs/t1/177943/35/6821/338594/60b50503Ebc4501d6/b6026d01b3d81b06.png);
		background-size: 100%;
		opacity: .2;
		z-index: 10;
		position: absolute;
		left: 0;
		top: 0;
	}

	@keyframes hue {
		0% {
			filter: hue-rotate(0deg);
		}

		100% {
			filter: hue-rotate(360deg);
		}
	}

	@keyframes rotate {
		0% {
			transform: rotate(0);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.ar-floor__content {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: 99;
	}

	.ar-floor__content-sku-img {
		width: 300rpx;
		height: 300rpx;
		overflow: hidden;
		margin: 88.3202rpx auto;
		margin-bottom: 35.3282rpx;
	}

	.ar-floor__content-sku-img>image {
		height: 100%;
	}

	.ar-floor__content-sku-info {
		position: relative;
		margin: 0 66.24rpx;
		padding-bottom: 23.184rpx;
		display: flex;
		flex-direction: column;
		border-bottom: 1rpx solid rgba(230, 230, 230, .5);
		color: #FFFFFF;
	}

	.sku-info-top,
	.sku-info-bottom {
		display: flex;
		justify-content: space-between;

	}

	.sku-info-top>.animal-name {
		font-size: 50rpx;
	}

	.sku-info-top>.try-btn {
		margin-left: 30rpx;
		flex-shrink: 0;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		width: 172.2188rpx;
		height: 64.0312rpx;
		line-height: 59.12rpx;
		font-size: 33.12rpx;
		border-radius: 200rpx;
	}

	.sku-info-bottom>.score {
		padding: 0;
		font-size: 30rpx;
		line-height: 1;
	}

	.sku-info-bottom>.score {
		font-size: 30.9092rpx;
	}

	.sku-info-bottom>.score>.score-number {
		font-size: 40rpx;
	}

	.wenan {
		width: 167.7812rpx;
		height: 9.90624rpx;
		color: #fff;
		background-size: 100%;
		margin-top: 37rpx;
	}

	.turntable {
		position: relative;
		width: 100%;
		overflow: hidden;
		/* height: 1000rpx; */
	}
</style>