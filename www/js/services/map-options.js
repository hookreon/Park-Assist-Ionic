angular.module('parkAssist')
  .factory('MapOptions', function() {
    var mapOptions = {
      zoom: 17,
      tilt: 45, 
      minZoom: 3,
      maxZoom: 20,
      center: {
        lat: 34.0193016,
        lng: -118.494306
      },
      mapTypeId: google.maps.MapTypeId.HYBRID,
      styles: [{
        "stylers": [{
            "visibility": "on"
        }, {
            "saturation": -100
        }, {
            "gamma": 0.54
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
      }, {
        "featureType": "water",
        "stylers": [{
            "color": "#4d4946"
        }]
      }, {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
      }, {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "simplified"
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "transparent"
        }]
      }, {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "simplified"
        }]
      }, {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#ffffff"
        }]
      }, {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
            "gamma": 0.48
        }]
      }, {
        "featureType": "transit.station",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{
            "gamma": 7.18
        }]
      }]
  };
          return mapOptions;
  });