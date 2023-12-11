function filterPrice(value) {
	return Math.ceil(Math.random() * 10000) + '.' + Math.ceil(Math.random() * 99);

}


function filterComment(val) {
	return Math.ceil(Math.random() * 1000);
}

export default {

	filterPrice,
	filterComment
}