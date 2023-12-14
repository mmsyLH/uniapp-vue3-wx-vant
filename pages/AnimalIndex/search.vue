<template>
	<view class="container">
		<view class="search-bar">
			<!-- 搜索框 -->
			<u-search :placeholder="placeholder" v-model="keyword" @input="inputChange" @search="doSearch(keyword)" 
			@custom="doSearch(keyword)" maxlength="24">
			</u-search>
		</view>
		<!-- 搜索记录 -->
		<view class="record">
			<view class="record_heand">
				<up-text text="搜索历史" bold="true" block="false" size="18"></up-text>
				<u-icon name="close-circle" :size="30" @tap="delete_key"></u-icon>
			</view>
			<!-- 搜索历史内容 -->
			<scroll-view v-show="!isShowKeywordList" class="keyword-box" scrollY>
				<view v-if="oldKeywordList.length > 0" class="keyword-block">
					<!-- v-if:判断是否存在历史记录 -->
					<view class="keyword">
						<view v-for="(keyword, index) in oldKeywordList" :key="index" @tap="doSearch(keyword)">
							{{ keyword }}
						</view><!-- 循环渲染历史记录数组内容 -->
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 方案1 -->
		<!-- 热门搜索 -->
		<view class="record">
			<view class="record_heand">
				<up-text text="热门搜索" bold="true" block="false" size="18"></up-text>
				<u-icon v-if="forbid == ''" name="eye-off" :size="30" @tap="hotToggle"></u-icon>
				<u-icon v-else name="eye" :size="30" @tap="hotToggle"></u-icon>
			</view>
			<!-- 搜索热门内容 -->
			<scroll-view v-show="!isShowKeywordList" class="keyword-box" scrollY>
				<view v-if="forbid == ''" class="keyword-block">
					<view class="keyword">
						<view v-for="(keyword, index) in displayedKeywords" :key="index" style="color: #1296db;"
							@tap="doSearch(keyword.dw)">
							{{ keyword.dw}}
						</view>
					</view>
				</view>
				<view v-else class="yingcang">
					<view>当前热门搜索已隐藏</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			placeholder: { // 占位符，为输入时显示的内容
				type: String,
				default: '输入搜索关键字',
			},

		},

		data() {
			return {
				keyword: '', // 关键字  先定义为对象 后面再改
				oldKeywordList: [], // 历史记录
				protectedAnimals: [], // 热门搜索
				isShowKeywordList: false,
				isDelShow: false, // 判断是否出现删除标志
				forbid: '', // 热搜显隐标志

				showsearchbtn: false,
				searchval: '',
				target: 0,

				startIndex: 0, // 开始索引
				endIndex: 8, // 结束索引

			};
		},

		onLoad() {
			this.init();
		},

		computed: {
			displayedKeywords() {
				return this.protectedAnimals.slice(this.startIndex, this.endIndex);
			},
		},

		watch: {
			searchval(v) {
				const me = this;
				me.$emit('inputchange', v);
				if (v != '') {
					me.showsearchbtn = true;
				} else {
					me.showsearchbtn = false;
				}
			},

			target(val) {
				this.tap(val);
			},
		},

		methods: {
			// 页面刷新渲染
			init() {
				// this.loadDefaultKeyword();
				this.loadOldKeyword();
				this.loadHotKeyword();
			},

			// 页面渲染时自动读取本地存储的历史记录
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						const OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					},
				});
			},

			// 页面渲染加载热门搜索关键字，后期通过后台获取数据赋值
			loadHotKeyword() {
				this.protectedAnimals = [{
						id: 41,
						name: '大熊猫41',
					}
				];
				//加载后台数据
				uni.request({
					url: 'http://110.41.178.59:8081/ysdw/top',
					success: (res) => {
						// console.log("返回的数据为:", res.data.message);
						// console.log("返回的数据为res.data:", res.data);
						if (res.data.code === 200) {
							this.protectedAnimals = res.data.message;
							//console.log("当前的protectedAnimals", JSON.stringify(this.protectedAnimals));

							// 在这里进行相关操作
							// 例如更新数据到this.animals
						}
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},

			// 监听输入
			async inputChange(event) {

				const keyword = event.detail ? event.detail.value : event;
				if (!keyword) {
					this.isShowKeywordList = false;
					return;
				}
				this.isShowKeywordList = true;
			},
			search() {
				console.log("search()中的keyword：", this.keyword)
				this.doSearch(this.keyword); // 传递关键字对象给 doSearch 方法
			},
			// 执行搜索
			doSearch(keyword) {
				console.log(keyword);
				console.log("keyword类型", typeof keyword);
				if (!keyword.trim() || typeof keyword !== 'string') {
					console.log('不执行搜索');
					uni.showToast({
						title: '请输入关键字',
						icon: 'none',
					});
					return;
				}
				console.log('执行了搜索');
				this.saveKeyword(keyword);
				uni.navigateTo({
					url: `/pages/AnimalIndex/searchResult?name=${keyword}`,
				});
			},

			// 保存关键字到历史
			saveKeyword(keyword) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						// 获取存储中的关键字数组
						const OldKeys = JSON.parse(res.data);
						console.log('#101: OldKeys', OldKeys);
						// 查找关键字在数组中的位置
						const findIndex = OldKeys.indexOf(keyword);
						// 如果关键字不在数组中，则将其插入到数组开头
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							// 如果关键字已经存在，则先删除再插入到数组开头
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}

						// 限制历史记录最多十个
						OldKeys.length > 10 && OldKeys.pop(); // 删除数组尾部元素

						// 将更新后的历史记录重新存储到本地存储
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys),
						});

						// 更新历史记录列表
						this.oldKeywordList = OldKeys;
					},
					fail: (e) => {
						// 如果存储中没有旧记录，则创建一个新的历史记录数组
						const OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys),
						});

						// 更新历史记录列表
						this.oldKeywordList = OldKeys;
					},
				});
			},


			// 清空输入框
			clear() {
				console.log(this.keyword);
				uni.hideKeyboard();
				this.keyword = '';
				this.inputChange('');
				console.log(`没有${this.keyword.length}${this.keyword}`);
			},

			// 删除历史记录-全部
			delete_key() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys',
							});
						} else if (res.cancenl) {
							console.log('用户点击取消');
						}
					},
				});
			},

			// 切换热门搜索内容
			changeBatch() {
				this.startIndex += 8;
				this.endIndex += 8;

				if (this.endIndex > this.protectedAnimals.length) {
					this.startIndex = 0;
					this.endIndex = 8;
				}
			},

			// 热门开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '1'; // 两个图标的差别在这个数字"1"上
			},
		},
	};
</script>

<style lang="scss" scoped>
	.search-bar {
		display: flex;
		align-items: center;
		margin-top: 8px;
	}

	.record {
		height: auto;
		
		.record_heand {
			height: 50px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top:16px;
		}

		.record_buttom {}
	}

	.keyword-box .keyword-block {
		padding: 10upx 0;
	}

	.keyword-box .keyword-block .keyword-list-header {
		width: 94%;
		padding: 10upx 3%;
		font-size: 27upx;
		color: #333;
		display: flex;
		justify-content: space-between;
	}

	.keyword-box .keyword-block .keyword-list-header image {
		width: 40upx;
		height: 40upx;
	}

	.keyword-box .keyword-block .keyword {
		width: 100%;
		display: flex;
		flex-flow: wrap;
		justify-content: flex-start;
	}

	.keyword-box .keyword-block .hide-hot-tis {
		display: flex;
		justify-content: center;
		font-size: 28upx;
		color: #6b6b6b;
	}

	.keyword-box .keyword-block .keyword>view {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 60upx;
		padding: 0 20upx;
		margin: 10upx 20upx 10upx 0;
		height: 60upx;
		font-size: 28upx;
		background-color: rgb(242, 242, 242);
		color: #6b6b6b;
	}

	.yingcang {
		margin: 50rpx 50rpx;
	}
</style>