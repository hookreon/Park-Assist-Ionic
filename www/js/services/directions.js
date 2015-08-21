/* 
* For information on the Directions Service, see the docs ( https://developers.google.com/maps/documentation/javascript/directions )
 */

angular.module('parkAssist')
  .factory('Directions', function() {
    var directions = {
      // returns an instance of the DirectionsService object 
      service: new google.maps.DirectionsService(),
      // returns an instance of the DirectionsRenderer object
      renderer: new google.maps.DirectionsRenderer({
          suppressMarkers: true
        }),
    }
    return directions;
  });
  