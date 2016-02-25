var map;
var myLatLng;

function centerCamera(locationData) {
	var cumulativeLat = 0.0;
	var cumulativeLng = 0.0;
	var coordCount;

	for(var i = 0; i < locationData.length; i++) {
		var location = locationData[i];

		var coords = location["coordinates"];

		for(var j = 0; j < coords.length; j++) {
			cumulativeLat += coords[j]["lat"];
			cumulativeLng += coords[j]["lng"];
			totalCoords++;
		}

		coordCount += coords.length;

		var marker = new google.maps.Marker({
	    position: coords[0],
	    map: map,
	    title: location["building"] + " " + location["room"]
		});
		marker.setMap(map);

		var locationPoly = new google.maps.Polygon({
			paths: coords,
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 3,
			fillColor: '#FF000',
			fillOpacity: 0.35
		});
		locationPoly.setMap
	}

	var centerLat = cumulativeLat / coordCount;
	var centerLng = cumulativeLng / coordCount;

	var center = new google.maps.LatLng(centerLat, centerLng);
	map.setCenter(center);
	map.setZoom(2);
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
	myLatLng = new google.maps.LatLng;
}
