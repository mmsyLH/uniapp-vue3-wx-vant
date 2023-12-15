<template>
	<view class="grid-box">
		<view class="grid-box-img">
			<image :src="item.dwtp" mode="aspectFill">
			</image>
		</view>
		<view class="grid-box-name">
			{{item.name}}
		</view>

		<view class="grid-comment">
		</view>
		<view class="grid-box-price" v-if="item.dwjb">
			<text>保护等级 </text>
			<text>{{item.dwjb}}</text>
		</view>
		<view v-else style="height: 26px;">
			<text></text>
			<text></text>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['item'],
		data() {
			return {
			
			};
		}
	}
</script>

<style lang="scss">
	.grid-box {
		width: 46.5%;
		display: inline-block;
		margin-left: 2%;
		border: 1px solid #f1f1f1;
		margin-bottom: 15rpx;
		border-radius: 15rpx;
		overflow: hidden;
		.grid-comment {
			width: 100%;
			margin-top: 15rpx;
			color: #666;
			font-size: 26rpx;
			padding: 0 10rpx;
			box-sizing: border-box;
		}

		.grid-box-price {
			width: 100%;
			margin-top: 15rpx;
			padding: 0 10rpx;
			box-sizing: border-box;

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

		.grid-box-name {
			width: 100%;
			margin-top: 15rpx;
			padding: 0 10rpx;
			box-sizing: border-box;
			min-height: 42px;
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

		.grid-box-img {
			width: 100%;
			height: 400rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>