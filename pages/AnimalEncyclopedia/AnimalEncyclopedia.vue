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
				pages: 141, //总页数,
			}
		},
		onLoad() {
			// 请求第一页数据
			this.getAnimals();
		},
		methods: {
			getAnimals() {
				uni.request({
					url: 'http://110.41.178.59:8081/ysdw/all?pages=1&pagesize=10',
					success: (res) => {
						if (res.data.code === 200) {
							this.records = res.data.message.records;
							// 这一句代码不能重写，不然有可能出bug!!!!!!!!!!!!!!!!!!!!
							this.records.forEach(i => i.tags = [i.dwjb].concat(i.dwclass.split(' ')));
							// this.records.forEach(i => i.tags = (i.dwjb ? [i.dwjb] : ["其他"]).concat(i.dwclass.split(' ')));
							this.records.forEach(i => i.name = i.dw + (i.dwxm && ` (${i.dwxm})`));
							console.log(this.records);
						}
					},
					fail: (err) => {
						console.log(err);
					}
				});
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