<template>
	<view :id="elId" class="wrapper" ref="wzb-category" :style="{zIndex:zindex,backgroundColor:bgcolore}">
		<view class="bar">
			<uni-icons :type="icon"></uni-icons>
		</view>
		<slot />
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom');
	// #endif
	/**
	 * 分类显示
	 * description 分类组件
	 * @property {Number} columns 列数 
	 * @property{Number} zindex 层数
	 * @property{String} bgcolor 背景颜色
	 */
	export default {
		name: "wzb-category",
		props: {
			columns: {
				type: Number,
				default: 4,

			},
			zindex: {
				type: Number,
				default: 1,
			},
			bgcolore: {
				type: String,
				default: '#ffffff'
			}
		}
		data() {
			const elId = `Wzb_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				elId,
				width: 0,
				icon: 'right'
			};
		},
		created() {
			this.children = []
		},
		mounted() {
			this.$nextTick(() => {
				this.init()
			})
		},
		methods: {
			init() {
				setTimeout(() => {
					this._getSize((width) => {
						this.children.forEach((item, index) => {
							item.width = width
						})
					})
				}, 50)
			},
			_getSize(fn) {
				// #ifndef APP-NVUE
				uni.createSelectorQuery()
					.in(this)
					.select(`#${this.elId}`)
					.boundingClientRect()
					.exec(ret => {
						this.width = parseInt((ret[0].width - 1) / this.column) + 'px'
						fn(this.width)
					})
				// #endif
				// #ifdef APP-NVUE
				dom.getComponentRect(this.$refs['wzb-category'], (ret) => {
					this.width = parseInt((ret.size.width - 1) / this.column) + 'px'
					fn(this.width)
				})
				// #endif
			}
		}
	}
</script>

<style>
	.wrapper {
		position: relative;
	}
</style>