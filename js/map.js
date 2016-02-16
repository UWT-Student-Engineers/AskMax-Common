var map;

function alertMax(alertString) {
	Android.alert(alertString);
}

function centerCamera(targetName, targetLat, targetLng, zoomLevel) {
	var center = new google.maps.LatLng(targetLat, targetLng);
	map.setCenter(center);
//map.setZoom(zoomLevel);
//  var marker = new google.maps.Marker({
//    position: {lat: targetLat, lng: targetLng},
//    map: map,
//    title: targetName
//  });
//  marker.setMap(map);

//add listener to marker
}

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

	var styles = [
		{
			stylers: [
		    	{ hue: "#33006f" },
		    	{ saturation: -20 }
		    ],
		},

	];

	map = new google.maps.Map(mapElement, mapOptions);
	map.setOptions({ styles: styles });
}
