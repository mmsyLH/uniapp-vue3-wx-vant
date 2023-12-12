<template>
	<view class="container">
		<view class="detai_box">
			<p>{{animal.dw}}{{animal.dwxm}}</p>
			<p v-if="animal.dwjb">国家{{animal.dwjb}}保护动物</p>
			<p>{{animal.dwtype}}</p>
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
			//根据id查询动物详情
			this.getAnimalDetailsById(query.id);
		},

		methods: {
			// 获取动物信息
			getAnimalDetailsById(id) {
				uni.request({
					url: 'http://110.41.178.59:8081/ysdw/dwid/' + id,
					success: (res) => {
						console.log(res.data)
						if (res.data.code === 200) {
							this.animal = res.data.message;
						}
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
		background-image: url('{{animal.dwtp}}');
		background-size: 100% 250px;
		background-repeat: no-repeat;
	}

	.detai_box {
		width: 90%;
		height: 420px;
		margin-top: 200px;
		margin-left: 10px;
		background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.64) 45%);
		backdrop-filter: blur(20px);
		border-radius: 10%;
		padding: 10px;
		overflow: hidden;

	}

	.box_context {
		margin-top: 10px;
		margin-left: 5px;
		width: 325px;
		height: 305px;
		background-color: #F7F6FF;
		border-radius: 10px;
		border: 1px lightblue solid;
		/* 设置超出隐藏 */
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
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