import {
	defineStore
} from 'pinia'
import {
	ref,
	computed
} from 'vue'
import {
	getRequest
} from '@/http/index.js'
// const useSchoolStore = defineStore('school', () => {
// 	let school = ref({
// 		id: 0,
// 		province: '',
// 		city: '',
// 		area: '',
// 		schoolName: '',
// 		latitude: '',
// 		longitude: '',
// 		enable: 0,
// 		description: '',
// 		address: '',
// 	})
// 	const sch = computed(() => school);

// 	function fillSchool(school) {
// 		this.school = school
// 	}
// 	return {
// 		sch,
// 		fillSchool
// 	}

// }, {

// 	enable: true,
// 	H5Storage: window?.localStorage,

// })
const useSchoolStore = defineStore('school', {
	state: () => ({
		school: {
			id: 1,
			province: '福建省',
			city: '泉州市',
			area: '丰泽区',
			name: '泉州信息工程学院',
			latitude: '24.942463',
			longitude: '118.583885',
			enable: 1,
			description: '',
			address: '福建省泉州市丰泽区搏东路249号',
		},
		
	}),
	actions:{
		changeSchool(school){
			this.school=school
		}
	},
	persist:{
		enable:true,
		 H5Storage: window?.localStorage,
	},
	
})
export default useSchoolStore;