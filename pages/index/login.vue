<template>
	<view>
		<view class="logo">
			<image src="@/static/logo.png"></image>
		</view>
		<uni-forms class="myForm" ref="myForm" :modelValue="loginModel" :rules="rules">
			<uni-forms-item name="email">
				<uni-easyinput class="input" v-model="loginModel.email" placeholder="请输入电子邮箱" suffix-icon="email" />
			</uni-forms-item>
			<uni-forms-item name="password">
				<uni-easyinput class="input" type="password" v-model="loginModel.password" placeholder="请输入密码" />
			</uni-forms-item>
			<button type="primary" @click="login">用户登录</button>
			<view class="logo-extra">
				<button type="default" size="mini">忘记密码</button>
				<button type="default" size="mini" @click="toRegister">用户注册</button>
			</view>
		</uni-forms>

	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import useUserStore from '@/store/user.js'
	import {
		postRequest
	} from '@/http/index.js'
	const userStore = useUserStore();
	const myForm = ref(null); //获取DOM节点myForm==ref
	const loginModel = reactive({
		email: '',
		password: ''
	})
	const rules = {
		email: {
			rules: [{
					required: true,
					errorMessage: '必填项'
				},
				{
					format: 'email',
					errorMessage: '邮件格式错误'
				}
			]
		}
	}
	const login = () => {
		myForm.value.validate().then(res => {
			postRequest('api/mobile/elogin', loginModel)
				.then(res => {
					console.log(res)
					if (res.success) {
						const userinfo = res.data.userinfo;
						userStore.setToken(userinfo.token)
						userStore.fillUser(userinfo)
					}
				}).catch(err => {
					console.log(err)
				})

		}).catch(err => {
			console.log(err)
		})
	}

	function toRegister() {
		uni.navigateTo({
			url: "/pages/index/register",
			success(res) {
				console.log(res)
			},
			fail(res) {
				console.log(res)
			}
		})
	}
</script>

<style scoped>
	.myForm {
		padding: 40px 10px 0 10px;
		margin: 10px;
		height: calc(80vh - 240px);
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
		border-radius: 0 0 10px 10px;
	}

	.logo-extra {
		display: flex;
		margin-top: 10upx;
	}

	.logo-extra button {
		width: 100%;
	}

	.logo {
		width: 100%;
		height: 240px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	image {
		width: 100px;
		height: 100px;

	}
</style>