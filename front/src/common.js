import * as Burlak from 'burlak';

const view = Burlak.InView;
const request = new Burlak.Request;
var getTop = function(){
	return request.get({
		url: 'https://peaceful-earth-20444.herokuapp.com/my',
		clearData: true
	}).then((result) => {
		result.sort(function(a, b){
			var priceA = parseFloat(a.price),
				priceB = parseFloat(b.price);
			if(priceA < priceB) return 1;
			if(priceA > priceB) return -1;
		});
		var top = result[0]['price'] ? result[0]['price'] : 0;
		return top;
	}).catch((error) => {
		return 0;
	});
}

var runGetTop = function(){
	getTop().then((top) => {
		document.body.innerHTML = top;
		top = parseFloat(top);
		var oldTop = localStorage.getItem('price') ? parseFloat(localStorage.getItem('price')) : 0;
		if(top != oldTop){
			localStorage.setItem('price', top);
			var notification = new Notification(top);
		}
		
		runGetTop();
	});
}

runGetTop();