<template>
	<view class="container" :style="{backgroundImage: 'url(' + animal.dwtp + ')'}">
		<view class="detai_box">
			<view class="ani-title">
				<p>{{animal.dw}}{{animal.dwxm}}</p>
				<p v-if="animal.dwjb">国家{{animal.dwjb}}保护动物</p>
				<!-- <p>{{animal.dwtype}}</p> -->
			</view>
			<view class="text-box" @tap="showdetail">
				<text>{{animal.dwjj}}</text>
			</view>
			
			 <view class="button-container">
			    <button class="correct-button">纠正</button>
			  </view>
			
		</view>
	</view>
</template>

<script>
import { getRequest } from '../../http';
	export default {
		data() {
			return {

				animal: '',
			}
		},
		onLoad(query) {
			console.log(query.id)
			 // var id = '22';   //这个数据有问题
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
			},
			showdetail(){
				const textBox = this.$refs.textBox;
				textBox.style.height = 'auto';
				textBox.style.overflow = 'visible';
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
		margin-top: 100px;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.64) 45%);
		backdrop-filter: blur(20px);
		border-radius: 20px;
		padding: 16px;
		box-sizing: border-box;
		position: relative;
		top: 20vh;
	}

	.ani-title{
		padding: 0 12px;
	}

	.box_context {
		height: 200px;
		overflow: hidden;
	}

	p {
		font-family: 方正舒体;
	}

	text {
		word-break: break-all;
	}
	.button-container {
	    display: flex;
	    justify-content: flex-end; /* 将按钮放置在右侧 */
	    margin-top: 10px; /* 设置顶部边距 */
	  }
	  .correct-button {
	    background-color: #4CAF50;
	    color: white;
	    padding: 10px 20px;
	    border: none;
	    text-align: center;
	    text-decoration: none;
	    display: inline-block;
	    font-size: 16px;
	    border-radius: 5px;
	    cursor: pointer;
		width: 50%;
	  }
	
</style>