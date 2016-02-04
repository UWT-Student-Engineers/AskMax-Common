var map;

function initMap() {
	var mapElement = document.getElementById('map');

	var mapOptions = {
		center: {lat: 47.2445799, lng: -122.4376184},
		zoom: 17,

		disableDefaultUI: true,
		zoomControl: true,
		scaleControl: true,
		rotateControl: true
	}

	map = new google.maps.Map(mapElement, mapOptions);
}