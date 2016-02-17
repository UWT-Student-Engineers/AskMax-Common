var map;
var myLatLng;

function alertMax(alertString) {
	Android.alert(alertString);
}
//function test(){
//var center = new google.maps.LatLng(47.24573265, -122.4372974, 18);
//map.setCenter(center);
//map.setZoom(zoom: 19);
//}
function centerCamera(targetName, targetLat, targetLng, zoomLevel) {
var center = new google.maps.LatLng(targetLat, targetLng);
map.setCenter(center);
map.setZoom(zoomLevel);
  var marker = new google.maps.Marker({
    position: {lat: targetLat, lng: targetLng},
    map: map,
    title: targetName
  });


  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Description</h1>'+
      '<div id="bodyContent">'+
      '<p>this is the description for .</p>'+ targetName +
      '<img src="file:///android_asset/common/bb107.png" alt=targetName height="128" width="128"</img>'+
      '</div>'+
      '</div>';

  var infoWindow = new google.maps.InfoWindow({
    content: contentString
  });
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  marker.setMap(map);


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
	myLatLng = new google.maps.LatLng;
}
