angular.module('parkAssist')
  .factory('TrafficLayer', function() {
    var traffic = new google.maps.TrafficLayer();

    var showTrafficLayer = function(map) {
      return traffic.setMap(map);
    };

    return { showTrafficLayer: showTrafficLayer };
  })