<template>
	<view class="container" :class="{ 'sign-up-mode': signUpMode }">
		<view class="forms-container">
			<view class="signin-signup">
				<view v-if="!signUpMode">
					<!-- 登录表单 -->
					<uni-forms ref="signInForm" :modelValue="formData" :rules="signInRules" class="sign-in-form">
						<div class="sign-in-title title">登录</div>
						<uni-easyinput v-model="formData.userAccount" type="text" placeholder="请输入账户"></uni-easyinput>
						<uni-easyinput v-model="formData.userPassword" type="text" placeholder="请输入密码"></uni-easyinput>
						<button plain type="info" class="btn solid" @click="signIn1">登录</button>
						选择其他登录方式？
						<button plain type="info" class="btn solid" style="width: 120px;" @click="signIn2">微信登录</button>

					</uni-forms>
				</view>
				<view v-if="signUpMode">
					<!-- 注册表单 -->
					<uni-forms ref="signUpForm" :modelValue="formData" :rules="signUpRules" class="sign-up-form">
						<div class="sign-up-title title">注册</div>
						<uni-easyinput v-model="formData.userAccount" type="text" placeholder="请输入账号"></uni-easyinput>
						<uni-easyinput v-model="formData.userPassword" type="password"
							placeholder="请输入密码"></uni-easyinput>
						<uni-easyinput v-model="formData.checkPassword" type="password"
							placeholder="请确认密码"></uni-easyinput>
						<uni-easyinput v-model="formData.plantCode" type="text" placeholder="请输入学号"></uni-easyinput>

						<button plain type="info" class="btn solid" @click="signUp">注册</button>
					</uni-forms>
				</view>
			</view>
		</view>
		<view class="panels-container">
			<view class="left-panel panel">
				<view class="content">
					<view>新用户?</view>
					<view>好兄弟,你来了,我们的网站就差你的加入了,点击下方注册按钮加入我们吧!!</view>
					<van-button plain type="info" class="btn transparent" @click="showSignUp">转到注册</van-button>
				</view>
				<image src="../../assets/img/log.svg" class="image" alt=""></image>
			</view>
			<view class="panel right-panel">
				<view class="content">
					<view>已经是我们自己人了吗?</view>
					<p>那好兄弟,你直接点击登录按钮,登录到我们这优秀的系统里!!</p>
					<van-button class="btn transparent" @click="showSignIn">转到登录</van-button>
				</view>
				<image src="../../assets/img/register.svg" class="image" alt=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				signUpMode: false,
				formData: {
					userAccount: '',
					userPassword: '',
					checkPassword: '',
					plantCode: ''
				},
				name: {
					rules: [{
							required: true,
							errorMessage: '请输入姓名',
						},
						{
							minLength: 3,
							maxLength: 5,
							errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
						},
					],
				},
			};
		},

		methods: {
			showSignUp() {
				this.signUpMode = true;
			},

			showSignIn() {
				console.log(this.formData)
				this.signUpMode = false;
			},
			signIn1() {//正常登录
				const userAccount = this.formData.userAccount; // 用户名
				const userPassword = this.formData.userPassword; // 密码
				wx.request({
					url: 'http://127.0.0.1:8888//api/user/login',
					method: 'POST',
					data: {
						userAccount: userAccount,
						userPassword: userPassword
					},
					success: (data) => {
						console.log("data", data);
						if (data.data.code == 200) {
							uni.navigateTo({
								url: '/pages/GameList/GameList',
							});
							console.log("登录成功")
						}
					}
				})
			},
			signIn2() {//微信登录
				wx.login({
					success: (res) => {
						console.log("code: " + res.code);
						wx.request({
							url: 'http://127.0.0.1:8080//user/user/login',
							method: 'POST',
							data: {
								code: res.code
							},
							success: (data) => {
								console.log("data", data);
								if (data.data.code == 1) {
									uni.navigateTo({
										url: '/pages/GameList/GameList',
									});
									console.log("登录成功")
								}
							}
						})
					}
				})

			},

			signUp() {
				// 注册逻辑
				const userAccount = this.formData.userAccount; // 用户名
				const userPassword = this.formData.userPassword; // 密码
				const checkPassword = this.formData.checkPassword; // 密码
				const plantCode = this.formData.plantCode; // 密码
				console.log('注册信息:', this.formData);
				wx.request({
					url: 'http://127.0.0.1:8888//api/user/register',
					method: 'POST',
					data: {
						userAccount: userAccount,
						userPassword: userPassword,
						checkPassword: checkPassword,
						plantCode: plantCode
					},
					success: (data) => {
						console.log("data", data);
						if (data.data.code == 200) {
							console.log("注册成功")
						}
					}
				})
			},
		},
	};
</script>

<style scoped>
	/* @import "../../assets/css/log-res.css"; */
	.container {
		position: relative;
		width: 100%;
		background-color: #fff;
		min-height: 100vh;
		overflow: hidden;
	}

	.forms-container {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.signin-signup {
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		left: 75%;
		width: 50%;
		transition: 1s 0.7s ease-in-out;
		display: grid;
		grid-template-columns: 1fr;
		z-index: 5;
	}

	.uni-forms {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 0rem 5rem;
		transition: all 0.2s 0.7s;
		overflow: hidden;
		grid-column: 1 / 2;
		grid-row: 1 / 2;
	}

	.uni-forms.sign-up-form {
		opacity: 0;
		z-index: 1;
	}

	.uni-forms.sign-in-form {
		z-index: 2;
	}

	.title {
		font-size: 2.0rem;
		color: #444;
		margin-bottom: 10px;
	}

	.input-field {
		max-width: 400px;
		width: 100%;
		background-color: #f0f0f0;
		margin: 10px 0;
		height: 55px;
		border-radius: 55px;
		display: grid;
		grid-template-columns: 15% 85%;
		padding: 0 0.4rem;
		position: relative;
	}

	.input-field i {
		text-align: center;
		line-height: 55px;
		color: #acacac;
		transition: 0.5s;
		font-size: 1.1rem;
	}

	.input-field input {
		background: none;
		outline: none;
		border: none;
		line-height: 1;
		font-weight: 600;
		font-size: 1.1rem;
		color: #333;
	}

	.input-field input::placeholder {
		color: #aaa;
		font-weight: 500;
	}

	.social-text {
		padding: 0.7rem 0;
		font-size: 1rem;
	}

	.social-media {
		display: flex;
		justify-content: center;
	}

	.social-icon:hover {
		color: #4481eb;
		border-color: #4481eb;
	}

	.btn:hover {
		background-color: #4d84e2;
	}

	.panels-container {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.container:before {
		content: "";
		position: absolute;
		height: 2000px;
		width: 2000px;
		top: -10%;
		right: 48%;
		transform: translateY(-50%);
		background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 1%);
		transition: 1s ease-in-out;
		border-radius: 50%;
		z-index: 6;
	}

	.image {
		width: 100%;
		transition: transform 1.1s ease-in-out;
		transition-delay: 0.4s;
	}

	/* 定义一个名为.panel的样式类 */
	.panel {
		/* 设置display属性为flex，使得该元素成为一个flex容器 */
		display: flex;
		/* 设置flex-direction属性为column，使得子元素垂直排列 */
		flex-direction: column;
		/* 设置align-items属性为flex-end，使得子元素在垂直方向上靠右对齐 */
		align-items: flex-end;
		/* 设置justify-content属性为space-around，使得子元素在垂直方向上均匀分布 */
		/*justify-content: space-around;*/
		/* 设置文本居中 */
		text-align: center;
		/* 设置z-index属性为6，使得该元素在z轴上处于更高的层级 */
		z-index: 6;
	}


	/* 定义一个名为.right-panel的样式类 */
	.right-panel {
		/* 设置pointer-events属性为none，使得该元素不会被鼠标事件所触发 */
		pointer-events: none;
		/* 设置padding属性，分别为上、右、下、左，即上3rem、右12%、下2rem、左17% */
		padding: 1rem 12% 2rem 17%;
	}

	/* 定义.panel .content选择器，表示.panel元素下的所有class为content的元素 */
	.panel .content {
		/* 设置字体颜色为白色 */
		color: #fff;
		/* 设置transform属性的过渡效果，持续时间为0.9秒，缓动函数为ease-in-out */
		transition: transform 0.9s ease-in-out;
		/* 设置过渡效果延迟0.6秒 */
		transition-delay: 0.6s;
	}

	.panel h3 {
		font-weight: 60;
		line-height: 1;
		font-size: 1.5rem;
		display: inline-block;
	}

	.panel p {
		font-size: 0.95rem;
		padding: 0.7rem 0;
	}

	.btn.transparent {
		margin: 0;
		background: none;
		border: 2px solid #fff;
		width: 140px;
		height: 35px;
		font-weight: 600;
		font-size: 0.8rem;
	}

	.right-panel .image,
	.right-panel .content {
		transform: translateX(800px);
	}

	/* ANIMATION */

	.container.sign-up-mode:before {
		transform: translate(100%, -50%);
		right: 52%;
	}

	.container.sign-up-mode .left-panel .image,
	.container.sign-up-mode .left-panel .content {
		transform: translateX(-800px);
	}

	.container.sign-up-mode .signin-signup {
		left: 25%;
	}

	.container.sign-up-mode form.sign-up-form {
		opacity: 1;
		z-index: 2;
	}

	.container.sign-up-mode form.sign-in-form {
		opacity: 0;
		z-index: 1;
	}

	.container.sign-up-mode .right-panel .image,
	.container.sign-up-mode .right-panel .content {
		transform: translateX(0%);
	}

	.container.sign-up-mode .left-panel {
		pointer-events: none;
	}

	.container.sign-up-mode .right-panel {
		pointer-events: all;
	}

	.form-slide-enter-active,
	.form-slide-leave-active {
		transition: opacity 1s, transform 1s;
	}

	.form-slide-enter,
	.form-slide-leave-to {
		opacity: 0;
		transform: translateX(50px);
	}
</style>