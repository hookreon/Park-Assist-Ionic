angular.module('parkAssist')
  .factory('User', function($q, $cordovaGeolocation, Directions, UserMarker) {
    var directionsDisplay = Directions.directionsDisplay(); // instantiates the DirectionsRenderer object for use

    var userLocation, userDestination;
    var routeInitialized = false;

    var userLocationOptions = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 0
    };

    var setDestination = function(latLng) {
      userDestination = latLng;
      routeInitialized = false;
        if(userLocation) {
          return calcRoute();
        }
    };

    var calcRoute = function() {
      var defer = $q.defer();

      directionsDisplay.setOptions({
        preserveViewport: routeInitialized
      });

      var request = {
        origin: userLocation,
        destination: userDestination,
        travelMode: google.maps.TravelMode.DRIVING
      };

      Directions.route(request, function(directions, status) {
        if ( status === google.maps.DirectionsStatus.OK ) {
          directionsDisplay.setDirections(directions);
          routeInitialized = true;
          defer.resolve(directions);
        }
      });

      return defer.promise;
    };

    var watchPosition = function(map) {
      $cordovaGeolocation.watchPostion(userLocationOptions)
        .then(function(position) {
          
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          userLocation = new google.maps.LatLng(lat, lng);

          if( !UserMarker.getMarker() ) {
            UserMarker.addMarker(map, true, userLocation);
          } else {
            UserMarker.getMarker().setPosition(userLocation);
          }

          calcRoute();

          return userLocation;
        })
        .catch(function(error){
          console.log("Error in watchPosition: ", error);
        });
    };

    // var watchPosition = function(map) {
    //   var defer = $q.defer();

    //   // watchPosition returns an error if user picks cancel
    //   // we are getting repeated prompts for user position because
    //   // defer is being used to wait for a location
    //   // need to use native error handling before using Q
    //   window.navigator.geolocation.watchPosition(function(pos) {
    //     userLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

    //     if( !UserMarker.getMarker() ) {
    //       UserMarker.addMarker(map, true, userLocation);
    //     } else {
    //       UserMarker.getMarker().setPosition(userLocation);
    //     }

    //     calcRoute();
        
    //     defer.resolve(userLocation);
    //   }, null, userLocationOptions);

    //   return defer.promise;
    // };

    return {
      watchPosition: watchPosition,
      calcRoute: calcRoute,
      setDestination: setDestination
    };
  });