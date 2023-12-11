<template>
    <view>
        <uni-notice-bar
            showIcon scrollable
            text="uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。"
        ></uni-notice-bar>
        <uni-grid :column="4" :highlight="true" @change="change">
            <uni-grid-item v-for="(item, id) in navigatorBars" :key="id" :index="id">
                <view class="grid-item-box" style="background-color: #fff;">
                    <uni-icons :type="item.icon" :size="40" color="#777"></uni-icons>
                    <text class="text">{{ item.name }}</text>
                </view>
            </uni-grid-item>
        </uni-grid>
        <navigator url="/pages/index/crop">crop</navigator>
        <button @click="goList">跳转到下一个页面</button>
        <button @click="goList2">跳转到下一个页面2</button>
        <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
        ></van-card>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                navigatorBars: [{
                                    id: 1,
                                    name: 'ICPC联盟',
                                    icon: 'vip',
                                },
                                {
                                    id: 2,
                                    name: '竞赛',
                                    icon: 'medal',
                                },
                                {
                                    id: 3,
                                    name: '社团',
                                    icon: 'staff',
                                },
                                {
                                    id: 4,
                                    name: '面试宝典',
                                    icon: 'gift',
                                }],

            };
        },

        methods: {
            change(e) {
                console.log(e);
            },

            goList() {
                uni.navigateTo({
                    url: '/pages/lg_rs/lg_rs',
                });
            },

            goList2() {
                uni.navigateTo({
                    url: '/pages/lg2/lg2',
                });
            },
        },
    };
</script>

<style>
	.grid-item-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
</style>
