angular.module('parkAssist')
  .factory('MapFactory', function($cordovaGeolocation, MapOptions, TrafficLayer) {
    
    var geoLocationOptions = {
      timeout: 10000,
      enableHighAccuracy: true
    };

    var init = function(map) {
      $cordovaGeolocation.getCurrentPosition(geoLocationOptions)
        .then(function(position) {

          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          var mapOptions = MapOptions;
          mapOptions.setCenter(latLng);

          map = new google.maps.Map(map, mapOptions);
          TrafficLayer.showTrafficLayer(map);

          return map;
        }, function(error) {
          console.log('Could not establish location. Please, try again. Error message: ', error);
        });
    };

    return {
      init: init
    }
  });