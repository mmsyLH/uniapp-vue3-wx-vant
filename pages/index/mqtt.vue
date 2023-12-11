<template>
	<view>
		mqtt测试
	</view>
</template>

<script setup>
	import * as mqtt from 'mqtt/dist/mqtt.js';
	import {
		reactive,
		ref,
		onMounted
	} from "vue";

	// https://github.com/mqttjs/MQTT.js#qos
    // 定义响应式变量
    const qosList = [0, 1, 2]; // MQTT 的 QoS 列表
    let client = ref({ connected: false }); // MQTT 客户端连接状态
    const receivedMessages = ref(""); // 接收到的消息
    const subscribedSuccess = ref(false); // 订阅状态
    const btnLoadingType = ref(""); // 按钮加载状态
    const retryTimes = ref(0); // 重新连接次数


	let protocal = "";
	//如你的链接是wss:则修改为wxs:,如果你的链接是ws:则修改为wx:
	// #ifdef H5
	protocal = "ws"
	// #endif
	// #ifdef MP-WEIXIN
	protocal = "wx"
	// #endif
	 // MQTT 连接配置
	    const connection = reactive({
	        protocol: protocal, // 协议
	        host: "jqrjq.cn", // MQTT 服务器主机
	        port: 8083, // 端口号
	        clientId: "emqx_vue3_" + Math.random().toString(16).substring(2, 8), // 客户端 ID
	        username: "admin", // 用户名
	        password: "public", // 密码
	        clean: true, // 是否清除会话状态
	        connectTimeout: 30 * 1000, // 连接超时时间
	        reconnectPeriod: 4000, // 重新连接时间间隔
	    });
	
	    // 处理重新连接事件
	    const handleOnReConnect = () => {
	        retryTimes.value += 1;
	        if (retryTimes.value > 5) {
	            try {
	                client.value.end(); // 结束 MQTT 连接
	                initData(); // 初始化数据
	                console.log("connection maxReconnectTimes limit, stop retry");
	            } catch (error) {
	                console.log("handleOnReConnect catch error:", error);
	            }
	        }
	    };
	
	    // 创建 MQTT 连接
	    const createConnection = () => {
	        try {
	            const {
	                protocol,
	                host,
	                port,
	                ...options
	            } = connection;
	            const connectUrl = `${protocol}://${host}:${port}/mqtt`; // MQTT 连接 URL
	
	            // 使用 mqtt.connect 方法创建 MQTT 连接
	            client.value = mqtt.connect(connectUrl, options);
	
	            if (client.value.on) {
	                // 监听连接事件
	                client.value.on("connect", () => {
	                    btnLoadingType.value = "";
	                    console.log("connection successful");
	                });
	
	                // 监听重新连接事件
	                client.value.on("reconnect", handleOnReConnect);
	
	                // 监听错误事件
	                client.value.on("error", (error) => {
	                    console.log("connection error:", error);
	                });
	
	                // 监听消息事件
	                client.value.on("message", (topic, message) => {
	                    receivedMessages.value = receivedMessages.value.concat(
	                        message.toString()
	                    );
	                    console.log(`received message: ${message} from topic: ${topic}`);
	                });
	            }
	        } catch (error) {
	            console.log("mqtt.connect error:", error);
	        }
	    };
	
	    // 在组件挂载后创建 MQTT 连接
	    onMounted(() => {
	        createConnection();
	    })
	</script>

<style>

</style>