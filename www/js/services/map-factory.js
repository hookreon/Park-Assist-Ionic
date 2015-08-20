angular.module('parkAssist')
  .factory('MapFactory', function($cordovaGeolocation, MapOptions, Directions, TrafficLayer, GeocoderFactory) {
    
    var geoLocationOptions = {
      timeout: 10000,
      enableHighAccuracy: true
    };

    var init = function(map) {
      $cordovaGeolocation.getCurrentPosition(geoLocationOptions)
        .then(function(position) {

          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;

          var mapOptions = MapOptions;
          mapOptions.setCenter(latLng);

          map = new google.maps.Map(map, mapOptions);
          Directions.directionsDisplay().setMap(map);
          TrafficLayer.showTrafficLayer(map);

          GeocoderFactory.parseLatLng(lat, lng)
            .then(function(addressInfo) {
              
              if (addressInfo.formatted_address.match(/Santa Monica/)) {
                console.log("User located in Santa Monica");
                return;
              }

              // otherwise, the user's location is outside of SM, and a modal is needed
              console.log("User is located outside of Santa Monica");

            }, function(error) {
              console.log("Error in parseLatLng: ", error);
            });

          return map;
        }, function(error) {
          console.log('Could not establish location. Please, try again. Error message: ', error);
        });
    };

    return {
      init: init
    }
  });