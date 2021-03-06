var map;
var myLatLng;

// The host application
var AskMax;

function determineHost() {
	if(typeof AskMaxAndroid === undefined ) { // If we're on iOS
		function iosPost(funcName, json){
			window.webkit.messageHandlers[funcName].postMessage(json);
		}

		AskMax = {}

		var functionsToBind = ["displayInfo", "nothing"];
		for(var i = 0; i < functionsToBind.length; i++) {
			var funcName = functionsToBind[i];

			AskMax[funcName] = function(json) {
				return iosPost(funcName, json);
			}
		}
	} else { // Otherwise we're on Android
		AskMax = AskMaxAndroid;
	}
}

function getCentroid(polygonCoords) {
	var cx = 0.0;
	var cy = 0.0;

	for(var i = 0; i < polygonCoords.length; i++) {
		cx += polygonCoords[i].lat;
		cy += polygonCoords[i].lng;
	}

	return {lat: cx/polygonCoords.length, lng: cy/polygonCoords.length};

	/*var area = 0.0;
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

	return {lat: cx, lng: cy};*/
}

var lastMarkersAndPolys = [];

function centerCamera(locationData) {
	for(var i = 0; i < lastMarkersAndPolys.length; i++) {
		lastMarkersAndPolys[i].setMap(null);
	}
	lastMarkersAndPolys = [];

	if(locationData.length == 0) {
		map.setCenter({lat: 47.2445799, lng: -122.4376184});
		map.setZoom(17);
		return;
	}

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

		var onLocClick = function() {
			AskMaxAndroid.displayInfo(JSON.stringify(location));
		}

		coordCount += coords.length;

		var marker = new MarkerWithLabel({
	    position: getCentroid(coords),
	    map: map,
	    title: location["title"],
			labelContent: location["title"],
			labelClass: "location-labels",
			labelAnchor: new google.maps.Point(22, 0),
	    draggable: true
		});
		marker.setMap(map);

		marker.addListener('click', onLocClick);
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
	map.setZoom(17);
}

function initMap() {
	determineHost();

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
