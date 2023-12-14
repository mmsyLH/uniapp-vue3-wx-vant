<template>
	<view class="container content1">
		<view class="kong">
			<image class="img" src="../../static/zf.png" mode="aspectFit" @click="toDetail"></image>
			<text class="txt">中华人民共和国野生动物保护法</text>
		</view>
		<view class="kong">
			<image class="img" src="../../static/zf.png" mode="aspectFit"></image>
			<text class="txt">中华人民共和国动物防疫法</text>
		</view>

		<!-- 分割线 -->
		<view class="line"></view>


		<view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
				activeColor="rgba(36,158,222,0.8)"></uni-segmented-control>
			<view class="content">
				<view v-show="current === 0" class="neirong1">
					<text>中华人民共和国野生动物保护法</text>
					<text class="txt2">来源：中国人大网</text>
				</view>
				<view v-show="current === 0" class="neirong1">
					<text>中华人民共和国野生动物防疫法</text>
					<text class="txt2">来源：中国人大网</text>
				</view>
				<view v-show="current === 1" class="neirong1">
					<text>中华人民共和国野生动物防疫法</text>
					<text class="txt2">来源：中国人大网</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: ['国家政策', '地方政策'],
				current: 0
			}

		},
		methods: {
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			toDetail(){
				uni.navigateTo({
					url:"/pages/AnimalRegulations/AnimalRegulationDetail"
				})
			}
		}
	}
</script>

<style>
	.content1 {
		height: 600px;
		display: flex;
		/* 从上到下排列 */
		flex-direction: column;
		padding: 0 16px;
		/* background-color: #E0E0E0; */
		/* background-color: #E0E0E0; */
		overflow: hidden;

	}

	.kong {
		margin-top: 20px;
		height: 120px;
		border-radius: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #E0E0E0;
		margin-bottom: 16px;
	}

	.kong image {
		width: 40px;
		height: 40px;
	}

	.line {
		height: 1px;
		background: #ccc;
		margin-bottom: 20px;
	}

	.texts {
		width: 100%;
		height: 100px;
		background-color: white;
		border-bottom: 2px solid #ccc
	}
	.neirong1{
		margin-top: 10px;
		background-color: #f2f2f2; /* 背景颜色 */
		padding: 18px; /* 内边距 */
		border-radius: 5px; /* 圆角 */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影 */
		font-size: 16px; /* 字体大小 */
		color: #333; /* 文字颜色 */
		display: flex;
		flex-direction: column;
		border-bottom: 2px solid lightgray;
	}
	.txt2{
		color: #ccc;
		font-size: 12px;
	}
</style>