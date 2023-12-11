<template>
	<view>
		<view class="swiperPanel" @tap="tapBox">
			<image v-if="BgPic" class="swiper-img" :src='BgPic'></image>
			<view v-if="title" class="swiper-title">{{title}}</view>
			<view class="swiperItem" v-for="(item, index) in swiperList" :key="index"
				:style="{ left: itemStyle[index].left, height: itemStyle[index].height, zIndex:itemStyle[index].zIndex}">
				<view class="children" @touchstart="startMove" @touchend="endMove" @touchmove="move"
					@touchcancel="cancel" @tap="tap(index)">
					<view class="pic">
						<image class="pic-img" :src="item.picUrl"></image>
						<view class="pic-title"
							:style="{ width: itemStyle[index].width,top: itemStyle[index].itemTop,bottom: itemStyle[index].itemBottom,left: itemStyle[index].itemRight,right: itemStyle[index].itemLeft}">
							{{item.title}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			swiperList: {
				type: Array,
				default: [],
			},
			title: {
				type: String,
				default: '',
			},
			BgPic: {
				type: String,
				default: '',
			}
		},
		data() {
			return {
				slideNote: {
					x: 0,
					y: 0,
				},
				screenWidth: 0,
				itemStyle: [],
				moveArr: [], //拍断是否移动
				id: 0
			};
		},
		watch: {
			id: {
				immediate: true, //初始化的时候是否调用
				deep: true, //是否开启深度监听
				handler(newValue, oldValue) {
					this.$emit('checked', {
						id: this.id
					});
				}
			}
		},
		created() {
			var macInfo = uni.getSystemInfoSync();
			this.screenWidth = macInfo.screenWidth;
			// 计算swiper样式
			this.swiperList.forEach((item, index) => {
				this.itemStyle.push(this.getStyle(index));
			});
			console.log(this.itemStyle);
		},
		methods: {
			getId() {
				if (this.itemStyle[0].id == 0) return this.id = 0
				return this.id = (this.itemStyle.length - this.itemStyle[0].id)
			},
			move(e) {
				console.log(e.touches[0]);
				this.moveArr.push(e.touches[0].pageX);
			},
			getStyle(e) {
				if (e > this.swiperList.length / 2) {
					var right = this.swiperList.length - e;
					return {
						// transform: 'scale(' + (1 - right / 10) + ') translate(-' + right * 16 + '%,0px)',
						zIndex: 9999 - right,
						left: -((680 - 232 - 96) / (this.swiperList.length - 1)) * right * 2 + 'rpx',
						height: 260 - (right * 30) + 'rpx',
						width: '10rpx',
						itemRight: '20rpx',
						itemTop: 0,
						itemBottom: 0,
						id: e


						// width:(330 - right*50) + 'rpx',
						// height:(280 - right*50) + 'rpx',
						// padding:(right*50) + 'rpx',
						// opacity: 0.8 / right
					};
				} else {
					if (e == 0) {
						return {
							// transform: 'scale(' + (1 - e / 10) + ') translate(' + e * 16 + '%,0px)',
							zIndex: 9999 - e,
							left: -((680 - 232 - 96) / (this.swiperList.length - 1)) * e * 2 + 'rpx',
							height: '260rpx',
							id: e

							// opacity: 0.8 / e,
						}
					}
					return {
						// transform: 'scale(' + (1 - e / 10) + ') translate(' + e * 16 + '%,0px)',
						zIndex: 9999 - e,
						left: ((680 - 232 - 96) / (this.swiperList.length - 1)) * e * 2 + 'rpx',
						height: 260 - (e * 30) + 'rpx',
						width: '10rpx',
						itemLeft: '40rpx',
						itemTop: 0,
						itemBottom: 0,
						id: e
						// opacity: 0.8 / e,
					};
				}

			},
			startMove(e) {
				this.moveArr = [];

				// this.slideNote.x = e.changedTouches[0] ? e.changedTouches[0].pageX : 0;
				// this.slideNote.y = e.changedTouches[0] ? e.changedTouches[0].pageY : 0;
			},
			endMove(e) {
				var newList = JSON.parse(JSON.stringify(this.itemStyle));
				// 取最后2位进行对比，防止死变态s形滑动
				if (this.moveArr[this.moveArr.length - 2] > this.moveArr[this.moveArr.length - 1]) {
					console.log('向左移动了');
					var last = [newList.pop()];
					newList = last.concat(newList);

				}
				if (this.moveArr[this.moveArr.length - 2] < this.moveArr[this.moveArr.length - 1]) {
					newList.push(newList[0]);
					newList.splice(0, 1);

					console.log('向右移动了');
				}
				this.itemStyle = newList;
				this.getId()
				// console.log(e);
				// var newList = JSON.parse(JSON.stringify(this.itemStyle))
				// if ((e.changedTouches[0].pageX - this.slideNote.x) < 0) {
				// 	// 向左滑动
				// 	var last = [newList.pop()]
				// 	newList = last.concat(newList)
				// } else {
				// 	// 向右滑动
				// 	newList.push(newList[0])
				// 	newList.splice(0, 1)
				// }
				// this.itemStyle = newList
			},
			cancel(e) {
				console.log('触摸中断');
			},
			tap(e) {
				// console.log(e,this.id);

				if (e == this.id) {
					console.log(e, '点击了');
					this.$emit('change', {
						value: e
					});
				}

			},
			tapBox(e) {
				console.log(e);
				var newList = JSON.parse(JSON.stringify(this.itemStyle));
				if (e.detail.x > 0 && e.detail.x < 100) {
					console.log('点击了左边');
					newList.push(newList[0]);
					newList.splice(0, 1);

				}
				if (e.detail.x > 250) {
					console.log('点击了右边');
					var last = [newList.pop()];
					newList = last.concat(newList);
				}
				this.itemStyle = newList;
				this.getId()
			},
		},
	};
</script>

<style lang="scss">
	.swiper-img {
		position: absolute;
		width: 678rpx;
		height: 218rpx;
		left: 0;
		right: 0;
		top: -56rpx;
		margin: auto;
		border-radius: 16rpx;

	}

	.swiper-title {
		position: absolute;
		left: 0;
		right: 0;
		top: -56rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		padding: 16rpx 36rpx;
	}

	.swiperPanel {
		margin: 48rpx 35rpx;
		min-height: 230rpx;
		// overflow: hidden;
		position: relative;

		.swiperItem {
			height: 260rpx;
			width: 230rpx;
			position: absolute;
			top: 0;
			left: 20rpx;
			right: 0;
			bottom: 0;
			margin: auto;
			// transition: all 0.5s;

			.children {
				height: 100%;
				width: 100%;
				// margin: 2rpx auto;

				.pic {
					height: 100%;
					width: 100%;
					position: relative;

					.pic-img {
						position: absolute;
						height: 100%;
						width: 100%;
						border-radius: 16rpx;
					}

					.pic-title {
						position: absolute;
						top: 46rpx;
						text-align: center;
						z-index: 1;
						color: #FFF;
						width: 100%;
						text-align: center;
						font-size: 28rpx;
						font-weight: 500;
						margin: auto;
						word-wrap: break-word;
						display: flex;
						flex-direction: column;
						justify-content: center;
					}
				}
			}
		}
	}
</style>