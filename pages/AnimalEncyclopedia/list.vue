<template>
	<view class="list-item">
		<view class="list-item-img">
			<image :src="item.dwtp" mode="aspectFill">
			</image>
		</view>
		<view class="list-content">
			<view class="list-name">
				{{item.name}}
			</view>
			<view class="list-tag" v-if="item.tags">
				<block v-for="(tag, i) in item.tags">
					   <text v-if="tag != ''">{{ tag }}</text>
				</block>
			</view>
<!-- 			<view class="list-price">
				<text>￥</text>
				<text>{{'0'|filterPrice}}</text>
			</view> -->
			<view class="list-comment">
				{{item.dwjj}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['item'],
		data() {
			return {

			};
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	.list-item {
		width: 100%;
		display: flex;
		border: 1px solid #f1f1f1;
		border-radius: 10rpx;
		padding: 15rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;

		.list-comment {
			width: 100%;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-line-clamp: 3;
			max-height: 3.2rem;
			color: #666;
			font-size: .8rem;
		}

		.list-price {
			width: 100%;
			margin-top: 15rpx;

			text:first-child {
				font-size: 26rpx;
				font-weight: 400;
				color: orangered;
			}

			text:last-child {
				font-size: 36rpx;
				color: orangered;
				font-weight: 600;
			}
		}

		.list-tag {
			width: 100%;
			margin-top: 15rpx;

			text {
				font-size: 22rpx;
				font-weight: 400;
				border: 1px solid orangered;
				color: orangered;
				margin-right: 10rpx;
				border-radius: 10rpx;
				padding: 1rpx 5rpx;
				box-sizing: border-box;
			}
		}

		.list-item-img {
			width: 90px;
			height: 200rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.list-content {
			flex: 1;
			margin-left: 15rpx;

			.list-name {
				width: 100%;
				font-weight: 500;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				word-break: break-all;
				word-wrap: break-word;
				white-space: normal;
				word-break: break-word;

			}
		}

	}
</style>