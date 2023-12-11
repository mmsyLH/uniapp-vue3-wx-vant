<template>
	<liu-customize-swiper title="识别结果" BgPic="https://cdn.pixabay.com/photo/2020/09/05/19/38/landscape-5547401_1280.png"
		:swiperList="swiperList" @change="checkPic" @checked="checkId"></liu-customize-swiper>
	<view>
		<view v-if="aiResult.length > 0">
			<view v-for="(result, index) in aiResult" :key="index">
				<view>名称：{{ result.name }}</view>
				<view>得分：{{ result.score }}</view>
				<image v-if="result.baike_info && result.baike_info.image_url" :src="result.baike_info.image_url"
					mode="aspectFill"></image>
				<view v-if="result.baike_info && result.baike_info.description">描述：{{ result.baike_info.description }}
				</view>
				<view v-if="result.baike_info && result.baike_info.baike_url">百度百科链接：<a
						:href="result.baike_info.baike_url" target="_blank">查看详情</a></view>
				<view>------------------------------------</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				aiResult: [], // 存储AI识别结果,
				swiperList: [{
					picUrl: 'https://cdn.pixabay.com/photo/2020/05/19/13/32/cartoon-5190837_1280.jpg',
					title: '思考'
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2020/05/19/13/35/cartoon-5190860_1280.jpg',
					title: '雨天'
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',
					title: '兔子'
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',
					title: '日落'
				}]
			};
		},
		onLoad(query) {
			// 获取传递过来的tpurl参数
			console.log("获取到的参数", query)
			this.animalShiBie("http://s4s1fr5or.hn-bkt.clouddn.com/FhfXgcZNFC19VEU620T4puco0Tzf"); // 测试代码
			if (query && query.tpurl) {
				this.animalShiBie(query.tpurl); // 调用AI识别方法
				// this.animalShiBie("http://s4s1fr5or.hn-bkt.clouddn.com/FhfXgcZNFC19VEU620T4puco0Tzf"); // 测试代码
			}
		},
		methods: {
			// AI动物识别方法
			animalShiBie(tpurl) {
				uni.request({
					method: 'GET',
					url: "http://110.41.178.59:8081//ysdw/AI?tpurl=" + tpurl,
					success: (res) => {
						console.log(res)
						// 如果返回了识别结果，则更新 aiResult 数组
						if (res && res.data && res.data.message && res.data.message.result) {
							this.aiResult = res.data.message.result;
						}
					},
					error: (err) => {
						console.error('animalShiBie error', err);
					}
				})
			},
		}
	};
</script>

<style scoped>

</style>