<template>
	<view class="container" :style="{backgroundImage: 'url(' + animal.dwtp + ')'}">
		<view class="detai_box">
			<view class="ani-title">
				<p>{{animal.dw}}{{animal.dwxm}}</p>
				<p v-if="animal.dwjb">国家{{animal.dwjb}}保护动物</p>
				<p>{{animal.dwtype}}</p>
			</view>
			<view class="box_context">
				<text>{{animal.dwjj}}</text>
			</view>
			<button>纠错</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				animal: '',
			}
		},
		onLoad(query) {
			console.log(query.id)
			// var id = '981';   //这个数据有问题
			//根据id查询动物详情
			this.getAnimalDetailsById(query.id);
		},

		methods: {
			// 获取动物信息
			getAnimalDetailsById(id) {
				uni.request({
					url: `http://110.41.178.59:8081/ysdw/dwid/${id}`,
					success: (res) => {
						console.log(res);
						this.animal = res.data.message;
						console.log(JSON.stringify(this.animal))
					},
					fail: (err) => {
						console.log(err);
						this.isLoading = false;
					}
				});
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		width: 100%;
		background-size: 100% 250px;
		background-repeat: no-repeat;
	}

	.detai_box {
		width: 100%;
		height: 750rpx;
		/* margin-top: 200px; */
		/* margin-left: 10px; */
		background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.64) 45%);
		backdrop-filter: blur(20px);
		border-radius: 20px;
		padding: 16px;
		box-sizing: border-box;
		/* overflow: hidden; */
		position: relative;
		top: 20vh;
	}

	.ani-title{
		padding: 0 12px;
	}

	.box_context {
		height: 525rpx;
		background-color: #F7F6FF;
		border-radius: 16px;
		padding: 8px;
		/* border: 1px lightblue solid; */
		/* 设置超出隐藏 */
		display: -webkit-box;
		-webkit-box-orient: vertical;
		/* overflow: hidden; */
		-webkit-line-clamp: 14;
	}

	p {
		font-family: 方正舒体;
	}

	text {
		word-break: break-all;
	}

	button {
		margin-top: 10px;
		width: 70px;
		height: 30px;
		font-size: 10px;
		margin-left: 260px;

	}
</style>