import useUserStore from '@/store/user.js'
import config from './config.js';
const request = (options) => {
	const {
		method,
		url,
		data,
		timeout = config.timeOut,
		header = {}
	} = options
	const userStore=useUserStore();
	const token=userStore.token;
	let contentType = 'application/json;charset=UTF-8'
	if (token.length>0) {
		header['token'] = token
	}
	header['content-type'] = contentType
	uni.showLoading({
		title: '加载中',
	})
	return new Promise((resolve, reject) => {
		uni.request({
			header: header,
			method: method,
			timeout:config.timeOut,
			url: config.baseUrl + url,
			data: data,
			success: ({data}) => {
				if (data.success) {
					uni.hideLoading()
				     resolve(data)
				} else {
					uni.hideLoading()
					uni.showToast({
						title: data.msg,
						duration: 2000,
						icon: 'none',
					})
					reject(data)

				}

			},
			fail: (err) => {
				uni.hideLoading()
				reject(err)
				console.log(err)
			},
			complete: () => {
				uni.hideLoading()
				uni.stopPullDownRefresh()
			},
		})
	})

}
export default request