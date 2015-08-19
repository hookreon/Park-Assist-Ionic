angular.module('gMap')
  .controller('MapCtrl', function($scope, $state, $cordovaGeolocation, MapOptions) {
    var options = {
      timeout: 10000,
      enableHighAccuracy: true
    };

    $cordovaGeolocation.getCurrentPosition(options)
      .then(function(position) {
        
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = MapOptions; 
        mapOptions.setCenter(latLng);

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        google.maps.event.addListenerOnce($scope.map, 'idle', function() {

          var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latLng
          });

          var infoWindow = new google.maps.InfoWindow({
            content: 'Eccomi!'
          });

          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open($scope.map, marker);
          });
        });

      }, function(error) {
        console.log("Could not get location. Error message: ", error);
      });
  });