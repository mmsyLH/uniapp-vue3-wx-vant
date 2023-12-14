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
				<block v-for="(item,i) in records" :key="i">
					<list :item="item"></list>
					<u-line color="#1296db"></u-line>
				</block>
			</view>
			<!-- 网格 -->
			<view class="index-grid" v-if="!isList">
				<block v-for="(item,i) in records" :key="i">
					<grid :item="item"></grid>
				</block>
			</view>
		</view>
	</view>
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
				isList: 1,
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
				pages: 1, //总页数,
				pagesize: 10, //一页显示的页数
			}
		},
		onLoad() {
			// 请求第一页数据
			this.getAnimals();
		},
		//页面滑动到底部监听
		onReachBottom() {
			console.log("滑动到底了");
			console.log("this.isLoading", this.isLoading);
			console.log("this.isNoMore", this.isNoMore);
			if (!this.isLoading && !this.isNoMore) { // 如果不在加载中且还有更多数据
				this.isLoading = true; // 设置加载状态为true
				// 模拟加载下一页数据
				this.pages++; // 增加页码
				this.getAnimals(); // 请求下一页数据
				// 实际上，这里应该是异步请求数据的操作，请求成功后isLoading应该设置为false
				// 这里的示例只是模拟请求
				setTimeout(() => {
					this.isLoading = false; // 模拟加载完成后将isLoading设置为false
					// 假设没有更多数据了
					if (this.records.length >= this.total) {
						this.isNoMore = true;
					}
				}, 1000);
			}
		},
		methods: {
			//获取动物数据
			getAnimals() {
				const url = `/ysdw/all?pages=${this.pages}&pagesize=${this.pagesize}`;
				getRequest(url).then(res=>{
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
				}).catch(err=>{
					console.error(err)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.index-list {
		width: 100%;
	}

	.index-grid {
		width: 100%;
		box-sizing: border-box;
	}

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