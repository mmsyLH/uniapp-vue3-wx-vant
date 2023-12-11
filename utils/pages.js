export default function jumpPage(pages){
	if(pages===undefined){
		uni.navigateTo({
			url:'/pages/index/index'
		})
	}
	if(pages.length==1){
		uni.navigateTo({
			url:pages[0].route
		})
	}
	if(pages.length>1){
		uni.navigateTo({
			url:pages[pages.length-1].route
		})
	}
}