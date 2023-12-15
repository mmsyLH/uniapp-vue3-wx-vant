<template>
	<view class="container">
		<view class="t-goods-list" v-if="animalList && animalList.length > 0">
			<view class="t-goods-item shadow bg-white" v-for="(animal, index) in animalList" :key="index"
				@click="clickAnimal(animal)">
				<image class="t-goods-img" mode="aspectFill" :src="animal.dwtp"></image>
				<view class="t-goods-name"><text>{{ animal.dw }}</text></view>
				<view class="t-goods-desc"><text>{{ animal.dwjj }}</text></view>
			</view>
		</view>
		<view class="t-empty" v-else-if="isInit">
			<image src="/static/goods.png"></image>
			<view class="t-empty-desc">没有动物哦~</view>
		</view>
		<view class="t-loading-more" v-if="isLoading || isNoMore && animalList && animalList.length > 0">
			<image src="../../static/loading.png" v-if="isLoading"></image>
			<view class="t-loading-desc" v-if="isLoading || isNoMore">
				{{ isLoading ? '加载中...' : (isNoMore ? '没有更多数据了' : '') }}
			</view>
		</view>
		<up-back-top :scroll-top="scrollTop"></up-back-top>
	</view>
</template>

<script>
	import {
		getRequest
	} from '../../http';
	export default {
		data() {
			return {
				//动物列表
				animalList: [],
				//页码，从1开始
				pageNo: 1,
				//每页数据
				pageSize: 10,
				//是否没有更多数据了
				isNoMore: false,
				//是否加载中
				isLoading: false,
				//是否初始化完成
				isInit: false,
				scrollTop: 0, //返回顶部
			}
		},
		onLoad(query) {
			console.log("传递的参数：", query);
			//去请求服务器获取动物列表数据
			this.isLoading = true;
			// 请求第一页数据
			this.animalFuzzyQuery(query.name); // 可以传递参数来模糊查询动物信息
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		//页面滑动到底部监听
		onReachBottom() {
			//后端接口数据有限，直接显示没有更多数据了
			this.isNoMore = true;
		},
		methods: {
			// 获取动物信息
			animalFuzzyQuery(animalName) {
				this.isLoading = true;
				getRequest(`/ysdw/cx/${animalName}`).then(res => {
					if (res.code === 200) {
						// 过滤掉dwtp为空或者值为"没有图片"的项
						const filteredAnimals = res.message.filter(item => item.dwtp && item.dwtp !==
							"");
						console.log("filteredAnimals", filteredAnimals)
						if (this.pageNo === 1) {
							// 如果是第一页数据，则直接赋值
							this.animalList = filteredAnimals;
						} else {
							// 否则追加数据
							this.animalList = [...this.animalList, ...filteredAnimals];
						}
						this.isLoading = false;
						if (filteredAnimals.length < this.pageSize) {
							this.isNoMore = true;
						}
					}
				}).catch(err => {
					console.error(err);
				})
			},
			// 页面滑动到底部监听--刷新下一页
			onReachBottom() {
				if (this.isNoMore || this.isLoading) {
					return;
				}
				this.pageNo += 1;
				// 模拟加载下一页数据
				this.animalFuzzyQuery('');
			},
			// 点击动物
			clickAnimal(animal) {
				uni.navigateTo({
					url: "/pages/Animaldetails/Animaldetails?id=" + animal.id,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.t-goods-list {
		// padding-top: 18rpx;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		// align-items: center;
		flex-wrap: wrap;
		padding-top: 8px;

		.t-goods-item {
			box-sizing: border-box;
			width: 336rpx;
			background-color: #ffffff;
			border-radius: 20px;
			overflow: hidden;
			margin-bottom: 16px;
			position: relative;

			.t-goods-img {
				height: 340rpx;
			}

			.t-goods-name {
				font-size: 30rpx;
				color: #000000;
				-webkit-line-clamp: 2;
				display: -webkit-box;
				text-overflow: ellipsis;
				overflow: hidden;
				-webkit-box-orient: vertical;
				padding: 0 12px;
				box-sizing: border-box;
				word-break: break-all;
				font-weight: bold;
			}

			.t-goods-desc {
				// height: 80px;
				font-size: 28rpx;
				color: #9e9e9e;
				// line-height: 26rpx;
				-webkit-line-clamp: 5;
				display: -webkit-box;
				text-overflow: ellipsis;
				overflow: hidden;
				-webkit-box-orient: vertical;
				padding: 2px 12px;
				box-sizing: border-box;
				margin-top: 16rpx;
				word-break: break-all;
			}


		}
	}


	.t-empty {
		width: 100%;
		height: 100%;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 320rpx;
			height: 320rpx;
		}

		.t-empty-desc {
			padding-bottom: 30rpx;
			padding-top: 20rpx;
			font-size: 28rpx;
			color: #999999;
		}
	}

	.t-loading-more {
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 60rpx;

		image {
			width: 36rpx;
			height: 36rpx;
			-webkit-animation: spin 1s 0s step-end infinite;
			animation: spin 1s 0s step-end infinite;
			margin-right: 12rpx;
		}

		.t-loading-desc {
			font-size: 28rpx;
			color: #999999;
		}

		@-webkit-keyframes spin {
			0% {
				-webkit-transform: rotate(0deg);
				transform: rotate(0deg);
			}

			8% {
				-webkit-transform: rotate(30deg);
				transform: rotate(30deg);
			}

			16% {
				-webkit-transform: rotate(60deg);
				transform: rotate(60deg);
			}

			24% {
				-webkit-transform: rotate(90deg);
				transform: rotate(90deg);
			}

			32% {
				-webkit-transform: rotate(120deg);
				transform: rotate(120deg);
			}

			40% {
				-webkit-transform: rotate(150deg);
				transform: rotate(150deg);
			}

			48% {
				-webkit-transform: rotate(180deg);
				transform: rotate(180deg);
			}

			56% {
				-webkit-transform: rotate(210deg);
				transform: rotate(210deg);
			}

			64% {
				-webkit-transform: rotate(240deg);
				transform: rotate(240deg);
			}

			73% {
				-webkit-transform: rotate(270deg);
				transform: rotate(270deg);
			}

			82% {
				-webkit-transform: rotate(300deg);
				transform: rotate(300deg);
			}

			91% {
				-webkit-transform: rotate(330deg);
				transform: rotate(330deg);
			}

			100% {
				-webkit-transform: rotate(1turn);
				transform: rotate(1turn);
			}

		}

		@keyframes spin {
			0% {
				-webkit-transform: rotate(0deg);
				transform: rotate(0deg);
			}

			8% {
				-webkit-transform: rotate(30deg);
				transform: rotate(30deg);
			}

			16% {
				-webkit-transform: rotate(60deg);
				transform: rotate(60deg);
			}

			24% {
				-webkit-transform: rotate(90deg);
				transform: rotate(90deg);
			}

			32% {
				-webkit-transform: rotate(120deg);
				transform: rotate(120deg);
			}

			40% {
				-webkit-transform: rotate(150deg);
				transform: rotate(150deg);
			}

			48% {
				-webkit-transform: rotate(180deg);
				transform: rotate(180deg);
			}

			56% {
				-webkit-transform: rotate(210deg);
				transform: rotate(210deg);
			}

			64% {
				-webkit-transform: rotate(240deg);
				transform: rotate(240deg);
			}

			73% {
				-webkit-transform: rotate(270deg);
				transform: rotate(270deg);
			}

			82% {
				-webkit-transform: rotate(300deg);
				transform: rotate(300deg);
			}

			91% {
				-webkit-transform: rotate(330deg);
				transform: rotate(330deg);
			}

			100% {
				-webkit-transform: rotate(1turn);
				transform: rotate(1turn);
			}
		}
	}
</style>