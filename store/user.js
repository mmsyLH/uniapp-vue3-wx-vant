import {
	ref
} from 'vue'
import {
	defineStore
} from 'pinia'
const useUserStore=defineStore('user',{
	state:()=>({
		token:'',
		userinfo:{
			id:0,
			state:0,
			userName:'',
			userType:'',
			token:'',
			binding:0,
			email:'',
			mobile:''	
		}
	}),
	actions:{
		setToken(token){
			this.token=token
		},
		fillUser(userinfo){
			this.userinfo=userinfo;
		}
	},

	persist:{
		 enabled: true,
		 H5Storage: window?.localStorage,
	}

})

// const useUserStore = defineStore('user', () => {
// 	let token = ref('');
// 	let userinfo=ref({
// 		id:0,
// 		state:0,
// 		userName:'',
// 		userType:'',
// 		token:'',
// 		binding:0,
// 		email:'',
// 		mobile:''	
// 	})

// 	function setToken(token) {
// 		this.token = token
// 	}
// 	function fillUser(userinfo){
// 		this.userinfo=userinfo
// 	}
// 	return {
// 		token,
// 		setToken,
// 		userinfo,
// 		fillUser
// 	}
// },{
// 	enable:true,
// 	H5Storage: window?.localStorage,
// })
export default useUserStore;