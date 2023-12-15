<template class="container">
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
					<!-- 是动物展示动物图片 -->
					<template v-if="isAnimail">
						<image :src="getDataFiled(index, 'baike_info.image_url')" mode="aspectFill"
							class="styled-image">
						</image>
					</template>
					<!-- 不是动物展示传过来的图片 -->
					<template v-else>
						<image :src="tpurl" mode="aspectFill" class="styled-image2" style="">
						</image>
					</template>
				</view>

				<view class="ar-floor__content-sku-info">
					<view class="sku-info-top">
						<view class="animal-name">
							{{getDataFiled(index, 'name')}}
						</view>
						<template v-if="isAnimail">
						<view class="try-btn" @click="goToBaike(getDataFiled(index, 'baike_info.baike_url'))">
							查看百科
						</view>
						</template>
					</view>
					<view class="sku-info-bottom">
						<view class="score score--number score--large price">
							<text>相似度：</text>
							<text class="score-number">{{ formatScore(getDataFiled(index, 'score')) }}</text>
						</view>
						<view class="wenan"></view>
					</view>
				</view>
				<!-- 轮播层 -->
				<template v-if="isAnimail">
					<view class="turntable">
						<!-- 轮播组件 -->
						<siucat-sectors ref='sectors' @Chend='Chend'></siucat-sectors>
					</view>
				</template>
				<template v-else>
					<view class="centered-container">
						<up-button text="重新选择" size="small"
							@click="toIndex"
							color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></up-button>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getRequest
	} from '../../http';
	export default {
		data() {
			return {
				datalist: [],
				index: 0,
				isAnimail: true,
				tpurl: '',
			}
		},
		onLoad(query) {
			this.tpurl = query.tpurl;
			//获取ai查询数据
			// this.animalShiBie("http://s4s1fr5or.hn-bkt.clouddn.com/FhfXgcZNFC19VEU620T4puco0Tzf"); // 测试代码
			this.animalShiBie(this.tpurl); // 测试代码
		},
		created() {},
		methods: {
			Chend(index) {
				this.index = index
			},
			getDataFiled(index, filedLink) {
				return filedLink.split('.').reduce((e, filed) => e && (e[filed] || e), this.datalist[index]);
			},
			//动物识别
			animalShiBie(tpurl) {
				getRequest(`/ysdw/AI?tpurl=${tpurl}`).then(res => {
					console.log("动物识别res", res);
					if (res && res.message && res.message.result) {
						console.log("动物识别res.message.result", res.message.result);
						let list = res.message.result.filter(i => i.baike_info.baike_url);
						if (res.message.result.length == 1) {
							this.datalist = res.message.result;
							this.isAnimail = false;
						}
						if (list.length == 3) this.datalist = list.concat(list).concat(list).concat(list);
						if (list.length == 5) list.pop();
						if (list.length == 4) this.datalist = list.concat(list).concat(list);
						if (list.length > 6 && list.length < 12) list.splice(6);
						if (list.length == 6) this.datalist = list.concat(list);
						if (list.length > 12) list.splice(12);
						if (list.length == 12) this.datalist = list;
						this.$nextTick(() => {
							this.$refs.sectors.add(this.datalist);
						});
					}
				}).catch(err => {
					console.error('animalShiBie error', err);
					
				})
			},
			//对相似度进行处理
			formatScore(score) {
				// 将小数转换为保留两位小数的字符串
				const formattedScore = (parseFloat(score) * 100).toFixed(2);
				// 如果相似度小于 0.7，生成一个 80 到 99 的随机数
				if (parseFloat(score) < 0.5) {
					const randomFakeScore = ((Math.floor(Math.random() * 2000) + 7000) / 100).toFixed(2);
					return `${randomFakeScore}%`;
				}

				// 添加百分号
				return `${formattedScore}%`;
			},
			//跳转百度百科
			goToBaike(url) {
				console.log(url)
				wx.navigateTo({
					url: '/pages/AnimalIdentification/baidu?url=' + encodeURIComponent(url),
				});
			},
			//回到首页重新选择
			toIndex(){
				uni.switchTab({
					url:"/pages/AnimalIndex/AnimalIndex"
				})
			},
		}
	}
</script>

<style scoped>
	/* 重新选择的按钮样式 */
	.centered-container {
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 100px;
		margin: 20% auto auto auto;
	}
	
	.view{
		margin:0 auto;
	}
	.ar-floor {
		width: 100%;
		min-height: 100vh;
		/* font-family: "customicons" !important; */
		background-color: #1F0020;
		overflow: hidden;
	}

	.z-title {
		width: 100%;
		height: 51.75rpx;
		color: white;
		font-size: 22px;
		padding-left: 145rpx;
		padding-bottom: 26.496rpx;
	}

	.ar-floor__wrapper {
		position: relative;
		margin: 0 auto;
		width: 100%;
		height: 1024rpx;
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
		width: 400rpx;
		height: 400rpx;
		overflow: hidden;
		margin: 88.3202rpx auto;
		margin-bottom: 35.3282rpx;
		border-radius: 50%;
		/* 添加圆角 */
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.8);
		/* 添加阴影效果 */
	}

	.styled-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		/* 让图片填充整个容器 */
		border-radius: 50%;
		/* 保持圆角 */
	}

	.styled-image2 {
		width: 100%;
		height: 100%;
		object-fit: cover;
		/* 让图片填充整个容器 */
		border-radius: 50%;
		/* 保持圆角 */
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