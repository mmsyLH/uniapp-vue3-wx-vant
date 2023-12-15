<template>

	<view class="container">
		<!-- https://gitee.com/flexming/dcloud_animals_list.git -->
		<view class="index-title">
			<text text="热门推荐" bold="true" block="false" size="18">热门推荐</text>
			<u-icon v-if="!isList" name="list" :size="30" @tap="isList=!isList"></u-icon>
			<u-icon v-else name="grid" :size="30" @tap="isList=!isList"></u-icon>
		</view>
		<view class="index-list">
			<!-- 列表 -->
			<view class="index-list" v-if="isList">
				<template v-for="(item,i) in records" :key="i">
					<template v-if="item.dwtp!=''">
						<view @click="toDetail(item.id)">
							<list :item="item"></list>
							<u-line color="#1296db"></u-line>
						</view>
					</template>
				</template>
			</view>
			<!-- 网格 -->
			<!-- 			<view class="index-grid" v-if="!isList">
					<view v-for="(item, i) in records" :key="i" @click="toDetail(item.id)" class="index-grid">
						<grid :item="item"></grid>
					</view>
			</view> -->
			<!-- 网格2 -->
			<view class="index-grid" v-if="!isList">
				<template v-for="(item, i) in records" :key="i">
					<template v-if="item.dwtp!=''">
						<grid :item="item"></grid>
					</template>
				</template>
			</view>
		</view>
	</view>
	<view class="toTop" @click="toTop" v-if="scrollTop">
		<u-icon name="arrow-upward" color="#2979ff" size="28"></u-icon>
	</view>
	<!-- <up-back-top :scroll-top="scrollTop"></up-back-top> -->
</template>

<script>
	import {
		getRequest
	} from '@/http/index'
	import grid from "./grid.vue"
	import list from "./list.vue"
	export default {
		components: {
			grid,
			list
		},
		data() {
			return {
				isList: 0,
				records: [], //动物数组
				total: 1409, //总数量
				size: 10, //本页数量
				current: 1, //当前页
				orders: [],
				optimizeCountSql: true,
				hitCount: false,
				searchCount: true,

				//是否没有更多数据了
				isNoMore: false,
				//是否加载中
				isLoading: false,
				//是否初始化完成
				isInit: false,
				pages: 2, //总页数,
				pagesize: 10, //一页显示的页数
				scrollTop: false, //返回顶部
				
			}
		},
		onLoad() {
			// 请求第一页数据
			this.getAnimals();
		},
		//监听页面滚动
		// onPageScroll(e) {
		// 	// console.log(e)
		// 	// 只有当页面滚动时才更新 scrollTop
		// 	if (!this.isLoading) {
		// 		console.log(this.scrollTop);
		// 		// 使用节流，每隔一段时间（比如100毫秒）更新一次数据
		// 		this.scrollTimer = setTimeout(() => {
		// 			this.scrollTop = e.scrollTop;
		// 			if (this.scrollTimer) clearTimeout(this.scrollTimer);
		// 			// 触发加载数据的方法
		// 			// this.getAnimals();
		// 			// 选择了用页面滑动到底去更新数据
		// 		}, 800);
		// 	}
		// },
		//页面滑动到底部监听
		onReachBottom() {
			this.scrollTop=true
			console.log("滑动到底了");
			console.log("this.isLoading", this.isLoading);
			console.log("this.isNoMore", this.isNoMore);
			if (!this.isLoading && !this.isNoMore) { // 如果不在加载中且还有更多数据
				this.isLoading = true; // 设置加载状态为true
				// 模拟加载下一页数据
				this.pages++; // 增加页码
				this.getAnimals(); // 请求下一页数据
				setTimeout(() => {
					this.isLoading = false; // 模拟加载完成后将isLoading设置为false
					// 假设没有更多数据了
					if (this.records.length >= this.total) {
						this.isNoMore = true;
					}
				}, 300);
			}
		},
		methods: {
			//获取动物数据
			getAnimals() {
				this.isLoading = true;
				const url = `/ysdw/all?pages=${this.pages}&pagesize=${this.pagesize}`;
				getRequest(url).then(res => {
					console.log(res)
					if (res.code === 200) {
						const newRecords = res.message.records;
						newRecords.forEach(i => {
							i.tags = [i.dwjb].concat(i.dwclass.split(' '));
							i.name = i.dw + (i.dwxm && ` (${i.dwxm})`);
						});

						if (this.pageNo === 1) {
							// 如果是第一页数据，则直接赋值
							this.records = newRecords;
						} else {
							// 否则追加数据
							this.records = [...this.records, ...newRecords]; // 追加新数据到records数组
						}
						if (newRecords.length < this.pageSize) {
							this.isNoMore = true;
						}
					}
					this.isLoading = false;
				}).catch(err => {
					console.error(err)
				})
			},
			//跳转到详情页
			toDetail(id) {
				uni.navigateTo({
					url: "/pages/Animaldetails/Animaldetails?id=" + id,
				})
			},
			//回到顶部
			toTop() {
				uni.pageScrollTo({
					scrollTop: 0, // 将页面滚动到顶部
					duration: 300, // 可选：滚动到顶部的持续时间，单位为毫秒
					
				});
				this.scrollTop=false;
				console.log("this.scrollTop",this.scrollTop)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.toTop {
		position: fixed;
		/* 让图标固定在屏幕上 */
		bottom: 20px;
		/* 距离屏幕底部的距离 */
		right: 20px;
		/* 距离屏幕右侧的距离 */
		z-index: 999;
		/* 确保图标在最上层 */
	}

	.wrap {
		// height: 200vh;
	}

	.index-list {
		width: 100%;
	}

	.index-grid {
		width: 100%;
		box-sizing: border-box;
		// display: flex;
		// flex-wrap: wrap; /* 允许子项换行显示 */
		// justify-content: space-between; /* 子项两端对齐，实现每行两个元素 */
	}

	/* 控制网格子项的宽度 */
	// .gridView {
	// 	// width: 50%;
	// 	// width: calc(50% - 10px); /* 让每个网格子项占据一行的一半，减去间隔的宽度 */
	// 	// margin-bottom: 10px; /* 设置子项之间的垂直间距 */
	// }

	.index-title {
		display: flex;
		justify-content: space-between;

		text {
			position: relative;
			font-size: 32rpx;
			font-weight: 700;
			padding-left: 20rpx;
			box-sizing: border-box;
		}

		text::after {
			content: '';
			width: 8rpx;
			height: 30rpx;
			position: absolute;
			left: 0;
			top: 8rpx;
			background-color: #333;
		}

		image {
			width: 35rpx;
			height: 35rpx;
		}
	}
</style>