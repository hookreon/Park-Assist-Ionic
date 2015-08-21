angular.module('parkAssist')
  .factory('MapFactory', function($rootScope, $cordovaGeolocation, MapOptions, Directions, TrafficLayer, GeocoderFactory, Locator, MeterMarkers, User ) {
    
    var map, center, dbUser, meterLoc;
    var firstSpotInitialized = false;
    var userInitialized = false;
    var range = 0.2;
    var queue = [];

    var geoLocationOptions = {
      timeout: 10000,
      enableHighAccuracy: true
    };

   // // If user leaves browser, remove user from db
   // window.onbeforeunload = function(e) {
   //   if(dbUser) {
   //     dbUser.set(null);
   //   }
   // }; COME BACK TO THIS LATER

   var setMeter = function(pSpot) {
     var spot = [pSpot.latitude, pSpot.longitude];
     meterLoc = new google.maps.LatLng(spot[0], spot[1]);

     MeterMarkers.addMarker(map, true, meterLoc);
   };

   var findSpot = function(tuple, newDestination) {
     console.log('This is tuple', tuple);
     // console.log('This is new destination', newDestination);
     var pSpot;

     if(newDestination) {
       queue = [];
     }

     if(firstSpotInitialized && !newDestination) {
       pSpot = queue.shift();
       if(pSpot) {
         setMeter(pSpot);
         User.setDestination(meterLoc);
         return;
       }

       console.log('There are no parking spots in this area at this time.');
       return;
     }

     $rootScope.$broadcast('parkAssist:changeLoadingText','Finding you the best parking spot...');
     $rootScope.$broadcast('parkAssist:showLoadingText');

     if(dbUser) {
       dbUser.set(null);
     }

     //variables to help navigate to the best parking space
     firstSpotInitialized = false;

     //Create a user and get the key
     Locator.createUser(tuple,range) // !! this is where parking recommendations come back to the client !! 
     .then(function(dbUser) {
       //Setup a listener for recommendations, ordered by distance
       dbUser.child('Recommendations').orderByChild('distance').on('child_added', function(snapshot){
         var pSpot = snapshot.val();

         if(firstSpotInitialized) {
           queue.push(pSpot);
           return;
         }

         firstSpotInitialized = true;

         setMeter(pSpot);

         if(userInitialized) {
           User.setDestination(meterLoc).then(function(directions) {
             $rootScope.$broadcast('parkAssist:hideLoadingText');
           });
         }

         User.setDestination(meterLoc);

         User.watchPosition(map)
         .then(function(userLocation) {
           map.panTo(userLocation);
           userInitialized = true;
           $rootScope.$broadcast('parkAssist:hideLoadingText');
         });
       });
     });
   };

   var getMap = function() {
    return map;
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
                findSpot([lat, lng]);
                return;
              }

              $rootScope.$broadcast('parkAssist:hideLoadingText');
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
      init: init,
      findSpot: findSpot,
      getMap: getMap
    }
  });