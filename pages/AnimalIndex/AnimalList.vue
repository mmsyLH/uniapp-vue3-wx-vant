<template>
	<view class="cate">
		<!-- 顶部菜单 -->
		<view class="top_cate">
			<scroll-view class="scroll1" scroll-x="true">
				<view class="top-item" v-for="(item,index) in dwMuList" :key="index">
					<text @click="top_menuTab" :data-index="index"
						:class="top_current == index ? 'Active':''">{{item.dw}}</text>
				</view>
			</scroll-view>
		</view>

		<!-- 下部区域 -->
		<view class="main_cate">
			<!-- 左侧菜单 -->
			<scroll-view class="scroll2" scroll-y="true">
				<!-- 				<template v-if="dwKeList.length==0">
					<van-empty description="该目下暂无科数据"></van-empty>
				</template> -->
				<!-- <template v-else> -->
				<view class="top-item" v-for="(item,index) in dwKeList" :key="index">
					<text @click="left_menuTab" :data-index="index" :class="left_current === index ? 'Active2':''">
						{{item.dw}}
					</text>
				</view>
				<!-- </template> -->
			</scroll-view>

			<!-- 右侧菜单 -->
			<scroll-view class="scroll3" scroll-y="true">
				<template v-if="dwKeList.length === 0">
					<!-- 在 dwKeList 为空的情况下展示“该种暂无数据” -->
					<van-empty description="该目暂无数据"></van-empty>
				</template>
				<template v-else>
					<view class="top-item" v-for="(item, index) in dwZhongList" :key="index">
						<template v-if="item && item.dw">
							<image v-if="item.dwtp && item.dwtp !== ''" :src="item.dwtp" width="100px" height="100px"
								@click="todetail(item)"></image>
							{{ item.dw }}
						</template>
					</view>
					<template v-if="dwZhongList.length === 0">
						<!-- 在 dwZhongList 为空的情况下展示“该科暂无数据” -->
						<van-empty description="该科暂无数据"></van-empty>
					</template>
				</template>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	import http from '@/utils/http'
	export default {
		data() {
			return {
				//选择状态
				top_current: 0,
				left_current: 0,
				Animal_order_list: [],
				dwMuList: [],
				dwKeList: [],
				dwZhongList: [],
				dw: "",
				onemu: ""
			}
		},
		async onLoad(query) {
			console.log("query", query)
			var dw = "肠鳃纲ENTEROPNEUSTA";
			//根据传过来的参数来请求动物目
			// this.init(tie)
			// var mu = this.dwMuList[0]
			// this.getKe(mu)
			// console.log(query.name)
			if (query.name != null) {
				this.dw = query.name
			}
			dw = this.dw;
			await this.getMu(dw)
			if (this.dwMuList[0].dw) {
				await this.getKe(this.dwMuList[0].dw)
				await this.getZhong(this.dwKeList[0].dw)
			}
		},
		methods: {
			async top_menuTab(e) {
				var index = e.currentTarget.dataset.index;
				this.top_current = index;
				this.left_current = 0
				if (this.dwMuList[this.top_current].dw) {
					await this.getKe(this.dwMuList[this.top_current].dw)
				}
				if (this.dwKeList[0].dw) {
					await this.getZhong(this.dwKeList[0].dw)
				}

			},
			left_menuTab(e) {
				var index2 = e.currentTarget.dataset.index;
				this.left_current = index2;
				this.getZhong(this.dwKeList[this.left_current].dw)
			},
			async getMu(dw) {
				//xx3/${dw}
				await http(`xx3/${dw}`, {}, {
					method: 'GET'
				}).then(res => {
					console.log("resMu", res)
					const ani = res;
					this.dwMuList = [];
					this.dwMuList = ani.filter(item => {
						// 过滤掉dw为空或者为双尾目的选项的项
						return item.dw !== '' && item.dw !== '双尾目';
					});
					console.log("this.dwMuList", this.dwMuList);
				}).catch(err => {
					console.error("获取目失败", err);
				})
			},
			//获得动物科
			async getKe(dw) { //指的是传过来的动物目的姓名
				if (dw != null) {
					await http(`xx4/${dw}`, {}, {
						method: 'GET'
					}).then(res => {
						const ani = res;
						this.dwKeList = [];
						if (res.length != 0) {
							this.dwKeList = ani.filter(item => item.dw !== ''); // 过滤掉dwtp为空的项
						}
						console.log("this.dwKeList", this.dwKeList)
					}).catch(err => {
						console.error(err);
					})
				}

			},
			//获取动物种
			async getZhong(dw) {
				//xx/${dw}
				await http(`xx/${dw}`, {}, {
					method: 'GET'
				}).then(res => {
					const ani = res;
					this.dwZhongList = ani.filter(item => item.dwtp !== ''); // 过滤掉dwtp为空的项
				}).catch(err => {
					console.error(err);
				})
			},
			//跳转详情页
			todetail(item) {
				var id = item.id
				console.log(id);
				uni.navigateTo({ //携带参数 传递
					url: `/pages/Animaldetails/Animaldetails?id=${id}`,
				});
			}

		}


	}
</script>

<style scoped>
	.cate {
		width: 100%;
		height: 600px;
	}

	.top_cate {
		border-bottom: 1rpx solid gainsboro;
		width: 100%;
		height: 65px;
	}

	.main_cate {
		width: 100%;
		display: flex;
	}

	.scroll1 {
		white-space: nowrap;
	}

	.scroll2 {
		width: 28%;
		height: 100%;
		font-size: 12px;


	}

	.scroll2 view {
		width: 100%;
	}

	.scroll3 {
		margin-left: 30px;
		width: 72%;
		height: 100%;
	}

	.scroll3 view {
		line-height: 110%;
		padding: 0px;
		height: 110px;
		width: 100px;
		flex-direction: column;
		margin-top: 10px;
		margin-left: 10px;
		align-items: center;
		border-radius: 10px;
	}

	.scroll3 view image {
		width: 100px;
		height: 90px;
		border-radius: 10%;
	}

	.top-item {
		width: 20%;
		height: 60px;
		margin-left: 20rpx;
		display: inline-block;
		text-align: center;
		line-height: 60px;
	}

	.Active {
		border-bottom: 3px solid #1296DB;
	}

	.Active2 {
		border-bottom: 3px solid #1296DB;
	}
</style>