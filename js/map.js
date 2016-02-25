var map;
var myLatLng;

function getCentroid(polygonCoords) {

}

var lastMarkersAndPolys = [];

function centerCamera(locationDataString) {
	for(int i = 0; i < lastMarkersAndPolys.length; i++) {
		lastMarkersAndPolys[i].setMap(null);
	}

	locationData = locationDataString; //JSON.parse(locationDataString);

	var cumulativeLat = 0.0;
	var cumulativeLng = 0.0;
	var coordCount = 0;

	for(var i = 0; i < locationData.length; i++) {
		var location = locationData[i];

		var coords = location["coordinates"];

		for(var j = 0; j < coords.length; j++) {
			cumulativeLat += coords[j]["lat"];
			cumulativeLng += coords[j]["lng"];
		}

		coordCount += coords.length;

		var marker = new google.maps.Marker({
	    position: coords[0],
	    map: map,
	    title: location["building"] + " " + location["room"]
		});
		marker.setMap(map);

		lastMarkersAndPolys.push(marker);

		var locationPoly = new google.maps.Polygon({
			paths: coords,
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 3,
			fillColor: '#FF0000',
			fillOpacity: 0.35
		});
		locationPoly.setMap(map);

		lastMarkersAndPolys.push(poly);
	}

	var centerLat = cumulativeLat / coordCount;
	var centerLng = cumulativeLng / coordCount;

	var center = new google.maps.LatLng(centerLat, centerLng);
	map.setCenter(center);
	map.setZoom(15);
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
