var map;
var myLatLng;

function getCentroid(polygonCoords) {
	var area = 0.0;
	for(var i = 0; i < polygonCoords.length; i++) {
		var j = ( i < polygonCoords.length - 1 ? i + 1 : 0 );

		area += polygonCoords[i].lat * polygonCoords[j].lng -
			polygonCoords[j].lat * polygonCoords[i].lng;
	}
	area = 0.5 * area;

	var cx = 0.0;
	for(var i = 0; i < polygonCoords.length; i++) {
		var j = ( i < polygonCoords.length - 1 ? i + 1 : 0 );

		cx += (polygonCoords[i].lat + polygonCoords[j].lat) *
			(polygonCoords[i].lat * polygonCoords[j].lng -
			 polygonCoords[j].lat * polygonCoords[i].lng);
	}
	cx = cx / (6.0 * area);

	var cy = 0.0;
	for(var i = 0; i < polygonCoords.length; i++) {
		var j = ( i < polygonCoords.length - 1 ? i + 1 : 0 );

		cy += (polygonCoords[i].lng + polygonCoords[j].lng) *
			(polygonCoords[i].lat * polygonCoords[j].lng -
			 polygonCoords[j].lat * polygonCoords[i].lng);
	}
	cy = cy / (6.0 * area);

	return {lat: cx, lng: cy};
}

var lastMarkersAndPolys = [];

function centerCamera(locationData) {
	if(locationData.length == 0) {
		map.setCenter({lat: 47.2445799, lng: -122.4376184});
		map.setZoom(12);
		return;
	}

	for(var i = 0; i < lastMarkersAndPolys.length; i++) {
		lastMarkersAndPolys[i].setMap(null);
	}
	lastMarkersAndPolys = [];

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
	    position: getCentroid(coords),
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

		lastMarkersAndPolys.push(locationPoly);
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
